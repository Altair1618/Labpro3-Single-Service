#!/bin/sh

npm i -g prisma
npx prisma generate
npx prisma migrate deploy
npx prisma generate
npm run build
npm run start
