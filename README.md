# Restaurant Menu App

Simple restaurant menu application built with React and TheMealDB API.

## What it does

Shows different food categories and meals from around the world. You can click on categories to see dishes and then click on individual meals to see details like ingredients and instructions.

## Features

- Browse food categories (Seafood, Dessert, Pasta, etc.)
- View meals by category
- See detailed information for each meal
- Prices are randomly generated (API doesn't provide them)

## How to run
npm install
npm run dev
## Technologies used

- React 18
- React Router for navigation
- TheMealDB API (free, no key needed)
- Vite for build tool

## API

Using TheMealDB API:
- Categories: `https://www.themealdb.com/api/json/v1/1/categories.php`
- Filter by category: `https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`
- Meal details: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`

## Project structure
src/
├── App.jsx # Main component with all the pages
├── App.css # Styles
└── main.jsx # Entry point
## Notes

- Prices are generated based on meal ID (not real)
- All components are in App.jsx for simplicity
- Used fetch for API calls instead of axios
- Basic responsive design for mobile

## To-do / Future improvements

- Add search functionality
- Filter by category from navbar
- Sort by price
- Better mobile styles
