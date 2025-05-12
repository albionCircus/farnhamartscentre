"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/app/components/Bounded";

import dynamic from "next/dynamic";
const LeafletMap = dynamic(() => import("@/app/components/Map"), { ssr: false });

/**
 * Props for `OfficeLocationMap`.
 */
export type OfficeLocationMapProps =
  SliceComponentProps<Content.OfficeLocationMapSlice>;

/**
 * Component for "OfficeLocationMap" Slices.
 */
const OfficeLocationMap: FC<OfficeLocationMapProps> = ({ slice }) => {
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="w-full lg:max-w-[1300px] margin0auto">
      <div className="flex flex-col-reverse sm:flex-row">
        <div className="w-full sm:w-8/12">
          <LeafletMap />
        </div>
        <div className="bg-[#f8df9e] p-5 w-full sm:w-4/12">
          <PrismicRichText field={slice.primary.location_details} />
        </div>
      </div>
    </Bounded>
  );
};

export default OfficeLocationMap;
