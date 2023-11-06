import type { CartaExtension } from "carta-md";

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