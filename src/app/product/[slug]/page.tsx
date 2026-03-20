'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/ui/ProductCard'
import { products, formatPrice } from '@/lib/data'

export default function ProductPage() {
  const product = products[0] // demo with first product
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [mainImage, setMainImage] = useState(product.image)

  const tabs = ['description', 'specs', 'reviews', 'qa']
  const tabLabels: Record<string, string> = {
    description: 'Mô tả', specs: 'Thông số', reviews: `Đánh giá (${product.reviews})`, qa: 'Hỏi & Đáp'
  }

  const images = [product.image, product.imageHover, product.image, product.imageHover]

  return (
    <>
      <Navbar />
      <main className="bg-surface min-h-screen">
        {/* Breadcrumb */}
        <div className="container mx-auto px-8 py-5">
          <p className="text-on-surface-muted text-sm font-body">
            <Link href="/" className="hover:text-primary no-underline text-on-surface-muted">Trang chủ</Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-primary no-underline text-on-surface-muted">Cửa hàng</Link>
            <span className="mx-2">/</span>
            <span className="text-on-surface">{product.name}</span>
          </p>
        </div>

        {/* Product Section */}
        <section className="container mx-auto px-8 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16">

            {/* Gallery */}
            <div className="flex gap-4">
              {/* Thumbnails */}
              <div className="flex flex-col gap-3 w-20 flex-shrink-0">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImage(img)}
                    className={`relative aspect-square overflow-hidden rounded-btn border-2 transition-all cursor-pointer bg-transparent p-0 ${
                      mainImage === img ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="relative flex-1 overflow-hidden rounded-btn bg-surface-low" style={{ aspectRatio: '3/4' }}>
                <Image src={mainImage} alt={product.name} fill className="object-cover transition-all duration-500" />
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4">
                    <span className="badge-sale text-sm px-3 py-1">-{product.discount}%</span>
                  </div>
                )}
              </div>
            </div>

            {/* Info Panel */}
            <div className="py-2">
              <div className="flex items-center gap-3 mb-3">
                <span className="section-label">MAISON.</span>
                <span className="text-on-surface-muted text-xs font-body">SKU: MSN-{product.id.toString().padStart(4, '0')}</span>
              </div>

              <h1 className="font-display font-black text-[#1a1a2e] mb-4 leading-tight" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.02em' }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="16" height="16" viewBox="0 0 24 24"
                      fill={s <= Math.round(product.rating) ? '#ab2e00' : 'none'}
                      stroke="#ab2e00" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="font-display font-semibold text-sm text-on-surface">{product.rating}</span>
                <span className="text-on-surface-muted text-sm font-body">({product.reviews} đánh giá)</span>
                <span className="text-green-600 text-sm font-body font-medium">✓ Còn hàng</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-surface-mid">
                <span className="font-display font-black text-3xl text-[#1a1a2e]">
                  {formatPrice(product.price)}
                </span>
                {product.discount > 0 && (
                  <span className="font-body text-lg text-on-surface-muted line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Color */}
              <div className="mb-6">
                <p className="font-display font-semibold text-sm text-[#1a1a2e] mb-3 uppercase tracking-wider">
                  Màu sắc: <span className="text-primary font-bold">{selectedColor}</span>
                </p>
                <div className="flex gap-3">
                  {product.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(c)}
                      className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                        selectedColor === c ? 'border-primary scale-110' : 'border-outline-variant/40'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-display font-semibold text-sm text-[#1a1a2e] uppercase tracking-wider">Kích cỡ</p>
                  <button className="btn-ghost text-xs">Hướng dẫn chọn size →</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-[44px] px-3 py-2 text-sm font-display font-semibold rounded-btn border transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'bg-[#1a1a2e] text-white border-[#1a1a2e]'
                          : 'bg-surface-lowest text-on-surface border-outline-variant/40 hover:border-[#1a1a2e]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <p className="font-display font-semibold text-sm text-[#1a1a2e] uppercase tracking-wider">Số lượng</p>
                <div className="flex items-center border border-outline-variant/40 rounded-btn overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center bg-surface-low hover:bg-surface-mid transition-colors border-none cursor-pointer font-bold text-lg"
                  >−</button>
                  <span className="w-12 h-10 flex items-center justify-center font-display font-bold text-sm bg-surface-lowest">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center bg-surface-low hover:bg-surface-mid transition-colors border-none cursor-pointer font-bold text-lg"
                  >+</button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 mb-6">
                <button className="btn-primary flex-1 justify-center py-4 text-base">
                  Thêm vào giỏ hàng
                </button>
                <button
                  className="flex-1 py-4 font-display font-bold text-base border-2 border-[#1a1a2e] text-[#1a1a2e] rounded-btn hover:bg-[#1a1a2e] hover:text-white transition-all cursor-pointer bg-transparent"
                >
                  Mua ngay
                </button>
              </div>

              {/* Secondary actions */}
              <div className="flex gap-6 mb-8">
                <button className="flex items-center gap-2 text-sm text-on-surface-muted hover:text-primary transition-colors bg-transparent border-none cursor-pointer font-body">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  Yêu thích
                </button>
                <button className="flex items-center gap-2 text-sm text-on-surface-muted hover:text-primary transition-colors bg-transparent border-none cursor-pointer font-body">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                  Chia sẻ
                </button>
              </div>

              {/* Shipping Info */}
              <div className="bg-surface-low rounded-btn p-5 space-y-3">
                {[
                  { icon: '🚚', title: 'Giao hàng miễn phí', sub: 'Cho đơn từ 500.000₫' },
                  { icon: '🔄', title: 'Đổi trả 30 ngày', sub: 'Không cần lý do' },
                  { icon: '🛡️', title: 'Hàng chính hãng', sub: 'Cam kết 100%' },
                ].map(item => (
                  <div key={item.title} className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <p className="font-display font-semibold text-sm text-[#1a1a2e]">{item.title}</p>
                      <p className="text-on-surface-muted text-xs font-body">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="bg-surface-low">
          <div className="container mx-auto px-8">
            <div className="flex border-b border-surface-mid">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-display font-semibold text-sm transition-all border-none cursor-pointer bg-transparent border-b-2 -mb-px ${
                    activeTab === tab
                      ? 'text-primary border-primary'
                      : 'text-on-surface-muted border-transparent hover:text-on-surface'
                  }`}
                >
                  {tabLabels[tab]}
                </button>
              ))}
            </div>
            <div className="py-8 max-w-3xl">
              {activeTab === 'description' && (
                <div className="space-y-4 text-on-surface leading-relaxed font-body">
                  <p>Áo Blazer Oversize cao cấp được làm từ vải wool blend 70% wool, 30% polyester cao cấp, mang lại cảm giác mềm mại, thoáng khí và giữ form tốt suốt cả ngày.</p>
                  <p>Thiết kế oversized hiện đại với đường vai rộng tự nhiên, tạo silhouette thanh lịch và phong cách. Phù hợp cho cả phong cách casual lẫn business casual.</p>
                  <ul className="list-none space-y-2 pl-0">
                    {['Chất liệu: 70% Wool, 30% Polyester', 'Kiểu dáng: Oversize, dáng suông', 'Cổ áo: Cổ vest lapel', 'Túi: 2 túi hộp phía trước', 'Xuất xứ: Việt Nam'].map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="space-y-5">
                  {[1,2,3].map(i => (
                    <div key={i} className="bg-surface-lowest p-5 rounded-btn">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 bg-surface-mid rounded-full flex items-center justify-center font-display font-bold text-sm text-[#1a1a2e]">
                          {String.fromCharCode(65 + i)}
                        </div>
                        <div>
                          <p className="font-display font-semibold text-sm text-[#1a1a2e]">Khách hàng {i}</p>
                          <p className="text-xs text-on-surface-muted font-body">Đã mua hàng · 1/03/2026</p>
                        </div>
                        <div className="ml-auto flex gap-0.5">
                          {[1,2,3,4,5].map(s => (
                            <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="#ab2e00" stroke="none">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-on-surface leading-relaxed font-body">
                        Sản phẩm tuyệt vời, chất vải mềm mịn, form áo chuẩn như hình. Giao hàng nhanh, đóng gói cẩn thận. Rất hài lòng!
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="section-gap">
          <div className="container mx-auto px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="section-label mb-2">Gợi ý</p>
                <h2 className="font-display font-bold text-[#1a1a2e] text-2xl tracking-tight">Sản phẩm liên quan</h2>
              </div>
              <Link href="/shop" className="btn-ghost text-sm">Xem thêm →</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
