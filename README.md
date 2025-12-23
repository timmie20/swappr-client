# Swappr - Phone Worth Calculator & Exchange Platform

Swappr is a secure and transparent platform for buying and swapping phones in Nigeria. The platform implements a phone rating calculator to accurately represent device conditions, addressing prevalent fraud in the Nigerian market.

## ✨ New Architecture (December 2025)

**The Swappr Member Frontend now features a production-ready, scalable architecture!**

📚 **Documentation:**

- [📖 ARCHITECTURE.md](./ARCHITECTURE.md) - Complete architecture guide
- [🚀 QUICKSTART.md](./QUICKSTART.md) - Quick start with examples
- [📊 ARCHITECTURE_DIAGRAM.md](./ARCHITECTURE_DIAGRAM.md) - Visual architecture overview
- [🔄 MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Migrate existing code
- [✅ IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - What's been built

**Key Features:**

- ✅ TanStack React Query for data fetching & caching
- ✅ Clerk authentication with automatic token injection
- ✅ TypeScript everywhere with full type safety
- ✅ Modular, scalable folder structure
- ✅ 37+ custom hooks for all API operations
- ✅ Server-side data prefetching support

## Features

- **Phone Rating Calculator**: System to accurately assess phone conditions calculations mainly done on backend
- **Secure Transactions**: Built-in fraud prevention and user verification
- **Device History**: Track and verify device conditions
- **User Verification**: Secure authentication system powered by Clerk
- **Marketplace**: Buy and swap phones with confidence

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19
- **Styling**: Tailwind CSS v4, Ant Design
- **Font**: Switzer Variable Font
- **State Management**: TanStack React Query (v5)
- **Authentication**: Clerk
- **HTTP Client**: Axios
- **Backend**: NestJS + TypeORM (separate repository)

## Project Structure

```
src/
├── app/                          # Next.js app directory
│   ├── layout.tsx                # Root layout with providers
│   └── page.tsx                  # Home page
│
├── lib/                          # Core library (NEW!)
│   ├── api/                      # API layer
│   │   ├── client.ts             # Axios with auth
│   │   ├── types.ts              # API types
│   │   ├── query-keys.ts         # Query key factory
│   │   └── endpoints/            # API service functions
│   ├── hooks/                    # React Query hooks
│   │   ├── use-brands.ts
│   │   ├── use-models.ts
│   │   └── ...
│   └── providers/                # Context providers
│       ├── clerk-provider.tsx
│       └── query-provider.tsx
│
├── features/                     # Feature modules
│   └── home/                     # Home page feature
│
├── components/                   # Reusable components
│   ├── ui/                       # Base UI components
│   ├── shared/                   # Shared components
│   └── others/                   # Additional components
│
└── middleware.ts                 # Clerk auth middleware
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

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your:

   - Clerk API keys (from [dashboard.clerk.com](https://dashboard.clerk.com))
   - Backend API URL

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 🚀 Quick Examples

### Fetching Data

```tsx
"use client";
import { useBrands } from "@/lib/hooks";

export function BrandsList() {
  const { data, isLoading } = useBrands();

  if (isLoading) return <div>Loading...</div>;
  return <div>{/* render brands */}</div>;
}
```

### Creating Resources

```tsx
"use client";
import { useCreateBrand } from "@/lib/hooks";

export function CreateBrandForm() {
  const createBrand = useCreateBrand();

  return (
    <button
      onClick={() => createBrand.mutate({ name: "Apple", slug: "apple" })}
    >
      Create Brand
    </button>
  );
}
```

See [QUICKSTART.md](./QUICKSTART.md) for more examples!

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
