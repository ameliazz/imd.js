/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    roots: ['<rootDir>/source'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['jest-extended/all'],
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/source/$1',
    },
}
