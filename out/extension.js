"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const path = require("path");
const content_1 = require("./content");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "flutter-mvp-scaffold" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('flutter-mvp-scaffold.generateMvpScaffold', () => __awaiter(this, void 0, void 0, function* () {
        // Display a message box to the user
        // vscode.window.showInformationMessage('Hello World from flutter_mvp_scaffold!');
        const entityName = yield requestEntityName();
        if (entityName) {
            generateFiles(entityName);
        }
    }));
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
function requestEntityName() {
    return __awaiter(this, void 0, void 0, function* () {
        const input = yield vscode.window.showInputBox();
        return input;
    });
}
function generateFiles(inputName) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = vscode.workspace.getConfiguration('flutterMvp');
        const domain = config.domain;
        const langExtension = config.extension;
        const dataEntityPath = config.dataEntityPath;
        const dataEntitySuffix = `${config.dataEntitySuffix}${langExtension}`;
        const dataRepositoryPath = config.dataRepositoryPath;
        const dataRepositorySuffix = `${config.dataRepositorySuffix}${langExtension}`;
        const dataMapperPath = config.dataMapperPath;
        const dataMapperSuffix = `${config.dataMapperSuffix}${langExtension}`;
        const domainModelPath = config.domainModelPath;
        const domainModelSuffix = `${config.domainModelSuffix}${langExtension}`;
        const domainServicePath = config.domainServicePath;
        const domainServiceSuffix = `${config.domainServiceSuffix}${langExtension}`;
        const domainBlocPath = config.domainBlocPath;
        const domainBlocSuffix = `${config.domainBlocSuffix}${langExtension}`;
        const presentationScreenPath = config.presentationScreenPath;
        const presentationScreenSuffix = `${config.presentationScreenSuffix}${langExtension}`;
        const presentationInjectorPath = config.presentationInjectorPath;
        const presentationInjectorSuffix = `${config.presentationInjectorSuffix}${langExtension}`;
        const entityContent = config.entity.content;
        yield generateFile(domain, inputName, dataEntityPath, dataEntitySuffix, entityContent);
        const repoContent = config.repository.content;
        yield generateFile(domain, inputName, dataRepositoryPath, dataRepositorySuffix, repoContent);
        const mapperContent = config.mapper.content;
        yield generateFile(domain, inputName, dataMapperPath, dataMapperSuffix, mapperContent);
        const modelContent = config.model.content;
        yield generateFile(domain, inputName, domainModelPath, domainModelSuffix, modelContent);
        const serviceContent = config.service.content;
        yield generateFile(domain, inputName, domainServicePath, domainServiceSuffix, serviceContent);
        const blocContent = config.bloc.content;
        yield generateFile(domain, inputName, domainBlocPath, domainBlocSuffix, blocContent);
        const screenContent = config.screen.content;
        yield generateFile(domain, inputName, presentationScreenPath, presentationScreenSuffix, screenContent);
        // TODO: Add injection
    });
}
function generateFile(domain, inputName, layerPath, fileSuffix, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const wsedit = new vscode.WorkspaceEdit();
        const fileName = `${inputName.toLowerCase()}${fileSuffix}`;
        const filePath = path.join(vscode.workspace.rootPath, `lib${layerPath}${fileName}`);
        const fileUri = vscode.Uri.file(filePath);
        const contentString = content_1.generateEntityContent(domain, inputName, content);
        wsedit.createFile(fileUri, { ignoreIfExists: true });
        yield vscode.workspace.applyEdit(wsedit);
        const newFile = vscode.Uri.parse(filePath);
        const document = yield vscode.workspace.openTextDocument(newFile);
        wsedit.insert(newFile, new vscode.Position(0, 0), contentString);
        const success = yield vscode.workspace.applyEdit(wsedit);
        if (success) {
            // vscode.window.showTextDocument(document);
        }
        else {
            vscode.window.showInformationMessage('Error!');
        }
    });
}
//# sourceMappingURL=extension.js.map