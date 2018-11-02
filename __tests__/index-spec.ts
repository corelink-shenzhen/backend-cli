import * as index from '../src/index';

jest.mock('../src/new.ts', () => {
  return {
    newProject: flags => flags,
  };
});

jest.mock('../src/api.ts', () => {
  return {
    add: flags => flags,
  };
});

describe('Index', () => {
  it('should have startProgram available', () => {
    expect(index.startProgram).toBeTruthy();
  });

  it('should test new project', () => {
    expect(index.startProgram(['node', 'ycs', '-n'])).toMatchObject({
      new: true,
      n: true,
    });
    expect(
      index.startProgram(['node', 'ycs', '-n', 'helloWorld'])
    ).toMatchObject({
      new: 'helloWorld',
      n: 'helloWorld',
    });
  });

  it('should test new api', () => {
    expect(index.startProgram(['node', 'ycs', '-a'])).toMatchObject({
      addApi: true,
      a: true,
    });
  });
});
