'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Cửa hàng', href: '/shop' },
  { label: 'Danh mục', href: '/shop' },
  { label: 'Sale', href: '/shop?filter=sale', accent: true },
  { label: 'Blog', href: '#' },
  { label: 'Liên hệ', href: '#' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#1a1a2e] text-white text-center py-2 text-xs tracking-wide font-body overflow-hidden">
        <div className="animate-ticker inline-flex whitespace-nowrap gap-16">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="inline-flex gap-16">
              <span>🚚 Miễn phí vận chuyển cho đơn hàng trên 500.000₫</span>
              <span>✦ Đổi trả trong 30 ngày</span>
              <span>📞 Hotline: 1800-1234</span>
              <span>✦ Hàng chính hãng 100%</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Nav */}
      <header
        className={`sticky top-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
          scrolled ? 'glass-nav shadow-float' : 'bg-surface'
        }`}
      >
        <div className="container mx-auto px-8 flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="no-underline flex-shrink-0">
            <span className="font-display font-black text-2xl tracking-display text-[#1a1a2e]">
              MAISON<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`font-display font-medium text-sm tracking-wide transition-colors duration-200 no-underline ${
                  link.accent
                    ? 'text-primary font-bold'
                    : 'text-on-surface hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-5">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden sm:flex bg-transparent border-none cursor-pointer text-on-surface hover:text-primary transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* Wishlist */}
            <button className="hidden sm:flex bg-transparent border-none cursor-pointer text-on-surface hover:text-primary transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative bg-transparent border-none cursor-pointer text-on-surface hover:text-primary transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="absolute -top-2 -right-2 w-[18px] h-[18px] bg-primary text-white rounded-full flex items-center justify-center text-[10px] font-bold font-body">
                3
              </span>
            </Link>

            {/* Account */}
            <Link href="/account" className="hidden sm:flex bg-transparent border-none cursor-pointer text-on-surface hover:text-primary transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden bg-transparent border-none cursor-pointer text-on-surface"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                {mobileOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                  : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
                }
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Search Bar Dropdown */}
      {searchOpen && (
        <div className="sticky top-[72px] z-40 bg-surface-lowest shadow-card px-8 py-4 animate-fade-in">
          <div className="container mx-auto max-w-2xl">
            <input
              autoFocus
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="input-field text-base"
            />
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 animate-fade-in">
          <div className="absolute inset-0 bg-[#1a1a2e]/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 w-72 h-full bg-surface-lowest shadow-float flex flex-col pt-6 px-6">
            <button onClick={() => setMobileOpen(false)} className="self-end mb-6 bg-transparent border-none cursor-pointer text-on-surface">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <nav className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`font-display font-semibold text-lg no-underline ${link.accent ? 'text-primary' : 'text-on-surface'}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pb-8 flex gap-4 border-t border-surface-mid pt-6">
              <Link href="/account" onClick={() => setMobileOpen(false)} className="btn-primary flex-1 justify-center text-sm py-2.5">
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
