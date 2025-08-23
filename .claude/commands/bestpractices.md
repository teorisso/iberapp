# Best Practices for IberApp Development

## React & TypeScript

### Component Structure
- Use functional components with hooks
- Keep components focused and single-purpose
- Extract complex logic into custom hooks
- Use TypeScript interfaces for prop definitions

```typescript
interface ComponentProps {
  title: string;
  isVisible?: boolean;
  onAction: () => void;
}

const Component: React.FC<ComponentProps> = ({ title, isVisible = true, onAction }) => {
  // Component implementation
};
```

### State Management
- Use useState for local component state
- Use React Query for server state and caching
- Avoid prop drilling - use context for deeply nested shared state
- Keep state as close to where it's used as possible

### Hooks Best Practices
- Follow the rules of hooks (only call at top level)
- Use useCallback for event handlers passed to child components
- Use useMemo for expensive calculations
- Custom hooks should start with "use" prefix

## Styling with Tailwind CSS

### Class Organization
- Group classes logically: layout → spacing → colors → effects
- Use responsive prefixes consistently (sm:, md:, lg:)
- Prefer utility classes over custom CSS when possible

```tsx
<div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-primary to-secondary rounded-lg shadow-lg">
```

### shadcn/ui Components
- Always use shadcn/ui components over building from scratch
- Customize variants through component props, not custom CSS
- Use the `cn()` utility for conditional classes

```tsx
import { cn } from "@/lib/utils";

<Button 
  className={cn("w-full", isPrimary && "bg-primary")}
  variant={isOutlined ? "outline" : "default"}
>
```

## Animation Guidelines

### Performance
- Use CSS transforms instead of changing layout properties
- Prefer `transform` and `opacity` for smooth animations
- Use `will-change` sparingly and remove after animation

### Animation Components
- Wrap animated content in `AnimatedSection` component
- Use appropriate animation types: fade-up, fade-in, scale-in, bounce-in
- Stagger animations for multiple elements using delays

```tsx
<AnimatedSection animation="fade-up" delay={200}>
  <Card>Content that animates on scroll</Card>
</AnimatedSection>
```

### Intersection Observer
- Use the `useScrollAnimation` hook for scroll-triggered animations
- Set appropriate thresholds and root margins
- Use `triggerOnce: true` for animations that should only play once

## File Organization

### Import Order
1. React/React hooks
2. External libraries
3. Internal components (UI components first)
4. Hooks and utilities
5. Types/interfaces
6. Assets

```typescript
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';
import type { ComponentProps } from './types';
import heroImage from '@/assets/hero.jpg';
```

### File Naming
- Use PascalCase for React components: `AnimatedSection.tsx`
- Use kebab-case for utilities and hooks: `use-scroll-animation.tsx`
- Use camelCase for regular functions: `translateWord.ts`

## Form Handling

### React Hook Form Pattern
- Use React Hook Form with Zod validation
- Define schemas separately from components
- Use the `form` object consistently

```typescript
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
});
```

### Form Components
- Use shadcn/ui form components (Form, FormField, FormControl)
- Provide clear validation messages
- Handle loading and error states

## Accessibility

### Semantic HTML
- Use appropriate HTML elements (button, nav, main, section)
- Include alt text for images
- Use headings in logical order (h1 → h2 → h3)

### Keyboard Navigation
- Ensure all interactive elements are focusable
- Provide visible focus indicators
- Support Enter and Space for buttons

### Screen Readers
- Use descriptive labels for form inputs
- Include aria-label or aria-labelledby when needed
- Provide loading announcements for dynamic content

## Performance

### Bundle Optimization
- Use dynamic imports for large dependencies
- Lazy load components not needed immediately
- Optimize images (WebP format, appropriate sizes)

### React Performance
- Avoid creating objects/functions in render
- Use React.memo for expensive components
- Profile with React DevTools before optimizing

## Testing Considerations

### Component Testing
- Test user interactions, not implementation details
- Use data-testid for elements that need reliable selection
- Mock external dependencies and API calls

### E2E Testing
- Test critical user paths (cultural translator, form submission)
- Test responsive behavior on different screen sizes
- Test animation states and scroll behavior

## Code Quality

### Linting
- Follow ESLint configuration
- Fix all linting errors before committing
- Use Prettier for consistent formatting

### Error Handling
- Use try-catch for async operations
- Provide user-friendly error messages
- Log errors for debugging while avoiding sensitive data

### Documentation
- Add JSDoc comments for complex functions
- Document animation configurations
- Update CLAUDE.md when adding new patterns

## Git Practices

### Commit Messages
- Use conventional commit format: `feat:`, `fix:`, `docs:`
- Be descriptive but concise
- Reference issues when applicable

### Branch Management
- Create feature branches from develop
- Use descriptive branch names: `feature/cultural-translator-enhancements`
- Keep commits focused and atomic

## Mock Data & API

### Translation System
- Maintain consistent mock data structure
- Include cultural bridge comparisons for all translations
- Provide examples and context for each translation

### Future API Integration
- Design component props to easily accept real API data
- Use React Query for caching and synchronization
- Handle loading and error states gracefully