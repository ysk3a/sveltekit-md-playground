import type { CartaExtension, CartaExtensionComponent } from "carta-md";
import Mention from "./Mention.svelte";
import { options } from "marked";
import type { ComponentProps } from "svelte";
import { scale, fade } from "svelte/transition";

export const tagTokenizerExtension = {
    name: '@',
    level: 'inline',
    start(src: string) {
        const i = src.indexOf('@');
        console.log('::start=', i, src);
        return i;
    },
    //tokens: any
    tokenizer(src: string) {
        const rule = /\B^@\w+/g;
        const match = rule.exec(src);
        if (match) {
            console.log(match);
            return {
                type: '@', // Should match "name" above
                raw: match[0], // Text to consume from the source
                text: match[0]
            };
        }
    }
};
export const mentioning = (): CartaExtension => {
    return {
        // onLoad: (data) => (shj = highlight),
        markedExtensions: [
            { extensions: [tagTokenizerExtension] }
        ]
    };
};

export const mention = (): CartaExtension => {
    const snippets: MentionSnippet[] = defaultSnippets.filter((snippet) =>
        options?.disableDefaultSnippets === true
            ? false
            : !options?.disableDefaultSnippets?.includes(snippet.id)
    );
    snippets.push(...(options?.snippets ?? []));

    const inTransition =
        options?.inTransition ??
        ((node: Element) =>
            scale(node, {
                duration: 150,
                easing: BezierEasing(0.05, 0.68, 0.2, 1.15)
            }));
    const outTransition =
        options?.inTransition ??
        ((node: Element) =>
            fade(node, {
                duration: 100
            }));
    const mentionComponent: CartaExtensionComponent<ComponentProps> = {
        component: Mention,
        props: {
            snippets,
            inTransition,
            outTransition
        },
        parent: 'input'
    };

    return {
        components: [mentionComponent]
    };
};