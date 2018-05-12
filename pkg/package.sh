#!/usr/bin/env bash

################################################
# Packaging the application
################################################
APP_NAME=gmath
PKG_ROOT=../$APP_NAME-pkg

tar -czf ../$APP_NAME-pkg.tar.gz ../dist/
chmod 755 ../$APP_NAME-pkg.tar.gz
