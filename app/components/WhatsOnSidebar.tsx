import { PrismicRichText } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { PrismicDocument } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { RichTextField } from "@prismicio/client";
import styles from "@/app/custom.module.css";
import { Calendar } from "lucide-react";

interface WhatsOnSidebarProps {
  currentUid: string;
}

const POSTS_PER_PAGE = 3;

export default async function WhatsOnSidebar({ currentUid }: WhatsOnSidebarProps) {
  const client = createClient();

  const { results: posts } = await client.getByType("whats_on_post", {
    orderings: [
      { field: "data.original_date", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
    pageSize: POSTS_PER_PAGE + 1, // fetch one extra just in case the current one is included
  });

  // Sort by date
  posts.sort((a, b) => {
    const dateA = a.data.original_date || a.first_publication_date;
    const dateB = b.data.original_date || b.first_publication_date;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  // Filter out the current post
  const filteredPosts = posts.filter(post => post.uid !== currentUid).slice(0, POSTS_PER_PAGE);

  return (
    <div className={`flex flex-col sm:flex-row lg:flex-col ${styles.sidebarArticles}`}>
      {filteredPosts.map((post: PrismicDocument, index: number) => (
        <PrismicNextLink document={post} key={index}>
          <article className="bg-white mb-5">
            <PrismicNextImage field={post.data.image} />
            <div className="p-3.5 border-b-1 border-l-1 border-r-1">
              <p className="text-gray-500 border-2 border-gray-200 w-fit px-1.5 p-0.5 rounded-md mb-3 tracking-wide">
                <cite>{post.data.category}</cite>
              </p>
              <h4 className="text-charcoal">{post.data.heading}</h4>
              {/* <p className="pt-3.5 text-gray-500">
                <small>{new Date(post.data.original_date || Date.now()).toLocaleDateString("en-GB")}</small>
              </p> */}
              <div className="flex mt-4">
                <Calendar size={24} className="mr-1.5 stroke-gray-500" />
                <p>{post.data.date_range}</p>
              </div>
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
