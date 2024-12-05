import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useChatStore } from '../../store/chatStore';

export const Analytics: React.FC = () => {
  const { analytics } = useChatStore();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900">Total Chats</h3>
          <p className="text-3xl font-bold text-blue-600">{analytics.totalChats}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-900">Avg. Duration</h3>
          <p className="text-3xl font-bold text-green-600">
            {analytics.averageDuration.toFixed(1)}m
          </p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-900">User Satisfaction</h3>
          <p className="text-3xl font-bold text-purple-600">
            {(analytics.userSatisfaction * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="h-80 mb-8">
        <h3 className="text-lg font-semibold mb-4">Common Questions</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={analytics.commonQuestions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="question" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};