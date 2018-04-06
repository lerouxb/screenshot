#!/usr/bin/env node

'use strict';

const Bossy = require('bossy');
const Open = require('open');

const Screenshot = require('../lib');


const internals = {};

internals.definition = {
    path: {
        type: 'string',
        require: true
    },
    url: {
        type: 'string',
        require: true
    },
    width: {
        type: 'number',
        default: 1024
    },
    height: {
        type: 'number',
        default: 768
    },
    fullPage: {
        type: 'boolean',
        default: false
    }
};

exports.screenshot = async function () {

    const args = Bossy.parse(internals.definition);
    if (args instanceof Error) {
        console.error(args.message);
        process.exit(1);
    }

    const { url, path, width, height, fullPage } = args;

    try {
        await Screenshot.screenshot(url, {
            viewport: {
                width,
                height
            },
            screenshot: {
                path,
                fullPage
            }
        });

        Open(path);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};

if (require.main === module) {
    exports.screenshot();
}
