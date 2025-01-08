(function () {
  const vscode = acquireVsCodeApi();

  // 메시지 처리
  window.addEventListener("message", (event) => {
    const message = event.data;
    switch (message.type) {
      case "update":
        // 몬스터 체력 업데이트
        const healthElement = document.getElementById("monster-health");
        healthElement.textContent = `${message.monster.health}`;

        // 메시지 표시
        if (message.message) {
          const messageElement = document.getElementById("message");
          messageElement.textContent = message.message;
          // 3초 후 메시지 제거
          setTimeout(() => {
            messageElement.textContent = "";
          }, 3000);
        }
        break;
    }
  });
})();
