import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicNextLink } from '@prismicio/next'

// Use the correct slice type from generated types
type NavigationMenuItemProps = SliceComponentProps<Content.NavigationMenuItemSlice>

export default function NavigationMenuItem({ slice }: NavigationMenuItemProps) {
  const { label, link, child_links } = slice.primary

  return (
    <li className="group relative">
      <PrismicNextLink field={link} className="hover:underline font-semibold">
        {label}
      </PrismicNextLink>
      {child_links?.length > 0 && (
        <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg hidden group-hover:block z-10 min-w-[10rem]">
          {child_links.map((item, idx) => (
            <li key={idx}>
              <PrismicNextLink field={item.link} className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap">
                {item.label}
              </PrismicNextLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}