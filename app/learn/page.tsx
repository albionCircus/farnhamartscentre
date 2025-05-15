import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc, PrismicDocument } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import Bounded from "../components/Bounded";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("learn").catch(() => notFound());

  // Fetch the posts for the current page
  const { results: posts } = await client.getByType(
    "learn_post",
  );

  return (
  <>
    <SliceZone slices={page.data.slices} components={components} />
    <Bounded className="margin0auto w-full max-w-[1300px]">
        <div className="grid auto-rows-min sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8">
          {posts.map((post: PrismicDocument, index: number) => (
            <PrismicNextLink document={post} key={index}>
              <article className="bg-sky-100 border-b-2 border-orange-600 min-h-full w-full">
                <PrismicNextImage field={post.data.image} />
                <div className="m-5">
                  <h4 className="text-sky-950 mb-3">{post.data.heading}</h4>
                  <PrismicRichText field={post.data.excerpt} />
                </div>
              </article>
            </PrismicNextLink>
          ))}
        </div>
    </Bounded>
  </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("learn").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}