const { handledArgs } = require('./index.js');

describe('handledArgs', () => {
  it('returns default values when no arguments are provided', () => {
    vi.stubGlobal('process', { argv: ['node', 'script.js'] });
    const result = handledArgs();
    expect(result).toEqual({ filter: null, count: false });
  });

  it('returns correct filter value when --filter= is provided', () => {
    vi.stubGlobal('process', { argv: ['node', 'script.js', '--filter=test'] });
    const result = handledArgs();
    expect(result).toEqual({ filter: 'test', count: false });
  });

  it('returns count as true when --count is provided', () => {
    vi.stubGlobal('process', { argv: ['node', 'script.js', '--count'] });
    const result = handledArgs();
    expect(result).toEqual({ filter: null, count: true });
  });

  it('returns both filter and count when both arguments are provided', () => {
    vi.stubGlobal('process', {
      argv: ['node', 'script.js', '--filter=test', '--count'],
    });
    const result = handledArgs();
    expect(result).toEqual({ filter: 'test', count: true });
  });

  it('ignores invalid arguments and still processes valid ones', () => {
    vi.stubGlobal('process', {
      argv: [
        'node',
        'script.js',
        '--invalid=arg',
        '--count',
        '--filter=example',
      ],
    });
    const result = handledArgs();
    expect(result).toEqual({ filter: 'example', count: true });
  });
});
