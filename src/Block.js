
import React from 'react';
import PropTypes from 'prop-types';

import meta from './meta';
import { chooseAppropriateAsset } from 'peritext-utils';

const isBrowser = new Function( 'try {return this===window;}catch(e){ return false;}' );/* eslint no-new-func : 0 */

const inBrowser = isBrowser();

const Player = inBrowser ? require( 'react-player' ).default : undefined;

const Block = ( {
  resource,
  contextualizer = {},
  contextualization = {},
  renderingMode
}, {
  productionAssets,
} ) => {
  const appropriateAsset = chooseAppropriateAsset( resource, meta.profile.block.assetPickingRules.element[renderingMode], productionAssets );
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
            heavyPlayer = true,
            displayControls = true,
            autoPlay = false,
            loop = false,
            muted = false

          } = parameters;
          return (
            <div className={ 'media' }>

              <Player
                url={ assetUri }
                light={ !heavyPlayer }
                controls={ displayControls }
                autoPlay={ autoPlay }
                loop={ loop }
                muted={ muted }
                volume={ muted ? 0 : null }
              />
            </div>
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
          if ( appropriateAsset ) {
            assetUri = appropriateAsset.asset.data;
            return (
              <img src={ assetUri } />
            );
          }
        return null;
      }
    };
    return (
      <div
        id={ contextualization.id }
        className={ `peritext-contextualization block video rendering-mode-${renderingMode} asset-field-${field}` }
      >
        {renderContent()}
      </div>
    );
  // }
};

Block.contextTypes = {
  productionAssets: PropTypes.object,
};

export default Block;
