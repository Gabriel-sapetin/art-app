import { useEffect, useRef, useState, useCallback } from 'react';

// Intersection Observer hook for scroll-based animations
export function useInView(options = {}) {
  const [element, setElement] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const { threshold = 0.02, rootMargin = '0px 0px 80px 0px' } = options;

  const nodeRef = useRef(null);

  // Callback ref so state updates immediately when DOM node mounts
  const refCallback = useCallback((node) => {
    nodeRef.current = node;
    if (node) {
      setElement(node);
    }
  }, []);

  // Also support .current property assignment
  Object.defineProperty(refCallback, 'current', {
    get: () => nodeRef.current,
    set: (node) => {
      nodeRef.current = node;
      if (node) {
        setElement(node);
      }
    },
    configurable: true,
  });

  useEffect(() => {
    if (isInView || !element) return;

    // Check if element is already inside viewport on mount
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, isInView, threshold, rootMargin]);

  return [refCallback, isInView];
}

// Local storage hook for comments
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
}
