import * as vscode from 'vscode';
import * as child_process from 'child_process';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "helloworld" is now active!');
    let disposable = vscode.commands.registerCommand('extension.svnBlame', () => {
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
            const filePath = activeEditor.document.uri.fsPath;
            const command = `svn blame "${filePath} >SVN_BLAME/Output.txt"`;
            child_process.exec(command, (error, stdout, stderr) => {
                if (error) {
                    vscode.window.showErrorMessage(`Error executing SVN blame: ${error.message}`);
                } else {
                    const output = stderr || stdout;
                    vscode.window.showInformationMessage(output);
                }
            });
        } else {
            vscode.window.showErrorMessage("No active editor found.");
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}