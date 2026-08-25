import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ResourceForm } from "@/components/admin/resource-form";

export default async function EditResourcePage({ params }: { params: { id: string } }) {
  const resource = await prisma.eResource.findUnique({ where: { id: params.id } });
  if (!resource) notFound();

  return (
    <>
      <h1>Edit resource</h1>
      <ResourceForm
        initial={{
          id: resource.id,
          title: resource.title,
          description: resource.description,
          fileUrl: resource.fileUrl,
          access: resource.access,
          published: resource.published,
        }}
      />
    </>
  );
}
