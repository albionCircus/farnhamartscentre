'use client'

import { useEffect, useRef, useState } from 'react'
import { SliceZone, SliceZoneLike } from '@prismicio/react'
import { Components } from './slices'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
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
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        mobileRef.current &&
        !mobileRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a') as HTMLAnchorElement | null

      if (
        link &&
        mobileRef.current?.contains(link) &&
        link.getAttribute('href')?.startsWith('/')
      ) {
        setTimeout(() => {
          setIsOpen(false)
        }, 100)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('click', handleLinkClick)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('click', handleLinkClick)
    }
  }, [isOpen])

  return (
    <nav className="relative px-4 py-6 md:pt-8 md:pb-0 md:px-6 w-full lg:max-w-[1300px] margin0auto">
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
    </nav>
  )
}