import * as vscode from "vscode";

class TypingTracker {
  private static instance: TypingTracker;

  private charCount: number = 0;
  private startTime: number = Date.now();
  private wpm: number = 0;
  private timer?: NodeJS.Timeout;
  private isTracking: boolean = false;

  private constructor() {}

  public static getInstance(): TypingTracker {
    if (!TypingTracker.instance) {
      TypingTracker.instance = new TypingTracker();
    }
    return TypingTracker.instance;
  }
}
