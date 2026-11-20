# Guidelines music website

Live site: https://charming-kringle-5f08d5.netlify.app/

A music website with a tracklist, individual track pages, artwork and social links. Built with HTML, CSS and JavaScript, including a custom media-player interface.

## Run locally

No build step is required. Serve this folder with any static web server, for example:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Repository contents

- `index.html`: home page
- `tracklist.html` and `track1.html` through `track16.html`: track pages
- `artwork.html`, `socials.html`, `song_page.html`: supporting pages
- `mobile.css`, `wmp-player.css`, `wmp-player.js`: styling and player behavior
- `bg.jpg`, `mixtape-artwork.png`: artwork

## Media and recovery notes

Recovered from the published Netlify Drop deployment on 20 November 2026. This repository contains the deployed HTML, CSS, JavaScript and image assets, not an earlier authoring history.

The two original `.mov` videos remain hosted on the live Netlify site. Video references use those live URLs so the repository stays small and works without committing large media files. They are not included in this repository. The live Netlify deployment has not been changed.
