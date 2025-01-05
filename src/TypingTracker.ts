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
}
