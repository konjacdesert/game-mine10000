/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/canvasscreen.ts":
/*!*****************************!*\
  !*** ./src/canvasscreen.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CanvasScreen\": () => /* binding */ CanvasScreen\n/* harmony export */ });\nclass CanvasScreen {\r\n    constructor(width, height, context) {\r\n        // コピーor生成\r\n        if (context) {\r\n            this.display = context;\r\n        }\r\n        else {\r\n            this.display = document.createElement(\"canvas\").getContext(\"2d\");\r\n            document.body.appendChild(this.display.canvas);\r\n        }\r\n        // チェック\r\n        width = width <= 0 ? 100 : width;\r\n        height = width <= 0 ? 100 : height;\r\n        // 設定\r\n        this.display.canvas.width = width;\r\n        this.display.canvas.height = height;\r\n        this.display.canvas.oncontextmenu = function () {\r\n            // console.log(\"context\");\r\n            return false;\r\n        };\r\n        this.display.canvas.onclick = function () {\r\n            // console.log(\"click\");\r\n            return false;\r\n        };\r\n        this.display.canvas.onmousedown = function () {\r\n            // console.log(\"down\");\r\n            return false;\r\n        };\r\n        this.display.canvas.onmouseup = function () {\r\n            // console.log(\"up\");\r\n            return false;\r\n        };\r\n        this.display.canvas.ondblclick = function () {\r\n            console.log(\"dbl\");\r\n            return false;\r\n        };\r\n        // バッファ\r\n        this.buffer = document.createElement(\"canvas\").getContext(\"2d\");\r\n        this.buffer.canvas.width = width;\r\n        this.buffer.canvas.height = height;\r\n        this.buffer.imageSmoothingEnabled = false;\r\n        // きれいにしておこうね\r\n        this.clearBuffer();\r\n        this.updateDisp();\r\n    }\r\n    get(select) {\r\n        return select == \"buffer\" ? this.buffer : this.display;\r\n    }\r\n    clearBuffer() {\r\n        this.buffer.resetTransform();\r\n        this.buffer.fillStyle = \"#fff\";\r\n        this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);\r\n    }\r\n    updateDisp() {\r\n        // this.display.resetTransform();\r\n        this.display.drawImage(this.buffer.canvas, 0, 0);\r\n        // this.clearBuffer();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://game-mine10000/./src/canvasscreen.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _canvasscreen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvasscreen */ \"./src/canvasscreen.ts\");\n/* harmony import */ var _ms2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ms2 */ \"./src/ms2.ts\");\n/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./timer */ \"./src/timer.ts\");\n\r\n\r\n\r\nconst Game = (function () {\r\n    let screen;\r\n    let mineData;\r\n    let stopWatch;\r\n    function start() {\r\n        const width = _ms2__WEBPACK_IMPORTED_MODULE_1__.MSD2.C.columns * _ms2__WEBPACK_IMPORTED_MODULE_1__.MSD2.C.cell.width;\r\n        const height = _ms2__WEBPACK_IMPORTED_MODULE_1__.MSD2.C.rows * _ms2__WEBPACK_IMPORTED_MODULE_1__.MSD2.C.cell.height;\r\n        screen = new _canvasscreen__WEBPACK_IMPORTED_MODULE_0__.CanvasScreen(width, height, document.getElementById(\"game\").getContext(\"2d\"));\r\n        mineData = new _ms2__WEBPACK_IMPORTED_MODULE_1__.MSD2();\r\n        stopWatch = new _timer__WEBPACK_IMPORTED_MODULE_2__.StopWatch(updateTime);\r\n        screen.get(\"display\").canvas.addEventListener(\"mousedown\", mouseDownInMine);\r\n        document.getElementById(\"reset\").addEventListener(\"click\", reset);\r\n        init();\r\n    }\r\n    function init() {\r\n        mineData.clear();\r\n        mineData.drawBase(screen.get(\"buffer\"));\r\n        screen.updateDisp();\r\n        stopWatch.stop();\r\n    }\r\n    function reset(e) {\r\n        init();\r\n    }\r\n    function mouseDownInMine(e) {\r\n        // やめとけやめとけ！\r\n        if (mineData.getState() == \"stop\")\r\n            return;\r\n        const cellX = ((e.offsetX + 0.5) / _ms2__WEBPACK_IMPORTED_MODULE_1__.MSD2.C.cell.width) | 0;\r\n        const cellY = ((e.offsetY + 0.5) / _ms2__WEBPACK_IMPORTED_MODULE_1__.MSD2.C.cell.height) | 0;\r\n        switch (e.buttons) {\r\n            case 1:\r\n                if (!e.shiftKey) {\r\n                    if (mineData.getState() == \"start\") {\r\n                        mineData.setMine(cellX, cellY);\r\n                        // 新しいタイマー\r\n                        stopWatch.start();\r\n                    }\r\n                    // console.log(\"dig\");\r\n                    dig(cellX, cellY);\r\n                    break;\r\n                }\r\n            case 3:\r\n            case 4:\r\n                // console.log(\"around\");\r\n                yoshinani(cellX, cellY);\r\n                break;\r\n            case 2:\r\n                // console.log(\"flag\");\r\n                flag(cellX, cellY);\r\n                break;\r\n        }\r\n        // console.log(mineData.getCellData());\r\n        if (document.getElementById(\"cheat\").checked)\r\n            mineData.yoshinaniUpdate();\r\n        updateLeft();\r\n        if (mineData.getState() == \"stop\") {\r\n            // タイマー止める処理\r\n            stopWatch.stop();\r\n            if (mineData.getCellData().left == 0) {\r\n                setTimeout(() => {\r\n                    alert(\"Great work!\");\r\n                }, 100);\r\n            }\r\n        }\r\n        mineData.drawUpdate(screen.get(\"buffer\"));\r\n        screen.updateDisp();\r\n    }\r\n    function dig(x, y) {\r\n        mineData.digLoop(x, y);\r\n    }\r\n    function flag(x, y) {\r\n        if (mineData.getState() == \"ingame\")\r\n            mineData.flipFlag(x, y);\r\n    }\r\n    function yoshinani(x, y) {\r\n        if (mineData.getState() == \"ingame\")\r\n            mineData.yoshinaniDigFlag(x, y);\r\n    }\r\n    function updateLeft() {\r\n        document.getElementById(\"flag\").value = mineData.getCellData().flagLeft.toFixed(0);\r\n    }\r\n    function updateTime() {\r\n        document.getElementById(\"time\").value = stopWatch.getSec().toFixed(0);\r\n    }\r\n    return {\r\n        start: start,\r\n    };\r\n})();\r\nwindow.addEventListener(\"load\", Game.start);\r\n\n\n//# sourceURL=webpack://game-mine10000/./src/index.ts?");

/***/ }),

/***/ "./src/ms2.ts":
/*!********************!*\
  !*** ./src/ms2.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MSD2\": () => /* binding */ MSD2\n/* harmony export */ });\nclass MSD2 {\r\n    constructor() {\r\n        this.data = [];\r\n        this.checked2 = [];\r\n        this.drawUpdateList = [];\r\n        for (let i = 0; i < MSD2.C.columns * MSD2.C.rows; i++) {\r\n            this.data.push(0);\r\n            this.checked2.push(0);\r\n        }\r\n    }\r\n    getState() {\r\n        return this.state;\r\n    }\r\n    getCellData() {\r\n        let c = 0, f = 0;\r\n        this.checked2.forEach((v, i) => {\r\n            if (v < 0)\r\n                f++;\r\n            else if (v > 0 && this.data[i] >= 0)\r\n                c++;\r\n        });\r\n        return {\r\n            flag: f,\r\n            checked: c,\r\n            left: MSD2.C.columns * MSD2.C.rows - MSD2.C.numMine - c,\r\n            flagLeft: MSD2.C.numMine - f,\r\n        };\r\n    }\r\n    clear() {\r\n        // ステート変更\r\n        this.state = \"start\";\r\n        // 描画更新リスト変更\r\n        this.drawUpdateList = [];\r\n        // フラグ掃除\r\n        for (let i = 0; i < MSD2.C.columns * MSD2.C.rows; i++)\r\n            this.checked2[i] = 0;\r\n    }\r\n    setMine(avoidX, avoidY) {\r\n        this.state = \"ingame\";\r\n        // マスをきれいに\r\n        for (let i = 0; i < MSD2.C.columns * MSD2.C.rows; i++)\r\n            this.data[i] = 0;\r\n        // 地雷セット\r\n        let mset = 0;\r\n        while (mset < MSD2.C.numMine) {\r\n            let x = (Math.random() * MSD2.C.columns) | 0;\r\n            let y = (Math.random() * MSD2.C.rows) | 0;\r\n            // よける処理\r\n            if (avoidX - 1 <= x && x <= avoidX + 1 && avoidY - 1 <= y && y <= avoidY + 1)\r\n                continue;\r\n            // もうあるか\r\n            if (this.getRawData(x, y) >= 0) {\r\n                this.setRawData(x, y, -1);\r\n                this.around(x, y, (nx, ny) => {\r\n                    if (this.getRawData(nx, ny) >= 0)\r\n                        this.addRawData(nx, ny, 1);\r\n                });\r\n                mset++;\r\n            }\r\n        }\r\n    }\r\n    around(x, y, callback) {\r\n        for (let zy = -1; zy <= 1; zy++) {\r\n            for (let zx = -1; zx <= 1; zx++) {\r\n                if (zx == 0 && zy == 0)\r\n                    continue;\r\n                if (this.isRangeOut(x + zx, y + zy))\r\n                    continue;\r\n                callback(x + zx, y + zy);\r\n            }\r\n        }\r\n    }\r\n    isRangeOut(x, y) {\r\n        return x < 0 || x >= MSD2.C.columns || y < 0 || y >= MSD2.C.rows;\r\n    }\r\n    getRawData(x, y) {\r\n        if (this.isRangeOut(x, y))\r\n            return 0;\r\n        return this.data[x + y * MSD2.C.columns];\r\n    }\r\n    setRawData(x, y, n) {\r\n        if (this.isRangeOut(x, y))\r\n            return;\r\n        this.data[x + y * MSD2.C.columns] = n;\r\n    }\r\n    addRawData(x, y, n) {\r\n        if (this.isRangeOut(x, y))\r\n            return;\r\n        this.data[x + y * MSD2.C.columns] += n;\r\n    }\r\n    isOpen(x, y) {\r\n        if (this.isRangeOut(x, y))\r\n            return true;\r\n        return this.checked2[x + y * MSD2.C.columns] > 0;\r\n    }\r\n    isFlagged(x, y) {\r\n        if (this.isRangeOut(x, y))\r\n            return false;\r\n        return this.checked2[x + y * MSD2.C.columns] < 0;\r\n    }\r\n    isPlain(x, y) {\r\n        if (this.isRangeOut(x, y))\r\n            return false;\r\n        return this.checked2[x + y * MSD2.C.columns] == 0;\r\n    }\r\n    setFlag(x, y, f) {\r\n        if (this.isOpen(x, y))\r\n            return false;\r\n        this.checked2[x + y * MSD2.C.columns] = f ? -1 : 0;\r\n        this.addUpdateList(x, y);\r\n        return true;\r\n    }\r\n    addUpdateList(x, y) {\r\n        this.drawUpdateList.push(x + y * MSD2.C.columns);\r\n    }\r\n    dig(dx, dy) {\r\n        // console.log(\"check:\", dx, dy);\r\n        if (!this.isPlain(dx, dy))\r\n            return false;\r\n        this.checked2[dx + dy * MSD2.C.columns] = 1;\r\n        this.addUpdateList(dx, dy);\r\n        return true;\r\n    }\r\n    digLoop(dx, dy) {\r\n        const list = [];\r\n        list.push({ x: dx, y: dy });\r\n        while (list.length > 0) {\r\n            // console.log(list);\r\n            const tmp = list.shift();\r\n            // console.log(tmp.x, tmp.y);\r\n            // 開ける\r\n            if (this.dig(tmp.x, tmp.y) == false)\r\n                continue;\r\n            // 開けたとこが0だった場合\r\n            if (this.getRawData(tmp.x, tmp.y) == 0) {\r\n                // 周りのマスに対して\r\n                this.around(tmp.x, tmp.y, (nx, ny) => {\r\n                    //リストに追加\r\n                    list.push({ x: nx, y: ny });\r\n                });\r\n            }\r\n            else if (this.getRawData(tmp.x, tmp.y) < 0) {\r\n                // 失敗\r\n                this.state = \"stop\";\r\n            }\r\n        }\r\n        if (this.getCellData().left == 0) {\r\n            this.state = \"stop\";\r\n        }\r\n    }\r\n    flipFlag(x, y) {\r\n        this.setFlag(x, y, !this.isFlagged(x, y));\r\n    }\r\n    yoshinaniDigFlag(dx, dy) {\r\n        // フラグは無視\r\n        if (this.isFlagged(dx, dy))\r\n            return;\r\n        // 開いていたら\r\n        if (this.isOpen(dx, dy)) {\r\n            const raw = this.getRawData(dx, dy);\r\n            // ニアミスだったら\r\n            if (raw > 0) {\r\n                const left = [];\r\n                const flag = [];\r\n                // 周りのフラグと開いてないマスを調べる\r\n                this.around(dx, dy, (nx, ny) => {\r\n                    if (this.isPlain(nx, ny))\r\n                        left.push({ x: nx, y: ny });\r\n                    if (this.isFlagged(nx, ny))\r\n                        flag.push({ x: nx, y: ny });\r\n                });\r\n                // console.log(raw, left.length, flag.length);\r\n                // 周りの地雷数とフラグの数が同じだったら\r\n                if (raw == flag.length) {\r\n                    // 残りのマスを全て開ける\r\n                    left.forEach((v) => {\r\n                        this.digLoop(v.x, v.y);\r\n                    });\r\n                }\r\n                // 周りの地雷数と開いてないマス＋フラグの数が同じだったら\r\n                if (raw == left.length + flag.length) {\r\n                    // 残りのマスにフラグを建てる\r\n                    left.forEach((v) => {\r\n                        this.setFlag(v.x, v.y, true);\r\n                    });\r\n                }\r\n            }\r\n        }\r\n    }\r\n    drawBase(ctx) {\r\n        // キャンバスきれいに\r\n        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);\r\n        ctx.fillStyle = MSD2.C.color.close;\r\n        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);\r\n        ctx.fillStyle = MSD2.C.color.line;\r\n        for (let x = 0; x < MSD2.C.columns; x++) {\r\n            ctx.fillRect(x * MSD2.C.cell.width, 0, 1, ctx.canvas.height);\r\n        }\r\n        for (let y = 0; y < MSD2.C.rows; y++) {\r\n            ctx.fillRect(0, y * MSD2.C.cell.height, ctx.canvas.width, 1);\r\n        }\r\n    }\r\n    drawBmp(ctx, x, y, s) {\r\n        if (MSD2.cellBMP[s]) {\r\n            x = x + MSD2.cellBMP[s].left;\r\n            y = y + MSD2.cellBMP[s].top;\r\n            const bmp = MSD2.cellBMP[s].bmp;\r\n            bmp.forEach((bmpY, cY) => {\r\n                bmpY.forEach((bmpX, cX) => {\r\n                    if (bmpX)\r\n                        ctx.fillRect(x + cX, y + cY, 1, 1);\r\n                });\r\n            });\r\n        }\r\n    }\r\n    draw(ctx, x, y) {\r\n        // 開いてるか\r\n        if (this.isOpen(x, y)) {\r\n            // 下塗り\r\n            ctx.fillStyle = MSD2.C.color.open;\r\n            ctx.fillRect(x * MSD2.C.cell.width + 1, y * MSD2.C.cell.height + 1, MSD2.C.cell.width - 1, MSD2.C.cell.height - 1);\r\n            // マーク\r\n            if (this.getRawData(x, y) < 0) {\r\n                // 地雷\r\n                ctx.fillStyle = MSD2.C.color.mine;\r\n                this.drawBmp(ctx, x * MSD2.C.cell.width, y * MSD2.C.cell.height, 9);\r\n            }\r\n            else if (this.getRawData(x, y) > 0) {\r\n                // ニアミス\r\n                ctx.fillStyle = MSD2.C.color.near;\r\n                this.drawBmp(ctx, x * MSD2.C.cell.width, y * MSD2.C.cell.height, this.getRawData(x, y));\r\n            }\r\n        }\r\n        else {\r\n            // 下塗り\r\n            ctx.fillStyle = MSD2.C.color.close;\r\n            ctx.fillRect(x * MSD2.C.cell.width + 1, y * MSD2.C.cell.height + 1, MSD2.C.cell.width - 1, MSD2.C.cell.height - 1);\r\n            // 旗マーク\r\n            if (this.isFlagged(x, y)) {\r\n                ctx.fillStyle = MSD2.C.color.flag;\r\n                this.drawBmp(ctx, x * MSD2.C.cell.width, y * MSD2.C.cell.height, 10);\r\n            }\r\n        }\r\n    }\r\n    yoshinaniUpdate() {\r\n        for (const i of this.drawUpdateList) {\r\n            const x = i % MSD2.C.columns;\r\n            const y = (i / MSD2.C.columns) | 0;\r\n            this.yoshinaniDigFlag(x, y);\r\n            this.around(x, y, (nx, ny) => {\r\n                this.yoshinaniDigFlag(nx, ny);\r\n            });\r\n        }\r\n    }\r\n    drawUpdate(ctx) {\r\n        while (this.drawUpdateList.length > 0) {\r\n            const tmp = this.drawUpdateList.shift();\r\n            const x = tmp % MSD2.C.columns;\r\n            const y = (tmp / MSD2.C.columns) | 0;\r\n            this.draw(ctx, x, y);\r\n        }\r\n    }\r\n    drawAll(ctx) {\r\n        for (let y = 0; y < MSD2.C.rows; y++) {\r\n            for (let x = 0; x < MSD2.C.columns; x++) {\r\n                this.draw(ctx, x, y);\r\n            }\r\n        }\r\n    }\r\n}\r\nMSD2.C = {\r\n    rows: 100,\r\n    columns: 100,\r\n    numMine: 1500,\r\n    cell: {\r\n        width: 8,\r\n        height: 8,\r\n    },\r\n    color: {\r\n        close: \"#ddd\",\r\n        open: \"#fff\",\r\n        line: \"#bbb\",\r\n        mine: \"#f00\",\r\n        flag: \"#006\",\r\n        near: \"#000\",\r\n    },\r\n};\r\nMSD2.cellBMP = [\r\n    {\r\n        top: 2,\r\n        left: 3,\r\n        bmp: [\r\n            [1, 1, 1],\r\n            [1, 0, 1],\r\n            [1, 0, 1],\r\n            [1, 0, 1],\r\n            [1, 1, 1],\r\n        ],\r\n    },\r\n    {\r\n        top: 2,\r\n        left: 4,\r\n        bmp: [[1], [1], [1], [1], [1]],\r\n    },\r\n    {\r\n        top: 2,\r\n        left: 3,\r\n        bmp: [\r\n            [1, 1, 1],\r\n            [0, 0, 1],\r\n            [1, 1, 1],\r\n            [1, 0, 0],\r\n            [1, 1, 1],\r\n        ],\r\n    },\r\n    {\r\n        top: 2,\r\n        left: 3,\r\n        bmp: [\r\n            [1, 1, 1],\r\n            [0, 0, 1],\r\n            [1, 1, 1],\r\n            [0, 0, 1],\r\n            [1, 1, 1],\r\n        ],\r\n    },\r\n    {\r\n        top: 2,\r\n        left: 3,\r\n        bmp: [\r\n            [1, 0, 1],\r\n            [1, 0, 1],\r\n            [1, 1, 1],\r\n            [0, 0, 1],\r\n            [0, 0, 1],\r\n        ],\r\n    },\r\n    {\r\n        top: 2,\r\n        left: 3,\r\n        bmp: [\r\n            [1, 1, 1],\r\n            [1, 0, 0],\r\n            [1, 1, 1],\r\n            [0, 0, 1],\r\n            [1, 1, 1],\r\n        ],\r\n    },\r\n    {\r\n        top: 2,\r\n        left: 3,\r\n        bmp: [\r\n            [1, 1, 1],\r\n            [1, 0, 0],\r\n            [1, 1, 1],\r\n            [1, 0, 1],\r\n            [1, 1, 1],\r\n        ],\r\n    },\r\n    {\r\n        top: 2,\r\n        left: 3,\r\n        bmp: [\r\n            [1, 1, 1],\r\n            [1, 0, 1],\r\n            [0, 0, 1],\r\n            [0, 0, 1],\r\n            [0, 0, 1],\r\n        ],\r\n    },\r\n    {\r\n        top: 2,\r\n        left: 3,\r\n        bmp: [\r\n            [1, 1, 1],\r\n            [1, 0, 1],\r\n            [1, 1, 1],\r\n            [1, 0, 1],\r\n            [1, 1, 1],\r\n        ],\r\n    },\r\n    {\r\n        top: 2,\r\n        left: 2,\r\n        bmp: [\r\n            [1, 0, 1, 0, 1],\r\n            [0, 1, 1, 1],\r\n            [1, 1, 1, 1, 1],\r\n            [0, 1, 1, 1],\r\n            [1, 0, 1, 0, 1],\r\n        ],\r\n    },\r\n    {\r\n        top: 2,\r\n        left: 2,\r\n        bmp: [\r\n            [1, 1, 1],\r\n            [1, 1, 1],\r\n            [0, 0, 1],\r\n            [0, 1, 1, 1],\r\n            [1, 1, 1, 1, 1],\r\n        ],\r\n    },\r\n];\r\n\n\n//# sourceURL=webpack://game-mine10000/./src/ms2.ts?");

/***/ }),

/***/ "./src/timer.ts":
/*!**********************!*\
  !*** ./src/timer.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"StopWatch\": () => /* binding */ StopWatch\n/* harmony export */ });\nclass StopWatch {\r\n    constructor(c) {\r\n        this.callback = c;\r\n    }\r\n    start() {\r\n        this.startTime = performance.now();\r\n        this.lastTime = this.startTime;\r\n        this.tick();\r\n    }\r\n    stop() {\r\n        cancelAnimationFrame(this.id);\r\n    }\r\n    getMs() {\r\n        return this.lastTime - this.startTime;\r\n    }\r\n    getSec() {\r\n        return (this.getMs() / 1000) | 0;\r\n    }\r\n    tick() {\r\n        this.id = requestAnimationFrame(this.tick.bind(this));\r\n        this.lastTime = performance.now();\r\n        if (this.getSec() != this.tmpSec) {\r\n            this.tmpSec = this.getSec();\r\n            this.callback();\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://game-mine10000/./src/timer.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;