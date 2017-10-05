'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  type: 'peritext-contextualizer',
  id: 'video',
  name: 'Online video',
  coverage: {
    inlineStatic: true,
    blockStatic: false,
    inlineDynamic: false,
    blockDynamic: true
  },
  model: {
    acceptedResourceTypes: [{ type: 'dicto' }, { type: 'video' }],
    block: {
      options: []
    }
  }
};