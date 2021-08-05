import { BrowserContextOptions } from '@playwright/test';
import type { Page, ViewportSize } from 'playwright';
import { Coordinates } from '../support/types';
import { Login } from './login.class';
import { getObjPosition } from '../support/functions/functions_objects';
import { AUTOMATION_OBJS, COORD_OFFSET } from '../support/const_objects';
import { closeMemPopupIfVisible } from '../support/functions/functions_popups';

export class Shiverchill {
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

    async goToShiverchillFromHome () {
        await this.login.initialLogin();
        await this.login.playFromHome();
        await this.goToShiverchill(); 

        // click close button on Membership pop-up if it appears
        // only appears after school hours when playing from home
        await closeMemPopupIfVisible(this.login.page, this.login.scale);   
    }

    async goToShiverchillFromSchool () {
        await this.login.initialLogin();
        await this.login.playFromSchool();
        await this.goToShiverchill(); 
    }

    // common steps for both home and school
    private async goToShiverchill() {
        // click world map btn
        const worldMapBtn: Coordinates = await getObjPosition(this.login.page, 'name', AUTOMATION_OBJS.WORLD_MAP_BTN, 'worldPosition');
        await this.login.page.mouse.click(
            worldMapBtn.x * this.login.scale.scaleX + COORD_OFFSET, 
            worldMapBtn.y * this.login.scale.scaleY + COORD_OFFSET
        );

        // click Shiverchill obj on map
        const shiverchillObj: Coordinates = await getObjPosition(this.login.page, 'frame', AUTOMATION_OBJS.SHIVERCHILL_GRAPHIC);
        await this.login.page.mouse.click(
            shiverchillObj.x * this.login.scale.scaleX + COORD_OFFSET, 
            shiverchillObj.y * this.login.scale.scaleY + COORD_OFFSET
        );

        // click play btn on PvE screen
        const playBtn: Coordinates = await getObjPosition(this.login.page, 'name', AUTOMATION_OBJS.PVE_PLAY_BTN, 'worldPosition');
    
        await this.login.page.mouse.click(
            playBtn.x * this.login.scale.scaleX + COORD_OFFSET, 
            playBtn.y * this.login.scale.scaleY + COORD_OFFSET
        );  
    }
}