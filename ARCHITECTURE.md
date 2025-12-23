# Swappr Member Frontend Architecture

## 📋 Overview

This document outlines the architecture and structure of the **Swappr Member (User) Frontend**, built with **Next.js App Router**, **TypeScript**, **TanStack React Query**, and **Clerk Authentication**.

The architecture is designed to be:

- ✅ **Scalable** - modular structure that grows with your application
- ✅ **Maintainable** - clear separation of concerns
- ✅ **Type-safe** - TypeScript everywhere
- ✅ **Performant** - optimized data fetching and caching
- ✅ **Consistent** - follows established patterns from the Admin dashboard

---

## 🏗️ Architecture Layers

The Member frontend follows a clean, layered architecture:

```
┌─────────────────────────────────────────────────────┐
│                    UI Layer                         │
│            (Components & Pages)                     │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────┐
│                 Feature Layer                       │
│           (Business Logic Modules)                  │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────┐
│                  Hooks Layer                        │
│         (React Query Custom Hooks)                  │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────┐
│                   API Layer                         │
│       (Endpoints, Types, Query Keys)                │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────┐
│              Backend (NestJS)                       │
│              Protected by Clerk                     │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Folder Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Home page
│   ├── brands/                   # Brand browsing pages
│   ├── models/                   # Model browsing pages
│   ├── questions/                # Question flow pages
│   └── ...
│
├── lib/                          # Core library code
│   ├── api/                      # API layer
│   │   ├── client.ts             # Axios instance with auth
│   │   ├── types.ts              # API type definitions
│   │   ├── query-keys.ts         # Query key factory
│   │   ├── endpoints/            # API endpoint functions
│   │   │   ├── brands.ts
│   │   │   ├── models.ts
│   │   │   ├── variations.ts
│   │   │   ├── options.ts
│   │   │   └── questions.ts
│   │   └── index.ts
│   │
│   ├── hooks/                    # Custom React Query hooks
│   │   ├── use-brands.ts
│   │   ├── use-models.ts
│   │   ├── use-variations.ts
│   │   ├── use-options.ts
│   │   ├── use-questions.ts
│   │   └── index.ts
│   │
│   ├── providers/                # Context providers
│   │   ├── clerk-provider.tsx    # Clerk auth provider
│   │   ├── query-provider.tsx    # React Query provider
│   │   └── index.ts
│   │
│   └── utils.ts                  # Utility functions
│
├── features/                     # Feature modules
│   ├── brands/                   # Brand browsing feature
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.ts
│   ├── models/                   # Model browsing feature
│   ├── questions/                # Question answering feature
│   └── ...
│
├── components/                   # Shared UI components
│   ├── ui/                       # Base UI components (shadcn/ui)
│   ├── shared/                   # Shared components (Navbar, etc.)
│   └── ...
│
├── types/                        # Global type definitions
│   └── index.ts
│
└── middleware.ts                 # Clerk middleware for auth
```

---

## 🔑 Key Concepts

### 1. **API Client** (`src/lib/api/client.ts`)

The API client is a configured Axios instance that:

- Automatically attaches Clerk session tokens to requests
- Handles errors globally
- Provides consistent request/response structure

```typescript
import { api } from "@/lib/api";

// Example usage (usually in endpoint functions)
const response = await api.get("/brands");
```

### 2. **Query Keys** (`src/lib/api/query-keys.ts`)

Centralized query key management ensures:

- Consistent cache structure
- Easy cache invalidation
- Type-safe query keys

```typescript
import { queryKeys } from "@/lib/api";

// Usage in hooks
queryKey: queryKeys.brands.list({ page: 1 });
queryKey: queryKeys.brands.detail("brand-id-123");
```

### 3. **Endpoints** (`src/lib/api/endpoints/`)

Service layer functions that:

- Make HTTP requests to the backend
- Return typed promises
- Are consumed by React Query hooks

```typescript
import { brandEndpoints } from "@/lib/api";

// Example
const brands = await brandEndpoints.getAll({ page: 1, limit: 10 });
```

### 4. **Custom Hooks** (`src/lib/hooks/`)

React Query hooks that:

- Encapsulate data fetching logic
- Provide loading, error, and data states
- Handle cache management automatically

```typescript
import { useBrands, useCreateBrand } from "@/lib/hooks";

function BrandsPage() {
  const { data, isLoading, error } = useBrands({ page: 1 });
  const createBrand = useCreateBrand();

  // Use data, isLoading, error states
  // Use createBrand.mutate() to create a brand
}
```

### 5. **Authentication** (Clerk)

Authentication is handled by Clerk:

- `ClerkProvider` wraps the app in `layout.tsx`
- `middleware.ts` protects routes
- Tokens are automatically attached to API requests

---

## 🚀 Usage Examples

### Example 1: Fetching and Displaying Brands

```tsx
"use client";

import { useBrands } from "@/lib/hooks";

export function BrandsList() {
  const { data, isLoading, error } = useBrands({ page: 1, limit: 10 });

  if (isLoading) return <div>Loading brands...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.data.map((brand) => (
        <div key={brand.id}>
          <h3>{brand.name}</h3>
          <p>{brand.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Example 2: Fetching Models by Brand

```tsx
"use client";

import { useModelsByBrand } from "@/lib/hooks";

export function ModelsList({ brandId }: { brandId: string }) {
  const { data, isLoading } = useModelsByBrand(brandId);

  if (isLoading) return <div>Loading models...</div>;

  return (
    <div>
      {data?.data.map((model) => (
        <div key={model.id}>
          <h3>{model.name}</h3>
          <p>{model.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Example 3: Creating a Brand (Admin Only)

```tsx
"use client";

import { useCreateBrand } from "@/lib/hooks";

export function CreateBrandForm() {
  const createBrand = useCreateBrand();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    createBrand.mutate(
      {
        name: formData.get("name") as string,
        slug: formData.get("slug") as string,
        description: formData.get("description") as string,
      },
      {
        onSuccess: () => {
          alert("Brand created successfully!");
        },
        onError: (error) => {
          alert(`Error: ${error.message}`);
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Brand name" required />
      <input name="slug" placeholder="Brand slug" required />
      <textarea name="description" placeholder="Description" />
      <button type="submit" disabled={createBrand.isPending}>
        {createBrand.isPending ? "Creating..." : "Create Brand"}
      </button>
    </form>
  );
}
```

### Example 4: Submitting Question Answers

```tsx
"use client";

import { useSubmitAnswers } from "@/lib/hooks";

export function QuestionForm({ modelId }: { modelId: string }) {
  const submitAnswers = useSubmitAnswers();

  const handleSubmit = () => {
    submitAnswers.mutate(
      {
        modelId,
        answers: [
          { questionId: "q1", value: "mint" },
          { questionId: "q2", value: "yes" },
        ],
      },
      {
        onSuccess: (result) => {
          console.log("Submission result:", result);
        },
      },
    );
  };

  return (
    <button onClick={handleSubmit} disabled={submitAnswers.isPending}>
      {submitAnswers.isPending ? "Submitting..." : "Submit Answers"}
    </button>
  );
}
```

### Example 5: Server-Side Data Fetching with Hydration

```tsx
// app/brands/page.tsx
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { brandEndpoints, queryKeys } from "@/lib/api";
import { BrandsList } from "./brands-list";

export default async function BrandsPage() {
  const queryClient = new QueryClient();

  // Prefetch data on the server
  await queryClient.prefetchQuery({
    queryKey: queryKeys.brands.list({ page: 1 }),
    queryFn: () => brandEndpoints.getAll({ page: 1 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BrandsList />
    </HydrationBoundary>
  );
}
```

---

## 🔐 Authentication Flow

1. **Clerk wraps the app** in `layout.tsx`
2. **Middleware protects routes** based on authentication status
3. **API client automatically attaches tokens** via `ClerkProvider` → `apiClient.setTokenGetter()`
4. **Backend validates tokens** and authorizes requests

---

## 🧪 Best Practices

### Data Fetching

- ✅ Use custom hooks from `src/lib/hooks/`
- ✅ Prefer server-side prefetching for initial page loads
- ✅ Let React Query handle caching and refetching
- ❌ Don't fetch data directly in components using `fetch` or `axios`

### Mutations

- ✅ Use mutation hooks for create/update/delete operations
- ✅ Invalidate related queries after mutations
- ✅ Handle success and error states
- ❌ Don't manually refetch queries after mutations

### Query Keys

- ✅ Always use the `queryKeys` factory
- ✅ Invalidate at the appropriate level (e.g., `queryKeys.brands.all` invalidates all brand queries)
- ❌ Don't hardcode query keys in components

### Types

- ✅ Use types from `src/lib/api/types.ts`
- ✅ Extend types as needed in feature modules
- ❌ Don't use `any` or bypass type checking

---

## 🛠️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Sign-in/up redirect URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## 🔄 Cache Invalidation Patterns

### Invalidate All

```typescript
queryClient.invalidateQueries({ queryKey: queryKeys.brands.all });
```

### Invalidate Lists Only

```typescript
queryClient.invalidateQueries({ queryKey: queryKeys.brands.lists() });
```

### Invalidate Specific Detail

```typescript
queryClient.invalidateQueries({
  queryKey: queryKeys.brands.detail("brand-id"),
});
```

---

## 📦 Available Hooks

### Brands

- `useBrands(params)` - Fetch all brands
- `useBrand(id)` - Fetch single brand by ID
- `useBrandBySlug(slug)` - Fetch single brand by slug
- `useCreateBrand()` - Create brand
- `useUpdateBrand()` - Update brand
- `useDeleteBrand()` - Delete brand

### Models

- `useModels(params)` - Fetch all models
- `useModelsByBrand(brandId, params)` - Fetch models by brand
- `useModel(id)` - Fetch single model
- `useModelBySlug(slug)` - Fetch single model by slug
- `useCreateModel()` - Create model
- `useUpdateModel()` - Update model
- `useDeleteModel()` - Delete model

### Variations

- `useVariations(params)` - Fetch all variations
- `useVariationsByModel(modelId, params)` - Fetch variations by model
- `useVariation(id)` - Fetch single variation
- `useVariationBySlug(slug)` - Fetch single variation by slug
- `useCreateVariation()` - Create variation
- `useUpdateVariation()` - Update variation
- `useDeleteVariation()` - Delete variation

### Options

- `useOptions(params)` - Fetch all options
- `useOptionsByModel(modelId, params)` - Fetch options by model
- `useOptionsByVariation(variationId, params)` - Fetch options by variation
- `useOption(id)` - Fetch single option
- `useCreateOption()` - Create option
- `useUpdateOption()` - Update option
- `useDeleteOption()` - Delete option

### Questions

- `useQuestions(params)` - Fetch all questions
- `useQuestionsByModel(modelId, params)` - Fetch questions by model
- `useQuestionsByVariation(variationId, params)` - Fetch questions by variation
- `useQuestion(id)` - Fetch single question
- `useSubmitAnswers()` - Submit answers (member)
- `useCreateQuestion()` - Create question
- `useUpdateQuestion()` - Update question
- `useDeleteQuestion()` - Delete question

---

## 🎯 Next Steps

Now that the architecture is established, you can:

1. **Build feature modules** in `src/features/` following the established patterns
2. **Create UI components** in `src/components/` that consume the custom hooks
3. **Add pages** in `src/app/` that compose features and components
4. **Extend types** as needed for new backend endpoints
5. **Add new hooks** following the same patterns

---

## 💡 Tips

- **Use React Query Devtools** in development to inspect cache and queries
- **Leverage server-side prefetching** for optimal initial page load performance
- **Keep components small and focused** - separate data fetching from presentation
- **Follow the naming conventions** established in the codebase
- **Test your queries** by checking the React Query Devtools

---

## 🆘 Troubleshooting

### "Query key not found" errors

- Ensure you're using the `queryKeys` factory
- Check that the query key matches the one used in the hook

### "Unauthorized" errors

- Verify `.env.local` has correct Clerk keys
- Check that user is authenticated
- Ensure backend is running and accessible

### Data not updating after mutation

- Verify query invalidation is set up correctly
- Check that query keys match between queries and invalidations

### TypeScript errors

- Ensure all imports are correct
- Check that types are exported from the right modules
- Run `pnpm tsc --noEmit` to check for type errors

---

## 📚 Resources

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Clerk Docs](https://clerk.com/docs)
- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

---

**Built with ❤️ by the Swappr Team**
