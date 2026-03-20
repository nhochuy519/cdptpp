'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/ui/ProductCard'
import { products, formatPrice } from '@/lib/data'

const initialCart = [
  { ...products[0], qty: 1, size: 'M', color: '#1a1a2e' },
  { ...products[1], qty: 2, size: 'S', color: '#c4a882' },
  { ...products[3], qty: 1, size: 'One Size', color: '#fbf9f8' },
]

export default function CartPage() {
  const [cart, setCart] = useState(initialCart)
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  const updateQty = (id: number, delta: number) =>
    setCart(prev => prev.map(item => item.id === id
      ? { ...item, qty: Math.max(1, item.qty + delta) }
      : item
    ))
  const removeItem = (id: number) => setCart(prev => prev.filter(item => item.id !== id))

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const shipping = subtotal >= 500000 ? 0 : 35000
  const discount = couponApplied ? subtotal * 0.1 : 0
  const total = subtotal + shipping - discount

  return (
    <>
      <Navbar />
      <main className="bg-surface min-h-screen">
        {/* Header */}
        <div className="bg-surface-low">
          <div className="container mx-auto px-8 py-10">
            <h1 className="font-display font-black text-3xl text-[#1a1a2e] tracking-tight mb-1">
              Giỏ hàng của bạn
            </h1>
            <p className="text-on-surface-muted text-sm font-body">{cart.length} sản phẩm</p>
          </div>
        </div>

        <div className="container mx-auto px-8 py-12">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">🛒</div>
              <h2 className="font-display font-bold text-2xl text-[#1a1a2e] mb-3">Giỏ hàng trống</h2>
              <p className="text-on-surface-muted font-body mb-8">Hãy thêm sản phẩm bạn yêu thích vào giỏ hàng</p>
              <Link href="/shop" className="btn-primary">Tiếp tục mua sắm</Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="bg-surface-lowest p-5 rounded-btn flex gap-5">
                    <div className="relative w-24 h-28 flex-shrink-0 overflow-hidden rounded-btn bg-surface-low">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <Link href={`/product/${item.slug}`} className="no-underline">
                          <h3 className="font-display font-semibold text-sm text-[#1a1a2e] hover:text-primary transition-colors leading-snug">
                            {item.name}
                          </h3>
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-on-surface-muted hover:text-primary transition-colors bg-transparent border-none cursor-pointer ml-2 flex-shrink-0"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>
                      </div>

                      <div className="flex gap-3 mt-1 mb-3">
                        <span className="text-xs font-body text-on-surface-muted">Size: <strong>{item.size}</strong></span>
                        <span className="flex items-center gap-1 text-xs font-body text-on-surface-muted">
                          Màu:
                          <span className="w-3 h-3 rounded-full border border-outline-variant/40 inline-block ml-1" style={{ backgroundColor: item.color }} />
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-outline-variant/40 rounded-btn overflow-hidden">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center bg-surface-low hover:bg-surface-mid transition-colors border-none cursor-pointer font-bold"
                          >−</button>
                          <span className="w-10 h-8 flex items-center justify-center font-display font-bold text-sm bg-surface-lowest">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center bg-surface-low hover:bg-surface-mid transition-colors border-none cursor-pointer font-bold"
                          >+</button>
                        </div>
                        <div className="text-right">
                          <p className="font-display font-bold text-sm text-[#1a1a2e]">
                            {formatPrice(item.price * item.qty)}
                          </p>
                          {item.qty > 1 && (
                            <p className="text-xs text-on-surface-muted font-body">{formatPrice(item.price)} / cái</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between pt-2">
                  <Link href="/shop" className="btn-ghost text-sm">
                    ← Tiếp tục mua sắm
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-surface-lowest rounded-btn p-6 sticky top-24">
                  <h2 className="font-display font-bold text-lg text-[#1a1a2e] mb-6">Tóm tắt đơn hàng</h2>

                  {/* Coupon */}
                  <div className="mb-5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={coupon}
                        onChange={e => setCoupon(e.target.value)}
                        placeholder="Mã giảm giá..."
                        className="input-field flex-1 py-2.5 text-sm"
                      />
                      <button
                        onClick={() => setCouponApplied(coupon.length > 0)}
                        className="px-4 py-2.5 bg-[#1a1a2e] text-white text-sm font-display font-semibold rounded-btn hover:bg-primary transition-colors cursor-pointer border-none"
                      >
                        Áp dụng
                      </button>
                    </div>
                    {couponApplied && (
                      <p className="text-green-600 text-xs mt-2 font-body">✓ Đã áp dụng mã giảm giá 10%</p>
                    )}
                  </div>

                  {/* Costs */}
                  <div className="space-y-3 pb-5 border-b border-surface-mid">
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-on-surface-muted">Tạm tính</span>
                      <span className="font-semibold text-on-surface">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-on-surface-muted">Phí vận chuyển</span>
                      <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : 'text-on-surface'}`}>
                        {shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}
                      </span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-sm font-body">
                        <span className="text-on-surface-muted">Giảm giá</span>
                        <span className="font-semibold text-primary">-{formatPrice(discount)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center py-4">
                    <span className="font-display font-bold text-base text-[#1a1a2e]">Tổng cộng</span>
                    <span className="font-display font-black text-xl text-[#1a1a2e]">{formatPrice(total)}</span>
                  </div>

                  <Link href="/checkout" className="btn-primary w-full justify-center py-4 block text-center no-underline">
                    Tiến hành thanh toán
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>

                  <div className="flex items-center justify-center gap-2 mt-4">
                    {['VISA', 'MC', 'MoMo', 'Zalo', 'COD'].map(p => (
                      <span key={p} className="px-1.5 py-0.5 bg-surface-low rounded text-xs text-on-surface-muted font-bold font-display">{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Upsell */}
          <div className="mt-16">
            <h2 className="font-display font-bold text-xl text-[#1a1a2e] mb-6 tracking-tight">Bạn có thể thích</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {products.slice(4, 8).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
