'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { Newspaper, Globe2, FileText, ShieldAlert } from 'lucide-react'

const NAV = [
  { href: '/', label: 'Daily News', icon: Newspaper },
  { href: '/explorer', label: 'Risk Explorer', icon: Globe2 },
  { href: '/reporting', label: 'Reporting', icon: FileText },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Apple-style translucent header — pure white with ultra-thin border */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-white/90 backdrop-blur-xl dark:bg-background/90">
        <div className="mx-auto flex h-14 w-full max-w-[1600px] items-center gap-6 px-4 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <ShieldAlert className="size-4" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-foreground">
              Risk Sensing
            </span>
          </Link>

          {/* Nav — Apple-style pill tabs */}
          <nav className="flex items-center gap-0.5">
            {NAV.map((item) => {
              const active =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-150',
                    active
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <Icon className="size-3.5" />
                  <span className="hidden sm:block">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            {/* Live indicator */}
            <div className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 md:flex">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-risk-low opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-risk-low" />
              </span>
              <span className="text-xs text-muted-foreground">Live</span>
            </div>
            {/* PoC badge */}
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
              PoC
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 py-8 md:px-8">{children}</main>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto w-full max-w-[1600px] px-4 py-4 md:px-8">
          <p className="text-xs text-muted-foreground">
            Risk Sensing System · 반도체 공급망 리스크 센싱 통합 모니터링 (Proof of Concept)
          </p>
        </div>
      </footer>
    </div>
  )
}
