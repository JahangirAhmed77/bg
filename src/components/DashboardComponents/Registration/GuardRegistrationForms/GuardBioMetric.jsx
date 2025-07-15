'use client';
import React from 'react';

const GuardBioMetric = ({ onNext, onPrevious, onComplete, initialData = {} }) => {
    return (
        <div className="flex-1 bg-white p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Bio-Metric</h2>
                    <div className="text-sm text-gray-500">Step 8 of 8</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
            </div>

            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500 text-lg">Bio-Metric form - Coming Soon</p>
            </div>

            {/* Buttons */}
            <div className="flex justify-center space-x-4 pt-8">
                <button
                    type="button"
                    onClick={onPrevious}
                    className="px-8 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    Previous
                </button>
                <button
                    type="button"
                    onClick={onComplete}
                    className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Complete Registration
                </button>
            </div>
        </div>
    );
};

export default GuardBioMetric; 