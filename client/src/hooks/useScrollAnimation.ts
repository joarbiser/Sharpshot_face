import { useEffect, useRef } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const {
    threshold = 0.2,
    rootMargin = "0px 0px -20% 0px",
    delay = 0
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      element.classList.add('in-view');
      return;
    }

    // Initialize element in hidden state
    element.style.opacity = '0';
    element.style.transform = 'translateY(16px)';
    element.style.transition = 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Apply delay if specified
            setTimeout(() => {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0px)';
              element.classList.add('in-view');
            }, delay);
            
            // Disconnect observer after animation
            observer.unobserve(element);
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    // Handle elements already in view on load
    const rect = element.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isInView) {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0px)';
        element.classList.add('in-view');
      }, delay + 100); // Small delay to avoid harsh pop
    } else {
      observer.observe(element);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [threshold, rootMargin, delay]);

  return ref;
}

export function useStaggeredScrollAnimation(count: number, staggerDelay: number = 120) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  
  useEffect(() => {
    refs.current = refs.current.slice(0, count);
  }, [count]);

  const createRef = (index: number) => {
    if (!refs.current[index]) {
      refs.current[index] = null;
    }
    
    return (element: HTMLElement | null) => {
      refs.current[index] = element;
      
      if (element) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
          element.classList.add('in-view');
          return;
        }

        // Initialize element in hidden state
        element.style.opacity = '0';
        element.style.transform = 'translateY(16px)';
        element.style.transition = 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const delay = index * staggerDelay;
                setTimeout(() => {
                  element.style.opacity = '1';
                  element.style.transform = 'translateY(0px)';
                  element.classList.add('in-view');
                }, delay);
                
                observer.unobserve(element);
              }
            });
          },
          {
            threshold: 0.2,
            rootMargin: "0px 0px -20% 0px"
          }
        );

        // Handle elements already in view on load
        const rect = element.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView) {
          const delay = index * staggerDelay + 100;
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0px)';
            element.classList.add('in-view');
          }, delay);
        } else {
          observer.observe(element);
        }
      }
    };
  };

  return { createRef };
}