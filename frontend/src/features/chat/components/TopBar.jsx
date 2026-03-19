// TopBar.jsx
import React from 'react';
import '../styles/TopBar.css';

const NAV_ITEMS = [
  { label: 'Home', href: '#', active: false },
  { label: 'Chat', href: '#', active: true  },
];

export default function TopBar() {
  return (
    <header className="topbar">
      {/* Left nav — small uppercase links */}
      <nav className="topbar__nav">
        {NAV_ITEMS.map(({ label, href, active }) => (
          <a
            key={label}
            href={href}
            className={`topbar__nav-link${active ? ' topbar__nav-link--active' : ''}`}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Right — search */}
      <div className="topbar__right">
        <div className="topbar__search-wrap">
          <span className="material-symbols-outlined topbar__search-icon">search</span>
          <input
            className="topbar__search-input"
            placeholder="Quick Search"
            type="text"
            aria-label="Quick search"
          />
        </div>
      </div>
    </header>
  );
}
