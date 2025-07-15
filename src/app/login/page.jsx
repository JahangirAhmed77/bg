'use client'
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import * as yup from 'yup';

// Yup validation schema
const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email('Your email is invalid.')
        .required('Email is required'),
    password: yup
        .string()
        .min(4, 'Password must be at least 4 characters.')
        .required('Password is required')
});

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [keepSignedIn, setKeepSignedIn] = useState(false);

    const validateField = async (name, value) => {
        try {
            await yup.reach(loginSchema, name).validate(value);
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
            return true;
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                [name]: error.message
            }));
            return false;
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }

        // Optional: Real-time validation on blur
        // You can uncomment the lines below for immediate validation
        // if (value.trim()) {
        //   validateField(name, value);
        // }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Validate entire form with Yup
            await loginSchema.validate(formData, { abortEarly: false });

            // Clear any existing errors
            setErrors({});

            console.log('Form submitted:', formData);
            // Handle successful form submission here
        } catch (error) {
            // Handle validation errors
            const validationErrors = {};
            if (error.inner) {
                error.inner.forEach((err) => {
                    validationErrors[err.path] = err.message;
                });
            }
            setErrors(validationErrors);
        }
    };

    return (
        <section className="min-h-screen flex">
            {/* Left Side - Hero Section with Banner Image */}
            <div className="flex-1 relative overflow-hidden flex flex-col bg-white">
                {/* Text Content - Above Image */}
                <div className="z-10 flex items-center justify-start px-4 py-16 pl-12">
                    <aside className="text-gray-600 max-w-lg ">
                        <h1 className="text-4xl mb-6 leading-tight font-[500]">
                            Unlock your<br />
                            Project <span className="text-gray-600"><span className='text-black'>performance</span></span>
                        </h1>
                    </aside>
                </div>

                {/* Banner Background Image - Full Image Visible */}
                <div
                    className="absolute inset-x-0 bottom-0 top-32 bg-contain bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url(/images/BannerLoginScreen.webp)'
                    }}
                >
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 bg-white flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h2>
                        <p className="text-gray-600">Sign in to your account to start using Dashboard</p>
                    </div>

                    <div className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                onBlur={(e) => validateField(e.target.name, e.target.value)}
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    onBlur={(e) => validateField(e.target.name, e.target.value)}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors pr-12 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        {/* Keep Me Signed In & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="keepSignedIn"
                                    checked={keepSignedIn}
                                    onChange={(e) => setKeepSignedIn(e.target.checked)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="keepSignedIn" className="ml-2 text-sm text-gray-700">
                                    Keep Me Signed In
                                </label>
                            </div>
                            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                                Forgot Password?
                            </a>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                        >
                            Sign In
                        </button>


                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;