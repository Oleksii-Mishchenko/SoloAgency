import { useEffect, useRef } from 'react';
import { scrollToTop } from '../helpers/scrollToTop';

export const useScrollToRef = (deps: unknown[]) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    sectionRef.current?.scrollIntoView();
  }, deps);

  useEffect(() => {
    scrollToTop();
  }, []);

  return sectionRef;
};
