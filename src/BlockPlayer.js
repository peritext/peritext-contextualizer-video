import React, {useRef} from 'react';

const isBrowser = new Function( 'try {return this===window;}catch(e){ return false;}' );/* eslint no-new-func : 0 */

const inBrowser = isBrowser();

const Player = inBrowser ? require( 'react-player' ).default : undefined;


const BlockPlayer = ({
  url,
  light = false,
  controls,
  autoPlay,
  loop,
  muted,
  startTime,
  endTime,
  cover,
}) => {
  const playerRef  = useRef(null)
  const handlePlayProgress = ({playedSeconds}) => {
    if ((startTime && playedSeconds < startTime)
      ||
      ( endTime && playedSeconds > endTime)
      ) {
      playerRef.current.seekTo(startTime, 'seconds');
    }
  };
  return (
    <Player
      url={ url }
      light={ light ? cover || true : undefined }
      controls={ controls }
      ref={playerRef}
      autoPlay={ autoPlay }
      loop={ loop }
      muted={ muted }
      volume={ muted ? 0 : null }
      onProgress={handlePlayProgress}
    />
  )
}

export default BlockPlayer;