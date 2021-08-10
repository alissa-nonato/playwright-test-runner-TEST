import { test as base } from '@playwright/test';
import { URL } from '../support/const_objects';

export type LoginFixture = {
    user: string;
    pass: string;
};

// Extend base test with our fixtures
export const test = base.extend<LoginFixture>({
    user: async({baseURL}, use) => {
        const value = 
            baseURL === URL.PRODIGY_FEATURE_BRANCH || 
            baseURL === URL.PRODIGY_STAGING ||
            baseURL === URL.PRODIGY_LOCAL_STAGING
            ? 'Alissa3N' : 'AlissaN332';
        await use(value);
    }, 
    pass: async({baseURL}, use) => {
        const value = 
            baseURL === URL.PRODIGY_FEATURE_BRANCH || 
            baseURL === URL.PRODIGY_STAGING ||
            baseURL === URL.PRODIGY_LOCAL_STAGING
            ? 'tree77' : '@1I$$@';
        await use(value);
    }
});

export const expect = base.expect;
export const test_suite = base.describe;  // can use this instead of test.describe if desired