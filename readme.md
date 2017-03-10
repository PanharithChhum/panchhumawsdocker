Docker container node:boron with awscli and nodejs-aws-sdk added

1. Pull docker image from with
'docker pull panharithchhum/panchhumawsdocker'

2. Obtain access key with AmazonEC2ReadOnlyAccess policy and run with 
'docker run -e AWS_ACCESS_KEY_ID=<access_key> -e 
AWS_SECRET_ACCESS_KEY=<secret_access_key>  panchhumawsdocker'

3.Unused eIPs, volumes, and KeyPairs are printed to console
