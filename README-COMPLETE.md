# Medtrans – Ivaylo Lazarov Ltd. Website

Complete, responsive website for a medical transport company with 24/7 services and over 25 years of experience.

## 🚀 Features

- ✅ **Fully Responsive** - Mobile, tablet, and desktop optimized
- ✅ **High Contrast Design** - WCAG AA compliant for accessibility
- ✅ **Sticky Navigation** - Always accessible header
- ✅ **Animated Mouse Scroll Indicator** - Invites users to explore
- ✅ **Interactive Gallery** - Lightbox for full-size image viewing
- ✅ **Form Validation** - Real-time client-side validation
- ✅ **Smooth Scrolling** - Enhanced user experience
- ✅ **SEO Optimized** - Meta tags and semantic HTML
- ✅ **Modern UI/UX** - Clean, trustworthy medical design

## 📁 Folder Structure

```
medtrans/
│
├── index-complete.html          # Main HTML file
│
├── css/
│   └── styles-complete.css      # Complete stylesheet with high contrast
│
├── js/
│   └── main-complete.js         # JavaScript for interactivity
│
├── img/                         # Images folder (create this)
│   ├── hero-bg.jpg             # Hero background image
│   ├── ambulance-1.jpg         # Service images
│   ├── ambulance-2.jpg
│   ├── team.jpg
│   ├── equipment.jpg
│   └── ...                     # Additional images
│
├── favicon.ico                  # Website favicon
│
└── README-COMPLETE.md          # This file
```

## 🎨 Design System

### Color Palette (High Contrast)

- **Primary Blue**: `#0047AB` - Deep, trustworthy blue
- **Secondary Green**: `#00A86B` - Medical green
- **Accent Orange**: `#FF6B35` - Call-to-action highlights
- **Dark Navy**: `#1A1A2E` - Text and backgrounds
- **Light Gray**: `#F7FAFC` - Alternating sections

### Typography

- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

### Spacing System

- XS: 0.5rem (8px)
- SM: 1rem (16px)
- MD: 1.5rem (24px)
- LG: 2rem (32px)
- XL: 3rem (48px)
- 2XL: 4rem (64px)
- 3XL: 6rem (96px)

## 📋 Sections Overview

### 1. Header / Navigation
- Sticky on scroll
- Mobile-responsive hamburger menu
- Active link highlighting
- Links: Home | About | Services | Equipment | Prices | Gallery | Contact

### 2. Hero Section
- Full-screen background with overlay
- Large title: "Медицински транспорт 24/7"
- Subtitle with company experience
- Two CTA buttons: "Get Quote" and "Call Now"
- **Animated mouse scroll indicator** (unique feature)

### 3. About Section
- Company description
- Contact information cards:
  - Address: Pleven, bul. Georgi Kochev 94
  - Phone: +359 890 150 160 (with 24/7 badge)
  - Email: ivailo_73@abv.bg
  - Working hours: 24/7
- Feature highlights with icons

### 4. Services Section
- 5 service cards with images:
  1. Specialized Medical Transport
  2. Repatriation in Europe
  3. Medical Escort
  4. Event Support
  5. Patient Transfers
- Each card has "Read More" button
- Hover effects and animations

### 5. Equipment Section
- 4 equipment categories:
  1. Climate Control (AC, Oxygen)
  2. Stretchers & Mobility
  3. Medical Devices (Defibrillator, Ventilator, Monitor, etc.)
  4. Immobilization (Splints, Cervical Collars)
- Icon-based presentation

### 6. Pricing Section
- Pricing policy explanation:
  - Based on round-trip kilometers
  - No hidden fees
  - Medical escort charged separately
- **Quote request form** with validation:
  - Name (required)
  - Phone (required)
  - Service selection (required)
  - Message/details (optional)

### 7. Gallery Section
- Grid of 6 photos (ambulances, staff, equipment)
- **Lightbox functionality** for full-size viewing
- Descriptive alt text for accessibility
- Hover effects with overlay

### 8. Contact Section
- **Working contact form** with validation:
  - Name, phone (required)
  - Email (optional)
  - Service dropdown
  - Message textarea
- Google Maps embed
- Contact details display
- "Available 24/7" badge

### 9. Footer
- Company logo and description
- Contact information
- Working hours (24/7)
- Copyright: "© 2025 Medtrans – Ivaylo Lazarov Ltd."
- **Credit line**: "Design by BoragoWeb" (small, visible at bottom)

## 🔧 Customization Points

### Replacing Placeholder Images

1. **Hero Background** (line 85 in CSS):
   ```css
   background: linear-gradient(...), url('YOUR-IMAGE-PATH') center/cover;
   ```

2. **Service Images** (in HTML):
   - Replace Unsplash URLs with your own images
   - Maintain aspect ratio: 800x600px recommended

3. **Gallery Images**:
   - Replace with actual photos
   - Recommended size: 600x400px
   - Ensure descriptive alt text

### Updating Contact Information

In `index-complete.html`, search for:
- Phone: `+359890150160`
- Email: `ivailo_73@abv.bg`
- Address: `Плевен, бул. Георги Кочев 94`

### Google Maps Integration

Replace the iframe src in the Contact section (line ~380 in HTML) with your actual Google Maps embed code:
1. Go to Google Maps
2. Search for your address
3. Click "Share" → "Embed a map"
4. Copy the iframe code

### Form Backend Integration

The forms currently show success notifications but don't send data. To integrate:

1. **Option A - Email Service (EmailJS)**:
   ```javascript
   // Add EmailJS library
   // Configure in main-complete.js
   ```

2. **Option B - PHP Backend**:
   ```php
   // Create contact.php
   // Handle POST requests
   // Send emails via mail()
   ```

3. **Option C - Third-party Form Service**:
   - Formspree
   - Netlify Forms
   - Google Forms

## 🚀 Deployment Instructions

### Option 1: Simple Hosting (Shared Hosting, cPanel)

1. **Prepare files**:
   - Rename `index-complete.html` to `index.html`
   - Rename `styles-complete.css` to `styles.css`
   - Rename `main-complete.js` to `main.js`
   - Update file references in HTML

2. **Upload via FTP**:
   - Connect to your hosting via FTP (FileZilla)
   - Upload all files to `public_html` or `www` folder
   - Ensure proper folder structure

3. **Set permissions**:
   - Files: 644
   - Folders: 755

### Option 2: Netlify (Free, Recommended)

1. **Create account** at netlify.com
2. **Drag and drop** your project folder
3. **Configure**:
   - Build command: (none needed)
   - Publish directory: `/`
4. **Custom domain**: Add your domain in settings

### Option 3: GitHub Pages

1. **Create repository** on GitHub
2. **Push files**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR-REPO-URL
   git push -u origin main
   ```
3. **Enable GitHub Pages** in repository settings
4. **Select branch**: main, folder: / (root)

### Option 4: Vercel

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```
2. **Deploy**:
   ```bash
   vercel
   ```
3. **Follow prompts** to configure

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility Features

- **WCAG AA Compliant** color contrast ratios
- **Semantic HTML5** elements
- **ARIA attributes** where appropriate
- **Keyboard navigation** support
- **Alt text** on all images
- **Focus indicators** on interactive elements
- **Responsive typography** with clamp()

## 🔍 SEO Optimization

- Meta description and keywords
- Open Graph tags for social sharing
- Semantic HTML structure
- Descriptive alt text
- Fast loading times
- Mobile-friendly design

## 📝 Content Management

### Adding New Services

1. Copy a service card in HTML
2. Update:
   - Image src and alt
   - Icon class
   - Title and description
3. Adjust grid if needed (CSS: `.services__grid`)

### Adding Gallery Images

1. Add new `.gallery-item` div
2. Include image with proper alt text
3. Lightbox will work automatically

### Updating Prices

Edit the pricing cards in the Pricing section. No code changes needed for text updates.

## 🐛 Troubleshooting

### Images Not Loading
- Check file paths are correct
- Ensure images are in `img/` folder
- Verify image file names match HTML references

### Forms Not Submitting
- Check browser console for errors
- Ensure JavaScript file is loaded
- Verify form IDs match JavaScript selectors

### Mobile Menu Not Working
- Confirm Font Awesome is loaded
- Check JavaScript console for errors
- Verify nav IDs are correct

### Styling Issues
- Clear browser cache
- Check CSS file is linked correctly
- Verify no conflicting styles

## 📞 Support & Credits

**Design by BoragoWeb**

For questions or support regarding this website template, please contact the development team.

---

## 🎯 Quick Start Checklist

- [ ] Replace placeholder images with real photos
- [ ] Update contact information (phone, email, address)
- [ ] Configure Google Maps embed
- [ ] Set up form backend (EmailJS, PHP, or service)
- [ ] Add favicon.ico
- [ ] Test on mobile devices
- [ ] Test all forms and validation
- [ ] Test gallery lightbox
- [ ] Verify all links work
- [ ] Check accessibility with WAVE tool
- [ ] Test loading speed with PageSpeed Insights
- [ ] Deploy to hosting
- [ ] Configure custom domain
- [ ] Submit to search engines

## 📄 License

This website template is provided for Medtrans – Ivaylo Lazarov Ltd. All rights reserved.

**Design by BoragoWeb** - Professional web design and development services.

---

**Last Updated**: January 2025
**Version**: 1.0.0
