const fs = require('fs');

const fsMock = require('mock-fs');

const {cleanFile, getFlagArrayFromObject} = require('../lib/utils');

describe('getFlagArrayFromObject', () => {
  test('converts string flags correctly', () => {
    const input = {
      flagOne: 'value1',
      flagTwo: 'value2'
    };
    const expectedOutput = ['--flagone', 'value1', '--flagtwo', 'value2'];

    const output = getFlagArrayFromObject(input);

    expect(output).toBeInstanceOf(Array);
    expect(output).toHaveLength(expectedOutput.length);
    expect(output).toEqual(expect.arrayContaining(expectedOutput));
  });

  test('converts allow-live flag', () => {
    const input = {
      allowLive: true
    };

    const output = getFlagArrayFromObject(input);

    expect(output).toEqual(['--allow-live']);
  });


  test('converts boolean flags correctly', () => {
    const input = {
      flagOne: true,
      flagTwo: false,
      flagThree: true
    };
    const expectedOutput = ['--flagone', '--flagthree'];

    const output = getFlagArrayFromObject(input);

    expect(output).toBeInstanceOf(Array);
    expect(output).toHaveLength(expectedOutput.length);
    expect(output).toEqual(expect.arrayContaining(expectedOutput));
  });

  test('correctly deconstructs ignoredFiles flag', () => {
    const input = {
      ignoredFiles: ['file1', 'file2']
    };
    const expectedOutput = [
      '--ignored-file',
      'file1',
      '--ignored-file',
      'file2'
    ];

    const output = getFlagArrayFromObject(input);

    expect(output).toBeInstanceOf(Array);
    expect(output).toHaveLength(expectedOutput.length);
    expect(output).toEqual(expect.arrayContaining(expectedOutput));
  });

  test('correctly deconstructs files flag', () => {
    const input = {
      files: ['file1', 'file2']
    };
    const expectedOutput = ['file1', 'file2'];

    const output = getFlagArrayFromObject(input);

    expect(output).toBeInstanceOf(Array);
    expect(output).toHaveLength(expectedOutput.length);
    expect(output).toEqual(expect.arrayContaining(expectedOutput));
  });
});

describe('cleanFile', () => {
  afterEach(() => {
    fsMock.restore();
  });

  test('successfully removes file if it exists', () => {
    fsMock({
      'path/to/executable': {
        'my-exec': '...'
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

    expect(removeFile).not.toThrow();
    expect(removeFileAndAccess).toThrow('ENOENT');
    expect(unlink).toBeCalledWith(pathToExecutable);
  });

  test('does not throw if path does not exist', () => {
    fsMock({
      'path/to/executable': {
        'not-my-exec': '...'
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

    expect(unlink).toBeCalledWith(pathToExecutable);
    expect(removeFile).not.toThrow();
    expect(access).toThrow('ENOENT');
  });
});
