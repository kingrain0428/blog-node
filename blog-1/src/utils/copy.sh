#!/bin/sh
cd /Users/wangyu/Person/nodejs/blog-1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log