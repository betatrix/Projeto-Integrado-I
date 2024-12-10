import { defineConfig } from 'cypress';

export default defineConfig({
    chromeWebSecurity: false,
    e2e: {
        setupNodeEvents() {
            // implement node event listeners here
        },
        baseUrl:'https://vocco.vercel.app',
        viewportHeight: 1080,
        viewportWidth: 1920,
        testIsolation: false
    },
});
