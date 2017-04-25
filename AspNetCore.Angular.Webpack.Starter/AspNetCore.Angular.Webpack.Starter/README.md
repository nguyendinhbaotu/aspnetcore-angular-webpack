# Asp .net core - Angular - Webpack
> Asp .net core - Angular - Webpack

## Precondition
Make sure you have Node version >= 5.0 and NPM >= 3.
You can check by runing commands below,
```
npm -v
node -v
```

And install Webpack as global
```
npm install webpack -g
```

## Installation
```
npm install
(npm install node-sass. Somebody was struggling with this package. So please install this package separetely.)
```

## Runing the app
### Development
```
set ASPNETCORE_ENVIRONMENT=Development
(or using following command if you are not able to set environment variable 'setx ASPNETCORE_ENVIRONMENT "Development"')


```
dotnet run
```

Start browser with http://localhost:5000

## Build
### Production
```
npm run build
```

## Lint
```
npm run lint
```

## Clean (wwwroot/)
```
npm run clean
```


## Publish to Folder
```
dotnet publish
```
