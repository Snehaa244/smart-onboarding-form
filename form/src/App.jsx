import React from 'react';
import { useSelector } from 'react-redux';
import { useAutoSave } from './hooks/useAutoSave';

import Step1_UserDetails from './components/steps/UserDetails';
import Step2_AddressDetails from './components/steps/AddressDetails';
import Step3_Employment from './components/steps/Employment';
import Step4_Preferences from './components/steps/Preferences';
import Step5_Payment from './components/steps/Payment';
import Step6_Review from './components/steps/Review';
import Step7_Submitted from './components/steps/Submitted'; // ✅ Make sure this is imported

import Navbar from './components/layout/Navbar';
import ProgressBar from './components/common/ProgressBar';

const App = () => {
  const formState = useSelector((state) => state.form);
  const currentStep = formState.step;

  // Auto-save form every 10s
  useAutoSave(formState);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1_UserDetails />;
      case 2:
        return <Step2_AddressDetails />;
      case 3:
        return <Step3_Employment />;
      case 4:
        return <Step4_Preferences />;
      case 5:
        return <Step5_Payment />;
      case 6:
        return <Step6_Review />;
      case 7:
        return <Step7_Submitted />; // ✅ Show this after form is submitted
      default:
        return <Step1_UserDetails />;
    }
  };

  return (
    <>
      <Navbar />
      <ProgressBar />
      <div>
        {renderStep()}
      </div>
    </>
  );
};

export default App;
