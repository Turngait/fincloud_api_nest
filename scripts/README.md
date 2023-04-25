# Description
This folder contains scripts for automatization.

## Check API scripts
In "check_api" contains scripts for checking api containers.

To use them you should copy them from that folder to another folder on your server and fill two fields in telegram.sh file - CHAT_ID and BOT_AUTH_TOKEN .

After you should set cron on your server to run web_service_check.sh script in time.

That script will check is a app and db modules are working. If not, then script will send a notification to your telegram account from telegram bot.

How to create telegram bot you can find in Google. :)