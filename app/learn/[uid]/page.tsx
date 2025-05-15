import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "@/app/components/Bounded";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("learn_post", uid).catch(() => notFound());

  const { data } = page; // Added myself

  return (
    <Bounded className="w-full max-w-[850px] margin0auto">
        <article>
            <h1 className="text-charcoal">{page.data.heading}</h1>
            {data.heading}
        </article>
        <SliceZone slices={page.data.slices} components={components} />;
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
  const page = await client.getByUID("learn_post", uid).catch(() => notFound());

  return {
    title: 'Farnham Arts Centre | Learn | ' + page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("learn_post");

  return pages.map((page) => ({ uid: page.uid }));
}