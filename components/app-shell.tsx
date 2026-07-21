'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { Newspaper, Globe2, FileText, Settings, ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

type NavItem =
  | { href: string; label: string; icon: typeof Newspaper }
  | { label: string; icon: typeof Newspaper; submenu: { href: string; label: string }[] }

const NAV: NavItem[] = [
  { href: '/', label: 'Daily News', icon: Newspaper },
  { href: '/explorer', label: 'Explorer MAP', icon: Globe2 },
  { href: '/reporting', label: 'Reporting', icon: FileText },
  {
    label: '관리자',
    icon: Settings,
    submenu: [
      { href: '/admin/insights', label: 'AI 핵심 인사이트' },
      { href: '/admin/keywords', label: '뉴스 수집 키워드' },
      { href: '/admin/tags', label: '태그 관리' },
    ],
  },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Apple-style translucent header — pure white with ultra-thin border */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-white/90 backdrop-blur-xl dark:bg-background/90">
        <div className="mx-auto flex h-14 w-full max-w-[1600px] items-center gap-6 px-4 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <span className="text-[15px] font-semibold tracking-tight">
              <span className="text-primary">N-SRM</span>
              <span className="text-foreground">&nbsp;비정형 리스크 센싱 에이전트</span>
            </span>
          </Link>

          {/* Nav — Apple-style pill tabs */}
          <nav className="flex items-center gap-0.5">
            {NAV.map((item) => {
              const Icon = item.icon
              const pillClass = (active: boolean) =>
                cn(
                  'flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-150',
                  active
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground',
                )

              // 하위 메뉴가 있는 항목 → 드롭다운
              if ('submenu' in item) {
                const active = item.submenu.some((s) => pathname.startsWith(s.href))
                return (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger className={pillClass(active)}>
                      <Icon className="size-3.5" />
                      <span className="hidden sm:block">{item.label}</span>
                      <ChevronDown className="size-3" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-44">
                      {item.submenu.map((sub) => (
                        <DropdownMenuItem
                          key={sub.href}
                          render={<Link href={sub.href} />}
                          className={cn(pathname.startsWith(sub.href) && 'bg-accent text-accent-foreground')}
                        >
                          {sub.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              }

              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
              return (
                <Link key={item.href} href={item.href} className={pillClass(active)}>
                  <Icon className="size-3.5" />
                  <span className="hidden sm:block">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            {/* PoC badge — pill with pulse dot */}
            <div className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 md:flex">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-risk-low opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-risk-low" />
              </span>
              <span className="text-xs text-muted-foreground">PoC</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 py-8 md:px-8">{children}</main>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto w-full max-w-[1600px] px-4 py-4 md:px-8">
          <p className="text-xs text-muted-foreground">
            NSRM 비정형 리스크 센싱 시스템 · DS 반도체 공급망 모니터링 PoC
          </p>
        </div>
      </footer>
    </div>
  )
}
