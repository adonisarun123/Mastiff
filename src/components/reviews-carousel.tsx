'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AUTO_SCROLL_MS = 4000;

const CONTROL_CLASS =
  'mobile-touch-target size-11 rounded-full border-[#2A3959] text-[#2A3959] hover:bg-[#2A3959] hover:text-white';

/** Moves the row one card along, wrapping around at either end. */
function scrollByCard(scroller: HTMLElement, direction: 1 | -1) {
  const card = scroller.firstElementChild;
  if (!card) return;

  const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(scroller).columnGap);
  const end = scroller.scrollWidth - scroller.clientWidth;

  let left = scroller.scrollLeft + direction * step;
  if (direction === 1 && scroller.scrollLeft >= end - 1) left = 0;
  if (direction === -1 && scroller.scrollLeft <= 1) left = end;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  scroller.scrollTo({ left, behavior: reduceMotion ? 'auto' : 'smooth' });
}

/**
 * A single row of cards that scrolls left and right and advances on its own. The cards come in
 * as children so they stay server-rendered, and the row scrolls natively, so swiping, trackpads
 * and keyboard focus all work.
 *
 * Auto-scroll waits while the row is hovered, touched or holds keyboard focus, and while it is
 * off screen. It starts paused for visitors who ask for reduced motion, and the pause button
 * lets anyone stop it (WCAG 2.2.2).
 */
export default function ReviewsCarousel({ label, children }: { label: string; children: ReactNode }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(scrollerRef);
  const [overflowing, setOverflowing] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPaused(true);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const observer = new ResizeObserver(() => setOverflowing(scroller.scrollWidth > scroller.clientWidth + 1));
    observer.observe(scroller);
    return () => observer.disconnect();
  }, []);

  const autoScrolling = overflowing && inView && !paused && !hovering && !focused;

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!autoScrolling || !scroller) return;
    const timer = setInterval(() => scrollByCard(scroller, 1), AUTO_SCROLL_MS);
    return () => clearInterval(timer);
  }, [autoScrolling]);

  const scroll = (direction: 1 | -1) => {
    if (scrollerRef.current) scrollByCard(scrollerRef.current, direction);
  };

  return (
    <div
      onPointerEnter={event => { if (event.pointerType === 'mouse') setHovering(true); }}
      onPointerLeave={event => { if (event.pointerType === 'mouse') setHovering(false); }}
      onTouchStart={() => setHovering(true)}
      onTouchEnd={() => setHovering(false)}
      onTouchCancel={() => setHovering(false)}
    >
      <div
        ref={scrollerRef}
        role="group"
        aria-label={label}
        onFocus={event => { if (event.target.matches(':focus-visible')) setFocused(true); }}
        onBlur={() => setFocused(false)}
        className="no-scrollbar -mx-1 flex snap-x snap-mandatory scroll-px-1 gap-6 overflow-x-auto p-1 [&>:first-child]:ml-auto [&>:last-child]:mr-auto"
      >
        {children}
      </div>

      {/* Hidden, not removed, until needed: appearing after load would shift the page. */}
      <div className={cn('mt-6 flex justify-center gap-3', !overflowing && 'invisible')}>
        <Button type="button" variant="outline" size="icon" className={CONTROL_CLASS} aria-label="Previous review" onClick={() => scroll(-1)}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={CONTROL_CLASS}
          aria-label={paused ? 'Start automatic scrolling' : 'Pause automatic scrolling'}
          onClick={() => setPaused(!paused)}
        >
          {paused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
        </Button>
        <Button type="button" variant="outline" size="icon" className={CONTROL_CLASS} aria-label="Next review" onClick={() => scroll(1)}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
