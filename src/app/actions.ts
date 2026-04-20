"use server";

import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { redirect } from "next/navigation";

import { clearSession, createSession, requireUser } from "@/lib/auth";
import {
  createUser,
  findUserByEmail,
  findUserBySlug,
  updateUser,
} from "@/lib/user-store";
import { normalizeOptionalText, normalizeOptionalUrl, slugify } from "@/lib/utils";

export type FormState = {
  error?: string;
  success?: string;
};

async function createUniqueSlug(baseValue: string) {
  const fallback = `user-${Math.random().toString(36).slice(2, 8)}`;
  const baseSlug = slugify(baseValue) || fallback;

  for (let attempt = 0; attempt < 10; attempt += 1) {
    const slug = attempt === 0 ? baseSlug : `${baseSlug}-${attempt + 1}`;
    const existingUser = await findUserBySlug(slug);

    if (!existingUser) {
      return slug;
    }
  }

  return `${baseSlug}-${Date.now().toString().slice(-5)}`;
}

export async function signUpAction(_: FormState, formData: FormData): Promise<FormState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!fullName || !email || !password) {
    return { error: "Please fill in your name, email, and password." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long." };
  }

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    return { error: "That email is already registered. Please sign in instead." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const slug = await createUniqueSlug(fullName);

  const user = await createUser({
    id: crypto.randomUUID(),
    email,
    passwordHash,
    slug,
    fullName,
    photoUrl: null,
    phone: null,
    address: null,
    bio: null,
    facebook: null,
    instagram: null,
    x: null,
    telegram: null,
    whatsapp: null,
    tiktok: null,
    website: null,
  });

  await createSession(user.id);
  redirect("/dashboard");
}

export async function signInAction(_: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Please enter your email and password." };
  }

  const user = await findUserByEmail(email);

  if (!user) {
    return { error: "No account was found for that email." };
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    return { error: "Incorrect password. Please try again." };
  }

  await createSession(user.id);
  redirect("/dashboard");
}

export async function signOutAction() {
  await clearSession();
  redirect("/");
}

export async function saveProfileAction(
  _: FormState,
  formData: FormData,
): Promise<FormState> {
  const user = await requireUser();
  const fullName = String(formData.get("fullName") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();

  if (!fullName) {
    return { error: "Name is required." };
  }

  const slug = slugify(slugInput);

  if (!slug) {
    return { error: "Share link must use letters, numbers, or hyphens." };
  }

  const existingSlug = await findUserBySlug(slug);

  if (existingSlug && existingSlug.id !== user.id) {
    return { error: "That share link is already taken. Please choose another one." };
  }

  await updateUser(user.id, {
    fullName,
    slug,
    photoUrl: normalizeOptionalUrl(formData.get("photoUrl")),
    phone: normalizeOptionalText(formData.get("phone")),
    address: normalizeOptionalText(formData.get("address")),
    bio: normalizeOptionalText(formData.get("bio")),
    facebook: normalizeOptionalUrl(formData.get("facebook")),
    instagram: normalizeOptionalUrl(formData.get("instagram")),
    x: normalizeOptionalUrl(formData.get("x")),
    telegram: normalizeOptionalUrl(formData.get("telegram")),
    whatsapp: normalizeOptionalUrl(formData.get("whatsapp")),
    tiktok: normalizeOptionalUrl(formData.get("tiktok")),
    website: normalizeOptionalUrl(formData.get("website")),
  });

  return { success: "Profile updated. Your share link is ready to send." };
}
