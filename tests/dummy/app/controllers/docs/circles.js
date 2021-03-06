import DocsController from '../docs';
import CommonMapData from '../../mixins/common-map-data';
import { computed } from '@ember/object';

export default DocsController.extend(CommonMapData, {
  fillColor: 'green',

  radius: computed({
    get: () => 1000,
    set: (_k, v) => parseInt(v)
  })
});
