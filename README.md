# Pedro Arenas Portfolio

A modern, responsive portfolio website built with Next.js 15, featuring beautiful animations, dark mode support, and a clean design. This portfolio showcases professional projects, technical skills, and provides an easy way for potential clients or employers to get in touch.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/antonioaren-projects/v0-software-developer-portfolio)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## ✨ Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Dark Mode**: Built-in dark/light theme toggle
- **Animated UI**: Beautiful entrance animations using Anime.js
- **Interactive Elements**: 3D tilt effects and hover animations on project cards
- **Contact Form**: Functional contact form with email integration
- **SEO Optimized**: Meta tags and structured data for better search visibility
- **Fast Performance**: Optimized images and code splitting for quick load times
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🚀 Live Site

Visit the live portfolio at: **[https://pedroarenas.dev](https://pedroarenas.dev)**

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Anime.js** - Lightweight animation library
- **Lucide React** - Beautiful icon library

### Styling & UI
- **shadcn/ui** - Re-usable component library
- **next-themes** - Theme switching functionality
- **class-variance-authority** - Component variant management
- **tailwindcss-animate** - Animation utilities

### Development Tools
- **TypeScript** - Static type checking
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **pnpm** - Fast, disk space efficient package manager

### Deployment & Analytics
- **Vercel** - Hosting and deployment
- **Vercel Analytics** - Performance monitoring
- **Vercel Speed Insights** - Core Web Vitals tracking

## 🏗️ Project Structure

```
pedroarenas.dev/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── reactbits/        # Custom animated components
│   ├── HeroAbout.tsx     # Hero section with about info
│   ├── Projects.tsx      # Featured projects showcase
│   ├── Skills.tsx        # Technical skills grid
│   ├── Contact.tsx       # Contact form
│   └── Navigation.tsx    # Main navigation
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
│   ├── projects/         # Project images
│   └── resume.pdf        # Downloadable resume
└── types/                # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/antonioaren/v0-software-developer-portfolio.git
   cd v0-software-developer-portfolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the result.

### Environment Setup

For the contact form to work, you'll need to set up email integration:

1. Create a `.env.local` file in the root directory
2. Add your email service configuration (the project uses Resend for email delivery)

## 🎨 Customization

### Personal Information

Update your personal information in the following files:

- **Hero Section**: `components/HeroAbout.tsx` - Update name, title, description, and social links
- **Projects**: `components/Projects.tsx` - Add your featured projects
- **Skills**: `components/Skills.tsx` - Update your technical skills
- **Resume**: Replace `public/resume.pdf` with your own resume
- **Profile Image**: Replace `public/social-photo.webp` with your photo

### Styling

The project uses Tailwind CSS with a custom design system:

- **Colors**: Defined in `tailwind.config.ts`
- **Components**: Styled with shadcn/ui components in `components/ui/`
- **Global Styles**: Located in `app/globals.css`

### Adding New Sections

1. Create a new component in `components/`
2. Add it to the main page in `app/page.tsx`
3. Update navigation in `components/Navigation.tsx` if needed

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ⚡ Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Antonio Arenas**
- Website: [pedroarenas.dev](https://pedroarenas.dev)
- GitHub: [@antonioaren](https://github.com/antonioaren)
- LinkedIn: [antonioaren](https://linkedin.com/in/antonioaren)
- Email: antonioaren2@gmail.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Vercel](https://vercel.com/) for seamless deployment
- [v0.dev](https://v0.dev/) for initial design inspiration

---

⭐ If you found this portfolio template helpful, please consider giving it a star!