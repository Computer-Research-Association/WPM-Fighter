import * as vscode from "vscode";
import WpmFighterViewProvider from "./WpmFighterViewProvider";
import TypingTracker from "./TypingTracker";

export function activate(context: vscode.ExtensionContext) {
  const wpmFighterProvider = new WpmFighterViewProvider(context);

  const webView = vscode.window.registerWebviewViewProvider(WpmFighterViewProvider.viewID, wpmFighterProvider);

  const typingTracker = TypingTracker.getInstance(context);
  typingTracker.startTracking();

  context.subscriptions.push(webView);
}

export function deactivate() {
  const typingTracker = TypingTracker.getInstance(undefined!).pauseTracking();
}
