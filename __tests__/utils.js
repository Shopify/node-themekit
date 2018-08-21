const {cleanPath, getFlagArrayFromObject} = require('../lib/utils');

describe('getFlagArrayFromObject', () => {
  test('converts string flags correctly', () => {
    // arrange
    const input = {
      flagOne: 'value1',
      flagTwo: 'value2',
    };
    const expectedOutput = ['--flag-one', 'value1', '--flag-two', 'value2'];

    // act
    const output = getFlagArrayFromObject(input);

    // assert
    expect(output).toBeInstanceOf(Array);
    expect(output).toHaveLength(expectedOutput.length);
    expect(output).toEqual(expect.arrayContaining(expectedOutput));
  });

  test('converts boolean flags correctly', () => {
    // arrange
    const input = {
      flagOne: true,
      flagTwo: false,
      flagThree: true,
    };
    const expectedOutput = ['--flag-one', '--flag-three'];

    // act
    const output = getFlagArrayFromObject(input);

    // assert
    expect(output).toBeInstanceOf(Array);
    expect(output).toHaveLength(expectedOutput.length);
    expect(output).toEqual(expect.arrayContaining(expectedOutput));
  });

  test('correctly deconstructs ignoredFiles flag', () => {
    // arrange
    const input = {
      ignoredFiles: ['file1', 'file2']
    };
    const expectedOutput = ['--ignored-file', 'file1', '--ignored-file', 'file2'];

    // act
    const output = getFlagArrayFromObject(input);

    // assert
    expect(output).toBeInstanceOf(Array);
    expect(output).toHaveLength(expectedOutput.length);
    expect(output).toEqual(expect.arrayContaining(expectedOutput));
  });
});
