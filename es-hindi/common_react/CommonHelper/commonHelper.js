const capitalize = (input) => {
  if (input) {
    var words = input.split("-");
    var CapitalizedWords = [];
    words.forEach((element) => {
      if (element.length) {
        CapitalizedWords.push(
          element[0].toUpperCase() + element.slice(1, element.length)
        );
      }
    });
    return CapitalizedWords.join(" ");
  } else {
    return "";
  }
};

let langs = {
  punjabi: "pb",
  english: "en",
  gujarati: "gj",
  bengali: "bn",
  urdu: "ur",
  kannada: "kn",
  hindi: "hi",
  tamil: "tm",
  telugu: "tl",
  odia: "od",
  assam: "as",
  malayalam: "ml",
  lokmat: "lk",
  marathi: "lk",
};

const detectTarget = () => {
  let lang = "en";
  let env = "prod";
  const { hostname } = window.location || {};
  if (hostname) {
    lang = langShortMapper(
      Object.keys(langs).find((l) => hostname.includes(l))
    );

    if (hostname.includes("beta")) {
      env = "beta";
    } else if (hostname.includes("stg")) {
      env = "stg";
    }
  }

  return {
    lang,
    env,
  };
};

const langShortMapper = (lang, rev) => {
  if (rev) {
    let s = Object.keys(langs).find(
      (s) => langs[s]?.toLocaleLowerCase() == lang?.toLocaleLowerCase()
    );
    return s;
  }

  return lang && langs[lang] ? langs[lang] : "en";
};

export { capitalize, detectTarget };