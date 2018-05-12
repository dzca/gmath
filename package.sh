#!/usr/bin/env bash

################################################
# Packaging the application
# 1) create folder gmath
# 2) copy deploy.sh, gmath.service, package.json to gmath
# 3) copy gmath.5001.js, config.js and [dist] folder to gmath
# 4) zip gmath files to gmath-pkg.tar.gz
# 5) scp gmath.tar.gz to server
# 6) run deploy.sh on target server
################################################

PKG_ROOT=gmath-pkg
################################################
# utility functions begine
################################################

_make_dir()
{
    directory=$1
    if [ ! -d $directory ]
    then
        echo "making $directory"
        mkdir -p $directory
    fi
}
################################################
# utility functions end
################################################

_make_dir $PKG_ROOT

cp -v build/deploy.sh $PKG_ROOT/
cp -v build/gmath.service $PKG_ROOT/
cp -v gmath.5001.js $PKG_ROOT/
cp -v config.js $PKG_ROOT/
cp -v favicon.ico $PKG_ROOT/
cp -v package.json $PKG_ROOT/
cp -R -v dist $PKG_ROOT/

# remove gmath-pkg.tar.gz if there is any
if [ ! -e "$PKG_ROOT-pkg.tar.gz" ]
then
  rm -f $PKG_ROOT-pkg.tar.gz
fi

tar -czf gmath-pkg.tar.gz gmath-pkg/
chmod 755 gmath-pkg.tar.gz
