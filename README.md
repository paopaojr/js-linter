# static-html-skeleton
Skeleton project of static Javascript/HTML/SASS enforced with linters & performance aware.

### What included
- ESlint for javscript
- SASSLint for SASS
- HTMLLint for html
- Unused css rules linter
- QUnit for functional test
- Webpack configuration for dev & prod env
- Simple HTTP server with gzip accept
- Various helpers in package.json scripts

## Installing
```bash
npm install
```

## Developing
```bash
npm run start:dev
```

Then go to your favourite and navigate to `http://localhost:8080`

**port might be changed, please check in `http-server` output**

## Building
```bash
npm run build:prod
```

Built files will be in **`dist-prod`** folder

## Testing
```bash
npm run test
```
