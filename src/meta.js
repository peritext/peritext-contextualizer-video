
export default {
  id: 'video',
  type: 'peritext-contextualizer',
  name: 'Video contextualizer',
  acceptedResourceTypes: [
  {
    type: 'video',
  },
  ],
  profile: {
    block: {
      mutable: false,
      options: {
        heavyPlayer: {
          type: 'boolean',
        },
        displayControls: {
          type: 'boolean'
        },
        loop: {
          type: 'boolean'
        },
        muted: {
          type: 'boolean'
        },
        startTime: {
          type: 'number',
          uiType: 'time'
        },
        endTime: {
          type: 'number',
          uiType: 'time'
        }
      },
      assetPickingRules: {
        element: {
          screened: [ 'mediaUrl', ],
          paged: [ 'cmybImageAssetId', 'rgbImageAssetId' ]
        }
      }
    },
    inline: {
      mutable: false,
      options: {
        loop: {
          type: 'boolean'
        },
        startTime: {
          type: 'number',
          uiType: 'time'
        },
        endTime: {
          type: 'number',
          uiType: 'time'
        }
      },
      assetPickingRules: {
        element: {
          screened: [ 'mediaUrl', ],
          paged: [ 'cmybImageAssetId', 'rgbImageAssetId' ]
        }
      }
    }
  }
};
