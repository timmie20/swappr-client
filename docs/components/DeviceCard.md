# DeviceCard Component

A reusable card component for displaying device information with interactive features. This component will enable the user to be able to select what phone or device they are using

## Props

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

## Features

- Displays device image, name, and price
- Interactive card with hover effects
- Keyboard accessible (Enter/Space to trigger click)
- Clickable with visual feedback
- Responsive image loading with blur placeholder

## Usage

```tsx
import DeviceCard from "./DeviceCard";

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
