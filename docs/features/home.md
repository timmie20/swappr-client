# Home Feature

## Overview

The home feature is the main landing page of the Swappr platform. It includes the hero section, phone brand selection, and deals section.

## Components

### Client.tsx

The main client component that renders the home page.

#### Structure

1. **Hero Section**

   - Title: "Find out how much your phone is worth"
   - Search input with icon
   - Gradient background effect

2. **Brand Selection**

   - Horizontal scrollable list
   - Phone brand buttons
   - Selected state handling
   - Snap scrolling for mobile

3. **Deals Section**
   - Grid layout
   - PhoneDealCard components
   - Responsive design

## State Management

- Uses local state for brand selection
- (To be implemented: Global state management)

## Styling

- Uses Tailwind CSS for styling
- Custom Ant Design theme configuration
- Responsive design patterns
- Custom font (Switzer) implementation

## Accessibility

- Semantic HTML structure
- ARIA labels (to be implemented)
- Keyboard navigation (to be implemented)

## Performance Considerations

- Lazy loading for images
- Optimized font loading
- Efficient state updates
- Responsive image handling (to be implemented)
