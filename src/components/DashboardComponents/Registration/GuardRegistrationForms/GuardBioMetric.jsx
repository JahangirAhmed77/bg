'use client';
import React, { useState } from 'react';

const GuardBioMetric = ({ onNext, onPrevious, onComplete, initialData = {} }) => {
    const [formData, setFormData] = useState({
        rightHandThumb: initialData.rightHandThumb || null,
        rightHandForeFinger: initialData.rightHandForeFinger || null,
        rightHandMiddleFinger: initialData.rightHandMiddleFinger || null,
        rightHandLittleFinger: initialData.rightHandLittleFinger || null,
        rightHandFourFingers: initialData.rightHandFourFingers || null,
        leftHandThumb: initialData.leftHandThumb || null,
        leftHandForeFinger: initialData.leftHandForeFinger || null,
        leftHandMiddleFinger: initialData.leftHandMiddleFinger || null,
        leftHandLittleFinger: initialData.leftHandLittleFinger || null,
        leftHandFourFingers: initialData.leftHandFourFingers || null,
        ...initialData
    });

    const handleFileChange = (field, file) => {
        setFormData(prev => ({
            ...prev,
            [field]: file
        }));
    };

    const handleCapture = (field) => {
        // Trigger file input click
        const fileInput = document.getElementById(field);
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleCancel = () => {
        if (onPrevious) {
            onPrevious();
        }
    };

    const handleContinue = () => {
        if (onComplete) {
            onComplete(formData);
        }
    };

    const renderFileInput = (field, label) => {
        const file = formData[field];
        return (
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
                <div className="flex">
                    <div className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-sm text-gray-600 min-h-[42px] flex items-center">
                        {file ? file.name : `No file selected`}
                    </div>
                    <input
                        type="file"
                        id={field}
                        accept=".jpg,.jpeg,.png,.bmp,.tiff,.template"
                        onChange={(e) => handleFileChange(field, e.target.files[0])}
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => handleCapture(field)}
                        className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                    >
                        📁
                    </button>
                </div>
            </div>
        );
    };

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

            {/* Form Content */}
            <div className="space-y-8">
                {/* Right Hand Bio-Metric */}
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Right Hand Bio-Metric</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {renderFileInput('rightHandThumb', 'Right Hand Thumb')}
                        {renderFileInput('rightHandForeFinger', 'Right Hand Fore Finger')}
                        {renderFileInput('rightHandMiddleFinger', 'Right Hand Middle Finger')}
                        {renderFileInput('rightHandLittleFinger', 'Right Hand Little Finger')}

                        <div className="col-span-2">
                            {renderFileInput('rightHandFourFingers', 'Four Fingers')}
                        </div>
                    </div>
                </div>

                {/* Left Hand Bio-Metric */}
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Left Hand Bio-Metric</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {renderFileInput('leftHandThumb', 'Left Hand Thumb')}
                        {renderFileInput('leftHandForeFinger', 'Left Hand Fore Finger')}
                        {renderFileInput('leftHandMiddleFinger', 'Left Hand Middle Finger')}
                        {renderFileInput('leftHandLittleFinger', 'Left Hand Ring Finger')}

                        <div className="col-span-2">
                            {renderFileInput('leftHandFourFingers', 'Four Fingers')}
                        </div>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center space-x-4 pt-8 mt-8">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="px-8 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleContinue}
                    className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default GuardBioMetric; 