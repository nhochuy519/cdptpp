'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/ui/ProductCard'
import { products } from '@/lib/data'

export default function SearchPage() {
  const [query, setQuery] = useState('áo blazer')
  const results = products.filter(p =>
    p.name.toLowerCase().includes('áo') ||
    p.name.toLowerCase().includes('len')
  )

  return (
    <>
      <Navbar />
      <main className="bg-surface min-h-screen">
        {/* Search Header */}
        <div className="bg-surface-low">
          <div className="container mx-auto px-8 py-10">
            <div className="max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="input-field pr-12 text-lg py-4"
                  placeholder="Tìm kiếm sản phẩm..."
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-primary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                </button>
              </div>
              {query && (
                <p className="text-on-surface-muted text-sm font-body mt-3">
                  {results.length} kết quả cho <strong className="text-on-surface">"{query}"</strong>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-8 py-10">
          {results.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2 flex-wrap">
                  {['Tất cả', 'Áo', 'Quần', 'Phụ kiện'].map(cat => (
                    <button
                      key={cat}
                      className={`px-4 py-2 text-sm font-display font-semibold rounded-btn transition-all border-none cursor-pointer ${
                        cat === 'Tất cả'
                          ? 'text-white'
                          : 'bg-surface-lowest text-on-surface hover:bg-primary hover:text-white'
                      }`}
                      style={cat === 'Tất cả' ? { background: 'linear-gradient(135deg, #ab2e00, #cf4519)' } : {}}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <select className="input-field w-auto py-2 text-sm">
                  <option>Phù hợp nhất</option>
                  <option>Mới nhất</option>
                  <option>Giá tăng dần</option>
                </select>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {results.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-24">
              <div className="text-7xl mb-6">🔍</div>
              <h2 className="font-display font-bold text-2xl text-[#1a1a2e] mb-3">
                Không tìm thấy kết quả
              </h2>
              <p className="text-on-surface-muted font-body mb-8 max-w-md mx-auto">
                Thử tìm kiếm với từ khoá khác hoặc khám phá các danh mục sản phẩm của chúng tôi
              </p>
              <div className="flex gap-4 justify-center">
                <button className="btn-primary">Khám phá cửa hàng</button>
                <button
                  onClick={() => setQuery('')}
                  className="px-6 py-3 font-display font-semibold text-sm border-2 border-[#1a1a2e] text-[#1a1a2e] rounded-btn hover:bg-[#1a1a2e] hover:text-white transition-all cursor-pointer bg-transparent"
                >
                  Xoá tìm kiếm
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
