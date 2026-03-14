# Project Structure

## Directory Layout

```
productivity-dashboard/
├── index.html              # Main HTML file with semantic markup
├── css/
│   └── styles.css         # All styling (glassmorphism, responsive)
├── js/
│   └── app.js             # All application logic (5 components)
├── README.md              # Project documentation
└── .kiro/
    ├── specs/             # Specification documents
    │   └── productivity-dashboard/
    │       ├── requirements.md
    │       ├── design.md
    │       └── tasks.md
    └── steering/          # AI assistant guidance documents
```

## File Organization

### HTML Structure (index.html)
- Single-page application with semantic HTML5 elements
- Theme toggle button (fixed position)
- Main dashboard container with:
  - Greeting component (header)
  - Two-column grid layout:
    - Left column: Timer + Quick Links
    - Right column: Tasks
- All components use ARIA labels for accessibility

### CSS Organization (css/styles.css)
Organized in logical sections:
1. CSS Reset
2. Base Styles
3. Dashboard Layout
4. Greeting Component
5. Two Column Grid
6. Component Cards (Glassmorphism)
7. Timer Component
8. Button Styles
9. Tasks Component
10. Quick Links Component
11. Responsive Layout (@media queries)
12. Theme Toggle Button
13. Dark Theme Overrides

### JavaScript Organization (js/app.js)
Organized as class-based components:
1. GreetingComponent class
2. TimerComponent class
3. TasksComponent class
4. QuickLinksComponent class
5. ThemeManager class
6. Utility functions (localStorage checks, error handling)
7. initializeDashboard() function
8. DOMContentLoaded event listener

## Code Conventions

### JavaScript
- ES6+ class-based components
- Descriptive variable and function names
- Comprehensive error handling with try-catch blocks
- Inline comments for complex logic
- Consistent component lifecycle (constructor → init() → destroy())
- Local Storage operations wrapped in error handlers

### CSS
- Mobile-first responsive design
- Glassmorphism effects with backdrop-filter
- CSS custom properties could be used for theme colors (future enhancement)
- Breakpoints: 768px (tablet), 480px (mobile)

### HTML
- Semantic elements (<header>, <main>, <section>, <nav>)
- ARIA labels for screen readers
- Form elements with proper labels (including visually-hidden)
- Consistent class naming (component-based)

## Responsive Breakpoints

- Desktop: ≥768px (two-column grid)
- Tablet: <768px (single-column stacked)
- Mobile: <480px (reduced font sizes)
