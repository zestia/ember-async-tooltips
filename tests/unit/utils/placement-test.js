import { module, test } from 'qunit';
import {
  determinePlacement,
  placementCoords,
  placementBoundary,
  placementToString,
  stringToPlacement,
  hasPlacement
} from '@zestia/ember-async-tooltips/utils/placement';

let body;
let element;
let reference;
let fixture;

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
    body = document.querySelector('body');

    fixture = document.createElement('div');
    fixture.setAttribute('id', 'placement-fixture');
    fixture.style.position = 'absolute';
    fixture.style.top = '0px';
    fixture.style.left = '0px';
    fixture.style.right = '0px';
    fixture.style.bottom = '0px';

    element = document.createElement('div');
    element.setAttribute('id', 'element');
    element.style.width = '10px';
    element.style.height = '20px';
    element.style.margin = '1px';
    element.style.padding = '2px';
    element.style.position = 'fixed';
    element.style.background = 'red';

    reference = document.createElement('div');
    reference.setAttribute('id', 'reference');
    reference.style.width = '30px';
    reference.style.height = '40px';
    reference.style.margin = '3px';
    reference.style.padding = '4px';
    reference.style.position = 'fixed';
    reference.style.background = 'blue';
    reference.style.top = '100px';
    reference.style.left = '100px';

    fixture.append(reference);
    fixture.append(element);
    body.appendChild(fixture);
  },
  afterEach() {
    fixture.removeChild(reference);
    fixture.removeChild(element);
    body.removeChild(fixture);
  }
});


test('#placementCoords', function(assert) {
  assert.expect(8);

  assert.deepEqual(placementCoords(element, reference, 'N'), [115, 79]);
  assert.deepEqual(placementCoords(element, reference, 'NE'), [141, 79]);
  assert.deepEqual(placementCoords(element, reference, 'E'), [141, 115]);
  assert.deepEqual(placementCoords(element, reference, 'SE'), [141, 151]);
  assert.deepEqual(placementCoords(element, reference, 'S'), [115, 151]);
  assert.deepEqual(placementCoords(element, reference, 'SW'), [89, 151]);
  assert.deepEqual(placementCoords(element, reference, 'W'), [89, 115]);
  assert.deepEqual(placementCoords(element, reference, 'NW'), [89, 79]);
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

  const container = document.createElement('div');
  container.style.width = '100px';
  container.style.height = '50px';
  container.style.overflow = 'scroll';

  const overflowingContent = document.createElement('div');
  overflowingContent.style.width = '120px';
  overflowingContent.style.height = '60px';

  container.appendChild(overflowingContent);
  fixture.appendChild(container);

  container.scrollTop = 10;
  container.scrollLeft = 20;

  assert.deepEqual(placementBoundary(container), {
    top: 27,
    left: 53,
    bottom: 43,
    right: 87
  }, 'computes the boundary points within the container element');

  assert.deepEqual(placementBoundary(container, 2, 4), {
    top: 23,
    left: 70,
    bottom: 48,
    right: 70
  }, 'can customise the boundary points');

  fixture.removeChild(container);
});


test('#determinePlacement', function(assert) {
  assert.expect(8);

  const boundary = placementBoundary(fixture);

  const move = options => {
    reference.style.top    = options.top;
    reference.style.left   = options.left;
    reference.style.bottom = options.bottom;
    reference.style.right  = options.right;
  };

  move({ top: 0, left: '50%', bottom: 'auto', right: 'auto' });
  assert.deepEqual(determinePlacement(reference, boundary), north);

  move({ top: 0, left: 'auto', bottom: 'auto', right: 0 });
  assert.deepEqual(determinePlacement(reference, boundary), northEast);

  move({ top: '50%', left: 'auto', bottom: 'auto', right: 0 });
  assert.deepEqual(determinePlacement(reference, boundary), east);

  move({ top: 'auto', left: 'auto', bottom: 0, right: 0 });
  assert.deepEqual(determinePlacement(reference, boundary), southEast);

  move({ top: 'auto', left: '50%', bottom: 0, right: 'auto' });
  assert.deepEqual(determinePlacement(reference, boundary), south);

  move({ top: 'auto', left: 0, bottom: 0, right: 'auto' });
  assert.deepEqual(determinePlacement(reference, boundary), southWest);

  move({ top: '50%', left: 0, bottom: 'auto', right: 'auto' });
  assert.deepEqual(determinePlacement(reference, boundary), west);

  move({ top: 0, left: 0, bottom: 'auto', right: 'auto' });
  assert.deepEqual(determinePlacement(reference, boundary), northWest);
});
