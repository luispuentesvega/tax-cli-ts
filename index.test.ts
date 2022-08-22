const mockedExit = jest.fn();

import * as index from './index';

jest.mock('process', () => ({
  exit: mockedExit
}));

jest.mock('yargs', () => ({
  argv: {
    user: '123',
    file: 'transaction-1line.csv',
    type: 'CAPITOL_GAIN'
  }
}));

describe('index', () => {
  test('should not call exit(1) when all the arguments are provided', () => {
    index;
    expect(mockedExit).not.toHaveBeenCalled();
  });
});
