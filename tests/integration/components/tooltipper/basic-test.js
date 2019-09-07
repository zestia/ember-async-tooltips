import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { settled, render, find, triggerEvent } from '@ember/test-helpers';
import { defer, resolve, reject } from 'rsvp';
import ToolTipComponent from '@zestia/ember-async-tooltips/components/tooltip';
import hbs from 'htmlbars-inline-precompile';

module('tooltipperx', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(4);

    await render(hbs`<Tooltipper class="foo-tooltipper" />`);

    assert
      .dom('.foo-tooltipper')
      .hasText(
        /^$/,
        'splats attributes, and renders text argument with correct whitespace'
      );

    assert
      .dom('.foo-tooltipper')
      .hasClass('tooltipper', 'has an appropriate class name');

    const [id] = find('.tooltipper')
      .getAttribute('id')
      .match(/\d+/);

    assert
      .dom('.tooltipper')
      .hasAttribute(
        'id',
        `tooltipper-${id}`,
        'has an appropriate id attribute'
      );

    assert
      .dom('.tooltipper')
      .hasAttribute(
        'aria-describedby',
        `tooltip-${id}`,
        'this tooltipper will be described by a tooltip with the same identifer'
      );
  });

  //
  // test('onLoad action', async function(assert) {
  //   assert.expect(5);
  //
  //   let count = 0;
  //
  //   const deferred = defer();
  //
  //   this.set('load', () => {
  //     count++;
  //     return deferred.promise;
  //   });
  //
  //   await render(hbs`
  //     <ToolTipper @onLoad={{action this.load}} as |tooltipper|>
  //       {{if tooltipper.isLoading "loading"}}
  //     </ToolTipper>
  //   `);
  //
  //   await triggerEvent('.tooltipper', 'mouseenter');
  //
  //   assert
  //     .dom('.tooltipper')
  //     .hasClass('is-loading', 'has a loading class whilst loading the data');
  //   assert.dom('.tooltipper').hasText('loading', 'yields loading state');
  //
  //   deferred.resolve();
  //
  //   await settled();
  //
  //   assert
  //     .dom('.tooltipper')
  //     .doesNotHaveClass(
  //       'is-loading',
  //       'loading class is removed when loading is complete'
  //     );
  //
  //   assert
  //     .dom('.tooltipper')
  //     .doesNotIncludeText('loading', 'yields loading state has finished');
  //
  //   await triggerEvent('.tooltipper', 'mouseenter');
  //
  //   assert.equal(count, 1, 'only loads once');
  // });
  //
  // test('onLoad success', async function(assert) {
  //   assert.expect(1);
  //
  //   this.owner.register(
  //     'component:my-tooltip',
  //     ToolTipComponent.extend({
  //       layout: hbs`
  //       {{#if this.isLoaded}}
  //         {{this.data}}
  //       {{/if}}
  //     `
  //     })
  //   );
  //
  //   this.set('load', () => {
  //     return resolve('foo');
  //   });
  //
  //   await render(hbs`
  //     <ToolTipper
  //       @onLoad={{action this.load}}
  //       @tooltip={{component "my-tooltip"}} />
  //
  //   `);
  //
  //   await triggerEvent('.tooltipper', 'mouseenter');
  //
  //   assert
  //     .dom('.tooltip')
  //     .hasText('foo', 'data is loaded and passed to the tooltip');
  // });
  //
  // test('onLoad failure', async function(assert) {
  //   assert.expect(2);
  //
  //   let count = 0;
  //
  //   this.owner.register(
  //     'component:my-tooltip',
  //     ToolTipComponent.extend({
  //       layout: hbs`
  //       {{#if this.error}}
  //         {{this.error}}
  //       {{/if}}
  //     `
  //     })
  //   );
  //
  //   this.set('load', () => {
  //     count++;
  //     return reject('bar');
  //   });
  //
  //   await render(hbs`
  //     <ToolTipper
  //       @onLoad={{action this.load}}
  //       @tooltip={{component "my-tooltip"}} />
  //
  //     <RenderTooltips />
  //   `);
  //
  //   await triggerEvent('.tooltipper', 'mouseenter');
  //   await triggerEvent('.tooltipper', 'mouseenter');
  //
  //   assert.equal(
  //     count,
  //     2,
  //     'load is attempted more than once, if previously failed'
  //   );
  //   assert
  //     .dom('.tooltip')
  //     .hasText('bar', 'can determine when data failed to load');
  // });
});
