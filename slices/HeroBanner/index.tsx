import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Bounded from "@/app/components/Bounded";
import styles from "@/app/custom.module.css";

/**
 * Props for `HeroBanner`.
 */
export type HeroBannerProps = SliceComponentProps<Content.HeroBannerSlice>;

/**
 * Component for "HeroBanner" Slices.
 */
const HeroBanner: FC<HeroBannerProps> = ({ slice }) => {
  return (
      <Bounded className="flex justify-center">
        <PrismicNextImage field={slice.primary.image} priority />
        <div className={`absolute ${styles.transparentBox}`}>
          <PrismicRichText field={slice.primary.hero_text} />
        </div>
      </Bounded>
  );
};

export default HeroBanner;