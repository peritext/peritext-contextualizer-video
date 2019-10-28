
import React from 'react';

import meta from './meta';
import { chooseAppropriateAsset } from 'peritext-utils';

import InlinePlayer from './InlinePlayer';

const isBrowser = new Function( 'try {return this===window;}catch(e){ return false;}' );/* eslint no-new-func : 0 */

const inBrowser = isBrowser();

const Inline = ( {
  resource,
  contextualizer = {},
  contextualization = {},
  renderingMode,
  assets = {}
}, {
} ) => {
  const appropriateAsset = chooseAppropriateAsset( resource, meta.profile.inline.assetPickingRules.element[renderingMode], assets );
  let field;
  if ( appropriateAsset ) {
    field = appropriateAsset.resourceDataField;
  }
 else {
    return null;
  }

  let assetUri;
  const asset = appropriateAsset.asset;

  const renderContent = () => {
    switch ( field ) {
      case 'mediaUrl':
        if ( field === 'mediaUrl' ) {
          assetUri = resource.data.mediaUrl;
        }
        else {
          assetUri = asset.data;
        }
        if ( inBrowser ) {
          const {
            parameters = {},
          } = contextualizer;
          const {
            loop = false,
            startTime,
            endTime,
          } = parameters;
          return (
              <InlinePlayer
                url={ assetUri }
                loop={ loop }
                startTime={startTime}
                endTime={endTime}
              />
          );
        }
        else if ( assetUri ) {
          return (
            <video controls>
              <source
                src={ assetUri }
                type={ `video/${assetUri.split( '.' ).pop()}` }
              />
            </video>
          );
        }
        else return null;

        default:
          console.log({appropriateAsset})
          if ( appropriateAsset ) {
            assetUri = appropriateAsset.asset.data;
            return (
              <span className="inline-images-container">
                <img src={ assetUri } />
              </span>
            );
          }
        return null;
      }
    };
    return (
      <span
        id={ contextualization.id }
        className={ `peritext-contextualization inline video rendering-mode-${renderingMode} asset-field-${field}` }
      >
        {renderContent()}
      </span>
    );
  // }
};
export default Inline;
