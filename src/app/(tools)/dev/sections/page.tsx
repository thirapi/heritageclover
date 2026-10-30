import Link from "next/link";
import { sectionRegistry, type SectionGroup } from "@/sections/registry";

const GROUPS: SectionGroup[] = ["layout", "common", "home", "about", "insight", "support"];

// Mirrors exantara-saas `/dev/sections`: every hcl-* section, previewable alone.
export default function DevSectionsIndex() {
  const ids = Object.keys(sectionRegistry).sort();
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 font-sans">
      <h1 className="mb-2 text-2xl font-semibold">Heritage Clover sections</h1>
      <p className="mb-8 text-sm text-neutral-500">
        {ids.length} sections · add <code>?canvas=1</code> to preview the static (editor canvas) state.
      </p>
      {GROUPS.map((group) => {
        const groupIds = ids.filter((id) => sectionRegistry[id].group === group);
        return (
          <section key={group} className="mb-8">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-neutral-500">
              {group} ({groupIds.length})
            </h2>
            {groupIds.length === 0 ? (
              <p className="text-sm text-neutral-400">No sections yet.</p>
            ) : (
              <ul className="grid gap-1 sm:grid-cols-2">
                {groupIds.map((id) => (
                  <li key={id}>
                    <Link className="text-blue-700 underline" href={`/dev/sections/${id}`}>
                      {id}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </main>
  );
}
