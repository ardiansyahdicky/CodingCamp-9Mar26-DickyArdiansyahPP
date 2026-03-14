// Productivity Dashboard - Main Application

// ===== Greeting Component =====
class GreetingComponent {
  constructor(containerElement) {
    this.container = containerElement;
    this.intervalId = null;
    this.greetingTextElement = null;
    this.timeDisplayElement = null;
    this.dateDisplayElement = null;
    this.greetingMessageElement = null;
    this.userNameElement = null;
    this.editNameButton = null;
    this.storageKey = 'productivity-dashboard-username';
    this.userName = '';
  }

  init() {
    // Get references to DOM elements
    this.greetingTextElement = this.container.querySelector('.greeting-text');
    this.timeDisplayElement = this.container.querySelector('.time-display');
    this.dateDisplayElement = this.container.querySelector('.date-display');
    this.greetingMessageElement = this.container.querySelector('.greeting-message');
    this.userNameElement = this.container.querySelector('.user-name');
    this.editNameButton = this.container.querySelector('#edit-name-btn');

    // Check if required elements exist
    if (!this.greetingTextElement || !this.timeDisplayElement || !this.dateDisplayElement) {
      throw new Error('GreetingComponent: Required DOM elements not found');
    }

    // Load user name from localStorage
    this.loadUserName();

    // Add event listener for edit name button
    if (this.editNameButton) {
      this.editNameButton.addEventListener('click', () => this.handleEditName());
    }

    // Initial update
    this.updateTime();

    // Update every second
    this.intervalId = setInterval(() => this.updateTime(), 1000);
  }

  loadUserName() {
    try {
      const storedName = localStorage.getItem(this.storageKey);
      this.userName = storedName || '';
    } catch (error) {
      console.error('Error loading user name from localStorage:', error);
      this.userName = '';
    }
  }

  saveUserName() {
    try {
      localStorage.setItem(this.storageKey, this.userName);
    } catch (error) {
      console.error('Error saving user name to localStorage:', error);
    }
  }

  handleEditName() {
    const newName = prompt('Enter your name:', this.userName);
    if (newName !== null) {
      this.userName = newName.trim();
      this.saveUserName();
      this.updateTime();
    }
  }

  updateTime() {
    const now = new Date();
    
    // Update greeting
    const hour = now.getHours();
    const greetingMessage = this.getGreeting(hour);
    
    if (this.greetingMessageElement && this.userNameElement) {
      this.greetingMessageElement.textContent = greetingMessage;
      this.userNameElement.textContent = this.userName ? `, ${this.userName}` : '';
    } else {
      this.greetingTextElement.textContent = this.userName ? `${greetingMessage}, ${this.userName}` : greetingMessage;
    }
    
    // Update time
    this.timeDisplayElement.textContent = this.formatTime(now);
    
    // Update date
    this.dateDisplayElement.textContent = this.formatDate(now);
  }

  getGreeting(hour) {
    if (hour >= 5 && hour <= 11) {
      return 'Good Morning';
    } else if (hour >= 12 && hour <= 16) {
      return 'Good Afternoon';
    } else if (hour >= 17 && hour <= 20) {
      return 'Good Evening';
    } else {
      return 'Good Night';
    }
  }

  formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    // Pad with leading zeros
    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');
    
    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  }

  formatDate(date) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    return `${dayOfWeek}, ${month} ${day}, ${year}`;
  }

  destroy() {
    // Clear the interval to prevent memory leaks
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// ===== Timer Component =====
class TimerComponent {
  constructor(containerElement) {
    this.container = containerElement;
    this.defaultDuration = 1500; // 25 minutes in seconds
    this.remainingSeconds = this.defaultDuration;
    this.isRunning = false;
    this.intervalId = null;
    this.timerDisplayElement = null;
    this.startButton = null;
    this.stopButton = null;
    this.resetButton = null;
    this.customButton = null;
    this.storageKey = 'productivity-dashboard-timer-duration';
  }

  init() {
    // Get references to DOM elements
    this.timerDisplayElement = this.container.querySelector('.timer-display');
    this.startButton = this.container.querySelector('.timer-start');
    this.stopButton = this.container.querySelector('.timer-stop');
    this.resetButton = this.container.querySelector('.timer-reset');
    this.customButton = this.container.querySelector('.timer-custom');

    // Check if required elements exist
    if (!this.timerDisplayElement || !this.startButton || !this.stopButton || !this.resetButton) {
      throw new Error('TimerComponent: Required DOM elements not found');
    }

    // Load custom duration from localStorage
    this.loadCustomDuration();

    // Add event listeners
    this.startButton.addEventListener('click', () => this.start());
    this.stopButton.addEventListener('click', () => this.stop());
    this.resetButton.addEventListener('click', () => this.reset());
    
    if (this.customButton) {
      this.customButton.addEventListener('click', () => this.handleCustomDuration());
    }

    // Initial display update
    this.updateDisplay();
  }

  loadCustomDuration() {
    try {
      const storedDuration = localStorage.getItem(this.storageKey);
      if (storedDuration) {
        const duration = parseInt(storedDuration, 10);
        if (duration > 0) {
          this.defaultDuration = duration;
          this.remainingSeconds = duration;
        }
      }
    } catch (error) {
      console.error('Error loading custom duration from localStorage:', error);
    }
  }

  saveCustomDuration() {
    try {
      localStorage.setItem(this.storageKey, this.defaultDuration.toString());
    } catch (error) {
      console.error('Error saving custom duration to localStorage:', error);
    }
  }

  handleCustomDuration() {
    const minutes = prompt('Enter custom timer duration in minutes (1-120):', Math.floor(this.defaultDuration / 60));
    
    // User cancelled the prompt
    if (minutes === null) {
      return;
    }
    
    const parsedMinutes = parseInt(minutes, 10);
    
    // Validate input: must be a number between 1 and 120
    if (isNaN(parsedMinutes) || parsedMinutes < 1 || parsedMinutes > 120) {
      alert('Invalid input. Please enter a number between 1 and 120 minutes.');
      return;
    }
    
    // Valid input - update timer
    this.defaultDuration = parsedMinutes * 60;
    this.saveCustomDuration();
    this.reset();
  }

  start() {
    if (this.isRunning) {
      return; // Already running
    }

    this.isRunning = true;
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  stop() {
    if (!this.isRunning) {
      return; // Already stopped
    }

    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset() {
    this.stop();
    this.remainingSeconds = this.defaultDuration; // Reset to custom or default duration
    this.updateDisplay();
  }

  tick() {
    if (this.remainingSeconds > 0) {
      this.remainingSeconds--;
      this.updateDisplay();
    }

    // Stop timer when it reaches zero
    if (this.remainingSeconds === 0) {
      this.stop();
    }
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    
    // Pad with leading zeros
    const minutesStr = minutes.toString().padStart(2, '0');
    const secsStr = secs.toString().padStart(2, '0');
    
    return `${minutesStr}:${secsStr}`;
  }

  updateDisplay() {
    this.timerDisplayElement.textContent = this.formatTime(this.remainingSeconds);
  }

  destroy() {
    // Stop the timer and clear interval
    this.stop();
    
    // Remove event listeners
    if (this.startButton) {
      this.startButton.removeEventListener('click', () => this.start());
    }
    if (this.stopButton) {
      this.stopButton.removeEventListener('click', () => this.stop());
    }
    if (this.resetButton) {
      this.resetButton.removeEventListener('click', () => this.reset());
    }
  }
}

// ===== Tasks Component =====
class TasksComponent {
  constructor(containerElement) {
    this.container = containerElement;
    this.tasks = [];
    this.storageKey = 'productivity-dashboard-tasks';
    this.taskInputElement = null;
    this.taskAddButton = null;
    this.taskListElement = null;
    this.taskFormElement = null;
  }

  init() {
    // Get references to DOM elements
    this.taskInputElement = this.container.querySelector('.task-input');
    this.taskAddButton = this.container.querySelector('.task-add');
    this.taskListElement = this.container.querySelector('.task-list');
    this.taskFormElement = this.container.querySelector('.task-input-section');

    // Check if required elements exist
    if (!this.taskInputElement || !this.taskAddButton || !this.taskListElement || !this.taskFormElement) {
      throw new Error('TasksComponent: Required DOM elements not found');
    }

    // Load tasks from localStorage
    this.loadTasks();

    // Add event listener for form submission
    this.taskFormElement.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAddTask();
    });

    // Initial render
    this.renderTasks();
  }

  handleAddTask() {
    const text = this.taskInputElement.value;
    if (this.addTask(text)) {
      this.taskInputElement.value = ''; // Clear input on success
    }
  }

  addTask(text) {
    // Validate task text
    if (!this.validateTaskText(text)) {
      return false;
    }

    // Create new task object
    const task = {
      id: this.generateId(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now()
    };

    // Add to tasks array
    this.tasks.push(task);

    // Save to localStorage
    this.saveTasks();

    // Re-render
    this.renderTasks();

    return true;
  }

  editTask(taskId, newText) {
    // Validate new text
    if (!this.validateTaskText(newText)) {
      return false;
    }

    // Find task by id
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) {
      return false;
    }

    // Update task text
    task.text = newText.trim();

    // Save to localStorage
    this.saveTasks();

    // Re-render
    this.renderTasks();

    return true;
  }

  toggleTask(taskId) {
    // Find task by id
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) {
      return false;
    }

    // Toggle completion status
    task.completed = !task.completed;

    // Save to localStorage
    this.saveTasks();

    // Re-render
    this.renderTasks();

    return true;
  }

  deleteTask(taskId) {
    // Find task index
    const index = this.tasks.findIndex(t => t.id === taskId);
    if (index === -1) {
      return false;
    }

    // Remove task from array
    this.tasks.splice(index, 1);

    // Save to localStorage
    this.saveTasks();

    // Re-render
    this.renderTasks();

    return true;
  }

  generateId() {
    // Generate unique ID using timestamp and random number
    return `task-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }

  validateTaskText(text) {
    // Check if text is non-empty after trimming
    return typeof text === 'string' && text.trim().length > 0;
  }

  loadTasks() {
    try {
      const storedTasks = localStorage.getItem(this.storageKey);
      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks);
      } else {
        this.tasks = [];
      }
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      this.tasks = []; // Fallback to empty array
    }
  }

  saveTasks() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
      // Could display user-friendly message here
    }
  }

  renderTasks() {
    // Clear current list
    this.taskListElement.innerHTML = '';

    // Render each task
    this.tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = 'glass-strong rounded-lg p-4 flex items-center gap-3 task-item';
      li.dataset.taskId = task.id;

      // Checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'w-5 h-5 cursor-pointer task-checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => this.toggleTask(task.id));

      // Task text span
      const textSpan = document.createElement('span');
      textSpan.className = 'flex-1 text-white task-text';
      textSpan.textContent = task.text;
      
      // Apply completed styling
      if (task.completed) {
        textSpan.style.textDecoration = 'line-through';
        textSpan.style.opacity = '0.6';
      }

      // Edit button
      const editButton = document.createElement('button');
      editButton.className = 'px-3 py-1 text-sm rounded hover:bg-white/20 transition-all task-edit';
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => this.handleEditTask(task.id, li));

      // Delete button
      const deleteButton = document.createElement('button');
      deleteButton.className = 'px-3 py-1 text-sm rounded hover:bg-red-500/50 transition-all task-delete';
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => this.deleteTask(task.id));

      // Append all elements
      li.appendChild(checkbox);
      li.appendChild(textSpan);
      li.appendChild(editButton);
      li.appendChild(deleteButton);

      this.taskListElement.appendChild(li);
    });
  }

  handleEditTask(taskId, listItem) {
    // Find the task
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) {
      return;
    }

    // Get the text span
    const textSpan = listItem.querySelector('.task-text');
    
    // Create input field
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'task-edit-input';
    input.value = task.text;

    // Create save button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.className = 'task-save';

    // Replace text span with input
    textSpan.replaceWith(input);
    
    // Replace edit button with save button
    const editButton = listItem.querySelector('.task-edit');
    editButton.replaceWith(saveButton);

    // Focus input
    input.focus();
    input.select();

    // Save handler
    const saveEdit = () => {
      const newText = input.value;
      if (this.editTask(taskId, newText)) {
        // Success - renderTasks() will restore normal view
      } else {
        // Failed validation - restore original view
        this.renderTasks();
      }
    };

    // Add event listeners
    saveButton.addEventListener('click', saveEdit);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        saveEdit();
      }
    });
    input.addEventListener('blur', saveEdit);
  }

  destroy() {
    // Remove event listeners
    if (this.taskAddButton) {
      this.taskAddButton.removeEventListener('click', () => this.handleAddTask());
    }
    if (this.taskInputElement) {
      this.taskInputElement.removeEventListener('keypress', () => {});
    }
  }
}

// ===== Quick Links Component =====
class QuickLinksComponent {
  constructor(containerElement) {
    this.container = containerElement;
    this.links = [];
    this.storageKey = 'productivity-dashboard-links';
    this.linkUrlElement = null;
    this.linkLabelElement = null;
    this.linkAddButton = null;
    this.linkListElement = null;
    this.linkFormElement = null;
  }

  init() {
    // Get references to DOM elements
    this.linkUrlElement = this.container.querySelector('.link-url');
    this.linkLabelElement = this.container.querySelector('.link-label');
    this.linkAddButton = this.container.querySelector('.link-add');
    this.linkListElement = this.container.querySelector('.link-list');
    this.linkFormElement = this.container.querySelector('.link-input-section');

    // Check if required elements exist
    if (!this.linkUrlElement || !this.linkLabelElement || !this.linkAddButton || !this.linkListElement || !this.linkFormElement) {
      throw new Error('QuickLinksComponent: Required DOM elements not found');
    }

    // Load links from localStorage
    this.loadLinks();

    // Add event listener for form submission
    this.linkFormElement.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAddLink();
    });

    // Initial render
    this.renderLinks();
  }

  handleAddLink() {
    const url = this.linkUrlElement.value;
    const label = this.linkLabelElement.value;
    
    if (this.addLink(url, label)) {
      // Clear inputs on success
      this.linkUrlElement.value = '';
      this.linkLabelElement.value = '';
    }
  }

  addLink(url, label) {
    // Validate inputs
    if (!url || url.trim().length === 0) {
      return false;
    }
    if (!label || label.trim().length === 0) {
      return false;
    }

    // Validate and normalize URL
    const validatedUrl = this.validateUrl(url.trim());
    if (!validatedUrl) {
      return false;
    }

    // Create new link object
    const link = {
      id: this.generateId(),
      url: validatedUrl,
      label: label.trim()
    };

    // Add to links array
    this.links.push(link);

    // Save to localStorage
    this.saveLinks();

    // Re-render
    this.renderLinks();

    return true;
  }

  deleteLink(linkId) {
    // Find link index
    const index = this.links.findIndex(l => l.id === linkId);
    if (index === -1) {
      return false;
    }

    // Remove link from array
    this.links.splice(index, 1);

    // Save to localStorage
    this.saveLinks();

    // Re-render
    this.renderLinks();

    return true;
  }

  generateId() {
    // Generate unique ID using timestamp and random number
    return `link-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }

  validateUrl(url) {
    // Basic URL validation
    if (!url || url.trim().length === 0) {
      return null;
    }

    let normalizedUrl = url.trim();

    // Check if URL has a protocol
    if (!normalizedUrl.match(/^https?:\/\//i)) {
      // Add https:// prefix if missing
      normalizedUrl = 'https://' + normalizedUrl;
    }

    // Basic validation - check if it looks like a URL
    try {
      new URL(normalizedUrl);
      return normalizedUrl;
    } catch (error) {
      return null;
    }
  }

  loadLinks() {
    try {
      const storedLinks = localStorage.getItem(this.storageKey);
      if (storedLinks) {
        this.links = JSON.parse(storedLinks);
      } else {
        this.links = [];
      }
    } catch (error) {
      console.error('Error loading links from localStorage:', error);
      this.links = []; // Fallback to empty array
    }
  }

  saveLinks() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.links));
    } catch (error) {
      console.error('Error saving links to localStorage:', error);
      // Could display user-friendly message here
    }
  }

  renderLinks() {
    // Clear current list
    this.linkListElement.innerHTML = '';

    // Render each link
    this.links.forEach(link => {
      const li = document.createElement('li');
      li.className = 'glass-strong rounded-lg p-3 flex items-center justify-between gap-3 link-item';
      li.dataset.linkId = link.id;

      // Create anchor element
      const anchor = document.createElement('a');
      anchor.href = link.url;
      anchor.target = '_blank';
      anchor.className = 'text-white hover:underline flex-1 link-anchor';
      anchor.textContent = link.label;

      // Delete button
      const deleteButton = document.createElement('button');
      deleteButton.className = 'px-3 py-1 text-sm rounded hover:bg-red-500/50 transition-all link-delete';
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => this.deleteLink(link.id));

      // Append elements
      li.appendChild(anchor);
      li.appendChild(deleteButton);

      this.linkListElement.appendChild(li);
    });
  }

  destroy() {
    // Remove event listeners
    if (this.linkAddButton) {
      this.linkAddButton.removeEventListener('click', () => this.handleAddLink());
    }
    if (this.linkUrlElement) {
      this.linkUrlElement.removeEventListener('keypress', () => {});
    }
    if (this.linkLabelElement) {
      this.linkLabelElement.removeEventListener('keypress', () => {});
    }
  }
}

// ===== Application Initialization =====

/**
 * Theme Manager - Handles light/dark mode toggle
 */
class ThemeManager {
  constructor() {
    this.storageKey = 'productivity-dashboard-theme';
    this.themeToggleButton = null;
    this.themeIcon = null;
    this.isDarkTheme = false;
  }

  init() {
    // Get theme toggle button
    this.themeToggleButton = document.getElementById('theme-toggle');
    if (!this.themeToggleButton) {
      console.warn('Theme toggle button not found');
      return;
    }

    this.themeIcon = this.themeToggleButton.querySelector('.theme-icon');

    // Load saved theme
    this.loadTheme();

    // Add event listener
    this.themeToggleButton.addEventListener('click', () => this.toggleTheme());
  }

  loadTheme() {
    try {
      const storedTheme = localStorage.getItem(this.storageKey);
      this.isDarkTheme = storedTheme === 'dark';
      this.applyTheme();
    } catch (error) {
      console.error('Error loading theme from localStorage:', error);
    }
  }

  saveTheme() {
    try {
      localStorage.setItem(this.storageKey, this.isDarkTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme();
    this.saveTheme();
  }

  applyTheme() {
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
      if (this.themeIcon) {
        this.themeIcon.textContent = '☀️';
      }
    } else {
      document.body.classList.remove('dark-theme');
      if (this.themeIcon) {
        this.themeIcon.textContent = '🌙';
      }
    }
  }
}

/**
 * Check if localStorage is available
 * @returns {boolean} True if localStorage is available, false otherwise
 */
function checkLocalStorageAvailability() {
  try {
    const testKey = '__localStorage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Display warning message to user
 * @param {string} message - Warning message to display
 */
function displayWarning(message) {
  const warningDiv = document.createElement('div');
  warningDiv.className = 'warning-message';
  warningDiv.style.cssText = 'background-color: #fff3cd; color: #856404; padding: 12px; margin: 10px; border: 1px solid #ffeaa7; border-radius: 4px; text-align: center;';
  warningDiv.textContent = message;
  
  // Insert at the top of the body
  if (document.body.firstChild) {
    document.body.insertBefore(warningDiv, document.body.firstChild);
  } else {
    document.body.appendChild(warningDiv);
  }
}

/**
 * Display error message to user
 * @param {string} message - Error message to display
 */
function displayError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.style.cssText = 'background-color: #f8d7da; color: #721c24; padding: 12px; margin: 10px; border: 1px solid #f5c6cb; border-radius: 4px; text-align: center;';
  errorDiv.textContent = message;
  
  // Insert at the top of the body
  if (document.body.firstChild) {
    document.body.insertBefore(errorDiv, document.body.firstChild);
  } else {
    document.body.appendChild(errorDiv);
  }
}

/**
 * Initialize all dashboard components
 */
function initializeDashboard() {
  // Check for localStorage availability
  if (!checkLocalStorageAvailability()) {
    displayWarning('Warning: Local Storage is not available. Your data will not be saved between sessions.');
  }

  // Set up global error handler for storage quota exceeded
  window.addEventListener('error', (event) => {
    if (event.error && event.error.name === 'QuotaExceededError') {
      displayError('Storage limit reached. Please delete some items to free up space.');
    }
  });

  try {
    // Initialize Theme Manager
    const themeManager = new ThemeManager();
    themeManager.init();
    console.log('Theme manager initialized');

    // Initialize Greeting Component
    const greetingContainer = document.getElementById('greeting');
    if (!greetingContainer) {
      throw new Error('Greeting container element not found. Expected element with id="greeting".');
    }
    const greetingComponent = new GreetingComponent(greetingContainer);
    greetingComponent.init();
    console.log('Greeting component initialized');

    // Initialize Timer Component
    const timerContainer = document.getElementById('timer');
    if (!timerContainer) {
      throw new Error('Timer container element not found. Expected element with id="timer".');
    }
    const timerComponent = new TimerComponent(timerContainer);
    timerComponent.init();
    console.log('Timer component initialized');

    // Initialize Tasks Component
    const tasksContainer = document.getElementById('tasks');
    if (!tasksContainer) {
      throw new Error('Tasks container element not found. Expected element with id="tasks".');
    }
    const tasksComponent = new TasksComponent(tasksContainer);
    tasksComponent.init();
    console.log('Tasks component initialized');

    // Initialize Quick Links Component
    const quickLinksContainer = document.getElementById('quick-links');
    if (!quickLinksContainer) {
      throw new Error('Quick Links container element not found. Expected element with id="quick-links".');
    }
    const quickLinksComponent = new QuickLinksComponent(quickLinksContainer);
    quickLinksComponent.init();
    console.log('Quick Links component initialized');

    console.log('Productivity Dashboard fully initialized');
  } catch (error) {
    console.error('Error initializing dashboard:', error);
    displayError(`Initialization Error: ${error.message}`);
  }
}

// Add DOMContentLoaded event listener to trigger initialization
document.addEventListener('DOMContentLoaded', initializeDashboard);
