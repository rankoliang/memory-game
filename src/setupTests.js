// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import deepEqual from 'deep-equal';
jest.mock('./config');

expect.extend({
  toChange(action, query, options) {
    if (!options) {
      const initial = query();
      console.log(initial);

      action();

      const final = query();

      if (deepEqual(initial, final)) {
        return {
          message: () => `Expected value ${initial} to change`,
          pass: false,
        };
      } else {
        return {
          message: () => `Expected value ${initial} not to change to ${final}`,
          pass: true,
        };
      }
    }

    const { by } = options;
    let { from, to } = options;

    if (by) {
      from = query();
      to = query() + by;
    } else if (!deepEqual(query(), from)) {
      return {
        message: () => `Expected initial value to be ${from}`,
        pass: false,
      };
    }

    action();

    if (!deepEqual(query(), to)) {
      return {
        message: () => `Expected final value to be ${to}`,
        pass: false,
      };
    }

    return {
      message: () => `Expected final value not to be ${to}`,
      pass: true,
    };
  },
});
