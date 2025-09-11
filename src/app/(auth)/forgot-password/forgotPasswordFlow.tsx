"use client";
import React, { useState } from "react";
import EmailStep from "./_components/emailStep";
import VerifyStep from "./_components/verifyStep";
import CreatePasswordStep from "./_components/createPasswordStep";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [step, setStep] = useState<"email" | "verify" | "createPassword">(
    "email"
  );
  return (
    <>
      {/* <VerifyStep /> */}
      {/* <EmailStep /> */}
      {step == "email" && <EmailStep setEmail={setEmail} setStep={setStep} />}
      {step == "verify" && <VerifyStep setStep={setStep} email={email} />}
      {step == "createPassword" && (
        <CreatePasswordStep setStep={setStep} email={email} />
      )}
    </>
  );
}
