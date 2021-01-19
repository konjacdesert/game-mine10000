import { CanvasScreen } from "./canvasscreen";
import { MSD2 } from "./ms2";
import { StopWatch } from "./timer";

const Game = (function () {
  let screen: CanvasScreen;
  let mineData: MSD2;
  let stopWatch: StopWatch;

  function start() {
    const width = MSD2.C.columns * MSD2.C.cell.width;
    const height = MSD2.C.rows * MSD2.C.cell.height;
    screen = new CanvasScreen(width, height, (<HTMLCanvasElement>document.getElementById("game")).getContext("2d"));
    mineData = new MSD2();
    stopWatch = new StopWatch(updateTime);
    screen.get("display").canvas.addEventListener("mousedown", mouseDownInMine);
    document.getElementById("reset").addEventListener("click", reset);
    init();
  }
  function init() {
    mineData.clear();
    mineData.drawBase(screen.get("buffer"));
    screen.updateDisp();
    stopWatch.stop();
  }
  function reset(e: MouseEvent) {
    init();
  }
  function mouseDownInMine(e: MouseEvent) {
    // やめとけやめとけ！
    if (mineData.getState() == "stop") return;

    const cellX = ((e.offsetX + 0.5) / MSD2.C.cell.width) | 0;
    const cellY = ((e.offsetY + 0.5) / MSD2.C.cell.height) | 0;
    switch (e.buttons) {
      case 1:
        if (!e.shiftKey) {
          if (mineData.getState() == "start") {
            mineData.setMine(cellX, cellY);
            // 新しいタイマー
            stopWatch.start();
          }
          // console.log("dig");
          dig(cellX, cellY);
          break;
        }
      case 3:
      case 4:
        // console.log("around");
        yoshinani(cellX, cellY);
        break;
      case 2:
        // console.log("flag");
        flag(cellX, cellY);
        break;
    }
    // console.log(mineData.getCellData());

    if ((<HTMLInputElement>document.getElementById("cheat")).checked) mineData.yoshinaniUpdate();

    updateLeft();

    if (mineData.getState() == "stop") {
      // タイマー止める処理
      stopWatch.stop();
      if (mineData.getCellData().left == 0) {
        setTimeout(() => {
          alert("Great work!");
        }, 100);
      }
    }

    mineData.drawUpdate(screen.get("buffer"));
    screen.updateDisp();
  }
  function dig(x: number, y: number) {
    mineData.digLoop(x, y);
  }
  function flag(x: number, y: number) {
    if (mineData.getState() == "ingame") mineData.flipFlag(x, y);
  }
  function yoshinani(x: number, y: number) {
    if (mineData.getState() == "ingame") mineData.yoshinaniDigFlag(x, y);
  }

  function updateLeft() {
    (<HTMLInputElement>document.getElementById("flag")).value = mineData.getCellData().flagLeft.toFixed(0);
  }
  function updateTime() {
    (<HTMLInputElement>document.getElementById("time")).value = stopWatch.getSec().toFixed(0);
  }

  return {
    start: start,
  };
})();

window.addEventListener("load", Game.start);
