# Your Energy 

A modern responsive fitness web application that helps users discover workouts, explore exercise categories, manage personalized favorites, submit ratings, and stay motivated with daily fitness inspiration.

Built as a production-style frontend application using modular JavaScript architecture, REST API integration, LocalStorage persistence, and responsive UI implementation.

## Live Demo

🔗 https://swisslana.github.io/Your_Energy/

---

## About the Project

**Your Energy** is an interactive fitness platform designed to help users discover and explore workouts in an intuitive and engaging way.

The application allows users to:

- browse exercise categories dynamically
- filter workouts by muscles, body parts, or equipment
- search exercises by keyword
- view detailed workout information
- save favorite exercises for quick access
- submit exercise ratings
- subscribe to workout updates
- stay motivated with daily inspirational fitness quotes

This project was developed as the **final Advanced JavaScript project**, with a strong focus on scalable frontend architecture, asynchronous API communication, reusable UI components, and responsive user experience.

---

## Core Features

### Exercise Discovery

Users can browse exercises using dynamic backend-powered filters:

- **Muscles**
- **Body Parts**
- **Equipment**

Categories are loaded directly from the API and rendered dynamically.

---

### Smart Exercise Search

Exercises can be searched based on:

- selected filter
- selected category
- keyword query
- current page

This creates a realistic production-like filtering experience.

---

### Server-Side Pagination

Implemented server-side pagination for efficient data loading and scalability.

Benefits:

- reduced frontend memory load
- faster rendering
- better UX for large datasets

---

### Exercise Details Modal

Each exercise includes a detailed modal window containing:

- exercise name
- calories burned
- target muscle
- body part
- popularity
- rating
- description
- video preview (if available)

Users can interact with exercises directly from the modal.

---

### Favorites Management

Users can:

- add exercises to favorites
- remove favorites
- revisit saved workouts later

Favorites are persisted using **LocalStorage**, preserving state between sessions.

---

### Rating System

Users can submit ratings for exercises using:

- validated email input
- star rating selection
- backend API submission

Includes error handling and success notifications.

---

### Daily Motivational Quote

The application loads a **Quote of the Day** from backend API.

Optimization:

- quote is cached in LocalStorage
- API is called only once per day
- reduces unnecessary network requests

---

### Newsletter Subscription

Integrated subscription form with:

- email validation
- backend POST request
- success/error feedback notifications

---

### Responsive Design

Fully responsive UI implementation for:

- Mobile
- Tablet
- Desktop

Implemented according to design specifications with adaptive layouts and optimized assets.

---

### Additional UX Features

- Mobile burger navigation
- Scroll-to-top button
- Loading spinner
- Smooth modal interactions
- Toast notifications
- SVG icon system

---

## Architecture

The project follows a modular frontend architecture for maintainability and scalability.

### Structure

```bash
src/
├── css/
├── fonts/
├── img/
├── js/
│   ├── api/
│   ├── components/
│   ├── pages/
│   └── utils/
├── partials/
├── favorites.html
├── index.html
├── favorites.js
└── main.js
```

### Architectural Principles

Implemented with:

- separation of concerns
- reusable UI rendering functions
- modular component organization
- centralized API communication
- utility abstraction
- scalable page-based logic

This architecture improves:

- maintainability
- scalability
- readability
- debugging efficiency

---

## Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript (ES6+)

---

### API & Data

- REST API
- Axios
- LocalStorage

---

### Build & Tooling

- Vite
- vite-plugin-html-inject
- vite-plugin-full-reload
- postcss-sort-media-queries

---

### UX & Utilities

- modern-normalize
- iziToast

---

### Assets

- SVG sprite icons
- self-hosted fonts
- AVIF / WebP optimized images

---

## API Integration

This project uses the **Your Energy API**.

API documentation:

https://your-energy.b.goit.study/api-docs

### Endpoints Used

#### Get Exercise Filters

```http
GET /filters
```

Example:

```http
GET /filters?filter=Muscles&page=1&limit=12
```

Used for:

- muscles
- body parts
- equipment categories

---

#### Get Exercises

```http
GET /exercises
```

Example:

```http
GET /exercises?bodypart=back&keyword=pull&page=1&limit=10
```

Used for:

- exercise listing
- filtering
- search
- pagination

---

#### Get Exercise Details

```http
GET /exercises/:id
```

Used for:

- exercise modal

---

#### Submit Rating

```http
PATCH /exercises/:id/rating
```

Used for:

- rating modal

---

#### Quote of the Day

```http
GET /quote
```

Used for:

- motivational quote block

---

#### Newsletter Subscription

```http
POST /subscription
```

Used for:

- email subscription form
```

---

## ⚡ Performance Optimizations

Implemented optimizations include:

- lazy-loaded images
- optimized image formats:
  - AVIF
  - WebP
- self-hosted fonts
- reduced render-blocking resources
- LocalStorage caching
- modular code splitting
- server-side pagination
- optimized production build via Vite

---

## Technical Challenges Solved

This project involved solving several real frontend engineering challenges:

- asynchronous API state management
- dynamic filtering logic
- server-side pagination implementation
- modal lifecycle management
- nested modal interaction handling
- LocalStorage synchronization
- quote caching by date
- reusable rendering architecture
- responsive layout consistency
- Vite build configuration and deployment setup

---

## Installation & Setup

Clone the repository:

```bash
git clone https://github.com/swisslana/Your_Energy.git
```

Navigate to project folder:

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

Preview production build:

```bash
npm run preview
```

Deploy:

```bash
npm run deploy
```

---

## Quality Standards

Project meets:

- semantic HTML requirements
- responsive design standards
- cross-browser compatibility
- clean code architecture
- modular frontend structure
- API integration best practices
- optimized asset loading
- favicon support
- no console errors
- validator-compliant HTML/CSS
- Lighthouse performance optimization

---

## Future Improvements

Potential next features:

- user authentication
- personal workout plans
- workout progress tracking
- exercise history
- dark mode
- advanced filtering
- backend user profiles
- personalized recommendations

---

## License

This project was created for educational and portfolio purposes.