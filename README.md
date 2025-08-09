# Frontend Developer Portfolio

A modern, responsive, and accessible portfolio website built with React, TypeScript, and EmailJS. This portfolio showcases 12+ years of frontend development experience with a focus on web accessibility and performance.

## 🚀 Features

- **Modern Design**: Clean, professional layout with subtle animations
- **Responsive**: Mobile-first design that works on all devices
- **Accessible**: WCAG 2.1 AA compliant with proper ARIA labels and keyboard navigation
- **Performance Optimized**: Fast loading with optimized images and code splitting
- **Contact Form**: Fully functional contact form using EmailJS
- **TypeScript**: Type-safe development with excellent IDE support
- **SEO Friendly**: Proper meta tags and semantic HTML structure

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript development
- **Framer Motion** - Smooth animations and transitions
- **CSS3** - Modern CSS with Grid, Flexbox, and custom properties
- **React Intersection Observer** - Scroll-based animations
- **EmailJS** - Email service for contact form integration

### Development Tools
- **Create React App** - React development environment
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **TypeScript Compiler** - Type checking and compilation

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (version 16 or higher)
- npm or yarn package manager

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/frontend-developer-portfolio.git
cd frontend-developer-portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# EmailJS Configuration
EMAILJS_SERVICE_ID=your-service-id
EMAILJS_TEMPLATE_ID=your-template-id
EMAILJS_USER_ID=your-user-id
```

### 4. Run the development server

```bash
npm start
```

The application will be available at:
- Frontend: http://localhost:3000

## 🏗️ Building for Production

### 1. Build the React application

```bash
npm run build
```

The production build will be available in the `build/` directory.

## 📁 Project Structure

```
portfolio/
├── public/                 # Static assets
├── src/                   # React application source
│   ├── components/        # React components
│   │   ├── Header/       # Navigation header
│   │   ├── Hero/         # Hero section with split design
│   │   ├── About/        # About section
│   │   ├── Experience/   # Professional experience
│   │   ├── Projects/     # Projects showcase
│   │   ├── Skills/       # Technical skills
│   │   ├── Contact/      # Contact form
│   │   └── Footer/       # Footer with links
│   ├── App.tsx           # Main application component
│   ├── App.css           # Global styles
│   └── index.tsx         # Application entry point
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🎨 Customization

### Updating Personal Information

1. **Profile Information**: Edit the data in each component file
2. **Contact Details**: Update contact information in `Contact.tsx` and `Footer.tsx`
3. **Social Links**: Modify social media links in `Footer.tsx`
4. **Experience Data**: Replace the sample experience data in `Experience.tsx`
5. **Projects**: Update project information in `Projects.tsx`
6. **Skills**: Modify the skills data in `Skills.tsx`

### Styling

- **Colors**: Update CSS custom properties in `App.css`
- **Fonts**: Change font imports in `public/index.html`
- **Layout**: Modify component-specific CSS files
- **Animations**: Adjust Framer Motion configurations in component files

## 🔧 API Endpoints

### POST /api/contact
Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! I'll get back to you soon.",
  "messageId": "contact_1634567890_abc123"
}
```

## ♿ Accessibility Features

This portfolio is built with accessibility in mind:

- **Semantic HTML**: Proper use of HTML5 semantic elements
- **ARIA Labels**: Comprehensive ARIA labeling for screen readers
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Contrast**: WCAG 2.1 AA compliant color contrast ratios
- **Screen Reader Support**: Optimized for screen reader users
- **Reduced Motion**: Respects user's motion preferences

## 🚀 Performance Optimizations

- **Code Splitting**: Automatic code splitting with React.lazy
- **Image Optimization**: Responsive images with proper sizing
- **Lazy Loading**: Intersection Observer for scroll-based loading
- **Minification**: Production builds are minified and optimized
- **Gzip Compression**: Server-side compression enabled

## 🔒 Security Features

- **Input Validation**: Client-side validation for all form inputs
- **Spam Detection**: Basic spam detection for contact forms
- **XSS Protection**: Input sanitization and output encoding

## 📊 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or need help with setup, please:

1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Contact me at hello@frontenddev.com

## 🙏 Acknowledgments

- React team for the amazing framework
- Framer Motion for smooth animations
- The accessibility community for guidelines and best practices
- Open source contributors who make projects like this possible

---

**Built with ❤️ and lots of ☕ by a Frontend Developer with 12+ years of experience**
