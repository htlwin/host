import type { User } from "@supabase/supabase-js";

import { createSupabaseAdminClient } from "@/lib/supabase";

export type UserProfile = {
  fullName: string;
  slug: string;
  photoUrl: string | null;
  phone: string | null;
  address: string | null;
  bio: string | null;
  facebook: string | null;
  instagram: string | null;
  x: string | null;
  telegram: string | null;
  whatsapp: string | null;
  tiktok: string | null;
  website: string | null;
};

export type UserRecord = UserProfile & {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

type AuthMetadata = Partial<UserProfile> & {
  updatedAt?: string;
};

const emptyProfile: UserProfile = {
  fullName: "",
  slug: "",
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
};

function mapAuthUser(user: User): UserRecord {
  const metadata = (user.user_metadata ?? {}) as AuthMetadata;

  return {
    id: user.id,
    email: user.email ?? "",
    createdAt: user.created_at,
    updatedAt: metadata.updatedAt ?? user.updated_at ?? user.created_at,
    fullName: metadata.fullName ?? emptyProfile.fullName,
    slug: metadata.slug ?? emptyProfile.slug,
    photoUrl: metadata.photoUrl ?? emptyProfile.photoUrl,
    phone: metadata.phone ?? emptyProfile.phone,
    address: metadata.address ?? emptyProfile.address,
    bio: metadata.bio ?? emptyProfile.bio,
    facebook: metadata.facebook ?? emptyProfile.facebook,
    instagram: metadata.instagram ?? emptyProfile.instagram,
    x: metadata.x ?? emptyProfile.x,
    telegram: metadata.telegram ?? emptyProfile.telegram,
    whatsapp: metadata.whatsapp ?? emptyProfile.whatsapp,
    tiktok: metadata.tiktok ?? emptyProfile.tiktok,
    website: metadata.website ?? emptyProfile.website,
  };
}

export async function findUserById(id: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.auth.admin.getUserById(id);

  if (error || !data.user) {
    return null;
  }

  return mapAuthUser(data.user);
}

export async function findUserByEmail(email: string) {
  const users = await listAllUsers();
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function findUserBySlug(slug: string) {
  const users = await listAllUsers();
  return users.find((user) => user.slug === slug) ?? null;
}

export async function updateUserProfile(id: string, profile: UserProfile) {
  const supabase = createSupabaseAdminClient();
  const updatedAt = new Date().toISOString();
  const { data, error } = await supabase.auth.admin.updateUserById(id, {
    user_metadata: {
      ...profile,
      updatedAt,
    },
  });

  if (error || !data.user) {
    return null;
  }

  return mapAuthUser(data.user);
}

async function listAllUsers() {
  const supabase = createSupabaseAdminClient();
  const users: UserRecord[] = [];
  let page = 1;
  const perPage = 200;

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage,
    });

    if (error) {
      throw new Error(error.message);
    }

    const batch = data.users.map(mapAuthUser);
    users.push(...batch);

    if (batch.length < perPage) {
      break;
    }

    page += 1;
  }

  return users;
}
