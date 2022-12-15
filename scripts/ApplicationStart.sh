#!/bin/bash
cd App
npm run build
pm2 serve build/ 3000 --name "react-build" --spa
pm2 startup
pm2 save
pm2 restart all