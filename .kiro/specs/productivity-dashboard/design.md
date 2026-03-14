# Design Document: Productivity Dashboard

## Overview

The Productivity Dashboard is a client-side web application built with vanilla JavaScript, HTML, and CSS. It provides four core productivity features: a time-aware greeting display with user personalization, a customizable focus timer, a task management system, and quick link bookmarks. The application includes light/dark theme switching for comfortable use in different lighting conditions. All data persists in the browser's Local Storage, enabling offline functionality without any backend infrastructure.

The application follows a component-based architecture where each feature (Greeting, Timer, Tasks, Quick Links, Theme Manager) is implemented as an independent module with clear interfaces. The design prioritizes simplicity, performance, and maintainability while meeting strict requirements for browser compatibility and zero external dependencies. The visual design uses glassmorphism effects with an Aurora/Mesh gradient background using pastel colors for a modern, calming aesthetic.

## Architecture

### System Architecture

The application uses a modular client-side architecture with the following layers:

```
┌─────────────────────────────────────────────────────────┐
│                     index.html                          │
│                   (Entry Point)                         │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   styles.css │  │    app.js    │  │Local Storage │
│              │  │              │  │     API      │
└──────────────┘  └──────────────┘  └──────────────┘
                          │
        ┌─────────────────┼─────────────────┬─────────────┬─────────────┐
        │                 │                 │             │             │
        ▼                 ▼                 ▼             ▼             ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Greeting   │  │    Timer     │  │    Tasks     │  │ Quick Links  │  │    Theme     │
│  Component   │  │  Component   │  │  Component   │  │  Component   │  │   Manager    │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

### Component Responsibilities

**Greeting Component**
- Displays current time in 24-hour format (HH:MM:SS)
- Displays current date with day of week, month, day, and year
- Updates time display every second
- Determines and displays time-based greeting (morning/afternoon/evening/night)
- Supports user name personalization with inline edit button
- Persists user name to Local Storage
- Ensures proper spacing in greeting text (comma directly after greeting, space before name)

**Timer Component**
- Manages countdown timer with customizable duration (1-120 minutes)
- Default duration: 25 minutes (Pomodoro technique)
- Provides start, stop, reset, and custom duration controls
- Updates display every second during countdown
- Formats time as MM:SS
- Persists custom duration to Local Storage
- Validates custom duration input (1-120 minutes)
- Automatically stops when countdown reaches zero

**Tasks Component**
- Manages task collection (create, read, update, delete)
- Handles task completion status toggling
- Persists all task operations to Local Storage
- Validates task input (rejects empty tasks)
- Provides inline editing with save/cancel functionality
- Applies visual styling to completed tasks (strikethrough, opacity)

**Quick Links Component**
- Manages quick link collection (add, delete)
- Opens links in new tabs
- Persists links to Local Storage
- Retrieves and displays saved links on load
- Validates and normalizes URLs (adds https:// if missing)

**Theme Manager**
- Manages light/dark theme switching
- Persists theme preference to Local Storage
- Applies appropriate glassmorphism effects for each theme
- Updates theme toggle icon (🌙 for light mode, ☀️ for dark mode)
- Provides fixed position toggle button (top-right corner)

### Data Flow

1. **Initialization**: On page load, each component initializes and retrieves its data from Local Storage
2. **User Interaction**: User actions trigger component methods that update internal state
3. **State Update**: Components update the DOM to reflect state changes
4. **Persistence**: State changes are immediately written to Local Storage
5. **Time-Based Updates**: Greeting and Timer components use setInterval for periodic updates

## Components and Interfaces

### Greeting Component

**Public Interface:**
```javascript
class GreetingComponent {
  constructor(containerElement)
  init()
  destroy()
}
```

**Internal State:**
- `userName`: String containing the user's personalized name
- `storageKey`: "productivity-dashboard-username"
- `intervalId`: Reference to setInterval for cleanup

**Internal Methods:**
- `updateTime()`: Updates time, date, and greeting display
- `getGreeting(hour)`: Returns appropriate greeting based on hour (0-23)
- `formatTime(date)`: Formats time as "HH:MM:SS" (24-hour format)
- `formatDate(date)`: Formats date as "Day, Month Date, Year"
- `loadUserName()`: Retrieves user name from Local Storage
- `saveUserName()`: Persists user name to Local Storage
- `handleEditName()`: Prompts user to enter/update their name

**DOM Structure:**
```html
<div class="greeting-container">
  <span class="time-display">14:30:45</span>
  <span class="date-display">Monday, January 15, 2024</span>
  <div class="greeting-text">
    Good Afternoon, John
    <button id="edit-name-btn" class="edit-name-btn">✏️</button>
  </div>
</div>
```

### Timer Component

**Public Interface:**
```javascript
class TimerComponent {
  constructor(containerElement)
  init()
  start()
  stop()
  reset()
  destroy()
}
```

**Internal State:**
- `defaultDuration`: Custom or default duration in seconds (default: 1500)
- `remainingSeconds`: Current countdown value (0 to custom duration)
- `isRunning`: Boolean indicating if timer is active
- `intervalId`: Reference to setInterval for cleanup
- `storageKey`: "productivity-dashboard-timer-duration"

**Internal Methods:**
- `tick()`: Decrements remainingSeconds and updates display
- `formatTime(seconds)`: Converts seconds to "MM:SS" format
- `updateDisplay()`: Updates DOM with current time
- `loadCustomDuration()`: Retrieves custom duration from Local Storage
- `saveCustomDuration()`: Persists custom duration to Local Storage
- `handleCustomDuration()`: Prompts user for custom duration (1-120 minutes)

**DOM Structure:**
```html
<div class="timer-container">
  <div class="timer-display">25:00</div>
  <div class="timer-controls">
    <button class="timer-start btn-primary">Start</button>
    <button class="timer-stop btn-secondary">Stop</button>
    <button class="timer-reset btn-reset">Reset</button>
    <button class="timer-custom btn-custom">Custom</button>
  </div>
</div>
```

### Tasks Component

**Public Interface:**
```javascript
class TasksComponent {
  constructor(containerElement)
  init()
  addTask(text)
  editTask(taskId, newText)
  toggleTask(taskId)
  deleteTask(taskId)
  destroy()
}
```

**Internal State:**
- `tasks`: Array of task objects `{ id, text, completed, createdAt }`
- `storageKey`: "productivity-dashboard-tasks"

**Internal Methods:**
- `loadTasks()`: Retrieves tasks from Local Storage
- `saveTasks()`: Writes tasks to Local Storage
- `renderTasks()`: Updates DOM with current task list
- `generateId()`: Creates unique task identifier
- `validateTaskText(text)`: Returns true if text is non-empty after trimming

**DOM Structure:**
```html
<div class="tasks-container">
  <div class="task-input-section">
    <input type="text" class="task-input" placeholder="Add a new task...">
    <button class="task-add">Add</button>
  </div>
  <ul class="task-list">
    <li class="task-item" data-task-id="123">
      <input type="checkbox" class="task-checkbox">
      <span class="task-text">Example task</span>
      <button class="task-edit">Edit</button>
      <button class="task-delete">Delete</button>
    </li>
  </ul>
</div>
```

### Quick Links Component

**Public Interface:**
```javascript
class QuickLinksComponent {
  constructor(containerElement)
  init()
  addLink(url, label)
  deleteLink(linkId)
  destroy()
}
```

**Internal State:**
- `links`: Array of link objects `{ id, url, label }`
- `storageKey`: "productivity-dashboard-links"

**Internal Methods:**
- `loadLinks()`: Retrieves links from Local Storage
- `saveLinks()`: Writes links to Local Storage
- `renderLinks()`: Updates DOM with current link list
- `generateId()`: Creates unique link identifier
- `validateUrl(url)`: Basic URL validation

**DOM Structure:**
```html
<div class="quick-links-container">
  <div class="link-input-section">
    <input type="text" class="link-url" placeholder="URL">
    <input type="text" class="link-label" placeholder="Label">
    <button class="link-add">Add Link</button>
  </div>
  <ul class="link-list">
    <li class="link-item" data-link-id="456">
      <a href="https://example.com" target="_blank" class="link-anchor">Example</a>
      <button class="link-delete">Delete</button>
    </li>
  </ul>
</div>
```

### Theme Manager

**Public Interface:**
```javascript
class ThemeManager {
  constructor()
  init()
  toggleTheme()
}
```

**Internal State:**
- `isDarkTheme`: Boolean indicating current theme (true = dark, false = light)
- `storageKey`: "productivity-dashboard-theme"
- `themeToggleButton`: Reference to toggle button element
- `themeIcon`: Reference to icon element within button

**Internal Methods:**
- `loadTheme()`: Retrieves theme preference from Local Storage
- `saveTheme()`: Persists theme preference to Local Storage
- `applyTheme()`: Applies CSS classes and updates icon based on current theme

**DOM Structure:**
```html
<button id="theme-toggle" class="theme-toggle">
  <span class="theme-icon">🌙</span>
</button>
```

**Theme Behavior:**
- Light mode: Displays moon icon (🌙), uses light glassmorphism with Aurora/Mesh gradient background using pastel colors
- Dark mode: Displays sun icon (☀️), uses dark glassmorphism with deep blue/purple gradient background
- Theme preference persists across sessions via Local Storage

## Data Models

### Task Object

```javascript
{
  id: string,           // Unique identifier (timestamp-based)
  text: string,         // Task description (non-empty, trimmed)
  completed: boolean,   // Completion status
  createdAt: number     // Unix timestamp of creation
}
```

**Constraints:**
- `id` must be unique within the task collection
- `text` must be non-empty after trimming whitespace
- `completed` defaults to false for new tasks
- `createdAt` is set once at creation and never modified

### Quick Link Object

```javascript
{
  id: string,           // Unique identifier (timestamp-based)
  url: string,          // Full URL including protocol
  label: string         // Display text for the link
}
```

**Constraints:**
- `id` must be unique within the link collection
- `url` should include protocol (http:// or https://)
- `label` must be non-empty

### Local Storage Schema

**Tasks Storage:**
- Key: `"productivity-dashboard-tasks"`
- Value: JSON-serialized array of Task objects

**Quick Links Storage:**
- Key: `"productivity-dashboard-links"`
- Value: JSON-serialized array of Quick Link objects

**User Name Storage:**
- Key: `"productivity-dashboard-username"`
- Value: String containing user's personalized name

**Timer Duration Storage:**
- Key: `"productivity-dashboard-timer-duration"`
- Value: String containing custom timer duration in seconds (e.g., "1500")

**Theme Preference Storage:**
- Key: `"productivity-dashboard-theme"`
- Value: String "light" or "dark"

**Storage Operations:**
- All reads use `localStorage.getItem()` with JSON.parse() for objects/arrays
- All writes use `localStorage.setItem()` with JSON.stringify() for objects/arrays
- Simple values (username, theme, duration) stored as strings
- Failed parse operations default to empty arrays or default values
- Storage quota errors are caught and logged (though unlikely with small data sets)


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I identified the following redundancies and consolidations:

**Redundancy Analysis:**
- Properties 4.2 and 4.3 (task creation sets incomplete status + saves to storage) can be combined into a single property about task creation behavior
- Properties 5.2 and 5.3 (task edit updates text + saves to storage) can be combined into a single property about task editing
- Properties 6.1 and 6.3 (mark complete + mark incomplete) form a round-trip property that can be tested together
- Properties 6.1, 6.3, and 6.4 (completion toggling + persistence) can be combined into a comprehensive completion property
- Properties 7.1 and 7.2 (delete from display + delete from storage) can be combined into a single deletion property
- Properties 8.1 and 8.2 (retrieve tasks + display tasks) can be combined into a single load property
- Properties 9.3, 9.4, and 9.5 (link persistence operations) can be consolidated with link creation/deletion properties
- Properties 2.1-2.4 (greeting time ranges) can be combined into a single property that validates greeting logic across all hours

**Consolidated Properties:**
The following properties represent the minimal set needed to validate all testable requirements without redundancy.

### Property 1: Time Format Validation

*For any* Date object, the formatted time output should match the 24-hour format pattern "HH:MM:SS" where HH is 00-23, MM is 00-59, and SS is 00-59.

**Validates: Requirements 1.1**

### Property 2: Date Format Validation

*For any* Date object, the formatted date output should contain the day of week name, month name, day number, and year.

**Validates: Requirements 1.2**

### Property 3: Greeting Time Range Correctness

*For any* hour value (0-23), the greeting function should return:
- "Good morning" for hours 5-11
- "Good afternoon" for hours 12-16
- "Good evening" for hours 17-20
- "Good night" for hours 21-23 and 0-4

**Validates: Requirements 2.1, 2.2, 2.3, 2.4**

### Property 4: Timer Format Validation

*For any* number of seconds (0-1500), the timer display format should match "MM:SS" pattern where MM is 00-25 and SS is 00-59.

**Validates: Requirements 3.6**

### Property 5: Timer Start Countdown

*For any* initial timer value in seconds, starting the timer should cause the remaining time to decrease when tick() is called.

**Validates: Requirements 3.2**

### Property 6: Timer Stop Preserves State

*For any* timer state with remaining seconds, stopping the timer should preserve the exact remaining time value.

**Validates: Requirements 3.3**

### Property 7: Timer Reset Returns to Custom or Default Duration

*For any* timer state, calling reset should set remaining seconds to the custom duration (if set) or default 1500 seconds (25 minutes).

**Validates: Requirements 3.4, 15.6**

### Property 8: Task Creation with Valid Input

*For any* non-empty, non-whitespace string, creating a task should result in:
- A new task object with that text (trimmed)
- The task's completed status set to false
- The task persisted to Local Storage
- The task appearing in the task list

**Validates: Requirements 4.1, 4.2, 4.3**

### Property 9: Task Creation Rejects Empty Input

*For any* string composed entirely of whitespace characters (spaces, tabs, newlines) or empty string, attempting to create a task should be rejected and the task list should remain unchanged.

**Validates: Requirements 4.4**

### Property 10: Task Edit Updates and Persists

*For any* existing task and any valid (non-empty, non-whitespace) new text, editing the task should:
- Update the task's text to the new value (trimmed)
- Persist the updated task to Local Storage
- Reflect the change in the displayed task list

**Validates: Requirements 5.1, 5.2, 5.3**

### Property 11: Task Edit Rejects Empty Input

*For any* existing task and any whitespace-only or empty string, attempting to edit the task should be rejected and the task should remain unchanged.

**Validates: Requirements 5.4**

### Property 12: Task Completion Toggle Round-Trip

*For any* task, toggling completion status from incomplete to complete and back to incomplete should:
- Update the completed property correctly in both directions
- Apply and remove visual styling appropriately
- Persist each state change to Local Storage
- Result in the task returning to its original incomplete state

**Validates: Requirements 6.1, 6.2, 6.3, 6.4**

### Property 13: Task Deletion Removes Completely

*For any* existing task in the task list, deleting that task should:
- Remove it from the displayed task list
- Remove it from Local Storage
- Ensure it does not reappear on reload

**Validates: Requirements 7.1, 7.2**

### Property 14: Task Persistence Round-Trip

*For any* set of tasks, saving them to Local Storage and then loading them should produce an equivalent set of tasks with the same ids, text, completed status, and createdAt timestamps.

**Validates: Requirements 8.1, 8.2, 8.4**

### Property 15: Quick Link Creation and Persistence

*For any* valid URL and non-empty label, adding a quick link should:
- Create a clickable link element with that label
- Set the href to the provided URL
- Set target="_blank" for new tab opening
- Persist the link to Local Storage

**Validates: Requirements 9.1, 9.2, 9.3**

### Property 16: Quick Link Deletion and Persistence

*For any* existing quick link, deleting that link should:
- Remove it from the displayed link list
- Remove it from Local Storage
- Ensure it does not reappear on reload

**Validates: Requirements 9.4**

### Property 17: Quick Link Persistence Round-Trip

*For any* set of quick links, saving them to Local Storage and then loading them should produce an equivalent set of links with the same ids, URLs, and labels.

**Validates: Requirements 9.5**

### Property 18: Local Storage Serialization Round-Trip

*For any* valid JavaScript object (task or link), serializing it with JSON.stringify() and then deserializing with JSON.parse() should produce an equivalent object.

**Validates: Requirements 8.4, 9.3, 9.4**

### Property 19: Custom Timer Duration Validation

*For any* integer input between 1 and 120 (inclusive), setting a custom timer duration should:
- Convert minutes to seconds correctly (minutes × 60)
- Persist the duration to Local Storage
- Reset the timer to the new custom duration
- Reject inputs outside the 1-120 range with an alert message

**Validates: Requirements 15.1, 15.2, 15.3, 15.4**

### Property 20: Custom Timer Duration Persistence

*For any* valid custom timer duration, saving it to Local Storage and reloading the application should:
- Retrieve the custom duration correctly
- Initialize the timer with the custom duration
- Use the custom duration for reset operations

**Validates: Requirements 15.5, 15.6**

### Property 21: Theme Preference Persistence

*For any* theme state (light or dark), toggling the theme should:
- Apply the appropriate CSS classes to the body element
- Update the theme icon (🌙 for light, ☀️ for dark)
- Persist the theme preference to Local Storage
- Restore the theme preference on application reload

**Validates: Requirements 16.2, 16.3, 16.4, 16.5, 16.6, 16.7**

### Property 22: User Name Personalization

*For any* non-null string entered as a user name, the greeting should:
- Display the greeting with proper formatting: "Greeting, Name"
- Ensure comma directly follows the greeting with no extra space
- Ensure space exists before the name
- Persist the name to Local Storage
- Restore the name on application reload

**Validates: Requirements 17.3, 17.4, 17.5, 17.6**

## Error Handling

### Input Validation Errors

**Empty Task/Link Input:**
- Validation occurs before any state modification
- User receives immediate feedback (e.g., input field highlight or alert)
- No partial state changes occur
- No storage operations are attempted

**Invalid URL Format:**
- Basic URL validation checks for protocol (http:// or https://)
- Invalid URLs are rejected with user feedback
- Fallback: if protocol is missing, prepend "https://"

### Storage Errors

**Local Storage Quota Exceeded:**
- Catch `QuotaExceededError` during `localStorage.setItem()`
- Log error to console
- Display user-friendly message: "Storage limit reached. Please delete some items."
- Prevent further additions until space is available

**Local Storage Parse Errors:**
- Catch `SyntaxError` during `JSON.parse()`
- Log error to console
- Default to empty array for corrupted data
- Continue application operation with fresh state

**Local Storage Unavailable:**
- Check for `localStorage` availability on initialization
- If unavailable (private browsing, disabled), display warning message
- Application continues to function but without persistence
- All data is session-only

### Timer Edge Cases

**Timer at Zero:**
- When countdown reaches 0, stop the timer automatically
- Display "00:00"
- Prevent negative values

**Rapid Button Clicks:**
- Debounce or disable buttons during state transitions
- Prevent multiple simultaneous operations
- Ensure state consistency

### Component Lifecycle Errors

**Missing DOM Elements:**
- Check for required DOM elements during component initialization
- Throw descriptive error if container element not found
- Fail fast to aid debugging

**Multiple Initializations:**
- Track initialization state to prevent double-initialization
- Clean up existing intervals/listeners before re-initializing

## Testing Strategy

### Dual Testing Approach

The testing strategy employs both unit tests and property-based tests to ensure comprehensive coverage:

**Unit Tests** focus on:
- Specific examples that demonstrate correct behavior
- Edge cases (empty input, timer at zero, empty storage)
- Error conditions (invalid input, storage errors)
- Integration points between components and Local Storage
- DOM manipulation and event handling

**Property-Based Tests** focus on:
- Universal properties that hold for all inputs
- Comprehensive input coverage through randomization
- Round-trip properties (serialization, state changes)
- Format validation across all possible values
- State consistency across operations

Both approaches are complementary and necessary. Unit tests catch concrete bugs and verify specific scenarios, while property tests verify general correctness across the input space.

### Property-Based Testing Configuration

**Library Selection:**
- Use **fast-check** for JavaScript property-based testing
- Install as dev dependency: `npm install --save-dev fast-check`
- Import in test files: `import fc from 'fast-check'`

**Test Configuration:**
- Each property test runs minimum 100 iterations
- Use appropriate arbitraries: `fc.string()`, `fc.integer()`, `fc.date()`, `fc.array()`
- Configure shrinking for minimal failing examples
- Set seed for reproducible test runs

**Test Tagging:**
Each property test must include a comment referencing the design document property:

```javascript
// Feature: productivity-dashboard, Property 1: Time Format Validation
test('time formatting produces valid 24-hour format', () => {
  fc.assert(
    fc.property(fc.date(), (date) => {
      const formatted = formatTime(date);
      return /^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(formatted);
    }),
    { numRuns: 100 }
  );
});
```

### Unit Testing Strategy

**Test Organization:**
- Group tests by component (Greeting, Timer, Tasks, QuickLinks)
- Use descriptive test names that reference requirements
- Set up and tear down Local Storage state between tests
- Mock DOM elements as needed

**Coverage Goals:**
- 100% coverage of public component methods
- All error handling paths tested
- All edge cases from requirements tested
- Integration tests for Local Storage operations

**Example Unit Tests:**

```javascript
// Requirement 3.1: Timer initializes to 25 minutes
test('timer initializes with 1500 seconds', () => {
  const timer = new TimerComponent(container);
  timer.init();
  expect(timer.remainingSeconds).toBe(1500);
});

// Requirement 3.5: Timer displays 00:00 at zero
test('timer displays 00:00 when countdown reaches zero', () => {
  const timer = new TimerComponent(container);
  timer.init();
  timer.remainingSeconds = 0;
  timer.updateDisplay();
  expect(container.querySelector('.timer-display').textContent).toBe('00:00');
});

// Requirement 8.3: Empty storage shows empty list
test('task list displays empty when no tasks in storage', () => {
  localStorage.clear();
  const tasks = new TasksComponent(container);
  tasks.init();
  expect(container.querySelectorAll('.task-item').length).toBe(0);
});
```

### Testing Tools

**Test Runner:**
- Use **Vitest** for fast, modern JavaScript testing
- Configuration: `vitest.config.js` with jsdom environment
- Run tests: `npm test` (single run, not watch mode)

**DOM Testing:**
- Use jsdom for DOM simulation in Node environment
- Create container elements in beforeEach hooks
- Clean up DOM in afterEach hooks

**Storage Mocking:**
- Mock localStorage for isolated tests
- Clear storage between tests
- Verify storage operations with spy/mock assertions

### Test Execution

**Development Workflow:**
1. Write failing test for new feature
2. Implement feature to pass test
3. Run full test suite to ensure no regressions
4. Verify property tests with 100+ iterations

**Continuous Integration:**
- Run all tests on every commit
- Fail build if any test fails
- Generate coverage reports
- Enforce minimum coverage thresholds

### Manual Testing Checklist

Some requirements require manual verification:

**Browser Compatibility (Req 10):**
- Test in Chrome 90+, Firefox 88+, Edge 90+, Safari 14+
- Verify all features work in each browser
- Check console for errors

**Performance (Req 11):**
- Measure initial load time with browser DevTools
- Verify UI responsiveness with interaction timing
- Test with large datasets (100+ tasks)

**Visual Design (Req 13):**
- Verify glassmorphism design with frosted glass effects
- Check Aurora/Mesh gradient background with pastel colors (light mode) and dark gradient (dark mode)
- Verify font sizes between 14px and 64px with browser inspector
- Test contrast ratios with accessibility tools (minimum 4.5:1)
- Confirm visual hierarchy with greeting at top
- Test responsive layout (1 column mobile, 2 columns desktop)
- Verify theme toggle button in fixed top-right position

**File Structure (Req 12):**
- Verify single CSS file in css/ directory
- Verify single JS file in js/ directory
- Confirm HTML entry point structure

**Offline Functionality (Req 14):**
- Open index.html directly from file system
- Verify all features work without server
- Confirm no network requests in DevTools

