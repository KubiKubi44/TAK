import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { createUnhead } from "unhead";
import { UnheadProvider } from "@unhead/react";
import { renderSSRHead } from "@unhead/ssr";
import "./i18n";
import AppShell from "./AppShell";

// Flag used to disable heavy client-only effects during prerender
globalThis.__PRERENDER__ = true;

export async function prerender(data) {
    const url = data?.url || "/";
    console.log("[prerender] rendering", url);

    const head = createUnhead();

    const appHtml = renderToString(
        <UnheadProvider head={head}>
            <StaticRouter location={url}>
                <AppShell />
            </StaticRouter>
        </UnheadProvider>
    );

    // renderSSRHead is synchronous; no await needed
    const { headTags, bodyTags, bodyTagsOpen } = renderSSRHead(head);

    return {
        // Keep mount target consistent with renderTarget "#root"
        html: `${bodyTagsOpen || ""}<div id="root">${appHtml}</div>${bodyTags || ""}`,
        // Let the plugin inject raw head tags (title/meta/link/script)
        head: headTags || "",
        links: new Set(["/", "/o-nas", "/sluzby", "/portfolio", "/proces", "/kontakt"]),
    };
}
