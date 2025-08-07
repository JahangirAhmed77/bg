'use client';
import React from 'react'
import PayrollSidebar from '@/components/DashboardComponents/Payroll/PayrollSidebar';


const GeneratePayRollPage = () => {
  return (
    <div className="min-h-screen bg-formBGBlue">
      {/* Header */}
      {/* <div className='px-4 pt-4'>
        <Breadcrumbs breadcrumbs={[
          { label: 'Dashboard' },
          { label: 'Payroll' },
          { label: 'Generate Pay Roll' }
        ]} />
      </div> */}

      <div className="flex h-[calc(100vh-73px)] p-4 gap-5">
        {/* Sidebar */}
        <PayrollSidebar
          currentStep="generate-pay-roll"
          completedSteps={[]}
          showNavigation={true}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto rounded-xl">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="text-center">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Generate Pay Roll</h2>
              <p className="text-gray-600 text-lg">Location Wise Payroll Generation</p>
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-yellow-800 font-medium">Coming Soon</p>
                <p className="text-yellow-700 text-sm mt-1">This feature is currently under development</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneratePayRollPage