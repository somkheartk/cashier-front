# Frontend Development Standards

## Project Overview
This is the frontend application for the POS (Point of Sale) system, built with Next.js 15 and featuring a multi-role admin interface with database-driven permissions.

## Tech Stack
- **Next.js 15.5.4** with App Router
- **React 19** with Server Components
- **TypeScript** for type safety
- **Material-UI** for UI components
- **JWT Authentication** with role-based access
- **Database-driven menu system** with dynamic permissions

## Development Workflow

### Branch Strategy
- `master`: Production code
- `dev`: Development integration
- `feature/*`: New features
- `hotfix/*`: Critical fixes

### Getting Started
```bash
# Clone and install
git clone <repository-url>
cd cashier-front
npm install

# Environment setup
cp .env.local.example .env.local
# Edit .env.local with your backend URL

# Start development server
npm run dev
```

## Architecture

### Component Structure
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── login/             # Login page
│   ├── customers/         # Customer management
│   ├── orders/            # Order management
│   └── reports/           # Reports page
├── components/            # Reusable components
│   ├── AdminLayout.tsx    # Main admin layout
│   ├── AppWrapper.tsx     # App context provider
│   ├── RoleBadge.tsx      # Role display component
│   └── ThemeWrapper.tsx   # Material-UI theme
└── contexts/              # React contexts
    └── AuthContext.tsx    # Authentication state
```

### Key Components

#### AdminLayout.tsx
- Main layout component with database-driven navigation
- Fetches user menus from `/api/menu/user-menus`
- Displays user info and role badges
- Responsive sidebar with material icons

#### AuthContext.tsx
- Manages JWT authentication state
- Handles login/logout operations
- Provides user information and role data
- Token refresh and validation

#### RoleBadge.tsx
- Visual representation of user roles
- Color-coded badges (Admin: red, Manager: orange, Cashier: blue)
- Displays role hierarchy and permissions

### API Integration

#### Authentication Endpoints
```typescript
POST /auth/login          # User login
POST /auth/logout         # User logout  
GET /auth/profile         # Get user profile
```

#### Menu & Permissions
```typescript
GET /menu/user-menus      # Get user's accessible menus
GET /menu/roles          # Get all available roles
```

## Development Guidelines

### Code Style
- Use TypeScript for all components
- Follow React hooks best practices
- Use Material-UI components consistently
- Implement proper error handling

### Authentication Flow
1. User logs in with credentials
2. Backend returns JWT token with user roles
3. Frontend stores token and user data
4. Each page request validates token
5. Dynamic menu loading based on permissions

### Permission System
- Database-driven permissions via backend API
- Role-based menu rendering
- Route protection based on user roles
- Dynamic UI elements based on permissions

## Testing
```bash
npm run test              # Run tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

## Build & Deployment
```bash
npm run build            # Production build
npm run start            # Production server
npm run lint             # Code linting
```

## Git Workflow
```bash
# Start new feature
git checkout dev
git pull origin dev
git checkout -b feature/new-feature

# Commit changes
git add .
git commit -m "feat(component): add new functionality"

# Push and create PR
git push origin feature/new-feature
```

Remember to follow the established patterns and conventions for consistency!
