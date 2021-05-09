"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEntityContent = void 0;
const vscode = require("vscode");
function generateEntityContent(domain, fileName, content) {
    const config = vscode.workspace.getConfiguration('flutterMvp');
    const dataEntityPath = config.dataEntityPath;
    const dataRepositoryPath = config.dataRepositoryPath;
    const domainServicePath = config.domainServicePath;
    const domainBlocPath = config.domainBlocPath;
    const domainModelPath = config.domainModelPath;
    var contentString = "";
    content.forEach(c => {
        var contentAux = c;
        contentAux = replaceAll(contentAux, '${1:name}', fileName.toLowerCase());
        contentAux = replaceAll(contentAux, '${2:className}', fileName);
        contentAux = replaceAll(contentAux, '${3:domain}', domain);
        contentAux = replaceAll(contentAux, '${4:entityPath}', dataEntityPath);
        contentAux = replaceAll(contentAux, '${5:repositoryPath}', dataRepositoryPath);
        contentAux = replaceAll(contentAux, '${6:servicePath}', domainServicePath);
        contentAux = replaceAll(contentAux, '${7:blocPath}', domainBlocPath);
        contentAux = replaceAll(contentAux, '${8:modelPath}', domainModelPath);
        contentString += contentAux;
    });
    return contentString;
}
exports.generateEntityContent = generateEntityContent;
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
//# sourceMappingURL=content.js.map