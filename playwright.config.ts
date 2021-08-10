import { PlaywrightTestConfig, devices } from '@playwright/test';
// import { devices } from 'playwright';

const config: PlaywrightTestConfig = {
    testDir: 'tests',                       // Look for test files in the "tests" directory, relative to this configuration file
    outputDir: 'test-results',              // Output directory for files created during the test run
    timeout: 20000,                         // Each test is given 20 seconds  
    forbidOnly: !!process.env.CI,           // Forbid test.only on CI  
    retries: 2,                             // 2 retries for each test
    workers: 3,                             // Limit the number of workers (browsers/projects) that run at a time
    updateSnapshots: 'missing',             // For visual comparisons: whether to update expected snapshots with the actual results produced by the test run
    expect: {
        toMatchSnapshot: { threshold: 0.99 },  // Matching threshold, ranges from 0 to 1. Smaller values make the comparison more sensitive.
    },
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
        ['list']
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
        {
            name: 'WebKit',
            use: { browserName: 'webkit' },
        },
        // "Pixel 4" tests use Chromium browser.
        {
            name: 'Pixel 4',
            use: {
                browserName: 'chromium',
                contextOptions: {
                    viewport: devices['Pixel 4'].viewport,
                    userAgent: devices['Pixel 4'].userAgent,
                    isMobile: devices['Pixel 4'].isMobile
                },   
            },
        },
    ]
};
export default config;