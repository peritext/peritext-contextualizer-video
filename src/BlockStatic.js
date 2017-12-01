import React from 'react';
import PropTypes from 'prop-types';

const BlockStatic = ({
  resource,
  contextualizer,
  contextualization
}, {
  datasets = {}
}) => {
  const thumbnail = datasets[resource.data.thumbnailDataset];
  const videoUrl = resource.metadata.url;

  return (<figure className="peritext-contextualization peritext-contextualization-block peritext-contextualization-codex peritext-contextualizer-video">
    <a href={videoUrl}>
      {thumbnail ? 
        <img className="resource-thumbnail" src={thumbnail.uri} />
        : <div className="thumbnail-placeholder" />
      }
    </a>
  </figure>);
}

BlockStatic.contextTypes = {
  datasets: PropTypes.object,
}


// import vimeoRegex from 'vimeo-regex';

// const isBrowser=new Function("try {return this===window;}catch(e){ return false;}");
// const inBrowser = isBrowser();

// let XMLHttpRequest;

// if (!inBrowser) {
//   XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
// }

// const youRe = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/gi;

// function getVimeoThumbnailUrl(videoUrl) {
//   const videoId = vimeoRegex().exec(videoUrl)[4];
//   const endpoint = "http://vimeo.com/api/v2/video/" + videoId + ".json?callback=showThumb";
//   const request = new XMLHttpRequest();
//   request.open('GET', endpoint, false);  // `false` makes the request synchronous
//   request.send(null);
//   const response = request.responseText;
//   if (request.status === 200) {
//     const cut = response.substring(15, response.length - 2);
//     try{
//       const resp = JSON.parse(cut);
//       return resp.thumbnail_large;
//     } catch(e) {
//       return undefined;
//     }
//   } else {
//     return undefined;
//   }
// }


// export default ({
//   resource,
//   contextualizer,
//   contextualization
// }) => {
//   const videoUrl = resource.metadata.videoUrl || resource.metadata.mediaUrl;
//   let thumbnailUrl;
//   const isYoutube = videoUrl.match(youRe);
//   if (resource.data.thumbnail) {
//     thumbnailUrl = resource.data.thumbnail;
//   } else {
//     let videoId;
//     if (isYoutube) {
//       let match;
//       while ((match = youRe.exec(videoUrl)) !== null) {
//         videoId = match[1];
//       }
//       thumbnailUrl= `http://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
//     } else if (vimeoRegex().test(videoUrl)) {
//       thumbnailUrl = inBrowser ? '' : getVimeoThumbnailUrl(videoUrl);
//     }
//   }

//   return (<figure className="peritext-contextualization peritext-contextualization-block peritext-contextualization-codex peritext-contextualizer-video">
//     <a href={videoUrl}>
//       {thumbnailUrl ? 
//         <img className="resource-thumbnail" src={thumbnailUrl} />
//         : <div className="thumbnail-placeholder" />
//       }
//     </a>
//   </figure>);
// }