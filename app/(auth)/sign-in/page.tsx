"use client";

import {CountrySelectField} from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { Button } from "@/components/ui/button";
import { signInWithEmail } from "@/lib/actions/auth.actions";
import { INVESTMENT_GOALS, RISK_TOLERANCE_OPTIONS } from "@/lib/constants";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const SignIn = () => {
  const router = useRouter()
  const {
      register,
      handleSubmit,
      control,
      formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
      defaultValues: {
        email: "",
        password: "",
      },
      mode: "onBlur",
    });
  
  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await signInWithEmail(data);
      if(result.success) router.push("/");
    } catch (e) {
      console.log(e);
      toast.error('Sign in failed!', {
        description: e instanceof Error ? e.message : "Failed to sign in."
      })
    }
  };

  return (
    <>
      <h1 className="form-title">Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="email"
          label="Email"
          placeholder="contact@jsmastery.com"
          register={register}
          error={errors.email}
          validation={{
            required: "Email is required",
            pattern: {
              value: /^\w+@\w+\.\w+$/,
              message: "Email address is not valid",
            },
          }}
        />
        <InputField
          name="password"
          label="Password"
          placeholder="Enter a strong password"
          type="password"
          register={register}
          error={errors.password}
          validation={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          }}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Sign In" : "Continue Your Investing Journey"}
        </Button>
        <FooterLink text="Don't have an account?" linkText="Create an account" href="/sign-up" />
      </form>
    </>
  )
}

export default SignIn