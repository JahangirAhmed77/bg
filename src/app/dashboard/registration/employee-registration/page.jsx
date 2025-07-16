'use client';
import React, { useState } from 'react';
import EmployeeSidebar from '@/components/DashboardComponents/Registration/EmployeeRegistrationForm/EmployeeSidebar';
import EmployeePersonalInformation from '@/components/DashboardComponents/Registration/EmployeeRegistrationForm/EmployeePersonalInformation';
import EmployeeNextOfKin from '@/components/DashboardComponents/Registration/EmployeeRegistrationForm/EmployeeNextOfKin';
import EmployeeAcademics from '@/components/DashboardComponents/Registration/EmployeeRegistrationForm/EmployeeAcademics';
import EmployeeExperience from '@/components/DashboardComponents/Registration/EmployeeRegistrationForm/EmployeeExperience';
import EmployeeBankAccount from '@/components/DashboardComponents/Registration/EmployeeRegistrationForm/EmployeeBankAccount';
import EmployeeReferences from '@/components/DashboardComponents/Registration/EmployeeRegistrationForm/EmployeeReferences';
import EmployeeDocuments from '@/components/DashboardComponents/Registration/EmployeeRegistrationForm/EmployeeDocuments';

const EmployeeRegistrationPage = () => {
    const [currentStep, setCurrentStep] = useState('personal-info');
    const [completedSteps, setCompletedSteps] = useState([]);
    const [formData, setFormData] = useState({});

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
        const steps = ['personal-info', 'next-of-kin', 'academics', 'experience', 'bank-account', 'references', 'documents'];
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1]);
        } else {
            // Final step - handle form submission
            console.log('Complete form data:', { ...formData, [currentStep]: stepData });
            // Here you would typically submit to an API
        }
    };

    const handlePrevious = () => {
        const steps = ['personal-info', 'next-of-kin', 'academics', 'experience', 'bank-account', 'references', 'documents'];
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1]);
        }
    };

    const renderCurrentStep = () => {
        const stepData = formData[currentStep] || {};

        switch (currentStep) {
            case 'personal-info':
                return (
                    <EmployeePersonalInformation
                        onNext={handleNext}
                        initialData={stepData}
                    />
                );
            case 'next-of-kin':
                return (
                    <EmployeeNextOfKin
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        initialData={stepData}
                    />
                );
            case 'academics':
                return (
                    <EmployeeAcademics
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        initialData={stepData}
                    />
                );
            case 'experience':
                return (
                    <EmployeeExperience
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        initialData={stepData}
                    />
                );
            case 'bank-account':
                return (
                    <EmployeeBankAccount
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        initialData={stepData}
                    />
                );
            case 'references':
                return (
                    <EmployeeReferences
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        initialData={stepData}
                    />
                );
            case 'documents':
                return (
                    <EmployeeDocuments
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        initialData={stepData}
                    />
                );
            default:
                return (
                    <EmployeePersonalInformation
                        onNext={handleNext}
                        initialData={stepData}
                    />
                );
        }
    };

    return (
        <div className="min-h-screen bg-formBGBlue">
            {/* Header */}
            <div className='px-4 pt-4'>
                <aside className="bg-white border-b rounded-xl border-gray-200 ">
                    <div className="px-6 py-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>Dashboard</span>
                            <span>&gt;</span>
                            <span>Registration</span>
                            <span>&gt;</span>
                            <span className="text-gray-900 font-medium">Employee Registration</span>
                        </div>
                    </div>
                </aside>
            </div>


            {/* Main Content */}
            <div className="flex h-[calc(100vh-73px)] p-4 gap-5">
                {/* Sidebar */}
                <EmployeeSidebar
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

export default EmployeeRegistrationPage; 