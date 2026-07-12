import {
  fieldNoteMetadata,
  fieldNoteStaticParams,
  renderFieldNotePage,
} from "@/lib/field-notes-pages";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return fieldNoteMetadata(slug);
}

export function generateStaticParams() {
  return fieldNoteStaticParams();
}

export default async function FieldNotePage({ params }: PageProps) {
  const { slug } = await params;
  return renderFieldNotePage(slug);
}
