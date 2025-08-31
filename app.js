// FastJ Framework - Complete Interactive Application

// Application Data
const frameworkData = {
  framework: {
    name: "FastJ",
    version: "1.0.0", 
    description: "High-performance Java web framework inspired by FastAPI",
    features: [
      "Annotation-driven development",
      "Automatic OpenAPI generation", 
      "Virtual threads support",
      "Type safety and validation",
      "Dependency injection",
      "Minimal configuration",
      "JSON serialization",
      "High performance async"
    ]
  },
  annotations: [
    {
      name: "@FastJApplication",
      description: "Marks the main application class and enables auto-configuration",
      example: "@FastJApplication\n@EnableSwagger\npublic class MyApplication {\n    public static void main(String[] args) {\n        FastJ.run(MyApplication.class, args);\n    }\n}"
    },
    {
      name: "@Get",
      description: "Maps HTTP GET requests to controller methods",
      example: "@Get(\"/users\")\n@Description(\"Get all users\")\npublic List<User> getUsers() {\n    return userService.findAll();\n}"
    },
    {
      name: "@Post", 
      description: "Maps HTTP POST requests to controller methods",
      example: "@Post(\"/users\")\n@Validate\npublic User createUser(@RequestBody User user) {\n    return userService.create(user);\n}"
    },
    {
      name: "@Put",
      description: "Maps HTTP PUT requests to controller methods", 
      example: "@Put(\"/users/{id}\")\npublic User updateUser(@PathParam String id, @RequestBody User user) {\n    return userService.update(id, user);\n}"
    },
    {
      name: "@Delete",
      description: "Maps HTTP DELETE requests to controller methods",
      example: "@Delete(\"/users/{id}\")\npublic ResponseEntity<Void> deleteUser(@PathParam String id) {\n    userService.deleteById(id);\n    return ResponseEntity.noContent().build();\n}"
    },
    {
      name: "@Validate",
      description: "Enables automatic JSR-303 bean validation",
      example: "@Post(\"/users\")\n@Validate\npublic User createUser(@RequestBody @Valid User user) {\n    return userService.create(user);\n}"
    }
  ],
  endpoints: [
    {
      method: "GET",
      path: "/api/users",
      description: "Retrieve all users with optional pagination",
      response: [
        {
          "id": 1,
          "name": "John Doe", 
          "email": "john@example.com",
          "age": 30,
          "status": "ACTIVE"
        }
      ]
    },
    {
      method: "POST", 
      path: "/api/users",
      description: "Create a new user with validation",
      request: {
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "age": 32
      },
      response: {
        "id": 3,
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "age": 32,
        "status": "ACTIVE"
      }
    }
  ]
};

// Application State Management
class AppState {
  constructor() {
    this.currentSection = 'dashboard';
    this.currentTab = 'application'; // Default to first tab
  }

  setSection(section) {
    this.currentSection = section;
  }

  setTab(tab) {
    this.currentTab = tab;
  }
}

const appState = new AppState();

// DOM Utilities
const dom = {
  $(selector) {
    return document.querySelector(selector);
  },

  $$(selector) {
    return document.querySelectorAll(selector);
  },

  addClass(element, className) {
    if (element) element.classList.add(className);
  },

  removeClass(element, className) {
    if (element) element.classList.remove(className);
  },

  hasClass(element, className) {
    return element ? element.classList.contains(className) : false;
  }
};

// Navigation Management
function setupNavigation() {
  const navLinks = dom.$$('.nav-link');
  const mobileMenuBtn = dom.$('.mobile-menu-btn');
  const navMenu = dom.$('.nav-menu');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const route = link.dataset.route;
      if (route) {
        showSection(route);

        if (dom.hasClass(navMenu, 'show')) {
          dom.removeClass(navMenu, 'show');
        }
      }
    });
  });

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      if (dom.hasClass(navMenu, 'show')) {
        dom.removeClass(navMenu, 'show');
      } else {
        dom.addClass(navMenu, 'show');
      }
    });
  }
}

// Section Management
function showSection(sectionName) {
  const sections = dom.$$('.page-section');
  const navLinks = dom.$$('.nav-link');

  // Hide all sections
  sections.forEach(section => {
    dom.removeClass(section, 'active');
  });

  // Show target section
  const targetSection = dom.$(`#${sectionName}`);
  if (targetSection) {
    dom.addClass(targetSection, 'active');
  }

  // Update navigation
  navLinks.forEach(link => {
    dom.removeClass(link, 'active');
    if (link.dataset.route === sectionName) {
      dom.addClass(link, 'active');
    }
  });

  appState.setSection(sectionName);

  // Initialize section-specific functionality
  switch (sectionName) {
    case 'api-explorer':
      initializeApiExplorer();
      break;
    case 'demo':
      initializeDemo();
      break;
    case 'docs':
      initializeDocs();
      break;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// API Explorer Functionality
function initializeApiExplorer() {
  renderEndpoints();
  setupApiTester();
}

function renderEndpoints() {
  const container = dom.$('#endpoints-container');
  if (!container) return;

  container.innerHTML = '';

  frameworkData.endpoints.forEach((endpoint, index) => {
    const endpointItem = document.createElement('div');
    endpointItem.className = 'endpoint-item';
    endpointItem.innerHTML = `
      <span class="method-badge ${endpoint.method.toLowerCase()}">${endpoint.method}</span>
      <div class="endpoint-info">
        <div class="endpoint-path">${endpoint.path}</div>
        <div class="endpoint-description">${endpoint.description}</div>
      </div>
    `;

    endpointItem.addEventListener('click', () => {
      selectEndpoint(endpoint);
    });

    container.appendChild(endpointItem);
  });
}

function selectEndpoint(endpoint) {
  const methodSelect = dom.$('#method-select');
  const endpointInput = dom.$('#endpoint-input');
  const requestBody = dom.$('#request-body');

  if (methodSelect) methodSelect.value = endpoint.method;
  if (endpointInput) endpointInput.value = endpoint.path;

  if (requestBody && endpoint.request) {
    requestBody.value = JSON.stringify(endpoint.request, null, 2);
  } else if (requestBody) {
    requestBody.value = '';
  }
}

function setupApiTester() {
  const testBtn = dom.$('#test-api-btn');
  if (!testBtn) return;

  testBtn.addEventListener('click', async () => {
    const method = dom.$('#method-select')?.value;
    const endpoint = dom.$('#endpoint-input')?.value;

    if (!method || !endpoint) {
      showApiResponse({ error: 'Please select a method and endpoint' });
      return;
    }

    // Show loading
    showLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const matchingEndpoint = frameworkData.endpoints.find(ep => 
        ep.method === method && ep.path === endpoint
      );

      if (matchingEndpoint) {
        showApiResponse(matchingEndpoint.response);
      } else {
        showApiResponse({
          error: "Endpoint not found",
          message: `${method} ${endpoint} is not implemented in this demo`
        });
      }
    } catch (error) {
      showApiResponse({ error: 'Request failed', details: error.message });
    } finally {
      showLoading(false);
    }
  });
}

function showApiResponse(response) {
  const responseElement = dom.$('#api-response');
  if (responseElement) {
    responseElement.textContent = JSON.stringify(response, null, 2);
  }
}

// Demo Tab Management - FIXED FOR ALL 6 TABS
function initializeDemo() {
  setupDemoTabs();
  showDemoTab(appState.currentTab || 'application');
}

function setupDemoTabs() {
  const tabBtns = dom.$$('.tab-btn');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.dataset.tab;
      if (tabName) {
        showDemoTab(tabName);
      }
    });
  });
}

function showDemoTab(tabName) {
  console.log('Showing demo tab:', tabName);

  const tabBtns = dom.$$('.tab-btn');
  const demoPanels = dom.$$('.demo-panel');

  // Update tab buttons
  tabBtns.forEach(btn => {
    dom.removeClass(btn, 'active');
    if (btn.dataset.tab === tabName) {
      dom.addClass(btn, 'active');
    }
  });

  // Update demo panels - FIXED: Now looks for all 6 possible panels
  demoPanels.forEach(panel => {
    dom.removeClass(panel, 'active');
  });

  const targetPanel = dom.$(`#${tabName}-demo`);
  if (targetPanel) {
    dom.addClass(targetPanel, 'active');
    console.log('Activated panel:', `#${tabName}-demo`);
  } else {
    console.warn('Panel not found:', `#${tabName}-demo`);
  }

  appState.setTab(tabName);

  // Highlight code after switching tabs
  setTimeout(() => {
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll();
    }
  }, 100);
}

// Documentation Initialization  
function initializeDocs() {
  renderAnnotationsList();

  setTimeout(() => {
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll();
    }
  }, 100);
}

function renderAnnotationsList() {
  const container = dom.$('#annotations-list');
  if (!container) return;

  container.innerHTML = '';

  frameworkData.annotations.forEach(annotation => {
    const annotationItem = document.createElement('div');
    annotationItem.className = 'annotation-item';
    annotationItem.innerHTML = `
      <div class="annotation-name">${annotation.name}</div>
      <div class="annotation-description">${annotation.description}</div>
      <div class="annotation-example">${annotation.example}</div>
    `;

    container.appendChild(annotationItem);
  });
}

// Copy Code Functionality
function copyCode(button) {
  const codeBlock = button.previousElementSibling?.querySelector('code') || 
                    button.parentElement?.querySelector('code');

  if (codeBlock) {
    const text = codeBlock.textContent;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showCopyFeedback(button, 'Copied!');
      }).catch(() => {
        fallbackCopy(text, button);
      });
    } else {
      fallbackCopy(text, button);
    }
  }
}

function fallbackCopy(text, button) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.select();

  try {
    document.execCommand('copy');
    showCopyFeedback(button, 'Copied!');
  } catch (err) {
    showCopyFeedback(button, 'Copy failed');
  }

  document.body.removeChild(textArea);
}

function showCopyFeedback(button, message) {
  const originalText = button.textContent;
  button.textContent = message;
  button.style.background = '#059669';
  button.style.color = 'white';

  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = '';
    button.style.color = '';
  }, 2000);
}

// Loading Management
function showLoading(show) {
  const overlay = dom.$('#loading-overlay');
  if (overlay) {
    if (show) {
      dom.addClass(overlay, 'show');
    } else {
      dom.removeClass(overlay, 'show');
    }
  }
}

// Initialize Application
function initializeApp() {
  console.log('🚀 Initializing FastJ Framework Demo...');

  setupNavigation();
  showSection(appState.currentSection);

  // Make functions globally available
  window.showSection = showSection;
  window.showDemoTab = showDemoTab;
  window.copyCode = copyCode;

  console.log('✅ FastJ Framework Demo initialized successfully!');
  console.log('📋 Available demo tabs: application, controller, model, service, config, complete');
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}