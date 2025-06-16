# PhoneDealCard Component

## Overview

The PhoneDealCard component is a reusable card component used in the deals section of the home page. It displays phone deals in a grid layout with interactive actions and dynamic content.

## Props

```typescript
type DealProps = {
  deal: {
    id: number;
    name: string;
    url: string;
    price: string;
  };
};
```

## Usage

```tsx
import PhoneDealCard from "@/components/others/PhoneDealCard";

// In your component
const deals = [
  {
    id: 1,
    name: "iPhone 16",
    url: "/assets/images/iphone16.png",
    price: "N 1,300,000",
  },
  // ... more deals
];

<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
  {deals.map((deal) => (
    <PhoneDealCard deal={deal} key={deal.id} />
  ))}
</div>;
```

## Features

### Card Structure

- Phone image display with fixed dimensions (200x254)
- Brand label with custom styling
- "HOT" ribbon badge
- User avatar from DiceBear API (seeds)
- Price information
- Interactive actions (Swap, Buy, Open)

### Actions

- **Swap**: ArrowRightLeft icon (Pink color)
- **Buy**: DollarSign icon (Green color)
- **Open**: PanelBottomOpen icon (Primary color)

### Styling

- Hoverable card with custom padding
- Rounded corners
- Custom background for phone display area
- Responsive grid layout
- Custom font (Switzer) for meta information

### Avatar Integration

- Uses DiceBear API for avatar generation
- Currently using the "adventurer" style
- Avatars are generated using seeds (purpose to be determined)
- Example: `https://api.dicebear.com/9.x/adventurer/svg?seed=5`

## Implementation Notes

- Uses Ant Design components (Card, Avatar, Badge)
- Styled with Tailwind CSS
- Responsive design with grid layout
- Image optimization using Next.js Image component
- Interactive elements with hover states
- Custom action handlers (e.g., handleBuy)

## Accessibility

- Semantic HTML structure
- Alt text for images
- Interactive elements properly labeled
- Color contrast considerations

## Future Considerations

- Avatar seeds purpose to be determined
- Additional action handlers to be implemented
- Potential for more interactive features
- Possible expansion of deal information
