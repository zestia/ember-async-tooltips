import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { settled, render, triggerEvent } from '@ember/test-helpers';
import { defer, resolve, reject } from 'rsvp';
import ToolTipComponent from '@zestia/ember-async-tooltips/components/tool-tip';
import hbs from 'htmlbars-inline-precompile';

module('tool-tipper', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs`<ToolTipper />`);

    assert
      .dom('.tooltipper')
      .exists(
        { count: 1 },
        'tool-tipper components have an appropriate class name'
      );
  });

  test('as a hyperlink', async function(assert) {
    assert.expect(3);

    await render(
      hbs`{{tool-tipper tagName="a" href="foo" rel="bar" target="baz"}}`
    );

    assert
      .dom('.tooltipper')
      .hasAttribute('href', 'foo', 'can set href attribute');

    assert
      .dom('.tooltipper')
      .hasAttribute('rel', 'bar', 'can set rel attribute');

    assert
      .dom('.tooltipper')
      .hasAttribute('target', 'baz', 'can set target attribute');
  });

  test('as a button', async function(assert) {
    assert.expect(1);

    await render(hbs`{{tool-tipper tagName="button" type="foo"}}`);

    assert
      .dom('.tooltipper')
      .hasAttribute('type', 'foo', 'can specify type of button');
  });

  test('tabindex', async function(assert) {
    assert.expect(2);

    await render(hbs`<ToolTipper />`);

    assert
      .dom('.tooltipper')
      .doesNotHaveAttribute('tabindex', 'no default tabindex');

    await render(hbs`{{tool-tipper tabindex="-1"}}`);

    assert
      .dom('.tooltipper')
      .hasAttribute('tabindex', '-1', 'can set tabindex attribute');
  });

  test('onLoad action', async function(assert) {
    assert.expect(5);

    let count = 0;

    const deferred = defer();

    this.set('load', () => {
      count++;
      return deferred.promise;
    });

    await render(hbs`
      <ToolTipper @onLoad={{action this.load}} as |tooltipper|>
        {{if tooltipper.isLoading "loading"}}
      </ToolTipper>
    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert
      .dom('.tooltipper')
      .hasClass('is-loading', 'has a loading class whilst loading the data');
    assert.dom('.tooltipper').hasText('loading', 'yields loading state');

    deferred.resolve();

    await settled();

    assert
      .dom('.tooltipper')
      .doesNotHaveClass(
        'is-loading',
        'loading class is removed when loading is complete'
      );

    assert
      .dom('.tooltipper')
      .doesNotIncludeText('loading', 'yields loading state has finished');

    await triggerEvent('.tooltipper', 'mouseenter');

    assert.equal(count, 1, 'only loads once');
  });

  test('onLoad success', async function(assert) {
    assert.expect(1);

    this.owner.register(
      'component:my-tooltip',
      ToolTipComponent.extend({
        layout: hbs`
        {{#if this.isLoaded}}
          {{this.data}}
        {{/if}}
      `
      })
    );

    this.set('load', () => {
      return resolve('foo');
    });

    await render(hbs`
      <ToolTipper
        @onLoad={{action this.load}}
        @tooltip={{component "my-tooltip"}} />

    `);

    await triggerEvent('.tooltipper', 'mouseenter');

    assert
      .dom('.tooltip')
      .hasText('foo', 'data is loaded and passed to the tooltip');
  });

  test('onLoad failure', async function(assert) {
    assert.expect(2);

    let count = 0;

    this.owner.register(
      'component:my-tooltip',
      ToolTipComponent.extend({
        layout: hbs`
        {{#if this.error}}
          {{this.error}}
        {{/if}}
      `
      })
    );

    this.set('load', () => {
      count++;
      return reject('bar');
    });

    await render(hbs`
      <ToolTipper
        @onLoad={{action this.load}}
        @tooltip={{component "my-tooltip"}} />

      <RenderTooltips />
    `);

    await triggerEvent('.tooltipper', 'mouseenter');
    await triggerEvent('.tooltipper', 'mouseenter');

    assert.equal(
      count,
      2,
      'load is attempted more than once, if previously failed'
    );
    assert
      .dom('.tooltip')
      .hasText('bar', 'can determine when data failed to load');
  });
});
