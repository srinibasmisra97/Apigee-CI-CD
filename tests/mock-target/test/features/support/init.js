'use strict';

const apickli = require('apickli');
const {Before} = require('cucumber');

Before(function() {
    this.apickli = new apickli.Apickli('https', 'orgname-test.apigee.net');
    this.apickli.addRequestHeader('Cache-Control', 'no-cache');
});