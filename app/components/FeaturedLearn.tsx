import { createClient } from "@/prismicio";
import { PrismicDocument } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

interface PageProps {
  searchParams?: Promise<{
    page?: string;
  }>;
}

const POSTS_PER_PAGE = 3;

export default async function SixLearnPosts(props: PageProps) {
  const searchParams = await props.searchParams || {}; // Fallback to an empty object if undefined from line 11
  const client = createClient();

  // Safely parse the page number from searchParams
  const currentPage = parseInt(searchParams.page || "1", 10);

  // Fetch the posts for the current page
  const { results: posts } = await client.getByType(
    "learn_post",
    {
      orderings: [
        { field: "my.learn_post.original_date", direction: "desc" },
      ],
      pageSize: POSTS_PER_PAGE,
      page: currentPage,
    },
  );

  // If original_date is present, override the sorting manually
  posts.sort((a, b) => {
    const dateA = a.data.original_date || a.first_publication_date;
    const dateB = b.data.original_date || b.first_publication_date;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  return (
    <div className="grid auto-rows-min sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8 w-full margin0auto max-w-[1250px]">
          {posts.map((post: PrismicDocument, index: number) => (
            <PrismicNextLink document={post} key={index}>
              <article className="bg-white">
                <PrismicNextImage field={post.data.image} />
                <div className="p-3.5 border-b-1 border-l-1 border-r-1 sm:min-h-[200px]">
                  <h4 className="text-charcoal mb-2">{post.data.heading}</h4>
                  <p>{post.data.description}</p>
                </div>
              </article>
            </PrismicNextLink>
          ))}
    </div>
  );
}