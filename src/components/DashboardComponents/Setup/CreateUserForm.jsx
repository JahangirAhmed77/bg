"use client"
import { useCurrentUser } from '@/lib/hooks';
import React, { useEffect, useState } from 'react';

const CreateUserForm = () => {

    const { user } = useCurrentUser();
    const [currentDate, setCurrentDate] = useState("");
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const now = new Date();

        const date = now.toLocaleDateString('en-GB');
        const time = now.toLocaleTimeString('en-US');

        setCurrentDate(date);
        setCurrentTime(time);
    }, []);
    return (
        <div className="min-h-screen bg-formBGBlue flex flex-col px-4 pt-4 w-full">
            {/* Breadcrumb */}
            <div className="w-full max-w-5xl">
                <aside className="bg-white border-b rounded-xl border-gray-200">
                    <div className="px-6 py-4">
                        <article className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>Dashboard</span>
                            <span>&gt;</span>
                            <span className="text-gray-900 font-medium">Create user</span>
                        </article>
                    </div>
                </aside>
            </div>

            {/* Form Card */}
            <div className="w-full max-w-5xl bg-white rounded-xl shadow-md mt-8 p-8">
                <h2 className="text-xl font-semibold mb-6">Create User</h2>
                <form className="space-y-8">
                    {/* Top Row: Office ID, Staff ID, Date, Time */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Staff ID</label>
                            <input type="text" value={user?.id} disabled className="w-full bg-formBgLightGreen text-gray-700 rounded-md px-4 py-2" />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Date</label>
                            <input type="text" value={currentDate} disabled className="w-full bg-formBgLightGreen text-gray-700 rounded-md px-4 py-2" />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Time</label>
                            <input type="text" value={currentTime} disabled className="w-full bg-formBgLightGreen text-gray-700 rounded-md px-4 py-2" />
                        </div>
                    </div>

                    {/* Middle Row: Select Role, Employee Service No. */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Select Role <span className="text-red-500">*</span></label>
                            <select className="w-full bg-gray-50 rounded-md px-4 py-2 border border-gray-200 text-gray-700">
                                <option value="">Select</option>
                                <option value="admin">Admin</option>
                                <option value="user">Staff</option>
                                <option value="supervisor">Supervisor</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Select Employee Service No.</label>
                            <input type="text" placeholder="Enter" className="w-full bg-gray-50 rounded-md px-4 py-2 border border-gray-200 text-gray-700" />
                        </div>
                    </div>

                    {/* Bottom Row: User Name, Email ID, Password */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">User Name</label>
                            <input type="text" placeholder="Enter Contact No." className="w-full bg-gray-50 rounded-md px-4 py-2 border border-gray-200 text-gray-700" />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Email ID <span className="text-red-500">*</span></label>
                            <input type="email" placeholder="Enter Email ID" className="w-full bg-gray-50 rounded-md px-4 py-2 border border-gray-200 text-gray-700" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs text-gray-500 mb-1">Password (Auto Generated)</label>
                            <input type="text" value="Auto Generate" disabled className="w-full bg-gray-100 rounded-md px-4 py-2 border border-gray-200 text-gray-700" />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center space-x-4 pt-4">
                        <button type="button" className="px-8 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition">Cancel</button>
                        <button type="submit" className="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUserForm;