import * as vscode from "vscode";

class TypingTracker {
  private static instance: TypingTracker;

  private _context: vscode.ExtensionContext;
  private charCount: number = 0;
  private startTime: number = Date.now();
  private wpm: number = 0;
  private timer?: NodeJS.Timeout;
  private isTracking: boolean = false;

  private constructor(context: vscode.ExtensionContext) {
    this._context = context;
  }

  public static getInstance(context: vscode.ExtensionContext): TypingTracker {
    if (!TypingTracker.instance) {
      TypingTracker.instance = new TypingTracker(context);
    }
    return TypingTracker.instance;
  }

  private initialize() {
    this.startTime = Date.now();
  }

  private onDidChangeTextDocument(event: vscode.TextDocumentChangeEvent) {
    if (!event.contentChanges.length) return;

    this.charCount += event.contentChanges.length;
  }

  public calculateWPM(): number {
    const elapsedTime = (Date.now() - this.startTime) / 60000;
    return Math.round(this.charCount / 5 / elapsedTime);
  }

  public reset() {
    this.charCount = 0;
    this.startTime = Date.now();
  }

  public getCharCount(): number {
    return this.charCount;
  }
}
