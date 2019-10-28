
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
  const playerRef  = useRef(null)
  const handlePlayProgress = ({playedSeconds}) => {
    if (startTime && playedSeconds < startTime ) {
      playerRef.current.seekTo(startTime, 'seconds');
    }
    else if ( endTime && playedSeconds > endTime) {
      setPlaying(false)
      playerRef.current.seekTo(startTime, 'seconds');
    }
  };
  const handleClick = e => {
    e.stopPropagation();
    setPlaying(!isPlaying);
  }
  return [
    <span key={1} style={{display: 'none'}}>
      <Player
        url={ url }
        playing={isPlaying}
        onProgress={ handlePlayProgress }
        loop={ loop }
        ref={playerRef}
      />
    </span>,
    <button onClick={handleClick} key={2}>
      { isPlaying ? '■': '▶'}
    </button>
  ]
}

export default InlinePlayer;