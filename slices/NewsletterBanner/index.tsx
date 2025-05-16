import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/app/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import NewsletterForm from "@/app/components/NewsletterForm";
import clsx from "clsx";

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
        <div className={clsx("flex flex-col justify-center p-5 sm:p-10 w-full sm:w-[420px] text-charcoal", {"bg-amber-200" : slice.variation === "default", "bg-[#2bc5d1] order-2" : slice.variation === "blueImageRight"})}>
          <PrismicRichText field={slice.primary.newsletter_banner_text}/>
          <NewsletterForm />
        </div>
        <div className="hidden sm:block">
          <PrismicNextImage field={slice.primary.newsletter_banner_hero} className="w-full h-full object-cover"/>
        </div>
    </Bounded>
  );
};

export default Newsletter;