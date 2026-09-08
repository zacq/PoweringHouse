import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { EventForm } from "@/components/admin/event-form";

function toLocalInputValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const event = await prisma.event.findUnique({ where: { id: params.id } });
  if (!event) notFound();

  return (
    <>
      <h1>Edit event</h1>
      <EventForm
        initial={{
          id: event.id,
          title: event.title,
          description: event.description ?? "",
          startsAt: toLocalInputValue(event.startsAt),
          location: event.location ?? "",
          link: event.link ?? "",
          published: event.published,
        }}
      />
    </>
  );
}
