import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `BodyContent`.
 */
export type BodyContentProps = SliceComponentProps<Content.BodyContentSlice>;

/**
 * Component for "BodyContent" Slices.
 */
const BodyContent: FC<BodyContentProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for body_content (variation: {slice.variation})
      Slices
    </section>
  );
};

export default BodyContent;
