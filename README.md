# pageflow-figma-plugin

PageFlow allows you to quickly create pages your team uses in its workflow as you need them.

[Video of Pageflow 1.0 in action](PageFlow-1.0.0.mp4)

The plugin is VERY early in development. 

UI is built with ...

* Vue.js
* [Figma plugin ds](https://github.com/thomas-lowry/figma-plugin-ds#components)

## Build

```sh
$ yarn build
```

## Include in figma

* Clone this repo somewhere on your local system
* yarn 
* yarn build
* In figma:
  * Hamburger menu (wtf is that called?) > Plugins > More > Development > New plugin...
  * Click to select a manifest file
  * Select the cloned folder and click manifest.json
