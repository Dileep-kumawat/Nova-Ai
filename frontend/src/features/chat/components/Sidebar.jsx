// Sidebar.jsx
import '../styles/Sidebar.css';
import { useAuth } from '../../auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../auth/auth.slice';

const SESSIONS = [
  {
    id: 1,
    icon: 'psychology',
    title: 'Neural Architecture Design',
    time: '2 hours ago',
    active: true,
  },
  {
    id: 2,
    icon: 'database',
    title: 'Intelligence Hub Queries',
    time: 'Yesterday',
    active: false,
  },
  {
    id: 3,
    icon: 'sensors',
    title: 'System Status Logs',
    time: '3 days ago',
    active: false,
  },
];

export default function Sidebar({ onNewChat }) {

  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar__brand">
        <h1 className="sidebar__brand-name">NovaAI</h1>
        <span className="sidebar__brand-tagline">Celestial Architect</span>
      </div>

      {/* New Chat CTA */}
      <div className="sidebar__new-chat">
        <button className="sidebar__new-chat-btn" onClick={onNewChat}>
          <span className="material-symbols-outlined">add_circle</span>
          New Chat
        </button>
      </div>

      {/* Session history */}
      <nav className="sidebar__nav">
        {SESSIONS.map(({ id, icon, title, time, active }) => (
          <div
            key={id}
            className={`sidebar__session${active ? ' sidebar__session--active' : ''}`}
          >
            <div className="sidebar__session-row">
              <span className={`material-symbols-outlined sidebar__session-icon`}>
                {icon}
              </span>
              <p className="sidebar__session-title">{title}</p>
            </div>
            <p className="sidebar__session-time">{time}</p>
          </div>
        ))}
      </nav>

      {/* User profile */}
      <div className="sidebar__footer">
        <div className="sidebar__user">
          <div className="sidebar__user-avatar-wrap">
            <img
              className="sidebar__user-avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG4l0PDiIA7z2otMkemAMJXQnjr-w_Be6VmyfSnfr1zDA_vHK5hH5MeyI0KJtONaPWsWktJzXXYbAejG_Zv2JNwW7MTt82kU2B3lQVcGEqpFPHB6vqH_67v86BOQvoeCiixlOaEQ1HQoqk1on_IDi33F2ODMUtlD2QRIU7HAcm48cOpAsRw5dVZDIL4OhZrjun5eL94gj1CKe6QIxLn6plNRtzzaMqK553GYMdRwPeRwPU-n6ie3GrMrpmzJBjALcX1rnA3xW9X_Q"
              alt="Alex Rivera"
            />
            <div className="sidebar__user-online" />
          </div>
          <div className="sidebar__user-info">
            <p className="sidebar__user-name">Alex Rivera</p>
            <p className="sidebar__user-role">Intelligence Ops</p>
          </div>
          <button
            className="sidebar__logout-btn" aria-label="Logout"
            onClick={async () => {
              const { success } = await handleLogout();

              if (success) {
                dispatch(setUser(null));
                navigate('/login');
              }
            }}
          >
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
