import { test, expect, describe } from '../fixtures/login.fixture';
import { getObjProperty } from '../support/functions/functions_objects';
import { URL, AUTOMATION_OBJS, TIMEOUT_MS } from '../support/const_objects';
import { Shiverchill } from '../classes/shiverchill.class';

// Use fixture
test.use({baseURL: URL.PRODIGY_FEATURE_BRANCH});

test.describe('Travel to Shiverchill Mountains', () => {
    test.skip();
    test('should travel to Shiverchill from home', async ({page, contextOptions, baseURL, user, pass, viewport}) => {
        //test.skip();
        test.slow();
    
        const sc = new Shiverchill(page, baseURL, user, pass, contextOptions, viewport);     
        await sc.goToShiverchillFromHome();
    
        const bokNPC: string = await getObjProperty(page, 'name', AUTOMATION_OBJS.NPC_BOK, TIMEOUT_MS.ONE_SEC);
        expect(bokNPC).toStrictEqual(AUTOMATION_OBJS.NPC_BOK);
    });

    test('should travel to Shiverchill from school', async ({page, contextOptions, baseURL, user, pass, viewport}) => {
        //test.skip();
        test.slow();
    
        const sc = new Shiverchill(page, baseURL, user, pass, contextOptions, viewport);   
        await sc.goToShiverchillFromSchool();
    
        const bokNPC: string = await getObjProperty(page, 'name', AUTOMATION_OBJS.NPC_BOK, TIMEOUT_MS.ONE_SEC);
        expect(bokNPC).toStrictEqual(AUTOMATION_OBJS.NPC_BOK);
    });
});