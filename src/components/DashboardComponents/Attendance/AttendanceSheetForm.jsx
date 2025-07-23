'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const AttendanceSheetForm = () => {
  const [locationId, setLocationId] = useState('');
  const [locationName, setLocationName] = useState('');

  // Generate days of the month (1-31)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Day labels for the header
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Mock employee data
  const employees = [
    { id: 1, name: 'Zahid Khan', serviceNo: '00', payRate: '25', p: 3, a: 1, l: 1 },
    { id: 2, name: 'Muneeb Khalid', serviceNo: '00', payRate: '26', p: 1, a: 1, l: 1 },
    { id: 3, name: 'Raza Khan', serviceNo: '00', payRate: '26', p: 1, a: 3, l: 1 },
    { id: 4, name: 'Naveed', serviceNo: '00', payRate: '26', p: 1, a: 3, l: 1 },
    { id: 5, name: 'Zubar', serviceNo: '00', payRate: '26', p: 1, a: 3, l: 1 },
    { id: 6, name: 'Kashan Khan', serviceNo: '00', payRate: '26', p: 1, a: 3, l: 1 },
    { id: 7, name: 'Umair Irfan', serviceNo: '00', payRate: '26', p: 1, a: 3, l: 1 },
    { id: 8, name: 'Ahsan Ummer', serviceNo: '00', payRate: '26', p: 1, a: 3, l: 1 }
  ];

  // Initialize attendance data for each employee and each day
  const [attendanceData, setAttendanceData] = useState(() => {
    const data = {};
    employees.forEach(emp => {
      data[emp.id] = {};
      daysInMonth.forEach(day => {
        // Set some random initial values (P, A, L, or empty)
        const values = ['P', 'A', 'L', ''];
        data[emp.id][day] = day <= 15 ? values[Math.floor(Math.random() * 3)] : '';
      });
    });
    return data;
  });

  const handleAttendanceChange = (empId, day, value) => {
    setAttendanceData(prev => ({
      ...prev,
      [empId]: {
        ...prev[empId],
        [day]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Monthly attendance submitted:', attendanceData);
  };

  const renderAttendanceCell = (empId, day) => {
    const value = attendanceData[empId]?.[day] || '';
    const cellClass = `w-8 h-8 text-xs text-center border border-gray-200 rounded ${value === 'P' ? 'bg-green-100 text-green-800' :
        value === 'A' ? 'bg-red-100 text-red-800' :
          value === 'L' ? 'bg-yellow-100 text-yellow-800' :
            'bg-white'
      }`;

    return (
      <td key={day} className="p-1">
        <input
          type="text"
          value={value}
          onChange={(e) => handleAttendanceChange(empId, day, e.target.value.toUpperCase())}
          className={cellClass}
          maxLength={1}
          placeholder=""
        />
      </td>
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
              <span>Registration</span>
              <span>&gt;</span>
              <span className="text-gray-900 font-medium">Attendance Sheet</span>
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

          {/* Monthly Attendance Sheet Section */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Monthly Attendance Sheet</h2>

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

            {/* Submit Button for Location Selection */}
            <div className="flex justify-start">
              <button
                type="button"
                className="px-6 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>

            {/* Monthly Attendance Table */}
            <div className="bg-formBGBlue rounded-2xl p-6">
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                <table className="min-w-full bg-white rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="sticky left-0 z-10 bg-gray-50 px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">S.No</th>
                      <th className="sticky left-8 z-10 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700 border border-gray-200 min-w-32">Name</th>
                      <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">SERVICE No.</th>
                      <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">P</th>
                      <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">A</th>
                      <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">R</th>
                      <th className="px-2 py-2 text-xs font-medium text-gray-700 border border-gray-200">L</th>

                      {/* Days of the month */}
                      {daysInMonth.map((day, index) => (
                        <th key={day} className="px-1 py-2 text-xs font-medium text-gray-700 border border-gray-200 w-10">
                          <div className="text-center">
                            <div className="text-xs">{day}</div>
                            <div className="text-xs text-gray-500">{dayLabels[index % 7]}</div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee, index) => (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="sticky left-0 z-10 bg-white px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                          {index + 1}
                        </td>
                        <td className="sticky left-8 z-10 bg-white px-3 py-2 text-xs text-gray-600 border border-gray-200 min-w-32">
                          {employee.name}
                        </td>
                        <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                          {employee.serviceNo}
                        </td>
                        <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                          {employee.p}
                        </td>
                        <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                          {employee.a}
                        </td>
                        <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                          1
                        </td>
                        <td className="px-2 py-2 text-xs text-gray-600 border border-gray-200 text-center">
                          {employee.l}
                        </td>

                        {/* Attendance cells for each day */}
                        {daysInMonth.map(day => renderAttendanceCell(employee.id, day))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Legend */}
              <div className="mt-4 flex justify-start space-x-6 text-xs text-gray-600">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-green-100 border rounded"></div>
                  <span>P - Present</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-red-100 border rounded"></div>
                  <span>A - Absent</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-yellow-100 border rounded"></div>
                  <span>L - Leave</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttendanceSheetForm;