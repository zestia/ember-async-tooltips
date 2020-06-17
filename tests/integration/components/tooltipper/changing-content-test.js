// import { module, test } from 'qunit';
// import setupTooltipperTest from './setup';
// import { render, triggerEvent } from '@ember/test-helpers';
// import hbs from 'htmlbars-inline-precompile';

// module('tooltipper', function (hooks) {
//   setupTooltipperTest(hooks);

//   test('changing content', async function (assert) {
//     assert.expect(1);

//     this.text = 'Hello';

//     await render(hbs`
//       <Tooltipper
//         @tooltip={{component "tooltip" text=this.text}}
//         @position="bottom center"
//       />
//     `);

//     await triggerEvent('.tooltipper', 'mouseenter');

//     assert.dom('.tooltip').hasStyle(
//       {
//         top: '0px',
//         left: '20px'
//       },
//       'initial position'
//     );

//     this.set('text', this.text.repeat(10));

//     return new Promise(() => {});
//   });
// });
