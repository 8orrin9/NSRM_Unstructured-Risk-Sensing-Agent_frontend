'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  Newspaper, Globe2, FileText, Settings, ChevronDown,
  Sparkles, KeyRound, Tag, Boxes, Package, MapPin, Factory,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

type MenuLink = { href: string; label: string; desc: string; icon: typeof Newspaper }
type MenuSection = { label: string; items: MenuLink[]; cols?: 1 | 2 }

type NavItem =
  | { href: string; label: string; icon: typeof Newspaper }
  | { label: string; icon: typeof Newspaper; sections: MenuSection[] }

const NAV: NavItem[] = [
  { href: '/', label: 'Daily News', icon: Newspaper },
  { href: '/explorer', label: 'Explorer MAP', icon: Globe2 },
  { href: '/reporting', label: 'Reporting', icon: FileText },
  {
    label: '관리자',
    icon: Settings,
    sections: [
      {
        label: '관리 도구',
        items: [
          { href: '/admin/insights', label: 'AI 핵심 인사이트', desc: '그룹 노출 관리', icon: Sparkles },
          { href: '/admin/keywords', label: '뉴스 수집 키워드', desc: '수집 키워드 조회·편집', icon: KeyRound },
          { href: '/admin/tags', label: '태그 관리', desc: '리스크 태그 관리', icon: Tag },
        ],
      },
      {
        label: '공급망 Database',
        cols: 2,
        items: [
          { href: '/admin/supply-chain?tab=raw-materials', label: '원자재', desc: 'RAW_MATERIAL_MASTER', icon: Boxes },
          { href: '/admin/supply-chain?tab=materials', label: '자재', desc: 'MATERIAL_MASTER', icon: Package },
          { href: '/admin/supply-chain?tab=sites', label: '생산지', desc: 'SITE_MASTER', icon: MapPin },
          { href: '/admin/supply-chain?tab=suppliers', label: '협력사', desc: 'SUPPLIER_MASTER', icon: Factory },
        ],
      },
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

              // 하위 메뉴가 있는 항목 → 섹션형 메가패널 드롭다운
              if ('sections' in item) {
                const allItems = item.sections.flatMap((s) => s.items)
                const active = allItems.some((s) => pathname.startsWith(s.href.split('?')[0]))
                return (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger className={pillClass(active)}>
                      <Icon className="size-3.5" />
                      <span className="hidden sm:block">{item.label}</span>
                      <ChevronDown className="size-3" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      sideOffset={8}
                      className="w-[min(92vw,560px)] rounded-2xl p-2 shadow-xl"
                    >
                      {item.sections.map((section, si) => (
                        <div key={section.label}>
                          {si > 0 && <DropdownMenuSeparator className="my-1.5" />}
                          <DropdownMenuGroup>
                            <DropdownMenuLabel className="px-2 pt-1.5 pb-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                              {section.label}
                            </DropdownMenuLabel>
                            <div className={cn('grid gap-0.5', section.cols === 2 && 'grid-cols-2')}>
                              {section.items.map((sub) => {
                                const SubIcon = sub.icon
                                const subActive = pathname.startsWith(sub.href.split('?')[0])
                                return (
                                  <DropdownMenuItem
                                    key={sub.href}
                                    render={<Link href={sub.href} />}
                                    className={cn(
                                      'items-start gap-3 rounded-xl px-2.5 py-2',
                                      subActive && 'bg-accent text-accent-foreground',
                                    )}
                                  >
                                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-muted text-foreground/70">
                                      <SubIcon className="size-4" />
                                    </span>
                                    <span className="flex flex-col gap-0.5 overflow-hidden">
                                      <span className="text-sm font-bold text-foreground">{sub.label}</span>
                                      <span className="truncate text-xs text-muted-foreground">{sub.desc}</span>
                                    </span>
                                  </DropdownMenuItem>
                                )
                              })}
                            </div>
                          </DropdownMenuGroup>
                        </div>
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
