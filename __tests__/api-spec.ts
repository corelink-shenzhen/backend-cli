import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as inquirer from 'inquirer';
import { add } from '../src/api';

jest.mock('inquirer');
jest.mock('fs-extra', () => {
  return {
    mkdirp: jest.fn(),
    readFile: jest.fn(),
    outputFile: jest.fn(),
  };
});

jest.mock('fs', () => {
  return {
    existsSync: jest.fn(),
  };
});

console.log = jest.fn();
console.error = jest.fn();

describe('New api', () => {
  (fse as any).readFile.mockImplementation(() => Promise.resolve(''));
  it('should create a api', async () => {
    const flags = { addApi: true };
    (inquirer as any).setAnswers({
      model: 'sample',
      endpoint: '/api/samples',
      path: '/anywhere/samples',
    });
    const res = await add(flags);
    expect(res).toBe(true);
  });

  it('should create a api with exists', async () => {
    const flags = { addApi: true };
    (inquirer as any).setAnswers({
      model: 'sample',
      endpoint: '/api/samples',
      path: '/anywhere/samples',
    });
    (fs as any).existsSync.mockImplementationOnce(x => true);
    const res = await add(flags);
    expect(res).toBe(true);
  });

  it('should throw errors', async () => {
    (fse as any).mkdirp.mockImplementationOnce(x =>
      Promise.reject(new Error('throws errors'))
    );
    const flags = { addApi: true };
    const res = await add(flags);
    expect(res).toBe(false);
  });
});
