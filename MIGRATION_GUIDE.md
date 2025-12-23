# Migration Guide: Converting Existing Code to New Architecture

This guide helps you migrate your existing Swappr Member Frontend code to use the new architecture.

---

## 🎯 Quick Reference

### Before (Old Pattern)

```tsx
// Mixing data fetching with component
export function BrandsList() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/brands")
      .then((res) => res.json())
      .then((data) => {
        setBrands(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  return <div>{/* render brands */}</div>;
}
```

### After (New Pattern)

```tsx
"use client";
import { useBrands } from "@/lib/hooks";

export function BrandsList() {
  const { data, isLoading } = useBrands();

  if (isLoading) return <div>Loading...</div>;
  return <div>{/* render data?.data */}</div>;
}
```

---

## 📋 Step-by-Step Migration

### Step 1: Identify Data Fetching Logic

Look for:

- ❌ `useState` + `useEffect` for fetching
- ❌ Direct `fetch()` or `axios` calls
- ❌ Manual loading/error state management
- ❌ Manual cache management

### Step 2: Replace with Custom Hooks

| Old Pattern                       | New Hook                    | Import From   |
| --------------------------------- | --------------------------- | ------------- |
| `fetch('/api/brands')`            | `useBrands()`               | `@/lib/hooks` |
| `fetch('/api/models')`            | `useModels()`               | `@/lib/hooks` |
| `fetch('/api/brands/:id/models')` | `useModelsByBrand(brandId)` | `@/lib/hooks` |
| `fetch('/api/variations')`        | `useVariations()`           | `@/lib/hooks` |
| `fetch('/api/options')`           | `useOptions()`              | `@/lib/hooks` |
| `fetch('/api/questions')`         | `useQuestions()`            | `@/lib/hooks` |

### Step 3: Replace Mutations

| Old Pattern                   | New Hook           | Import From   |
| ----------------------------- | ------------------ | ------------- |
| `POST /api/brands`            | `useCreateBrand()` | `@/lib/hooks` |
| `PATCH /api/brands/:id`       | `useUpdateBrand()` | `@/lib/hooks` |
| `DELETE /api/brands/:id`      | `useDeleteBrand()` | `@/lib/hooks` |
| (similar for other resources) | (similar hooks)    | `@/lib/hooks` |

---

## 🔄 Common Migration Patterns

### Pattern 1: Simple List Fetching

**Before:**

```tsx
export function BrandsList() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/brands")
      .then((res) => res.json())
      .then((data) => {
        setBrands(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {brands.map((brand) => (
        <div key={brand.id}>{brand.name}</div>
      ))}
    </div>
  );
}
```

**After:**

```tsx
"use client";
import { useBrands } from "@/lib/hooks";

export function BrandsList() {
  const { data, isLoading, error } = useBrands();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.data.map((brand) => <div key={brand.id}>{brand.name}</div>)}
    </div>
  );
}
```

### Pattern 2: Fetching with Filters

**Before:**

```tsx
export function ModelsList({ brandId }) {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (brandId) {
      fetch(`/api/brands/${brandId}/models`)
        .then((res) => res.json())
        .then((data) => {
          setModels(data);
          setLoading(false);
        });
    }
  }, [brandId]);

  // ...render
}
```

**After:**

```tsx
"use client";
import { useModelsByBrand } from "@/lib/hooks";

export function ModelsList({ brandId }: { brandId: string }) {
  const { data, isLoading } = useModelsByBrand(brandId);

  // ...render (data?.data)
}
```

### Pattern 3: Creating Resources

**Before:**

```tsx
export function CreateBrandForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "...", slug: "..." }),
      });

      if (response.ok) {
        alert("Success!");
        // Manually refetch or update state
      }
    } catch (error) {
      alert("Error!");
    } finally {
      setLoading(false);
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

**After:**

```tsx
"use client";
import { useCreateBrand } from "@/lib/hooks";

export function CreateBrandForm() {
  const createBrand = useCreateBrand();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    createBrand.mutate(
      {
        name: formData.get("name") as string,
        slug: formData.get("slug") as string,
      },
      {
        onSuccess: () => alert("Success!"),
        onError: (error) => alert(`Error: ${error.message}`),
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={createBrand.isPending}>
        {createBrand.isPending ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
```

### Pattern 4: Server-Side Fetching

**Before:**

```tsx
// app/brands/page.tsx
export default async function BrandsPage() {
  const brands = await fetch("/api/brands").then((r) => r.json());

  return <BrandsList brands={brands} />;
}
```

**After:**

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

  // Prefetch on server
  await queryClient.prefetchQuery({
    queryKey: queryKeys.brands.list(),
    queryFn: () => brandEndpoints.getAll(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BrandsList />
    </HydrationBoundary>
  );
}
```

```tsx
// app/brands/brands-list.tsx
"use client";
import { useBrands } from "@/lib/hooks";

export function BrandsList() {
  // This will use the prefetched data initially
  const { data, isLoading } = useBrands();

  if (isLoading) return <div>Loading...</div>;
  return <div>{/* render data?.data */}</div>;
}
```

---

## 🚨 Common Mistakes to Avoid

### ❌ Don't Do This

```tsx
// Using endpoints directly in components
import { brandEndpoints } from "@/lib/api";

export function BrandsList() {
  useEffect(() => {
    brandEndpoints.getAll().then((data) => {
      // This bypasses React Query's caching!
    });
  }, []);
}
```

### ✅ Do This Instead

```tsx
// Use the custom hook
import { useBrands } from "@/lib/hooks";

export function BrandsList() {
  const { data } = useBrands();
  // React Query handles everything!
}
```

### ❌ Don't Do This

```tsx
// Hardcoding query keys
const { data } = useQuery({
  queryKey: ["brands", "list"], // ❌ Don't hardcode
  queryFn: () => brandEndpoints.getAll(),
});
```

### ✅ Do This Instead

```tsx
// Use the hook (which uses proper query keys)
const { data } = useBrands(); // ✅ Hook handles query keys
```

### ❌ Don't Do This

```tsx
// Manual refetching after mutation
const createBrand = useCreateBrand();

createBrand.mutate(data, {
  onSuccess: () => {
    // ❌ Don't manually refetch
    fetch("/api/brands").then(/* ... */);
  },
});
```

### ✅ Do This Instead

```tsx
// Let the hook handle invalidation
const createBrand = useCreateBrand();

createBrand.mutate(data);
// ✅ Hook automatically invalidates and refetches
```

---

## 📝 Checklist for Migration

For each component you migrate:

- [ ] Replace `useState` + `useEffect` with custom hooks
- [ ] Replace direct `fetch`/`axios` with hooks
- [ ] Remove manual loading/error state management
- [ ] Update type annotations (use types from `@/lib/api`)
- [ ] Add `'use client'` directive if needed
- [ ] Test loading states
- [ ] Test error states
- [ ] Test success states
- [ ] Verify cache invalidation works

---

## 🔍 Finding Code to Migrate

Use these commands to find old patterns:

```bash
# Find components with fetch calls
grep -r "fetch(" src/

# Find components with axios calls
grep -r "axios." src/

# Find useState with useEffect (potential data fetching)
grep -r "useState.*useEffect" src/

# Find manual loading states
grep -r "setLoading" src/
```

---

## 📚 Additional Resources

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Full architecture documentation
- [QUICKSTART.md](./QUICKSTART.md) - Quick start examples
- [TanStack Query Docs](https://tanstack.com/query/latest/docs/react/overview)

---

## 🆘 Need Help?

If you encounter issues during migration:

1. Check the [ARCHITECTURE.md](./ARCHITECTURE.md) for patterns
2. Look at examples in [QUICKSTART.md](./QUICKSTART.md)
3. Review the custom hooks in `src/lib/hooks/`
4. Check React Query Devtools in development mode

---

**Happy migrating! 🚀**
