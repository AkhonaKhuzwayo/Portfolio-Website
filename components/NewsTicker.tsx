import type { NewsItem } from '../types';

const newsItems: NewsItem[] = [
  { id: 1, text: '🚀 Available for freelance & contract work' },
  { id: 2, text: '⚛️ React & TypeScript Developer' },
  { id: 3, text: '🌍 Based in South Africa — available worldwide' },
  { id: 4, text: '🤖 Exploring AI & Machine Learning with Python' },
  { id: 5, text: '📦 Open to full-time & contract roles' },
  { id: 6, text: '⚡ Building fast, accessible web apps with Vite' },
  { id: 7, text: '🐍 Python developer with NLP experience' },
  { id: 8, text: '🎨 Passionate about clean UI/UX design' },
];

function NewsTicker() {
  return (
    <div className="ticker-wrap" aria-label="Portfolio highlights">
      <div className="ticker-track">
        {[...newsItems, ...newsItems].map((item, index) => (
          <span className="ticker-item" key={index}>
            {item.text}
            <span className="ticker-sep" aria-hidden="true">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default NewsTicker;
