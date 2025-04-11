'use client'

import { useEffect, useRef, useState } from 'react'
import { SliceZone, SliceZoneLike } from '@prismicio/react'
import { Components } from './slices'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Bounded from './Bounded'
import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'
import { ImageField } from '@prismicio/client'
import styles from "@/app/custom.module.css"

type Props = {
  slices: SliceZoneLike
  logo: ImageField | null
}

export default function Navbar({ slices, logo }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const mobileRef = useRef<HTMLDivElement>(null)

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
    <Bounded as="nav" className="w-full lg:max-w-[1300px] margin0auto">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          {logo ? (
            <PrismicNextImage field={logo} className={`${styles.navLogo}`} priority />
          ) : (
            <span className="text-xl font-bold">Logo</span>
          )}
        </Link>

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
    </Bounded>
  )
}
