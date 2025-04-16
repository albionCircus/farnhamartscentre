'use client'

import { Content, asLink } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

type Props = SliceComponentProps<Content.NavigationMenuItemSlice>

export default function NavigationMenuItem({ slice }: Props) {
  const { label, link, child_links } = slice.primary
  const [open, setOpen] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [hasActiveChild, setHasActiveChild] = useState(false)
  const [activeChildIndexes, setActiveChildIndexes] = useState<number[]>([])
  const [hydrated, setHydrated] = useState(false)

  const pathname = usePathname()
  const menuRef = useRef<HTMLLIElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLUListElement>(null)

  const hasChildren = child_links?.length > 0
  const url = asLink(link)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useEffect(() => {
    setHydrated(true)

    if (url?.startsWith('/')) {
      try {
        const currentPath = new URL(url, window.location.origin).pathname.replace(/\/$/, '')
        setIsActive(pathname === currentPath)
      } catch {}
    }

    if (hasChildren) {
      const activeIndexes: number[] = []

      child_links.forEach((item, idx) => {
        const childUrl = asLink(item.link)
        if (childUrl?.startsWith('/')) {
          try {
            const childPath = new URL(childUrl, window.location.origin).pathname.replace(/\/$/, '')
            if (pathname === childPath) {
              activeIndexes.push(idx)
            }
          } catch {}
        }
      })

      setActiveChildIndexes(activeIndexes)
      setHasActiveChild(activeIndexes.length > 0)
    }
  }, [pathname, url, hasChildren, child_links])

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  // Escape closes menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }

    if (open) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  // Keyboard nav
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!hasChildren) return

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen((prev) => !prev)
    }

    if (e.key === 'ArrowDown' && open && dropdownRef.current) {
      const firstItem = dropdownRef.current.querySelector('a')
      if (firstItem) {
        e.preventDefault()
        ;(firstItem as HTMLElement).focus()
      }
    }
  }

  const handleLinkClick = () => {
    if (isMobile) setOpen(false)
  }

  return (
    <li
      ref={menuRef}
      className="relative"
      onMouseEnter={() => !isMobile && setOpen(true)}
      onMouseLeave={() => !isMobile && setOpen(false)}
    >
      <div className="flex items-center justify-between gap-1">
        <PrismicNextLink
          field={link}
          className={`block py-2 font-semibold hover:underline decoration-1 underline-offset-4 ${
            hydrated && (isActive || hasActiveChild) ? 'text-blue-600' : ''
          }`}
          onClick={(e) => {
            if (isMobile && hasChildren) {
              e.preventDefault()
              setOpen(!open)
            } else {
              handleLinkClick()
            }
          }}
          onKeyDown={handleKeyDown}
          role="button"
          aria-haspopup={hasChildren ? 'menu' : undefined}
          aria-expanded={hasChildren ? open : undefined}
        >
          {label}
        </PrismicNextLink>

        {hasChildren && (
          <motion.button
            ref={toggleRef}
            className="ml-1 inline-flex items-center justify-center p-1"
            onClick={() => isMobile && setOpen(!open)}
            aria-label="Toggle submenu"
            aria-haspopup="menu"
            aria-expanded={open}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChevronDown size={16} />
            </motion.div>
          </motion.button>
        )}
      </div>

      {hasChildren && (
        <div className="md:absolute md:left-0 md:top-full md:mt-2 w-full md:min-w-[10rem] z-20">
          <AnimatePresence>
            {open && (
              <motion.ul
                ref={dropdownRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white shadow-lg rounded-lg overflow-hidden pointer-events-auto"
                role="menu"
              >
                {child_links.map((item, idx) => (
                  <li key={idx} role="none">
                    <PrismicNextLink
                      field={item.link}
                      onClick={handleLinkClick}
                      className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 transition-colors duration-150 ${
                        hydrated && activeChildIndexes.includes(idx)
                          ? 'text-blue-600 font-semibold'
                          : ''
                      }`}
                      role="menuitem"
                      tabIndex={0}
                    >
                      {item.label}
                    </PrismicNextLink>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      )}
    </li>
  )
}
