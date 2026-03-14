# Technical Stack

## Core Technologies

- **HTML5**: Semantic markup with ARIA labels for accessibility
- **CSS3**: Modern glassmorphism, gradients, Grid, Flexbox
- **JavaScript (ES6+)**: Vanilla JS with class-based components
- **Local Storage API**: Client-side data persistence

## Build System

No build system required. This is a standalone web application that runs directly in the browser.

## Common Commands

```bash
# Open the application
open index.html

# Or simply double-click index.html in your file system
```

## Browser Compatibility

Tested and verified on:
- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

## Component Architecture

The application follows a modular component-based architecture with five main components:

1. **GreetingComponent**: Time, date, and personalized greeting
2. **TimerComponent**: Countdown timer with customizable duration
3. **TasksComponent**: Full CRUD operations for tasks
4. **QuickLinksComponent**: Bookmark management
5. **ThemeManager**: Light/dark mode switching

Each component follows a consistent lifecycle:
- Constructor: Initialize properties
- init(): Set up DOM references and event listeners
- destroy(): Clean up intervals and event listeners

## Local Storage Keys

| Storage Key | Purpose |
|-------------|---------|
| `productivity-dashboard-username` | User's personalized name |
| `productivity-dashboard-timer-duration` | Custom timer duration (seconds) |
| `productivity-dashboard-tasks` | Task list (JSON array) |
| `productivity-dashboard-links` | Quick links (JSON array) |
| `productivity-dashboard-theme` | Theme preference (light/dark) |

## Performance Targets

- Load Time: < 1 second on broadband
- UI Responsiveness: < 100ms for all interactions
- Local Storage Operations: < 50ms
- Large Dataset Support: Handles 100+ tasks and 50+ links without degradation
