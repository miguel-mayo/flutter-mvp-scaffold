// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import { generateEntityContent } from './content';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "flutter-mvp-scaffold" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('flutter-mvp-scaffold.generateMvpScaffold', async () => {

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from flutter_mvp_scaffold!');
		const entityName = await requestEntityName();

		if (entityName) {
			generateFiles(entityName);
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }

async function requestEntityName() {
	const input = await vscode.window.showInputBox();
	return input;
}

async function generateFiles(inputName: string) {

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

	const entityContent: string[] = config.entity.content;
	await generateFile(domain, inputName, dataEntityPath, dataEntitySuffix, entityContent);

	const repoContent: string[] = config.repository.content;
	await generateFile(domain, inputName, dataRepositoryPath, dataRepositorySuffix, repoContent);

	const mapperContent: string[] = config.mapper.content;
	await generateFile(domain, inputName, dataMapperPath, dataMapperSuffix, mapperContent);

	const modelContent: string[] = config.model.content;
	await generateFile(domain, inputName, domainModelPath, domainModelSuffix, modelContent);

	const serviceContent: string[] = config.service.content;
	await generateFile(domain, inputName, domainServicePath, domainServiceSuffix, serviceContent);

	const blocContent: string[] = config.bloc.content;
	await generateFile(domain, inputName, domainBlocPath, domainBlocSuffix, blocContent);

	const screenContent: string[] = config.screen.content;
	await generateFile(domain, inputName, presentationScreenPath, presentationScreenSuffix, screenContent);

	// TODO: Add injection
}

async function generateFile(
	domain: string,
	inputName: string,
	layerPath: string,
	fileSuffix: string,
	content: string[]) {
	const wsedit = new vscode.WorkspaceEdit();

	const fileName = `${inputName.toLowerCase()}${fileSuffix}`;
	const filePath = path.join(vscode.workspace.rootPath!, `lib${layerPath}${fileName}`);
	const fileUri = vscode.Uri.file(filePath);

	const contentString = generateEntityContent(domain, inputName, content);

	wsedit.createFile(fileUri, { ignoreIfExists: true });
	await vscode.workspace.applyEdit(wsedit);

	const newFile = vscode.Uri.parse(filePath);
	const document = await vscode.workspace.openTextDocument(newFile);

	wsedit.insert(newFile, new vscode.Position(0, 0), contentString);

	const success = await vscode.workspace.applyEdit(wsedit);
	if (success) {
		// vscode.window.showTextDocument(document);
	} else {
		vscode.window.showInformationMessage('Error!');
	}
}