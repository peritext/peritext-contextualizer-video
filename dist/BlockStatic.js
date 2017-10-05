'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _vimeoRegex = require('vimeo-regex');

var _vimeoRegex2 = _interopRequireDefault(_vimeoRegex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
var inBrowser = isBrowser();

var XMLHttpRequest = void 0;

if (!inBrowser) {
  XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
}

var youRe = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/gi;

function getVimeoThumbnailUrl(videoUrl) {
  var videoId = (0, _vimeoRegex2.default)().exec(videoUrl)[4];
  var endpoint = "http://vimeo.com/api/v2/video/" + videoId + ".json?callback=showThumb";
  var request = new XMLHttpRequest();
  request.open('GET', endpoint, false); // `false` makes the request synchronous
  request.send(null);
  var response = request.responseText;
  if (request.status === 200) {
    var cut = response.substring(15, response.length - 2);
    try {
      var resp = JSON.parse(cut);
      return resp.thumbnail_large;
    } catch (e) {
      return undefined;
    }
  } else {
    return undefined;
  }
}

exports.default = function (_ref) {
  var resource = _ref.resource,
      contextualizer = _ref.contextualizer,
      contextualization = _ref.contextualization;

  var videoUrl = resource.metadata.videoUrl || resource.metadata.mediaUrl;
  var thumbnailUrl = void 0;
  var isYoutube = videoUrl.match(youRe);
  if (resource.data.thumbnail) {
    thumbnailUrl = resource.data.thumbnail;
  } else {
    var videoId = void 0;
    if (isYoutube) {
      var match = void 0;
      while ((match = youRe.exec(videoUrl)) !== null) {
        videoId = match[1];
      }
      thumbnailUrl = 'http://img.youtube.com/vi/' + videoId + '/hqdefault.jpg';
    } else if ((0, _vimeoRegex2.default)().test(videoUrl)) {
      thumbnailUrl = inBrowser ? '' : getVimeoThumbnailUrl(videoUrl);
    }
  }

  return _react2.default.createElement(
    'figure',
    { className: 'peritext-contextualization peritext-contextualization-block peritext-contextualization-codex peritext-contextualizer-video' },
    _react2.default.createElement(
      'a',
      { href: videoUrl },
      thumbnailUrl ? _react2.default.createElement('img', { className: 'resource-thumbnail', src: thumbnailUrl }) : _react2.default.createElement('div', { className: 'thumbnail-placeholder' })
    )
  );
};