# Productivity Dashboard

A modern, lightweight productivity tool built with pure vanilla JavaScript, HTML, and CSS. Features a beautiful glassmorphism design with light/dark themes, complete offline functionality, and zero external dependencies.

![Productivity Dashboard](https://img.shields.io/badge/vanilla-javascript-yellow) ![No Dependencies](https://img.shields.io/badge/dependencies-none-green) ![Offline Ready](https://img.shields.io/badge/offline-ready-blue)

## ✨ Features

### 🕐 Dynamic Greeting & Clock
- Real-time clock with 24-hour format (HH:MM:SS)
- Automatic time-based greetings (morning, afternoon, evening, night)
- Full date display with day of week
- Personalized name with inline editing

### ⏱️ Focus Timer (Pomodoro)
- Default 25-minute Pomodoro timer
- Customizable duration (1-120 minutes)
- Start, stop, and reset controls
- Persistent custom duration settings

### ✅ Task Management
- Create, edit, complete, and delete tasks
- Visual completion indicators (strikethrough, opacity)
- Inline editing with save/cancel
- Empty task validation
- Persistent storage across sessions

### 🔗 Quick Links
- Save frequently visited websites
- Custom labels for easy identification
- Opens links in new tabs
- URL validation with automatic protocol addition
- Persistent bookmark storage

### 🎨 Theme System
- Light and dark mode toggle
- Glassmorphism design with frosted glass effects
- Aurora/mesh gradient backgrounds
- Smooth theme transitions
- Theme preference persistence

## 🚀 Quick Start

### Installation

No installation required! This is a standalone web application.

```bash
# Clone the repository
git clone https://github.com/ardiansyahdicky/CodingCamp-9Mar26-DickyArdiansyahPP.git

# Navigate to the project directory
cd productivity-dashboard

# Open in your browser
open index.html
```

Or simply download the files and double-click `index.html`.

### Usage

1. **Set Your Name**: Click the edit icon (✏️) next to the greeting
2. **Start Timer**: Click "Start" to begin a 25-minute focus session
3. **Add Tasks**: Type a task and press Enter or click "Add"
4. **Save Links**: Enter a URL and label, then click "Add Link"
5. **Toggle Theme**: Click the moon/sun icon in the top-right corner

## 📁 Project Structure

```
productivity-dashboard/
├── index.html                  # Main HTML file
├── css/
│   └── styles.css             # All styling (glassmorphism, responsive)
├── js/
│   └── app.js                 # All application logic (5 components)
├── README.md                  # This file
└── .kiro/
    └── specs/                 # Specification documents
        └── productivity-dashboard/
            ├── requirements.md # Detailed requirements
            ├── design.md      # Architecture & design
            └── tasks.md       # Implementation tasks
```

## 🛠️ Technical Stack

- **HTML5**: Semantic markup with ARIA labels for accessibility
- **CSS3**: Modern glassmorphism, gradients, Grid, Flexbox
- **JavaScript (ES6+)**: Vanilla JS with class-based components
- **Local Storage API**: Client-side data persistence

### Zero Dependencies

This project uses **zero external libraries or frameworks**:
- ✅ No npm packages
- ✅ No build tools
- ✅ No CDN links
- ✅ No jQuery, React, Vue, or any framework
- ✅ Works completely offline

## 🎯 Component Architecture

The application follows a modular component-based architecture:

### 1. GreetingComponent
- Displays current time, date, and time-based greeting
- Handles user name personalization
- Updates every second

### 2. TimerComponent
- Manages countdown timer with customizable duration
- Handles start, stop, reset operations
- Persists custom duration to Local Storage

### 3. TasksComponent
- Full CRUD operations for tasks
- Inline editing with validation
- Completion status tracking
- Local Storage persistence

### 4. QuickLinksComponent
- Manages bookmark collection
- URL validation and normalization
- Opens links in new tabs
- Local Storage persistence

### 5. ThemeManager
- Light/dark mode switching
- Applies glassmorphism effects
- Persists theme preference

## 🎨 Design Features

### Glassmorphism UI
- Frosted glass effect with `backdrop-filter: blur()`
- Semi-transparent backgrounds with `rgba()`
- Subtle borders and shadows
- Works in both light and dark themes

### Aurora Gradients
- **Light Mode**: Vibrant multi-color gradient (purples, pinks, blues)
- **Dark Mode**: Deep gradient (dark purples and blues)
- Fixed background attachment for parallax effect

### Responsive Design
- **Desktop (≥768px)**: Two-column grid layout
- **Mobile (<768px)**: Single-column stacked layout
- Font sizes scale from 14px to 64px
- Touch-friendly button sizes on mobile

## 🌐 Browser Compatibility

Tested and verified on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

All features work across these browsers with consistent appearance and functionality.

## 📊 Performance

- **Load Time**: < 1 second on broadband
- **UI Responsiveness**: < 100ms for all interactions
- **Local Storage Operations**: < 50ms
- **Large Dataset Support**: Handles 100+ tasks and 50+ links without performance degradation

## 💾 Data Storage

All data is stored locally in your browser using the Local Storage API:

| Storage Key | Purpose |
|-------------|---------|
| `productivity-dashboard-username` | User's personalized name |
| `productivity-dashboard-timer-duration` | Custom timer duration (seconds) |
| `productivity-dashboard-tasks` | Task list (JSON array) |
| `productivity-dashboard-links` | Quick links (JSON array) |
| `productivity-dashboard-theme` | Theme preference (light/dark) |

### Data Privacy
- All data stays on your device
- No server communication
- No tracking or analytics
- Works completely offline

## 🔒 Security & Privacy

- **No Network Requests**: Zero external API calls
- **No Tracking**: No analytics or telemetry
- **Local Only**: All data stored in browser Local Storage
- **No Backend**: Purely client-side application
- **Offline First**: Works without internet connection

## ♿ Accessibility

- Semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<nav>`)
- ARIA labels for screen readers
- Keyboard navigation support
- Sufficient color contrast (≥4.5:1 ratio)
- Focus indicators for interactive elements
- Visually hidden labels for form inputs

## 📱 Offline Functionality

The dashboard works completely offline:
1. Open `index.html` directly from your file system
2. No server required
3. All features functional without internet
4. Data persists across browser sessions

## 🧪 Testing

Comprehensive testing documentation is included:

- **Browser Compatibility**: `BROWSER_COMPATIBILITY_TEST_GUIDE.md`
- **Performance Testing**: `PERFORMANCE_TESTING_GUIDE.md`
- **Accessibility Testing**: `ACCESSIBILITY_VISUAL_DESIGN_VERIFICATION_GUIDE.md`
- **Offline Functionality**: `FILE_STRUCTURE_AND_OFFLINE_VERIFICATION_GUIDE.md`

Run automated file structure verification:
```bash
node verify-file-structure.js
```

## 📝 Development

### Code Style
- ES6+ JavaScript with class-based components
- Modular architecture with clear separation of concerns
- Comprehensive error handling
- Descriptive variable and function names
- Inline comments for complex logic

### Component Lifecycle
Each component follows a consistent lifecycle:
1. **Constructor**: Initialize properties
2. **init()**: Set up DOM references and event listeners
3. **destroy()**: Clean up intervals and event listeners

### Adding New Features
1. Create a new component class
2. Implement `init()` and `destroy()` methods
3. Add to `initializeDashboard()` function
4. Update HTML with required container elements
5. Add styling to `styles.css`

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines
- Maintain zero external dependencies
- Follow existing code style
- Add comments for complex logic
- Test in all supported browsers
- Update documentation as needed

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Dicky Ardiansyah Pramana Putra**  
Internet Engineering Technology Graduate  
Universitas Gadjah Mada (UGM)

## 🙏 Acknowledgments

- Built with modern web standards
- Inspired by glassmorphism design trends
- Follows accessibility best practices
- Implements Pomodoro Technique principles

## 📞 Support

If you encounter any issues or have questions:
1. Check the testing guides in the repository
2. Review the specification documents in `.kiro/specs/`
3. Open an issue on GitHub

---

**Made with ❤️ using pure vanilla JavaScript, HTML, and CSS**
