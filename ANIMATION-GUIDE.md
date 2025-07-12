# PoliTravel Animation System Guide

## Overview

This guide covers the comprehensive animation system implemented for the PoliTravel website, featuring scroll-triggered animations, page transitions, and interactive elements similar to modern design platforms like V0.

## 🎯 Features

### 1. Page Loading Animations

- **PageLoader**: Full-screen loading animation with brand elements
- **MinimalLoader**: Simple spinner for quick loads
- **SkeletonLoader**: Content placeholders during data fetching

### 2. Scroll-Triggered Animations

- **Fade In**: Elements appear smoothly as you scroll
- **Slide Up/Down**: Elements slide into view from different directions
- **Scale In**: Elements grow into view
- **Stagger**: Multiple elements animate in sequence
- **Drop In**: V0-style dropping animation

### 3. Interactive Animations

- **Hover Effects**: Scale, lift, glow, and rotation effects
- **Button Animations**: Press feedback and hover states
- **Card Animations**: Floating and shadow effects

### 4. Page Transitions

- **Route Changes**: Smooth transitions between pages
- **AnimatePresence**: Proper exit animations

## 🛠️ Components

### AnimatedWrapper

The main animation component that wraps any element:

```jsx
import { AnimatedSection, AnimatedCard, AnimatedText } from '../components/AnimatedWrapper';

// Basic usage
<AnimatedSection>
  <YourComponent />
</AnimatedSection>

// With custom animation
<AnimatedWrapper animation="dropIn" delay={0.3}>
  <YourComponent />
</AnimatedWrapper>
```

### Available Animation Types

- `fadeInUp` - Fade in from bottom
- `fadeInDown` - Fade in from top
- `fadeInLeft` - Fade in from left
- `fadeInRight` - Fade in from right
- `scaleIn` - Scale in from 0.8 to 1
- `slideInUp` - Slide in from bottom with bounce
- `dropIn` - V0-style drop animation
- `bounceIn` - Bounce in effect
- `flipIn` - 3D flip animation
- `zoomIn` - Zoom in effect
- `slideAndFade` - Combined slide and fade

### Hover Effects

- `scaleUp` - Scale to 1.05 on hover
- `liftUp` - Move up 5px on hover
- `glow` - Add glow shadow
- `rotate` - Rotate 2 degrees

## 🎨 Usage Examples

### 1. Hero Section

```jsx
<AnimatedHero>
  <Hero1
    image={topBannerImage}
    title={topBannerTitle}
    description={topBannerDescription}
  />
</AnimatedHero>
```

### 2. Product Grid

```jsx
<AnimatedList>
  {products.map((product) => (
    <AnimatedListItem key={product.id}>
      <ProductCard product={product} />
    </AnimatedListItem>
  ))}
</AnimatedList>
```

### 3. Service Cards

```jsx
<AnimatedCard hover='scaleUp'>
  <ServiceCard />
</AnimatedCard>
```

### 4. Text Elements

```jsx
<AnimatedText delay={0.2}>
  <h2>Your Title</h2>
</AnimatedText>
```

## 🔧 Custom Hooks

### useScrollAnimation

Custom hook for scroll-triggered animations:

```jsx
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const [ref, isVisible] = useScrollAnimation(0.1);
```

### usePageTransition

Manages page loading states:

```jsx
import { usePageTransition } from '../hooks/usePageTransition';

const { isLoading, isInitialLoad } = usePageTransition();
```

## 🎭 Animation Variants

### Predefined Variants

All animation variants are defined in `hooks/useScrollAnimation.js`:

```javascript
export const animationVariants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  // ... more variants
};
```

### Custom Variants

Create custom animation variants:

```javascript
const customVariant = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.175, 0.885, 0.32, 1.275],
    },
  },
};
```

## 🎪 Floating Action Button

The FAB includes:

- **Scroll to Top**: Appears after scrolling 300px
- **Contact Options**: Phone, email, and chat buttons
- **Smooth Animations**: Scale and rotation effects

## 🎨 CSS Animations

Additional CSS animations in `styles/animations.css`:

### Utility Classes

- `.animate-fade-in` - Fade in animation
- `.animate-slide-up` - Slide up animation
- `.animate-scale-in` - Scale in animation
- `.animate-bounce-in` - Bounce in animation
- `.animate-float` - Floating animation
- `.animate-shimmer` - Shimmer loading effect

### Hover Classes

- `.hover-lift` - Lift effect on hover
- `.hover-scale` - Scale effect on hover
- `.hover-glow` - Glow effect on hover

## 🚀 Performance Optimizations

### 1. GPU Acceleration

- Uses `transform: translateZ(0)` for hardware acceleration
- `will-change` property for optimized animations
- `backface-visibility: hidden` for better performance

### 2. Intersection Observer

- Efficient scroll detection
- Only animates visible elements
- Reduces unnecessary calculations

### 3. Reduced Motion

- Respects user's motion preferences
- Can be disabled for accessibility

## 🎯 Best Practices

### 1. Animation Timing

- Keep animations under 600ms for responsiveness
- Use easing functions for natural movement
- Stagger animations for visual hierarchy

### 2. Performance

- Use `transform` and `opacity` for smooth animations
- Avoid animating `width`, `height`, or `margin`
- Use `will-change` sparingly

### 3. Accessibility

- Respect `prefers-reduced-motion`
- Provide alternative states for animations
- Ensure animations don't interfere with usability

## 🔧 Configuration

### Animation Settings

```javascript
// In AnimatedWrapper component
const defaultSettings = {
  animation: 'fadeInUp',
  delay: 0,
  duration: 0.6,
  threshold: 0.1,
};
```

### Customizing Easing

```javascript
// Custom easing functions
const easing = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  bounce: [0.175, 0.885, 0.32, 1.275],
  elastic: [0.68, -0.55, 0.265, 1.55],
};
```

## 🎨 Design Inspiration

This animation system is inspired by:

- **V0**: Modern, smooth drop-in animations
- **Framer Motion**: Professional animation library
- **Material Design**: Consistent motion principles
- **Apple**: Subtle, purposeful animations

## 🚀 Future Enhancements

### Planned Features

- [ ] Parallax scrolling effects
- [ ] 3D card animations
- [ ] Micro-interactions
- [ ] Gesture-based animations
- [ ] Advanced loading states
- [ ] Animation presets for different content types

### Customization Options

- [ ] Animation speed controls
- [ ] Theme-based animations
- [ ] User preference settings
- [ ] A/B testing for animation effectiveness

## 📝 Troubleshooting

### Common Issues

1. **Animations not triggering**: Check intersection observer threshold
2. **Performance issues**: Reduce animation complexity or duration
3. **Layout shifts**: Use proper initial states
4. **Mobile issues**: Test on various devices

### Debug Mode

Enable debug mode to see animation boundaries:

```javascript
// Add to AnimatedWrapper
const debug = process.env.NODE_ENV === 'development';
```

This comprehensive animation system provides a modern, engaging user experience while maintaining performance and accessibility standards.
