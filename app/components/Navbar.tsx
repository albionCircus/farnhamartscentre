'use client'

import { useEffect, useRef, useState } from 'react'
import { SliceZone, SliceZoneLike } from '@prismicio/react'
import { Components } from './slices'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

type Props = {
  slices: SliceZoneLike
}

export default function Navbar({ slices }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const mobileRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        isOpen &&
        mobileRef.current &&
        !mobileRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen])

  return (
    <nav className="bg-white border-b px-4 py-3 relative z-50">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">MySite</span>

        {/* Mobile toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-6">
          <SliceZone slices={slices} components={Components} />
        </ul>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={mobileRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden flex flex-col gap-4 mt-4"
          >
            <ul>
              <SliceZone slices={slices} components={Components} />
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}