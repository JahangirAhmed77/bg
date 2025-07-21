'use client';
import React from 'react';

const LocationSidebar = ({ currentStep, onStepChange, completedSteps = [] }) => {
    const steps = [
        { id: 'location-info', label: 'Location Information', step: 1 },
        { id: 'guard-details', label: 'Details of Guards/ Employees Requested', step: 2 },
        { id: 'charges-breakup', label: 'Salary/ Charges Breakup for Office Use', step: 3 },
        { id: 'setup-invoice', label: 'Setup Location Invoice', step: 4 }
    ];

    const handleStepClick = (stepId) => {
        if (onStepChange) {
            onStepChange(stepId);
        }
    };

    return (
        <div className="w-72 bg-white border-r border-gray-200 rounded-xl h-full overflow-y-auto">
            <div className="p-3 mt-4">
                {steps.map((step) => {
                    const isActive = currentStep === step.id;

                    const commonClasses = 'w-full text-center px-4 py-3 rounded-lg font-medium transition-all duration-200 text-[13px]';

                    // Active state styling
                    const getButtonClass = () => {
                        if (isActive) {
                            return step.id === 'setup-invoice'
                                ? 'bg-[#ffc20e] text-black ring-2 ring-offset-1 ring-[#ffc20e]'
                                : 'bg-[#ffc20e] text-black ring-2 ring-offset-1 ring-[#ffc20e]';
                        }

                        // Non-active state styling
                        return ('bg-[#cfd3d4] text-gray-700 hover:bg-gray-200');
                    };

                    return (
                        <div key={step.id} className="mb-3">
                            <button
                                onClick={() => handleStepClick(step.id)}
                                className={`${commonClasses} ${getButtonClass()}`}
                            >
                                {step.label}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LocationSidebar;