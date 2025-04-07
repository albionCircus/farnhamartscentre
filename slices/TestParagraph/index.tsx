import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TestParagraph`.
 */
export type TestParagraphProps =
  SliceComponentProps<Content.TestParagraphSlice>;

/**
 * Component for "TestParagraph" Slices.
 */
const TestParagraph: FC<TestParagraphProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for test_paragraph (variation: {slice.variation})
      Slices
    </section>
  );
};

export default TestParagraph;
