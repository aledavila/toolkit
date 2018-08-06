/**
 * @jest-environment node
 */

'use strict';

describe('preset', () => {
  let loadPreset;
  let mockError;
  let mockModule;
  let mockPlugins;
  let mockResolvePlugins;
  let mockResolvePreset;

  beforeEach(() => {
    loadPreset = require('../presets').loadPreset;

    mockError = new Error('error');
    mockModule = jest.fn();
    mockPlugins = [
      'should-resolve-a',
      'should-resolve-b',
      ['should-resolve-c', { foo: 'bar' }],
    ];
    mockResolvePlugins = jest.fn(async descriptors => {
      const plugins = descriptors.map(descriptor => {
        const [name, options = {}] = descriptor;
        if (name.includes('should-resolve')) {
          return { module: mockModule };
        }
        return { error: mockError };
      });
      return {
        plugins,
      };
    });
    mockResolvePreset = jest.fn(async name => {
      if (name.includes('should-resolve')) {
        return {
          module: () => ({
            plugins: mockPlugins,
          }),
        };
      }
      return { error: mockError };
    });
  });

  describe('loadPreset', () => {
    it('should return an array of plugins for a string descriptor', async () => {
      const { error, plugins } = await loadPreset(
        'should-resolve-a',
        mockResolvePreset,
        mockResolvePlugins
      );
      expect(error).not.toBeDefined();
      expect(plugins.length).toBe(mockPlugins.length);
    });
  });
});
