#/bin/bash

#################################################################
# Install the directories for Server
#################################################################
APP_NAME=gmath
APP_ROOT=/app/$APP_NAME
SYSTEMD_ROOT=/etc/systemd/system
##################################################################
# installation begine
##################################################################


pushd $APP_ROOT
# install node application

echo 'hello' >> install.log 
npm install

# install systemd configuration
# cp -v gmath.service $SYSTEMD_ROOT/
popd
##################################################################
# start application
##################################################################
# systemctl restart gmath.service
