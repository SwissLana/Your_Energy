# Your Energy

Your Energy is a responsive fitness web application that helps users discover exercises, explore workout categories, save favorite workouts, and submit ratings.

## Live Demo
https://swisslana.github.io/Your_Energy/

---

## Features

- Browse exercises by categories:
  - Muscles
  - Body Parts
  - Equipment

- Exercise search functionality
- Exercise details modal
- Favorites page
- Add/remove exercises from favorites
- Quote of the day section
- Exercise rating modal
- Email subscription form
- Scroll-to-top button
- Responsive design:
  - Mobile
  - Tablet
  - Desktop

---

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)

### Libraries
- Axios
- modern-normalize
- iziToast

### Build Tool
- Vite

## API Integration

This project uses the **Your Energy API** provided by GoIT.

API documentation:  
https://your-energy.b.goit.study/api-docs

### Main endpoints:

- `/filters`
- `/exercises`
- `/exercises/:id`
- `/quote`
- `/subscription`
- `/rating`

### Storage
- LocalStorage

### Assets
- SVG sprite icons
- Self-hosted DM Sans fonts

---

## Project Structure

```bash
src/
├── css/
│   ├── animations.css
│   ├── base.css
│   ├── common.css
│   ├── container.css
│   ├── exercise-modal.css
│   ├── exercises.css
│   ├── favorites-quote.css
│   ├── favorites.css
│   ├── fonts.css
│   ├── footer.css
│   ├── header.css
│   ├── hero.css
│   ├── quote.css
│   ├── rating-modal.css
│   ├── reset.css
│   └── styles.css
│
├── fonts/
│   ├── DMSans-Italic.woff2
│   ├── DMSans-Medium.woff2
│   └── DMSans-Regular.woff2
│
├── img/
│   ├── avif/
│   ├── jpg/
│   ├── webp/
│   ├── logo.svg
│   └── sprite.svg
│
├── js/
│   ├── api/
│   │   └── exercises-api.js
│   │
│   ├── components/
│   │   ├── exercise-modal.js
│   │   ├── header.js
│   │   ├── pagination.js
│   │   ├── quote.js
│   │   ├── rating-modal.js
│   │   ├── scroll-up.js
│   │   └── subscription.js
│   │
│   ├── pages/
│   │   ├── favorites.js
│   │   └── home.js
│   │
│   └── utils/
│       ├── constants.js
│       ├── helpers.js
│       ├── loader.js
│       ├── render-functions.js
│       └── storage.js
│
├── partials/
│   ├── exercises.html
│   ├── favorites-quote.html
│   ├── footer.html
│   ├── header.html
│   ├── hero.html
│   ├── mobile-menu.html
│   └── rating-modal.html
│
├── favorites.html
├── index.html
└── main.js
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/swisslana/Your_Energy.git
```

Navigate to the project folder:

```bash
cd Your_Energy
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build production version:

```bash
npm run build
```

Deploy:

```bash
npm run deploy
```

---

## Performance & Quality

Project requirements:

- Semantic HTML
- Responsive layout
- Pixel-perfect implementation
- Cross-browser compatibility
- Accessibility support
- Optimized images
- Favicon
- Clean console (no errors)
- Validator compliant HTML/CSS
- Lighthouse score 90+

## Performance Optimizations

- Self-hosted fonts
- Optimized image formats:
  - AVIF
  - WebP
- Delayed loader rendering to prevent flicker
- Lazy loading for API-loaded images
- Reduced render-blocking external resources
- SVG sprite icon system




