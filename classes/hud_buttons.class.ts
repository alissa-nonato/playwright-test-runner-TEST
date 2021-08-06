import { BrowserContextOptions, ViewportSize, expect } from '@playwright/test';
import type { Page } from 'playwright';
import { Coordinates, PlayingFrom } from '../support/types';
import { Login } from './login.class';
import { getObjPosition } from '../support/functions/functions_objects';
import { AUTOMATION_OBJS, BACKPACK_CATEGORIES, COORD_OFFSET } from '../support/const_objects';

export class HudButtons {
    // add loginPage property
    readonly login: Login;

    constructor(
        page: Page, 
        url: string, 
        user: string, 
        pass: string, 
        contextOptions: BrowserContextOptions, 
        viewport: ViewportSize
    ) {
        // initialize login object 
        this.login = new Login(page, url, user, pass, contextOptions, viewport);
    }

    async checkBackpackCategories (playingFrom: PlayingFrom) {
        await this.login.initialLogin();

        playingFrom === 'home' ? await this.login.playFromHome() : await this.login.playFromSchool();
        
        const backpackBtn: Coordinates = await getObjPosition(this.login.page, 'name', AUTOMATION_OBJS.BACKPACK_BTN, 'worldPosition');
        await this.login.page.mouse.click(
            backpackBtn.x * this.login.scale.scaleX + COORD_OFFSET, 
            backpackBtn.y * this.login.scale.scaleY + COORD_OFFSET
        );
        
        // loop through all the backpack categories and click them
        for (const property in BACKPACK_CATEGORIES) {
            // skip the Hats category since it's chosen by default
            if(BACKPACK_CATEGORIES[property] !== BACKPACK_CATEGORIES.HATS) {
                const categoryTxt: Coordinates = await getObjPosition(this.login.page, 'text', BACKPACK_CATEGORIES[property], 'worldPosition');
                await this.login.page.mouse.click(
                    categoryTxt.x * this.login.scale.scaleX + COORD_OFFSET, 
                    categoryTxt.y * this.login.scale.scaleY + COORD_OFFSET
                );
            }

            await this.login.page.waitForTimeout(300);

            // assert that the screenshot matches the image on file (with a threshold of 1)
            expect(await this.login.page.screenshot()).toMatchSnapshot(`${BACKPACK_CATEGORIES[property]}.png`);   
        }
    }
}
