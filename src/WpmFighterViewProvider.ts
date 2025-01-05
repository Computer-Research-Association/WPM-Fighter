import * as vscode from "vscode";

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
    webviewView.webview.html = this.getHTMLForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage((data) => {
      console.log(data);
    });

    webviewView.onDidChangeVisibility((e) => {
      if (webviewView.visible) {
        console.log("WPM View Visible");
      } else {
        console.log("WPM View Invisible");
      }
    });
  }

  private getHTMLForWebview(webview: vscode.Webview): string {
    const BASE_URI = this._context.extensionUri;

    const mainScriptUri = getWebviewUri(webview, BASE_URI, "main.js");
    const styleResetUri = getWebviewUri(webview, BASE_URI, "reset.css");
    const styleVSCodeUri = getWebviewUri(webview, BASE_URI, "vscode.css");
    const styleMainUri = getWebviewUri(webview, BASE_URI, "main.css");

    const nonce = getNonce(); // Content-Security-Policy

    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
				-->
        <meta
          http-equiv="Content-Security-Policy"
          content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link href="${styleResetUri}" rel="stylesheet">
				<link href="${styleVSCodeUri}" rel="stylesheet">
				<link href="${styleMainUri}" rel="stylesheet">

        <title>${WpmFighterViewProvider.viewID}</title>
      </head>
      <body>
        TEST
        <script nonce="${nonce}" src="${mainScriptUri}"></script>
      </body>
    </html>`;
  }
}

function getWebviewUri(webview: vscode.Webview, base: vscode.Uri, fileName: string): vscode.Uri {
  return webview.asWebviewUri(vscode.Uri.joinPath(base, "media", fileName));
}

function getNonce() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
