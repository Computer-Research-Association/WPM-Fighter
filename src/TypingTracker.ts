import * as vscode from "vscode";
import GameManager from "./GameManager";

export default class TypingTracker {
  private static instance: TypingTracker;
  private charCount: number = 0;
  private startTime: number = Date.now();
  private wpm: number = 0;
  private timer?: NodeJS.Timeout;
  private isTracking: boolean = false;
  private context: vscode.ExtensionContext;

  private constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  public static getInstance(context: vscode.ExtensionContext): TypingTracker {
    if (!TypingTracker.instance) {
      TypingTracker.instance = new TypingTracker(context);
    }
    return TypingTracker.instance;
  }

  public startTracking() {
    if (this.isTracking) return;
    this.isTracking = true;
    this.startTime = Date.now();
    this.charCount = 0;

    this.registerTextChangeListener();
    this.startTimer();
  }

  public pauseTracking() {
    if (!this.isTracking) return;
    this.isTracking = false;
    this.unregisterTextChangeListener();
    this.stopTimer();
  }

  private registerTextChangeListener() {
    vscode.workspace.onDidChangeTextDocument(this.onDidChangeTextDocument, this, this.context.subscriptions);
  }

  private unregisterTextChangeListener() {
    // 모든 리스너 제거
    vscode.workspace.onDidChangeTextDocument(this.onDidChangeTextDocument, this, []);
  }

  private onDidChangeTextDocument(event: vscode.TextDocumentChangeEvent) {
    const changes = event.contentChanges;
    changes.forEach((change) => {
      const length = change.text.length - change.rangeLength;
      this.charCount += length;
    });
  }

  private startTimer() {
    this.timer = setInterval(() => {
      const elapsedTime = (Date.now() - this.startTime) / 1000 / 60; // 분 단위
      this.wpm = Math.round(this.charCount / 5 / elapsedTime);
      this.updateGame(this.wpm);

      // 리셋
      this.charCount = 0;
      this.startTime = Date.now();
    }, 2000); // 60초마다 업데이트
  }

  private stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  private updateGame(wpm: number) {
    // 게임 로직 업데이트
    GameManager.getInstance().updateGame(wpm);
  }
}
