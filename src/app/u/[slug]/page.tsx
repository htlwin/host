import Link from "next/link";
import { notFound } from "next/navigation";

import { findUserBySlug } from "@/lib/user-store";

type PublicProfilePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const socialLabels = [
  { key: "facebook", label: "Facebook" },
  { key: "instagram", label: "Instagram" },
  { key: "x", label: "X" },
  { key: "telegram", label: "Telegram" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "tiktok", label: "TikTok" },
  { key: "website", label: "Website" },
] as const;

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { slug } = await params;
  const user = await findUserBySlug(slug);

  if (!user) {
    notFound();
  }

  const socials = socialLabels.filter((item) => user[item.key]);

  return (
    <main className="shell flex min-h-screen items-center justify-center py-10">
      <section className="glass w-full max-w-3xl rounded-[2.25rem] p-6 sm:p-10">
        <div className="rounded-[1.9rem] bg-[var(--surface-strong)] p-6 sm:p-8">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            {user.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt={user.fullName}
                className="h-28 w-28 rounded-[1.8rem] object-cover"
                src={user.photoUrl}
              />
            ) : (
              <div className="title-font flex h-28 w-28 items-center justify-center rounded-[1.8rem] bg-[var(--accent-strong)] text-5xl font-bold text-white">
                {user.fullName.slice(0, 1).toUpperCase()}
              </div>
            )}

            <div>
              <p className="eyebrow mb-4">Shared profile</p>
              <h1 className="title-font text-4xl font-bold tracking-tight sm:text-5xl">
                {user.fullName}
              </h1>
              {user.bio ? <p className="muted mt-4 max-w-2xl text-base leading-7">{user.bio}</p> : null}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {user.phone ? (
              <a className="link-chip justify-center sm:justify-start" href={`tel:${user.phone}`}>
                Phone: {user.phone}
              </a>
            ) : null}
            <a className="link-chip justify-center sm:justify-start" href={`mailto:${user.email}`}>
              Email: {user.email}
            </a>
            {user.address ? <p className="link-chip sm:col-span-2">{user.address}</p> : null}
          </div>

          {socials.length ? (
            <div className="mt-8">
              <h2 className="title-font text-2xl font-bold">Social links</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {socials.map((item) => {
                  const href = user[item.key];

                  if (!href) {
                    return null;
                  }

                  return (
                    <Link
                      className="btn btn-secondary"
                      href={href}
                      key={item.key}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
