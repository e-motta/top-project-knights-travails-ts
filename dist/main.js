/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/board.ts":
/*!**********************!*\
  !*** ./src/board.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _square__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./square */ "./src/square.ts");

var Board = function () {
    var createBoard = function () {
        var squares = [];
        for (var i = 0; i < 8; i += 1) {
            for (var j = 0; j < 8; j += 1) {
                squares.push((0,_square__WEBPACK_IMPORTED_MODULE_0__["default"])(i, j));
            }
        }
        return squares;
    };
    var squares = createBoard();
    var findSquareByCoord = function (coord) {
        return squares.find(function (n) { return JSON.stringify(n.coord) === JSON.stringify(coord); });
    };
    return { squares: squares, findSquareByCoord: findSquareByCoord };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Board);


/***/ }),

/***/ "./src/knight.ts":
/*!***********************!*\
  !*** ./src/knight.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};

var Knight = function (board) {
    var createParentRelations = function (originCoord, targetCoord, queue) {
        if (queue === void 0) { queue = []; }
        var originSquare = board.findSquareByCoord(originCoord);
        if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.includesArr)(originSquare.leaves, targetCoord)) {
            queue.length = 0;
            var targetSquare = board.findSquareByCoord(targetCoord);
            targetSquare.parent = originSquare;
            return null;
        }
        originSquare.leaves.forEach(function (coord) {
            queue.push(coord);
            var square = board.findSquareByCoord(coord);
            if (square.parent === null)
                square.parent = originSquare;
        });
        if (queue.length > 0) {
            createParentRelations(queue.shift(), targetCoord, queue);
        }
    };
    var traverseParentRelations = function (originCoord, targetCoord, path) {
        if (path === void 0) { path = []; }
        var originSquare = board.findSquareByCoord(originCoord);
        var targetSquare = board.findSquareByCoord(targetCoord);
        path.unshift(targetCoord);
        if (targetSquare.parent === originSquare) {
            return path;
        }
        return traverseParentRelations(originCoord, targetSquare.parent.coord, path);
    };
    var clearParentRelations = function () {
        board.squares.forEach(function (square) { return (square.parent = null); });
    };
    var getShortestPath = function (originCoord, targetCoord) {
        if (originCoord.some(function (n) { return n < 0 || n > 7; }) ||
            targetCoord.some(function (n) { return n < 0 || n > 7; })) {
            throw RangeError("Coordinates must be between 0 and 7.");
        }
        createParentRelations(originCoord, targetCoord);
        var path = traverseParentRelations(originCoord, targetCoord);
        clearParentRelations();
        return __spreadArray([originCoord], path, true);
    };
    var knightMoves = function (originCoord, targetCoord) {
        var path = getShortestPath(originCoord, targetCoord);
        console.log("=> You made it in ".concat(path.length - 1, " moves!  Here's your path:"));
        path.forEach(function (step) { return console.log(step); });
    };
    return { getShortestPath: getShortestPath, knightMoves: knightMoves };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Knight);


/***/ }),

/***/ "./src/square.ts":
/*!***********************!*\
  !*** ./src/square.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Square = function (i, j) {
    var coord = [i, j];
    var leaves = [
        i - 1 >= 0 && j - 2 >= 0 ? [i - 1, j - 2] : null,
        i - 2 >= 0 && j - 1 >= 0 ? [i - 2, j - 1] : null,
        i - 1 >= 0 && j + 2 <= 7 ? [i - 1, j + 2] : null,
        i + 2 <= 7 && j - 1 >= 0 ? [i + 2, j - 1] : null,
        i - 2 >= 0 && j + 1 <= 7 ? [i - 2, j + 1] : null,
        i + 1 <= 7 && j - 2 >= 0 ? [i + 1, j - 2] : null,
        i + 2 <= 7 && j + 1 <= 7 ? [i + 2, j + 1] : null,
        i + 1 <= 7 && j + 2 <= 7 ? [i + 1, j + 2] : null,
    ].filter(function (n) { return n; });
    var parent = null;
    return { coord: coord, leaves: leaves, parent: parent };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Square);


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "includesArr": () => (/* binding */ includesArr)
/* harmony export */ });
/**
 * Determines whether outArr includes inArr.
 * Works for any type except 'undefined'.
 */
var includesArr = function (outArr, inArr) {
    return outArr.map(function (el) { return JSON.stringify(el); }).includes(JSON.stringify(inArr));
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./src/board.ts");
/* harmony import */ var _knight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./knight */ "./src/knight.ts");


// Example
var board = (0,_board__WEBPACK_IMPORTED_MODULE_0__["default"])();
var knight = (0,_knight__WEBPACK_IMPORTED_MODULE_1__["default"])(board);
knight.knightMoves([0, 0], [5, 7]);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBakIsQ0FBaUIsQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQztJQUVGLE9BQU8sRUFBRSxlQUFlLG1CQUFFLFdBQVcsZUFBRSxDQUFDO0FBQzFDLENBQUMsQ0FBQztBQUVGLGlFQUFlLE1BQU0sRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDcEZ0QixJQUFNLE1BQU0sR0FBRyxVQUFDLENBQVMsRUFBRSxDQUFTO0lBQ2xDLElBQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXJCLElBQU0sTUFBTSxHQUFHO1FBQ2IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFDaEQsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFDaEQsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFDaEQsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFDaEQsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFDaEQsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFDaEQsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFDaEQsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7S0FDakQsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLElBQUssUUFBQyxFQUFELENBQUMsQ0FBQyxDQUFDO0lBRW5CLElBQU0sTUFBTSxHQUFrQixJQUFJLENBQUM7SUFFbkMsT0FBTyxFQUFFLEtBQUssU0FBRSxNQUFNLFVBQUUsTUFBTSxVQUFFLENBQUM7QUFDbkMsQ0FBQyxDQUFDO0FBRUYsaUVBQWUsTUFBTSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUN6QnRCOzs7R0FHRztBQUNILElBQU0sV0FBVyxHQUFHLFVBQUMsTUFBYSxFQUFFLEtBQVk7SUFDOUMsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsRUFBRSxJQUFLLFdBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ2hGLENBQUMsQ0FBQztBQUVxQjs7Ozs7OztVQ1J2QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ040QjtBQUNFO0FBRTlCLFVBQVU7QUFDVixJQUFNLEtBQUssR0FBRyxrREFBSyxFQUFFLENBQUM7QUFDdEIsSUFBTSxNQUFNLEdBQUcsbURBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM3QixNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtcHJvamVjdC1rbmlnaHRzLXRyYXZhaWxzLXRzLy4vc3JjL2JvYXJkLnRzIiwid2VicGFjazovL3RvcC1wcm9qZWN0LWtuaWdodHMtdHJhdmFpbHMtdHMvLi9zcmMva25pZ2h0LnRzIiwid2VicGFjazovL3RvcC1wcm9qZWN0LWtuaWdodHMtdHJhdmFpbHMtdHMvLi9zcmMvc3F1YXJlLnRzIiwid2VicGFjazovL3RvcC1wcm9qZWN0LWtuaWdodHMtdHJhdmFpbHMtdHMvLi9zcmMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vdG9wLXByb2plY3Qta25pZ2h0cy10cmF2YWlscy10cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b3AtcHJvamVjdC1rbmlnaHRzLXRyYXZhaWxzLXRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b3AtcHJvamVjdC1rbmlnaHRzLXRyYXZhaWxzLXRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9wLXByb2plY3Qta25pZ2h0cy10cmF2YWlscy10cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvcC1wcm9qZWN0LWtuaWdodHMtdHJhdmFpbHMtdHMvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNxdWFyZSBmcm9tIFwiLi9zcXVhcmVcIjtcblxuaW50ZXJmYWNlIEJvYXJkIHtcbiAgc3F1YXJlczogU3F1YXJlW107XG4gIGZpbmRTcXVhcmVCeUNvb3JkOiAoY29vcmQ6IG51bWJlcltdKSA9PiBTcXVhcmU7XG59XG5cbmNvbnN0IEJvYXJkID0gKCk6IEJvYXJkID0+IHtcbiAgY29uc3QgY3JlYXRlQm9hcmQgPSAoKTogU3F1YXJlW10gPT4ge1xuICAgIGNvbnN0IHNxdWFyZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqICs9IDEpIHtcbiAgICAgICAgc3F1YXJlcy5wdXNoKFNxdWFyZShpLCBqKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzcXVhcmVzO1xuICB9O1xuXG4gIGNvbnN0IHNxdWFyZXMgPSBjcmVhdGVCb2FyZCgpO1xuXG4gIGNvbnN0IGZpbmRTcXVhcmVCeUNvb3JkID0gKGNvb3JkOiBudW1iZXJbXSkgPT5cbiAgICBzcXVhcmVzLmZpbmQoKG4pID0+IEpTT04uc3RyaW5naWZ5KG4uY29vcmQpID09PSBKU09OLnN0cmluZ2lmeShjb29yZCkpO1xuXG4gIHJldHVybiB7IHNxdWFyZXMsIGZpbmRTcXVhcmVCeUNvb3JkIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBCb2FyZDtcbiIsImltcG9ydCBTcXVhcmUgZnJvbSBcIi4vc3F1YXJlXCI7XG5pbXBvcnQgQm9hcmQgZnJvbSBcIi4vYm9hcmRcIjtcbmltcG9ydCB7IGluY2x1ZGVzQXJyIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuaW50ZXJmYWNlIEtuaWdodCB7XG4gIGdldFNob3J0ZXN0UGF0aDogKG9yaWdpbkNvb3JkOiBudW1iZXJbXSwgdGFyZ2V0Q29vcmQ6IG51bWJlcltdKSA9PiBudW1iZXJbXVtdO1xuICBrbmlnaHRNb3ZlczogKG9yaWdpbkNvb3JkOiBudW1iZXJbXSwgdGFyZ2V0Q29vcmQ6IG51bWJlcltdKSA9PiB2b2lkO1xufVxuXG5jb25zdCBLbmlnaHQgPSAoYm9hcmQ6IEJvYXJkKTogS25pZ2h0ID0+IHtcbiAgY29uc3QgY3JlYXRlUGFyZW50UmVsYXRpb25zID0gKFxuICAgIG9yaWdpbkNvb3JkOiBudW1iZXJbXSxcbiAgICB0YXJnZXRDb29yZDogbnVtYmVyW10sXG4gICAgcXVldWU6IG51bWJlcltdW10gPSBbXVxuICApOiBudW1iZXJbXVtdID0+IHtcbiAgICBjb25zdCBvcmlnaW5TcXVhcmU6IFNxdWFyZSA9IGJvYXJkLmZpbmRTcXVhcmVCeUNvb3JkKG9yaWdpbkNvb3JkKTtcblxuICAgIGlmIChpbmNsdWRlc0FycihvcmlnaW5TcXVhcmUubGVhdmVzLCB0YXJnZXRDb29yZCkpIHtcbiAgICAgIHF1ZXVlLmxlbmd0aCA9IDA7XG5cbiAgICAgIGNvbnN0IHRhcmdldFNxdWFyZTogU3F1YXJlID0gYm9hcmQuZmluZFNxdWFyZUJ5Q29vcmQodGFyZ2V0Q29vcmQpO1xuICAgICAgdGFyZ2V0U3F1YXJlLnBhcmVudCA9IG9yaWdpblNxdWFyZTtcblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgb3JpZ2luU3F1YXJlLmxlYXZlcy5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgcXVldWUucHVzaChjb29yZCk7XG4gICAgICBjb25zdCBzcXVhcmUgPSBib2FyZC5maW5kU3F1YXJlQnlDb29yZChjb29yZCk7XG4gICAgICBpZiAoc3F1YXJlLnBhcmVudCA9PT0gbnVsbCkgc3F1YXJlLnBhcmVudCA9IG9yaWdpblNxdWFyZTtcbiAgICB9KTtcblxuICAgIGlmIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBjcmVhdGVQYXJlbnRSZWxhdGlvbnMocXVldWUuc2hpZnQoKSwgdGFyZ2V0Q29vcmQsIHF1ZXVlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdHJhdmVyc2VQYXJlbnRSZWxhdGlvbnMgPSAoXG4gICAgb3JpZ2luQ29vcmQ6IG51bWJlcltdLFxuICAgIHRhcmdldENvb3JkOiBudW1iZXJbXSxcbiAgICBwYXRoOiBudW1iZXJbXVtdID0gW11cbiAgKTogbnVtYmVyW11bXSA9PiB7XG4gICAgY29uc3Qgb3JpZ2luU3F1YXJlOiBTcXVhcmUgPSBib2FyZC5maW5kU3F1YXJlQnlDb29yZChvcmlnaW5Db29yZCk7XG4gICAgY29uc3QgdGFyZ2V0U3F1YXJlOiBTcXVhcmUgPSBib2FyZC5maW5kU3F1YXJlQnlDb29yZCh0YXJnZXRDb29yZCk7XG5cbiAgICBwYXRoLnVuc2hpZnQodGFyZ2V0Q29vcmQpO1xuXG4gICAgaWYgKHRhcmdldFNxdWFyZS5wYXJlbnQgPT09IG9yaWdpblNxdWFyZSkge1xuICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyYXZlcnNlUGFyZW50UmVsYXRpb25zKFxuICAgICAgb3JpZ2luQ29vcmQsXG4gICAgICB0YXJnZXRTcXVhcmUucGFyZW50LmNvb3JkLFxuICAgICAgcGF0aFxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgY2xlYXJQYXJlbnRSZWxhdGlvbnMgPSAoKTogdm9pZCA9PiB7XG4gICAgYm9hcmQuc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IChzcXVhcmUucGFyZW50ID0gbnVsbCkpO1xuICB9O1xuXG4gIGNvbnN0IGdldFNob3J0ZXN0UGF0aCA9IChvcmlnaW5Db29yZDogbnVtYmVyW10sIHRhcmdldENvb3JkOiBudW1iZXJbXSkgPT4ge1xuICAgIGlmIChcbiAgICAgIG9yaWdpbkNvb3JkLnNvbWUoKG4pID0+IG4gPCAwIHx8IG4gPiA3KSB8fFxuICAgICAgdGFyZ2V0Q29vcmQuc29tZSgobikgPT4gbiA8IDAgfHwgbiA+IDcpXG4gICAgKSB7XG4gICAgICB0aHJvdyBSYW5nZUVycm9yKFwiQ29vcmRpbmF0ZXMgbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDcuXCIpO1xuICAgIH1cblxuICAgIGNyZWF0ZVBhcmVudFJlbGF0aW9ucyhvcmlnaW5Db29yZCwgdGFyZ2V0Q29vcmQpO1xuXG4gICAgY29uc3QgcGF0aDogbnVtYmVyW11bXSA9IHRyYXZlcnNlUGFyZW50UmVsYXRpb25zKG9yaWdpbkNvb3JkLCB0YXJnZXRDb29yZCk7XG5cbiAgICBjbGVhclBhcmVudFJlbGF0aW9ucygpO1xuXG4gICAgcmV0dXJuIFtvcmlnaW5Db29yZCwgLi4ucGF0aF07XG4gIH07XG5cbiAgY29uc3Qga25pZ2h0TW92ZXMgPSAob3JpZ2luQ29vcmQ6IG51bWJlcltdLCB0YXJnZXRDb29yZDogbnVtYmVyW10pOiB2b2lkID0+IHtcbiAgICBjb25zdCBwYXRoID0gZ2V0U2hvcnRlc3RQYXRoKG9yaWdpbkNvb3JkLCB0YXJnZXRDb29yZCk7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgPT4gWW91IG1hZGUgaXQgaW4gJHtwYXRoLmxlbmd0aCAtIDF9IG1vdmVzISAgSGVyZSdzIHlvdXIgcGF0aDpgXG4gICAgKTtcbiAgICBwYXRoLmZvckVhY2goKHN0ZXApID0+IGNvbnNvbGUubG9nKHN0ZXApKTtcbiAgfTtcblxuICByZXR1cm4geyBnZXRTaG9ydGVzdFBhdGgsIGtuaWdodE1vdmVzIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBLbmlnaHQ7XG4iLCJpbnRlcmZhY2UgU3F1YXJlIHtcbiAgY29vcmQ6IG51bWJlcltdO1xuICBsZWF2ZXM6IG51bWJlcltdW107XG4gIHBhcmVudDogbnVsbCB8IFNxdWFyZTtcbn1cblxuY29uc3QgU3F1YXJlID0gKGk6IG51bWJlciwgajogbnVtYmVyKTogU3F1YXJlID0+IHtcbiAgY29uc3QgY29vcmQgPSBbaSwgal07XG5cbiAgY29uc3QgbGVhdmVzID0gW1xuICAgIGkgLSAxID49IDAgJiYgaiAtIDIgPj0gMCA/IFtpIC0gMSwgaiAtIDJdIDogbnVsbCxcbiAgICBpIC0gMiA+PSAwICYmIGogLSAxID49IDAgPyBbaSAtIDIsIGogLSAxXSA6IG51bGwsXG4gICAgaSAtIDEgPj0gMCAmJiBqICsgMiA8PSA3ID8gW2kgLSAxLCBqICsgMl0gOiBudWxsLFxuICAgIGkgKyAyIDw9IDcgJiYgaiAtIDEgPj0gMCA/IFtpICsgMiwgaiAtIDFdIDogbnVsbCxcbiAgICBpIC0gMiA+PSAwICYmIGogKyAxIDw9IDcgPyBbaSAtIDIsIGogKyAxXSA6IG51bGwsXG4gICAgaSArIDEgPD0gNyAmJiBqIC0gMiA+PSAwID8gW2kgKyAxLCBqIC0gMl0gOiBudWxsLFxuICAgIGkgKyAyIDw9IDcgJiYgaiArIDEgPD0gNyA/IFtpICsgMiwgaiArIDFdIDogbnVsbCxcbiAgICBpICsgMSA8PSA3ICYmIGogKyAyIDw9IDcgPyBbaSArIDEsIGogKyAyXSA6IG51bGwsXG4gIF0uZmlsdGVyKChuKSA9PiBuKTtcblxuICBjb25zdCBwYXJlbnQ6IG51bGwgfCBTcXVhcmUgPSBudWxsO1xuXG4gIHJldHVybiB7IGNvb3JkLCBsZWF2ZXMsIHBhcmVudCB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU3F1YXJlO1xuIiwiLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3V0QXJyIGluY2x1ZGVzIGluQXJyLlxuICogV29ya3MgZm9yIGFueSB0eXBlIGV4Y2VwdCAndW5kZWZpbmVkJy5cbiAqL1xuY29uc3QgaW5jbHVkZXNBcnIgPSAob3V0QXJyOiBhbnlbXSwgaW5BcnI6IGFueVtdKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiBvdXRBcnIubWFwKChlbCkgPT4gSlNPTi5zdHJpbmdpZnkoZWwpKS5pbmNsdWRlcyhKU09OLnN0cmluZ2lmeShpbkFycikpO1xufTtcblxuZXhwb3J0IHsgaW5jbHVkZXNBcnIgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEJvYXJkIGZyb20gXCIuL2JvYXJkXCI7XG5pbXBvcnQgS25pZ2h0IGZyb20gXCIuL2tuaWdodFwiO1xuXG4vLyBFeGFtcGxlXG5jb25zdCBib2FyZCA9IEJvYXJkKCk7XG5jb25zdCBrbmlnaHQgPSBLbmlnaHQoYm9hcmQpO1xua25pZ2h0LmtuaWdodE1vdmVzKFswLCAwXSwgWzUsIDddKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==