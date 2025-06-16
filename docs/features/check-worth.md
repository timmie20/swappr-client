# Check Worth Feature

The Check Worth feature allows users to evaluate the value of their devices through an interactive and user-friendly interface.

## Components

### DeviceCard

A reusable card component that displays device information and serves as an entry point to check device worth.

#### Features

- Interactive card with hover effects
- Keyboard accessible (Enter/Space to trigger click)
- Displays device image, name, and price
- Responsive image loading with blur placeholder
- Clickable with visual feedback

#### Props

```typescript
type Props = {
  device: {
    id: number;
    name: string;
    url: string;
    price: string;
  };
};
```

#### Usage

```tsx
import DeviceCard from "@/components/others/DeviceCard";

const device = {
  id: 1,
  name: "iPhone 13",
  url: "/images/iphone-13.jpg",
  price: "$799",
};

<DeviceCard device={device} />;
```

## Accessibility

- Keyboard navigable (tabIndex={0})
- Role="button" for semantic meaning
- Aria-label for screen readers
- Keyboard event handlers for Enter and Space keys

## Styling

- Uses Ant Design Card component
- Custom styling for device image container
- Responsive image loading with blur effect
- Custom font family (Switzer) for meta information

## User Flow

1. User sees a grid of device cards
2. User can click or use keyboard to select a device
3. Clicking a device triggers the worth check process
4. User is guided through the device evaluation process

## Technical Implementation

- Built with React and TypeScript
- Uses Next.js Image component for optimized image loading
- Implements keyboard accessibility for better UX
- Follows WCAG guidelines for accessibility
- Uses Ant Design for UI components
- Implements responsive design principles
