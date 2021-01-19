export class MSD2 {
  public static readonly C = {
    rows: 100,
    columns: 100,
    numMine: 1500,
    cell: {
      width: 8,
      height: 8,
    },
    color: {
      close: "#ddd",
      open: "#fff",
      line: "#bbb",
      mine: "#f00",
      flag: "#006",
      near: "#000",
    },
  };
  private static readonly cellBMP = [
    {
      top: 2,
      left: 3,
      bmp: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
      ],
    },
    {
      top: 2,
      left: 4,
      bmp: [[1], [1], [1], [1], [1]],
    },
    {
      top: 2,
      left: 3,
      bmp: [
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
      ],
    },
    {
      top: 2,
      left: 3,
      bmp: [
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1],
      ],
    },
    {
      top: 2,
      left: 3,
      bmp: [
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 1],
      ],
    },
    {
      top: 2,
      left: 3,
      bmp: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1],
      ],
    },
    {
      top: 2,
      left: 3,
      bmp: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
      ],
    },
    {
      top: 2,
      left: 3,
      bmp: [
        [1, 1, 1],
        [1, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
      ],
    },
    {
      top: 2,
      left: 3,
      bmp: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
      ],
    },
    {
      top: 2,
      left: 2,
      bmp: [
        [1, 0, 1, 0, 1],
        [0, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1],
        [1, 0, 1, 0, 1],
      ],
    },
    {
      top: 2,
      left: 2,
      bmp: [
        [1, 1, 1],
        [1, 1, 1],
        [0, 0, 1],
        [0, 1, 1, 1],
        [1, 1, 1, 1, 1],
      ],
    },
  ];

  private data: number[] = [];
  private checked2: number[] = [];
  private drawUpdateList: number[] = [];
  private state: "start" | "ingame" | "stop";

  public getState() {
    return this.state;
  }
  public getCellData() {
    let c = 0,
      f = 0;
    this.checked2.forEach((v, i) => {
      if (v < 0) f++;
      else if (v > 0 && this.data[i] >= 0) c++;
    });
    return {
      flag: f,
      checked: c,
      left: MSD2.C.columns * MSD2.C.rows - MSD2.C.numMine - c,
      flagLeft: MSD2.C.numMine - f,
    };
  }

  constructor() {
    for (let i = 0; i < MSD2.C.columns * MSD2.C.rows; i++) {
      this.data.push(0);
      this.checked2.push(0);
    }
  }
  public clear() {
    // ステート変更
    this.state = "start";

    // 描画更新リスト変更
    this.drawUpdateList = [];
    // フラグ掃除
    for (let i = 0; i < MSD2.C.columns * MSD2.C.rows; i++) this.checked2[i] = 0;
  }
  public setMine(avoidX: number, avoidY: number) {
    this.state = "ingame";

    // マスをきれいに
    for (let i = 0; i < MSD2.C.columns * MSD2.C.rows; i++) this.data[i] = 0;

    // 地雷セット
    let mset = 0;
    while (mset < MSD2.C.numMine) {
      let x = (Math.random() * MSD2.C.columns) | 0;
      let y = (Math.random() * MSD2.C.rows) | 0;

      // よける処理
      if (avoidX - 1 <= x && x <= avoidX + 1 && avoidY - 1 <= y && y <= avoidY + 1) continue;
      // もうあるか
      if (this.getRawData(x, y) >= 0) {
        this.setRawData(x, y, -1);
        this.around(x, y, (nx, ny) => {
          if (this.getRawData(nx, ny) >= 0) this.addRawData(nx, ny, 1);
        });
        mset++;
      }
    }
  }

  private around(x: number, y: number, callback: (nx: number, ny: number) => void) {
    for (let zy = -1; zy <= 1; zy++) {
      for (let zx = -1; zx <= 1; zx++) {
        if (zx == 0 && zy == 0) continue;
        if (this.isRangeOut(x + zx, y + zy)) continue;
        callback(x + zx, y + zy);
      }
    }
  }
  private isRangeOut(x: number, y: number) {
    return x < 0 || x >= MSD2.C.columns || y < 0 || y >= MSD2.C.rows;
  }
  private getRawData(x: number, y: number): number {
    if (this.isRangeOut(x, y)) return 0;
    return this.data[x + y * MSD2.C.columns];
  }
  private setRawData(x: number, y: number, n: number) {
    if (this.isRangeOut(x, y)) return;
    this.data[x + y * MSD2.C.columns] = n;
  }
  private addRawData(x: number, y: number, n: number) {
    if (this.isRangeOut(x, y)) return;
    this.data[x + y * MSD2.C.columns] += n;
  }
  private isOpen(x: number, y: number): boolean {
    if (this.isRangeOut(x, y)) return true;
    return this.checked2[x + y * MSD2.C.columns] > 0;
  }
  private isFlagged(x: number, y: number): boolean {
    if (this.isRangeOut(x, y)) return false;
    return this.checked2[x + y * MSD2.C.columns] < 0;
  }
  private isPlain(x: number, y: number): boolean {
    if (this.isRangeOut(x, y)) return false;
    return this.checked2[x + y * MSD2.C.columns] == 0;
  }
  private setFlag(x: number, y: number, f: boolean): boolean {
    if (this.isOpen(x, y)) return false;
    this.checked2[x + y * MSD2.C.columns] = f ? -1 : 0;
    this.addUpdateList(x, y);
    return true;
  }

  private addUpdateList(x: number, y: number) {
    this.drawUpdateList.push(x + y * MSD2.C.columns);
  }

  private dig(dx: number, dy: number): boolean {
    // console.log("check:", dx, dy);
    if (!this.isPlain(dx, dy)) return false;
    this.checked2[dx + dy * MSD2.C.columns] = 1;
    this.addUpdateList(dx, dy);
    return true;
  }
  public digLoop(dx: number, dy: number) {
    const list: { x: number; y: number }[] = [];
    list.push({ x: dx, y: dy });
    while (list.length > 0) {
      // console.log(list);

      const tmp = list.shift();
      // console.log(tmp.x, tmp.y);

      // 開ける
      if (this.dig(tmp.x, tmp.y) == false) continue;
      // 開けたとこが0だった場合
      if (this.getRawData(tmp.x, tmp.y) == 0) {
        // 周りのマスに対して
        this.around(tmp.x, tmp.y, (nx, ny) => {
          //リストに追加
          list.push({ x: nx, y: ny });
        });
      } else if (this.getRawData(tmp.x, tmp.y) < 0) {
        // 失敗
        this.state = "stop";
      }
    }
    if (this.getCellData().left == 0) {
      this.state = "stop";
    }
  }
  public flipFlag(x: number, y: number) {
    this.setFlag(x, y, !this.isFlagged(x, y));
  }

  public yoshinaniDigFlag(dx: number, dy: number) {
    // フラグは無視
    if (this.isFlagged(dx, dy)) return;

    // 開いていたら
    if (this.isOpen(dx, dy)) {
      const raw = this.getRawData(dx, dy);
      // ニアミスだったら
      if (raw > 0) {
        const left: { x: number; y: number }[] = [];
        const flag: { x: number; y: number }[] = [];
        // 周りのフラグと開いてないマスを調べる
        this.around(dx, dy, (nx, ny) => {
          if (this.isPlain(nx, ny)) left.push({ x: nx, y: ny });
          if (this.isFlagged(nx, ny)) flag.push({ x: nx, y: ny });
        });
        // console.log(raw, left.length, flag.length);

        // 周りの地雷数とフラグの数が同じだったら
        if (raw == flag.length) {
          // 残りのマスを全て開ける
          left.forEach((v) => {
            this.digLoop(v.x, v.y);
          });
        }
        // 周りの地雷数と開いてないマス＋フラグの数が同じだったら
        if (raw == left.length + flag.length) {
          // 残りのマスにフラグを建てる
          left.forEach((v) => {
            this.setFlag(v.x, v.y, true);
          });
        }
      }
    }
  }

  public drawBase(ctx: CanvasRenderingContext2D) {
    // キャンバスきれいに
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = MSD2.C.color.close;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = MSD2.C.color.line;
    for (let x = 0; x < MSD2.C.columns; x++) {
      ctx.fillRect(x * MSD2.C.cell.width, 0, 1, ctx.canvas.height);
    }
    for (let y = 0; y < MSD2.C.rows; y++) {
      ctx.fillRect(0, y * MSD2.C.cell.height, ctx.canvas.width, 1);
    }
  }

  private drawBmp(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
    if (MSD2.cellBMP[s]) {
      x = x + MSD2.cellBMP[s].left;
      y = y + MSD2.cellBMP[s].top;
      const bmp = MSD2.cellBMP[s].bmp;
      bmp.forEach((bmpY, cY) => {
        bmpY.forEach((bmpX, cX) => {
          if (bmpX) ctx.fillRect(x + cX, y + cY, 1, 1);
        });
      });
    }
  }
  public draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // 開いてるか
    if (this.isOpen(x, y)) {
      // 下塗り
      ctx.fillStyle = MSD2.C.color.open;
      ctx.fillRect(
        x * MSD2.C.cell.width + 1,
        y * MSD2.C.cell.height + 1,
        MSD2.C.cell.width - 1,
        MSD2.C.cell.height - 1
      );
      // マーク
      if (this.getRawData(x, y) < 0) {
        // 地雷
        ctx.fillStyle = MSD2.C.color.mine;
        this.drawBmp(ctx, x * MSD2.C.cell.width, y * MSD2.C.cell.height, 9);
      } else if (this.getRawData(x, y) > 0) {
        // ニアミス
        ctx.fillStyle = MSD2.C.color.near;
        this.drawBmp(ctx, x * MSD2.C.cell.width, y * MSD2.C.cell.height, this.getRawData(x, y));
      }
    } else {
      // 下塗り
      ctx.fillStyle = MSD2.C.color.close;
      ctx.fillRect(
        x * MSD2.C.cell.width + 1,
        y * MSD2.C.cell.height + 1,
        MSD2.C.cell.width - 1,
        MSD2.C.cell.height - 1
      );

      // 旗マーク
      if (this.isFlagged(x, y)) {
        ctx.fillStyle = MSD2.C.color.flag;
        this.drawBmp(ctx, x * MSD2.C.cell.width, y * MSD2.C.cell.height, 10);
      }
    }
  }

  public yoshinaniUpdate() {
    for (const i of this.drawUpdateList) {
      const x = i % MSD2.C.columns;
      const y = (i / MSD2.C.columns) | 0;

      this.yoshinaniDigFlag(x, y);
      this.around(x, y, (nx, ny) => {
        this.yoshinaniDigFlag(nx, ny);
      });
    }
  }

  public drawUpdate(ctx: CanvasRenderingContext2D) {
    while (this.drawUpdateList.length > 0) {
      const tmp = this.drawUpdateList.shift();
      const x = tmp % MSD2.C.columns;
      const y = (tmp / MSD2.C.columns) | 0;
      this.draw(ctx, x, y);
    }
  }
  public drawAll(ctx: CanvasRenderingContext2D) {
    for (let y = 0; y < MSD2.C.rows; y++) {
      for (let x = 0; x < MSD2.C.columns; x++) {
        this.draw(ctx, x, y);
      }
    }
  }
}
