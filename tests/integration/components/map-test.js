import { module, test } from 'qunit';
import { setupRenderingTest } from 'super-rentals/tests/helpers';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import ENV from 'super-rentals/config/environment';

module('Integration | Component | map', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders an image for the specified parameters', async function (assert) {
    await render(hbs`<Map
      @id="237"
      @width="150"
      @height="120"
    />`);

    assert
      .dom('.map img')
      .exists()
      .hasAttribute('alt', 'Dummy image 237 with dimensions 150x120')
      .hasAttribute('src')
      .hasAttribute('width', '150')
      .hasAttribute('height', '120');

    let { src } = find('.map img');
    let token = encodeURIComponent(ENV.DUMMY_ACCESS_TOKEN);

    assert.ok(
      src.startsWith('https://picsum.photos'),
      'the src starts with "https://picsum.photos"'
    );

    assert.ok(
      src.includes('237/150/120'),
      'the src should include the id, width and height parameter'
    );

    assert.ok(
      src.includes(`dummy=${token}`),
      'the src should include the escaped dummy token'
    );
  });

  test('it updates the `src` attribute when the arguments change', async function (assert) {
    this.setProperties({
      id: 870,
      width: 150,
      height: 120,
    });

    await render(hbs`<Map
      @id={{this.id}}
      @width={{this.width}}
      @height={{this.height}}
    />`);

    let img = find('.map img');

    assert.ok(
      img.src.includes('870/150/120'),
      'the src should include the id,width and height parameter'
    );

    this.setProperties({
      width: 300,
      height: 200,
    });

    assert.ok(
      img.src.includes('300/200'),
      'the src should include the width and height parameter'
    );
  });

  test('the default alt attribute can be overridden', async function (assert) {
    await render(hbs`<Map
      @id="237"
      @width="150"
      @height="120"
      alt="A random image"
    />`);

    assert.dom('.map img').hasAttribute('alt', 'A random image');
  });

  test('the src, width and height attributes cannot be overridden', async function (assert) {
    await render(hbs`<Map
      @id="237"
      @width="150"
      @height="120"
      src="/assets/images/teaching-tomster.png"
      width="200"
      height="300"
    />`);

    assert
      .dom('.map img')
      .hasAttribute('src', /^https:\/\/picsum\.photos\//)
      .hasAttribute('width', '150')
      .hasAttribute('height', '120');
  });
});
