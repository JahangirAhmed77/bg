'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const LocationAttendanceForm = () => {
  const [locationId, setLocationId] = useState('');
  const [locationName, setLocationName] = useState('');

  // Mock data for the attendance table
  const attendanceData = [
    {
      sNo: '01',
      serviceNo: '00251',
      guardName: 'Zaffar Khan',
      shift: 'Morning',
      attendance: 'P' // P, A, R, L
    },
    {
      sNo: '02',
      serviceNo: '00251',
      guardName: 'Zaffar Khan',
      shift: 'Morning',
      attendance: 'P'
    },
    {
      sNo: '03',
      serviceNo: '00251',
      guardName: 'Zaffar Khan',
      shift: 'Morning',
      attendance: 'P'
    }
  ];

  const [attendanceStates, setAttendanceStates] = useState(
    attendanceData.reduce((acc, item) => {
      acc[item.sNo] = item.attendance;
      return acc;
    }, {})
  );

  const handleAttendanceChange = (sNo, value) => {
    setAttendanceStates(prev => ({
      ...prev,
      [sNo]: value
    }));
  };

  const handleRowSubmit = (sNo) => {
    console.log(`Submitting attendance for row ${sNo}:`, attendanceStates[sNo]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with all attendance data:', attendanceStates);
  };

  const handleCancel = () => {
    setLocationId('');
    setLocationName('');
    setAttendanceStates(
      attendanceData.reduce((acc, item) => {
        acc[item.sNo] = item.attendance;
        return acc;
      }, {})
    );
  };

  return (
    <div className="min-h-screen bg-formBGBlue flex flex-col w-full px-4 pt-4">
      {/* Breadcrumb */}
      <div className="w-full max-w-7xl">
        <aside className="bg-white border-b rounded-xl border-gray-200">
          <div className="px-6 py-4">
            <article className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Dashboard</span>
              <span>&gt;</span>
              <span>Attendance</span>
              <span>&gt;</span>
              <span className="text-gray-900 font-medium">Location Attendance</span>
            </article>
          </div>
        </aside>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-7xl bg-white rounded-xl shadow-md mt-8 p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Auto Fields Row */}
          <div className="grid grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Office ID
              </label>
              <div className="px-4 py-3 bg-formBgLightGreen border border-gray-200 rounded-md text-gray-500">
                Auto
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supervisor ID
              </label>
              <div className="px-4 py-3 bg-formBgLightGreen border border-gray-200 rounded-md text-gray-500">
                Auto
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <div className="px-4 py-3 bg-formBgLightGreen border border-gray-200 rounded-md text-gray-500">
                Auto
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <div className="px-4 py-3 bg-formBgLightGreen border border-gray-200 rounded-md text-gray-500">
                Auto
              </div>
            </div>
          </div>

          {/* Daily Location Attendance Section */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Daily Location Attendance</h2>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Location ID
                </label>
                <div className="relative">
                  <select
                    value={locationId}
                    onChange={(e) => setLocationId(e.target.value)}
                    className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="">Select</option>
                    <option value="LOC001">LOC001</option>
                    <option value="LOC002">LOC002</option>
                    <option value="LOC003">LOC003</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Location Name
                </label>
                <div className="relative">
                  <select
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    className="w-full px-4 py-3 bg-formBgLightBlue border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="">Select</option>
                    <option value="Main Gate">Main Gate</option>
                    <option value="Back Gate">Back Gate</option>
                    <option value="Parking Area">Parking Area</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Attendance Table */}
            <div className="bg-formBGBlue rounded-2xl p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">S.NO</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">SERVICE No.</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Guard Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Shift</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">Attendance</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {attendanceData.map((item) => (
                      <tr key={item.sNo} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-600">{item.sNo}</td>
                        <td className="py-3 px-4 text-gray-600">{item.serviceNo}</td>
                        <td className="py-3 px-4 text-gray-600">{item.guardName}</td>
                        <td className="py-3 px-4 text-gray-600">{item.shift}</td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center space-x-4">
                            {['P', 'A', 'R', 'L'].map((type) => (
                              <label key={type} className="flex items-center space-x-1">
                                <input
                                  type="radio"
                                  name={`attendance-${item.sNo}`}
                                  value={type}
                                  checked={attendanceStates[item.sNo] === type}
                                  onChange={(e) => handleAttendanceChange(item.sNo, e.target.value)}
                                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <span className="text-sm text-gray-600">{type}</span>
                              </label>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleRowSubmit(item.sNo)}
                            className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            SUBMIT
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center space-x-4 pt-8">
              <button
                type="button"
                onClick={handleCancel}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LocationAttendanceForm;