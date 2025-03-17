const { main } = require('./index.js');

describe('Entrypoint', () => {
  let consoleLogSpy;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  describe('main', () => {
    it('should log error if no valid arguments are passed', () => {
      vi.stubGlobal('process', {
        argv: ['node', 'app.js', '--invalid-argument'],
      });

      main([]);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Please specify a valid argument: --count or --filter=<value>'
      );
    });

    it('should log filtered array', () => {
      const mockedData = [
        {
          name: 'Country1',
          people: [
            {
              name: 'Person1',
              animals: [{ name: 'animal1' }, { name: 'animal2' }],
            },
            {
              name: 'Person2',
              animals: [{ name: 'animal3' }],
            },
          ],
        },
        {
          name: 'Country2',
          people: [
            {
              name: 'Person3',
              animals: [{ name: 'animal4' }],
            },
          ],
        },
      ];
      vi.stubGlobal('process', {
        argv: ['node', 'app.js', '--filter=animal1'],
      });

      main(mockedData);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        JSON.stringify(
          [
            {
              name: 'Country1',
              people: [
                {
                  name: 'Person1',
                  animals: [{ name: 'animal1' }],
                },
              ],
            },
          ],
          null,
          2
        )
      );
    });

    it('should log count in array elements', () => {
      const mockedData = [
        {
          name: 'Country1',
          people: [
            {
              name: 'Person1',
              animals: [{ name: 'animal1' }, { name: 'animal2' }],
            },
            {
              name: 'Person2',
              animals: [{ name: 'animal3' }],
            },
          ],
        },
        {
          name: 'Country2',
          people: [
            {
              name: 'Person3',
              animals: [{ name: 'animal4' }],
            },
          ],
        },
      ];
      vi.stubGlobal('process', {
        argv: ['node', 'app.js', '--count'],
      });

      main(mockedData);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        JSON.stringify(
          [
            {
              name: 'Country1 [2]',
              people: [
                {
                  name: 'Person1 [2]',
                  animals: [{ name: 'animal1' }, { name: 'animal2' }],
                },
                {
                  name: 'Person2 [1]',
                  animals: [{ name: 'animal3' }],
                },
              ],
            },
            {
              name: 'Country2 [1]',
              people: [
                {
                  name: 'Person3 [1]',
                  animals: [{ name: 'animal4' }],
                },
              ],
            },
          ],
          null,
          2
        )
      );
    });

    it('should log count in array elements and filter by animal name', () => {
      const mockedData = [
        {
          name: 'Country1',
          people: [
            {
              name: 'Person1',
              animals: [{ name: 'animal1' }, { name: 'animal2' }],
            },
            {
              name: 'Person2',
              animals: [{ name: 'animal3' }],
            },
          ],
        },
        {
          name: 'Country2',
          people: [
            {
              name: 'Person3',
              animals: [{ name: 'animal4' }],
            },
          ],
        },
      ];
      vi.stubGlobal('process', {
        argv: ['node', 'app.js', '--filter=animal1', '--count'],
      });

      main(mockedData);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        JSON.stringify(
          [
            {
              name: 'Country1 [1]',
              people: [
                {
                  name: 'Person1 [1]',
                  animals: [{ name: 'animal1' }],
                },
              ],
            },
          ],
          null,
          2
        )
      );
    });

    it('should log nothing if filter return an empty array', () => {
      const mockedData = [
        {
          name: 'Country1',
          people: [
            {
              name: 'Person1',
              animals: [{ name: 'animal1' }, { name: 'animal2' }],
            },
            {
              name: 'Person2',
              animals: [{ name: 'animal3' }],
            },
          ],
        },
        {
          name: 'Country2',
          people: [
            {
              name: 'Person3',
              animals: [{ name: 'animal4' }],
            },
          ],
        },
      ];
      vi.stubGlobal('process', {
        argv: ['node', 'app.js', '--filter=animal5', '--count'],
      });

      main(mockedData);

      expect(consoleLogSpy).not.toHaveBeenCalled();
    });
  });
});
