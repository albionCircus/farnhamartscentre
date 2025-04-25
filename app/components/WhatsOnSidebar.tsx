import { PrismicRichText } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { PrismicDocument } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { RichTextField } from "@prismicio/client";
import styles from "@/app/custom.module.css";


interface PageProps {
  searchParams?: Promise<{
    page?: string;
  }>;
}

const POSTS_PER_PAGE = 3;

export default async function WhatsOnSidebar(props: PageProps) {
  const searchParams = await props.searchParams || {}; // Fallback to an empty object if undefined from line 11
  const client = createClient();

  // Safely parse the page number from searchParams
  const currentPage = parseInt(searchParams.page || "1", 10);

  // Fetch the posts for the current page
  const { results: posts } = await client.getByType(
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

  return (
    <div className={`flex flex-col sm:flex-row lg:flex-col ${styles.sidebarArticles}`}>
          {posts.map((post: PrismicDocument, index: number) => (
            <PrismicNextLink document={post} key={index}>
              <article className="bg-white mb-10">
                <PrismicNextImage field={post.data.image} />
                <div className="p-3.5 border-b-1 border-l-1 border-r-1">
                  <p className="text-gray-500 border-2 border-gray-200 w-fit px-1.5 p-0.5 rounded-md mb-3 tracking-wide">
                    <cite>{post.data.category}</cite>
                  </p>
                  <h4 className="text-charcoal">{post.data.heading}</h4>
                  <p className="pt-3.5 text-gray-500">
                    <small>{new Date(post.data.original_date || Date.now()).toLocaleDateString("en-GB")}</small>
                  </p>
                  {Array.isArray(post.data.description) && (
                    <PrismicRichText field={post.data.description as RichTextField} />
                  )}
                </div>
              </article>
            </PrismicNextLink>
          ))}
    </div>
  );
}