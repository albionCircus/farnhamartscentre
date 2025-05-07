import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/app/components/Bounded";

/**
 * Props for `BodyContent`.
 */
export type BodyContentProps = SliceComponentProps<Content.BodyContentSlice>;

/**
 * Component for "BodyContent" Slices.
 */
const BodyContent: FC<BodyContentProps> = ({ slice }) => {
  return (
    <Bounded as='section' className="flex justify-center flex-col w-full lg:max-w-[1300px] margin0auto" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <PrismicRichText field={slice.primary.rich_text_box} />
    </Bounded>
  );
};

export default BodyContent;