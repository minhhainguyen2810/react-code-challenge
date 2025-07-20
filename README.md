# React Code Challenge

This project is a **React Code Challenge** built with [Vite](https://vitejs.dev/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Ant Design](https://ant.design/), and [Tailwind CSS](https://tailwindcss.com/).

## Features

- Currency exchange form using live rates
- Modern React with hooks and functional components
- Ant Design UI components
- Tailwind CSS utility-first styling
- TypeScript for type safety
- Vite for fast development and build

## Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Start the development server:**

   ```sh
   npm run dev
   ```

3. **Build for production:**

   ```sh
   npm run build
   ```

4. **Preview production build:**

   ```sh
   npm run preview
   ```

## Project Structure

```
.
├── public/
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── assets/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── ...
```

## Styling

- Tailwind CSS is configured via [`tailwind.config.js`](tailwind.config.js) and imported in [`src/App.css`](src/App.css).
- You can use Tailwind utility classes directly in your React components.

## Notes

- This project is intended as a code challenge and demo for React, TypeScript, Ant Design, and Tailwind CSS integration.
- Currency rates are fetched from [https://interview.switcheo.com/prices.json](https://interview.switcheo.com/prices.json).

---

For more details, see the source files in the [`src`](src)
