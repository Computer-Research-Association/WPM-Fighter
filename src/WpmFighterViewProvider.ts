import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export default class WpmFighterViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewID = "wpmView";
  private _webviewView?: vscode.WebviewView;
  private _context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this._context = context;
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    token: vscode.CancellationToken
  ): Thenable<void> | void {}
}
