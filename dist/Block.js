"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _meta = _interopRequireDefault(require("./meta"));

var _peritextUtils = require("peritext-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isBrowser = new Function('try {return this===window;}catch(e){ return false;}');
/* eslint no-new-func : 0 */

const inBrowser = isBrowser();
const Player = inBrowser ? require('react-player').default : undefined;

const Block = ({
  resource,
  contextualizer = {},
  contextualization = {},
  renderingMode
}, {
  productionAssets
}) => {
  const appropriateAsset = (0, _peritextUtils.chooseAppropriateAsset)(resource, _meta.default.profile.block.assetPickingRules.element[renderingMode], productionAssets);
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
            heavyPlayer = true,
            displayControls = true,
            autoPlay = false,
            loop = false,
            muted = false
          } = parameters;
          return _react.default.createElement("div", {
            className: 'media'
          }, _react.default.createElement(Player, {
            url: assetUri,
            light: !heavyPlayer,
            controls: displayControls,
            autoPlay: autoPlay,
            loop: loop,
            muted: muted,
            volume: muted ? 0 : null
          }));
        } else if (assetUri) {
          return _react.default.createElement("video", {
            controls: true
          }, _react.default.createElement("source", {
            src: assetUri,
            type: `video/${assetUri.split('.').pop()}`
          }));
        } else return null;

      default:
        if (appropriateAsset) {
          assetUri = appropriateAsset.asset.data;
          return _react.default.createElement("img", {
            src: assetUri
          });
        }

        return null;
    }
  };

  return _react.default.createElement("div", {
    id: contextualization.id,
    className: `peritext-contextualization block video rendering-mode-${renderingMode} asset-field-${field}`
  }, renderContent()); // }
};

Block.contextTypes = {
  productionAssets: _propTypes.default.object
};
var _default = Block;
exports.default = _default;