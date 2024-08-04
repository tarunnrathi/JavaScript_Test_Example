const budgetParser = ({
  budget,
  mode = "prod",
  lang = "en",
  eventLabel,
} = {}) => {
  try {
    if (budget) {
      return {
        budget: budget?.data?.budget_highlights?.highlights || [],
        mode,
        lang,
        eventLabel,
      };
    }
    return {};
  } catch (error) {
    return {};
  }
};

const budgetContent = async ({
  mode = "prod",
  lang = "en",
  eventLabel,
} = {}) => {
  try {
    let [budget] = await Promise.all(
      [
        fetch(
          `https://${mode == "stg" ? "stg-" : ""}api${
            mode == "stg" ? "" : "-en"
          }.news18.com/nodeapi/v1/eng/get-redis?key=budget_highlights&allow_prefix=false`
        ).then((p) => p.json()),
      ].map((p) => p.catch((e) => {}))
    );

    return budgetParser({ budget, mode, lang, eventLabel });
  } catch (error) {
    return {};
  }
};

export { budgetParser, budgetContent };
