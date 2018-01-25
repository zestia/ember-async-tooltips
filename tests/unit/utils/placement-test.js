import { module, test } from 'qunit';
import {
  determinePlacement,
  placementCoords,
  placementBoundary,
  placementToString,
  stringToPlacement,
  hasPlacement
} from '@zestia/ember-async-tooltips/utils/placement';

let fakeDoc;
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
    fakeDoc = {
      scrollLeft: 50,
      scrollTop: 100,
      getBoundingClientRect() {
        return {
          width: 800,
          height: 600
        };
      }
    };

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

  assert.deepEqual(placementCoords('N',  element, reference, fakeDoc), [165, 179]);
  assert.deepEqual(placementCoords('NE', element, reference, fakeDoc), [191, 179]);
  assert.deepEqual(placementCoords('E',  element, reference, fakeDoc), [191, 215]);
  assert.deepEqual(placementCoords('SE', element, reference, fakeDoc), [191, 251]);
  assert.deepEqual(placementCoords('S',  element, reference, fakeDoc), [165, 251]);
  assert.deepEqual(placementCoords('SW', element, reference, fakeDoc), [139, 251]);
  assert.deepEqual(placementCoords('W',  element, reference, fakeDoc), [139, 215]);
  assert.deepEqual(placementCoords('NW', element, reference, fakeDoc), [139, 179]);
});


test('#determinePlacement', function(assert) {
  assert.expect(8);

  const boundary = placementBoundary();

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


test('#placementBoundary', function(assert) {
  assert.expect(3);

  assert.deepEqual(placementBoundary(undefined, undefined, fakeDoc), {
    top: 300,
    left: 317,
    bottom: 500,
    right: 583
  }, 'computes the boundary points within the document, defaults to 3 rows & 3 cols');

  assert.deepEqual(placementBoundary(2, 4, fakeDoc), {
    top: 250,
    left: 450,
    bottom: 550,
    right: 450
  }, 'can customise the boundary points');

  assert.deepEqual(placementBoundary(6, 1, fakeDoc), {
    top: 700,
    left: 183,
    bottom: 100,
    right: 717
  }, 'can customise the boundary points');
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
