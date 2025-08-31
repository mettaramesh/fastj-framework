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
      description: "Marks the main application class",
      example: "@FastJApplication\npublic class MyApp { }"
    },
    {
      name: "@Get",
      description: "Maps GET requests to methods",
      example: "@Get(\"/users\")\npublic List<User> getUsers() { }"
    },
    {
      name: "@Post", 
      description: "Maps POST requests to methods",
      example: "@Post(\"/users\")\npublic User createUser(@RequestBody User user) { }"
    },
    {
      name: "@Put",
      description: "Maps PUT requests to methods", 
      example: "@Put(\"/users/{id}\")\npublic User updateUser(@PathParam String id, @RequestBody User user) { }"
    },
    {
      name: "@Delete",
      description: "Maps DELETE requests to methods",
      example: "@Delete(\"/users/{id}\")\npublic void deleteUser(@PathParam String id) { }"
    },
    {
      name: "@Path",
      description: "Defines the base path for controller",
      example: "@Path(\"/api/v1\")\npublic class UserController { }"
    },
    {
      name: "@RequestBody",
      description: "Binds request body to parameter",
      example: "public User create(@RequestBody User user) { }"
    },
    {
      name: "@PathParam",
      description: "Binds path parameter to method parameter",
      example: "public User getUser(@PathParam String id) { }"
    },
    {
      name: "@QueryParam",
      description: "Binds query parameter to method parameter", 
      example: "public List<User> getUsers(@QueryParam int limit) { }"
    },
    {
      name: "@Validate",
      description: "Enables automatic validation",
      example: "@Post(\"/users\")\n@Validate\npublic User create(@RequestBody User user) { }"
    }
  ],
  endpoints: [
    {
      method: "GET",
      path: "/api/users",
      description: "Get all users",
      response: [
        {"id": 1, "name": "John Doe", "email": "john@example.com"},
        {"id": 2, "name": "Jane Smith", "email": "jane@example.com"}
      ]
    },
    {
      method: "POST", 
      path: "/api/users",
      description: "Create a new user",
      request: {"name": "New User", "email": "user@example.com"},
      response: {"id": 3, "name": "New User", "email": "user@example.com"}
    },
    {
      method: "GET",
      path: "/api/users/{id}",
      description: "Get user by ID", 
      response: {"id": 1, "name": "John Doe", "email": "john@example.com"}
    },
    {
      method: "PUT",
      path: "/api/users/{id}",
      description: "Update user by ID",
      request: {"name": "Updated User", "email": "updated@example.com"},
      response: {"id": 1, "name": "Updated User", "email": "updated@example.com"}
    },
    {
      method: "DELETE", 
      path: "/api/users/{id}",
      description: "Delete user by ID",
      response: {"message": "User deleted successfully"}
    },
    {
      method: "GET",
      path: "/api/health",
      description: "Health check endpoint",
      response: {"status": "healthy", "timestamp": "2025-08-30T20:33:00Z"}
    }
  ]
};

// Mock user data for demo
let mockUsers = [
  {"id": 1, "name": "John Doe", "email": "john@example.com"},
  {"id": 2, "name": "Jane Smith", "email": "jane@example.com"},
  {"id": 3, "name": "Bob Johnson", "email": "bob@example.com"}
];

let nextUserId = 4;

// Global function to show sections
function showSection(sectionName) {
  console.log('Showing section:', sectionName);
  
  // Hide all sections
  const sections = document.querySelectorAll('.page-section');
  sections.forEach(section => {
    section.classList.remove('active');
  });
  
  // Show target section
  const targetSection = document.getElementById(sectionName);
  if (targetSection) {
    targetSection.classList.add('active');
    console.log('Section shown:', sectionName);
  } else {
    console.error('Section not found:', sectionName);
  }
  
  // Update active nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-route') === sectionName) {
      link.classList.add('active');
    }
  });
  
  // Update URL without page refresh
  try {
    history.pushState({section: sectionName}, '', `#${sectionName}`);
  } catch (e) {
    console.warn('Could not update history:', e);
  }
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  
  initializeNavigation();
  populateEndpoints();
  populateAnnotations();
  loadUsers();
  setupMobileMenu();
  
  // Handle initial hash
  const hash = window.location.hash.substring(1);
  if (hash && ['api-explorer', 'demo', 'docs'].includes(hash)) {
    showSection(hash);
  }
});

// Navigation
function initializeNavigation() {
  console.log('Initializing navigation...');
  
  const navLinks = document.querySelectorAll('.nav-link');
  console.log('Found nav links:', navLinks.length);
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const route = this.getAttribute('data-route');
      console.log('Nav link clicked:', route);
      showSection(route);
    });
  });
  
  // Setup hero button navigation
  const getStartedBtn = document.querySelector('.hero-actions .btn--primary');
  const viewDemoBtn = document.querySelector('.hero-actions .btn--outline');
  
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', function() {
      showSection('docs');
    });
  }
  
  if (viewDemoBtn) {
    viewDemoBtn.addEventListener('click', function() {
      showSection('demo');
    });
  }
}

// Mobile menu
function setupMobileMenu() {
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', function() {
      const isVisible = navMenu.style.display === 'flex';
      navMenu.style.display = isVisible ? 'none' : 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '100%';
      navMenu.style.left = '0';
      navMenu.style.right = '0';
      navMenu.style.backgroundColor = 'var(--color-surface)';
      navMenu.style.boxShadow = 'var(--shadow-lg)';
      navMenu.style.padding = 'var(--space-16)';
    });
  }
}

// API Explorer
function populateEndpoints() {
  console.log('Populating endpoints...');
  const container = document.getElementById('endpoints-container');
  if (!container) {
    console.warn('Endpoints container not found');
    return;
  }
  
  container.innerHTML = '';
  
  frameworkData.endpoints.forEach(endpoint => {
    const endpointDiv = document.createElement('div');
    endpointDiv.className = 'endpoint-item';
    endpointDiv.onclick = () => selectEndpoint(endpoint);
    
    endpointDiv.innerHTML = `
      <div>
        <span class="endpoint-method method-${endpoint.method.toLowerCase()}">${endpoint.method}</span>
        <span class="endpoint-path">${endpoint.path}</span>
      </div>
      <div class="endpoint-description">${endpoint.description}</div>
    `;
    
    container.appendChild(endpointDiv);
  });
  
  console.log('Endpoints populated:', frameworkData.endpoints.length);
}

function selectEndpoint(endpoint) {
  console.log('Selecting endpoint:', endpoint);
  
  const methodSelect = document.getElementById('test-method');
  const urlInput = document.getElementById('test-url');
  const bodyTextarea = document.getElementById('test-body');
  
  if (methodSelect) methodSelect.value = endpoint.method;
  if (urlInput) urlInput.value = endpoint.path;
  
  if (bodyTextarea) {
    if (endpoint.request) {
      bodyTextarea.value = JSON.stringify(endpoint.request, null, 2);
    } else {
      bodyTextarea.value = '';
    }
  }
}

async function testApi() {
  console.log('Testing API...');
  
  const method = document.getElementById('test-method')?.value || 'GET';
  const url = document.getElementById('test-url')?.value || '/api/health';
  const body = document.getElementById('test-body')?.value || '';
  
  const statusEl = document.getElementById('response-status');
  const timeEl = document.getElementById('response-time');
  const bodyEl = document.getElementById('response-body');
  
  // Show loading
  if (statusEl) statusEl.textContent = 'Status: Loading...';
  if (timeEl) timeEl.textContent = 'Time: -';
  if (bodyEl) bodyEl.textContent = 'Loading...';
  
  const startTime = Date.now();
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 100));
    
    const response = await mockApiCall(method, url, body);
    const endTime = Date.now();
    
    if (statusEl) statusEl.textContent = `Status: ${response.status} ${getStatusText(response.status)}`;
    if (timeEl) timeEl.textContent = `Time: ${endTime - startTime}ms`;
    if (bodyEl) bodyEl.textContent = JSON.stringify(response.data, null, 2);
    
    console.log('API test completed:', response);
    
  } catch (error) {
    const endTime = Date.now();
    console.error('API test failed:', error);
    
    if (statusEl) statusEl.textContent = 'Status: 500 Internal Server Error';
    if (timeEl) timeEl.textContent = `Time: ${endTime - startTime}ms`;
    if (bodyEl) bodyEl.textContent = JSON.stringify({error: error.message}, null, 2);
  }
}

function getStatusText(status) {
  const statusTexts = {
    200: 'OK',
    201: 'Created',
    400: 'Bad Request',
    404: 'Not Found',
    500: 'Internal Server Error'
  };
  return statusTexts[status] || 'Unknown';
}

async function mockApiCall(method, url, body) {
  // Handle dynamic endpoints like /api/users/{id}
  if (url.includes('/api/users/') && method === 'GET') {
    const id = parseInt(url.split('/').pop());
    const user = mockUsers.find(u => u.id === id);
    if (user) {
      return { status: 200, data: user };
    }
    return { status: 404, data: { error: 'User not found' } };
  }
  
  if (url === '/api/users' && method === 'GET') {
    return { status: 200, data: mockUsers };
  }
  
  if (url === '/api/users' && method === 'POST') {
    try {
      const userData = JSON.parse(body);
      const newUser = {
        id: nextUserId++,
        name: userData.name,
        email: userData.email
      };
      mockUsers.push(newUser);
      return { status: 201, data: newUser };
    } catch (e) {
      return { status: 400, data: { error: 'Invalid JSON in request body' } };
    }
  }
  
  if (url === '/api/health' && method === 'GET') {
    return {
      status: 200,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: '2h 15m 30s',
        version: '1.0.0'
      }
    };
  }
  
  // Check static endpoints
  const endpoint = frameworkData.endpoints.find(e => 
    e.method === method && e.path === url
  );
  
  if (endpoint) {
    return {
      status: 200,
      data: endpoint.response
    };
  }
  
  // Default response
  return {
    status: 404,
    data: { error: 'Endpoint not found' }
  };
}

// Demo Section
function showDemoTab(tabName) {
  console.log('Showing demo tab:', tabName);
  
  // Hide all demo content
  const contents = document.querySelectorAll('.demo-content');
  contents.forEach(content => {
    content.classList.remove('active');
  });
  
  // Remove active class from tabs
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Show target content and activate tab
  const targetContent = document.getElementById(`${tabName}-demo`);
  if (targetContent) {
    targetContent.classList.add('active');
  }
  
  // Activate clicked tab
  if (event && event.target) {
    event.target.classList.add('active');
  }
}

// User Management Demo
function loadUsers() {
  console.log('Loading users...');
  const usersList = document.getElementById('users-list');
  if (!usersList) {
    console.warn('Users list element not found');
    return;
  }
  
  usersList.innerHTML = '';
  
  mockUsers.forEach(user => {
    const userDiv = document.createElement('div');
    userDiv.className = 'user-item';
    userDiv.innerHTML = `
      <div>
        <strong>${user.name}</strong><br>
        <small>${user.email}</small>
      </div>
      <div class="user-actions">
        <button class="edit-btn" onclick="editUser(${user.id})">Edit</button>
        <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
      </div>
    `;
    usersList.appendChild(userDiv);
  });
  
  console.log('Users loaded:', mockUsers.length);
}

async function createUser() {
  console.log('Creating user...');
  
  const nameInput = document.getElementById('user-name');
  const emailInput = document.getElementById('user-email');
  
  if (!nameInput || !emailInput) {
    console.error('User form inputs not found');
    return;
  }
  
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  
  if (!name || !email) {
    showNotification('Please fill in all fields', 'error');
    return;
  }
  
  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showNotification('Please enter a valid email address', 'error');
    return;
  }
  
  // Simulate API call
  const newUser = {
    id: nextUserId++,
    name: name,
    email: email
  };
  
  mockUsers.push(newUser);
  loadUsers();
  
  // Clear form
  nameInput.value = '';
  emailInput.value = '';
  
  // Show success message
  showNotification('User created successfully!', 'success');
  console.log('User created:', newUser);
}

function editUser(id) {
  console.log('Editing user:', id);
  
  const user = mockUsers.find(u => u.id === id);
  if (!user) return;
  
  const newName = prompt('Edit name:', user.name);
  if (newName && newName.trim()) {
    user.name = newName.trim();
    loadUsers();
    showNotification('User updated successfully!', 'success');
  }
}

function deleteUser(id) {
  console.log('Deleting user:', id);
  
  if (confirm('Are you sure you want to delete this user?')) {
    mockUsers = mockUsers.filter(u => u.id !== id);
    loadUsers();
    showNotification('User deleted successfully!', 'success');
  }
}

// Documentation
function populateAnnotations() {
  console.log('Populating annotations...');
  const container = document.getElementById('annotations-list');
  if (!container) {
    console.warn('Annotations container not found');
    return;
  }
  
  container.innerHTML = '';
  
  frameworkData.annotations.forEach(annotation => {
    const annotationDiv = document.createElement('div');
    annotationDiv.className = 'annotation-item';
    
    annotationDiv.innerHTML = `
      <div class="annotation-name">${annotation.name}</div>
      <div class="annotation-description">${annotation.description}</div>
      <div class="annotation-example">${annotation.example}</div>
    `;
    
    container.appendChild(annotationDiv);
  });
  
  console.log('Annotations populated:', frameworkData.annotations.length);
}

function showDocsSection(sectionName) {
  console.log('Showing docs section:', sectionName);
  
  // Hide all docs sections
  const sections = document.querySelectorAll('.docs-section');
  sections.forEach(section => {
    section.classList.remove('active');
  });
  
  // Show target section
  const targetSection = document.getElementById(sectionName);
  if (targetSection) {
    targetSection.classList.add('active');
  }
}

// Utility Functions
function copyCode(button) {
  const codeBlock = button.closest('.code-example').querySelector('code');
  if (!codeBlock) return;
  
  const text = codeBlock.textContent;
  
  navigator.clipboard.writeText(text).then(() => {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.style.background = 'var(--color-success)';
    
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = 'var(--color-primary)';
    }, 2000);
    
    showNotification('Code copied to clipboard!', 'success');
  }).catch(err => {
    console.error('Failed to copy code:', err);
    showNotification('Failed to copy code', 'error');
  });
}

function showNotification(message, type = 'info') {
  console.log('Showing notification:', message, type);
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()">&times;</button>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--color-surface);
    color: var(--color-text);
    padding: var(--space-12) var(--space-16);
    border-radius: var(--radius-base);
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-lg);
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: var(--space-12);
    min-width: 300px;
    animation: slideIn 0.3s ease-out;
    max-width: 400px;
  `;
  
  // Add type-specific styling
  if (type === 'success') {
    notification.style.borderColor = 'var(--color-success)';
    notification.style.background = 'rgba(var(--color-success-rgb), 0.1)';
  } else if (type === 'error') {
    notification.style.borderColor = 'var(--color-error)';
    notification.style.background = 'rgba(var(--color-error-rgb), 0.1)';
  }
  
  // Add close button styling
  const closeBtn = notification.querySelector('button');
  closeBtn.style.cssText = `
    background: none;
    border: none;
    color: var(--color-text-secondary);
    cursor: pointer;
    font-size: 18px;
    padding: 0;
    margin-left: auto;
  `;
  
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

// Handle browser back/forward
window.addEventListener('popstate', function(event) {
  if (event.state && event.state.section) {
    showSection(event.state.section);
  }
});

// Export functions for global access
window.showSection = showSection;
window.showDemoTab = showDemoTab;
window.showDocsSection = showDocsSection;
window.testApi = testApi;
window.createUser = createUser;
window.editUser = editUser;
window.deleteUser = deleteUser;
window.copyCode = copyCode;