# My UI Component Library

A modern React component library built with TypeScript, Vite, Tailwind CSS, and Storybook.

## 🚀 Features

- **DataTable Component** - Interactive data grid with sorting and filtering
- **InputField Component** - Multiple variants with form validation
- **TypeScript Support** - Full type safety and IntelliSense
- **Tailwind CSS** - Modern utility-first styling
- **Storybook Documentation** - Interactive component playground
- **Responsive Design** - Works on all device sizes

## 🛠️ Tech Stack

- React 19.1.1
- TypeScript 5.8.3
- Vite 7.1.2
- Tailwind CSS 4.1.12
- Storybook 9.1.2
- Vitest + React Testing Library
- ESLint + Prettier

## 📦 Installation

```bash
npm install
```

## 🚀 Development

```bash
# Start development server
npm run dev

# Start Storybook
npm run storybook

# Run tests
npm run test

# Build for production
npm run build

# Build Storybook
npm run build-storybook
```

## 🌐 Deployment

### Storybook URLs

The application automatically detects the environment and provides the correct Storybook URL:

- **Development**: `http://localhost:6006` (live Storybook dev server)
- **Production**: `/storybook-static/` (built static Storybook)

### Deployment Platforms

#### Vercel
- Storybook will be available at: `https://your-domain.vercel.app/storybook-static/`
- Build command: `npm run build-storybook && npm run build`

#### Netlify
- Storybook will be available at: `https://your-domain.netlify.app/storybook-static/`
- Build command: `npm run build-storybook && npm run build`

#### GitHub Pages
- Storybook will be available at: `https://username.github.io/repo-name/storybook-static/`
- Build command: `npm run build-storybook && npm run build`

### Environment Configuration

The URLs are managed in `src/config/urls.ts` and automatically adapt to your deployment platform.

## 📚 Component Documentation

Each component includes:
- Interactive Storybook stories
- TypeScript interfaces
- Usage examples
- Accessibility features
- Responsive design

## 🧪 Testing

```bash
# Run tests with coverage
npm run test:ci

# Run tests in watch mode
npm run test
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DataTable/      # Data grid component
│   └── InputField/     # Form input component
├── stories/            # Legacy Storybook stories
├── config/             # Configuration files
└── App.tsx            # Main application demo
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
