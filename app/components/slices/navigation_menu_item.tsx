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
  const pathname = usePathname()
  const menuRef = useRef<HTMLLIElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLUListElement>(null)

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const hasChildren = child_links?.length > 0

  const url = asLink(link)

  let isActive = false
  let hasActiveChild = false

  if (typeof window !== 'undefined') {
    if (url?.startsWith('/')) {
      try {
        const currentPath = new URL(url, window.location.origin).pathname.replace(/\/$/, '')
        isActive = pathname === currentPath
      } catch {}
    }

    if (hasChildren) {
      for (const item of child_links) {
        const childUrl = asLink(item.link)
        if (childUrl?.startsWith('/')) {
          try {
            const childPath = new URL(childUrl, window.location.origin).pathname.replace(/\/$/, '')
            if (pathname === childPath) {
              hasActiveChild = true
              break
            }
          } catch {}
        }
      }
    }
  }

  // Outside click
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

  // Escape key closes
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

  // Arrow key nav
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
      <div className="flex items-center justify-between">
        <PrismicNextLink
          field={link}
          className={`block py-2 font-semibold hover:underline ${
            isActive || hasActiveChild ? 'text-blue-600' : ''
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
            className="md:hidden ml-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle submenu"
            aria-haspopup="menu"
            aria-expanded={open}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChevronDown size={18} />
            </motion.div>
          </motion.button>
        )}
      </div>

      {hasChildren && (
        <AnimatePresence>
          {open && (
            <motion.ul
              ref={dropdownRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:absolute md:top-full md:left-0 md:mt-2 bg-white shadow-lg rounded-lg md:min-w-[10rem] md:z-20 overflow-hidden"
              role="menu"
            >
              {child_links.map((item, idx) => {
                const childUrl = asLink(item.link)

                let childActive = false
                if (childUrl?.startsWith('/') && typeof window !== 'undefined') {
                  try {
                    const childPath = new URL(childUrl, window.location.origin).pathname.replace(/\/$/, '')
                    childActive = pathname === childPath
                  } catch {}
                }

                return (
                  <li key={idx} role="none">
                    <PrismicNextLink
                      field={item.link}
                      onClick={handleLinkClick}
                      className={`block px-4 py-2 whitespace-nowrap hover:bg-gray-100 focus:bg-gray-100 ${
                        childActive ? 'text-blue-600' : ''
                      }`}
                      role="menuitem"
                      tabIndex={0}
                    >
                      {item.label}
                    </PrismicNextLink>
                  </li>
                )
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      )}
    </li>
  )
}
