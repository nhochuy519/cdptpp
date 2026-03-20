'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/ui/ProductCard'
import { products } from '@/lib/data'

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const colors = [
  { label: 'Đen', value: '#1a1a2e' },
  { label: 'Trắng', value: '#fbf9f8' },
  { label: 'Nâu', value: '#8b7355' },
  { label: 'Be', value: '#c4a882' },
  { label: 'Đỏ', value: '#ab2e00' },
]
const sortOptions = ['Mới nhất', 'Giá tăng dần', 'Giá giảm dần', 'Bán chạy nhất', 'Đánh giá cao']

export default function ShopPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 5000000])
  const [sortBy, setSortBy] = useState('Mới nhất')
  const [inStockOnly, setInStockOnly] = useState(false)

  const toggleSize = (s: string) =>
    setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  const toggleColor = (c: string) =>
    setSelectedColors(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])

  return (
    <>
      <Navbar />
      <main className="bg-surface min-h-screen">
        {/* Page Header */}
        <div className="bg-surface-low border-b border-surface-mid">
          <div className="container mx-auto px-8 py-10">
            <p className="text-on-surface-muted text-sm font-body mb-1">
              <span className="hover:text-primary cursor-pointer">Trang chủ</span>
              <span className="mx-2">/</span>
              <span>Cửa hàng</span>
            </p>
            <h1 className="font-display font-black text-3xl text-[#1a1a2e] tracking-tight">
              Tất cả sản phẩm
            </h1>
          </div>
        </div>

        <div className="container mx-auto px-8 py-10 flex gap-8">
          {/* Sidebar */}
          <aside className={`flex-shrink-0 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
            <div className="space-y-8">

              {/* Price Range */}
              <div>
                <h3 className="font-display font-semibold text-sm text-[#1a1a2e] mb-4 uppercase tracking-wider">
                  Mức giá
                </h3>
                <input
                  type="range"
                  min={0} max={5000000} step={100000}
                  value={priceRange[1]}
                  onChange={e => setPriceRange([0, Number(e.target.value)])}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-on-surface-muted font-body mt-2">
                  <span>0₫</span>
                  <span>{(priceRange[1] / 1000000).toFixed(1)}tr₫</span>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="font-display font-semibold text-sm text-[#1a1a2e] mb-4 uppercase tracking-wider">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => toggleSize(s)}
                      className={`px-3 py-1.5 text-xs font-display font-semibold rounded-btn border transition-all cursor-pointer ${
                        selectedSizes.includes(s)
                          ? 'bg-primary text-white border-primary'
                          : 'bg-surface-lowest text-on-surface border-outline-variant/40 hover:border-primary'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <h3 className="font-display font-semibold text-sm text-[#1a1a2e] mb-4 uppercase tracking-wider">Màu sắc</h3>
                <div className="flex flex-wrap gap-3">
                  {colors.map(c => (
                    <button
                      key={c.value}
                      onClick={() => toggleColor(c.value)}
                      title={c.label}
                      className={`w-7 h-7 rounded-full transition-all cursor-pointer border-2 ${
                        selectedColors.includes(c.value) ? 'border-primary scale-110' : 'border-outline-variant/40'
                      }`}
                      style={{ backgroundColor: c.value }}
                    />
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="font-display font-semibold text-sm text-[#1a1a2e] mb-4 uppercase tracking-wider">Đánh giá</h3>
                <div className="space-y-2">
                  {[5, 4, 3].map(r => (
                    <label key={r} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="accent-primary rounded" />
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(s => (
                          <svg key={s} width="12" height="12" viewBox="0 0 24 24"
                            fill={s <= r ? '#ab2e00' : '#efeded'} stroke="none">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-on-surface-muted font-body">trở lên</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* In Stock */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => setInStockOnly(!inStockOnly)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${inStockOnly ? 'bg-primary' : 'bg-surface-mid'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${inStockOnly ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                  <span className="text-sm font-body text-on-surface">Còn hàng</span>
                </label>
              </div>

              {/* Clear filters */}
              <button className="btn-ghost text-sm w-full text-left">
                Xoá bộ lọc
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-surface-mid">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="flex items-center gap-2 text-sm font-display font-medium text-on-surface bg-transparent border-none cursor-pointer hover:text-primary transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="15" y2="12" /><line x1="3" y1="18" x2="9" y2="18" />
                  </svg>
                  Bộ lọc
                </button>
                <span className="text-on-surface-muted text-sm font-body">
                  {products.length} sản phẩm
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-on-surface-muted font-body">Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="input-field w-auto py-2 text-sm cursor-pointer"
                >
                  {sortOptions.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-12">
              {[1, 2, 3, 4, 5].map(page => (
                <button
                  key={page}
                  className={`w-10 h-10 rounded-btn font-display font-semibold text-sm transition-all cursor-pointer border-none ${
                    page === 1
                      ? 'bg-primary text-white'
                      : 'bg-surface-lowest text-on-surface hover:bg-primary hover:text-white'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="w-10 h-10 rounded-btn font-display font-semibold text-sm bg-surface-lowest text-on-surface hover:bg-primary hover:text-white transition-all cursor-pointer border-none">
                →
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
