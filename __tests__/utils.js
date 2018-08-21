const fsMock = require('mock-fs');
const fs = require('fs');
const {cleanFile, getFlagArrayFromObject} = require('../lib/utils');

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

describe('cleanFile', () => {
  beforeEach(() => {
  });

  afterEach(() => {
    fsMock.restore();
  });

  test('successfully removes file if it exists', async () => {
    // arrange
    fsMock({
      'path/to/executable': {
        'my-exec': '...',
      }
    });

    const unlink = jest.spyOn(fs, 'unlinkSync');
    const pathToExecutable = 'path/to/executable/my-exec';

    function removeFile() {
      cleanFile(pathToExecutable);
    }
    function removeFileAndAccess() {
      cleanFile(pathToExecutable);
      fs.statSync(pathToExecutable);
    }

    // act + assert
    expect(unlink).toBeCalledWith(pathToExecutable);
    expect(removeFile).not.toThrow();
    expect(removeFileAndAccess).toThrow('ENOENT');
  });

  test('does not throw if path does not exist', async () => {
    // arrange
    fsMock({
      'path/to/executable': {
        'not-my-exec': '...',
      }
    });

    const unlink = jest.spyOn(fs, 'unlinkSync');
    const pathToExecutable = 'path/to/executable/my-exec';

    function removeFile() {
      cleanFile(pathToExecutable);
    }
    function access() {
      fs.statSync(pathToExecutable);
    }

    // act + assert
    expect(unlink).toBeCalledWith(pathToExecutable);
    expect(removeFile).not.toThrow();
    expect(access).toThrow('ENOENT');
  });
});
