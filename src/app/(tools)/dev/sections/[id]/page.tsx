import { notFound } from "next/navigation";
import { LocaleProvider } from "@/lib/locale";
import { sectionRegistry } from "@/sections/registry";

export default async function DevSectionPreview({ params, searchParams }: PageProps<"/dev/sections/[id]">) {
  const { id } = await params;
  const { canvas } = await searchParams;
  const entry = sectionRegistry[id];
  if (!entry) notFound();

  const Section = entry.component;
  return (
    <LocaleProvider locale="en">
      <Section {...entry.defaults} isCanvas={canvas === "1"} />
    </LocaleProvider>
  );
}
