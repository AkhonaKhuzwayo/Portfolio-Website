import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import NewsTicker from "./components/NewsTicker"
import ParticleWave from "./components/ParticleWave"
import { Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react'

const Skills = lazy(() => import("./components/Skills"))
const Certifications = lazy(() => import("./components/Certifications"))
const Projects = lazy(() => import("./components/Projects"))
const GitHubRepos = lazy(() => import("./components/GitHubRepos"))
const Pricing = lazy(() => import("./components/Pricing"))
const Contact = lazy(() => import("./components/Contact"))
const Footer = lazy(() => import("./components/Footer"))

interface DeferredSectionProps {
  children: ReactNode;
  rootMargin?: string;
}

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

function DeferredSection({ children, rootMargin = '400px 0px' }: DeferredSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isVisible || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  useEffect(() => {
    if (!isVisible || isMounted) return;

    const win = window as IdleWindow;

    if (typeof win.requestIdleCallback === 'function') {
      const idleId = win.requestIdleCallback(() => {
        setIsMounted(true);
      }, { timeout: 600 });

      return () => {
        if (typeof win.cancelIdleCallback === 'function') {
          win.cancelIdleCallback(idleId);
        }
      };
    }

    const timeoutId = window.setTimeout(() => {
      setIsMounted(true);
    }, 120);

    return () => window.clearTimeout(timeoutId);
  }, [isVisible, isMounted]);

  useEffect(() => {
    if (!isMounted || !sectionRef.current) return;

    const container = sectionRef.current;
    requestAnimationFrame(() => {
      window.dispatchEvent(
        new CustomEvent('deferred-section-visible', {
          detail: { container },
        })
      );
    });
  }, [isMounted]);

  return <div ref={sectionRef} style={{ minHeight: '400px' }}>{isMounted ? children : null}</div>;
}

function App() {
  const [showTicker, setShowTicker] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShowTicker = window.scrollY < window.innerHeight * 0.6;
      setShowTicker((current) => (current === shouldShowTicker ? current : shouldShowTicker));
    };

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // We don't unobserve immediately to handle re-scans
        }
      });
    }, observerOptions);

    const observedElements = new WeakSet<Element>();

    const observeRevealElements = (root: ParentNode = document) => {
      root.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((element) => {
        if (!observedElements.has(element)) {
          observer.observe(element);
          observedElements.add(element);
        }
      });
    };

    observeRevealElements();

    const handleDeferredSectionVisible = (event: Event) => {
      const customEvent = event as CustomEvent<{ container?: HTMLElement }>;
      const root = customEvent.detail?.container;

      // Multi-pass scan to ensure lazy components are captured as they mount
      const scan = () => observeRevealElements(root || document);

      scan();
      setTimeout(scan, 100);
      setTimeout(scan, 300);
      setTimeout(scan, 600);
    };

    window.addEventListener('deferred-section-visible', handleDeferredSectionVisible as EventListener);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('deferred-section-visible', handleDeferredSectionVisible as EventListener);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <ParticleWave />
      <Navbar />
      {showTicker && <NewsTicker />}
      <Hero />
      <About />
      <DeferredSection>
        <Suspense fallback={null}>
          <Skills />
        </Suspense>
      </DeferredSection>
      <DeferredSection>
        <Suspense fallback={null}>
          <Certifications />
        </Suspense>
      </DeferredSection>
      <DeferredSection>
        <Suspense fallback={null}>
          <Projects />
        </Suspense>
      </DeferredSection>
      <DeferredSection>
        <Suspense fallback={null}>
          <GitHubRepos />
        </Suspense>
      </DeferredSection>
      <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center', color: '#d4af37' }}>Loading Pricing...</div>}>
        <Pricing />
      </Suspense>
      <DeferredSection>
        <Suspense fallback={null}>
          <Contact />
        </Suspense>
      </DeferredSection>
      <DeferredSection>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </DeferredSection>
    </>
  )
}

export default App