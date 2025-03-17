import {defineConfig} from 'vitest/config';

module.exports = defineConfig({
    test: {
        globals: true,
        include: ['src/**/*.spec.js'],
        passWithNoTests: true,
        coverage: {
            provider: 'v8',
            reportsDirectory: `coverage`,
            reporter: ['json', 'html'],
        },
    }
});
