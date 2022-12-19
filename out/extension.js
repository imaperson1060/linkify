"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    let disposable = vscode.commands.registerCommand('linkify.linkify', () => {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        var selection = editor.selection;
        var text = editor.document.getText(selection);
        if (text.indexOf("http://") == -1 && text.indexOf("https://") == -1)
            text = "https://" + text;
        editor.edit(editBuilder => {
            editBuilder.replace(selection, `<a href="${text}" target="${vscode.workspace.getConfiguration("linkify").get("targetAttribute")}">${text.replace(/https?:\/\//, "")}</a>`);
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map