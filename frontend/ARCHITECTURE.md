# CraterVision Frontend - Refactored Architecture

## Overview
This refactored codebase follows a clean MVC (Model-View-Controller) architecture pattern, making the code more maintainable, scalable, and easier to understand.

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── features/        # Feature-specific components
│   │   ├── SampleImagesModal.jsx
│   │   ├── SystemHealthMonitor.jsx
│   │   └── index.js
│   ├── layout/          # Layout and structural components
│   │   ├── AnimatedBackground.jsx
│   │   ├── ParticleSystem.jsx
│   │   ├── Navigation.jsx
│   │   ├── MobileMenu.jsx
│   │   └── index.js
│   └── ui/              # Generic UI components
│       ├── EnhancedCard.jsx
│       ├── Lightbox.jsx
│       ├── ProgressBar.jsx
│       ├── SkeletonLoader.jsx
│       ├── BreadcrumbNav.jsx
│       ├── FloatingActionButton.jsx
│       └── index.js
├── context/             # React Context providers
│   ├── AuthContext.jsx  # Authentication state management
│   ├── ToastContext.jsx # Toast notifications
│   └── index.js
├── pages/               # Page components (Views)
│   ├── Landing.jsx      # Landing/Home page
│   ├── Login.jsx        # Login page
│   ├── Signup.jsx       # Signup page
│   ├── Dashboard.jsx    # Main dashboard
│   └── History.jsx      # Detection history page
├── hooks/               # Custom React hooks
├── assets/              # Static assets
├── api.js               # API configuration
├── App.jsx              # Main App component
└── main.jsx             # Entry point
```

## Architecture Benefits

### 1. **Separation of Concerns**
- **Pages**: Handle routing and page-level logic
- **Components**: Reusable UI elements
- **Context**: Global state management
- **Hooks**: Shared logic and side effects

### 2. **Component Organization**
- **UI Components**: Generic, reusable UI elements (buttons, cards, modals)
- **Layout Components**: Structural elements (navigation, backgrounds)
- **Feature Components**: Domain-specific components (image modals, health monitors)

### 3. **State Management**
- **AuthContext**: Manages authentication state across the app
- **ToastContext**: Handles notification display
- Clean separation of local vs global state

### 4. **Maintainability**
- Each component has a single responsibility
- Easy to locate and modify specific functionality
- Consistent file naming and organization

## Key Components

### Context Providers
- `AuthContext`: Manages user authentication state
- `ToastContext`: Handles toast notifications with animations

### Layout Components
- `Navigation`: Main navigation with mobile support
- `MobileMenu`: Responsive mobile navigation menu
- `AnimatedBackground`: Dynamic background animations
- `ParticleSystem`: Floating particle effects

### UI Components
- `EnhancedCard`: Reusable card component with hover effects
- `Lightbox`: Image overlay viewer
- `ProgressBar`: Animated progress indicator
- `FloatingActionButton`: Floating action button with sub-actions

### Feature Components
- `SampleImagesModal`: Modal for downloading sample images
- `SystemHealthMonitor`: Real-time system status display

### Pages
- `Landing`: Marketing/introduction page
- `Login/Signup`: Authentication pages
- `Dashboard`: Main crater detection interface
- `History`: View previous detections

## Usage Examples

### Importing Components
```jsx
// Import from organized structure
import { EnhancedCard, Lightbox } from '../components/ui';
import { Navigation, AnimatedBackground } from '../components/layout';
import { useAuth } from '../context/AuthContext';
```

### Using Context
```jsx
// In any component
const { loggedIn, setLoggedIn } = useAuth();
const { showToast } = useToast();
```

### Adding New Components
1. Create component in appropriate directory
2. Export from index.js in that directory
3. Import where needed

## Development Guidelines

### 1. **Component Creation**
- Keep components focused on a single responsibility
- Use functional components with hooks
- Include proper PropTypes or TypeScript interfaces
- Add responsive design considerations

### 2. **State Management**
- Use local state for component-specific data
- Use context for app-wide state
- Consider custom hooks for shared logic

### 3. **Styling**
- Use Tailwind CSS for consistent styling
- Include hover states and animations
- Ensure mobile responsiveness

### 4. **File Organization**
- Group related components together
- Use descriptive file names
- Keep index.js files updated for clean imports

## Benefits of This Refactor

1. **Easier Maintenance**: Code is organized by function and responsibility
2. **Better Testing**: Isolated components are easier to test
3. **Improved Reusability**: Components can be reused across pages
4. **Cleaner Imports**: Organized exports make imports cleaner
5. **Scalability**: Easy to add new features without breaking existing code
6. **Better Collaboration**: Clear structure helps team development

## Future Enhancements

1. **Add TypeScript**: For better type safety
2. **Error Boundaries**: Handle component errors gracefully
3. **Performance Optimization**: Lazy loading and code splitting
4. **Testing**: Add unit and integration tests
5. **Documentation**: Component documentation with Storybook

This refactored architecture provides a solid foundation for scaling the CraterVision application while maintaining code quality and developer experience.
