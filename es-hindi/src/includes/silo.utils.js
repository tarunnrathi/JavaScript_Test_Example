function matchReplacer(regex, body, arr, tag) {
  const match = regex.exec(body);
  if (!match) {
    return [arr, body];
  }
  return matchReplacer(
    regex,
    body.replace(regex, tag ? `[${tag}${arr.length || 0}]\r\n` : ""),
    [...arr, match[0]],
    tag,
  );
}

export const topicParser = (parsedBody, title) => {
  let body = parsedBody;
  const iframe = /<iframe[\S\s]*?<\/iframe>/i;
  let [iframeList] = matchReplacer(iframe, parsedBody, [], "if");
  if (iframeList.length > 0) {
    iframeList = iframeList.forEach((item) => {
      if (item.indexOf("youtube") > 0) {
        body = body.replace(
          item.split("src")[0],
          item.split("src")[0] + `class="youtubevideo"`,
        );
      }
    });
  }
  if (parsedBody?.includes("[q]") && parsedBody?.includes("[/ans]")) {
    body = parsedBody
      .replace(/\[ans\]/gi, '<div class="panel"><p>')
      .replace(/\[\/q\]/gi, "</div>")
      .replace(/\[q\]/gi, '<li><div class="accordion">')
      .split(" ");
    body[body.lastIndexOf("[/ans]")] = "</p></div>";
    body = body.join(" ").replace(/\[\/ans\]/gi, "</li>");
  } else {
    body = `<h3> ${topicParserContent(title)}</h3> ${topicParserContent(body)}`;
  }
  return body;
};
export const topicParserContent = (parsedBody) => {
  return parsedBody
    ?.replace(/\\*/g, ``)
    .replace(/&quot;/g, `"`)
    .replace(/\[caption.*?\](.*?)\[\/caption\]/, "$1");
};
