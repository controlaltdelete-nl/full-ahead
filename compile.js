#!/usr/bin/env node

/**
 *    ______            __             __
 *   / ____/___  ____  / /__________  / /
 *  / /   / __ \/ __ \/ __/ ___/ __ \/ /
 * / /___/ /_/ / / / / /_/ /  / /_/ / /
 * \______________/_/\__/_/   \____/_/
 *    /   |  / / /_
 *   / /| | / / __/
 *  / ___ |/ / /_
 * /_/ _|||_/\__/ __     __
 *    / __ \___  / /__  / /____
 *   / / / / _ \/ / _ \/ __/ _ \
 *  / /_/ /  __/ /  __/ /_/  __/
 * /_____/\___/_/\___/\__/\___/
 *
 * This file loops over all themes, removes the tailwind.css file and then recompiles it. The deletion is to prevent
 * Magento it from symlinking when in developer mode.
 */

const { readdirSync, unlinkSync, mkdirSync } = require('fs')
const resolve = require('path').resolve
const glob = require("glob")
const { spawn } = require("child_process")

const getMagentoBasePath = function (directory = '../') {
    const hasBin = readdirSync(directory).includes('bin');

    if ((directory.match(/\//g) || []).length > 5) {
        throw 'bin/magento binary not found, unable to detect location'
    }

    if (!hasBin) {
        return getMagentoBasePath(directory + '../');
    }

    if (!readdirSync(directory + 'bin/').includes('magento')) {
        throw 'The bin folder is found but the Magento executable does not exist!?'
    }

    return resolve(directory);
}

const path = getMagentoBasePath();

glob(path + '/pub/static/frontend/*/*/*/ControlAltDelete_FullAhead/css/tailwind.css', (error, files) => {
    files.forEach(file => {
        unlinkSync(file);

        if (process.argv.includes('--vebose')) {
            console.log('Unlinked', file)
        }
    })
})

const getCommand = path => {
    if (process.argv.includes('--production')) {
        return {
            executable: 'NODE_ENV=production node_modules/.bin/postcss',
            arguments: ['tailwind.css', '--verbose', '--config postcss/production', '--output ' + path]
        }
    }

    if (process.argv.includes('--watch')) {
        return {
            executable: 'TAILWIND_MODE=watch node_modules/.bin/postcss',
            arguments: ['tailwind.css', '--verbose', '--config postcss/dev', '--output ' + path, '--watch']
        }
    }

    return {
        executable: 'node_modules/.bin/postcss',
        arguments: ['tailwind.css', '--verbose', '--config postcss/dev', '--output ' + path]
    }
}

glob(path + '/pub/static/frontend/*/*/*/', (error, files) => {
    files.forEach(file => {
        mkdirSync(file + '/ControlAltDelete_FullAhead/css', {recursive: true});

        const cssPath = file + '/ControlAltDelete_FullAhead/css/tailwind.css'
        const command = getCommand(cssPath);

        if (process.argv.includes('--verbose')) {
            console.info('Executing', command.executable + ' ' + command.arguments.join(' '));
        }

        spawn(command.executable, command.arguments, { shell: true, stdio: 'inherit' });
    })
});
