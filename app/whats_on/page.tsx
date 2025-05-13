import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { filter } from "@prismicio/client";
import { components } from "@/slices";
import Bounded from "../components/Bounded";
import Pagination from "../components/Pagination";
import ClientCategoryFilter from "../components/ClientCategoryFilter";
import PostGrid from "../components/PostGrid";

// in Next.js 14, searchParams is now a Promise that needs to be explicitly awaited before you can access its properties
interface PageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
  }>;
}

const POSTS_PER_PAGE = 6;

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
        { field: "my.whats_on_post.original_date", direction: "desc" },
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
        <section id="posts-section" className="min-h-[600px]">
          <ClientCategoryFilter
            allCategories={allCategories}
            selectedCategory={selectedCategory}
          />
          
          {/* New PostGrid component with smooth transitions */}
          <PostGrid posts={posts} />

          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </section>
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