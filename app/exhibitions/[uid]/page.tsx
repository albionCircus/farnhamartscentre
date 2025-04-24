import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import Bounded from "@/app/components/Bounded";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextImage } from "@prismicio/next";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("exhibition_post", uid).catch(() => notFound());

  return (
    <Bounded>
        <article className="justify-center margin0auto w-full max-w-[800px] max-w">
            <h1 className="text-charcoal">{page.data.heading}</h1>
            <PrismicNextImage field={page.data.image} className="py-3" />                
            <h4 className="text-charcoal">{page.data.description}</h4>
            <p className="my-3">{new Date(page.data.original_date || Date.now()).toLocaleDateString("en-GB")}</p>
            <PrismicRichText field={page.data.article} />
            <p><em>{page.data.author}</em></p>
        </article>
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
  const page = await client.getByUID("exhibition_post", uid).catch(() => notFound());

  return {
    title: 'Farnham Arts Centre | Exhibition | ' + page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("exhibition_post");

  return pages.map((page) => ({ uid: page.uid }));
}