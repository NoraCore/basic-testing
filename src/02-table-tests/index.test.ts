import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 3, b: 5, action: Action.Subtract, expected: -2 },
  { a: 2, b: 4, action: Action.Multiply, expected: 8 },
  { a: 2, b: 0, action: Action.Multiply, expected: 0 },
  { a: 0, b: 0, action: Action.Multiply, expected: 0 },
  { a: 0, b: 8, action: Action.Multiply, expected: 0 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 5, b: 2, action: Action.Divide, expected: 2.5 },
  { a: 5, b: 0, action: Action.Divide, expected: Infinity },
  { a: 0, b: 2, action: Action.Divide, expected: 0 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 5, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 0, b: 5, action: Action.Exponentiate, expected: 0 },
];
const negativeTestCases = [
  { a: '1', b: 2, action: Action.Add, description: 'string as first argument' },
  {
    a: 1,
    b: '2',
    action: Action.Subtract,
    description: 'string as second argument',
  },
  {
    a: null,
    b: 2,
    action: Action.Multiply,
    description: 'null as first argument',
  },
  {
    a: 1,
    b: undefined,
    action: Action.Divide,
    description: 'undefined as second argument',
  },
  { a: 1, b: 2, action: 'invalid', description: 'invalid action string' },
  { a: 1, b: 2, action: null, description: 'null action' },
  { a: 1, b: 2, action: undefined, description: 'undefined action' },
  {
    a: '1',
    b: '2',
    action: Action.Add,
    description: 'both arguments as strings',
  },
  { a: {}, b: 2, action: Action.Add, description: 'object as first argument' },
];

describe('simpleCalculator', () => {
  describe('positive cases', () => {
    test.each(testCases)(
      'should return $expected for calculation $a $action $b',
      ({ a, b, action, expected }) => {
        const result = simpleCalculator({ a, b, action });
        expect(result).toBe(expected);
      },
    );
  });
  describe('negative cases', () => {
    test.each(negativeTestCases)(
      'should return null for invalid input: %description',
      ({ a, b, action }) => {
        const result = simpleCalculator({ a, b, action } as never);
        expect(result).toBeNull();
      },
    );
  });
});
