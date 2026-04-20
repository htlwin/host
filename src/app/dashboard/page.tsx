import Link from "next/link";
import { headers } from "next/headers";

import { signOutAction } from "@/app/actions";
import { ProfileEditorForm } from "@/components/profile-editor-form";
import { requireUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await requireUser();
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3000";
  const protocol = headerList.get("x-forwarded-proto") ?? "http";
  const shareUrl = `${protocol}://${host}/u/${user.slug}`;

  return (
    <main className="shell flex-1 py-8 sm:py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow mb-4">Dashboard</p>
          <h1 className="title-font text-4xl font-bold tracking-tight sm:text-5xl">
            Welcome, {user.fullName}
          </h1>
          <p className="muted mt-3 text-base leading-7">
            Edit your public information and send your link anywhere.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link className="btn btn-secondary" href={`/u/${user.slug}`} target="_blank">
            Open public page
          </Link>
          <form action={signOutAction}>
            <button className="btn btn-secondary" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </div>

      <ProfileEditorForm
        shareUrl={shareUrl}
        user={{
          address: user.address,
          bio: user.bio,
          email: user.email,
          facebook: user.facebook,
          fullName: user.fullName,
          instagram: user.instagram,
          phone: user.phone,
          photoUrl: user.photoUrl,
          slug: user.slug,
          telegram: user.telegram,
          tiktok: user.tiktok,
          website: user.website,
          whatsapp: user.whatsapp,
          x: user.x,
        }}
      />
    </main>
  );
}
