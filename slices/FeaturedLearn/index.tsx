import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import SixLearnPosts from "@/app/components/FeaturedLearn";
import Bounded from "@/app/components/Bounded";

/**
 * Props for `FeaturedLearn`.
 */
export type FeaturedLearnProps =
  SliceComponentProps<Content.FeaturedLearnSlice>;

/**
 * Component for "FeaturedLearn" Slices.
 */
const FeaturedLearn: FC<FeaturedLearnProps> = ({ slice }) => {
  return (
    <Bounded as="section" data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="text-charcoal w-full bg-amber-200">
      <div className="text-center mb-4">
        <PrismicRichText field={slice.primary.heading} />
      </div>
      <SixLearnPosts />
    </Bounded>
  );
};

export default FeaturedLearn;