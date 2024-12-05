import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  BarChart2, 
  MessageSquare, 
  Code2, 
  Users,
  BookOpen
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Settings, label: 'Configuration', path: '/config' },
  { icon: BarChart2, label: 'Analytics', path: '/analytics' },
  { icon: MessageSquare, label: 'Conversations', path: '/conversations' },
  { icon: Code2, label: 'Integration', path: '/integration' },
  { icon: Users, label: 'Team', path: '/team' },
  { icon: BookOpen, label: 'Documentation', path: '/docs' },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800">Gemini Chat</h1>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${
                isActive ? 'bg-blue-50 text-blue-600' : ''
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};