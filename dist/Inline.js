"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _meta = _interopRequireDefault(require("./meta"));

var _peritextUtils = require("peritext-utils");

var _InlinePlayer = _interopRequireDefault(require("./InlinePlayer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isBrowser = new Function('try {return this===window;}catch(e){ return false;}');
/* eslint no-new-func : 0 */

const inBrowser = isBrowser();

const Inline = ({
  resource,
  contextualizer = {},
  contextualization = {},
  renderingMode,
  assets = {}
}, {}) => {
  const appropriateAsset = (0, _peritextUtils.chooseAppropriateAsset)(resource, _meta.default.profile.inline.assetPickingRules.element[renderingMode], assets);
  let field;

  if (appropriateAsset) {
    field = appropriateAsset.resourceDataField;
  } else {
    return null;
  }

  let assetUri;
  const asset = appropriateAsset.asset;

  const renderContent = () => {
    switch (field) {
      case 'mediaUrl':
        if (field === 'mediaUrl') {
          assetUri = resource.data.mediaUrl;
        } else {
          assetUri = asset.data;
        }

        if (inBrowser) {
          const {
            parameters = {}
          } = contextualizer;
          const {
            loop = false,
            startTime,
            endTime
          } = parameters;
          return _react.default.createElement(_InlinePlayer.default, {
            url: assetUri,
            loop: loop,
            startTime: startTime,
            endTime: endTime
          });
        } else if (assetUri) {
          return _react.default.createElement("video", {
            controls: true
          }, _react.default.createElement("source", {
            src: assetUri,
            type: `video/${assetUri.split('.').pop()}`
          }));
        } else return null;

      default:
        console.log({
          appropriateAsset
        });

        if (appropriateAsset) {
          assetUri = appropriateAsset.asset.data;
          return _react.default.createElement("span", {
            className: "inline-images-container"
          }, _react.default.createElement("img", {
            src: assetUri
          }));
        }

        return null;
    }
  };

  return _react.default.createElement("span", {
    id: contextualization.id,
    className: `peritext-contextualization inline video rendering-mode-${renderingMode} asset-field-${field}`
  }, renderContent()); // }
};

var _default = Inline;
exports.default = _default;