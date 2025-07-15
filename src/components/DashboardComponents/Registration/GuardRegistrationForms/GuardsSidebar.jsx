'use client';
import React from 'react';

const GuardsSidebar = ({ currentStep, onStepChange, completedSteps = [] }) => {
    const steps = [
        { id: 'personal-info', label: 'Personal Information', step: 1 },
        { id: 'next-of-kin', label: 'Next of Kin/ Emergency Contact', step: 2 },
        { id: 'academics', label: 'Academics & Licenses', step: 3 },
        { id: 'experience', label: 'Experience', step: 4 },
        { id: 'bank-account', label: 'Add Bank Account', step: 5 },
        { id: 'references', label: 'References / Guarantors', step: 6 },
        { id: 'documents', label: 'Upload Employee Documents/ Bio-Metric', step: 7 },
        { id: 'bio-metric', label: 'Bio-Metric', step: 8 }
    ];

    const handleStepClick = (stepId) => {
        if (onStepChange) {
            onStepChange(stepId);
        }
    };

    return (
        <div className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
            <div className="p-6">
                {steps.map((step, index) => {
                    const isActive = currentStep === step.id;
                    const isCompleted = completedSteps.includes(step.id);

                    return (
                        <div key={step.id} className="mb-3">
                            <button
                                onClick={() => handleStepClick(step.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${isActive
                                        ? 'bg-themeYellow text-black shadow-md'
                                        : isCompleted
                                            ? 'bg-green-50 text-green-800 border border-green-200'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">{step.label}</span>
                                    {isCompleted && (
                                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GuardsSidebar; 