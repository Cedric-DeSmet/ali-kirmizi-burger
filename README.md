# Ali Kırmızı Burger

A responsive burger restaurant website for Ali Kırmızı Burger, made with React, Tailwind utility classes, and a live Three.js burger scene.

## Run It

```bash
npm run dev
```

Then open:

```text
http://127.0.0.1:5173
```

This project uses browser-loaded React, Tailwind, and Three.js so it can run without a package install. For a production deployment, the best next step is to convert the Tailwind CDN setup into a build step once local npm installation is available.

## Image Assets

The burger photos used in the hero, menu board, and craft section live in `src/assets`. They were copied into the project so the website does not depend on the original Desktop folder.

## Next Improvements

1. Add a real reservation flow with validation and a confirmation message.
2. Add an order flow with a cart, item options, allergens, and pickup or delivery choices.
3. Move menu items into a small data file so prices and descriptions are easy to update.
4. Replace CDN scripts with a production build when npm installation is available.
5. Add reviews, opening hours by day, a map, social links, and more accessibility checks.
