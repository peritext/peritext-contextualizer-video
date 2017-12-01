import React from 'react';
const isBrowser=new Function("try {return this===window;}catch(e){ return false;}");

const { Media, Player, controls } = isBrowser() ? require('react-media-player') : {}

export default ({
  resource,
}) => {
  if (Media) {
    const url = resource.data.url;
    return (
      <figure 
        className="peritext-contextualization peritext-contextualization-block peritext-contextualization-web peritext-contextualizer-video"
      >
        <Media>
          <Player src={url} />
        </Media>
      </figure>
    )
  } else return null;
};