# Temporary backup script
now=$(date +'%m_%d_%Y')
mkdir "$now"
cd /home/api/
cp -R db/ ../"$now"
