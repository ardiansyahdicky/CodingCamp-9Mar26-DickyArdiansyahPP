# Implementation Plan: Productivity Dashboard

## Overview

This plan implements a client-side productivity dashboard using vanilla JavaScript, HTML, and CSS. The implementation follows a component-based architecture with five main components (Greeting, Timer, Tasks, Quick Links, Theme Manager) that operate independently and persist data to Local Storage. All core functionality has been implemented including time-aware greeting with user personalization, customizable focus timer, task management with CRUD operations, quick link bookmarks, and light/dark theme switching.

## Tasks

- [x] 1. Set up project structure and HTML foundation
  - Create directory structure: css/, js/, and root index.html
  - Write semantic HTML structure with containers for all components
  - Include meta tags for viewport and charset
  - Link stylesheet (css/styles.css) and script (js/app.js)
  - Add accessibility attributes (aria-label, role, etc.)
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [x] 2. Implement Greeting Component
  - [x] 2.1 Create GreetingComponent class with time and date formatting
    - Implement constructor, init(), and destroy() methods
    - Implement formatTime() for 24-hour format (HH:MM:SS)
    - Implement formatDate() for day of week, month, day, and year
    - Implement getGreeting() for time-based greeting logic (morning/afternoon/evening/night)
    - Implement updateTime() to refresh display every second
    - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4_
  
  - [x] 2.2 Implement user name personalization
    - Add loadUserName() and saveUserName() methods for localStorage persistence
    - Add handleEditName() to prompt user for name input
    - Update greeting display to include user name with proper spacing (comma after greeting, space before name)
    - Add edit button (✏️) next to greeting text
    - Use storage key "productivity-dashboard-username"
    - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5, 17.6_
  
  - [ ]* 2.3 Write property test for time format validation
    - **Property 1: Time Format Validation**
    - **Validates: Requirements 1.1**
  
  - [ ]* 2.4 Write property test for date format validation
    - **Property 2: Date Format Validation**
    - **Validates: Requirements 1.2**
  
  - [ ]* 2.5 Write property test for greeting time range correctness
    - **Property 3: Greeting Time Range Correctness**
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.4**
  
  - [ ]* 2.6 Write property test for user name personalization
    - **Property 22: User Name Personalization**
    - **Validates: Requirements 17.3, 17.4, 17.5, 17.6**

- [x] 3. Implement Timer Component
  - [x] 3.1 Create TimerComponent class with countdown logic
    - Implement constructor, init(), start(), stop(), reset(), and destroy() methods
    - Initialize remainingSeconds to 1500 (25 minutes)
    - Implement tick() to decrement counter and update display
    - Implement formatTime() to convert seconds to MM:SS format
    - Implement updateDisplay() to refresh DOM
    - Add event listeners for start, stop, and reset buttons
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_
  
  - [x] 3.2 Implement custom timer duration
    - Add loadCustomDuration() and saveCustomDuration() methods for localStorage persistence
    - Add handleCustomDuration() to prompt user for custom duration (1-120 minutes)
    - Validate input range and display alert for invalid input
    - Update reset() to use custom duration if set, otherwise default 25 minutes
    - Add custom button with event listener
    - Use storage key "productivity-dashboard-timer-duration"
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6_
  
  - [ ]* 3.3 Write property test for timer format validation
    - **Property 4: Timer Format Validation**
    - **Validates: Requirements 3.6**
  
  - [ ]* 3.4 Write property test for timer countdown behavior
    - **Property 5: Timer Start Countdown**
    - **Validates: Requirements 3.2**
  
  - [ ]* 3.5 Write property test for timer stop preserves state
    - **Property 6: Timer Stop Preserves State**
    - **Validates: Requirements 3.3**
  
  - [ ]* 3.6 Write property test for timer reset behavior
    - **Property 7: Timer Reset Returns to Custom or Default Duration**
    - **Validates: Requirements 3.4, 15.6**
  
  - [ ]* 3.7 Write property test for custom timer duration validation
    - **Property 19: Custom Timer Duration Validation**
    - **Validates: Requirements 15.1, 15.2, 15.3, 15.4**
  
  - [ ]* 3.8 Write property test for custom timer duration persistence
    - **Property 20: Custom Timer Duration Persistence**
    - **Validates: Requirements 15.5, 15.6**
  
  - [ ]* 3.9 Write unit tests for timer edge cases
    - Test timer at zero displays "00:00"
    - Test timer stops automatically at zero
    - Test rapid button clicks don't cause state inconsistency
    - Test custom duration validation (1-120 range)
    - _Requirements: 3.5, 15.2, 15.3_

- [x] 4. Checkpoint - Verify greeting and timer components
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement Tasks Component with Local Storage
  - [x] 5.1 Create TasksComponent class with CRUD operations
    - Implement constructor, init(), and destroy() methods
    - Implement addTask() with validation for non-empty input
    - Implement editTask() with validation for non-empty input
    - Implement toggleTask() to change completion status
    - Implement deleteTask() to remove tasks
    - Implement generateId() for unique task identifiers
    - Implement validateTaskText() to reject empty/whitespace-only input
    - _Requirements: 4.1, 4.2, 4.4, 5.1, 5.2, 5.4, 6.1, 6.3, 7.1_
  
  - [x] 5.2 Implement Local Storage persistence for tasks
    - Implement loadTasks() to retrieve from localStorage
    - Implement saveTasks() to persist to localStorage
    - Use storage key "productivity-dashboard-tasks"
    - Handle JSON parse errors with fallback to empty array
    - Call saveTasks() after every state modification
    - _Requirements: 4.3, 5.3, 6.4, 7.2, 8.1, 8.4_
  
  - [x] 5.3 Implement task rendering and DOM updates
    - Implement renderTasks() to update task list display
    - Apply visual styling for completed tasks (strikethrough, opacity)
    - Add event listeners for checkbox, edit, and delete buttons
    - Handle edit mode with inline input field and save/cancel functionality
    - _Requirements: 6.2, 8.2, 8.3_
  
  - [ ]* 5.4 Write property test for task creation with valid input
    - **Property 8: Task Creation with Valid Input**
    - **Validates: Requirements 4.1, 4.2, 4.3**
  
  - [ ]* 5.5 Write property test for task creation rejects empty input
    - **Property 9: Task Creation Rejects Empty Input**
    - **Validates: Requirements 4.4**
  
  - [ ]* 5.6 Write property test for task edit updates and persists
    - **Property 10: Task Edit Updates and Persists**
    - **Validates: Requirements 5.1, 5.2, 5.3**
  
  - [ ]* 5.7 Write property test for task edit rejects empty input
    - **Property 11: Task Edit Rejects Empty Input**
    - **Validates: Requirements 5.4**
  
  - [ ]* 5.8 Write property test for task completion toggle round-trip
    - **Property 12: Task Completion Toggle Round-Trip**
    - **Validates: Requirements 6.1, 6.2, 6.3, 6.4**
  
  - [ ]* 5.9 Write property test for task deletion
    - **Property 13: Task Deletion Removes Completely**
    - **Validates: Requirements 7.1, 7.2**
  
  - [ ]* 5.10 Write property test for task persistence round-trip
    - **Property 14: Task Persistence Round-Trip**
    - **Validates: Requirements 8.1, 8.2, 8.4**
  
  - [ ]* 5.11 Write unit tests for task component edge cases
    - Test empty storage displays empty list
    - Test task input validation feedback
    - Test edit mode UI behavior
    - Test localStorage error handling
    - _Requirements: 8.3_

- [x] 6. Implement Quick Links Component with Local Storage
  - [x] 6.1 Create QuickLinksComponent class with add and delete operations
    - Implement constructor, init(), and destroy() methods
    - Implement addLink() with URL and label parameters
    - Implement deleteLink() to remove links
    - Implement generateId() for unique link identifiers
    - Implement validateUrl() for basic URL validation
    - Add protocol prefix if missing (default to https://)
    - _Requirements: 9.1, 9.4_
  
  - [x] 6.2 Implement Local Storage persistence for quick links
    - Implement loadLinks() to retrieve from localStorage
    - Implement saveLinks() to persist to localStorage
    - Use storage key "productivity-dashboard-links"
    - Handle JSON parse errors with fallback to empty array
    - Call saveLinks() after every state modification
    - _Requirements: 9.3, 9.4, 9.5_
  
  - [x] 6.3 Implement link rendering with target="_blank"
    - Implement renderLinks() to update link list display
    - Create anchor elements with href and target="_blank"
    - Add event listeners for delete buttons
    - Add event listeners for add link form submission
    - _Requirements: 9.2, 9.5_
  
  - [ ]* 6.4 Write property test for quick link creation and persistence
    - **Property 15: Quick Link Creation and Persistence**
    - **Validates: Requirements 9.1, 9.2, 9.3**
  
  - [ ]* 6.5 Write property test for quick link deletion
    - **Property 16: Quick Link Deletion and Persistence**
    - **Validates: Requirements 9.4**
  
  - [ ]* 6.6 Write property test for quick link persistence round-trip
    - **Property 17: Quick Link Persistence Round-Trip**
    - **Validates: Requirements 9.5**
  
  - [ ]* 6.7 Write property test for Local Storage serialization
    - **Property 18: Local Storage Serialization Round-Trip**
    - **Validates: Requirements 8.4, 9.3, 9.4**
  
  - [ ]* 6.8 Write unit tests for quick links component edge cases
    - Test URL validation and protocol prefixing
    - Test empty label handling
    - Test localStorage error handling
    - _Requirements: 9.1_

- [x] 7. Checkpoint - Verify all components function correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Implement CSS styling with glassmorphism design
  - [x] 8.1 Create base styles and light theme glassmorphism
    - Apply vibrant linear gradient background with pastel colors (light mode)
    - Implement glassmorphism with frosted glass effects (rgba(255, 255, 255, 0.8), backdrop-filter: blur(16px))
    - Set font sizes between 14px and 64px for proper hierarchy
    - Ensure text contrast ratio minimum 4.5:1 for accessibility
    - Apply consistent spacing between components (24px-48px)
    - Style greeting component at top with large time display (64px) and visual hierarchy
    - Style timer with monospace display (64px) and button controls
    - Style task list with checkbox, text, edit, and delete buttons
    - Style completed tasks with visual indication (strikethrough, opacity 0.6)
    - Style quick links as clickable anchors with hover effects
    - Add responsive layout (1 column mobile, 2 columns desktop at 768px breakpoint)
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7_
  
  - [x] 8.2 Implement dark theme styles
    - Create dark theme with dark glassmorphism effects (rgba(30, 27, 75, 0.85), blur(20px))
    - Apply dark gradient background (deep purples and blues: #1e1b4b to #0c4a6e)
    - Style theme toggle button in fixed position (top-right corner, 50px circle)
    - Add moon icon (🌙) for light mode, sun icon (☀️) for dark mode
    - Ensure proper contrast in both themes (light text on dark backgrounds)
    - Add smooth transitions between themes (0.3s ease)
    - Style edit name button with proper hover states
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.7, 17.1_

- [x] 9. Wire all components together in app.js
  - [x] 9.1 Create main initialization function
    - Check for localStorage availability and display warning if unavailable
    - Initialize all five components (Greeting, Timer, Tasks, Quick Links, Theme Manager) with their container elements
    - Handle missing DOM elements with descriptive errors
    - Set up error handling for storage quota exceeded
    - Add DOMContentLoaded event listener to trigger initialization
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5_
  
  - [x] 9.2 Implement ThemeManager class
    - Create ThemeManager with init(), loadTheme(), saveTheme(), toggleTheme(), and applyTheme() methods
    - Load saved theme preference from localStorage on initialization
    - Save theme preference to localStorage on toggle
    - Apply appropriate CSS class (dark-theme) to body element
    - Update theme icon based on current theme (🌙 for light, ☀️ for dark)
    - Use storage key "productivity-dashboard-theme"
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7_
  
  - [ ]* 9.3 Write property test for theme preference persistence
    - **Property 21: Theme Preference Persistence**
    - **Validates: Requirements 16.2, 16.3, 16.4, 16.5, 16.6, 16.7**
  
  - [ ]* 9.4 Write integration tests for component initialization
    - Test all components initialize without errors
    - Test localStorage unavailable scenario
    - Test missing DOM elements scenario
    - Test theme manager initialization and persistence
    - _Requirements: 14.5, 16.5, 16.6_

- [ ]* 10. Set up testing infrastructure (optional)
  - [ ]* 10.1 Configure Vitest and fast-check
    - Install vitest and fast-check as dev dependencies
    - Create vitest.config.js with jsdom environment
    - Create test files for each component (greeting.test.js, timer.test.js, tasks.test.js, quicklinks.test.js, theme.test.js)
    - Set up beforeEach and afterEach hooks for DOM and storage cleanup
    - Configure test scripts in package.json (use --run flag, not watch mode)
  
  - [ ]* 10.2 Implement localStorage mock for testing
    - Create mock localStorage implementation for isolated tests
    - Add setup to clear storage between tests
    - Add utilities for verifying storage operations

- [x] 11. Final verification and manual testing
  - [x] 11.1 Verify core functionality
    - Test greeting displays correct time, date, and time-based greeting
    - Test user name personalization with edit button
    - Test timer start, stop, reset, and custom duration functionality
    - Test task creation, editing, completion toggle, and deletion
    - Test quick link creation, deletion, and opening in new tabs
    - Test theme toggle between light and dark modes
    - Verify all data persists across page reloads
  
  - [x] 11.2 Browser compatibility testing (manual)
    - Test in Chrome 90+ for full functionality
    - Test in Firefox 88+ for full functionality
    - Test in Edge 90+ for full functionality
    - Test in Safari 14+ for full functionality
    - _Requirements: 10.1, 10.2, 10.3, 10.4_
  
  - [x] 11.3 Performance testing (manual)
    - Verify initial load time under 1 second using DevTools Performance tab
    - Verify UI responsiveness under 100ms for all interactions
    - Test with large datasets (100+ tasks, 50+ links) for performance
    - Verify localStorage operations complete within 50ms
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_
  
  - [x] 11.4 Accessibility and visual design verification (manual)
    - Verify glassmorphism design with frosted glass effects
    - Check gradient backgrounds (vibrant for light, deep purples/blues for dark)
    - Verify font sizes between 14px and 64px using browser inspector
    - Test contrast ratios with accessibility tools (minimum 4.5:1)
    - Confirm visual hierarchy with greeting at top
    - Test responsive layout (1 column mobile, 2 columns desktop at 768px)
    - Verify theme toggle button in fixed top-right position
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7_
  
  - [x] 11.5 File structure and offline functionality verification
    - Confirm file structure: one CSS file (css/styles.css), one JS file (js/app.js), one HTML file (index.html)
    - Test offline functionality by opening index.html directly from file system
    - Verify no network requests in DevTools Network tab
    - Confirm all functionality works without internet connection
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 14.1, 14.2, 14.3, 14.4, 14.5_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- All core implementation tasks (1-9) are complete and functional
- Optional tasks include property-based tests, unit tests, and formal testing infrastructure setup
- Each task references specific requirements for traceability
- Property-based tests use fast-check with minimum 100 iterations when implemented
- All components use vanilla JavaScript with no external dependencies (Requirements 14.1)
- Local Storage operations include error handling for quota and parse errors
- The application works offline when opened directly from the file system (Requirements 14.5)
- All five components (Greeting, Timer, Tasks, Quick Links, Theme Manager) are fully implemented
- The application supports both light and dark themes with glassmorphism design
- User personalization includes custom name and custom timer duration
- All data persists to Local Storage with appropriate error handling
