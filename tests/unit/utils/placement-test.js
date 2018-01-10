import { module, test } from 'qunit';
import jQuery from 'jquery';
import {
  determinePlacement,
  placementCoords,
  placementBoundary,
  placementToString,
  stringToPlacement,
  hasPlacement
} from '@zestia/ember-async-tooltips/utils/placement';

let $element, $reference, $fixture;

const center    = { N: false, E: false, S: false, W: false };
const north     = { N: true,  E: false, S: false, W: false };
const northEast = { N: true,  E: true,  S: false, W: false };
const east      = { N: false, E: true,  S: false, W: false };
const southEast = { N: false, E: true,  S: true,  W: false };
const south     = { N: false, E: false, S: true,  W: false };
const southWest = { N: false, E: false, S: true,  W: true };
const west      = { N: false, E: false, S: false, W: true };
const northWest = { N: true,  E: false, S: false, W: true };


module('placement utils', {
  beforeEach() {
    $fixture = jQuery('<div />', {
      id: 'placement-fixture',
      css: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }
    });

    $element = jQuery('<div />', {
      id: 'element',
      css: {
        width: '10px',
        height: '20px',
        margin: '1px',
        padding: '2px',
        position: 'fixed',
        background: 'red'
      }
    });

    $reference = jQuery('<div />', {
      id: 'reference',
      css: {
        width: '30px',
        height: '40px',
        margin: '3px',
        padding: '4px',
        position: 'fixed',
        top: '100px',
        left: '100px',
        background: 'blue'
      }
    });

    jQuery('body').append($fixture);
    $fixture.append($reference);
    $fixture.append($element);
  },
  afterEach() {
    $element.remove();
    $reference.remove();
    $fixture.remove();
  }
});


test('#placementCoords', function(assert) {
  assert.expect(8);

  assert.deepEqual(placementCoords($element, $reference, 'N'), [115, 79]);
  assert.deepEqual(placementCoords($element, $reference, 'NE'), [141, 79]);
  assert.deepEqual(placementCoords($element, $reference, 'E'), [141, 115]);
  assert.deepEqual(placementCoords($element, $reference, 'SE'), [141, 151]);
  assert.deepEqual(placementCoords($element, $reference, 'S'), [115, 151]);
  assert.deepEqual(placementCoords($element, $reference, 'SW'), [89, 151]);
  assert.deepEqual(placementCoords($element, $reference, 'W'), [89, 115]);
  assert.deepEqual(placementCoords($element, $reference, 'NW'), [89, 79]);
});


test('#placementToString', function(assert) {
  assert.expect(8);

  assert.equal(placementToString(north), 'N');
  assert.equal(placementToString(northEast), 'NE');
  assert.equal(placementToString(east), 'E');
  assert.equal(placementToString(southEast), 'SE');
  assert.equal(placementToString(south), 'S');
  assert.equal(placementToString(southWest), 'SW');
  assert.equal(placementToString(west), 'W');
  assert.equal(placementToString(northWest), 'NW');
});


test('#stringToPlacement', function(assert) {
  assert.expect(8);

  assert.deepEqual(stringToPlacement('N'), north);
  assert.deepEqual(stringToPlacement('NE'), northEast);
  assert.deepEqual(stringToPlacement('E'), east);
  assert.deepEqual(stringToPlacement('SE'), southEast);
  assert.deepEqual(stringToPlacement('S'), south);
  assert.deepEqual(stringToPlacement('SW'), southWest);
  assert.deepEqual(stringToPlacement('W'), west);
  assert.deepEqual(stringToPlacement('NW'), northWest);
});


test('#hasPlacement', function(assert) {
  assert.expect(10);

  assert.strictEqual(hasPlacement(north), true);
  assert.strictEqual(hasPlacement(northEast), true);
  assert.strictEqual(hasPlacement(east), true);
  assert.strictEqual(hasPlacement(southEast), true);
  assert.strictEqual(hasPlacement(south), true);
  assert.strictEqual(hasPlacement(southWest), true);
  assert.strictEqual(hasPlacement(west), true);
  assert.strictEqual(hasPlacement(northWest), true);
  assert.strictEqual(hasPlacement(center), false);
  assert.strictEqual(hasPlacement(), false);
});


test('#placementBoundary', function(assert) {
  assert.expect(2);

  const $container = jQuery('<div/>', {
    css: {
      boxSizing: 'border-box',
      width: '100px',
      height: '50px',
      overflow: 'scroll'
    }
  });

  const $overflowingContent = jQuery('<div/>', {
    css: {
      width: '120px',
      height: '60px'
    }
  });

  $fixture.append($container);

  $container
    .append($overflowingContent)
    .scrollTop(10)
    .scrollLeft(20);

  assert.deepEqual(placementBoundary($container), {
    top: 27,
    left: 53,
    bottom: 43,
    right: 87
  }, 'computes the boundary points within the container element');

  assert.deepEqual(placementBoundary($container, 2, 4), {
    top: 23,
    left: 70,
    bottom: 48,
    right: 70
  }, 'can customise the boundary points');

  $container.remove();
});


test('#determinePlacement', function(assert) {
  assert.expect(8);

  const boundary = placementBoundary($fixture);

  $reference.css({ top: 0, left: '50%', bottom: 'auto', right: 'auto' });
  assert.deepEqual(determinePlacement($reference, boundary), north);

  $reference.css({ top: 0, left: 'auto', bottom: 'auto', right: 0 });
  assert.deepEqual(determinePlacement($reference, boundary), northEast);

  $reference.css({ top: '50%', left: 'auto', bottom: 'auto', right: 0 });
  assert.deepEqual(determinePlacement($reference, boundary), east);

  $reference.css({ top: 'auto', left: 'auto', bottom: 0, right: 0 });
  assert.deepEqual(determinePlacement($reference, boundary), southEast);

  $reference.css({ top: 'auto', left: '50%', bottom: 0, right: 'auto' });
  assert.deepEqual(determinePlacement($reference, boundary), south);

  $reference.css({ top: 'auto', left: 0, bottom: 0, right: 'auto' });
  assert.deepEqual(determinePlacement($reference, boundary), southWest);

  $reference.css({ top: '50%', left: 0, bottom: 'auto', right: 'auto' });
  assert.deepEqual(determinePlacement($reference, boundary), west);

  $reference.css({ top: 0, left: 0, bottom: 'auto', right: 'auto' });
  assert.deepEqual(determinePlacement($reference, boundary), northWest);
});
