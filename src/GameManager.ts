import * as vscode from "vscode";

export default class GameManager {
  private static instance: GameManager;
  private currentRound: GameRound = this.generateRound(0);
  private webviewView?: vscode.WebviewView;
  private currentRoundNumber: number = 1;

  private constructor() {}

  public static getInstance(): GameManager {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }
    return GameManager.instance;
  }

  public setWebviewView(view: vscode.WebviewView) {
    this.webviewView = view;
    this.sendMonsterUpdate();
  }

  public updateGame(wpm: number) {
    this.currentRound.health -= wpm;
    let message = `-${wpm}`;
    if (this.currentRound.health <= 0) {
      message += `\nYou defeated the Monster in Round ${this.currentRound.roundNumber}!`;
      // 라운드 번호 증가
      this.currentRoundNumber++;
      this.currentRound = this.generateRound(this.currentRoundNumber);
      message += `\nRound ${this.currentRound.roundNumber} Started!`;
    }
    this.sendMonsterUpdate(message);
  }

  private sendMonsterUpdate(message?: string) {
    if (this.webviewView) {
      this.webviewView.webview.postMessage({
        type: "update",
        monster: this.currentRound,
        message: message || "",
      });
    }
  }

  private generateRound(prevRound: number): GameRound {
    return { roundNumber: prevRound + 1, health: (prevRound + 1) * 1000 };
  }
}

interface GameRound {
  roundNumber: number;
  health: number;
}
