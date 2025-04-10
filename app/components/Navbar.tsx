'use client'

import { SliceZone, SliceZoneLike } from '@prismicio/react'
import { Components } from './slices/index'

type Props = {
    slices: SliceZoneLike
}
  
  export default function Navbar({ slices }: Props) {
    return (
      <nav className="bg-white border-b px-4 py-3">
        <ul className="flex gap-6 relative">
          <SliceZone slices={slices} components={Components} />
        </ul>
      </nav>
    )
  }
