import { Metadata } from "next";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicDocument } from "@prismicio/client";
import Bounded from "../components/Bounded";
import Pagination from "../components/Pagination";

import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

interface PageProps {
  searchParams?: Promise<{
    page?: string;
  }>;   
}

const POSTS_PER_PAGE = 6;

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams || {}; // Fallback to an empty object if undefined from line 11
  const client = createClient();
  const page = await client.getSingle("exhibition");

  // Safely parse the page number from searchParams
  const currentPage = parseInt(searchParams.page || "1", 10);

  // Fetch the posts for the current page
  const { results: posts, total_results_size } = await client.getByType(
    "exhibition_post",
    {
      orderings: [
        { field: "data.original_date", direction: "desc" },
        // { field: "document.last_publication_date", direction: "desc" },
        { field: "document.first_publication_date", direction: "desc" },
      ],
      pageSize: POSTS_PER_PAGE,
      page: currentPage,
    },
  );

  // If original_date is present, override the sorting manually
  posts.sort((a, b) => {
    const dateA =
      a.data.original_date ||
      // a.last_publication_date ||
      a.first_publication_date;
    const dateB =
      b.data.original_date ||
      // b.last_publication_date ||
      b.first_publication_date;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  const totalPages = Math.ceil(total_results_size / POSTS_PER_PAGE);

  return (
    <>
      <SliceZone slices={page.data.slices} components={components} />
      <Bounded className="margin0auto max-w-7xl">
        <div className="grid auto-rows-min sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8">
          {posts.map((post: PrismicDocument, index: number) => (
            <PrismicNextLink document={post} key={index}>
              <article className="bg-sky-100 min-h-full border-b-2 border-orange-600">
                <PrismicNextImage field={post.data.image} />
                <div className="m-5">
                  <p className="w-fit bg-white p-1.5 rounded-lg mb-3">{post.data.category}</p>
                  <h4 className="text-sky-950">{post.data.heading}</h4>
                  <p className="my-3">{new Date(post.data.original_date || Date.now()).toLocaleDateString("en-GB")}</p>
                  <PrismicRichText field={post.data.description} />
                </div>
              </article>
            </PrismicNextLink>
          ))}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </Bounded>
    </>
)};

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("exhibition");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}