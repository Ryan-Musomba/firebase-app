import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

function WizardProgress({ step }) {
  const stepLabels = ["Position", "Details", "Submit"];
  return (
    <div className="mb-8 relative">
      <div className="flex items-center justify-between relative z-10">
        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="flex flex-col items-center relative">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full text-base font-semibold transition-all duration-300 z-20 ${
                step >= stepNumber
                  ? "bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white shadow-lg"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {stepNumber}
            </div>
            <div className="mt-2 text-sm font-medium text-gray-700">
              {stepLabels[stepNumber - 1]}
            </div>
          </div>
        ))}
      </div>
      {/* Background Progress Lines */}
      <div className="absolute top-5 left-0 w-full h-2 bg-gray-300 rounded-full -z-10" />
      <div
        className="absolute top-5 left-0 h-2 rounded-full bg-gradient-to-r from-[#8B4513] to-[#A0522D] transition-all duration-500 -z-10"
        style={{ width: `${((step - 1) / 2) * 100}%` }}
      />
    </div>
  );
}

const initialFormState = {
  position: "",
  availability: "",
  experience: "",
  name: "",
  email: "",
  phone: "",
  dob: "",
  address: "",
  emergencyContactName: "",
  emergencyContactRelationship: "",
  emergencyContactPhone: "",
  experienceDetails: "",
  agreeTerms: false,
  status: "pending",
  applicationDate: new Date().toISOString(),
};

function WizardForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [existingApplications, setExistingApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "applications"));
        const apps = [];
        querySnapshot.forEach((doc) => {
          apps.push({ id: doc.id, ...doc.data() });
        });
        setExistingApplications(apps);
      } catch (err) {
        console.error("Error fetching applications: ", err);
      }
    };
    fetchApplications();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleNext = () => {
    if (step === 1 && (!formData.position || !formData.availability)) return;
    if (step === 2 && (!formData.name || !formData.email || !formData.phone)) return;
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    if (!formData.agreeTerms) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const duplicate = existingApplications.some(
        (app) => app.email === formData.email && app.position === formData.position
      );

      if (duplicate) {
        setError("You've already applied for this position");
        return;
      }

      const docRef = await addDoc(collection(db, "applications"), {
        ...formData,
        applicationDate: new Date().toISOString(),
        status: "pending",
      });

      console.log("Document written with ID: ", docRef.id);
      setShowSuccess(true);
    } catch (err) {
      console.error("Error adding document: ", err);
      setError("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setStep(1);
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFFF0] via-[#F5F5DC] to-[#FAF0E6] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-[#8B4513]/10">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-[#8B4513] to-[#A0522D] rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8B4513] to-[#A0522D] tracking-tight">
            Job Application
          </h1>
          <p className="mt-2 text-sm text-gray-600">Join our team at FoodExpress</p>
        </div>

        <WizardProgress step={step} />

        <div className="mb-6 p-6 bg-[#F5F5DC] rounded-xl border border-[#8B4513]/20">
          {step === 1 && <Step1 formData={formData} handleChange={handleChange} />}
          {step === 2 && <Step2 formData={formData} handleChange={handleChange} />}
          {step === 3 && <Step3 formData={formData} handleChange={handleChange} />}
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex">
              <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="ml-3 text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B4513] transition-all duration-200 transform hover:scale-105"
            >
              Back
            </button>
          )}
          
          {step < 3 ? (
            <button
              onClick={handleNext}
              className="ml-auto px-6 py-2 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-lg font-medium hover:from-[#A0522D] hover:to-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#8B4513] disabled:opacity-50 transition-all duration-200 transform hover:scale-105"
              disabled={
                (step === 1 && (!formData.position || !formData.availability)) ||
                (step === 2 && (!formData.name || !formData.email || !formData.phone))
              }
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="ml-auto px-6 py-2 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-lg font-medium hover:from-[#A0522D] hover:to-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#8B4513] disabled:opacity-50 transition-all duration-200 transform hover:scale-105"
              disabled={!formData.agreeTerms || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>

        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full">
              <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#8B4513] mb-2">Application Submitted!</h2>
              <p className="text-sm text-gray-600 mb-6">We'll review your application and contact you soon.</p>
              <button
                onClick={resetForm}
                className="px-6 py-2 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-lg font-medium hover:from-[#A0522D] hover:to-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#8B4513] transition-all duration-200 transform hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WizardForm;