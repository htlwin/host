"use client";

import Link from "next/link";
import { useActionState } from "react";

import { signUpAction, type FormState } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";

const initialState: FormState = {};

export function SignUpForm() {
  const [state, action] = useActionState(signUpAction, initialState);

  return (
    <form action={action} className="glass fade-up w-full max-w-xl rounded-[2rem] p-8 sm:p-10">
      <div className="mb-8">
        <p className="eyebrow mb-4">Create account</p>
        <h1 className="title-font text-4xl font-bold tracking-tight sm:text-5xl">
          Start your own contact link.
        </h1>
        <p className="muted mt-3 text-base leading-7">
          Sign up once, fill in your details, and share one clean page for phone,
          address, email, and socials.
        </p>
      </div>

      <div className="grid gap-5">
        <div>
          <label className="label" htmlFor="fullName">
            Full name
          </label>
          <input className="field" id="fullName" name="fullName" placeholder="Your full name" />
        </div>

        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className="field"
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="field"
            id="password"
            name="password"
            type="password"
            placeholder="At least 6 characters"
          />
        </div>
      </div>

      {state.error ? <p className="mt-5 text-sm font-semibold text-red-600">{state.error}</p> : null}

      <SubmitButton className="btn btn-primary mt-8 w-full" pendingText="Creating account...">
        Sign up
      </SubmitButton>

      <p className="muted mt-5 text-sm">
        Already have an account?{" "}
        <Link className="font-semibold text-[var(--accent-strong)]" href="/sign-in">
          Sign in
        </Link>
      </p>
    </form>
  );
}
