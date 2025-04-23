import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import FeaturedWhatsOn from "@/app/components/FeaturedWhatsOn";
import Bounded from "@/app/components/Bounded";

/**
 * Props for `WhatsOn`.
 */
export type WhatsOnProps = SliceComponentProps<Content.WhatsOnSlice>;

/**
 * Component for "WhatsOn" Slices.
 */
const WhatsOn: FC<WhatsOnProps> = ({ slice }) => {
  return (
    <Bounded as="section" data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="text-charcoal margin0auto w-full max-w-[1300px]">
      <div className="text-center mb-2">
        <PrismicRichText field={slice.primary.heading} />
      </div>
      <FeaturedWhatsOn />
    </Bounded>
  );
};

export default WhatsOn;