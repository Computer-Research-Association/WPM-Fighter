import * as vscode from "vscode";

let wordCount = 0;
let startTime: number | null = null;

export function activate(context: vscode.ExtensionContext) {
  const wpmTreeProvider = new WPMTreeProvider();
  vscode.window.registerTreeDataProvider("wpmView", wpmTreeProvider);

  vscode.workspace.onDidChangeTextDocument((event) => {
    if (!startTime) {
      startTime = Date.now();
    }

    const changes = event.contentChanges;
    for (const change of changes) {
      wordCount += countWords(change.text);
    }

    const elapsedTime = (Date.now() - startTime) / 60000;
    const wpm = Math.round(wordCount / elapsedTime) / 5;
    wpmTreeProvider.updateWPM(wpm);
  });
}

function countWords(text: string): number {
  const words = text.match(/\b\w+\b/g);
  return words ? words.length : 0;
}

class WPMTreeProvider implements vscode.TreeDataProvider<TreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<TreeItem | undefined | void> = new vscode.EventEmitter<
    TreeItem | undefined | void
  >();
  readonly onDidChangeTreeData: vscode.Event<TreeItem | undefined | void> = this._onDidChangeTreeData.event;

  private currentWPM = 0;

  updateWPM(wpm: number) {
    this.currentWPM = wpm;
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: TreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(): Thenable<TreeItem[]> {
    return Promise.resolve([new TreeItem(`WPM: ${this.currentWPM}`)]);
  }
}

class TreeItem extends vscode.TreeItem {
  constructor(label: string) {
    super(label, vscode.TreeItemCollapsibleState.None);
  }
}

export function deactivate() {}
