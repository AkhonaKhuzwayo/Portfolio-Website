  import { useEffect, useState } from 'react';

  interface CodeSnippet {
  id: number;
  lines: { text: string; type: 'keyword' | 'fn' | 'string' | 'type' | 'comment' | 'plain' | 'number' }[];
  top: string;
  left: string;
  delay: string;
  duration: string;
  scale: string;
  rotate: string;
}

const snippets: CodeSnippet[] = [
  {
    id: 1,
    lines: [
      { text: 'const ', type: 'keyword' },
      { text: '[state, setState]', type: 'plain' },
      { text: ' = ', type: 'plain' },
      { text: 'useState', type: 'fn' },
      { text: '<', type: 'plain' },
      { text: 'string', type: 'type' },
      { text: '>(', type: 'plain' },
      { text: "''"  , type: 'string' },
      { text: ');', type: 'plain' },
    ],
    top: '8%', left: '4%', delay: '0s', duration: '18s', scale: '0.9', rotate: '-4deg',
  },
  {
    id: 2,
    lines: [
      { text: 'interface ', type: 'keyword' },
      { text: 'Props', type: 'type' },
      { text: ' {', type: 'plain' },
    ],
    top: '18%', left: '78%', delay: '3s', duration: '22s', scale: '1', rotate: '5deg',
  },
  {
    id: 3,
    lines: [
      { text: 'def ', type: 'keyword' },
      { text: 'analyze', type: 'fn' },
      { text: '(text: ', type: 'plain' },
      { text: 'str', type: 'type' },
      { text: ') -> ', type: 'plain' },
      { text: 'dict', type: 'type' },
      { text: ':', type: 'plain' },
    ],
    top: '62%', left: '5%', delay: '6s', duration: '20s', scale: '0.85', rotate: '3deg',
  },
  {
    id: 4,
    lines: [
      { text: '// ', type: 'comment' },
      { text: 'fetch data from API', type: 'comment' },
    ],
    top: '75%', left: '70%', delay: '1.5s', duration: '16s', scale: '0.95', rotate: '-6deg',
  },
  {
    id: 5,
    lines: [
      { text: 'return ', type: 'keyword' },
      { text: '<', type: 'plain' },
      { text: 'Component', type: 'fn' },
      { text: '\n  key', type: 'plain' },
      { text: '={id}', type: 'plain' },
      { text: '\n/>', type: 'plain' },
    ],
    top: '42%', left: '88%', delay: '8s', duration: '24s', scale: '0.8', rotate: '-3deg',
  },
  {
    id: 6,
    lines: [
      { text: 'import ', type: 'keyword' },
      { text: 'React', type: 'type' },
      { text: ' from ', type: 'plain' },
      { text: "'react'", type: 'string' },
    ],
    top: '85%', left: '30%', delay: '4.5s', duration: '19s', scale: '0.78', rotate: '7deg',
  },
  {
    id: 7,
    lines: [
      { text: 'const ', type: 'keyword' },
      { text: 'score', type: 'plain' },
      { text: ': ', type: 'plain' },
      { text: 'number', type: 'type' },
      { text: ' = ', type: 'plain' },
      { text: '0.94', type: 'number' },
      { text: ';', type: 'plain' },
    ],
    top: '30%', left: '1%', delay: '10s', duration: '21s', scale: '0.88', rotate: '-2deg',
  },
  {
    id: 8,
    lines: [
      { text: 'await ', type: 'keyword' },
      { text: 'fetch', type: 'fn' },
      { text: '(url)', type: 'plain' },
    ],
    top: '52%', left: '82%', delay: '2s', duration: '17s', scale: '0.82', rotate: '4deg',
  },
];

function CodeBackground() {
  const [maxSnippets, setMaxSnippets] = useState(snippets.length);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mediumViewport = window.matchMedia('(max-width: 1200px)');
    const compactViewport = window.matchMedia('(max-width: 900px)');

    const updateMode = () => {
      if (reducedMotion.matches) {
        setMaxSnippets(0);
        return;
      }

      if (compactViewport.matches) {
        setMaxSnippets(1);
        return;
      }

      if (mediumViewport.matches) {
        setMaxSnippets(2);
        return;
      }

      setMaxSnippets(3);
    };

    updateMode();
    reducedMotion.addEventListener('change', updateMode);
    mediumViewport.addEventListener('change', updateMode);
    compactViewport.addEventListener('change', updateMode);

    return () => {
      reducedMotion.removeEventListener('change', updateMode);
      mediumViewport.removeEventListener('change', updateMode);
      compactViewport.removeEventListener('change', updateMode);
    };
  }, []);

  const visibleSnippets = snippets.slice(0, maxSnippets);

  if (visibleSnippets.length === 0) {
    return null;
  }

  return (
    <div className="code-bg" aria-hidden="true">
      {visibleSnippets.map((snippet) => (
        <pre
          key={snippet.id}
          className="code-snippet"
          style={{
            top: snippet.top,
            left: snippet.left,
            ['--delay' as string]: snippet.delay,
            ['--dur' as string]: snippet.duration,
            ['--rot' as string]: snippet.rotate,
            ['--sc' as string]: snippet.scale,
          }}
        >
          {snippet.lines.map((token, i) => (
            <span key={i} className={`ct-${token.type}`}>{token.text}</span>
          ))}
        </pre>
      ))}
    </div>
  );
}

export default CodeBackground;
