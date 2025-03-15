import {defineConfig} from 'vitest/config';

export default defineConfig({
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
})
