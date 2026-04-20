import Link from "next/link";

import { getCurrentUser } from "@/lib/auth";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <main className="soft-grid flex-1">
      <section className="shell grid min-h-screen items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="fade-up py-8">
          <p className="eyebrow mb-5">Personal contact page</p>
          <h1 className="title-font max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            One simple link for all of your personal information.
          </h1>
          <p className="muted mt-6 max-w-2xl text-lg leading-8">
            Create your own share page with profile photo, phone number, email,
            address, Facebook, Instagram, X, Telegram, WhatsApp, TikTok, website,
            and more. Sign in to edit it any time.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="btn btn-primary" href={user ? "/dashboard" : "/sign-up"}>
              {user ? "Open dashboard" : "Create my link"}
            </Link>
            <Link className="btn btn-secondary" href={user ? `/u/${user.slug}` : "/sign-in"}>
              {user ? "View my page" : "Sign in"}
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {["Phone", "Address", "Email", "Facebook", "Instagram", "X", "Telegram", "WhatsApp", "TikTok", "Website"].map(
              (item) => (
                <span className="link-chip" key={item}>
                  {item}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="fade-up glass rounded-[2rem] p-6 sm:p-8" style={{ animationDelay: "120ms" }}>
          <div className="rounded-[1.8rem] bg-[var(--surface-strong)] p-6">
            <div className="mb-6 flex items-center gap-4">
              <div className="title-font flex h-20 w-20 items-center justify-center rounded-[1.6rem] bg-[var(--accent-strong)] text-3xl font-bold text-white">
                A
              </div>
              <div>
                <p className="title-font text-3xl font-bold">Avery Carter</p>
                <p className="muted text-sm">yourdomain.com/u/avery-carter</p>
              </div>
            </div>

            <div className="grid gap-3 rounded-[1.4rem] border border-[var(--border)] bg-white/70 p-5 text-sm sm:text-base">
              <p>Phone: +1 555 123 4567</p>
              <p>Email: avery@example.com</p>
              <p>Address: 22 Ocean Avenue, Los Angeles</p>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {["Facebook", "Instagram", "X", "Telegram", "WhatsApp", "TikTok", "Website"].map(
                (item) => (
                  <span className="link-chip" key={item}>
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
