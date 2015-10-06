import test from 'tape';
import compose from '../examples/compose';

test('Instance replacement', assert => {
  const newInstance = {
    new: true
  };

  compose({
    initializers: [
      () => {
        return newInstance;
      },
      (options, { instance }) => {
        const actual = instance;
        const expected = newInstance;

        assert.equal(actual, expected,
          'initializer return values should replace the instance');

        assert.end();
      }
    ]
  })();
});

[0, 1, undefined, null, NaN, "string", true, false].forEach(obj => {
  test('Instance not replaced with ' + obj, assert => {
    compose({
      initializers: [
        () => {
          return obj;
        },
        (options, { instance }) => {
          const actual = typeof instance;
          const expected = 'object';

          assert.equal(actual, expected,
            'initializer returned non object value should not replace instance');

          assert.end();
        }
      ]
    })();
  });
});

test('Instance replacement', assert => {
  const message = 'instance replaced';
  const newInstance = {
    message: message
  };

  const obj = compose({
    initializers: [
      () => {
        return newInstance;
      }
    ]
  })();

  const actual = obj.message;
  const expected = message;

  assert.equal(actual, expected,
    'the replaced instance value should be returned from the stamp');

  assert.end();
});