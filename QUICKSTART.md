# 🚀 Quick Start Guide - Swappr Member Frontend

## Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- Backend API running
- Clerk account created

---

## 1. Environment Setup

Copy the example environment file and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Get these from https://dashboard.clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here

# Update this to match your backend URL
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## 2. Install Dependencies

```bash
pnpm install
```

---

## 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 4. Your First Feature

### Example: Display Brands

Create `src/app/brands/page.tsx`:

```tsx
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { brandEndpoints, queryKeys } from "@/lib/api";
import { BrandsList } from "./brands-list";

export default async function BrandsPage() {
  const queryClient = new QueryClient();

  // Server-side data fetching
  await queryClient.prefetchQuery({
    queryKey: queryKeys.brands.list(),
    queryFn: () => brandEndpoints.getAll(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <h1>All Brands</h1>
      <BrandsList />
    </HydrationBoundary>
  );
}
```

Create `src/app/brands/brands-list.tsx`:

```tsx
"use client";

import { useBrands } from "@/lib/hooks";

export function BrandsList() {
  const { data, isLoading, error } = useBrands();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.data.length) return <div>No brands found</div>;

  return (
    <div className="grid gap-4">
      {data.data.map((brand) => (
        <div key={brand.id} className="rounded border p-4">
          <h2 className="text-xl font-bold">{brand.name}</h2>
          <p className="text-gray-600">{brand.description}</p>
        </div>
      ))}
    </div>
  );
}
```

Navigate to `/brands` to see your brands!

---

## 5. Key Patterns to Remember

### ✅ Always use custom hooks for data

```tsx
const { data, isLoading, error } = useBrands();
```

### ✅ Use mutation hooks for updates

```tsx
const createBrand = useCreateBrand();

createBrand.mutate({ name: "Apple", slug: "apple" });
```

### ✅ Server-side prefetch for initial load

```tsx
await queryClient.prefetchQuery({
  queryKey: queryKeys.brands.list(),
  queryFn: () => brandEndpoints.getAll(),
});
```

---

## 6. Common Commands

```bash
# Development
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Type checking
pnpm tsc --noEmit

# Lint code
pnpm lint
```

---

## 7. Folder Structure for New Features

When creating a new feature (e.g., "device-comparison"):

```
src/features/device-comparison/
├── components/
│   ├── comparison-card.tsx
│   └── comparison-list.tsx
├── hooks/
│   └── use-comparison.ts        # Feature-specific hooks
├── types.ts                      # Feature-specific types
└── index.ts                      # Export everything
```

---

## 8. Testing Your Setup

Visit these pages to verify everything works:

- `/` - Home page (should work)
- `/brands` - Brands list (requires backend)
- `/sign-in` - Clerk sign-in (requires Clerk setup)

---

## Need Help?

- Read the full [ARCHITECTURE.md](./ARCHITECTURE.md) documentation
- Check React Query Devtools (bottom-right in dev mode)
- Review existing examples in `src/lib/hooks/`

---

**Happy coding! 🎉**
