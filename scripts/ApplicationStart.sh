#!/bin/bash
cd App
pm2 serve build/ 3000 --name "react-build" --spa
pm2 startup
pm2 save
pm2 restart all