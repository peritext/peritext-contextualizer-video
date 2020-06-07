"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const isBrowser = new Function('try {return this===window;}catch(e){ return false;}');
/* eslint no-new-func : 0 */

const inBrowser = isBrowser();
const Player = inBrowser ? require('react-player').default : undefined;

const InlinePlayer = ({
  url,
  loop,
  startTime,
  endTime
}) => {
  const [isPlaying, setPlaying] = (0, _react.useState)(false);
  const [isBuffering, setBuffering] = (0, _react.useState)(false);
  const playerRef = (0, _react.useRef)(null);

  const handlePlayProgress = ({
    playedSeconds
  }) => {
    if (isBuffering) {
      setBuffering(false);
    }

    if (startTime && playedSeconds < startTime) {
      playerRef.current.seekTo(startTime, 'seconds');
    } else if (endTime && playedSeconds > endTime) {
      setPlaying(false);
      playerRef.current.seekTo(startTime, 'seconds');
    }
  };

  const handleBuffer = () => {
    setBuffering(true);
  };

  const handleBufferEnd = () => {
    setBuffering(false);
  };

  const handleEnded = () => {
    setBuffering(false);
  };

  const handleClick = e => {
    e.stopPropagation();

    if (!isPlaying) {
      setBuffering(true);
    }

    setPlaying(!isPlaying);
  };

  let symbol = '▶';

  if (isPlaying) {
    if (isBuffering) {
      symbol = '●';
    } else {
      symbol = '■';
    }
  }

  return [_react.default.createElement("span", {
    key: 1,
    style: {
      display: 'none'
    }
  }, _react.default.createElement(Player, {
    url: url,
    playing: isPlaying,
    onProgress: handlePlayProgress,
    onBuffer: handleBuffer,
    onBufferEnd: handleBufferEnd,
    onEnded: handleEnded,
    loop: loop,
    ref: playerRef
  })), _react.default.createElement("button", {
    className: `inline-video-player ${isBuffering && isPlaying ? 'is-buffering' : ''}`,
    onClick: handleClick,
    key: 2
  }, symbol)];
};

var _default = InlinePlayer;
exports.default = _default;