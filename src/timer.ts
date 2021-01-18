export class StopWatch {
  private startTime: number;
  private lastTime: number;
  private id: number;
  private tmpSec: number;
  private callback: () => void;

  constructor(c: () => void) {
    this.callback = c;
  }

  public start() {
    this.startTime = performance.now();
    this.lastTime = this.startTime;
    this.tick();
  }
  public stop() {
    cancelAnimationFrame(this.id);
  }
  public getMs() {
    return this.lastTime - this.startTime;
  }
  public getSec() {
    return (this.getMs() / 1000) | 0;
  }
  private tick() {
    this.id = requestAnimationFrame(this.tick.bind(this));
    this.lastTime = performance.now();
    if (this.getSec() != this.tmpSec) {
      this.tmpSec = this.getSec();
      this.callback();
    }
  }
}
