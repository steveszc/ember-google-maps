import Controller from '@ember/controller';
import CommonMapData from '../../mixins/common-map-data';
import { inject as service } from '@ember/service';
import { computed, get, getProperties, set } from '@ember/object';
import { reads } from '@ember/object/computed';
import { throttle } from '@ember/runloop';

export default Controller.extend(CommonMapData, {
  googleMapsApi: service(),

  google: reads('googleMapsApi.google'),

  boundedLondonLocations: computed('mapBounds', function() {
    let londonLocations = get(this, 'londonLocations');
    return londonLocations.filter((location) => {
      let mapBounds = get(this, 'mapBounds');
      return mapBounds && get(this, 'mapBounds').contains(new google.maps.LatLng(getProperties(location, 'lat', 'lng')));
    });
  }),

  _saveBounds(map) {
    set(this, 'mapBounds', map.getBounds());
  },

  actions: {
    saveBounds({ map }) {
      throttle(this, this._saveBounds, map, 100);
    },

    scrollToListing(listing) {
      const id = 'rental-' + listing.id;
      let el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
});
