import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/app/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import NewsletterForm from "@/app/components/NewsletterForm"

/**
 * Props for `Newsletter`.
 */
export type NewsletterProps = SliceComponentProps<Content.NewsletterSlice>;

/**
 * Component for "Newsletter" Slices.
 */
const Newsletter: FC<NewsletterProps> = ({ slice }) => {
  return (
    <Bounded as="section" data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="flex justify-center">
      <div className="flex flex-col justify-center bg-[#f8df9e] text-charcoal p-10 w-full sm:w-[420px]">
        <PrismicRichText field={slice.primary.newsletter_banner_text}/>
        <NewsletterForm />
      </div>
      <div className="hidden sm:block">
        <PrismicNextImage field={slice.primary.newsletter_banner_hero} className="h-full object-cover"/>
      </div>
    </Bounded>
  );
};

export default Newsletter;