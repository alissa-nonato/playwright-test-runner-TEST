import { PlaywrightTestConfig } from '@playwright/test';
import { devices } from 'playwright';

const config: PlaywrightTestConfig = {
    testDir: 'tests',                       // Look for test files in the "tests" directory, relative to this configuration file
    outputDir: 'test-results',              // Output directory for files created during the test run
    timeout: 30000,                         // Each test is given 30 seconds  
    forbidOnly: !!process.env.CI,           // Forbid test.only on CI  
    retries: 2,                             // 2 retries for each test
    workers: process.env.CI ? 2 : 5,        // Limit the number of workers on CI, use default locally
    use: {
        headless: false,
        ignoreHTTPSErrors: true,
        video: 'on-first-retry',
        screenshot: 'only-on-failure',
        bypassCSP: true,
        launchOptions: {
            slowMo: 100,
        },
    },
    reporter: [
        ['list'],  
        //['json', {  outputFile: 'test-results/test-results.json' }]
    ],
    projects: [
        {
            name: 'Chromium',
            use: {
                // Configure the browser to use.
                browserName: 'chromium',
                // Any Chromium-specific options.
                viewport: { width: 600, height: 800 },
            },
        },
        //"iPhone 6" tests use Chromium browser.
        {
            name: 'iPhone 6',
            use: {
                browserName: 'webkit',
                // not true emulation; need to explicitly set viewport and userAgent without this
                //...devices['iPhone 6'],
                contextOptions: {
                    viewport: devices['iPhone 6'].viewport,
                    userAgent: devices['iPhone 6'].userAgent,
                    isMobile: devices['iPhone 6'].isMobile
                },     
            },
        },
        // {
        //     name: 'WebKit',
        //     use: { browserName: 'webkit' },
        // },

                // "Pixel 4" tests use WebKit browser.
        // {
        //     name: 'Pixel 4',
        //     use: {
        //         browserName: 'webkit',
        //         contextOptions: {
        //             viewport: devices['Pixel 4'].viewport,
        //             userAgent: devices['Pixel 4'].userAgent,
        //             isMobile: devices['Pixel 4'].isMobile
        //         },   
        //     },
        // },
    ]
};
export default config;