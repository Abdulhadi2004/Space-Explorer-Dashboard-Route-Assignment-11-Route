# 🚀 COSMOS - Space Dashboard

A modern, interactive web-based dashboard for exploring real-time space data. COSMOS provides users with an immersive experience to discover astronomy pictures, track rocket launches, and explore our solar system's planets.

![COSMOS](./assets/images/favicon.png)

## ✨ Features

### 1. **Today in Space** 📸

- Displays NASA's Astronomy Picture of the Day (APOD)
- Beautiful full-resolution media viewer (images and videos)
- Date picker to browse historical APOD entries
- Detailed descriptions and metadata for each image
- Going back to June 16, 1995

### 2. **Upcoming Launches** 🚀

- Real-time tracking of upcoming space missions
- Featured launch highlights with detailed information
- Comprehensive launch listing with mission details
- Launch provider and mission status information
- Live data from SpaceDevs API

### 3. **Solar System Explorer** 🪐

- Interactive exploration of all 8 planets
- Detailed planet information cards with key statistics:
  - Distance from the Sun (Semimajor Axis)
  - Diameter and radius measurements
  - Mass and density calculations
  - Orbital and rotation periods
  - Number of moons
  - Surface gravity
- Discovery information for each celestial body
- Orbital characteristics (perihelion, aphelion, eccentricity)
- Comparative planet table for easy reference
- Quick facts about each planet

## 🛠️ Technology Stack

### Frontend

- **HTML5** - Semantic markup and structure
- **Tailwind CSS v4** - Utility-first CSS framework for responsive design
- **JavaScript (Vanilla)** - Interactive functionality and API integration
- **Font Awesome 6.4** - Icon library for UI elements
- **Google Fonts** - Space Grotesk and Inter typography

### APIs Used

- **NASA APOD API** - Astronomy Picture of the Day data
- **SpaceDevs API** - Upcoming rocket launches information
- **NASA Planets API** - Planetary data and information

## 📁 Project Structure

```
COSMOS - Space Dashboard/
├── index.html                 # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css         # Compiled Tailwind CSS styles
│   ├── images/
│   │   ├── favicon.png       # Site favicon
│   │   ├── earth.png         # Planet images
│   │   └── [other images]
│   └── js/
│       └── index.js          # Main JavaScript application
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for API calls)
- No installation required!

### Installation

1. **Clone or download the project**

```bash
git clone <repository-url>
cd "COSMOS - Space Dashboard"
```

2. **Open the application**

   - Simply open `index.html` in your web browser
   - Or use a local server for best performance:

   ```bash
   python -m http.server 8000
   # or with Node.js
   npx http-server
   ```

3. **Access the dashboard**
   - Open your browser and navigate to `http://localhost:8000`

## 📖 Usage

### Navigation

- **Sidebar Navigation** - Switch between three main sections:

  - Today in Space (default view)
  - Launches
  - Planets

- **Responsive Design** - Mobile-friendly layout with hamburger menu for smaller screens
- **Header Status** - Live data indicator showing connection status and cosmic statistics

### Today in Space Section

1. Browse the latest NASA Astronomy Picture of the Day
2. Use the date picker to explore historical images (since June 16, 1995)
3. Click "View Full Resolution" to download high-quality versions
4. Read detailed descriptions and metadata

### Launches Section

1. View featured upcoming space missions
2. See all scheduled launches in a grid layout
3. Track mission details including:
   - Launch provider
   - Mission name
   - Launch window and date
   - Rocket information

### Planets Section

1. **Planet Grid** - Visual overview of all 8 planets
2. **Planet Details** - Click any planet to see:
   - Large planet image
   - Comprehensive physical characteristics
   - Discovery information
   - Orbital characteristics
   - Quick facts
3. **Planet Comparison Table** - Compare all planets side-by-side

## 🎨 Design Features

### Visual Design

- **Dark Space-Themed UI** - Custom color scheme inspired by the cosmos
- **Gradient Backgrounds** - Beautiful linear gradients from dark space blue to slate
- **Glassmorphism Effects** - Backdrop blur effects for modern aesthetics
- **Smooth Animations** - Transitions and hover effects throughout
- **Custom Scrollbar** - Styled scrollbars matching the design theme

### Responsive Breakpoints

- **Mobile** - Optimized for phones (< 40rem)
- **Tablet** - Adapts to tablet screens (40rem - 64rem)
- **Desktop** - Full experience on larger screens (> 64rem)
- **Extra Large** - Enhanced layouts for 4K displays (> 80rem)

## 🔌 API Configuration

The application uses the following API endpoints:

### NASA APOD API

```
https://api.nasa.gov/planetary/apod?api_key={API_KEY}&date={DATE}
```

- Current API Key: `t7EIqf7kAwkistv7M4fMnXci8lWGCjqvrf9EJkpn`
- Supports custom dates in `YYYY-MM-DD` format

### SpaceDevs Launches API

- Provides real-time rocket launch data
- No authentication required

### NASA Planets API

- Returns planetary data and characteristics
- Used for planet information and statistics

## 🛡️ Configuration

### Planet Color Configuration

Each planet has a custom color for visual distinction:

```javascript
const planetConfig = {
  mercury: { color: "#eab308", order: 1 },
  venus: { color: "#f97316", order: 2 },
  earth: { color: "#3b82f6", order: 3 },
  mars: { color: "#ef4444", order: 4 },
  jupiter: { color: "#fb923c", order: 5 },
  saturn: { color: "#facc15", order: 6 },
  uranus: { color: "#06b6d4", order: 7 },
  neptune: { color: "#2563eb", order: 8 },
};
```

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## 🔄 Data Updates

- **APOD Data** - Updated daily
- **Launches Data** - Real-time updates from SpaceDevs
- **Planet Information** - Static data (updated occasionally)

## 📝 Key Components

### HTML Structure

- Sidebar navigation with user profile section
- Fixed header with live data indicators
- Main content sections with dynamic content loading
- Responsive grid layouts

### JavaScript Functionality

- Async API calls with error handling
- DOM manipulation for dynamic content rendering
- Event listeners for navigation and user interactions
- Date formatting utilities
- Data caching and management

### CSS Features

- Tailwind CSS utility classes
- Custom CSS variables for theming
- Responsive design with media queries
- Custom animations and transitions
- Scrollbar styling

## 🐛 Troubleshooting

### Images Not Loading

- Check internet connection
- Verify API endpoints are accessible
- Clear browser cache and reload

### Date Picker Not Working

- Ensure browser supports HTML5 date input
- Check that JavaScript is enabled
- Verify API key is valid

### Launch Data Not Displaying

- Check SpaceDevs API availability
- Verify network connection
- Try refreshing the page

## 📈 Performance

- **Lazy Loading** - Images load on demand
- **Efficient CSS** - Minified Tailwind CSS
- **Optimized JavaScript** - Vanilla JS with minimal dependencies
- **Responsive Images** - Appropriate sizing for different screen sizes

## 🤝 Contributing

Contributions are welcome! To improve COSMOS:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is provided as-is for educational and personal use.

## 🌟 Credits

- **NASA APIs** - Astronomy Picture of the Day and Planetary Data
- **SpaceDevs** - Rocket Launch Information
- **Tailwind CSS** - Styling framework
- **Font Awesome** - Icon library
- **Google Fonts** - Typography

---

**Explore the cosmos. Discover the universe. Welcome to COSMOS.** 🌌✨
