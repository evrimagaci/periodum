module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/*.+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/components/**/*.vue', '<rootDir>/pages/**/*.vue'],
}
