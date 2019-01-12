"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  id: 'video',
  type: 'peritext-contextualizer',
  name: 'Video contextualizer',
  acceptedResourceTypes: [{
    type: 'video'
  }],
  profile: {
    block: {
      mutable: false,
      options: {
        heavyPlayer: {
          type: 'boolean'
        },
        displayControls: {
          type: 'boolean'
        },
        loop: {
          type: 'boolean'
        },
        muted: {
          type: 'boolean'
        }
      },
      assetPickingRules: {
        element: {
          screened: ['mediaUrl'],
          paged: ['cmybImageAssetId', 'rgbImageAssetId']
        }
      }
    }
  }
};
exports.default = _default;