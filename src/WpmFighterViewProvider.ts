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
  ): Thenable<void> | void {
    this._webviewView = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._context.extensionUri],
    };
  }

  private getHTMLForWebview(context: vscode.ExtensionContext): string {
    const HTML_PATH = path.join(context.extensionPath, "media", "webview.html");
    let HTML = fs.readFileSync(HTML_PATH, "utf-8");

    return HTML;
  }
}

function getWebviewUri(base: vscode.Uri, fileName: string): vscode.Uri {
  return vscode.Uri.joinPath(base, "media", fileName);
}
