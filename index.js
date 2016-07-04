import remark   from "remark";
import html     from "remark-html";
import moment   from "moment";
import removeMd from "remove-markdown";

// TODO: Need to move it to helper functions
const isDate = (format, locale, node) => {
    let paragraph = "";
    for (let i = 0; i < node.children.length; i++) {
        paragraph += getParagraphPlainText(node.children[i], paragraph);
    }
    return moment(paragraph, format, locale, true).isValid();
}

// TODO: Need to move it to helper functions
const isParagraph = (node) => {
    return (node.type === "paragraph");
}

// TODO: Need to move it to helper functions
const getParagraphPlainText = (node, paragraph) => {
    if (node.value) {
        paragraph = node.value;
    }
    if (node.children) {
        return getParagraphPlainText(node.children[0], paragraph);
    }

    return paragraph;
}

export default (format, locale, input) => {
    if (!input)
        return;

    let ast = remark().parse(input).children;
    let clonedAst = { type: "root", children: [] };

    for (let i = 0; i < ast.length; i++) {
        if (isParagraph(ast[i]) && isDate(format, locale, ast[i])) {
            clonedAst.children.push(ast[i]);
        }
    };

    if (clonedAst.children.length === 0)
        return;

    let md = remark().stringify(clonedAst).trim();
    let dom = remark().use(html).process(md).contents.trim();
    let plainText = removeMd(md).trim();

    return {
        text: plainText,
        html: dom,
        unix: moment.utc(plainText, format, locale, true).unix(),
        moment: moment(plainText, format, locale, true),
        clonedAst
    };
};