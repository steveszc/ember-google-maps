import Component from '@ember/component';
import layout from '../templates/components/google-docs';
import { computed, get } from '@ember/object';
import { capitalize } from '@ember/string';

const GoogleDocs =  Component.extend({
  layout,
  tagName: 'a',
  attributeBindings: ['href', 'rel', 'target'],

  type: 'reference',
  referenceUrl: 'https://developers.google.com/maps/documentation/javascript/reference#',
  guideUrl: 'https://developers.google.com/maps/documentation/javascript/',
  rel: 'noopener',
  target: '_blank',

  baseUrl: computed('type', function() {
    return (this.type === 'reference') ? this.referenceUrl : this.guideUrl;
  }),

  displayType: computed('type', function() {
    return capitalize(this.type);
  }),

  href: computed(function() {
    return get(this, 'baseUrl') + get(this, 'section');
  })
});

GoogleDocs.reopenClass({
  positionalParams: ['section']
});

export default GoogleDocs;
