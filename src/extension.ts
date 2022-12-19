import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('linkify.linkify', () => {
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
    		return;
		}
		var selection = editor.selection;
		var text = editor.document.getText(selection);
		
		if (text.indexOf("http://") == -1 && text.indexOf("https://") == -1) text = "https://" + text;

		editor.edit(editBuilder => {
			editBuilder.replace(selection, `<a href="${text}" target="${vscode.workspace.getConfiguration("linkify").get("targetAttribute")}">${text.replace(/https?:\/\//, "")}</a>`);
		});
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
