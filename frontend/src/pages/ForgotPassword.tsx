import React, { useState, useRef, useEffect } from "react";
import { type Step } from "../utils/type";
import { BackgroundElements } from "../components/forgotPassword/BackgroundElements";
import { Logo } from "../components/forgotPassword/Logo";
import { ProgressBar } from "../components/forgotPassword/ProgressBar";
import { TrustBadge } from "../components/forgotPassword/TrustBadge";
import { EmailStep } from "../components/forgotPassword/steps/EmailStep";
import { VerificationStep } from "../components/forgotPassword/steps/VerificationStep";
import { ResetStep } from "../components/forgotPassword/steps/ResetStep";
import { SuccessStep } from "../components/forgotPassword/steps/SuccessStep";
import "../forgotPassword.css";
import { forgotPasswordToServer, resetPasswordOnServer,verifyResetCodeOnServer } from "../services/authService";
import { useNavigate } from "react-router-dom";
const ForgotPassword: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const emailRegex = /^\S+@\S+\.\S+$/;
  const navigate = useNavigate();

  useEffect(() => {
    if (currentStep === "verification" && inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, [currentStep]);

  const handleEmailSubmit = async () => {
    setErrors("");
  
    if (!email || !emailRegex.test(email)) {
      setErrors("Please enter a valid email address");
      return;
    }
  
    setIsLoading(true);
  
    try {
      await forgotPasswordToServer(email);
  
      setCurrentStep("verification"); // move to next step
    } catch (err: any) {
      setErrors(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0];
    }

    if (!/^\d*$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerificationKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

 
  const handleVerificationSubmit = async () => {
    const code = verificationCode.join("");

    if (code.length !== 6) {
      setErrors("Please enter the complete 6-digit code");
      return;
    }

    setErrors("");
    setIsLoading(true);

    try {
      const data = await verifyResetCodeOnServer(email, code);
      console.log("Verification response:", data);

      // Move to reset password page
      // e.g., setCurrentStep("reset") or navigate("/reset-password")
      // alert("Code verified! You can now reset your password.");
      setCurrentStep("reset")
    } catch (err: any) {
      console.error(err);
      setErrors(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setErrors("");
  
    if (!newPassword || newPassword.length < 8) {
      setErrors("Password must be at least 8 characters long");
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setErrors("Passwords do not match");
      return;
    }
  
    setIsLoading(true);
    const code = verificationCode.join("");
    try {
      await resetPasswordOnServer({
        email,          // user's email from previous step
        code,// verification code entered by user
        newPassword,    // new password from input
      });
  
      setCurrentStep("success");
      console.log("Password reset successful");
      // alert("Password has been reset successfully!");
    } catch (err: any) {
      setErrors(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleBackToLogin = () => {
    navigate("/login");
  };

  const handleBackToEmail = () => {
    setCurrentStep("email");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 via-purple-50 to-indigo-100 relative overflow-hidden flex items-center justify-center p-4">
      <BackgroundElements />

      <div className="relative z-10 w-full max-w-md">
        <Logo />

        {currentStep !== "success" && <ProgressBar currentStep={currentStep} />}

        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-pink-100 p-8 sm:p-10">
          {currentStep === "email" && (
            <EmailStep
              email={email}
              setEmail={setEmail}
              errors={errors}
              isLoading={isLoading}
              onSubmit={handleEmailSubmit}
              onBack={handleBackToLogin}
            />
          )}

          {currentStep === "verification" && (
            <VerificationStep
              email={email}
              verificationCode={verificationCode}
              inputRefs={inputRefs}
              errors={errors}
              isLoading={isLoading}
              onChange={handleVerificationChange}
              onKeyDown={handleVerificationKeyDown}
              onSubmit={handleVerificationSubmit}
              onBack={handleBackToEmail}
            />
          )}

          {currentStep === "reset" && (
            <ResetStep
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              showNewPassword={showNewPassword}
              setShowNewPassword={setShowNewPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              errors={errors}
              isLoading={isLoading}
              onSubmit={handleResetPassword}
            />
          )}

          {currentStep === "success" && (
            <SuccessStep onBack={handleBackToLogin} />
          )}
        </div>

        {currentStep !== "success" && <TrustBadge />}
      </div>
    </div>
  );
};

export default ForgotPassword;
