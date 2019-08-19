# Ultimate Zip

[![travis ci](https://travis-ci.org/steelgrave/ultimate-zip.svg?branch=master)](https://shields.io/) [![codecov](https://codecov.io/gh/steelgrave/ultimate-zip/branch/master/graph/badge.svg)](https://codecov.io/gh/steelgrave/ultimate-zip) ![David](https://img.shields.io/david/dev/steelgrave/ultimate-zip) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/919188fe12a04fe1a7e1457d9f5f7cb5)](https://www.codacy.com/app/steelgrave/ultimate-zip?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=steelgrave/ultimate-zip&amp;utm_campaign=Badge_Grade) ![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability-percentage/steelgrave/ultimate-zip)
___
#### Ultimate Zip is a pure JavaScript implementation of a ZIP Archive with friendly APIs for [NodeJS](https://nodejs.org)

:point_right: _Fast extraction times and low memory footprint_<br/>
:point_right: _Works in async and sync modes_<br/>
:point_right: _Supports NodeJS 6 and UP_<br/>
:point_right: _Actively maintained_<br/>

## Table of Contents
* [Ultimate Zip](#ultimate-zip)

* [Table of Contents](#table-of-contents)
* [About](#about)
  * [Authors](#author)
  * [Motivation](#motivation)
  * [Philosophy](#philosophy)

* [Project Status](#project-status)
    * [Versions](#versions)
  * [Limitations](#limitations)
  * [To Do](#to-do)
* [Getting Started](#getting-started)
  * [Installation](#installation)
  * [Basic Usage](#basic-usage)
  * [Dependencies](#dependencies)
* [Testing](#testing)
  * [Setup](#setup)
  * [Running Tests](#running-tests)
  * [Code Coverage](#code-coverage)
* [Code Examples](#code-examples)
  * [Async API](#async-api)
  * [Sync API](#sync-api)
* [License](#license)
___
## About
Fast and lightweight JavaScript Zip Archive library.<br/>
Works both async or sync modes with clean and beautiful APIs while keeping memory footprint at low.
Written in pure JavaScript (ECMA 9 standart), transpiled with babel and backed by NodeJS zlib module without any external dependecies.
Comprehensive tests, unit and integration, as a part of the project philosophy.
### Authors
**Leonid Weinberg** (leonwbrg@gmail.com)
### Motivation
As a NodeJS web services and tools developer, I'm often working with Zip Archives.
However after having a hard time finding any established, well maintaned and well tested JavaScript Zip library with simple usage,
I decided to create one myself!
### Philosophy
* Friendly APIs
* Well tested
* Lightweight & small code base
___
## Project Status
Active development
### Versions
No major versions released yet<br/><br/>
_This project is using [SemVer](https://semver.org) convention_
### Limitations
 1. Multiple volumes Zip Archive is not supported
 2. Ecnrypted Zip Archive is not suported
### To Do
Unit and integration tests
___
## Getting Started
### Installation
Install ultimate-zip with [NPM](https://www.npmjs.com)
```
$ npm install ultimate-zip
```
### Basic Usage
In your favorite editor
```javascript
// async mode
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
```javascript
// sync mode
const UZip = require('something')

// create instance
const uzip = new UZip('/home/fancy.zip')

// extract archive
try {
    uzip.extractArchiveSync('/home/extracted')
    console.log('archive extracted!')
} catch (err) {
    console.log('error extracting archive!')
}
```
Explore additional APIs in the [Code Examples section](#code-examples)
### Dependencies
none
___
## Testing
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
___
## Code Examples
### Async API
**ECMA 5** (callbacks)
```javascript
var UZip = require('something')

// create instance
var uzip = new UZip('/home/fancy.zip')

// extract archive
uzip.testArchive('/home/extracted', function(err) {
    if (!err)
        console.log('Success!')
)

// test archive
uzip.testArchive('/home/extracted', function(err) {
    if (!err)
        console.log('Success!')
)

// get zip entries
uzip.getEntries(function(err, entries) {

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
const UZip = require('something')

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
const UZip = require('something')

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
const UZip = require('something')

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
___
# License
MIT License<br/>
Copyright (c) 2019 Leonid Weinberg<br/>
See the [LICENSE](LICENSE) file for details
