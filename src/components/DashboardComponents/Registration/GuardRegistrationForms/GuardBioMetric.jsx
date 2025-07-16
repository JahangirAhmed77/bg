'use client';
import React, { useState } from 'react';

const GuardBioMetric = ({ onNext, onPrevious, onComplete, initialData = {} }) => {
    const [formData, setFormData] = useState({
        rightThumb: initialData.biometric?.rightThumb || null,
        rightForeFinger: initialData.biometric?.rightForeFinger || null,
        rightMiddleFinger: initialData.biometric?.rightMiddleFinger || null,
        rightRingFinger: initialData.biometric?.rightRingFinger || null,
        rightLittleFinger: initialData.biometric?.rightLittleFinger || null,
        rightFourFinger: initialData.biometric?.rightFourFinger || null,
        leftThumb: initialData.biometric?.leftThumb || null,
        leftForeFinger: initialData.biometric?.leftForeFinger || null,
        leftMiddleFinger: initialData.biometric?.leftMiddleFinger || null,
        leftRingFinger: initialData.biometric?.leftRingFinger || null,
        leftLittleFinger: initialData.biometric?.leftLittleFinger || null,
        leftFourFinger: initialData.biometric?.leftFourFinger || null,
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
        // Structure data according to API format with placeholders
        const formattedData = {
            biometric: {
                rightThumb: formData.rightThumb ? 'uploaded_file_placeholder' : '',
                rightMiddleFinger: formData.rightMiddleFinger ? 'uploaded_file_placeholder' : '',
                rightLittleFinger: formData.rightLittleFinger ? 'uploaded_file_placeholder' : '',
                leftThumb: formData.leftThumb ? 'uploaded_file_placeholder' : '',
                leftMiddleFinger: formData.leftMiddleFinger ? 'uploaded_file_placeholder' : '',
                leftLittleFinger: formData.leftLittleFinger ? 'uploaded_file_placeholder' : '',
                rightForeFinger: formData.rightForeFinger ? 'uploaded_file_placeholder' : '',
                rightRingFinger: formData.rightRingFinger ? 'uploaded_file_placeholder' : '',
                rightFourFinger: formData.rightFourFinger ? 'uploaded_file_placeholder' : '',
                leftFourFinger: formData.leftFourFinger ? 'uploaded_file_placeholder' : '',
                leftRingFinger: formData.leftRingFinger ? 'uploaded_file_placeholder' : '',
                leftForeFinger: formData.leftForeFinger ? 'uploaded_file_placeholder' : ''
            }
        };

        if (onComplete) {
            onComplete(formattedData);
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
                        {renderFileInput('rightThumb', 'Right Thumb')}
                        {renderFileInput('rightForeFinger', 'Right Fore Finger')}
                        {renderFileInput('rightMiddleFinger', 'Right Middle Finger')}
                        {renderFileInput('rightRingFinger', 'Right Ring Finger')}
                        {renderFileInput('rightLittleFinger', 'Right Little Finger')}

                        <div className="col-span-2">
                            {renderFileInput('rightFourFinger', 'Right Four Fingers')}
                        </div>
                    </div>
                </div>

                {/* Left Hand Bio-Metric */}
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Left Hand Bio-Metric</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {renderFileInput('leftThumb', 'Left Thumb')}
                        {renderFileInput('leftForeFinger', 'Left Fore Finger')}
                        {renderFileInput('leftMiddleFinger', 'Left Middle Finger')}
                        {renderFileInput('leftRingFinger', 'Left Ring Finger')}
                        {renderFileInput('leftLittleFinger', 'Left Little Finger')}

                        <div className="col-span-2">
                            {renderFileInput('leftFourFinger', 'Left Four Fingers')}
                        </div>
                    </div>
                </div>

                {/* Information Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">
                                Biometric Guidelines
                            </h3>
                            <div className="mt-2 text-sm text-blue-700">
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Upload clear fingerprint images or biometric templates</li>
                                    <li>Ensure fingerprints are captured properly without smudging</li>
                                    <li>Supported formats: JPG, PNG, BMP, TIFF, Template files</li>
                                    <li>Individual finger captures are preferred for accuracy</li>
                                    <li>Four-finger captures can be used as alternatives</li>
                                </ul>
                            </div>
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
                    Complete Registration
                </button>
            </div>
        </div>
    );
};

export default GuardBioMetric; 