import React from "react";
const AmpAnalyticsGA4Events = (props) => {
    const ga4EventValues = {
        section: props?.section || "",
        subsection: props?.subsection || "",
        article_id: props?.article_id || "",
        type_of_article: props?.type_of_article || "",
        local18_district: props?.local18_district || "",
        domain: props?.domain || "",
    };
    return (
        <amp-analytics
            type="gtag"
            // config="https://amp.analytics-debugger.com/ga4.json"
            data-credentials="include"
        >
            <script
                type="application/json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        vars: {
                            gtag_id: "G-4LJXB6XTLN",
                            config: {
                                "G-4LJXB6XTLN": { groups: "default","send_page_view": false },
                            },
                        },
                        triggers: {
                            "trackEvent": {
                                on: "click",
                                selector: `#${props?.id}`,
                                request: "event",
                                vars: {
                                    event_name: `${props?.event_name}`,
                                    cta_name: `${props?.cta_name}`,
                                    ...ga4EventValues,
                                },
                            },


                        },
                    }),
                }}
            ></script>
        </amp-analytics>

    )
}
export default AmpAnalyticsGA4Events