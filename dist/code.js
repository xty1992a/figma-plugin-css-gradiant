/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/applyMatrixToPoint.js":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/applyMatrixToPoint.js ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.applyMatrixToPoint = applyMatrixToPoint;

function applyMatrixToPoint(matrix, point) {
  return [point[0] * matrix[0][0] + point[1] * matrix[0][1] + matrix[0][2], point[0] * matrix[1][0] + point[1] * matrix[1][1] + matrix[1][2]];
}

/***/ }),

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/clone.js":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/clone.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = clone;

/**
 *  this function returns clone the object
 */
function clone(val) {
  const type = typeof val;

  if (type === 'undefined' || type === 'number' || type === 'string' || type === 'boolean' || type === 'symbol' || val === null) {
    return val;
  } else if (type === 'object') {
    if (val instanceof Array) {
      return val.map(clone);
    } else if (val instanceof Uint8Array) {
      return new Uint8Array(val);
    } else {
      const o = {};

      for (const key in val) {
        o[key] = clone(val[key]);
      }

      return o;
    }
  }

  throw 'unknown';
}

/***/ }),

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/convertColor.js":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/convertColor.js ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.figmaRGBToWebRGB = figmaRGBToWebRGB;
exports.webRGBToFigmaRGB = webRGBToFigmaRGB;
exports.figmaRGBToHex = figmaRGBToHex;
exports.hexToFigmaRGB = hexToFigmaRGB;
const namesRGB = ['r', 'g', 'b'];
/**
 * this function converts figma color to RGB(A) (array)
 */
// figmaRGBToWebRGB({r: 0.887499988079071, g: 0.07058823853731155, b: 0.0665624737739563})
//=> [226, 18, 17]

function figmaRGBToWebRGB(color) {
  const rgb = [];
  namesRGB.forEach((e, i) => {
    rgb[i] = Math.round(color[e] * 255);
  });
  if (color['a'] !== undefined) rgb[3] = Math.round(color['a'] * 100) / 100;
  return rgb;
}
/**
 * this function converts RGB(A) color (array) to figma color
 */
// webRGBToFigmaRGB([226, 18, 17])
//=> {r: 0.8862745098039215, g: 0.07058823529411765, b: 0.06666666666666667}


function webRGBToFigmaRGB(color) {
  const rgb = {};
  namesRGB.forEach((e, i) => {
    rgb[e] = color[i] / 255;
  });
  if (color[3] !== undefined) rgb['a'] = color[3];
  return rgb;
}
/**
 * this function converts figma color to HEX (string)
 */
// figmaRGBToHex({ r: 0, g: 0.1, b: 1 })
//=> #001aff


function figmaRGBToHex(color) {
  let hex = '#';
  const rgb = figmaRGBToWebRGB(color);
  hex += ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);

  if (rgb[3] !== undefined) {
    const a = Math.round(rgb[3] * 255).toString(16);

    if (a.length == 1) {
      hex += '0' + a;
    } else {
      if (a !== 'ff') hex += a;
    }
  }

  return hex;
}
/**
 * this function converts HEX color (string) to figma color
 */
// hexToFigmaRGB(#001aff)
//=> { r: 0, g: 0.10196078431372549, b: 1 }


function hexToFigmaRGB(color) {
  let opacity = '';
  color = color.toLowerCase();
  if (color[0] === '#') color = color.slice(1);

  if (color.length === 3) {
    color = color.replace(/(.)(.)(.)?/g, '$1$1$2$2$3$3');
  } else if (color.length === 8) {
    const arr = color.match(/(.{6})(.{2})/);
    color = arr[1];
    opacity = arr[2];
  }

  const num = parseInt(color, 16);
  const rgb = [num >> 16, num >> 8 & 255, num & 255];

  if (opacity) {
    rgb.push(parseInt(opacity, 16) / 255);
    return webRGBToFigmaRGB(rgb);
  } else {
    return webRGBToFigmaRGB(rgb);
  }
}

/***/ }),

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/extractImageCropParams.js":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/extractImageCropParams.js ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.extractImageCropParams = extractImageCropParams;

var _matrixInverse = _interopRequireDefault(__webpack_require__(/*! matrix-inverse */ "./node_modules/.pnpm/matrix-inverse@1.0.1/node_modules/matrix-inverse/matrix-inverse.js"));

var _applyMatrixToPoint = __webpack_require__(/*! ./applyMatrixToPoint */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/applyMatrixToPoint.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This method can extract the image crop rotation, scale (/size) and position.
 *
 * @param shapeWidth
 * @param shapeHeight
 * @param t
 */
function extractImageCropParams(shapeWidth, shapeHeight, t) {
  const transform = t.length === 2 ? [...t, [0, 0, 1]] : [...t];
  const mxInv = (0, _matrixInverse.default)(transform);
  const points = [[0, 0], [1, 0], [1, 1], [0, 1]].map(p => (0, _applyMatrixToPoint.applyMatrixToPoint)(mxInv, p));
  const angle = Math.atan2(points[1][1] - points[0][1], points[1][0] - points[0][0]);
  const sx = Math.sqrt(Math.pow(points[1][0] - points[0][0], 2) + Math.pow(points[1][1] - points[0][1], 2));
  const sy = Math.sqrt(Math.pow(points[2][0] - points[1][0], 2) + Math.pow(points[2][1] - points[1][1], 2));
  return {
    rotation: angle * (180 / Math.PI),
    scale: [sx, sy],
    size: [sx * shapeWidth, sy * shapeHeight],
    position: [-points[0][0] * shapeWidth, -points[0][1] * shapeHeight]
  };
}

/***/ }),

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/extractLinearGradientStartEnd.js":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/extractLinearGradientStartEnd.js ***!
  \******************************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.extractLinearGradientParamsFromTransform = extractLinearGradientParamsFromTransform;

var _matrixInverse = _interopRequireDefault(__webpack_require__(/*! matrix-inverse */ "./node_modules/.pnpm/matrix-inverse@1.0.1/node_modules/matrix-inverse/matrix-inverse.js"));

var _applyMatrixToPoint = __webpack_require__(/*! ./applyMatrixToPoint */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/applyMatrixToPoint.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This method can extract the x and y positions of the start and end of the linear gradient
 * (scale is not important here)
 *
 * @param shapeWidth number
 * @param shapeHeight number
 * @param t Transform
 */
function extractLinearGradientParamsFromTransform(shapeWidth, shapeHeight, t) {
  const transform = t.length === 2 ? [...t, [0, 0, 1]] : [...t];
  const mxInv = (0, _matrixInverse.default)(transform);
  const startEnd = [[0, 0.5], [1, 0.5]].map(p => (0, _applyMatrixToPoint.applyMatrixToPoint)(mxInv, p));
  return {
    start: [startEnd[0][0] * shapeWidth, startEnd[0][1] * shapeHeight],
    end: [startEnd[1][0] * shapeWidth, startEnd[1][1] * shapeHeight]
  };
}

/***/ }),

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/extractRadialOrDiamondGradientParams.js":
/*!*************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/extractRadialOrDiamondGradientParams.js ***!
  \*************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.extractRadialOrDiamondGradientParams = extractRadialOrDiamondGradientParams;

var _matrixInverse = _interopRequireDefault(__webpack_require__(/*! matrix-inverse */ "./node_modules/.pnpm/matrix-inverse@1.0.1/node_modules/matrix-inverse/matrix-inverse.js"));

var _applyMatrixToPoint = __webpack_require__(/*! ./applyMatrixToPoint */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/applyMatrixToPoint.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This method can extract the rotation (in degrees), center point and radius for a radial or diamond gradient
 *
 * @param shapeWidth
 * @param shapeHeight
 * @param t
 */
function extractRadialOrDiamondGradientParams(shapeWidth, shapeHeight, t) {
  const transform = t.length === 2 ? [...t, [0, 0, 1]] : [...t];
  const mxInv = (0, _matrixInverse.default)(transform);
  const centerPoint = (0, _applyMatrixToPoint.applyMatrixToPoint)(mxInv, [0.5, 0.5]);
  const rxPoint = (0, _applyMatrixToPoint.applyMatrixToPoint)(mxInv, [1, 0.5]);
  const ryPoint = (0, _applyMatrixToPoint.applyMatrixToPoint)(mxInv, [0.5, 1]);
  const rx = Math.sqrt(Math.pow(rxPoint[0] - centerPoint[0], 2) + Math.pow(rxPoint[1] - centerPoint[1], 2));
  const ry = Math.sqrt(Math.pow(ryPoint[0] - centerPoint[0], 2) + Math.pow(ryPoint[1] - centerPoint[1], 2));
  const angle = Math.atan((rxPoint[1] - centerPoint[1]) / (rxPoint[0] - centerPoint[0])) * (180 / Math.PI);
  return {
    rotation: angle,
    center: [centerPoint[0] * shapeWidth, centerPoint[1] * shapeHeight],
    radius: [rx * shapeWidth, ry * shapeHeight]
  };
}

/***/ }),

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/findMethods.js":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/findMethods.js ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.findAll = void 0;

var _ = __webpack_require__(/*! .. */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/index.js");

/**
 * Custom implementation of the figma.findAll method, which runs x1000 times faster.
 *
 * ### Usage example
 * ```ts
 * import { findAll, isTextNode } from "@figma-plugin/helpers"
 *
 * const textNodes = findAll(figma.currentPage.children, isTextNode)
 * ```
 *
 * ### How to replace native `figma.findAll`
 * ```diff
 * + import { findAll } from "@figma-plugin/helpers"
 *
 * - const textNodes = figma.currentPage.findAll((node) => node.type === "TEXT");
 * + const textNodes = findAll(figma.currentPage.children, (node) => node.type === "TEXT")
 * ```
 */
const findAll = (nodes, iteratee) => {
  const result = [];

  for (let i = 0; i < nodes.length; i++) {
    if (iteratee(nodes[i], i, nodes)) {
      result.push(nodes[i]);
    } else if ((0, _.hasChildren)(nodes[i])) {
      result.push(...findAll(nodes[i]['children'], iteratee));
    }
  }

  return result;
};

exports.findAll = findAll;

/***/ }),

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/getAllFonts.js":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/getAllFonts.js ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = getAllFonts;

/**
 * this function returns all used fonts to textNodes
 */
function getAllFonts(textNodes) {
  const fonts = [];

  const pushUnique = font => {
    if (!fonts.some(item => item.family === font.family && item.style === font.style)) {
      fonts.push(font);
    }
  };

  for (const node of textNodes) {
    if (node.fontName === figma.mixed) {
      const len = node.characters.length;

      for (let i = 0; i < len; i++) {
        const font = node.getRangeFontName(i, i + 1);
        pushUnique(font);
      }
    } else {
      pushUnique(node.fontName);
    }
  }

  return fonts;
}

/***/ }),

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/getBoundingRect.js":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/getBoundingRect.js ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = getBoundingRect;

var _isUndefined2 = _interopRequireDefault(__webpack_require__(/*! lodash/isUndefined */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isUndefined.js"));

var _applyMatrixToPoint = __webpack_require__(/*! ./applyMatrixToPoint */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/applyMatrixToPoint.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  this function return a bounding rect for an nodes
 */
// x/y absolute coordinates
// height/width
// x2/y2 bottom right coordinates
function getBoundingRect(nodes) {
  const boundingRect = {
    x: 0,
    y: 0,
    x2: 0,
    y2: 0,
    height: 0,
    width: 0
  };

  if (nodes.length) {
    const xy = nodes.reduce((rez, node) => {
      if (!node.absoluteTransform) {
        console.warn('Provided node haven\'t "absoluteTransform" property, but it\'s required for calculations.');
        return rez;
      }

      if ((0, _isUndefined2.default)(node.height) || (0, _isUndefined2.default)(node.width)) {
        console.warn('Provided node haven\'t "width/height" property, but it\'s required for calculations.');
        return rez;
      }

      const halfHeight = node.height / 2;
      const halfWidth = node.width / 2;
      const [[c0, s0, x], [s1, c1, y]] = node.absoluteTransform;
      const matrix = [[c0, s0, x + halfWidth * c0 + halfHeight * s0], [s1, c1, y + halfWidth * s1 + halfHeight * c1]]; // the coordinates of the corners of the rectangle

      const XY = {
        x: [1, -1, 1, -1],
        y: [1, -1, -1, 1]
      }; // fill in

      for (let i = 0; i <= 3; i++) {
        const a = (0, _applyMatrixToPoint.applyMatrixToPoint)(matrix, [XY.x[i] * halfWidth, XY.y[i] * halfHeight]);
        XY.x[i] = a[0];
        XY.y[i] = a[1];
      }

      XY.x.sort((a, b) => a - b);
      XY.y.sort((a, b) => a - b);
      rez.x.push(XY.x[0]);
      rez.y.push(XY.y[0]);
      rez.x2.push(XY.x[3]);
      rez.y2.push(XY.y[3]);
      return rez;
    }, {
      x: [],
      y: [],
      x2: [],
      y2: []
    });
    const rect = {
      x: Math.min(...xy.x),
      y: Math.min(...xy.y),
      x2: Math.max(...xy.x2),
      y2: Math.max(...xy.y2)
    };
    boundingRect.x = rect.x;
    boundingRect.y = rect.y;
    boundingRect.x2 = rect.x2;
    boundingRect.y2 = rect.y2;
    boundingRect.width = rect.x2 - rect.x;
    boundingRect.height = rect.y2 - rect.y;
  }

  return boundingRect;
}

/***/ }),

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/getCSSStyles.js":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/getCSSStyles.js ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getTextNodeCSS = void 0;

var _get2 = _interopRequireDefault(__webpack_require__(/*! lodash/get */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/get.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stringValueToCss = value => {
  if (/right|bottom/i.test(value)) {
    return 'flex-end';
  } else if (/left|top/i.test(value)) {
    return 'flex-start';
  } else if (/center/i.test(value)) {
    return 'center';
  } else if (/lower/i.test(value)) {
    return 'lowercase';
  } else if (/upper/i.test(value)) {
    return 'uppercase';
  } else if (/title/i.test(value)) {
    return 'capitalize';
  } else {
    return 'none';
  }
};

const unitValueToCss = ({
  unit,
  value
}) => {
  if (unit === 'PERCENT') {
    return `${value}%`;
  } else if (unit === 'PIXELS') {
    return `${value}px`;
  } else {
    return 'auto';
  }
};

const isUnitValue = obj => {
  return obj.hasOwnProperty('unit');
};

const getStyleValue = (node, key, exactString) => {
  const value = (0, _get2.default)(node, key);

  if (value === undefined) {
    return null;
  } else if (typeof value === 'string') {
    return exactString ? value.toLowerCase().trim() : stringValueToCss(value.toLowerCase().trim());
  } else if (typeof value === 'number') {
    return `${value}px`;
  } else if (isUnitValue(value)) {
    return unitValueToCss(value);
  } else {
    console.warn('Unexpected value: ', value);
  }
};
/**
 *  get CSS styles of TextNode
 */


const getTextNodeCSS = node => {
  return {
    position: 'absolute',
    top: getStyleValue(node, 'y'),
    left: getStyleValue(node, 'x'),
    width: getStyleValue(node, 'width'),
    height: getStyleValue(node, 'height'),
    display: 'flex',
    'justify-content': getStyleValue(node, 'textAlignHorizontal'),
    'align-items': getStyleValue(node, 'textAlignVertical'),
    'text-indent': getStyleValue(node, 'paragraphIndent'),
    'letter-spacing': getStyleValue(node, 'letterSpacing'),
    'line-height': getStyleValue(node, 'lineHeight'),
    'font-size': getStyleValue(node, 'fontSize'),
    'font-style': getStyleValue(node, 'fontName.style', true),
    'font-weight': getStyleValue(node, 'fontName.style', true),
    'text-decoration': getStyleValue(node, 'textDecoration', true),
    'text-transform': getStyleValue(node, 'textCase'),
    'font-family': `${getStyleValue(node, 'fontName.family', true)} ${getStyleValue(node, 'fontName.style', true)}`
  };
}; // this file can be extended to support all node types


exports.getTextNodeCSS = getTextNodeCSS;

/***/ }),

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/getNodeIndex.js":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/getNodeIndex.js ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = getNodeIndex;

/**
 * this function allows you to get the return the index of node in its parent
 */
function getNodeIndex(node) {
  return node.parent.children.indexOf(node);
}

/***/ }),

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/getPage.js":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/getPage.js ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = getPage;

var _isTypeNode = __webpack_require__(/*! ./isTypeNode */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/isTypeNode.js");

/**
 * this function allows you to pass in a node and return its pageNode
 */
function getPage(node) {
  if (!(0, _isTypeNode.isPageNode)(node)) {
    return getPage(node.parent);
  } else {
    return node;
  }
}

/***/ }),

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/getRelativePosition.js":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/getRelativePosition.js ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getRelativePosition = exports.getTopLevelParent = void 0;

var _ = __webpack_require__(/*! ../ */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/index.js");

/**
 * Return top level parent for node before PageNode.
 * For example:
 * ```js
 * // for structure below
 * // Page / Frame / Group1 / Group2 / Text
 *
 * getTopLevelParent(Text) // Frame
 * ```
 */
const getTopLevelParent = node => {
  if (node && node.parent && !(0, _.isPageNode)(node.parent)) {
    return getTopLevelParent(node.parent);
  } else {
    return node;
  }
};
/**
 * Calculate relative position of node based on provided parent or top level parent.
 * For example:
 * ```js
 * // for structure below
 * // Page / Frame / Group1 / Group2 / Text
 *
 * getRelativePosition(Text, Group1) // will calculate { x, y } based on Group1
 *
 * getRelativePosition(Text) // will calculate { x, y } based on Frame
 * ```
 **/


exports.getTopLevelParent = getTopLevelParent;

const getRelativePosition = (node, relativeNode) => {
  relativeNode = relativeNode || getTopLevelParent(node);
  return {
    x: Math.abs(Math.round(relativeNode.absoluteTransform[0][2] - node.absoluteTransform[0][2])),
    y: Math.abs(Math.round(relativeNode.absoluteTransform[1][2] - node.absoluteTransform[1][2]))
  };
};

exports.getRelativePosition = getRelativePosition;

/***/ }),

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/hasChildren.js":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/hasChildren.js ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.hasChildren = void 0;

/**
 * Checks node to have children nodes
 * For example:
 *
 * ```ts
 * // BEFORE
 * console.log(node.children) // throw TS error "Property 'children' does not exist on type ..."
 *
 * // AFTER
 * if (hasChildren(node)) {
 *  console.log(node.children) // valid code
 * }
 * ```
 *
 */
const hasChildren = node => Boolean(node['children']);

exports.hasChildren = hasChildren;

/***/ }),

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/isPartOfInstance.js":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/isPartOfInstance.js ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isPartOfInstance;

/**
 * this function allows you to check whether a node is part of an instance
 */
function isPartOfInstance(node) {
  const parent = node.parent;

  if (parent.type === 'INSTANCE') {
    return true;
  } else if (parent.type === 'PAGE') {
    return false;
  } else {
    return isPartOfInstance(parent);
  }
}

/***/ }),

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/isPartOfNode.js":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/isPartOfNode.js ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isPartOfNode;

/**
 * this function allows you to check whether a node is part of an rootNode
 */
function isPartOfNode(part, rootNode) {
  const parent = part.parent;

  if (parent === rootNode) {
    return true;
  } else if (parent.type === 'PAGE') {
    return false;
  } else {
    return isPartOfNode(parent, rootNode);
  }
}

/***/ }),

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/isTypeNode.js":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/isTypeNode.js ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isOneOfNodeType = exports.isComponentNode = exports.isInstanceNode = exports.isTextNode = exports.isFrameNode = exports.isGroupNode = exports.isPageNode = void 0;

/**
 * Checks node to be PageNode
 */
const isPageNode = node => {
  return node.type === 'PAGE';
};
/**
 * Checks node to be GroupNode
 */


exports.isPageNode = isPageNode;

const isGroupNode = node => {
  return node.type === 'GROUP';
};
/**
 * Checks node to be FrameNode
 */


exports.isGroupNode = isGroupNode;

const isFrameNode = node => {
  return node.type === 'FRAME';
};
/**
 * Checks node to be TextNode
 */


exports.isFrameNode = isFrameNode;

const isTextNode = node => {
  return node.type === 'TEXT';
};
/**
 * Checks node to be InstanceNode
 */


exports.isTextNode = isTextNode;

const isInstanceNode = node => {
  return node.type === 'INSTANCE';
};
/**
 * Checks node to be ComponentNode
 */


exports.isInstanceNode = isInstanceNode;

const isComponentNode = node => {
  return node.type === 'COMPONENT';
};
/**
 * Checks node to be one of provided types
 */


exports.isComponentNode = isComponentNode;

const isOneOfNodeType = (node, typeList) => {
  return typeList.includes(node.type);
};

exports.isOneOfNodeType = isOneOfNodeType;

/***/ }),

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/isVisibleNode.js":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/isVisibleNode.js ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isVisibleNode;

/**
 * This helper recursively checks all parents for visibility, to guarantee that's node is visible
 */
function isVisibleNode(node) {
  if (node && node.parent) {
    if (node.visible && node.parent.type !== 'PAGE') {
      return isVisibleNode(node.parent);
    } else {
      return node.visible;
    }
  } else {
    return false;
  }
}

/***/ }),

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/loadFonts.js":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/loadFonts.js ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = loadFonts;

/**
 * this function asynchronously loads the passed fonts
 */
async function loadFonts(fonts) {
  const promises = fonts.map(font => figma.loadFontAsync(font));
  await Promise.all(promises);
  return fonts;
}

/***/ }),

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/loadUniqueFonts.js":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/loadUniqueFonts.js ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = loadUniqueFonts;

var _getAllFonts = _interopRequireDefault(__webpack_require__(/*! ./getAllFonts */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/getAllFonts.js"));

var _loadFonts = _interopRequireDefault(__webpack_require__(/*! ./loadFonts */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/loadFonts.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * this function allows you to load only unique fonts asynchronously
 */
async function loadUniqueFonts(textNodes) {
  const fonts = (0, _getAllFonts.default)(textNodes);
  return (0, _loadFonts.default)(fonts);
}

/***/ }),

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/nodeToObject.js":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/nodeToObject.js ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.nodeToObject = void 0;

/**
 * Transform node to object with keys, that are hidden by default.
 * For example:
 * ```ts
 * const node = figma.currentPage.findOne((el) => el.type === "TEXT");
 * console.log(Object.keys(node).length) // 1
 * console.log(Object.keys(nodeToObject(node)).length) // 42
 * console.log(Object.keys(nodeToObject(node, true)).length) // 39
 * ```
 *
 * @param node
 * @param withoutRelations
 */
const nodeToObject = (node, withoutRelations) => {
  const props = Object.entries(Object.getOwnPropertyDescriptors(node.__proto__));
  const blacklist = ['parent', 'children', 'removed', 'masterComponent'];
  const obj = {
    id: node.id,
    type: node.type
  };

  for (const [name, prop] of props) {
    if (prop.get && !blacklist.includes(name)) {
      try {
        if (typeof obj[name] === 'symbol') {
          obj[name] = 'Mixed';
        } else {
          obj[name] = prop.get.call(node);
        }
      } catch (err) {
        obj[name] = undefined;
      }
    }
  }

  if (node.parent && !withoutRelations) {
    obj.parent = {
      id: node.parent.id,
      type: node.parent.type
    };
  }

  if (node.children && !withoutRelations) {
    obj.children = node.children.map(child => nodeToObject(child, withoutRelations));
  }

  if (node.masterComponent && !withoutRelations) {
    obj.masterComponent = nodeToObject(node.masterComponent, withoutRelations);
  }

  return obj;
};

exports.nodeToObject = nodeToObject;

/***/ }),

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/parseTextStyle.js":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/parseTextStyle.js ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.parseTextStyle = parseTextStyle;
exports.splitTextStyleIntoLines = splitTextStyleIntoLines;
exports.joinTextLinesStyles = joinTextLinesStyles;
exports.applyTextStyleToTextNode = applyTextStyleToTextNode;
exports.changeCharactersTextStyle = changeCharactersTextStyle;
exports.changeTextStyle = changeTextStyle;

var _uniqWith2 = _interopRequireDefault(__webpack_require__(/*! lodash/uniqWith */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/uniqWith.js"));

var _cloneDeep2 = _interopRequireDefault(__webpack_require__(/*! lodash/cloneDeep */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/cloneDeep.js"));

var _isEqual2 = _interopRequireDefault(__webpack_require__(/*! lodash/isEqual */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isEqual.js"));

var _getAllFonts = _interopRequireDefault(__webpack_require__(/*! ./getAllFonts */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/getAllFonts.js"));

var _loadFonts = _interopRequireDefault(__webpack_require__(/*! ./loadFonts */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/loadFonts.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const styleFonts = ['fontSize', 'fontName', 'textCase', 'textDecoration', 'letterSpacing', 'lineHeight', 'fills', 'textStyleId', 'fillStyleId'];
/*
	The function returns the text node styles, splitting them into different arrays, such as:
	[{
		characters: "...",
		... (styles)
	}, ...]

	---

	Returns styles for the entire text:
	parseTextStyle(textNode)
	
	Returns text styles from the 100th to the last character:
	parseTextStyle(textNode, 100)

	Returns styles for the entire text, but only with fontName and textDecoration:
	parseTextStyle(textNode, undefined, undefined, ["fontName", "textDecoration"])
*/

function parseTextStyle(node, start = 0, end, styleName) {
  if (!end) end = node.characters.length;
  if (!styleName) styleName = styleFonts;

  if (end <= start) {
    console.error('Start must be greater than end');
    return [];
  } // string substring, defined styles


  const styleMap = []; // a composing string of a specific style

  let textStyle;
  const names = styleName.map(name => {
    return name.replace(/^(.)/g, $1 => $1.toUpperCase());
  }); // splitting text into substrings by style

  for (let startIndex = start; startIndex < end; startIndex++) {
    const endIndex = startIndex + 1;
    const letter = {
      characters: node.characters[startIndex]
    }; // collection of styles

    names.forEach((n, i) => {
      letter[styleName[i]] = node['getRange' + n](startIndex, endIndex);
    });

    if (textStyle) {
      if (isEqualLetterStyle(letter, textStyle)) {
        // the character has the same properties as the generated substring
        // add it to it
        textStyle.characters += letter.characters;
      } else {
        // style properties are different
        styleMap.push(textStyle); // we start to form a new substring

        textStyle = letter;
      }
    } else {
      // we start forming the first substring
      textStyle = letter;
    }
  }

  styleMap.push(textStyle);
  return styleMap;
}
/*
	Allows to split the styles obtained with parseTextStyle into lines based on newlines.

	If the removeNewlineCharacters parameter == true, the newline characters will be removed.
	RemoveEmptylines == true will remove empty lines.
*/


function splitTextStyleIntoLines(textStyle, removeNewlineCharacters = false, removeEmptylines = false) {
  let line = [];
  let lines = [];
  const re = new RegExp('(.+|(?<=\n)(.?)(?=$))(\n|\u2028)?|(\n|\u2028)', 'g');
  const re2 = new RegExp('\n|\u2028');
  textStyle.forEach((style, index) => {
    if (re2.test(style.characters)) {
      const ls = style.characters.match(re);

      if (ls === null) {
        // text is missing
        line.push(style);
      } else if (ls.length === 1) {
        // the style text consists of 1 line
        line.push(style);
        lines.push(line);
        line = [];
      } else {
        // multiple-line text
        style = (0, _cloneDeep2.default)(style);
        style.characters = ls.shift();
        line.push(style);
        lines.push(line);
        line = [];
        const last = ls.pop(); // dealing with internal text strings

        lines.push(...ls.map(e => {
          style = (0, _cloneDeep2.default)(style);
          style.characters = e;
          return [style];
        }));
        style = (0, _cloneDeep2.default)(style);
        style.characters = last;

        if (last === '') {
          if (!textStyle[index + 1]) {
            // last line final
            lines.push([style]);
          } // else false end of text

        } else {
          // does not end
          line.push(style);
        }
      }
    } else {
      line.push(style);
    }
  });
  if (line.length) lines.push(line); // deleting newline characters

  if (removeNewlineCharacters) {
    lines.forEach(l => {
      const style = l[l.length - 1];
      style.characters = style.characters.replace(re2, '');
    });
  } // deleting empty lines


  if (removeEmptylines) {
    lines = lines.filter(l => l.filter(l => l.characters.replace(re2, '') !== '').length !== 0);
  }

  return lines;
}
/*
	Inverse function of splitTextStyleIntoLines.
	The addNewlineCharacters parameter is responsible for whether you need to add a newline character at the end of each line
*/


function joinTextLinesStyles(textStyle, addNewlineCharacters = false) {
  const tStyle = (0, _cloneDeep2.default)(textStyle);
  let newline = '';

  switch (typeof addNewlineCharacters) {
    case 'boolean':
      if (addNewlineCharacters) newline = '\n';
      break;

    case 'string':
      newline = addNewlineCharacters;
      break;
  } // adding new line characters


  if (addNewlineCharacters && newline) {
    tStyle.forEach((style, i) => {
      if (i !== tStyle.length - 1) style[style.length - 1].characters += newline;
    });
  } // join


  const line = tStyle.shift();
  tStyle.forEach(style => {
    const fitst = style.shift();

    if (isEqualLetterStyle(fitst, line[line.length - 1])) {
      // the style of the beginning of the line differs from the end of the style of the text being compiled
      line[line.length - 1].characters += fitst.characters;
    } else {
      line.push(fitst);
    }

    if (style.length) line.push(...style);
  });
  return line;
}
/*
	Apply the text styles obtained from parseTextStyle to the text node.
	The second parameter can be passed a text node, the text of which will be changed.
*/


async function applyTextStyleToTextNode(textStyle, textNode, isLoadFonts = true) {
  if (isLoadFonts) {
    let fonts = [{
      family: 'Roboto',
      style: 'Regular'
    }];

    if (textStyle[0].fontName) {
      fonts.push(...textStyle.map(e => e.fontName));
    }

    if (textNode) {
      fonts.push(...(0, _getAllFonts.default)([textNode]));
    }

    fonts = (0, _uniqWith2.default)(fonts, _isEqual2.default);
    await (0, _loadFonts.default)(fonts);
  }

  if (!textNode) textNode = figma.createText();
  textNode.characters = textStyle.reduce((str, style) => {
    return str + style.characters;
  }, '');
  let n = 0;
  textStyle.forEach(style => {
    const L = style.characters.length;

    if (L) {
      for (const key in style) {
        if (key !== 'characters') {
          const name = key.replace(/^(.)/g, $1 => $1.toUpperCase());
          textNode['setRange' + name](n, n + L, style[key]);
        }
      }

      n += L;
    }
  });
  return textNode;
}
/*
	Replacing text in textStyle
	If the passed text is shorter than in styles, the extra styles will be removed.
	If the passed text is longer than the styles, the overflow text will get the style of the last character.
*/


function changeCharactersTextStyle(textStyle, characters) {
  textStyle = (0, _cloneDeep2.default)(textStyle);
  let n = 0;
  const length = textStyle.length - 1;
  const charactersLength = characters.length;

  for (let i = 0; i <= length; i++) {
    const s = textStyle[i];
    let l = s.characters.length; // if passed text is longer than text in styles

    if (i == length) l = charactersLength;
    s.characters = characters.slice(n, n + l);
    n += l;

    if (n > charactersLength) {
      // new text is shorter than text in styles
      textStyle = textStyle.splice(0, i + 1);
      continue;
    }
  }

  return textStyle;
}
/*
	Function for changing properties of TextStyle. 
	The beforeValue parameter allows you to specify the value in which the property to be changed should be.
*/


function changeTextStyle(textStyle, styleName, newValue, beforeValue) {
  textStyle = (0, _cloneDeep2.default)(textStyle);
  textStyle.forEach(style => {
    if (beforeValue === undefined || beforeValue !== undefined && (0, _isEqual2.default)(style[styleName], beforeValue)) {
      ;
      style[styleName] = newValue;
    }
  });
  return textStyle;
}
/*comparing character styles to the styles of the composing substring*/


function isEqualLetterStyle(letter, textStyle) {
  let is = true; // iterating over font properties

  for (const key in letter) {
    if (key !== 'characters') {
      if (!(0, _isEqual2.default)(letter[key], textStyle[key])) {
        // property varies
        // stop searching
        is = false;
        break;
      }
    }
  }

  return is;
}

/***/ }),

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/setCharacters.js":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/setCharacters.js ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.setCharacters = void 0;

var _uniqBy2 = _interopRequireDefault(__webpack_require__(/*! lodash/uniqBy */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/uniqBy.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const setCharacters = async (node, characters, options) => {
  const fallbackFont = (options === null || options === void 0 ? void 0 : options.fallbackFont) || {
    family: 'Roboto',
    style: 'Regular'
  };

  try {
    if (node.fontName === figma.mixed) {
      if ((options === null || options === void 0 ? void 0 : options.smartStrategy) === 'prevail') {
        const fontHashTree = {};

        for (let i = 1; i < node.characters.length; i++) {
          const charFont = node.getRangeFontName(i - 1, i);
          const key = `${charFont.family}::${charFont.style}`;
          fontHashTree[key] = fontHashTree[key] ? fontHashTree[key] + 1 : 1;
        }

        const prevailedTreeItem = Object.entries(fontHashTree).sort((a, b) => b[1] - a[1])[0];
        const [family, style] = prevailedTreeItem[0].split('::');
        const prevailedFont = {
          family,
          style
        };
        await figma.loadFontAsync(prevailedFont);
        node.fontName = prevailedFont;
      } else if ((options === null || options === void 0 ? void 0 : options.smartStrategy) === 'strict') {
        return setCharactersWithStrictMatchFont(node, characters, fallbackFont);
      } else if ((options === null || options === void 0 ? void 0 : options.smartStrategy) === 'experimental') {
        return setCharactersWithSmartMatchFont(node, characters, fallbackFont);
      } else {
        const firstCharFont = node.getRangeFontName(0, 1);
        await figma.loadFontAsync(firstCharFont);
        node.fontName = firstCharFont;
      }
    } else {
      await figma.loadFontAsync({
        family: node.fontName.family,
        style: node.fontName.style
      });
    }
  } catch (err) {
    console.warn(`Failed to load "${node.fontName['family']} ${node.fontName['style']}" font and replaced with fallback "${fallbackFont.family} ${fallbackFont.style}"`, err);
    await figma.loadFontAsync(fallbackFont);
    node.fontName = fallbackFont;
  }

  try {
    node.characters = characters;
    return true;
  } catch (err) {
    console.warn(`Failed to set characters. Skipped.`, err);
    return false;
  }
};

exports.setCharacters = setCharacters;

const setCharactersWithStrictMatchFont = async (node, characters, fallbackFont) => {
  const fontHashTree = {};

  for (let i = 1; i < node.characters.length; i++) {
    const startIdx = i - 1;
    const startCharFont = node.getRangeFontName(startIdx, i);
    const startCharFontVal = `${startCharFont.family}::${startCharFont.style}`;

    while (i < node.characters.length) {
      i++;
      const charFont = node.getRangeFontName(i - 1, i);

      if (startCharFontVal !== `${charFont.family}::${charFont.style}`) {
        break;
      }
    }

    fontHashTree[`${startIdx}_${i}`] = startCharFontVal;
  }

  await figma.loadFontAsync(fallbackFont);
  node.fontName = fallbackFont;
  node.characters = characters;
  console.log(fontHashTree);
  await Promise.all(Object.keys(fontHashTree).map(async range => {
    console.log(range, fontHashTree[range]);
    const [start, end] = range.split('_');
    const [family, style] = fontHashTree[range].split('::');
    const matchedFont = {
      family,
      style
    };
    await figma.loadFontAsync(matchedFont);
    return node.setRangeFontName(Number(start), Number(end), matchedFont);
  }));
  return true;
};

const getDelimiterPos = (str, delimiter, startIdx = 0, endIdx = str.length) => {
  const indices = [];
  let temp = startIdx;

  for (let i = startIdx; i < endIdx; i++) {
    if (str[i] === delimiter && i + startIdx !== endIdx && temp !== i + startIdx) {
      indices.push([temp, i + startIdx]);
      temp = i + startIdx + 1;
    }
  }

  temp !== endIdx && indices.push([temp, endIdx]);
  return indices.filter(Boolean);
};

const buildLinearOrder = node => {
  const fontTree = [];
  const newLinesPos = getDelimiterPos(node.characters, '\n');
  newLinesPos.forEach(([newLinesRangeStart, newLinesRangeEnd], n) => {
    const newLinesRangeFont = node.getRangeFontName(newLinesRangeStart, newLinesRangeEnd);

    if (newLinesRangeFont === figma.mixed) {
      const spacesPos = getDelimiterPos(node.characters, ' ', newLinesRangeStart, newLinesRangeEnd);
      spacesPos.forEach(([spacesRangeStart, spacesRangeEnd], s) => {
        const spacesRangeFont = node.getRangeFontName(spacesRangeStart, spacesRangeEnd);

        if (spacesRangeFont === figma.mixed) {
          const spacesRangeFont = node.getRangeFontName(spacesRangeStart, spacesRangeStart[0]);
          fontTree.push({
            start: spacesRangeStart,
            delimiter: ' ',
            family: spacesRangeFont.family,
            style: spacesRangeFont.style
          });
        } else {
          fontTree.push({
            start: spacesRangeStart,
            delimiter: ' ',
            family: spacesRangeFont.family,
            style: spacesRangeFont.style
          });
        }
      });
    } else {
      fontTree.push({
        start: newLinesRangeStart,
        delimiter: '\n',
        family: newLinesRangeFont.family,
        style: newLinesRangeFont.style
      });
    }
  });
  return fontTree.sort((a, b) => +a.start - +b.start).map(({
    family,
    style,
    delimiter
  }) => ({
    family,
    style,
    delimiter
  }));
};

const setCharactersWithSmartMatchFont = async (node, characters, fallbackFont) => {
  const rangeTree = buildLinearOrder(node);
  const fontsToLoad = (0, _uniqBy2.default)(rangeTree, ({
    family,
    style
  }) => `${family}::${style}`).map(({
    family,
    style
  }) => ({
    family,
    style
  }));
  await Promise.all([...fontsToLoad, fallbackFont].map(figma.loadFontAsync));
  node.fontName = fallbackFont;
  node.characters = characters;
  let prevPos = 0;
  rangeTree.forEach(({
    family,
    style,
    delimiter
  }) => {
    if (prevPos < node.characters.length) {
      const delimeterPos = node.characters.indexOf(delimiter, prevPos);
      const endPos = delimeterPos > prevPos ? delimeterPos : node.characters.length;
      const matchedFont = {
        family,
        style
      };
      node.setRangeFontName(prevPos, endPos, matchedFont);
      prevPos = endPos + 1;
    }
  });
  return true;
};

/***/ }),

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/topLevelFrames.js":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/topLevelFrames.js ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = topLevelFrames;

/**
 * this function returns all top level frames on currentPage
 */
function topLevelFrames(page = figma.currentPage) {
  return page.children.filter(node => node.type === 'FRAME');
}

/***/ }),

/***/ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/index.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/index.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "clone", ({
  enumerable: true,
  get: function () {
    return _clone.default;
  }
}));
Object.defineProperty(exports, "getAllFonts", ({
  enumerable: true,
  get: function () {
    return _getAllFonts.default;
  }
}));
Object.defineProperty(exports, "getBoundingRect", ({
  enumerable: true,
  get: function () {
    return _getBoundingRect.default;
  }
}));
Object.defineProperty(exports, "getNodeIndex", ({
  enumerable: true,
  get: function () {
    return _getNodeIndex.default;
  }
}));
Object.defineProperty(exports, "getPage", ({
  enumerable: true,
  get: function () {
    return _getPage.default;
  }
}));
Object.defineProperty(exports, "hasChildren", ({
  enumerable: true,
  get: function () {
    return _hasChildren.hasChildren;
  }
}));
Object.defineProperty(exports, "isPartOfInstance", ({
  enumerable: true,
  get: function () {
    return _isPartOfInstance.default;
  }
}));
Object.defineProperty(exports, "isPartOfNode", ({
  enumerable: true,
  get: function () {
    return _isPartOfNode.default;
  }
}));
Object.defineProperty(exports, "isVisibleNode", ({
  enumerable: true,
  get: function () {
    return _isVisibleNode.default;
  }
}));
Object.defineProperty(exports, "loadUniqueFonts", ({
  enumerable: true,
  get: function () {
    return _loadUniqueFonts.default;
  }
}));
Object.defineProperty(exports, "loadFonts", ({
  enumerable: true,
  get: function () {
    return _loadFonts.default;
  }
}));
Object.defineProperty(exports, "nodeToObject", ({
  enumerable: true,
  get: function () {
    return _nodeToObject.nodeToObject;
  }
}));
Object.defineProperty(exports, "topLevelFrames", ({
  enumerable: true,
  get: function () {
    return _topLevelFrames.default;
  }
}));
Object.defineProperty(exports, "getTextNodeCSS", ({
  enumerable: true,
  get: function () {
    return _getCSSStyles.getTextNodeCSS;
  }
}));
Object.defineProperty(exports, "findAll", ({
  enumerable: true,
  get: function () {
    return _findMethods.findAll;
  }
}));
Object.defineProperty(exports, "getRelativePosition", ({
  enumerable: true,
  get: function () {
    return _getRelativePosition.getRelativePosition;
  }
}));
Object.defineProperty(exports, "getTopLevelParent", ({
  enumerable: true,
  get: function () {
    return _getRelativePosition.getTopLevelParent;
  }
}));
Object.defineProperty(exports, "figmaRGBToWebRGB", ({
  enumerable: true,
  get: function () {
    return _convertColor.figmaRGBToWebRGB;
  }
}));
Object.defineProperty(exports, "webRGBToFigmaRGB", ({
  enumerable: true,
  get: function () {
    return _convertColor.webRGBToFigmaRGB;
  }
}));
Object.defineProperty(exports, "figmaRGBToHex", ({
  enumerable: true,
  get: function () {
    return _convertColor.figmaRGBToHex;
  }
}));
Object.defineProperty(exports, "hexToFigmaRGB", ({
  enumerable: true,
  get: function () {
    return _convertColor.hexToFigmaRGB;
  }
}));
Object.defineProperty(exports, "isComponentNode", ({
  enumerable: true,
  get: function () {
    return _isTypeNode.isComponentNode;
  }
}));
Object.defineProperty(exports, "isFrameNode", ({
  enumerable: true,
  get: function () {
    return _isTypeNode.isFrameNode;
  }
}));
Object.defineProperty(exports, "isGroupNode", ({
  enumerable: true,
  get: function () {
    return _isTypeNode.isGroupNode;
  }
}));
Object.defineProperty(exports, "isInstanceNode", ({
  enumerable: true,
  get: function () {
    return _isTypeNode.isInstanceNode;
  }
}));
Object.defineProperty(exports, "isPageNode", ({
  enumerable: true,
  get: function () {
    return _isTypeNode.isPageNode;
  }
}));
Object.defineProperty(exports, "isTextNode", ({
  enumerable: true,
  get: function () {
    return _isTypeNode.isTextNode;
  }
}));
Object.defineProperty(exports, "isOneOfNodeType", ({
  enumerable: true,
  get: function () {
    return _isTypeNode.isOneOfNodeType;
  }
}));
Object.defineProperty(exports, "extractImageCropParams", ({
  enumerable: true,
  get: function () {
    return _extractImageCropParams.extractImageCropParams;
  }
}));
Object.defineProperty(exports, "extractLinearGradientParamsFromTransform", ({
  enumerable: true,
  get: function () {
    return _extractLinearGradientStartEnd.extractLinearGradientParamsFromTransform;
  }
}));
Object.defineProperty(exports, "extractRadialOrDiamondGradientParams", ({
  enumerable: true,
  get: function () {
    return _extractRadialOrDiamondGradientParams.extractRadialOrDiamondGradientParams;
  }
}));
Object.defineProperty(exports, "setCharacters", ({
  enumerable: true,
  get: function () {
    return _setCharacters.setCharacters;
  }
}));
Object.defineProperty(exports, "parseTextStyle", ({
  enumerable: true,
  get: function () {
    return _parseTextStyle.parseTextStyle;
  }
}));
Object.defineProperty(exports, "splitTextStyleIntoLines", ({
  enumerable: true,
  get: function () {
    return _parseTextStyle.splitTextStyleIntoLines;
  }
}));
Object.defineProperty(exports, "joinTextLinesStyles", ({
  enumerable: true,
  get: function () {
    return _parseTextStyle.joinTextLinesStyles;
  }
}));
Object.defineProperty(exports, "applyTextStyleToTextNode", ({
  enumerable: true,
  get: function () {
    return _parseTextStyle.applyTextStyleToTextNode;
  }
}));
Object.defineProperty(exports, "changeCharactersTextStyle", ({
  enumerable: true,
  get: function () {
    return _parseTextStyle.changeCharactersTextStyle;
  }
}));
Object.defineProperty(exports, "changeTextStyle", ({
  enumerable: true,
  get: function () {
    return _parseTextStyle.changeTextStyle;
  }
}));

var _clone = _interopRequireDefault(__webpack_require__(/*! ./helpers/clone */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/clone.js"));

var _getAllFonts = _interopRequireDefault(__webpack_require__(/*! ./helpers/getAllFonts */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/getAllFonts.js"));

var _getBoundingRect = _interopRequireDefault(__webpack_require__(/*! ./helpers/getBoundingRect */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/getBoundingRect.js"));

var _getNodeIndex = _interopRequireDefault(__webpack_require__(/*! ./helpers/getNodeIndex */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/getNodeIndex.js"));

var _getPage = _interopRequireDefault(__webpack_require__(/*! ./helpers/getPage */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/getPage.js"));

var _hasChildren = __webpack_require__(/*! ./helpers/hasChildren */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/hasChildren.js");

var _isPartOfInstance = _interopRequireDefault(__webpack_require__(/*! ./helpers/isPartOfInstance */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/isPartOfInstance.js"));

var _isPartOfNode = _interopRequireDefault(__webpack_require__(/*! ./helpers/isPartOfNode */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/isPartOfNode.js"));

var _isVisibleNode = _interopRequireDefault(__webpack_require__(/*! ./helpers/isVisibleNode */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/isVisibleNode.js"));

var _loadUniqueFonts = _interopRequireDefault(__webpack_require__(/*! ./helpers/loadUniqueFonts */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/loadUniqueFonts.js"));

var _loadFonts = _interopRequireDefault(__webpack_require__(/*! ./helpers/loadFonts */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/loadFonts.js"));

var _nodeToObject = __webpack_require__(/*! ./helpers/nodeToObject */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/nodeToObject.js");

var _topLevelFrames = _interopRequireDefault(__webpack_require__(/*! ./helpers/topLevelFrames */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/topLevelFrames.js"));

var _getCSSStyles = __webpack_require__(/*! ./helpers/getCSSStyles */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/getCSSStyles.js");

var _findMethods = __webpack_require__(/*! ./helpers/findMethods */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/findMethods.js");

var _getRelativePosition = __webpack_require__(/*! ./helpers/getRelativePosition */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/getRelativePosition.js");

var _convertColor = __webpack_require__(/*! ./helpers/convertColor */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/convertColor.js");

var _isTypeNode = __webpack_require__(/*! ./helpers/isTypeNode */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/isTypeNode.js");

var _extractImageCropParams = __webpack_require__(/*! ./helpers/extractImageCropParams */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/extractImageCropParams.js");

var _extractLinearGradientStartEnd = __webpack_require__(/*! ./helpers/extractLinearGradientStartEnd */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/extractLinearGradientStartEnd.js");

var _extractRadialOrDiamondGradientParams = __webpack_require__(/*! ./helpers/extractRadialOrDiamondGradientParams */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/extractRadialOrDiamondGradientParams.js");

var _setCharacters = __webpack_require__(/*! ./helpers/setCharacters */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/setCharacters.js");

var _parseTextStyle = __webpack_require__(/*! ./helpers/parseTextStyle */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/parseTextStyle.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/common/number.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/common/number.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NumberUtil = void 0;
const const_1 = __webpack_require__(/*! ../const */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/const/index.js");
class NumberUtil {
    static isEqual(v1, v2, tolerance = NumberUtil.TOLERANCE) {
        return Math.abs(v1 - v2) < tolerance;
    }
    /**
     * 获取相反数
     */
    static getOppositeNumber(value) {
        return value === 0 ? 0 : -value;
    }
    /**
     * 将有符号的 Zero 转化为无符号
     *
     * Object.is vs === : https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is
     */
    static unSignedZero(value) {
        return value === 0 ? 0 : value;
    }
}
exports.NumberUtil = NumberUtil;
NumberUtil.TOLERANCE = const_1.SIX_DECIMAL_TOLERANCE;


/***/ }),

/***/ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/const/index.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/const/index.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SIX_DECIMAL_TOLERANCE = exports.TWO_PI = exports.PI = exports.MIN = exports.MAX = exports.ONE = exports.ZERO = void 0;
/**
 * number 0
 */
exports.ZERO = 0;
/**
 * number 1
 */
exports.ONE = 1;
/**
 * number Infinity
 */
exports.MAX = Infinity;
/**
 * number -Infinity
 */
exports.MIN = -Infinity;
exports.PI = Math.PI;
exports.TWO_PI = exports.PI * 2;
exports.SIX_DECIMAL_TOLERANCE = 1e-6;


/***/ }),

/***/ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/index.js":
/*!********************************************************************************!*\
  !*** ./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/index.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Utils = exports.Polygon = exports.Ellipse = exports.Circle = exports.Arc = exports.Box3 = exports.Box2 = exports.Line3 = exports.LineSide = exports.Line2 = exports.Matrix4 = exports.Matrix3 = exports.Vector3 = exports.Vector2 = void 0;
var vector2_1 = __webpack_require__(/*! ./unit/vector2 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/vector2/index.js");
Object.defineProperty(exports, "Vector2", ({ enumerable: true, get: function () { return vector2_1.Vector2; } }));
var vector3_1 = __webpack_require__(/*! ./unit/vector3 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/vector3/index.js");
Object.defineProperty(exports, "Vector3", ({ enumerable: true, get: function () { return vector3_1.Vector3; } }));
var matrix3_1 = __webpack_require__(/*! ./unit/matrix3 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/matrix3/index.js");
Object.defineProperty(exports, "Matrix3", ({ enumerable: true, get: function () { return matrix3_1.Matrix3; } }));
var matrix4_1 = __webpack_require__(/*! ./unit/matrix4 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/matrix4/index.js");
Object.defineProperty(exports, "Matrix4", ({ enumerable: true, get: function () { return matrix4_1.Matrix4; } }));
var line2_1 = __webpack_require__(/*! ./unit/line2 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/line2/index.js");
Object.defineProperty(exports, "Line2", ({ enumerable: true, get: function () { return line2_1.Line2; } }));
Object.defineProperty(exports, "LineSide", ({ enumerable: true, get: function () { return line2_1.LineSide; } }));
var line3_1 = __webpack_require__(/*! ./unit/line3 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/line3/index.js");
Object.defineProperty(exports, "Line3", ({ enumerable: true, get: function () { return line3_1.Line3; } }));
var box2_1 = __webpack_require__(/*! ./unit/box2 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/box2/index.js");
Object.defineProperty(exports, "Box2", ({ enumerable: true, get: function () { return box2_1.Box2; } }));
var box3_1 = __webpack_require__(/*! ./unit/box3 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/box3/index.js");
Object.defineProperty(exports, "Box3", ({ enumerable: true, get: function () { return box3_1.Box3; } }));
var arc_1 = __webpack_require__(/*! ./unit/arc */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/arc/index.js");
Object.defineProperty(exports, "Arc", ({ enumerable: true, get: function () { return arc_1.Arc; } }));
var circle_1 = __webpack_require__(/*! ./unit/circle */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/circle/index.js");
Object.defineProperty(exports, "Circle", ({ enumerable: true, get: function () { return circle_1.Circle; } }));
var ellipse_1 = __webpack_require__(/*! ./unit/ellipse */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/ellipse/index.js");
Object.defineProperty(exports, "Ellipse", ({ enumerable: true, get: function () { return ellipse_1.Ellipse; } }));
var polygon_1 = __webpack_require__(/*! ./unit/polygon */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/polygon/index.js");
Object.defineProperty(exports, "Polygon", ({ enumerable: true, get: function () { return polygon_1.Polygon; } }));
var utils_1 = __webpack_require__(/*! ./utils */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/utils/index.js");
Object.defineProperty(exports, "Utils", ({ enumerable: true, get: function () { return utils_1.Utils; } }));


/***/ }),

/***/ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/arc/index.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/arc/index.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Arc = void 0;
const const_1 = __webpack_require__(/*! ../../const */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/const/index.js");
const utils_1 = __webpack_require__(/*! ../../utils */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/utils/index.js");
const line2_1 = __webpack_require__(/*! ../line2 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/line2/index.js");
const vector2_1 = __webpack_require__(/*! ../vector2 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/vector2/index.js");
const CLOCKWISE = false;
/**
 * 表示二维世界的圆弧
 *
 * Class representing an arc in Two-dimensional coordinate system
 */
class Arc {
    /**
     * @param center 圆心
     * @param radius 半径
     * @param startRadian 起始角
     * @param endRadian 终止角
     * @param isClockwise 是否是逆时针
     */
    constructor(center, radius, startRadian, endRadian, isClockwise = CLOCKWISE) {
        /**
         * 圆心
         *
         * @default Vector2(0, 0)
         */
        this.center = new vector2_1.Vector2(const_1.ZERO, const_1.ZERO);
        /**
         * 半径
         *
         * @default 0
         */
        this.radius = const_1.ZERO;
        /**
         * 起始角（弧度制）
         *
         * @default 0
         */
        this.startRadian = const_1.ZERO;
        /**
         * 终止角（弧度制）
         *
         * @default 0
         */
        this.endRadian = const_1.ZERO;
        /**
         * 是否顺时针（默认：false）
         *
         * @default false
         */
        this.isClockwise = CLOCKWISE;
        this.center = center || this.center;
        this.radius = radius || this.radius;
        this.startRadian = startRadian || this.startRadian;
        this.endRadian = endRadian || this.endRadian;
        this.isClockwise = isClockwise;
    }
    /**
     * 通过圆弧上不同的三个点构造一个圆弧
     *
     * @param startPoint 起点
     * @param arcPoint 弧上任意点（不为 startPoint/endPoint）
     * @param endPoint 终点
     */
    static createByThreePoint(startPoint, arcPoint, endPoint, isClockwise = CLOCKWISE) {
        const l1 = new line2_1.Line2(startPoint, arcPoint);
        const l2 = new line2_1.Line2(arcPoint, endPoint);
        const diameter1 = utils_1.Utils.Line2.calcPerpendicularThroughPoint(l1, l1.center);
        const diameter2 = utils_1.Utils.Line2.calcPerpendicularThroughPoint(l2, l2.center);
        const center = utils_1.Utils.Line2.lineIntersectLine(diameter1, diameter2);
        if (!center) {
            throw new Error('The points can not from an arc');
        }
        return Arc.createByBoundaryPoint(center, startPoint, endPoint, isClockwise);
    }
    /**
     * 通过边界点构造一个圆弧
     *
     * Construct an arc through boundary points
     *
     * @param center 圆心
     * @param startPoint 圆弧起点
     * @param endPoint 圆弧终点
     * @param isClockwise 是否逆时针（默认：true）
     *
     * @returns 圆弧
     */
    static createByBoundaryPoint(center, startPoint, endPoint, isClockwise = CLOCKWISE) {
        const startRadian = utils_1.Utils.Circle.getAngleByPoint(center, startPoint, isClockwise);
        const endRadian = utils_1.Utils.Circle.getAngleByPoint(center, endPoint, isClockwise);
        const radius = utils_1.Utils.Vector2.distance(startPoint, center);
        return new Arc(center, radius, startRadian, endRadian, isClockwise);
    }
    /**
     * 设置圆弧圆心
     * @param center 圆心坐标
     * @returns 当前圆弧
     */
    setCenter(center) {
        this.center.set(center);
        return this;
    }
    /**
     * 设置圆弧半径
     * @param radius 半径
     * @returns 当前圆弧
     */
    setRadius(radius) {
        this.radius = radius;
        return this;
    }
    /**
     * 设置圆弧的起始角
     * @param radian 起始角的角度
     * @returns 当前圆弧
     */
    setStartRadian(radian) {
        this.startRadian = radian;
        return this;
    }
    /**
     * 设置圆弧的终止角
     * @param radian 终止角的角度
     * @returns 当前圆弧
     */
    setEndRadian(radian) {
        this.endRadian = radian;
        return this;
    }
    /**
     * 设置圆弧的方向（是否顺时针）
     * @param value 是否顺时针
     * @returns 当前圆弧
     */
    setClockwise(value) {
        this.isClockwise = value;
        return this;
    }
    /**
     * 复制当前圆弧
     *
     * Clones this arc to a new arc
     *
     * @returns 新的圆弧（A new Arc）
     */
    clone() {
        const { center, radius, startRadian: startRadian, endRadian: endRadian, isClockwise } = this;
        return new Arc(center.clone(), radius, startRadian, endRadian, isClockwise);
    }
    /**
     * 平移圆弧
     * @param v 平移向量
     * @returns 新的圆弧对象
     */
    translate(v) {
        // todo 诸如 line circle arc 等 translate 接口，应该都以平移自身的需求，所以这个接口设计成支持改变自身/返回新值 两种选择
        const { center, radius, startRadian, endRadian, isClockwise } = this;
        return new Arc(center.add(v), radius, startRadian, endRadian, isClockwise);
    }
    /**
     * 绕圆心旋转圆弧
     * @param radian 旋转角度（正方向为圆弧方向）
     * @returns 新的圆弧对象
     */
    rotate(radian) {
        // todo 需求同 translate
        // todo radian 方向设计再考虑一下
        const { center, radius, startRadian, endRadian, isClockwise } = this;
        return new Arc(center.clone(), radius, startRadian + radian, endRadian + radian, isClockwise);
    }
    /**
     * 均分圆弧的弧度
     *
     * The radian of an evenly divided arc
     */
    get midRadian() {
        // todo 处理到 0 ~ 2PI
        return this.startRadian + this.radian / 2;
    }
    /**
     * 圆弧弧周上的中点
     *
     * The midpoint of the arc
     */
    get midPoint() {
        const { center, radius, midRadian, isClockwise } = this;
        return utils_1.Utils.Circle.getPointByAngle(center, radius, midRadian, isClockwise);
    }
    /**
     * 圆弧的开口弧度
     *
     * The radian of the arc
     */
    get radian() {
        // todo 这里似乎并不能保证 diff 在 0 ～ 2PI 内
        const diffRadian = this.endRadian - this.startRadian;
        return diffRadian < 0 ? const_1.TWO_PI + diffRadian : diffRadian;
    }
    /**
     * 圆弧起点
     *
     * The starting point of the arc
     */
    get startPoint() {
        const { center, radius, startRadian, isClockwise } = this;
        return utils_1.Utils.Circle.getPointByAngle(center, radius, startRadian, isClockwise);
    }
    /**
     * 圆弧终点
     *
     * The ending point of the arc
     */
    get endPoint() {
        const { center, radius, endRadian, isClockwise } = this;
        return utils_1.Utils.Circle.getPointByAngle(center, radius, endRadian, isClockwise);
    }
    /**
     * 判断点是否在圆弧上
     *
     * @param point 目标点
     */
    isPointOnArc(point, distanceTol = const_1.SIX_DECIMAL_TOLERANCE, angleTol = const_1.SIX_DECIMAL_TOLERANCE) {
        const { center, radius, isClockwise } = this;
        if (Math.abs(utils_1.Utils.Vector2.distance(point, center) - radius) <= distanceTol) {
            const angle = utils_1.Utils.Circle.getAngleByPoint(center, point, isClockwise);
            return this.isAngleInsideArc(angle);
        }
        return false;
    }
    /**
     * 判断点是否在圆弧内（扇形内）
     *
     * @param point
     */
    isPointInsideArc(point, includeBorder = false, distanceTol = const_1.SIX_DECIMAL_TOLERANCE, angleTol = const_1.SIX_DECIMAL_TOLERANCE) {
        const { center, radius, isClockwise } = this;
        const distance = utils_1.Utils.Vector2.distance(point, center);
        const isInRange = includeBorder ? distance <= radius + distanceTol : distance < radius;
        if (isInRange) {
            const angle = utils_1.Utils.Circle.getAngleByPoint(center, point, isClockwise);
            return this.isAngleInsideArc(angle);
        }
        return false;
    }
    /**
     * 判断角度是否在圆弧角度范围内
     * @param angle
     */
    isAngleInsideArc(angle, tolerance = const_1.SIX_DECIMAL_TOLERANCE) {
        const { startRadian, endRadian } = this;
        if (endRadian >= startRadian) {
            return angle >= startRadian - tolerance && angle <= endRadian + tolerance;
        }
        return angle >= startRadian - tolerance || angle <= endRadian + tolerance;
    }
    /**
     * 获取圆弧的散点集
     *
     * @param length 要用多少个散点表示圆弧
     */
    toPoints(length) {
        const points = [];
        // 至少要用 2 个点才能表示圆弧
        if (length > 1) {
            const step = this.radian / (length - 1);
            for (let i = 0; i < length; i++) {
                const angle = this.startRadian + step * i;
                points.push(utils_1.Utils.Circle.getPointByAngle(this.center, this.radius, angle, this.isClockwise));
            }
        }
        return points;
    }
}
exports.Arc = Arc;


/***/ }),

/***/ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/box2/index.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/box2/index.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Box2 = void 0;
const const_1 = __webpack_require__(/*! ../../const */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/const/index.js");
const utils_1 = __webpack_require__(/*! ../../utils */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/utils/index.js");
const vector2_1 = __webpack_require__(/*! ../vector2 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/vector2/index.js");
/**
 * 表示一个二维平面中的 AABB 盒子
 *
 *  +---------+
 *  |         |
 *  |         |
 *  |         |
 *  +---------+
 *
 * Class representing a bounding box in Two-dimensional coordinate system
 */
class Box2 {
    constructor() {
        /**
         * Box2 的最小顶点（左下角）
         */
        this.min = new vector2_1.Vector2(const_1.ZERO, const_1.ZERO);
        /**
         * Box2 的最大顶点（右上角）
         */
        this.max = new vector2_1.Vector2(const_1.ZERO, const_1.ZERO);
        const [min, max] = arguments;
        if (min && max) {
            this.min = min.clone();
            this.max = max.clone();
        }
    }
    /**
     * 计算包围所有点的最小 Box2
     *
     * Calculate the smallest Box2 surrounding all points
     *
     * @param points 目标点
     * @returns A Box2
     */
    static createByPoints(points) {
        const { minX, minY, maxX, maxY } = points.reduce((box, point) => {
            let { minX, minY, maxX, maxY } = box;
            const { x, y } = point;
            if (x < minX) {
                box.minX = x;
            }
            if (x > maxX) {
                box.maxX = x;
            }
            if (y < minY) {
                box.minY = y;
            }
            if (y > maxY) {
                box.maxY = y;
            }
            return box;
        }, { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity });
        return new Box2(new vector2_1.Vector2(minX, minY), new vector2_1.Vector2(maxX, maxY));
    }
    /**
     * 根据几何信息计算一个 Box2
     *
     * Calculate the Box2 base on geometric information
     *
     * @param center 中心点
     * @param size 尺寸
     * @returns A Box2
     */
    static createByGeometry(center, size) {
        const halfSize = size.divide(2);
        const min = center.sub(halfSize);
        const max = center.add(halfSize);
        return new Box2(min, max);
    }
    /**
     * 设置 Box2 的最小顶点
     * @param min Vector2
     */
    setMin(min) {
        this.min = min;
    }
    /**
     * 设置 Box2 的最大顶点
     * @param max Vector2
     */
    setMax(max) {
        this.max = max;
    }
    /**
     * Box2 的 4 个顶点
     *
     * 当前坐标系为，X向左为正，Y向上为正时，其4个顶点相对位置如下：
     *
     *  3---------2
     *  |         |
     *  |         |
     *  |         |
     *  0---------1
     */
    get points() {
        const { x: minX, y: minY } = this.min;
        const { x: maxX, y: maxY } = this.max;
        return [
            new vector2_1.Vector2(minX, minY),
            new vector2_1.Vector2(maxX, minY),
            new vector2_1.Vector2(maxX, maxY),
            new vector2_1.Vector2(minX, maxY),
        ];
    }
    /**
     * Box2 的尺寸
     */
    get size() {
        return this.max.sub(this.min);
    }
    /**
     * Box2 的中心点
     */
    get center() {
        return utils_1.Utils.Vector2.interpolate(this.min, this.max, 0.5);
    }
    /**
     * 检查当前 Box2 是否合法
     */
    checkValid() {
        return this.max.x > this.min.x && this.max.y > this.min.y;
    }
    /**
     * 判断点是否在 Box2 内
     * @param point
     */
    isPointInBox(point, tolerance = const_1.SIX_DECIMAL_TOLERANCE) {
        const maxX = this.max.x + tolerance;
        const maxY = this.max.y + tolerance;
        const minX = this.min.x - tolerance;
        const minY = this.min.y - tolerance;
        return point.x <= maxX && point.x >= minX && point.y <= maxY && point.y >= minY;
    }
}
exports.Box2 = Box2;


/***/ }),

/***/ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/box3/index.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/box3/index.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Box3 = void 0;
const const_1 = __webpack_require__(/*! ../../const */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/const/index.js");
const utils_1 = __webpack_require__(/*! ../../utils */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/utils/index.js");
const vector3_1 = __webpack_require__(/*! ../vector3 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/vector3/index.js");
/**
 * 表示一个三维平面中的 AABB 盒子
 *
 *    +---------+
 *   /|        /|
 *  / |       / |
 * +---------+  |
 * |  +------|--+
 * | /       | /
 * |/        |/
 * +---------+
 *
 * Class representing a bounding box in Three-dimensional coordinate system
 */
class Box3 {
    constructor() {
        /**
         * Box3 的最小顶点
         */
        this.min = new vector3_1.Vector3(const_1.ZERO, const_1.ZERO);
        /**
         * Box3 的最大顶点
         */
        this.max = new vector3_1.Vector3(const_1.ZERO, const_1.ZERO);
        const [min, max] = arguments;
        if (min && max) {
            this.min = min.clone();
            this.max = max.clone();
        }
    }
    /**
     * 计算包围所有点的最小 Box3
     *
     * Calculate the smallest Box3 surrounding all points
     *
     * @param points 目标点
     * @returns A Box3
     */
    static createByPoints(points) {
        const { minX, minY, minZ, maxX, maxY, maxZ } = points.reduce((box, point) => {
            let { minX, minY, minZ, maxX, maxY, maxZ } = box;
            const { x, y, z } = point;
            if (x < minX) {
                box.minX = x;
            }
            if (x > maxX) {
                box.maxX = x;
            }
            if (y < minY) {
                box.minY = y;
            }
            if (y > maxY) {
                box.maxY = y;
            }
            if (z < minZ) {
                box.minZ = z;
            }
            if (z > maxZ) {
                box.maxZ = z;
            }
            return box;
        }, { minX: Infinity, minY: Infinity, minZ: Infinity, maxX: -Infinity, maxY: -Infinity, maxZ: -Infinity });
        return new Box3(new vector3_1.Vector3(minX, minY, minZ), new vector3_1.Vector3(maxX, maxY, maxZ));
    }
    /**
     * 根据几何信息计算一个 Box3
     *
     * Calculate the Box3 base on geometric information
     *
     * @param center 中心点
     * @param size 尺寸
     * @returns A Box3
     */
    static createByGeometry(center, size) {
        const halfSize = size.divide(2);
        const min = center.sub(halfSize);
        const max = center.add(halfSize);
        return new Box3(min, max);
    }
    /**
     * 设置 Box3 的最小顶点
     * @param min Vector3
     */
    setMin(min) {
        this.min = min;
    }
    /**
     * 设置 Box3 的最大顶点
     * @param max Vector3
     */
    setMax(max) {
        this.max = max;
    }
    /**
     * Box3 的 8 个顶点
     *
     * 如果坐标系方向如下：
     *
     *  Y   Z
     *  |  /
     *  | /
     *  |/
     *  +---------- X
     *
     * 则顶点顺序如下：
     *
     *    7---------6
     *   /|        /|
     *  / |       / |
     * 3---------2  |
     * |  4------|--5
     * | /       | /
     * |/        |/
     * 0---------1
     */
    get points() {
        const { x: minX, y: minY, z: minZ } = this.min;
        const { x: maxX, y: maxY, z: maxZ } = this.max;
        return [
            new vector3_1.Vector3(minX, minY, minZ),
            new vector3_1.Vector3(maxX, minY, minZ),
            new vector3_1.Vector3(maxX, maxY, minZ),
            new vector3_1.Vector3(minX, maxY, minZ),
            new vector3_1.Vector3(minX, minY, maxZ),
            new vector3_1.Vector3(maxX, minY, maxZ),
            new vector3_1.Vector3(maxX, maxY, maxZ),
            new vector3_1.Vector3(minX, maxY, maxZ),
        ];
    }
    /**
     * Box3 的尺寸
     */
    get size() {
        return this.max.sub(this.min);
    }
    /**
     * Box3 的中心点
     */
    get center() {
        return utils_1.Utils.Vector3.interpolate(this.min, this.max, 0.5);
    }
    /**
     * 检查当前 Box3 是否合法
     */
    checkValid() {
        return this.max.x > this.min.x && this.max.y > this.min.y && this.max.z > this.min.z;
    }
}
exports.Box3 = Box3;


/***/ }),

/***/ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/circle/index.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/circle/index.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Circle = void 0;
const const_1 = __webpack_require__(/*! ../../const */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/const/index.js");
const utils_1 = __webpack_require__(/*! ../../utils */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/utils/index.js");
const line2_1 = __webpack_require__(/*! ../line2 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/line2/index.js");
const vector2_1 = __webpack_require__(/*! ../vector2 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/vector2/index.js");
/**
 * 表示二维世界中的一个圆
 */
class Circle {
    /**
     * @param center 圆心
     * @param radius 半径
     */
    constructor(center, radius) {
        /**
         * 圆心
         */
        this.center = new vector2_1.Vector2(const_1.ZERO, const_1.ZERO);
        /**
         * 半径
         */
        this.radius = const_1.ZERO;
        this.center = center || this.center;
        if (radius !== undefined) {
            this.radius = radius;
        }
    }
    /**
     * 通过不重复的三个点构造一个圆
     *
     * @param p1 点1
     * @param p2 点2
     * @param p3 点3
     */
    static createByThreePoint(p1, p2, p3) {
        const l1 = new line2_1.Line2(p1, p2);
        const l2 = new line2_1.Line2(p2, p3);
        const diameter1 = utils_1.Utils.Line2.calcPerpendicularThroughPoint(l1, l1.center);
        const diameter2 = utils_1.Utils.Line2.calcPerpendicularThroughPoint(l2, l2.center);
        const center = utils_1.Utils.Line2.lineIntersectLine(diameter1, diameter2);
        if (!center) {
            throw new Error('The points can not from a circle');
        }
        const radius = utils_1.Utils.Vector2.distance(center, p1);
        return new Circle(center, radius);
    }
    /**
     * 设置圆心
     * @param center 圆心
     * @returns 当前 circle
     */
    setCenter(center) {
        this.center.set(center.x, center.y);
        return this;
    }
    /**
     * 设置半径
     * @param radius 半径
     * @returns 当前 circle
     */
    setRadius(radius) {
        this.radius = radius;
        return this;
    }
    /**
     * 复制当前 Circle
     */
    clone() {
        return new Circle(this.center.clone(), this.radius);
    }
    /**
     * 平移圆
     * @param v 平移向量
     * @returns 平移后的新圆
     */
    translate(v) {
        return new Circle(this.center.add(v), this.radius);
    }
    /**
     * 点是否在圆周上
     * @param point 目标点
     * @param tolerance 误差
     */
    isPointOnCircle(point, tolerance = const_1.SIX_DECIMAL_TOLERANCE) {
        return Math.abs(utils_1.Utils.Vector2.distance(point, this.center) - this.radius) <= tolerance;
    }
    /**
     * 点是否在圆内
     * @param point 目标点
     * @param includeBorder 范围是否包含圆周
     * @param tolerance 误差
     */
    isPointInsideCircle(point, includeBorder = false, tolerance = const_1.SIX_DECIMAL_TOLERANCE) {
        const distance = utils_1.Utils.Vector2.distance(point, this.center);
        return includeBorder ? distance <= this.radius + tolerance : distance < this.radius;
    }
    /**
     * 获取圆周的散点集
     * @param length 目标的散点数量
     * @returns 散点集
     */
    toPoints(length) {
        const points = [];
        // 至少要用 3 个点才能表示圆周
        if (length > 2) {
            const step = const_1.TWO_PI / length;
            for (let i = 0; i < length; i++) {
                const angle = step * i;
                points.push(utils_1.Utils.Circle.getPointByAngle(this.center, this.radius, angle));
            }
        }
        return points;
    }
}
exports.Circle = Circle;


/***/ }),

/***/ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/ellipse/index.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/ellipse/index.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Ellipse = void 0;
const vector2_1 = __webpack_require__(/*! ../vector2 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/vector2/index.js");
/**
 * 表示二维空间的椭圆
 */
class Ellipse {
    constructor() {
        /**
         * 椭圆圆心
         */
        this.center = new vector2_1.Vector2(0, 0);
        /**
         * 椭圆横轴半径
         */
        this.rx = 0;
        /**
         * 椭圆纵轴半径
         */
        this.ry = 0;
        /**
         * 椭圆的旋转（弧度）
         *
         * 默认：0
         */
        this.rotate = 0;
        if (arguments.length >= 3) {
            const [center, rx, ry, rotate] = arguments;
            this.center = new vector2_1.Vector2(center.x, center.y);
            this.rx = rx;
            this.ry = ry;
            if (rotate !== void 0) {
                this.rotate = rotate;
            }
        }
    }
    /**
     * 通过焦点和到焦点的距离来生成一个椭圆
     * @param f1 焦点1
     * @param f2 焦点2
     * @param distance 到两个焦点的距离之和
     */
    static createByFoci(f1, f2, distance) {
        const a = distance / 2;
        const c = f1.sub(f2).length / 2;
        const center = f1.add(f2).sub(2);
        const rx = a;
        const ry = Math.sqrt(a * a - c * c);
        const rotate = f2.sub(f1).angle;
        return new Ellipse(center, rx, ry, rotate);
    }
    /**
     * 设置椭圆圆心
     * @param center 圆形
     * @returns 当前 Ellipse
     */
    setCenter(center) {
        const { x: cx, y: cy } = this.center;
        const { x = cx, y = cy } = center;
        this.center.set(x, y);
        return this;
    }
    /**
     * 设置椭圆横轴半径
     * @param rx 椭圆横轴半径
     * @returns 当前 Ellipse
     */
    setRx(rx) {
        this.rx = rx;
        return this;
    }
    /**
     * 设置椭圆纵轴半径
     * @param ry 椭圆纵轴半径
     * @returns 当前 Ellipse
     */
    setRy(ry) {
        this.ry = ry;
        return this;
    }
    /**
     * 设置椭圆的旋转
     * @param rotate 椭圆的旋转
     * @returns 当前 Ellipse
     */
    setRotate(rotate) {
        this.rotate = rotate;
        return this;
    }
    /**
     * 复制指定椭圆的数据到自身
     * @param ellipse 目标椭圆
     * @returns 当前 Ellipse
     */
    copy(ellipse) {
        const { center, rx, ry, rotate } = ellipse;
        this.center.set(center.x, center.y);
        this.rx = rx;
        this.ry = ry;
        this.rotate = rotate;
        return this;
    }
    /**
     * 复制当前椭圆
     * @returns 新的椭圆
     */
    clone() {
        const { center, rx, ry, rotate } = this;
        return new Ellipse(center, rx, ry, rotate);
    }
    /**
     * 判断点是否椭圆内
     * @param point 目标点
     *
     * @todo 如何增加误差;
     * @todo 拆成两个接口 On | Inside ?
     */
    isPointInsideEllipse(point) {
        /**
         * 椭圆坐标方程：x^2 / a^2 + y^2 / b^2 = 1 (x, y 指以 center 为原点的坐标系)
         *
         * 故椭圆内的点需要满足 (x - center.x)^2 / a^2 + (y - center.x)^2 / b^2 <= 1
         */
        const { center, rx, ry } = this;
        const { x, y } = center;
        const { x: px, y: py } = point;
        return Math.pow(px - x, 2) / Math.pow(rx, 2) + Math.pow(py - y, 2) / Math.pow(ry, 2) <= 1;
    }
}
exports.Ellipse = Ellipse;


/***/ }),

/***/ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/line2/index.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/line2/index.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LineSide = exports.Line2 = void 0;
const number_1 = __webpack_require__(/*! ../../common/number */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/common/number.js");
const const_1 = __webpack_require__(/*! ../../const */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/const/index.js");
const utils_1 = __webpack_require__(/*! ../../utils */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/utils/index.js");
const vector2_1 = __webpack_require__(/*! ../vector2 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/vector2/index.js");
const interface_1 = __webpack_require__(/*! ./interface */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/line2/interface.js");
Object.defineProperty(exports, "LineSide", ({ enumerable: true, get: function () { return interface_1.LineSide; } }));
/**
 * 表示二维世界的一条线
 *
 * Class representing a line in Two-dimensional coordinate system
 */
class Line2 {
    constructor() {
        /**
         * 线的起点
         *
         * Starting point of line or segment
         */
        this.start = new vector2_1.Vector2(const_1.ZERO, const_1.ZERO);
        /**
         * 线的终点
         *
         * Ending point of line or segment
         */
        this.end = new vector2_1.Vector2(const_1.ZERO, const_1.ZERO);
        const [p1, p2] = arguments;
        if (p1 && p2) {
            this.set(p1, p2);
        }
    }
    /**
     * 设置起点和终点
     *
     * Sets the start and the end of this line
     * @param start Starting point of line or segment
     * @param end Ending point of line or segment
     * @returns 当前实例 (This line)
     */
    set(start, end) {
        if (start.equals(end)) {
            // 两个点的坐标一致，无法构成一条直线
            throw new Error(`The start point (${start.x}, ${start.y}) and the end point (${end.x}, ${end.y} are the same and cannot from a line)`);
        }
        this.start = start.clone();
        this.end = end.clone();
        return this;
    }
    /**
     * 设置起点
     *
     * Sets the start of this line
     * @param point Starting point of line or segment
     * @returns 当前实例 (This line)
     */
    setStart(point) {
        if (point.equals(this.end)) {
            // 两个点的坐标一致，无法构成一条直线
            throw new Error(`The point (${point.x}, ${point.y}) and the end point (${this.end.x}, ${this.end.y} are the same and cannot from a line)`);
        }
        this.start = point.clone();
        return this;
    }
    /**
     * 设置终点
     *
     * Sets the end of this line
     * @param point Ending point of line or segment
     * @returns 当前实例 (This line)
     */
    setEnd(point) {
        if (point.equals(this.start)) {
            // 两个点的坐标一致，无法构成一条直线
            throw new Error(`The point (${point.x}, ${point.y}) and the start point (${this.start.x}, ${this.start.y} are the same and cannot from a line)`);
        }
        this.end = point.clone();
        return this;
    }
    /**
     * 线段的长度
     *
     * Gets the length of the current line
     */
    get length() {
        return this.end.sub(this.start).length;
    }
    /**
     * 线段长度的平方
     *
     * Gets the squared length of the current line
     */
    get lengthSq() {
        return this.end.sub(this.start).lengthSq;
    }
    /**
     * 线的方向 （起点 -> 终点）
     *
     * Gets the direction of the current line (start -> end)
     */
    get direction() {
        return this.end.sub(this.start).normalize();
    }
    /**
     * 线的方向角度
     *
     * Gets the angle of the current line's direction (start -> end)
     */
    get angle() {
        return this.direction.angle;
    }
    /**
     * 线段的中点
     *
     * Gets the center point of the current line.
     */
    get center() {
        return this.interpolate(0.5);
    }
    /**
     * 线的正交左方向
     *
     * Gets the direction orthogonal to the current line and pointing to the left
     */
    get leftDirection() {
        return utils_1.Utils.Vector2.getLeftDirection(this.direction);
    }
    /**
     * 线的正交右方向
     *
     * Gets the direction orthogonal to the current line and pointing to the right
     */
    get rightDirection() {
        return utils_1.Utils.Vector2.getRightDirection(this.direction);
    }
    /**
     * 平移线
     *
     * Translate the current line
     * @param v The vector the translation
     * @returns A new Line
     */
    translate(v) {
        const { start, end } = this;
        return new Line2(start.add(v), end.add(v));
    }
    /**
     * 获取点在线的哪一侧
     *
     * Gets which side of the current line the point is on
     * @returns LineSide
     */
    getSide(point, tolerance = const_1.SIX_DECIMAL_TOLERANCE) {
        const product = utils_1.Utils.Vector2.cross3(this.start, this.end, point);
        if (number_1.NumberUtil.isEqual(product, 0, tolerance)) {
            return interface_1.LineSide.On;
        }
        else if (product > 0) {
            return interface_1.LineSide.Left;
        }
        return interface_1.LineSide.Right;
    }
    /**
     * 点是否在直线上
     *
     * Determines if the point is on the line
     */
    isPointOnLine(point, tolerance = const_1.SIX_DECIMAL_TOLERANCE) {
        return this.getDistance(point) <= tolerance;
    }
    /**
     * 点是否在线段上
     *
     * Determine if the point is on the segment
     */
    isPointOnSegment(point, tolerance = const_1.SIX_DECIMAL_TOLERANCE) {
        return this.getDistance(point, true) <= tolerance;
    }
    /**
     * 获取点在线上的投影点
     *
     * Gets the projected point of the point onto the current line
     * @param point target point 目标点
     * @param isSegment Whether to treat the current line as a segment 是否线段
     * @param useSegmentEnd When the projection point is beyond the line segment,
     * use the end of the line segment as the projection point (当投影点超出线段时，是否使用线段端点作为投影点)
     */
    getProjectedPoint(point, isSegment = false, useSegmentEnd = false) {
        // 在险段上的表现可能是 undefined
        const alpha = this.getAlpha(point);
        if (isSegment) {
            if (alpha < 0) {
                return useSegmentEnd ? this.start.clone() : undefined;
            }
            else if (alpha > 1) {
                return useSegmentEnd ? this.end.clone() : undefined;
            }
        }
        return this.interpolate(alpha);
    }
    /**
     * 获取点到线的距离
     *
     * Gets the distance from the point to the current line
     * @param point target point
     * @param isSegment Whether to treat the current line as a segment
     * @returns
     */
    getDistance(point, isSegment = false) {
        const projection = this.getProjectedPoint(point, isSegment, true);
        return utils_1.Utils.Vector2.distance(point, projection);
    }
    /**
     * 和 line 是否平行
     *
     * Determine whether the current line and line area parallel
     */
    isParallel(line) {
        return this.direction.isParallel(line.direction);
    }
    /**
     * 和 line 是否正交垂直
     *
     * Determine whether the current line and line area orthogonal
     */
    isOrthogonal(line) {
        return this.direction.isOrthogonal(line.direction);
    }
    /**
     * 是否水平线
     *
     * Determine whether the current line is a horizontal line
     */
    isHorizontal() {
        return this.direction.equals(vector2_1.Vector2.X_DIRECTION) || this.direction.equals(vector2_1.Vector2.X_DIRECTION.inverse());
    }
    /**
     * 是否竖直线
     *
     * Determine whether the current line is a vertical line
     */
    isVertical() {
        return this.direction.equals(vector2_1.Vector2.Y_DIRECTION) || this.direction.equals(vector2_1.Vector2.Y_DIRECTION.inverse());
    }
    /**
     * 计算点在线上的比例
     *
     * Gets the interpolated number
     */
    getAlpha(point, isSegment = false) {
        const alpha = utils_1.Utils.Vector2.dot3(this.start, this.end, point) / this.lengthSq;
        if (isSegment) {
            if (alpha > 1) {
                return 1;
            }
            else if (alpha < 0) {
                return 0;
            }
        }
        return alpha;
    }
    /**
     * 根据线性比例计算线上的一点
     *
     * Gets linear interpolation between start and end of this line
     * @param alpha [0, 1]
     */
    interpolate(alpha) {
        return this.start.add(this.direction.multiply(this.length * alpha));
    }
}
exports.Line2 = Line2;


/***/ }),

/***/ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/line2/interface.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/line2/interface.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LineSide = void 0;
var LineSide;
(function (LineSide) {
    /**
     * 在线的左侧
     */
    LineSide[LineSide["Left"] = 0] = "Left";
    /**
     * 在线的右侧
     */
    LineSide[LineSide["Right"] = 1] = "Right";
    /**
     * 在线上
     */
    LineSide[LineSide["On"] = 2] = "On";
})(LineSide = exports.LineSide || (exports.LineSide = {}));


/***/ }),

/***/ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/line3/index.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/line3/index.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Line3 = void 0;
const const_1 = __webpack_require__(/*! ../../const */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/const/index.js");
const utils_1 = __webpack_require__(/*! ../../utils */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/utils/index.js");
const vector3_1 = __webpack_require__(/*! ../vector3 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/vector3/index.js");
/**
 * 表示三维世界的一条线
 *
 * Class representing a line in Three-dimensional coordinate system
 */
class Line3 {
    constructor() {
        /**
         * 线的起点
         *
         * Starting point of line or segment
         */
        this.start = new vector3_1.Vector3(const_1.ZERO, const_1.ZERO);
        /**
         * 线的终点
         *
         * Ending point of line or segment
         */
        this.end = new vector3_1.Vector3(const_1.ZERO, const_1.ZERO);
        const [p1, p2] = arguments;
        if (p1 && p2) {
            this.set(p1, p2);
        }
    }
    /**
     * 设置起点和终点
     *
     * Sets the start and the end of this line
     * @param start Starting point of line or segment
     * @param end Ending point of line or segment
     * @returns 当前实例 (This line)
     */
    set(start, end) {
        if (start.equals(end)) {
            // 两个点的坐标一致，无法构成一条直线
            throw new Error(`The start point (${start.x}, ${start.y}, ${start.z}) and the end point (${end.x}, ${end.y} , ${end.z}) are the same and cannot from a line)`);
        }
        this.start = start.clone();
        this.end = end.clone();
        return this;
    }
    /**
     * 设置起点
     *
     * Sets the start of this line
     * @param point Starting point of line or segment
     * @returns 当前实例 (This line)
     */
    setStart(point) {
        if (point.equals(this.end)) {
            // 两个点的坐标一致，无法构成一条直线
            throw new Error(`The point (${point.x}, ${point.y}, ${point.z}) and the end point (${this.end.x}, ${this.end.y} , ${this.end.z}) are the same and cannot from a line)`);
        }
        this.start = point.clone();
        return this;
    }
    /**
     * 设置终点
     *
     * Sets the end of this line
     * @param point Ending point of line or segment
     * @returns 当前实例 (This line)
     */
    setEnd(point) {
        if (point.equals(this.start)) {
            // 两个点的坐标一致，无法构成一条直线
            throw new Error(`The point (${point.x}, ${point.y}, ${point.z}) and the start point (${this.start.x}, ${this.start.y} , ${this.start.z}) are the same and cannot from a line)`);
        }
        this.end = point.clone();
        return this;
    }
    /**
     * 线段的长度
     *
     * Gets the length of the current line
     */
    get length() {
        return this.end.sub(this.start).length;
    }
    /**
     * 线段长度的平方
     *
     * Gets the squared length of the current line
     */
    get lengthSq() {
        return this.end.sub(this.start).lengthSq;
    }
    /**
     * 线的方向 （起点 -> 终点）
     *
     * Gets the direction of the current line (start -> end)
     */
    get direction() {
        return this.end.sub(this.start).normalize();
    }
    /**
     * 线段的中点
     *
     * Gets the center point of the current line.
     */
    get center() {
        return this.interpolate(0.5);
    }
    /**
     * 平移线
     *
     * Translate the current line
     * @param v The vector the translation
     * @returns A new Line
     */
    translate(v) {
        const { start, end } = this;
        return new Line3(start.add(v), end.add(v));
    }
    /**
     * 获取点在线上的投影点
     *
     * Gets the projected point of the point onto the current line
     *
     * @param point 目标点 target point
     * @param isSegment 是否线段 Whether to treat the current line as a segment
     * @param useSegmentEnd 在将直线视为线段的情况下，如果投影点在线段外，是返回线段的端点还是 undefined. (When the projection point is beyond the line segment,
     * use the end of the line segment as the projection point)
     */
    getProjectedPoint(point, isSegment = false, useSegmentEnd = false) {
        const alpha = this.getAlpha(point);
        if (isSegment) {
            if (alpha < 0) {
                return useSegmentEnd ? this.start.clone() : undefined;
            }
            else if (alpha > 1) {
                return useSegmentEnd ? this.end.clone() : undefined;
            }
        }
        return this.interpolate(alpha);
    }
    /**
     * 获取点到线的距离
     *
     * Gets the distance from the point to the current line
     * @param point target point
     * @param isSegment Whether to treat the current line as a segment
     */
    getDistance(point, isSegment = false) {
        const projection = this.getProjectedPoint(point, isSegment, true);
        return utils_1.Utils.Vector3.distance(point, projection);
    }
    /**
     * 点是否在直线上
     *
     * Determines if the point is on the line
     *
     * @param point 目标点
     * @param tolerance 容差
     */
    isPointOnLine(point, tolerance = const_1.SIX_DECIMAL_TOLERANCE) {
        return this.getDistance(point) < tolerance;
    }
    /**
     * 点是否在线段上
     *
     * Determine if the point is on the segment
     *
     * @param point 目标点
     * @param tolerance 容差
     */
    isPointOnSegment(point, tolerance = const_1.SIX_DECIMAL_TOLERANCE) {
        return this.getDistance(point, true) < tolerance;
    }
    /**
     * 和 line 是否平行
     *
     * Determine whether the current line and line area parallel
     *
     * @param line 目标直线
     */
    isParallel(line) {
        return this.direction.isParallel(line.direction);
    }
    /**
     * 和 line 是否正交垂直
     *
     * Determine whether the current line and line area orthogonal
     *
     * @param line 目标直线
     */
    isOrthogonal(line) {
        return this.direction.isOrthogonal(line.direction);
    }
    /**
     * TODO
     * 和平面相交的接口，等待平面的几何结构设计
     */
    /**
     * 计算点在线上的比例
     *
     * Gets the interpolated number
     *
     * @param point 目标点
     * @param isSegment 是否将直线作为线段考虑（线段的取值范围只有 [0, 1]）
     */
    getAlpha(point, isSegment = false) {
        const alpha = utils_1.Utils.Vector3.dot3(this.start, this.end, point) / this.lengthSq;
        if (isSegment) {
            if (alpha > 1) {
                return 1;
            }
            else if (alpha < 0) {
                return 0;
            }
        }
        return alpha;
    }
    /**
     * 根据线性比例计算线上的一点
     *
     * Gets linear interpolation between start and end of this line
     * @param alpha [0, 1]
     */
    interpolate(alpha) {
        return this.start.add(this.direction.multiply(this.length * alpha));
    }
}
exports.Line3 = Line3;


/***/ }),

/***/ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/matrix3/index.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/matrix3/index.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Matrix3 = void 0;
const MATRIX3_SIZE = 9;
/**
 * 表示一个 3 x 3 的矩阵
 *
 * Class representing a three by there matrix
 */
class Matrix3 {
    /**
     * The matrix3 entries are in the following order:
     *
     *  m11  m12  m13
     *
     *  m21  m22  m23
     *
     *  m31  m32  m33
     *
     *  @default Identity Matrix
     */
    constructor(m11 = 1, m12 = 0, m13 = 0, m21 = 0, m22 = 1, m23 = 0, m31 = 0, m32 = 0, m33 = 1) {
        /**
         * Elements of the matrix
         */
        this.elements = [];
        this.elements = [
            m11, m12, m13,
            m21, m22, m23,
            m31, m32, m33,
        ];
    }
    /**
     * 依次将每个矩阵乘起来
     *
     * Multiplies the matrices
     */
    static multiplyMatrices(matrices) {
        return matrices.reduce((a, b) => a.multiply(b), Matrix3.Identity);
    }
    /**
     * 依次将每个矩阵左乘起来
     *
     * Multiplies the matrices to the left
     */
    static preMultiplyMatrices(matrices) {
        return matrices.reduce((a, b) => a.preMultiply(b), Matrix3.Identity);
    }
    /**
     * @returns the array result ma x mb
     */
    static product(a, b) {
        const [a11, a12, a13, a21, a22, a23, a31, a32, a33,] = a.elements;
        const [b11, b12, b13, b21, b22, b23, b31, b32, b33,] = b.elements;
        const m11 = a11 * b11 + a12 * b21 + a13 * b31;
        const m12 = a11 * b12 + a12 * b22 + a13 * b32;
        const m13 = a11 * b13 + a12 * b23 + a13 * b33;
        const m21 = a21 * b11 + a22 * b21 + a23 * b31;
        const m22 = a21 * b12 + a22 * b22 + a23 * b32;
        const m23 = a21 * b13 + a22 * b23 + a23 * b33;
        const m31 = a31 * b11 + a32 * b21 + a33 * b31;
        const m32 = a31 * b12 + a32 * b22 + a33 * b32;
        const m33 = a31 * b13 + a32 * b23 + a33 * b33;
        return [
            m11, m12, m13,
            m21, m22, m23,
            m31, m32, m33,
        ];
    }
    /**
     * 设置矩阵的值
     *
     * The matrix3 entries are in the following order:
     *
     *  m11  m12  m13
     *
     *  m21  m22  m23
     *
     *  m31  m32  m33
     */
    set(m11, m12, m13, m21, m22, m23, m31, m32, m33) {
        this.elements = [
            m11, m12, m13,
            m21, m22, m23,
            m31, m32, m33,
        ];
        return this;
    }
    /**
     * 将数组设置为矩阵的值
     *
     * Sets values of the current matrix by an array
     * @param elements An array of matrix elements
     * @param offset Offset to start
     * @returns 当前矩阵 this matrix
     */
    fromArray(elements, offset = 0) {
        // elements 中不足 9 位的将保持原值
        const length = elements.length - offset < MATRIX3_SIZE ? elements.length - offset : MATRIX3_SIZE;
        for (let i = 0; i < length; i++) {
            const result = elements[i + offset];
            if (typeof result === 'number') {
                this.elements[i] = elements[i + offset];
            }
        }
        return this;
    }
    /**
     * 将矩阵的值转换成数组输出
     *
     * Outputs the elements of the current matrix as an array
     */
    toArray() {
        return [...this.elements];
    }
    /**
     * 根据平移变换设置矩阵的值
     *
     * Sets this matrix from translate transform
     * @returns 当前矩阵 this matrix
     */
    fromTranslate(v) {
        this.set(1, 0, v.x, 0, 1, v.y, 0, 0, 1);
        return this;
    }
    /**
     * 根据缩放变换设置矩阵的值
     *
     * Sets this matrix from scale transform
     * @returns 当前矩阵 this matrix
     */
    fromScale(v) {
        this.set(v.x, 0, 0, 0, v.y, 0, 0, 0, 1);
        return this;
    }
    /**
     * 根据旋转变换设置矩阵的值
     *
     * Sets this matrix from rotate transform
     * @param radian theta Rotation angle in radians.
     * @returns 当前矩阵 this matrix
     */
    fromRotate(radian) {
        const c = Math.cos(radian);
        const s = Math.sin(radian);
        this.set(c, -s, 0, s, c, 0, 0, 0, 1);
        return this;
    }
    /**
     * 将矩阵 m 的值拷贝给当前矩阵
     *
     * Copies m to the current matrix
     * @returns 当前矩阵 this matrix
     */
    copy(m) {
        return this.fromArray(m.toArray());
    }
    /**
     * 复制当前矩阵
     *
     * Clones the current matrix to a new matrix
     * @returns A new matrix
     */
    clone() {
        return new Matrix3().fromArray(this.toArray());
    }
    /**
     * 乘矩阵 m
     *
     * Multiplies the current matrix by m Matrix.
     * @returns 新的矩阵 (A new matrix)
     */
    multiply(m) {
        return new Matrix3().fromArray(Matrix3.product(this, m));
    }
    /**
     * 左乘矩阵 m
     *
     * Multiplies the current matrix to the left by m Matrix
     * @returns 新的矩阵 (A new matrix)
     */
    preMultiply(m) {
        return new Matrix3().fromArray(Matrix3.product(m, this));
    }
    /**
     * 乘一个标量
     *
     * Multiplies this matrix by a number;
     * @returns 新的矩阵 (A new matrix)
     */
    multiplyScalar(v) {
        const arr = [];
        const te = this.elements;
        arr[0] = te[0] * v;
        arr[1] = te[1] * v;
        arr[2] = te[2] * v;
        arr[3] = te[3] * v;
        arr[4] = te[4] * v;
        arr[5] = te[5] * v;
        arr[6] = te[6] * v;
        arr[7] = te[7] * v;
        arr[8] = te[8] * v;
        return new Matrix3().fromArray(arr);
    }
    /**
     * 转置矩阵
     *
     * Transposes this matrix
     * @returns 新的矩阵 (A new matrix)
     */
    transpose() {
        const arr = [];
        const te = this.elements;
        arr[0] = te[0];
        arr[1] = te[3];
        arr[2] = te[6];
        arr[3] = te[1];
        arr[4] = te[4];
        arr[5] = te[7];
        arr[6] = te[2];
        arr[7] = te[5];
        arr[8] = te[8];
        return new Matrix3().fromArray(arr);
    }
    /**
     * 计算逆矩阵
     *
     * Inverts this matrix （逆矩阵）
     * @returns 新的矩阵 (A new matrix)
     */
    invert() {
        const determinant = this.determinant();
        if (determinant === 0) {
            throw new Error("The matrix determinant is zero");
        }
        const [m11, m12, m13, m21, m22, m23, m31, m32, m33,] = this.elements;
        const d = 1 / this.determinant();
        const n11 = (m22 * m33 - m32 * m23) * d;
        const n12 = -(m12 * m33 - m32 * m13) * d;
        const n13 = (m12 * m23 - m22 * m13) * d;
        const n21 = -(m21 * m33 - m31 * m23) * d;
        const n22 = (m11 * m33 - m31 * m13) * d;
        const n23 = -(m11 * m23 - m21 * m13) * d;
        const n31 = (m21 * m32 - m31 * m22) * d;
        const n32 = -(m11 * m32 - m31 * m12) * d;
        const n33 = (m11 * m22 - m21 * m12) * d;
        return new Matrix3(n11, n12, n13, n21, n22, n23, n31, n32, n33);
    }
    /**
     * 计算行列式
     *
     * Calculates the determinant of this matrix3 (行列式)
     */
    determinant() {
        const [m11, m12, m13, m21, m22, m23, m31, m32, m33,] = this.elements;
        return m11 * (m22 * m33 - m32 * m23)
            - m12 * (m21 * m33 - m31 * m23)
            + m13 * (m21 * m32 - m31 * m22);
    }
    /**
     * 计算在当前矩阵的基础上叠加平移变化后的矩阵
     *
     * Applies translate transform to this matrix
     * @returns 新的矩阵 (A new matrix)
     */
    applyTranslate(v) {
        const [m11, m12, m13, m21, m22, m23, m31, m32, m33,] = this.elements;
        const { x, y } = v;
        const arr = [];
        arr[0] = m11 + m31 * x;
        arr[1] = m12 + m32 * x;
        arr[2] = m13 + m33 * x;
        arr[3] = m21 + m31 * y;
        arr[4] = m22 + m32 * y;
        arr[5] = m23 + m33 * y;
        arr[6] = m31;
        arr[7] = m32;
        arr[8] = m33;
        return new Matrix3().fromArray(arr);
    }
    /**
     * 计算在当前矩阵的基础上叠加缩放变化后的矩阵
     *
     * Applies scale transform to this matrix
     * @returns 新的矩阵 (A new matrix)
     */
    applyScale(v) {
        const [m11, m12, m13, m21, m22, m23, m31, m32, m33,] = this.elements;
        const { x, y } = v;
        const arr = [];
        arr[0] = m11 * x;
        arr[1] = m12 * x;
        arr[2] = m13 * x;
        arr[3] = m21 * y;
        arr[4] = m22 * y;
        arr[5] = m23 * y;
        arr[6] = m31;
        arr[7] = m32;
        arr[8] = m33;
        return new Matrix3().fromArray(arr);
    }
    /**
     * 计算在当前矩阵的基础上叠加旋转变化后的矩阵
     *
     * Applies rotate transform to this matrix
     * @param radian theta Rotation angle in radians.
     * @returns 新的矩阵 (A new matrix)
     */
    applyRotate(radian) {
        const [m11, m12, m13, m21, m22, m23, m31, m32, m33,] = this.elements;
        const c = Math.cos(radian);
        const s = Math.sin(radian);
        const arr = [];
        arr[0] = m11 * c - m21 * s;
        arr[1] = m12 * c - m22 * s;
        arr[2] = m13 * c - m23 * s;
        arr[3] = m11 * s + m21 * c;
        arr[4] = m12 * s + m22 * c;
        arr[5] = m13 * s + m23 * c;
        arr[6] = m31;
        arr[7] = m32;
        arr[8] = m33;
        return new Matrix3().fromArray(arr);
    }
    /**
     * 判断矩阵是否相等
     *
     * Determines whether the current matrix and m are equal
     */
    equals(m) {
        const mArr = m.toArray();
        for (let i = 0; i < MATRIX3_SIZE; i++) {
            if (this.elements[i] !== mArr[i]) {
                return false;
            }
        }
        return true;
    }
}
exports.Matrix3 = Matrix3;
/**
 * 零矩阵
 *
 * Zero Matrix3
 */
Matrix3.Zero = new Matrix3(0, 0, 0, 0, 0, 0, 0, 0, 0);
/**
 * 单位矩阵
 *
 * Identity Matrix3
 */
Matrix3.Identity = new Matrix3(1, 0, 0, 0, 1, 0, 0, 0, 1);


/***/ }),

/***/ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/matrix4/index.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/matrix4/index.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Matrix4 = void 0;
const MATRIX4_SIZE = 16;
/**
 * 表示一个 4 x 4 的矩阵
 * Class representing a four by four matrix
 */
class Matrix4 {
    /**
     * The Matrix4 entries are in the following order:
     *
     *  m11  m12  m13 m14
     *
     *  m21  m22  m23 m24
     *
     *  m31  m32  m33 m34
     *
     *  m41  m42  m43 m44
     *
     *  @default Identity Matrix
     */
    constructor(m11 = 1, m12 = 0, m13 = 0, m14 = 0, m21 = 0, m22 = 1, m23 = 0, m24 = 0, m31 = 0, m32 = 0, m33 = 1, m34 = 0, m41 = 0, m42 = 0, m43 = 0, m44 = 1) {
        /**
         * Elements of the matrix
         */
        this.elements = [];
        this.elements = [
            m11, m12, m13, m14,
            m21, m22, m23, m24,
            m31, m32, m33, m34,
            m41, m42, m43, m44,
        ];
    }
    /**
     * 依次将每个矩阵乘起来
     *
     * Multiplies the matrices
     */
    static multiplyMatrices(matrices) {
        return matrices.reduce((a, b) => a.multiply(b), Matrix4.Identity);
    }
    /**
     * 依次将每个矩阵左乘起来
     *
     * Multiplies the matrices to the left
     */
    static preMultiplyMatrices(matrices) {
        return matrices.reduce((a, b) => a.preMultiply(b), Matrix4.Identity);
    }
    /**
     * @returns the array result ma x mb
     */
    static product(a, b) {
        const [a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, a43, a44,] = a.elements;
        const [b11, b12, b13, b14, b21, b22, b23, b24, b31, b32, b33, b34, b41, b42, b43, b44,] = b.elements;
        const m11 = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        const m12 = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        const m13 = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        const m14 = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
        const m21 = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        const m22 = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        const m23 = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        const m24 = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
        const m31 = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        const m32 = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        const m33 = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        const m34 = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
        const m41 = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        const m42 = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        const m43 = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        const m44 = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
        return [
            m11, m12, m13, m14,
            m21, m22, m23, m24,
            m31, m32, m33, m34,
            m41, m42, m43, m44,
        ];
    }
    /**
     * 设置矩阵的值
     *
     * The Matrix4 entries are in the following order:
     *
     *  m11  m12  m13 m14
     *
     *  m21  m22  m23 m24
     *
     *  m31  m32  m33 m34
     *
     *  m41  m42  m43 m44
     */
    set(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
        this.elements = [
            m11, m12, m13, m14,
            m21, m22, m23, m24,
            m31, m32, m33, m34,
            m41, m42, m43, m44,
        ];
        return this;
    }
    /**
     * 将数组设置为矩阵的值
     *
     * Sets values of the current matrix by an array
     * @param elements An array of matrix elements
     * @param offset Offset to start
     * @returns 当前矩阵 this matrix
     */
    fromArray(elements, offset = 0) {
        // elements 中不足 16 位的将保持原值
        const length = elements.length - offset < MATRIX4_SIZE ? elements.length - offset : MATRIX4_SIZE;
        for (let i = 0; i < length; i++) {
            const result = elements[i + offset];
            if (typeof result === 'number') {
                this.elements[i] = elements[i + offset];
            }
        }
        return this;
    }
    /**
     * 将矩阵的值转换成数组输出
     *
     * Outputs the elements of the current matrix as an array
     */
    toArray() {
        return [...this.elements];
    }
    /**
     * 根据平移变换设置矩阵的值
     *
     * Sets this matrix from translate transform
     * @returns 当前矩阵 this matrix
     */
    fromTranslate(v) {
        this.set(1, 0, 0, v.x, 0, 1, 0, v.y, 0, 0, 1, v.z, 0, 0, 0, 1);
        return this;
    }
    /**
     * 根据缩放变换设置矩阵的值
     *
     * Sets this matrix from scale transform
     * @returns 当前矩阵 this matrix
     */
    fromScale(v) {
        const { x, y, z } = v;
        this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
        return this;
    }
    /**
     * 根据绕 X 轴的旋转变换设置矩阵的值
     *
     * Sets this matrix from rotate transform about X-axis
     * @param radian theta Rotation angle in radians.
     * @returns 当前矩阵 this matrix
     */
    fromRotateX(radian) {
        const c = Math.cos(radian);
        const s = Math.sin(radian);
        return this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
    }
    /**
     * 根据绕 Y 轴的旋转变换设置矩阵的值
     *
     * Sets this matrix from rotate transform about Y-axis
     * @param radian theta Rotation angle in radians.
     * @returns 当前矩阵 this matrix
     */
    fromRotateY(radian) {
        const c = Math.cos(radian);
        const s = Math.sin(radian);
        return this.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);
    }
    /**
     * 根据绕 Z 轴的旋转变换设置矩阵的值
     *
     * Sets this matrix from rotate transform about Z-axis
     * @param radian theta Rotation angle in radians.
     * @returns 当前矩阵 this matrix
     */
    fromRotateZ(radian) {
        const c = Math.cos(radian);
        const s = Math.sin(radian);
        return this.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    /**
     * 将矩阵 m 的值拷贝给当前矩阵
     *
     * Copies m to the current matrix
     * @returns 当前矩阵 this matrix
     */
    copy(m) {
        return this.fromArray(m.toArray());
    }
    /**
     * 复制当前矩阵
     *
     * Clones the current matrix to a new matrix
     * @returns 新的矩阵 (A new matrix)
     */
    clone() {
        return new Matrix4().fromArray(this.toArray());
    }
    /**
     * 乘矩阵 m
     *
     * Multiplies the current matrix by m Matrix.
     * @returns 新的矩阵 (A new matrix)
     */
    multiply(m) {
        return new Matrix4().fromArray(Matrix4.product(this, m));
    }
    /**
     * 左乘矩阵 m
     *
     * Multiplies the current matrix to the left by m Matrix
     * @returns 新的矩阵 (A new matrix)
     */
    preMultiply(m) {
        return new Matrix4().fromArray(Matrix4.product(m, this));
    }
    /**
     * 乘一个标量
     *
     * Multiplies this matrix by a number;
     * @returns 新的矩阵 (A new matrix)
     */
    multiplyScalar(v) {
        const arr = [];
        const te = this.elements;
        arr[0] = te[0] * v;
        arr[1] = te[1] * v;
        arr[2] = te[2] * v;
        arr[3] = te[3] * v;
        arr[4] = te[4] * v;
        arr[5] = te[5] * v;
        arr[6] = te[6] * v;
        arr[7] = te[7] * v;
        arr[8] = te[8] * v;
        arr[9] = te[9] * v;
        arr[10] = te[10] * v;
        arr[11] = te[11] * v;
        arr[12] = te[12] * v;
        arr[13] = te[13] * v;
        arr[14] = te[14] * v;
        arr[15] = te[15] * v;
        return new Matrix4().fromArray(arr);
    }
    /**
     * 转置矩阵
     *
     * Transposes this matrix
     * @returns 新的矩阵 (A new matrix)
     */
    transpose() {
        const arr = [];
        const te = this.elements;
        arr[0] = te[0];
        arr[1] = te[4];
        arr[2] = te[8];
        arr[3] = te[12];
        arr[4] = te[1];
        arr[5] = te[5];
        arr[6] = te[9];
        arr[7] = te[13];
        arr[8] = te[2];
        arr[9] = te[6];
        arr[10] = te[10];
        arr[11] = te[14];
        arr[12] = te[3];
        arr[13] = te[7];
        arr[14] = te[11];
        arr[15] = te[15];
        return new Matrix4().fromArray(arr);
    }
    /**
     * 计算逆矩阵
     *
     * Inverts this matrix
     * @returns 新的矩阵 (A new matrix)
     */
    invert() {
        const determinant = this.determinant();
        if (determinant === 0) {
            throw new Error("The matrix determinant is zero");
        }
        const [m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44,] = this.elements;
        const d = 1 / determinant;
        /**
         * determinant for
         * m22, m23, m24,
         * m32, m33, m34,
         * m42, m43, m44,
         */
        const n11 = m22 * (m33 * m44 - m34 * m43) - m23 * (m32 * m44 - m34 * m42) + m24 * (m32 * m43 - m33 * m42);
        /**
         * determinant for
         * m21, m23, m24,
         * m31, m33, m34,
         * m41, m43, m44,
         */
        const n12 = m21 * (m33 * m44 - m34 * m43) - m23 * (m31 * m44 - m34 * m41) + m24 * (m31 * m43 - m33 * m41);
        /**
         * determinant for
         * m21, m22, m24,
         * m31, m32, m34,
         * m41, m42, m44,
         */
        const n13 = m21 * (m32 * m44 - m34 * m42) - m22 * (m31 * m44 - m34 * m41) + m24 * (m31 * m42 - m32 * m41);
        /**
         * determinant for
         * m21, m22, m23,
         * m31, m32, m33,
         * m41, m42, m43
         */
        const n14 = m21 * (m32 * m43 - m33 * m42) - m22 * (m31 * m43 - m33 * m41) + m23 * (m31 * m42 - m32 * m41);
        /**
         * determinant for
         * m12, m13, m14,
         * m32, m33, m34,
         * m42, m43, m44,
         */
        const n21 = m12 * (m33 * m44 - m34 * m43) - m13 * (m32 * m44 - m34 * m42) + m14 * (m32 * m43 - m33 * m42);
        /**
         * determinant for
         * m11, m13, m14,
         * m31, m33, m34,
         * m41, m43, m44,
         */
        const n22 = m11 * (m33 * m44 - m34 * m43) - m13 * (m31 * m44 - m34 * m41) + m14 * (m31 * m43 - m33 * m41);
        /**
         * determinant for
         * m11, m12, m14,
         * m31, m32, m34,
         * m41, m42, m44,
         */
        const n23 = m11 * (m32 * m44 - m34 * m42) - m12 * (m31 * m44 - m34 * m41) + m14 * (m31 * m42 - m32 * m41);
        /**
         * determinant for
         * m11, m12, m13,
         * m31, m32, m33,
         * m41, m42, m43,
         */
        const n24 = m11 * (m32 * m43 - m33 * m42) - m12 * (m31 * m43 - m33 * m41) + m13 * (m31 * m42 - m32 * m41);
        /**
         * determinant for
         * m12, m13, m14,
         * m22, m23, m24,
         * m42, m43, m44,
         */
        const n31 = m12 * (m23 * m44 - m24 * m43) - m13 * (m22 * m44 - m24 * m42) + m14 * (m22 * m43 - m23 * m42);
        /**
         * determinant for
         * m11, m13, m14,
         * m21, m23, m24,
         * m41, m43, m44,
         */
        const n32 = m11 * (m23 * m44 - m24 * m43) - m13 * (m21 * m44 - m24 * m41) + m14 * (m21 * m43 - m23 * m41);
        /**
         * determinant for
         * m11, m12, m14,
         * m21, m22, m24,
         * m41, m42, m44,
         */
        const n33 = m11 * (m22 * m44 - m24 * m42) - m12 * (m21 * m44 - m24 * m41) + m14 * (m21 * m42 - m22 * m41);
        /**
         * determinant for
         * m11, m12, m13,
         * m21, m22, m23,
         * m41, m42, m43,
         */
        const n34 = m11 * m11 * (m22 * m43 - m23 * m42) - m12 * (m21 * m43 - m23 * m41) + m13 * (m21 * m42 - m22 * m41);
        /**
         * determinant for
         * m12, m13, m14,
         * m22, m23, m24,
         * m32, m33, m34,
         */
        const n41 = m12 * (m23 * m34 - m24 * m33) - m13 * (m22 * m34 - m24 * m32) + m14 * (m22 * m33 - m23 * m32);
        /**
         * determinant for
         * m11, m13, m14,
         * m21, m23, m24,
         * m31, m33, m34,
         */
        const n42 = m11 * (m23 * m34 - m24 * m33) - m13 * (m21 * m34 - m24 * m31) + m14 * (m21 * m33 - m23 * m31);
        /**
         * determinant for
         * m11, m12, m14,
         * m21, m22, m24,
         * m31, m32, m34,
         */
        const n43 = m11 * (m22 * m34 - m24 * m32) - m12 * (m21 * m34 - m24 * m31) + m14 * (m21 * m32 - m22 * m31);
        /**
         * determinant for
         * m11, m12, m13,
         * m21, m22, m23,
         * m31, m32, m33,
         */
        const n44 = m11 * (m22 * m33 - m23 * m32) - m12 * (m21 * m33 - m23 * m31) + m13 * (m21 * m32 - m22 * m31);
        return new Matrix4(n11, -n12, n13, -n14, -n21, n22, -n23, n24, n31, -n32, n33, -n34, -n41, n42, -n43, n44).transpose().multiplyScalar(d);
    }
    /**
     * 计算行列式
     *
     * Calculates the determinant of this Matrix4 (行列式)
     */
    determinant() {
        const [m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44,] = this.elements;
        /**
         * determinant for
         *  m22, m23, m24,
         *  m32, m33, m34,
         *  m42, m43, m44
         */
        const n11 = m22 * (m33 * m44 - m34 * m43) - m23 * (m32 * m44 - m34 * m42) + m24 * (m32 * m43 - m33 * m42);
        /**
         * determinant for
         * m21, m23, m24,
         * m31, m33, m34,
         * m41, m43, m44
         */
        const n12 = m21 * (m33 * m44 - m34 * m43) - m23 * (m31 * m44 - m34 * m41) + m24 * (m31 * m43 - m33 * m41);
        /**
         * determinant for
         * m21, m22, m24,
         * m31, m32, m34,
         * m41, m42, m44
         */
        const n13 = m21 * (m32 * m44 - m34 * m42) - m22 * (m31 * m44 - m34 * m41) + m24 * (m31 * m42 - m32 * m41);
        /**
         * determinant for
         * m21, m22, m23,
         * m31, m32, m33,
         * m41, m42, m43
         */
        const n14 = m21 * (m32 * m43 - m33 * m42) - m22 * (m31 * m43 - m33 * m41) + m23 * (m31 * m42 - m32 * m41);
        return m11 * n11 - m12 * n12 + m13 * n13 - m14 * n14;
    }
    /**
     * 计算在当前矩阵的基础上叠加平移变化后的矩阵
     *
     * Applies translate transform to this matrix
     * @returns 新的矩阵 (A new matrix)
     */
    applyTranslate(v) {
        const [m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44,] = this.elements;
        const { x, y, z } = v;
        const arr = [];
        arr[0] = m11 + m41 * x;
        arr[1] = m12 + m42 * x;
        arr[2] = m13 + m43 * x;
        arr[3] = m14 + m44 * x;
        arr[4] = m21 + m41 * y;
        arr[5] = m22 + m42 * y;
        arr[6] = m23 + m43 * y;
        arr[7] = m24 + m44 * y;
        arr[8] = m31 + m41 * z;
        arr[9] = m32 + m42 * z;
        arr[10] = m33 + m43 * z;
        arr[11] = m34 + m44 * z;
        arr[12] = m41;
        arr[13] = m42;
        arr[14] = m43;
        arr[15] = m44;
        return new Matrix4().fromArray(arr);
    }
    /**
     * 计算在当前矩阵的基础上叠加缩放变化后的矩阵
     *
     * Applies scale transform to this matrix
     * @returns 新的矩阵 (A new matrix)
     */
    applyScale(v) {
        const { x, y, z } = v;
        const arr = [...this.elements];
        arr[0] *= x;
        arr[1] *= x;
        arr[2] *= x;
        arr[3] *= x;
        arr[4] *= y;
        arr[5] *= y;
        arr[6] *= y;
        arr[7] *= y;
        arr[8] *= z;
        arr[9] *= z;
        arr[10] *= z;
        arr[11] *= z;
        return new Matrix4().fromArray(arr);
    }
    /**
     * 计算在当前矩阵的基础上叠加绕 X 轴旋转变化后的矩阵
     *
     * Applies rotate transform about X-axis to this matrix
     * @param radian theta Rotation angle in radians.
     * @returns 新的矩阵 (A new matrix)
     */
    applyRotateX(radian) {
        return this.preMultiply(new Matrix4().fromRotateX(radian));
    }
    /**
     * 计算在当前矩阵的基础上叠加绕 Y 轴旋转变化后的矩阵
     *
     * Applies rotate transform about Y-axis to this matrix
     * @param radian theta Rotation angle in radians.
     * @returns 新的矩阵 (A new matrix)
     */
    applyRotateY(radian) {
        return this.preMultiply(new Matrix4().fromRotateY(radian));
    }
    /**
     * 计算在当前矩阵的基础上叠加绕 Z 轴旋转变化后的矩阵
     *
     * Applies rotate transform about Z-axis to this matrix
     * @param radian theta Rotation angle in radians.
     * @returns 新的矩阵 (A new matrix)
     */
    applyRotateZ(radian) {
        return this.preMultiply(new Matrix4().fromRotateZ(radian));
    }
    /**
     * 判断矩阵是否相等
     *
     * Determines whether the current matrix and m are equal
     */
    equals(m) {
        const mArr = m.toArray();
        for (let i = 0; i < MATRIX4_SIZE; i++) {
            if (this.elements[i] !== mArr[i]) {
                return false;
            }
        }
        return true;
    }
}
exports.Matrix4 = Matrix4;
/**
 * 零矩阵
 *
 * Zero Matrix4
 */
Matrix4.Zero = new Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
/**
 * 单位矩阵
 *
 * Identity Matrix4
 */
Matrix4.Identity = new Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);


/***/ }),

/***/ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/polygon/index.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/polygon/index.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Polygon = void 0;
const const_1 = __webpack_require__(/*! ../../const */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/const/index.js");
const line2_1 = __webpack_require__(/*! ../line2 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/line2/index.js");
const vector2_1 = __webpack_require__(/*! ../vector2 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/vector2/index.js");
/**
 * 表示二维的一个多边形
 */
class Polygon {
    /**
     * @param points 多边形的顶点数据（最后一个和第一个闭合）
     */
    constructor(points = []) {
        /**
         * 多边形的顶点数据（最后一个和第一个闭合）
         */
        this.points = [];
        this.points = [...points];
    }
    /**
     * 设置多边形的顶点
     * @param points 多边形的顶点数据（最后一个和第一个闭合）
     */
    setPath(points) {
        this.points = [...points];
    }
    /**
     * 增加顶点
     * @param point 一个或者多个顶点数据
     */
    addPoint(point) {
        const points = Array.isArray(point) ? point : [point];
        points.forEach(p => this.points.push(p));
        return this;
    }
    /**
     * 获取多边形的边
     */
    getEdges() {
        return this.points.map((pi, i) => {
            const j = i === length ? 0 : i + 1;
            const pj = this.points[j];
            return new line2_1.Line2(pi, pj);
        });
    }
    /**
     * 获取多边形的中心点（所有坐标点的平均值）
     */
    getCenter() {
        const length = this.points.length;
        return this.points.reduce((result, point) => result.add(point), new vector2_1.Vector2(0, 0)).divide(length);
    }
    /**
     * 获取多边形的重心（几何中心）
     */
    getCentroid() {
        let totalArea = 0;
        let centroidX = 0;
        let centroidY = 0;
        this.points.forEach((pi, i) => {
            const j = i === this.points.length - 1 ? 0 : i + 1;
            const pj = this.points[j];
            const area = (pi.x * pj.y - pi.y * pj.x) / 2; // 等同于 Vector2.cross((0, 0), pi, pj) / 2
            centroidX += (pi.x + pj.x) / 3 * area;
            centroidY += (pi.y + pj.y) / 3 * area;
            totalArea += area;
        });
        return new vector2_1.Vector2(centroidX / totalArea, centroidY / totalArea);
    }
    /**
     * 判断目标点是否在多边形内
     * @param point 目标点
     * @param includeEdge 多边形范围是否包含边
     * @param tolerance 误差
     */
    isPointInsidePolygon(point, includeEdge = true, tolerance = const_1.SIX_DECIMAL_TOLERANCE) {
        const { x, y } = point;
        let inSide = false;
        const length = this.points.length;
        for (let i = 0, j = i + 1; i < length; i++) {
            j = i === length - 1 ? 0 : i + 1;
            const pi = this.points[i];
            const pj = this.points[j];
            const isOnEdge = (new line2_1.Line2(pi, pj)).isPointOnSegment(point, tolerance);
            if (!includeEdge && isOnEdge) {
                // 如果目标不包含在边上，且就在边上，那认为不在多边形内
                return false;
            }
            const { x: xi, y: yi } = pi;
            const { x: xj, y: yj } = pj;
            /**
             * 原理：从 point 发射一条射线，与多边形的交点为奇数个，则在内；偶数个，则在外
             * @link https://github.com/substack/point-in-polygon/blob/master/index.js
             *
             * 实现：从 point 发射 X 负方向的射线，判断其和多边形的交点
             *
             * ((yi > y) !== (yj > y)) 某边的两个端点要在 point 的上下两侧（Y 方向）
             *
             * (xi + (y - yi) / (yj - yi) * (xj - xi) < x) 射线和边的交点要在 point.x 的负方向侧
             */
            const intersected = ((yi > y) !== (yj > y)) && (xi + (y - yi) / (yj - yi) * (xj - xi) < x);
            if (intersected) {
                inSide = !inSide;
            }
        }
        return inSide;
    }
    /**
     * 判断目标点是否在多边形的边上
     * @param point 目标点
     * @param tolerance 误差
     */
    isPointOnEdge(point, tolerance = const_1.SIX_DECIMAL_TOLERANCE) {
        const length = this.points.length - 1;
        return this.points.some((pi, i) => {
            const j = i === length ? 0 : i + 1;
            const pj = this.points[j];
            return (new line2_1.Line2(pi, pj)).isPointOnSegment(point, tolerance);
        });
    }
}
exports.Polygon = Polygon;


/***/ }),

/***/ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/vector2/index.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/vector2/index.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Vector2 = void 0;
const const_1 = __webpack_require__(/*! ../../const */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/const/index.js");
const number_1 = __webpack_require__(/*! ../../common/number */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/common/number.js");
/**
 * 表示二维的一个向量
 *
 * Class representing a vector containing 2 coordinates
 */
class Vector2 {
    constructor() {
        /**
         * 向量的 x 值
         *
         * The X value of the current vector
         * @default 0
         */
        this.x = const_1.ZERO;
        /**
         * 向量的 y 值
         *
         * The Y value of the current vector
         * @default 0
         */
        this.y = const_1.ZERO;
        const [p1, p2] = arguments;
        this.set(p1, p2);
    }
    set() {
        if (typeof arguments[0] === 'number' || typeof arguments[1] === 'number') {
            this.x = arguments[0] === undefined ? this.x : arguments[0];
            this.y = arguments[1] === undefined ? this.y : arguments[1];
        }
        else if (typeof arguments[0] === 'object') {
            const { x, y } = arguments[0];
            this.x = x === undefined ? this.x : x;
            this.y = y === undefined ? this.y : y;
        }
        return this;
    }
    /**
     * 设置向量的 x 值
     *
     * Sets the X value of this vector
     * @returns 当前向量 (this vector2)
     */
    setX(x) {
        this.x = x;
        return this;
    }
    /**
     * 设置向量的 y 值
     *
     * Sets the Y value of this vector
     * @returns 当前向量 (this vector2)
     */
    setY(y) {
        this.y = y;
        return this;
    }
    /**
     * 将向量 v 的值拷贝给当前向量
     *
     * Copies v to this vector
     * @returns 当前向量 (this vector2)
     */
    copy(v) {
        return this.set(v);
    }
    /**
     * 复制当前向量
     *
     * Clones this vector to a new vector
     * @returns 新的向量 (A new Vector)
     */
    clone() {
        return new Vector2(this);
    }
    /**
     * 向量的长度
     *
     * Get the length of this vector.
     */
    get length() {
        return Math.sqrt(this.lengthSq);
    }
    /**
     * 向量长度的平方
     *
     * Get the squared length of this vector.
     */
    get lengthSq() {
        return this.x * this.x + this.y * this.y;
    }
    /**
     * 向量的角度
     *
     * Computes the angle in radians with respect to the horizontal left axis
     *
     * 弧度制，范围在 [ 0, 2 * PI )，逆时针为正
     *
     * Radians in range [ 0, 2 * PI ), counterclockwise
     */
    get angle() {
        // Math.atan2 value range: 
        // [0, 180] -> [0, PI]
        // (180, 360) -> (-PI, 0)
        const radian = Math.atan2(this.y, this.x);
        return radian < 0 ? radian + const_1.TWO_PI : radian;
    }
    add() {
        const value = arguments[0];
        const { x, y } = this;
        if (typeof value === 'number') {
            return new Vector2(x + value, y + value);
        }
        else if (typeof value === 'object') {
            const vx = value.x || const_1.ZERO;
            const vy = value.y || const_1.ZERO;
            return new Vector2(x + vx, y + vy);
        }
        return this.clone();
    }
    sub() {
        const value = arguments[0];
        const { x, y } = this;
        if (typeof value === 'number') {
            return new Vector2(x - value, y - value);
        }
        else if (typeof value === 'object') {
            const vx = value.x || const_1.ZERO;
            const vy = value.y || const_1.ZERO;
            return new Vector2(x - vx, y - vy);
        }
        return this.clone();
    }
    multiply() {
        const value = arguments[0];
        const { x, y } = this;
        if (typeof value === 'number') {
            return new Vector2(x * value, y * value);
        }
        else if (typeof value === 'object') {
            const vx = value.x || 1;
            const vy = value.y || 1;
            return new Vector2(x * vx, y * vy);
        }
        return this.clone();
    }
    divide() {
        const value = arguments[0];
        const { x, y } = this;
        if (typeof value === 'number') {
            return new Vector2(x / value, y / value);
        }
        else if (typeof value === 'object') {
            const vx = value.x || 1;
            const vy = value.y || 1;
            return new Vector2(x / vx, y / vy);
        }
        return this.clone();
    }
    /**
     * 对当前向量应用矩阵
     *
     * Apply matrix3 to the current vector
     * @param matrix a Matrix3
     * @returns A new Vector2
     */
    applyMatrix3(matrix) {
        const [m11, m12, m13, m21, m22, m23,] = matrix.toArray();
        const { x, y } = this;
        const vx = m11 * x + m12 * y + m13;
        const vy = m21 * x + m22 * y + m23;
        return new Vector2(vx, vy);
    }
    /**
     * 逆向量
     *
     * Inverse the current vector
     * @returns A new Vector2
     */
    inverse() {
        const x = this.x === 0 ? 0 : -this.x;
        const y = this.y === 0 ? 0 : -this.y;
        return new Vector2(x, y);
    }
    /**
     * 单位向量
     *
     * Normalizes the current vector.
     * @returns A new Vector2
     */
    normalize() {
        return this.clone().divide(this.length || 1);
    }
    /**
     * 点乘
     *
     * Computes dot product of the current vector and v
     */
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    /**
     * 叉乘
     *
     * Computes cross product of the current vector and v
     *
     * The cross product of Vector2 is just a scalar of z-axis
     */
    cross(v) {
        return this.x * v.y - this.y * v.x;
    }
    /**
     * 两个向量是否相等
     *
     * Determines whether the current vector and v are equal
     */
    equals(v) {
        // todo tolerance
        return this.x === v.x && this.y === v.y;
    }
    /**
     * 两个向量是否平行
     *
     * Determines  whether the current vector and v are parallel
     */
    isParallel(v, tolerance = const_1.SIX_DECIMAL_TOLERANCE) {
        return number_1.NumberUtil.isEqual(this.cross(v), 0, tolerance);
    }
    /**
     * 两个向量是否正交垂直
     *
     * Determines whether the current vector and v are orthogonal
     */
    isOrthogonal(v, tolerance = const_1.SIX_DECIMAL_TOLERANCE) {
        return number_1.NumberUtil.isEqual(this.dot(v), 0, tolerance);
    }
}
exports.Vector2 = Vector2;
/**
 * Vector2 (0, 0)
 */
Vector2.ZERO = new Vector2(const_1.ZERO, const_1.ZERO);
/**
 * Vector2 (1, 1)
 */
Vector2.ONE = new Vector2(const_1.ONE, const_1.ONE);
/**
 * Vector2 (Infinity, Infinity)
 */
Vector2.MAX = new Vector2(const_1.MAX, const_1.MAX);
/**
 * Vector2 (-Infinity, -Infinity)
 */
Vector2.MIN = new Vector2(const_1.MIN, const_1.MIN);
/**
 * X轴正方向
 *
 * The positive direction of the X-Axis
 */
Vector2.X_DIRECTION = new Vector2(const_1.ONE, const_1.ZERO);
/**
 * Y轴正方向
 *
 * The positive direction of the Y-Axis
 */
Vector2.Y_DIRECTION = new Vector2(const_1.ZERO, const_1.ONE);


/***/ }),

/***/ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/vector3/index.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/vector3/index.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Vector3 = void 0;
const const_1 = __webpack_require__(/*! ../../const */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/const/index.js");
const number_1 = __webpack_require__(/*! ../../common/number */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/common/number.js");
/**
 * 表示三维的一个向量
 *
 * Class representing a vector containing 3 coordinates
 */
class Vector3 {
    constructor() {
        /**
         * 向量的 x 值
         *
         * The X value of the current vector
         * @default 0
         */
        this.x = const_1.ZERO;
        /**
         * 向量的 y 值
         *
         * The Y value of the current vector
         * @default 0
         */
        this.y = const_1.ZERO;
        /**
         * 向量的 z 值
         *
         * The Z value of the current vector
         * @default 0
         */
        this.z = const_1.ZERO;
        const [p1, p2, p3] = arguments;
        this.set(p1, p2, p3);
    }
    set() {
        if (typeof arguments[0] === 'number' || typeof arguments[1] === 'number' || typeof arguments[2] === 'number') {
            this.x = arguments[0] === undefined ? this.x : arguments[0];
            this.y = arguments[1] === undefined ? this.y : arguments[1];
            this.z = arguments[2] === undefined ? this.z : arguments[2];
        }
        else if (typeof arguments[0] === 'object') {
            const { x, y, z } = arguments[0];
            this.x = x === undefined ? this.x : x;
            this.y = y === undefined ? this.y : y;
            this.z = z === undefined ? this.z : z;
        }
        return this;
    }
    /**
     * 设置向量的 x 值
     *
     * Sets the x value of the current vector
     * @returns 当前向量 (this vector3)
     */
    setX(x) {
        this.x = x;
        return this;
    }
    /**
     * 设置向量的 y 值
     *
     * Sets the y value of the current vector
     * @returns 当前向量 (this vector3)
     */
    setY(y) {
        this.y = y;
        return this;
    }
    /**
     * 设置向量的 z 值
     *
     * Sets the z value of the current vector
     * @returns 当前向量 (this vector3)
     */
    setZ(z) {
        this.z = z;
        return this;
    }
    /**
     * 将向量 v 的值拷贝给当前向量
     *
     * Copies v to this vector
     */
    copy(v) {
        return this.set(v);
    }
    /**
     * 复制当前向量
     *
     * Clones this vector to a new vector
     */
    clone() {
        return new Vector3(this);
    }
    /**
     * 向量的长度
     *
     * Computes length of this vector.
     */
    get length() {
        return Math.sqrt(this.lengthSq);
    }
    /**
     * 向量长度的平方
     *
     * Computes squared length of this vector.
     */
    get lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    add() {
        const value = arguments[0];
        const { x, y, z } = this;
        if (typeof value === 'number') {
            return new Vector3(x + value, y + value, z + value);
        }
        else if (typeof value === 'object') {
            const vx = value.x || const_1.ZERO;
            const vy = value.y || const_1.ZERO;
            const vz = value.z || const_1.ZERO;
            return new Vector3(x + vx, y + vy, z + vz);
        }
        return this.clone();
    }
    sub() {
        const value = arguments[0];
        const { x, y, z } = this;
        if (typeof value === 'number') {
            return new Vector3(x - value, y - value, z - value);
        }
        else if (typeof value === 'object') {
            const vx = value.x || const_1.ZERO;
            const vy = value.y || const_1.ZERO;
            const vz = value.z || const_1.ZERO;
            return new Vector3(x - vx, y - vy, z - vz);
        }
        return this.clone();
    }
    multiply() {
        const value = arguments[0];
        const { x, y, z } = this;
        if (typeof value === 'number') {
            return new Vector3(x * value, y * value, z * value);
        }
        else if (typeof value === 'object') {
            const vx = value.x || const_1.ONE;
            const vy = value.y || const_1.ONE;
            const vz = value.z || const_1.ONE;
            return new Vector3(x * vx, y * vy, z * vz);
        }
        return this.clone();
    }
    divide() {
        const value = arguments[0];
        const { x, y, z } = this;
        if (typeof value === 'number') {
            return new Vector3(x / value, y / value, z / value);
        }
        else if (typeof value === 'object') {
            const vx = value.x || const_1.ONE;
            const vy = value.y || const_1.ONE;
            const vz = value.z || const_1.ONE;
            return new Vector3(x / vx, y / vy, z / vz);
        }
        return this.clone();
    }
    /**
     * 对当前向量应用矩阵
     *
     * Apply matrix4 to the current vector
     * @param matrix A Matrix$
     * @returns A new Vector3
     */
    applyMatrix4(matrix) {
        const [m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34,] = matrix.toArray();
        const { x, y, z } = this;
        const vx = m11 * x + m12 * y + m13 * z + m14;
        const vy = m21 * x + m22 * y + m23 * z + m24;
        const vz = m31 * x + m32 * y + m33 * z + m34;
        return new Vector3(vx, vy, vz);
    }
    /**
     * 逆向量
     *
     * Inverse the current vector
     * @returns A new Vector3
     */
    inverse() {
        const { x, y, z } = this;
        return new Vector3(-x, -y, -z);
    }
    /**
     * 单位向量
     *
     * Normalizes this vector.
     * @returns A new Vector3
     */
    normalize() {
        return this.clone().divide(this.length || 1);
    }
    /**
     * 点乘
     *
     * Computes dot product of this vector and v
     */
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    /**
     * 叉乘
     *
     * Computes cross product of this vector and v
     *
     * @returns {Vector3} new Vector
     */
    cross(v) {
        return new Vector3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
    }
    /**
     * 两个向量是否相等
     *
     * Determines whether this vector and v are equal
     */
    equals(v) {
        // todo tolerance
        return this.x === v.x && this.y === v.y && this.z === v.z;
    }
    /**
     * 两个向量是否平行
     *
     * Determines  whether this vector and v are parallel
     */
    isParallel(v) {
        const l1 = this.length;
        const l2 = v.length;
        if (l1 === 0 || l2 === 0) {
            // zero vector
            return true;
        }
        // cosθ === 0
        const cos = this.dot(v) / (l1 * l2);
        return number_1.NumberUtil.isEqual(cos, 1) || number_1.NumberUtil.isEqual(cos, -1);
    }
    /**
     * 两个向量是否正交垂直
     *
     * Determines whether this vector and v are orthogonal
     */
    isOrthogonal(v) {
        return this.dot(v) === 0;
    }
}
exports.Vector3 = Vector3;
/**
 * Vector3 (0, 0, 0)
 */
Vector3.ZERO = new Vector3(const_1.ZERO, const_1.ZERO, const_1.ZERO);
/**
 * Vector3 (1, 1, 1)
 */
Vector3.ONE = new Vector3(const_1.ONE, const_1.ONE, const_1.ONE);
/**
 * Vector3 (Infinity, Infinity, Infinity)
 */
Vector3.MAX = new Vector3(const_1.MAX, const_1.MAX, const_1.MAX);
/**
 * Vector3 (-Infinity, -Infinity, -Infinity)
 */
Vector3.MIN = new Vector3(const_1.MIN, const_1.MIN, const_1.MIN);
/**
 * X轴正方向
 *
 * The positive direction of the X-Axis
 */
Vector3.X_DIRECTION = new Vector3(const_1.ONE, const_1.ZERO, const_1.ZERO);
/**
 * Y轴正方向
 *
 * The positive direction of the Y-Axis
 */
Vector3.Y_DIRECTION = new Vector3(const_1.ZERO, const_1.ONE, const_1.ZERO);
/**
 * Z轴正方向
 *
 * The positive direction of the Z-Axis
 */
Vector3.Z_DIRECTION = new Vector3(const_1.ZERO, const_1.ZERO, const_1.ONE);


/***/ }),

/***/ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/utils/circle.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/utils/circle.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CircleUtil = void 0;
const const_1 = __webpack_require__(/*! ../const */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/const/index.js");
const matrix3_1 = __webpack_require__(/*! ../unit/matrix3 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/matrix3/index.js");
const vector2_1 = __webpack_require__(/*! ../unit/vector2 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/vector2/index.js");
class CircleUtil {
    /**
     * 获取点在圆上的角度（水平向右为 0）
     *
     * @param center 圆心
     * @param point 目标点
     * @param isClockwise 圆周是否顺时针（默认：false）
     *
     * @returns 目标角度（弧度制 radian）
     */
    static getAngleByPoint(center, point, isClockwise = false) {
        const angle = point.sub(center).angle;
        return isClockwise ? const_1.TWO_PI - angle : angle;
    }
    /**
     * 获取角度对应圆周上的点（水平向右为 0）
     *
     * @param center 圆心
     * @param radius 半径
     * @param radian 目标角度 （弧度制 radian）
     * @param isClockwise 圆周是否顺时针（默认：false）
     *
     * @returns 目标点
     */
    static getPointByAngle(center, radius, radian, isClockwise = false) {
        const angle = isClockwise ? const_1.TWO_PI - (radian % const_1.TWO_PI) : (radian % const_1.TWO_PI);
        const rotate = (new matrix3_1.Matrix3()).fromRotate(angle);
        return center.add(vector2_1.Vector2.X_DIRECTION.applyMatrix3(rotate).multiply(radius));
    }
}
exports.CircleUtil = CircleUtil;


/***/ }),

/***/ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/utils/index.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/utils/index.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Utils = void 0;
const circle_1 = __webpack_require__(/*! ./circle */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/utils/circle.js");
const line2_1 = __webpack_require__(/*! ./line2 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/utils/line2.js");
const line3_1 = __webpack_require__(/*! ./line3 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/utils/line3.js");
const vector2_1 = __webpack_require__(/*! ./vector2 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/utils/vector2.js");
const vector3_1 = __webpack_require__(/*! ./vector3 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/utils/vector3.js");
exports.Utils = {
    Vector2: vector2_1.Vector2Util,
    Vector3: vector3_1.Vector3Util,
    Line2: line2_1.Line2Util,
    Line3: line3_1.Line3Util,
    Circle: circle_1.CircleUtil,
};


/***/ }),

/***/ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/utils/line2.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/utils/line2.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Line2Util = void 0;
const line2_1 = __webpack_require__(/*! ../unit/line2 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/line2/index.js");
const vector2_1 = __webpack_require__(/*! ../unit/vector2 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/vector2/index.js");
class Line2Util {
    /**
     * 两条直线是否相交
     *
     * Determine whether lines L1 and L2 intersect (判断：直线 l1 和直线 l2 是否相交)
     * @param line1 straight line1
     * @param line2 straight line2
     * @returns
     */
    static isLineIntersectLine(line1, line2) {
        return !line1.isParallel(line2);
    }
    /**
     * 直线 line 和线段 segment 是否相交
     *
     * Determine whether the straight line and the line segment intersect (判断：直线 line 和线段 segment 是否相交)
     * @param line straight line
     * @param segment segment line
     * @returns
     */
    static isLineIntersectSegment(line, segment) {
        if (line.isParallel(segment)) {
            return false;
        }
        // 判断 segment 的端点是否在直线的两侧，或在直线上
        const startSide = line.getSide(segment.start);
        const endSide = line.getSide(segment.end);
        return (startSide === line2_1.LineSide.On || endSide === line2_1.LineSide.On) || startSide !== endSide;
    }
    /**
     * 两条线段是否相交
     *
     * Determine whether the line segments intersect (判断：线段 segment1 和线段 segment2 是否相交)
     * @param segment1 line segment1
     * @param segment2 line segment2
     */
    static isSegmentIntersectSegment(segment1, segment2) {
        // 判断：每条线段都分别跨越了另一条线段所在直线，即两个端点分别在该直线两侧
        const startSide1 = segment2.getSide(segment1.start);
        const endSide1 = segment2.getSide(segment1.end);
        const startSide2 = segment1.getSide(segment2.start);
        const endSide2 = segment1.getSide(segment2.end);
        if (startSide1 === line2_1.LineSide.On && segment2.isPointOnSegment(segment1.start) ||
            endSide1 === line2_1.LineSide.On && segment2.isPointOnSegment(segment1.end) ||
            startSide2 === line2_1.LineSide.On && segment1.isPointOnSegment(segment2.start) ||
            endSide2 === line2_1.LineSide.On && segment1.isPointOnSegment(segment2.end)) {
            return true;
        }
        return startSide1 !== endSide1 && startSide2 !== endSide2;
    }
    /**
     * 求两条直线的交点
     *
     * Calculate the intersection of line1 and line2
     * @param line1 straight line
     * @param line2 straight line
     */
    static lineIntersectLine(line1, line2) {
        // { x0, y0 } { x1, y1 } 是 line1 上的两个点
        const { x: x0, y: y0 } = line1.start;
        const { x: x1, y: y1 } = line1.end;
        // { x2, y2 } { x3, y3 } 是 line2 上的两个点
        const { x: x2, y: y2 } = line2.start;
        const { x: x3, y: y3 } = line2.end;
        /**
         * 计算直线一般式
         * Ax + By + C = 0
         *
         * 配置一：
         * A = y2 - y1;
         * B = x1 - x2;
         * C = x2 * y1 - x1 * y2;
         *
         * 配置二：
         * A = y1 - y2;
         * B = x2 - x1;
         * C = x1 * y2 - x2 * y1
         */
        const a1 = y1 - y0;
        const b1 = x0 - x1;
        const c1 = x1 * y0 - x0 * y1;
        const a2 = y3 - y2;
        const b2 = x2 - x3;
        const c2 = x3 * y2 - x2 * y3;
        // A1 * B2 = B1 * A2 则两直线平行，详见：https://baike.baidu.com/item/%E4%B8%80%E8%88%AC%E5%BC%8F
        const result = a1 * b2 - a2 * b1;
        if (result === 0) {
            // 两直线平行
            return undefined;
        }
        const x = (b1 * c2 - b2 * c1) / result;
        const y = (a2 * c1 - a1 * c2) / result;
        return new vector2_1.Vector2(x, y);
    }
    /**
     * 求支直线 line 和线段 segment 的交点
     *
     * Calculate the intersection of line and segment
     * @param line straight line
     * @param segment segment line
     */
    static lineIntersectSegment(line, segment) {
        const point = this.lineIntersectLine(line, segment);
        if (point) {
            if (segment.isPointOnSegment(point)) {
                return point;
            }
        }
    }
    /**
     * 求两条线段的交点
     *
     * Calculate the intersection of segment1 and segment2
     * @param segment1 segment line
     * @param segment2 segment line
     */
    static segmentIntersectSegment(segment1, segment2) {
        const point = this.lineIntersectLine(segment1, segment2);
        if (point) {
            if (segment1.isPointOnSegment(point) && segment2.isPointOnSegment(point)) {
                return point;
            }
        }
    }
    /**
     * 计算通过 point 的 line 的垂线
     *
     * Calculate the perpendicular to the line passing through the point
     *
     * @param line 目标直线
     * @param point 目标点
     */
    static calcPerpendicularThroughPoint(line, point) {
        const verticalDir = line.getSide(point) === line2_1.LineSide.Right ? line.rightDirection : line.leftDirection;
        return new line2_1.Line2(point, point.add(verticalDir.multiply(10)));
    }
}
exports.Line2Util = Line2Util;


/***/ }),

/***/ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/utils/line3.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/utils/line3.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Line3Util = void 0;
const vector3_1 = __webpack_require__(/*! ../unit/vector3 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/vector3/index.js");
class Line3Util {
    /**
     * 直线 line 是否和 X轴 平行
     *
     * Determines the line is parallel to X-Axis
     */
    static isParallelToXAxis(line) {
        return line.direction.isParallel(vector3_1.Vector3.X_DIRECTION);
    }
    /**
     * 直线 line 是否和 Y轴 平行
     *
     * Determines the line is parallel to Y-Axis
     */
    static isParallelToYAxis(line) {
        return line.direction.isParallel(vector3_1.Vector3.Y_DIRECTION);
    }
    /**
     * 直线 line 是否和 Z轴 平行
     *
     * Determines the line is parallel to Z-Axis
     */
    static isParallelToZAxis(line) {
        return line.direction.isParallel(vector3_1.Vector3.Z_DIRECTION);
    }
}
exports.Line3Util = Line3Util;


/***/ }),

/***/ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/utils/vector2.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/utils/vector2.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Vector2Util = void 0;
const vector2_1 = __webpack_require__(/*! ../unit/vector2 */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/unit/vector2/index.js");
class Vector2Util {
    /**
     * 获取垂直于目标向量的左向量
     *
     * Get the left vector2 perpendicular to the vec
     * @param vec the target vector2
     */
    static getLeftDirection(vec) {
        // equals to - vec.applyMatrix3(new Matrix3().fromRotate(Math.PI / 2));
        const { x, y } = vec;
        return new vector2_1.Vector2(-y, x);
    }
    /**
     * 获取垂直于目标向量的右向量
     *
     * Get the right vector2 perpendicular to the vec
     * @param vec the target vector2
     */
    static getRightDirection(vec) {
        // equals to - vec.applyMatrix3(new Matrix3().fromRotate(Math.PI * 3 / 2));
        const { x, y } = vec;
        return new vector2_1.Vector2(y, -x);
    }
    /**
     * 计算向量(v2 -> v1) 和向量(v3 -> v1) 的叉积
     *
     * Computes cross product of (v2 -> v1) and (v3 -> v1)
     */
    static cross3(v1, v2, v3) {
        const v12 = v2.sub(v1);
        const v13 = v3.sub(v1);
        return v12.cross(v13);
    }
    /**
     * 计算向量(v2 -> v1) 和向量(v3 -> v1) 的点积
     *
     * Computes dot product of (v2 -> v1) and (v3 -> v1)
     */
    static dot3(v1, v2, v3) {
        const v12 = v2.sub(v1);
        const v13 = v3.sub(v1);
        return v12.dot(v13);
    }
    /**
     * 获取两点间的距离
     *
     * Computed the distance from v1 to v2
     */
    static distance(v1, v2) {
        return v2.sub(v1).length;
    }
    /**
     * 计算 v1 -> v2 的方向向量
     *
     * Computed the direction from v1 to v2
     *
     * @param v1 Vector2
     * @param v2 Vector2
     */
    static direction(v1, v2) {
        return v2.sub(v1).normalize();
    }
    /**
     * 计算（v1, v2）的中点
     *
     * Computed the center of v1 and v2
     *
     * @param v1 Vector2
     * @param v2 Vector2
     */
    static center(v1, v2) {
        return this.interpolate(v1, v2, 0.5);
    }
    /**
     * 计算 v1 到 v2 的线性插值
     *
     * Calculate the linear interpolation of v1 to v2
     *
     * @param v1 Vector2
     * @param v2 Vector2
     * @param alpha 线性插值的百分比
     */
    static interpolate(v1, v2, alpha) {
        const direction = v2.sub(v1);
        return v1.add(direction.normalize().multiply(direction.length * alpha));
    }
}
exports.Vector2Util = Vector2Util;


/***/ }),

/***/ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/utils/vector3.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/utils/vector3.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Vector3Util = void 0;
class Vector3Util {
    /**
     * 计算向量(v2 -> v1) 和向量(v3 -> v1) 的叉积
     *
     * Computes cross product of (v2 -> v1) and (v3 -> v1)
     */
    static cross3(v1, v2, v3) {
        const v12 = v2.sub(v1);
        const v13 = v3.sub(v1);
        return v12.cross(v13);
    }
    /**
     * 计算向量(v2 -> v1) 和向量(v3 -> v1) 的点积
     *
     * Computes dot product of (v2 -> v1) and (v3 -> v1)
     */
    static dot3(v1, v2, v3) {
        const v12 = v2.sub(v1);
        const v13 = v3.sub(v1);
        return v12.dot(v13);
    }
    /**
     * 获取两点间的距离
     *
     * Computed the distance from v1 to v2
     */
    static distance(v1, v2) {
        return v2.sub(v1).length;
    }
    /**
     * 计算 v1 到 v2 的线性插值
     *
     * Calculate the linear interpolation of v1 to v2
     *
     * @param v1 Vector3
     * @param v2 Vector3
     * @param alpha 线性插值的百分比
     */
    static interpolate(v1, v2, alpha) {
        const direction = v2.sub(v1);
        return v1.add(direction.normalize().multiply(direction.length * alpha));
    }
}
exports.Vector3Util = Vector3Util;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_DataView.js":
/*!****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_DataView.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Hash.js":
/*!************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Hash.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hashClear = __webpack_require__(/*! ./_hashClear */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashClear.js"),
    hashDelete = __webpack_require__(/*! ./_hashDelete */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashDelete.js"),
    hashGet = __webpack_require__(/*! ./_hashGet */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashGet.js"),
    hashHas = __webpack_require__(/*! ./_hashHas */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashHas.js"),
    hashSet = __webpack_require__(/*! ./_hashSet */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashSet.js");

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_ListCache.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_ListCache.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheClear.js"),
    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheDelete.js"),
    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheGet.js"),
    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheHas.js"),
    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheSet.js");

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Map.js":
/*!***********************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Map.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_MapCache.js":
/*!****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_MapCache.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheClear.js"),
    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheDelete.js"),
    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheGet.js"),
    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheHas.js"),
    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheSet.js");

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Promise.js":
/*!***************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Promise.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Set.js":
/*!***********************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Set.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_SetCache.js":
/*!****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_SetCache.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var MapCache = __webpack_require__(/*! ./_MapCache */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_MapCache.js"),
    setCacheAdd = __webpack_require__(/*! ./_setCacheAdd */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_setCacheAdd.js"),
    setCacheHas = __webpack_require__(/*! ./_setCacheHas */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_setCacheHas.js");

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Stack.js":
/*!*************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Stack.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_ListCache.js"),
    stackClear = __webpack_require__(/*! ./_stackClear */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackClear.js"),
    stackDelete = __webpack_require__(/*! ./_stackDelete */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackDelete.js"),
    stackGet = __webpack_require__(/*! ./_stackGet */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackGet.js"),
    stackHas = __webpack_require__(/*! ./_stackHas */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackHas.js"),
    stackSet = __webpack_require__(/*! ./_stackSet */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackSet.js");

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Symbol.js":
/*!**************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Symbol.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Uint8Array.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Uint8Array.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_root.js");

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_WeakMap.js":
/*!***************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_WeakMap.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayEach.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayEach.js ***!
  \*****************************************************************************/
/***/ ((module) => {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayFilter.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayFilter.js ***!
  \*******************************************************************************/
/***/ ((module) => {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayIncludes.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayIncludes.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIndexOf = __webpack_require__(/*! ./_baseIndexOf */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIndexOf.js");

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayIncludesWith.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayIncludesWith.js ***!
  \*************************************************************************************/
/***/ ((module) => {

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayLikeKeys.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayLikeKeys.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTimes = __webpack_require__(/*! ./_baseTimes */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseTimes.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isBuffer.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isIndex.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isTypedArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayMap.js":
/*!****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayMap.js ***!
  \****************************************************************************/
/***/ ((module) => {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayPush.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayPush.js ***!
  \*****************************************************************************/
/***/ ((module) => {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arraySome.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arraySome.js ***!
  \*****************************************************************************/
/***/ ((module) => {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assignValue.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assignValue.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseAssignValue.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/eq.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assocIndexOf.js":
/*!********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assocIndexOf.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var eq = __webpack_require__(/*! ./eq */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/eq.js");

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseAssign.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseAssign.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_copyObject.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/keys.js");

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseAssignIn.js":
/*!********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseAssignIn.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_copyObject.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/keysIn.js");

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

module.exports = baseAssignIn;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseAssignValue.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseAssignValue.js ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var defineProperty = __webpack_require__(/*! ./_defineProperty */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_defineProperty.js");

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseClone.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseClone.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Stack = __webpack_require__(/*! ./_Stack */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Stack.js"),
    arrayEach = __webpack_require__(/*! ./_arrayEach */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayEach.js"),
    assignValue = __webpack_require__(/*! ./_assignValue */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assignValue.js"),
    baseAssign = __webpack_require__(/*! ./_baseAssign */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseAssign.js"),
    baseAssignIn = __webpack_require__(/*! ./_baseAssignIn */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseAssignIn.js"),
    cloneBuffer = __webpack_require__(/*! ./_cloneBuffer */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneBuffer.js"),
    copyArray = __webpack_require__(/*! ./_copyArray */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_copyArray.js"),
    copySymbols = __webpack_require__(/*! ./_copySymbols */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_copySymbols.js"),
    copySymbolsIn = __webpack_require__(/*! ./_copySymbolsIn */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_copySymbolsIn.js"),
    getAllKeys = __webpack_require__(/*! ./_getAllKeys */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getAllKeys.js"),
    getAllKeysIn = __webpack_require__(/*! ./_getAllKeysIn */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getAllKeysIn.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getTag.js"),
    initCloneArray = __webpack_require__(/*! ./_initCloneArray */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_initCloneArray.js"),
    initCloneByTag = __webpack_require__(/*! ./_initCloneByTag */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_initCloneByTag.js"),
    initCloneObject = __webpack_require__(/*! ./_initCloneObject */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_initCloneObject.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isBuffer.js"),
    isMap = __webpack_require__(/*! ./isMap */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isMap.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObject.js"),
    isSet = __webpack_require__(/*! ./isSet */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isSet.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/keys.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/keysIn.js");

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseCreate.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseCreate.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObject.js");

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseFindIndex.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseFindIndex.js ***!
  \*********************************************************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGet.js":
/*!***************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGet.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var castPath = __webpack_require__(/*! ./_castPath */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_castPath.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_toKey.js");

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGetAllKeys.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGetAllKeys.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayPush = __webpack_require__(/*! ./_arrayPush */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayPush.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArray.js");

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGetTag.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGetTag.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseHasIn.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseHasIn.js ***!
  \*****************************************************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIndexOf.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIndexOf.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseFindIndex = __webpack_require__(/*! ./_baseFindIndex */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseFindIndex.js"),
    baseIsNaN = __webpack_require__(/*! ./_baseIsNaN */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsNaN.js"),
    strictIndexOf = __webpack_require__(/*! ./_strictIndexOf */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_strictIndexOf.js");

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsArguments.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsArguments.js ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsEqual.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsEqual.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsEqualDeep = __webpack_require__(/*! ./_baseIsEqualDeep */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsEqualDeep.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObjectLike.js");

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsEqualDeep.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsEqualDeep.js ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Stack = __webpack_require__(/*! ./_Stack */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Stack.js"),
    equalArrays = __webpack_require__(/*! ./_equalArrays */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_equalArrays.js"),
    equalByTag = __webpack_require__(/*! ./_equalByTag */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_equalByTag.js"),
    equalObjects = __webpack_require__(/*! ./_equalObjects */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_equalObjects.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getTag.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isBuffer.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isTypedArray.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsMap.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsMap.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike(value) && getTag(value) == mapTag;
}

module.exports = baseIsMap;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsMatch.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsMatch.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Stack = __webpack_require__(/*! ./_Stack */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Stack.js"),
    baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsEqual.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsNaN.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsNaN.js ***!
  \*****************************************************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsNative.js":
/*!********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsNative.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isFunction.js"),
    isMasked = __webpack_require__(/*! ./_isMasked */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isMasked.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObject.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_toSource.js");

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsSet.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsSet.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var setTag = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike(value) && getTag(value) == setTag;
}

module.exports = baseIsSet;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsTypedArray.js":
/*!************************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsTypedArray.js ***!
  \************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGetTag.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isLength.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIteratee.js":
/*!********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIteratee.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseMatches = __webpack_require__(/*! ./_baseMatches */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseMatches.js"),
    baseMatchesProperty = __webpack_require__(/*! ./_baseMatchesProperty */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseMatchesProperty.js"),
    identity = __webpack_require__(/*! ./identity */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/identity.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArray.js"),
    property = __webpack_require__(/*! ./property */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/property.js");

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseKeys.js":
/*!****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseKeys.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isPrototype.js"),
    nativeKeys = __webpack_require__(/*! ./_nativeKeys */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nativeKeys.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseKeysIn.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseKeysIn.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObject.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isPrototype.js"),
    nativeKeysIn = __webpack_require__(/*! ./_nativeKeysIn */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nativeKeysIn.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseMatches.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseMatches.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsMatch = __webpack_require__(/*! ./_baseIsMatch */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsMatch.js"),
    getMatchData = __webpack_require__(/*! ./_getMatchData */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getMatchData.js"),
    matchesStrictComparable = __webpack_require__(/*! ./_matchesStrictComparable */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_matchesStrictComparable.js");

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseMatchesProperty.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseMatchesProperty.js ***!
  \***************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsEqual.js"),
    get = __webpack_require__(/*! ./get */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/get.js"),
    hasIn = __webpack_require__(/*! ./hasIn */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/hasIn.js"),
    isKey = __webpack_require__(/*! ./_isKey */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isKey.js"),
    isStrictComparable = __webpack_require__(/*! ./_isStrictComparable */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isStrictComparable.js"),
    matchesStrictComparable = __webpack_require__(/*! ./_matchesStrictComparable */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_matchesStrictComparable.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_toKey.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

module.exports = baseMatchesProperty;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseProperty.js":
/*!********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseProperty.js ***!
  \********************************************************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_basePropertyDeep.js":
/*!************************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_basePropertyDeep.js ***!
  \************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGet = __webpack_require__(/*! ./_baseGet */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGet.js");

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseTimes.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseTimes.js ***!
  \*****************************************************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseToString.js":
/*!********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseToString.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Symbol.js"),
    arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayMap.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArray.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseUnary.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseUnary.js ***!
  \*****************************************************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseUniq.js":
/*!****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseUniq.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var SetCache = __webpack_require__(/*! ./_SetCache */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_SetCache.js"),
    arrayIncludes = __webpack_require__(/*! ./_arrayIncludes */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayIncludes.js"),
    arrayIncludesWith = __webpack_require__(/*! ./_arrayIncludesWith */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayIncludesWith.js"),
    cacheHas = __webpack_require__(/*! ./_cacheHas */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cacheHas.js"),
    createSet = __webpack_require__(/*! ./_createSet */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_createSet.js"),
    setToArray = __webpack_require__(/*! ./_setToArray */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_setToArray.js");

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cacheHas.js":
/*!****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cacheHas.js ***!
  \****************************************************************************/
/***/ ((module) => {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_castPath.js":
/*!****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_castPath.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isArray = __webpack_require__(/*! ./isArray */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArray.js"),
    isKey = __webpack_require__(/*! ./_isKey */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isKey.js"),
    stringToPath = __webpack_require__(/*! ./_stringToPath */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stringToPath.js"),
    toString = __webpack_require__(/*! ./toString */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/toString.js");

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneArrayBuffer.js":
/*!************************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneArrayBuffer.js ***!
  \************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Uint8Array = __webpack_require__(/*! ./_Uint8Array */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Uint8Array.js");

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneBuffer.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneBuffer.js ***!
  \*******************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(/*! ./_root */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_root.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneDataView.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneDataView.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneArrayBuffer.js");

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

module.exports = cloneDataView;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneRegExp.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneRegExp.js ***!
  \*******************************************************************************/
/***/ ((module) => {

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneSymbol.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneSymbol.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Symbol.js");

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneTypedArray.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneTypedArray.js ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneArrayBuffer.js");

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_copyArray.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_copyArray.js ***!
  \*****************************************************************************/
/***/ ((module) => {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_copyObject.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_copyObject.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assignValue = __webpack_require__(/*! ./_assignValue */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assignValue.js"),
    baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseAssignValue.js");

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_copySymbols.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_copySymbols.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_copyObject.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getSymbols.js");

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_copySymbolsIn.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_copySymbolsIn.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_copyObject.js"),
    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getSymbolsIn.js");

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

module.exports = copySymbolsIn;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_coreJsData.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_coreJsData.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_root.js");

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_createSet.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_createSet.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Set = __webpack_require__(/*! ./_Set */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Set.js"),
    noop = __webpack_require__(/*! ./noop */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/noop.js"),
    setToArray = __webpack_require__(/*! ./_setToArray */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_setToArray.js");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
  return new Set(values);
};

module.exports = createSet;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_defineProperty.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_defineProperty.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getNative.js");

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_equalArrays.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_equalArrays.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var SetCache = __webpack_require__(/*! ./_SetCache */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_SetCache.js"),
    arraySome = __webpack_require__(/*! ./_arraySome */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arraySome.js"),
    cacheHas = __webpack_require__(/*! ./_cacheHas */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cacheHas.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Check that cyclic values are equal.
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_equalByTag.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_equalByTag.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Symbol.js"),
    Uint8Array = __webpack_require__(/*! ./_Uint8Array */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Uint8Array.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/eq.js"),
    equalArrays = __webpack_require__(/*! ./_equalArrays */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_equalArrays.js"),
    mapToArray = __webpack_require__(/*! ./_mapToArray */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapToArray.js"),
    setToArray = __webpack_require__(/*! ./_setToArray */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_setToArray.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_equalObjects.js":
/*!********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_equalObjects.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getAllKeys = __webpack_require__(/*! ./_getAllKeys */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getAllKeys.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Check that cyclic values are equal.
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_freeGlobal.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_freeGlobal.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getAllKeys.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getAllKeys.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGetAllKeys.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getSymbols.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/keys.js");

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getAllKeysIn.js":
/*!********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getAllKeysIn.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGetAllKeys.js"),
    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getSymbolsIn.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/keysIn.js");

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getMapData.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getMapData.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isKeyable = __webpack_require__(/*! ./_isKeyable */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isKeyable.js");

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getMatchData.js":
/*!********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getMatchData.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isStrictComparable = __webpack_require__(/*! ./_isStrictComparable */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isStrictComparable.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/keys.js");

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

module.exports = getMatchData;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getNative.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getNative.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsNative.js"),
    getValue = __webpack_require__(/*! ./_getValue */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getValue.js");

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getPrototype.js":
/*!********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getPrototype.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_overArg.js");

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getRawTag.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getRawTag.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getSymbols.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getSymbols.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayFilter = __webpack_require__(/*! ./_arrayFilter */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayFilter.js"),
    stubArray = __webpack_require__(/*! ./stubArray */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/stubArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getSymbolsIn.js":
/*!********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getSymbolsIn.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayPush = __webpack_require__(/*! ./_arrayPush */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayPush.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getPrototype.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getSymbols.js"),
    stubArray = __webpack_require__(/*! ./stubArray */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/stubArray.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

module.exports = getSymbolsIn;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getTag.js":
/*!**************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getTag.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DataView = __webpack_require__(/*! ./_DataView */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_DataView.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Map.js"),
    Promise = __webpack_require__(/*! ./_Promise */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Promise.js"),
    Set = __webpack_require__(/*! ./_Set */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Set.js"),
    WeakMap = __webpack_require__(/*! ./_WeakMap */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_WeakMap.js"),
    baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGetTag.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_toSource.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getValue.js":
/*!****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getValue.js ***!
  \****************************************************************************/
/***/ ((module) => {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hasPath.js":
/*!***************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hasPath.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var castPath = __webpack_require__(/*! ./_castPath */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_castPath.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArray.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isIndex.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isLength.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_toKey.js");

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

module.exports = hasPath;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashClear.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashClear.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nativeCreate.js");

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashDelete.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashDelete.js ***!
  \******************************************************************************/
/***/ ((module) => {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashGet.js":
/*!***************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashGet.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashHas.js":
/*!***************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashHas.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nativeCreate.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashSet.js":
/*!***************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashSet.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_initCloneArray.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_initCloneArray.js ***!
  \**********************************************************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_initCloneByTag.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_initCloneByTag.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneArrayBuffer.js"),
    cloneDataView = __webpack_require__(/*! ./_cloneDataView */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneDataView.js"),
    cloneRegExp = __webpack_require__(/*! ./_cloneRegExp */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneRegExp.js"),
    cloneSymbol = __webpack_require__(/*! ./_cloneSymbol */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneSymbol.js"),
    cloneTypedArray = __webpack_require__(/*! ./_cloneTypedArray */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cloneTypedArray.js");

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return new Ctor;

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return new Ctor;

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_initCloneObject.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_initCloneObject.js ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseCreate = __webpack_require__(/*! ./_baseCreate */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseCreate.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getPrototype.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isPrototype.js");

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isIndex.js":
/*!***************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isIndex.js ***!
  \***************************************************************************/
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isKey.js":
/*!*************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isKey.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isArray = __webpack_require__(/*! ./isArray */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArray.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isSymbol.js");

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isKeyable.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isKeyable.js ***!
  \*****************************************************************************/
/***/ ((module) => {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isMasked.js":
/*!****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isMasked.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var coreJsData = __webpack_require__(/*! ./_coreJsData */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_coreJsData.js");

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isPrototype.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isPrototype.js ***!
  \*******************************************************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isStrictComparable.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isStrictComparable.js ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObject.js");

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheClear.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheClear.js ***!
  \**********************************************************************************/
/***/ ((module) => {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheDelete.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheDelete.js ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assocIndexOf.js");

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheGet.js":
/*!********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheGet.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assocIndexOf.js");

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheHas.js":
/*!********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheHas.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assocIndexOf.js");

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheSet.js":
/*!********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheSet.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assocIndexOf.js");

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheClear.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheClear.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Hash = __webpack_require__(/*! ./_Hash */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Hash.js"),
    ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Map.js");

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheDelete.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheDelete.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getMapData.js");

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheGet.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheGet.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getMapData.js");

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheHas.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheHas.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getMapData.js");

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheSet.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheSet.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getMapData.js");

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapToArray.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapToArray.js ***!
  \******************************************************************************/
/***/ ((module) => {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_matchesStrictComparable.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_matchesStrictComparable.js ***!
  \*******************************************************************************************/
/***/ ((module) => {

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

module.exports = matchesStrictComparable;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_memoizeCapped.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_memoizeCapped.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var memoize = __webpack_require__(/*! ./memoize */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/memoize.js");

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nativeCreate.js":
/*!********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nativeCreate.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getNative.js");

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nativeKeys.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nativeKeys.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_overArg.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nativeKeysIn.js":
/*!********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nativeKeysIn.js ***!
  \********************************************************************************/
/***/ ((module) => {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nodeUtil.js":
/*!****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nodeUtil.js ***!
  \****************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_freeGlobal.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_objectToString.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_objectToString.js ***!
  \**********************************************************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_overArg.js":
/*!***************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_overArg.js ***!
  \***************************************************************************/
/***/ ((module) => {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_root.js":
/*!************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_root.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_setCacheAdd.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_setCacheAdd.js ***!
  \*******************************************************************************/
/***/ ((module) => {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_setCacheHas.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_setCacheHas.js ***!
  \*******************************************************************************/
/***/ ((module) => {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_setToArray.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_setToArray.js ***!
  \******************************************************************************/
/***/ ((module) => {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackClear.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackClear.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_ListCache.js");

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackDelete.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackDelete.js ***!
  \*******************************************************************************/
/***/ ((module) => {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackGet.js":
/*!****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackGet.js ***!
  \****************************************************************************/
/***/ ((module) => {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackHas.js":
/*!****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackHas.js ***!
  \****************************************************************************/
/***/ ((module) => {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackSet.js":
/*!****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackSet.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Map.js"),
    MapCache = __webpack_require__(/*! ./_MapCache */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_MapCache.js");

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_strictIndexOf.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_strictIndexOf.js ***!
  \*********************************************************************************/
/***/ ((module) => {

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stringToPath.js":
/*!********************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stringToPath.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var memoizeCapped = __webpack_require__(/*! ./_memoizeCapped */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_memoizeCapped.js");

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_toKey.js":
/*!*************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_toKey.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_toSource.js":
/*!****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_toSource.js ***!
  \****************************************************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/cloneDeep.js":
/*!****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/cloneDeep.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseClone = __webpack_require__(/*! ./_baseClone */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseClone.js");

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

module.exports = cloneDeep;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/eq.js":
/*!*********************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/eq.js ***!
  \*********************************************************************/
/***/ ((module) => {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/get.js":
/*!**********************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/get.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGet = __webpack_require__(/*! ./_baseGet */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGet.js");

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/hasIn.js":
/*!************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/hasIn.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseHasIn = __webpack_require__(/*! ./_baseHasIn */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseHasIn.js"),
    hasPath = __webpack_require__(/*! ./_hasPath */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hasPath.js");

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/identity.js":
/*!***************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/identity.js ***!
  \***************************************************************************/
/***/ ((module) => {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArguments.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArguments.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsArguments.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObjectLike.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArray.js":
/*!**************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArray.js ***!
  \**************************************************************************/
/***/ ((module) => {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArrayLike.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArrayLike.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isFunction.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isLength.js");

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isBuffer.js":
/*!***************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isBuffer.js ***!
  \***************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(/*! ./_root */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_root.js"),
    stubFalse = __webpack_require__(/*! ./stubFalse */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/stubFalse.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isEqual.js":
/*!**************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isEqual.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsEqual.js");

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

module.exports = isEqual;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isFunction.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isFunction.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGetTag.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObject.js");

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isLength.js":
/*!***************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isLength.js ***!
  \***************************************************************************/
/***/ ((module) => {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isMap.js":
/*!************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isMap.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsMap = __webpack_require__(/*! ./_baseIsMap */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsMap.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsMap = nodeUtil && nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

module.exports = isMap;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObject.js":
/*!***************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObject.js ***!
  \***************************************************************************/
/***/ ((module) => {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObjectLike.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObjectLike.js ***!
  \*******************************************************************************/
/***/ ((module) => {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isSet.js":
/*!************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isSet.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsSet = __webpack_require__(/*! ./_baseIsSet */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsSet.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

module.exports = isSet;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isSymbol.js":
/*!***************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isSymbol.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isTypedArray.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isTypedArray.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsTypedArray.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isUndefined.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isUndefined.js ***!
  \******************************************************************************/
/***/ ((module) => {

/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */
function isUndefined(value) {
  return value === undefined;
}

module.exports = isUndefined;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/keys.js":
/*!***********************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/keys.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayLikeKeys.js"),
    baseKeys = __webpack_require__(/*! ./_baseKeys */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseKeys.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/keysIn.js":
/*!*************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/keysIn.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayLikeKeys.js"),
    baseKeysIn = __webpack_require__(/*! ./_baseKeysIn */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseKeysIn.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/memoize.js":
/*!**************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/memoize.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var MapCache = __webpack_require__(/*! ./_MapCache */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_MapCache.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/noop.js":
/*!***********************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/noop.js ***!
  \***********************************************************************/
/***/ ((module) => {

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/property.js":
/*!***************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/property.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseProperty = __webpack_require__(/*! ./_baseProperty */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseProperty.js"),
    basePropertyDeep = __webpack_require__(/*! ./_basePropertyDeep */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_basePropertyDeep.js"),
    isKey = __webpack_require__(/*! ./_isKey */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isKey.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_toKey.js");

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/stubArray.js":
/*!****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/stubArray.js ***!
  \****************************************************************************/
/***/ ((module) => {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/stubFalse.js":
/*!****************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/stubFalse.js ***!
  \****************************************************************************/
/***/ ((module) => {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/toString.js":
/*!***************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/toString.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseToString = __webpack_require__(/*! ./_baseToString */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseToString.js");

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/uniqBy.js":
/*!*************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/uniqBy.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIteratee = __webpack_require__(/*! ./_baseIteratee */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIteratee.js"),
    baseUniq = __webpack_require__(/*! ./_baseUniq */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseUniq.js");

/**
 * This method is like `_.uniq` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * uniqueness is computed. The order of result values is determined by the
 * order they occur in the array. The iteratee is invoked with one argument:
 * (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
 * // => [2.1, 1.2]
 *
 * // The `_.property` iteratee shorthand.
 * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 1 }, { 'x': 2 }]
 */
function uniqBy(array, iteratee) {
  return (array && array.length) ? baseUniq(array, baseIteratee(iteratee, 2)) : [];
}

module.exports = uniqBy;


/***/ }),

/***/ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/uniqWith.js":
/*!***************************************************************************!*\
  !*** ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/uniqWith.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseUniq = __webpack_require__(/*! ./_baseUniq */ "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseUniq.js");

/**
 * This method is like `_.uniq` except that it accepts `comparator` which
 * is invoked to compare elements of `array`. The order of result values is
 * determined by the order they occur in the array.The comparator is invoked
 * with two arguments: (arrVal, othVal).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
 *
 * _.uniqWith(objects, _.isEqual);
 * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
 */
function uniqWith(array, comparator) {
  comparator = typeof comparator == 'function' ? comparator : undefined;
  return (array && array.length) ? baseUniq(array, undefined, comparator) : [];
}

module.exports = uniqWith;


/***/ }),

/***/ "./node_modules/.pnpm/matrix-inverse@1.0.1/node_modules/matrix-inverse/matrix-inverse.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/.pnpm/matrix-inverse@1.0.1/node_modules/matrix-inverse/matrix-inverse.js ***!
  \***********************************************************************************************/
/***/ ((module) => {

var Sylvester = {}

Sylvester.Matrix = function() {}

Sylvester.Matrix.create = function(elements) {
  var M = new Sylvester.Matrix()
  return M.setElements(elements)
}

Sylvester.Matrix.I = function(n) {
  var els = [],
    i = n,
    j
  while (i--) {
    j = n
    els[i] = []
    while (j--) {
      els[i][j] = i === j ? 1 : 0
    }
  }
  return Sylvester.Matrix.create(els)
}

Sylvester.Matrix.prototype = {
  dup: function() {
    return Sylvester.Matrix.create(this.elements)
  },

  isSquare: function() {
    var cols = this.elements.length === 0 ? 0 : this.elements[0].length
    return this.elements.length === cols
  },

  toRightTriangular: function() {
    if (this.elements.length === 0) return Sylvester.Matrix.create([])
    var M = this.dup(),
      els
    var n = this.elements.length,
      i,
      j,
      np = this.elements[0].length,
      p
    for (i = 0; i < n; i++) {
      if (M.elements[i][i] === 0) {
        for (j = i + 1; j < n; j++) {
          if (M.elements[j][i] !== 0) {
            els = []
            for (p = 0; p < np; p++) {
              els.push(M.elements[i][p] + M.elements[j][p])
            }
            M.elements[i] = els
            break
          }
        }
      }
      if (M.elements[i][i] !== 0) {
        for (j = i + 1; j < n; j++) {
          var multiplier = M.elements[j][i] / M.elements[i][i]
          els = []
          for (p = 0; p < np; p++) {
            // Elements with column numbers up to an including the number of the
            // row that we're subtracting can safely be set straight to zero,
            // since that's the point of this routine and it avoids having to
            // loop over and correct rounding errors later
            els.push(
              p <= i ? 0 : M.elements[j][p] - M.elements[i][p] * multiplier
            )
          }
          M.elements[j] = els
        }
      }
    }
    return M
  },

  determinant: function() {
    if (this.elements.length === 0) {
      return 1
    }
    if (!this.isSquare()) {
      return null
    }
    var M = this.toRightTriangular()
    var det = M.elements[0][0],
      n = M.elements.length
    for (var i = 1; i < n; i++) {
      det = det * M.elements[i][i]
    }
    return det
  },

  isSingular: function() {
    return this.isSquare() && this.determinant() === 0
  },

  augment: function(matrix) {
    if (this.elements.length === 0) {
      return this.dup()
    }
    var M = matrix.elements || matrix
    if (typeof M[0][0] === 'undefined') {
      M = Sylvester.Matrix.create(M).elements
    }
    var T = this.dup(),
      cols = T.elements[0].length
    var i = T.elements.length,
      nj = M[0].length,
      j
    if (i !== M.length) {
      return null
    }
    while (i--) {
      j = nj
      while (j--) {
        T.elements[i][cols + j] = M[i][j]
      }
    }
    return T
  },

  inverse: function() {
    if (this.elements.length === 0) {
      return null
    }
    if (!this.isSquare() || this.isSingular()) {
      return null
    }
    var n = this.elements.length,
      i = n,
      j
    var M = this.augment(Sylvester.Matrix.I(n)).toRightTriangular()
    var np = M.elements[0].length,
      p,
      els,
      divisor
    var inverse_elements = [],
      new_element
    // Sylvester.Matrix is non-singular so there will be no zeros on the
    // diagonal. Cycle through rows from last to first.
    while (i--) {
      // First, normalise diagonal elements to 1
      els = []
      inverse_elements[i] = []
      divisor = M.elements[i][i]
      for (p = 0; p < np; p++) {
        new_element = M.elements[i][p] / divisor
        els.push(new_element)
        // Shuffle off the current row of the right hand side into the results
        // array as it will not be modified by later runs through this loop
        if (p >= n) {
          inverse_elements[i].push(new_element)
        }
      }
      M.elements[i] = els
      // Then, subtract this row from those above it to give the identity matrix
      // on the left hand side
      j = i
      while (j--) {
        els = []
        for (p = 0; p < np; p++) {
          els.push(M.elements[j][p] - M.elements[i][p] * M.elements[j][i])
        }
        M.elements[j] = els
      }
    }
    return Sylvester.Matrix.create(inverse_elements)
  },

  setElements: function(els) {
    var i,
      j,
      elements = els.elements || els
    if (elements[0] && typeof elements[0][0] !== 'undefined') {
      i = elements.length
      this.elements = []
      while (i--) {
        j = elements[i].length
        this.elements[i] = []
        while (j--) {
          this.elements[i][j] = elements[i][j]
        }
      }
      return this
    }
    var n = elements.length
    this.elements = []
    for (i = 0; i < n; i++) {
      this.elements.push([elements[i]])
    }
    return this
  },
}

module.exports = function(elements) {
  return Sylvester.Matrix.create(elements).inverse().elements
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const helpers_1 = __webpack_require__(/*! @figma-plugin/helpers */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/index.js");
const convertColor_1 = __webpack_require__(/*! @figma-plugin/helpers/dist/helpers/convertColor */ "./node_modules/.pnpm/@figma-plugin+helpers@0.15.2/node_modules/@figma-plugin/helpers/dist/helpers/convertColor.js");
const tools_1 = __webpack_require__(/*! ./tools */ "./src/tools.ts");
figma.showUI(__html__, {
    width: 500,
    height: 500,
});
const log = (label, ...rest) => {
    console.log();
    console.log('[提示]', label);
    console.log(...rest);
    console.log();
};
const rdm = () => Math.random().toString(36).substr(2, 15);
figma.ui.onmessage = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, type, payload = {} }) {
    try {
        const selection = figma.currentPage.selection;
        const node = selection[0];
        const [fill] = node.fills || [];
        if (!fill)
            return;
        const colors = fill.gradientStops
            .map((n) => (0, convertColor_1.figmaRGBToWebRGB)(n.color).join(','))
            .map((n) => `rgba(${n})`);
        const rect = {
            x: 0,
            y: 0,
            width: node.width,
            height: node.height,
        };
        const { start: startRatio, end: endRatio } = (0, helpers_1.extractLinearGradientParamsFromTransform)(1, 1, fill.gradientTransform);
        // figma的渐变控制点
        const start = {
            x: startRatio[0] * node.width, y: startRatio[1] * node.height
        };
        const end = {
            x: endRatio[0] * node.width, y: endRatio[1] * node.height
        };
        const angle = (0, tools_1.getAngleBetween)(start, end);
        // figma的渐变控制点
        const figmaGradientLine = { start, end };
        const gradientPoints = (0, tools_1.getLinearGradientPoints)(rect, angle).farthestPoints;
        // web的渐变控制点
        const gradientLine = (0, tools_1.orderPoints)(figmaGradientLine, gradientPoints);
        log('渐变线', gradientLine);
        const line = (0, tools_1.stickyTo)(figmaGradientLine, gradientLine);
        const offsets = (0, tools_1.getOffset)({
            figma: line,
            web: gradientLine
        });
        const toPercent = (n) => (n * 100).toFixed(2) + '%';
        const backgroundImage = `linear-gradient(${(angle + 90).toFixed(2)}deg, ${colors.map((color, index) => {
            return `${color} ${toPercent(offsets[index])}`;
            // return color
        }).join(',')})`;
        figma.ui.postMessage({
            type: 'callback',
            payload: {
                node: {
                    width: node.width,
                    height: node.height,
                },
                backgroundImage
            },
        });
    }
    catch (error) {
        console.log(error);
    }
});


/***/ }),

/***/ "./src/tools.ts":
/*!**********************!*\
  !*** ./src/tools.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getOffset = exports.getPerpendicularPoint = exports.NumberUtil = void 0;
exports.getAngleBetween = getAngleBetween;
exports.getLinearGradientPoints = getLinearGradientPoints;
exports.stickyTo = stickyTo;
exports.orderPoints = orderPoints;
const math_1 = __webpack_require__(/*! @s7n/math */ "./node_modules/.pnpm/@s7n+math@0.0.9/node_modules/@s7n/math/lib/index.js");
class NumberUtil {
    static isEqual(v1, v2, tolerance = NumberUtil.TOLERANCE) {
        return Math.abs(v1 - v2) < tolerance;
    }
    /**
     * 获取相反数
     */
    static getOppositeNumber(value) {
        return value === 0 ? 0 : -value;
    }
    /**
     * 将有符号的 Zero 转化为无符号
     *
     * Object.is vs === : https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is
     */
    static unSignedZero(value) {
        return value === 0 ? 0 : value;
    }
}
exports.NumberUtil = NumberUtil;
NumberUtil.TOLERANCE = 1e-6;
function getAngleBetween(a, b) {
    return Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
}
/**
 * 计算 web 的线性渐变的两个控制点
 * */
function getLinearGradientPoints(rect, angle) {
    const radians = (angle * Math.PI) / 180;
    const center = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
    // 获取矩形四个顶点
    const points = [
        { x: rect.x, y: rect.y },
        { x: rect.x + rect.width, y: rect.y },
        { x: rect.x + rect.width, y: rect.y + rect.height },
        { x: rect.x, y: rect.y + rect.height },
    ];
    // 计算每个顶点到中心点的垂直线与 line 的交点
    const intersections = points.map(point => {
        const dx = point.x - center.x;
        const dy = point.y - center.y;
        const distance = dx * Math.cos(radians) + dy * Math.sin(radians);
        return {
            x: center.x + distance * Math.cos(radians),
            y: center.y + distance * Math.sin(radians),
        };
    });
    // 计算每个交点到中心点的距离
    const distances = intersections.map(intersection => {
        const dx = intersection.x - center.x;
        const dy = intersection.y - center.y;
        return Math.sqrt(dx * dx + dy * dy);
    });
    // 找到距离中心点最远的两个交点
    const sortedIntersections = intersections
        .map((intersection, index) => ({ intersection, distance: distances[index] }))
        .sort((a, b) => b.distance - a.distance);
    const farthestPoints = [sortedIntersections[0].intersection, sortedIntersections[1].intersection];
    return { farthestPoints };
}
/**
 * 计算一个点做垂线到一条线段上的交点
 * */
const getPerpendicularPoint = (point, line) => {
    const dx = line.end.x - line.start.x;
    const dy = line.end.y - line.start.y;
    const lengthSquared = dx * dx + dy * dy;
    const t = ((point.x - line.start.x) * dx + (point.y - line.start.y) * dy) / lengthSquared;
    return {
        x: line.start.x + t * dx,
        y: line.start.y + t * dy,
    };
};
exports.getPerpendicularPoint = getPerpendicularPoint;
/**
 * 将线段1粘附到线段2上
 * */
function stickyTo(line1, line2) {
    const perpendicularPoint1 = (0, exports.getPerpendicularPoint)(line1.start, line2);
    const perpendicularPoint2 = (0, exports.getPerpendicularPoint)(line1.end, line2);
    return { start: perpendicularPoint1, end: perpendicularPoint2 };
}
/**
 * 将点按照线段的顺序排序
 * 设有一个线段 {start, end} 和两个点 points[0], points[1], 通过比较线段的方向和两个点的方向，确定两个点的顺序
 * */
function orderPoints(line, points) {
    const direct = new math_1.Vector2(line.start.x, line.start.y).sub(new math_1.Vector2(line.end.x, line.end.y)).normalize();
    const vec1 = new math_1.Vector2(points[0].x, points[0].y);
    const vec2 = new math_1.Vector2(points[1].x, points[1].y);
    const direct1 = vec1.sub(vec2).normalize();
    const direct2 = vec2.sub(vec1).normalize();
    console.log('排序web的渐变控制点', direct.angle, direct1.angle, direct2.angle);
    // equals 没有实现宽容度，改为计算角度差
    // if (direct.equals(direct1)) {
    if (NumberUtil.isEqual(direct.angle, direct1.angle)) {
        console.log('顺序正确，保持不变返回', points[0], points[1]);
        return { start: points[0], end: points[1] };
    }
    console.log('顺序错误，重新排序', points[1], points[0]);
    return { start: points[1], end: points[0] };
}
function calculateSignedDistance(line, point) {
    const start = new math_1.Vector2(line.start.x, line.start.y);
    const end = new math_1.Vector2(line.end.x, line.end.y);
    const target = new math_1.Vector2(point.x, point.y);
    const direction = end.sub(start).normalize();
    const difference = target.sub(start);
    return difference.dot(direction);
}
const getOffset = (controls) => {
    const { figma, web } = controls;
    console.log(controls);
    const start = new math_1.Vector2(web.start.x, web.start.y);
    const end = new math_1.Vector2(web.end.x, web.end.y);
    const line = start.sub(end);
    const length = line.length;
    return [
        calculateSignedDistance(web, figma.start) / length,
        calculateSignedDistance(web, figma.end) / length,
    ];
};
exports.getOffset = getOffset;


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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDRixvREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRixnREFBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRixpREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRixtREFBa0Q7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRiw2Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRixnREFBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRixrREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRixrREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRiwyQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRix1REFBc0Q7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRixxREFBb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRixvREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRixvREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRixpREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRixpREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRixtREFBa0Q7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRiwrQ0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRiwrQ0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRixrREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRiw4Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRiw4Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRixtREFBa0Q7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRiwwREFBeUQ7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRiw0RUFBMkU7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRix3RUFBdUU7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRixpREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRixrREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRiwyREFBMEQ7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRix1REFBc0Q7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRiw0REFBMkQ7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRiw2REFBNEQ7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRixtREFBa0Q7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7O0FBRUYsb0NBQW9DLG1CQUFPLENBQUMsbUlBQWlCOztBQUU3RCwwQ0FBMEMsbUJBQU8sQ0FBQywrSUFBdUI7O0FBRXpFLDhDQUE4QyxtQkFBTyxDQUFDLHVKQUEyQjs7QUFFakYsMkNBQTJDLG1CQUFPLENBQUMsaUpBQXdCOztBQUUzRSxzQ0FBc0MsbUJBQU8sQ0FBQyx1SUFBbUI7O0FBRWpFLG1CQUFtQixtQkFBTyxDQUFDLCtJQUF1Qjs7QUFFbEQsK0NBQStDLG1CQUFPLENBQUMseUpBQTRCOztBQUVuRiwyQ0FBMkMsbUJBQU8sQ0FBQyxpSkFBd0I7O0FBRTNFLDRDQUE0QyxtQkFBTyxDQUFDLG1KQUF5Qjs7QUFFN0UsOENBQThDLG1CQUFPLENBQUMsdUpBQTJCOztBQUVqRix3Q0FBd0MsbUJBQU8sQ0FBQywySUFBcUI7O0FBRXJFLG9CQUFvQixtQkFBTyxDQUFDLGlKQUF3Qjs7QUFFcEQsNkNBQTZDLG1CQUFPLENBQUMscUpBQTBCOztBQUUvRSxvQkFBb0IsbUJBQU8sQ0FBQyxpSkFBd0I7O0FBRXBELG1CQUFtQixtQkFBTyxDQUFDLCtJQUF1Qjs7QUFFbEQsMkJBQTJCLG1CQUFPLENBQUMsK0pBQStCOztBQUVsRSxvQkFBb0IsbUJBQU8sQ0FBQyxpSkFBd0I7O0FBRXBELGtCQUFrQixtQkFBTyxDQUFDLDZJQUFzQjs7QUFFaEQsOEJBQThCLG1CQUFPLENBQUMscUtBQWtDOztBQUV4RSxxQ0FBcUMsbUJBQU8sQ0FBQyxtTEFBeUM7O0FBRXRGLDRDQUE0QyxtQkFBTyxDQUFDLGlNQUFnRDs7QUFFcEcscUJBQXFCLG1CQUFPLENBQUMsbUpBQXlCOztBQUV0RCxzQkFBc0IsbUJBQU8sQ0FBQyxxSkFBMEI7O0FBRXhELHVDQUF1Qyx1Q0FBdUM7Ozs7Ozs7Ozs7O0FDeFJqRTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxrQkFBa0I7QUFDbEIsZ0JBQWdCLG1CQUFPLENBQUMsZ0dBQVU7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7Ozs7Ozs7Ozs7OztBQ3hCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCw2QkFBNkIsR0FBRyxjQUFjLEdBQUcsVUFBVSxHQUFHLFdBQVcsR0FBRyxXQUFXLEdBQUcsV0FBVyxHQUFHLFlBQVk7QUFDcEg7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFVBQVU7QUFDVixjQUFjO0FBQ2QsNkJBQTZCOzs7Ozs7Ozs7Ozs7QUNyQmhCO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGFBQWEsR0FBRyxlQUFlLEdBQUcsZUFBZSxHQUFHLGNBQWMsR0FBRyxXQUFXLEdBQUcsWUFBWSxHQUFHLFlBQVksR0FBRyxhQUFhLEdBQUcsZ0JBQWdCLEdBQUcsYUFBYSxHQUFHLGVBQWUsR0FBRyxlQUFlLEdBQUcsZUFBZSxHQUFHLGVBQWU7QUFDek8sZ0JBQWdCLG1CQUFPLENBQUMsNkdBQWdCO0FBQ3hDLDJDQUEwQyxFQUFFLHFDQUFxQyw2QkFBNkIsRUFBQztBQUMvRyxnQkFBZ0IsbUJBQU8sQ0FBQyw2R0FBZ0I7QUFDeEMsMkNBQTBDLEVBQUUscUNBQXFDLDZCQUE2QixFQUFDO0FBQy9HLGdCQUFnQixtQkFBTyxDQUFDLDZHQUFnQjtBQUN4QywyQ0FBMEMsRUFBRSxxQ0FBcUMsNkJBQTZCLEVBQUM7QUFDL0csZ0JBQWdCLG1CQUFPLENBQUMsNkdBQWdCO0FBQ3hDLDJDQUEwQyxFQUFFLHFDQUFxQyw2QkFBNkIsRUFBQztBQUMvRyxjQUFjLG1CQUFPLENBQUMseUdBQWM7QUFDcEMseUNBQXdDLEVBQUUscUNBQXFDLHlCQUF5QixFQUFDO0FBQ3pHLDRDQUEyQyxFQUFFLHFDQUFxQyw0QkFBNEIsRUFBQztBQUMvRyxjQUFjLG1CQUFPLENBQUMseUdBQWM7QUFDcEMseUNBQXdDLEVBQUUscUNBQXFDLHlCQUF5QixFQUFDO0FBQ3pHLGFBQWEsbUJBQU8sQ0FBQyx1R0FBYTtBQUNsQyx3Q0FBdUMsRUFBRSxxQ0FBcUMsdUJBQXVCLEVBQUM7QUFDdEcsYUFBYSxtQkFBTyxDQUFDLHVHQUFhO0FBQ2xDLHdDQUF1QyxFQUFFLHFDQUFxQyx1QkFBdUIsRUFBQztBQUN0RyxZQUFZLG1CQUFPLENBQUMscUdBQVk7QUFDaEMsdUNBQXNDLEVBQUUscUNBQXFDLHFCQUFxQixFQUFDO0FBQ25HLGVBQWUsbUJBQU8sQ0FBQywyR0FBZTtBQUN0QywwQ0FBeUMsRUFBRSxxQ0FBcUMsMkJBQTJCLEVBQUM7QUFDNUcsZ0JBQWdCLG1CQUFPLENBQUMsNkdBQWdCO0FBQ3hDLDJDQUEwQyxFQUFFLHFDQUFxQyw2QkFBNkIsRUFBQztBQUMvRyxnQkFBZ0IsbUJBQU8sQ0FBQyw2R0FBZ0I7QUFDeEMsMkNBQTBDLEVBQUUscUNBQXFDLDZCQUE2QixFQUFDO0FBQy9HLGNBQWMsbUJBQU8sQ0FBQywrRkFBUztBQUMvQix5Q0FBd0MsRUFBRSxxQ0FBcUMseUJBQXlCLEVBQUM7Ozs7Ozs7Ozs7OztBQzdCNUY7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsV0FBVztBQUNYLGdCQUFnQixtQkFBTyxDQUFDLG1HQUFhO0FBQ3JDLGdCQUFnQixtQkFBTyxDQUFDLG1HQUFhO0FBQ3JDLGdCQUFnQixtQkFBTyxDQUFDLHFHQUFVO0FBQ2xDLGtCQUFrQixtQkFBTyxDQUFDLHlHQUFZO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsOEVBQThFO0FBQzlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixzREFBc0Q7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isc0RBQXNEO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IseUNBQXlDO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiwyQ0FBMkM7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix5Q0FBeUM7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiw4QkFBOEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDhCQUE4QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix5QkFBeUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFlBQVk7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXOzs7Ozs7Ozs7Ozs7QUNsUkU7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsWUFBWTtBQUNaLGdCQUFnQixtQkFBTyxDQUFDLG1HQUFhO0FBQ3JDLGdCQUFnQixtQkFBTyxDQUFDLG1HQUFhO0FBQ3JDLGtCQUFrQixtQkFBTyxDQUFDLHlHQUFZO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix5QkFBeUI7QUFDekMsa0JBQWtCLHlCQUF5QjtBQUMzQyxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsSUFBSSxrRUFBa0U7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbUJBQW1CO0FBQ25DLGdCQUFnQixtQkFBbUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZOzs7Ozs7Ozs7Ozs7QUM3SUM7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsWUFBWTtBQUNaLGdCQUFnQixtQkFBTyxDQUFDLG1HQUFhO0FBQ3JDLGdCQUFnQixtQkFBTyxDQUFDLG1HQUFhO0FBQ3JDLGtCQUFrQixtQkFBTyxDQUFDLHlHQUFZO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixxQ0FBcUM7QUFDckQsa0JBQWtCLHFDQUFxQztBQUN2RCxvQkFBb0IsVUFBVTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsSUFBSSxtR0FBbUc7QUFDaEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDRCQUE0QjtBQUM1QyxnQkFBZ0IsNEJBQTRCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7Ozs7Ozs7Ozs7OztBQzFKQztBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxjQUFjO0FBQ2QsZ0JBQWdCLG1CQUFPLENBQUMsbUdBQWE7QUFDckMsZ0JBQWdCLG1CQUFPLENBQUMsbUdBQWE7QUFDckMsZ0JBQWdCLG1CQUFPLENBQUMscUdBQVU7QUFDbEMsa0JBQWtCLG1CQUFPLENBQUMseUdBQVk7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixZQUFZO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYzs7Ozs7Ozs7Ozs7O0FDcEhEO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGVBQWU7QUFDZixrQkFBa0IsbUJBQU8sQ0FBQyx5R0FBWTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsZUFBZTtBQUMvQixnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix5QkFBeUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix5QkFBeUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQyxnQkFBZ0IsT0FBTztBQUN2QixnQkFBZ0IsZUFBZTtBQUMvQjtBQUNBO0FBQ0E7QUFDQSxlQUFlOzs7Ozs7Ozs7Ozs7QUNsSUY7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZ0JBQWdCLEdBQUcsYUFBYTtBQUNoQyxpQkFBaUIsbUJBQU8sQ0FBQyw2R0FBcUI7QUFDOUMsZ0JBQWdCLG1CQUFPLENBQUMsbUdBQWE7QUFDckMsZ0JBQWdCLG1CQUFPLENBQUMsbUdBQWE7QUFDckMsa0JBQWtCLG1CQUFPLENBQUMseUdBQVk7QUFDdEMsb0JBQW9CLG1CQUFPLENBQUMsNEdBQWE7QUFDekMsNENBQTJDLEVBQUUscUNBQXFDLGdDQUFnQyxFQUFDO0FBQ25IO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsUUFBUSxJQUFJLFFBQVEsdUJBQXVCLE1BQU0sSUFBSSxPQUFPO0FBQzVHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxRQUFRLElBQUksUUFBUSx1QkFBdUIsV0FBVyxJQUFJLFlBQVk7QUFDaEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxRQUFRLElBQUksUUFBUSx5QkFBeUIsYUFBYSxJQUFJLGNBQWM7QUFDdEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixhQUFhO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7Ozs7Ozs7Ozs7O0FDaFJBO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxrQ0FBa0MsZ0JBQWdCLEtBQUs7Ozs7Ozs7Ozs7OztBQ2pCM0M7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsYUFBYTtBQUNiLGdCQUFnQixtQkFBTyxDQUFDLG1HQUFhO0FBQ3JDLGdCQUFnQixtQkFBTyxDQUFDLG1HQUFhO0FBQ3JDLGtCQUFrQixtQkFBTyxDQUFDLHlHQUFZO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsUUFBUSxJQUFJLFFBQVEsSUFBSSxRQUFRLHVCQUF1QixNQUFNLElBQUksT0FBTyxJQUFJLE1BQU07QUFDbEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLFFBQVEsSUFBSSxRQUFRLElBQUksUUFBUSx1QkFBdUIsV0FBVyxJQUFJLFlBQVksSUFBSSxXQUFXO0FBQzNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsUUFBUSxJQUFJLFFBQVEsSUFBSSxRQUFRLHlCQUF5QixhQUFhLElBQUksY0FBYyxJQUFJLGFBQWE7QUFDbko7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixhQUFhO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7Ozs7Ozs7Ozs7OztBQ3JPQTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFlBQVk7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isa0JBQWtCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDL1ZhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixZQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsVUFBVTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixVQUFVO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsVUFBVTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixrQkFBa0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNuaUJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGVBQWU7QUFDZixnQkFBZ0IsbUJBQU8sQ0FBQyxtR0FBYTtBQUNyQyxnQkFBZ0IsbUJBQU8sQ0FBQyxxR0FBVTtBQUNsQyxrQkFBa0IsbUJBQU8sQ0FBQyx5R0FBWTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBLG1DQUFtQyxZQUFZO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZUFBZTtBQUNuQyxvQkFBb0IsZUFBZTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsZUFBZTs7Ozs7Ozs7Ozs7O0FDMUhGO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGVBQWU7QUFDZixnQkFBZ0IsbUJBQU8sQ0FBQyxtR0FBYTtBQUNyQyxpQkFBaUIsbUJBQU8sQ0FBQyw2R0FBcUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDN1FhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGVBQWU7QUFDZixnQkFBZ0IsbUJBQU8sQ0FBQyxtR0FBYTtBQUNyQyxpQkFBaUIsbUJBQU8sQ0FBQyw2R0FBcUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixVQUFVO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFVBQVU7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsVUFBVTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixVQUFVO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFVBQVU7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixVQUFVO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixVQUFVO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFdBQVcsWUFBWTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksYUFBYTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7Ozs7OztVQ2xJakI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztVRUpBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vQGZpZ21hLXBsdWdpbitoZWxwZXJzQDAuMTUuMi9ub2RlX21vZHVsZXMvQGZpZ21hLXBsdWdpbi9oZWxwZXJzL2Rpc3QvaGVscGVycy9hcHBseU1hdHJpeFRvUG9pbnQuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vQGZpZ21hLXBsdWdpbitoZWxwZXJzQDAuMTUuMi9ub2RlX21vZHVsZXMvQGZpZ21hLXBsdWdpbi9oZWxwZXJzL2Rpc3QvaGVscGVycy9jbG9uZS5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9AZmlnbWEtcGx1Z2luK2hlbHBlcnNAMC4xNS4yL25vZGVfbW9kdWxlcy9AZmlnbWEtcGx1Z2luL2hlbHBlcnMvZGlzdC9oZWxwZXJzL2NvbnZlcnRDb2xvci5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9AZmlnbWEtcGx1Z2luK2hlbHBlcnNAMC4xNS4yL25vZGVfbW9kdWxlcy9AZmlnbWEtcGx1Z2luL2hlbHBlcnMvZGlzdC9oZWxwZXJzL2V4dHJhY3RJbWFnZUNyb3BQYXJhbXMuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vQGZpZ21hLXBsdWdpbitoZWxwZXJzQDAuMTUuMi9ub2RlX21vZHVsZXMvQGZpZ21hLXBsdWdpbi9oZWxwZXJzL2Rpc3QvaGVscGVycy9leHRyYWN0TGluZWFyR3JhZGllbnRTdGFydEVuZC5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9AZmlnbWEtcGx1Z2luK2hlbHBlcnNAMC4xNS4yL25vZGVfbW9kdWxlcy9AZmlnbWEtcGx1Z2luL2hlbHBlcnMvZGlzdC9oZWxwZXJzL2V4dHJhY3RSYWRpYWxPckRpYW1vbmRHcmFkaWVudFBhcmFtcy5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9AZmlnbWEtcGx1Z2luK2hlbHBlcnNAMC4xNS4yL25vZGVfbW9kdWxlcy9AZmlnbWEtcGx1Z2luL2hlbHBlcnMvZGlzdC9oZWxwZXJzL2ZpbmRNZXRob2RzLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0BmaWdtYS1wbHVnaW4raGVscGVyc0AwLjE1LjIvbm9kZV9tb2R1bGVzL0BmaWdtYS1wbHVnaW4vaGVscGVycy9kaXN0L2hlbHBlcnMvZ2V0QWxsRm9udHMuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vQGZpZ21hLXBsdWdpbitoZWxwZXJzQDAuMTUuMi9ub2RlX21vZHVsZXMvQGZpZ21hLXBsdWdpbi9oZWxwZXJzL2Rpc3QvaGVscGVycy9nZXRCb3VuZGluZ1JlY3QuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vQGZpZ21hLXBsdWdpbitoZWxwZXJzQDAuMTUuMi9ub2RlX21vZHVsZXMvQGZpZ21hLXBsdWdpbi9oZWxwZXJzL2Rpc3QvaGVscGVycy9nZXRDU1NTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vQGZpZ21hLXBsdWdpbitoZWxwZXJzQDAuMTUuMi9ub2RlX21vZHVsZXMvQGZpZ21hLXBsdWdpbi9oZWxwZXJzL2Rpc3QvaGVscGVycy9nZXROb2RlSW5kZXguanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vQGZpZ21hLXBsdWdpbitoZWxwZXJzQDAuMTUuMi9ub2RlX21vZHVsZXMvQGZpZ21hLXBsdWdpbi9oZWxwZXJzL2Rpc3QvaGVscGVycy9nZXRQYWdlLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0BmaWdtYS1wbHVnaW4raGVscGVyc0AwLjE1LjIvbm9kZV9tb2R1bGVzL0BmaWdtYS1wbHVnaW4vaGVscGVycy9kaXN0L2hlbHBlcnMvZ2V0UmVsYXRpdmVQb3NpdGlvbi5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9AZmlnbWEtcGx1Z2luK2hlbHBlcnNAMC4xNS4yL25vZGVfbW9kdWxlcy9AZmlnbWEtcGx1Z2luL2hlbHBlcnMvZGlzdC9oZWxwZXJzL2hhc0NoaWxkcmVuLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0BmaWdtYS1wbHVnaW4raGVscGVyc0AwLjE1LjIvbm9kZV9tb2R1bGVzL0BmaWdtYS1wbHVnaW4vaGVscGVycy9kaXN0L2hlbHBlcnMvaXNQYXJ0T2ZJbnN0YW5jZS5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9AZmlnbWEtcGx1Z2luK2hlbHBlcnNAMC4xNS4yL25vZGVfbW9kdWxlcy9AZmlnbWEtcGx1Z2luL2hlbHBlcnMvZGlzdC9oZWxwZXJzL2lzUGFydE9mTm9kZS5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9AZmlnbWEtcGx1Z2luK2hlbHBlcnNAMC4xNS4yL25vZGVfbW9kdWxlcy9AZmlnbWEtcGx1Z2luL2hlbHBlcnMvZGlzdC9oZWxwZXJzL2lzVHlwZU5vZGUuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vQGZpZ21hLXBsdWdpbitoZWxwZXJzQDAuMTUuMi9ub2RlX21vZHVsZXMvQGZpZ21hLXBsdWdpbi9oZWxwZXJzL2Rpc3QvaGVscGVycy9pc1Zpc2libGVOb2RlLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0BmaWdtYS1wbHVnaW4raGVscGVyc0AwLjE1LjIvbm9kZV9tb2R1bGVzL0BmaWdtYS1wbHVnaW4vaGVscGVycy9kaXN0L2hlbHBlcnMvbG9hZEZvbnRzLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0BmaWdtYS1wbHVnaW4raGVscGVyc0AwLjE1LjIvbm9kZV9tb2R1bGVzL0BmaWdtYS1wbHVnaW4vaGVscGVycy9kaXN0L2hlbHBlcnMvbG9hZFVuaXF1ZUZvbnRzLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0BmaWdtYS1wbHVnaW4raGVscGVyc0AwLjE1LjIvbm9kZV9tb2R1bGVzL0BmaWdtYS1wbHVnaW4vaGVscGVycy9kaXN0L2hlbHBlcnMvbm9kZVRvT2JqZWN0LmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0BmaWdtYS1wbHVnaW4raGVscGVyc0AwLjE1LjIvbm9kZV9tb2R1bGVzL0BmaWdtYS1wbHVnaW4vaGVscGVycy9kaXN0L2hlbHBlcnMvcGFyc2VUZXh0U3R5bGUuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vQGZpZ21hLXBsdWdpbitoZWxwZXJzQDAuMTUuMi9ub2RlX21vZHVsZXMvQGZpZ21hLXBsdWdpbi9oZWxwZXJzL2Rpc3QvaGVscGVycy9zZXRDaGFyYWN0ZXJzLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0BmaWdtYS1wbHVnaW4raGVscGVyc0AwLjE1LjIvbm9kZV9tb2R1bGVzL0BmaWdtYS1wbHVnaW4vaGVscGVycy9kaXN0L2hlbHBlcnMvdG9wTGV2ZWxGcmFtZXMuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vQGZpZ21hLXBsdWdpbitoZWxwZXJzQDAuMTUuMi9ub2RlX21vZHVsZXMvQGZpZ21hLXBsdWdpbi9oZWxwZXJzL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vQHM3bittYXRoQDAuMC45L25vZGVfbW9kdWxlcy9AczduL21hdGgvbGliL2NvbW1vbi9udW1iZXIuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vQHM3bittYXRoQDAuMC45L25vZGVfbW9kdWxlcy9AczduL21hdGgvbGliL2NvbnN0L2luZGV4LmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0BzN24rbWF0aEAwLjAuOS9ub2RlX21vZHVsZXMvQHM3bi9tYXRoL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9AczduK21hdGhAMC4wLjkvbm9kZV9tb2R1bGVzL0BzN24vbWF0aC9saWIvdW5pdC9hcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vQHM3bittYXRoQDAuMC45L25vZGVfbW9kdWxlcy9AczduL21hdGgvbGliL3VuaXQvYm94Mi9pbmRleC5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9AczduK21hdGhAMC4wLjkvbm9kZV9tb2R1bGVzL0BzN24vbWF0aC9saWIvdW5pdC9ib3gzL2luZGV4LmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0BzN24rbWF0aEAwLjAuOS9ub2RlX21vZHVsZXMvQHM3bi9tYXRoL2xpYi91bml0L2NpcmNsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9AczduK21hdGhAMC4wLjkvbm9kZV9tb2R1bGVzL0BzN24vbWF0aC9saWIvdW5pdC9lbGxpcHNlL2luZGV4LmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0BzN24rbWF0aEAwLjAuOS9ub2RlX21vZHVsZXMvQHM3bi9tYXRoL2xpYi91bml0L2xpbmUyL2luZGV4LmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0BzN24rbWF0aEAwLjAuOS9ub2RlX21vZHVsZXMvQHM3bi9tYXRoL2xpYi91bml0L2xpbmUyL2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9AczduK21hdGhAMC4wLjkvbm9kZV9tb2R1bGVzL0BzN24vbWF0aC9saWIvdW5pdC9saW5lMy9pbmRleC5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9AczduK21hdGhAMC4wLjkvbm9kZV9tb2R1bGVzL0BzN24vbWF0aC9saWIvdW5pdC9tYXRyaXgzL2luZGV4LmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0BzN24rbWF0aEAwLjAuOS9ub2RlX21vZHVsZXMvQHM3bi9tYXRoL2xpYi91bml0L21hdHJpeDQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vQHM3bittYXRoQDAuMC45L25vZGVfbW9kdWxlcy9AczduL21hdGgvbGliL3VuaXQvcG9seWdvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9AczduK21hdGhAMC4wLjkvbm9kZV9tb2R1bGVzL0BzN24vbWF0aC9saWIvdW5pdC92ZWN0b3IyL2luZGV4LmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0BzN24rbWF0aEAwLjAuOS9ub2RlX21vZHVsZXMvQHM3bi9tYXRoL2xpYi91bml0L3ZlY3RvcjMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vQHM3bittYXRoQDAuMC45L25vZGVfbW9kdWxlcy9AczduL21hdGgvbGliL3V0aWxzL2NpcmNsZS5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9AczduK21hdGhAMC4wLjkvbm9kZV9tb2R1bGVzL0BzN24vbWF0aC9saWIvdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vQHM3bittYXRoQDAuMC45L25vZGVfbW9kdWxlcy9AczduL21hdGgvbGliL3V0aWxzL2xpbmUyLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0BzN24rbWF0aEAwLjAuOS9ub2RlX21vZHVsZXMvQHM3bi9tYXRoL2xpYi91dGlscy9saW5lMy5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9AczduK21hdGhAMC4wLjkvbm9kZV9tb2R1bGVzL0BzN24vbWF0aC9saWIvdXRpbHMvdmVjdG9yMi5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9AczduK21hdGhAMC4wLjkvbm9kZV9tb2R1bGVzL0BzN24vbWF0aC9saWIvdXRpbHMvdmVjdG9yMy5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19EYXRhVmlldy5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19IYXNoLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX0xpc3RDYWNoZS5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19NYXAuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fTWFwQ2FjaGUuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fUHJvbWlzZS5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19TZXQuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fU2V0Q2FjaGUuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fU3RhY2suanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fU3ltYm9sLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1VpbnQ4QXJyYXkuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fV2Vha01hcC5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19hcnJheUVhY2guanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlGaWx0ZXIuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlJbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19hcnJheUluY2x1ZGVzV2l0aC5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19hcnJheUxpa2VLZXlzLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2FycmF5TWFwLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2FycmF5UHVzaC5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19hcnJheVNvbWUuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXNzaWduVmFsdWUuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYXNzb2NJbmRleE9mLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VBc3NpZ24uanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUFzc2lnbkluLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VBc3NpZ25WYWx1ZS5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlQ2xvbmUuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUNyZWF0ZS5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlRmluZEluZGV4LmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VHZXQuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUdldEFsbEtleXMuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUdldFRhZy5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSGFzSW4uanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUluZGV4T2YuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzQXJndW1lbnRzLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VJc0VxdWFsLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VJc0VxdWFsRGVlcC5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNNYXAuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzTWF0Y2guanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzTmFOLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VJc05hdGl2ZS5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNTZXQuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzVHlwZWRBcnJheS5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXRlcmF0ZWUuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUtleXMuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUtleXNJbi5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlTWF0Y2hlcy5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlTWF0Y2hlc1Byb3BlcnR5LmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlUHJvcGVydHlEZWVwLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VUaW1lcy5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlVG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVVuYXJ5LmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VVbmlxLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NhY2hlSGFzLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Nhc3RQYXRoLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Nsb25lQXJyYXlCdWZmZXIuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fY2xvbmVCdWZmZXIuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fY2xvbmVEYXRhVmlldy5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19jbG9uZVJlZ0V4cC5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19jbG9uZVN5bWJvbC5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19jbG9uZVR5cGVkQXJyYXkuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fY29weUFycmF5LmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NvcHlPYmplY3QuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fY29weVN5bWJvbHMuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fY29weVN5bWJvbHNJbi5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19jb3JlSnNEYXRhLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NyZWF0ZVNldC5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19lcXVhbEFycmF5cy5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19lcXVhbEJ5VGFnLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2VxdWFsT2JqZWN0cy5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19mcmVlR2xvYmFsLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldEFsbEtleXMuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0QWxsS2V5c0luLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldE1hcERhdGEuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0TWF0Y2hEYXRhLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldE5hdGl2ZS5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRQcm90b3R5cGUuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0UmF3VGFnLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFN5bWJvbHMuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0U3ltYm9sc0luLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFRhZy5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRWYWx1ZS5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19oYXNQYXRoLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc2hDbGVhci5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoRGVsZXRlLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc2hHZXQuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9faGFzaEhhcy5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoU2V0LmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2luaXRDbG9uZUFycmF5LmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2luaXRDbG9uZUJ5VGFnLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2luaXRDbG9uZU9iamVjdC5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19pc0luZGV4LmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzS2V5LmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzS2V5YWJsZS5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19pc01hc2tlZC5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19pc1Byb3RvdHlwZS5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19pc1N0cmljdENvbXBhcmFibGUuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fbGlzdENhY2hlQ2xlYXIuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fbGlzdENhY2hlRGVsZXRlLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2xpc3RDYWNoZUdldC5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19saXN0Q2FjaGVIYXMuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fbGlzdENhY2hlU2V0LmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX21hcENhY2hlQ2xlYXIuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVEZWxldGUuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVHZXQuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVIYXMuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVTZXQuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19tYXRjaGVzU3RyaWN0Q29tcGFyYWJsZS5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19tZW1vaXplQ2FwcGVkLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX25hdGl2ZUNyZWF0ZS5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19uYXRpdmVLZXlzLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX25hdGl2ZUtleXNJbi5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19ub2RlVXRpbC5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19vdmVyQXJnLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fc2V0Q2FjaGVBZGQuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fc2V0Q2FjaGVIYXMuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fc2V0VG9BcnJheS5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL19zdGFja0NsZWFyLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3N0YWNrRGVsZXRlLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3N0YWNrR2V0LmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3N0YWNrSGFzLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3N0YWNrU2V0LmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3N0cmljdEluZGV4T2YuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9fc3RyaW5nVG9QYXRoLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3RvS2V5LmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3RvU291cmNlLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvY2xvbmVEZWVwLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvZXEuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9nZXQuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9oYXNJbi5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL2lkZW50aXR5LmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcmd1bWVudHMuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9pc0FycmF5LmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcnJheUxpa2UuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9pc0J1ZmZlci5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL2lzRXF1YWwuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9pc0Z1bmN0aW9uLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNMZW5ndGguanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9pc01hcC5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0LmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNPYmplY3RMaWtlLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNTZXQuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL2lzVHlwZWRBcnJheS5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL2lzVW5kZWZpbmVkLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gva2V5cy5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL2tleXNJbi5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL21lbW9pemUuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9ub29wLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2xvZGFzaEA0LjE3LjIxL25vZGVfbW9kdWxlcy9sb2Rhc2gvcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9zdHViQXJyYXkuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC9zdHViRmFsc2UuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vbG9kYXNoQDQuMTcuMjEvbm9kZV9tb2R1bGVzL2xvZGFzaC90b1N0cmluZy5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL3VuaXFCeS5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL25vZGVfbW9kdWxlcy8ucG5wbS9sb2Rhc2hANC4xNy4yMS9ub2RlX21vZHVsZXMvbG9kYXNoL3VuaXFXaXRoLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL21hdHJpeC1pbnZlcnNlQDEuMC4xL25vZGVfbW9kdWxlcy9tYXRyaXgtaW52ZXJzZS9tYXRyaXgtaW52ZXJzZS5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC8uL3NyYy90b29scy50cyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi1wbGF5Z3JvdW5kL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4tcGxheWdyb3VuZC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLXBsYXlncm91bmQvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5hcHBseU1hdHJpeFRvUG9pbnQgPSBhcHBseU1hdHJpeFRvUG9pbnQ7XG5cbmZ1bmN0aW9uIGFwcGx5TWF0cml4VG9Qb2ludChtYXRyaXgsIHBvaW50KSB7XG4gIHJldHVybiBbcG9pbnRbMF0gKiBtYXRyaXhbMF1bMF0gKyBwb2ludFsxXSAqIG1hdHJpeFswXVsxXSArIG1hdHJpeFswXVsyXSwgcG9pbnRbMF0gKiBtYXRyaXhbMV1bMF0gKyBwb2ludFsxXSAqIG1hdHJpeFsxXVsxXSArIG1hdHJpeFsxXVsyXV07XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjbG9uZTtcblxuLyoqXG4gKiAgdGhpcyBmdW5jdGlvbiByZXR1cm5zIGNsb25lIHRoZSBvYmplY3RcbiAqL1xuZnVuY3Rpb24gY2xvbmUodmFsKSB7XG4gIGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsO1xuXG4gIGlmICh0eXBlID09PSAndW5kZWZpbmVkJyB8fCB0eXBlID09PSAnbnVtYmVyJyB8fCB0eXBlID09PSAnc3RyaW5nJyB8fCB0eXBlID09PSAnYm9vbGVhbicgfHwgdHlwZSA9PT0gJ3N5bWJvbCcgfHwgdmFsID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgIGlmICh2YWwgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgcmV0dXJuIHZhbC5tYXAoY2xvbmUpO1xuICAgIH0gZWxzZSBpZiAodmFsIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG8gPSB7fTtcblxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdmFsKSB7XG4gICAgICAgIG9ba2V5XSA9IGNsb25lKHZhbFtrZXldKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG87XG4gICAgfVxuICB9XG5cbiAgdGhyb3cgJ3Vua25vd24nO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5maWdtYVJHQlRvV2ViUkdCID0gZmlnbWFSR0JUb1dlYlJHQjtcbmV4cG9ydHMud2ViUkdCVG9GaWdtYVJHQiA9IHdlYlJHQlRvRmlnbWFSR0I7XG5leHBvcnRzLmZpZ21hUkdCVG9IZXggPSBmaWdtYVJHQlRvSGV4O1xuZXhwb3J0cy5oZXhUb0ZpZ21hUkdCID0gaGV4VG9GaWdtYVJHQjtcbmNvbnN0IG5hbWVzUkdCID0gWydyJywgJ2cnLCAnYiddO1xuLyoqXG4gKiB0aGlzIGZ1bmN0aW9uIGNvbnZlcnRzIGZpZ21hIGNvbG9yIHRvIFJHQihBKSAoYXJyYXkpXG4gKi9cbi8vIGZpZ21hUkdCVG9XZWJSR0Ioe3I6IDAuODg3NDk5OTg4MDc5MDcxLCBnOiAwLjA3MDU4ODIzODUzNzMxMTU1LCBiOiAwLjA2NjU2MjQ3Mzc3Mzk1NjN9KVxuLy89PiBbMjI2LCAxOCwgMTddXG5cbmZ1bmN0aW9uIGZpZ21hUkdCVG9XZWJSR0IoY29sb3IpIHtcbiAgY29uc3QgcmdiID0gW107XG4gIG5hbWVzUkdCLmZvckVhY2goKGUsIGkpID0+IHtcbiAgICByZ2JbaV0gPSBNYXRoLnJvdW5kKGNvbG9yW2VdICogMjU1KTtcbiAgfSk7XG4gIGlmIChjb2xvclsnYSddICE9PSB1bmRlZmluZWQpIHJnYlszXSA9IE1hdGgucm91bmQoY29sb3JbJ2EnXSAqIDEwMCkgLyAxMDA7XG4gIHJldHVybiByZ2I7XG59XG4vKipcbiAqIHRoaXMgZnVuY3Rpb24gY29udmVydHMgUkdCKEEpIGNvbG9yIChhcnJheSkgdG8gZmlnbWEgY29sb3JcbiAqL1xuLy8gd2ViUkdCVG9GaWdtYVJHQihbMjI2LCAxOCwgMTddKVxuLy89PiB7cjogMC44ODYyNzQ1MDk4MDM5MjE1LCBnOiAwLjA3MDU4ODIzNTI5NDExNzY1LCBiOiAwLjA2NjY2NjY2NjY2NjY2NjY3fVxuXG5cbmZ1bmN0aW9uIHdlYlJHQlRvRmlnbWFSR0IoY29sb3IpIHtcbiAgY29uc3QgcmdiID0ge307XG4gIG5hbWVzUkdCLmZvckVhY2goKGUsIGkpID0+IHtcbiAgICByZ2JbZV0gPSBjb2xvcltpXSAvIDI1NTtcbiAgfSk7XG4gIGlmIChjb2xvclszXSAhPT0gdW5kZWZpbmVkKSByZ2JbJ2EnXSA9IGNvbG9yWzNdO1xuICByZXR1cm4gcmdiO1xufVxuLyoqXG4gKiB0aGlzIGZ1bmN0aW9uIGNvbnZlcnRzIGZpZ21hIGNvbG9yIHRvIEhFWCAoc3RyaW5nKVxuICovXG4vLyBmaWdtYVJHQlRvSGV4KHsgcjogMCwgZzogMC4xLCBiOiAxIH0pXG4vLz0+ICMwMDFhZmZcblxuXG5mdW5jdGlvbiBmaWdtYVJHQlRvSGV4KGNvbG9yKSB7XG4gIGxldCBoZXggPSAnIyc7XG4gIGNvbnN0IHJnYiA9IGZpZ21hUkdCVG9XZWJSR0IoY29sb3IpO1xuICBoZXggKz0gKCgxIDw8IDI0KSArIChyZ2JbMF0gPDwgMTYpICsgKHJnYlsxXSA8PCA4KSArIHJnYlsyXSkudG9TdHJpbmcoMTYpLnNsaWNlKDEpO1xuXG4gIGlmIChyZ2JbM10gIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGEgPSBNYXRoLnJvdW5kKHJnYlszXSAqIDI1NSkudG9TdHJpbmcoMTYpO1xuXG4gICAgaWYgKGEubGVuZ3RoID09IDEpIHtcbiAgICAgIGhleCArPSAnMCcgKyBhO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYSAhPT0gJ2ZmJykgaGV4ICs9IGE7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGhleDtcbn1cbi8qKlxuICogdGhpcyBmdW5jdGlvbiBjb252ZXJ0cyBIRVggY29sb3IgKHN0cmluZykgdG8gZmlnbWEgY29sb3JcbiAqL1xuLy8gaGV4VG9GaWdtYVJHQigjMDAxYWZmKVxuLy89PiB7IHI6IDAsIGc6IDAuMTAxOTYwNzg0MzEzNzI1NDksIGI6IDEgfVxuXG5cbmZ1bmN0aW9uIGhleFRvRmlnbWFSR0IoY29sb3IpIHtcbiAgbGV0IG9wYWNpdHkgPSAnJztcbiAgY29sb3IgPSBjb2xvci50b0xvd2VyQ2FzZSgpO1xuICBpZiAoY29sb3JbMF0gPT09ICcjJykgY29sb3IgPSBjb2xvci5zbGljZSgxKTtcblxuICBpZiAoY29sb3IubGVuZ3RoID09PSAzKSB7XG4gICAgY29sb3IgPSBjb2xvci5yZXBsYWNlKC8oLikoLikoLik/L2csICckMSQxJDIkMiQzJDMnKTtcbiAgfSBlbHNlIGlmIChjb2xvci5sZW5ndGggPT09IDgpIHtcbiAgICBjb25zdCBhcnIgPSBjb2xvci5tYXRjaCgvKC57Nn0pKC57Mn0pLyk7XG4gICAgY29sb3IgPSBhcnJbMV07XG4gICAgb3BhY2l0eSA9IGFyclsyXTtcbiAgfVxuXG4gIGNvbnN0IG51bSA9IHBhcnNlSW50KGNvbG9yLCAxNik7XG4gIGNvbnN0IHJnYiA9IFtudW0gPj4gMTYsIG51bSA+PiA4ICYgMjU1LCBudW0gJiAyNTVdO1xuXG4gIGlmIChvcGFjaXR5KSB7XG4gICAgcmdiLnB1c2gocGFyc2VJbnQob3BhY2l0eSwgMTYpIC8gMjU1KTtcbiAgICByZXR1cm4gd2ViUkdCVG9GaWdtYVJHQihyZ2IpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB3ZWJSR0JUb0ZpZ21hUkdCKHJnYik7XG4gIH1cbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZXh0cmFjdEltYWdlQ3JvcFBhcmFtcyA9IGV4dHJhY3RJbWFnZUNyb3BQYXJhbXM7XG5cbnZhciBfbWF0cml4SW52ZXJzZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIm1hdHJpeC1pbnZlcnNlXCIpKTtcblxudmFyIF9hcHBseU1hdHJpeFRvUG9pbnQgPSByZXF1aXJlKFwiLi9hcHBseU1hdHJpeFRvUG9pbnRcIik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogVGhpcyBtZXRob2QgY2FuIGV4dHJhY3QgdGhlIGltYWdlIGNyb3Agcm90YXRpb24sIHNjYWxlICgvc2l6ZSkgYW5kIHBvc2l0aW9uLlxuICpcbiAqIEBwYXJhbSBzaGFwZVdpZHRoXG4gKiBAcGFyYW0gc2hhcGVIZWlnaHRcbiAqIEBwYXJhbSB0XG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RJbWFnZUNyb3BQYXJhbXMoc2hhcGVXaWR0aCwgc2hhcGVIZWlnaHQsIHQpIHtcbiAgY29uc3QgdHJhbnNmb3JtID0gdC5sZW5ndGggPT09IDIgPyBbLi4udCwgWzAsIDAsIDFdXSA6IFsuLi50XTtcbiAgY29uc3QgbXhJbnYgPSAoMCwgX21hdHJpeEludmVyc2UuZGVmYXVsdCkodHJhbnNmb3JtKTtcbiAgY29uc3QgcG9pbnRzID0gW1swLCAwXSwgWzEsIDBdLCBbMSwgMV0sIFswLCAxXV0ubWFwKHAgPT4gKDAsIF9hcHBseU1hdHJpeFRvUG9pbnQuYXBwbHlNYXRyaXhUb1BvaW50KShteEludiwgcCkpO1xuICBjb25zdCBhbmdsZSA9IE1hdGguYXRhbjIocG9pbnRzWzFdWzFdIC0gcG9pbnRzWzBdWzFdLCBwb2ludHNbMV1bMF0gLSBwb2ludHNbMF1bMF0pO1xuICBjb25zdCBzeCA9IE1hdGguc3FydChNYXRoLnBvdyhwb2ludHNbMV1bMF0gLSBwb2ludHNbMF1bMF0sIDIpICsgTWF0aC5wb3cocG9pbnRzWzFdWzFdIC0gcG9pbnRzWzBdWzFdLCAyKSk7XG4gIGNvbnN0IHN5ID0gTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50c1syXVswXSAtIHBvaW50c1sxXVswXSwgMikgKyBNYXRoLnBvdyhwb2ludHNbMl1bMV0gLSBwb2ludHNbMV1bMV0sIDIpKTtcbiAgcmV0dXJuIHtcbiAgICByb3RhdGlvbjogYW5nbGUgKiAoMTgwIC8gTWF0aC5QSSksXG4gICAgc2NhbGU6IFtzeCwgc3ldLFxuICAgIHNpemU6IFtzeCAqIHNoYXBlV2lkdGgsIHN5ICogc2hhcGVIZWlnaHRdLFxuICAgIHBvc2l0aW9uOiBbLXBvaW50c1swXVswXSAqIHNoYXBlV2lkdGgsIC1wb2ludHNbMF1bMV0gKiBzaGFwZUhlaWdodF1cbiAgfTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZXh0cmFjdExpbmVhckdyYWRpZW50UGFyYW1zRnJvbVRyYW5zZm9ybSA9IGV4dHJhY3RMaW5lYXJHcmFkaWVudFBhcmFtc0Zyb21UcmFuc2Zvcm07XG5cbnZhciBfbWF0cml4SW52ZXJzZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIm1hdHJpeC1pbnZlcnNlXCIpKTtcblxudmFyIF9hcHBseU1hdHJpeFRvUG9pbnQgPSByZXF1aXJlKFwiLi9hcHBseU1hdHJpeFRvUG9pbnRcIik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogVGhpcyBtZXRob2QgY2FuIGV4dHJhY3QgdGhlIHggYW5kIHkgcG9zaXRpb25zIG9mIHRoZSBzdGFydCBhbmQgZW5kIG9mIHRoZSBsaW5lYXIgZ3JhZGllbnRcbiAqIChzY2FsZSBpcyBub3QgaW1wb3J0YW50IGhlcmUpXG4gKlxuICogQHBhcmFtIHNoYXBlV2lkdGggbnVtYmVyXG4gKiBAcGFyYW0gc2hhcGVIZWlnaHQgbnVtYmVyXG4gKiBAcGFyYW0gdCBUcmFuc2Zvcm1cbiAqL1xuZnVuY3Rpb24gZXh0cmFjdExpbmVhckdyYWRpZW50UGFyYW1zRnJvbVRyYW5zZm9ybShzaGFwZVdpZHRoLCBzaGFwZUhlaWdodCwgdCkge1xuICBjb25zdCB0cmFuc2Zvcm0gPSB0Lmxlbmd0aCA9PT0gMiA/IFsuLi50LCBbMCwgMCwgMV1dIDogWy4uLnRdO1xuICBjb25zdCBteEludiA9ICgwLCBfbWF0cml4SW52ZXJzZS5kZWZhdWx0KSh0cmFuc2Zvcm0pO1xuICBjb25zdCBzdGFydEVuZCA9IFtbMCwgMC41XSwgWzEsIDAuNV1dLm1hcChwID0+ICgwLCBfYXBwbHlNYXRyaXhUb1BvaW50LmFwcGx5TWF0cml4VG9Qb2ludCkobXhJbnYsIHApKTtcbiAgcmV0dXJuIHtcbiAgICBzdGFydDogW3N0YXJ0RW5kWzBdWzBdICogc2hhcGVXaWR0aCwgc3RhcnRFbmRbMF1bMV0gKiBzaGFwZUhlaWdodF0sXG4gICAgZW5kOiBbc3RhcnRFbmRbMV1bMF0gKiBzaGFwZVdpZHRoLCBzdGFydEVuZFsxXVsxXSAqIHNoYXBlSGVpZ2h0XVxuICB9O1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5leHRyYWN0UmFkaWFsT3JEaWFtb25kR3JhZGllbnRQYXJhbXMgPSBleHRyYWN0UmFkaWFsT3JEaWFtb25kR3JhZGllbnRQYXJhbXM7XG5cbnZhciBfbWF0cml4SW52ZXJzZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIm1hdHJpeC1pbnZlcnNlXCIpKTtcblxudmFyIF9hcHBseU1hdHJpeFRvUG9pbnQgPSByZXF1aXJlKFwiLi9hcHBseU1hdHJpeFRvUG9pbnRcIik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogVGhpcyBtZXRob2QgY2FuIGV4dHJhY3QgdGhlIHJvdGF0aW9uIChpbiBkZWdyZWVzKSwgY2VudGVyIHBvaW50IGFuZCByYWRpdXMgZm9yIGEgcmFkaWFsIG9yIGRpYW1vbmQgZ3JhZGllbnRcbiAqXG4gKiBAcGFyYW0gc2hhcGVXaWR0aFxuICogQHBhcmFtIHNoYXBlSGVpZ2h0XG4gKiBAcGFyYW0gdFxuICovXG5mdW5jdGlvbiBleHRyYWN0UmFkaWFsT3JEaWFtb25kR3JhZGllbnRQYXJhbXMoc2hhcGVXaWR0aCwgc2hhcGVIZWlnaHQsIHQpIHtcbiAgY29uc3QgdHJhbnNmb3JtID0gdC5sZW5ndGggPT09IDIgPyBbLi4udCwgWzAsIDAsIDFdXSA6IFsuLi50XTtcbiAgY29uc3QgbXhJbnYgPSAoMCwgX21hdHJpeEludmVyc2UuZGVmYXVsdCkodHJhbnNmb3JtKTtcbiAgY29uc3QgY2VudGVyUG9pbnQgPSAoMCwgX2FwcGx5TWF0cml4VG9Qb2ludC5hcHBseU1hdHJpeFRvUG9pbnQpKG14SW52LCBbMC41LCAwLjVdKTtcbiAgY29uc3QgcnhQb2ludCA9ICgwLCBfYXBwbHlNYXRyaXhUb1BvaW50LmFwcGx5TWF0cml4VG9Qb2ludCkobXhJbnYsIFsxLCAwLjVdKTtcbiAgY29uc3QgcnlQb2ludCA9ICgwLCBfYXBwbHlNYXRyaXhUb1BvaW50LmFwcGx5TWF0cml4VG9Qb2ludCkobXhJbnYsIFswLjUsIDFdKTtcbiAgY29uc3QgcnggPSBNYXRoLnNxcnQoTWF0aC5wb3cocnhQb2ludFswXSAtIGNlbnRlclBvaW50WzBdLCAyKSArIE1hdGgucG93KHJ4UG9pbnRbMV0gLSBjZW50ZXJQb2ludFsxXSwgMikpO1xuICBjb25zdCByeSA9IE1hdGguc3FydChNYXRoLnBvdyhyeVBvaW50WzBdIC0gY2VudGVyUG9pbnRbMF0sIDIpICsgTWF0aC5wb3cocnlQb2ludFsxXSAtIGNlbnRlclBvaW50WzFdLCAyKSk7XG4gIGNvbnN0IGFuZ2xlID0gTWF0aC5hdGFuKChyeFBvaW50WzFdIC0gY2VudGVyUG9pbnRbMV0pIC8gKHJ4UG9pbnRbMF0gLSBjZW50ZXJQb2ludFswXSkpICogKDE4MCAvIE1hdGguUEkpO1xuICByZXR1cm4ge1xuICAgIHJvdGF0aW9uOiBhbmdsZSxcbiAgICBjZW50ZXI6IFtjZW50ZXJQb2ludFswXSAqIHNoYXBlV2lkdGgsIGNlbnRlclBvaW50WzFdICogc2hhcGVIZWlnaHRdLFxuICAgIHJhZGl1czogW3J4ICogc2hhcGVXaWR0aCwgcnkgKiBzaGFwZUhlaWdodF1cbiAgfTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZmluZEFsbCA9IHZvaWQgMDtcblxudmFyIF8gPSByZXF1aXJlKFwiLi5cIik7XG5cbi8qKlxuICogQ3VzdG9tIGltcGxlbWVudGF0aW9uIG9mIHRoZSBmaWdtYS5maW5kQWxsIG1ldGhvZCwgd2hpY2ggcnVucyB4MTAwMCB0aW1lcyBmYXN0ZXIuXG4gKlxuICogIyMjIFVzYWdlIGV4YW1wbGVcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyBmaW5kQWxsLCBpc1RleHROb2RlIH0gZnJvbSBcIkBmaWdtYS1wbHVnaW4vaGVscGVyc1wiXG4gKlxuICogY29uc3QgdGV4dE5vZGVzID0gZmluZEFsbChmaWdtYS5jdXJyZW50UGFnZS5jaGlsZHJlbiwgaXNUZXh0Tm9kZSlcbiAqIGBgYFxuICpcbiAqICMjIyBIb3cgdG8gcmVwbGFjZSBuYXRpdmUgYGZpZ21hLmZpbmRBbGxgXG4gKiBgYGBkaWZmXG4gKiArIGltcG9ydCB7IGZpbmRBbGwgfSBmcm9tIFwiQGZpZ21hLXBsdWdpbi9oZWxwZXJzXCJcbiAqXG4gKiAtIGNvbnN0IHRleHROb2RlcyA9IGZpZ21hLmN1cnJlbnRQYWdlLmZpbmRBbGwoKG5vZGUpID0+IG5vZGUudHlwZSA9PT0gXCJURVhUXCIpO1xuICogKyBjb25zdCB0ZXh0Tm9kZXMgPSBmaW5kQWxsKGZpZ21hLmN1cnJlbnRQYWdlLmNoaWxkcmVuLCAobm9kZSkgPT4gbm9kZS50eXBlID09PSBcIlRFWFRcIilcbiAqIGBgYFxuICovXG5jb25zdCBmaW5kQWxsID0gKG5vZGVzLCBpdGVyYXRlZSkgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGl0ZXJhdGVlKG5vZGVzW2ldLCBpLCBub2RlcykpIHtcbiAgICAgIHJlc3VsdC5wdXNoKG5vZGVzW2ldKTtcbiAgICB9IGVsc2UgaWYgKCgwLCBfLmhhc0NoaWxkcmVuKShub2Rlc1tpXSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKC4uLmZpbmRBbGwobm9kZXNbaV1bJ2NoaWxkcmVuJ10sIGl0ZXJhdGVlKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmV4cG9ydHMuZmluZEFsbCA9IGZpbmRBbGw7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBnZXRBbGxGb250cztcblxuLyoqXG4gKiB0aGlzIGZ1bmN0aW9uIHJldHVybnMgYWxsIHVzZWQgZm9udHMgdG8gdGV4dE5vZGVzXG4gKi9cbmZ1bmN0aW9uIGdldEFsbEZvbnRzKHRleHROb2Rlcykge1xuICBjb25zdCBmb250cyA9IFtdO1xuXG4gIGNvbnN0IHB1c2hVbmlxdWUgPSBmb250ID0+IHtcbiAgICBpZiAoIWZvbnRzLnNvbWUoaXRlbSA9PiBpdGVtLmZhbWlseSA9PT0gZm9udC5mYW1pbHkgJiYgaXRlbS5zdHlsZSA9PT0gZm9udC5zdHlsZSkpIHtcbiAgICAgIGZvbnRzLnB1c2goZm9udCk7XG4gICAgfVxuICB9O1xuXG4gIGZvciAoY29uc3Qgbm9kZSBvZiB0ZXh0Tm9kZXMpIHtcbiAgICBpZiAobm9kZS5mb250TmFtZSA9PT0gZmlnbWEubWl4ZWQpIHtcbiAgICAgIGNvbnN0IGxlbiA9IG5vZGUuY2hhcmFjdGVycy5sZW5ndGg7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgY29uc3QgZm9udCA9IG5vZGUuZ2V0UmFuZ2VGb250TmFtZShpLCBpICsgMSk7XG4gICAgICAgIHB1c2hVbmlxdWUoZm9udCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHB1c2hVbmlxdWUobm9kZS5mb250TmFtZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZvbnRzO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0Qm91bmRpbmdSZWN0O1xuXG52YXIgX2lzVW5kZWZpbmVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcImxvZGFzaC9pc1VuZGVmaW5lZFwiKSk7XG5cbnZhciBfYXBwbHlNYXRyaXhUb1BvaW50ID0gcmVxdWlyZShcIi4vYXBwbHlNYXRyaXhUb1BvaW50XCIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqICB0aGlzIGZ1bmN0aW9uIHJldHVybiBhIGJvdW5kaW5nIHJlY3QgZm9yIGFuIG5vZGVzXG4gKi9cbi8vIHgveSBhYnNvbHV0ZSBjb29yZGluYXRlc1xuLy8gaGVpZ2h0L3dpZHRoXG4vLyB4Mi95MiBib3R0b20gcmlnaHQgY29vcmRpbmF0ZXNcbmZ1bmN0aW9uIGdldEJvdW5kaW5nUmVjdChub2Rlcykge1xuICBjb25zdCBib3VuZGluZ1JlY3QgPSB7XG4gICAgeDogMCxcbiAgICB5OiAwLFxuICAgIHgyOiAwLFxuICAgIHkyOiAwLFxuICAgIGhlaWdodDogMCxcbiAgICB3aWR0aDogMFxuICB9O1xuXG4gIGlmIChub2Rlcy5sZW5ndGgpIHtcbiAgICBjb25zdCB4eSA9IG5vZGVzLnJlZHVjZSgocmV6LCBub2RlKSA9PiB7XG4gICAgICBpZiAoIW5vZGUuYWJzb2x1dGVUcmFuc2Zvcm0pIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdQcm92aWRlZCBub2RlIGhhdmVuXFwndCBcImFic29sdXRlVHJhbnNmb3JtXCIgcHJvcGVydHksIGJ1dCBpdFxcJ3MgcmVxdWlyZWQgZm9yIGNhbGN1bGF0aW9ucy4nKTtcbiAgICAgICAgcmV0dXJuIHJlejtcbiAgICAgIH1cblxuICAgICAgaWYgKCgwLCBfaXNVbmRlZmluZWQyLmRlZmF1bHQpKG5vZGUuaGVpZ2h0KSB8fCAoMCwgX2lzVW5kZWZpbmVkMi5kZWZhdWx0KShub2RlLndpZHRoKSkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1Byb3ZpZGVkIG5vZGUgaGF2ZW5cXCd0IFwid2lkdGgvaGVpZ2h0XCIgcHJvcGVydHksIGJ1dCBpdFxcJ3MgcmVxdWlyZWQgZm9yIGNhbGN1bGF0aW9ucy4nKTtcbiAgICAgICAgcmV0dXJuIHJlejtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaGFsZkhlaWdodCA9IG5vZGUuaGVpZ2h0IC8gMjtcbiAgICAgIGNvbnN0IGhhbGZXaWR0aCA9IG5vZGUud2lkdGggLyAyO1xuICAgICAgY29uc3QgW1tjMCwgczAsIHhdLCBbczEsIGMxLCB5XV0gPSBub2RlLmFic29sdXRlVHJhbnNmb3JtO1xuICAgICAgY29uc3QgbWF0cml4ID0gW1tjMCwgczAsIHggKyBoYWxmV2lkdGggKiBjMCArIGhhbGZIZWlnaHQgKiBzMF0sIFtzMSwgYzEsIHkgKyBoYWxmV2lkdGggKiBzMSArIGhhbGZIZWlnaHQgKiBjMV1dOyAvLyB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIGNvcm5lcnMgb2YgdGhlIHJlY3RhbmdsZVxuXG4gICAgICBjb25zdCBYWSA9IHtcbiAgICAgICAgeDogWzEsIC0xLCAxLCAtMV0sXG4gICAgICAgIHk6IFsxLCAtMSwgLTEsIDFdXG4gICAgICB9OyAvLyBmaWxsIGluXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDM7IGkrKykge1xuICAgICAgICBjb25zdCBhID0gKDAsIF9hcHBseU1hdHJpeFRvUG9pbnQuYXBwbHlNYXRyaXhUb1BvaW50KShtYXRyaXgsIFtYWS54W2ldICogaGFsZldpZHRoLCBYWS55W2ldICogaGFsZkhlaWdodF0pO1xuICAgICAgICBYWS54W2ldID0gYVswXTtcbiAgICAgICAgWFkueVtpXSA9IGFbMV07XG4gICAgICB9XG5cbiAgICAgIFhZLnguc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICAgICAgWFkueS5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gICAgICByZXoueC5wdXNoKFhZLnhbMF0pO1xuICAgICAgcmV6LnkucHVzaChYWS55WzBdKTtcbiAgICAgIHJlei54Mi5wdXNoKFhZLnhbM10pO1xuICAgICAgcmV6LnkyLnB1c2goWFkueVszXSk7XG4gICAgICByZXR1cm4gcmV6O1xuICAgIH0sIHtcbiAgICAgIHg6IFtdLFxuICAgICAgeTogW10sXG4gICAgICB4MjogW10sXG4gICAgICB5MjogW11cbiAgICB9KTtcbiAgICBjb25zdCByZWN0ID0ge1xuICAgICAgeDogTWF0aC5taW4oLi4ueHkueCksXG4gICAgICB5OiBNYXRoLm1pbiguLi54eS55KSxcbiAgICAgIHgyOiBNYXRoLm1heCguLi54eS54MiksXG4gICAgICB5MjogTWF0aC5tYXgoLi4ueHkueTIpXG4gICAgfTtcbiAgICBib3VuZGluZ1JlY3QueCA9IHJlY3QueDtcbiAgICBib3VuZGluZ1JlY3QueSA9IHJlY3QueTtcbiAgICBib3VuZGluZ1JlY3QueDIgPSByZWN0LngyO1xuICAgIGJvdW5kaW5nUmVjdC55MiA9IHJlY3QueTI7XG4gICAgYm91bmRpbmdSZWN0LndpZHRoID0gcmVjdC54MiAtIHJlY3QueDtcbiAgICBib3VuZGluZ1JlY3QuaGVpZ2h0ID0gcmVjdC55MiAtIHJlY3QueTtcbiAgfVxuXG4gIHJldHVybiBib3VuZGluZ1JlY3Q7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmdldFRleHROb2RlQ1NTID0gdm9pZCAwO1xuXG52YXIgX2dldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJsb2Rhc2gvZ2V0XCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuY29uc3Qgc3RyaW5nVmFsdWVUb0NzcyA9IHZhbHVlID0+IHtcbiAgaWYgKC9yaWdodHxib3R0b20vaS50ZXN0KHZhbHVlKSkge1xuICAgIHJldHVybiAnZmxleC1lbmQnO1xuICB9IGVsc2UgaWYgKC9sZWZ0fHRvcC9pLnRlc3QodmFsdWUpKSB7XG4gICAgcmV0dXJuICdmbGV4LXN0YXJ0JztcbiAgfSBlbHNlIGlmICgvY2VudGVyL2kudGVzdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gJ2NlbnRlcic7XG4gIH0gZWxzZSBpZiAoL2xvd2VyL2kudGVzdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gJ2xvd2VyY2FzZSc7XG4gIH0gZWxzZSBpZiAoL3VwcGVyL2kudGVzdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gJ3VwcGVyY2FzZSc7XG4gIH0gZWxzZSBpZiAoL3RpdGxlL2kudGVzdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gJ2NhcGl0YWxpemUnO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnbm9uZSc7XG4gIH1cbn07XG5cbmNvbnN0IHVuaXRWYWx1ZVRvQ3NzID0gKHtcbiAgdW5pdCxcbiAgdmFsdWVcbn0pID0+IHtcbiAgaWYgKHVuaXQgPT09ICdQRVJDRU5UJykge1xuICAgIHJldHVybiBgJHt2YWx1ZX0lYDtcbiAgfSBlbHNlIGlmICh1bml0ID09PSAnUElYRUxTJykge1xuICAgIHJldHVybiBgJHt2YWx1ZX1weGA7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICdhdXRvJztcbiAgfVxufTtcblxuY29uc3QgaXNVbml0VmFsdWUgPSBvYmogPT4ge1xuICByZXR1cm4gb2JqLmhhc093blByb3BlcnR5KCd1bml0Jyk7XG59O1xuXG5jb25zdCBnZXRTdHlsZVZhbHVlID0gKG5vZGUsIGtleSwgZXhhY3RTdHJpbmcpID0+IHtcbiAgY29uc3QgdmFsdWUgPSAoMCwgX2dldDIuZGVmYXVsdCkobm9kZSwga2V5KTtcblxuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBudWxsO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZXhhY3RTdHJpbmcgPyB2YWx1ZS50b0xvd2VyQ2FzZSgpLnRyaW0oKSA6IHN0cmluZ1ZhbHVlVG9Dc3ModmFsdWUudG9Mb3dlckNhc2UoKS50cmltKCkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gYCR7dmFsdWV9cHhgO1xuICB9IGVsc2UgaWYgKGlzVW5pdFZhbHVlKHZhbHVlKSkge1xuICAgIHJldHVybiB1bml0VmFsdWVUb0Nzcyh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS53YXJuKCdVbmV4cGVjdGVkIHZhbHVlOiAnLCB2YWx1ZSk7XG4gIH1cbn07XG4vKipcbiAqICBnZXQgQ1NTIHN0eWxlcyBvZiBUZXh0Tm9kZVxuICovXG5cblxuY29uc3QgZ2V0VGV4dE5vZGVDU1MgPSBub2RlID0+IHtcbiAgcmV0dXJuIHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB0b3A6IGdldFN0eWxlVmFsdWUobm9kZSwgJ3knKSxcbiAgICBsZWZ0OiBnZXRTdHlsZVZhbHVlKG5vZGUsICd4JyksXG4gICAgd2lkdGg6IGdldFN0eWxlVmFsdWUobm9kZSwgJ3dpZHRoJyksXG4gICAgaGVpZ2h0OiBnZXRTdHlsZVZhbHVlKG5vZGUsICdoZWlnaHQnKSxcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgJ2p1c3RpZnktY29udGVudCc6IGdldFN0eWxlVmFsdWUobm9kZSwgJ3RleHRBbGlnbkhvcml6b250YWwnKSxcbiAgICAnYWxpZ24taXRlbXMnOiBnZXRTdHlsZVZhbHVlKG5vZGUsICd0ZXh0QWxpZ25WZXJ0aWNhbCcpLFxuICAgICd0ZXh0LWluZGVudCc6IGdldFN0eWxlVmFsdWUobm9kZSwgJ3BhcmFncmFwaEluZGVudCcpLFxuICAgICdsZXR0ZXItc3BhY2luZyc6IGdldFN0eWxlVmFsdWUobm9kZSwgJ2xldHRlclNwYWNpbmcnKSxcbiAgICAnbGluZS1oZWlnaHQnOiBnZXRTdHlsZVZhbHVlKG5vZGUsICdsaW5lSGVpZ2h0JyksXG4gICAgJ2ZvbnQtc2l6ZSc6IGdldFN0eWxlVmFsdWUobm9kZSwgJ2ZvbnRTaXplJyksXG4gICAgJ2ZvbnQtc3R5bGUnOiBnZXRTdHlsZVZhbHVlKG5vZGUsICdmb250TmFtZS5zdHlsZScsIHRydWUpLFxuICAgICdmb250LXdlaWdodCc6IGdldFN0eWxlVmFsdWUobm9kZSwgJ2ZvbnROYW1lLnN0eWxlJywgdHJ1ZSksXG4gICAgJ3RleHQtZGVjb3JhdGlvbic6IGdldFN0eWxlVmFsdWUobm9kZSwgJ3RleHREZWNvcmF0aW9uJywgdHJ1ZSksXG4gICAgJ3RleHQtdHJhbnNmb3JtJzogZ2V0U3R5bGVWYWx1ZShub2RlLCAndGV4dENhc2UnKSxcbiAgICAnZm9udC1mYW1pbHknOiBgJHtnZXRTdHlsZVZhbHVlKG5vZGUsICdmb250TmFtZS5mYW1pbHknLCB0cnVlKX0gJHtnZXRTdHlsZVZhbHVlKG5vZGUsICdmb250TmFtZS5zdHlsZScsIHRydWUpfWBcbiAgfTtcbn07IC8vIHRoaXMgZmlsZSBjYW4gYmUgZXh0ZW5kZWQgdG8gc3VwcG9ydCBhbGwgbm9kZSB0eXBlc1xuXG5cbmV4cG9ydHMuZ2V0VGV4dE5vZGVDU1MgPSBnZXRUZXh0Tm9kZUNTUzsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGdldE5vZGVJbmRleDtcblxuLyoqXG4gKiB0aGlzIGZ1bmN0aW9uIGFsbG93cyB5b3UgdG8gZ2V0IHRoZSByZXR1cm4gdGhlIGluZGV4IG9mIG5vZGUgaW4gaXRzIHBhcmVudFxuICovXG5mdW5jdGlvbiBnZXROb2RlSW5kZXgobm9kZSkge1xuICByZXR1cm4gbm9kZS5wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZihub2RlKTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGdldFBhZ2U7XG5cbnZhciBfaXNUeXBlTm9kZSA9IHJlcXVpcmUoXCIuL2lzVHlwZU5vZGVcIik7XG5cbi8qKlxuICogdGhpcyBmdW5jdGlvbiBhbGxvd3MgeW91IHRvIHBhc3MgaW4gYSBub2RlIGFuZCByZXR1cm4gaXRzIHBhZ2VOb2RlXG4gKi9cbmZ1bmN0aW9uIGdldFBhZ2Uobm9kZSkge1xuICBpZiAoISgwLCBfaXNUeXBlTm9kZS5pc1BhZ2VOb2RlKShub2RlKSkge1xuICAgIHJldHVybiBnZXRQYWdlKG5vZGUucGFyZW50KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5nZXRSZWxhdGl2ZVBvc2l0aW9uID0gZXhwb3J0cy5nZXRUb3BMZXZlbFBhcmVudCA9IHZvaWQgMDtcblxudmFyIF8gPSByZXF1aXJlKFwiLi4vXCIpO1xuXG4vKipcbiAqIFJldHVybiB0b3AgbGV2ZWwgcGFyZW50IGZvciBub2RlIGJlZm9yZSBQYWdlTm9kZS5cbiAqIEZvciBleGFtcGxlOlxuICogYGBganNcbiAqIC8vIGZvciBzdHJ1Y3R1cmUgYmVsb3dcbiAqIC8vIFBhZ2UgLyBGcmFtZSAvIEdyb3VwMSAvIEdyb3VwMiAvIFRleHRcbiAqXG4gKiBnZXRUb3BMZXZlbFBhcmVudChUZXh0KSAvLyBGcmFtZVxuICogYGBgXG4gKi9cbmNvbnN0IGdldFRvcExldmVsUGFyZW50ID0gbm9kZSA9PiB7XG4gIGlmIChub2RlICYmIG5vZGUucGFyZW50ICYmICEoMCwgXy5pc1BhZ2VOb2RlKShub2RlLnBhcmVudCkpIHtcbiAgICByZXR1cm4gZ2V0VG9wTGV2ZWxQYXJlbnQobm9kZS5wYXJlbnQpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBub2RlO1xuICB9XG59O1xuLyoqXG4gKiBDYWxjdWxhdGUgcmVsYXRpdmUgcG9zaXRpb24gb2Ygbm9kZSBiYXNlZCBvbiBwcm92aWRlZCBwYXJlbnQgb3IgdG9wIGxldmVsIHBhcmVudC5cbiAqIEZvciBleGFtcGxlOlxuICogYGBganNcbiAqIC8vIGZvciBzdHJ1Y3R1cmUgYmVsb3dcbiAqIC8vIFBhZ2UgLyBGcmFtZSAvIEdyb3VwMSAvIEdyb3VwMiAvIFRleHRcbiAqXG4gKiBnZXRSZWxhdGl2ZVBvc2l0aW9uKFRleHQsIEdyb3VwMSkgLy8gd2lsbCBjYWxjdWxhdGUgeyB4LCB5IH0gYmFzZWQgb24gR3JvdXAxXG4gKlxuICogZ2V0UmVsYXRpdmVQb3NpdGlvbihUZXh0KSAvLyB3aWxsIGNhbGN1bGF0ZSB7IHgsIHkgfSBiYXNlZCBvbiBGcmFtZVxuICogYGBgXG4gKiovXG5cblxuZXhwb3J0cy5nZXRUb3BMZXZlbFBhcmVudCA9IGdldFRvcExldmVsUGFyZW50O1xuXG5jb25zdCBnZXRSZWxhdGl2ZVBvc2l0aW9uID0gKG5vZGUsIHJlbGF0aXZlTm9kZSkgPT4ge1xuICByZWxhdGl2ZU5vZGUgPSByZWxhdGl2ZU5vZGUgfHwgZ2V0VG9wTGV2ZWxQYXJlbnQobm9kZSk7XG4gIHJldHVybiB7XG4gICAgeDogTWF0aC5hYnMoTWF0aC5yb3VuZChyZWxhdGl2ZU5vZGUuYWJzb2x1dGVUcmFuc2Zvcm1bMF1bMl0gLSBub2RlLmFic29sdXRlVHJhbnNmb3JtWzBdWzJdKSksXG4gICAgeTogTWF0aC5hYnMoTWF0aC5yb3VuZChyZWxhdGl2ZU5vZGUuYWJzb2x1dGVUcmFuc2Zvcm1bMV1bMl0gLSBub2RlLmFic29sdXRlVHJhbnNmb3JtWzFdWzJdKSlcbiAgfTtcbn07XG5cbmV4cG9ydHMuZ2V0UmVsYXRpdmVQb3NpdGlvbiA9IGdldFJlbGF0aXZlUG9zaXRpb247IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmhhc0NoaWxkcmVuID0gdm9pZCAwO1xuXG4vKipcbiAqIENoZWNrcyBub2RlIHRvIGhhdmUgY2hpbGRyZW4gbm9kZXNcbiAqIEZvciBleGFtcGxlOlxuICpcbiAqIGBgYHRzXG4gKiAvLyBCRUZPUkVcbiAqIGNvbnNvbGUubG9nKG5vZGUuY2hpbGRyZW4pIC8vIHRocm93IFRTIGVycm9yIFwiUHJvcGVydHkgJ2NoaWxkcmVuJyBkb2VzIG5vdCBleGlzdCBvbiB0eXBlIC4uLlwiXG4gKlxuICogLy8gQUZURVJcbiAqIGlmIChoYXNDaGlsZHJlbihub2RlKSkge1xuICogIGNvbnNvbGUubG9nKG5vZGUuY2hpbGRyZW4pIC8vIHZhbGlkIGNvZGVcbiAqIH1cbiAqIGBgYFxuICpcbiAqL1xuY29uc3QgaGFzQ2hpbGRyZW4gPSBub2RlID0+IEJvb2xlYW4obm9kZVsnY2hpbGRyZW4nXSk7XG5cbmV4cG9ydHMuaGFzQ2hpbGRyZW4gPSBoYXNDaGlsZHJlbjsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzUGFydE9mSW5zdGFuY2U7XG5cbi8qKlxuICogdGhpcyBmdW5jdGlvbiBhbGxvd3MgeW91IHRvIGNoZWNrIHdoZXRoZXIgYSBub2RlIGlzIHBhcnQgb2YgYW4gaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gaXNQYXJ0T2ZJbnN0YW5jZShub2RlKSB7XG4gIGNvbnN0IHBhcmVudCA9IG5vZGUucGFyZW50O1xuXG4gIGlmIChwYXJlbnQudHlwZSA9PT0gJ0lOU1RBTkNFJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2UgaWYgKHBhcmVudC50eXBlID09PSAnUEFHRScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGlzUGFydE9mSW5zdGFuY2UocGFyZW50KTtcbiAgfVxufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNQYXJ0T2ZOb2RlO1xuXG4vKipcbiAqIHRoaXMgZnVuY3Rpb24gYWxsb3dzIHlvdSB0byBjaGVjayB3aGV0aGVyIGEgbm9kZSBpcyBwYXJ0IG9mIGFuIHJvb3ROb2RlXG4gKi9cbmZ1bmN0aW9uIGlzUGFydE9mTm9kZShwYXJ0LCByb290Tm9kZSkge1xuICBjb25zdCBwYXJlbnQgPSBwYXJ0LnBhcmVudDtcblxuICBpZiAocGFyZW50ID09PSByb290Tm9kZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2UgaWYgKHBhcmVudC50eXBlID09PSAnUEFHRScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGlzUGFydE9mTm9kZShwYXJlbnQsIHJvb3ROb2RlKTtcbiAgfVxufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5pc09uZU9mTm9kZVR5cGUgPSBleHBvcnRzLmlzQ29tcG9uZW50Tm9kZSA9IGV4cG9ydHMuaXNJbnN0YW5jZU5vZGUgPSBleHBvcnRzLmlzVGV4dE5vZGUgPSBleHBvcnRzLmlzRnJhbWVOb2RlID0gZXhwb3J0cy5pc0dyb3VwTm9kZSA9IGV4cG9ydHMuaXNQYWdlTm9kZSA9IHZvaWQgMDtcblxuLyoqXG4gKiBDaGVja3Mgbm9kZSB0byBiZSBQYWdlTm9kZVxuICovXG5jb25zdCBpc1BhZ2VOb2RlID0gbm9kZSA9PiB7XG4gIHJldHVybiBub2RlLnR5cGUgPT09ICdQQUdFJztcbn07XG4vKipcbiAqIENoZWNrcyBub2RlIHRvIGJlIEdyb3VwTm9kZVxuICovXG5cblxuZXhwb3J0cy5pc1BhZ2VOb2RlID0gaXNQYWdlTm9kZTtcblxuY29uc3QgaXNHcm91cE5vZGUgPSBub2RlID0+IHtcbiAgcmV0dXJuIG5vZGUudHlwZSA9PT0gJ0dST1VQJztcbn07XG4vKipcbiAqIENoZWNrcyBub2RlIHRvIGJlIEZyYW1lTm9kZVxuICovXG5cblxuZXhwb3J0cy5pc0dyb3VwTm9kZSA9IGlzR3JvdXBOb2RlO1xuXG5jb25zdCBpc0ZyYW1lTm9kZSA9IG5vZGUgPT4ge1xuICByZXR1cm4gbm9kZS50eXBlID09PSAnRlJBTUUnO1xufTtcbi8qKlxuICogQ2hlY2tzIG5vZGUgdG8gYmUgVGV4dE5vZGVcbiAqL1xuXG5cbmV4cG9ydHMuaXNGcmFtZU5vZGUgPSBpc0ZyYW1lTm9kZTtcblxuY29uc3QgaXNUZXh0Tm9kZSA9IG5vZGUgPT4ge1xuICByZXR1cm4gbm9kZS50eXBlID09PSAnVEVYVCc7XG59O1xuLyoqXG4gKiBDaGVja3Mgbm9kZSB0byBiZSBJbnN0YW5jZU5vZGVcbiAqL1xuXG5cbmV4cG9ydHMuaXNUZXh0Tm9kZSA9IGlzVGV4dE5vZGU7XG5cbmNvbnN0IGlzSW5zdGFuY2VOb2RlID0gbm9kZSA9PiB7XG4gIHJldHVybiBub2RlLnR5cGUgPT09ICdJTlNUQU5DRSc7XG59O1xuLyoqXG4gKiBDaGVja3Mgbm9kZSB0byBiZSBDb21wb25lbnROb2RlXG4gKi9cblxuXG5leHBvcnRzLmlzSW5zdGFuY2VOb2RlID0gaXNJbnN0YW5jZU5vZGU7XG5cbmNvbnN0IGlzQ29tcG9uZW50Tm9kZSA9IG5vZGUgPT4ge1xuICByZXR1cm4gbm9kZS50eXBlID09PSAnQ09NUE9ORU5UJztcbn07XG4vKipcbiAqIENoZWNrcyBub2RlIHRvIGJlIG9uZSBvZiBwcm92aWRlZCB0eXBlc1xuICovXG5cblxuZXhwb3J0cy5pc0NvbXBvbmVudE5vZGUgPSBpc0NvbXBvbmVudE5vZGU7XG5cbmNvbnN0IGlzT25lT2ZOb2RlVHlwZSA9IChub2RlLCB0eXBlTGlzdCkgPT4ge1xuICByZXR1cm4gdHlwZUxpc3QuaW5jbHVkZXMobm9kZS50eXBlKTtcbn07XG5cbmV4cG9ydHMuaXNPbmVPZk5vZGVUeXBlID0gaXNPbmVPZk5vZGVUeXBlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNWaXNpYmxlTm9kZTtcblxuLyoqXG4gKiBUaGlzIGhlbHBlciByZWN1cnNpdmVseSBjaGVja3MgYWxsIHBhcmVudHMgZm9yIHZpc2liaWxpdHksIHRvIGd1YXJhbnRlZSB0aGF0J3Mgbm9kZSBpcyB2aXNpYmxlXG4gKi9cbmZ1bmN0aW9uIGlzVmlzaWJsZU5vZGUobm9kZSkge1xuICBpZiAobm9kZSAmJiBub2RlLnBhcmVudCkge1xuICAgIGlmIChub2RlLnZpc2libGUgJiYgbm9kZS5wYXJlbnQudHlwZSAhPT0gJ1BBR0UnKSB7XG4gICAgICByZXR1cm4gaXNWaXNpYmxlTm9kZShub2RlLnBhcmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBub2RlLnZpc2libGU7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gbG9hZEZvbnRzO1xuXG4vKipcbiAqIHRoaXMgZnVuY3Rpb24gYXN5bmNocm9ub3VzbHkgbG9hZHMgdGhlIHBhc3NlZCBmb250c1xuICovXG5hc3luYyBmdW5jdGlvbiBsb2FkRm9udHMoZm9udHMpIHtcbiAgY29uc3QgcHJvbWlzZXMgPSBmb250cy5tYXAoZm9udCA9PiBmaWdtYS5sb2FkRm9udEFzeW5jKGZvbnQpKTtcbiAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICByZXR1cm4gZm9udHM7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBsb2FkVW5pcXVlRm9udHM7XG5cbnZhciBfZ2V0QWxsRm9udHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2dldEFsbEZvbnRzXCIpKTtcblxudmFyIF9sb2FkRm9udHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xvYWRGb250c1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogdGhpcyBmdW5jdGlvbiBhbGxvd3MgeW91IHRvIGxvYWQgb25seSB1bmlxdWUgZm9udHMgYXN5bmNocm9ub3VzbHlcbiAqL1xuYXN5bmMgZnVuY3Rpb24gbG9hZFVuaXF1ZUZvbnRzKHRleHROb2Rlcykge1xuICBjb25zdCBmb250cyA9ICgwLCBfZ2V0QWxsRm9udHMuZGVmYXVsdCkodGV4dE5vZGVzKTtcbiAgcmV0dXJuICgwLCBfbG9hZEZvbnRzLmRlZmF1bHQpKGZvbnRzKTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMubm9kZVRvT2JqZWN0ID0gdm9pZCAwO1xuXG4vKipcbiAqIFRyYW5zZm9ybSBub2RlIHRvIG9iamVjdCB3aXRoIGtleXMsIHRoYXQgYXJlIGhpZGRlbiBieSBkZWZhdWx0LlxuICogRm9yIGV4YW1wbGU6XG4gKiBgYGB0c1xuICogY29uc3Qgbm9kZSA9IGZpZ21hLmN1cnJlbnRQYWdlLmZpbmRPbmUoKGVsKSA9PiBlbC50eXBlID09PSBcIlRFWFRcIik7XG4gKiBjb25zb2xlLmxvZyhPYmplY3Qua2V5cyhub2RlKS5sZW5ndGgpIC8vIDFcbiAqIGNvbnNvbGUubG9nKE9iamVjdC5rZXlzKG5vZGVUb09iamVjdChub2RlKSkubGVuZ3RoKSAvLyA0MlxuICogY29uc29sZS5sb2coT2JqZWN0LmtleXMobm9kZVRvT2JqZWN0KG5vZGUsIHRydWUpKS5sZW5ndGgpIC8vIDM5XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gbm9kZVxuICogQHBhcmFtIHdpdGhvdXRSZWxhdGlvbnNcbiAqL1xuY29uc3Qgbm9kZVRvT2JqZWN0ID0gKG5vZGUsIHdpdGhvdXRSZWxhdGlvbnMpID0+IHtcbiAgY29uc3QgcHJvcHMgPSBPYmplY3QuZW50cmllcyhPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhub2RlLl9fcHJvdG9fXykpO1xuICBjb25zdCBibGFja2xpc3QgPSBbJ3BhcmVudCcsICdjaGlsZHJlbicsICdyZW1vdmVkJywgJ21hc3RlckNvbXBvbmVudCddO1xuICBjb25zdCBvYmogPSB7XG4gICAgaWQ6IG5vZGUuaWQsXG4gICAgdHlwZTogbm9kZS50eXBlXG4gIH07XG5cbiAgZm9yIChjb25zdCBbbmFtZSwgcHJvcF0gb2YgcHJvcHMpIHtcbiAgICBpZiAocHJvcC5nZXQgJiYgIWJsYWNrbGlzdC5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmpbbmFtZV0gPT09ICdzeW1ib2wnKSB7XG4gICAgICAgICAgb2JqW25hbWVdID0gJ01peGVkJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvYmpbbmFtZV0gPSBwcm9wLmdldC5jYWxsKG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgb2JqW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChub2RlLnBhcmVudCAmJiAhd2l0aG91dFJlbGF0aW9ucykge1xuICAgIG9iai5wYXJlbnQgPSB7XG4gICAgICBpZDogbm9kZS5wYXJlbnQuaWQsXG4gICAgICB0eXBlOiBub2RlLnBhcmVudC50eXBlXG4gICAgfTtcbiAgfVxuXG4gIGlmIChub2RlLmNoaWxkcmVuICYmICF3aXRob3V0UmVsYXRpb25zKSB7XG4gICAgb2JqLmNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbi5tYXAoY2hpbGQgPT4gbm9kZVRvT2JqZWN0KGNoaWxkLCB3aXRob3V0UmVsYXRpb25zKSk7XG4gIH1cblxuICBpZiAobm9kZS5tYXN0ZXJDb21wb25lbnQgJiYgIXdpdGhvdXRSZWxhdGlvbnMpIHtcbiAgICBvYmoubWFzdGVyQ29tcG9uZW50ID0gbm9kZVRvT2JqZWN0KG5vZGUubWFzdGVyQ29tcG9uZW50LCB3aXRob3V0UmVsYXRpb25zKTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG5leHBvcnRzLm5vZGVUb09iamVjdCA9IG5vZGVUb09iamVjdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMucGFyc2VUZXh0U3R5bGUgPSBwYXJzZVRleHRTdHlsZTtcbmV4cG9ydHMuc3BsaXRUZXh0U3R5bGVJbnRvTGluZXMgPSBzcGxpdFRleHRTdHlsZUludG9MaW5lcztcbmV4cG9ydHMuam9pblRleHRMaW5lc1N0eWxlcyA9IGpvaW5UZXh0TGluZXNTdHlsZXM7XG5leHBvcnRzLmFwcGx5VGV4dFN0eWxlVG9UZXh0Tm9kZSA9IGFwcGx5VGV4dFN0eWxlVG9UZXh0Tm9kZTtcbmV4cG9ydHMuY2hhbmdlQ2hhcmFjdGVyc1RleHRTdHlsZSA9IGNoYW5nZUNoYXJhY3RlcnNUZXh0U3R5bGU7XG5leHBvcnRzLmNoYW5nZVRleHRTdHlsZSA9IGNoYW5nZVRleHRTdHlsZTtcblxudmFyIF91bmlxV2l0aDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJsb2Rhc2gvdW5pcVdpdGhcIikpO1xuXG52YXIgX2Nsb25lRGVlcDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJsb2Rhc2gvY2xvbmVEZWVwXCIpKTtcblxudmFyIF9pc0VxdWFsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcImxvZGFzaC9pc0VxdWFsXCIpKTtcblxudmFyIF9nZXRBbGxGb250cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vZ2V0QWxsRm9udHNcIikpO1xuXG52YXIgX2xvYWRGb250cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbG9hZEZvbnRzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuY29uc3Qgc3R5bGVGb250cyA9IFsnZm9udFNpemUnLCAnZm9udE5hbWUnLCAndGV4dENhc2UnLCAndGV4dERlY29yYXRpb24nLCAnbGV0dGVyU3BhY2luZycsICdsaW5lSGVpZ2h0JywgJ2ZpbGxzJywgJ3RleHRTdHlsZUlkJywgJ2ZpbGxTdHlsZUlkJ107XG4vKlxuXHRUaGUgZnVuY3Rpb24gcmV0dXJucyB0aGUgdGV4dCBub2RlIHN0eWxlcywgc3BsaXR0aW5nIHRoZW0gaW50byBkaWZmZXJlbnQgYXJyYXlzLCBzdWNoIGFzOlxuXHRbe1xuXHRcdGNoYXJhY3RlcnM6IFwiLi4uXCIsXG5cdFx0Li4uIChzdHlsZXMpXG5cdH0sIC4uLl1cblxuXHQtLS1cblxuXHRSZXR1cm5zIHN0eWxlcyBmb3IgdGhlIGVudGlyZSB0ZXh0OlxuXHRwYXJzZVRleHRTdHlsZSh0ZXh0Tm9kZSlcblx0XG5cdFJldHVybnMgdGV4dCBzdHlsZXMgZnJvbSB0aGUgMTAwdGggdG8gdGhlIGxhc3QgY2hhcmFjdGVyOlxuXHRwYXJzZVRleHRTdHlsZSh0ZXh0Tm9kZSwgMTAwKVxuXG5cdFJldHVybnMgc3R5bGVzIGZvciB0aGUgZW50aXJlIHRleHQsIGJ1dCBvbmx5IHdpdGggZm9udE5hbWUgYW5kIHRleHREZWNvcmF0aW9uOlxuXHRwYXJzZVRleHRTdHlsZSh0ZXh0Tm9kZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFtcImZvbnROYW1lXCIsIFwidGV4dERlY29yYXRpb25cIl0pXG4qL1xuXG5mdW5jdGlvbiBwYXJzZVRleHRTdHlsZShub2RlLCBzdGFydCA9IDAsIGVuZCwgc3R5bGVOYW1lKSB7XG4gIGlmICghZW5kKSBlbmQgPSBub2RlLmNoYXJhY3RlcnMubGVuZ3RoO1xuICBpZiAoIXN0eWxlTmFtZSkgc3R5bGVOYW1lID0gc3R5bGVGb250cztcblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgY29uc29sZS5lcnJvcignU3RhcnQgbXVzdCBiZSBncmVhdGVyIHRoYW4gZW5kJyk7XG4gICAgcmV0dXJuIFtdO1xuICB9IC8vIHN0cmluZyBzdWJzdHJpbmcsIGRlZmluZWQgc3R5bGVzXG5cblxuICBjb25zdCBzdHlsZU1hcCA9IFtdOyAvLyBhIGNvbXBvc2luZyBzdHJpbmcgb2YgYSBzcGVjaWZpYyBzdHlsZVxuXG4gIGxldCB0ZXh0U3R5bGU7XG4gIGNvbnN0IG5hbWVzID0gc3R5bGVOYW1lLm1hcChuYW1lID0+IHtcbiAgICByZXR1cm4gbmFtZS5yZXBsYWNlKC9eKC4pL2csICQxID0+ICQxLnRvVXBwZXJDYXNlKCkpO1xuICB9KTsgLy8gc3BsaXR0aW5nIHRleHQgaW50byBzdWJzdHJpbmdzIGJ5IHN0eWxlXG5cbiAgZm9yIChsZXQgc3RhcnRJbmRleCA9IHN0YXJ0OyBzdGFydEluZGV4IDwgZW5kOyBzdGFydEluZGV4KyspIHtcbiAgICBjb25zdCBlbmRJbmRleCA9IHN0YXJ0SW5kZXggKyAxO1xuICAgIGNvbnN0IGxldHRlciA9IHtcbiAgICAgIGNoYXJhY3RlcnM6IG5vZGUuY2hhcmFjdGVyc1tzdGFydEluZGV4XVxuICAgIH07IC8vIGNvbGxlY3Rpb24gb2Ygc3R5bGVzXG5cbiAgICBuYW1lcy5mb3JFYWNoKChuLCBpKSA9PiB7XG4gICAgICBsZXR0ZXJbc3R5bGVOYW1lW2ldXSA9IG5vZGVbJ2dldFJhbmdlJyArIG5dKHN0YXJ0SW5kZXgsIGVuZEluZGV4KTtcbiAgICB9KTtcblxuICAgIGlmICh0ZXh0U3R5bGUpIHtcbiAgICAgIGlmIChpc0VxdWFsTGV0dGVyU3R5bGUobGV0dGVyLCB0ZXh0U3R5bGUpKSB7XG4gICAgICAgIC8vIHRoZSBjaGFyYWN0ZXIgaGFzIHRoZSBzYW1lIHByb3BlcnRpZXMgYXMgdGhlIGdlbmVyYXRlZCBzdWJzdHJpbmdcbiAgICAgICAgLy8gYWRkIGl0IHRvIGl0XG4gICAgICAgIHRleHRTdHlsZS5jaGFyYWN0ZXJzICs9IGxldHRlci5jaGFyYWN0ZXJzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gc3R5bGUgcHJvcGVydGllcyBhcmUgZGlmZmVyZW50XG4gICAgICAgIHN0eWxlTWFwLnB1c2godGV4dFN0eWxlKTsgLy8gd2Ugc3RhcnQgdG8gZm9ybSBhIG5ldyBzdWJzdHJpbmdcblxuICAgICAgICB0ZXh0U3R5bGUgPSBsZXR0ZXI7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHdlIHN0YXJ0IGZvcm1pbmcgdGhlIGZpcnN0IHN1YnN0cmluZ1xuICAgICAgdGV4dFN0eWxlID0gbGV0dGVyO1xuICAgIH1cbiAgfVxuXG4gIHN0eWxlTWFwLnB1c2godGV4dFN0eWxlKTtcbiAgcmV0dXJuIHN0eWxlTWFwO1xufVxuLypcblx0QWxsb3dzIHRvIHNwbGl0IHRoZSBzdHlsZXMgb2J0YWluZWQgd2l0aCBwYXJzZVRleHRTdHlsZSBpbnRvIGxpbmVzIGJhc2VkIG9uIG5ld2xpbmVzLlxuXG5cdElmIHRoZSByZW1vdmVOZXdsaW5lQ2hhcmFjdGVycyBwYXJhbWV0ZXIgPT0gdHJ1ZSwgdGhlIG5ld2xpbmUgY2hhcmFjdGVycyB3aWxsIGJlIHJlbW92ZWQuXG5cdFJlbW92ZUVtcHR5bGluZXMgPT0gdHJ1ZSB3aWxsIHJlbW92ZSBlbXB0eSBsaW5lcy5cbiovXG5cblxuZnVuY3Rpb24gc3BsaXRUZXh0U3R5bGVJbnRvTGluZXModGV4dFN0eWxlLCByZW1vdmVOZXdsaW5lQ2hhcmFjdGVycyA9IGZhbHNlLCByZW1vdmVFbXB0eWxpbmVzID0gZmFsc2UpIHtcbiAgbGV0IGxpbmUgPSBbXTtcbiAgbGV0IGxpbmVzID0gW107XG4gIGNvbnN0IHJlID0gbmV3IFJlZ0V4cCgnKC4rfCg/PD1cXG4pKC4/KSg/PSQpKShcXG58XFx1MjAyOCk/fChcXG58XFx1MjAyOCknLCAnZycpO1xuICBjb25zdCByZTIgPSBuZXcgUmVnRXhwKCdcXG58XFx1MjAyOCcpO1xuICB0ZXh0U3R5bGUuZm9yRWFjaCgoc3R5bGUsIGluZGV4KSA9PiB7XG4gICAgaWYgKHJlMi50ZXN0KHN0eWxlLmNoYXJhY3RlcnMpKSB7XG4gICAgICBjb25zdCBscyA9IHN0eWxlLmNoYXJhY3RlcnMubWF0Y2gocmUpO1xuXG4gICAgICBpZiAobHMgPT09IG51bGwpIHtcbiAgICAgICAgLy8gdGV4dCBpcyBtaXNzaW5nXG4gICAgICAgIGxpbmUucHVzaChzdHlsZSk7XG4gICAgICB9IGVsc2UgaWYgKGxzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAvLyB0aGUgc3R5bGUgdGV4dCBjb25zaXN0cyBvZiAxIGxpbmVcbiAgICAgICAgbGluZS5wdXNoKHN0eWxlKTtcbiAgICAgICAgbGluZXMucHVzaChsaW5lKTtcbiAgICAgICAgbGluZSA9IFtdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbXVsdGlwbGUtbGluZSB0ZXh0XG4gICAgICAgIHN0eWxlID0gKDAsIF9jbG9uZURlZXAyLmRlZmF1bHQpKHN0eWxlKTtcbiAgICAgICAgc3R5bGUuY2hhcmFjdGVycyA9IGxzLnNoaWZ0KCk7XG4gICAgICAgIGxpbmUucHVzaChzdHlsZSk7XG4gICAgICAgIGxpbmVzLnB1c2gobGluZSk7XG4gICAgICAgIGxpbmUgPSBbXTtcbiAgICAgICAgY29uc3QgbGFzdCA9IGxzLnBvcCgpOyAvLyBkZWFsaW5nIHdpdGggaW50ZXJuYWwgdGV4dCBzdHJpbmdzXG5cbiAgICAgICAgbGluZXMucHVzaCguLi5scy5tYXAoZSA9PiB7XG4gICAgICAgICAgc3R5bGUgPSAoMCwgX2Nsb25lRGVlcDIuZGVmYXVsdCkoc3R5bGUpO1xuICAgICAgICAgIHN0eWxlLmNoYXJhY3RlcnMgPSBlO1xuICAgICAgICAgIHJldHVybiBbc3R5bGVdO1xuICAgICAgICB9KSk7XG4gICAgICAgIHN0eWxlID0gKDAsIF9jbG9uZURlZXAyLmRlZmF1bHQpKHN0eWxlKTtcbiAgICAgICAgc3R5bGUuY2hhcmFjdGVycyA9IGxhc3Q7XG5cbiAgICAgICAgaWYgKGxhc3QgPT09ICcnKSB7XG4gICAgICAgICAgaWYgKCF0ZXh0U3R5bGVbaW5kZXggKyAxXSkge1xuICAgICAgICAgICAgLy8gbGFzdCBsaW5lIGZpbmFsXG4gICAgICAgICAgICBsaW5lcy5wdXNoKFtzdHlsZV0pO1xuICAgICAgICAgIH0gLy8gZWxzZSBmYWxzZSBlbmQgb2YgdGV4dFxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZG9lcyBub3QgZW5kXG4gICAgICAgICAgbGluZS5wdXNoKHN0eWxlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsaW5lLnB1c2goc3R5bGUpO1xuICAgIH1cbiAgfSk7XG4gIGlmIChsaW5lLmxlbmd0aCkgbGluZXMucHVzaChsaW5lKTsgLy8gZGVsZXRpbmcgbmV3bGluZSBjaGFyYWN0ZXJzXG5cbiAgaWYgKHJlbW92ZU5ld2xpbmVDaGFyYWN0ZXJzKSB7XG4gICAgbGluZXMuZm9yRWFjaChsID0+IHtcbiAgICAgIGNvbnN0IHN0eWxlID0gbFtsLmxlbmd0aCAtIDFdO1xuICAgICAgc3R5bGUuY2hhcmFjdGVycyA9IHN0eWxlLmNoYXJhY3RlcnMucmVwbGFjZShyZTIsICcnKTtcbiAgICB9KTtcbiAgfSAvLyBkZWxldGluZyBlbXB0eSBsaW5lc1xuXG5cbiAgaWYgKHJlbW92ZUVtcHR5bGluZXMpIHtcbiAgICBsaW5lcyA9IGxpbmVzLmZpbHRlcihsID0+IGwuZmlsdGVyKGwgPT4gbC5jaGFyYWN0ZXJzLnJlcGxhY2UocmUyLCAnJykgIT09ICcnKS5sZW5ndGggIT09IDApO1xuICB9XG5cbiAgcmV0dXJuIGxpbmVzO1xufVxuLypcblx0SW52ZXJzZSBmdW5jdGlvbiBvZiBzcGxpdFRleHRTdHlsZUludG9MaW5lcy5cblx0VGhlIGFkZE5ld2xpbmVDaGFyYWN0ZXJzIHBhcmFtZXRlciBpcyByZXNwb25zaWJsZSBmb3Igd2hldGhlciB5b3UgbmVlZCB0byBhZGQgYSBuZXdsaW5lIGNoYXJhY3RlciBhdCB0aGUgZW5kIG9mIGVhY2ggbGluZVxuKi9cblxuXG5mdW5jdGlvbiBqb2luVGV4dExpbmVzU3R5bGVzKHRleHRTdHlsZSwgYWRkTmV3bGluZUNoYXJhY3RlcnMgPSBmYWxzZSkge1xuICBjb25zdCB0U3R5bGUgPSAoMCwgX2Nsb25lRGVlcDIuZGVmYXVsdCkodGV4dFN0eWxlKTtcbiAgbGV0IG5ld2xpbmUgPSAnJztcblxuICBzd2l0Y2ggKHR5cGVvZiBhZGROZXdsaW5lQ2hhcmFjdGVycykge1xuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgaWYgKGFkZE5ld2xpbmVDaGFyYWN0ZXJzKSBuZXdsaW5lID0gJ1xcbic7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBuZXdsaW5lID0gYWRkTmV3bGluZUNoYXJhY3RlcnM7XG4gICAgICBicmVhaztcbiAgfSAvLyBhZGRpbmcgbmV3IGxpbmUgY2hhcmFjdGVyc1xuXG5cbiAgaWYgKGFkZE5ld2xpbmVDaGFyYWN0ZXJzICYmIG5ld2xpbmUpIHtcbiAgICB0U3R5bGUuZm9yRWFjaCgoc3R5bGUsIGkpID0+IHtcbiAgICAgIGlmIChpICE9PSB0U3R5bGUubGVuZ3RoIC0gMSkgc3R5bGVbc3R5bGUubGVuZ3RoIC0gMV0uY2hhcmFjdGVycyArPSBuZXdsaW5lO1xuICAgIH0pO1xuICB9IC8vIGpvaW5cblxuXG4gIGNvbnN0IGxpbmUgPSB0U3R5bGUuc2hpZnQoKTtcbiAgdFN0eWxlLmZvckVhY2goc3R5bGUgPT4ge1xuICAgIGNvbnN0IGZpdHN0ID0gc3R5bGUuc2hpZnQoKTtcblxuICAgIGlmIChpc0VxdWFsTGV0dGVyU3R5bGUoZml0c3QsIGxpbmVbbGluZS5sZW5ndGggLSAxXSkpIHtcbiAgICAgIC8vIHRoZSBzdHlsZSBvZiB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsaW5lIGRpZmZlcnMgZnJvbSB0aGUgZW5kIG9mIHRoZSBzdHlsZSBvZiB0aGUgdGV4dCBiZWluZyBjb21waWxlZFxuICAgICAgbGluZVtsaW5lLmxlbmd0aCAtIDFdLmNoYXJhY3RlcnMgKz0gZml0c3QuY2hhcmFjdGVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbGluZS5wdXNoKGZpdHN0KTtcbiAgICB9XG5cbiAgICBpZiAoc3R5bGUubGVuZ3RoKSBsaW5lLnB1c2goLi4uc3R5bGUpO1xuICB9KTtcbiAgcmV0dXJuIGxpbmU7XG59XG4vKlxuXHRBcHBseSB0aGUgdGV4dCBzdHlsZXMgb2J0YWluZWQgZnJvbSBwYXJzZVRleHRTdHlsZSB0byB0aGUgdGV4dCBub2RlLlxuXHRUaGUgc2Vjb25kIHBhcmFtZXRlciBjYW4gYmUgcGFzc2VkIGEgdGV4dCBub2RlLCB0aGUgdGV4dCBvZiB3aGljaCB3aWxsIGJlIGNoYW5nZWQuXG4qL1xuXG5cbmFzeW5jIGZ1bmN0aW9uIGFwcGx5VGV4dFN0eWxlVG9UZXh0Tm9kZSh0ZXh0U3R5bGUsIHRleHROb2RlLCBpc0xvYWRGb250cyA9IHRydWUpIHtcbiAgaWYgKGlzTG9hZEZvbnRzKSB7XG4gICAgbGV0IGZvbnRzID0gW3tcbiAgICAgIGZhbWlseTogJ1JvYm90bycsXG4gICAgICBzdHlsZTogJ1JlZ3VsYXInXG4gICAgfV07XG5cbiAgICBpZiAodGV4dFN0eWxlWzBdLmZvbnROYW1lKSB7XG4gICAgICBmb250cy5wdXNoKC4uLnRleHRTdHlsZS5tYXAoZSA9PiBlLmZvbnROYW1lKSk7XG4gICAgfVxuXG4gICAgaWYgKHRleHROb2RlKSB7XG4gICAgICBmb250cy5wdXNoKC4uLigwLCBfZ2V0QWxsRm9udHMuZGVmYXVsdCkoW3RleHROb2RlXSkpO1xuICAgIH1cblxuICAgIGZvbnRzID0gKDAsIF91bmlxV2l0aDIuZGVmYXVsdCkoZm9udHMsIF9pc0VxdWFsMi5kZWZhdWx0KTtcbiAgICBhd2FpdCAoMCwgX2xvYWRGb250cy5kZWZhdWx0KShmb250cyk7XG4gIH1cblxuICBpZiAoIXRleHROb2RlKSB0ZXh0Tm9kZSA9IGZpZ21hLmNyZWF0ZVRleHQoKTtcbiAgdGV4dE5vZGUuY2hhcmFjdGVycyA9IHRleHRTdHlsZS5yZWR1Y2UoKHN0ciwgc3R5bGUpID0+IHtcbiAgICByZXR1cm4gc3RyICsgc3R5bGUuY2hhcmFjdGVycztcbiAgfSwgJycpO1xuICBsZXQgbiA9IDA7XG4gIHRleHRTdHlsZS5mb3JFYWNoKHN0eWxlID0+IHtcbiAgICBjb25zdCBMID0gc3R5bGUuY2hhcmFjdGVycy5sZW5ndGg7XG5cbiAgICBpZiAoTCkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gc3R5bGUpIHtcbiAgICAgICAgaWYgKGtleSAhPT0gJ2NoYXJhY3RlcnMnKSB7XG4gICAgICAgICAgY29uc3QgbmFtZSA9IGtleS5yZXBsYWNlKC9eKC4pL2csICQxID0+ICQxLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICAgIHRleHROb2RlWydzZXRSYW5nZScgKyBuYW1lXShuLCBuICsgTCwgc3R5bGVba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbiArPSBMO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiB0ZXh0Tm9kZTtcbn1cbi8qXG5cdFJlcGxhY2luZyB0ZXh0IGluIHRleHRTdHlsZVxuXHRJZiB0aGUgcGFzc2VkIHRleHQgaXMgc2hvcnRlciB0aGFuIGluIHN0eWxlcywgdGhlIGV4dHJhIHN0eWxlcyB3aWxsIGJlIHJlbW92ZWQuXG5cdElmIHRoZSBwYXNzZWQgdGV4dCBpcyBsb25nZXIgdGhhbiB0aGUgc3R5bGVzLCB0aGUgb3ZlcmZsb3cgdGV4dCB3aWxsIGdldCB0aGUgc3R5bGUgb2YgdGhlIGxhc3QgY2hhcmFjdGVyLlxuKi9cblxuXG5mdW5jdGlvbiBjaGFuZ2VDaGFyYWN0ZXJzVGV4dFN0eWxlKHRleHRTdHlsZSwgY2hhcmFjdGVycykge1xuICB0ZXh0U3R5bGUgPSAoMCwgX2Nsb25lRGVlcDIuZGVmYXVsdCkodGV4dFN0eWxlKTtcbiAgbGV0IG4gPSAwO1xuICBjb25zdCBsZW5ndGggPSB0ZXh0U3R5bGUubGVuZ3RoIC0gMTtcbiAgY29uc3QgY2hhcmFjdGVyc0xlbmd0aCA9IGNoYXJhY3RlcnMubGVuZ3RoO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDw9IGxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcyA9IHRleHRTdHlsZVtpXTtcbiAgICBsZXQgbCA9IHMuY2hhcmFjdGVycy5sZW5ndGg7IC8vIGlmIHBhc3NlZCB0ZXh0IGlzIGxvbmdlciB0aGFuIHRleHQgaW4gc3R5bGVzXG5cbiAgICBpZiAoaSA9PSBsZW5ndGgpIGwgPSBjaGFyYWN0ZXJzTGVuZ3RoO1xuICAgIHMuY2hhcmFjdGVycyA9IGNoYXJhY3RlcnMuc2xpY2UobiwgbiArIGwpO1xuICAgIG4gKz0gbDtcblxuICAgIGlmIChuID4gY2hhcmFjdGVyc0xlbmd0aCkge1xuICAgICAgLy8gbmV3IHRleHQgaXMgc2hvcnRlciB0aGFuIHRleHQgaW4gc3R5bGVzXG4gICAgICB0ZXh0U3R5bGUgPSB0ZXh0U3R5bGUuc3BsaWNlKDAsIGkgKyAxKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0ZXh0U3R5bGU7XG59XG4vKlxuXHRGdW5jdGlvbiBmb3IgY2hhbmdpbmcgcHJvcGVydGllcyBvZiBUZXh0U3R5bGUuIFxuXHRUaGUgYmVmb3JlVmFsdWUgcGFyYW1ldGVyIGFsbG93cyB5b3UgdG8gc3BlY2lmeSB0aGUgdmFsdWUgaW4gd2hpY2ggdGhlIHByb3BlcnR5IHRvIGJlIGNoYW5nZWQgc2hvdWxkIGJlLlxuKi9cblxuXG5mdW5jdGlvbiBjaGFuZ2VUZXh0U3R5bGUodGV4dFN0eWxlLCBzdHlsZU5hbWUsIG5ld1ZhbHVlLCBiZWZvcmVWYWx1ZSkge1xuICB0ZXh0U3R5bGUgPSAoMCwgX2Nsb25lRGVlcDIuZGVmYXVsdCkodGV4dFN0eWxlKTtcbiAgdGV4dFN0eWxlLmZvckVhY2goc3R5bGUgPT4ge1xuICAgIGlmIChiZWZvcmVWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8IGJlZm9yZVZhbHVlICE9PSB1bmRlZmluZWQgJiYgKDAsIF9pc0VxdWFsMi5kZWZhdWx0KShzdHlsZVtzdHlsZU5hbWVdLCBiZWZvcmVWYWx1ZSkpIHtcbiAgICAgIDtcbiAgICAgIHN0eWxlW3N0eWxlTmFtZV0gPSBuZXdWYWx1ZTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gdGV4dFN0eWxlO1xufVxuLypjb21wYXJpbmcgY2hhcmFjdGVyIHN0eWxlcyB0byB0aGUgc3R5bGVzIG9mIHRoZSBjb21wb3Npbmcgc3Vic3RyaW5nKi9cblxuXG5mdW5jdGlvbiBpc0VxdWFsTGV0dGVyU3R5bGUobGV0dGVyLCB0ZXh0U3R5bGUpIHtcbiAgbGV0IGlzID0gdHJ1ZTsgLy8gaXRlcmF0aW5nIG92ZXIgZm9udCBwcm9wZXJ0aWVzXG5cbiAgZm9yIChjb25zdCBrZXkgaW4gbGV0dGVyKSB7XG4gICAgaWYgKGtleSAhPT0gJ2NoYXJhY3RlcnMnKSB7XG4gICAgICBpZiAoISgwLCBfaXNFcXVhbDIuZGVmYXVsdCkobGV0dGVyW2tleV0sIHRleHRTdHlsZVtrZXldKSkge1xuICAgICAgICAvLyBwcm9wZXJ0eSB2YXJpZXNcbiAgICAgICAgLy8gc3RvcCBzZWFyY2hpbmdcbiAgICAgICAgaXMgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGlzO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5zZXRDaGFyYWN0ZXJzID0gdm9pZCAwO1xuXG52YXIgX3VuaXFCeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJsb2Rhc2gvdW5pcUJ5XCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuY29uc3Qgc2V0Q2hhcmFjdGVycyA9IGFzeW5jIChub2RlLCBjaGFyYWN0ZXJzLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IGZhbGxiYWNrRm9udCA9IChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZmFsbGJhY2tGb250KSB8fCB7XG4gICAgZmFtaWx5OiAnUm9ib3RvJyxcbiAgICBzdHlsZTogJ1JlZ3VsYXInXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBpZiAobm9kZS5mb250TmFtZSA9PT0gZmlnbWEubWl4ZWQpIHtcbiAgICAgIGlmICgob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnNtYXJ0U3RyYXRlZ3kpID09PSAncHJldmFpbCcpIHtcbiAgICAgICAgY29uc3QgZm9udEhhc2hUcmVlID0ge307XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBub2RlLmNoYXJhY3RlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBjaGFyRm9udCA9IG5vZGUuZ2V0UmFuZ2VGb250TmFtZShpIC0gMSwgaSk7XG4gICAgICAgICAgY29uc3Qga2V5ID0gYCR7Y2hhckZvbnQuZmFtaWx5fTo6JHtjaGFyRm9udC5zdHlsZX1gO1xuICAgICAgICAgIGZvbnRIYXNoVHJlZVtrZXldID0gZm9udEhhc2hUcmVlW2tleV0gPyBmb250SGFzaFRyZWVba2V5XSArIDEgOiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJldmFpbGVkVHJlZUl0ZW0gPSBPYmplY3QuZW50cmllcyhmb250SGFzaFRyZWUpLnNvcnQoKGEsIGIpID0+IGJbMV0gLSBhWzFdKVswXTtcbiAgICAgICAgY29uc3QgW2ZhbWlseSwgc3R5bGVdID0gcHJldmFpbGVkVHJlZUl0ZW1bMF0uc3BsaXQoJzo6Jyk7XG4gICAgICAgIGNvbnN0IHByZXZhaWxlZEZvbnQgPSB7XG4gICAgICAgICAgZmFtaWx5LFxuICAgICAgICAgIHN0eWxlXG4gICAgICAgIH07XG4gICAgICAgIGF3YWl0IGZpZ21hLmxvYWRGb250QXN5bmMocHJldmFpbGVkRm9udCk7XG4gICAgICAgIG5vZGUuZm9udE5hbWUgPSBwcmV2YWlsZWRGb250O1xuICAgICAgfSBlbHNlIGlmICgob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnNtYXJ0U3RyYXRlZ3kpID09PSAnc3RyaWN0Jykge1xuICAgICAgICByZXR1cm4gc2V0Q2hhcmFjdGVyc1dpdGhTdHJpY3RNYXRjaEZvbnQobm9kZSwgY2hhcmFjdGVycywgZmFsbGJhY2tGb250KTtcbiAgICAgIH0gZWxzZSBpZiAoKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5zbWFydFN0cmF0ZWd5KSA9PT0gJ2V4cGVyaW1lbnRhbCcpIHtcbiAgICAgICAgcmV0dXJuIHNldENoYXJhY3RlcnNXaXRoU21hcnRNYXRjaEZvbnQobm9kZSwgY2hhcmFjdGVycywgZmFsbGJhY2tGb250KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGZpcnN0Q2hhckZvbnQgPSBub2RlLmdldFJhbmdlRm9udE5hbWUoMCwgMSk7XG4gICAgICAgIGF3YWl0IGZpZ21hLmxvYWRGb250QXN5bmMoZmlyc3RDaGFyRm9udCk7XG4gICAgICAgIG5vZGUuZm9udE5hbWUgPSBmaXJzdENoYXJGb250O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBmaWdtYS5sb2FkRm9udEFzeW5jKHtcbiAgICAgICAgZmFtaWx5OiBub2RlLmZvbnROYW1lLmZhbWlseSxcbiAgICAgICAgc3R5bGU6IG5vZGUuZm9udE5hbWUuc3R5bGVcbiAgICAgIH0pO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS53YXJuKGBGYWlsZWQgdG8gbG9hZCBcIiR7bm9kZS5mb250TmFtZVsnZmFtaWx5J119ICR7bm9kZS5mb250TmFtZVsnc3R5bGUnXX1cIiBmb250IGFuZCByZXBsYWNlZCB3aXRoIGZhbGxiYWNrIFwiJHtmYWxsYmFja0ZvbnQuZmFtaWx5fSAke2ZhbGxiYWNrRm9udC5zdHlsZX1cImAsIGVycik7XG4gICAgYXdhaXQgZmlnbWEubG9hZEZvbnRBc3luYyhmYWxsYmFja0ZvbnQpO1xuICAgIG5vZGUuZm9udE5hbWUgPSBmYWxsYmFja0ZvbnQ7XG4gIH1cblxuICB0cnkge1xuICAgIG5vZGUuY2hhcmFjdGVycyA9IGNoYXJhY3RlcnM7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUud2FybihgRmFpbGVkIHRvIHNldCBjaGFyYWN0ZXJzLiBTa2lwcGVkLmAsIGVycik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5leHBvcnRzLnNldENoYXJhY3RlcnMgPSBzZXRDaGFyYWN0ZXJzO1xuXG5jb25zdCBzZXRDaGFyYWN0ZXJzV2l0aFN0cmljdE1hdGNoRm9udCA9IGFzeW5jIChub2RlLCBjaGFyYWN0ZXJzLCBmYWxsYmFja0ZvbnQpID0+IHtcbiAgY29uc3QgZm9udEhhc2hUcmVlID0ge307XG5cbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBub2RlLmNoYXJhY3RlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBzdGFydElkeCA9IGkgLSAxO1xuICAgIGNvbnN0IHN0YXJ0Q2hhckZvbnQgPSBub2RlLmdldFJhbmdlRm9udE5hbWUoc3RhcnRJZHgsIGkpO1xuICAgIGNvbnN0IHN0YXJ0Q2hhckZvbnRWYWwgPSBgJHtzdGFydENoYXJGb250LmZhbWlseX06OiR7c3RhcnRDaGFyRm9udC5zdHlsZX1gO1xuXG4gICAgd2hpbGUgKGkgPCBub2RlLmNoYXJhY3RlcnMubGVuZ3RoKSB7XG4gICAgICBpKys7XG4gICAgICBjb25zdCBjaGFyRm9udCA9IG5vZGUuZ2V0UmFuZ2VGb250TmFtZShpIC0gMSwgaSk7XG5cbiAgICAgIGlmIChzdGFydENoYXJGb250VmFsICE9PSBgJHtjaGFyRm9udC5mYW1pbHl9Ojoke2NoYXJGb250LnN0eWxlfWApIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9udEhhc2hUcmVlW2Ake3N0YXJ0SWR4fV8ke2l9YF0gPSBzdGFydENoYXJGb250VmFsO1xuICB9XG5cbiAgYXdhaXQgZmlnbWEubG9hZEZvbnRBc3luYyhmYWxsYmFja0ZvbnQpO1xuICBub2RlLmZvbnROYW1lID0gZmFsbGJhY2tGb250O1xuICBub2RlLmNoYXJhY3RlcnMgPSBjaGFyYWN0ZXJzO1xuICBjb25zb2xlLmxvZyhmb250SGFzaFRyZWUpO1xuICBhd2FpdCBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhmb250SGFzaFRyZWUpLm1hcChhc3luYyByYW5nZSA9PiB7XG4gICAgY29uc29sZS5sb2cocmFuZ2UsIGZvbnRIYXNoVHJlZVtyYW5nZV0pO1xuICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IHJhbmdlLnNwbGl0KCdfJyk7XG4gICAgY29uc3QgW2ZhbWlseSwgc3R5bGVdID0gZm9udEhhc2hUcmVlW3JhbmdlXS5zcGxpdCgnOjonKTtcbiAgICBjb25zdCBtYXRjaGVkRm9udCA9IHtcbiAgICAgIGZhbWlseSxcbiAgICAgIHN0eWxlXG4gICAgfTtcbiAgICBhd2FpdCBmaWdtYS5sb2FkRm9udEFzeW5jKG1hdGNoZWRGb250KTtcbiAgICByZXR1cm4gbm9kZS5zZXRSYW5nZUZvbnROYW1lKE51bWJlcihzdGFydCksIE51bWJlcihlbmQpLCBtYXRjaGVkRm9udCk7XG4gIH0pKTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5jb25zdCBnZXREZWxpbWl0ZXJQb3MgPSAoc3RyLCBkZWxpbWl0ZXIsIHN0YXJ0SWR4ID0gMCwgZW5kSWR4ID0gc3RyLmxlbmd0aCkgPT4ge1xuICBjb25zdCBpbmRpY2VzID0gW107XG4gIGxldCB0ZW1wID0gc3RhcnRJZHg7XG5cbiAgZm9yIChsZXQgaSA9IHN0YXJ0SWR4OyBpIDwgZW5kSWR4OyBpKyspIHtcbiAgICBpZiAoc3RyW2ldID09PSBkZWxpbWl0ZXIgJiYgaSArIHN0YXJ0SWR4ICE9PSBlbmRJZHggJiYgdGVtcCAhPT0gaSArIHN0YXJ0SWR4KSB7XG4gICAgICBpbmRpY2VzLnB1c2goW3RlbXAsIGkgKyBzdGFydElkeF0pO1xuICAgICAgdGVtcCA9IGkgKyBzdGFydElkeCArIDE7XG4gICAgfVxuICB9XG5cbiAgdGVtcCAhPT0gZW5kSWR4ICYmIGluZGljZXMucHVzaChbdGVtcCwgZW5kSWR4XSk7XG4gIHJldHVybiBpbmRpY2VzLmZpbHRlcihCb29sZWFuKTtcbn07XG5cbmNvbnN0IGJ1aWxkTGluZWFyT3JkZXIgPSBub2RlID0+IHtcbiAgY29uc3QgZm9udFRyZWUgPSBbXTtcbiAgY29uc3QgbmV3TGluZXNQb3MgPSBnZXREZWxpbWl0ZXJQb3Mobm9kZS5jaGFyYWN0ZXJzLCAnXFxuJyk7XG4gIG5ld0xpbmVzUG9zLmZvckVhY2goKFtuZXdMaW5lc1JhbmdlU3RhcnQsIG5ld0xpbmVzUmFuZ2VFbmRdLCBuKSA9PiB7XG4gICAgY29uc3QgbmV3TGluZXNSYW5nZUZvbnQgPSBub2RlLmdldFJhbmdlRm9udE5hbWUobmV3TGluZXNSYW5nZVN0YXJ0LCBuZXdMaW5lc1JhbmdlRW5kKTtcblxuICAgIGlmIChuZXdMaW5lc1JhbmdlRm9udCA9PT0gZmlnbWEubWl4ZWQpIHtcbiAgICAgIGNvbnN0IHNwYWNlc1BvcyA9IGdldERlbGltaXRlclBvcyhub2RlLmNoYXJhY3RlcnMsICcgJywgbmV3TGluZXNSYW5nZVN0YXJ0LCBuZXdMaW5lc1JhbmdlRW5kKTtcbiAgICAgIHNwYWNlc1Bvcy5mb3JFYWNoKChbc3BhY2VzUmFuZ2VTdGFydCwgc3BhY2VzUmFuZ2VFbmRdLCBzKSA9PiB7XG4gICAgICAgIGNvbnN0IHNwYWNlc1JhbmdlRm9udCA9IG5vZGUuZ2V0UmFuZ2VGb250TmFtZShzcGFjZXNSYW5nZVN0YXJ0LCBzcGFjZXNSYW5nZUVuZCk7XG5cbiAgICAgICAgaWYgKHNwYWNlc1JhbmdlRm9udCA9PT0gZmlnbWEubWl4ZWQpIHtcbiAgICAgICAgICBjb25zdCBzcGFjZXNSYW5nZUZvbnQgPSBub2RlLmdldFJhbmdlRm9udE5hbWUoc3BhY2VzUmFuZ2VTdGFydCwgc3BhY2VzUmFuZ2VTdGFydFswXSk7XG4gICAgICAgICAgZm9udFRyZWUucHVzaCh7XG4gICAgICAgICAgICBzdGFydDogc3BhY2VzUmFuZ2VTdGFydCxcbiAgICAgICAgICAgIGRlbGltaXRlcjogJyAnLFxuICAgICAgICAgICAgZmFtaWx5OiBzcGFjZXNSYW5nZUZvbnQuZmFtaWx5LFxuICAgICAgICAgICAgc3R5bGU6IHNwYWNlc1JhbmdlRm9udC5zdHlsZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvbnRUcmVlLnB1c2goe1xuICAgICAgICAgICAgc3RhcnQ6IHNwYWNlc1JhbmdlU3RhcnQsXG4gICAgICAgICAgICBkZWxpbWl0ZXI6ICcgJyxcbiAgICAgICAgICAgIGZhbWlseTogc3BhY2VzUmFuZ2VGb250LmZhbWlseSxcbiAgICAgICAgICAgIHN0eWxlOiBzcGFjZXNSYW5nZUZvbnQuc3R5bGVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvbnRUcmVlLnB1c2goe1xuICAgICAgICBzdGFydDogbmV3TGluZXNSYW5nZVN0YXJ0LFxuICAgICAgICBkZWxpbWl0ZXI6ICdcXG4nLFxuICAgICAgICBmYW1pbHk6IG5ld0xpbmVzUmFuZ2VGb250LmZhbWlseSxcbiAgICAgICAgc3R5bGU6IG5ld0xpbmVzUmFuZ2VGb250LnN0eWxlXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZm9udFRyZWUuc29ydCgoYSwgYikgPT4gK2Euc3RhcnQgLSArYi5zdGFydCkubWFwKCh7XG4gICAgZmFtaWx5LFxuICAgIHN0eWxlLFxuICAgIGRlbGltaXRlclxuICB9KSA9PiAoe1xuICAgIGZhbWlseSxcbiAgICBzdHlsZSxcbiAgICBkZWxpbWl0ZXJcbiAgfSkpO1xufTtcblxuY29uc3Qgc2V0Q2hhcmFjdGVyc1dpdGhTbWFydE1hdGNoRm9udCA9IGFzeW5jIChub2RlLCBjaGFyYWN0ZXJzLCBmYWxsYmFja0ZvbnQpID0+IHtcbiAgY29uc3QgcmFuZ2VUcmVlID0gYnVpbGRMaW5lYXJPcmRlcihub2RlKTtcbiAgY29uc3QgZm9udHNUb0xvYWQgPSAoMCwgX3VuaXFCeTIuZGVmYXVsdCkocmFuZ2VUcmVlLCAoe1xuICAgIGZhbWlseSxcbiAgICBzdHlsZVxuICB9KSA9PiBgJHtmYW1pbHl9Ojoke3N0eWxlfWApLm1hcCgoe1xuICAgIGZhbWlseSxcbiAgICBzdHlsZVxuICB9KSA9PiAoe1xuICAgIGZhbWlseSxcbiAgICBzdHlsZVxuICB9KSk7XG4gIGF3YWl0IFByb21pc2UuYWxsKFsuLi5mb250c1RvTG9hZCwgZmFsbGJhY2tGb250XS5tYXAoZmlnbWEubG9hZEZvbnRBc3luYykpO1xuICBub2RlLmZvbnROYW1lID0gZmFsbGJhY2tGb250O1xuICBub2RlLmNoYXJhY3RlcnMgPSBjaGFyYWN0ZXJzO1xuICBsZXQgcHJldlBvcyA9IDA7XG4gIHJhbmdlVHJlZS5mb3JFYWNoKCh7XG4gICAgZmFtaWx5LFxuICAgIHN0eWxlLFxuICAgIGRlbGltaXRlclxuICB9KSA9PiB7XG4gICAgaWYgKHByZXZQb3MgPCBub2RlLmNoYXJhY3RlcnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBkZWxpbWV0ZXJQb3MgPSBub2RlLmNoYXJhY3RlcnMuaW5kZXhPZihkZWxpbWl0ZXIsIHByZXZQb3MpO1xuICAgICAgY29uc3QgZW5kUG9zID0gZGVsaW1ldGVyUG9zID4gcHJldlBvcyA/IGRlbGltZXRlclBvcyA6IG5vZGUuY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgICBjb25zdCBtYXRjaGVkRm9udCA9IHtcbiAgICAgICAgZmFtaWx5LFxuICAgICAgICBzdHlsZVxuICAgICAgfTtcbiAgICAgIG5vZGUuc2V0UmFuZ2VGb250TmFtZShwcmV2UG9zLCBlbmRQb3MsIG1hdGNoZWRGb250KTtcbiAgICAgIHByZXZQb3MgPSBlbmRQb3MgKyAxO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiB0cnVlO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHRvcExldmVsRnJhbWVzO1xuXG4vKipcbiAqIHRoaXMgZnVuY3Rpb24gcmV0dXJucyBhbGwgdG9wIGxldmVsIGZyYW1lcyBvbiBjdXJyZW50UGFnZVxuICovXG5mdW5jdGlvbiB0b3BMZXZlbEZyYW1lcyhwYWdlID0gZmlnbWEuY3VycmVudFBhZ2UpIHtcbiAgcmV0dXJuIHBhZ2UuY2hpbGRyZW4uZmlsdGVyKG5vZGUgPT4gbm9kZS50eXBlID09PSAnRlJBTUUnKTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNsb25lXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF9jbG9uZS5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImdldEFsbEZvbnRzXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF9nZXRBbGxGb250cy5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImdldEJvdW5kaW5nUmVjdFwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfZ2V0Qm91bmRpbmdSZWN0LmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZ2V0Tm9kZUluZGV4XCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF9nZXROb2RlSW5kZXguZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJnZXRQYWdlXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF9nZXRQYWdlLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiaGFzQ2hpbGRyZW5cIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX2hhc0NoaWxkcmVuLmhhc0NoaWxkcmVuO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImlzUGFydE9mSW5zdGFuY2VcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX2lzUGFydE9mSW5zdGFuY2UuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJpc1BhcnRPZk5vZGVcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX2lzUGFydE9mTm9kZS5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImlzVmlzaWJsZU5vZGVcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX2lzVmlzaWJsZU5vZGUuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJsb2FkVW5pcXVlRm9udHNcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX2xvYWRVbmlxdWVGb250cy5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImxvYWRGb250c1wiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfbG9hZEZvbnRzLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibm9kZVRvT2JqZWN0XCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF9ub2RlVG9PYmplY3Qubm9kZVRvT2JqZWN0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInRvcExldmVsRnJhbWVzXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF90b3BMZXZlbEZyYW1lcy5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImdldFRleHROb2RlQ1NTXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF9nZXRDU1NTdHlsZXMuZ2V0VGV4dE5vZGVDU1M7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZmluZEFsbFwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfZmluZE1ldGhvZHMuZmluZEFsbDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJnZXRSZWxhdGl2ZVBvc2l0aW9uXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF9nZXRSZWxhdGl2ZVBvc2l0aW9uLmdldFJlbGF0aXZlUG9zaXRpb247XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZ2V0VG9wTGV2ZWxQYXJlbnRcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX2dldFJlbGF0aXZlUG9zaXRpb24uZ2V0VG9wTGV2ZWxQYXJlbnQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZmlnbWFSR0JUb1dlYlJHQlwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfY29udmVydENvbG9yLmZpZ21hUkdCVG9XZWJSR0I7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwid2ViUkdCVG9GaWdtYVJHQlwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfY29udmVydENvbG9yLndlYlJHQlRvRmlnbWFSR0I7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZmlnbWFSR0JUb0hleFwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfY29udmVydENvbG9yLmZpZ21hUkdCVG9IZXg7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiaGV4VG9GaWdtYVJHQlwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfY29udmVydENvbG9yLmhleFRvRmlnbWFSR0I7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiaXNDb21wb25lbnROb2RlXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF9pc1R5cGVOb2RlLmlzQ29tcG9uZW50Tm9kZTtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJpc0ZyYW1lTm9kZVwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfaXNUeXBlTm9kZS5pc0ZyYW1lTm9kZTtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJpc0dyb3VwTm9kZVwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfaXNUeXBlTm9kZS5pc0dyb3VwTm9kZTtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJpc0luc3RhbmNlTm9kZVwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfaXNUeXBlTm9kZS5pc0luc3RhbmNlTm9kZTtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJpc1BhZ2VOb2RlXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF9pc1R5cGVOb2RlLmlzUGFnZU5vZGU7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiaXNUZXh0Tm9kZVwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfaXNUeXBlTm9kZS5pc1RleHROb2RlO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImlzT25lT2ZOb2RlVHlwZVwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfaXNUeXBlTm9kZS5pc09uZU9mTm9kZVR5cGU7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZXh0cmFjdEltYWdlQ3JvcFBhcmFtc1wiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfZXh0cmFjdEltYWdlQ3JvcFBhcmFtcy5leHRyYWN0SW1hZ2VDcm9wUGFyYW1zO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImV4dHJhY3RMaW5lYXJHcmFkaWVudFBhcmFtc0Zyb21UcmFuc2Zvcm1cIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX2V4dHJhY3RMaW5lYXJHcmFkaWVudFN0YXJ0RW5kLmV4dHJhY3RMaW5lYXJHcmFkaWVudFBhcmFtc0Zyb21UcmFuc2Zvcm07XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZXh0cmFjdFJhZGlhbE9yRGlhbW9uZEdyYWRpZW50UGFyYW1zXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF9leHRyYWN0UmFkaWFsT3JEaWFtb25kR3JhZGllbnRQYXJhbXMuZXh0cmFjdFJhZGlhbE9yRGlhbW9uZEdyYWRpZW50UGFyYW1zO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInNldENoYXJhY3RlcnNcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX3NldENoYXJhY3RlcnMuc2V0Q2hhcmFjdGVycztcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJwYXJzZVRleHRTdHlsZVwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfcGFyc2VUZXh0U3R5bGUucGFyc2VUZXh0U3R5bGU7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3BsaXRUZXh0U3R5bGVJbnRvTGluZXNcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX3BhcnNlVGV4dFN0eWxlLnNwbGl0VGV4dFN0eWxlSW50b0xpbmVzO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImpvaW5UZXh0TGluZXNTdHlsZXNcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX3BhcnNlVGV4dFN0eWxlLmpvaW5UZXh0TGluZXNTdHlsZXM7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiYXBwbHlUZXh0U3R5bGVUb1RleHROb2RlXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF9wYXJzZVRleHRTdHlsZS5hcHBseVRleHRTdHlsZVRvVGV4dE5vZGU7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY2hhbmdlQ2hhcmFjdGVyc1RleHRTdHlsZVwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfcGFyc2VUZXh0U3R5bGUuY2hhbmdlQ2hhcmFjdGVyc1RleHRTdHlsZTtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJjaGFuZ2VUZXh0U3R5bGVcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX3BhcnNlVGV4dFN0eWxlLmNoYW5nZVRleHRTdHlsZTtcbiAgfVxufSk7XG5cbnZhciBfY2xvbmUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2hlbHBlcnMvY2xvbmVcIikpO1xuXG52YXIgX2dldEFsbEZvbnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9oZWxwZXJzL2dldEFsbEZvbnRzXCIpKTtcblxudmFyIF9nZXRCb3VuZGluZ1JlY3QgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2hlbHBlcnMvZ2V0Qm91bmRpbmdSZWN0XCIpKTtcblxudmFyIF9nZXROb2RlSW5kZXggPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2hlbHBlcnMvZ2V0Tm9kZUluZGV4XCIpKTtcblxudmFyIF9nZXRQYWdlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9oZWxwZXJzL2dldFBhZ2VcIikpO1xuXG52YXIgX2hhc0NoaWxkcmVuID0gcmVxdWlyZShcIi4vaGVscGVycy9oYXNDaGlsZHJlblwiKTtcblxudmFyIF9pc1BhcnRPZkluc3RhbmNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9oZWxwZXJzL2lzUGFydE9mSW5zdGFuY2VcIikpO1xuXG52YXIgX2lzUGFydE9mTm9kZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vaGVscGVycy9pc1BhcnRPZk5vZGVcIikpO1xuXG52YXIgX2lzVmlzaWJsZU5vZGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2hlbHBlcnMvaXNWaXNpYmxlTm9kZVwiKSk7XG5cbnZhciBfbG9hZFVuaXF1ZUZvbnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9oZWxwZXJzL2xvYWRVbmlxdWVGb250c1wiKSk7XG5cbnZhciBfbG9hZEZvbnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9oZWxwZXJzL2xvYWRGb250c1wiKSk7XG5cbnZhciBfbm9kZVRvT2JqZWN0ID0gcmVxdWlyZShcIi4vaGVscGVycy9ub2RlVG9PYmplY3RcIik7XG5cbnZhciBfdG9wTGV2ZWxGcmFtZXMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2hlbHBlcnMvdG9wTGV2ZWxGcmFtZXNcIikpO1xuXG52YXIgX2dldENTU1N0eWxlcyA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvZ2V0Q1NTU3R5bGVzXCIpO1xuXG52YXIgX2ZpbmRNZXRob2RzID0gcmVxdWlyZShcIi4vaGVscGVycy9maW5kTWV0aG9kc1wiKTtcblxudmFyIF9nZXRSZWxhdGl2ZVBvc2l0aW9uID0gcmVxdWlyZShcIi4vaGVscGVycy9nZXRSZWxhdGl2ZVBvc2l0aW9uXCIpO1xuXG52YXIgX2NvbnZlcnRDb2xvciA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvY29udmVydENvbG9yXCIpO1xuXG52YXIgX2lzVHlwZU5vZGUgPSByZXF1aXJlKFwiLi9oZWxwZXJzL2lzVHlwZU5vZGVcIik7XG5cbnZhciBfZXh0cmFjdEltYWdlQ3JvcFBhcmFtcyA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvZXh0cmFjdEltYWdlQ3JvcFBhcmFtc1wiKTtcblxudmFyIF9leHRyYWN0TGluZWFyR3JhZGllbnRTdGFydEVuZCA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvZXh0cmFjdExpbmVhckdyYWRpZW50U3RhcnRFbmRcIik7XG5cbnZhciBfZXh0cmFjdFJhZGlhbE9yRGlhbW9uZEdyYWRpZW50UGFyYW1zID0gcmVxdWlyZShcIi4vaGVscGVycy9leHRyYWN0UmFkaWFsT3JEaWFtb25kR3JhZGllbnRQYXJhbXNcIik7XG5cbnZhciBfc2V0Q2hhcmFjdGVycyA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvc2V0Q2hhcmFjdGVyc1wiKTtcblxudmFyIF9wYXJzZVRleHRTdHlsZSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvcGFyc2VUZXh0U3R5bGVcIik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk51bWJlclV0aWwgPSB2b2lkIDA7XG5jb25zdCBjb25zdF8xID0gcmVxdWlyZShcIi4uL2NvbnN0XCIpO1xuY2xhc3MgTnVtYmVyVXRpbCB7XG4gICAgc3RhdGljIGlzRXF1YWwodjEsIHYyLCB0b2xlcmFuY2UgPSBOdW1iZXJVdGlsLlRPTEVSQU5DRSkge1xuICAgICAgICByZXR1cm4gTWF0aC5hYnModjEgLSB2MikgPCB0b2xlcmFuY2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiOt+WPluebuOWPjeaVsFxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRPcHBvc2l0ZU51bWJlcih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgPT09IDAgPyAwIDogLXZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlsIbmnInnrKblj7fnmoQgWmVybyDovazljJbkuLrml6DnrKblj7dcbiAgICAgKlxuICAgICAqIE9iamVjdC5pcyB2cyA9PT0gOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy96aC1DTi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAgICAgKi9cbiAgICBzdGF0aWMgdW5TaWduZWRaZXJvKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IDAgOiB2YWx1ZTtcbiAgICB9XG59XG5leHBvcnRzLk51bWJlclV0aWwgPSBOdW1iZXJVdGlsO1xuTnVtYmVyVXRpbC5UT0xFUkFOQ0UgPSBjb25zdF8xLlNJWF9ERUNJTUFMX1RPTEVSQU5DRTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TSVhfREVDSU1BTF9UT0xFUkFOQ0UgPSBleHBvcnRzLlRXT19QSSA9IGV4cG9ydHMuUEkgPSBleHBvcnRzLk1JTiA9IGV4cG9ydHMuTUFYID0gZXhwb3J0cy5PTkUgPSBleHBvcnRzLlpFUk8gPSB2b2lkIDA7XG4vKipcbiAqIG51bWJlciAwXG4gKi9cbmV4cG9ydHMuWkVSTyA9IDA7XG4vKipcbiAqIG51bWJlciAxXG4gKi9cbmV4cG9ydHMuT05FID0gMTtcbi8qKlxuICogbnVtYmVyIEluZmluaXR5XG4gKi9cbmV4cG9ydHMuTUFYID0gSW5maW5pdHk7XG4vKipcbiAqIG51bWJlciAtSW5maW5pdHlcbiAqL1xuZXhwb3J0cy5NSU4gPSAtSW5maW5pdHk7XG5leHBvcnRzLlBJID0gTWF0aC5QSTtcbmV4cG9ydHMuVFdPX1BJID0gZXhwb3J0cy5QSSAqIDI7XG5leHBvcnRzLlNJWF9ERUNJTUFMX1RPTEVSQU5DRSA9IDFlLTY7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVXRpbHMgPSBleHBvcnRzLlBvbHlnb24gPSBleHBvcnRzLkVsbGlwc2UgPSBleHBvcnRzLkNpcmNsZSA9IGV4cG9ydHMuQXJjID0gZXhwb3J0cy5Cb3gzID0gZXhwb3J0cy5Cb3gyID0gZXhwb3J0cy5MaW5lMyA9IGV4cG9ydHMuTGluZVNpZGUgPSBleHBvcnRzLkxpbmUyID0gZXhwb3J0cy5NYXRyaXg0ID0gZXhwb3J0cy5NYXRyaXgzID0gZXhwb3J0cy5WZWN0b3IzID0gZXhwb3J0cy5WZWN0b3IyID0gdm9pZCAwO1xudmFyIHZlY3RvcjJfMSA9IHJlcXVpcmUoXCIuL3VuaXQvdmVjdG9yMlwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlZlY3RvcjJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZlY3RvcjJfMS5WZWN0b3IyOyB9IH0pO1xudmFyIHZlY3RvcjNfMSA9IHJlcXVpcmUoXCIuL3VuaXQvdmVjdG9yM1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlZlY3RvcjNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZlY3RvcjNfMS5WZWN0b3IzOyB9IH0pO1xudmFyIG1hdHJpeDNfMSA9IHJlcXVpcmUoXCIuL3VuaXQvbWF0cml4M1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk1hdHJpeDNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1hdHJpeDNfMS5NYXRyaXgzOyB9IH0pO1xudmFyIG1hdHJpeDRfMSA9IHJlcXVpcmUoXCIuL3VuaXQvbWF0cml4NFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk1hdHJpeDRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1hdHJpeDRfMS5NYXRyaXg0OyB9IH0pO1xudmFyIGxpbmUyXzEgPSByZXF1aXJlKFwiLi91bml0L2xpbmUyXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTGluZTJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGxpbmUyXzEuTGluZTI7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJMaW5lU2lkZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbGluZTJfMS5MaW5lU2lkZTsgfSB9KTtcbnZhciBsaW5lM18xID0gcmVxdWlyZShcIi4vdW5pdC9saW5lM1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkxpbmUzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBsaW5lM18xLkxpbmUzOyB9IH0pO1xudmFyIGJveDJfMSA9IHJlcXVpcmUoXCIuL3VuaXQvYm94MlwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkJveDJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGJveDJfMS5Cb3gyOyB9IH0pO1xudmFyIGJveDNfMSA9IHJlcXVpcmUoXCIuL3VuaXQvYm94M1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkJveDNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGJveDNfMS5Cb3gzOyB9IH0pO1xudmFyIGFyY18xID0gcmVxdWlyZShcIi4vdW5pdC9hcmNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJBcmNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFyY18xLkFyYzsgfSB9KTtcbnZhciBjaXJjbGVfMSA9IHJlcXVpcmUoXCIuL3VuaXQvY2lyY2xlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQ2lyY2xlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjaXJjbGVfMS5DaXJjbGU7IH0gfSk7XG52YXIgZWxsaXBzZV8xID0gcmVxdWlyZShcIi4vdW5pdC9lbGxpcHNlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiRWxsaXBzZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZWxsaXBzZV8xLkVsbGlwc2U7IH0gfSk7XG52YXIgcG9seWdvbl8xID0gcmVxdWlyZShcIi4vdW5pdC9wb2x5Z29uXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiUG9seWdvblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcG9seWdvbl8xLlBvbHlnb247IH0gfSk7XG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVXRpbHNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHV0aWxzXzEuVXRpbHM7IH0gfSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQXJjID0gdm9pZCAwO1xuY29uc3QgY29uc3RfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb25zdFwiKTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHNcIik7XG5jb25zdCBsaW5lMl8xID0gcmVxdWlyZShcIi4uL2xpbmUyXCIpO1xuY29uc3QgdmVjdG9yMl8xID0gcmVxdWlyZShcIi4uL3ZlY3RvcjJcIik7XG5jb25zdCBDTE9DS1dJU0UgPSBmYWxzZTtcbi8qKlxuICog6KGo56S65LqM57u05LiW55WM55qE5ZyG5bynXG4gKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGFuIGFyYyBpbiBUd28tZGltZW5zaW9uYWwgY29vcmRpbmF0ZSBzeXN0ZW1cbiAqL1xuY2xhc3MgQXJjIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gY2VudGVyIOWchuW/g1xuICAgICAqIEBwYXJhbSByYWRpdXMg5Y2K5b6EXG4gICAgICogQHBhcmFtIHN0YXJ0UmFkaWFuIOi1t+Wni+inklxuICAgICAqIEBwYXJhbSBlbmRSYWRpYW4g57uI5q2i6KeSXG4gICAgICogQHBhcmFtIGlzQ2xvY2t3aXNlIOaYr+WQpuaYr+mAhuaXtumSiFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNlbnRlciwgcmFkaXVzLCBzdGFydFJhZGlhbiwgZW5kUmFkaWFuLCBpc0Nsb2Nrd2lzZSA9IENMT0NLV0lTRSkge1xuICAgICAgICAvKipcbiAgICAgICAgICog5ZyG5b+DXG4gICAgICAgICAqXG4gICAgICAgICAqIEBkZWZhdWx0IFZlY3RvcjIoMCwgMClcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2VudGVyID0gbmV3IHZlY3RvcjJfMS5WZWN0b3IyKGNvbnN0XzEuWkVSTywgY29uc3RfMS5aRVJPKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOWNiuW+hFxuICAgICAgICAgKlxuICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJhZGl1cyA9IGNvbnN0XzEuWkVSTztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOi1t+Wni+inku+8iOW8p+W6puWItu+8iVxuICAgICAgICAgKlxuICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnN0YXJ0UmFkaWFuID0gY29uc3RfMS5aRVJPO1xuICAgICAgICAvKipcbiAgICAgICAgICog57uI5q2i6KeS77yI5byn5bqm5Yi277yJXG4gICAgICAgICAqXG4gICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZW5kUmFkaWFuID0gY29uc3RfMS5aRVJPO1xuICAgICAgICAvKipcbiAgICAgICAgICog5piv5ZCm6aG65pe26ZKI77yI6buY6K6k77yaZmFsc2XvvIlcbiAgICAgICAgICpcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaXNDbG9ja3dpc2UgPSBDTE9DS1dJU0U7XG4gICAgICAgIHRoaXMuY2VudGVyID0gY2VudGVyIHx8IHRoaXMuY2VudGVyO1xuICAgICAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cyB8fCB0aGlzLnJhZGl1cztcbiAgICAgICAgdGhpcy5zdGFydFJhZGlhbiA9IHN0YXJ0UmFkaWFuIHx8IHRoaXMuc3RhcnRSYWRpYW47XG4gICAgICAgIHRoaXMuZW5kUmFkaWFuID0gZW5kUmFkaWFuIHx8IHRoaXMuZW5kUmFkaWFuO1xuICAgICAgICB0aGlzLmlzQ2xvY2t3aXNlID0gaXNDbG9ja3dpc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOmAmui/h+WchuW8p+S4iuS4jeWQjOeahOS4ieS4queCueaehOmAoOS4gOS4quWchuW8p1xuICAgICAqXG4gICAgICogQHBhcmFtIHN0YXJ0UG9pbnQg6LW354K5XG4gICAgICogQHBhcmFtIGFyY1BvaW50IOW8p+S4iuS7u+aEj+eCue+8iOS4jeS4uiBzdGFydFBvaW50L2VuZFBvaW5077yJXG4gICAgICogQHBhcmFtIGVuZFBvaW50IOe7iOeCuVxuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGVCeVRocmVlUG9pbnQoc3RhcnRQb2ludCwgYXJjUG9pbnQsIGVuZFBvaW50LCBpc0Nsb2Nrd2lzZSA9IENMT0NLV0lTRSkge1xuICAgICAgICBjb25zdCBsMSA9IG5ldyBsaW5lMl8xLkxpbmUyKHN0YXJ0UG9pbnQsIGFyY1BvaW50KTtcbiAgICAgICAgY29uc3QgbDIgPSBuZXcgbGluZTJfMS5MaW5lMihhcmNQb2ludCwgZW5kUG9pbnQpO1xuICAgICAgICBjb25zdCBkaWFtZXRlcjEgPSB1dGlsc18xLlV0aWxzLkxpbmUyLmNhbGNQZXJwZW5kaWN1bGFyVGhyb3VnaFBvaW50KGwxLCBsMS5jZW50ZXIpO1xuICAgICAgICBjb25zdCBkaWFtZXRlcjIgPSB1dGlsc18xLlV0aWxzLkxpbmUyLmNhbGNQZXJwZW5kaWN1bGFyVGhyb3VnaFBvaW50KGwyLCBsMi5jZW50ZXIpO1xuICAgICAgICBjb25zdCBjZW50ZXIgPSB1dGlsc18xLlV0aWxzLkxpbmUyLmxpbmVJbnRlcnNlY3RMaW5lKGRpYW1ldGVyMSwgZGlhbWV0ZXIyKTtcbiAgICAgICAgaWYgKCFjZW50ZXIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHBvaW50cyBjYW4gbm90IGZyb20gYW4gYXJjJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEFyYy5jcmVhdGVCeUJvdW5kYXJ5UG9pbnQoY2VudGVyLCBzdGFydFBvaW50LCBlbmRQb2ludCwgaXNDbG9ja3dpc2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDpgJrov4fovrnnlYzngrnmnoTpgKDkuIDkuKrlnIblvKdcbiAgICAgKlxuICAgICAqIENvbnN0cnVjdCBhbiBhcmMgdGhyb3VnaCBib3VuZGFyeSBwb2ludHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjZW50ZXIg5ZyG5b+DXG4gICAgICogQHBhcmFtIHN0YXJ0UG9pbnQg5ZyG5byn6LW354K5XG4gICAgICogQHBhcmFtIGVuZFBvaW50IOWchuW8p+e7iOeCuVxuICAgICAqIEBwYXJhbSBpc0Nsb2Nrd2lzZSDmmK/lkKbpgIbml7bpkojvvIjpu5jorqTvvJp0cnVl77yJXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyDlnIblvKdcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlQnlCb3VuZGFyeVBvaW50KGNlbnRlciwgc3RhcnRQb2ludCwgZW5kUG9pbnQsIGlzQ2xvY2t3aXNlID0gQ0xPQ0tXSVNFKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0UmFkaWFuID0gdXRpbHNfMS5VdGlscy5DaXJjbGUuZ2V0QW5nbGVCeVBvaW50KGNlbnRlciwgc3RhcnRQb2ludCwgaXNDbG9ja3dpc2UpO1xuICAgICAgICBjb25zdCBlbmRSYWRpYW4gPSB1dGlsc18xLlV0aWxzLkNpcmNsZS5nZXRBbmdsZUJ5UG9pbnQoY2VudGVyLCBlbmRQb2ludCwgaXNDbG9ja3dpc2UpO1xuICAgICAgICBjb25zdCByYWRpdXMgPSB1dGlsc18xLlV0aWxzLlZlY3RvcjIuZGlzdGFuY2Uoc3RhcnRQb2ludCwgY2VudGVyKTtcbiAgICAgICAgcmV0dXJuIG5ldyBBcmMoY2VudGVyLCByYWRpdXMsIHN0YXJ0UmFkaWFuLCBlbmRSYWRpYW4sIGlzQ2xvY2t3aXNlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6K6+572u5ZyG5byn5ZyG5b+DXG4gICAgICogQHBhcmFtIGNlbnRlciDlnIblv4PlnZDmoIdcbiAgICAgKiBAcmV0dXJucyDlvZPliY3lnIblvKdcbiAgICAgKi9cbiAgICBzZXRDZW50ZXIoY2VudGVyKSB7XG4gICAgICAgIHRoaXMuY2VudGVyLnNldChjZW50ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICog6K6+572u5ZyG5byn5Y2K5b6EXG4gICAgICogQHBhcmFtIHJhZGl1cyDljYrlvoRcbiAgICAgKiBAcmV0dXJucyDlvZPliY3lnIblvKdcbiAgICAgKi9cbiAgICBzZXRSYWRpdXMocmFkaXVzKSB7XG4gICAgICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICog6K6+572u5ZyG5byn55qE6LW35aeL6KeSXG4gICAgICogQHBhcmFtIHJhZGlhbiDotbflp4vop5LnmoTop5LluqZcbiAgICAgKiBAcmV0dXJucyDlvZPliY3lnIblvKdcbiAgICAgKi9cbiAgICBzZXRTdGFydFJhZGlhbihyYWRpYW4pIHtcbiAgICAgICAgdGhpcy5zdGFydFJhZGlhbiA9IHJhZGlhbjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuvue9ruWchuW8p+eahOe7iOatouinklxuICAgICAqIEBwYXJhbSByYWRpYW4g57uI5q2i6KeS55qE6KeS5bqmXG4gICAgICogQHJldHVybnMg5b2T5YmN5ZyG5bynXG4gICAgICovXG4gICAgc2V0RW5kUmFkaWFuKHJhZGlhbikge1xuICAgICAgICB0aGlzLmVuZFJhZGlhbiA9IHJhZGlhbjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuvue9ruWchuW8p+eahOaWueWQke+8iOaYr+WQpumhuuaXtumSiO+8iVxuICAgICAqIEBwYXJhbSB2YWx1ZSDmmK/lkKbpobrml7bpkohcbiAgICAgKiBAcmV0dXJucyDlvZPliY3lnIblvKdcbiAgICAgKi9cbiAgICBzZXRDbG9ja3dpc2UodmFsdWUpIHtcbiAgICAgICAgdGhpcy5pc0Nsb2Nrd2lzZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICog5aSN5Yi25b2T5YmN5ZyG5bynXG4gICAgICpcbiAgICAgKiBDbG9uZXMgdGhpcyBhcmMgdG8gYSBuZXcgYXJjXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyDmlrDnmoTlnIblvKfvvIhBIG5ldyBBcmPvvIlcbiAgICAgKi9cbiAgICBjbG9uZSgpIHtcbiAgICAgICAgY29uc3QgeyBjZW50ZXIsIHJhZGl1cywgc3RhcnRSYWRpYW46IHN0YXJ0UmFkaWFuLCBlbmRSYWRpYW46IGVuZFJhZGlhbiwgaXNDbG9ja3dpc2UgfSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgQXJjKGNlbnRlci5jbG9uZSgpLCByYWRpdXMsIHN0YXJ0UmFkaWFuLCBlbmRSYWRpYW4sIGlzQ2xvY2t3aXNlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bmz56e75ZyG5bynXG4gICAgICogQHBhcmFtIHYg5bmz56e75ZCR6YePXG4gICAgICogQHJldHVybnMg5paw55qE5ZyG5byn5a+56LGhXG4gICAgICovXG4gICAgdHJhbnNsYXRlKHYpIHtcbiAgICAgICAgLy8gdG9kbyDor7jlpoIgbGluZSBjaXJjbGUgYXJjIOetiSB0cmFuc2xhdGUg5o6l5Y+j77yM5bqU6K+l6YO95Lul5bmz56e76Ieq6Lqr55qE6ZyA5rGC77yM5omA5Lul6L+Z5Liq5o6l5Y+j6K6+6K6h5oiQ5pSv5oyB5pS55Y+Y6Ieq6LqrL+i/lOWbnuaWsOWAvCDkuKTnp43pgInmi6lcbiAgICAgICAgY29uc3QgeyBjZW50ZXIsIHJhZGl1cywgc3RhcnRSYWRpYW4sIGVuZFJhZGlhbiwgaXNDbG9ja3dpc2UgfSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgQXJjKGNlbnRlci5hZGQodiksIHJhZGl1cywgc3RhcnRSYWRpYW4sIGVuZFJhZGlhbiwgaXNDbG9ja3dpc2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDnu5XlnIblv4Pml4vovazlnIblvKdcbiAgICAgKiBAcGFyYW0gcmFkaWFuIOaXi+i9rOinkuW6pu+8iOato+aWueWQkeS4uuWchuW8p+aWueWQke+8iVxuICAgICAqIEByZXR1cm5zIOaWsOeahOWchuW8p+WvueixoVxuICAgICAqL1xuICAgIHJvdGF0ZShyYWRpYW4pIHtcbiAgICAgICAgLy8gdG9kbyDpnIDmsYLlkIwgdHJhbnNsYXRlXG4gICAgICAgIC8vIHRvZG8gcmFkaWFuIOaWueWQkeiuvuiuoeWGjeiAg+iZkeS4gOS4i1xuICAgICAgICBjb25zdCB7IGNlbnRlciwgcmFkaXVzLCBzdGFydFJhZGlhbiwgZW5kUmFkaWFuLCBpc0Nsb2Nrd2lzZSB9ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBBcmMoY2VudGVyLmNsb25lKCksIHJhZGl1cywgc3RhcnRSYWRpYW4gKyByYWRpYW4sIGVuZFJhZGlhbiArIHJhZGlhbiwgaXNDbG9ja3dpc2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlnYfliIblnIblvKfnmoTlvKfluqZcbiAgICAgKlxuICAgICAqIFRoZSByYWRpYW4gb2YgYW4gZXZlbmx5IGRpdmlkZWQgYXJjXG4gICAgICovXG4gICAgZ2V0IG1pZFJhZGlhbigpIHtcbiAgICAgICAgLy8gdG9kbyDlpITnkIbliLAgMCB+IDJQSVxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydFJhZGlhbiArIHRoaXMucmFkaWFuIC8gMjtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5ZyG5byn5byn5ZGo5LiK55qE5Lit54K5XG4gICAgICpcbiAgICAgKiBUaGUgbWlkcG9pbnQgb2YgdGhlIGFyY1xuICAgICAqL1xuICAgIGdldCBtaWRQb2ludCgpIHtcbiAgICAgICAgY29uc3QgeyBjZW50ZXIsIHJhZGl1cywgbWlkUmFkaWFuLCBpc0Nsb2Nrd2lzZSB9ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHV0aWxzXzEuVXRpbHMuQ2lyY2xlLmdldFBvaW50QnlBbmdsZShjZW50ZXIsIHJhZGl1cywgbWlkUmFkaWFuLCBpc0Nsb2Nrd2lzZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWchuW8p+eahOW8gOWPo+W8p+W6plxuICAgICAqXG4gICAgICogVGhlIHJhZGlhbiBvZiB0aGUgYXJjXG4gICAgICovXG4gICAgZ2V0IHJhZGlhbigpIHtcbiAgICAgICAgLy8gdG9kbyDov5nph4zkvLzkuY7lubbkuI3og73kv53or4EgZGlmZiDlnKggMCDvvZ4gMlBJIOWGhVxuICAgICAgICBjb25zdCBkaWZmUmFkaWFuID0gdGhpcy5lbmRSYWRpYW4gLSB0aGlzLnN0YXJ0UmFkaWFuO1xuICAgICAgICByZXR1cm4gZGlmZlJhZGlhbiA8IDAgPyBjb25zdF8xLlRXT19QSSArIGRpZmZSYWRpYW4gOiBkaWZmUmFkaWFuO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlnIblvKfotbfngrlcbiAgICAgKlxuICAgICAqIFRoZSBzdGFydGluZyBwb2ludCBvZiB0aGUgYXJjXG4gICAgICovXG4gICAgZ2V0IHN0YXJ0UG9pbnQoKSB7XG4gICAgICAgIGNvbnN0IHsgY2VudGVyLCByYWRpdXMsIHN0YXJ0UmFkaWFuLCBpc0Nsb2Nrd2lzZSB9ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHV0aWxzXzEuVXRpbHMuQ2lyY2xlLmdldFBvaW50QnlBbmdsZShjZW50ZXIsIHJhZGl1cywgc3RhcnRSYWRpYW4sIGlzQ2xvY2t3aXNlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5ZyG5byn57uI54K5XG4gICAgICpcbiAgICAgKiBUaGUgZW5kaW5nIHBvaW50IG9mIHRoZSBhcmNcbiAgICAgKi9cbiAgICBnZXQgZW5kUG9pbnQoKSB7XG4gICAgICAgIGNvbnN0IHsgY2VudGVyLCByYWRpdXMsIGVuZFJhZGlhbiwgaXNDbG9ja3dpc2UgfSA9IHRoaXM7XG4gICAgICAgIHJldHVybiB1dGlsc18xLlV0aWxzLkNpcmNsZS5nZXRQb2ludEJ5QW5nbGUoY2VudGVyLCByYWRpdXMsIGVuZFJhZGlhbiwgaXNDbG9ja3dpc2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDliKTmlq3ngrnmmK/lkKblnKjlnIblvKfkuIpcbiAgICAgKlxuICAgICAqIEBwYXJhbSBwb2ludCDnm67moIfngrlcbiAgICAgKi9cbiAgICBpc1BvaW50T25BcmMocG9pbnQsIGRpc3RhbmNlVG9sID0gY29uc3RfMS5TSVhfREVDSU1BTF9UT0xFUkFOQ0UsIGFuZ2xlVG9sID0gY29uc3RfMS5TSVhfREVDSU1BTF9UT0xFUkFOQ0UpIHtcbiAgICAgICAgY29uc3QgeyBjZW50ZXIsIHJhZGl1cywgaXNDbG9ja3dpc2UgfSA9IHRoaXM7XG4gICAgICAgIGlmIChNYXRoLmFicyh1dGlsc18xLlV0aWxzLlZlY3RvcjIuZGlzdGFuY2UocG9pbnQsIGNlbnRlcikgLSByYWRpdXMpIDw9IGRpc3RhbmNlVG9sKSB7XG4gICAgICAgICAgICBjb25zdCBhbmdsZSA9IHV0aWxzXzEuVXRpbHMuQ2lyY2xlLmdldEFuZ2xlQnlQb2ludChjZW50ZXIsIHBvaW50LCBpc0Nsb2Nrd2lzZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc0FuZ2xlSW5zaWRlQXJjKGFuZ2xlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWIpOaWreeCueaYr+WQpuWcqOWchuW8p+WGhe+8iOaJh+W9ouWGhe+8iVxuICAgICAqXG4gICAgICogQHBhcmFtIHBvaW50XG4gICAgICovXG4gICAgaXNQb2ludEluc2lkZUFyYyhwb2ludCwgaW5jbHVkZUJvcmRlciA9IGZhbHNlLCBkaXN0YW5jZVRvbCA9IGNvbnN0XzEuU0lYX0RFQ0lNQUxfVE9MRVJBTkNFLCBhbmdsZVRvbCA9IGNvbnN0XzEuU0lYX0RFQ0lNQUxfVE9MRVJBTkNFKSB7XG4gICAgICAgIGNvbnN0IHsgY2VudGVyLCByYWRpdXMsIGlzQ2xvY2t3aXNlIH0gPSB0aGlzO1xuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IHV0aWxzXzEuVXRpbHMuVmVjdG9yMi5kaXN0YW5jZShwb2ludCwgY2VudGVyKTtcbiAgICAgICAgY29uc3QgaXNJblJhbmdlID0gaW5jbHVkZUJvcmRlciA/IGRpc3RhbmNlIDw9IHJhZGl1cyArIGRpc3RhbmNlVG9sIDogZGlzdGFuY2UgPCByYWRpdXM7XG4gICAgICAgIGlmIChpc0luUmFuZ2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gdXRpbHNfMS5VdGlscy5DaXJjbGUuZ2V0QW5nbGVCeVBvaW50KGNlbnRlciwgcG9pbnQsIGlzQ2xvY2t3aXNlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzQW5nbGVJbnNpZGVBcmMoYW5nbGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Yik5pat6KeS5bqm5piv5ZCm5Zyo5ZyG5byn6KeS5bqm6IyD5Zu05YaFXG4gICAgICogQHBhcmFtIGFuZ2xlXG4gICAgICovXG4gICAgaXNBbmdsZUluc2lkZUFyYyhhbmdsZSwgdG9sZXJhbmNlID0gY29uc3RfMS5TSVhfREVDSU1BTF9UT0xFUkFOQ0UpIHtcbiAgICAgICAgY29uc3QgeyBzdGFydFJhZGlhbiwgZW5kUmFkaWFuIH0gPSB0aGlzO1xuICAgICAgICBpZiAoZW5kUmFkaWFuID49IHN0YXJ0UmFkaWFuKSB7XG4gICAgICAgICAgICByZXR1cm4gYW5nbGUgPj0gc3RhcnRSYWRpYW4gLSB0b2xlcmFuY2UgJiYgYW5nbGUgPD0gZW5kUmFkaWFuICsgdG9sZXJhbmNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhbmdsZSA+PSBzdGFydFJhZGlhbiAtIHRvbGVyYW5jZSB8fCBhbmdsZSA8PSBlbmRSYWRpYW4gKyB0b2xlcmFuY2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiOt+WPluWchuW8p+eahOaVo+eCuembhlxuICAgICAqXG4gICAgICogQHBhcmFtIGxlbmd0aCDopoHnlKjlpJrlsJHkuKrmlaPngrnooajnpLrlnIblvKdcbiAgICAgKi9cbiAgICB0b1BvaW50cyhsZW5ndGgpIHtcbiAgICAgICAgY29uc3QgcG9pbnRzID0gW107XG4gICAgICAgIC8vIOiHs+WwkeimgeeUqCAyIOS4queCueaJjeiDveihqOekuuWchuW8p1xuICAgICAgICBpZiAobGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgY29uc3Qgc3RlcCA9IHRoaXMucmFkaWFuIC8gKGxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gdGhpcy5zdGFydFJhZGlhbiArIHN0ZXAgKiBpO1xuICAgICAgICAgICAgICAgIHBvaW50cy5wdXNoKHV0aWxzXzEuVXRpbHMuQ2lyY2xlLmdldFBvaW50QnlBbmdsZSh0aGlzLmNlbnRlciwgdGhpcy5yYWRpdXMsIGFuZ2xlLCB0aGlzLmlzQ2xvY2t3aXNlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBvaW50cztcbiAgICB9XG59XG5leHBvcnRzLkFyYyA9IEFyYztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Cb3gyID0gdm9pZCAwO1xuY29uc3QgY29uc3RfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb25zdFwiKTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHNcIik7XG5jb25zdCB2ZWN0b3IyXzEgPSByZXF1aXJlKFwiLi4vdmVjdG9yMlwiKTtcbi8qKlxuICog6KGo56S65LiA5Liq5LqM57u05bmz6Z2i5Lit55qEIEFBQkIg55uS5a2QXG4gKlxuICogICstLS0tLS0tLS0rXG4gKiAgfCAgICAgICAgIHxcbiAqICB8ICAgICAgICAgfFxuICogIHwgICAgICAgICB8XG4gKiAgKy0tLS0tLS0tLStcbiAqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBib3VuZGluZyBib3ggaW4gVHdvLWRpbWVuc2lvbmFsIGNvb3JkaW5hdGUgc3lzdGVtXG4gKi9cbmNsYXNzIEJveDIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQm94MiDnmoTmnIDlsI/pobbngrnvvIjlt6bkuIvop5LvvIlcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubWluID0gbmV3IHZlY3RvcjJfMS5WZWN0b3IyKGNvbnN0XzEuWkVSTywgY29uc3RfMS5aRVJPKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJveDIg55qE5pyA5aSn6aG254K577yI5Y+z5LiK6KeS77yJXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1heCA9IG5ldyB2ZWN0b3IyXzEuVmVjdG9yMihjb25zdF8xLlpFUk8sIGNvbnN0XzEuWkVSTyk7XG4gICAgICAgIGNvbnN0IFttaW4sIG1heF0gPSBhcmd1bWVudHM7XG4gICAgICAgIGlmIChtaW4gJiYgbWF4KSB7XG4gICAgICAgICAgICB0aGlzLm1pbiA9IG1pbi5jbG9uZSgpO1xuICAgICAgICAgICAgdGhpcy5tYXggPSBtYXguY2xvbmUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDorqHnrpfljIXlm7TmiYDmnInngrnnmoTmnIDlsI8gQm94MlxuICAgICAqXG4gICAgICogQ2FsY3VsYXRlIHRoZSBzbWFsbGVzdCBCb3gyIHN1cnJvdW5kaW5nIGFsbCBwb2ludHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBwb2ludHMg55uu5qCH54K5XG4gICAgICogQHJldHVybnMgQSBCb3gyXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZUJ5UG9pbnRzKHBvaW50cykge1xuICAgICAgICBjb25zdCB7IG1pblgsIG1pblksIG1heFgsIG1heFkgfSA9IHBvaW50cy5yZWR1Y2UoKGJveCwgcG9pbnQpID0+IHtcbiAgICAgICAgICAgIGxldCB7IG1pblgsIG1pblksIG1heFgsIG1heFkgfSA9IGJveDtcbiAgICAgICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gcG9pbnQ7XG4gICAgICAgICAgICBpZiAoeCA8IG1pblgpIHtcbiAgICAgICAgICAgICAgICBib3gubWluWCA9IHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoeCA+IG1heFgpIHtcbiAgICAgICAgICAgICAgICBib3gubWF4WCA9IHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoeSA8IG1pblkpIHtcbiAgICAgICAgICAgICAgICBib3gubWluWSA9IHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoeSA+IG1heFkpIHtcbiAgICAgICAgICAgICAgICBib3gubWF4WSA9IHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYm94O1xuICAgICAgICB9LCB7IG1pblg6IEluZmluaXR5LCBtaW5ZOiBJbmZpbml0eSwgbWF4WDogLUluZmluaXR5LCBtYXhZOiAtSW5maW5pdHkgfSk7XG4gICAgICAgIHJldHVybiBuZXcgQm94MihuZXcgdmVjdG9yMl8xLlZlY3RvcjIobWluWCwgbWluWSksIG5ldyB2ZWN0b3IyXzEuVmVjdG9yMihtYXhYLCBtYXhZKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOagueaNruWHoOS9leS/oeaBr+iuoeeul+S4gOS4qiBCb3gyXG4gICAgICpcbiAgICAgKiBDYWxjdWxhdGUgdGhlIEJveDIgYmFzZSBvbiBnZW9tZXRyaWMgaW5mb3JtYXRpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjZW50ZXIg5Lit5b+D54K5XG4gICAgICogQHBhcmFtIHNpemUg5bC65a+4XG4gICAgICogQHJldHVybnMgQSBCb3gyXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZUJ5R2VvbWV0cnkoY2VudGVyLCBzaXplKSB7XG4gICAgICAgIGNvbnN0IGhhbGZTaXplID0gc2l6ZS5kaXZpZGUoMik7XG4gICAgICAgIGNvbnN0IG1pbiA9IGNlbnRlci5zdWIoaGFsZlNpemUpO1xuICAgICAgICBjb25zdCBtYXggPSBjZW50ZXIuYWRkKGhhbGZTaXplKTtcbiAgICAgICAgcmV0dXJuIG5ldyBCb3gyKG1pbiwgbWF4KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6K6+572uIEJveDIg55qE5pyA5bCP6aG254K5XG4gICAgICogQHBhcmFtIG1pbiBWZWN0b3IyXG4gICAgICovXG4gICAgc2V0TWluKG1pbikge1xuICAgICAgICB0aGlzLm1pbiA9IG1pbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6K6+572uIEJveDIg55qE5pyA5aSn6aG254K5XG4gICAgICogQHBhcmFtIG1heCBWZWN0b3IyXG4gICAgICovXG4gICAgc2V0TWF4KG1heCkge1xuICAgICAgICB0aGlzLm1heCA9IG1heDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQm94MiDnmoQgNCDkuKrpobbngrlcbiAgICAgKlxuICAgICAqIOW9k+WJjeWdkOagh+ezu+S4uu+8jFjlkJHlt6bkuLrmraPvvIxZ5ZCR5LiK5Li65q2j5pe277yM5YW2NOS4qumhtueCueebuOWvueS9jee9ruWmguS4i++8mlxuICAgICAqXG4gICAgICogIDMtLS0tLS0tLS0yXG4gICAgICogIHwgICAgICAgICB8XG4gICAgICogIHwgICAgICAgICB8XG4gICAgICogIHwgICAgICAgICB8XG4gICAgICogIDAtLS0tLS0tLS0xXG4gICAgICovXG4gICAgZ2V0IHBvaW50cygpIHtcbiAgICAgICAgY29uc3QgeyB4OiBtaW5YLCB5OiBtaW5ZIH0gPSB0aGlzLm1pbjtcbiAgICAgICAgY29uc3QgeyB4OiBtYXhYLCB5OiBtYXhZIH0gPSB0aGlzLm1heDtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIG5ldyB2ZWN0b3IyXzEuVmVjdG9yMihtaW5YLCBtaW5ZKSxcbiAgICAgICAgICAgIG5ldyB2ZWN0b3IyXzEuVmVjdG9yMihtYXhYLCBtaW5ZKSxcbiAgICAgICAgICAgIG5ldyB2ZWN0b3IyXzEuVmVjdG9yMihtYXhYLCBtYXhZKSxcbiAgICAgICAgICAgIG5ldyB2ZWN0b3IyXzEuVmVjdG9yMihtaW5YLCBtYXhZKSxcbiAgICAgICAgXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQm94MiDnmoTlsLrlr7hcbiAgICAgKi9cbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF4LnN1Yih0aGlzLm1pbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJveDIg55qE5Lit5b+D54K5XG4gICAgICovXG4gICAgZ2V0IGNlbnRlcigpIHtcbiAgICAgICAgcmV0dXJuIHV0aWxzXzEuVXRpbHMuVmVjdG9yMi5pbnRlcnBvbGF0ZSh0aGlzLm1pbiwgdGhpcy5tYXgsIDAuNSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOajgOafpeW9k+WJjSBCb3gyIOaYr+WQpuWQiOazlVxuICAgICAqL1xuICAgIGNoZWNrVmFsaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1heC54ID4gdGhpcy5taW4ueCAmJiB0aGlzLm1heC55ID4gdGhpcy5taW4ueTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Yik5pat54K55piv5ZCm5ZyoIEJveDIg5YaFXG4gICAgICogQHBhcmFtIHBvaW50XG4gICAgICovXG4gICAgaXNQb2ludEluQm94KHBvaW50LCB0b2xlcmFuY2UgPSBjb25zdF8xLlNJWF9ERUNJTUFMX1RPTEVSQU5DRSkge1xuICAgICAgICBjb25zdCBtYXhYID0gdGhpcy5tYXgueCArIHRvbGVyYW5jZTtcbiAgICAgICAgY29uc3QgbWF4WSA9IHRoaXMubWF4LnkgKyB0b2xlcmFuY2U7XG4gICAgICAgIGNvbnN0IG1pblggPSB0aGlzLm1pbi54IC0gdG9sZXJhbmNlO1xuICAgICAgICBjb25zdCBtaW5ZID0gdGhpcy5taW4ueSAtIHRvbGVyYW5jZTtcbiAgICAgICAgcmV0dXJuIHBvaW50LnggPD0gbWF4WCAmJiBwb2ludC54ID49IG1pblggJiYgcG9pbnQueSA8PSBtYXhZICYmIHBvaW50LnkgPj0gbWluWTtcbiAgICB9XG59XG5leHBvcnRzLkJveDIgPSBCb3gyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJveDMgPSB2b2lkIDA7XG5jb25zdCBjb25zdF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbnN0XCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlsc1wiKTtcbmNvbnN0IHZlY3RvcjNfMSA9IHJlcXVpcmUoXCIuLi92ZWN0b3IzXCIpO1xuLyoqXG4gKiDooajnpLrkuIDkuKrkuInnu7TlubPpnaLkuK3nmoQgQUFCQiDnm5LlrZBcbiAqXG4gKiAgICArLS0tLS0tLS0tK1xuICogICAvfCAgICAgICAgL3xcbiAqICAvIHwgICAgICAgLyB8XG4gKiArLS0tLS0tLS0tKyAgfFxuICogfCAgKy0tLS0tLXwtLStcbiAqIHwgLyAgICAgICB8IC9cbiAqIHwvICAgICAgICB8L1xuICogKy0tLS0tLS0tLStcbiAqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBib3VuZGluZyBib3ggaW4gVGhyZWUtZGltZW5zaW9uYWwgY29vcmRpbmF0ZSBzeXN0ZW1cbiAqL1xuY2xhc3MgQm94MyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCb3gzIOeahOacgOWwj+mhtueCuVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5taW4gPSBuZXcgdmVjdG9yM18xLlZlY3RvcjMoY29uc3RfMS5aRVJPLCBjb25zdF8xLlpFUk8pO1xuICAgICAgICAvKipcbiAgICAgICAgICogQm94MyDnmoTmnIDlpKfpobbngrlcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubWF4ID0gbmV3IHZlY3RvcjNfMS5WZWN0b3IzKGNvbnN0XzEuWkVSTywgY29uc3RfMS5aRVJPKTtcbiAgICAgICAgY29uc3QgW21pbiwgbWF4XSA9IGFyZ3VtZW50cztcbiAgICAgICAgaWYgKG1pbiAmJiBtYXgpIHtcbiAgICAgICAgICAgIHRoaXMubWluID0gbWluLmNsb25lKCk7XG4gICAgICAgICAgICB0aGlzLm1heCA9IG1heC5jbG9uZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuoeeul+WMheWbtOaJgOacieeCueeahOacgOWwjyBCb3gzXG4gICAgICpcbiAgICAgKiBDYWxjdWxhdGUgdGhlIHNtYWxsZXN0IEJveDMgc3Vycm91bmRpbmcgYWxsIHBvaW50c1xuICAgICAqXG4gICAgICogQHBhcmFtIHBvaW50cyDnm67moIfngrlcbiAgICAgKiBAcmV0dXJucyBBIEJveDNcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlQnlQb2ludHMocG9pbnRzKSB7XG4gICAgICAgIGNvbnN0IHsgbWluWCwgbWluWSwgbWluWiwgbWF4WCwgbWF4WSwgbWF4WiB9ID0gcG9pbnRzLnJlZHVjZSgoYm94LCBwb2ludCkgPT4ge1xuICAgICAgICAgICAgbGV0IHsgbWluWCwgbWluWSwgbWluWiwgbWF4WCwgbWF4WSwgbWF4WiB9ID0gYm94O1xuICAgICAgICAgICAgY29uc3QgeyB4LCB5LCB6IH0gPSBwb2ludDtcbiAgICAgICAgICAgIGlmICh4IDwgbWluWCkge1xuICAgICAgICAgICAgICAgIGJveC5taW5YID0geDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh4ID4gbWF4WCkge1xuICAgICAgICAgICAgICAgIGJveC5tYXhYID0geDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh5IDwgbWluWSkge1xuICAgICAgICAgICAgICAgIGJveC5taW5ZID0geTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh5ID4gbWF4WSkge1xuICAgICAgICAgICAgICAgIGJveC5tYXhZID0geTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh6IDwgbWluWikge1xuICAgICAgICAgICAgICAgIGJveC5taW5aID0gejtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh6ID4gbWF4Wikge1xuICAgICAgICAgICAgICAgIGJveC5tYXhaID0gejtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBib3g7XG4gICAgICAgIH0sIHsgbWluWDogSW5maW5pdHksIG1pblk6IEluZmluaXR5LCBtaW5aOiBJbmZpbml0eSwgbWF4WDogLUluZmluaXR5LCBtYXhZOiAtSW5maW5pdHksIG1heFo6IC1JbmZpbml0eSB9KTtcbiAgICAgICAgcmV0dXJuIG5ldyBCb3gzKG5ldyB2ZWN0b3IzXzEuVmVjdG9yMyhtaW5YLCBtaW5ZLCBtaW5aKSwgbmV3IHZlY3RvcjNfMS5WZWN0b3IzKG1heFgsIG1heFksIG1heFopKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5qC55o2u5Yeg5L2V5L+h5oGv6K6h566X5LiA5LiqIEJveDNcbiAgICAgKlxuICAgICAqIENhbGN1bGF0ZSB0aGUgQm94MyBiYXNlIG9uIGdlb21ldHJpYyBpbmZvcm1hdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIGNlbnRlciDkuK3lv4PngrlcbiAgICAgKiBAcGFyYW0gc2l6ZSDlsLrlr7hcbiAgICAgKiBAcmV0dXJucyBBIEJveDNcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlQnlHZW9tZXRyeShjZW50ZXIsIHNpemUpIHtcbiAgICAgICAgY29uc3QgaGFsZlNpemUgPSBzaXplLmRpdmlkZSgyKTtcbiAgICAgICAgY29uc3QgbWluID0gY2VudGVyLnN1YihoYWxmU2l6ZSk7XG4gICAgICAgIGNvbnN0IG1heCA9IGNlbnRlci5hZGQoaGFsZlNpemUpO1xuICAgICAgICByZXR1cm4gbmV3IEJveDMobWluLCBtYXgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDorr7nva4gQm94MyDnmoTmnIDlsI/pobbngrlcbiAgICAgKiBAcGFyYW0gbWluIFZlY3RvcjNcbiAgICAgKi9cbiAgICBzZXRNaW4obWluKSB7XG4gICAgICAgIHRoaXMubWluID0gbWluO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDorr7nva4gQm94MyDnmoTmnIDlpKfpobbngrlcbiAgICAgKiBAcGFyYW0gbWF4IFZlY3RvcjNcbiAgICAgKi9cbiAgICBzZXRNYXgobWF4KSB7XG4gICAgICAgIHRoaXMubWF4ID0gbWF4O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCb3gzIOeahCA4IOS4qumhtueCuVxuICAgICAqXG4gICAgICog5aaC5p6c5Z2Q5qCH57O75pa55ZCR5aaC5LiL77yaXG4gICAgICpcbiAgICAgKiAgWSAgIFpcbiAgICAgKiAgfCAgL1xuICAgICAqICB8IC9cbiAgICAgKiAgfC9cbiAgICAgKiAgKy0tLS0tLS0tLS0gWFxuICAgICAqXG4gICAgICog5YiZ6aG254K56aG65bqP5aaC5LiL77yaXG4gICAgICpcbiAgICAgKiAgICA3LS0tLS0tLS0tNlxuICAgICAqICAgL3wgICAgICAgIC98XG4gICAgICogIC8gfCAgICAgICAvIHxcbiAgICAgKiAzLS0tLS0tLS0tMiAgfFxuICAgICAqIHwgIDQtLS0tLS18LS01XG4gICAgICogfCAvICAgICAgIHwgL1xuICAgICAqIHwvICAgICAgICB8L1xuICAgICAqIDAtLS0tLS0tLS0xXG4gICAgICovXG4gICAgZ2V0IHBvaW50cygpIHtcbiAgICAgICAgY29uc3QgeyB4OiBtaW5YLCB5OiBtaW5ZLCB6OiBtaW5aIH0gPSB0aGlzLm1pbjtcbiAgICAgICAgY29uc3QgeyB4OiBtYXhYLCB5OiBtYXhZLCB6OiBtYXhaIH0gPSB0aGlzLm1heDtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIG5ldyB2ZWN0b3IzXzEuVmVjdG9yMyhtaW5YLCBtaW5ZLCBtaW5aKSxcbiAgICAgICAgICAgIG5ldyB2ZWN0b3IzXzEuVmVjdG9yMyhtYXhYLCBtaW5ZLCBtaW5aKSxcbiAgICAgICAgICAgIG5ldyB2ZWN0b3IzXzEuVmVjdG9yMyhtYXhYLCBtYXhZLCBtaW5aKSxcbiAgICAgICAgICAgIG5ldyB2ZWN0b3IzXzEuVmVjdG9yMyhtaW5YLCBtYXhZLCBtaW5aKSxcbiAgICAgICAgICAgIG5ldyB2ZWN0b3IzXzEuVmVjdG9yMyhtaW5YLCBtaW5ZLCBtYXhaKSxcbiAgICAgICAgICAgIG5ldyB2ZWN0b3IzXzEuVmVjdG9yMyhtYXhYLCBtaW5ZLCBtYXhaKSxcbiAgICAgICAgICAgIG5ldyB2ZWN0b3IzXzEuVmVjdG9yMyhtYXhYLCBtYXhZLCBtYXhaKSxcbiAgICAgICAgICAgIG5ldyB2ZWN0b3IzXzEuVmVjdG9yMyhtaW5YLCBtYXhZLCBtYXhaKSxcbiAgICAgICAgXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQm94MyDnmoTlsLrlr7hcbiAgICAgKi9cbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF4LnN1Yih0aGlzLm1pbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJveDMg55qE5Lit5b+D54K5XG4gICAgICovXG4gICAgZ2V0IGNlbnRlcigpIHtcbiAgICAgICAgcmV0dXJuIHV0aWxzXzEuVXRpbHMuVmVjdG9yMy5pbnRlcnBvbGF0ZSh0aGlzLm1pbiwgdGhpcy5tYXgsIDAuNSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOajgOafpeW9k+WJjSBCb3gzIOaYr+WQpuWQiOazlVxuICAgICAqL1xuICAgIGNoZWNrVmFsaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1heC54ID4gdGhpcy5taW4ueCAmJiB0aGlzLm1heC55ID4gdGhpcy5taW4ueSAmJiB0aGlzLm1heC56ID4gdGhpcy5taW4uejtcbiAgICB9XG59XG5leHBvcnRzLkJveDMgPSBCb3gzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNpcmNsZSA9IHZvaWQgMDtcbmNvbnN0IGNvbnN0XzEgPSByZXF1aXJlKFwiLi4vLi4vY29uc3RcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzXCIpO1xuY29uc3QgbGluZTJfMSA9IHJlcXVpcmUoXCIuLi9saW5lMlwiKTtcbmNvbnN0IHZlY3RvcjJfMSA9IHJlcXVpcmUoXCIuLi92ZWN0b3IyXCIpO1xuLyoqXG4gKiDooajnpLrkuoznu7TkuJbnlYzkuK3nmoTkuIDkuKrlnIZcbiAqL1xuY2xhc3MgQ2lyY2xlIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gY2VudGVyIOWchuW/g1xuICAgICAqIEBwYXJhbSByYWRpdXMg5Y2K5b6EXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY2VudGVyLCByYWRpdXMpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOWchuW/g1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jZW50ZXIgPSBuZXcgdmVjdG9yMl8xLlZlY3RvcjIoY29uc3RfMS5aRVJPLCBjb25zdF8xLlpFUk8pO1xuICAgICAgICAvKipcbiAgICAgICAgICog5Y2K5b6EXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJhZGl1cyA9IGNvbnN0XzEuWkVSTztcbiAgICAgICAgdGhpcy5jZW50ZXIgPSBjZW50ZXIgfHwgdGhpcy5jZW50ZXI7XG4gICAgICAgIGlmIChyYWRpdXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog6YCa6L+H5LiN6YeN5aSN55qE5LiJ5Liq54K55p6E6YCg5LiA5Liq5ZyGXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcDEg54K5MVxuICAgICAqIEBwYXJhbSBwMiDngrkyXG4gICAgICogQHBhcmFtIHAzIOeCuTNcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlQnlUaHJlZVBvaW50KHAxLCBwMiwgcDMpIHtcbiAgICAgICAgY29uc3QgbDEgPSBuZXcgbGluZTJfMS5MaW5lMihwMSwgcDIpO1xuICAgICAgICBjb25zdCBsMiA9IG5ldyBsaW5lMl8xLkxpbmUyKHAyLCBwMyk7XG4gICAgICAgIGNvbnN0IGRpYW1ldGVyMSA9IHV0aWxzXzEuVXRpbHMuTGluZTIuY2FsY1BlcnBlbmRpY3VsYXJUaHJvdWdoUG9pbnQobDEsIGwxLmNlbnRlcik7XG4gICAgICAgIGNvbnN0IGRpYW1ldGVyMiA9IHV0aWxzXzEuVXRpbHMuTGluZTIuY2FsY1BlcnBlbmRpY3VsYXJUaHJvdWdoUG9pbnQobDIsIGwyLmNlbnRlcik7XG4gICAgICAgIGNvbnN0IGNlbnRlciA9IHV0aWxzXzEuVXRpbHMuTGluZTIubGluZUludGVyc2VjdExpbmUoZGlhbWV0ZXIxLCBkaWFtZXRlcjIpO1xuICAgICAgICBpZiAoIWNlbnRlcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgcG9pbnRzIGNhbiBub3QgZnJvbSBhIGNpcmNsZScpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IHV0aWxzXzEuVXRpbHMuVmVjdG9yMi5kaXN0YW5jZShjZW50ZXIsIHAxKTtcbiAgICAgICAgcmV0dXJuIG5ldyBDaXJjbGUoY2VudGVyLCByYWRpdXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDorr7nva7lnIblv4NcbiAgICAgKiBAcGFyYW0gY2VudGVyIOWchuW/g1xuICAgICAqIEByZXR1cm5zIOW9k+WJjSBjaXJjbGVcbiAgICAgKi9cbiAgICBzZXRDZW50ZXIoY2VudGVyKSB7XG4gICAgICAgIHRoaXMuY2VudGVyLnNldChjZW50ZXIueCwgY2VudGVyLnkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICog6K6+572u5Y2K5b6EXG4gICAgICogQHBhcmFtIHJhZGl1cyDljYrlvoRcbiAgICAgKiBAcmV0dXJucyDlvZPliY0gY2lyY2xlXG4gICAgICovXG4gICAgc2V0UmFkaXVzKHJhZGl1cykge1xuICAgICAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWkjeWItuW9k+WJjSBDaXJjbGVcbiAgICAgKi9cbiAgICBjbG9uZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDaXJjbGUodGhpcy5jZW50ZXIuY2xvbmUoKSwgdGhpcy5yYWRpdXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlubPnp7vlnIZcbiAgICAgKiBAcGFyYW0gdiDlubPnp7vlkJHph49cbiAgICAgKiBAcmV0dXJucyDlubPnp7vlkI7nmoTmlrDlnIZcbiAgICAgKi9cbiAgICB0cmFuc2xhdGUodikge1xuICAgICAgICByZXR1cm4gbmV3IENpcmNsZSh0aGlzLmNlbnRlci5hZGQodiksIHRoaXMucmFkaXVzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog54K55piv5ZCm5Zyo5ZyG5ZGo5LiKXG4gICAgICogQHBhcmFtIHBvaW50IOebruagh+eCuVxuICAgICAqIEBwYXJhbSB0b2xlcmFuY2Ug6K+v5beuXG4gICAgICovXG4gICAgaXNQb2ludE9uQ2lyY2xlKHBvaW50LCB0b2xlcmFuY2UgPSBjb25zdF8xLlNJWF9ERUNJTUFMX1RPTEVSQU5DRSkge1xuICAgICAgICByZXR1cm4gTWF0aC5hYnModXRpbHNfMS5VdGlscy5WZWN0b3IyLmRpc3RhbmNlKHBvaW50LCB0aGlzLmNlbnRlcikgLSB0aGlzLnJhZGl1cykgPD0gdG9sZXJhbmNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDngrnmmK/lkKblnKjlnIblhoVcbiAgICAgKiBAcGFyYW0gcG9pbnQg55uu5qCH54K5XG4gICAgICogQHBhcmFtIGluY2x1ZGVCb3JkZXIg6IyD5Zu05piv5ZCm5YyF5ZCr5ZyG5ZGoXG4gICAgICogQHBhcmFtIHRvbGVyYW5jZSDor6/lt65cbiAgICAgKi9cbiAgICBpc1BvaW50SW5zaWRlQ2lyY2xlKHBvaW50LCBpbmNsdWRlQm9yZGVyID0gZmFsc2UsIHRvbGVyYW5jZSA9IGNvbnN0XzEuU0lYX0RFQ0lNQUxfVE9MRVJBTkNFKSB7XG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gdXRpbHNfMS5VdGlscy5WZWN0b3IyLmRpc3RhbmNlKHBvaW50LCB0aGlzLmNlbnRlcik7XG4gICAgICAgIHJldHVybiBpbmNsdWRlQm9yZGVyID8gZGlzdGFuY2UgPD0gdGhpcy5yYWRpdXMgKyB0b2xlcmFuY2UgOiBkaXN0YW5jZSA8IHRoaXMucmFkaXVzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDojrflj5blnIblkajnmoTmlaPngrnpm4ZcbiAgICAgKiBAcGFyYW0gbGVuZ3RoIOebruagh+eahOaVo+eCueaVsOmHj1xuICAgICAqIEByZXR1cm5zIOaVo+eCuembhlxuICAgICAqL1xuICAgIHRvUG9pbnRzKGxlbmd0aCkge1xuICAgICAgICBjb25zdCBwb2ludHMgPSBbXTtcbiAgICAgICAgLy8g6Iez5bCR6KaB55SoIDMg5Liq54K55omN6IO96KGo56S65ZyG5ZGoXG4gICAgICAgIGlmIChsZW5ndGggPiAyKSB7XG4gICAgICAgICAgICBjb25zdCBzdGVwID0gY29uc3RfMS5UV09fUEkgLyBsZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYW5nbGUgPSBzdGVwICogaTtcbiAgICAgICAgICAgICAgICBwb2ludHMucHVzaCh1dGlsc18xLlV0aWxzLkNpcmNsZS5nZXRQb2ludEJ5QW5nbGUodGhpcy5jZW50ZXIsIHRoaXMucmFkaXVzLCBhbmdsZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwb2ludHM7XG4gICAgfVxufVxuZXhwb3J0cy5DaXJjbGUgPSBDaXJjbGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRWxsaXBzZSA9IHZvaWQgMDtcbmNvbnN0IHZlY3RvcjJfMSA9IHJlcXVpcmUoXCIuLi92ZWN0b3IyXCIpO1xuLyoqXG4gKiDooajnpLrkuoznu7Tnqbrpl7TnmoTmpK3lnIZcbiAqL1xuY2xhc3MgRWxsaXBzZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiDmpK3lnIblnIblv4NcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2VudGVyID0gbmV3IHZlY3RvcjJfMS5WZWN0b3IyKDAsIDApO1xuICAgICAgICAvKipcbiAgICAgICAgICog5qSt5ZyG5qiq6L205Y2K5b6EXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJ4ID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOakreWchue6tei9tOWNiuW+hFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yeSA9IDA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiDmpK3lnIbnmoTml4vovazvvIjlvKfluqbvvIlcbiAgICAgICAgICpcbiAgICAgICAgICog6buY6K6k77yaMFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yb3RhdGUgPSAwO1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAzKSB7XG4gICAgICAgICAgICBjb25zdCBbY2VudGVyLCByeCwgcnksIHJvdGF0ZV0gPSBhcmd1bWVudHM7XG4gICAgICAgICAgICB0aGlzLmNlbnRlciA9IG5ldyB2ZWN0b3IyXzEuVmVjdG9yMihjZW50ZXIueCwgY2VudGVyLnkpO1xuICAgICAgICAgICAgdGhpcy5yeCA9IHJ4O1xuICAgICAgICAgICAgdGhpcy5yeSA9IHJ5O1xuICAgICAgICAgICAgaWYgKHJvdGF0ZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3RhdGUgPSByb3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog6YCa6L+H54Sm54K55ZKM5Yiw54Sm54K555qE6Led56a75p2l55Sf5oiQ5LiA5Liq5qSt5ZyGXG4gICAgICogQHBhcmFtIGYxIOeEpueCuTFcbiAgICAgKiBAcGFyYW0gZjIg54Sm54K5MlxuICAgICAqIEBwYXJhbSBkaXN0YW5jZSDliLDkuKTkuKrnhKbngrnnmoTot53nprvkuYvlkoxcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlQnlGb2NpKGYxLCBmMiwgZGlzdGFuY2UpIHtcbiAgICAgICAgY29uc3QgYSA9IGRpc3RhbmNlIC8gMjtcbiAgICAgICAgY29uc3QgYyA9IGYxLnN1YihmMikubGVuZ3RoIC8gMjtcbiAgICAgICAgY29uc3QgY2VudGVyID0gZjEuYWRkKGYyKS5zdWIoMik7XG4gICAgICAgIGNvbnN0IHJ4ID0gYTtcbiAgICAgICAgY29uc3QgcnkgPSBNYXRoLnNxcnQoYSAqIGEgLSBjICogYyk7XG4gICAgICAgIGNvbnN0IHJvdGF0ZSA9IGYyLnN1YihmMSkuYW5nbGU7XG4gICAgICAgIHJldHVybiBuZXcgRWxsaXBzZShjZW50ZXIsIHJ4LCByeSwgcm90YXRlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6K6+572u5qSt5ZyG5ZyG5b+DXG4gICAgICogQHBhcmFtIGNlbnRlciDlnIblvaJcbiAgICAgKiBAcmV0dXJucyDlvZPliY0gRWxsaXBzZVxuICAgICAqL1xuICAgIHNldENlbnRlcihjZW50ZXIpIHtcbiAgICAgICAgY29uc3QgeyB4OiBjeCwgeTogY3kgfSA9IHRoaXMuY2VudGVyO1xuICAgICAgICBjb25zdCB7IHggPSBjeCwgeSA9IGN5IH0gPSBjZW50ZXI7XG4gICAgICAgIHRoaXMuY2VudGVyLnNldCh4LCB5KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuvue9ruakreWchuaoqui9tOWNiuW+hFxuICAgICAqIEBwYXJhbSByeCDmpK3lnIbmqKrovbTljYrlvoRcbiAgICAgKiBAcmV0dXJucyDlvZPliY0gRWxsaXBzZVxuICAgICAqL1xuICAgIHNldFJ4KHJ4KSB7XG4gICAgICAgIHRoaXMucnggPSByeDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuvue9ruakreWchue6tei9tOWNiuW+hFxuICAgICAqIEBwYXJhbSByeSDmpK3lnIbnurXovbTljYrlvoRcbiAgICAgKiBAcmV0dXJucyDlvZPliY0gRWxsaXBzZVxuICAgICAqL1xuICAgIHNldFJ5KHJ5KSB7XG4gICAgICAgIHRoaXMucnkgPSByeTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuvue9ruakreWchueahOaXi+i9rFxuICAgICAqIEBwYXJhbSByb3RhdGUg5qSt5ZyG55qE5peL6L2sXG4gICAgICogQHJldHVybnMg5b2T5YmNIEVsbGlwc2VcbiAgICAgKi9cbiAgICBzZXRSb3RhdGUocm90YXRlKSB7XG4gICAgICAgIHRoaXMucm90YXRlID0gcm90YXRlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICog5aSN5Yi25oyH5a6a5qSt5ZyG55qE5pWw5o2u5Yiw6Ieq6LqrXG4gICAgICogQHBhcmFtIGVsbGlwc2Ug55uu5qCH5qSt5ZyGXG4gICAgICogQHJldHVybnMg5b2T5YmNIEVsbGlwc2VcbiAgICAgKi9cbiAgICBjb3B5KGVsbGlwc2UpIHtcbiAgICAgICAgY29uc3QgeyBjZW50ZXIsIHJ4LCByeSwgcm90YXRlIH0gPSBlbGxpcHNlO1xuICAgICAgICB0aGlzLmNlbnRlci5zZXQoY2VudGVyLngsIGNlbnRlci55KTtcbiAgICAgICAgdGhpcy5yeCA9IHJ4O1xuICAgICAgICB0aGlzLnJ5ID0gcnk7XG4gICAgICAgIHRoaXMucm90YXRlID0gcm90YXRlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICog5aSN5Yi25b2T5YmN5qSt5ZyGXG4gICAgICogQHJldHVybnMg5paw55qE5qSt5ZyGXG4gICAgICovXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIGNvbnN0IHsgY2VudGVyLCByeCwgcnksIHJvdGF0ZSB9ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBFbGxpcHNlKGNlbnRlciwgcngsIHJ5LCByb3RhdGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDliKTmlq3ngrnmmK/lkKbmpK3lnIblhoVcbiAgICAgKiBAcGFyYW0gcG9pbnQg55uu5qCH54K5XG4gICAgICpcbiAgICAgKiBAdG9kbyDlpoLkvZXlop7liqDor6/lt647XG4gICAgICogQHRvZG8g5ouG5oiQ5Lik5Liq5o6l5Y+jIE9uIHwgSW5zaWRlID9cbiAgICAgKi9cbiAgICBpc1BvaW50SW5zaWRlRWxsaXBzZShwb2ludCkge1xuICAgICAgICAvKipcbiAgICAgICAgICog5qSt5ZyG5Z2Q5qCH5pa556iL77yaeF4yIC8gYV4yICsgeV4yIC8gYl4yID0gMSAoeCwgeSDmjIfku6UgY2VudGVyIOS4uuWOn+eCueeahOWdkOagh+ezuylcbiAgICAgICAgICpcbiAgICAgICAgICog5pWF5qSt5ZyG5YaF55qE54K56ZyA6KaB5ruh6LazICh4IC0gY2VudGVyLngpXjIgLyBhXjIgKyAoeSAtIGNlbnRlci54KV4yIC8gYl4yIDw9IDFcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IHsgY2VudGVyLCByeCwgcnkgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gY2VudGVyO1xuICAgICAgICBjb25zdCB7IHg6IHB4LCB5OiBweSB9ID0gcG9pbnQ7XG4gICAgICAgIHJldHVybiBNYXRoLnBvdyhweCAtIHgsIDIpIC8gTWF0aC5wb3cocngsIDIpICsgTWF0aC5wb3cocHkgLSB5LCAyKSAvIE1hdGgucG93KHJ5LCAyKSA8PSAxO1xuICAgIH1cbn1cbmV4cG9ydHMuRWxsaXBzZSA9IEVsbGlwc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTGluZVNpZGUgPSBleHBvcnRzLkxpbmUyID0gdm9pZCAwO1xuY29uc3QgbnVtYmVyXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tbW9uL251bWJlclwiKTtcbmNvbnN0IGNvbnN0XzEgPSByZXF1aXJlKFwiLi4vLi4vY29uc3RcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzXCIpO1xuY29uc3QgdmVjdG9yMl8xID0gcmVxdWlyZShcIi4uL3ZlY3RvcjJcIik7XG5jb25zdCBpbnRlcmZhY2VfMSA9IHJlcXVpcmUoXCIuL2ludGVyZmFjZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkxpbmVTaWRlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBpbnRlcmZhY2VfMS5MaW5lU2lkZTsgfSB9KTtcbi8qKlxuICog6KGo56S65LqM57u05LiW55WM55qE5LiA5p2h57q/XG4gKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgbGluZSBpbiBUd28tZGltZW5zaW9uYWwgY29vcmRpbmF0ZSBzeXN0ZW1cbiAqL1xuY2xhc3MgTGluZTIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICog57q/55qE6LW354K5XG4gICAgICAgICAqXG4gICAgICAgICAqIFN0YXJ0aW5nIHBvaW50IG9mIGxpbmUgb3Igc2VnbWVudFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zdGFydCA9IG5ldyB2ZWN0b3IyXzEuVmVjdG9yMihjb25zdF8xLlpFUk8sIGNvbnN0XzEuWkVSTyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiDnur/nmoTnu4jngrlcbiAgICAgICAgICpcbiAgICAgICAgICogRW5kaW5nIHBvaW50IG9mIGxpbmUgb3Igc2VnbWVudFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5lbmQgPSBuZXcgdmVjdG9yMl8xLlZlY3RvcjIoY29uc3RfMS5aRVJPLCBjb25zdF8xLlpFUk8pO1xuICAgICAgICBjb25zdCBbcDEsIHAyXSA9IGFyZ3VtZW50cztcbiAgICAgICAgaWYgKHAxICYmIHAyKSB7XG4gICAgICAgICAgICB0aGlzLnNldChwMSwgcDIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuvue9rui1t+eCueWSjOe7iOeCuVxuICAgICAqXG4gICAgICogU2V0cyB0aGUgc3RhcnQgYW5kIHRoZSBlbmQgb2YgdGhpcyBsaW5lXG4gICAgICogQHBhcmFtIHN0YXJ0IFN0YXJ0aW5nIHBvaW50IG9mIGxpbmUgb3Igc2VnbWVudFxuICAgICAqIEBwYXJhbSBlbmQgRW5kaW5nIHBvaW50IG9mIGxpbmUgb3Igc2VnbWVudFxuICAgICAqIEByZXR1cm5zIOW9k+WJjeWunuS+iyAoVGhpcyBsaW5lKVxuICAgICAqL1xuICAgIHNldChzdGFydCwgZW5kKSB7XG4gICAgICAgIGlmIChzdGFydC5lcXVhbHMoZW5kKSkge1xuICAgICAgICAgICAgLy8g5Lik5Liq54K555qE5Z2Q5qCH5LiA6Ie077yM5peg5rOV5p6E5oiQ5LiA5p2h55u057q/XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBzdGFydCBwb2ludCAoJHtzdGFydC54fSwgJHtzdGFydC55fSkgYW5kIHRoZSBlbmQgcG9pbnQgKCR7ZW5kLnh9LCAke2VuZC55fSBhcmUgdGhlIHNhbWUgYW5kIGNhbm5vdCBmcm9tIGEgbGluZSlgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXJ0ID0gc3RhcnQuY2xvbmUoKTtcbiAgICAgICAgdGhpcy5lbmQgPSBlbmQuY2xvbmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuvue9rui1t+eCuVxuICAgICAqXG4gICAgICogU2V0cyB0aGUgc3RhcnQgb2YgdGhpcyBsaW5lXG4gICAgICogQHBhcmFtIHBvaW50IFN0YXJ0aW5nIHBvaW50IG9mIGxpbmUgb3Igc2VnbWVudFxuICAgICAqIEByZXR1cm5zIOW9k+WJjeWunuS+iyAoVGhpcyBsaW5lKVxuICAgICAqL1xuICAgIHNldFN0YXJ0KHBvaW50KSB7XG4gICAgICAgIGlmIChwb2ludC5lcXVhbHModGhpcy5lbmQpKSB7XG4gICAgICAgICAgICAvLyDkuKTkuKrngrnnmoTlnZDmoIfkuIDoh7TvvIzml6Dms5XmnoTmiJDkuIDmnaHnm7Tnur9cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHBvaW50ICgke3BvaW50Lnh9LCAke3BvaW50Lnl9KSBhbmQgdGhlIGVuZCBwb2ludCAoJHt0aGlzLmVuZC54fSwgJHt0aGlzLmVuZC55fSBhcmUgdGhlIHNhbWUgYW5kIGNhbm5vdCBmcm9tIGEgbGluZSlgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXJ0ID0gcG9pbnQuY2xvbmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuvue9rue7iOeCuVxuICAgICAqXG4gICAgICogU2V0cyB0aGUgZW5kIG9mIHRoaXMgbGluZVxuICAgICAqIEBwYXJhbSBwb2ludCBFbmRpbmcgcG9pbnQgb2YgbGluZSBvciBzZWdtZW50XG4gICAgICogQHJldHVybnMg5b2T5YmN5a6e5L6LIChUaGlzIGxpbmUpXG4gICAgICovXG4gICAgc2V0RW5kKHBvaW50KSB7XG4gICAgICAgIGlmIChwb2ludC5lcXVhbHModGhpcy5zdGFydCkpIHtcbiAgICAgICAgICAgIC8vIOS4pOS4queCueeahOWdkOagh+S4gOiHtO+8jOaXoOazleaehOaIkOS4gOadoeebtOe6v1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgcG9pbnQgKCR7cG9pbnQueH0sICR7cG9pbnQueX0pIGFuZCB0aGUgc3RhcnQgcG9pbnQgKCR7dGhpcy5zdGFydC54fSwgJHt0aGlzLnN0YXJ0Lnl9IGFyZSB0aGUgc2FtZSBhbmQgY2Fubm90IGZyb20gYSBsaW5lKWApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW5kID0gcG9pbnQuY2xvbmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOe6v+auteeahOmVv+W6plxuICAgICAqXG4gICAgICogR2V0cyB0aGUgbGVuZ3RoIG9mIHRoZSBjdXJyZW50IGxpbmVcbiAgICAgKi9cbiAgICBnZXQgbGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmQuc3ViKHRoaXMuc3RhcnQpLmxlbmd0aDtcbiAgICB9XG4gICAgLyoqXG4gICAgICog57q/5q616ZW/5bqm55qE5bmz5pa5XG4gICAgICpcbiAgICAgKiBHZXRzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGUgY3VycmVudCBsaW5lXG4gICAgICovXG4gICAgZ2V0IGxlbmd0aFNxKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmQuc3ViKHRoaXMuc3RhcnQpLmxlbmd0aFNxO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDnur/nmoTmlrnlkJEg77yI6LW354K5IC0+IOe7iOeCue+8iVxuICAgICAqXG4gICAgICogR2V0cyB0aGUgZGlyZWN0aW9uIG9mIHRoZSBjdXJyZW50IGxpbmUgKHN0YXJ0IC0+IGVuZClcbiAgICAgKi9cbiAgICBnZXQgZGlyZWN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmQuc3ViKHRoaXMuc3RhcnQpLm5vcm1hbGl6ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDnur/nmoTmlrnlkJHop5LluqZcbiAgICAgKlxuICAgICAqIEdldHMgdGhlIGFuZ2xlIG9mIHRoZSBjdXJyZW50IGxpbmUncyBkaXJlY3Rpb24gKHN0YXJ0IC0+IGVuZClcbiAgICAgKi9cbiAgICBnZXQgYW5nbGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpcmVjdGlvbi5hbmdsZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog57q/5q6155qE5Lit54K5XG4gICAgICpcbiAgICAgKiBHZXRzIHRoZSBjZW50ZXIgcG9pbnQgb2YgdGhlIGN1cnJlbnQgbGluZS5cbiAgICAgKi9cbiAgICBnZXQgY2VudGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcnBvbGF0ZSgwLjUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDnur/nmoTmraPkuqTlt6bmlrnlkJFcbiAgICAgKlxuICAgICAqIEdldHMgdGhlIGRpcmVjdGlvbiBvcnRob2dvbmFsIHRvIHRoZSBjdXJyZW50IGxpbmUgYW5kIHBvaW50aW5nIHRvIHRoZSBsZWZ0XG4gICAgICovXG4gICAgZ2V0IGxlZnREaXJlY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB1dGlsc18xLlV0aWxzLlZlY3RvcjIuZ2V0TGVmdERpcmVjdGlvbih0aGlzLmRpcmVjdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOe6v+eahOato+S6pOWPs+aWueWQkVxuICAgICAqXG4gICAgICogR2V0cyB0aGUgZGlyZWN0aW9uIG9ydGhvZ29uYWwgdG8gdGhlIGN1cnJlbnQgbGluZSBhbmQgcG9pbnRpbmcgdG8gdGhlIHJpZ2h0XG4gICAgICovXG4gICAgZ2V0IHJpZ2h0RGlyZWN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdXRpbHNfMS5VdGlscy5WZWN0b3IyLmdldFJpZ2h0RGlyZWN0aW9uKHRoaXMuZGlyZWN0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bmz56e757q/XG4gICAgICpcbiAgICAgKiBUcmFuc2xhdGUgdGhlIGN1cnJlbnQgbGluZVxuICAgICAqIEBwYXJhbSB2IFRoZSB2ZWN0b3IgdGhlIHRyYW5zbGF0aW9uXG4gICAgICogQHJldHVybnMgQSBuZXcgTGluZVxuICAgICAqL1xuICAgIHRyYW5zbGF0ZSh2KSB7XG4gICAgICAgIGNvbnN0IHsgc3RhcnQsIGVuZCB9ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5lMihzdGFydC5hZGQodiksIGVuZC5hZGQodikpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDojrflj5bngrnlnKjnur/nmoTlk6rkuIDkvqdcbiAgICAgKlxuICAgICAqIEdldHMgd2hpY2ggc2lkZSBvZiB0aGUgY3VycmVudCBsaW5lIHRoZSBwb2ludCBpcyBvblxuICAgICAqIEByZXR1cm5zIExpbmVTaWRlXG4gICAgICovXG4gICAgZ2V0U2lkZShwb2ludCwgdG9sZXJhbmNlID0gY29uc3RfMS5TSVhfREVDSU1BTF9UT0xFUkFOQ0UpIHtcbiAgICAgICAgY29uc3QgcHJvZHVjdCA9IHV0aWxzXzEuVXRpbHMuVmVjdG9yMi5jcm9zczModGhpcy5zdGFydCwgdGhpcy5lbmQsIHBvaW50KTtcbiAgICAgICAgaWYgKG51bWJlcl8xLk51bWJlclV0aWwuaXNFcXVhbChwcm9kdWN0LCAwLCB0b2xlcmFuY2UpKSB7XG4gICAgICAgICAgICByZXR1cm4gaW50ZXJmYWNlXzEuTGluZVNpZGUuT247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocHJvZHVjdCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBpbnRlcmZhY2VfMS5MaW5lU2lkZS5MZWZ0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnRlcmZhY2VfMS5MaW5lU2lkZS5SaWdodDtcbiAgICB9XG4gICAgLyoqXG4gICAgICog54K55piv5ZCm5Zyo55u057q/5LiKXG4gICAgICpcbiAgICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBwb2ludCBpcyBvbiB0aGUgbGluZVxuICAgICAqL1xuICAgIGlzUG9pbnRPbkxpbmUocG9pbnQsIHRvbGVyYW5jZSA9IGNvbnN0XzEuU0lYX0RFQ0lNQUxfVE9MRVJBTkNFKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERpc3RhbmNlKHBvaW50KSA8PSB0b2xlcmFuY2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOeCueaYr+WQpuWcqOe6v+auteS4ilxuICAgICAqXG4gICAgICogRGV0ZXJtaW5lIGlmIHRoZSBwb2ludCBpcyBvbiB0aGUgc2VnbWVudFxuICAgICAqL1xuICAgIGlzUG9pbnRPblNlZ21lbnQocG9pbnQsIHRvbGVyYW5jZSA9IGNvbnN0XzEuU0lYX0RFQ0lNQUxfVE9MRVJBTkNFKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERpc3RhbmNlKHBvaW50LCB0cnVlKSA8PSB0b2xlcmFuY2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiOt+WPlueCueWcqOe6v+S4iueahOaKleW9seeCuVxuICAgICAqXG4gICAgICogR2V0cyB0aGUgcHJvamVjdGVkIHBvaW50IG9mIHRoZSBwb2ludCBvbnRvIHRoZSBjdXJyZW50IGxpbmVcbiAgICAgKiBAcGFyYW0gcG9pbnQgdGFyZ2V0IHBvaW50IOebruagh+eCuVxuICAgICAqIEBwYXJhbSBpc1NlZ21lbnQgV2hldGhlciB0byB0cmVhdCB0aGUgY3VycmVudCBsaW5lIGFzIGEgc2VnbWVudCDmmK/lkKbnur/mrrVcbiAgICAgKiBAcGFyYW0gdXNlU2VnbWVudEVuZCBXaGVuIHRoZSBwcm9qZWN0aW9uIHBvaW50IGlzIGJleW9uZCB0aGUgbGluZSBzZWdtZW50LFxuICAgICAqIHVzZSB0aGUgZW5kIG9mIHRoZSBsaW5lIHNlZ21lbnQgYXMgdGhlIHByb2plY3Rpb24gcG9pbnQgKOW9k+aKleW9seeCuei2heWHuue6v+auteaXtu+8jOaYr+WQpuS9v+eUqOe6v+auteerr+eCueS9nOS4uuaKleW9seeCuSlcbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0ZWRQb2ludChwb2ludCwgaXNTZWdtZW50ID0gZmFsc2UsIHVzZVNlZ21lbnRFbmQgPSBmYWxzZSkge1xuICAgICAgICAvLyDlnKjpmanmrrXkuIrnmoTooajnjrDlj6/og73mmK8gdW5kZWZpbmVkXG4gICAgICAgIGNvbnN0IGFscGhhID0gdGhpcy5nZXRBbHBoYShwb2ludCk7XG4gICAgICAgIGlmIChpc1NlZ21lbnQpIHtcbiAgICAgICAgICAgIGlmIChhbHBoYSA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdXNlU2VnbWVudEVuZCA/IHRoaXMuc3RhcnQuY2xvbmUoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFscGhhID4gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB1c2VTZWdtZW50RW5kID8gdGhpcy5lbmQuY2xvbmUoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcnBvbGF0ZShhbHBoYSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiOt+WPlueCueWIsOe6v+eahOi3neemu1xuICAgICAqXG4gICAgICogR2V0cyB0aGUgZGlzdGFuY2UgZnJvbSB0aGUgcG9pbnQgdG8gdGhlIGN1cnJlbnQgbGluZVxuICAgICAqIEBwYXJhbSBwb2ludCB0YXJnZXQgcG9pbnRcbiAgICAgKiBAcGFyYW0gaXNTZWdtZW50IFdoZXRoZXIgdG8gdHJlYXQgdGhlIGN1cnJlbnQgbGluZSBhcyBhIHNlZ21lbnRcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuICAgIGdldERpc3RhbmNlKHBvaW50LCBpc1NlZ21lbnQgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBwcm9qZWN0aW9uID0gdGhpcy5nZXRQcm9qZWN0ZWRQb2ludChwb2ludCwgaXNTZWdtZW50LCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIHV0aWxzXzEuVXRpbHMuVmVjdG9yMi5kaXN0YW5jZShwb2ludCwgcHJvamVjdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWSjCBsaW5lIOaYr+WQpuW5s+ihjFxuICAgICAqXG4gICAgICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgbGluZSBhbmQgbGluZSBhcmVhIHBhcmFsbGVsXG4gICAgICovXG4gICAgaXNQYXJhbGxlbChsaW5lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpcmVjdGlvbi5pc1BhcmFsbGVsKGxpbmUuZGlyZWN0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5ZKMIGxpbmUg5piv5ZCm5q2j5Lqk5Z6C55u0XG4gICAgICpcbiAgICAgKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgY3VycmVudCBsaW5lIGFuZCBsaW5lIGFyZWEgb3J0aG9nb25hbFxuICAgICAqL1xuICAgIGlzT3J0aG9nb25hbChsaW5lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpcmVjdGlvbi5pc09ydGhvZ29uYWwobGluZS5kaXJlY3Rpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmmK/lkKbmsLTlubPnur9cbiAgICAgKlxuICAgICAqIERldGVybWluZSB3aGV0aGVyIHRoZSBjdXJyZW50IGxpbmUgaXMgYSBob3Jpem9udGFsIGxpbmVcbiAgICAgKi9cbiAgICBpc0hvcml6b250YWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpcmVjdGlvbi5lcXVhbHModmVjdG9yMl8xLlZlY3RvcjIuWF9ESVJFQ1RJT04pIHx8IHRoaXMuZGlyZWN0aW9uLmVxdWFscyh2ZWN0b3IyXzEuVmVjdG9yMi5YX0RJUkVDVElPTi5pbnZlcnNlKCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmmK/lkKbnq5bnm7Tnur9cbiAgICAgKlxuICAgICAqIERldGVybWluZSB3aGV0aGVyIHRoZSBjdXJyZW50IGxpbmUgaXMgYSB2ZXJ0aWNhbCBsaW5lXG4gICAgICovXG4gICAgaXNWZXJ0aWNhbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlyZWN0aW9uLmVxdWFscyh2ZWN0b3IyXzEuVmVjdG9yMi5ZX0RJUkVDVElPTikgfHwgdGhpcy5kaXJlY3Rpb24uZXF1YWxzKHZlY3RvcjJfMS5WZWN0b3IyLllfRElSRUNUSU9OLmludmVyc2UoKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuoeeul+eCueWcqOe6v+S4iueahOavlOS+i1xuICAgICAqXG4gICAgICogR2V0cyB0aGUgaW50ZXJwb2xhdGVkIG51bWJlclxuICAgICAqL1xuICAgIGdldEFscGhhKHBvaW50LCBpc1NlZ21lbnQgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBhbHBoYSA9IHV0aWxzXzEuVXRpbHMuVmVjdG9yMi5kb3QzKHRoaXMuc3RhcnQsIHRoaXMuZW5kLCBwb2ludCkgLyB0aGlzLmxlbmd0aFNxO1xuICAgICAgICBpZiAoaXNTZWdtZW50KSB7XG4gICAgICAgICAgICBpZiAoYWxwaGEgPiAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhbHBoYSA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWxwaGE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOagueaNrue6v+aAp+avlOS+i+iuoeeul+e6v+S4iueahOS4gOeCuVxuICAgICAqXG4gICAgICogR2V0cyBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHN0YXJ0IGFuZCBlbmQgb2YgdGhpcyBsaW5lXG4gICAgICogQHBhcmFtIGFscGhhIFswLCAxXVxuICAgICAqL1xuICAgIGludGVycG9sYXRlKGFscGhhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0LmFkZCh0aGlzLmRpcmVjdGlvbi5tdWx0aXBseSh0aGlzLmxlbmd0aCAqIGFscGhhKSk7XG4gICAgfVxufVxuZXhwb3J0cy5MaW5lMiA9IExpbmUyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkxpbmVTaWRlID0gdm9pZCAwO1xudmFyIExpbmVTaWRlO1xuKGZ1bmN0aW9uIChMaW5lU2lkZSkge1xuICAgIC8qKlxuICAgICAqIOWcqOe6v+eahOW3puS+p1xuICAgICAqL1xuICAgIExpbmVTaWRlW0xpbmVTaWRlW1wiTGVmdFwiXSA9IDBdID0gXCJMZWZ0XCI7XG4gICAgLyoqXG4gICAgICog5Zyo57q/55qE5Y+z5L6nXG4gICAgICovXG4gICAgTGluZVNpZGVbTGluZVNpZGVbXCJSaWdodFwiXSA9IDFdID0gXCJSaWdodFwiO1xuICAgIC8qKlxuICAgICAqIOWcqOe6v+S4ilxuICAgICAqL1xuICAgIExpbmVTaWRlW0xpbmVTaWRlW1wiT25cIl0gPSAyXSA9IFwiT25cIjtcbn0pKExpbmVTaWRlID0gZXhwb3J0cy5MaW5lU2lkZSB8fCAoZXhwb3J0cy5MaW5lU2lkZSA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTGluZTMgPSB2b2lkIDA7XG5jb25zdCBjb25zdF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbnN0XCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlsc1wiKTtcbmNvbnN0IHZlY3RvcjNfMSA9IHJlcXVpcmUoXCIuLi92ZWN0b3IzXCIpO1xuLyoqXG4gKiDooajnpLrkuInnu7TkuJbnlYznmoTkuIDmnaHnur9cbiAqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBsaW5lIGluIFRocmVlLWRpbWVuc2lvbmFsIGNvb3JkaW5hdGUgc3lzdGVtXG4gKi9cbmNsYXNzIExpbmUzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOe6v+eahOi1t+eCuVxuICAgICAgICAgKlxuICAgICAgICAgKiBTdGFydGluZyBwb2ludCBvZiBsaW5lIG9yIHNlZ21lbnRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc3RhcnQgPSBuZXcgdmVjdG9yM18xLlZlY3RvcjMoY29uc3RfMS5aRVJPLCBjb25zdF8xLlpFUk8pO1xuICAgICAgICAvKipcbiAgICAgICAgICog57q/55qE57uI54K5XG4gICAgICAgICAqXG4gICAgICAgICAqIEVuZGluZyBwb2ludCBvZiBsaW5lIG9yIHNlZ21lbnRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZW5kID0gbmV3IHZlY3RvcjNfMS5WZWN0b3IzKGNvbnN0XzEuWkVSTywgY29uc3RfMS5aRVJPKTtcbiAgICAgICAgY29uc3QgW3AxLCBwMl0gPSBhcmd1bWVudHM7XG4gICAgICAgIGlmIChwMSAmJiBwMikge1xuICAgICAgICAgICAgdGhpcy5zZXQocDEsIHAyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDorr7nva7otbfngrnlkoznu4jngrlcbiAgICAgKlxuICAgICAqIFNldHMgdGhlIHN0YXJ0IGFuZCB0aGUgZW5kIG9mIHRoaXMgbGluZVxuICAgICAqIEBwYXJhbSBzdGFydCBTdGFydGluZyBwb2ludCBvZiBsaW5lIG9yIHNlZ21lbnRcbiAgICAgKiBAcGFyYW0gZW5kIEVuZGluZyBwb2ludCBvZiBsaW5lIG9yIHNlZ21lbnRcbiAgICAgKiBAcmV0dXJucyDlvZPliY3lrp7kvosgKFRoaXMgbGluZSlcbiAgICAgKi9cbiAgICBzZXQoc3RhcnQsIGVuZCkge1xuICAgICAgICBpZiAoc3RhcnQuZXF1YWxzKGVuZCkpIHtcbiAgICAgICAgICAgIC8vIOS4pOS4queCueeahOWdkOagh+S4gOiHtO+8jOaXoOazleaehOaIkOS4gOadoeebtOe6v1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgc3RhcnQgcG9pbnQgKCR7c3RhcnQueH0sICR7c3RhcnQueX0sICR7c3RhcnQuen0pIGFuZCB0aGUgZW5kIHBvaW50ICgke2VuZC54fSwgJHtlbmQueX0gLCAke2VuZC56fSkgYXJlIHRoZSBzYW1lIGFuZCBjYW5ub3QgZnJvbSBhIGxpbmUpYCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGFydCA9IHN0YXJ0LmNsb25lKCk7XG4gICAgICAgIHRoaXMuZW5kID0gZW5kLmNsb25lKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDorr7nva7otbfngrlcbiAgICAgKlxuICAgICAqIFNldHMgdGhlIHN0YXJ0IG9mIHRoaXMgbGluZVxuICAgICAqIEBwYXJhbSBwb2ludCBTdGFydGluZyBwb2ludCBvZiBsaW5lIG9yIHNlZ21lbnRcbiAgICAgKiBAcmV0dXJucyDlvZPliY3lrp7kvosgKFRoaXMgbGluZSlcbiAgICAgKi9cbiAgICBzZXRTdGFydChwb2ludCkge1xuICAgICAgICBpZiAocG9pbnQuZXF1YWxzKHRoaXMuZW5kKSkge1xuICAgICAgICAgICAgLy8g5Lik5Liq54K555qE5Z2Q5qCH5LiA6Ie077yM5peg5rOV5p6E5oiQ5LiA5p2h55u057q/XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBwb2ludCAoJHtwb2ludC54fSwgJHtwb2ludC55fSwgJHtwb2ludC56fSkgYW5kIHRoZSBlbmQgcG9pbnQgKCR7dGhpcy5lbmQueH0sICR7dGhpcy5lbmQueX0gLCAke3RoaXMuZW5kLnp9KSBhcmUgdGhlIHNhbWUgYW5kIGNhbm5vdCBmcm9tIGEgbGluZSlgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXJ0ID0gcG9pbnQuY2xvbmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuvue9rue7iOeCuVxuICAgICAqXG4gICAgICogU2V0cyB0aGUgZW5kIG9mIHRoaXMgbGluZVxuICAgICAqIEBwYXJhbSBwb2ludCBFbmRpbmcgcG9pbnQgb2YgbGluZSBvciBzZWdtZW50XG4gICAgICogQHJldHVybnMg5b2T5YmN5a6e5L6LIChUaGlzIGxpbmUpXG4gICAgICovXG4gICAgc2V0RW5kKHBvaW50KSB7XG4gICAgICAgIGlmIChwb2ludC5lcXVhbHModGhpcy5zdGFydCkpIHtcbiAgICAgICAgICAgIC8vIOS4pOS4queCueeahOWdkOagh+S4gOiHtO+8jOaXoOazleaehOaIkOS4gOadoeebtOe6v1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgcG9pbnQgKCR7cG9pbnQueH0sICR7cG9pbnQueX0sICR7cG9pbnQuen0pIGFuZCB0aGUgc3RhcnQgcG9pbnQgKCR7dGhpcy5zdGFydC54fSwgJHt0aGlzLnN0YXJ0Lnl9ICwgJHt0aGlzLnN0YXJ0Lnp9KSBhcmUgdGhlIHNhbWUgYW5kIGNhbm5vdCBmcm9tIGEgbGluZSlgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVuZCA9IHBvaW50LmNsb25lKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDnur/mrrXnmoTplb/luqZcbiAgICAgKlxuICAgICAqIEdldHMgdGhlIGxlbmd0aCBvZiB0aGUgY3VycmVudCBsaW5lXG4gICAgICovXG4gICAgZ2V0IGxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5kLnN1Yih0aGlzLnN0YXJ0KS5sZW5ndGg7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOe6v+autemVv+W6pueahOW5s+aWuVxuICAgICAqXG4gICAgICogR2V0cyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgdGhlIGN1cnJlbnQgbGluZVxuICAgICAqL1xuICAgIGdldCBsZW5ndGhTcSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5kLnN1Yih0aGlzLnN0YXJ0KS5sZW5ndGhTcTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog57q/55qE5pa55ZCRIO+8iOi1t+eCuSAtPiDnu4jngrnvvIlcbiAgICAgKlxuICAgICAqIEdldHMgdGhlIGRpcmVjdGlvbiBvZiB0aGUgY3VycmVudCBsaW5lIChzdGFydCAtPiBlbmQpXG4gICAgICovXG4gICAgZ2V0IGRpcmVjdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5kLnN1Yih0aGlzLnN0YXJ0KS5ub3JtYWxpemUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog57q/5q6155qE5Lit54K5XG4gICAgICpcbiAgICAgKiBHZXRzIHRoZSBjZW50ZXIgcG9pbnQgb2YgdGhlIGN1cnJlbnQgbGluZS5cbiAgICAgKi9cbiAgICBnZXQgY2VudGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcnBvbGF0ZSgwLjUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlubPnp7vnur9cbiAgICAgKlxuICAgICAqIFRyYW5zbGF0ZSB0aGUgY3VycmVudCBsaW5lXG4gICAgICogQHBhcmFtIHYgVGhlIHZlY3RvciB0aGUgdHJhbnNsYXRpb25cbiAgICAgKiBAcmV0dXJucyBBIG5ldyBMaW5lXG4gICAgICovXG4gICAgdHJhbnNsYXRlKHYpIHtcbiAgICAgICAgY29uc3QgeyBzdGFydCwgZW5kIH0gPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmV3IExpbmUzKHN0YXJ0LmFkZCh2KSwgZW5kLmFkZCh2KSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiOt+WPlueCueWcqOe6v+S4iueahOaKleW9seeCuVxuICAgICAqXG4gICAgICogR2V0cyB0aGUgcHJvamVjdGVkIHBvaW50IG9mIHRoZSBwb2ludCBvbnRvIHRoZSBjdXJyZW50IGxpbmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSBwb2ludCDnm67moIfngrkgdGFyZ2V0IHBvaW50XG4gICAgICogQHBhcmFtIGlzU2VnbWVudCDmmK/lkKbnur/mrrUgV2hldGhlciB0byB0cmVhdCB0aGUgY3VycmVudCBsaW5lIGFzIGEgc2VnbWVudFxuICAgICAqIEBwYXJhbSB1c2VTZWdtZW50RW5kIOWcqOWwhuebtOe6v+inhuS4uue6v+auteeahOaDheWGteS4i++8jOWmguaenOaKleW9seeCueWcqOe6v+auteWklu+8jOaYr+i/lOWbnue6v+auteeahOerr+eCuei/mOaYryB1bmRlZmluZWQuIChXaGVuIHRoZSBwcm9qZWN0aW9uIHBvaW50IGlzIGJleW9uZCB0aGUgbGluZSBzZWdtZW50LFxuICAgICAqIHVzZSB0aGUgZW5kIG9mIHRoZSBsaW5lIHNlZ21lbnQgYXMgdGhlIHByb2plY3Rpb24gcG9pbnQpXG4gICAgICovXG4gICAgZ2V0UHJvamVjdGVkUG9pbnQocG9pbnQsIGlzU2VnbWVudCA9IGZhbHNlLCB1c2VTZWdtZW50RW5kID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgYWxwaGEgPSB0aGlzLmdldEFscGhhKHBvaW50KTtcbiAgICAgICAgaWYgKGlzU2VnbWVudCkge1xuICAgICAgICAgICAgaWYgKGFscGhhIDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB1c2VTZWdtZW50RW5kID8gdGhpcy5zdGFydC5jbG9uZSgpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYWxwaGEgPiAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVzZVNlZ21lbnRFbmQgPyB0aGlzLmVuZC5jbG9uZSgpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmludGVycG9sYXRlKGFscGhhKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6I635Y+W54K55Yiw57q/55qE6Led56a7XG4gICAgICpcbiAgICAgKiBHZXRzIHRoZSBkaXN0YW5jZSBmcm9tIHRoZSBwb2ludCB0byB0aGUgY3VycmVudCBsaW5lXG4gICAgICogQHBhcmFtIHBvaW50IHRhcmdldCBwb2ludFxuICAgICAqIEBwYXJhbSBpc1NlZ21lbnQgV2hldGhlciB0byB0cmVhdCB0aGUgY3VycmVudCBsaW5lIGFzIGEgc2VnbWVudFxuICAgICAqL1xuICAgIGdldERpc3RhbmNlKHBvaW50LCBpc1NlZ21lbnQgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBwcm9qZWN0aW9uID0gdGhpcy5nZXRQcm9qZWN0ZWRQb2ludChwb2ludCwgaXNTZWdtZW50LCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIHV0aWxzXzEuVXRpbHMuVmVjdG9yMy5kaXN0YW5jZShwb2ludCwgcHJvamVjdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOeCueaYr+WQpuWcqOebtOe6v+S4ilxuICAgICAqXG4gICAgICogRGV0ZXJtaW5lcyBpZiB0aGUgcG9pbnQgaXMgb24gdGhlIGxpbmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSBwb2ludCDnm67moIfngrlcbiAgICAgKiBAcGFyYW0gdG9sZXJhbmNlIOWuueW3rlxuICAgICAqL1xuICAgIGlzUG9pbnRPbkxpbmUocG9pbnQsIHRvbGVyYW5jZSA9IGNvbnN0XzEuU0lYX0RFQ0lNQUxfVE9MRVJBTkNFKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERpc3RhbmNlKHBvaW50KSA8IHRvbGVyYW5jZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog54K55piv5ZCm5Zyo57q/5q615LiKXG4gICAgICpcbiAgICAgKiBEZXRlcm1pbmUgaWYgdGhlIHBvaW50IGlzIG9uIHRoZSBzZWdtZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0gcG9pbnQg55uu5qCH54K5XG4gICAgICogQHBhcmFtIHRvbGVyYW5jZSDlrrnlt65cbiAgICAgKi9cbiAgICBpc1BvaW50T25TZWdtZW50KHBvaW50LCB0b2xlcmFuY2UgPSBjb25zdF8xLlNJWF9ERUNJTUFMX1RPTEVSQU5DRSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXN0YW5jZShwb2ludCwgdHJ1ZSkgPCB0b2xlcmFuY2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWSjCBsaW5lIOaYr+WQpuW5s+ihjFxuICAgICAqXG4gICAgICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgbGluZSBhbmQgbGluZSBhcmVhIHBhcmFsbGVsXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGluZSDnm67moIfnm7Tnur9cbiAgICAgKi9cbiAgICBpc1BhcmFsbGVsKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlyZWN0aW9uLmlzUGFyYWxsZWwobGluZS5kaXJlY3Rpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlkowgbGluZSDmmK/lkKbmraPkuqTlnoLnm7RcbiAgICAgKlxuICAgICAqIERldGVybWluZSB3aGV0aGVyIHRoZSBjdXJyZW50IGxpbmUgYW5kIGxpbmUgYXJlYSBvcnRob2dvbmFsXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGluZSDnm67moIfnm7Tnur9cbiAgICAgKi9cbiAgICBpc09ydGhvZ29uYWwobGluZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXJlY3Rpb24uaXNPcnRob2dvbmFsKGxpbmUuZGlyZWN0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVE9ET1xuICAgICAqIOWSjOW5s+mdouebuOS6pOeahOaOpeWPo++8jOetieW+heW5s+mdoueahOWHoOS9lee7k+aehOiuvuiuoVxuICAgICAqL1xuICAgIC8qKlxuICAgICAqIOiuoeeul+eCueWcqOe6v+S4iueahOavlOS+i1xuICAgICAqXG4gICAgICogR2V0cyB0aGUgaW50ZXJwb2xhdGVkIG51bWJlclxuICAgICAqXG4gICAgICogQHBhcmFtIHBvaW50IOebruagh+eCuVxuICAgICAqIEBwYXJhbSBpc1NlZ21lbnQg5piv5ZCm5bCG55u057q/5L2c5Li657q/5q616ICD6JmR77yI57q/5q6155qE5Y+W5YC86IyD5Zu05Y+q5pyJIFswLCAxXe+8iVxuICAgICAqL1xuICAgIGdldEFscGhhKHBvaW50LCBpc1NlZ21lbnQgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBhbHBoYSA9IHV0aWxzXzEuVXRpbHMuVmVjdG9yMy5kb3QzKHRoaXMuc3RhcnQsIHRoaXMuZW5kLCBwb2ludCkgLyB0aGlzLmxlbmd0aFNxO1xuICAgICAgICBpZiAoaXNTZWdtZW50KSB7XG4gICAgICAgICAgICBpZiAoYWxwaGEgPiAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhbHBoYSA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWxwaGE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOagueaNrue6v+aAp+avlOS+i+iuoeeul+e6v+S4iueahOS4gOeCuVxuICAgICAqXG4gICAgICogR2V0cyBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHN0YXJ0IGFuZCBlbmQgb2YgdGhpcyBsaW5lXG4gICAgICogQHBhcmFtIGFscGhhIFswLCAxXVxuICAgICAqL1xuICAgIGludGVycG9sYXRlKGFscGhhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0LmFkZCh0aGlzLmRpcmVjdGlvbi5tdWx0aXBseSh0aGlzLmxlbmd0aCAqIGFscGhhKSk7XG4gICAgfVxufVxuZXhwb3J0cy5MaW5lMyA9IExpbmUzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk1hdHJpeDMgPSB2b2lkIDA7XG5jb25zdCBNQVRSSVgzX1NJWkUgPSA5O1xuLyoqXG4gKiDooajnpLrkuIDkuKogMyB4IDMg55qE55+p6Zi1XG4gKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgdGhyZWUgYnkgdGhlcmUgbWF0cml4XG4gKi9cbmNsYXNzIE1hdHJpeDMge1xuICAgIC8qKlxuICAgICAqIFRoZSBtYXRyaXgzIGVudHJpZXMgYXJlIGluIHRoZSBmb2xsb3dpbmcgb3JkZXI6XG4gICAgICpcbiAgICAgKiAgbTExICBtMTIgIG0xM1xuICAgICAqXG4gICAgICogIG0yMSAgbTIyICBtMjNcbiAgICAgKlxuICAgICAqICBtMzEgIG0zMiAgbTMzXG4gICAgICpcbiAgICAgKiAgQGRlZmF1bHQgSWRlbnRpdHkgTWF0cml4XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobTExID0gMSwgbTEyID0gMCwgbTEzID0gMCwgbTIxID0gMCwgbTIyID0gMSwgbTIzID0gMCwgbTMxID0gMCwgbTMyID0gMCwgbTMzID0gMSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogRWxlbWVudHMgb2YgdGhlIG1hdHJpeFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IFtdO1xuICAgICAgICB0aGlzLmVsZW1lbnRzID0gW1xuICAgICAgICAgICAgbTExLCBtMTIsIG0xMyxcbiAgICAgICAgICAgIG0yMSwgbTIyLCBtMjMsXG4gICAgICAgICAgICBtMzEsIG0zMiwgbTMzLFxuICAgICAgICBdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDkvp3mrKHlsIbmr4/kuKrnn6npmLXkuZjotbfmnaVcbiAgICAgKlxuICAgICAqIE11bHRpcGxpZXMgdGhlIG1hdHJpY2VzXG4gICAgICovXG4gICAgc3RhdGljIG11bHRpcGx5TWF0cmljZXMobWF0cmljZXMpIHtcbiAgICAgICAgcmV0dXJuIG1hdHJpY2VzLnJlZHVjZSgoYSwgYikgPT4gYS5tdWx0aXBseShiKSwgTWF0cml4My5JZGVudGl0eSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOS+neasoeWwhuavj+S4quefqemYteW3puS5mOi1t+adpVxuICAgICAqXG4gICAgICogTXVsdGlwbGllcyB0aGUgbWF0cmljZXMgdG8gdGhlIGxlZnRcbiAgICAgKi9cbiAgICBzdGF0aWMgcHJlTXVsdGlwbHlNYXRyaWNlcyhtYXRyaWNlcykge1xuICAgICAgICByZXR1cm4gbWF0cmljZXMucmVkdWNlKChhLCBiKSA9PiBhLnByZU11bHRpcGx5KGIpLCBNYXRyaXgzLklkZW50aXR5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgdGhlIGFycmF5IHJlc3VsdCBtYSB4IG1iXG4gICAgICovXG4gICAgc3RhdGljIHByb2R1Y3QoYSwgYikge1xuICAgICAgICBjb25zdCBbYTExLCBhMTIsIGExMywgYTIxLCBhMjIsIGEyMywgYTMxLCBhMzIsIGEzMyxdID0gYS5lbGVtZW50cztcbiAgICAgICAgY29uc3QgW2IxMSwgYjEyLCBiMTMsIGIyMSwgYjIyLCBiMjMsIGIzMSwgYjMyLCBiMzMsXSA9IGIuZWxlbWVudHM7XG4gICAgICAgIGNvbnN0IG0xMSA9IGExMSAqIGIxMSArIGExMiAqIGIyMSArIGExMyAqIGIzMTtcbiAgICAgICAgY29uc3QgbTEyID0gYTExICogYjEyICsgYTEyICogYjIyICsgYTEzICogYjMyO1xuICAgICAgICBjb25zdCBtMTMgPSBhMTEgKiBiMTMgKyBhMTIgKiBiMjMgKyBhMTMgKiBiMzM7XG4gICAgICAgIGNvbnN0IG0yMSA9IGEyMSAqIGIxMSArIGEyMiAqIGIyMSArIGEyMyAqIGIzMTtcbiAgICAgICAgY29uc3QgbTIyID0gYTIxICogYjEyICsgYTIyICogYjIyICsgYTIzICogYjMyO1xuICAgICAgICBjb25zdCBtMjMgPSBhMjEgKiBiMTMgKyBhMjIgKiBiMjMgKyBhMjMgKiBiMzM7XG4gICAgICAgIGNvbnN0IG0zMSA9IGEzMSAqIGIxMSArIGEzMiAqIGIyMSArIGEzMyAqIGIzMTtcbiAgICAgICAgY29uc3QgbTMyID0gYTMxICogYjEyICsgYTMyICogYjIyICsgYTMzICogYjMyO1xuICAgICAgICBjb25zdCBtMzMgPSBhMzEgKiBiMTMgKyBhMzIgKiBiMjMgKyBhMzMgKiBiMzM7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBtMTEsIG0xMiwgbTEzLFxuICAgICAgICAgICAgbTIxLCBtMjIsIG0yMyxcbiAgICAgICAgICAgIG0zMSwgbTMyLCBtMzMsXG4gICAgICAgIF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuvue9ruefqemYteeahOWAvFxuICAgICAqXG4gICAgICogVGhlIG1hdHJpeDMgZW50cmllcyBhcmUgaW4gdGhlIGZvbGxvd2luZyBvcmRlcjpcbiAgICAgKlxuICAgICAqICBtMTEgIG0xMiAgbTEzXG4gICAgICpcbiAgICAgKiAgbTIxICBtMjIgIG0yM1xuICAgICAqXG4gICAgICogIG0zMSAgbTMyICBtMzNcbiAgICAgKi9cbiAgICBzZXQobTExLCBtMTIsIG0xMywgbTIxLCBtMjIsIG0yMywgbTMxLCBtMzIsIG0zMykge1xuICAgICAgICB0aGlzLmVsZW1lbnRzID0gW1xuICAgICAgICAgICAgbTExLCBtMTIsIG0xMyxcbiAgICAgICAgICAgIG0yMSwgbTIyLCBtMjMsXG4gICAgICAgICAgICBtMzEsIG0zMiwgbTMzLFxuICAgICAgICBdO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bCG5pWw57uE6K6+572u5Li655+p6Zi155qE5YC8XG4gICAgICpcbiAgICAgKiBTZXRzIHZhbHVlcyBvZiB0aGUgY3VycmVudCBtYXRyaXggYnkgYW4gYXJyYXlcbiAgICAgKiBAcGFyYW0gZWxlbWVudHMgQW4gYXJyYXkgb2YgbWF0cml4IGVsZW1lbnRzXG4gICAgICogQHBhcmFtIG9mZnNldCBPZmZzZXQgdG8gc3RhcnRcbiAgICAgKiBAcmV0dXJucyDlvZPliY3nn6npmLUgdGhpcyBtYXRyaXhcbiAgICAgKi9cbiAgICBmcm9tQXJyYXkoZWxlbWVudHMsIG9mZnNldCA9IDApIHtcbiAgICAgICAgLy8gZWxlbWVudHMg5Lit5LiN6LazIDkg5L2N55qE5bCG5L+d5oyB5Y6f5YC8XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IGVsZW1lbnRzLmxlbmd0aCAtIG9mZnNldCA8IE1BVFJJWDNfU0laRSA/IGVsZW1lbnRzLmxlbmd0aCAtIG9mZnNldCA6IE1BVFJJWDNfU0laRTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZWxlbWVudHNbaSArIG9mZnNldF07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzW2ldID0gZWxlbWVudHNbaSArIG9mZnNldF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWwhuefqemYteeahOWAvOi9rOaNouaIkOaVsOe7hOi+k+WHulxuICAgICAqXG4gICAgICogT3V0cHV0cyB0aGUgZWxlbWVudHMgb2YgdGhlIGN1cnJlbnQgbWF0cml4IGFzIGFuIGFycmF5XG4gICAgICovXG4gICAgdG9BcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIFsuLi50aGlzLmVsZW1lbnRzXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5qC55o2u5bmz56e75Y+Y5o2i6K6+572u55+p6Zi155qE5YC8XG4gICAgICpcbiAgICAgKiBTZXRzIHRoaXMgbWF0cml4IGZyb20gdHJhbnNsYXRlIHRyYW5zZm9ybVxuICAgICAqIEByZXR1cm5zIOW9k+WJjeefqemYtSB0aGlzIG1hdHJpeFxuICAgICAqL1xuICAgIGZyb21UcmFuc2xhdGUodikge1xuICAgICAgICB0aGlzLnNldCgxLCAwLCB2LngsIDAsIDEsIHYueSwgMCwgMCwgMSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmoLnmja7nvKnmlL7lj5jmjaLorr7nva7nn6npmLXnmoTlgLxcbiAgICAgKlxuICAgICAqIFNldHMgdGhpcyBtYXRyaXggZnJvbSBzY2FsZSB0cmFuc2Zvcm1cbiAgICAgKiBAcmV0dXJucyDlvZPliY3nn6npmLUgdGhpcyBtYXRyaXhcbiAgICAgKi9cbiAgICBmcm9tU2NhbGUodikge1xuICAgICAgICB0aGlzLnNldCh2LngsIDAsIDAsIDAsIHYueSwgMCwgMCwgMCwgMSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmoLnmja7ml4vovazlj5jmjaLorr7nva7nn6npmLXnmoTlgLxcbiAgICAgKlxuICAgICAqIFNldHMgdGhpcyBtYXRyaXggZnJvbSByb3RhdGUgdHJhbnNmb3JtXG4gICAgICogQHBhcmFtIHJhZGlhbiB0aGV0YSBSb3RhdGlvbiBhbmdsZSBpbiByYWRpYW5zLlxuICAgICAqIEByZXR1cm5zIOW9k+WJjeefqemYtSB0aGlzIG1hdHJpeFxuICAgICAqL1xuICAgIGZyb21Sb3RhdGUocmFkaWFuKSB7XG4gICAgICAgIGNvbnN0IGMgPSBNYXRoLmNvcyhyYWRpYW4pO1xuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkaWFuKTtcbiAgICAgICAgdGhpcy5zZXQoYywgLXMsIDAsIHMsIGMsIDAsIDAsIDAsIDEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bCG55+p6Zi1IG0g55qE5YC85ou36LSd57uZ5b2T5YmN55+p6Zi1XG4gICAgICpcbiAgICAgKiBDb3BpZXMgbSB0byB0aGUgY3VycmVudCBtYXRyaXhcbiAgICAgKiBAcmV0dXJucyDlvZPliY3nn6npmLUgdGhpcyBtYXRyaXhcbiAgICAgKi9cbiAgICBjb3B5KG0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJvbUFycmF5KG0udG9BcnJheSgpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5aSN5Yi25b2T5YmN55+p6Zi1XG4gICAgICpcbiAgICAgKiBDbG9uZXMgdGhlIGN1cnJlbnQgbWF0cml4IHRvIGEgbmV3IG1hdHJpeFxuICAgICAqIEByZXR1cm5zIEEgbmV3IG1hdHJpeFxuICAgICAqL1xuICAgIGNsb25lKCkge1xuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeDMoKS5mcm9tQXJyYXkodGhpcy50b0FycmF5KCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDkuZjnn6npmLUgbVxuICAgICAqXG4gICAgICogTXVsdGlwbGllcyB0aGUgY3VycmVudCBtYXRyaXggYnkgbSBNYXRyaXguXG4gICAgICogQHJldHVybnMg5paw55qE55+p6Zi1IChBIG5ldyBtYXRyaXgpXG4gICAgICovXG4gICAgbXVsdGlwbHkobSkge1xuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeDMoKS5mcm9tQXJyYXkoTWF0cml4My5wcm9kdWN0KHRoaXMsIG0pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bem5LmY55+p6Zi1IG1cbiAgICAgKlxuICAgICAqIE11bHRpcGxpZXMgdGhlIGN1cnJlbnQgbWF0cml4IHRvIHRoZSBsZWZ0IGJ5IG0gTWF0cml4XG4gICAgICogQHJldHVybnMg5paw55qE55+p6Zi1IChBIG5ldyBtYXRyaXgpXG4gICAgICovXG4gICAgcHJlTXVsdGlwbHkobSkge1xuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeDMoKS5mcm9tQXJyYXkoTWF0cml4My5wcm9kdWN0KG0sIHRoaXMpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5LmY5LiA5Liq5qCH6YePXG4gICAgICpcbiAgICAgKiBNdWx0aXBsaWVzIHRoaXMgbWF0cml4IGJ5IGEgbnVtYmVyO1xuICAgICAqIEByZXR1cm5zIOaWsOeahOefqemYtSAoQSBuZXcgbWF0cml4KVxuICAgICAqL1xuICAgIG11bHRpcGx5U2NhbGFyKHYpIHtcbiAgICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICAgIGNvbnN0IHRlID0gdGhpcy5lbGVtZW50cztcbiAgICAgICAgYXJyWzBdID0gdGVbMF0gKiB2O1xuICAgICAgICBhcnJbMV0gPSB0ZVsxXSAqIHY7XG4gICAgICAgIGFyclsyXSA9IHRlWzJdICogdjtcbiAgICAgICAgYXJyWzNdID0gdGVbM10gKiB2O1xuICAgICAgICBhcnJbNF0gPSB0ZVs0XSAqIHY7XG4gICAgICAgIGFycls1XSA9IHRlWzVdICogdjtcbiAgICAgICAgYXJyWzZdID0gdGVbNl0gKiB2O1xuICAgICAgICBhcnJbN10gPSB0ZVs3XSAqIHY7XG4gICAgICAgIGFycls4XSA9IHRlWzhdICogdjtcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXgzKCkuZnJvbUFycmF5KGFycik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOi9rOe9ruefqemYtVxuICAgICAqXG4gICAgICogVHJhbnNwb3NlcyB0aGlzIG1hdHJpeFxuICAgICAqIEByZXR1cm5zIOaWsOeahOefqemYtSAoQSBuZXcgbWF0cml4KVxuICAgICAqL1xuICAgIHRyYW5zcG9zZSgpIHtcbiAgICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICAgIGNvbnN0IHRlID0gdGhpcy5lbGVtZW50cztcbiAgICAgICAgYXJyWzBdID0gdGVbMF07XG4gICAgICAgIGFyclsxXSA9IHRlWzNdO1xuICAgICAgICBhcnJbMl0gPSB0ZVs2XTtcbiAgICAgICAgYXJyWzNdID0gdGVbMV07XG4gICAgICAgIGFycls0XSA9IHRlWzRdO1xuICAgICAgICBhcnJbNV0gPSB0ZVs3XTtcbiAgICAgICAgYXJyWzZdID0gdGVbMl07XG4gICAgICAgIGFycls3XSA9IHRlWzVdO1xuICAgICAgICBhcnJbOF0gPSB0ZVs4XTtcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXgzKCkuZnJvbUFycmF5KGFycik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuoeeul+mAhuefqemYtVxuICAgICAqXG4gICAgICogSW52ZXJ0cyB0aGlzIG1hdHJpeCDvvIjpgIbnn6npmLXvvIlcbiAgICAgKiBAcmV0dXJucyDmlrDnmoTnn6npmLUgKEEgbmV3IG1hdHJpeClcbiAgICAgKi9cbiAgICBpbnZlcnQoKSB7XG4gICAgICAgIGNvbnN0IGRldGVybWluYW50ID0gdGhpcy5kZXRlcm1pbmFudCgpO1xuICAgICAgICBpZiAoZGV0ZXJtaW5hbnQgPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBtYXRyaXggZGV0ZXJtaW5hbnQgaXMgemVyb1wiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBbbTExLCBtMTIsIG0xMywgbTIxLCBtMjIsIG0yMywgbTMxLCBtMzIsIG0zMyxdID0gdGhpcy5lbGVtZW50cztcbiAgICAgICAgY29uc3QgZCA9IDEgLyB0aGlzLmRldGVybWluYW50KCk7XG4gICAgICAgIGNvbnN0IG4xMSA9IChtMjIgKiBtMzMgLSBtMzIgKiBtMjMpICogZDtcbiAgICAgICAgY29uc3QgbjEyID0gLShtMTIgKiBtMzMgLSBtMzIgKiBtMTMpICogZDtcbiAgICAgICAgY29uc3QgbjEzID0gKG0xMiAqIG0yMyAtIG0yMiAqIG0xMykgKiBkO1xuICAgICAgICBjb25zdCBuMjEgPSAtKG0yMSAqIG0zMyAtIG0zMSAqIG0yMykgKiBkO1xuICAgICAgICBjb25zdCBuMjIgPSAobTExICogbTMzIC0gbTMxICogbTEzKSAqIGQ7XG4gICAgICAgIGNvbnN0IG4yMyA9IC0obTExICogbTIzIC0gbTIxICogbTEzKSAqIGQ7XG4gICAgICAgIGNvbnN0IG4zMSA9IChtMjEgKiBtMzIgLSBtMzEgKiBtMjIpICogZDtcbiAgICAgICAgY29uc3QgbjMyID0gLShtMTEgKiBtMzIgLSBtMzEgKiBtMTIpICogZDtcbiAgICAgICAgY29uc3QgbjMzID0gKG0xMSAqIG0yMiAtIG0yMSAqIG0xMikgKiBkO1xuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeDMobjExLCBuMTIsIG4xMywgbjIxLCBuMjIsIG4yMywgbjMxLCBuMzIsIG4zMyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuoeeul+ihjOWIl+W8j1xuICAgICAqXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgZGV0ZXJtaW5hbnQgb2YgdGhpcyBtYXRyaXgzICjooYzliJflvI8pXG4gICAgICovXG4gICAgZGV0ZXJtaW5hbnQoKSB7XG4gICAgICAgIGNvbnN0IFttMTEsIG0xMiwgbTEzLCBtMjEsIG0yMiwgbTIzLCBtMzEsIG0zMiwgbTMzLF0gPSB0aGlzLmVsZW1lbnRzO1xuICAgICAgICByZXR1cm4gbTExICogKG0yMiAqIG0zMyAtIG0zMiAqIG0yMylcbiAgICAgICAgICAgIC0gbTEyICogKG0yMSAqIG0zMyAtIG0zMSAqIG0yMylcbiAgICAgICAgICAgICsgbTEzICogKG0yMSAqIG0zMiAtIG0zMSAqIG0yMik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuoeeul+WcqOW9k+WJjeefqemYteeahOWfuuehgOS4iuWPoOWKoOW5s+enu+WPmOWMluWQjueahOefqemYtVxuICAgICAqXG4gICAgICogQXBwbGllcyB0cmFuc2xhdGUgdHJhbnNmb3JtIHRvIHRoaXMgbWF0cml4XG4gICAgICogQHJldHVybnMg5paw55qE55+p6Zi1IChBIG5ldyBtYXRyaXgpXG4gICAgICovXG4gICAgYXBwbHlUcmFuc2xhdGUodikge1xuICAgICAgICBjb25zdCBbbTExLCBtMTIsIG0xMywgbTIxLCBtMjIsIG0yMywgbTMxLCBtMzIsIG0zMyxdID0gdGhpcy5lbGVtZW50cztcbiAgICAgICAgY29uc3QgeyB4LCB5IH0gPSB2O1xuICAgICAgICBjb25zdCBhcnIgPSBbXTtcbiAgICAgICAgYXJyWzBdID0gbTExICsgbTMxICogeDtcbiAgICAgICAgYXJyWzFdID0gbTEyICsgbTMyICogeDtcbiAgICAgICAgYXJyWzJdID0gbTEzICsgbTMzICogeDtcbiAgICAgICAgYXJyWzNdID0gbTIxICsgbTMxICogeTtcbiAgICAgICAgYXJyWzRdID0gbTIyICsgbTMyICogeTtcbiAgICAgICAgYXJyWzVdID0gbTIzICsgbTMzICogeTtcbiAgICAgICAgYXJyWzZdID0gbTMxO1xuICAgICAgICBhcnJbN10gPSBtMzI7XG4gICAgICAgIGFycls4XSA9IG0zMztcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXgzKCkuZnJvbUFycmF5KGFycik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuoeeul+WcqOW9k+WJjeefqemYteeahOWfuuehgOS4iuWPoOWKoOe8qeaUvuWPmOWMluWQjueahOefqemYtVxuICAgICAqXG4gICAgICogQXBwbGllcyBzY2FsZSB0cmFuc2Zvcm0gdG8gdGhpcyBtYXRyaXhcbiAgICAgKiBAcmV0dXJucyDmlrDnmoTnn6npmLUgKEEgbmV3IG1hdHJpeClcbiAgICAgKi9cbiAgICBhcHBseVNjYWxlKHYpIHtcbiAgICAgICAgY29uc3QgW20xMSwgbTEyLCBtMTMsIG0yMSwgbTIyLCBtMjMsIG0zMSwgbTMyLCBtMzMsXSA9IHRoaXMuZWxlbWVudHM7XG4gICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gdjtcbiAgICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICAgIGFyclswXSA9IG0xMSAqIHg7XG4gICAgICAgIGFyclsxXSA9IG0xMiAqIHg7XG4gICAgICAgIGFyclsyXSA9IG0xMyAqIHg7XG4gICAgICAgIGFyclszXSA9IG0yMSAqIHk7XG4gICAgICAgIGFycls0XSA9IG0yMiAqIHk7XG4gICAgICAgIGFycls1XSA9IG0yMyAqIHk7XG4gICAgICAgIGFycls2XSA9IG0zMTtcbiAgICAgICAgYXJyWzddID0gbTMyO1xuICAgICAgICBhcnJbOF0gPSBtMzM7XG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4MygpLmZyb21BcnJheShhcnIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDorqHnrpflnKjlvZPliY3nn6npmLXnmoTln7rnoYDkuIrlj6DliqDml4vovazlj5jljJblkI7nmoTnn6npmLVcbiAgICAgKlxuICAgICAqIEFwcGxpZXMgcm90YXRlIHRyYW5zZm9ybSB0byB0aGlzIG1hdHJpeFxuICAgICAqIEBwYXJhbSByYWRpYW4gdGhldGEgUm90YXRpb24gYW5nbGUgaW4gcmFkaWFucy5cbiAgICAgKiBAcmV0dXJucyDmlrDnmoTnn6npmLUgKEEgbmV3IG1hdHJpeClcbiAgICAgKi9cbiAgICBhcHBseVJvdGF0ZShyYWRpYW4pIHtcbiAgICAgICAgY29uc3QgW20xMSwgbTEyLCBtMTMsIG0yMSwgbTIyLCBtMjMsIG0zMSwgbTMyLCBtMzMsXSA9IHRoaXMuZWxlbWVudHM7XG4gICAgICAgIGNvbnN0IGMgPSBNYXRoLmNvcyhyYWRpYW4pO1xuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkaWFuKTtcbiAgICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICAgIGFyclswXSA9IG0xMSAqIGMgLSBtMjEgKiBzO1xuICAgICAgICBhcnJbMV0gPSBtMTIgKiBjIC0gbTIyICogcztcbiAgICAgICAgYXJyWzJdID0gbTEzICogYyAtIG0yMyAqIHM7XG4gICAgICAgIGFyclszXSA9IG0xMSAqIHMgKyBtMjEgKiBjO1xuICAgICAgICBhcnJbNF0gPSBtMTIgKiBzICsgbTIyICogYztcbiAgICAgICAgYXJyWzVdID0gbTEzICogcyArIG0yMyAqIGM7XG4gICAgICAgIGFycls2XSA9IG0zMTtcbiAgICAgICAgYXJyWzddID0gbTMyO1xuICAgICAgICBhcnJbOF0gPSBtMzM7XG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4MygpLmZyb21BcnJheShhcnIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDliKTmlq3nn6npmLXmmK/lkKbnm7jnrYlcbiAgICAgKlxuICAgICAqIERldGVybWluZXMgd2hldGhlciB0aGUgY3VycmVudCBtYXRyaXggYW5kIG0gYXJlIGVxdWFsXG4gICAgICovXG4gICAgZXF1YWxzKG0pIHtcbiAgICAgICAgY29uc3QgbUFyciA9IG0udG9BcnJheSgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1BVFJJWDNfU0laRTsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbGVtZW50c1tpXSAhPT0gbUFycltpXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5leHBvcnRzLk1hdHJpeDMgPSBNYXRyaXgzO1xuLyoqXG4gKiDpm7bnn6npmLVcbiAqXG4gKiBaZXJvIE1hdHJpeDNcbiAqL1xuTWF0cml4My5aZXJvID0gbmV3IE1hdHJpeDMoMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCk7XG4vKipcbiAqIOWNleS9jeefqemYtVxuICpcbiAqIElkZW50aXR5IE1hdHJpeDNcbiAqL1xuTWF0cml4My5JZGVudGl0eSA9IG5ldyBNYXRyaXgzKDEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDEpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk1hdHJpeDQgPSB2b2lkIDA7XG5jb25zdCBNQVRSSVg0X1NJWkUgPSAxNjtcbi8qKlxuICog6KGo56S65LiA5LiqIDQgeCA0IOeahOefqemYtVxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgZm91ciBieSBmb3VyIG1hdHJpeFxuICovXG5jbGFzcyBNYXRyaXg0IHtcbiAgICAvKipcbiAgICAgKiBUaGUgTWF0cml4NCBlbnRyaWVzIGFyZSBpbiB0aGUgZm9sbG93aW5nIG9yZGVyOlxuICAgICAqXG4gICAgICogIG0xMSAgbTEyICBtMTMgbTE0XG4gICAgICpcbiAgICAgKiAgbTIxICBtMjIgIG0yMyBtMjRcbiAgICAgKlxuICAgICAqICBtMzEgIG0zMiAgbTMzIG0zNFxuICAgICAqXG4gICAgICogIG00MSAgbTQyICBtNDMgbTQ0XG4gICAgICpcbiAgICAgKiAgQGRlZmF1bHQgSWRlbnRpdHkgTWF0cml4XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobTExID0gMSwgbTEyID0gMCwgbTEzID0gMCwgbTE0ID0gMCwgbTIxID0gMCwgbTIyID0gMSwgbTIzID0gMCwgbTI0ID0gMCwgbTMxID0gMCwgbTMyID0gMCwgbTMzID0gMSwgbTM0ID0gMCwgbTQxID0gMCwgbTQyID0gMCwgbTQzID0gMCwgbTQ0ID0gMSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogRWxlbWVudHMgb2YgdGhlIG1hdHJpeFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IFtdO1xuICAgICAgICB0aGlzLmVsZW1lbnRzID0gW1xuICAgICAgICAgICAgbTExLCBtMTIsIG0xMywgbTE0LFxuICAgICAgICAgICAgbTIxLCBtMjIsIG0yMywgbTI0LFxuICAgICAgICAgICAgbTMxLCBtMzIsIG0zMywgbTM0LFxuICAgICAgICAgICAgbTQxLCBtNDIsIG00MywgbTQ0LFxuICAgICAgICBdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDkvp3mrKHlsIbmr4/kuKrnn6npmLXkuZjotbfmnaVcbiAgICAgKlxuICAgICAqIE11bHRpcGxpZXMgdGhlIG1hdHJpY2VzXG4gICAgICovXG4gICAgc3RhdGljIG11bHRpcGx5TWF0cmljZXMobWF0cmljZXMpIHtcbiAgICAgICAgcmV0dXJuIG1hdHJpY2VzLnJlZHVjZSgoYSwgYikgPT4gYS5tdWx0aXBseShiKSwgTWF0cml4NC5JZGVudGl0eSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOS+neasoeWwhuavj+S4quefqemYteW3puS5mOi1t+adpVxuICAgICAqXG4gICAgICogTXVsdGlwbGllcyB0aGUgbWF0cmljZXMgdG8gdGhlIGxlZnRcbiAgICAgKi9cbiAgICBzdGF0aWMgcHJlTXVsdGlwbHlNYXRyaWNlcyhtYXRyaWNlcykge1xuICAgICAgICByZXR1cm4gbWF0cmljZXMucmVkdWNlKChhLCBiKSA9PiBhLnByZU11bHRpcGx5KGIpLCBNYXRyaXg0LklkZW50aXR5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgdGhlIGFycmF5IHJlc3VsdCBtYSB4IG1iXG4gICAgICovXG4gICAgc3RhdGljIHByb2R1Y3QoYSwgYikge1xuICAgICAgICBjb25zdCBbYTExLCBhMTIsIGExMywgYTE0LCBhMjEsIGEyMiwgYTIzLCBhMjQsIGEzMSwgYTMyLCBhMzMsIGEzNCwgYTQxLCBhNDIsIGE0MywgYTQ0LF0gPSBhLmVsZW1lbnRzO1xuICAgICAgICBjb25zdCBbYjExLCBiMTIsIGIxMywgYjE0LCBiMjEsIGIyMiwgYjIzLCBiMjQsIGIzMSwgYjMyLCBiMzMsIGIzNCwgYjQxLCBiNDIsIGI0MywgYjQ0LF0gPSBiLmVsZW1lbnRzO1xuICAgICAgICBjb25zdCBtMTEgPSBhMTEgKiBiMTEgKyBhMTIgKiBiMjEgKyBhMTMgKiBiMzEgKyBhMTQgKiBiNDE7XG4gICAgICAgIGNvbnN0IG0xMiA9IGExMSAqIGIxMiArIGExMiAqIGIyMiArIGExMyAqIGIzMiArIGExNCAqIGI0MjtcbiAgICAgICAgY29uc3QgbTEzID0gYTExICogYjEzICsgYTEyICogYjIzICsgYTEzICogYjMzICsgYTE0ICogYjQzO1xuICAgICAgICBjb25zdCBtMTQgPSBhMTEgKiBiMTQgKyBhMTIgKiBiMjQgKyBhMTMgKiBiMzQgKyBhMTQgKiBiNDQ7XG4gICAgICAgIGNvbnN0IG0yMSA9IGEyMSAqIGIxMSArIGEyMiAqIGIyMSArIGEyMyAqIGIzMSArIGEyNCAqIGI0MTtcbiAgICAgICAgY29uc3QgbTIyID0gYTIxICogYjEyICsgYTIyICogYjIyICsgYTIzICogYjMyICsgYTI0ICogYjQyO1xuICAgICAgICBjb25zdCBtMjMgPSBhMjEgKiBiMTMgKyBhMjIgKiBiMjMgKyBhMjMgKiBiMzMgKyBhMjQgKiBiNDM7XG4gICAgICAgIGNvbnN0IG0yNCA9IGEyMSAqIGIxNCArIGEyMiAqIGIyNCArIGEyMyAqIGIzNCArIGEyNCAqIGI0NDtcbiAgICAgICAgY29uc3QgbTMxID0gYTMxICogYjExICsgYTMyICogYjIxICsgYTMzICogYjMxICsgYTM0ICogYjQxO1xuICAgICAgICBjb25zdCBtMzIgPSBhMzEgKiBiMTIgKyBhMzIgKiBiMjIgKyBhMzMgKiBiMzIgKyBhMzQgKiBiNDI7XG4gICAgICAgIGNvbnN0IG0zMyA9IGEzMSAqIGIxMyArIGEzMiAqIGIyMyArIGEzMyAqIGIzMyArIGEzNCAqIGI0MztcbiAgICAgICAgY29uc3QgbTM0ID0gYTMxICogYjE0ICsgYTMyICogYjI0ICsgYTMzICogYjM0ICsgYTM0ICogYjQ0O1xuICAgICAgICBjb25zdCBtNDEgPSBhNDEgKiBiMTEgKyBhNDIgKiBiMjEgKyBhNDMgKiBiMzEgKyBhNDQgKiBiNDE7XG4gICAgICAgIGNvbnN0IG00MiA9IGE0MSAqIGIxMiArIGE0MiAqIGIyMiArIGE0MyAqIGIzMiArIGE0NCAqIGI0MjtcbiAgICAgICAgY29uc3QgbTQzID0gYTQxICogYjEzICsgYTQyICogYjIzICsgYTQzICogYjMzICsgYTQ0ICogYjQzO1xuICAgICAgICBjb25zdCBtNDQgPSBhNDEgKiBiMTQgKyBhNDIgKiBiMjQgKyBhNDMgKiBiMzQgKyBhNDQgKiBiNDQ7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBtMTEsIG0xMiwgbTEzLCBtMTQsXG4gICAgICAgICAgICBtMjEsIG0yMiwgbTIzLCBtMjQsXG4gICAgICAgICAgICBtMzEsIG0zMiwgbTMzLCBtMzQsXG4gICAgICAgICAgICBtNDEsIG00MiwgbTQzLCBtNDQsXG4gICAgICAgIF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuvue9ruefqemYteeahOWAvFxuICAgICAqXG4gICAgICogVGhlIE1hdHJpeDQgZW50cmllcyBhcmUgaW4gdGhlIGZvbGxvd2luZyBvcmRlcjpcbiAgICAgKlxuICAgICAqICBtMTEgIG0xMiAgbTEzIG0xNFxuICAgICAqXG4gICAgICogIG0yMSAgbTIyICBtMjMgbTI0XG4gICAgICpcbiAgICAgKiAgbTMxICBtMzIgIG0zMyBtMzRcbiAgICAgKlxuICAgICAqICBtNDEgIG00MiAgbTQzIG00NFxuICAgICAqL1xuICAgIHNldChtMTEsIG0xMiwgbTEzLCBtMTQsIG0yMSwgbTIyLCBtMjMsIG0yNCwgbTMxLCBtMzIsIG0zMywgbTM0LCBtNDEsIG00MiwgbTQzLCBtNDQpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IFtcbiAgICAgICAgICAgIG0xMSwgbTEyLCBtMTMsIG0xNCxcbiAgICAgICAgICAgIG0yMSwgbTIyLCBtMjMsIG0yNCxcbiAgICAgICAgICAgIG0zMSwgbTMyLCBtMzMsIG0zNCxcbiAgICAgICAgICAgIG00MSwgbTQyLCBtNDMsIG00NCxcbiAgICAgICAgXTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWwhuaVsOe7hOiuvue9ruS4uuefqemYteeahOWAvFxuICAgICAqXG4gICAgICogU2V0cyB2YWx1ZXMgb2YgdGhlIGN1cnJlbnQgbWF0cml4IGJ5IGFuIGFycmF5XG4gICAgICogQHBhcmFtIGVsZW1lbnRzIEFuIGFycmF5IG9mIG1hdHJpeCBlbGVtZW50c1xuICAgICAqIEBwYXJhbSBvZmZzZXQgT2Zmc2V0IHRvIHN0YXJ0XG4gICAgICogQHJldHVybnMg5b2T5YmN55+p6Zi1IHRoaXMgbWF0cml4XG4gICAgICovXG4gICAgZnJvbUFycmF5KGVsZW1lbnRzLCBvZmZzZXQgPSAwKSB7XG4gICAgICAgIC8vIGVsZW1lbnRzIOS4reS4jei2syAxNiDkvY3nmoTlsIbkv53mjIHljp/lgLxcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gZWxlbWVudHMubGVuZ3RoIC0gb2Zmc2V0IDwgTUFUUklYNF9TSVpFID8gZWxlbWVudHMubGVuZ3RoIC0gb2Zmc2V0IDogTUFUUklYNF9TSVpFO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBlbGVtZW50c1tpICsgb2Zmc2V0XTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHNbaV0gPSBlbGVtZW50c1tpICsgb2Zmc2V0XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bCG55+p6Zi155qE5YC86L2s5o2i5oiQ5pWw57uE6L6T5Ye6XG4gICAgICpcbiAgICAgKiBPdXRwdXRzIHRoZSBlbGVtZW50cyBvZiB0aGUgY3VycmVudCBtYXRyaXggYXMgYW4gYXJyYXlcbiAgICAgKi9cbiAgICB0b0FycmF5KCkge1xuICAgICAgICByZXR1cm4gWy4uLnRoaXMuZWxlbWVudHNdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmoLnmja7lubPnp7vlj5jmjaLorr7nva7nn6npmLXnmoTlgLxcbiAgICAgKlxuICAgICAqIFNldHMgdGhpcyBtYXRyaXggZnJvbSB0cmFuc2xhdGUgdHJhbnNmb3JtXG4gICAgICogQHJldHVybnMg5b2T5YmN55+p6Zi1IHRoaXMgbWF0cml4XG4gICAgICovXG4gICAgZnJvbVRyYW5zbGF0ZSh2KSB7XG4gICAgICAgIHRoaXMuc2V0KDEsIDAsIDAsIHYueCwgMCwgMSwgMCwgdi55LCAwLCAwLCAxLCB2LnosIDAsIDAsIDAsIDEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICog5qC55o2u57yp5pS+5Y+Y5o2i6K6+572u55+p6Zi155qE5YC8XG4gICAgICpcbiAgICAgKiBTZXRzIHRoaXMgbWF0cml4IGZyb20gc2NhbGUgdHJhbnNmb3JtXG4gICAgICogQHJldHVybnMg5b2T5YmN55+p6Zi1IHRoaXMgbWF0cml4XG4gICAgICovXG4gICAgZnJvbVNjYWxlKHYpIHtcbiAgICAgICAgY29uc3QgeyB4LCB5LCB6IH0gPSB2O1xuICAgICAgICB0aGlzLnNldCh4LCAwLCAwLCAwLCAwLCB5LCAwLCAwLCAwLCAwLCB6LCAwLCAwLCAwLCAwLCAxKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOagueaNrue7lSBYIOi9tOeahOaXi+i9rOWPmOaNouiuvue9ruefqemYteeahOWAvFxuICAgICAqXG4gICAgICogU2V0cyB0aGlzIG1hdHJpeCBmcm9tIHJvdGF0ZSB0cmFuc2Zvcm0gYWJvdXQgWC1heGlzXG4gICAgICogQHBhcmFtIHJhZGlhbiB0aGV0YSBSb3RhdGlvbiBhbmdsZSBpbiByYWRpYW5zLlxuICAgICAqIEByZXR1cm5zIOW9k+WJjeefqemYtSB0aGlzIG1hdHJpeFxuICAgICAqL1xuICAgIGZyb21Sb3RhdGVYKHJhZGlhbikge1xuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MocmFkaWFuKTtcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZGlhbik7XG4gICAgICAgIHJldHVybiB0aGlzLnNldCgxLCAwLCAwLCAwLCAwLCBjLCAtcywgMCwgMCwgcywgYywgMCwgMCwgMCwgMCwgMSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOagueaNrue7lSBZIOi9tOeahOaXi+i9rOWPmOaNouiuvue9ruefqemYteeahOWAvFxuICAgICAqXG4gICAgICogU2V0cyB0aGlzIG1hdHJpeCBmcm9tIHJvdGF0ZSB0cmFuc2Zvcm0gYWJvdXQgWS1heGlzXG4gICAgICogQHBhcmFtIHJhZGlhbiB0aGV0YSBSb3RhdGlvbiBhbmdsZSBpbiByYWRpYW5zLlxuICAgICAqIEByZXR1cm5zIOW9k+WJjeefqemYtSB0aGlzIG1hdHJpeFxuICAgICAqL1xuICAgIGZyb21Sb3RhdGVZKHJhZGlhbikge1xuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MocmFkaWFuKTtcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZGlhbik7XG4gICAgICAgIHJldHVybiB0aGlzLnNldChjLCAwLCBzLCAwLCAwLCAxLCAwLCAwLCAtcywgMCwgYywgMCwgMCwgMCwgMCwgMSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOagueaNrue7lSBaIOi9tOeahOaXi+i9rOWPmOaNouiuvue9ruefqemYteeahOWAvFxuICAgICAqXG4gICAgICogU2V0cyB0aGlzIG1hdHJpeCBmcm9tIHJvdGF0ZSB0cmFuc2Zvcm0gYWJvdXQgWi1heGlzXG4gICAgICogQHBhcmFtIHJhZGlhbiB0aGV0YSBSb3RhdGlvbiBhbmdsZSBpbiByYWRpYW5zLlxuICAgICAqIEByZXR1cm5zIOW9k+WJjeefqemYtSB0aGlzIG1hdHJpeFxuICAgICAqL1xuICAgIGZyb21Sb3RhdGVaKHJhZGlhbikge1xuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MocmFkaWFuKTtcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZGlhbik7XG4gICAgICAgIHJldHVybiB0aGlzLnNldChjLCAtcywgMCwgMCwgcywgYywgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWwhuefqemYtSBtIOeahOWAvOaLt+i0nee7meW9k+WJjeefqemYtVxuICAgICAqXG4gICAgICogQ29waWVzIG0gdG8gdGhlIGN1cnJlbnQgbWF0cml4XG4gICAgICogQHJldHVybnMg5b2T5YmN55+p6Zi1IHRoaXMgbWF0cml4XG4gICAgICovXG4gICAgY29weShtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZyb21BcnJheShtLnRvQXJyYXkoKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWkjeWItuW9k+WJjeefqemYtVxuICAgICAqXG4gICAgICogQ2xvbmVzIHRoZSBjdXJyZW50IG1hdHJpeCB0byBhIG5ldyBtYXRyaXhcbiAgICAgKiBAcmV0dXJucyDmlrDnmoTnn6npmLUgKEEgbmV3IG1hdHJpeClcbiAgICAgKi9cbiAgICBjbG9uZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXg0KCkuZnJvbUFycmF5KHRoaXMudG9BcnJheSgpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5LmY55+p6Zi1IG1cbiAgICAgKlxuICAgICAqIE11bHRpcGxpZXMgdGhlIGN1cnJlbnQgbWF0cml4IGJ5IG0gTWF0cml4LlxuICAgICAqIEByZXR1cm5zIOaWsOeahOefqemYtSAoQSBuZXcgbWF0cml4KVxuICAgICAqL1xuICAgIG11bHRpcGx5KG0pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXg0KCkuZnJvbUFycmF5KE1hdHJpeDQucHJvZHVjdCh0aGlzLCBtKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW3puS5mOefqemYtSBtXG4gICAgICpcbiAgICAgKiBNdWx0aXBsaWVzIHRoZSBjdXJyZW50IG1hdHJpeCB0byB0aGUgbGVmdCBieSBtIE1hdHJpeFxuICAgICAqIEByZXR1cm5zIOaWsOeahOefqemYtSAoQSBuZXcgbWF0cml4KVxuICAgICAqL1xuICAgIHByZU11bHRpcGx5KG0pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXg0KCkuZnJvbUFycmF5KE1hdHJpeDQucHJvZHVjdChtLCB0aGlzKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOS5mOS4gOS4quagh+mHj1xuICAgICAqXG4gICAgICogTXVsdGlwbGllcyB0aGlzIG1hdHJpeCBieSBhIG51bWJlcjtcbiAgICAgKiBAcmV0dXJucyDmlrDnmoTnn6npmLUgKEEgbmV3IG1hdHJpeClcbiAgICAgKi9cbiAgICBtdWx0aXBseVNjYWxhcih2KSB7XG4gICAgICAgIGNvbnN0IGFyciA9IFtdO1xuICAgICAgICBjb25zdCB0ZSA9IHRoaXMuZWxlbWVudHM7XG4gICAgICAgIGFyclswXSA9IHRlWzBdICogdjtcbiAgICAgICAgYXJyWzFdID0gdGVbMV0gKiB2O1xuICAgICAgICBhcnJbMl0gPSB0ZVsyXSAqIHY7XG4gICAgICAgIGFyclszXSA9IHRlWzNdICogdjtcbiAgICAgICAgYXJyWzRdID0gdGVbNF0gKiB2O1xuICAgICAgICBhcnJbNV0gPSB0ZVs1XSAqIHY7XG4gICAgICAgIGFycls2XSA9IHRlWzZdICogdjtcbiAgICAgICAgYXJyWzddID0gdGVbN10gKiB2O1xuICAgICAgICBhcnJbOF0gPSB0ZVs4XSAqIHY7XG4gICAgICAgIGFycls5XSA9IHRlWzldICogdjtcbiAgICAgICAgYXJyWzEwXSA9IHRlWzEwXSAqIHY7XG4gICAgICAgIGFyclsxMV0gPSB0ZVsxMV0gKiB2O1xuICAgICAgICBhcnJbMTJdID0gdGVbMTJdICogdjtcbiAgICAgICAgYXJyWzEzXSA9IHRlWzEzXSAqIHY7XG4gICAgICAgIGFyclsxNF0gPSB0ZVsxNF0gKiB2O1xuICAgICAgICBhcnJbMTVdID0gdGVbMTVdICogdjtcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXg0KCkuZnJvbUFycmF5KGFycik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOi9rOe9ruefqemYtVxuICAgICAqXG4gICAgICogVHJhbnNwb3NlcyB0aGlzIG1hdHJpeFxuICAgICAqIEByZXR1cm5zIOaWsOeahOefqemYtSAoQSBuZXcgbWF0cml4KVxuICAgICAqL1xuICAgIHRyYW5zcG9zZSgpIHtcbiAgICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICAgIGNvbnN0IHRlID0gdGhpcy5lbGVtZW50cztcbiAgICAgICAgYXJyWzBdID0gdGVbMF07XG4gICAgICAgIGFyclsxXSA9IHRlWzRdO1xuICAgICAgICBhcnJbMl0gPSB0ZVs4XTtcbiAgICAgICAgYXJyWzNdID0gdGVbMTJdO1xuICAgICAgICBhcnJbNF0gPSB0ZVsxXTtcbiAgICAgICAgYXJyWzVdID0gdGVbNV07XG4gICAgICAgIGFycls2XSA9IHRlWzldO1xuICAgICAgICBhcnJbN10gPSB0ZVsxM107XG4gICAgICAgIGFycls4XSA9IHRlWzJdO1xuICAgICAgICBhcnJbOV0gPSB0ZVs2XTtcbiAgICAgICAgYXJyWzEwXSA9IHRlWzEwXTtcbiAgICAgICAgYXJyWzExXSA9IHRlWzE0XTtcbiAgICAgICAgYXJyWzEyXSA9IHRlWzNdO1xuICAgICAgICBhcnJbMTNdID0gdGVbN107XG4gICAgICAgIGFyclsxNF0gPSB0ZVsxMV07XG4gICAgICAgIGFyclsxNV0gPSB0ZVsxNV07XG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4NCgpLmZyb21BcnJheShhcnIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDorqHnrpfpgIbnn6npmLVcbiAgICAgKlxuICAgICAqIEludmVydHMgdGhpcyBtYXRyaXhcbiAgICAgKiBAcmV0dXJucyDmlrDnmoTnn6npmLUgKEEgbmV3IG1hdHJpeClcbiAgICAgKi9cbiAgICBpbnZlcnQoKSB7XG4gICAgICAgIGNvbnN0IGRldGVybWluYW50ID0gdGhpcy5kZXRlcm1pbmFudCgpO1xuICAgICAgICBpZiAoZGV0ZXJtaW5hbnQgPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBtYXRyaXggZGV0ZXJtaW5hbnQgaXMgemVyb1wiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBbbTExLCBtMTIsIG0xMywgbTE0LCBtMjEsIG0yMiwgbTIzLCBtMjQsIG0zMSwgbTMyLCBtMzMsIG0zNCwgbTQxLCBtNDIsIG00MywgbTQ0LF0gPSB0aGlzLmVsZW1lbnRzO1xuICAgICAgICBjb25zdCBkID0gMSAvIGRldGVybWluYW50O1xuICAgICAgICAvKipcbiAgICAgICAgICogZGV0ZXJtaW5hbnQgZm9yXG4gICAgICAgICAqIG0yMiwgbTIzLCBtMjQsXG4gICAgICAgICAqIG0zMiwgbTMzLCBtMzQsXG4gICAgICAgICAqIG00MiwgbTQzLCBtNDQsXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBuMTEgPSBtMjIgKiAobTMzICogbTQ0IC0gbTM0ICogbTQzKSAtIG0yMyAqIChtMzIgKiBtNDQgLSBtMzQgKiBtNDIpICsgbTI0ICogKG0zMiAqIG00MyAtIG0zMyAqIG00Mik7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkZXRlcm1pbmFudCBmb3JcbiAgICAgICAgICogbTIxLCBtMjMsIG0yNCxcbiAgICAgICAgICogbTMxLCBtMzMsIG0zNCxcbiAgICAgICAgICogbTQxLCBtNDMsIG00NCxcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IG4xMiA9IG0yMSAqIChtMzMgKiBtNDQgLSBtMzQgKiBtNDMpIC0gbTIzICogKG0zMSAqIG00NCAtIG0zNCAqIG00MSkgKyBtMjQgKiAobTMxICogbTQzIC0gbTMzICogbTQxKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRldGVybWluYW50IGZvclxuICAgICAgICAgKiBtMjEsIG0yMiwgbTI0LFxuICAgICAgICAgKiBtMzEsIG0zMiwgbTM0LFxuICAgICAgICAgKiBtNDEsIG00MiwgbTQ0LFxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgbjEzID0gbTIxICogKG0zMiAqIG00NCAtIG0zNCAqIG00MikgLSBtMjIgKiAobTMxICogbTQ0IC0gbTM0ICogbTQxKSArIG0yNCAqIChtMzEgKiBtNDIgLSBtMzIgKiBtNDEpO1xuICAgICAgICAvKipcbiAgICAgICAgICogZGV0ZXJtaW5hbnQgZm9yXG4gICAgICAgICAqIG0yMSwgbTIyLCBtMjMsXG4gICAgICAgICAqIG0zMSwgbTMyLCBtMzMsXG4gICAgICAgICAqIG00MSwgbTQyLCBtNDNcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IG4xNCA9IG0yMSAqIChtMzIgKiBtNDMgLSBtMzMgKiBtNDIpIC0gbTIyICogKG0zMSAqIG00MyAtIG0zMyAqIG00MSkgKyBtMjMgKiAobTMxICogbTQyIC0gbTMyICogbTQxKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRldGVybWluYW50IGZvclxuICAgICAgICAgKiBtMTIsIG0xMywgbTE0LFxuICAgICAgICAgKiBtMzIsIG0zMywgbTM0LFxuICAgICAgICAgKiBtNDIsIG00MywgbTQ0LFxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgbjIxID0gbTEyICogKG0zMyAqIG00NCAtIG0zNCAqIG00MykgLSBtMTMgKiAobTMyICogbTQ0IC0gbTM0ICogbTQyKSArIG0xNCAqIChtMzIgKiBtNDMgLSBtMzMgKiBtNDIpO1xuICAgICAgICAvKipcbiAgICAgICAgICogZGV0ZXJtaW5hbnQgZm9yXG4gICAgICAgICAqIG0xMSwgbTEzLCBtMTQsXG4gICAgICAgICAqIG0zMSwgbTMzLCBtMzQsXG4gICAgICAgICAqIG00MSwgbTQzLCBtNDQsXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBuMjIgPSBtMTEgKiAobTMzICogbTQ0IC0gbTM0ICogbTQzKSAtIG0xMyAqIChtMzEgKiBtNDQgLSBtMzQgKiBtNDEpICsgbTE0ICogKG0zMSAqIG00MyAtIG0zMyAqIG00MSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkZXRlcm1pbmFudCBmb3JcbiAgICAgICAgICogbTExLCBtMTIsIG0xNCxcbiAgICAgICAgICogbTMxLCBtMzIsIG0zNCxcbiAgICAgICAgICogbTQxLCBtNDIsIG00NCxcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IG4yMyA9IG0xMSAqIChtMzIgKiBtNDQgLSBtMzQgKiBtNDIpIC0gbTEyICogKG0zMSAqIG00NCAtIG0zNCAqIG00MSkgKyBtMTQgKiAobTMxICogbTQyIC0gbTMyICogbTQxKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRldGVybWluYW50IGZvclxuICAgICAgICAgKiBtMTEsIG0xMiwgbTEzLFxuICAgICAgICAgKiBtMzEsIG0zMiwgbTMzLFxuICAgICAgICAgKiBtNDEsIG00MiwgbTQzLFxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgbjI0ID0gbTExICogKG0zMiAqIG00MyAtIG0zMyAqIG00MikgLSBtMTIgKiAobTMxICogbTQzIC0gbTMzICogbTQxKSArIG0xMyAqIChtMzEgKiBtNDIgLSBtMzIgKiBtNDEpO1xuICAgICAgICAvKipcbiAgICAgICAgICogZGV0ZXJtaW5hbnQgZm9yXG4gICAgICAgICAqIG0xMiwgbTEzLCBtMTQsXG4gICAgICAgICAqIG0yMiwgbTIzLCBtMjQsXG4gICAgICAgICAqIG00MiwgbTQzLCBtNDQsXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBuMzEgPSBtMTIgKiAobTIzICogbTQ0IC0gbTI0ICogbTQzKSAtIG0xMyAqIChtMjIgKiBtNDQgLSBtMjQgKiBtNDIpICsgbTE0ICogKG0yMiAqIG00MyAtIG0yMyAqIG00Mik7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkZXRlcm1pbmFudCBmb3JcbiAgICAgICAgICogbTExLCBtMTMsIG0xNCxcbiAgICAgICAgICogbTIxLCBtMjMsIG0yNCxcbiAgICAgICAgICogbTQxLCBtNDMsIG00NCxcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IG4zMiA9IG0xMSAqIChtMjMgKiBtNDQgLSBtMjQgKiBtNDMpIC0gbTEzICogKG0yMSAqIG00NCAtIG0yNCAqIG00MSkgKyBtMTQgKiAobTIxICogbTQzIC0gbTIzICogbTQxKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRldGVybWluYW50IGZvclxuICAgICAgICAgKiBtMTEsIG0xMiwgbTE0LFxuICAgICAgICAgKiBtMjEsIG0yMiwgbTI0LFxuICAgICAgICAgKiBtNDEsIG00MiwgbTQ0LFxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgbjMzID0gbTExICogKG0yMiAqIG00NCAtIG0yNCAqIG00MikgLSBtMTIgKiAobTIxICogbTQ0IC0gbTI0ICogbTQxKSArIG0xNCAqIChtMjEgKiBtNDIgLSBtMjIgKiBtNDEpO1xuICAgICAgICAvKipcbiAgICAgICAgICogZGV0ZXJtaW5hbnQgZm9yXG4gICAgICAgICAqIG0xMSwgbTEyLCBtMTMsXG4gICAgICAgICAqIG0yMSwgbTIyLCBtMjMsXG4gICAgICAgICAqIG00MSwgbTQyLCBtNDMsXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBuMzQgPSBtMTEgKiBtMTEgKiAobTIyICogbTQzIC0gbTIzICogbTQyKSAtIG0xMiAqIChtMjEgKiBtNDMgLSBtMjMgKiBtNDEpICsgbTEzICogKG0yMSAqIG00MiAtIG0yMiAqIG00MSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkZXRlcm1pbmFudCBmb3JcbiAgICAgICAgICogbTEyLCBtMTMsIG0xNCxcbiAgICAgICAgICogbTIyLCBtMjMsIG0yNCxcbiAgICAgICAgICogbTMyLCBtMzMsIG0zNCxcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IG40MSA9IG0xMiAqIChtMjMgKiBtMzQgLSBtMjQgKiBtMzMpIC0gbTEzICogKG0yMiAqIG0zNCAtIG0yNCAqIG0zMikgKyBtMTQgKiAobTIyICogbTMzIC0gbTIzICogbTMyKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRldGVybWluYW50IGZvclxuICAgICAgICAgKiBtMTEsIG0xMywgbTE0LFxuICAgICAgICAgKiBtMjEsIG0yMywgbTI0LFxuICAgICAgICAgKiBtMzEsIG0zMywgbTM0LFxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgbjQyID0gbTExICogKG0yMyAqIG0zNCAtIG0yNCAqIG0zMykgLSBtMTMgKiAobTIxICogbTM0IC0gbTI0ICogbTMxKSArIG0xNCAqIChtMjEgKiBtMzMgLSBtMjMgKiBtMzEpO1xuICAgICAgICAvKipcbiAgICAgICAgICogZGV0ZXJtaW5hbnQgZm9yXG4gICAgICAgICAqIG0xMSwgbTEyLCBtMTQsXG4gICAgICAgICAqIG0yMSwgbTIyLCBtMjQsXG4gICAgICAgICAqIG0zMSwgbTMyLCBtMzQsXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBuNDMgPSBtMTEgKiAobTIyICogbTM0IC0gbTI0ICogbTMyKSAtIG0xMiAqIChtMjEgKiBtMzQgLSBtMjQgKiBtMzEpICsgbTE0ICogKG0yMSAqIG0zMiAtIG0yMiAqIG0zMSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkZXRlcm1pbmFudCBmb3JcbiAgICAgICAgICogbTExLCBtMTIsIG0xMyxcbiAgICAgICAgICogbTIxLCBtMjIsIG0yMyxcbiAgICAgICAgICogbTMxLCBtMzIsIG0zMyxcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IG40NCA9IG0xMSAqIChtMjIgKiBtMzMgLSBtMjMgKiBtMzIpIC0gbTEyICogKG0yMSAqIG0zMyAtIG0yMyAqIG0zMSkgKyBtMTMgKiAobTIxICogbTMyIC0gbTIyICogbTMxKTtcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXg0KG4xMSwgLW4xMiwgbjEzLCAtbjE0LCAtbjIxLCBuMjIsIC1uMjMsIG4yNCwgbjMxLCAtbjMyLCBuMzMsIC1uMzQsIC1uNDEsIG40MiwgLW40MywgbjQ0KS50cmFuc3Bvc2UoKS5tdWx0aXBseVNjYWxhcihkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6K6h566X6KGM5YiX5byPXG4gICAgICpcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiB0aGlzIE1hdHJpeDQgKOihjOWIl+W8jylcbiAgICAgKi9cbiAgICBkZXRlcm1pbmFudCgpIHtcbiAgICAgICAgY29uc3QgW20xMSwgbTEyLCBtMTMsIG0xNCwgbTIxLCBtMjIsIG0yMywgbTI0LCBtMzEsIG0zMiwgbTMzLCBtMzQsIG00MSwgbTQyLCBtNDMsIG00NCxdID0gdGhpcy5lbGVtZW50cztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRldGVybWluYW50IGZvclxuICAgICAgICAgKiAgbTIyLCBtMjMsIG0yNCxcbiAgICAgICAgICogIG0zMiwgbTMzLCBtMzQsXG4gICAgICAgICAqICBtNDIsIG00MywgbTQ0XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBuMTEgPSBtMjIgKiAobTMzICogbTQ0IC0gbTM0ICogbTQzKSAtIG0yMyAqIChtMzIgKiBtNDQgLSBtMzQgKiBtNDIpICsgbTI0ICogKG0zMiAqIG00MyAtIG0zMyAqIG00Mik7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkZXRlcm1pbmFudCBmb3JcbiAgICAgICAgICogbTIxLCBtMjMsIG0yNCxcbiAgICAgICAgICogbTMxLCBtMzMsIG0zNCxcbiAgICAgICAgICogbTQxLCBtNDMsIG00NFxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgbjEyID0gbTIxICogKG0zMyAqIG00NCAtIG0zNCAqIG00MykgLSBtMjMgKiAobTMxICogbTQ0IC0gbTM0ICogbTQxKSArIG0yNCAqIChtMzEgKiBtNDMgLSBtMzMgKiBtNDEpO1xuICAgICAgICAvKipcbiAgICAgICAgICogZGV0ZXJtaW5hbnQgZm9yXG4gICAgICAgICAqIG0yMSwgbTIyLCBtMjQsXG4gICAgICAgICAqIG0zMSwgbTMyLCBtMzQsXG4gICAgICAgICAqIG00MSwgbTQyLCBtNDRcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IG4xMyA9IG0yMSAqIChtMzIgKiBtNDQgLSBtMzQgKiBtNDIpIC0gbTIyICogKG0zMSAqIG00NCAtIG0zNCAqIG00MSkgKyBtMjQgKiAobTMxICogbTQyIC0gbTMyICogbTQxKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRldGVybWluYW50IGZvclxuICAgICAgICAgKiBtMjEsIG0yMiwgbTIzLFxuICAgICAgICAgKiBtMzEsIG0zMiwgbTMzLFxuICAgICAgICAgKiBtNDEsIG00MiwgbTQzXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBuMTQgPSBtMjEgKiAobTMyICogbTQzIC0gbTMzICogbTQyKSAtIG0yMiAqIChtMzEgKiBtNDMgLSBtMzMgKiBtNDEpICsgbTIzICogKG0zMSAqIG00MiAtIG0zMiAqIG00MSk7XG4gICAgICAgIHJldHVybiBtMTEgKiBuMTEgLSBtMTIgKiBuMTIgKyBtMTMgKiBuMTMgLSBtMTQgKiBuMTQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuoeeul+WcqOW9k+WJjeefqemYteeahOWfuuehgOS4iuWPoOWKoOW5s+enu+WPmOWMluWQjueahOefqemYtVxuICAgICAqXG4gICAgICogQXBwbGllcyB0cmFuc2xhdGUgdHJhbnNmb3JtIHRvIHRoaXMgbWF0cml4XG4gICAgICogQHJldHVybnMg5paw55qE55+p6Zi1IChBIG5ldyBtYXRyaXgpXG4gICAgICovXG4gICAgYXBwbHlUcmFuc2xhdGUodikge1xuICAgICAgICBjb25zdCBbbTExLCBtMTIsIG0xMywgbTE0LCBtMjEsIG0yMiwgbTIzLCBtMjQsIG0zMSwgbTMyLCBtMzMsIG0zNCwgbTQxLCBtNDIsIG00MywgbTQ0LF0gPSB0aGlzLmVsZW1lbnRzO1xuICAgICAgICBjb25zdCB7IHgsIHksIHogfSA9IHY7XG4gICAgICAgIGNvbnN0IGFyciA9IFtdO1xuICAgICAgICBhcnJbMF0gPSBtMTEgKyBtNDEgKiB4O1xuICAgICAgICBhcnJbMV0gPSBtMTIgKyBtNDIgKiB4O1xuICAgICAgICBhcnJbMl0gPSBtMTMgKyBtNDMgKiB4O1xuICAgICAgICBhcnJbM10gPSBtMTQgKyBtNDQgKiB4O1xuICAgICAgICBhcnJbNF0gPSBtMjEgKyBtNDEgKiB5O1xuICAgICAgICBhcnJbNV0gPSBtMjIgKyBtNDIgKiB5O1xuICAgICAgICBhcnJbNl0gPSBtMjMgKyBtNDMgKiB5O1xuICAgICAgICBhcnJbN10gPSBtMjQgKyBtNDQgKiB5O1xuICAgICAgICBhcnJbOF0gPSBtMzEgKyBtNDEgKiB6O1xuICAgICAgICBhcnJbOV0gPSBtMzIgKyBtNDIgKiB6O1xuICAgICAgICBhcnJbMTBdID0gbTMzICsgbTQzICogejtcbiAgICAgICAgYXJyWzExXSA9IG0zNCArIG00NCAqIHo7XG4gICAgICAgIGFyclsxMl0gPSBtNDE7XG4gICAgICAgIGFyclsxM10gPSBtNDI7XG4gICAgICAgIGFyclsxNF0gPSBtNDM7XG4gICAgICAgIGFyclsxNV0gPSBtNDQ7XG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4NCgpLmZyb21BcnJheShhcnIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDorqHnrpflnKjlvZPliY3nn6npmLXnmoTln7rnoYDkuIrlj6DliqDnvKnmlL7lj5jljJblkI7nmoTnn6npmLVcbiAgICAgKlxuICAgICAqIEFwcGxpZXMgc2NhbGUgdHJhbnNmb3JtIHRvIHRoaXMgbWF0cml4XG4gICAgICogQHJldHVybnMg5paw55qE55+p6Zi1IChBIG5ldyBtYXRyaXgpXG4gICAgICovXG4gICAgYXBwbHlTY2FsZSh2KSB7XG4gICAgICAgIGNvbnN0IHsgeCwgeSwgeiB9ID0gdjtcbiAgICAgICAgY29uc3QgYXJyID0gWy4uLnRoaXMuZWxlbWVudHNdO1xuICAgICAgICBhcnJbMF0gKj0geDtcbiAgICAgICAgYXJyWzFdICo9IHg7XG4gICAgICAgIGFyclsyXSAqPSB4O1xuICAgICAgICBhcnJbM10gKj0geDtcbiAgICAgICAgYXJyWzRdICo9IHk7XG4gICAgICAgIGFycls1XSAqPSB5O1xuICAgICAgICBhcnJbNl0gKj0geTtcbiAgICAgICAgYXJyWzddICo9IHk7XG4gICAgICAgIGFycls4XSAqPSB6O1xuICAgICAgICBhcnJbOV0gKj0gejtcbiAgICAgICAgYXJyWzEwXSAqPSB6O1xuICAgICAgICBhcnJbMTFdICo9IHo7XG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4NCgpLmZyb21BcnJheShhcnIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDorqHnrpflnKjlvZPliY3nn6npmLXnmoTln7rnoYDkuIrlj6DliqDnu5UgWCDovbTml4vovazlj5jljJblkI7nmoTnn6npmLVcbiAgICAgKlxuICAgICAqIEFwcGxpZXMgcm90YXRlIHRyYW5zZm9ybSBhYm91dCBYLWF4aXMgdG8gdGhpcyBtYXRyaXhcbiAgICAgKiBAcGFyYW0gcmFkaWFuIHRoZXRhIFJvdGF0aW9uIGFuZ2xlIGluIHJhZGlhbnMuXG4gICAgICogQHJldHVybnMg5paw55qE55+p6Zi1IChBIG5ldyBtYXRyaXgpXG4gICAgICovXG4gICAgYXBwbHlSb3RhdGVYKHJhZGlhbikge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmVNdWx0aXBseShuZXcgTWF0cml4NCgpLmZyb21Sb3RhdGVYKHJhZGlhbikpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDorqHnrpflnKjlvZPliY3nn6npmLXnmoTln7rnoYDkuIrlj6DliqDnu5UgWSDovbTml4vovazlj5jljJblkI7nmoTnn6npmLVcbiAgICAgKlxuICAgICAqIEFwcGxpZXMgcm90YXRlIHRyYW5zZm9ybSBhYm91dCBZLWF4aXMgdG8gdGhpcyBtYXRyaXhcbiAgICAgKiBAcGFyYW0gcmFkaWFuIHRoZXRhIFJvdGF0aW9uIGFuZ2xlIGluIHJhZGlhbnMuXG4gICAgICogQHJldHVybnMg5paw55qE55+p6Zi1IChBIG5ldyBtYXRyaXgpXG4gICAgICovXG4gICAgYXBwbHlSb3RhdGVZKHJhZGlhbikge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmVNdWx0aXBseShuZXcgTWF0cml4NCgpLmZyb21Sb3RhdGVZKHJhZGlhbikpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDorqHnrpflnKjlvZPliY3nn6npmLXnmoTln7rnoYDkuIrlj6DliqDnu5UgWiDovbTml4vovazlj5jljJblkI7nmoTnn6npmLVcbiAgICAgKlxuICAgICAqIEFwcGxpZXMgcm90YXRlIHRyYW5zZm9ybSBhYm91dCBaLWF4aXMgdG8gdGhpcyBtYXRyaXhcbiAgICAgKiBAcGFyYW0gcmFkaWFuIHRoZXRhIFJvdGF0aW9uIGFuZ2xlIGluIHJhZGlhbnMuXG4gICAgICogQHJldHVybnMg5paw55qE55+p6Zi1IChBIG5ldyBtYXRyaXgpXG4gICAgICovXG4gICAgYXBwbHlSb3RhdGVaKHJhZGlhbikge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmVNdWx0aXBseShuZXcgTWF0cml4NCgpLmZyb21Sb3RhdGVaKHJhZGlhbikpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDliKTmlq3nn6npmLXmmK/lkKbnm7jnrYlcbiAgICAgKlxuICAgICAqIERldGVybWluZXMgd2hldGhlciB0aGUgY3VycmVudCBtYXRyaXggYW5kIG0gYXJlIGVxdWFsXG4gICAgICovXG4gICAgZXF1YWxzKG0pIHtcbiAgICAgICAgY29uc3QgbUFyciA9IG0udG9BcnJheSgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1BVFJJWDRfU0laRTsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbGVtZW50c1tpXSAhPT0gbUFycltpXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5leHBvcnRzLk1hdHJpeDQgPSBNYXRyaXg0O1xuLyoqXG4gKiDpm7bnn6npmLVcbiAqXG4gKiBaZXJvIE1hdHJpeDRcbiAqL1xuTWF0cml4NC5aZXJvID0gbmV3IE1hdHJpeDQoMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCk7XG4vKipcbiAqIOWNleS9jeefqemYtVxuICpcbiAqIElkZW50aXR5IE1hdHJpeDRcbiAqL1xuTWF0cml4NC5JZGVudGl0eSA9IG5ldyBNYXRyaXg0KDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlBvbHlnb24gPSB2b2lkIDA7XG5jb25zdCBjb25zdF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbnN0XCIpO1xuY29uc3QgbGluZTJfMSA9IHJlcXVpcmUoXCIuLi9saW5lMlwiKTtcbmNvbnN0IHZlY3RvcjJfMSA9IHJlcXVpcmUoXCIuLi92ZWN0b3IyXCIpO1xuLyoqXG4gKiDooajnpLrkuoznu7TnmoTkuIDkuKrlpJrovrnlvaJcbiAqL1xuY2xhc3MgUG9seWdvbiB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHBvaW50cyDlpJrovrnlvaLnmoTpobbngrnmlbDmja7vvIjmnIDlkI7kuIDkuKrlkoznrKzkuIDkuKrpl63lkIjvvIlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwb2ludHMgPSBbXSkge1xuICAgICAgICAvKipcbiAgICAgICAgICog5aSa6L655b2i55qE6aG254K55pWw5o2u77yI5pyA5ZCO5LiA5Liq5ZKM56ys5LiA5Liq6Zet5ZCI77yJXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBvaW50cyA9IFtdO1xuICAgICAgICB0aGlzLnBvaW50cyA9IFsuLi5wb2ludHNdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDorr7nva7lpJrovrnlvaLnmoTpobbngrlcbiAgICAgKiBAcGFyYW0gcG9pbnRzIOWkmui+ueW9oueahOmhtueCueaVsOaNru+8iOacgOWQjuS4gOS4quWSjOesrOS4gOS4qumXreWQiO+8iVxuICAgICAqL1xuICAgIHNldFBhdGgocG9pbnRzKSB7XG4gICAgICAgIHRoaXMucG9pbnRzID0gWy4uLnBvaW50c107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWinuWKoOmhtueCuVxuICAgICAqIEBwYXJhbSBwb2ludCDkuIDkuKrmiJbogIXlpJrkuKrpobbngrnmlbDmja5cbiAgICAgKi9cbiAgICBhZGRQb2ludChwb2ludCkge1xuICAgICAgICBjb25zdCBwb2ludHMgPSBBcnJheS5pc0FycmF5KHBvaW50KSA/IHBvaW50IDogW3BvaW50XTtcbiAgICAgICAgcG9pbnRzLmZvckVhY2gocCA9PiB0aGlzLnBvaW50cy5wdXNoKHApKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiOt+WPluWkmui+ueW9oueahOi+uVxuICAgICAqL1xuICAgIGdldEVkZ2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb2ludHMubWFwKChwaSwgaSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaiA9IGkgPT09IGxlbmd0aCA/IDAgOiBpICsgMTtcbiAgICAgICAgICAgIGNvbnN0IHBqID0gdGhpcy5wb2ludHNbal07XG4gICAgICAgICAgICByZXR1cm4gbmV3IGxpbmUyXzEuTGluZTIocGksIHBqKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiOt+WPluWkmui+ueW9oueahOS4reW/g+eCue+8iOaJgOacieWdkOagh+eCueeahOW5s+Wdh+WAvO+8iVxuICAgICAqL1xuICAgIGdldENlbnRlcigpIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5wb2ludHMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gdGhpcy5wb2ludHMucmVkdWNlKChyZXN1bHQsIHBvaW50KSA9PiByZXN1bHQuYWRkKHBvaW50KSwgbmV3IHZlY3RvcjJfMS5WZWN0b3IyKDAsIDApKS5kaXZpZGUobGVuZ3RoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6I635Y+W5aSa6L655b2i55qE6YeN5b+D77yI5Yeg5L2V5Lit5b+D77yJXG4gICAgICovXG4gICAgZ2V0Q2VudHJvaWQoKSB7XG4gICAgICAgIGxldCB0b3RhbEFyZWEgPSAwO1xuICAgICAgICBsZXQgY2VudHJvaWRYID0gMDtcbiAgICAgICAgbGV0IGNlbnRyb2lkWSA9IDA7XG4gICAgICAgIHRoaXMucG9pbnRzLmZvckVhY2goKHBpLCBpKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBqID0gaSA9PT0gdGhpcy5wb2ludHMubGVuZ3RoIC0gMSA/IDAgOiBpICsgMTtcbiAgICAgICAgICAgIGNvbnN0IHBqID0gdGhpcy5wb2ludHNbal07XG4gICAgICAgICAgICBjb25zdCBhcmVhID0gKHBpLnggKiBwai55IC0gcGkueSAqIHBqLngpIC8gMjsgLy8g562J5ZCM5LqOIFZlY3RvcjIuY3Jvc3MoKDAsIDApLCBwaSwgcGopIC8gMlxuICAgICAgICAgICAgY2VudHJvaWRYICs9IChwaS54ICsgcGoueCkgLyAzICogYXJlYTtcbiAgICAgICAgICAgIGNlbnRyb2lkWSArPSAocGkueSArIHBqLnkpIC8gMyAqIGFyZWE7XG4gICAgICAgICAgICB0b3RhbEFyZWEgKz0gYXJlYTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXcgdmVjdG9yMl8xLlZlY3RvcjIoY2VudHJvaWRYIC8gdG90YWxBcmVhLCBjZW50cm9pZFkgLyB0b3RhbEFyZWEpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDliKTmlq3nm67moIfngrnmmK/lkKblnKjlpJrovrnlvaLlhoVcbiAgICAgKiBAcGFyYW0gcG9pbnQg55uu5qCH54K5XG4gICAgICogQHBhcmFtIGluY2x1ZGVFZGdlIOWkmui+ueW9ouiMg+WbtOaYr+WQpuWMheWQq+i+uVxuICAgICAqIEBwYXJhbSB0b2xlcmFuY2Ug6K+v5beuXG4gICAgICovXG4gICAgaXNQb2ludEluc2lkZVBvbHlnb24ocG9pbnQsIGluY2x1ZGVFZGdlID0gdHJ1ZSwgdG9sZXJhbmNlID0gY29uc3RfMS5TSVhfREVDSU1BTF9UT0xFUkFOQ0UpIHtcbiAgICAgICAgY29uc3QgeyB4LCB5IH0gPSBwb2ludDtcbiAgICAgICAgbGV0IGluU2lkZSA9IGZhbHNlO1xuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLnBvaW50cy5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBqID0gaSArIDE7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaiA9IGkgPT09IGxlbmd0aCAtIDEgPyAwIDogaSArIDE7XG4gICAgICAgICAgICBjb25zdCBwaSA9IHRoaXMucG9pbnRzW2ldO1xuICAgICAgICAgICAgY29uc3QgcGogPSB0aGlzLnBvaW50c1tqXTtcbiAgICAgICAgICAgIGNvbnN0IGlzT25FZGdlID0gKG5ldyBsaW5lMl8xLkxpbmUyKHBpLCBwaikpLmlzUG9pbnRPblNlZ21lbnQocG9pbnQsIHRvbGVyYW5jZSk7XG4gICAgICAgICAgICBpZiAoIWluY2x1ZGVFZGdlICYmIGlzT25FZGdlKSB7XG4gICAgICAgICAgICAgICAgLy8g5aaC5p6c55uu5qCH5LiN5YyF5ZCr5Zyo6L655LiK77yM5LiU5bCx5Zyo6L655LiK77yM6YKj6K6k5Li65LiN5Zyo5aSa6L655b2i5YaFXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgeyB4OiB4aSwgeTogeWkgfSA9IHBpO1xuICAgICAgICAgICAgY29uc3QgeyB4OiB4aiwgeTogeWogfSA9IHBqO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiDljp/nkIbvvJrku44gcG9pbnQg5Y+R5bCE5LiA5p2h5bCE57q/77yM5LiO5aSa6L655b2i55qE5Lqk54K55Li65aWH5pWw5Liq77yM5YiZ5Zyo5YaF77yb5YG25pWw5Liq77yM5YiZ5Zyo5aSWXG4gICAgICAgICAgICAgKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vc3Vic3RhY2svcG9pbnQtaW4tcG9seWdvbi9ibG9iL21hc3Rlci9pbmRleC5qc1xuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIOWunueOsO+8muS7jiBwb2ludCDlj5HlsIQgWCDotJ/mlrnlkJHnmoTlsITnur/vvIzliKTmlq3lhbblkozlpJrovrnlvaLnmoTkuqTngrlcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiAoKHlpID4geSkgIT09ICh5aiA+IHkpKSDmn5DovrnnmoTkuKTkuKrnq6/ngrnopoHlnKggcG9pbnQg55qE5LiK5LiL5Lik5L6n77yIWSDmlrnlkJHvvIlcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiAoeGkgKyAoeSAtIHlpKSAvICh5aiAtIHlpKSAqICh4aiAtIHhpKSA8IHgpIOWwhOe6v+WSjOi+ueeahOS6pOeCueimgeWcqCBwb2ludC54IOeahOi0n+aWueWQkeS+p1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdCBpbnRlcnNlY3RlZCA9ICgoeWkgPiB5KSAhPT0gKHlqID4geSkpICYmICh4aSArICh5IC0geWkpIC8gKHlqIC0geWkpICogKHhqIC0geGkpIDwgeCk7XG4gICAgICAgICAgICBpZiAoaW50ZXJzZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBpblNpZGUgPSAhaW5TaWRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpblNpZGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWIpOaWreebruagh+eCueaYr+WQpuWcqOWkmui+ueW9oueahOi+ueS4ilxuICAgICAqIEBwYXJhbSBwb2ludCDnm67moIfngrlcbiAgICAgKiBAcGFyYW0gdG9sZXJhbmNlIOivr+W3rlxuICAgICAqL1xuICAgIGlzUG9pbnRPbkVkZ2UocG9pbnQsIHRvbGVyYW5jZSA9IGNvbnN0XzEuU0lYX0RFQ0lNQUxfVE9MRVJBTkNFKSB7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMucG9pbnRzLmxlbmd0aCAtIDE7XG4gICAgICAgIHJldHVybiB0aGlzLnBvaW50cy5zb21lKChwaSwgaSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaiA9IGkgPT09IGxlbmd0aCA/IDAgOiBpICsgMTtcbiAgICAgICAgICAgIGNvbnN0IHBqID0gdGhpcy5wb2ludHNbal07XG4gICAgICAgICAgICByZXR1cm4gKG5ldyBsaW5lMl8xLkxpbmUyKHBpLCBwaikpLmlzUG9pbnRPblNlZ21lbnQocG9pbnQsIHRvbGVyYW5jZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuUG9seWdvbiA9IFBvbHlnb247XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVmVjdG9yMiA9IHZvaWQgMDtcbmNvbnN0IGNvbnN0XzEgPSByZXF1aXJlKFwiLi4vLi4vY29uc3RcIik7XG5jb25zdCBudW1iZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21tb24vbnVtYmVyXCIpO1xuLyoqXG4gKiDooajnpLrkuoznu7TnmoTkuIDkuKrlkJHph49cbiAqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSB2ZWN0b3IgY29udGFpbmluZyAyIGNvb3JkaW5hdGVzXG4gKi9cbmNsYXNzIFZlY3RvcjIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICog5ZCR6YeP55qEIHgg5YC8XG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSBYIHZhbHVlIG9mIHRoZSBjdXJyZW50IHZlY3RvclxuICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnggPSBjb25zdF8xLlpFUk87XG4gICAgICAgIC8qKlxuICAgICAgICAgKiDlkJHph4/nmoQgeSDlgLxcbiAgICAgICAgICpcbiAgICAgICAgICogVGhlIFkgdmFsdWUgb2YgdGhlIGN1cnJlbnQgdmVjdG9yXG4gICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMueSA9IGNvbnN0XzEuWkVSTztcbiAgICAgICAgY29uc3QgW3AxLCBwMl0gPSBhcmd1bWVudHM7XG4gICAgICAgIHRoaXMuc2V0KHAxLCBwMik7XG4gICAgfVxuICAgIHNldCgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdudW1iZXInIHx8IHR5cGVvZiBhcmd1bWVudHNbMV0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLnggPSBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHRoaXMueCA6IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIHRoaXMueSA9IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gdGhpcy55IDogYXJndW1lbnRzWzFdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBjb25zdCB7IHgsIHkgfSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIHRoaXMueCA9IHggPT09IHVuZGVmaW5lZCA/IHRoaXMueCA6IHg7XG4gICAgICAgICAgICB0aGlzLnkgPSB5ID09PSB1bmRlZmluZWQgPyB0aGlzLnkgOiB5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDorr7nva7lkJHph4/nmoQgeCDlgLxcbiAgICAgKlxuICAgICAqIFNldHMgdGhlIFggdmFsdWUgb2YgdGhpcyB2ZWN0b3JcbiAgICAgKiBAcmV0dXJucyDlvZPliY3lkJHph48gKHRoaXMgdmVjdG9yMilcbiAgICAgKi9cbiAgICBzZXRYKHgpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuvue9ruWQkemHj+eahCB5IOWAvFxuICAgICAqXG4gICAgICogU2V0cyB0aGUgWSB2YWx1ZSBvZiB0aGlzIHZlY3RvclxuICAgICAqIEByZXR1cm5zIOW9k+WJjeWQkemHjyAodGhpcyB2ZWN0b3IyKVxuICAgICAqL1xuICAgIHNldFkoeSkge1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bCG5ZCR6YePIHYg55qE5YC85ou36LSd57uZ5b2T5YmN5ZCR6YePXG4gICAgICpcbiAgICAgKiBDb3BpZXMgdiB0byB0aGlzIHZlY3RvclxuICAgICAqIEByZXR1cm5zIOW9k+WJjeWQkemHjyAodGhpcyB2ZWN0b3IyKVxuICAgICAqL1xuICAgIGNvcHkodikge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXQodik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWkjeWItuW9k+WJjeWQkemHj1xuICAgICAqXG4gICAgICogQ2xvbmVzIHRoaXMgdmVjdG9yIHRvIGEgbmV3IHZlY3RvclxuICAgICAqIEByZXR1cm5zIOaWsOeahOWQkemHjyAoQSBuZXcgVmVjdG9yKVxuICAgICAqL1xuICAgIGNsb25lKCkge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWQkemHj+eahOmVv+W6plxuICAgICAqXG4gICAgICogR2V0IHRoZSBsZW5ndGggb2YgdGhpcyB2ZWN0b3IuXG4gICAgICovXG4gICAgZ2V0IGxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmxlbmd0aFNxKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5ZCR6YeP6ZW/5bqm55qE5bmz5pa5XG4gICAgICpcbiAgICAgKiBHZXQgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLlxuICAgICAqL1xuICAgIGdldCBsZW5ndGhTcSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5ZCR6YeP55qE6KeS5bqmXG4gICAgICpcbiAgICAgKiBDb21wdXRlcyB0aGUgYW5nbGUgaW4gcmFkaWFucyB3aXRoIHJlc3BlY3QgdG8gdGhlIGhvcml6b250YWwgbGVmdCBheGlzXG4gICAgICpcbiAgICAgKiDlvKfluqbliLbvvIzojIPlm7TlnKggWyAwLCAyICogUEkgKe+8jOmAhuaXtumSiOS4uuato1xuICAgICAqXG4gICAgICogUmFkaWFucyBpbiByYW5nZSBbIDAsIDIgKiBQSSApLCBjb3VudGVyY2xvY2t3aXNlXG4gICAgICovXG4gICAgZ2V0IGFuZ2xlKCkge1xuICAgICAgICAvLyBNYXRoLmF0YW4yIHZhbHVlIHJhbmdlOiBcbiAgICAgICAgLy8gWzAsIDE4MF0gLT4gWzAsIFBJXVxuICAgICAgICAvLyAoMTgwLCAzNjApIC0+ICgtUEksIDApXG4gICAgICAgIGNvbnN0IHJhZGlhbiA9IE1hdGguYXRhbjIodGhpcy55LCB0aGlzLngpO1xuICAgICAgICByZXR1cm4gcmFkaWFuIDwgMCA/IHJhZGlhbiArIGNvbnN0XzEuVFdPX1BJIDogcmFkaWFuO1xuICAgIH1cbiAgICBhZGQoKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYXJndW1lbnRzWzBdO1xuICAgICAgICBjb25zdCB7IHgsIHkgfSA9IHRoaXM7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIoeCArIHZhbHVlLCB5ICsgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGNvbnN0IHZ4ID0gdmFsdWUueCB8fCBjb25zdF8xLlpFUk87XG4gICAgICAgICAgICBjb25zdCB2eSA9IHZhbHVlLnkgfHwgY29uc3RfMS5aRVJPO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHggKyB2eCwgeSArIHZ5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSgpO1xuICAgIH1cbiAgICBzdWIoKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYXJndW1lbnRzWzBdO1xuICAgICAgICBjb25zdCB7IHgsIHkgfSA9IHRoaXM7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIoeCAtIHZhbHVlLCB5IC0gdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGNvbnN0IHZ4ID0gdmFsdWUueCB8fCBjb25zdF8xLlpFUk87XG4gICAgICAgICAgICBjb25zdCB2eSA9IHZhbHVlLnkgfHwgY29uc3RfMS5aRVJPO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHggLSB2eCwgeSAtIHZ5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSgpO1xuICAgIH1cbiAgICBtdWx0aXBseSgpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBhcmd1bWVudHNbMF07XG4gICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gdGhpcztcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMih4ICogdmFsdWUsIHkgKiB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgY29uc3QgdnggPSB2YWx1ZS54IHx8IDE7XG4gICAgICAgICAgICBjb25zdCB2eSA9IHZhbHVlLnkgfHwgMTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMih4ICogdngsIHkgKiB2eSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoKTtcbiAgICB9XG4gICAgZGl2aWRlKCkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgY29uc3QgeyB4LCB5IH0gPSB0aGlzO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHggLyB2YWx1ZSwgeSAvIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBjb25zdCB2eCA9IHZhbHVlLnggfHwgMTtcbiAgICAgICAgICAgIGNvbnN0IHZ5ID0gdmFsdWUueSB8fCAxO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHggLyB2eCwgeSAvIHZ5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlr7nlvZPliY3lkJHph4/lupTnlKjnn6npmLVcbiAgICAgKlxuICAgICAqIEFwcGx5IG1hdHJpeDMgdG8gdGhlIGN1cnJlbnQgdmVjdG9yXG4gICAgICogQHBhcmFtIG1hdHJpeCBhIE1hdHJpeDNcbiAgICAgKiBAcmV0dXJucyBBIG5ldyBWZWN0b3IyXG4gICAgICovXG4gICAgYXBwbHlNYXRyaXgzKG1hdHJpeCkge1xuICAgICAgICBjb25zdCBbbTExLCBtMTIsIG0xMywgbTIxLCBtMjIsIG0yMyxdID0gbWF0cml4LnRvQXJyYXkoKTtcbiAgICAgICAgY29uc3QgeyB4LCB5IH0gPSB0aGlzO1xuICAgICAgICBjb25zdCB2eCA9IG0xMSAqIHggKyBtMTIgKiB5ICsgbTEzO1xuICAgICAgICBjb25zdCB2eSA9IG0yMSAqIHggKyBtMjIgKiB5ICsgbTIzO1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIodngsIHZ5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6YCG5ZCR6YePXG4gICAgICpcbiAgICAgKiBJbnZlcnNlIHRoZSBjdXJyZW50IHZlY3RvclxuICAgICAqIEByZXR1cm5zIEEgbmV3IFZlY3RvcjJcbiAgICAgKi9cbiAgICBpbnZlcnNlKCkge1xuICAgICAgICBjb25zdCB4ID0gdGhpcy54ID09PSAwID8gMCA6IC10aGlzLng7XG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLnkgPT09IDAgPyAwIDogLXRoaXMueTtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHgsIHkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDljZXkvY3lkJHph49cbiAgICAgKlxuICAgICAqIE5vcm1hbGl6ZXMgdGhlIGN1cnJlbnQgdmVjdG9yLlxuICAgICAqIEByZXR1cm5zIEEgbmV3IFZlY3RvcjJcbiAgICAgKi9cbiAgICBub3JtYWxpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKCkuZGl2aWRlKHRoaXMubGVuZ3RoIHx8IDEpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDngrnkuZhcbiAgICAgKlxuICAgICAqIENvbXB1dGVzIGRvdCBwcm9kdWN0IG9mIHRoZSBjdXJyZW50IHZlY3RvciBhbmQgdlxuICAgICAqL1xuICAgIGRvdCh2KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnggKiB2LnggKyB0aGlzLnkgKiB2Lnk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWPieS5mFxuICAgICAqXG4gICAgICogQ29tcHV0ZXMgY3Jvc3MgcHJvZHVjdCBvZiB0aGUgY3VycmVudCB2ZWN0b3IgYW5kIHZcbiAgICAgKlxuICAgICAqIFRoZSBjcm9zcyBwcm9kdWN0IG9mIFZlY3RvcjIgaXMganVzdCBhIHNjYWxhciBvZiB6LWF4aXNcbiAgICAgKi9cbiAgICBjcm9zcyh2KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnggKiB2LnkgLSB0aGlzLnkgKiB2Lng7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOS4pOS4quWQkemHj+aYr+WQpuebuOetiVxuICAgICAqXG4gICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBjdXJyZW50IHZlY3RvciBhbmQgdiBhcmUgZXF1YWxcbiAgICAgKi9cbiAgICBlcXVhbHModikge1xuICAgICAgICAvLyB0b2RvIHRvbGVyYW5jZVxuICAgICAgICByZXR1cm4gdGhpcy54ID09PSB2LnggJiYgdGhpcy55ID09PSB2Lnk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOS4pOS4quWQkemHj+aYr+WQpuW5s+ihjFxuICAgICAqXG4gICAgICogRGV0ZXJtaW5lcyAgd2hldGhlciB0aGUgY3VycmVudCB2ZWN0b3IgYW5kIHYgYXJlIHBhcmFsbGVsXG4gICAgICovXG4gICAgaXNQYXJhbGxlbCh2LCB0b2xlcmFuY2UgPSBjb25zdF8xLlNJWF9ERUNJTUFMX1RPTEVSQU5DRSkge1xuICAgICAgICByZXR1cm4gbnVtYmVyXzEuTnVtYmVyVXRpbC5pc0VxdWFsKHRoaXMuY3Jvc3ModiksIDAsIHRvbGVyYW5jZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOS4pOS4quWQkemHj+aYr+WQpuato+S6pOWeguebtFxuICAgICAqXG4gICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBjdXJyZW50IHZlY3RvciBhbmQgdiBhcmUgb3J0aG9nb25hbFxuICAgICAqL1xuICAgIGlzT3J0aG9nb25hbCh2LCB0b2xlcmFuY2UgPSBjb25zdF8xLlNJWF9ERUNJTUFMX1RPTEVSQU5DRSkge1xuICAgICAgICByZXR1cm4gbnVtYmVyXzEuTnVtYmVyVXRpbC5pc0VxdWFsKHRoaXMuZG90KHYpLCAwLCB0b2xlcmFuY2UpO1xuICAgIH1cbn1cbmV4cG9ydHMuVmVjdG9yMiA9IFZlY3RvcjI7XG4vKipcbiAqIFZlY3RvcjIgKDAsIDApXG4gKi9cblZlY3RvcjIuWkVSTyA9IG5ldyBWZWN0b3IyKGNvbnN0XzEuWkVSTywgY29uc3RfMS5aRVJPKTtcbi8qKlxuICogVmVjdG9yMiAoMSwgMSlcbiAqL1xuVmVjdG9yMi5PTkUgPSBuZXcgVmVjdG9yMihjb25zdF8xLk9ORSwgY29uc3RfMS5PTkUpO1xuLyoqXG4gKiBWZWN0b3IyIChJbmZpbml0eSwgSW5maW5pdHkpXG4gKi9cblZlY3RvcjIuTUFYID0gbmV3IFZlY3RvcjIoY29uc3RfMS5NQVgsIGNvbnN0XzEuTUFYKTtcbi8qKlxuICogVmVjdG9yMiAoLUluZmluaXR5LCAtSW5maW5pdHkpXG4gKi9cblZlY3RvcjIuTUlOID0gbmV3IFZlY3RvcjIoY29uc3RfMS5NSU4sIGNvbnN0XzEuTUlOKTtcbi8qKlxuICogWOi9tOato+aWueWQkVxuICpcbiAqIFRoZSBwb3NpdGl2ZSBkaXJlY3Rpb24gb2YgdGhlIFgtQXhpc1xuICovXG5WZWN0b3IyLlhfRElSRUNUSU9OID0gbmV3IFZlY3RvcjIoY29uc3RfMS5PTkUsIGNvbnN0XzEuWkVSTyk7XG4vKipcbiAqIFnovbTmraPmlrnlkJFcbiAqXG4gKiBUaGUgcG9zaXRpdmUgZGlyZWN0aW9uIG9mIHRoZSBZLUF4aXNcbiAqL1xuVmVjdG9yMi5ZX0RJUkVDVElPTiA9IG5ldyBWZWN0b3IyKGNvbnN0XzEuWkVSTywgY29uc3RfMS5PTkUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlZlY3RvcjMgPSB2b2lkIDA7XG5jb25zdCBjb25zdF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbnN0XCIpO1xuY29uc3QgbnVtYmVyXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tbW9uL251bWJlclwiKTtcbi8qKlxuICog6KGo56S65LiJ57u055qE5LiA5Liq5ZCR6YePXG4gKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgdmVjdG9yIGNvbnRhaW5pbmcgMyBjb29yZGluYXRlc1xuICovXG5jbGFzcyBWZWN0b3IzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOWQkemHj+eahCB4IOWAvFxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGUgWCB2YWx1ZSBvZiB0aGUgY3VycmVudCB2ZWN0b3JcbiAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy54ID0gY29uc3RfMS5aRVJPO1xuICAgICAgICAvKipcbiAgICAgICAgICog5ZCR6YeP55qEIHkg5YC8XG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSBZIHZhbHVlIG9mIHRoZSBjdXJyZW50IHZlY3RvclxuICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnkgPSBjb25zdF8xLlpFUk87XG4gICAgICAgIC8qKlxuICAgICAgICAgKiDlkJHph4/nmoQgeiDlgLxcbiAgICAgICAgICpcbiAgICAgICAgICogVGhlIFogdmFsdWUgb2YgdGhlIGN1cnJlbnQgdmVjdG9yXG4gICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMueiA9IGNvbnN0XzEuWkVSTztcbiAgICAgICAgY29uc3QgW3AxLCBwMiwgcDNdID0gYXJndW1lbnRzO1xuICAgICAgICB0aGlzLnNldChwMSwgcDIsIHAzKTtcbiAgICB9XG4gICAgc2V0KCkge1xuICAgICAgICBpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ251bWJlcicgfHwgdHlwZW9mIGFyZ3VtZW50c1sxXSA9PT0gJ251bWJlcicgfHwgdHlwZW9mIGFyZ3VtZW50c1syXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gdGhpcy54IDogYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgdGhpcy55ID0gYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB0aGlzLnkgOiBhcmd1bWVudHNbMV07XG4gICAgICAgICAgICB0aGlzLnogPSBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IHRoaXMueiA6IGFyZ3VtZW50c1syXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgY29uc3QgeyB4LCB5LCB6IH0gPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICB0aGlzLnggPSB4ID09PSB1bmRlZmluZWQgPyB0aGlzLnggOiB4O1xuICAgICAgICAgICAgdGhpcy55ID0geSA9PT0gdW5kZWZpbmVkID8gdGhpcy55IDogeTtcbiAgICAgICAgICAgIHRoaXMueiA9IHogPT09IHVuZGVmaW5lZCA/IHRoaXMueiA6IHo7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuvue9ruWQkemHj+eahCB4IOWAvFxuICAgICAqXG4gICAgICogU2V0cyB0aGUgeCB2YWx1ZSBvZiB0aGUgY3VycmVudCB2ZWN0b3JcbiAgICAgKiBAcmV0dXJucyDlvZPliY3lkJHph48gKHRoaXMgdmVjdG9yMylcbiAgICAgKi9cbiAgICBzZXRYKHgpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuvue9ruWQkemHj+eahCB5IOWAvFxuICAgICAqXG4gICAgICogU2V0cyB0aGUgeSB2YWx1ZSBvZiB0aGUgY3VycmVudCB2ZWN0b3JcbiAgICAgKiBAcmV0dXJucyDlvZPliY3lkJHph48gKHRoaXMgdmVjdG9yMylcbiAgICAgKi9cbiAgICBzZXRZKHkpIHtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuvue9ruWQkemHj+eahCB6IOWAvFxuICAgICAqXG4gICAgICogU2V0cyB0aGUgeiB2YWx1ZSBvZiB0aGUgY3VycmVudCB2ZWN0b3JcbiAgICAgKiBAcmV0dXJucyDlvZPliY3lkJHph48gKHRoaXMgdmVjdG9yMylcbiAgICAgKi9cbiAgICBzZXRaKHopIHtcbiAgICAgICAgdGhpcy56ID0gejtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWwhuWQkemHjyB2IOeahOWAvOaLt+i0nee7meW9k+WJjeWQkemHj1xuICAgICAqXG4gICAgICogQ29waWVzIHYgdG8gdGhpcyB2ZWN0b3JcbiAgICAgKi9cbiAgICBjb3B5KHYpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0KHYpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlpI3liLblvZPliY3lkJHph49cbiAgICAgKlxuICAgICAqIENsb25lcyB0aGlzIHZlY3RvciB0byBhIG5ldyB2ZWN0b3JcbiAgICAgKi9cbiAgICBjbG9uZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlkJHph4/nmoTplb/luqZcbiAgICAgKlxuICAgICAqIENvbXB1dGVzIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cbiAgICAgKi9cbiAgICBnZXQgbGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuZ3RoU3EpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlkJHph4/plb/luqbnmoTlubPmlrlcbiAgICAgKlxuICAgICAqIENvbXB1dGVzIHNxdWFyZWQgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLlxuICAgICAqL1xuICAgIGdldCBsZW5ndGhTcSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSArIHRoaXMueiAqIHRoaXMuejtcbiAgICB9XG4gICAgYWRkKCkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgY29uc3QgeyB4LCB5LCB6IH0gPSB0aGlzO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHggKyB2YWx1ZSwgeSArIHZhbHVlLCB6ICsgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGNvbnN0IHZ4ID0gdmFsdWUueCB8fCBjb25zdF8xLlpFUk87XG4gICAgICAgICAgICBjb25zdCB2eSA9IHZhbHVlLnkgfHwgY29uc3RfMS5aRVJPO1xuICAgICAgICAgICAgY29uc3QgdnogPSB2YWx1ZS56IHx8IGNvbnN0XzEuWkVSTztcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyh4ICsgdngsIHkgKyB2eSwgeiArIHZ6KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSgpO1xuICAgIH1cbiAgICBzdWIoKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYXJndW1lbnRzWzBdO1xuICAgICAgICBjb25zdCB7IHgsIHksIHogfSA9IHRoaXM7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjMoeCAtIHZhbHVlLCB5IC0gdmFsdWUsIHogLSB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgY29uc3QgdnggPSB2YWx1ZS54IHx8IGNvbnN0XzEuWkVSTztcbiAgICAgICAgICAgIGNvbnN0IHZ5ID0gdmFsdWUueSB8fCBjb25zdF8xLlpFUk87XG4gICAgICAgICAgICBjb25zdCB2eiA9IHZhbHVlLnogfHwgY29uc3RfMS5aRVJPO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHggLSB2eCwgeSAtIHZ5LCB6IC0gdnopO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKCk7XG4gICAgfVxuICAgIG11bHRpcGx5KCkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgY29uc3QgeyB4LCB5LCB6IH0gPSB0aGlzO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHggKiB2YWx1ZSwgeSAqIHZhbHVlLCB6ICogdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGNvbnN0IHZ4ID0gdmFsdWUueCB8fCBjb25zdF8xLk9ORTtcbiAgICAgICAgICAgIGNvbnN0IHZ5ID0gdmFsdWUueSB8fCBjb25zdF8xLk9ORTtcbiAgICAgICAgICAgIGNvbnN0IHZ6ID0gdmFsdWUueiB8fCBjb25zdF8xLk9ORTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyh4ICogdngsIHkgKiB2eSwgeiAqIHZ6KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSgpO1xuICAgIH1cbiAgICBkaXZpZGUoKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYXJndW1lbnRzWzBdO1xuICAgICAgICBjb25zdCB7IHgsIHksIHogfSA9IHRoaXM7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjMoeCAvIHZhbHVlLCB5IC8gdmFsdWUsIHogLyB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgY29uc3QgdnggPSB2YWx1ZS54IHx8IGNvbnN0XzEuT05FO1xuICAgICAgICAgICAgY29uc3QgdnkgPSB2YWx1ZS55IHx8IGNvbnN0XzEuT05FO1xuICAgICAgICAgICAgY29uc3QgdnogPSB2YWx1ZS56IHx8IGNvbnN0XzEuT05FO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHggLyB2eCwgeSAvIHZ5LCB6IC8gdnopO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWvueW9k+WJjeWQkemHj+W6lOeUqOefqemYtVxuICAgICAqXG4gICAgICogQXBwbHkgbWF0cml4NCB0byB0aGUgY3VycmVudCB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gbWF0cml4IEEgTWF0cml4JFxuICAgICAqIEByZXR1cm5zIEEgbmV3IFZlY3RvcjNcbiAgICAgKi9cbiAgICBhcHBseU1hdHJpeDQobWF0cml4KSB7XG4gICAgICAgIGNvbnN0IFttMTEsIG0xMiwgbTEzLCBtMTQsIG0yMSwgbTIyLCBtMjMsIG0yNCwgbTMxLCBtMzIsIG0zMywgbTM0LF0gPSBtYXRyaXgudG9BcnJheSgpO1xuICAgICAgICBjb25zdCB7IHgsIHksIHogfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHZ4ID0gbTExICogeCArIG0xMiAqIHkgKyBtMTMgKiB6ICsgbTE0O1xuICAgICAgICBjb25zdCB2eSA9IG0yMSAqIHggKyBtMjIgKiB5ICsgbTIzICogeiArIG0yNDtcbiAgICAgICAgY29uc3QgdnogPSBtMzEgKiB4ICsgbTMyICogeSArIG0zMyAqIHogKyBtMzQ7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMyh2eCwgdnksIHZ6KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6YCG5ZCR6YePXG4gICAgICpcbiAgICAgKiBJbnZlcnNlIHRoZSBjdXJyZW50IHZlY3RvclxuICAgICAqIEByZXR1cm5zIEEgbmV3IFZlY3RvcjNcbiAgICAgKi9cbiAgICBpbnZlcnNlKCkge1xuICAgICAgICBjb25zdCB7IHgsIHksIHogfSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMygteCwgLXksIC16KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Y2V5L2N5ZCR6YePXG4gICAgICpcbiAgICAgKiBOb3JtYWxpemVzIHRoaXMgdmVjdG9yLlxuICAgICAqIEByZXR1cm5zIEEgbmV3IFZlY3RvcjNcbiAgICAgKi9cbiAgICBub3JtYWxpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKCkuZGl2aWRlKHRoaXMubGVuZ3RoIHx8IDEpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDngrnkuZhcbiAgICAgKlxuICAgICAqIENvbXB1dGVzIGRvdCBwcm9kdWN0IG9mIHRoaXMgdmVjdG9yIGFuZCB2XG4gICAgICovXG4gICAgZG90KHYpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueSArIHRoaXMueiAqIHYuejtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Y+J5LmYXG4gICAgICpcbiAgICAgKiBDb21wdXRlcyBjcm9zcyBwcm9kdWN0IG9mIHRoaXMgdmVjdG9yIGFuZCB2XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VmVjdG9yM30gbmV3IFZlY3RvclxuICAgICAqL1xuICAgIGNyb3NzKHYpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMueSAqIHYueiAtIHRoaXMueiAqIHYueSwgdGhpcy56ICogdi54IC0gdGhpcy54ICogdi56LCB0aGlzLnggKiB2LnkgLSB0aGlzLnkgKiB2LngpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDkuKTkuKrlkJHph4/mmK/lkKbnm7jnrYlcbiAgICAgKlxuICAgICAqIERldGVybWluZXMgd2hldGhlciB0aGlzIHZlY3RvciBhbmQgdiBhcmUgZXF1YWxcbiAgICAgKi9cbiAgICBlcXVhbHModikge1xuICAgICAgICAvLyB0b2RvIHRvbGVyYW5jZVxuICAgICAgICByZXR1cm4gdGhpcy54ID09PSB2LnggJiYgdGhpcy55ID09PSB2LnkgJiYgdGhpcy56ID09PSB2Lno7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOS4pOS4quWQkemHj+aYr+WQpuW5s+ihjFxuICAgICAqXG4gICAgICogRGV0ZXJtaW5lcyAgd2hldGhlciB0aGlzIHZlY3RvciBhbmQgdiBhcmUgcGFyYWxsZWxcbiAgICAgKi9cbiAgICBpc1BhcmFsbGVsKHYpIHtcbiAgICAgICAgY29uc3QgbDEgPSB0aGlzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgbDIgPSB2Lmxlbmd0aDtcbiAgICAgICAgaWYgKGwxID09PSAwIHx8IGwyID09PSAwKSB7XG4gICAgICAgICAgICAvLyB6ZXJvIHZlY3RvclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29zzrggPT09IDBcbiAgICAgICAgY29uc3QgY29zID0gdGhpcy5kb3QodikgLyAobDEgKiBsMik7XG4gICAgICAgIHJldHVybiBudW1iZXJfMS5OdW1iZXJVdGlsLmlzRXF1YWwoY29zLCAxKSB8fCBudW1iZXJfMS5OdW1iZXJVdGlsLmlzRXF1YWwoY29zLCAtMSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOS4pOS4quWQkemHj+aYr+WQpuato+S6pOWeguebtFxuICAgICAqXG4gICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoaXMgdmVjdG9yIGFuZCB2IGFyZSBvcnRob2dvbmFsXG4gICAgICovXG4gICAgaXNPcnRob2dvbmFsKHYpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG90KHYpID09PSAwO1xuICAgIH1cbn1cbmV4cG9ydHMuVmVjdG9yMyA9IFZlY3RvcjM7XG4vKipcbiAqIFZlY3RvcjMgKDAsIDAsIDApXG4gKi9cblZlY3RvcjMuWkVSTyA9IG5ldyBWZWN0b3IzKGNvbnN0XzEuWkVSTywgY29uc3RfMS5aRVJPLCBjb25zdF8xLlpFUk8pO1xuLyoqXG4gKiBWZWN0b3IzICgxLCAxLCAxKVxuICovXG5WZWN0b3IzLk9ORSA9IG5ldyBWZWN0b3IzKGNvbnN0XzEuT05FLCBjb25zdF8xLk9ORSwgY29uc3RfMS5PTkUpO1xuLyoqXG4gKiBWZWN0b3IzIChJbmZpbml0eSwgSW5maW5pdHksIEluZmluaXR5KVxuICovXG5WZWN0b3IzLk1BWCA9IG5ldyBWZWN0b3IzKGNvbnN0XzEuTUFYLCBjb25zdF8xLk1BWCwgY29uc3RfMS5NQVgpO1xuLyoqXG4gKiBWZWN0b3IzICgtSW5maW5pdHksIC1JbmZpbml0eSwgLUluZmluaXR5KVxuICovXG5WZWN0b3IzLk1JTiA9IG5ldyBWZWN0b3IzKGNvbnN0XzEuTUlOLCBjb25zdF8xLk1JTiwgY29uc3RfMS5NSU4pO1xuLyoqXG4gKiBY6L205q2j5pa55ZCRXG4gKlxuICogVGhlIHBvc2l0aXZlIGRpcmVjdGlvbiBvZiB0aGUgWC1BeGlzXG4gKi9cblZlY3RvcjMuWF9ESVJFQ1RJT04gPSBuZXcgVmVjdG9yMyhjb25zdF8xLk9ORSwgY29uc3RfMS5aRVJPLCBjb25zdF8xLlpFUk8pO1xuLyoqXG4gKiBZ6L205q2j5pa55ZCRXG4gKlxuICogVGhlIHBvc2l0aXZlIGRpcmVjdGlvbiBvZiB0aGUgWS1BeGlzXG4gKi9cblZlY3RvcjMuWV9ESVJFQ1RJT04gPSBuZXcgVmVjdG9yMyhjb25zdF8xLlpFUk8sIGNvbnN0XzEuT05FLCBjb25zdF8xLlpFUk8pO1xuLyoqXG4gKiBa6L205q2j5pa55ZCRXG4gKlxuICogVGhlIHBvc2l0aXZlIGRpcmVjdGlvbiBvZiB0aGUgWi1BeGlzXG4gKi9cblZlY3RvcjMuWl9ESVJFQ1RJT04gPSBuZXcgVmVjdG9yMyhjb25zdF8xLlpFUk8sIGNvbnN0XzEuWkVSTywgY29uc3RfMS5PTkUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNpcmNsZVV0aWwgPSB2b2lkIDA7XG5jb25zdCBjb25zdF8xID0gcmVxdWlyZShcIi4uL2NvbnN0XCIpO1xuY29uc3QgbWF0cml4M18xID0gcmVxdWlyZShcIi4uL3VuaXQvbWF0cml4M1wiKTtcbmNvbnN0IHZlY3RvcjJfMSA9IHJlcXVpcmUoXCIuLi91bml0L3ZlY3RvcjJcIik7XG5jbGFzcyBDaXJjbGVVdGlsIHtcbiAgICAvKipcbiAgICAgKiDojrflj5bngrnlnKjlnIbkuIrnmoTop5LluqbvvIjmsLTlubPlkJHlj7PkuLogMO+8iVxuICAgICAqXG4gICAgICogQHBhcmFtIGNlbnRlciDlnIblv4NcbiAgICAgKiBAcGFyYW0gcG9pbnQg55uu5qCH54K5XG4gICAgICogQHBhcmFtIGlzQ2xvY2t3aXNlIOWchuWRqOaYr+WQpumhuuaXtumSiO+8iOm7mOiupO+8mmZhbHNl77yJXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyDnm67moIfop5LluqbvvIjlvKfluqbliLYgcmFkaWFu77yJXG4gICAgICovXG4gICAgc3RhdGljIGdldEFuZ2xlQnlQb2ludChjZW50ZXIsIHBvaW50LCBpc0Nsb2Nrd2lzZSA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGFuZ2xlID0gcG9pbnQuc3ViKGNlbnRlcikuYW5nbGU7XG4gICAgICAgIHJldHVybiBpc0Nsb2Nrd2lzZSA/IGNvbnN0XzEuVFdPX1BJIC0gYW5nbGUgOiBhbmdsZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6I635Y+W6KeS5bqm5a+55bqU5ZyG5ZGo5LiK55qE54K577yI5rC05bmz5ZCR5Y+z5Li6IDDvvIlcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjZW50ZXIg5ZyG5b+DXG4gICAgICogQHBhcmFtIHJhZGl1cyDljYrlvoRcbiAgICAgKiBAcGFyYW0gcmFkaWFuIOebruagh+inkuW6piDvvIjlvKfluqbliLYgcmFkaWFu77yJXG4gICAgICogQHBhcmFtIGlzQ2xvY2t3aXNlIOWchuWRqOaYr+WQpumhuuaXtumSiO+8iOm7mOiupO+8mmZhbHNl77yJXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyDnm67moIfngrlcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0UG9pbnRCeUFuZ2xlKGNlbnRlciwgcmFkaXVzLCByYWRpYW4sIGlzQ2xvY2t3aXNlID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgYW5nbGUgPSBpc0Nsb2Nrd2lzZSA/IGNvbnN0XzEuVFdPX1BJIC0gKHJhZGlhbiAlIGNvbnN0XzEuVFdPX1BJKSA6IChyYWRpYW4gJSBjb25zdF8xLlRXT19QSSk7XG4gICAgICAgIGNvbnN0IHJvdGF0ZSA9IChuZXcgbWF0cml4M18xLk1hdHJpeDMoKSkuZnJvbVJvdGF0ZShhbmdsZSk7XG4gICAgICAgIHJldHVybiBjZW50ZXIuYWRkKHZlY3RvcjJfMS5WZWN0b3IyLlhfRElSRUNUSU9OLmFwcGx5TWF0cml4Myhyb3RhdGUpLm11bHRpcGx5KHJhZGl1cykpO1xuICAgIH1cbn1cbmV4cG9ydHMuQ2lyY2xlVXRpbCA9IENpcmNsZVV0aWw7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVXRpbHMgPSB2b2lkIDA7XG5jb25zdCBjaXJjbGVfMSA9IHJlcXVpcmUoXCIuL2NpcmNsZVwiKTtcbmNvbnN0IGxpbmUyXzEgPSByZXF1aXJlKFwiLi9saW5lMlwiKTtcbmNvbnN0IGxpbmUzXzEgPSByZXF1aXJlKFwiLi9saW5lM1wiKTtcbmNvbnN0IHZlY3RvcjJfMSA9IHJlcXVpcmUoXCIuL3ZlY3RvcjJcIik7XG5jb25zdCB2ZWN0b3IzXzEgPSByZXF1aXJlKFwiLi92ZWN0b3IzXCIpO1xuZXhwb3J0cy5VdGlscyA9IHtcbiAgICBWZWN0b3IyOiB2ZWN0b3IyXzEuVmVjdG9yMlV0aWwsXG4gICAgVmVjdG9yMzogdmVjdG9yM18xLlZlY3RvcjNVdGlsLFxuICAgIExpbmUyOiBsaW5lMl8xLkxpbmUyVXRpbCxcbiAgICBMaW5lMzogbGluZTNfMS5MaW5lM1V0aWwsXG4gICAgQ2lyY2xlOiBjaXJjbGVfMS5DaXJjbGVVdGlsLFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5MaW5lMlV0aWwgPSB2b2lkIDA7XG5jb25zdCBsaW5lMl8xID0gcmVxdWlyZShcIi4uL3VuaXQvbGluZTJcIik7XG5jb25zdCB2ZWN0b3IyXzEgPSByZXF1aXJlKFwiLi4vdW5pdC92ZWN0b3IyXCIpO1xuY2xhc3MgTGluZTJVdGlsIHtcbiAgICAvKipcbiAgICAgKiDkuKTmnaHnm7Tnur/mmK/lkKbnm7jkuqRcbiAgICAgKlxuICAgICAqIERldGVybWluZSB3aGV0aGVyIGxpbmVzIEwxIGFuZCBMMiBpbnRlcnNlY3QgKOWIpOaWre+8muebtOe6vyBsMSDlkoznm7Tnur8gbDIg5piv5ZCm55u45LqkKVxuICAgICAqIEBwYXJhbSBsaW5lMSBzdHJhaWdodCBsaW5lMVxuICAgICAqIEBwYXJhbSBsaW5lMiBzdHJhaWdodCBsaW5lMlxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgc3RhdGljIGlzTGluZUludGVyc2VjdExpbmUobGluZTEsIGxpbmUyKSB7XG4gICAgICAgIHJldHVybiAhbGluZTEuaXNQYXJhbGxlbChsaW5lMik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOebtOe6vyBsaW5lIOWSjOe6v+autSBzZWdtZW50IOaYr+WQpuebuOS6pFxuICAgICAqXG4gICAgICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIHN0cmFpZ2h0IGxpbmUgYW5kIHRoZSBsaW5lIHNlZ21lbnQgaW50ZXJzZWN0ICjliKTmlq3vvJrnm7Tnur8gbGluZSDlkoznur/mrrUgc2VnbWVudCDmmK/lkKbnm7jkuqQpXG4gICAgICogQHBhcmFtIGxpbmUgc3RyYWlnaHQgbGluZVxuICAgICAqIEBwYXJhbSBzZWdtZW50IHNlZ21lbnQgbGluZVxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgc3RhdGljIGlzTGluZUludGVyc2VjdFNlZ21lbnQobGluZSwgc2VnbWVudCkge1xuICAgICAgICBpZiAobGluZS5pc1BhcmFsbGVsKHNlZ21lbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8g5Yik5patIHNlZ21lbnQg55qE56uv54K55piv5ZCm5Zyo55u057q/55qE5Lik5L6n77yM5oiW5Zyo55u057q/5LiKXG4gICAgICAgIGNvbnN0IHN0YXJ0U2lkZSA9IGxpbmUuZ2V0U2lkZShzZWdtZW50LnN0YXJ0KTtcbiAgICAgICAgY29uc3QgZW5kU2lkZSA9IGxpbmUuZ2V0U2lkZShzZWdtZW50LmVuZCk7XG4gICAgICAgIHJldHVybiAoc3RhcnRTaWRlID09PSBsaW5lMl8xLkxpbmVTaWRlLk9uIHx8IGVuZFNpZGUgPT09IGxpbmUyXzEuTGluZVNpZGUuT24pIHx8IHN0YXJ0U2lkZSAhPT0gZW5kU2lkZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Lik5p2h57q/5q615piv5ZCm55u45LqkXG4gICAgICpcbiAgICAgKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgbGluZSBzZWdtZW50cyBpbnRlcnNlY3QgKOWIpOaWre+8mue6v+autSBzZWdtZW50MSDlkoznur/mrrUgc2VnbWVudDIg5piv5ZCm55u45LqkKVxuICAgICAqIEBwYXJhbSBzZWdtZW50MSBsaW5lIHNlZ21lbnQxXG4gICAgICogQHBhcmFtIHNlZ21lbnQyIGxpbmUgc2VnbWVudDJcbiAgICAgKi9cbiAgICBzdGF0aWMgaXNTZWdtZW50SW50ZXJzZWN0U2VnbWVudChzZWdtZW50MSwgc2VnbWVudDIpIHtcbiAgICAgICAgLy8g5Yik5pat77ya5q+P5p2h57q/5q616YO95YiG5Yir6Leo6LaK5LqG5Y+m5LiA5p2h57q/5q615omA5Zyo55u057q/77yM5Y2z5Lik5Liq56uv54K55YiG5Yir5Zyo6K+l55u057q/5Lik5L6nXG4gICAgICAgIGNvbnN0IHN0YXJ0U2lkZTEgPSBzZWdtZW50Mi5nZXRTaWRlKHNlZ21lbnQxLnN0YXJ0KTtcbiAgICAgICAgY29uc3QgZW5kU2lkZTEgPSBzZWdtZW50Mi5nZXRTaWRlKHNlZ21lbnQxLmVuZCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0U2lkZTIgPSBzZWdtZW50MS5nZXRTaWRlKHNlZ21lbnQyLnN0YXJ0KTtcbiAgICAgICAgY29uc3QgZW5kU2lkZTIgPSBzZWdtZW50MS5nZXRTaWRlKHNlZ21lbnQyLmVuZCk7XG4gICAgICAgIGlmIChzdGFydFNpZGUxID09PSBsaW5lMl8xLkxpbmVTaWRlLk9uICYmIHNlZ21lbnQyLmlzUG9pbnRPblNlZ21lbnQoc2VnbWVudDEuc3RhcnQpIHx8XG4gICAgICAgICAgICBlbmRTaWRlMSA9PT0gbGluZTJfMS5MaW5lU2lkZS5PbiAmJiBzZWdtZW50Mi5pc1BvaW50T25TZWdtZW50KHNlZ21lbnQxLmVuZCkgfHxcbiAgICAgICAgICAgIHN0YXJ0U2lkZTIgPT09IGxpbmUyXzEuTGluZVNpZGUuT24gJiYgc2VnbWVudDEuaXNQb2ludE9uU2VnbWVudChzZWdtZW50Mi5zdGFydCkgfHxcbiAgICAgICAgICAgIGVuZFNpZGUyID09PSBsaW5lMl8xLkxpbmVTaWRlLk9uICYmIHNlZ21lbnQxLmlzUG9pbnRPblNlZ21lbnQoc2VnbWVudDIuZW5kKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXJ0U2lkZTEgIT09IGVuZFNpZGUxICYmIHN0YXJ0U2lkZTIgIT09IGVuZFNpZGUyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmsYLkuKTmnaHnm7Tnur/nmoTkuqTngrlcbiAgICAgKlxuICAgICAqIENhbGN1bGF0ZSB0aGUgaW50ZXJzZWN0aW9uIG9mIGxpbmUxIGFuZCBsaW5lMlxuICAgICAqIEBwYXJhbSBsaW5lMSBzdHJhaWdodCBsaW5lXG4gICAgICogQHBhcmFtIGxpbmUyIHN0cmFpZ2h0IGxpbmVcbiAgICAgKi9cbiAgICBzdGF0aWMgbGluZUludGVyc2VjdExpbmUobGluZTEsIGxpbmUyKSB7XG4gICAgICAgIC8vIHsgeDAsIHkwIH0geyB4MSwgeTEgfSDmmK8gbGluZTEg5LiK55qE5Lik5Liq54K5XG4gICAgICAgIGNvbnN0IHsgeDogeDAsIHk6IHkwIH0gPSBsaW5lMS5zdGFydDtcbiAgICAgICAgY29uc3QgeyB4OiB4MSwgeTogeTEgfSA9IGxpbmUxLmVuZDtcbiAgICAgICAgLy8geyB4MiwgeTIgfSB7IHgzLCB5MyB9IOaYryBsaW5lMiDkuIrnmoTkuKTkuKrngrlcbiAgICAgICAgY29uc3QgeyB4OiB4MiwgeTogeTIgfSA9IGxpbmUyLnN0YXJ0O1xuICAgICAgICBjb25zdCB7IHg6IHgzLCB5OiB5MyB9ID0gbGluZTIuZW5kO1xuICAgICAgICAvKipcbiAgICAgICAgICog6K6h566X55u057q/5LiA6Iis5byPXG4gICAgICAgICAqIEF4ICsgQnkgKyBDID0gMFxuICAgICAgICAgKlxuICAgICAgICAgKiDphY3nva7kuIDvvJpcbiAgICAgICAgICogQSA9IHkyIC0geTE7XG4gICAgICAgICAqIEIgPSB4MSAtIHgyO1xuICAgICAgICAgKiBDID0geDIgKiB5MSAtIHgxICogeTI7XG4gICAgICAgICAqXG4gICAgICAgICAqIOmFjee9ruS6jO+8mlxuICAgICAgICAgKiBBID0geTEgLSB5MjtcbiAgICAgICAgICogQiA9IHgyIC0geDE7XG4gICAgICAgICAqIEMgPSB4MSAqIHkyIC0geDIgKiB5MVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgYTEgPSB5MSAtIHkwO1xuICAgICAgICBjb25zdCBiMSA9IHgwIC0geDE7XG4gICAgICAgIGNvbnN0IGMxID0geDEgKiB5MCAtIHgwICogeTE7XG4gICAgICAgIGNvbnN0IGEyID0geTMgLSB5MjtcbiAgICAgICAgY29uc3QgYjIgPSB4MiAtIHgzO1xuICAgICAgICBjb25zdCBjMiA9IHgzICogeTIgLSB4MiAqIHkzO1xuICAgICAgICAvLyBBMSAqIEIyID0gQjEgKiBBMiDliJnkuKTnm7Tnur/lubPooYzvvIzor6bop4HvvJpodHRwczovL2JhaWtlLmJhaWR1LmNvbS9pdGVtLyVFNCVCOCU4MCVFOCU4OCVBQyVFNSVCQyU4RlxuICAgICAgICBjb25zdCByZXN1bHQgPSBhMSAqIGIyIC0gYTIgKiBiMTtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gMCkge1xuICAgICAgICAgICAgLy8g5Lik55u057q/5bmz6KGMXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHggPSAoYjEgKiBjMiAtIGIyICogYzEpIC8gcmVzdWx0O1xuICAgICAgICBjb25zdCB5ID0gKGEyICogYzEgLSBhMSAqIGMyKSAvIHJlc3VsdDtcbiAgICAgICAgcmV0dXJuIG5ldyB2ZWN0b3IyXzEuVmVjdG9yMih4LCB5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5rGC5pSv55u057q/IGxpbmUg5ZKM57q/5q61IHNlZ21lbnQg55qE5Lqk54K5XG4gICAgICpcbiAgICAgKiBDYWxjdWxhdGUgdGhlIGludGVyc2VjdGlvbiBvZiBsaW5lIGFuZCBzZWdtZW50XG4gICAgICogQHBhcmFtIGxpbmUgc3RyYWlnaHQgbGluZVxuICAgICAqIEBwYXJhbSBzZWdtZW50IHNlZ21lbnQgbGluZVxuICAgICAqL1xuICAgIHN0YXRpYyBsaW5lSW50ZXJzZWN0U2VnbWVudChsaW5lLCBzZWdtZW50KSB7XG4gICAgICAgIGNvbnN0IHBvaW50ID0gdGhpcy5saW5lSW50ZXJzZWN0TGluZShsaW5lLCBzZWdtZW50KTtcbiAgICAgICAgaWYgKHBvaW50KSB7XG4gICAgICAgICAgICBpZiAoc2VnbWVudC5pc1BvaW50T25TZWdtZW50KHBvaW50KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwb2ludDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDmsYLkuKTmnaHnur/mrrXnmoTkuqTngrlcbiAgICAgKlxuICAgICAqIENhbGN1bGF0ZSB0aGUgaW50ZXJzZWN0aW9uIG9mIHNlZ21lbnQxIGFuZCBzZWdtZW50MlxuICAgICAqIEBwYXJhbSBzZWdtZW50MSBzZWdtZW50IGxpbmVcbiAgICAgKiBAcGFyYW0gc2VnbWVudDIgc2VnbWVudCBsaW5lXG4gICAgICovXG4gICAgc3RhdGljIHNlZ21lbnRJbnRlcnNlY3RTZWdtZW50KHNlZ21lbnQxLCBzZWdtZW50Mikge1xuICAgICAgICBjb25zdCBwb2ludCA9IHRoaXMubGluZUludGVyc2VjdExpbmUoc2VnbWVudDEsIHNlZ21lbnQyKTtcbiAgICAgICAgaWYgKHBvaW50KSB7XG4gICAgICAgICAgICBpZiAoc2VnbWVudDEuaXNQb2ludE9uU2VnbWVudChwb2ludCkgJiYgc2VnbWVudDIuaXNQb2ludE9uU2VnbWVudChwb2ludCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9pbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog6K6h566X6YCa6L+HIHBvaW50IOeahCBsaW5lIOeahOWegue6v1xuICAgICAqXG4gICAgICogQ2FsY3VsYXRlIHRoZSBwZXJwZW5kaWN1bGFyIHRvIHRoZSBsaW5lIHBhc3NpbmcgdGhyb3VnaCB0aGUgcG9pbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBsaW5lIOebruagh+ebtOe6v1xuICAgICAqIEBwYXJhbSBwb2ludCDnm67moIfngrlcbiAgICAgKi9cbiAgICBzdGF0aWMgY2FsY1BlcnBlbmRpY3VsYXJUaHJvdWdoUG9pbnQobGluZSwgcG9pbnQpIHtcbiAgICAgICAgY29uc3QgdmVydGljYWxEaXIgPSBsaW5lLmdldFNpZGUocG9pbnQpID09PSBsaW5lMl8xLkxpbmVTaWRlLlJpZ2h0ID8gbGluZS5yaWdodERpcmVjdGlvbiA6IGxpbmUubGVmdERpcmVjdGlvbjtcbiAgICAgICAgcmV0dXJuIG5ldyBsaW5lMl8xLkxpbmUyKHBvaW50LCBwb2ludC5hZGQodmVydGljYWxEaXIubXVsdGlwbHkoMTApKSk7XG4gICAgfVxufVxuZXhwb3J0cy5MaW5lMlV0aWwgPSBMaW5lMlV0aWw7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTGluZTNVdGlsID0gdm9pZCAwO1xuY29uc3QgdmVjdG9yM18xID0gcmVxdWlyZShcIi4uL3VuaXQvdmVjdG9yM1wiKTtcbmNsYXNzIExpbmUzVXRpbCB7XG4gICAgLyoqXG4gICAgICog55u057q/IGxpbmUg5piv5ZCm5ZKMIFjovbQg5bmz6KGMXG4gICAgICpcbiAgICAgKiBEZXRlcm1pbmVzIHRoZSBsaW5lIGlzIHBhcmFsbGVsIHRvIFgtQXhpc1xuICAgICAqL1xuICAgIHN0YXRpYyBpc1BhcmFsbGVsVG9YQXhpcyhsaW5lKSB7XG4gICAgICAgIHJldHVybiBsaW5lLmRpcmVjdGlvbi5pc1BhcmFsbGVsKHZlY3RvcjNfMS5WZWN0b3IzLlhfRElSRUNUSU9OKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog55u057q/IGxpbmUg5piv5ZCm5ZKMIFnovbQg5bmz6KGMXG4gICAgICpcbiAgICAgKiBEZXRlcm1pbmVzIHRoZSBsaW5lIGlzIHBhcmFsbGVsIHRvIFktQXhpc1xuICAgICAqL1xuICAgIHN0YXRpYyBpc1BhcmFsbGVsVG9ZQXhpcyhsaW5lKSB7XG4gICAgICAgIHJldHVybiBsaW5lLmRpcmVjdGlvbi5pc1BhcmFsbGVsKHZlY3RvcjNfMS5WZWN0b3IzLllfRElSRUNUSU9OKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog55u057q/IGxpbmUg5piv5ZCm5ZKMIFrovbQg5bmz6KGMXG4gICAgICpcbiAgICAgKiBEZXRlcm1pbmVzIHRoZSBsaW5lIGlzIHBhcmFsbGVsIHRvIFotQXhpc1xuICAgICAqL1xuICAgIHN0YXRpYyBpc1BhcmFsbGVsVG9aQXhpcyhsaW5lKSB7XG4gICAgICAgIHJldHVybiBsaW5lLmRpcmVjdGlvbi5pc1BhcmFsbGVsKHZlY3RvcjNfMS5WZWN0b3IzLlpfRElSRUNUSU9OKTtcbiAgICB9XG59XG5leHBvcnRzLkxpbmUzVXRpbCA9IExpbmUzVXRpbDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5WZWN0b3IyVXRpbCA9IHZvaWQgMDtcbmNvbnN0IHZlY3RvcjJfMSA9IHJlcXVpcmUoXCIuLi91bml0L3ZlY3RvcjJcIik7XG5jbGFzcyBWZWN0b3IyVXRpbCB7XG4gICAgLyoqXG4gICAgICog6I635Y+W5Z6C55u05LqO55uu5qCH5ZCR6YeP55qE5bem5ZCR6YePXG4gICAgICpcbiAgICAgKiBHZXQgdGhlIGxlZnQgdmVjdG9yMiBwZXJwZW5kaWN1bGFyIHRvIHRoZSB2ZWNcbiAgICAgKiBAcGFyYW0gdmVjIHRoZSB0YXJnZXQgdmVjdG9yMlxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRMZWZ0RGlyZWN0aW9uKHZlYykge1xuICAgICAgICAvLyBlcXVhbHMgdG8gLSB2ZWMuYXBwbHlNYXRyaXgzKG5ldyBNYXRyaXgzKCkuZnJvbVJvdGF0ZShNYXRoLlBJIC8gMikpO1xuICAgICAgICBjb25zdCB7IHgsIHkgfSA9IHZlYztcbiAgICAgICAgcmV0dXJuIG5ldyB2ZWN0b3IyXzEuVmVjdG9yMigteSwgeCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiOt+WPluWeguebtOS6juebruagh+WQkemHj+eahOWPs+WQkemHj1xuICAgICAqXG4gICAgICogR2V0IHRoZSByaWdodCB2ZWN0b3IyIHBlcnBlbmRpY3VsYXIgdG8gdGhlIHZlY1xuICAgICAqIEBwYXJhbSB2ZWMgdGhlIHRhcmdldCB2ZWN0b3IyXG4gICAgICovXG4gICAgc3RhdGljIGdldFJpZ2h0RGlyZWN0aW9uKHZlYykge1xuICAgICAgICAvLyBlcXVhbHMgdG8gLSB2ZWMuYXBwbHlNYXRyaXgzKG5ldyBNYXRyaXgzKCkuZnJvbVJvdGF0ZShNYXRoLlBJICogMyAvIDIpKTtcbiAgICAgICAgY29uc3QgeyB4LCB5IH0gPSB2ZWM7XG4gICAgICAgIHJldHVybiBuZXcgdmVjdG9yMl8xLlZlY3RvcjIoeSwgLXgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDorqHnrpflkJHph48odjIgLT4gdjEpIOWSjOWQkemHjyh2MyAtPiB2MSkg55qE5Y+J56evXG4gICAgICpcbiAgICAgKiBDb21wdXRlcyBjcm9zcyBwcm9kdWN0IG9mICh2MiAtPiB2MSkgYW5kICh2MyAtPiB2MSlcbiAgICAgKi9cbiAgICBzdGF0aWMgY3Jvc3MzKHYxLCB2MiwgdjMpIHtcbiAgICAgICAgY29uc3QgdjEyID0gdjIuc3ViKHYxKTtcbiAgICAgICAgY29uc3QgdjEzID0gdjMuc3ViKHYxKTtcbiAgICAgICAgcmV0dXJuIHYxMi5jcm9zcyh2MTMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDorqHnrpflkJHph48odjIgLT4gdjEpIOWSjOWQkemHjyh2MyAtPiB2MSkg55qE54K556evXG4gICAgICpcbiAgICAgKiBDb21wdXRlcyBkb3QgcHJvZHVjdCBvZiAodjIgLT4gdjEpIGFuZCAodjMgLT4gdjEpXG4gICAgICovXG4gICAgc3RhdGljIGRvdDModjEsIHYyLCB2Mykge1xuICAgICAgICBjb25zdCB2MTIgPSB2Mi5zdWIodjEpO1xuICAgICAgICBjb25zdCB2MTMgPSB2My5zdWIodjEpO1xuICAgICAgICByZXR1cm4gdjEyLmRvdCh2MTMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDojrflj5bkuKTngrnpl7TnmoTot53nprtcbiAgICAgKlxuICAgICAqIENvbXB1dGVkIHRoZSBkaXN0YW5jZSBmcm9tIHYxIHRvIHYyXG4gICAgICovXG4gICAgc3RhdGljIGRpc3RhbmNlKHYxLCB2Mikge1xuICAgICAgICByZXR1cm4gdjIuc3ViKHYxKS5sZW5ndGg7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuoeeulyB2MSAtPiB2MiDnmoTmlrnlkJHlkJHph49cbiAgICAgKlxuICAgICAqIENvbXB1dGVkIHRoZSBkaXJlY3Rpb24gZnJvbSB2MSB0byB2MlxuICAgICAqXG4gICAgICogQHBhcmFtIHYxIFZlY3RvcjJcbiAgICAgKiBAcGFyYW0gdjIgVmVjdG9yMlxuICAgICAqL1xuICAgIHN0YXRpYyBkaXJlY3Rpb24odjEsIHYyKSB7XG4gICAgICAgIHJldHVybiB2Mi5zdWIodjEpLm5vcm1hbGl6ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDorqHnrpfvvIh2MSwgdjLvvInnmoTkuK3ngrlcbiAgICAgKlxuICAgICAqIENvbXB1dGVkIHRoZSBjZW50ZXIgb2YgdjEgYW5kIHYyXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdjEgVmVjdG9yMlxuICAgICAqIEBwYXJhbSB2MiBWZWN0b3IyXG4gICAgICovXG4gICAgc3RhdGljIGNlbnRlcih2MSwgdjIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJwb2xhdGUodjEsIHYyLCAwLjUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDorqHnrpcgdjEg5YiwIHYyIOeahOe6v+aAp+aPkuWAvFxuICAgICAqXG4gICAgICogQ2FsY3VsYXRlIHRoZSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBvZiB2MSB0byB2MlxuICAgICAqXG4gICAgICogQHBhcmFtIHYxIFZlY3RvcjJcbiAgICAgKiBAcGFyYW0gdjIgVmVjdG9yMlxuICAgICAqIEBwYXJhbSBhbHBoYSDnur/mgKfmj5LlgLznmoTnmb7liIbmr5RcbiAgICAgKi9cbiAgICBzdGF0aWMgaW50ZXJwb2xhdGUodjEsIHYyLCBhbHBoYSkge1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSB2Mi5zdWIodjEpO1xuICAgICAgICByZXR1cm4gdjEuYWRkKGRpcmVjdGlvbi5ub3JtYWxpemUoKS5tdWx0aXBseShkaXJlY3Rpb24ubGVuZ3RoICogYWxwaGEpKTtcbiAgICB9XG59XG5leHBvcnRzLlZlY3RvcjJVdGlsID0gVmVjdG9yMlV0aWw7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVmVjdG9yM1V0aWwgPSB2b2lkIDA7XG5jbGFzcyBWZWN0b3IzVXRpbCB7XG4gICAgLyoqXG4gICAgICog6K6h566X5ZCR6YePKHYyIC0+IHYxKSDlkozlkJHph48odjMgLT4gdjEpIOeahOWPieenr1xuICAgICAqXG4gICAgICogQ29tcHV0ZXMgY3Jvc3MgcHJvZHVjdCBvZiAodjIgLT4gdjEpIGFuZCAodjMgLT4gdjEpXG4gICAgICovXG4gICAgc3RhdGljIGNyb3NzMyh2MSwgdjIsIHYzKSB7XG4gICAgICAgIGNvbnN0IHYxMiA9IHYyLnN1Yih2MSk7XG4gICAgICAgIGNvbnN0IHYxMyA9IHYzLnN1Yih2MSk7XG4gICAgICAgIHJldHVybiB2MTIuY3Jvc3ModjEzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6K6h566X5ZCR6YePKHYyIC0+IHYxKSDlkozlkJHph48odjMgLT4gdjEpIOeahOeCueenr1xuICAgICAqXG4gICAgICogQ29tcHV0ZXMgZG90IHByb2R1Y3Qgb2YgKHYyIC0+IHYxKSBhbmQgKHYzIC0+IHYxKVxuICAgICAqL1xuICAgIHN0YXRpYyBkb3QzKHYxLCB2MiwgdjMpIHtcbiAgICAgICAgY29uc3QgdjEyID0gdjIuc3ViKHYxKTtcbiAgICAgICAgY29uc3QgdjEzID0gdjMuc3ViKHYxKTtcbiAgICAgICAgcmV0dXJuIHYxMi5kb3QodjEzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6I635Y+W5Lik54K56Ze055qE6Led56a7XG4gICAgICpcbiAgICAgKiBDb21wdXRlZCB0aGUgZGlzdGFuY2UgZnJvbSB2MSB0byB2MlxuICAgICAqL1xuICAgIHN0YXRpYyBkaXN0YW5jZSh2MSwgdjIpIHtcbiAgICAgICAgcmV0dXJuIHYyLnN1Yih2MSkubGVuZ3RoO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDorqHnrpcgdjEg5YiwIHYyIOeahOe6v+aAp+aPkuWAvFxuICAgICAqXG4gICAgICogQ2FsY3VsYXRlIHRoZSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBvZiB2MSB0byB2MlxuICAgICAqXG4gICAgICogQHBhcmFtIHYxIFZlY3RvcjNcbiAgICAgKiBAcGFyYW0gdjIgVmVjdG9yM1xuICAgICAqIEBwYXJhbSBhbHBoYSDnur/mgKfmj5LlgLznmoTnmb7liIbmr5RcbiAgICAgKi9cbiAgICBzdGF0aWMgaW50ZXJwb2xhdGUodjEsIHYyLCBhbHBoYSkge1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSB2Mi5zdWIodjEpO1xuICAgICAgICByZXR1cm4gdjEuYWRkKGRpcmVjdGlvbi5ub3JtYWxpemUoKS5tdWx0aXBseShkaXJlY3Rpb24ubGVuZ3RoICogYWxwaGEpKTtcbiAgICB9XG59XG5leHBvcnRzLlZlY3RvcjNVdGlsID0gVmVjdG9yM1V0aWw7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIERhdGFWaWV3ID0gZ2V0TmF0aXZlKHJvb3QsICdEYXRhVmlldycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFWaWV3O1xuIiwidmFyIGhhc2hDbGVhciA9IHJlcXVpcmUoJy4vX2hhc2hDbGVhcicpLFxuICAgIGhhc2hEZWxldGUgPSByZXF1aXJlKCcuL19oYXNoRGVsZXRlJyksXG4gICAgaGFzaEdldCA9IHJlcXVpcmUoJy4vX2hhc2hHZXQnKSxcbiAgICBoYXNoSGFzID0gcmVxdWlyZSgnLi9faGFzaEhhcycpLFxuICAgIGhhc2hTZXQgPSByZXF1aXJlKCcuL19oYXNoU2V0Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhhc2ggb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBIYXNoKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID09IG51bGwgPyAwIDogZW50cmllcy5sZW5ndGg7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYEhhc2hgLlxuSGFzaC5wcm90b3R5cGUuY2xlYXIgPSBoYXNoQ2xlYXI7XG5IYXNoLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBoYXNoRGVsZXRlO1xuSGFzaC5wcm90b3R5cGUuZ2V0ID0gaGFzaEdldDtcbkhhc2gucHJvdG90eXBlLmhhcyA9IGhhc2hIYXM7XG5IYXNoLnByb3RvdHlwZS5zZXQgPSBoYXNoU2V0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhhc2g7XG4iLCJ2YXIgbGlzdENhY2hlQ2xlYXIgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVDbGVhcicpLFxuICAgIGxpc3RDYWNoZURlbGV0ZSA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZURlbGV0ZScpLFxuICAgIGxpc3RDYWNoZUdldCA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZUdldCcpLFxuICAgIGxpc3RDYWNoZUhhcyA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZUhhcycpLFxuICAgIGxpc3RDYWNoZVNldCA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZVNldCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gbGlzdCBjYWNoZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIExpc3RDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA9PSBudWxsID8gMCA6IGVudHJpZXMubGVuZ3RoO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBMaXN0Q2FjaGVgLlxuTGlzdENhY2hlLnByb3RvdHlwZS5jbGVhciA9IGxpc3RDYWNoZUNsZWFyO1xuTGlzdENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBsaXN0Q2FjaGVEZWxldGU7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmdldCA9IGxpc3RDYWNoZUdldDtcbkxpc3RDYWNoZS5wcm90b3R5cGUuaGFzID0gbGlzdENhY2hlSGFzO1xuTGlzdENhY2hlLnByb3RvdHlwZS5zZXQgPSBsaXN0Q2FjaGVTZXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gTGlzdENhY2hlO1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcDtcbiIsInZhciBtYXBDYWNoZUNsZWFyID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVDbGVhcicpLFxuICAgIG1hcENhY2hlRGVsZXRlID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVEZWxldGUnKSxcbiAgICBtYXBDYWNoZUdldCA9IHJlcXVpcmUoJy4vX21hcENhY2hlR2V0JyksXG4gICAgbWFwQ2FjaGVIYXMgPSByZXF1aXJlKCcuL19tYXBDYWNoZUhhcycpLFxuICAgIG1hcENhY2hlU2V0ID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVTZXQnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIE1hcENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID09IG51bGwgPyAwIDogZW50cmllcy5sZW5ndGg7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYE1hcENhY2hlYC5cbk1hcENhY2hlLnByb3RvdHlwZS5jbGVhciA9IG1hcENhY2hlQ2xlYXI7XG5NYXBDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbWFwQ2FjaGVEZWxldGU7XG5NYXBDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbWFwQ2FjaGVHZXQ7XG5NYXBDYWNoZS5wcm90b3R5cGUuaGFzID0gbWFwQ2FjaGVIYXM7XG5NYXBDYWNoZS5wcm90b3R5cGUuc2V0ID0gbWFwQ2FjaGVTZXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwQ2FjaGU7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFByb21pc2UgPSBnZXROYXRpdmUocm9vdCwgJ1Byb21pc2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9taXNlO1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBTZXQgPSBnZXROYXRpdmUocm9vdCwgJ1NldCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNldDtcbiIsInZhciBNYXBDYWNoZSA9IHJlcXVpcmUoJy4vX01hcENhY2hlJyksXG4gICAgc2V0Q2FjaGVBZGQgPSByZXF1aXJlKCcuL19zZXRDYWNoZUFkZCcpLFxuICAgIHNldENhY2hlSGFzID0gcmVxdWlyZSgnLi9fc2V0Q2FjaGVIYXMnKTtcblxuLyoqXG4gKlxuICogQ3JlYXRlcyBhbiBhcnJheSBjYWNoZSBvYmplY3QgdG8gc3RvcmUgdW5pcXVlIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTZXRDYWNoZSh2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMgPT0gbnVsbCA/IDAgOiB2YWx1ZXMubGVuZ3RoO1xuXG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGU7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdGhpcy5hZGQodmFsdWVzW2luZGV4XSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFNldENhY2hlYC5cblNldENhY2hlLnByb3RvdHlwZS5hZGQgPSBTZXRDYWNoZS5wcm90b3R5cGUucHVzaCA9IHNldENhY2hlQWRkO1xuU2V0Q2FjaGUucHJvdG90eXBlLmhhcyA9IHNldENhY2hlSGFzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNldENhY2hlO1xuIiwidmFyIExpc3RDYWNoZSA9IHJlcXVpcmUoJy4vX0xpc3RDYWNoZScpLFxuICAgIHN0YWNrQ2xlYXIgPSByZXF1aXJlKCcuL19zdGFja0NsZWFyJyksXG4gICAgc3RhY2tEZWxldGUgPSByZXF1aXJlKCcuL19zdGFja0RlbGV0ZScpLFxuICAgIHN0YWNrR2V0ID0gcmVxdWlyZSgnLi9fc3RhY2tHZXQnKSxcbiAgICBzdGFja0hhcyA9IHJlcXVpcmUoJy4vX3N0YWNrSGFzJyksXG4gICAgc3RhY2tTZXQgPSByZXF1aXJlKCcuL19zdGFja1NldCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBzdGFjayBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTdGFjayhlbnRyaWVzKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyA9IG5ldyBMaXN0Q2FjaGUoZW50cmllcyk7XG4gIHRoaXMuc2l6ZSA9IGRhdGEuc2l6ZTtcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFN0YWNrYC5cblN0YWNrLnByb3RvdHlwZS5jbGVhciA9IHN0YWNrQ2xlYXI7XG5TdGFjay5wcm90b3R5cGVbJ2RlbGV0ZSddID0gc3RhY2tEZWxldGU7XG5TdGFjay5wcm90b3R5cGUuZ2V0ID0gc3RhY2tHZXQ7XG5TdGFjay5wcm90b3R5cGUuaGFzID0gc3RhY2tIYXM7XG5TdGFjay5wcm90b3R5cGUuc2V0ID0gc3RhY2tTZXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gU3RhY2s7XG4iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbm1vZHVsZS5leHBvcnRzID0gU3ltYm9sO1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFVpbnQ4QXJyYXkgPSByb290LlVpbnQ4QXJyYXk7XG5cbm1vZHVsZS5leHBvcnRzID0gVWludDhBcnJheTtcbiIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKSxcbiAgICByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgV2Vha01hcCA9IGdldE5hdGl2ZShyb290LCAnV2Vha01hcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdlYWtNYXA7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5mb3JFYWNoYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlFYWNoKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlFYWNoO1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZmlsdGVyYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZmlsdGVyZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RmlsdGVyKGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc0luZGV4ID0gMCxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdO1xuICAgIGlmIChwcmVkaWNhdGUodmFsdWUsIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJlc3VsdFtyZXNJbmRleCsrXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5RmlsdGVyO1xuIiwidmFyIGJhc2VJbmRleE9mID0gcmVxdWlyZSgnLi9fYmFzZUluZGV4T2YnKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uaW5jbHVkZXNgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogc3BlY2lmeWluZyBhbiBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdGFyZ2V0IFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB0YXJnZXRgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5SW5jbHVkZXMoYXJyYXksIHZhbHVlKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgMCkgPiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheUluY2x1ZGVzO1xuIiwiLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgYGFycmF5SW5jbHVkZXNgIGV4Y2VwdCB0aGF0IGl0IGFjY2VwdHMgYSBjb21wYXJhdG9yLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB0YXJnZXQgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wYXJhdG9yIFRoZSBjb21wYXJhdG9yIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHRhcmdldGAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlJbmNsdWRlc1dpdGgoYXJyYXksIHZhbHVlLCBjb21wYXJhdG9yKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoY29tcGFyYXRvcih2YWx1ZSwgYXJyYXlbaW5kZXhdKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheUluY2x1ZGVzV2l0aDtcbiIsInZhciBiYXNlVGltZXMgPSByZXF1aXJlKCcuL19iYXNlVGltZXMnKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNCdWZmZXIgPSByZXF1aXJlKCcuL2lzQnVmZmVyJyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4vX2lzSW5kZXgnKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuL2lzVHlwZWRBcnJheScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgdGhlIGFycmF5LWxpa2UgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRlZCBTcGVjaWZ5IHJldHVybmluZyBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhcnJheUxpa2VLZXlzKHZhbHVlLCBpbmhlcml0ZWQpIHtcbiAgdmFyIGlzQXJyID0gaXNBcnJheSh2YWx1ZSksXG4gICAgICBpc0FyZyA9ICFpc0FyciAmJiBpc0FyZ3VtZW50cyh2YWx1ZSksXG4gICAgICBpc0J1ZmYgPSAhaXNBcnIgJiYgIWlzQXJnICYmIGlzQnVmZmVyKHZhbHVlKSxcbiAgICAgIGlzVHlwZSA9ICFpc0FyciAmJiAhaXNBcmcgJiYgIWlzQnVmZiAmJiBpc1R5cGVkQXJyYXkodmFsdWUpLFxuICAgICAgc2tpcEluZGV4ZXMgPSBpc0FyciB8fCBpc0FyZyB8fCBpc0J1ZmYgfHwgaXNUeXBlLFxuICAgICAgcmVzdWx0ID0gc2tpcEluZGV4ZXMgPyBiYXNlVGltZXModmFsdWUubGVuZ3RoLCBTdHJpbmcpIDogW10sXG4gICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmICgoaW5oZXJpdGVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGtleSkpICYmXG4gICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKFxuICAgICAgICAgICAvLyBTYWZhcmkgOSBoYXMgZW51bWVyYWJsZSBgYXJndW1lbnRzLmxlbmd0aGAgaW4gc3RyaWN0IG1vZGUuXG4gICAgICAgICAgIGtleSA9PSAnbGVuZ3RoJyB8fFxuICAgICAgICAgICAvLyBOb2RlLmpzIDAuMTAgaGFzIGVudW1lcmFibGUgbm9uLWluZGV4IHByb3BlcnRpZXMgb24gYnVmZmVycy5cbiAgICAgICAgICAgKGlzQnVmZiAmJiAoa2V5ID09ICdvZmZzZXQnIHx8IGtleSA9PSAncGFyZW50JykpIHx8XG4gICAgICAgICAgIC8vIFBoYW50b21KUyAyIGhhcyBlbnVtZXJhYmxlIG5vbi1pbmRleCBwcm9wZXJ0aWVzIG9uIHR5cGVkIGFycmF5cy5cbiAgICAgICAgICAgKGlzVHlwZSAmJiAoa2V5ID09ICdidWZmZXInIHx8IGtleSA9PSAnYnl0ZUxlbmd0aCcgfHwga2V5ID09ICdieXRlT2Zmc2V0JykpIHx8XG4gICAgICAgICAgIC8vIFNraXAgaW5kZXggcHJvcGVydGllcy5cbiAgICAgICAgICAgaXNJbmRleChrZXksIGxlbmd0aClcbiAgICAgICAgKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlMaWtlS2V5cztcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLm1hcGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gKiBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheU1hcChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlNYXA7XG4iLCIvKipcbiAqIEFwcGVuZHMgdGhlIGVsZW1lbnRzIG9mIGB2YWx1ZXNgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBhcHBlbmQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlQdXNoKGFycmF5LCB2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgb2Zmc2V0ID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbb2Zmc2V0ICsgaW5kZXhdID0gdmFsdWVzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlQdXNoO1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uc29tZWAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gKiBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbnkgZWxlbWVudCBwYXNzZXMgdGhlIHByZWRpY2F0ZSBjaGVjayxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5U29tZShhcnJheSwgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheVNvbWU7XG4iLCJ2YXIgYmFzZUFzc2lnblZhbHVlID0gcmVxdWlyZSgnLi9fYmFzZUFzc2lnblZhbHVlJyksXG4gICAgZXEgPSByZXF1aXJlKCcuL2VxJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQXNzaWducyBgdmFsdWVgIHRvIGBrZXlgIG9mIGBvYmplY3RgIGlmIHRoZSBleGlzdGluZyB2YWx1ZSBpcyBub3QgZXF1aXZhbGVudFxuICogdXNpbmcgW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV07XG4gIGlmICghKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGVxKG9ialZhbHVlLCB2YWx1ZSkpIHx8XG4gICAgICAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgIGJhc2VBc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduVmFsdWU7XG4iLCJ2YXIgZXEgPSByZXF1aXJlKCcuL2VxJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGBrZXlgIGlzIGZvdW5kIGluIGBhcnJheWAgb2Yga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0ga2V5IFRoZSBrZXkgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGFzc29jSW5kZXhPZihhcnJheSwga2V5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChlcShhcnJheVtsZW5ndGhdWzBdLCBrZXkpKSB7XG4gICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzb2NJbmRleE9mO1xuIiwidmFyIGNvcHlPYmplY3QgPSByZXF1aXJlKCcuL19jb3B5T2JqZWN0JyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmFzc2lnbmAgd2l0aG91dCBzdXBwb3J0IGZvciBtdWx0aXBsZSBzb3VyY2VzXG4gKiBvciBgY3VzdG9taXplcmAgZnVuY3Rpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUFzc2lnbihvYmplY3QsIHNvdXJjZSkge1xuICByZXR1cm4gb2JqZWN0ICYmIGNvcHlPYmplY3Qoc291cmNlLCBrZXlzKHNvdXJjZSksIG9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUFzc2lnbjtcbiIsInZhciBjb3B5T2JqZWN0ID0gcmVxdWlyZSgnLi9fY29weU9iamVjdCcpLFxuICAgIGtleXNJbiA9IHJlcXVpcmUoJy4va2V5c0luJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uYXNzaWduSW5gIHdpdGhvdXQgc3VwcG9ydCBmb3IgbXVsdGlwbGUgc291cmNlc1xuICogb3IgYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VBc3NpZ25JbihvYmplY3QsIHNvdXJjZSkge1xuICByZXR1cm4gb2JqZWN0ICYmIGNvcHlPYmplY3Qoc291cmNlLCBrZXlzSW4oc291cmNlKSwgb2JqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQXNzaWduSW47XG4iLCJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19kZWZpbmVQcm9wZXJ0eScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBhc3NpZ25WYWx1ZWAgYW5kIGBhc3NpZ25NZXJnZVZhbHVlYCB3aXRob3V0XG4gKiB2YWx1ZSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYmFzZUFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5ID09ICdfX3Byb3RvX18nICYmIGRlZmluZVByb3BlcnR5KSB7XG4gICAgZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcbiAgICAgICdjb25maWd1cmFibGUnOiB0cnVlLFxuICAgICAgJ2VudW1lcmFibGUnOiB0cnVlLFxuICAgICAgJ3ZhbHVlJzogdmFsdWUsXG4gICAgICAnd3JpdGFibGUnOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VBc3NpZ25WYWx1ZTtcbiIsInZhciBTdGFjayA9IHJlcXVpcmUoJy4vX1N0YWNrJyksXG4gICAgYXJyYXlFYWNoID0gcmVxdWlyZSgnLi9fYXJyYXlFYWNoJyksXG4gICAgYXNzaWduVmFsdWUgPSByZXF1aXJlKCcuL19hc3NpZ25WYWx1ZScpLFxuICAgIGJhc2VBc3NpZ24gPSByZXF1aXJlKCcuL19iYXNlQXNzaWduJyksXG4gICAgYmFzZUFzc2lnbkluID0gcmVxdWlyZSgnLi9fYmFzZUFzc2lnbkluJyksXG4gICAgY2xvbmVCdWZmZXIgPSByZXF1aXJlKCcuL19jbG9uZUJ1ZmZlcicpLFxuICAgIGNvcHlBcnJheSA9IHJlcXVpcmUoJy4vX2NvcHlBcnJheScpLFxuICAgIGNvcHlTeW1ib2xzID0gcmVxdWlyZSgnLi9fY29weVN5bWJvbHMnKSxcbiAgICBjb3B5U3ltYm9sc0luID0gcmVxdWlyZSgnLi9fY29weVN5bWJvbHNJbicpLFxuICAgIGdldEFsbEtleXMgPSByZXF1aXJlKCcuL19nZXRBbGxLZXlzJyksXG4gICAgZ2V0QWxsS2V5c0luID0gcmVxdWlyZSgnLi9fZ2V0QWxsS2V5c0luJyksXG4gICAgZ2V0VGFnID0gcmVxdWlyZSgnLi9fZ2V0VGFnJyksXG4gICAgaW5pdENsb25lQXJyYXkgPSByZXF1aXJlKCcuL19pbml0Q2xvbmVBcnJheScpLFxuICAgIGluaXRDbG9uZUJ5VGFnID0gcmVxdWlyZSgnLi9faW5pdENsb25lQnlUYWcnKSxcbiAgICBpbml0Q2xvbmVPYmplY3QgPSByZXF1aXJlKCcuL19pbml0Q2xvbmVPYmplY3QnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNCdWZmZXIgPSByZXF1aXJlKCcuL2lzQnVmZmVyJyksXG4gICAgaXNNYXAgPSByZXF1aXJlKCcuL2lzTWFwJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgaXNTZXQgPSByZXF1aXJlKCcuL2lzU2V0JyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpLFxuICAgIGtleXNJbiA9IHJlcXVpcmUoJy4va2V5c0luJyk7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIGNsb25pbmcuICovXG52YXIgQ0xPTkVfREVFUF9GTEFHID0gMSxcbiAgICBDTE9ORV9GTEFUX0ZMQUcgPSAyLFxuICAgIENMT05FX1NZTUJPTFNfRkxBRyA9IDQ7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgc3VwcG9ydGVkIGJ5IGBfLmNsb25lYC4gKi9cbnZhciBjbG9uZWFibGVUYWdzID0ge307XG5jbG9uZWFibGVUYWdzW2FyZ3NUYWddID0gY2xvbmVhYmxlVGFnc1thcnJheVRhZ10gPVxuY2xvbmVhYmxlVGFnc1thcnJheUJ1ZmZlclRhZ10gPSBjbG9uZWFibGVUYWdzW2RhdGFWaWV3VGFnXSA9XG5jbG9uZWFibGVUYWdzW2Jvb2xUYWddID0gY2xvbmVhYmxlVGFnc1tkYXRlVGFnXSA9XG5jbG9uZWFibGVUYWdzW2Zsb2F0MzJUYWddID0gY2xvbmVhYmxlVGFnc1tmbG9hdDY0VGFnXSA9XG5jbG9uZWFibGVUYWdzW2ludDhUYWddID0gY2xvbmVhYmxlVGFnc1tpbnQxNlRhZ10gPVxuY2xvbmVhYmxlVGFnc1tpbnQzMlRhZ10gPSBjbG9uZWFibGVUYWdzW21hcFRhZ10gPVxuY2xvbmVhYmxlVGFnc1tudW1iZXJUYWddID0gY2xvbmVhYmxlVGFnc1tvYmplY3RUYWddID1cbmNsb25lYWJsZVRhZ3NbcmVnZXhwVGFnXSA9IGNsb25lYWJsZVRhZ3Nbc2V0VGFnXSA9XG5jbG9uZWFibGVUYWdzW3N0cmluZ1RhZ10gPSBjbG9uZWFibGVUYWdzW3N5bWJvbFRhZ10gPVxuY2xvbmVhYmxlVGFnc1t1aW50OFRhZ10gPSBjbG9uZWFibGVUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPVxuY2xvbmVhYmxlVGFnc1t1aW50MTZUYWddID0gY2xvbmVhYmxlVGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbmNsb25lYWJsZVRhZ3NbZXJyb3JUYWddID0gY2xvbmVhYmxlVGFnc1tmdW5jVGFnXSA9XG5jbG9uZWFibGVUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uY2xvbmVgIGFuZCBgXy5jbG9uZURlZXBgIHdoaWNoIHRyYWNrc1xuICogdHJhdmVyc2VkIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLlxuICogIDEgLSBEZWVwIGNsb25lXG4gKiAgMiAtIEZsYXR0ZW4gaW5oZXJpdGVkIHByb3BlcnRpZXNcbiAqICA0IC0gQ2xvbmUgc3ltYm9sc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY2xvbmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBba2V5XSBUaGUga2V5IG9mIGB2YWx1ZWAuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIHBhcmVudCBvYmplY3Qgb2YgYHZhbHVlYC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBhbmQgdGhlaXIgY2xvbmUgY291bnRlcnBhcnRzLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGNsb25lZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUNsb25lKHZhbHVlLCBiaXRtYXNrLCBjdXN0b21pemVyLCBrZXksIG9iamVjdCwgc3RhY2spIHtcbiAgdmFyIHJlc3VsdCxcbiAgICAgIGlzRGVlcCA9IGJpdG1hc2sgJiBDTE9ORV9ERUVQX0ZMQUcsXG4gICAgICBpc0ZsYXQgPSBiaXRtYXNrICYgQ0xPTkVfRkxBVF9GTEFHLFxuICAgICAgaXNGdWxsID0gYml0bWFzayAmIENMT05FX1NZTUJPTFNfRkxBRztcblxuICBpZiAoY3VzdG9taXplcikge1xuICAgIHJlc3VsdCA9IG9iamVjdCA/IGN1c3RvbWl6ZXIodmFsdWUsIGtleSwgb2JqZWN0LCBzdGFjaykgOiBjdXN0b21pemVyKHZhbHVlKTtcbiAgfVxuICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciBpc0FyciA9IGlzQXJyYXkodmFsdWUpO1xuICBpZiAoaXNBcnIpIHtcbiAgICByZXN1bHQgPSBpbml0Q2xvbmVBcnJheSh2YWx1ZSk7XG4gICAgaWYgKCFpc0RlZXApIHtcbiAgICAgIHJldHVybiBjb3B5QXJyYXkodmFsdWUsIHJlc3VsdCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciB0YWcgPSBnZXRUYWcodmFsdWUpLFxuICAgICAgICBpc0Z1bmMgPSB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xuXG4gICAgaWYgKGlzQnVmZmVyKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGNsb25lQnVmZmVyKHZhbHVlLCBpc0RlZXApO1xuICAgIH1cbiAgICBpZiAodGFnID09IG9iamVjdFRhZyB8fCB0YWcgPT0gYXJnc1RhZyB8fCAoaXNGdW5jICYmICFvYmplY3QpKSB7XG4gICAgICByZXN1bHQgPSAoaXNGbGF0IHx8IGlzRnVuYykgPyB7fSA6IGluaXRDbG9uZU9iamVjdCh2YWx1ZSk7XG4gICAgICBpZiAoIWlzRGVlcCkge1xuICAgICAgICByZXR1cm4gaXNGbGF0XG4gICAgICAgICAgPyBjb3B5U3ltYm9sc0luKHZhbHVlLCBiYXNlQXNzaWduSW4ocmVzdWx0LCB2YWx1ZSkpXG4gICAgICAgICAgOiBjb3B5U3ltYm9scyh2YWx1ZSwgYmFzZUFzc2lnbihyZXN1bHQsIHZhbHVlKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghY2xvbmVhYmxlVGFnc1t0YWddKSB7XG4gICAgICAgIHJldHVybiBvYmplY3QgPyB2YWx1ZSA6IHt9O1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gaW5pdENsb25lQnlUYWcodmFsdWUsIHRhZywgaXNEZWVwKTtcbiAgICB9XG4gIH1cbiAgLy8gQ2hlY2sgZm9yIGNpcmN1bGFyIHJlZmVyZW5jZXMgYW5kIHJldHVybiBpdHMgY29ycmVzcG9uZGluZyBjbG9uZS5cbiAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQodmFsdWUpO1xuICBpZiAoc3RhY2tlZCkge1xuICAgIHJldHVybiBzdGFja2VkO1xuICB9XG4gIHN0YWNrLnNldCh2YWx1ZSwgcmVzdWx0KTtcblxuICBpZiAoaXNTZXQodmFsdWUpKSB7XG4gICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbihzdWJWYWx1ZSkge1xuICAgICAgcmVzdWx0LmFkZChiYXNlQ2xvbmUoc3ViVmFsdWUsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN1YlZhbHVlLCB2YWx1ZSwgc3RhY2spKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChpc01hcCh2YWx1ZSkpIHtcbiAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uKHN1YlZhbHVlLCBrZXkpIHtcbiAgICAgIHJlc3VsdC5zZXQoa2V5LCBiYXNlQ2xvbmUoc3ViVmFsdWUsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGtleSwgdmFsdWUsIHN0YWNrKSk7XG4gICAgfSk7XG4gIH1cblxuICB2YXIga2V5c0Z1bmMgPSBpc0Z1bGxcbiAgICA/IChpc0ZsYXQgPyBnZXRBbGxLZXlzSW4gOiBnZXRBbGxLZXlzKVxuICAgIDogKGlzRmxhdCA/IGtleXNJbiA6IGtleXMpO1xuXG4gIHZhciBwcm9wcyA9IGlzQXJyID8gdW5kZWZpbmVkIDoga2V5c0Z1bmModmFsdWUpO1xuICBhcnJheUVhY2gocHJvcHMgfHwgdmFsdWUsIGZ1bmN0aW9uKHN1YlZhbHVlLCBrZXkpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGtleSA9IHN1YlZhbHVlO1xuICAgICAgc3ViVmFsdWUgPSB2YWx1ZVtrZXldO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBwb3B1bGF0ZSBjbG9uZSAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGFzc2lnblZhbHVlKHJlc3VsdCwga2V5LCBiYXNlQ2xvbmUoc3ViVmFsdWUsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGtleSwgdmFsdWUsIHN0YWNrKSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VDbG9uZTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0Q3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5jcmVhdGVgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYXNzaWduaW5nXG4gKiBwcm9wZXJ0aWVzIHRvIHRoZSBjcmVhdGVkIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHByb3RvIFRoZSBvYmplY3QgdG8gaW5oZXJpdCBmcm9tLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xudmFyIGJhc2VDcmVhdGUgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIG9iamVjdCgpIHt9XG4gIHJldHVybiBmdW5jdGlvbihwcm90bykge1xuICAgIGlmICghaXNPYmplY3QocHJvdG8pKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIGlmIChvYmplY3RDcmVhdGUpIHtcbiAgICAgIHJldHVybiBvYmplY3RDcmVhdGUocHJvdG8pO1xuICAgIH1cbiAgICBvYmplY3QucHJvdG90eXBlID0gcHJvdG87XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBvYmplY3Q7XG4gICAgb2JqZWN0LnByb3RvdHlwZSA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufSgpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQ3JlYXRlO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5maW5kSW5kZXhgIGFuZCBgXy5maW5kTGFzdEluZGV4YCB3aXRob3V0XG4gKiBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGaW5kSW5kZXgoYXJyYXksIHByZWRpY2F0ZSwgZnJvbUluZGV4LCBmcm9tUmlnaHQpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGluZGV4ID0gZnJvbUluZGV4ICsgKGZyb21SaWdodCA/IDEgOiAtMSk7XG5cbiAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZpbmRJbmRleDtcbiIsInZhciBjYXN0UGF0aCA9IHJlcXVpcmUoJy4vX2Nhc3RQYXRoJyksXG4gICAgdG9LZXkgPSByZXF1aXJlKCcuL190b0tleScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmdldGAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWZhdWx0IHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldChvYmplY3QsIHBhdGgpIHtcbiAgcGF0aCA9IGNhc3RQYXRoKHBhdGgsIG9iamVjdCk7XG5cbiAgdmFyIGluZGV4ID0gMCxcbiAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoO1xuXG4gIHdoaWxlIChvYmplY3QgIT0gbnVsbCAmJiBpbmRleCA8IGxlbmd0aCkge1xuICAgIG9iamVjdCA9IG9iamVjdFt0b0tleShwYXRoW2luZGV4KytdKV07XG4gIH1cbiAgcmV0dXJuIChpbmRleCAmJiBpbmRleCA9PSBsZW5ndGgpID8gb2JqZWN0IDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXQ7XG4iLCJ2YXIgYXJyYXlQdXNoID0gcmVxdWlyZSgnLi9fYXJyYXlQdXNoJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRBbGxLZXlzYCBhbmQgYGdldEFsbEtleXNJbmAgd2hpY2ggdXNlc1xuICogYGtleXNGdW5jYCBhbmQgYHN5bWJvbHNGdW5jYCB0byBnZXQgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kXG4gKiBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3ltYm9sc0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5c0Z1bmMsIHN5bWJvbHNGdW5jKSB7XG4gIHZhciByZXN1bHQgPSBrZXlzRnVuYyhvYmplY3QpO1xuICByZXR1cm4gaXNBcnJheShvYmplY3QpID8gcmVzdWx0IDogYXJyYXlQdXNoKHJlc3VsdCwgc3ltYm9sc0Z1bmMob2JqZWN0KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUdldEFsbEtleXM7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyksXG4gICAgZ2V0UmF3VGFnID0gcmVxdWlyZSgnLi9fZ2V0UmF3VGFnJyksXG4gICAgb2JqZWN0VG9TdHJpbmcgPSByZXF1aXJlKCcuL19vYmplY3RUb1N0cmluZycpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJyxcbiAgICB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICB9XG4gIHJldHVybiAoc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gT2JqZWN0KHZhbHVlKSlcbiAgICA/IGdldFJhd1RhZyh2YWx1ZSlcbiAgICA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlR2V0VGFnO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5oYXNJbmAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBrZXkgVGhlIGtleSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUhhc0luKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBrZXkgaW4gT2JqZWN0KG9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUhhc0luO1xuIiwidmFyIGJhc2VGaW5kSW5kZXggPSByZXF1aXJlKCcuL19iYXNlRmluZEluZGV4JyksXG4gICAgYmFzZUlzTmFOID0gcmVxdWlyZSgnLi9fYmFzZUlzTmFOJyksXG4gICAgc3RyaWN0SW5kZXhPZiA9IHJlcXVpcmUoJy4vX3N0cmljdEluZGV4T2YnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pbmRleE9mYCB3aXRob3V0IGBmcm9tSW5kZXhgIGJvdW5kcyBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUluZGV4T2YoYXJyYXksIHZhbHVlLCBmcm9tSW5kZXgpIHtcbiAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZVxuICAgID8gc3RyaWN0SW5kZXhPZihhcnJheSwgdmFsdWUsIGZyb21JbmRleClcbiAgICA6IGJhc2VGaW5kSW5kZXgoYXJyYXksIGJhc2VJc05hTiwgZnJvbUluZGV4KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSW5kZXhPZjtcbiIsInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNBcmd1bWVudHNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqL1xuZnVuY3Rpb24gYmFzZUlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGJhc2VHZXRUYWcodmFsdWUpID09IGFyZ3NUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzQXJndW1lbnRzO1xuIiwidmFyIGJhc2VJc0VxdWFsRGVlcCA9IHJlcXVpcmUoJy4vX2Jhc2VJc0VxdWFsRGVlcCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNFcXVhbGAgd2hpY2ggc3VwcG9ydHMgcGFydGlhbCBjb21wYXJpc29uc1xuICogYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuXG4gKiAgMSAtIFVub3JkZXJlZCBjb21wYXJpc29uXG4gKiAgMiAtIFBhcnRpYWwgY29tcGFyaXNvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spIHtcbiAgaWYgKHZhbHVlID09PSBvdGhlcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICh2YWx1ZSA9PSBudWxsIHx8IG90aGVyID09IG51bGwgfHwgKCFpc09iamVjdExpa2UodmFsdWUpICYmICFpc09iamVjdExpa2Uob3RoZXIpKSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyO1xuICB9XG4gIHJldHVybiBiYXNlSXNFcXVhbERlZXAodmFsdWUsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBiYXNlSXNFcXVhbCwgc3RhY2spO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc0VxdWFsO1xuIiwidmFyIFN0YWNrID0gcmVxdWlyZSgnLi9fU3RhY2snKSxcbiAgICBlcXVhbEFycmF5cyA9IHJlcXVpcmUoJy4vX2VxdWFsQXJyYXlzJyksXG4gICAgZXF1YWxCeVRhZyA9IHJlcXVpcmUoJy4vX2VxdWFsQnlUYWcnKSxcbiAgICBlcXVhbE9iamVjdHMgPSByZXF1aXJlKCcuL19lcXVhbE9iamVjdHMnKSxcbiAgICBnZXRUYWcgPSByZXF1aXJlKCcuL19nZXRUYWcnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNCdWZmZXIgPSByZXF1aXJlKCcuL2lzQnVmZmVyJyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi9pc1R5cGVkQXJyYXknKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgdmFsdWUgY29tcGFyaXNvbnMuICovXG52YXIgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgPSAxO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIGNvbXBhcmlzb25zIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIGNvbXBhcmVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbERlZXAob2JqZWN0LCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjaykge1xuICB2YXIgb2JqSXNBcnIgPSBpc0FycmF5KG9iamVjdCksXG4gICAgICBvdGhJc0FyciA9IGlzQXJyYXkob3RoZXIpLFxuICAgICAgb2JqVGFnID0gb2JqSXNBcnIgPyBhcnJheVRhZyA6IGdldFRhZyhvYmplY3QpLFxuICAgICAgb3RoVGFnID0gb3RoSXNBcnIgPyBhcnJheVRhZyA6IGdldFRhZyhvdGhlcik7XG5cbiAgb2JqVGFnID0gb2JqVGFnID09IGFyZ3NUYWcgPyBvYmplY3RUYWcgOiBvYmpUYWc7XG4gIG90aFRhZyA9IG90aFRhZyA9PSBhcmdzVGFnID8gb2JqZWN0VGFnIDogb3RoVGFnO1xuXG4gIHZhciBvYmpJc09iaiA9IG9ialRhZyA9PSBvYmplY3RUYWcsXG4gICAgICBvdGhJc09iaiA9IG90aFRhZyA9PSBvYmplY3RUYWcsXG4gICAgICBpc1NhbWVUYWcgPSBvYmpUYWcgPT0gb3RoVGFnO1xuXG4gIGlmIChpc1NhbWVUYWcgJiYgaXNCdWZmZXIob2JqZWN0KSkge1xuICAgIGlmICghaXNCdWZmZXIob3RoZXIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIG9iaklzQXJyID0gdHJ1ZTtcbiAgICBvYmpJc09iaiA9IGZhbHNlO1xuICB9XG4gIGlmIChpc1NhbWVUYWcgJiYgIW9iaklzT2JqKSB7XG4gICAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgICByZXR1cm4gKG9iaklzQXJyIHx8IGlzVHlwZWRBcnJheShvYmplY3QpKVxuICAgICAgPyBlcXVhbEFycmF5cyhvYmplY3QsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKVxuICAgICAgOiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIG9ialRhZywgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjayk7XG4gIH1cbiAgaWYgKCEoYml0bWFzayAmIENPTVBBUkVfUEFSVElBTF9GTEFHKSkge1xuICAgIHZhciBvYmpJc1dyYXBwZWQgPSBvYmpJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgJ19fd3JhcHBlZF9fJyksXG4gICAgICAgIG90aElzV3JhcHBlZCA9IG90aElzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsICdfX3dyYXBwZWRfXycpO1xuXG4gICAgaWYgKG9iaklzV3JhcHBlZCB8fCBvdGhJc1dyYXBwZWQpIHtcbiAgICAgIHZhciBvYmpVbndyYXBwZWQgPSBvYmpJc1dyYXBwZWQgPyBvYmplY3QudmFsdWUoKSA6IG9iamVjdCxcbiAgICAgICAgICBvdGhVbndyYXBwZWQgPSBvdGhJc1dyYXBwZWQgPyBvdGhlci52YWx1ZSgpIDogb3RoZXI7XG5cbiAgICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgICByZXR1cm4gZXF1YWxGdW5jKG9ialVud3JhcHBlZCwgb3RoVW53cmFwcGVkLCBiaXRtYXNrLCBjdXN0b21pemVyLCBzdGFjayk7XG4gICAgfVxuICB9XG4gIGlmICghaXNTYW1lVGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gIHJldHVybiBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjayk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzRXF1YWxEZWVwO1xuIiwidmFyIGdldFRhZyA9IHJlcXVpcmUoJy4vX2dldFRhZycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBtYXBUYWcgPSAnW29iamVjdCBNYXBdJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc01hcGAgd2l0aG91dCBOb2RlLmpzIG9wdGltaXphdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBtYXAsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTWFwKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGdldFRhZyh2YWx1ZSkgPT0gbWFwVGFnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc01hcDtcbiIsInZhciBTdGFjayA9IHJlcXVpcmUoJy4vX1N0YWNrJyksXG4gICAgYmFzZUlzRXF1YWwgPSByZXF1aXJlKCcuL19iYXNlSXNFcXVhbCcpO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB2YWx1ZSBjb21wYXJpc29ucy4gKi9cbnZhciBDT01QQVJFX1BBUlRJQUxfRkxBRyA9IDEsXG4gICAgQ09NUEFSRV9VTk9SREVSRURfRkxBRyA9IDI7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNNYXRjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCBvZiBwcm9wZXJ0eSB2YWx1ZXMgdG8gbWF0Y2guXG4gKiBAcGFyYW0ge0FycmF5fSBtYXRjaERhdGEgVGhlIHByb3BlcnR5IG5hbWVzLCB2YWx1ZXMsIGFuZCBjb21wYXJlIGZsYWdzIHRvIG1hdGNoLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYG9iamVjdGAgaXMgYSBtYXRjaCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNNYXRjaChvYmplY3QsIHNvdXJjZSwgbWF0Y2hEYXRhLCBjdXN0b21pemVyKSB7XG4gIHZhciBpbmRleCA9IG1hdGNoRGF0YS5sZW5ndGgsXG4gICAgICBsZW5ndGggPSBpbmRleCxcbiAgICAgIG5vQ3VzdG9taXplciA9ICFjdXN0b21pemVyO1xuXG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiAhbGVuZ3RoO1xuICB9XG4gIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICB3aGlsZSAoaW5kZXgtLSkge1xuICAgIHZhciBkYXRhID0gbWF0Y2hEYXRhW2luZGV4XTtcbiAgICBpZiAoKG5vQ3VzdG9taXplciAmJiBkYXRhWzJdKVxuICAgICAgICAgID8gZGF0YVsxXSAhPT0gb2JqZWN0W2RhdGFbMF1dXG4gICAgICAgICAgOiAhKGRhdGFbMF0gaW4gb2JqZWN0KVxuICAgICAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBkYXRhID0gbWF0Y2hEYXRhW2luZGV4XTtcbiAgICB2YXIga2V5ID0gZGF0YVswXSxcbiAgICAgICAgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgc3JjVmFsdWUgPSBkYXRhWzFdO1xuXG4gICAgaWYgKG5vQ3VzdG9taXplciAmJiBkYXRhWzJdKSB7XG4gICAgICBpZiAob2JqVmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHN0YWNrID0gbmV3IFN0YWNrO1xuICAgICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlLCBzdGFjayk7XG4gICAgICB9XG4gICAgICBpZiAoIShyZXN1bHQgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBiYXNlSXNFcXVhbChzcmNWYWx1ZSwgb2JqVmFsdWUsIENPTVBBUkVfUEFSVElBTF9GTEFHIHwgQ09NUEFSRV9VTk9SREVSRURfRkxBRywgY3VzdG9taXplciwgc3RhY2spXG4gICAgICAgICAgICA6IHJlc3VsdFxuICAgICAgICAgICkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNNYXRjaDtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYU5gIHdpdGhvdXQgc3VwcG9ydCBmb3IgbnVtYmVyIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYE5hTmAsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzTmFOO1xuIiwidmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKCcuL2lzRnVuY3Rpb24nKSxcbiAgICBpc01hc2tlZCA9IHJlcXVpcmUoJy4vX2lzTWFza2VkJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgdG9Tb3VyY2UgPSByZXF1aXJlKCcuL190b1NvdXJjZScpO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmdW5jVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IGlzRnVuY3Rpb24odmFsdWUpID8gcmVJc05hdGl2ZSA6IHJlSXNIb3N0Q3RvcjtcbiAgcmV0dXJuIHBhdHRlcm4udGVzdCh0b1NvdXJjZSh2YWx1ZSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc05hdGl2ZTtcbiIsInZhciBnZXRUYWcgPSByZXF1aXJlKCcuL19nZXRUYWcnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc2V0VGFnID0gJ1tvYmplY3QgU2V0XSc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNTZXRgIHdpdGhvdXQgTm9kZS5qcyBvcHRpbWl6YXRpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc2V0LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc1NldCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBnZXRUYWcodmFsdWUpID09IHNldFRhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNTZXQ7XG4iLCJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0YVZpZXdUYWddID0gdHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID0gdHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPVxudHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9IHR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPVxudHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc1R5cGVkQXJyYXlgIHdpdGhvdXQgTm9kZS5qcyBvcHRpbWl6YXRpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJlxuICAgIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tiYXNlR2V0VGFnKHZhbHVlKV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzVHlwZWRBcnJheTtcbiIsInZhciBiYXNlTWF0Y2hlcyA9IHJlcXVpcmUoJy4vX2Jhc2VNYXRjaGVzJyksXG4gICAgYmFzZU1hdGNoZXNQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2Jhc2VNYXRjaGVzUHJvcGVydHknKSxcbiAgICBpZGVudGl0eSA9IHJlcXVpcmUoJy4vaWRlbnRpdHknKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgcHJvcGVydHkgPSByZXF1aXJlKCcuL3Byb3BlcnR5Jyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXRlcmF0ZWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IFt2YWx1ZT1fLmlkZW50aXR5XSBUaGUgdmFsdWUgdG8gY29udmVydCB0byBhbiBpdGVyYXRlZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgaXRlcmF0ZWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJdGVyYXRlZSh2YWx1ZSkge1xuICAvLyBEb24ndCBzdG9yZSB0aGUgYHR5cGVvZmAgcmVzdWx0IGluIGEgdmFyaWFibGUgdG8gYXZvaWQgYSBKSVQgYnVnIGluIFNhZmFyaSA5LlxuICAvLyBTZWUgaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE1NjAzNCBmb3IgbW9yZSBkZXRhaWxzLlxuICBpZiAodHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gaWRlbnRpdHk7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBpc0FycmF5KHZhbHVlKVxuICAgICAgPyBiYXNlTWF0Y2hlc1Byb3BlcnR5KHZhbHVlWzBdLCB2YWx1ZVsxXSlcbiAgICAgIDogYmFzZU1hdGNoZXModmFsdWUpO1xuICB9XG4gIHJldHVybiBwcm9wZXJ0eSh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUl0ZXJhdGVlO1xuIiwidmFyIGlzUHJvdG90eXBlID0gcmVxdWlyZSgnLi9faXNQcm90b3R5cGUnKSxcbiAgICBuYXRpdmVLZXlzID0gcmVxdWlyZSgnLi9fbmF0aXZlS2V5cycpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXMob2JqZWN0KSB7XG4gIGlmICghaXNQcm90b3R5cGUob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzKG9iamVjdCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYga2V5ICE9ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUtleXM7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgaXNQcm90b3R5cGUgPSByZXF1aXJlKCcuL19pc1Byb3RvdHlwZScpLFxuICAgIG5hdGl2ZUtleXNJbiA9IHJlcXVpcmUoJy4vX25hdGl2ZUtleXNJbicpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNJbmAgd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5c0luKG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5c0luKG9iamVjdCk7XG4gIH1cbiAgdmFyIGlzUHJvdG8gPSBpc1Byb3RvdHlwZShvYmplY3QpLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VLZXlzSW47XG4iLCJ2YXIgYmFzZUlzTWF0Y2ggPSByZXF1aXJlKCcuL19iYXNlSXNNYXRjaCcpLFxuICAgIGdldE1hdGNoRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hdGNoRGF0YScpLFxuICAgIG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlID0gcmVxdWlyZSgnLi9fbWF0Y2hlc1N0cmljdENvbXBhcmFibGUnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzYCB3aGljaCBkb2Vzbid0IGNsb25lIGBzb3VyY2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3Qgb2YgcHJvcGVydHkgdmFsdWVzIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hdGNoZXMoc291cmNlKSB7XG4gIHZhciBtYXRjaERhdGEgPSBnZXRNYXRjaERhdGEoc291cmNlKTtcbiAgaWYgKG1hdGNoRGF0YS5sZW5ndGggPT0gMSAmJiBtYXRjaERhdGFbMF1bMl0pIHtcbiAgICByZXR1cm4gbWF0Y2hlc1N0cmljdENvbXBhcmFibGUobWF0Y2hEYXRhWzBdWzBdLCBtYXRjaERhdGFbMF1bMV0pO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09PSBzb3VyY2UgfHwgYmFzZUlzTWF0Y2gob2JqZWN0LCBzb3VyY2UsIG1hdGNoRGF0YSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZU1hdGNoZXM7XG4iLCJ2YXIgYmFzZUlzRXF1YWwgPSByZXF1aXJlKCcuL19iYXNlSXNFcXVhbCcpLFxuICAgIGdldCA9IHJlcXVpcmUoJy4vZ2V0JyksXG4gICAgaGFzSW4gPSByZXF1aXJlKCcuL2hhc0luJyksXG4gICAgaXNLZXkgPSByZXF1aXJlKCcuL19pc0tleScpLFxuICAgIGlzU3RyaWN0Q29tcGFyYWJsZSA9IHJlcXVpcmUoJy4vX2lzU3RyaWN0Q29tcGFyYWJsZScpLFxuICAgIG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlID0gcmVxdWlyZSgnLi9fbWF0Y2hlc1N0cmljdENvbXBhcmFibGUnKSxcbiAgICB0b0tleSA9IHJlcXVpcmUoJy4vX3RvS2V5Jyk7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHZhbHVlIGNvbXBhcmlzb25zLiAqL1xudmFyIENPTVBBUkVfUEFSVElBTF9GTEFHID0gMSxcbiAgICBDT01QQVJFX1VOT1JERVJFRF9GTEFHID0gMjtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzUHJvcGVydHlgIHdoaWNoIGRvZXNuJ3QgY2xvbmUgYHNyY1ZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gc3JjVmFsdWUgVGhlIHZhbHVlIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hdGNoZXNQcm9wZXJ0eShwYXRoLCBzcmNWYWx1ZSkge1xuICBpZiAoaXNLZXkocGF0aCkgJiYgaXNTdHJpY3RDb21wYXJhYmxlKHNyY1ZhbHVlKSkge1xuICAgIHJldHVybiBtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZSh0b0tleShwYXRoKSwgc3JjVmFsdWUpO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIgb2JqVmFsdWUgPSBnZXQob2JqZWN0LCBwYXRoKTtcbiAgICByZXR1cm4gKG9ialZhbHVlID09PSB1bmRlZmluZWQgJiYgb2JqVmFsdWUgPT09IHNyY1ZhbHVlKVxuICAgICAgPyBoYXNJbihvYmplY3QsIHBhdGgpXG4gICAgICA6IGJhc2VJc0VxdWFsKHNyY1ZhbHVlLCBvYmpWYWx1ZSwgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgfCBDT01QQVJFX1VOT1JERVJFRF9GTEFHKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlTWF0Y2hlc1Byb3BlcnR5O1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eWAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHkoa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlUHJvcGVydHk7XG4iLCJ2YXIgYmFzZUdldCA9IHJlcXVpcmUoJy4vX2Jhc2VHZXQnKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VQcm9wZXJ0eWAgd2hpY2ggc3VwcG9ydHMgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHlEZWVwKHBhdGgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBiYXNlR2V0KG9iamVjdCwgcGF0aCk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVByb3BlcnR5RGVlcDtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVRpbWVzO1xuIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpLFxuICAgIGFycmF5TWFwID0gcmVxdWlyZSgnLi9fYXJyYXlNYXAnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNTeW1ib2wgPSByZXF1aXJlKCcuL2lzU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xUb1N0cmluZyA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udG9TdHJpbmcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udG9TdHJpbmdgIHdoaWNoIGRvZXNuJ3QgY29udmVydCBudWxsaXNoXG4gKiB2YWx1ZXMgdG8gZW1wdHkgc3RyaW5ncy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIHN0cmluZ3MgdG8gYXZvaWQgYSBwZXJmb3JtYW5jZSBoaXQgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgLy8gUmVjdXJzaXZlbHkgY29udmVydCB2YWx1ZXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICByZXR1cm4gYXJyYXlNYXAodmFsdWUsIGJhc2VUb1N0cmluZykgKyAnJztcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHN5bWJvbFRvU3RyaW5nID8gc3ltYm9sVG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVRvU3RyaW5nO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmFyeWAgd2l0aG91dCBzdXBwb3J0IGZvciBzdG9yaW5nIG1ldGFkYXRhLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjYXAgYXJndW1lbnRzIGZvci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNhcHBlZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVVuYXJ5KGZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmModmFsdWUpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VVbmFyeTtcbiIsInZhciBTZXRDYWNoZSA9IHJlcXVpcmUoJy4vX1NldENhY2hlJyksXG4gICAgYXJyYXlJbmNsdWRlcyA9IHJlcXVpcmUoJy4vX2FycmF5SW5jbHVkZXMnKSxcbiAgICBhcnJheUluY2x1ZGVzV2l0aCA9IHJlcXVpcmUoJy4vX2FycmF5SW5jbHVkZXNXaXRoJyksXG4gICAgY2FjaGVIYXMgPSByZXF1aXJlKCcuL19jYWNoZUhhcycpLFxuICAgIGNyZWF0ZVNldCA9IHJlcXVpcmUoJy4vX2NyZWF0ZVNldCcpLFxuICAgIHNldFRvQXJyYXkgPSByZXF1aXJlKCcuL19zZXRUb0FycmF5Jyk7XG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xudmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5pcUJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlXSBUaGUgaXRlcmF0ZWUgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb21wYXJhdG9yXSBUaGUgY29tcGFyYXRvciBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZHVwbGljYXRlIGZyZWUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmlxKGFycmF5LCBpdGVyYXRlZSwgY29tcGFyYXRvcikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGluY2x1ZGVzID0gYXJyYXlJbmNsdWRlcyxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIGlzQ29tbW9uID0gdHJ1ZSxcbiAgICAgIHJlc3VsdCA9IFtdLFxuICAgICAgc2VlbiA9IHJlc3VsdDtcblxuICBpZiAoY29tcGFyYXRvcikge1xuICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgaW5jbHVkZXMgPSBhcnJheUluY2x1ZGVzV2l0aDtcbiAgfVxuICBlbHNlIGlmIChsZW5ndGggPj0gTEFSR0VfQVJSQVlfU0laRSkge1xuICAgIHZhciBzZXQgPSBpdGVyYXRlZSA/IG51bGwgOiBjcmVhdGVTZXQoYXJyYXkpO1xuICAgIGlmIChzZXQpIHtcbiAgICAgIHJldHVybiBzZXRUb0FycmF5KHNldCk7XG4gICAgfVxuICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgaW5jbHVkZXMgPSBjYWNoZUhhcztcbiAgICBzZWVuID0gbmV3IFNldENhY2hlO1xuICB9XG4gIGVsc2Uge1xuICAgIHNlZW4gPSBpdGVyYXRlZSA/IFtdIDogcmVzdWx0O1xuICB9XG4gIG91dGVyOlxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSA/IGl0ZXJhdGVlKHZhbHVlKSA6IHZhbHVlO1xuXG4gICAgdmFsdWUgPSAoY29tcGFyYXRvciB8fCB2YWx1ZSAhPT0gMCkgPyB2YWx1ZSA6IDA7XG4gICAgaWYgKGlzQ29tbW9uICYmIGNvbXB1dGVkID09PSBjb21wdXRlZCkge1xuICAgICAgdmFyIHNlZW5JbmRleCA9IHNlZW4ubGVuZ3RoO1xuICAgICAgd2hpbGUgKHNlZW5JbmRleC0tKSB7XG4gICAgICAgIGlmIChzZWVuW3NlZW5JbmRleF0gPT09IGNvbXB1dGVkKSB7XG4gICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpdGVyYXRlZSkge1xuICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmICghaW5jbHVkZXMoc2VlbiwgY29tcHV0ZWQsIGNvbXBhcmF0b3IpKSB7XG4gICAgICBpZiAoc2VlbiAhPT0gcmVzdWx0KSB7XG4gICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVVuaXE7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBhIGBjYWNoZWAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGNhY2hlIFRoZSBjYWNoZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBjYWNoZUhhcyhjYWNoZSwga2V5KSB7XG4gIHJldHVybiBjYWNoZS5oYXMoa2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYWNoZUhhcztcbiIsInZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNLZXkgPSByZXF1aXJlKCcuL19pc0tleScpLFxuICAgIHN0cmluZ1RvUGF0aCA9IHJlcXVpcmUoJy4vX3N0cmluZ1RvUGF0aCcpLFxuICAgIHRvU3RyaW5nID0gcmVxdWlyZSgnLi90b1N0cmluZycpO1xuXG4vKipcbiAqIENhc3RzIGB2YWx1ZWAgdG8gYSBwYXRoIGFycmF5IGlmIGl0J3Mgbm90IG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5IGtleXMgb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNhc3QgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gY2FzdFBhdGgodmFsdWUsIG9iamVjdCkge1xuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIGlzS2V5KHZhbHVlLCBvYmplY3QpID8gW3ZhbHVlXSA6IHN0cmluZ1RvUGF0aCh0b1N0cmluZyh2YWx1ZSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhc3RQYXRoO1xuIiwidmFyIFVpbnQ4QXJyYXkgPSByZXF1aXJlKCcuL19VaW50OEFycmF5Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBhcnJheUJ1ZmZlcmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGFycmF5QnVmZmVyIFRoZSBhcnJheSBidWZmZXIgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7QXJyYXlCdWZmZXJ9IFJldHVybnMgdGhlIGNsb25lZCBhcnJheSBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGNsb25lQXJyYXlCdWZmZXIoYXJyYXlCdWZmZXIpIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyBhcnJheUJ1ZmZlci5jb25zdHJ1Y3RvcihhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgbmV3IFVpbnQ4QXJyYXkocmVzdWx0KS5zZXQobmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbG9uZUFycmF5QnVmZmVyO1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgQnVmZmVyID0gbW9kdWxlRXhwb3J0cyA/IHJvb3QuQnVmZmVyIDogdW5kZWZpbmVkLFxuICAgIGFsbG9jVW5zYWZlID0gQnVmZmVyID8gQnVmZmVyLmFsbG9jVW5zYWZlIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiAgYGJ1ZmZlcmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXIgVGhlIGJ1ZmZlciB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7QnVmZmVyfSBSZXR1cm5zIHRoZSBjbG9uZWQgYnVmZmVyLlxuICovXG5mdW5jdGlvbiBjbG9uZUJ1ZmZlcihidWZmZXIsIGlzRGVlcCkge1xuICBpZiAoaXNEZWVwKSB7XG4gICAgcmV0dXJuIGJ1ZmZlci5zbGljZSgpO1xuICB9XG4gIHZhciBsZW5ndGggPSBidWZmZXIubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gYWxsb2NVbnNhZmUgPyBhbGxvY1Vuc2FmZShsZW5ndGgpIDogbmV3IGJ1ZmZlci5jb25zdHJ1Y3RvcihsZW5ndGgpO1xuXG4gIGJ1ZmZlci5jb3B5KHJlc3VsdCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xvbmVCdWZmZXI7XG4iLCJ2YXIgY2xvbmVBcnJheUJ1ZmZlciA9IHJlcXVpcmUoJy4vX2Nsb25lQXJyYXlCdWZmZXInKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYGRhdGFWaWV3YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFWaWV3IFRoZSBkYXRhIHZpZXcgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIGRhdGEgdmlldy5cbiAqL1xuZnVuY3Rpb24gY2xvbmVEYXRhVmlldyhkYXRhVmlldywgaXNEZWVwKSB7XG4gIHZhciBidWZmZXIgPSBpc0RlZXAgPyBjbG9uZUFycmF5QnVmZmVyKGRhdGFWaWV3LmJ1ZmZlcikgOiBkYXRhVmlldy5idWZmZXI7XG4gIHJldHVybiBuZXcgZGF0YVZpZXcuY29uc3RydWN0b3IoYnVmZmVyLCBkYXRhVmlldy5ieXRlT2Zmc2V0LCBkYXRhVmlldy5ieXRlTGVuZ3RoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbG9uZURhdGFWaWV3O1xuIiwiLyoqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGAgZmxhZ3MgZnJvbSB0aGVpciBjb2VyY2VkIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVGbGFncyA9IC9cXHcqJC87XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGByZWdleHBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcmVnZXhwIFRoZSByZWdleHAgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgcmVnZXhwLlxuICovXG5mdW5jdGlvbiBjbG9uZVJlZ0V4cChyZWdleHApIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyByZWdleHAuY29uc3RydWN0b3IocmVnZXhwLnNvdXJjZSwgcmVGbGFncy5leGVjKHJlZ2V4cCkpO1xuICByZXN1bHQubGFzdEluZGV4ID0gcmVnZXhwLmxhc3RJbmRleDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbG9uZVJlZ0V4cDtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKTtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFZhbHVlT2YgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnZhbHVlT2YgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIHRoZSBgc3ltYm9sYCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzeW1ib2wgVGhlIHN5bWJvbCBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgc3ltYm9sIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gY2xvbmVTeW1ib2woc3ltYm9sKSB7XG4gIHJldHVybiBzeW1ib2xWYWx1ZU9mID8gT2JqZWN0KHN5bWJvbFZhbHVlT2YuY2FsbChzeW1ib2wpKSA6IHt9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsb25lU3ltYm9sO1xuIiwidmFyIGNsb25lQXJyYXlCdWZmZXIgPSByZXF1aXJlKCcuL19jbG9uZUFycmF5QnVmZmVyJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGB0eXBlZEFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHR5cGVkQXJyYXkgVGhlIHR5cGVkIGFycmF5IHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCB0eXBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gY2xvbmVUeXBlZEFycmF5KHR5cGVkQXJyYXksIGlzRGVlcCkge1xuICB2YXIgYnVmZmVyID0gaXNEZWVwID8gY2xvbmVBcnJheUJ1ZmZlcih0eXBlZEFycmF5LmJ1ZmZlcikgOiB0eXBlZEFycmF5LmJ1ZmZlcjtcbiAgcmV0dXJuIG5ldyB0eXBlZEFycmF5LmNvbnN0cnVjdG9yKGJ1ZmZlciwgdHlwZWRBcnJheS5ieXRlT2Zmc2V0LCB0eXBlZEFycmF5Lmxlbmd0aCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xvbmVUeXBlZEFycmF5O1xuIiwiLyoqXG4gKiBDb3BpZXMgdGhlIHZhbHVlcyBvZiBgc291cmNlYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBzb3VyY2UgVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXk9W11dIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyB0by5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBjb3B5QXJyYXkoc291cmNlLCBhcnJheSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHNvdXJjZS5sZW5ndGg7XG5cbiAgYXJyYXkgfHwgKGFycmF5ID0gQXJyYXkobGVuZ3RoKSk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbaW5kZXhdID0gc291cmNlW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29weUFycmF5O1xuIiwidmFyIGFzc2lnblZhbHVlID0gcmVxdWlyZSgnLi9fYXNzaWduVmFsdWUnKSxcbiAgICBiYXNlQXNzaWduVmFsdWUgPSByZXF1aXJlKCcuL19iYXNlQXNzaWduVmFsdWUnKTtcblxuLyoqXG4gKiBDb3BpZXMgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IGlkZW50aWZpZXJzIHRvIGNvcHkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgdG8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb3BpZWQgdmFsdWVzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gY29weU9iamVjdChzb3VyY2UsIHByb3BzLCBvYmplY3QsIGN1c3RvbWl6ZXIpIHtcbiAgdmFyIGlzTmV3ID0gIW9iamVjdDtcbiAgb2JqZWN0IHx8IChvYmplY3QgPSB7fSk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuXG4gICAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgICAgPyBjdXN0b21pemVyKG9iamVjdFtrZXldLCBzb3VyY2Vba2V5XSwga2V5LCBvYmplY3QsIHNvdXJjZSlcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKG5ld1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5ld1ZhbHVlID0gc291cmNlW2tleV07XG4gICAgfVxuICAgIGlmIChpc05ldykge1xuICAgICAgYmFzZUFzc2lnblZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFzc2lnblZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29weU9iamVjdDtcbiIsInZhciBjb3B5T2JqZWN0ID0gcmVxdWlyZSgnLi9fY29weU9iamVjdCcpLFxuICAgIGdldFN5bWJvbHMgPSByZXF1aXJlKCcuL19nZXRTeW1ib2xzJyk7XG5cbi8qKlxuICogQ29waWVzIG93biBzeW1ib2xzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBzeW1ib2xzIGZyb20uXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHN5bWJvbHMgdG8uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBjb3B5U3ltYm9scyhzb3VyY2UsIG9iamVjdCkge1xuICByZXR1cm4gY29weU9iamVjdChzb3VyY2UsIGdldFN5bWJvbHMoc291cmNlKSwgb2JqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb3B5U3ltYm9scztcbiIsInZhciBjb3B5T2JqZWN0ID0gcmVxdWlyZSgnLi9fY29weU9iamVjdCcpLFxuICAgIGdldFN5bWJvbHNJbiA9IHJlcXVpcmUoJy4vX2dldFN5bWJvbHNJbicpO1xuXG4vKipcbiAqIENvcGllcyBvd24gYW5kIGluaGVyaXRlZCBzeW1ib2xzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBzeW1ib2xzIGZyb20uXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHN5bWJvbHMgdG8uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBjb3B5U3ltYm9sc0luKHNvdXJjZSwgb2JqZWN0KSB7XG4gIHJldHVybiBjb3B5T2JqZWN0KHNvdXJjZSwgZ2V0U3ltYm9sc0luKHNvdXJjZSksIG9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29weVN5bWJvbHNJbjtcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcmVKc0RhdGE7XG4iLCJ2YXIgU2V0ID0gcmVxdWlyZSgnLi9fU2V0JyksXG4gICAgbm9vcCA9IHJlcXVpcmUoJy4vbm9vcCcpLFxuICAgIHNldFRvQXJyYXkgPSByZXF1aXJlKCcuL19zZXRUb0FycmF5Jyk7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHNldCBvYmplY3Qgb2YgYHZhbHVlc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGFkZCB0byB0aGUgc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IHNldC5cbiAqL1xudmFyIGNyZWF0ZVNldCA9ICEoU2V0ICYmICgxIC8gc2V0VG9BcnJheShuZXcgU2V0KFssLTBdKSlbMV0pID09IElORklOSVRZKSA/IG5vb3AgOiBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgcmV0dXJuIG5ldyBTZXQodmFsdWVzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlU2V0O1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpO1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgdmFyIGZ1bmMgPSBnZXROYXRpdmUoT2JqZWN0LCAnZGVmaW5lUHJvcGVydHknKTtcbiAgICBmdW5jKHt9LCAnJywge30pO1xuICAgIHJldHVybiBmdW5jO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVQcm9wZXJ0eTtcbiIsInZhciBTZXRDYWNoZSA9IHJlcXVpcmUoJy4vX1NldENhY2hlJyksXG4gICAgYXJyYXlTb21lID0gcmVxdWlyZSgnLi9fYXJyYXlTb21lJyksXG4gICAgY2FjaGVIYXMgPSByZXF1aXJlKCcuL19jYWNoZUhhcycpO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB2YWx1ZSBjb21wYXJpc29ucy4gKi9cbnZhciBDT01QQVJFX1BBUlRJQUxfRkxBRyA9IDEsXG4gICAgQ09NUEFSRV9VTk9SREVSRURfRkxBRyA9IDI7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBhcnJheXMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7QXJyYXl9IG90aGVyIFRoZSBvdGhlciBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhY2sgVHJhY2tzIHRyYXZlcnNlZCBgYXJyYXlgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFycmF5cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEFycmF5cyhhcnJheSwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spIHtcbiAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBDT01QQVJFX1BBUlRJQUxfRkxBRyxcbiAgICAgIGFyckxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIG90aExlbmd0aCA9IG90aGVyLmxlbmd0aDtcblxuICBpZiAoYXJyTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhKGlzUGFydGlhbCAmJiBvdGhMZW5ndGggPiBhcnJMZW5ndGgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIENoZWNrIHRoYXQgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gIHZhciBhcnJTdGFja2VkID0gc3RhY2suZ2V0KGFycmF5KTtcbiAgdmFyIG90aFN0YWNrZWQgPSBzdGFjay5nZXQob3RoZXIpO1xuICBpZiAoYXJyU3RhY2tlZCAmJiBvdGhTdGFja2VkKSB7XG4gICAgcmV0dXJuIGFyclN0YWNrZWQgPT0gb3RoZXIgJiYgb3RoU3RhY2tlZCA9PSBhcnJheTtcbiAgfVxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IHRydWUsXG4gICAgICBzZWVuID0gKGJpdG1hc2sgJiBDT01QQVJFX1VOT1JERVJFRF9GTEFHKSA/IG5ldyBTZXRDYWNoZSA6IHVuZGVmaW5lZDtcblxuICBzdGFjay5zZXQoYXJyYXksIG90aGVyKTtcbiAgc3RhY2suc2V0KG90aGVyLCBhcnJheSk7XG5cbiAgLy8gSWdub3JlIG5vbi1pbmRleCBwcm9wZXJ0aWVzLlxuICB3aGlsZSAoKytpbmRleCA8IGFyckxlbmd0aCkge1xuICAgIHZhciBhcnJWYWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltpbmRleF07XG5cbiAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgdmFyIGNvbXBhcmVkID0gaXNQYXJ0aWFsXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgYXJyVmFsdWUsIGluZGV4LCBvdGhlciwgYXJyYXksIHN0YWNrKVxuICAgICAgICA6IGN1c3RvbWl6ZXIoYXJyVmFsdWUsIG90aFZhbHVlLCBpbmRleCwgYXJyYXksIG90aGVyLCBzdGFjayk7XG4gICAgfVxuICAgIGlmIChjb21wYXJlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoY29tcGFyZWQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGlmIChzZWVuKSB7XG4gICAgICBpZiAoIWFycmF5U29tZShvdGhlciwgZnVuY3Rpb24ob3RoVmFsdWUsIG90aEluZGV4KSB7XG4gICAgICAgICAgICBpZiAoIWNhY2hlSGFzKHNlZW4sIG90aEluZGV4KSAmJlxuICAgICAgICAgICAgICAgIChhcnJWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spKSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2Vlbi5wdXNoKG90aEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSkge1xuICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghKFxuICAgICAgICAgIGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fFxuICAgICAgICAgICAgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spXG4gICAgICAgICkpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHN0YWNrWydkZWxldGUnXShhcnJheSk7XG4gIHN0YWNrWydkZWxldGUnXShvdGhlcik7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXF1YWxBcnJheXM7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyksXG4gICAgVWludDhBcnJheSA9IHJlcXVpcmUoJy4vX1VpbnQ4QXJyYXknKSxcbiAgICBlcSA9IHJlcXVpcmUoJy4vZXEnKSxcbiAgICBlcXVhbEFycmF5cyA9IHJlcXVpcmUoJy4vX2VxdWFsQXJyYXlzJyksXG4gICAgbWFwVG9BcnJheSA9IHJlcXVpcmUoJy4vX21hcFRvQXJyYXknKSxcbiAgICBzZXRUb0FycmF5ID0gcmVxdWlyZSgnLi9fc2V0VG9BcnJheScpO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB2YWx1ZSBjb21wYXJpc29ucy4gKi9cbnZhciBDT01QQVJFX1BBUlRJQUxfRkxBRyA9IDEsXG4gICAgQ09NUEFSRV9VTk9SREVSRURfRkxBRyA9IDI7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJztcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFZhbHVlT2YgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnZhbHVlT2YgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBjb21wYXJpbmcgb2JqZWN0cyBvZlxuICogdGhlIHNhbWUgYHRvU3RyaW5nVGFnYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBvbmx5IHN1cHBvcnRzIGNvbXBhcmluZyB2YWx1ZXMgd2l0aCB0YWdzIG9mXG4gKiBgQm9vbGVhbmAsIGBEYXRlYCwgYEVycm9yYCwgYE51bWJlcmAsIGBSZWdFeHBgLCBvciBgU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0cyB0byBjb21wYXJlLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhY2sgVHJhY2tzIHRyYXZlcnNlZCBgb2JqZWN0YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgdGFnLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKSB7XG4gIHN3aXRjaCAodGFnKSB7XG4gICAgY2FzZSBkYXRhVmlld1RhZzpcbiAgICAgIGlmICgob2JqZWN0LmJ5dGVMZW5ndGggIT0gb3RoZXIuYnl0ZUxlbmd0aCkgfHxcbiAgICAgICAgICAob2JqZWN0LmJ5dGVPZmZzZXQgIT0gb3RoZXIuYnl0ZU9mZnNldCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgb2JqZWN0ID0gb2JqZWN0LmJ1ZmZlcjtcbiAgICAgIG90aGVyID0gb3RoZXIuYnVmZmVyO1xuXG4gICAgY2FzZSBhcnJheUJ1ZmZlclRhZzpcbiAgICAgIGlmICgob2JqZWN0LmJ5dGVMZW5ndGggIT0gb3RoZXIuYnl0ZUxlbmd0aCkgfHxcbiAgICAgICAgICAhZXF1YWxGdW5jKG5ldyBVaW50OEFycmF5KG9iamVjdCksIG5ldyBVaW50OEFycmF5KG90aGVyKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICBjYXNlIGJvb2xUYWc6XG4gICAgY2FzZSBkYXRlVGFnOlxuICAgIGNhc2UgbnVtYmVyVGFnOlxuICAgICAgLy8gQ29lcmNlIGJvb2xlYW5zIHRvIGAxYCBvciBgMGAgYW5kIGRhdGVzIHRvIG1pbGxpc2Vjb25kcy5cbiAgICAgIC8vIEludmFsaWQgZGF0ZXMgYXJlIGNvZXJjZWQgdG8gYE5hTmAuXG4gICAgICByZXR1cm4gZXEoK29iamVjdCwgK290aGVyKTtcblxuICAgIGNhc2UgZXJyb3JUYWc6XG4gICAgICByZXR1cm4gb2JqZWN0Lm5hbWUgPT0gb3RoZXIubmFtZSAmJiBvYmplY3QubWVzc2FnZSA9PSBvdGhlci5tZXNzYWdlO1xuXG4gICAgY2FzZSByZWdleHBUYWc6XG4gICAgY2FzZSBzdHJpbmdUYWc6XG4gICAgICAvLyBDb2VyY2UgcmVnZXhlcyB0byBzdHJpbmdzIGFuZCB0cmVhdCBzdHJpbmdzLCBwcmltaXRpdmVzIGFuZCBvYmplY3RzLFxuICAgICAgLy8gYXMgZXF1YWwuIFNlZSBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcmVnZXhwLnByb3RvdHlwZS50b3N0cmluZ1xuICAgICAgLy8gZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgIHJldHVybiBvYmplY3QgPT0gKG90aGVyICsgJycpO1xuXG4gICAgY2FzZSBtYXBUYWc6XG4gICAgICB2YXIgY29udmVydCA9IG1hcFRvQXJyYXk7XG5cbiAgICBjYXNlIHNldFRhZzpcbiAgICAgIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgQ09NUEFSRV9QQVJUSUFMX0ZMQUc7XG4gICAgICBjb252ZXJ0IHx8IChjb252ZXJ0ID0gc2V0VG9BcnJheSk7XG5cbiAgICAgIGlmIChvYmplY3Quc2l6ZSAhPSBvdGhlci5zaXplICYmICFpc1BhcnRpYWwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICAgICAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQob2JqZWN0KTtcbiAgICAgIGlmIChzdGFja2VkKSB7XG4gICAgICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICAgICAgfVxuICAgICAgYml0bWFzayB8PSBDT01QQVJFX1VOT1JERVJFRF9GTEFHO1xuXG4gICAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgIHN0YWNrLnNldChvYmplY3QsIG90aGVyKTtcbiAgICAgIHZhciByZXN1bHQgPSBlcXVhbEFycmF5cyhjb252ZXJ0KG9iamVjdCksIGNvbnZlcnQob3RoZXIpLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKTtcbiAgICAgIHN0YWNrWydkZWxldGUnXShvYmplY3QpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIGNhc2Ugc3ltYm9sVGFnOlxuICAgICAgaWYgKHN5bWJvbFZhbHVlT2YpIHtcbiAgICAgICAgcmV0dXJuIHN5bWJvbFZhbHVlT2YuY2FsbChvYmplY3QpID09IHN5bWJvbFZhbHVlT2YuY2FsbChvdGhlcik7XG4gICAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxdWFsQnlUYWc7XG4iLCJ2YXIgZ2V0QWxsS2V5cyA9IHJlcXVpcmUoJy4vX2dldEFsbEtleXMnKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgdmFsdWUgY29tcGFyaXNvbnMuICovXG52YXIgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgPSAxO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3Igb2JqZWN0cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjaykge1xuICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIENPTVBBUkVfUEFSVElBTF9GTEFHLFxuICAgICAgb2JqUHJvcHMgPSBnZXRBbGxLZXlzKG9iamVjdCksXG4gICAgICBvYmpMZW5ndGggPSBvYmpQcm9wcy5sZW5ndGgsXG4gICAgICBvdGhQcm9wcyA9IGdldEFsbEtleXMob3RoZXIpLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoUHJvcHMubGVuZ3RoO1xuXG4gIGlmIChvYmpMZW5ndGggIT0gb3RoTGVuZ3RoICYmICFpc1BhcnRpYWwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGluZGV4ID0gb2JqTGVuZ3RoO1xuICB3aGlsZSAoaW5kZXgtLSkge1xuICAgIHZhciBrZXkgPSBvYmpQcm9wc1tpbmRleF07XG4gICAgaWYgKCEoaXNQYXJ0aWFsID8ga2V5IGluIG90aGVyIDogaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwga2V5KSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgLy8gQ2hlY2sgdGhhdCBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgdmFyIG9ialN0YWNrZWQgPSBzdGFjay5nZXQob2JqZWN0KTtcbiAgdmFyIG90aFN0YWNrZWQgPSBzdGFjay5nZXQob3RoZXIpO1xuICBpZiAob2JqU3RhY2tlZCAmJiBvdGhTdGFja2VkKSB7XG4gICAgcmV0dXJuIG9ialN0YWNrZWQgPT0gb3RoZXIgJiYgb3RoU3RhY2tlZCA9PSBvYmplY3Q7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IHRydWU7XG4gIHN0YWNrLnNldChvYmplY3QsIG90aGVyKTtcbiAgc3RhY2suc2V0KG90aGVyLCBvYmplY3QpO1xuXG4gIHZhciBza2lwQ3RvciA9IGlzUGFydGlhbDtcbiAgd2hpbGUgKCsraW5kZXggPCBvYmpMZW5ndGgpIHtcbiAgICBrZXkgPSBvYmpQcm9wc1tpbmRleF07XG4gICAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJba2V5XTtcblxuICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICB2YXIgY29tcGFyZWQgPSBpc1BhcnRpYWxcbiAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBvYmpWYWx1ZSwga2V5LCBvdGhlciwgb2JqZWN0LCBzdGFjaylcbiAgICAgICAgOiBjdXN0b21pemVyKG9ialZhbHVlLCBvdGhWYWx1ZSwga2V5LCBvYmplY3QsIG90aGVyLCBzdGFjayk7XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGlmICghKGNvbXBhcmVkID09PSB1bmRlZmluZWRcbiAgICAgICAgICA/IChvYmpWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKG9ialZhbHVlLCBvdGhWYWx1ZSwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spKVxuICAgICAgICAgIDogY29tcGFyZWRcbiAgICAgICAgKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgc2tpcEN0b3IgfHwgKHNraXBDdG9yID0ga2V5ID09ICdjb25zdHJ1Y3RvcicpO1xuICB9XG4gIGlmIChyZXN1bHQgJiYgIXNraXBDdG9yKSB7XG4gICAgdmFyIG9iakN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICAgIG90aEN0b3IgPSBvdGhlci5jb25zdHJ1Y3RvcjtcblxuICAgIC8vIE5vbiBgT2JqZWN0YCBvYmplY3QgaW5zdGFuY2VzIHdpdGggZGlmZmVyZW50IGNvbnN0cnVjdG9ycyBhcmUgbm90IGVxdWFsLlxuICAgIGlmIChvYmpDdG9yICE9IG90aEN0b3IgJiZcbiAgICAgICAgKCdjb25zdHJ1Y3RvcicgaW4gb2JqZWN0ICYmICdjb25zdHJ1Y3RvcicgaW4gb3RoZXIpICYmXG4gICAgICAgICEodHlwZW9mIG9iakN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvYmpDdG9yIGluc3RhbmNlb2Ygb2JqQ3RvciAmJlxuICAgICAgICAgIHR5cGVvZiBvdGhDdG9yID09ICdmdW5jdGlvbicgJiYgb3RoQ3RvciBpbnN0YW5jZW9mIG90aEN0b3IpKSB7XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgc3RhY2tbJ2RlbGV0ZSddKG9iamVjdCk7XG4gIHN0YWNrWydkZWxldGUnXShvdGhlcik7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXF1YWxPYmplY3RzO1xuIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxubW9kdWxlLmV4cG9ydHMgPSBmcmVlR2xvYmFsO1xuIiwidmFyIGJhc2VHZXRBbGxLZXlzID0gcmVxdWlyZSgnLi9fYmFzZUdldEFsbEtleXMnKSxcbiAgICBnZXRTeW1ib2xzID0gcmVxdWlyZSgnLi9fZ2V0U3ltYm9scycpLFxuICAgIGtleXMgPSByZXF1aXJlKCcuL2tleXMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIGFuZCBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIGFuZCBzeW1ib2xzLlxuICovXG5mdW5jdGlvbiBnZXRBbGxLZXlzKG9iamVjdCkge1xuICByZXR1cm4gYmFzZUdldEFsbEtleXMob2JqZWN0LCBrZXlzLCBnZXRTeW1ib2xzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRBbGxLZXlzO1xuIiwidmFyIGJhc2VHZXRBbGxLZXlzID0gcmVxdWlyZSgnLi9fYmFzZUdldEFsbEtleXMnKSxcbiAgICBnZXRTeW1ib2xzSW4gPSByZXF1aXJlKCcuL19nZXRTeW1ib2xzSW4nKSxcbiAgICBrZXlzSW4gPSByZXF1aXJlKCcuL2tleXNJbicpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2Ygb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBhbmRcbiAqIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGdldEFsbEtleXNJbihvYmplY3QpIHtcbiAgcmV0dXJuIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5c0luLCBnZXRTeW1ib2xzSW4pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEFsbEtleXNJbjtcbiIsInZhciBpc0tleWFibGUgPSByZXF1aXJlKCcuL19pc0tleWFibGUnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGZvciBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgcmV0dXJuIGlzS2V5YWJsZShrZXkpXG4gICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICA6IGRhdGEubWFwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE1hcERhdGE7XG4iLCJ2YXIgaXNTdHJpY3RDb21wYXJhYmxlID0gcmVxdWlyZSgnLi9faXNTdHJpY3RDb21wYXJhYmxlJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG4vKipcbiAqIEdldHMgdGhlIHByb3BlcnR5IG5hbWVzLCB2YWx1ZXMsIGFuZCBjb21wYXJlIGZsYWdzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG1hdGNoIGRhdGEgb2YgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGdldE1hdGNoRGF0YShvYmplY3QpIHtcbiAgdmFyIHJlc3VsdCA9IGtleXMob2JqZWN0KSxcbiAgICAgIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGg7XG5cbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgdmFyIGtleSA9IHJlc3VsdFtsZW5ndGhdLFxuICAgICAgICB2YWx1ZSA9IG9iamVjdFtrZXldO1xuXG4gICAgcmVzdWx0W2xlbmd0aF0gPSBba2V5LCB2YWx1ZSwgaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKV07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRNYXRjaERhdGE7XG4iLCJ2YXIgYmFzZUlzTmF0aXZlID0gcmVxdWlyZSgnLi9fYmFzZUlzTmF0aXZlJyksXG4gICAgZ2V0VmFsdWUgPSByZXF1aXJlKCcuL19nZXRWYWx1ZScpO1xuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE5hdGl2ZTtcbiIsInZhciBvdmVyQXJnID0gcmVxdWlyZSgnLi9fb3ZlckFyZycpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBnZXRQcm90b3R5cGUgPSBvdmVyQXJnKE9iamVjdC5nZXRQcm90b3R5cGVPZiwgT2JqZWN0KTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRQcm90b3R5cGU7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRSYXdUYWc7XG4iLCJ2YXIgYXJyYXlGaWx0ZXIgPSByZXF1aXJlKCcuL19hcnJheUZpbHRlcicpLFxuICAgIHN0dWJBcnJheSA9IHJlcXVpcmUoJy4vc3R1YkFycmF5Jyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVHZXRTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHN5bWJvbHMuXG4gKi9cbnZhciBnZXRTeW1ib2xzID0gIW5hdGl2ZUdldFN5bWJvbHMgPyBzdHViQXJyYXkgOiBmdW5jdGlvbihvYmplY3QpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICByZXR1cm4gYXJyYXlGaWx0ZXIobmF0aXZlR2V0U3ltYm9scyhvYmplY3QpLCBmdW5jdGlvbihzeW1ib2wpIHtcbiAgICByZXR1cm4gcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmplY3QsIHN5bWJvbCk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRTeW1ib2xzO1xuIiwidmFyIGFycmF5UHVzaCA9IHJlcXVpcmUoJy4vX2FycmF5UHVzaCcpLFxuICAgIGdldFByb3RvdHlwZSA9IHJlcXVpcmUoJy4vX2dldFByb3RvdHlwZScpLFxuICAgIGdldFN5bWJvbHMgPSByZXF1aXJlKCcuL19nZXRTeW1ib2xzJyksXG4gICAgc3R1YkFycmF5ID0gcmVxdWlyZSgnLi9zdHViQXJyYXknKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUdldFN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBzeW1ib2xzLlxuICovXG52YXIgZ2V0U3ltYm9sc0luID0gIW5hdGl2ZUdldFN5bWJvbHMgPyBzdHViQXJyYXkgOiBmdW5jdGlvbihvYmplY3QpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB3aGlsZSAob2JqZWN0KSB7XG4gICAgYXJyYXlQdXNoKHJlc3VsdCwgZ2V0U3ltYm9scyhvYmplY3QpKTtcbiAgICBvYmplY3QgPSBnZXRQcm90b3R5cGUob2JqZWN0KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRTeW1ib2xzSW47XG4iLCJ2YXIgRGF0YVZpZXcgPSByZXF1aXJlKCcuL19EYXRhVmlldycpLFxuICAgIE1hcCA9IHJlcXVpcmUoJy4vX01hcCcpLFxuICAgIFByb21pc2UgPSByZXF1aXJlKCcuL19Qcm9taXNlJyksXG4gICAgU2V0ID0gcmVxdWlyZSgnLi9fU2V0JyksXG4gICAgV2Vha01hcCA9IHJlcXVpcmUoJy4vX1dlYWtNYXAnKSxcbiAgICBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIHRvU291cmNlID0gcmVxdWlyZSgnLi9fdG9Tb3VyY2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHByb21pc2VUYWcgPSAnW29iamVjdCBQcm9taXNlXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1hcHMsIHNldHMsIGFuZCB3ZWFrbWFwcy4gKi9cbnZhciBkYXRhVmlld0N0b3JTdHJpbmcgPSB0b1NvdXJjZShEYXRhVmlldyksXG4gICAgbWFwQ3RvclN0cmluZyA9IHRvU291cmNlKE1hcCksXG4gICAgcHJvbWlzZUN0b3JTdHJpbmcgPSB0b1NvdXJjZShQcm9taXNlKSxcbiAgICBzZXRDdG9yU3RyaW5nID0gdG9Tb3VyY2UoU2V0KSxcbiAgICB3ZWFrTWFwQ3RvclN0cmluZyA9IHRvU291cmNlKFdlYWtNYXApO1xuXG4vKipcbiAqIEdldHMgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG52YXIgZ2V0VGFnID0gYmFzZUdldFRhZztcblxuLy8gRmFsbGJhY2sgZm9yIGRhdGEgdmlld3MsIG1hcHMsIHNldHMsIGFuZCB3ZWFrIG1hcHMgaW4gSUUgMTEgYW5kIHByb21pc2VzIGluIE5vZGUuanMgPCA2LlxuaWYgKChEYXRhVmlldyAmJiBnZXRUYWcobmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcigxKSkpICE9IGRhdGFWaWV3VGFnKSB8fFxuICAgIChNYXAgJiYgZ2V0VGFnKG5ldyBNYXApICE9IG1hcFRhZykgfHxcbiAgICAoUHJvbWlzZSAmJiBnZXRUYWcoUHJvbWlzZS5yZXNvbHZlKCkpICE9IHByb21pc2VUYWcpIHx8XG4gICAgKFNldCAmJiBnZXRUYWcobmV3IFNldCkgIT0gc2V0VGFnKSB8fFxuICAgIChXZWFrTWFwICYmIGdldFRhZyhuZXcgV2Vha01hcCkgIT0gd2Vha01hcFRhZykpIHtcbiAgZ2V0VGFnID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgcmVzdWx0ID0gYmFzZUdldFRhZyh2YWx1ZSksXG4gICAgICAgIEN0b3IgPSByZXN1bHQgPT0gb2JqZWN0VGFnID8gdmFsdWUuY29uc3RydWN0b3IgOiB1bmRlZmluZWQsXG4gICAgICAgIGN0b3JTdHJpbmcgPSBDdG9yID8gdG9Tb3VyY2UoQ3RvcikgOiAnJztcblxuICAgIGlmIChjdG9yU3RyaW5nKSB7XG4gICAgICBzd2l0Y2ggKGN0b3JTdHJpbmcpIHtcbiAgICAgICAgY2FzZSBkYXRhVmlld0N0b3JTdHJpbmc6IHJldHVybiBkYXRhVmlld1RhZztcbiAgICAgICAgY2FzZSBtYXBDdG9yU3RyaW5nOiByZXR1cm4gbWFwVGFnO1xuICAgICAgICBjYXNlIHByb21pc2VDdG9yU3RyaW5nOiByZXR1cm4gcHJvbWlzZVRhZztcbiAgICAgICAgY2FzZSBzZXRDdG9yU3RyaW5nOiByZXR1cm4gc2V0VGFnO1xuICAgICAgICBjYXNlIHdlYWtNYXBDdG9yU3RyaW5nOiByZXR1cm4gd2Vha01hcFRhZztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRUYWc7XG4iLCIvKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRWYWx1ZTtcbiIsInZhciBjYXN0UGF0aCA9IHJlcXVpcmUoJy4vX2Nhc3RQYXRoJyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuL19pc0luZGV4JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAgdG9LZXkgPSByZXF1aXJlKCcuL190b0tleScpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgcGF0aGAgZXhpc3RzIG9uIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCB0byBjaGVjay5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhc0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrIHByb3BlcnRpZXMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHBhdGhgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNQYXRoKG9iamVjdCwgcGF0aCwgaGFzRnVuYykge1xuICBwYXRoID0gY2FzdFBhdGgocGF0aCwgb2JqZWN0KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gZmFsc2U7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gdG9LZXkocGF0aFtpbmRleF0pO1xuICAgIGlmICghKHJlc3VsdCA9IG9iamVjdCAhPSBudWxsICYmIGhhc0Z1bmMob2JqZWN0LCBrZXkpKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIG9iamVjdCA9IG9iamVjdFtrZXldO1xuICB9XG4gIGlmIChyZXN1bHQgfHwgKytpbmRleCAhPSBsZW5ndGgpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGxlbmd0aCA9IG9iamVjdCA9PSBudWxsID8gMCA6IG9iamVjdC5sZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpICYmXG4gICAgKGlzQXJyYXkob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNQYXRoO1xuIiwidmFyIG5hdGl2ZUNyZWF0ZSA9IHJlcXVpcmUoJy4vX25hdGl2ZUNyZWF0ZScpO1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgSGFzaFxuICovXG5mdW5jdGlvbiBoYXNoQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuYXRpdmVDcmVhdGUgPyBuYXRpdmVDcmVhdGUobnVsbCkgOiB7fTtcbiAgdGhpcy5zaXplID0gMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoQ2xlYXI7XG4iLCIvKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge09iamVjdH0gaGFzaCBUaGUgaGFzaCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaERlbGV0ZShrZXkpIHtcbiAgdmFyIHJlc3VsdCA9IHRoaXMuaGFzKGtleSkgJiYgZGVsZXRlIHRoaXMuX19kYXRhX19ba2V5XTtcbiAgdGhpcy5zaXplIC09IHJlc3VsdCA/IDEgOiAwO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hEZWxldGU7XG4iLCJ2YXIgbmF0aXZlQ3JlYXRlID0gcmVxdWlyZSgnLi9fbmF0aXZlQ3JlYXRlJyk7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBHZXRzIHRoZSBoYXNoIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGhhc2hHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKG5hdGl2ZUNyZWF0ZSkge1xuICAgIHZhciByZXN1bHQgPSBkYXRhW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gSEFTSF9VTkRFRklORUQgPyB1bmRlZmluZWQgOiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSA/IGRhdGFba2V5XSA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoR2V0O1xuIiwidmFyIG5hdGl2ZUNyZWF0ZSA9IHJlcXVpcmUoJy4vX25hdGl2ZUNyZWF0ZScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgcmV0dXJuIG5hdGl2ZUNyZWF0ZSA/IChkYXRhW2tleV0gIT09IHVuZGVmaW5lZCkgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaEhhcztcbiIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICB0aGlzLnNpemUgKz0gdGhpcy5oYXMoa2V5KSA/IDAgOiAxO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaFNldDtcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gYXJyYXkgY2xvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZUFycmF5KGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBuZXcgYXJyYXkuY29uc3RydWN0b3IobGVuZ3RoKTtcblxuICAvLyBBZGQgcHJvcGVydGllcyBhc3NpZ25lZCBieSBgUmVnRXhwI2V4ZWNgLlxuICBpZiAobGVuZ3RoICYmIHR5cGVvZiBhcnJheVswXSA9PSAnc3RyaW5nJyAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGFycmF5LCAnaW5kZXgnKSkge1xuICAgIHJlc3VsdC5pbmRleCA9IGFycmF5LmluZGV4O1xuICAgIHJlc3VsdC5pbnB1dCA9IGFycmF5LmlucHV0O1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5pdENsb25lQXJyYXk7XG4iLCJ2YXIgY2xvbmVBcnJheUJ1ZmZlciA9IHJlcXVpcmUoJy4vX2Nsb25lQXJyYXlCdWZmZXInKSxcbiAgICBjbG9uZURhdGFWaWV3ID0gcmVxdWlyZSgnLi9fY2xvbmVEYXRhVmlldycpLFxuICAgIGNsb25lUmVnRXhwID0gcmVxdWlyZSgnLi9fY2xvbmVSZWdFeHAnKSxcbiAgICBjbG9uZVN5bWJvbCA9IHJlcXVpcmUoJy4vX2Nsb25lU3ltYm9sJyksXG4gICAgY2xvbmVUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi9fY2xvbmVUeXBlZEFycmF5Jyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIG9iamVjdCBjbG9uZSBiYXNlZCBvbiBpdHMgYHRvU3RyaW5nVGFnYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBvbmx5IHN1cHBvcnRzIGNsb25pbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBNYXBgLCBgTnVtYmVyYCwgYFJlZ0V4cGAsIGBTZXRgLCBvciBgU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGluaXRpYWxpemVkIGNsb25lLlxuICovXG5mdW5jdGlvbiBpbml0Q2xvbmVCeVRhZyhvYmplY3QsIHRhZywgaXNEZWVwKSB7XG4gIHZhciBDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yO1xuICBzd2l0Y2ggKHRhZykge1xuICAgIGNhc2UgYXJyYXlCdWZmZXJUYWc6XG4gICAgICByZXR1cm4gY2xvbmVBcnJheUJ1ZmZlcihvYmplY3QpO1xuXG4gICAgY2FzZSBib29sVGFnOlxuICAgIGNhc2UgZGF0ZVRhZzpcbiAgICAgIHJldHVybiBuZXcgQ3Rvcigrb2JqZWN0KTtcblxuICAgIGNhc2UgZGF0YVZpZXdUYWc6XG4gICAgICByZXR1cm4gY2xvbmVEYXRhVmlldyhvYmplY3QsIGlzRGVlcCk7XG5cbiAgICBjYXNlIGZsb2F0MzJUYWc6IGNhc2UgZmxvYXQ2NFRhZzpcbiAgICBjYXNlIGludDhUYWc6IGNhc2UgaW50MTZUYWc6IGNhc2UgaW50MzJUYWc6XG4gICAgY2FzZSB1aW50OFRhZzogY2FzZSB1aW50OENsYW1wZWRUYWc6IGNhc2UgdWludDE2VGFnOiBjYXNlIHVpbnQzMlRhZzpcbiAgICAgIHJldHVybiBjbG9uZVR5cGVkQXJyYXkob2JqZWN0LCBpc0RlZXApO1xuXG4gICAgY2FzZSBtYXBUYWc6XG4gICAgICByZXR1cm4gbmV3IEN0b3I7XG5cbiAgICBjYXNlIG51bWJlclRhZzpcbiAgICBjYXNlIHN0cmluZ1RhZzpcbiAgICAgIHJldHVybiBuZXcgQ3RvcihvYmplY3QpO1xuXG4gICAgY2FzZSByZWdleHBUYWc6XG4gICAgICByZXR1cm4gY2xvbmVSZWdFeHAob2JqZWN0KTtcblxuICAgIGNhc2Ugc2V0VGFnOlxuICAgICAgcmV0dXJuIG5ldyBDdG9yO1xuXG4gICAgY2FzZSBzeW1ib2xUYWc6XG4gICAgICByZXR1cm4gY2xvbmVTeW1ib2wob2JqZWN0KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluaXRDbG9uZUJ5VGFnO1xuIiwidmFyIGJhc2VDcmVhdGUgPSByZXF1aXJlKCcuL19iYXNlQ3JlYXRlJyksXG4gICAgZ2V0UHJvdG90eXBlID0gcmVxdWlyZSgnLi9fZ2V0UHJvdG90eXBlJyksXG4gICAgaXNQcm90b3R5cGUgPSByZXF1aXJlKCcuL19pc1Byb3RvdHlwZScpO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIG9iamVjdCBjbG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZU9iamVjdChvYmplY3QpIHtcbiAgcmV0dXJuICh0eXBlb2Ygb2JqZWN0LmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgIWlzUHJvdG90eXBlKG9iamVjdCkpXG4gICAgPyBiYXNlQ3JlYXRlKGdldFByb3RvdHlwZShvYmplY3QpKVxuICAgIDoge307XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5pdENsb25lT2JqZWN0O1xuIiwiLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG5cbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGUgPT0gJ251bWJlcicgfHxcbiAgICAgICh0eXBlICE9ICdzeW1ib2wnICYmIHJlSXNVaW50LnRlc3QodmFsdWUpKSkgJiZcbiAgICAgICAgKHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSW5kZXg7XG4iLCJ2YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pc1N5bWJvbCcpO1xuXG4vKiogVXNlZCB0byBtYXRjaCBwcm9wZXJ0eSBuYW1lcyB3aXRoaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVJc0RlZXBQcm9wID0gL1xcLnxcXFsoPzpbXltcXF1dKnwoW1wiJ10pKD86KD8hXFwxKVteXFxcXF18XFxcXC4pKj9cXDEpXFxdLyxcbiAgICByZUlzUGxhaW5Qcm9wID0gL15cXHcqJC87XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lIGFuZCBub3QgYSBwcm9wZXJ0eSBwYXRoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5IGtleXMgb24uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXkodmFsdWUsIG9iamVjdCkge1xuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIGlmICh0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicgfHxcbiAgICAgIHZhbHVlID09IG51bGwgfHwgaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIHJlSXNQbGFpblByb3AudGVzdCh2YWx1ZSkgfHwgIXJlSXNEZWVwUHJvcC50ZXN0KHZhbHVlKSB8fFxuICAgIChvYmplY3QgIT0gbnVsbCAmJiB2YWx1ZSBpbiBPYmplY3Qob2JqZWN0KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNLZXk7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNLZXlhYmxlO1xuIiwidmFyIGNvcmVKc0RhdGEgPSByZXF1aXJlKCcuL19jb3JlSnNEYXRhJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtZXRob2RzIG1hc3F1ZXJhZGluZyBhcyBuYXRpdmUuICovXG52YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgcmV0dXJuIHVpZCA/ICgnU3ltYm9sKHNyYylfMS4nICsgdWlkKSA6ICcnO1xufSgpKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGhhcyBpdHMgc291cmNlIG1hc2tlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc01hc2tlZChmdW5jKSB7XG4gIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNNYXNrZWQ7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNQcm90b3R5cGU7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0Jyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHN0cmljdCBlcXVhbGl0eSBjb21wYXJpc29ucywgaS5lLiBgPT09YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpZiBzdWl0YWJsZSBmb3Igc3RyaWN0XG4gKiAgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgJiYgIWlzT2JqZWN0KHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1N0cmljdENvbXBhcmFibGU7XG4iLCIvKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gW107XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdENhY2hlQ2xlYXI7XG4iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzcGxpY2UgPSBhcnJheVByb3RvLnNwbGljZTtcblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIC0tdGhpcy5zaXplO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVEZWxldGU7XG4iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdENhY2hlR2V0O1xuIiwidmFyIGFzc29jSW5kZXhPZiA9IHJlcXVpcmUoJy4vX2Fzc29jSW5kZXhPZicpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKHRoaXMuX19kYXRhX18sIGtleSkgPiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVIYXM7XG4iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgKyt0aGlzLnNpemU7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVTZXQ7XG4iLCJ2YXIgSGFzaCA9IHJlcXVpcmUoJy4vX0hhc2gnKSxcbiAgICBMaXN0Q2FjaGUgPSByZXF1aXJlKCcuL19MaXN0Q2FjaGUnKSxcbiAgICBNYXAgPSByZXF1aXJlKCcuL19NYXAnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5zaXplID0gMDtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlQ2xlYXI7XG4iLCJ2YXIgZ2V0TWFwRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hcERhdGEnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgcmVzdWx0ID0gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpWydkZWxldGUnXShrZXkpO1xuICB0aGlzLnNpemUgLT0gcmVzdWx0ID8gMSA6IDA7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVEZWxldGU7XG4iLCJ2YXIgZ2V0TWFwRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hcERhdGEnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmdldChrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlR2V0O1xuIiwidmFyIGdldE1hcERhdGEgPSByZXF1aXJlKCcuL19nZXRNYXBEYXRhJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuaGFzKGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVIYXM7XG4iLCJ2YXIgZ2V0TWFwRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hcERhdGEnKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbWFwIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLFxuICAgICAgc2l6ZSA9IGRhdGEuc2l6ZTtcblxuICBkYXRhLnNldChrZXksIHZhbHVlKTtcbiAgdGhpcy5zaXplICs9IGRhdGEuc2l6ZSA9PSBzaXplID8gMCA6IDE7XG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlU2V0O1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBgbWFwYCB0byBpdHMga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUga2V5LXZhbHVlIHBhaXJzLlxuICovXG5mdW5jdGlvbiBtYXBUb0FycmF5KG1hcCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG1hcC5zaXplKTtcblxuICBtYXAuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gW2tleSwgdmFsdWVdO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBUb0FycmF5O1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYG1hdGNoZXNQcm9wZXJ0eWAgZm9yIHNvdXJjZSB2YWx1ZXMgc3VpdGFibGVcbiAqIGZvciBzdHJpY3QgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGkuZS4gYD09PWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSBzcmNWYWx1ZSBUaGUgdmFsdWUgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzcGVjIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZShrZXksIHNyY1ZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdFtrZXldID09PSBzcmNWYWx1ZSAmJlxuICAgICAgKHNyY1ZhbHVlICE9PSB1bmRlZmluZWQgfHwgKGtleSBpbiBPYmplY3Qob2JqZWN0KSkpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlO1xuIiwidmFyIG1lbW9pemUgPSByZXF1aXJlKCcuL21lbW9pemUnKTtcblxuLyoqIFVzZWQgYXMgdGhlIG1heGltdW0gbWVtb2l6ZSBjYWNoZSBzaXplLiAqL1xudmFyIE1BWF9NRU1PSVpFX1NJWkUgPSA1MDA7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLm1lbW9pemVgIHdoaWNoIGNsZWFycyB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24nc1xuICogY2FjaGUgd2hlbiBpdCBleGNlZWRzIGBNQVhfTUVNT0laRV9TSVpFYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaGF2ZSBpdHMgb3V0cHV0IG1lbW9pemVkLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG1lbW9pemVDYXBwZWQoZnVuYykge1xuICB2YXIgcmVzdWx0ID0gbWVtb2l6ZShmdW5jLCBmdW5jdGlvbihrZXkpIHtcbiAgICBpZiAoY2FjaGUuc2l6ZSA9PT0gTUFYX01FTU9JWkVfU0laRSkge1xuICAgICAgY2FjaGUuY2xlYXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbiAgfSk7XG5cbiAgdmFyIGNhY2hlID0gcmVzdWx0LmNhY2hlO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1lbW9pemVDYXBwZWQ7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF0aXZlQ3JlYXRlO1xuIiwidmFyIG92ZXJBcmcgPSByZXF1aXJlKCcuL19vdmVyQXJnJyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KTtcblxubW9kdWxlLmV4cG9ydHMgPSBuYXRpdmVLZXlzO1xuIiwiLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2VcbiAqIFtgT2JqZWN0LmtleXNgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGV4Y2VwdCB0aGF0IGl0IGluY2x1ZGVzIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIG5hdGl2ZUtleXNJbihvYmplY3QpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBpZiAob2JqZWN0ICE9IG51bGwpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmF0aXZlS2V5c0luO1xuIiwidmFyIGZyZWVHbG9iYWwgPSByZXF1aXJlKCcuL19mcmVlR2xvYmFsJyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBwcm9jZXNzYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZVByb2Nlc3MgPSBtb2R1bGVFeHBvcnRzICYmIGZyZWVHbG9iYWwucHJvY2VzcztcblxuLyoqIFVzZWQgdG8gYWNjZXNzIGZhc3RlciBOb2RlLmpzIGhlbHBlcnMuICovXG52YXIgbm9kZVV0aWwgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgLy8gVXNlIGB1dGlsLnR5cGVzYCBmb3IgTm9kZS5qcyAxMCsuXG4gICAgdmFyIHR5cGVzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLnJlcXVpcmUgJiYgZnJlZU1vZHVsZS5yZXF1aXJlKCd1dGlsJykudHlwZXM7XG5cbiAgICBpZiAodHlwZXMpIHtcbiAgICAgIHJldHVybiB0eXBlcztcbiAgICB9XG5cbiAgICAvLyBMZWdhY3kgYHByb2Nlc3MuYmluZGluZygndXRpbCcpYCBmb3IgTm9kZS5qcyA8IDEwLlxuICAgIHJldHVybiBmcmVlUHJvY2VzcyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcoJ3V0aWwnKTtcbiAgfSBjYXRjaCAoZSkge31cbn0oKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbm9kZVV0aWw7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvYmplY3RUb1N0cmluZztcbiIsIi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG92ZXJBcmc7XG4iLCJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvb3Q7XG4iLCIvKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKlxuICogQWRkcyBgdmFsdWVgIHRvIHRoZSBhcnJheSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgYWRkXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBhbGlhcyBwdXNoXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjYWNoZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUFkZCh2YWx1ZSkge1xuICB0aGlzLl9fZGF0YV9fLnNldCh2YWx1ZSwgSEFTSF9VTkRFRklORUQpO1xuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRDYWNoZUFkZDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgaW4gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVIYXModmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRDYWNoZUhhcztcbiIsIi8qKlxuICogQ29udmVydHMgYHNldGAgdG8gYW4gYXJyYXkgb2YgaXRzIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gc2V0VG9BcnJheShzZXQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShzZXQuc2l6ZSk7XG5cbiAgc2V0LmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSB2YWx1ZTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0VG9BcnJheTtcbiIsInZhciBMaXN0Q2FjaGUgPSByZXF1aXJlKCcuL19MaXN0Q2FjaGUnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBTdGFja1xuICovXG5mdW5jdGlvbiBzdGFja0NsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZTtcbiAgdGhpcy5zaXplID0gMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFja0NsZWFyO1xuIiwiLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIHJlc3VsdCA9IGRhdGFbJ2RlbGV0ZSddKGtleSk7XG5cbiAgdGhpcy5zaXplID0gZGF0YS5zaXplO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YWNrRGVsZXRlO1xuIiwiLyoqXG4gKiBHZXRzIHRoZSBzdGFjayB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tHZXQoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmdldChrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YWNrR2V0O1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYSBzdGFjayB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrSGFzKGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXMoa2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdGFja0hhcztcbiIsInZhciBMaXN0Q2FjaGUgPSByZXF1aXJlKCcuL19MaXN0Q2FjaGUnKSxcbiAgICBNYXAgPSByZXF1aXJlKCcuL19NYXAnKSxcbiAgICBNYXBDYWNoZSA9IHJlcXVpcmUoJy4vX01hcENhY2hlJyk7XG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xudmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbi8qKlxuICogU2V0cyB0aGUgc3RhY2sgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgc3RhY2sgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAoZGF0YSBpbnN0YW5jZW9mIExpc3RDYWNoZSkge1xuICAgIHZhciBwYWlycyA9IGRhdGEuX19kYXRhX187XG4gICAgaWYgKCFNYXAgfHwgKHBhaXJzLmxlbmd0aCA8IExBUkdFX0FSUkFZX1NJWkUgLSAxKSkge1xuICAgICAgcGFpcnMucHVzaChba2V5LCB2YWx1ZV0pO1xuICAgICAgdGhpcy5zaXplID0gKytkYXRhLnNpemU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZGF0YSA9IHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGUocGFpcnMpO1xuICB9XG4gIGRhdGEuc2V0KGtleSwgdmFsdWUpO1xuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YWNrU2V0O1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uaW5kZXhPZmAgd2hpY2ggcGVyZm9ybXMgc3RyaWN0IGVxdWFsaXR5XG4gKiBjb21wYXJpc29ucyBvZiB2YWx1ZXMsIGkuZS4gYD09PWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gc3RyaWN0SW5kZXhPZihhcnJheSwgdmFsdWUsIGZyb21JbmRleCkge1xuICB2YXIgaW5kZXggPSBmcm9tSW5kZXggLSAxLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGFycmF5W2luZGV4XSA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0cmljdEluZGV4T2Y7XG4iLCJ2YXIgbWVtb2l6ZUNhcHBlZCA9IHJlcXVpcmUoJy4vX21lbW9pemVDYXBwZWQnKTtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggcHJvcGVydHkgbmFtZXMgd2l0aGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlUHJvcE5hbWUgPSAvW14uW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxcXF18XFxcXC4pKj8pXFwyKVxcXXwoPz0oPzpcXC58XFxbXFxdKSg/OlxcLnxcXFtcXF18JCkpL2c7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGJhY2tzbGFzaGVzIGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlRXNjYXBlQ2hhciA9IC9cXFxcKFxcXFwpPy9nO1xuXG4vKipcbiAqIENvbnZlcnRzIGBzdHJpbmdgIHRvIGEgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKi9cbnZhciBzdHJpbmdUb1BhdGggPSBtZW1vaXplQ2FwcGVkKGZ1bmN0aW9uKHN0cmluZykge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGlmIChzdHJpbmcuY2hhckNvZGVBdCgwKSA9PT0gNDYgLyogLiAqLykge1xuICAgIHJlc3VsdC5wdXNoKCcnKTtcbiAgfVxuICBzdHJpbmcucmVwbGFjZShyZVByb3BOYW1lLCBmdW5jdGlvbihtYXRjaCwgbnVtYmVyLCBxdW90ZSwgc3ViU3RyaW5nKSB7XG4gICAgcmVzdWx0LnB1c2gocXVvdGUgPyBzdWJTdHJpbmcucmVwbGFjZShyZUVzY2FwZUNoYXIsICckMScpIDogKG51bWJlciB8fCBtYXRjaCkpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN0cmluZ1RvUGF0aDtcbiIsInZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXNTeW1ib2wnKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGtleSBpZiBpdCdzIG5vdCBhIHN0cmluZyBvciBzeW1ib2wuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7c3RyaW5nfHN5bWJvbH0gUmV0dXJucyB0aGUga2V5LlxuICovXG5mdW5jdGlvbiB0b0tleSh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9LZXk7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9Tb3VyY2U7XG4iLCJ2YXIgYmFzZUNsb25lID0gcmVxdWlyZSgnLi9fYmFzZUNsb25lJyk7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIGNsb25pbmcuICovXG52YXIgQ0xPTkVfREVFUF9GTEFHID0gMSxcbiAgICBDTE9ORV9TWU1CT0xTX0ZMQUcgPSA0O1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uY2xvbmVgIGV4Y2VwdCB0aGF0IGl0IHJlY3Vyc2l2ZWx5IGNsb25lcyBgdmFsdWVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMS4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byByZWN1cnNpdmVseSBjbG9uZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBkZWVwIGNsb25lZCB2YWx1ZS5cbiAqIEBzZWUgXy5jbG9uZVxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0cyA9IFt7ICdhJzogMSB9LCB7ICdiJzogMiB9XTtcbiAqXG4gKiB2YXIgZGVlcCA9IF8uY2xvbmVEZWVwKG9iamVjdHMpO1xuICogY29uc29sZS5sb2coZGVlcFswXSA9PT0gb2JqZWN0c1swXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBjbG9uZURlZXAodmFsdWUpIHtcbiAgcmV0dXJuIGJhc2VDbG9uZSh2YWx1ZSwgQ0xPTkVfREVFUF9GTEFHIHwgQ0xPTkVfU1lNQk9MU19GTEFHKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbG9uZURlZXA7XG4iLCIvKipcbiAqIFBlcmZvcm1zIGFcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlcTtcbiIsInZhciBiYXNlR2V0ID0gcmVxdWlyZSgnLi9fYmFzZUdldCcpO1xuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBwYXRoYCBvZiBgb2JqZWN0YC4gSWYgdGhlIHJlc29sdmVkIHZhbHVlIGlzXG4gKiBgdW5kZWZpbmVkYCwgdGhlIGBkZWZhdWx0VmFsdWVgIGlzIHJldHVybmVkIGluIGl0cyBwbGFjZS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuNy4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSBbZGVmYXVsdFZhbHVlXSBUaGUgdmFsdWUgcmV0dXJuZWQgZm9yIGB1bmRlZmluZWRgIHJlc29sdmVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiBbeyAnYic6IHsgJ2MnOiAzIH0gfV0gfTtcbiAqXG4gKiBfLmdldChvYmplY3QsICdhWzBdLmIuYycpO1xuICogLy8gPT4gM1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgWydhJywgJzAnLCAnYicsICdjJ10pO1xuICogLy8gPT4gM1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgJ2EuYi5jJywgJ2RlZmF1bHQnKTtcbiAqIC8vID0+ICdkZWZhdWx0J1xuICovXG5mdW5jdGlvbiBnZXQob2JqZWN0LCBwYXRoLCBkZWZhdWx0VmFsdWUpIHtcbiAgdmFyIHJlc3VsdCA9IG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogYmFzZUdldChvYmplY3QsIHBhdGgpO1xuICByZXR1cm4gcmVzdWx0ID09PSB1bmRlZmluZWQgPyBkZWZhdWx0VmFsdWUgOiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0O1xuIiwidmFyIGJhc2VIYXNJbiA9IHJlcXVpcmUoJy4vX2Jhc2VIYXNJbicpLFxuICAgIGhhc1BhdGggPSByZXF1aXJlKCcuL19oYXNQYXRoJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBwYXRoYCBpcyBhIGRpcmVjdCBvciBpbmhlcml0ZWQgcHJvcGVydHkgb2YgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHBhdGhgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0gXy5jcmVhdGUoeyAnYSc6IF8uY3JlYXRlKHsgJ2InOiAyIH0pIH0pO1xuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCAnYS5iJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5oYXNJbihvYmplY3QsIFsnYScsICdiJ10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCAnYicpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaGFzSW4ob2JqZWN0LCBwYXRoKSB7XG4gIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBoYXNQYXRoKG9iamVjdCwgcGF0aCwgYmFzZUhhc0luKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNJbjtcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgaXQgcmVjZWl2ZXMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKlxuICogY29uc29sZS5sb2coXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaWRlbnRpdHk7XG4iLCJ2YXIgYmFzZUlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9fYmFzZUlzQXJndW1lbnRzJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJndW1lbnRzID0gYmFzZUlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID8gYmFzZUlzQXJndW1lbnRzIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcmd1bWVudHM7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5O1xuIiwidmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKCcuL2lzRnVuY3Rpb24nKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheUxpa2U7XG4iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKSxcbiAgICBzdHViRmFsc2UgPSByZXF1aXJlKCcuL3N0dWJGYWxzZScpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIEJ1ZmZlciA9IG1vZHVsZUV4cG9ydHMgPyByb290LkJ1ZmZlciA6IHVuZGVmaW5lZDtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUlzQnVmZmVyID0gQnVmZmVyID8gQnVmZmVyLmlzQnVmZmVyIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4zLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IEJ1ZmZlcigyKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgVWludDhBcnJheSgyKSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNCdWZmZXIgPSBuYXRpdmVJc0J1ZmZlciB8fCBzdHViRmFsc2U7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNCdWZmZXI7XG4iLCJ2YXIgYmFzZUlzRXF1YWwgPSByZXF1aXJlKCcuL19iYXNlSXNFcXVhbCcpO1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgZGVlcCBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmVcbiAqIGVxdWl2YWxlbnQuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIHN1cHBvcnRzIGNvbXBhcmluZyBhcnJheXMsIGFycmF5IGJ1ZmZlcnMsIGJvb2xlYW5zLFxuICogZGF0ZSBvYmplY3RzLCBlcnJvciBvYmplY3RzLCBtYXBzLCBudW1iZXJzLCBgT2JqZWN0YCBvYmplY3RzLCByZWdleGVzLFxuICogc2V0cywgc3RyaW5ncywgc3ltYm9scywgYW5kIHR5cGVkIGFycmF5cy4gYE9iamVjdGAgb2JqZWN0cyBhcmUgY29tcGFyZWRcbiAqIGJ5IHRoZWlyIG93biwgbm90IGluaGVyaXRlZCwgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLiBGdW5jdGlvbnMgYW5kIERPTVxuICogbm9kZXMgYXJlIGNvbXBhcmVkIGJ5IHN0cmljdCBlcXVhbGl0eSwgaS5lLiBgPT09YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5pc0VxdWFsKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIG9iamVjdCA9PT0gb3RoZXI7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0VxdWFsKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gYmFzZUlzRXF1YWwodmFsdWUsIG90aGVyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0VxdWFsO1xuIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0Jyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhc3luY1RhZyA9ICdbb2JqZWN0IEFzeW5jRnVuY3Rpb25dJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIHByb3h5VGFnID0gJ1tvYmplY3QgUHJveHldJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA5IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5cyBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gYmFzZUdldFRhZyh2YWx1ZSk7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnIHx8IHRhZyA9PSBhc3luY1RhZyB8fCB0YWcgPT0gcHJveHlUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvbjtcbiIsIi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0xlbmd0aDtcbiIsInZhciBiYXNlSXNNYXAgPSByZXF1aXJlKCcuL19iYXNlSXNNYXAnKSxcbiAgICBiYXNlVW5hcnkgPSByZXF1aXJlKCcuL19iYXNlVW5hcnknKSxcbiAgICBub2RlVXRpbCA9IHJlcXVpcmUoJy4vX25vZGVVdGlsJyk7XG5cbi8qIE5vZGUuanMgaGVscGVyIHJlZmVyZW5jZXMuICovXG52YXIgbm9kZUlzTWFwID0gbm9kZVV0aWwgJiYgbm9kZVV0aWwuaXNNYXA7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBNYXBgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMy4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG1hcCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTWFwKG5ldyBNYXApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNNYXAobmV3IFdlYWtNYXApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzTWFwID0gbm9kZUlzTWFwID8gYmFzZVVuYXJ5KG5vZGVJc01hcCkgOiBiYXNlSXNNYXA7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNNYXA7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcbiIsInZhciBiYXNlSXNTZXQgPSByZXF1aXJlKCcuL19iYXNlSXNTZXQnKSxcbiAgICBiYXNlVW5hcnkgPSByZXF1aXJlKCcuL19iYXNlVW5hcnknKSxcbiAgICBub2RlVXRpbCA9IHJlcXVpcmUoJy4vX25vZGVVdGlsJyk7XG5cbi8qIE5vZGUuanMgaGVscGVyIHJlZmVyZW5jZXMuICovXG52YXIgbm9kZUlzU2V0ID0gbm9kZVV0aWwgJiYgbm9kZVV0aWwuaXNTZXQ7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTZXRgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMy4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHNldCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU2V0KG5ldyBTZXQpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTZXQobmV3IFdlYWtTZXQpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzU2V0ID0gbm9kZUlzU2V0ID8gYmFzZVVuYXJ5KG5vZGVJc1NldCkgOiBiYXNlSXNTZXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTZXQ7XG4iLCJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIGJhc2VHZXRUYWcodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTeW1ib2w7XG4iLCJ2YXIgYmFzZUlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4vX2Jhc2VJc1R5cGVkQXJyYXknKSxcbiAgICBiYXNlVW5hcnkgPSByZXF1aXJlKCcuL19iYXNlVW5hcnknKSxcbiAgICBub2RlVXRpbCA9IHJlcXVpcmUoJy4vX25vZGVVdGlsJyk7XG5cbi8qIE5vZGUuanMgaGVscGVyIHJlZmVyZW5jZXMuICovXG52YXIgbm9kZUlzVHlwZWRBcnJheSA9IG5vZGVVdGlsICYmIG5vZGVVdGlsLmlzVHlwZWRBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShuZXcgVWludDhBcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkoW10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzVHlwZWRBcnJheSA9IG5vZGVJc1R5cGVkQXJyYXkgPyBiYXNlVW5hcnkobm9kZUlzVHlwZWRBcnJheSkgOiBiYXNlSXNUeXBlZEFycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVHlwZWRBcnJheTtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYHVuZGVmaW5lZGAuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYHVuZGVmaW5lZGAsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1VuZGVmaW5lZCh2b2lkIDApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNVbmRlZmluZWQobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1VuZGVmaW5lZDtcbiIsInZhciBhcnJheUxpa2VLZXlzID0gcmVxdWlyZSgnLi9fYXJyYXlMaWtlS2V5cycpLFxuICAgIGJhc2VLZXlzID0gcmVxdWlyZSgnLi9fYmFzZUtleXMnKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG5mdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0KSA6IGJhc2VLZXlzKG9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5cztcbiIsInZhciBhcnJheUxpa2VLZXlzID0gcmVxdWlyZSgnLi9fYXJyYXlMaWtlS2V5cycpLFxuICAgIGJhc2VLZXlzSW4gPSByZXF1aXJlKCcuL19iYXNlS2V5c0luJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXNJbihuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJywgJ2MnXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICovXG5mdW5jdGlvbiBrZXlzSW4ob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QsIHRydWUpIDogYmFzZUtleXNJbihvYmplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXNJbjtcbiIsInZhciBNYXBDYWNoZSA9IHJlcXVpcmUoJy4vX01hcENhY2hlJyk7XG5cbi8qKiBFcnJvciBtZXNzYWdlIGNvbnN0YW50cy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgbWVtb2l6ZXMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuIElmIGByZXNvbHZlcmAgaXNcbiAqIHByb3ZpZGVkLCBpdCBkZXRlcm1pbmVzIHRoZSBjYWNoZSBrZXkgZm9yIHN0b3JpbmcgdGhlIHJlc3VsdCBiYXNlZCBvbiB0aGVcbiAqIGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uIEJ5IGRlZmF1bHQsIHRoZSBmaXJzdCBhcmd1bWVudFxuICogcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uIGlzIHVzZWQgYXMgdGhlIG1hcCBjYWNoZSBrZXkuIFRoZSBgZnVuY2BcbiAqIGlzIGludm9rZWQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlIG1lbW9pemVkIGZ1bmN0aW9uLlxuICpcbiAqICoqTm90ZToqKiBUaGUgY2FjaGUgaXMgZXhwb3NlZCBhcyB0aGUgYGNhY2hlYCBwcm9wZXJ0eSBvbiB0aGUgbWVtb2l6ZWRcbiAqIGZ1bmN0aW9uLiBJdHMgY3JlYXRpb24gbWF5IGJlIGN1c3RvbWl6ZWQgYnkgcmVwbGFjaW5nIHRoZSBgXy5tZW1vaXplLkNhY2hlYFxuICogY29uc3RydWN0b3Igd2l0aCBvbmUgd2hvc2UgaW5zdGFuY2VzIGltcGxlbWVudCB0aGVcbiAqIFtgTWFwYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcHJvcGVydGllcy1vZi10aGUtbWFwLXByb3RvdHlwZS1vYmplY3QpXG4gKiBtZXRob2QgaW50ZXJmYWNlIG9mIGBjbGVhcmAsIGBkZWxldGVgLCBgZ2V0YCwgYGhhc2AsIGFuZCBgc2V0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGhhdmUgaXRzIG91dHB1dCBtZW1vaXplZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZXNvbHZlcl0gVGhlIGZ1bmN0aW9uIHRvIHJlc29sdmUgdGhlIGNhY2hlIGtleS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IG1lbW9pemVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogMiB9O1xuICogdmFyIG90aGVyID0geyAnYyc6IDMsICdkJzogNCB9O1xuICpcbiAqIHZhciB2YWx1ZXMgPSBfLm1lbW9pemUoXy52YWx1ZXMpO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiB2YWx1ZXMob3RoZXIpO1xuICogLy8gPT4gWzMsIDRdXG4gKlxuICogb2JqZWN0LmEgPSAyO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiAvLyBNb2RpZnkgdGhlIHJlc3VsdCBjYWNoZS5cbiAqIHZhbHVlcy5jYWNoZS5zZXQob2JqZWN0LCBbJ2EnLCAnYiddKTtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWydhJywgJ2InXVxuICpcbiAqIC8vIFJlcGxhY2UgYF8ubWVtb2l6ZS5DYWNoZWAuXG4gKiBfLm1lbW9pemUuQ2FjaGUgPSBXZWFrTWFwO1xuICovXG5mdW5jdGlvbiBtZW1vaXplKGZ1bmMsIHJlc29sdmVyKSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nIHx8IChyZXNvbHZlciAhPSBudWxsICYmIHR5cGVvZiByZXNvbHZlciAhPSAnZnVuY3Rpb24nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB2YXIgbWVtb2l6ZWQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAga2V5ID0gcmVzb2x2ZXIgPyByZXNvbHZlci5hcHBseSh0aGlzLCBhcmdzKSA6IGFyZ3NbMF0sXG4gICAgICAgIGNhY2hlID0gbWVtb2l6ZWQuY2FjaGU7XG5cbiAgICBpZiAoY2FjaGUuaGFzKGtleSkpIHtcbiAgICAgIHJldHVybiBjYWNoZS5nZXQoa2V5KTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgbWVtb2l6ZWQuY2FjaGUgPSBjYWNoZS5zZXQoa2V5LCByZXN1bHQpIHx8IGNhY2hlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIG1lbW9pemVkLmNhY2hlID0gbmV3IChtZW1vaXplLkNhY2hlIHx8IE1hcENhY2hlKTtcbiAgcmV0dXJuIG1lbW9pemVkO1xufVxuXG4vLyBFeHBvc2UgYE1hcENhY2hlYC5cbm1lbW9pemUuQ2FjaGUgPSBNYXBDYWNoZTtcblxubW9kdWxlLmV4cG9ydHMgPSBtZW1vaXplO1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGB1bmRlZmluZWRgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi4zLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udGltZXMoMiwgXy5ub29wKTtcbiAqIC8vID0+IFt1bmRlZmluZWQsIHVuZGVmaW5lZF1cbiAqL1xuZnVuY3Rpb24gbm9vcCgpIHtcbiAgLy8gTm8gb3BlcmF0aW9uIHBlcmZvcm1lZC5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBub29wO1xuIiwidmFyIGJhc2VQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2Jhc2VQcm9wZXJ0eScpLFxuICAgIGJhc2VQcm9wZXJ0eURlZXAgPSByZXF1aXJlKCcuL19iYXNlUHJvcGVydHlEZWVwJyksXG4gICAgaXNLZXkgPSByZXF1aXJlKCcuL19pc0tleScpLFxuICAgIHRvS2V5ID0gcmVxdWlyZSgnLi9fdG9LZXknKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBhdCBgcGF0aGAgb2YgYSBnaXZlbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhY2Nlc3NvciBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdHMgPSBbXG4gKiAgIHsgJ2EnOiB7ICdiJzogMiB9IH0sXG4gKiAgIHsgJ2EnOiB7ICdiJzogMSB9IH1cbiAqIF07XG4gKlxuICogXy5tYXAob2JqZWN0cywgXy5wcm9wZXJ0eSgnYS5iJykpO1xuICogLy8gPT4gWzIsIDFdXG4gKlxuICogXy5tYXAoXy5zb3J0Qnkob2JqZWN0cywgXy5wcm9wZXJ0eShbJ2EnLCAnYiddKSksICdhLmInKTtcbiAqIC8vID0+IFsxLCAyXVxuICovXG5mdW5jdGlvbiBwcm9wZXJ0eShwYXRoKSB7XG4gIHJldHVybiBpc0tleShwYXRoKSA/IGJhc2VQcm9wZXJ0eSh0b0tleShwYXRoKSkgOiBiYXNlUHJvcGVydHlEZWVwKHBhdGgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHByb3BlcnR5O1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGEgbmV3IGVtcHR5IGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZW1wdHkgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBhcnJheXMgPSBfLnRpbWVzKDIsIF8uc3R1YkFycmF5KTtcbiAqXG4gKiBjb25zb2xlLmxvZyhhcnJheXMpO1xuICogLy8gPT4gW1tdLCBbXV1cbiAqXG4gKiBjb25zb2xlLmxvZyhhcnJheXNbMF0gPT09IGFycmF5c1sxXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBzdHViQXJyYXkoKSB7XG4gIHJldHVybiBbXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHViQXJyYXk7XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYGZhbHNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udGltZXMoMiwgXy5zdHViRmFsc2UpO1xuICogLy8gPT4gW2ZhbHNlLCBmYWxzZV1cbiAqL1xuZnVuY3Rpb24gc3R1YkZhbHNlKCkge1xuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R1YkZhbHNlO1xuIiwidmFyIGJhc2VUb1N0cmluZyA9IHJlcXVpcmUoJy4vX2Jhc2VUb1N0cmluZycpO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZCBmb3IgYG51bGxgXG4gKiBhbmQgYHVuZGVmaW5lZGAgdmFsdWVzLiBUaGUgc2lnbiBvZiBgLTBgIGlzIHByZXNlcnZlZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9TdHJpbmcobnVsbCk7XG4gKiAvLyA9PiAnJ1xuICpcbiAqIF8udG9TdHJpbmcoLTApO1xuICogLy8gPT4gJy0wJ1xuICpcbiAqIF8udG9TdHJpbmcoWzEsIDIsIDNdKTtcbiAqIC8vID0+ICcxLDIsMydcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IGJhc2VUb1N0cmluZyh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9TdHJpbmc7XG4iLCJ2YXIgYmFzZUl0ZXJhdGVlID0gcmVxdWlyZSgnLi9fYmFzZUl0ZXJhdGVlJyksXG4gICAgYmFzZVVuaXEgPSByZXF1aXJlKCcuL19iYXNlVW5pcScpO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8udW5pcWAgZXhjZXB0IHRoYXQgaXQgYWNjZXB0cyBgaXRlcmF0ZWVgIHdoaWNoIGlzXG4gKiBpbnZva2VkIGZvciBlYWNoIGVsZW1lbnQgaW4gYGFycmF5YCB0byBnZW5lcmF0ZSB0aGUgY3JpdGVyaW9uIGJ5IHdoaWNoXG4gKiB1bmlxdWVuZXNzIGlzIGNvbXB1dGVkLiBUaGUgb3JkZXIgb2YgcmVzdWx0IHZhbHVlcyBpcyBkZXRlcm1pbmVkIGJ5IHRoZVxuICogb3JkZXIgdGhleSBvY2N1ciBpbiB0aGUgYXJyYXkuIFRoZSBpdGVyYXRlZSBpcyBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OlxuICogKHZhbHVlKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlPV8uaWRlbnRpdHldIFRoZSBpdGVyYXRlZSBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZHVwbGljYXRlIGZyZWUgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udW5pcUJ5KFsyLjEsIDEuMiwgMi4zXSwgTWF0aC5mbG9vcik7XG4gKiAvLyA9PiBbMi4xLCAxLjJdXG4gKlxuICogLy8gVGhlIGBfLnByb3BlcnR5YCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gKiBfLnVuaXFCeShbeyAneCc6IDEgfSwgeyAneCc6IDIgfSwgeyAneCc6IDEgfV0sICd4Jyk7XG4gKiAvLyA9PiBbeyAneCc6IDEgfSwgeyAneCc6IDIgfV1cbiAqL1xuZnVuY3Rpb24gdW5pcUJ5KGFycmF5LCBpdGVyYXRlZSkge1xuICByZXR1cm4gKGFycmF5ICYmIGFycmF5Lmxlbmd0aCkgPyBiYXNlVW5pcShhcnJheSwgYmFzZUl0ZXJhdGVlKGl0ZXJhdGVlLCAyKSkgOiBbXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1bmlxQnk7XG4iLCJ2YXIgYmFzZVVuaXEgPSByZXF1aXJlKCcuL19iYXNlVW5pcScpO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8udW5pcWAgZXhjZXB0IHRoYXQgaXQgYWNjZXB0cyBgY29tcGFyYXRvcmAgd2hpY2hcbiAqIGlzIGludm9rZWQgdG8gY29tcGFyZSBlbGVtZW50cyBvZiBgYXJyYXlgLiBUaGUgb3JkZXIgb2YgcmVzdWx0IHZhbHVlcyBpc1xuICogZGV0ZXJtaW5lZCBieSB0aGUgb3JkZXIgdGhleSBvY2N1ciBpbiB0aGUgYXJyYXkuVGhlIGNvbXBhcmF0b3IgaXMgaW52b2tlZFxuICogd2l0aCB0d28gYXJndW1lbnRzOiAoYXJyVmFsLCBvdGhWYWwpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29tcGFyYXRvcl0gVGhlIGNvbXBhcmF0b3IgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGR1cGxpY2F0ZSBmcmVlIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0cyA9IFt7ICd4JzogMSwgJ3knOiAyIH0sIHsgJ3gnOiAyLCAneSc6IDEgfSwgeyAneCc6IDEsICd5JzogMiB9XTtcbiAqXG4gKiBfLnVuaXFXaXRoKG9iamVjdHMsIF8uaXNFcXVhbCk7XG4gKiAvLyA9PiBbeyAneCc6IDEsICd5JzogMiB9LCB7ICd4JzogMiwgJ3knOiAxIH1dXG4gKi9cbmZ1bmN0aW9uIHVuaXFXaXRoKGFycmF5LCBjb21wYXJhdG9yKSB7XG4gIGNvbXBhcmF0b3IgPSB0eXBlb2YgY29tcGFyYXRvciA9PSAnZnVuY3Rpb24nID8gY29tcGFyYXRvciA6IHVuZGVmaW5lZDtcbiAgcmV0dXJuIChhcnJheSAmJiBhcnJheS5sZW5ndGgpID8gYmFzZVVuaXEoYXJyYXksIHVuZGVmaW5lZCwgY29tcGFyYXRvcikgOiBbXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1bmlxV2l0aDtcbiIsInZhciBTeWx2ZXN0ZXIgPSB7fVxuXG5TeWx2ZXN0ZXIuTWF0cml4ID0gZnVuY3Rpb24oKSB7fVxuXG5TeWx2ZXN0ZXIuTWF0cml4LmNyZWF0ZSA9IGZ1bmN0aW9uKGVsZW1lbnRzKSB7XG4gIHZhciBNID0gbmV3IFN5bHZlc3Rlci5NYXRyaXgoKVxuICByZXR1cm4gTS5zZXRFbGVtZW50cyhlbGVtZW50cylcbn1cblxuU3lsdmVzdGVyLk1hdHJpeC5JID0gZnVuY3Rpb24obikge1xuICB2YXIgZWxzID0gW10sXG4gICAgaSA9IG4sXG4gICAgalxuICB3aGlsZSAoaS0tKSB7XG4gICAgaiA9IG5cbiAgICBlbHNbaV0gPSBbXVxuICAgIHdoaWxlIChqLS0pIHtcbiAgICAgIGVsc1tpXVtqXSA9IGkgPT09IGogPyAxIDogMFxuICAgIH1cbiAgfVxuICByZXR1cm4gU3lsdmVzdGVyLk1hdHJpeC5jcmVhdGUoZWxzKVxufVxuXG5TeWx2ZXN0ZXIuTWF0cml4LnByb3RvdHlwZSA9IHtcbiAgZHVwOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gU3lsdmVzdGVyLk1hdHJpeC5jcmVhdGUodGhpcy5lbGVtZW50cylcbiAgfSxcblxuICBpc1NxdWFyZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbHMgPSB0aGlzLmVsZW1lbnRzLmxlbmd0aCA9PT0gMCA/IDAgOiB0aGlzLmVsZW1lbnRzWzBdLmxlbmd0aFxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzLmxlbmd0aCA9PT0gY29sc1xuICB9LFxuXG4gIHRvUmlnaHRUcmlhbmd1bGFyOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50cy5sZW5ndGggPT09IDApIHJldHVybiBTeWx2ZXN0ZXIuTWF0cml4LmNyZWF0ZShbXSlcbiAgICB2YXIgTSA9IHRoaXMuZHVwKCksXG4gICAgICBlbHNcbiAgICB2YXIgbiA9IHRoaXMuZWxlbWVudHMubGVuZ3RoLFxuICAgICAgaSxcbiAgICAgIGosXG4gICAgICBucCA9IHRoaXMuZWxlbWVudHNbMF0ubGVuZ3RoLFxuICAgICAgcFxuICAgIGZvciAoaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgIGlmIChNLmVsZW1lbnRzW2ldW2ldID09PSAwKSB7XG4gICAgICAgIGZvciAoaiA9IGkgKyAxOyBqIDwgbjsgaisrKSB7XG4gICAgICAgICAgaWYgKE0uZWxlbWVudHNbal1baV0gIT09IDApIHtcbiAgICAgICAgICAgIGVscyA9IFtdXG4gICAgICAgICAgICBmb3IgKHAgPSAwOyBwIDwgbnA7IHArKykge1xuICAgICAgICAgICAgICBlbHMucHVzaChNLmVsZW1lbnRzW2ldW3BdICsgTS5lbGVtZW50c1tqXVtwXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE0uZWxlbWVudHNbaV0gPSBlbHNcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoTS5lbGVtZW50c1tpXVtpXSAhPT0gMCkge1xuICAgICAgICBmb3IgKGogPSBpICsgMTsgaiA8IG47IGorKykge1xuICAgICAgICAgIHZhciBtdWx0aXBsaWVyID0gTS5lbGVtZW50c1tqXVtpXSAvIE0uZWxlbWVudHNbaV1baV1cbiAgICAgICAgICBlbHMgPSBbXVxuICAgICAgICAgIGZvciAocCA9IDA7IHAgPCBucDsgcCsrKSB7XG4gICAgICAgICAgICAvLyBFbGVtZW50cyB3aXRoIGNvbHVtbiBudW1iZXJzIHVwIHRvIGFuIGluY2x1ZGluZyB0aGUgbnVtYmVyIG9mIHRoZVxuICAgICAgICAgICAgLy8gcm93IHRoYXQgd2UncmUgc3VidHJhY3RpbmcgY2FuIHNhZmVseSBiZSBzZXQgc3RyYWlnaHQgdG8gemVybyxcbiAgICAgICAgICAgIC8vIHNpbmNlIHRoYXQncyB0aGUgcG9pbnQgb2YgdGhpcyByb3V0aW5lIGFuZCBpdCBhdm9pZHMgaGF2aW5nIHRvXG4gICAgICAgICAgICAvLyBsb29wIG92ZXIgYW5kIGNvcnJlY3Qgcm91bmRpbmcgZXJyb3JzIGxhdGVyXG4gICAgICAgICAgICBlbHMucHVzaChcbiAgICAgICAgICAgICAgcCA8PSBpID8gMCA6IE0uZWxlbWVudHNbal1bcF0gLSBNLmVsZW1lbnRzW2ldW3BdICogbXVsdGlwbGllclxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBNLmVsZW1lbnRzW2pdID0gZWxzXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIE1cbiAgfSxcblxuICBkZXRlcm1pbmFudDogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gMVxuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNTcXVhcmUoKSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgdmFyIE0gPSB0aGlzLnRvUmlnaHRUcmlhbmd1bGFyKClcbiAgICB2YXIgZGV0ID0gTS5lbGVtZW50c1swXVswXSxcbiAgICAgIG4gPSBNLmVsZW1lbnRzLmxlbmd0aFxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbjsgaSsrKSB7XG4gICAgICBkZXQgPSBkZXQgKiBNLmVsZW1lbnRzW2ldW2ldXG4gICAgfVxuICAgIHJldHVybiBkZXRcbiAgfSxcblxuICBpc1Npbmd1bGFyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5pc1NxdWFyZSgpICYmIHRoaXMuZGV0ZXJtaW5hbnQoKSA9PT0gMFxuICB9LFxuXG4gIGF1Z21lbnQ6IGZ1bmN0aW9uKG1hdHJpeCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZHVwKClcbiAgICB9XG4gICAgdmFyIE0gPSBtYXRyaXguZWxlbWVudHMgfHwgbWF0cml4XG4gICAgaWYgKHR5cGVvZiBNWzBdWzBdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgTSA9IFN5bHZlc3Rlci5NYXRyaXguY3JlYXRlKE0pLmVsZW1lbnRzXG4gICAgfVxuICAgIHZhciBUID0gdGhpcy5kdXAoKSxcbiAgICAgIGNvbHMgPSBULmVsZW1lbnRzWzBdLmxlbmd0aFxuICAgIHZhciBpID0gVC5lbGVtZW50cy5sZW5ndGgsXG4gICAgICBuaiA9IE1bMF0ubGVuZ3RoLFxuICAgICAgalxuICAgIGlmIChpICE9PSBNLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaiA9IG5qXG4gICAgICB3aGlsZSAoai0tKSB7XG4gICAgICAgIFQuZWxlbWVudHNbaV1bY29scyArIGpdID0gTVtpXVtqXVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gVFxuICB9LFxuXG4gIGludmVyc2U6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzU3F1YXJlKCkgfHwgdGhpcy5pc1Npbmd1bGFyKCkpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHZhciBuID0gdGhpcy5lbGVtZW50cy5sZW5ndGgsXG4gICAgICBpID0gbixcbiAgICAgIGpcbiAgICB2YXIgTSA9IHRoaXMuYXVnbWVudChTeWx2ZXN0ZXIuTWF0cml4LkkobikpLnRvUmlnaHRUcmlhbmd1bGFyKClcbiAgICB2YXIgbnAgPSBNLmVsZW1lbnRzWzBdLmxlbmd0aCxcbiAgICAgIHAsXG4gICAgICBlbHMsXG4gICAgICBkaXZpc29yXG4gICAgdmFyIGludmVyc2VfZWxlbWVudHMgPSBbXSxcbiAgICAgIG5ld19lbGVtZW50XG4gICAgLy8gU3lsdmVzdGVyLk1hdHJpeCBpcyBub24tc2luZ3VsYXIgc28gdGhlcmUgd2lsbCBiZSBubyB6ZXJvcyBvbiB0aGVcbiAgICAvLyBkaWFnb25hbC4gQ3ljbGUgdGhyb3VnaCByb3dzIGZyb20gbGFzdCB0byBmaXJzdC5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAvLyBGaXJzdCwgbm9ybWFsaXNlIGRpYWdvbmFsIGVsZW1lbnRzIHRvIDFcbiAgICAgIGVscyA9IFtdXG4gICAgICBpbnZlcnNlX2VsZW1lbnRzW2ldID0gW11cbiAgICAgIGRpdmlzb3IgPSBNLmVsZW1lbnRzW2ldW2ldXG4gICAgICBmb3IgKHAgPSAwOyBwIDwgbnA7IHArKykge1xuICAgICAgICBuZXdfZWxlbWVudCA9IE0uZWxlbWVudHNbaV1bcF0gLyBkaXZpc29yXG4gICAgICAgIGVscy5wdXNoKG5ld19lbGVtZW50KVxuICAgICAgICAvLyBTaHVmZmxlIG9mZiB0aGUgY3VycmVudCByb3cgb2YgdGhlIHJpZ2h0IGhhbmQgc2lkZSBpbnRvIHRoZSByZXN1bHRzXG4gICAgICAgIC8vIGFycmF5IGFzIGl0IHdpbGwgbm90IGJlIG1vZGlmaWVkIGJ5IGxhdGVyIHJ1bnMgdGhyb3VnaCB0aGlzIGxvb3BcbiAgICAgICAgaWYgKHAgPj0gbikge1xuICAgICAgICAgIGludmVyc2VfZWxlbWVudHNbaV0ucHVzaChuZXdfZWxlbWVudClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgTS5lbGVtZW50c1tpXSA9IGVsc1xuICAgICAgLy8gVGhlbiwgc3VidHJhY3QgdGhpcyByb3cgZnJvbSB0aG9zZSBhYm92ZSBpdCB0byBnaXZlIHRoZSBpZGVudGl0eSBtYXRyaXhcbiAgICAgIC8vIG9uIHRoZSBsZWZ0IGhhbmQgc2lkZVxuICAgICAgaiA9IGlcbiAgICAgIHdoaWxlIChqLS0pIHtcbiAgICAgICAgZWxzID0gW11cbiAgICAgICAgZm9yIChwID0gMDsgcCA8IG5wOyBwKyspIHtcbiAgICAgICAgICBlbHMucHVzaChNLmVsZW1lbnRzW2pdW3BdIC0gTS5lbGVtZW50c1tpXVtwXSAqIE0uZWxlbWVudHNbal1baV0pXG4gICAgICAgIH1cbiAgICAgICAgTS5lbGVtZW50c1tqXSA9IGVsc1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gU3lsdmVzdGVyLk1hdHJpeC5jcmVhdGUoaW52ZXJzZV9lbGVtZW50cylcbiAgfSxcblxuICBzZXRFbGVtZW50czogZnVuY3Rpb24oZWxzKSB7XG4gICAgdmFyIGksXG4gICAgICBqLFxuICAgICAgZWxlbWVudHMgPSBlbHMuZWxlbWVudHMgfHwgZWxzXG4gICAgaWYgKGVsZW1lbnRzWzBdICYmIHR5cGVvZiBlbGVtZW50c1swXVswXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGkgPSBlbGVtZW50cy5sZW5ndGhcbiAgICAgIHRoaXMuZWxlbWVudHMgPSBbXVxuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBqID0gZWxlbWVudHNbaV0ubGVuZ3RoXG4gICAgICAgIHRoaXMuZWxlbWVudHNbaV0gPSBbXVxuICAgICAgICB3aGlsZSAoai0tKSB7XG4gICAgICAgICAgdGhpcy5lbGVtZW50c1tpXVtqXSA9IGVsZW1lbnRzW2ldW2pdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIHZhciBuID0gZWxlbWVudHMubGVuZ3RoXG4gICAgdGhpcy5lbGVtZW50cyA9IFtdXG4gICAgZm9yIChpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgdGhpcy5lbGVtZW50cy5wdXNoKFtlbGVtZW50c1tpXV0pXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH0sXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZWxlbWVudHMpIHtcbiAgcmV0dXJuIFN5bHZlc3Rlci5NYXRyaXguY3JlYXRlKGVsZW1lbnRzKS5pbnZlcnNlKCkuZWxlbWVudHNcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoZWxwZXJzXzEgPSByZXF1aXJlKFwiQGZpZ21hLXBsdWdpbi9oZWxwZXJzXCIpO1xuY29uc3QgY29udmVydENvbG9yXzEgPSByZXF1aXJlKFwiQGZpZ21hLXBsdWdpbi9oZWxwZXJzL2Rpc3QvaGVscGVycy9jb252ZXJ0Q29sb3JcIik7XG5jb25zdCB0b29sc18xID0gcmVxdWlyZShcIi4vdG9vbHNcIik7XG5maWdtYS5zaG93VUkoX19odG1sX18sIHtcbiAgICB3aWR0aDogNTAwLFxuICAgIGhlaWdodDogNTAwLFxufSk7XG5jb25zdCBsb2cgPSAobGFiZWwsIC4uLnJlc3QpID0+IHtcbiAgICBjb25zb2xlLmxvZygpO1xuICAgIGNvbnNvbGUubG9nKCdb5o+Q56S6XScsIGxhYmVsKTtcbiAgICBjb25zb2xlLmxvZyguLi5yZXN0KTtcbiAgICBjb25zb2xlLmxvZygpO1xufTtcbmNvbnN0IHJkbSA9ICgpID0+IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCAxNSk7XG5maWdtYS51aS5vbm1lc3NhZ2UgPSAoX2EpID0+IF9fYXdhaXRlcih2b2lkIDAsIFtfYV0sIHZvaWQgMCwgZnVuY3Rpb24qICh7IGlkLCB0eXBlLCBwYXlsb2FkID0ge30gfSkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbjtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHNlbGVjdGlvblswXTtcbiAgICAgICAgY29uc3QgW2ZpbGxdID0gbm9kZS5maWxscyB8fCBbXTtcbiAgICAgICAgaWYgKCFmaWxsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBjb2xvcnMgPSBmaWxsLmdyYWRpZW50U3RvcHNcbiAgICAgICAgICAgIC5tYXAoKG4pID0+ICgwLCBjb252ZXJ0Q29sb3JfMS5maWdtYVJHQlRvV2ViUkdCKShuLmNvbG9yKS5qb2luKCcsJykpXG4gICAgICAgICAgICAubWFwKChuKSA9PiBgcmdiYSgke259KWApO1xuICAgICAgICBjb25zdCByZWN0ID0ge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICB3aWR0aDogbm9kZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogbm9kZS5oZWlnaHQsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHsgc3RhcnQ6IHN0YXJ0UmF0aW8sIGVuZDogZW5kUmF0aW8gfSA9ICgwLCBoZWxwZXJzXzEuZXh0cmFjdExpbmVhckdyYWRpZW50UGFyYW1zRnJvbVRyYW5zZm9ybSkoMSwgMSwgZmlsbC5ncmFkaWVudFRyYW5zZm9ybSk7XG4gICAgICAgIC8vIGZpZ21h55qE5riQ5Y+Y5o6n5Yi254K5XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0ge1xuICAgICAgICAgICAgeDogc3RhcnRSYXRpb1swXSAqIG5vZGUud2lkdGgsIHk6IHN0YXJ0UmF0aW9bMV0gKiBub2RlLmhlaWdodFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBlbmQgPSB7XG4gICAgICAgICAgICB4OiBlbmRSYXRpb1swXSAqIG5vZGUud2lkdGgsIHk6IGVuZFJhdGlvWzFdICogbm9kZS5oZWlnaHRcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYW5nbGUgPSAoMCwgdG9vbHNfMS5nZXRBbmdsZUJldHdlZW4pKHN0YXJ0LCBlbmQpO1xuICAgICAgICAvLyBmaWdtYeeahOa4kOWPmOaOp+WItueCuVxuICAgICAgICBjb25zdCBmaWdtYUdyYWRpZW50TGluZSA9IHsgc3RhcnQsIGVuZCB9O1xuICAgICAgICBjb25zdCBncmFkaWVudFBvaW50cyA9ICgwLCB0b29sc18xLmdldExpbmVhckdyYWRpZW50UG9pbnRzKShyZWN0LCBhbmdsZSkuZmFydGhlc3RQb2ludHM7XG4gICAgICAgIC8vIHdlYueahOa4kOWPmOaOp+WItueCuVxuICAgICAgICBjb25zdCBncmFkaWVudExpbmUgPSAoMCwgdG9vbHNfMS5vcmRlclBvaW50cykoZmlnbWFHcmFkaWVudExpbmUsIGdyYWRpZW50UG9pbnRzKTtcbiAgICAgICAgbG9nKCfmuJDlj5jnur8nLCBncmFkaWVudExpbmUpO1xuICAgICAgICBjb25zdCBsaW5lID0gKDAsIHRvb2xzXzEuc3RpY2t5VG8pKGZpZ21hR3JhZGllbnRMaW5lLCBncmFkaWVudExpbmUpO1xuICAgICAgICBjb25zdCBvZmZzZXRzID0gKDAsIHRvb2xzXzEuZ2V0T2Zmc2V0KSh7XG4gICAgICAgICAgICBmaWdtYTogbGluZSxcbiAgICAgICAgICAgIHdlYjogZ3JhZGllbnRMaW5lXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB0b1BlcmNlbnQgPSAobikgPT4gKG4gKiAxMDApLnRvRml4ZWQoMikgKyAnJSc7XG4gICAgICAgIGNvbnN0IGJhY2tncm91bmRJbWFnZSA9IGBsaW5lYXItZ3JhZGllbnQoJHsoYW5nbGUgKyA5MCkudG9GaXhlZCgyKX1kZWcsICR7Y29sb3JzLm1hcCgoY29sb3IsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYCR7Y29sb3J9ICR7dG9QZXJjZW50KG9mZnNldHNbaW5kZXhdKX1gO1xuICAgICAgICAgICAgLy8gcmV0dXJuIGNvbG9yXG4gICAgICAgIH0pLmpvaW4oJywnKX0pYDtcbiAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdHlwZTogJ2NhbGxiYWNrJyxcbiAgICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgICBub2RlOiB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBub2RlLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IG5vZGUuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRPZmZzZXQgPSBleHBvcnRzLmdldFBlcnBlbmRpY3VsYXJQb2ludCA9IGV4cG9ydHMuTnVtYmVyVXRpbCA9IHZvaWQgMDtcbmV4cG9ydHMuZ2V0QW5nbGVCZXR3ZWVuID0gZ2V0QW5nbGVCZXR3ZWVuO1xuZXhwb3J0cy5nZXRMaW5lYXJHcmFkaWVudFBvaW50cyA9IGdldExpbmVhckdyYWRpZW50UG9pbnRzO1xuZXhwb3J0cy5zdGlja3lUbyA9IHN0aWNreVRvO1xuZXhwb3J0cy5vcmRlclBvaW50cyA9IG9yZGVyUG9pbnRzO1xuY29uc3QgbWF0aF8xID0gcmVxdWlyZShcIkBzN24vbWF0aFwiKTtcbmNsYXNzIE51bWJlclV0aWwge1xuICAgIHN0YXRpYyBpc0VxdWFsKHYxLCB2MiwgdG9sZXJhbmNlID0gTnVtYmVyVXRpbC5UT0xFUkFOQ0UpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKHYxIC0gdjIpIDwgdG9sZXJhbmNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDojrflj5bnm7jlj43mlbBcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0T3Bwb3NpdGVOdW1iZXIodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSAwID8gMCA6IC12YWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bCG5pyJ56ym5Y+355qEIFplcm8g6L2s5YyW5Li65peg56ym5Y+3XG4gICAgICpcbiAgICAgKiBPYmplY3QuaXMgdnMgPT09IDogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvemgtQ04vZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gICAgICovXG4gICAgc3RhdGljIHVuU2lnbmVkWmVybyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgPT09IDAgPyAwIDogdmFsdWU7XG4gICAgfVxufVxuZXhwb3J0cy5OdW1iZXJVdGlsID0gTnVtYmVyVXRpbDtcbk51bWJlclV0aWwuVE9MRVJBTkNFID0gMWUtNjtcbmZ1bmN0aW9uIGdldEFuZ2xlQmV0d2VlbihhLCBiKSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIoYi55IC0gYS55LCBiLnggLSBhLngpICogMTgwIC8gTWF0aC5QSTtcbn1cbi8qKlxuICog6K6h566XIHdlYiDnmoTnur/mgKfmuJDlj5jnmoTkuKTkuKrmjqfliLbngrlcbiAqICovXG5mdW5jdGlvbiBnZXRMaW5lYXJHcmFkaWVudFBvaW50cyhyZWN0LCBhbmdsZSkge1xuICAgIGNvbnN0IHJhZGlhbnMgPSAoYW5nbGUgKiBNYXRoLlBJKSAvIDE4MDtcbiAgICBjb25zdCBjZW50ZXIgPSB7IHg6IHJlY3QueCArIHJlY3Qud2lkdGggLyAyLCB5OiByZWN0LnkgKyByZWN0LmhlaWdodCAvIDIgfTtcbiAgICAvLyDojrflj5bnn6nlvaLlm5vkuKrpobbngrlcbiAgICBjb25zdCBwb2ludHMgPSBbXG4gICAgICAgIHsgeDogcmVjdC54LCB5OiByZWN0LnkgfSxcbiAgICAgICAgeyB4OiByZWN0LnggKyByZWN0LndpZHRoLCB5OiByZWN0LnkgfSxcbiAgICAgICAgeyB4OiByZWN0LnggKyByZWN0LndpZHRoLCB5OiByZWN0LnkgKyByZWN0LmhlaWdodCB9LFxuICAgICAgICB7IHg6IHJlY3QueCwgeTogcmVjdC55ICsgcmVjdC5oZWlnaHQgfSxcbiAgICBdO1xuICAgIC8vIOiuoeeul+avj+S4qumhtueCueWIsOS4reW/g+eCueeahOWeguebtOe6v+S4jiBsaW5lIOeahOS6pOeCuVxuICAgIGNvbnN0IGludGVyc2VjdGlvbnMgPSBwb2ludHMubWFwKHBvaW50ID0+IHtcbiAgICAgICAgY29uc3QgZHggPSBwb2ludC54IC0gY2VudGVyLng7XG4gICAgICAgIGNvbnN0IGR5ID0gcG9pbnQueSAtIGNlbnRlci55O1xuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IGR4ICogTWF0aC5jb3MocmFkaWFucykgKyBkeSAqIE1hdGguc2luKHJhZGlhbnMpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogY2VudGVyLnggKyBkaXN0YW5jZSAqIE1hdGguY29zKHJhZGlhbnMpLFxuICAgICAgICAgICAgeTogY2VudGVyLnkgKyBkaXN0YW5jZSAqIE1hdGguc2luKHJhZGlhbnMpLFxuICAgICAgICB9O1xuICAgIH0pO1xuICAgIC8vIOiuoeeul+avj+S4quS6pOeCueWIsOS4reW/g+eCueeahOi3neemu1xuICAgIGNvbnN0IGRpc3RhbmNlcyA9IGludGVyc2VjdGlvbnMubWFwKGludGVyc2VjdGlvbiA9PiB7XG4gICAgICAgIGNvbnN0IGR4ID0gaW50ZXJzZWN0aW9uLnggLSBjZW50ZXIueDtcbiAgICAgICAgY29uc3QgZHkgPSBpbnRlcnNlY3Rpb24ueSAtIGNlbnRlci55O1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICB9KTtcbiAgICAvLyDmib7liLDot53nprvkuK3lv4PngrnmnIDov5znmoTkuKTkuKrkuqTngrlcbiAgICBjb25zdCBzb3J0ZWRJbnRlcnNlY3Rpb25zID0gaW50ZXJzZWN0aW9uc1xuICAgICAgICAubWFwKChpbnRlcnNlY3Rpb24sIGluZGV4KSA9PiAoeyBpbnRlcnNlY3Rpb24sIGRpc3RhbmNlOiBkaXN0YW5jZXNbaW5kZXhdIH0pKVxuICAgICAgICAuc29ydCgoYSwgYikgPT4gYi5kaXN0YW5jZSAtIGEuZGlzdGFuY2UpO1xuICAgIGNvbnN0IGZhcnRoZXN0UG9pbnRzID0gW3NvcnRlZEludGVyc2VjdGlvbnNbMF0uaW50ZXJzZWN0aW9uLCBzb3J0ZWRJbnRlcnNlY3Rpb25zWzFdLmludGVyc2VjdGlvbl07XG4gICAgcmV0dXJuIHsgZmFydGhlc3RQb2ludHMgfTtcbn1cbi8qKlxuICog6K6h566X5LiA5Liq54K55YGa5Z6C57q/5Yiw5LiA5p2h57q/5q615LiK55qE5Lqk54K5XG4gKiAqL1xuY29uc3QgZ2V0UGVycGVuZGljdWxhclBvaW50ID0gKHBvaW50LCBsaW5lKSA9PiB7XG4gICAgY29uc3QgZHggPSBsaW5lLmVuZC54IC0gbGluZS5zdGFydC54O1xuICAgIGNvbnN0IGR5ID0gbGluZS5lbmQueSAtIGxpbmUuc3RhcnQueTtcbiAgICBjb25zdCBsZW5ndGhTcXVhcmVkID0gZHggKiBkeCArIGR5ICogZHk7XG4gICAgY29uc3QgdCA9ICgocG9pbnQueCAtIGxpbmUuc3RhcnQueCkgKiBkeCArIChwb2ludC55IC0gbGluZS5zdGFydC55KSAqIGR5KSAvIGxlbmd0aFNxdWFyZWQ7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogbGluZS5zdGFydC54ICsgdCAqIGR4LFxuICAgICAgICB5OiBsaW5lLnN0YXJ0LnkgKyB0ICogZHksXG4gICAgfTtcbn07XG5leHBvcnRzLmdldFBlcnBlbmRpY3VsYXJQb2ludCA9IGdldFBlcnBlbmRpY3VsYXJQb2ludDtcbi8qKlxuICog5bCG57q/5q61MeeymOmZhOWIsOe6v+autTLkuIpcbiAqICovXG5mdW5jdGlvbiBzdGlja3lUbyhsaW5lMSwgbGluZTIpIHtcbiAgICBjb25zdCBwZXJwZW5kaWN1bGFyUG9pbnQxID0gKDAsIGV4cG9ydHMuZ2V0UGVycGVuZGljdWxhclBvaW50KShsaW5lMS5zdGFydCwgbGluZTIpO1xuICAgIGNvbnN0IHBlcnBlbmRpY3VsYXJQb2ludDIgPSAoMCwgZXhwb3J0cy5nZXRQZXJwZW5kaWN1bGFyUG9pbnQpKGxpbmUxLmVuZCwgbGluZTIpO1xuICAgIHJldHVybiB7IHN0YXJ0OiBwZXJwZW5kaWN1bGFyUG9pbnQxLCBlbmQ6IHBlcnBlbmRpY3VsYXJQb2ludDIgfTtcbn1cbi8qKlxuICog5bCG54K55oyJ54Wn57q/5q6155qE6aG65bqP5o6S5bqPXG4gKiDorr7mnInkuIDkuKrnur/mrrUge3N0YXJ0LCBlbmR9IOWSjOS4pOS4queCuSBwb2ludHNbMF0sIHBvaW50c1sxXSwg6YCa6L+H5q+U6L6D57q/5q6155qE5pa55ZCR5ZKM5Lik5Liq54K555qE5pa55ZCR77yM56Gu5a6a5Lik5Liq54K555qE6aG65bqPXG4gKiAqL1xuZnVuY3Rpb24gb3JkZXJQb2ludHMobGluZSwgcG9pbnRzKSB7XG4gICAgY29uc3QgZGlyZWN0ID0gbmV3IG1hdGhfMS5WZWN0b3IyKGxpbmUuc3RhcnQueCwgbGluZS5zdGFydC55KS5zdWIobmV3IG1hdGhfMS5WZWN0b3IyKGxpbmUuZW5kLngsIGxpbmUuZW5kLnkpKS5ub3JtYWxpemUoKTtcbiAgICBjb25zdCB2ZWMxID0gbmV3IG1hdGhfMS5WZWN0b3IyKHBvaW50c1swXS54LCBwb2ludHNbMF0ueSk7XG4gICAgY29uc3QgdmVjMiA9IG5ldyBtYXRoXzEuVmVjdG9yMihwb2ludHNbMV0ueCwgcG9pbnRzWzFdLnkpO1xuICAgIGNvbnN0IGRpcmVjdDEgPSB2ZWMxLnN1Yih2ZWMyKS5ub3JtYWxpemUoKTtcbiAgICBjb25zdCBkaXJlY3QyID0gdmVjMi5zdWIodmVjMSkubm9ybWFsaXplKCk7XG4gICAgY29uc29sZS5sb2coJ+aOkuW6j3dlYueahOa4kOWPmOaOp+WItueCuScsIGRpcmVjdC5hbmdsZSwgZGlyZWN0MS5hbmdsZSwgZGlyZWN0Mi5hbmdsZSk7XG4gICAgLy8gZXF1YWxzIOayoeacieWunueOsOWuveWuueW6pu+8jOaUueS4uuiuoeeul+inkuW6puW3rlxuICAgIC8vIGlmIChkaXJlY3QuZXF1YWxzKGRpcmVjdDEpKSB7XG4gICAgaWYgKE51bWJlclV0aWwuaXNFcXVhbChkaXJlY3QuYW5nbGUsIGRpcmVjdDEuYW5nbGUpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfpobrluo/mraPnoa7vvIzkv53mjIHkuI3lj5jov5Tlm54nLCBwb2ludHNbMF0sIHBvaW50c1sxXSk7XG4gICAgICAgIHJldHVybiB7IHN0YXJ0OiBwb2ludHNbMF0sIGVuZDogcG9pbnRzWzFdIH07XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCfpobrluo/plJnor6/vvIzph43mlrDmjpLluo8nLCBwb2ludHNbMV0sIHBvaW50c1swXSk7XG4gICAgcmV0dXJuIHsgc3RhcnQ6IHBvaW50c1sxXSwgZW5kOiBwb2ludHNbMF0gfTtcbn1cbmZ1bmN0aW9uIGNhbGN1bGF0ZVNpZ25lZERpc3RhbmNlKGxpbmUsIHBvaW50KSB7XG4gICAgY29uc3Qgc3RhcnQgPSBuZXcgbWF0aF8xLlZlY3RvcjIobGluZS5zdGFydC54LCBsaW5lLnN0YXJ0LnkpO1xuICAgIGNvbnN0IGVuZCA9IG5ldyBtYXRoXzEuVmVjdG9yMihsaW5lLmVuZC54LCBsaW5lLmVuZC55KTtcbiAgICBjb25zdCB0YXJnZXQgPSBuZXcgbWF0aF8xLlZlY3RvcjIocG9pbnQueCwgcG9pbnQueSk7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gZW5kLnN1YihzdGFydCkubm9ybWFsaXplKCk7XG4gICAgY29uc3QgZGlmZmVyZW5jZSA9IHRhcmdldC5zdWIoc3RhcnQpO1xuICAgIHJldHVybiBkaWZmZXJlbmNlLmRvdChkaXJlY3Rpb24pO1xufVxuY29uc3QgZ2V0T2Zmc2V0ID0gKGNvbnRyb2xzKSA9PiB7XG4gICAgY29uc3QgeyBmaWdtYSwgd2ViIH0gPSBjb250cm9scztcbiAgICBjb25zb2xlLmxvZyhjb250cm9scyk7XG4gICAgY29uc3Qgc3RhcnQgPSBuZXcgbWF0aF8xLlZlY3RvcjIod2ViLnN0YXJ0LngsIHdlYi5zdGFydC55KTtcbiAgICBjb25zdCBlbmQgPSBuZXcgbWF0aF8xLlZlY3RvcjIod2ViLmVuZC54LCB3ZWIuZW5kLnkpO1xuICAgIGNvbnN0IGxpbmUgPSBzdGFydC5zdWIoZW5kKTtcbiAgICBjb25zdCBsZW5ndGggPSBsaW5lLmxlbmd0aDtcbiAgICByZXR1cm4gW1xuICAgICAgICBjYWxjdWxhdGVTaWduZWREaXN0YW5jZSh3ZWIsIGZpZ21hLnN0YXJ0KSAvIGxlbmd0aCxcbiAgICAgICAgY2FsY3VsYXRlU2lnbmVkRGlzdGFuY2Uod2ViLCBmaWdtYS5lbmQpIC8gbGVuZ3RoLFxuICAgIF07XG59O1xuZXhwb3J0cy5nZXRPZmZzZXQgPSBnZXRPZmZzZXQ7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==