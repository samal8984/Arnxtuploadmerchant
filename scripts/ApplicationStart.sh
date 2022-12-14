#!/bin/bash
cd App
pm2 start ./node_modules/react-scripts/scripts/start.js --name "arnxtuploader" --watch
pm2 startup
pm2 save
pm2 restart all