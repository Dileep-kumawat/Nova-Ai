// ChatInput.jsx
import { useState, useRef, useCallback } from 'react';
import '../styles/ChatInput.css';

export default function ChatInput({
  onSend,
  disabled = false,
  placeholder = 'Start a new conversation...',
}) {
  const [value, setValue] = useState('');
  const fieldRef = useRef(null);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend?.(trimmed);
    setValue('');
    if (fieldRef.current) fieldRef.current.style.height = 'auto';
  }, [value, onSend, disabled]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const handleInput = useCallback((e) => {
    setValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }, []);

  const canSend = !!value.trim() && !disabled;

  return (
    <div className="chat-input">
      <div className="chat-input__inner">
        <div className={`chat-input__card${disabled ? ' chat-input__card--disabled' : ''}`}>
          <button
            className="chat-input__attach-btn"
            aria-label="Attach file"
            disabled={disabled}
          >
            <span className="material-symbols-outlined">add</span>
          </button>

          <textarea
            ref={fieldRef}
            className="chat-input__field"
            placeholder={disabled ? 'NovaAI is thinking…' : placeholder}
            value={value}
            rows={1}
            onInput={handleInput}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-label="Message input"
            aria-disabled={disabled}
          />

          <div className="chat-input__actions">
            <button
              className="chat-input__mic-btn"
              aria-label="Voice input"
              disabled={disabled}
            >
              <span className="material-symbols-outlined">mic</span>
            </button>
            <button
              className="chat-input__send-btn"
              onClick={handleSend}
              disabled={!canSend}
              aria-label="Send message"
            >
              {/* Swap icon to a spinner while waiting for the AI */}
              {disabled
                ? <span className="material-symbols-outlined chat-input__spinner">progress_activity</span>
                : <span className="material-symbols-outlined">send</span>
              }
            </button>
          </div>
        </div>

        <p className="chat-input__disclaimer">
          NovaAI may provide inaccurate info. Verify important architecture decisions.
        </p>
      </div>
    </div>
  );
}