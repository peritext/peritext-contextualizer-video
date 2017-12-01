'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");

var _ref = isBrowser() ? require('react-media-player') : {},
    Media = _ref.Media,
    Player = _ref.Player,
    controls = _ref.controls;

exports.default = function (_ref2) {
  var resource = _ref2.resource;

  if (Media) {
    var url = resource.data.url;
    return _react2.default.createElement(
      'figure',
      {
        className: 'peritext-contextualization peritext-contextualization-block peritext-contextualization-web peritext-contextualizer-video'
      },
      _react2.default.createElement(
        Media,
        null,
        _react2.default.createElement(Player, { src: url })
      )
    );
  } else return null;
};