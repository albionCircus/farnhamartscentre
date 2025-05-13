export const revalidate = 60; // Revalidate this page every 60 seconds

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import Bounded from "@/app/components/Bounded";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextImage } from "@prismicio/next";
import WhatsOnSidebar from "@/app/components/WhatsOnSidebar";
import { Suspense } from "react";
import SidebarSkeleton from "@/app/ui/skeletons";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("whats_on_post", uid).catch(() => notFound());

  return (
    <Bounded>
      <div className="flex flex-col lg:flex-row space-between justify-between margin0auto w-full max-w-[1250px] max-w">
          <article className="w-full max-w-[800px] lg:mr-6">
            <h1 className="text-charcoal">{page.data.heading}</h1>
            <PrismicNextImage field={page.data.image} className="py-3" />                
            <h4 className="text-charcoal my-3">{page.data.description}</h4>
            <h5 className="text-charcoal">{page.data.date_range}</h5>
            {/* <p className="my-3">{new Date(page.data.original_date || Date.now()).toLocaleDateString("en-GB")}</p> */}
            <div className="mt-3">
              <PrismicRichText field={page.data.article} />
            </div>
            <p><em>Post by:  {page.data.author}</em></p>
          </article>
          <aside className="w-full max-w-[400px] sm:max-w-full lg:max-w-[400px] pt-1.5 lg:mt-0">
            <h4 className="text-charcoal mb-3">What&apos;s On</h4>
            <Suspense fallback={<SidebarSkeleton />}>
              <WhatsOnSidebar currentUid={uid} />
            </Suspense>
          </aside>
        </div>
        <SliceZone slices={page.data.slices} components={components} />
    </Bounded>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("whats_on_post", uid).catch(() => notFound());

  return {
    title: 'Farnham Arts Centre | Whats On | ' + page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("whats_on_post");

  return pages.map((page) => ({ uid: page.uid }));
}