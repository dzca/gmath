#/bin/bash

#################################################################
# Install the directories for Server
#################################################################
APP_NAME=gmath
APP_ROOT=/app/$APP_NAME
SYSTEMD_ROOT=/etc/systemd/system
##################################################################
# utility functions begine
##################################################################

_make_dir()
{
    directory=$1
    if [ ! -d $directory ]
    then
        echo "making $directory"
        mkdir -p $directory
    fi
}

##################################################################
# stop application ?
##################################################################

##################################################################
# install node application
##################################################################

_make_dir $APP_ROOT

cp -v gmath.5001.js $APP_ROOT/
cp -v config.js $APP_ROOT/
cp -v package.json $APP_ROOT/
cp -R -v dist $APP_ROOT/

pushd $APP_ROOT
npm install
popd
##################################################################
# install systemd configuration
##################################################################

cp -v gmath.service $SYSTEMD_ROOT/

##################################################################
# start application
##################################################################
# systemctl restart gmath.service
