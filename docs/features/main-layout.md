# Main Layout

The Main Layout is a core layout component that provides consistent structure and navigation across the Swappr platform.

## Overview

The Main Layout wraps the application content with a navigation bar and provides a consistent container for page content. It ensures a uniform user experience across different pages of the application.

## Components

### MainLayout (`src/layouts/main.tsx`)

The main layout component that structures the application pages.

#### Features

- Consistent navigation bar across all pages
- Centered content container with max-width
- Responsive design
- Minimum height to prevent layout shifts

#### Props

```typescript
type Props = {
  children: React.ReactNode;
};
```

#### Usage

```tsx
import MainLayout from "@/layouts/main";

const Page = () => {
  return (
    <MainLayout>
      <YourPageContent />
    </MainLayout>
  );
};
```

## Structure

1. **Navigation Bar**

   - Logo/Brand name
   - Login/Sign Up buttons
   - Responsive design
   - Consistent spacing

2. **Main Content Area**
   - Centered container (max-width: 794px)
   - Minimum height to prevent layout shifts
   - Responsive padding
   - Flexible content area

## Styling

- Uses Tailwind CSS for styling
- Consistent max-width constraints
- Responsive padding and margins
- Custom font implementation (Switzer)

## Implementation Details

- Built with React and TypeScript
- Integrates with Next.js app router
- Uses Ant Design components
- Implements responsive design principles
- Maintains consistent spacing and alignment

## Usage in Features

The Main Layout is used across multiple features:

1. **Home Page**

   - Wraps the home page content
   - Provides navigation and structure

2. **Check Worth Feature**
   - Maintains consistent layout
   - Ensures uniform user experience

## Accessibility

- Semantic HTML structure
- Consistent navigation patterns
- Responsive design for all screen sizes
- Clear visual hierarchy
