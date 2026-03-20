'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { products, formatPrice } from '@/lib/data'

const steps = ['Giỏ hàng', 'Giao hàng', 'Thanh toán', 'Xác nhận']
const provinces = ['TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Biên Hòa']
const paymentMethods = [
  { id: 'cod', label: 'Thanh toán khi nhận hàng (COD)', icon: '🏠' },
  { id: 'bank', label: 'Chuyển khoản ngân hàng', icon: '🏦' },
  { id: 'momo', label: 'Ví MoMo', icon: '💜' },
  { id: 'zalopay', label: 'ZaloPay', icon: '💙' },
  { id: 'card', label: 'Thẻ tín dụng / Ghi nợ', icon: '💳' },
]

export default function CheckoutPage() {
  const [currentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [delivery, setDelivery] = useState('standard')

  const cartItems = products.slice(0, 3)
  const subtotal = cartItems.reduce((s, p) => s + p.price, 0)
  const shippingFee = delivery === 'express' ? 50000 : 0
  const total = subtotal + shippingFee

  return (
    <>
      <Navbar />
      <main className="bg-surface min-h-screen">
        {/* Progress Steps */}
        <div className="bg-surface-lowest shadow-card">
          <div className="container mx-auto px-8 py-5">
            <div className="flex items-center justify-center gap-0">
              {steps.map((step, i) => (
                <div key={step} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm transition-all ${
                      i <= currentStep
                        ? 'text-white'
                        : 'bg-surface-mid text-on-surface-muted'
                    }`}
                    style={i <= currentStep ? { background: 'linear-gradient(135deg, #ab2e00, #cf4519)' } : {}}
                    >
                      {i < currentStep ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      ) : i + 1}
                    </div>
                    <span className={`text-xs mt-1.5 font-body ${i <= currentStep ? 'text-primary font-semibold' : 'text-on-surface-muted'}`}>
                      {step}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-16 md:w-28 h-px mx-3 mb-5 transition-all ${i < currentStep ? 'bg-primary' : 'bg-surface-mid'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left Form */}
            <div className="lg:col-span-2 space-y-6">

              {/* Contact Info */}
              <div className="bg-surface-lowest rounded-btn p-7">
                <h2 className="font-display font-bold text-lg text-[#1a1a2e] mb-5">Thông tin liên hệ</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="section-label mb-2 block">Họ và tên *</label>
                    <input type="text" className="input-field" placeholder="Nguyễn Văn A" />
                  </div>
                  <div>
                    <label className="section-label mb-2 block">Số điện thoại *</label>
                    <input type="tel" className="input-field" placeholder="0901 234 567" />
                  </div>
                  <div className="col-span-2">
                    <label className="section-label mb-2 block">Email</label>
                    <input type="email" className="input-field" placeholder="email@example.com" />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-surface-lowest rounded-btn p-7">
                <h2 className="font-display font-bold text-lg text-[#1a1a2e] mb-5">Địa chỉ giao hàng</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="section-label mb-2 block">Tỉnh / Thành phố *</label>
                    <select className="input-field">
                      <option value="">Chọn tỉnh / thành phố</option>
                      {provinces.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="section-label mb-2 block">Quận / Huyện *</label>
                    <select className="input-field">
                      <option>Chọn quận / huyện</option>
                    </select>
                  </div>
                  <div>
                    <label className="section-label mb-2 block">Phường / Xã *</label>
                    <select className="input-field">
                      <option>Chọn phường / xã</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="section-label mb-2 block">Địa chỉ cụ thể *</label>
                    <input type="text" className="input-field" placeholder="Số nhà, tên đường..." />
                  </div>
                  <div className="col-span-2">
                    <label className="section-label mb-2 block">Ghi chú đơn hàng</label>
                    <textarea rows={3} className="input-field resize-none" placeholder="Ghi chú về đơn hàng, thời gian giao hàng..."></textarea>
                  </div>
                </div>
              </div>

              {/* Delivery Method */}
              <div className="bg-surface-lowest rounded-btn p-7">
                <h2 className="font-display font-bold text-lg text-[#1a1a2e] mb-5">Phương thức giao hàng</h2>
                <div className="space-y-3">
                  {[
                    { id: 'standard', label: 'Giao hàng tiêu chuẩn', sub: '3 – 5 ngày làm việc', price: 'Miễn phí' },
                    { id: 'express', label: 'Giao hàng nhanh', sub: '1 – 2 ngày làm việc', price: '50.000₫' },
                  ].map(d => (
                    <label
                      key={d.id}
                      className={`flex items-center gap-4 p-4 rounded-btn cursor-pointer border-2 transition-all ${
                        delivery === d.id ? 'border-primary bg-primary/5' : 'border-surface-mid hover:border-outline-variant'
                      }`}
                    >
                      <input type="radio" name="delivery" value={d.id} checked={delivery === d.id}
                        onChange={() => setDelivery(d.id)} className="accent-primary" />
                      <div className="flex-1">
                        <p className="font-display font-semibold text-sm text-[#1a1a2e]">{d.label}</p>
                        <p className="text-on-surface-muted text-xs font-body">{d.sub}</p>
                      </div>
                      <span className={`font-display font-bold text-sm ${d.price === 'Miễn phí' ? 'text-green-600' : 'text-on-surface'}`}>
                        {d.price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-surface-lowest rounded-btn p-7">
                <h2 className="font-display font-bold text-lg text-[#1a1a2e] mb-5">Phương thức thanh toán</h2>
                <div className="space-y-3">
                  {paymentMethods.map(m => (
                    <div key={m.id}>
                      <label
                        className={`flex items-center gap-4 p-4 rounded-btn cursor-pointer border-2 transition-all ${
                          paymentMethod === m.id ? 'border-primary bg-primary/5' : 'border-surface-mid hover:border-outline-variant'
                        }`}
                      >
                        <input type="radio" name="payment" value={m.id} checked={paymentMethod === m.id}
                          onChange={() => setPaymentMethod(m.id)} className="accent-primary" />
                        <span className="text-xl">{m.icon}</span>
                        <span className="font-body text-sm text-on-surface font-medium">{m.label}</span>
                      </label>

                      {/* Card form */}
                      {paymentMethod === 'card' && m.id === 'card' && (
                        <div className="mt-3 p-5 bg-surface-low rounded-btn space-y-4">
                          <div>
                            <label className="section-label mb-2 block">Số thẻ</label>
                            <input type="text" className="input-field" placeholder="0000 0000 0000 0000" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="section-label mb-2 block">Ngày hết hạn</label>
                              <input type="text" className="input-field" placeholder="MM/YY" />
                            </div>
                            <div>
                              <label className="section-label mb-2 block">CVV</label>
                              <input type="text" className="input-field" placeholder="•••" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Summary */}
            <div className="lg:col-span-1">
              <div className="bg-surface-lowest rounded-btn p-6 sticky top-24">
                <h2 className="font-display font-bold text-base text-[#1a1a2e] mb-5 pb-4 border-b border-surface-mid">
                  Đơn hàng ({cartItems.length} sản phẩm)
                </h2>

                <div className="space-y-4 mb-5">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-14 h-16 flex-shrink-0 rounded overflow-hidden bg-surface-low">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white rounded-full text-[9px] font-bold flex items-center justify-center">1</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-semibold text-xs text-[#1a1a2e] leading-snug line-clamp-2">{item.name}</p>
                        <p className="text-on-surface-muted text-xs font-body mt-0.5">Size M · Đen</p>
                      </div>
                      <span className="font-display font-bold text-xs text-[#1a1a2e] flex-shrink-0">{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pb-4 border-b border-surface-mid text-sm font-body">
                  <div className="flex justify-between">
                    <span className="text-on-surface-muted">Tạm tính</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-muted">Vận chuyển</span>
                    <span className={`font-semibold ${shippingFee === 0 ? 'text-green-600' : ''}`}>
                      {shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-4">
                  <span className="font-display font-bold text-on-surface">Tổng cộng</span>
                  <span className="font-display font-black text-xl text-[#1a1a2e]">{formatPrice(total)}</span>
                </div>

                <button className="btn-primary w-full justify-center py-4 text-base">
                  Đặt hàng ngay 🎉
                </button>

                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-on-surface-muted font-body">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Thanh toán an toàn & bảo mật
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
