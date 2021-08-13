import { test, test_suite } from '../fixtures/login.fixture';
import { URL } from '../support/const_objects';
import { HudButtons } from '../classes/hud_buttons.class';

// Use fixture
test.use({baseURL: URL.PRODIGY_FEATURE_BRANCH});

test_suite('Validate Backpack Categories', () => {
    //test.skip();
    test('should load all assets in backpack categories', async ({page, contextOptions, baseURL, user, pass, viewport}, workerInfo) => {
        test.slow();
    
        const hb = new HudButtons(page, baseURL, user, pass, contextOptions, viewport, workerInfo); 

        // assertion is in this function
        await hb.checkBackpackCategories('home');   // value can be 'home' or 'school'
    });
});