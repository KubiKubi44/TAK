import { useHead } from "@unhead/react";

const SITE = "https://www.itakk.cz";

export default function Seo({
    title,
    description,
    path = "/",
    image = `${SITE}/cover-1200x630.jpg`,
    type = "website",
    robots = "index,follow",
    jsonLd,
}) {
    const url = `${SITE}${path}`;

    useHead({
        title,
        meta: [
            { name: "description", content: description },
            { name: "robots", content: robots },

            { property: "og:title", content: title },
            { property: "og:description", content: description },
            { property: "og:type", content: type },
            { property: "og:url", content: url },
            { property: "og:image", content: image },

            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: title },
            { name: "twitter:description", content: description },
            { name: "twitter:image", content: image },
        ],
        link: [{ rel: "canonical", href: url }],
        script: jsonLd
            ? [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }]
            : [],
    });

    return null;
}
