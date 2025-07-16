'use client';
import React, { useState } from 'react';
import ClientSidebar from '@/components/DashboardComponents/Registration/ClientRegistration.jsx/ClientSidebar';
import ClientCompanyInformation from '@/components/DashboardComponents/Registration/ClientRegistration.jsx/ClientCompanyInformation';
import ClientPrimaryContact from '@/components/DashboardComponents/Registration/ClientRegistration.jsx/ClientPrimaryContact';

const ClientsRegistrationPage = () => {
    const [currentStep, setCurrentStep] = useState('company-info');
    const [completedSteps, setCompletedSteps] = useState([]);
    const [formData, setFormData] = useState({});

    const steps = ['company-info', 'primary-contact'];
    const totalSteps = steps.length;

    const handleStepChange = (stepId) => {
        setCurrentStep(stepId);
    };

    const handleNext = (stepData) => {
        // Save current step data
        setFormData(prev => ({
            ...prev,
            [currentStep]: stepData
        }));

        // Mark current step as completed
        if (!completedSteps.includes(currentStep)) {
            setCompletedSteps(prev => [...prev, currentStep]);
        }

        // Navigate to next step
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1]);
        } else {
            // Final step - handle form submission
            const completeFormData = { ...formData, [currentStep]: stepData };
            console.log('Complete client registration data:', completeFormData);

            // Mark final step as completed
            setCompletedSteps(prev => [...prev, currentStep]);

            // Here you would typically submit to an API
            alert('Client registration completed successfully!');
        }
    };

    const handlePrevious = () => {
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1]);
        }
    };

    const getCurrentStepIndex = () => {
        return steps.indexOf(currentStep);
    };

    const renderCurrentStep = () => {
        const stepData = formData[currentStep] || {};
        const currentStepIndex = getCurrentStepIndex();

        switch (currentStep) {
            case 'company-info':
                return (
                    <ClientCompanyInformation
                        onNext={handleNext}
                        initialData={stepData}
                        currentStepIndex={currentStepIndex}
                        totalSteps={totalSteps}
                    />
                );
            case 'primary-contact':
                return (
                    <ClientPrimaryContact
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        initialData={stepData}
                        currentStepIndex={currentStepIndex}
                        totalSteps={totalSteps}
                    />
                );
            default:
                return (
                    <ClientCompanyInformation
                        onNext={handleNext}
                        initialData={stepData}
                        currentStepIndex={currentStepIndex}
                        totalSteps={totalSteps}
                    />
                );
        }
    };

    return (
        <div className="min-h-screen bg-formBGBlue">
            {/* Header */}
            <div className='px-4 pt-4'>
                <aside className="bg-white border-b rounded-xl border-gray-200">
                    <div className="px-6 py-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>Dashboard</span>
                            <span>&gt;</span>
                            <span>Registration</span>
                            <span>&gt;</span>
                            <span className="text-gray-900 font-medium">Client Registration</span>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Main Content */}
            <div className="flex h-[calc(100vh-73px)] p-4 gap-5">
                {/* Sidebar */}
                <ClientSidebar
                    currentStep={currentStep}
                    onStepChange={handleStepChange}
                    completedSteps={completedSteps}
                />

                {/* Form Content */}
                <div className="flex-1 overflow-y-auto rounded-xl">
                    {renderCurrentStep()}
                </div>
            </div>
        </div>
    );
};

export default ClientsRegistrationPage; 