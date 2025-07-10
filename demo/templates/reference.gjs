import Route from 'ember-route-template';
import Tooltip from '@zestia/ember-async-tooltips/components/tooltip';
import { uniqueId } from '@ember/helper';

export default Route(
  <template>
    <p>
      A tooltip displayed on a specific reference element.
    </p>

    {{#let (uniqueId) as |id|}}
      <table>
        <tbody>
          <tr id={{id}}>
            <td>
              Table cell 1

              <Tooltip @element="#{{id}}">
                Hello World
              </Tooltip>
            </td>
            <td>
              Table cell 2
            </td>
          </tr>
        </tbody>
      </table>
    {{/let}}
  </template>
);
