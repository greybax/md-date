import moment from "moment";
import { ast, text, html, isParagraph } from "remark-helpers";

const isDate = (format, locale, node) => {
    return moment(text(node), format, locale, true).isValid();
}

export default (format, locale, input) => {
    if (!input)
        return;

    let mdast = ast(input).children;
    let clonedMdast = { type: "root", children: [] };

    for (let i = 0; i < mdast.length; i++) {
        if (isParagraph(mdast[i]) && isDate(format, locale, mdast[i])) {
            clonedMdast.children.push(mdast[i]);
        }
    };

    if (clonedMdast.children.length === 0)
        return;

    let plainText = text(clonedMdast);
    return {
        text: plainText,
        html: html(clonedMdast),
        unix: moment.utc(plainText, format, locale, true).unix(),
        moment: moment(plainText, format, locale, true),
        clonedMdast
    };
};