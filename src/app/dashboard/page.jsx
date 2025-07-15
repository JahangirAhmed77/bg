'use client';
import React from 'react';
import { useCurrentUser } from '@/lib/hooks';

const DashboardPage = () => {
    // Access Redux state
    const { currentUser, isLoading, error, user } = useCurrentUser();

    return (
        <div className="bg-white min-h-screen">
            <div className="px-8 py-6 border-b border-gray-200">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
                {user && (
                    <p className="text-sm text-gray-500 mt-1">
                        Welcome back, {user.name || 'User'}!
                    </p>
                )}
            </div>
            <div className="px-8 py-8">
                <p className="text-gray-600">Welcome to the dashboard overview.</p>

                {/* Debug info - remove this in production */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Redux State Debug:</h3>
                    <pre className="text-xs text-gray-600">
                        {JSON.stringify({
                            hasUser: !!currentUser,
                            isLoading,
                            error,
                            userName: user?.name || 'N/A'
                        }, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage; 