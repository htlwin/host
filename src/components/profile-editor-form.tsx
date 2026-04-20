"use client";

import { useActionState } from "react";

import { saveProfileAction, type FormState } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";

type ProfileEditorFormProps = {
  user: {
    fullName: string;
    slug: string;
    photoUrl: string | null;
    phone: string | null;
    address: string | null;
    bio: string | null;
    email: string;
    facebook: string | null;
    instagram: string | null;
    x: string | null;
    telegram: string | null;
    whatsapp: string | null;
    tiktok: string | null;
    website: string | null;
  };
  shareUrl: string;
};

const initialState: FormState = {};

export function ProfileEditorForm({ user, shareUrl }: ProfileEditorFormProps) {
  const [state, action] = useActionState(saveProfileAction, initialState);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
      <form action={action} className="glass rounded-[2rem] p-6 sm:p-8">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow mb-4">Profile editor</p>
            <h2 className="title-font text-3xl font-bold tracking-tight sm:text-4xl">
              Build the page people open from your link.
            </h2>
            <p className="muted mt-3 max-w-2xl text-base leading-7">
              Add the details you want to share. Leave anything blank if you do not
              want it to appear publicly.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label" htmlFor="fullName">
              Full name
            </label>
            <input className="field" id="fullName" name="fullName" defaultValue={user.fullName} />
          </div>

          <div className="sm:col-span-2">
            <label className="label" htmlFor="slug">
              Share link name
            </label>
            <input className="field" id="slug" name="slug" defaultValue={user.slug} />
          </div>

          <div className="sm:col-span-2">
            <label className="label" htmlFor="photoUrl">
              Profile photo URL
            </label>
            <input
              className="field"
              id="photoUrl"
              name="photoUrl"
              defaultValue={user.photoUrl ?? ""}
              placeholder="https://your-image-link.com/photo.jpg"
            />
          </div>

          <div>
            <label className="label" htmlFor="phone">
              Phone number
            </label>
            <input className="field" id="phone" name="phone" defaultValue={user.phone ?? ""} />
          </div>

          <div>
            <label className="label" htmlFor="emailReadonly">
              Login email
            </label>
            <input
              className="field opacity-70"
              id="emailReadonly"
              value={user.email}
              readOnly
            />
          </div>

          <div className="sm:col-span-2">
            <label className="label" htmlFor="address">
              Address
            </label>
            <textarea
              className="field min-h-28 resize-y"
              id="address"
              name="address"
              defaultValue={user.address ?? ""}
              placeholder="Street, city, country"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="label" htmlFor="bio">
              Short bio
            </label>
            <textarea
              className="field min-h-28 resize-y"
              id="bio"
              name="bio"
              defaultValue={user.bio ?? ""}
              placeholder="A short intro or note"
            />
          </div>

          <div>
            <label className="label" htmlFor="facebook">
              Facebook
            </label>
            <input className="field" id="facebook" name="facebook" defaultValue={user.facebook ?? ""} />
          </div>

          <div>
            <label className="label" htmlFor="instagram">
              Instagram
            </label>
            <input className="field" id="instagram" name="instagram" defaultValue={user.instagram ?? ""} />
          </div>

          <div>
            <label className="label" htmlFor="x">
              X
            </label>
            <input className="field" id="x" name="x" defaultValue={user.x ?? ""} />
          </div>

          <div>
            <label className="label" htmlFor="telegram">
              Telegram
            </label>
            <input className="field" id="telegram" name="telegram" defaultValue={user.telegram ?? ""} />
          </div>

          <div>
            <label className="label" htmlFor="whatsapp">
              WhatsApp
            </label>
            <input className="field" id="whatsapp" name="whatsapp" defaultValue={user.whatsapp ?? ""} />
          </div>

          <div>
            <label className="label" htmlFor="tiktok">
              TikTok
            </label>
            <input className="field" id="tiktok" name="tiktok" defaultValue={user.tiktok ?? ""} />
          </div>

          <div className="sm:col-span-2">
            <label className="label" htmlFor="website">
              Website
            </label>
            <input className="field" id="website" name="website" defaultValue={user.website ?? ""} />
          </div>
        </div>

        {state.error ? <p className="mt-5 text-sm font-semibold text-red-600">{state.error}</p> : null}
        {state.success ? <p className="mt-5 text-sm font-semibold text-[var(--accent-strong)]">{state.success}</p> : null}

        <SubmitButton className="btn btn-primary mt-8 w-full sm:w-auto" pendingText="Saving profile...">
          Save profile
        </SubmitButton>
      </form>

      <aside className="glass rounded-[2rem] p-6 sm:p-8">
        <p className="eyebrow mb-4">Share link</p>
        <h3 className="title-font text-2xl font-bold">Your live card</h3>
        <p className="muted mt-3 text-sm leading-6">
          Send this link to anyone who needs your phone, address, email, or social
          media details.
        </p>

        <a
          className="mt-5 block rounded-2xl border border-[var(--border)] bg-white/80 px-4 py-4 font-semibold break-all"
          href={shareUrl}
          target="_blank"
          rel="noreferrer"
        >
          {shareUrl}
        </a>

        <div className="mt-8 rounded-[1.6rem] border border-[var(--border)] bg-[var(--surface-strong)] p-5">
          <div className="mb-4 flex items-center gap-4">
            {user.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt={user.fullName}
                className="h-[4.5rem] w-[4.5rem] rounded-2xl object-cover"
                src={user.photoUrl}
              />
            ) : (
              <div className="title-font flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl bg-[var(--accent-strong)] text-2xl font-bold text-white">
                {user.fullName.slice(0, 1).toUpperCase()}
              </div>
            )}

            <div>
              <p className="title-font text-2xl font-bold">{user.fullName}</p>
              <p className="muted text-sm">@{user.slug}</p>
            </div>
          </div>

          <div className="grid gap-3 text-sm">
            {user.phone ? <p>Phone: {user.phone}</p> : null}
            <p>Email: {user.email}</p>
            {user.address ? <p>Address: {user.address}</p> : null}
          </div>
        </div>
      </aside>
    </div>
  );
}
