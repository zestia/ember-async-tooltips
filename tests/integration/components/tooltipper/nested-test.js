// import { module, test } from 'qunit';
// import setupTooltipperTest from './setup';
// import { render, triggerEvent } from '@ember/test-helpers';
// import hbs from 'htmlbars-inline-precompile';

// module('tooltipper', function (hooks) {
//   setupTooltipperTest(hooks);

//   test('nesting', async function (assert) {
//     assert.expect(0);

//     this.registerTableRow = (element) => this.set('tr', element);

//     await render(hbs`
//       <table>
//         <tbody>
//           <tr {{did-insert this.registerTableRow}}>
//             <td>
//               Cell 1

//               <Tooltipper
//                 @tooltip={{component "tooltip" text="Foo"}}
//                 @referenceElement={{this.tr}}
//               >
//                 A tooltip for the entire table row
//               </Tooltipper>
//             </td>
//             <td>
//               Cell 2

//               <Tooltipper
//                 @tooltip={{component "tooltip" text="Bar"}}
//               >
//                 A tooltip for something inside a table cell
//               </Tooltipper>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     `);

//     await triggerEvent('td:nth-child(2) .tooltipper', 'mouseenter');

//     return this.pauseTest();
//   });
// });
