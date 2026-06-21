'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Home,
  History,
  FileText,
  MoreHorizontal,
  Users,
  Calendar,
  Receipt,
  Newspaper,
  Phone,
  Settings,
  X,
  ChevronRight,
  Clock,
  CheckSquare,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface NavItem {
  name: string
  href?: string
  icon: any
  items?: NavItem[]
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Cases', href: '/cases', icon: FileText },
  { name: 'Appointments', href: '/appointments', icon: Calendar },
  { name: 'Invoices', href: '/invoices', icon: Receipt },
  { name: 'News', href: '/news', icon: Newspaper },
  { name: 'Contact', href: '/contact', icon: Phone },
  {
    name: 'More Tools',
    icon: MoreHorizontal,
    items: [
      { name: 'Documents', href: '/more-tools/documents', icon: FileText },
      { name: 'Templates', href: '/more-tools/templates', icon: FileText },
      { name: 'Timer', href: '/more-tools/timer', icon: Clock },
      { name: 'Tasks', href: '/more-tools/tasks', icon: CheckSquare },
      { name: 'WhatsApp Notes', href: '/more-tools/whatsapp', icon: MessageCircle },
    ],
  },
  { name: 'Settings', href: '/settings', icon: Settings },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  const toggleMenu = (name: string) => {
    setExpandedMenus((prev) =>
      prev.includes(name) ? prev.filter((m) => m !== name) : [...prev, name]
    )
  }

  const renderNavItem = (item: NavItem, depth = 0) => {
    const isActive = pathname === item.href
    const isExpanded = expandedMenus.includes(item.name)
    const hasSubmenu = item.items && item.items.length > 0

    if (hasSubmenu) {
      return (
        <div key={item.name}>
          <button
            onClick={() => toggleMenu(item.name)}
            className={cn(
              'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              'text-gray-400 hover:bg-[#222] hover:text-white'
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5" />
              {item.name}
            </div>
            <ChevronRight
              className={cn(
                'h-4 w-4 transition-transform',
                isExpanded && 'rotate-90'
              )}
            />
          </button>
          {isExpanded && (
            <div className="ml-4 space-y-1 border-l border-[#222] py-1 pl-3">
              {item.items.map((subitem) => (
                <Link
                  key={subitem.name}
                  href={subitem.href || '#'}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                    pathname === subitem.href
                      ? 'bg-green-500 text-white'
                      : 'text-gray-400 hover:bg-[#222] hover:text-white'
                  )}
                >
                  <subitem.icon className="h-4 w-4" />
                  {subitem.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      )
    }

    return (
      <Link
        key={item.name}
        href={item.href || '#'}
        onClick={onClose}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
          isActive
            ? 'bg-green-500 text-white'
            : 'text-gray-400 hover:bg-[#222] hover:text-white'
        )}
      >
        <item.icon className="h-5 w-5" />
        {item.name}
      </Link>
    )
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen w-60 border-r border-[#222] bg-[#111] transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-auto items-start justify-between border-b border-[#222] px-6 py-4">
            <div className="flex items-start gap-3">
              <Image
                src="/gabs-logo.png"
                alt="Gabs Legal Tech"
                width={40}
                height={40}
                className="rounded"
              />
              <div className="flex flex-col gap-1">
                <h1 className="text-lg font-bold text-green-500">Gabs Legal Tech</h1>
                <div className="flex items-center gap-1">
                  <span className="text-sm">🇧🇼</span>
                  <p className="text-xs text-gray-400">Built in Botswana</p>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
            {navigation.map((item) => renderNavItem(item))}
          </nav>

          <div className="border-t border-[#222] p-4">
            <div className="rounded-lg bg-[#1a1a1a] p-4">
              <p className="text-xs text-gray-500">
                Professional legal case & client management for Botswana law firms
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
