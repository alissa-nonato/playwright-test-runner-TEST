import { Page } from '@playwright/test';
import { isObjVisible, getObjPosition } from './functions_objects';
import { Coordinates, WindowScale } from '../types';
import { AUTOMATION_OBJS, COORD_OFFSET, TIMEOUT_MS } from '../const_objects';

export async function closeMemPopupIfVisible (
    page: Page, 
    scale: WindowScale
): Promise<void> {
    const isVisible: boolean = await isObjVisible(page, 'name', AUTOMATION_OBJS.MEM_CLOSE_BTN, 'worldVisible', TIMEOUT_MS.HALF_SEC, 5);
    
    if(isVisible) {
        const closeBtn: Coordinates = await getObjPosition(page, 'name', AUTOMATION_OBJS.MEM_CLOSE_BTN, 'worldPosition');
    
        await page.mouse.click(
            closeBtn.x * scale.scaleX + COORD_OFFSET, 
            closeBtn.y * scale.scaleY + COORD_OFFSET
        );
    } 
}

export async function closeParentLinkPopupIfVisible (
    page: Page, 
    scale: WindowScale
): Promise<void> {
    const isVisible: boolean = await isObjVisible(page, 'name', AUTOMATION_OBJS.PARENT_LINK_OKAY_BTN, 'worldVisible', TIMEOUT_MS.HALF_SEC, 2);

    if(isVisible) {
        const parentLinkOkayBtn: Coordinates = await getObjPosition(page, 'name', AUTOMATION_OBJS.PARENT_LINK_OKAY_BTN, 'worldPosition');

        await page.mouse.click(
            parentLinkOkayBtn.x * scale.scaleX + COORD_OFFSET, 
            parentLinkOkayBtn.y * scale.scaleY + COORD_OFFSET
        );
    }
}