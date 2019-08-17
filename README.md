# Ultimate Zip

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/) [![travis ci](https://travis-ci.org/steelgrave/ultimate-zip.svg?branch=master)](https://shields.io/) [![codecov](https://codecov.io/gh/steelgrave/ultimate-zip/branch/master/graph/badge.svg)](https://codecov.io/gh/steelgrave/ultimate-zip) ![David](https://img.shields.io/david/dev/steelgrave/ultimate-zip)
___
**Ultimate Zip is a pure JavaScript implementation of a ZIP file with friendly APIs for [NodeJS](https://nodejs.org).**

:point_right: **Fast extraction times and low memory footprint**<br/>
:point_right: **Works in async and sync modes**<br/>
:point_right: **Supports NodeJS 6+**<br/>

## Table of Contents
 * [Ultimate Zip](#ultimate-zip)
 * [Table of Contents](#table-of-contents)
 * [Project Status](#project-status)
 * [Getting Started](#getting-started)
   * [Installation](#installation)
   * [Basic Usage](#basic-usage)
 * [Testing](#testing)
   * [Setup](#setup)
   * [Running Tests](#running-tests)
   * [Code Coverage](#code-coverage)
 * [Code Examples](#code-examples)
   * [Async API](#async-api)
   * [Sync API](#sync-api)
 * [Dependencies](#dependecies)
 * [License](#license)

## Project Status
___
It is a work in progress.
**To-dos:**
- add compression support
- add more unit tests

## Getting Started
___
### Installation

Install ultimate-zip with [NPM](https://www.npmjs.com)
```
$ npm install ultimate-zip
```
### Basic Usage
In your favorite editor..
```javascript
import UZip from 'something'

// create instance
const uzip = new UZip('/home/fancy.zip')

// extract archive
uzip.extractArchive('/home/extracted').then(() => {
    console.log('Success!')
}).catch((err) => {
    console.log('Error!')
})
```
## Testing
___
### Setup
Clone the repository
```
$ git clone https://github.com/steelgrave/ultimate-zip.git
```
Install with [NPM](https://www.npmjs.com)
```
$ npm install
```
### Running Tests
Run all tests
```
$ npm test
```
Run only unit tests
```
$ npm run unit
```
Run only integration tests
```
$ npm run integration
```
### Code Coverage
Generate code coverage report
```
$ npm run coverage
```
## Code Examples
___
### Async API
**ECMA 5** (callbacks)
```javascript
const UZip = require('something')

// create instance
const uzip = new UZip('/home/fancy.zip')

// extract archive
uzip.testArchive('/home/extracted', function (err) {
    if (!err)
        console.log('Success!')
)

// test archive
uzip.testArchive('/home/extracted', function (err) {
    if (!err)
        console.log('Success!')
)

// get zip entries
uzip.getEntries(function (err, entries) {

    if (!err)
        console.log('Success getting entries!')

    // iterate zip file entries
    for (const entry of entries) {

        // extract entry to disk
        entry.extract('/home/extracted_file', function(err) {
            if (!err)
                console.log('Success!')
        )

        // extract entry to buffer
        entry.getAsBuffer('/home/extracted_file', function(err, buffer) {
            if (!err)
                console.log('Success!')
        )

        // get extracted entry as a stream
        entry.getAsStream('/home/extracted_file', function(err, stream) {
            if (!err)
                console.log('Success!')
        )
        // test entry
        entry.test(function(err) {
            if (!err)
                console.log('entry is OK!')
        )
    }
)
```
**ECMA 6** (promises)
```javascript
import UZip from 'something'

// create instance
const uzip = new UZip('/home/fancy.zip')

// extract archive
uzip.testArchive('/home/extracted').then(() => {
    console.log('Success!')
}).catch((err) => {
    console.log('Error!')
})

// test archive
uzip.testArchive('/home/extracted').then(() => {
    console.log('Success!')
}).catch((err) => {
    console.log('Error!')
})

// get zip entries
uzip.getEntries().then((entries) => {

    for (const entry of entries) {

        // extract entry to disk
        entry.extract('/home/extracted_file').then(() => {
            console.log('success extracting!')
        ).catch((err) => {
            console.log('error extracting!')
        )

        // extract entry to buffer
        entry.getAsBuffer().then((buffer) => {
            console.log(buffer.toString('utf8'))
        ).catch((err) => {
            console.log('error extracting!')
        )

        // get extracted entry as a stream
        entry.getAsStream().then((stream) => {
            stream.pipe(console.log)
        ).catch((err) => {
            console.log('error extracting!')
        )

        // test entry
        entry.test().then(() => {
            console.log('Entry is OK!!')
        ).catch((err) => {
            console.log('failed testing entry!')
        )
    }
}).catch((err) => {
    console.log('error reading zip file entries!')
})
```
**ECMA 8** (async/await)
```javascript
import UZip from 'something'

// create instance
const uzip = new UZip('/home/fancy.zip')

// extract archive
try {
    await uzip.extractArchive('/home/extracted')
    console.log('archive extracted!')
} catch (err) {
    console.log('error extracting archive!')
}

// test archive
try {
    await uzip.testArchive()
    console.log('archive is ok!')
} catch (err) {
    console.log('error testing archive!')
}

// get zip entries
const entries = await uzip.getEntries()
for (const entry of entries) {

    // extract entry to disk
    try {
        await entry.extract('/home/extracted_file')
        console.log('success extracting!')
    } catch (err) {
        console.log('error extracting!')
    }

    // extract entry to buffer
    try {
        const buffer = await entry.getAsBuffer()
        console.log(buffer.toString('utf8'))
    } catch (err) {
        console.log('error extracting!')
    }

    // get extracted entry as a stream
    try {
        const stream = entry.getAsStream()
        stream.pipe(console.log)
    } catch (err) {
        console.log('error extracting!')
    }

    // test entry
    try {
        await entry.test()
        console.log('Entry is OK!!')
    } catch (err) {
        console.log('failed testing entry!')
    }
}
```
### Sync API
```javascript
// if ECMA 5
const UZip = require('something')

// if ECMA 6 and up
import UZip from 'something'

// create instance
const uzip = new UZip('/home/fancy.zip')

// extract archive
try {
    uzip.extractArchiveSync('/home/extracted')
    console.log('archive extracted!')
} catch (err) {
    console.log('error extracting archive!')
}

// test archive
try {
    uzip.testArchiveSync()
    console.log('archive is ok!')
} catch (err) {
    console.log('error testing archive!')
}

// get zip entries
const entries = uzip.getEntriesSync()
for (const entry of entries) {

    // extract entry to disk
    try {
        entry.extractSync('/home/extracted_file')
        console.log('success extracting!')
    } catch (err) {
        console.log('error extracting!')
    }

    // extract entry to buffer
    try {
        const buffer = entry.getAsBufferSync()
        console.log(buffer.toString('utf8'))
    } catch (err) {
        console.log('error extracting!')
    }

    // test entry
    try {
        entry.testSync()
        console.log('Entry is OK!!')
    } catch (err) {
        console.log('failed testing entry!')
    }
}
```
## Dependencies
 none
#### devDependencies
 - **[babel](https://babeljs.io)**
 - **[eslint](https://eslint.org)**
 - **[jest](https://jestjs.io)**

## License
___
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
