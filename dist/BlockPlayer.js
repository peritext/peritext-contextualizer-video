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

const BlockPlayer = ({
  url,
  light = false,
  displayControls,
  autoPlay,
  loop,
  muted,
  startTime,
  endTime
}) => {
  const playerRef = (0, _react.useRef)(null);

  const handlePlayProgress = ({
    playedSeconds
  }) => {
    if (startTime && playedSeconds < startTime || endTime && playedSeconds > endTime) {
      playerRef.current.seekTo(startTime, 'seconds');
    }
  };

  return _react.default.createElement(Player, {
    url: url,
    light: light,
    controls: displayControls,
    ref: playerRef,
    autoPlay: autoPlay,
    loop: loop,
    muted: muted,
    volume: muted ? 0 : null,
    onProgress: handlePlayProgress
  });
};

var _default = BlockPlayer;
exports.default = _default;