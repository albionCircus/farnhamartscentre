import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `NavigationMenuItem`.
 */
export type NavigationMenuItemProps =
  SliceComponentProps<Content.NavigationMenuItemSlice>;

/**
 * Component for "NavigationMenuItem" Slices.
 */
const NavigationMenuItem: FC<NavigationMenuItemProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for navigation_menu_item (variation:{" "}
      {slice.variation}) Slices
    </section>
  );
};

export default NavigationMenuItem;
