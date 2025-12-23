# Swappr Member Frontend - Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          BROWSER (Next.js App)                           │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │                    Root Layout (layout.tsx)                     │    │
│  │  ┌──────────────────────────────────────────────────────────┐  │    │
│  │  │           ClerkProvider (Authentication)                  │  │    │
│  │  │  ┌────────────────────────────────────────────────────┐  │  │    │
│  │  │  │      QueryProvider (React Query)                   │  │  │    │
│  │  │  │                                                     │  │  │    │
│  │  │  │  ┌──────────────────────────────────────────────┐ │  │  │    │
│  │  │  │  │         Application Pages                    │ │  │  │    │
│  │  │  │  │                                              │ │  │  │    │
│  │  │  │  │  ┌──────────────────────────────────────┐  │ │  │  │    │
│  │  │  │  │  │  Feature Modules (src/features/)     │  │ │  │  │    │
│  │  │  │  │  │  ┌────────────────────────────────┐  │  │ │  │  │    │
│  │  │  │  │  │  │  UI Components               │  │  │ │  │  │    │
│  │  │  │  │  │  └────────────────────────────────┘  │  │ │  │  │    │
│  │  │  │  │  └──────────────────────────────────────┘  │ │  │  │    │
│  │  │  │  └──────────────────────────────────────────────┘ │  │  │    │
│  │  │  └────────────────────────────────────────────────────┘  │  │    │
│  │  └──────────────────────────────────────────────────────────┘  │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
                                    ↕
                    ┌───────────────────────────────┐
                    │  Custom Hooks (src/lib/hooks) │
                    │                               │
                    │  • useBrands()                │
                    │  • useModels()                │
                    │  • useVariations()            │
                    │  • useOptions()               │
                    │  • useQuestions()             │
                    │  • useCreateBrand()           │
                    │  • useUpdateModel()           │
                    │  • etc...                     │
                    └───────────────────────────────┘
                                    ↕
            ┌───────────────────────────────────────────┐
            │    React Query (TanStack Query)           │
            │                                           │
            │  • Query Cache Management                 │
            │  • Automatic Refetching                   │
            │  • Optimistic Updates                     │
            │  • Query Invalidation                     │
            └───────────────────────────────────────────┘
                                    ↕
                    ┌───────────────────────────────┐
                    │  Query Keys (src/lib/api)     │
                    │                               │
                    │  queryKeys.brands.list()      │
                    │  queryKeys.models.detail(id)  │
                    │  queryKeys.variations.all     │
                    └───────────────────────────────┘
                                    ↕
                ┌───────────────────────────────────────┐
                │   API Endpoints (src/lib/api/endpoints)│
                │                                       │
                │   • brandEndpoints.getAll()           │
                │   • modelEndpoints.getById()          │
                │   • variationEndpoints.create()       │
                │   • questionEndpoints.submitAnswers() │
                └───────────────────────────────────────┘
                                    ↕
                    ┌───────────────────────────────┐
                    │  API Client (src/lib/api)     │
                    │                               │
                    │  Axios Instance:              │
                    │  • Auto Token Injection       │
                    │  • Error Handling             │
                    │  • Request/Response Transform │
                    └───────────────────────────────┘
                                    ↕
                    ┌───────────────────────────────┐
                    │    Clerk Authentication       │
                    │                               │
                    │  • Get Session Token          │
                    │  • Inject into Headers        │
                    └───────────────────────────────┘
                                    ↕
┌──────────────────────────────────────────────────────────────────────────┐
│                       BACKEND API (NestJS)                               │
│                                                                          │
│  Protected Routes:                                                       │
│  • GET    /api/brands                                                    │
│  • GET    /api/brands/:id                                                │
│  • GET    /api/models                                                    │
│  • GET    /api/brands/:brandId/models                                    │
│  • GET    /api/models/:id                                                │
│  • GET    /api/variations                                                │
│  • GET    /api/models/:modelId/variations                                │
│  • GET    /api/options                                                   │
│  • GET    /api/questions                                                 │
│  • POST   /api/questions/submit                                          │
│  • POST   /api/brands (admin)                                            │
│  • PATCH  /api/brands/:id (admin)                                        │
│  • DELETE /api/brands/:id (admin)                                        │
│  • ... and more                                                          │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════

DATA FLOW EXAMPLE: Fetching Brands

1. Component calls hook:
   const { data, isLoading } = useBrands({ page: 1 });

2. Hook uses React Query:
   useQuery({
     queryKey: queryKeys.brands.list({ page: 1 }),
     queryFn: () => brandEndpoints.getAll({ page: 1 }),
   })

3. React Query checks cache:
   - If cached and fresh: Return cached data
   - If stale or missing: Call queryFn

4. Endpoint function makes request:
   api.get('/brands', { params: { page: 1 } })

5. API Client adds auth token:
   headers: { Authorization: 'Bearer <clerk-token>' }

6. Request sent to backend:
   GET https://api.example.com/api/brands?page=1

7. Backend validates token, returns data:
   { data: [...brands], meta: { total, page, limit } }

8. React Query caches response

9. Component receives data and renders

═══════════════════════════════════════════════════════════════════════════

MUTATION FLOW EXAMPLE: Creating a Brand

1. Component calls mutation hook:
   const createBrand = useCreateBrand();
   createBrand.mutate({ name: 'Apple', slug: 'apple' });

2. Hook uses React Query mutation:
   useMutation({
     mutationFn: (dto) => brandEndpoints.create(dto),
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: queryKeys.brands.lists() })
     }
   })

3. Endpoint function makes request:
   api.post('/brands', { name: 'Apple', slug: 'apple' })

4. API Client adds auth token

5. Request sent to backend:
   POST https://api.example.com/api/brands

6. Backend creates brand, returns new resource

7. React Query calls onSuccess callback

8. All brand list queries are invalidated

9. Components automatically refetch and update

═══════════════════════════════════════════════════════════════════════════

AUTHENTICATION FLOW

1. User signs in via Clerk

2. Clerk stores session in cookies/localStorage

3. ClerkProvider wraps app, makes auth available

4. TokenSetter component (in ClerkProvider) runs:
   apiClient.setTokenGetter(async () => await getToken())

5. Every API request:
   - Axios interceptor calls tokenGetter
   - Gets fresh token from Clerk
   - Adds to Authorization header
   - Request proceeds with auth

6. Backend validates token:
   - Verifies signature
   - Checks expiration
   - Extracts user info
   - Authorizes request

═══════════════════════════════════════════════════════════════════════════

FILE ORGANIZATION

src/
├── app/                     ← Pages & routes (Next.js App Router)
├── features/                ← Feature modules (business logic)
├── components/              ← Shared UI components
├── lib/                     ← Core library
│   ├── api/                 ← API layer
│   │   ├── client.ts        ← Axios instance
│   │   ├── types.ts         ← API types
│   │   ├── query-keys.ts    ← Query key factory
│   │   └── endpoints/       ← API service functions
│   ├── hooks/               ← React Query hooks
│   └── providers/           ← Context providers
├── types/                   ← Global types
└── utils/                   ← Utility functions

═══════════════════════════════════════════════════════════════════════════
```

**Legend:**

- `↕` - Data flow direction
- `┌─┐` - Component/module boundary
- Indentation shows containment/hierarchy
