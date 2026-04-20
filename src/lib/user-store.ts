import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type UserRecord = {
  id: string;
  email: string;
  passwordHash: string;
  slug: string;
  fullName: string;
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
  createdAt: string;
  updatedAt: string;
};

const dataDirectory = path.join(process.cwd(), "data");
const userFile = path.join(dataDirectory, "users.json");

async function ensureStore() {
  await mkdir(dataDirectory, { recursive: true });

  try {
    await readFile(userFile, "utf8");
  } catch {
    await writeFile(userFile, "[]", "utf8");
  }
}

async function readUsers() {
  await ensureStore();
  const content = await readFile(userFile, "utf8");
  return JSON.parse(content) as UserRecord[];
}

async function writeUsers(users: UserRecord[]) {
  await ensureStore();
  await writeFile(userFile, JSON.stringify(users, null, 2), "utf8");
}

export async function findUserById(id: string) {
  const users = await readUsers();
  return users.find((user) => user.id === id) ?? null;
}

export async function findUserByEmail(email: string) {
  const users = await readUsers();
  return users.find((user) => user.email === email) ?? null;
}

export async function findUserBySlug(slug: string) {
  const users = await readUsers();
  return users.find((user) => user.slug === slug) ?? null;
}

export async function createUser(
  user: Omit<UserRecord, "createdAt" | "updatedAt">,
) {
  const users = await readUsers();
  const now = new Date().toISOString();
  const nextUser: UserRecord = {
    ...user,
    createdAt: now,
    updatedAt: now,
  };

  users.push(nextUser);
  await writeUsers(users);
  return nextUser;
}

export async function updateUser(
  id: string,
  updates: Partial<Omit<UserRecord, "id" | "createdAt" | "email" | "passwordHash">>,
) {
  const users = await readUsers();
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return null;
  }

  users[userIndex] = {
    ...users[userIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  await writeUsers(users);
  return users[userIndex];
}
