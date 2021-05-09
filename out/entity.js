"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEntityContent = void 0;
const vscode = require("vscode");
function generateEntityContent(fileName) {
    const config = vscode.workspace.getConfiguration('flutterMvp');
    const domain = config.domain;
    const content = config.entity.content;
    var contentString = "";
    content.forEach(c => {
        contentString += c.replace('${1:name}', fileName.toLowerCase())
            .replace('${2:className}', fileName)
            .replace('${3:domain}', domain)
            .replace('${4:entityPath}', fileName);
    });
    return contentString;
}
exports.generateEntityContent = generateEntityContent;
//# sourceMappingURL=entity.js.map