'use client';

//prompt: I want a flow in which once I enter valuesin location details of guards form, then display those dteals in next ompoent table tha is salary/chreds breakup fpr office use, then display the values from location details of guards as readonly vlaues in next compoentn which is salary/changes then display guards ctaeogty, chrages per motnh, overtime/hour , allowance, as read only ,then the remaing 3 fields the user will enter which would be under new object called finances whch will have these fields Salary/Month	Overtime/Hour	Allowance and then match the final api requets as passed below 
import React, { useState } from 'react';
import LocationSidebar from '@/components/DashboardComponents/Registration/LocationRegistrationForms/LocationSidebar';
import LocationInformation from '@/components/DashboardComponents/Registration/LocationRegistrationForms/LocationInformation';
import LocationDetailsOfGuards from '@/components/DashboardComponents/Registration/LocationRegistrationForms/LocationDetailsOfGuards';
import LocationSalaryCharges from '@/components/DashboardComponents/Registration/LocationRegistrationForms/LocationSalaryCharges';
import LocationSetupInvoice from '@/components/DashboardComponents/Registration/LocationRegistrationForms/LocationSetupInvoice';

const LocationRegistrationPage = () => {
    const [currentStep, setCurrentStep] = useState('location-info');
    const [completedSteps, setCompletedSteps] = useState([]);
    const [formData, setFormData] = useState({});

    const steps = [
        { id: 'location-info', component: LocationInformation, label: 'Location Information' },
        { id: 'guard-details', component: LocationDetailsOfGuards, label: 'Details of Guards/ Employees Requested' },
        { id: 'charges-breakup', component: LocationSalaryCharges, label: 'Salary/ Charges Breakup for Office Use' },
        { id: 'setup-invoice', component: LocationSetupInvoice, label: 'Setup Location Invoice' }
    ];

    const currentStepIndex = steps.findIndex(step => step.id === currentStep);
    const CurrentStepComponent = steps[currentStepIndex]?.component;

    const handleStepChange = (stepId) => {
        setCurrentStep(stepId);
    };

    const handleNext = (data = {}) => {
        setFormData(prev => ({
            ...prev,
            [currentStep]: data
        }));

        console.log(formData)

        if (!completedSteps.includes(currentStep)) {
            setCompletedSteps(prev => [...prev, currentStep]);
        }

        const currentIndex = steps.findIndex(step => step.id === currentStep);
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1].id);
        }
    };

    const handlePrevious = () => {
        const currentIndex = steps.findIndex(step => step.id === currentStep);
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1].id);
        }
    };

    const handleAutoSave = (data) => {
        setFormData(prev => ({
            ...prev,
            [currentStep]: { ...prev[currentStep], ...data }
        }));
    };

    const handleComplete = async () => {
        const payload = {
            locationInformation: formData['location-info'] || {},
            guardsDetails: formData['guard-details'] || {},
            salaryCharges: formData['charges-breakup'] || {},
            invoiceSetup: formData['setup-invoice'] || {},
        };

        console.log('Final Payload to be sent to API:', JSON.stringify(payload, null, 2));
    };

    return (
        <div className="min-h-screen bg-formBGBlue">
            <div className='px-4 pt-4'>
                <aside className="bg-white border-b rounded-xl border-gray-200">
                    <div className="px-6 py-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>Dashboard</span>
                            <span>&gt;</span>
                            <span>Registration</span>
                            <span>&gt;</span>
                            <span className="text-gray-900 font-medium">Location Registration</span>
                        </div>
                    </div>
                </aside>
            </div>

            <div className="flex h-[calc(100vh-73px)] p-4 gap-5">
                <LocationSidebar
                    currentStep={currentStep}
                    onStepChange={handleStepChange}
                    completedSteps={completedSteps}
                />

                <div className="flex-1 overflow-y-auto rounded-xl">
                    {CurrentStepComponent && (
                        <CurrentStepComponent
                            onNext={handleNext}
                            onPrevious={handlePrevious}
                            onComplete={handleComplete}
                            onSave={handleAutoSave}
                            initialData={formData[currentStep] || {}}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default LocationRegistrationPage; 