{
  "name": "durandal/amd/almond-custom",
  "inlineText": true,
  "stubModules": [
    "durandal/amd/text"
  ],
  "paths": {
    "text": "durandal/amd/text"
  },
  "baseUrl": "D:\\dev\\HotTowel\\HotTowelExample\\packages\\Durandal.1.1.1\\content\\App",
  "mainConfigFile": "D:\\dev\\HotTowel\\HotTowelExample\\packages\\Durandal.1.1.1\\content\\App\\main.js",
  "include": [
    "durandal/app",
    "durandal/composition",
    "durandal/events",
    "durandal/http",
    "text!durandal/messageBox.html",
    "durandal/messageBox",
    "durandal/modalDialog",
    "durandal/system",
    "durandal/viewEngine",
    "durandal/viewLocator",
    "durandal/viewModel",
    "durandal/viewModelBinder",
    "durandal/widget"
  ],
  "exclude": [],
  "keepBuildDir": true,
  "optimize": "uglify2",
  "out": "D:\\dev\\HotTowel\\HotTowelExample\\packages\\Durandal.1.1.1\\content\\App\\main-built.js",
  "pragmas": {
    "build": true
  },
  "wrap": true,
  "insertRequire": [
    "main"
  ]
}