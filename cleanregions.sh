for region in $(aws ec2 describe-regions --query "Regions[].RegionName" --output text); do
  echo $region
  node server.js $region
done
