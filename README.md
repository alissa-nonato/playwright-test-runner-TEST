# ~ READ ME ~

## To run this on your own machine:

### Step 1
Run `npm install` in your local repository.<br> 
This will add the `node_modules` folder to your directory.

### Step 2
Run any of the following in your local repository:
* `npm test` to run `all the projects` in the config file (`playwright.test.config`) in parallel 
  * max number of workers currently set to 2
* `npm run iphone6` to only run the `iPhone 6` project
* `npm run chromium` to only run the `Chromium` project
* `npm run webkit` to only run the `WebKit` project
* `npm run pixel4` to only run the `iPhone 6` project
* `npm run allbrowsers` to run the tests in `Chromium, WebKit, and Firefox` in parallel
  * max number of workers currently set to 2
  * ***Note: You need to comment out the `projects` option in `playwright.test.config` for this to work.***

### Step 3
Remember to comment out `test.skip()` on certain tests that you want to run! :)
