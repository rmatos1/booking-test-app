import { describe, test } from '@jest/globals';
import { validateEmail, validateName } from '..';

describe('validationHelper.ts > validateName', () => {
  test('should return the expected values', () => {
    const isValid1 = validateName('test');

    expect(isValid1).toBe(true);

    const isValid2 = validateName('te');

    expect(isValid2).toBe(false);
  });
});

describe('validationHelper.ts > validateEmail', () => {
  test('should return the expected values', () => {
    const isValid1 = validateEmail('test');

    expect(isValid1).toBe(false);

    const isValid2 = validateName('test@test.com');

    expect(isValid2).toBe(true);
  });
});
