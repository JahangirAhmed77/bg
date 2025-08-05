'use client'
import LocationGrossSalaryForm from '@/components/DashboardComponents/Payroll/LocationGrossSalary'
import React from 'react'



const LocationGrossSalaryPage = () => {
  return (
      <div>
          {/* Breadcrumb */}
          {/* <div className="w-full max-w-7xl">
              <aside className="bg-white border-b rounded-xl border-gray-200">
                  <div className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>Dashboard</span>
                          <span>&gt;</span>
                          <span>Payroll</span>
                          <span>&gt;</span>
                          <span className="text-gray-900 font-medium">Location Gross Salary</span>
                      </div>
                  </div>
              </aside>
          </div> */}

          <LocationGrossSalaryForm />
      </div>
  )
}

export default LocationGrossSalaryPage