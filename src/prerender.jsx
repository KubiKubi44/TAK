import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { createUnhead } from "unhead";
import { UnheadProvider } from "@unhead/react/client";
import { renderSSRHead } from "@unhead/ssr";
import "./i18n";
import AppShell from "./AppShell";

export async function prerender(data) {
    const url = data?.url || "/";
    const head = createUnhead();

    const appHtml = renderToString(
        <UnheadProvider head={head}>
            <StaticRouter location={url}>
                <AppShell />
            </StaticRouter>
        </UnheadProvider>
    );

    const { headTags, bodyTags, bodyTagsOpen } = await renderSSRHead(head);

    // Parse headTags to extract title and create the object structure vite-prerender-plugin expects
    const titleMatch = headTags.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : "";
    // Remove title from headTags to avoid duplication, and pass the rest as an element
    // We wrap it in a Set as the plugin iterates over it
    const otherHeadTags = headTags.replace(/<title>.*?<\/title>/, '');

    // vite-prerender-plugin expects: { lang, title, elements: Set<string|object> }
    const pluginHead = {
        lang: 'cs',
        title: title, // Note: Plugin will encode this, so we assume unhead output is compatible or we might need decoding if double-encoding occurs
        elements: new Set([otherHeadTags])
    };

    return {
        html: `${bodyTagsOpen || ""}${appHtml}${bodyTags || ""}`,
        head: pluginHead,
        links: new Set(["/", "/o-nas", "/sluzby", "/portfolio", "/proces", "/kontakt"]),
    };
}
