'use strict';

const Puppeteer = require('puppeteer');

const internals = {};


exports.screenshot = async function (url, options = {}) {

    const browser = await Puppeteer.launch(options.launch);
    const page = await browser.newPage();
    await page.setViewport(options.viewport);
    await page.goto(url, options.goto);
    await page.screenshot(options.screenshot);
    return browser.close();
};
