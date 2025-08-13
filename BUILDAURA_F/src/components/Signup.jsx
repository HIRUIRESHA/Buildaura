
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, User, Mail, Lock, Phone, MapPin, Users, Briefcase, CheckCircle } from 'lucide-react'



export default function SignupPage() {
  const [step, setStep] = useState('select')
  const [registrationType, setRegistrationType] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const [companyForm, setCompanyForm] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    companySize: '',
    industry: ''
  })

  const [userForm, setUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    role: '',
    company: ''
  })

  const generateUserId = () => {
    return 'BA' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase()
  }

  const handleRegistrationTypeSelect = (type) => {
    setRegistrationType(type)
    setStep('register')
  }

  const handleBack = () => {
    setStep('select')
    setRegistrationType(null)
  }

  const handleCompanySubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const userId = generateUserId()
    console.log('Company Registration:', { ...companyForm, userId })
    alert(`Company registered successfully! Your Company ID: ${userId}`)
    setIsLoading(false)
  }

  const handleUserSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const userId = generateUserId()
    console.log('User Registration:', { ...userForm, userId })
    alert(`User registered successfully! Your User ID: ${userId}`)
    setIsLoading(false)
  }

  if (step === 'select') {
    return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Join BuildAura</h2>
              <p className="text-xl text-gray-600">Choose your registration type to get started</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Company Registration Card */}
              <Link
                to="/companysign"
                className="group h-full border-2 border-gray-200 hover:border-orange-400 transition-all duration-300 hover:shadow-xl hover:scale-105 rounded-3xl flex flex-col p-8 text-center no-underline"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Company Register</h3>
                <p className="text-gray-600 mb-6">
                  Register your construction company and manage projects, teams, and clients efficiently.
                </p>
                <div className="space-y-2 text-sm text-gray-500 mt-auto">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Manage multiple projects</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Team collaboration tools</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Client management system</span>
                  </div>
                </div>
              </Link>

              {/* User Registration Card */}
              <Link
                to="/userregister"
                className="group h-full border-2 border-gray-200 hover:border-orange-400 transition-all duration-300 hover:shadow-xl hover:scale-105 rounded-3xl flex flex-col p-8 text-center no-underline"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">User Register</h3>
                <p className="text-gray-600 mb-6">
                  Join as a client or site engineer to collaborate on construction projects.
                </p>
                <div className="space-y-2 text-sm text-gray-500 mt-auto">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Project collaboration</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Real-time updates</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Mobile accessibility</span>
                  </div>
                </div>
              </Link>
            </div>

            <div className="text-center">
              <p className="text-lg text-gray-600 mb-6">Already have an account?</p>
              <Link
                to="/login"
                className="px-8 py-3 text-lg border-2 border-orange-400 text-orange-600 hover:bg-orange-50 hover:border-orange-500 rounded-3xl transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  }

  
}
