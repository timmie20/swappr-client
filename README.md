# Swappr - Phone Worth Calculator & Exchange Platform

Swappr is a secure and transparent platform for buying and swapping phones in Nigeria. The platform implements a phone rating calculator to accurately represent device conditions, addressing prevalent fraud in the Nigerian market.

## Features

- **Phone Rating Calculator**: System to accurately assess phone conditions calculations mainly done on backend
- **Secure Transactions**: Built-in fraud prevention and user verification
- **Device History**: Track and verify device conditions
- **User Verification**: Secure authentication system
- **Marketplace**: Buy and swap phones with confidence

## Tech Stack

- **Frontend**: Next.js 15, React 19
- **Styling**: Tailwind CSS v4, Ant Design
- **Font**: Switzer Variable Font
- **State Management**: (To be implemented)
- **Backend**: (To be implemented)

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with font configuration
│   └── page.tsx           # Home page
├── features/              # Feature-based architecture
│   └── home/             # Home page feature
│       ├── Client.tsx    # Client-side components
│       └── index.ts      # Feature exports
├── components/           # Reusable components
│   └── others/          # Additional components
│       └── PhoneDealCard.tsx # Card component for phone deals
└── public/              # Static assets
    └── fonts/           # Font files
        ├── Switzer-Variable.ttf
        └── Switzer-VariableItalic.ttf
```

## Getting Started

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   cd swappr-client
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Run the development server**

   ```bash
   pnpm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## Component Documentation

### Home Page (`src/features/home/Client.tsx`)

The home page consists of:

- Hero section with search input
- Phone brand selection buttons
- Deals section with phone deal cards

#### Search Input

- Uses Ant Design's Input component
- Custom styled with Tailwind CSS
- Placeholder text with 58% opacity
- Search icon prefix

#### Brand Selection

- Horizontal scrollable list of phone brands
- Uses Ant Design's Button component
- Custom styling for selected/unselected states
- Snap scrolling for better mobile experience

#### Phone Deal Cards

- Grid layout for deals
- Reusable PhoneDealCard component
- Responsive design

## Styling Guidelines

### Colors

- Primary: #08161f
- Text: Various opacities of primary color
- Background: Light gray (#f9fafb)

### Typography

- Font Family: Switzer Variable
- Font Sizes:
  - xsmall: 12px
  - small: 15px
  - medium: 18px;
  - large: 28px;
  - xlarge: 36px;
  - xxlarge: 48px;

### Spacing

- Consistent gap usage (gap-4, gap-8)
- Responsive padding and margins
- Max-width constraints for content

## Contributing

(To be added)

## License

(To be added)
