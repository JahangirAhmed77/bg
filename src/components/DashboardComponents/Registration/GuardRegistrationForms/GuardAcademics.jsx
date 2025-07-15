'use client';
import React from 'react';

const GuardAcademics = ({ onNext, onPrevious, initialData = {} }) => {
    return (
        <div className="flex-1 bg-white p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Academics & Licenses</h2>
                    <div className="text-sm text-gray-500">Step 3 of 8</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '37.5%' }}></div>
                </div>
            </div>

            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500 text-lg">Academics & Licenses form - Coming Soon</p>
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
                    onClick={onNext}
                    className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default GuardAcademics; 