// Chat.jsx
// Root shell composing Sidebar, TopBar, NewChat / message canvas, and ChatInput.
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import NewChat from '../components/NewChat';
import ChatInput from '../components/ChatInput';
import '../styles/Chat.css';

/* ── uid helper ── */
let _uid = 0;
const uid = () => ++_uid;

/* ── Format time helper ── */
function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Sub-components
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function AiMessage({ text }) {
  return (
    <div className="chat__msg-ai">
      {/* Avatar */}
      <div className="chat__avatar-ai">
        <span className="material-symbols-outlined">bolt</span>
      </div>

      {/* Body */}
      <div className="chat__msg-ai-body">
        <div className="chat__bubble-ai glass-panel">
          <p>{text}</p>
        </div>
        {/* Status badge */}
        <div className="chat__ai-status">
          <div className="chat__ai-status-dot" />
          <span className="chat__ai-status-label">AI Status: Ready</span>
        </div>
      </div>
    </div>
  );
}

function UserMessage({ text, time }) {
  return (
    <div className="chat__msg-user">
      <div className="chat__msg-user-body">
        <div className="chat__bubble-user">
          <p>{text}</p>
        </div>
        <p className="chat__timestamp">Sent {time}</p>
      </div>
      {/* Avatar — profile image */}
      <div className="chat__avatar-user">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSWAyZwpw7DFHwo-pKO4MxF03jYA3E6sBHC--GsatG4N43OrDexTBDC2J4kcT8IZyBMNqiC9_FATb1K5KfBYnuzv90CUKNrMw3nRz0q-2AKBUwAZXGtLWZ6icx2q5a3XuoYrHwYZQ4FkW381hV2PyrOeBYMT5yahqtJROu-FUU1vuaESdqrr0RpEmaQd7jZ5ejnZS8P-VC8eBTp8EtxES7dab6bTiybFwI2xrNRsSvlddDMVFUKJEQrgUgZJrwItFF6y43SmL4n4A"
          alt="Alex Rivera"
        />
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="chat__typing">
      <div className="chat__avatar-thinking">
        <span className="material-symbols-outlined">auto_awesome</span>
      </div>
      <div className="chat__typing-bubble glass-panel">
        <div className="chat__typing-dots">
          <div className="chat__typing-dot" />
          <div className="chat__typing-dot" />
          <div className="chat__typing-dot" />
        </div>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Chat root
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

// Seed with the design's example conversation so the canvas is visible by default.
const SEED_MESSAGES = [
  {
    id: uid(),
    role: 'ai',
    text: "System operational. I've analyzed the neural architecture schemas you requested. The latency distribution in the sub-layer components shows a 12% improvement over previous iterations.",
    time: null,
  },
  {
    id: uid(),
    role: 'user',
    text: "Excellent. Can we simulate the stress test for the secondary memory clusters? I want to see how the system handles recursive data loops under 90% load.",
    time: '12:42 PM',
  },
];

export default function Chat() {
  const [messages, setMessages] = useState(SEED_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [showNew, setShowNew]   = useState(false);
  const bottomRef = useRef(null);

  const hasMessages = messages.length > 0 && !showNew;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleNewChat = useCallback(() => {
    setMessages([]);
    setShowNew(true);
  }, []);

  const handleSend = useCallback(async (text) => {
    const time = formatTime(new Date());
    setShowNew(false);
    setMessages((prev) => [...prev, { id: uid(), role: 'user', text, time }]);
    setIsTyping(true);

    // Simulate AI — replace with real API call
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        id: uid(),
        role: 'ai',
        text: `Processing complete. "${text}" — this is a placeholder response. Wire up your real API here.`,
        time: null,
      },
    ]);
  }, []);

  const handleSuggestion = useCallback((label) => handleSend(label), [handleSend]);

  return (
    <div className="chat">
      {/* Atmospheric background glows */}
      <div className="chat__bg-glow" aria-hidden="true">
        <div className="chat__bg-glow-tr" />
        <div className="chat__bg-glow-bl" />
      </div>

      {/* Sidebar */}
      <Sidebar onNewChat={handleNewChat} />

      {/* Right side */}
      <div className="chat__main">
        <TopBar />

        <div className="chat__canvas">
          {showNew || !hasMessages ? (
            /* Welcome screen */
            <NewChat onSuggestion={handleSuggestion} />
          ) : (
            /* Active conversation */
            <div className="chat__messages">
              {messages.map((msg) =>
                msg.role === 'ai' ? (
                  <AiMessage key={msg.id} text={msg.text} />
                ) : (
                  <UserMessage key={msg.id} text={msg.text} time={msg.time} />
                )
              )}
              {isTyping && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </div>

      {/* Fixed bottom input */}
      <ChatInput onSend={handleSend} />
    </div>
  );
}
