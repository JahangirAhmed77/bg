'use client';
import React, { useState } from 'react';
import GuardsSidebar from '@/components/DashboardComponents/Registration/GuardRegistrationForms/GuardsSidebar';
import GuardPersonalInformation from '@/components/DashboardComponents/Registration/GuardRegistrationForms/GuardPersonalInformation';
import GuardNextOfKin from '@/components/DashboardComponents/Registration/GuardRegistrationForms/GuardNextOfKin';
import GuardAcademics from '@/components/DashboardComponents/Registration/GuardRegistrationForms/GuardAcademics';
import GuardExperience from '@/components/DashboardComponents/Registration/GuardRegistrationForms/GuardExperience';
import GuardBankAccount from '@/components/DashboardComponents/Registration/GuardRegistrationForms/GuardBankAccount';
import GuardReferences from '@/components/DashboardComponents/Registration/GuardRegistrationForms/GuardReferences';
import GuardDocuments from '@/components/DashboardComponents/Registration/GuardRegistrationForms/GuardDocuments';
import GuardBioMetric from '@/components/DashboardComponents/Registration/GuardRegistrationForms/GuardBioMetric';
import { ChevronRight } from 'lucide-react';

const GuardsRegistrationPage = () => {
    const [currentStep, setCurrentStep] = useState('personal-info');
    const [completedSteps, setCompletedSteps] = useState([]);
    const [formData, setFormData] = useState({});

    const steps = [
        { id: 'personal-info', component: GuardPersonalInformation, label: 'Personal Information' },
        { id: 'next-of-kin', component: GuardNextOfKin, label: 'Next of Kin/ Emergency Contact' },
        { id: 'academics', component: GuardAcademics, label: 'Academics & Licenses' },
        { id: 'experience', component: GuardExperience, label: 'Experience' },
        { id: 'bank-account', component: GuardBankAccount, label: 'Add Bank Account' },
        { id: 'references', component: GuardReferences, label: 'References / Guarantors' },
        { id: 'documents', component: GuardDocuments, label: 'Upload Employee Documents/ Bio-Metric' },
        { id: 'bio-metric', component: GuardBioMetric, label: 'Bio-Metric' }
    ];

    const currentStepIndex = steps.findIndex(step => step.id === currentStep);
    const CurrentStepComponent = steps[currentStepIndex]?.component;

    const handleStepChange = (stepId) => {
        setCurrentStep(stepId);
    };

    const handleNext = (data = {}) => {
        // Save current step data
        setFormData(prev => ({
            ...prev,
            [currentStep]: data
        }));

        // Mark current step as completed
        if (!completedSteps.includes(currentStep)) {
            setCompletedSteps(prev => [...prev, currentStep]);
        }

        // Move to next step
        if (currentStepIndex < steps.length - 1) {
            setCurrentStep(steps[currentStepIndex + 1].id);
        }
    };

    const handlePrevious = () => {
        if (currentStepIndex > 0) {
            setCurrentStep(steps[currentStepIndex - 1].id);
        }
    };

    const handleComplete = () => {
        // Mark current step as completed
        if (!completedSteps.includes(currentStep)) {
            setCompletedSteps(prev => [...prev, currentStep]);
        }

        console.log('Registration completed!', formData);
        alert('Guard registration completed successfully!');
    };

    const getBreadcrumbs = () => {
        return [
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Registration', href: '' },
            { label: 'Guards Registration', href: '' }
        ];
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumb */}
            <div className="px-8 py-4 border-b border-gray-200 bg-gray-50">
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2">
                        {getBreadcrumbs().map((breadcrumb, index) => (
                            <li key={index} className="flex items-center">
                                {index > 0 && (
                                    <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                                )}
                                <span className={`text-sm ${index === getBreadcrumbs().length - 1
                                        ? 'text-gray-900 font-medium'
                                        : 'text-gray-500'
                                    }`}>
                                    {breadcrumb.label}
                                </span>
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>

            <div className="flex h-screen">
                {/* Sidebar */}
                <GuardsSidebar
                    currentStep={currentStep}
                    onStepChange={handleStepChange}
                    completedSteps={completedSteps}
                />

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto">
                    {CurrentStepComponent && (
                        <CurrentStepComponent
                            onNext={handleNext}
                            onPrevious={handlePrevious}
                            onComplete={handleComplete}
                            initialData={formData[currentStep] || {}}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default GuardsRegistrationPage; 