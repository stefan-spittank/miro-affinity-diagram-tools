![build](https://github.com/stefan-spittank/miro-affinity-diagram-tools/actions/workflows/nodejs.yml/badge.svg)
[![codecov](https://codecov.io/gh/stefan-spittank/miro-affinity-diagram-tools/branch/master/graph/badge.svg?token=R59DMNEF1A)](https://codecov.io/gh/stefan-spittank/miro-affinity-diagram-tools)

# About this miro plugin
This miro plugin helps you, to import user interview protocols, to be
able to create an affinity diagram in a shared interpretation session.

Optionally you can assign a user code to each protocol you are
importing. This could be helpful to easily identify the original
protocol in future discussions.

Paste the raw text protocol in the importer and the plugin will create a sticker
for each paragraph. You can later modify the sticker text (e.g. for
brevity) while keeping the original text in the stickers meta data.

# Developing the miro plugin

## How to start:

- Run `yarn`
- Run `yarn start` to start developing, you should have a URL
  that looks like this

```
http://localhost:3000
```

- Paste the URL in `App URL` in your app settings
- open a board & you should see your app in the main toolbar when you click the
  three dots.

## How to build the app:

Run `yarn run build` and this will generate a static output
inside `dist/` which you can host on static hosting service.

### About the app

This app is using [vite](https://vitejs.dev/) so you can check the documentation
if you want to modify `vite.config.js` configuration if needed.
