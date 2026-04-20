"use client";

import Link from "next/link";
import { useActionState } from "react";

import { signInAction, type FormState } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";

const initialState: FormState = {};

export function SignInForm() {
  const [state, action] = useActionState(signInAction, initialState);

  return (
    <form action={action} className="glass fade-up w-full max-w-xl rounded-[2rem] p-8 sm:p-10">
      <div className="mb-8">
        <p className="eyebrow mb-4">Welcome back</p>
        <h1 className="title-font text-4xl font-bold tracking-tight sm:text-5xl">
          Sign in to edit your card.
        </h1>
        <p className="muted mt-3 text-base leading-7">
          Update your address, social links, and share page any time.
        </p>
      </div>

      <div className="grid gap-5">
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
            placeholder="Your password"
          />
        </div>
      </div>

      {state.error ? <p className="mt-5 text-sm font-semibold text-red-600">{state.error}</p> : null}

      <SubmitButton className="btn btn-primary mt-8 w-full" pendingText="Signing in...">
        Sign in
      </SubmitButton>

      <p className="muted mt-5 text-sm">
        Need an account?{" "}
        <Link className="font-semibold text-[var(--accent-strong)]" href="/sign-up">
          Sign up
        </Link>
      </p>
    </form>
  );
}
