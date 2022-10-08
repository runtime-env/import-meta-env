/* eslint-disable */
export default {
  displayName: 'app',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      {
        presets: ['@nrwl/react/babel'],
        plugins: [
          ['module:@import-meta-env/babel', { example: '.env.example.public' }],
        ],
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/app',
};
