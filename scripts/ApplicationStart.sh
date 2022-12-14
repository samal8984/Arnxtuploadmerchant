#!/bin/bash
cd App/src
pm2 start npm --name "arnxtuploader" -- start
pm2 startup
pm2 save
pm2 restart all