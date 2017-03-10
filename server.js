'use strict';
const awsscripts = require('./awsscripts');

const aws = new awsscripts();
aws.unusedElasticIPs();
aws.unusedVolumes();
aws.unusedKeyPairs();