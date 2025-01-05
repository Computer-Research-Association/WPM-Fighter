import * as vscode from "vscode";
import WpmFighterViewProvider from "./WpmFighterViewProvider";

export function activate(context: vscode.ExtensionContext) {
  const wpmFighterProvider = new WpmFighterViewProvider(context);

  const webView = vscode.window.registerWebviewViewProvider(WpmFighterViewProvider.viewID, wpmFighterProvider);
  context.subscriptions.push(webView);
}

export function deactivate() {}
