import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { filter } from "@prismicio/client";
import { components } from "@/slices";
import { PrismicDocument } from "@prismicio/client";
import Bounded from "../components/Bounded";
import Pagination from "../components/Pagination";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import CategoryFilter from "../components/CategoryFilter";

// in Next.js 14, searchParams is now a Promise that needs to be explicitly awaited before you can access its properties.
interface PageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
  }>;
}

const POSTS_PER_PAGE = 12;

export default async function Page({ searchParams }: PageProps) {
  const client = createClient();

  const page = await client.getSingle("whats_on");

  // Await searchParams before using its properties
  const resolvedParams = await searchParams;
  const currentPage = parseInt(resolvedParams.page || "1", 10);
  const selectedCategory = resolvedParams.category || "";

  // Use `filter` for category
  const filters = selectedCategory
    ? [filter.at("my.whats_on_post.category", selectedCategory)]
    : [];

  const { results: posts, total_results_size } = await client.getByType("whats_on_post", {
    filters,
    orderings: [
      { field: "data.original_date", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
    pageSize: POSTS_PER_PAGE,
    page: currentPage,
  });

  posts.sort((a, b) => {
    const dateA = a.data.original_date || a.first_publication_date;
    const dateB = b.data.original_date || b.first_publication_date;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  const allPosts = await client.getAllByType("whats_on_post");

  const allCategories: string[] = Array.from(
    new Set(
      allPosts
        .map((post) => post.data.category)
        .filter((c): c is Exclude<typeof c, null> => c !== null)
    )
  );

  const totalPages = Math.ceil(total_results_size / POSTS_PER_PAGE);

  return (
    <>
      <SliceZone slices={page.data.slices} components={components} />
      <Bounded className="margin0auto w-full max-w-[1300px]">
        <CategoryFilter
          allCategories={allCategories}
          selectedCategory={selectedCategory}
        />

        <div className="grid auto-rows-min sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8">
          {posts.map((post: PrismicDocument, index: number) => (
            <PrismicNextLink document={post} key={index}>
              <article className="bg-sky-100 min-h-full border-b-2 border-orange-600">
                <PrismicNextImage field={post.data.image} />
                <div className="m-5">
                  <p className="w-fit bg-white p-1.5 rounded-lg mb-3">
                    {post.data.category}
                  </p>
                  <h4 className="text-sky-950">{post.data.heading}</h4>
                  <p className="pt-2">{post.data.description}</p>
                  <p className="my-3">
                    {new Date(
                      post.data.original_date || Date.now()
                    ).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </article>
            </PrismicNextLink>
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </Bounded>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("whats_on");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}