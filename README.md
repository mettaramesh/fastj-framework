# FastJ Framework - Complete Demo Website

A comprehensive demonstration website for the **FastJ Framework**, a high-performance Java web framework inspired by FastAPI.

## 🚀 Features

- **Interactive Dashboard** - Framework overview with performance metrics
- **API Explorer** - Live endpoint testing interface  
- **Complete Code Examples** - 6 comprehensive tabs with full application examples
- **Performance Benchmarks** - Charts comparing FastJ with other Java frameworks
- **Comprehensive Documentation** - Architecture guides and getting started tutorials

## 📁 Project Structure

```
fastj-framework/
├── index.html          # Main application (Complete HTML with all sections)
├── style.css           # Complete styling system (responsive, accessible)
├── app.js              # Interactive JavaScript functionality
├── java_framework_startup_time.png     # Performance comparison chart
├── java_concurrency_comparison.png     # Concurrency comparison chart
├── README.md           # This file
└── netlify.toml        # Optional Netlify configuration
```

## 🌐 Deployment to Netlify

### Quick Deploy Method (5 minutes):

1. **Prepare Files:**
   - Download all files to a folder called `fastj-framework`
   - Add the 2 performance chart images to the same folder

2. **Deploy:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Log in
   - Click "Add new site" → "Deploy manually"
   - Drag & drop your `fastj-framework` folder
   - Your site deploys automatically!

3. **Customize URL:**
   - Click on your site name in Netlify dashboard
   - Go to "Site settings" → "Change site name"
   - Choose: `fastj-framework-demo` or similar
   - Your site: `https://your-chosen-name.netlify.app`

### GitHub Method (For continuous deployment):

1. Upload files to GitHub repository
2. Connect repository to Netlify
3. Automatic deployments on every commit

## 🎯 Key Sections

### Dashboard
- Framework overview and key metrics
- Performance statistics  
- Feature highlights

### API Explorer  
- Interactive endpoint testing
- Real-time API responses
- Method and parameter selection

### Demo Examples
Six comprehensive code example tabs:
- **Main Application** - Complete bootstrap setup
- **REST Controller** - Full CRUD operations 
- **Data Models** - Entity classes with validation
- **Service Layer** - Async service implementations
- **Configuration** - Database and performance config
- **Complete Example** - Full project structure with Maven

### Documentation
- FastJ framework highlights and features
- Performance comparison charts
- Getting started guide
- Core annotations reference
- Advanced features overview

## 📊 Performance Charts

The site includes two key performance comparison charts:

1. **java_framework_startup_time.png** - Framework performance comparison
2. **java_concurrency_comparison.png** - Concurrency capabilities comparison

## 🎨 Design Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Accessibility** - WCAG compliant with keyboard navigation
- **Modern UI** - Clean design with smooth animations
- **Professional Styling** - Optimized for developer audiences

## 🔧 Local Development

1. **Simple HTTP Server:**
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js  
   npx serve .

   # PHP
   php -S localhost:8000
   ```

2. **Open in browser:**
   ```
   http://localhost:8000
   ```

## ⚡ Performance Features

- **Fast Loading** - Optimized assets and minimal dependencies
- **Smooth Interactions** - Hardware-accelerated animations
- **Mobile Optimized** - Touch-friendly interface
- **SEO Ready** - Semantic HTML structure

## 🚀 What Makes FastJ Special

FastJ brings **FastAPI's developer experience** to Java with:

- **JSR-303 Bean Validation** (like Pydantic)
- **Virtual Threads + CompletableFuture** (Massive async support)
- **245ms startup time** (11x faster than Spring Boot)
- **45MB memory footprint** (vs Spring Boot's 120MB)
- **15,000+ concurrent users** (30x more than traditional Java)

## 📱 Browser Support

- **Modern Browsers:** Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Mobile:** iOS Safari 14+, Android Chrome 88+
- **Graceful Degradation:** Basic functionality in older browsers

## 🛠️ Customization

### Colors
Edit CSS variables in `style.css`:
```css
:root {
  --color-primary: #2563eb;
  --color-secondary: #10b981;
  /* ... more variables */
}
```

### Content
Edit the `frameworkData` object in `app.js` to modify:
- API endpoints
- Code examples  
- Framework features

## 🆘 Troubleshooting

### Common Issues:

1. **CSS not loading:** Ensure `style.css` is in the same directory as `index.html`
2. **JavaScript errors:** Check browser console for specific errors
3. **Images not showing:** Verify chart PNG files are in the root directory
4. **Demo tabs not working:** Ensure `app.js` is loaded correctly

### Debug Mode:
Open browser developer tools (F12) to see console logs and debug information.

## 📄 License

This demo website is open source and available under the MIT License.

---

**FastJ Framework Demo** - Showcasing the future of Java web development with FastAPI-inspired simplicity and Java's enterprise-grade performance.

For questions or support, please open an issue in the repository.
