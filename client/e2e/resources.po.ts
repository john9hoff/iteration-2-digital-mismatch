import {browser, element, by, promise, ElementFinder} from 'protractor';
import {Key} from 'selenium-webdriver';

export class ResourcePage {
    navigateTo(): promise.Promise<any> {
        return browser.get('/resource');
    }

    highlightElement(byObject) {
        function setStyle(element, style) {
            const previous = element.getAttribute('style');
            element.setAttribute('style', style);
            setTimeout(() => {
                element.setAttribute('style', previous);
            }, 200);
            return 'highlighted';
        }

        return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: red; background-color: yellow;');
    }

    getResourceManageTitle() {
        const title = element(by.id('Resource-title')).getText();
        this.highlightElement(by.id('Resource-title'));

        return title;
    }

    selectDownKey() {
        browser.actions().sendKeys(Key.ARROW_DOWN).perform();
    }

    selectEnter() {
        browser.actions().sendKeys(Key.ENTER).perform();
    }

    getUniqueResource(anID: string) {
        const Resource = element(by.id(anID)).getText();
        this.highlightElement(by.id(anID));

        return Resource;
    }

    getResourceName() {
        const name = element(by.id('Resource-name')).getText();
        this.highlightElement(by.id('Resource-name'));

        return name;
    }

    getResources() {
        return element.all(by.className('resource-card')).count();
    }

    buttonExists(): promise.Promise<boolean> {
        this.highlightElement(by.id('addNewresource'));
        return element(by.id('addNewresource')).isPresent();
    }

    clickAddResourceButton(): promise.Promise<void> {
        this.highlightElement(by.className('Resource-button'));
        return element(by.className('Resource-button')).click();
    }

    pickChoresOption(){
        const input = element(by.id('category-list'));
        input.click();
        this.selectEnter();
    }

    actuallyAddResource() {
        const input = element(by.id('confirmAddREsourceButton'));
        input.click();
    }

}