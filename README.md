# FinanceAI - AI-Powered Personal Finance Tracker

A modern, AI-powered personal finance tracking application built with React, TypeScript, and Supabase, featuring real-time insights and beautiful 3D visualizations for Indian users.

**URL**: https://lovable.dev/projects/a3a749cb-d041-44d3-b4c6-4f49a78c6b86

## ✨ Features

- 🤖 **AI-Powered Insights**: Get intelligent financial recommendations using Gemini AI
- 💰 **Real-Time Tracking**: Track income, expenses, and savings in Indian Rupees (₹)
- 📊 **Interactive Dashboards**: Beautiful charts and visualizations with real-time updates
- 🔐 **Secure Authentication**: Email-based authentication with Supabase
- 🎨 **Modern 3D UI**: Glassmorphic design with advanced particle backgrounds
- 📱 **Fully Responsive**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Real-Time Sync**: Live transaction updates using Supabase Realtime

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion, shadcn-ui
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions, Realtime)
- **AI**: Lovable AI Gateway (Gemini 2.5 Flash)
- **Charts**: Recharts
- **Form Validation**: Zod, React Hook Form

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm or bun package manager

### Local Development

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The app will be available at [http://localhost:8080](http://localhost:8080)

## 📦 Deployment

### Deploy to Lovable (Recommended)

Simply open [Lovable](https://lovable.dev/projects/a3a749cb-d041-44d3-b4c6-4f49a78c6b86) and click on **Share → Publish**.

### Deploy to Vercel

This project is optimized for Vercel deployment:

1. **Push to GitHub**: Ensure your code is in a GitHub repository
2. **Import to Vercel**: 
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
3. **Configure**:
   - Framework Preset: Vite (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Environment Variables**: Add Supabase credentials (if not using Lovable Cloud)
5. **Deploy**: Click Deploy!

The `vercel.json` configuration ensures:
- ✅ Proper SPA routing
- ✅ Optimized asset caching
- ✅ Security headers
- ✅ Performance optimization

### Custom Domain

Connect a custom domain:
- **Lovable**: Navigate to Project > Settings > Domains
- **Vercel**: Go to Project Settings > Domains

[Learn more about custom domains](https://docs.lovable.dev/features/custom-domain)

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn)
│   ├── EnhancedParticleBackground.tsx
│   ├── DashboardStats.tsx
│   ├── RealTimeTransactionList.tsx
│   ├── RealTimeAIInsights.tsx
│   ├── AddTransactionModal.tsx
│   └── StatsCard.tsx
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Auth.tsx       # Login/Signup
│   └── NotFound.tsx   # 404 page
├── integrations/       # External integrations
│   └── supabase/      # Supabase client & types
├── lib/               # Utility functions
└── hooks/             # Custom React hooks

supabase/
├── functions/         # Edge Functions
│   └── ai-insights/  # AI insights generator
├── migrations/       # Database migrations
└── config.toml      # Supabase configuration
```

## 🔑 Key Features Explained

### AI Insights
Uses Supabase Edge Functions to analyze transactions and generate personalized financial insights using Google's Gemini 2.5 Flash model via Lovable AI Gateway.

### Real-Time Updates
Transactions sync instantly across all devices using Supabase Realtime subscriptions with PostgreSQL's LISTEN/NOTIFY.

### 3D Animated Background
Advanced particle system featuring:
- 5,000+ animated particles
- Floating currency symbols
- Dynamic wave grids
- Rotating data streams
- All powered by Three.js and React Three Fiber

### Security Features
- Row Level Security (RLS) on all database tables
- Secure JWT-based authentication
- HTTPS-only cookies
- Environment variable protection
- XSS and CSRF protection

## 🔒 Environment Variables

Auto-configured by Lovable Cloud:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-id
```

## ⚡ Performance Optimizations

- **Code Splitting**: React lazy loading for components
- **3D Rendering**: Optimized particle system with frustum culling
- **State Management**: Efficient React hooks and memoization
- **Asset Optimization**: Static asset caching with immutable headers
- **Real-Time**: Debounced Supabase subscriptions
- **Bundle Size**: Tree-shaking and minification

## 🎨 Customization

### Changing Colors
Edit `src/index.css` to modify the design system:
```css
:root {
  --primary: 263 70% 50%;  /* Purple */
  --accent: 189 94% 43%;   /* Cyan */
  /* ... more colors */
}
```

### Adding New Features
1. Create components in `src/components/`
2. Add routes in `src/App.tsx`
3. Update database schema with migrations in `supabase/migrations/`

## 🐛 Troubleshooting

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`

### Deployment Issues
- Ensure all environment variables are set
- Check Vercel build logs for errors
- Verify Supabase connection

### 3D Performance
- Reduce particle count in `EnhancedParticleBackground.tsx`
- Disable animations on mobile for better performance

## 📚 Learn More

- [Lovable Documentation](https://docs.lovable.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📝 License

MIT

## 💬 Support

For issues and questions:
- Open an issue on GitHub
- Visit [Lovable Discord](https://discord.gg/lovable)
- Check [troubleshooting docs](https://docs.lovable.dev/tips-tricks/troubleshooting)

---

Built with ❤️ using [Lovable](https://lovable.dev)
