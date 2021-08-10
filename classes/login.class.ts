import { ViewportSize, Page, TestInfo } from '@playwright/test';
import { Coordinates, WindowScale  } from '../support/types';
import { CSS_SELECTORS, RESPONSE_URL, URL, TIMEOUT_MS, COORD_OFFSET, AUTOMATION_OBJS } from '../support/const_objects';
import { isLowEndDevice, closeLowEndDevicePopup, getWinScale } from '../support/functions/functions_devices';
import { getObjPosition } from '../support/functions/functions_objects';
import { BrowserContextOptions } from '@playwright/test';
import { closeParentLinkPopupIfVisible } from '../support/functions/functions_popups';
import { setWorkerIndexTimeout } from '../support/functions/functions_misc';

export class Login {
    readonly page: Page;
    readonly url: string;
    readonly user: string;
    readonly pass: string;
    readonly contextOptions: BrowserContextOptions;
    readonly viewport: ViewportSize;
    readonly workerInfo: TestInfo;
    public scale: WindowScale;

    constructor(
        page: Page, 
        url: string, 
        user: string, 
        pass: string, 
        contextOptions: BrowserContextOptions, 
        viewport: ViewportSize,
        workerInfo: TestInfo
    ) {
        this.page = page;
        this.url = url;
        this.user = user;
        this.pass = pass;
        this.contextOptions = contextOptions;
        this.viewport = viewport;
        this.workerInfo = workerInfo;
    }

    async initialLogin() {
        this.scale = await getWinScale(this.viewport, this.contextOptions);
        
        await this.page.goto(this.url);   
        
        await Promise.all([
            this.page.waitForNavigation(),             // The promise resolves after navigation has finished
            this.page.click(CSS_SELECTORS.LOGIN_BTN)   // Clicking the 'Log in' button will indirectly cause a navigation
        ]);
    
        // Type into the username and password fields and click Enter to log in
        await this.page.fill('.game-login-username', this.user);
        await this.page.fill('.game-login-password', this.pass);

        const responseURL = 
            this.url === URL.PRODIGY_FEATURE_BRANCH || this.url === URL.PRODIGY_STAGING
            ? RESPONSE_URL.HOME_SCHOOL_SCREEN : RESPONSE_URL.INITIAL_LOGIN_SCREEN;

        // set workerIndex delay before clicking Login button
        await setWorkerIndexTimeout(this.page, this.workerInfo);
        
        await Promise.all([           
            this.page.waitForResponse(responseURL),                 // Waits for the next response with the specified url (RegEx)
            this.page.click(`span >> ${CSS_SELECTORS.LOGIN_BTN}`)   // Clicking button triggers the response
        ]); 

        await this.page.waitForTimeout(TIMEOUT_MS.ONE_SEC);
        
        // close popup if on older mobile device
        if (this.contextOptions.viewport !== undefined && await isLowEndDevice(this.contextOptions)) {
            await closeLowEndDevicePopup(this.page, this.scale);
        } 
    }

    async playFromHome() {
        const homeTxt: Coordinates = await getObjPosition(this.page, 'name', AUTOMATION_OBJS.HOME_TXT, 'worldPosition', TIMEOUT_MS.ONE_SEC);
        await this.page.mouse.click(
            homeTxt.x * this.scale.scaleX + COORD_OFFSET, 
            homeTxt.y * this.scale.scaleY + COORD_OFFSET
        );

        const moreWorldsBtn: Coordinates = await getObjPosition(this.page, 'name', AUTOMATION_OBJS.MORE_WORLDS_BTN, 'worldPosition');  
        await this.page.mouse.click(
            moreWorldsBtn.x * this.scale.scaleX + COORD_OFFSET, 
            moreWorldsBtn.y * this.scale.scaleY + COORD_OFFSET
        );

        const airmeldTxt: Coordinates = await getObjPosition(this.page, 'text', AUTOMATION_OBJS.WORLD_AIRMELD_TXT, 'worldPosition');
        await this.page.mouse.click(
            airmeldTxt.x * this.scale.scaleX + COORD_OFFSET, 
            airmeldTxt.y * this.scale.scaleY + COORD_OFFSET
        );            
    }

    async playFromSchool() {
        const schoolTxt: Coordinates = await getObjPosition(this.page, 'name', AUTOMATION_OBJS.SCHOOL_TXT, 'worldPosition', TIMEOUT_MS.TWO_SECS);
        
        await this.page.mouse.click(
            schoolTxt.x * this.scale.scaleX + COORD_OFFSET, 
            schoolTxt.y * this.scale.scaleY + COORD_OFFSET
        );

        // taking into account parent link popup
        await closeParentLinkPopupIfVisible(this.page, this.scale);
    }
}
