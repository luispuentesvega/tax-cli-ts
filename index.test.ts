const mockedExit = jest.fn();

import * as index from './index';

jest.mock('process', () => ({
  exit: mockedExit
}));

describe('index', () => {
  test('should call exit(1) when not arguments are provided', () => {
    index;
    expect(mockedExit).toHaveBeenCalledWith(1);
  });

  test('should not call exit(1) when all the arguments are provided', () => {
    jest.mock('yargs', () => ({
      argv: {
        user: '123',
        file: 'transaction-1line.csv',
        type: 'CAPITOL_GAIN'
      }
    }));
    index;
    expect(mockedExit).toHaveBeenCalledWith(1);
  });
});
