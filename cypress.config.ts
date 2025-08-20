import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: "http://localhost:3000", // your dev server URL
        specPattern: "cypress/e2e/**/*.cy.{js,ts,jsx,tsx}",
        supportFile: "cypress/support/e2e.ts",
        viewportWidth: 1280,
        viewportHeight: 720,
        defaultCommandTimeout: 5000, // wait time for elements
    },
});
