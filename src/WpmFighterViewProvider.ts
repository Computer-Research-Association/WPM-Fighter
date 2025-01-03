import * as vscode from "vscode";

class WpmFighterViewProvider implements vscode.WebviewViewProvider {
  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    token: vscode.CancellationToken
  ): Thenable<void> | void {}
}
