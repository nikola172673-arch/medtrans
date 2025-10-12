# 🚀 Quick Start Guide - Medtrans Website

## 📁 Files You Have

```
✅ index-complete.html       - Main website file
✅ css/styles-complete.css   - All styling
✅ js/main-complete.js       - All functionality
✅ README-COMPLETE.md        - Full documentation
✅ PROJECT-SUMMARY.md        - Project overview
```

---

## ⚡ 5-Minute Setup

### Step 1: Open the Website
Double-click `index-complete.html` to view in your browser.

### Step 2: Test Features
- ✅ Click navigation links
- ✅ Try the mobile menu (resize browser)
- ✅ Fill out forms
- ✅ Click gallery images
- ✅ Scroll to see animations

### Step 3: Customize Content

**Replace Contact Info** (search in HTML):
- Phone: `+359890150160` → Your phone
- Email: `ivailo_73@abv.bg` → Your email
- Address: `Плевен, бул. Георги Кочев 94` → Your address

**Update Images**:
- Current: Using Unsplash placeholder images
- Action: Replace with your real photos
- Location: Search for `https://images.unsplash.com` in HTML

---

## 🎨 Color Customization

Open `css/styles-complete.css` and edit the `:root` section:

```css
:root {
    --color-primary: #0047AB;        /* Change main blue */
    --color-secondary: #00A86B;      /* Change green */
    --color-accent: #FF6B35;         /* Change orange */
}
```

---

## 📸 Adding Your Images

### Hero Background:
1. Save your image as `hero-bg.jpg` in `img/` folder
2. In CSS (line ~85), change:
   ```css
   background: ..., url('../img/hero-bg.jpg') center/cover;
   ```

### Service Images:
In HTML, replace:
```html
<img src="https://images.unsplash.com/..." alt="...">
```
With:
```html
<img src="img/your-image.jpg" alt="Description">
```

### Gallery Images:
Same process - replace Unsplash URLs with your images.

---

## 🗺️ Google Maps Setup

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your address
3. Click **Share** → **Embed a map**
4. Copy the `<iframe>` code
5. In HTML (Contact section), replace the existing iframe

---

## 📧 Form Backend Setup

### Option A: EmailJS (Easiest, Free)

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Create email service
3. Get your credentials
4. Add to `main-complete.js`:

```javascript
// Add EmailJS SDK
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

// In handleQuoteSubmit function:
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    name: name,
    phone: phone,
    service: service,
    message: message
});
```

### Option B: PHP Backend

Create `contact.php`:
```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    $to = "ivailo_73@abv.bg";
    $subject = "New Contact Form Submission";
    $body = "Name: $name\nPhone: $phone\nEmail: $email\nMessage: $message";
    
    mail($to, $subject, $body);
    echo json_encode(['success' => true]);
}
?>
```

Update form action in HTML:
```html
<form action="contact.php" method="POST">
```

---

## 🌐 Deploy to Web

### Netlify (Recommended - Free & Easy)

1. Go to [netlify.com](https://www.netlify.com)
2. Sign up / Log in
3. Drag and drop your `medtrans` folder
4. Done! Your site is live

### Traditional Hosting (cPanel)

1. Rename files:
   - `index-complete.html` → `index.html`
   - `styles-complete.css` → `styles.css`
   - `main-complete.js` → `main.js`
   
2. Update references in HTML:
   ```html
   <link rel="stylesheet" href="css/styles.css">
   <script src="js/main.js"></script>
   ```

3. Upload via FTP to `public_html` folder

---

## ✅ Pre-Launch Checklist

- [ ] Replace all contact information
- [ ] Add real images
- [ ] Configure Google Maps
- [ ] Set up form backend
- [ ] Add favicon.ico
- [ ] Test on mobile device
- [ ] Test all forms
- [ ] Test gallery lightbox
- [ ] Check all links work
- [ ] Verify phone numbers are clickable
- [ ] Test email links
- [ ] Check spelling and grammar

---

## 🐛 Common Issues & Fixes

### Images Not Showing
**Problem**: Broken image links  
**Fix**: Check file paths, ensure images are in `img/` folder

### Forms Not Working
**Problem**: No backend configured  
**Fix**: Set up EmailJS or PHP backend (see above)

### Mobile Menu Not Opening
**Problem**: JavaScript not loaded  
**Fix**: Check browser console, ensure `main-complete.js` is linked

### Styling Looks Wrong
**Problem**: CSS not loading  
**Fix**: Check CSS file path in HTML `<link>` tag

---

## 📱 Test on Mobile

1. Open website on your phone
2. Test navigation menu
3. Try filling forms
4. Check image gallery
5. Verify phone number is clickable
6. Test smooth scrolling

---

## 🎯 Key Features to Show Clients

1. **Animated Mouse Scroll** - Unique, engaging
2. **24/7 Availability Badge** - Prominent display
3. **Gallery Lightbox** - Professional image viewing
4. **Form Validation** - Real-time feedback
5. **Smooth Animations** - Modern feel
6. **Mobile Responsive** - Works everywhere
7. **High Contrast** - Easy to read
8. **Fast Loading** - Optimized performance

---

## 💡 Pro Tips

### Improve SEO:
- Add more descriptive alt text to images
- Update meta description with keywords
- Create sitemap.xml
- Submit to Google Search Console

### Speed Optimization:
- Compress images (use TinyPNG.com)
- Enable caching on server
- Use WebP format for images
- Minify CSS and JS for production

### Accessibility:
- Test with WAVE tool (wave.webaim.org)
- Ensure all colors pass contrast checker
- Test keyboard navigation
- Add more ARIA labels if needed

---

## 📞 Need Help?

**Design by BoragoWeb**

For questions or customization requests, contact the development team.

---

## 🎉 You're Ready!

Your website is **complete and ready to launch**. Just:
1. Customize content
2. Add your images
3. Deploy to hosting
4. Share with the world!

**Good luck with your medical transport business!** 🚑

---

**Last Updated**: January 2025
