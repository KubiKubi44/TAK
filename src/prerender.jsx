import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { createUnhead } from "unhead";
import { renderSSRHead } from "@unhead/ssr";
import { UnheadProvider } from "@unhead/react/client";
import "./i18n";
import AppShell from "./AppShell";

globalThis.__PRERENDER__ = true;

export async function prerender(data) {
    const url = data?.url || "/";
    console.log("[prerender] rendering", url);

    // create head instance for SSR
    const head = createUnhead();

    // IMPORTANT:
    // Your pages using `useHead()` rely on UnheadProvider on the client.
    // For prerender, simplest stable approach is: don't try to inject runtime hooks here,
    // just render HTML and keep index.html head as baseline.
    // (If you want full per-page head SSR, we’ll wire a compatible provider after build passes.)

    const appHtml = renderToString(
        <UnheadProvider head={head}>
            <StaticRouter location={url}>
                <AppShell />
            </StaticRouter>
        </UnheadProvider>
    );

    const { headTags, bodyTags, bodyTagsOpen } = renderSSRHead(head);

    return {
        html: `${bodyTagsOpen || ""}<div id="root">${appHtml}</div>${bodyTags || ""}`,
        head: headTags || "",
        links: new Set(["/", "/o-nas", "/sluzby", "/portfolio", "/proces", "/kontakt"]),
    };
}
