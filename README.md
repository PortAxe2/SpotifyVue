# Mini Player For Spotify

This project was built using Vue.js with the aim of being a Mini Player for Spotify. At the time of writing, capabilities include:

- Fetching all the songs in the current context (paginated in the context of 'Liked Songs')
- Playback Control (previous, pause/play, next, time seek)
- Queuing songs

A version of this app is hosted on https://mini-player-for-spotify.web.app/.
To utilize it, and since this project is still in development, the user must use his own Spotify Developer Client ID and Client Secret. Both of these are only stored locally and send to the Spotify API to generate the token needed to get/send data and commands.

## SpotifyVue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```
