import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useChatStore } from '../../store/chatStore';

export const Header: React.FC = () => {
  const { config } = useChatStore();
  const { user, signOut } = useAuthStore();

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          {config.companyName} Dashboard
        </h2>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-gray-700">{user?.email}</span>
            </div>
            <button
              onClick={() => signOut()}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="Sign out"
            >
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};