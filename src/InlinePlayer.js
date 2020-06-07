
import React, {useState, useRef} from 'react';

const isBrowser = new Function( 'try {return this===window;}catch(e){ return false;}' );/* eslint no-new-func : 0 */

const inBrowser = isBrowser();

const Player = inBrowser ? require( 'react-player' ).default : undefined;


const InlinePlayer = ({
  url,
  loop,
  startTime,
  endTime,
}) => {
  const [isPlaying, setPlaying] = useState(false);
  const [isBuffering, setBuffering] = useState(false);
  const playerRef  = useRef(null)
  const handlePlayProgress = ({playedSeconds}) => {
    if (isBuffering) {
      setBuffering(false);
    }
    if (startTime && playedSeconds < startTime ) {
      playerRef.current.seekTo(startTime, 'seconds');
    }
    else if ( endTime && playedSeconds > endTime) {
      setPlaying(false)
      playerRef.current.seekTo(startTime, 'seconds');
    }
  };
  const handleBuffer = () => {
    setBuffering(true);
  }
  const handleBufferEnd = () => {
    setBuffering(false);
  }
  const handleEnded = () => {
    setBuffering(false);
  }
  const handleClick = e => {
    e.stopPropagation();
    if (!isPlaying) {
      setBuffering(true);
    }
    setPlaying(!isPlaying);
  }
  let symbol = '▶';
  if (isPlaying) {
    if (isBuffering) {
      symbol = '●';
    } else {
      symbol = '■';
    }
  }

  return [
    <span key={1} style={{display: 'none'}}>
      <Player
        url={ url }
        playing={isPlaying}
        onProgress={ handlePlayProgress }
        onBuffer={handleBuffer}
        onBufferEnd={handleBufferEnd}
        onEnded={handleEnded}
        loop={ loop }
        ref={playerRef}
      />
    </span>,
    <button className={`inline-video-player ${isBuffering && isPlaying ? 'is-buffering': ''}`} onClick={handleClick} key={2}>
      { symbol }
    </button>
  ]
}

export default InlinePlayer;