import { test, expect, describe } from '../fixtures/login.fixture';
import { getObjProperty } from '../support/functions/functions_objects';
import { URL, AUTOMATION_OBJS } from '../support/const_objects';
import { Login } from '../classes/login.class';

// Use fixture
test.use({baseURL: URL.PRODIGY_FEATURE_BRANCH});

test.describe('Log in from home', () => {
    test.skip();
    test('should log in', async ({page, baseURL, user, pass, contextOptions, viewport}) => {
        //test.skip();
        test.slow();
        
        const login = new Login(page, baseURL, user, pass, contextOptions, viewport);
        await login.initialLogin();
        
        const screen: string = await getObjProperty(page, 'key', AUTOMATION_OBJS.CHAR_SEL_SCREEN);
        expect(screen).toStrictEqual(AUTOMATION_OBJS.CHAR_SEL_SCREEN);
    });


    test('should enter the game from home', async ({page, contextOptions, baseURL, user, pass, viewport}) => {
        //test.skip();
        test.slow();

        const login = new Login(page, baseURL, user, pass, contextOptions, viewport);
        await login.initialLogin();
        
        await login.playFromHome();

        const worldMapBtn: string = await getObjProperty(page, 'name', AUTOMATION_OBJS.WORLD_MAP_BTN);
        expect(worldMapBtn).toStrictEqual(AUTOMATION_OBJS.WORLD_MAP_BTN);
    });

    test('should enter the game from school', async ({page, contextOptions, baseURL, user, pass, viewport}) => {
        //test.skip();
        test.slow();

        const login = new Login(page, baseURL, user, pass, contextOptions, viewport);
        await login.initialLogin();
        
        await login.playFromSchool();

        const worldMapBtn: string = await getObjProperty(page, 'name', AUTOMATION_OBJS.WORLD_MAP_BTN);
        expect(worldMapBtn).toStrictEqual(AUTOMATION_OBJS.WORLD_MAP_BTN);
    });
});