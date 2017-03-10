'use strict';
const AWS = require('aws-sdk');

AWS.config.region = process.argv[2]; //get region from command line
const ec2 = new AWS.EC2();

const awsscript = function () {};

//Find all unused elastic ip addresses in default_region
awsscript.prototype.unusedElasticIPs = function(params={}) {
    ec2.describeAddresses(params, function(err, data) {
        if (err) return;
        const eips = data.Addresses.filter(address => address.InstanceId === undefined)
            .map(address => address.PublicIp);
        console.log("free_elasticIPs:", eips);
    });
} 

//find unattached unused volumes
awsscript.prototype.unusedVolumes = function(params={}) {
    ec2.describeVolumes(params, function(err, data) {
        if (err) return;
        const unused_vol = data.Volumes.filter(volume => volume.State === 'available')
            .map(id => id.VolumeId);
        console.log("unattached_volumes:", unused_vol);    
    });
} 

//unused keypairs
awsscript.prototype.unusedKeyPairs = function(params={}) {
    ec2.describeInstances(params, function(err, data) {
        if (err) return;
        const used_keypairs = data.Reservations.map(ec2 => ec2.Instances)
            .map(id => id[0].KeyName);
        ec2.describeKeyPairs(params, function(err, data){
            if(err) return;
            const all_keypairs = data.KeyPairs.map(key => key.KeyName);
            const difference = all_keypairs.filter(key => used_keypairs.indexOf(key) === -1);
            console.log("unused_keypairs:", difference, "\n"); //add endline for readability
        });
    });
} 

module.exports = awsscript;