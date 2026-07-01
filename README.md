# 3D Solar System Explorer

An interactive 3D model of the Solar System built with [Three.js](https://threejs.org/). Pan, zoom, and rotate around the Sun, planets, and major moons. Click any object to view real-world information.

## Live demo

Hosted on GitHub Pages: https://meisam81.github.io/solar-system-explorer/

## Features

- Textured Sun, all 8 planets, and major moons
- Interactive camera controls: rotate, pan, zoom
- Hover tooltips and click-to-open info cards
- Adjustable orbit speed with pause/resume
- **Real-time now** button: positions the system at the current date/time and runs at real-life speed
- Procedural Saturn rings and fallback moon textures

## Run locally

Because the app uses ES modules and local textures, it must be served over HTTP rather than opened as a file.

### Option 1 — Python
```bash
python -m http.server 8000
```
Open `http://localhost:8000/`

### Option 2 — Node.js
```bash
npx serve .
```
Open the URL printed in the terminal.

## Project structure

```
.
├── index.html          # Page shell and UI
├── css/
│   └── style.css       # Layout and styling
├── js/
│   └── app.js          # Three.js scene and interaction logic
└── textures/           # Planet and sun textures
```

## Texture credits

Planet and sun textures are sourced from [Solar System Scope](https://www.solarsystemscope.com/textures/), which are based on NASA and other publicly available planetary imagery.

## License

MIT — feel free to use and modify. Please include credit to Solar System Scope / NASA for the textures.
