'use client'
import { useState } from 'react'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { products, formatPrice } from '@/lib/data'

const sidebarLinks = [
  { id: 'profile', label: 'Hồ sơ cá nhân', icon: '👤' },
  { id: 'orders', label: 'Đơn hàng của tôi', icon: '📦' },
  { id: 'wishlist', label: 'Yêu thích', icon: '❤️' },
  { id: 'addresses', label: 'Sổ địa chỉ', icon: '📍' },
  { id: 'password', label: 'Đổi mật khẩu', icon: '🔒' },
  { id: 'points', label: 'Điểm tích lũy', icon: '⭐' },
]

const orders = [
  { id: '#MSN-001234', date: '15/03/2026', items: 3, total: 3870000, status: 'Đã giao', statusColor: 'text-green-600 bg-green-50' },
  { id: '#MSN-001198', date: '02/03/2026', items: 1, total: 890000, status: 'Đang giao', statusColor: 'text-blue-600 bg-blue-50' },
  { id: '#MSN-001102', date: '18/02/2026', items: 2, total: 2180000, status: 'Đang xử lý', statusColor: 'text-orange-600 bg-orange-50' },
  { id: '#MSN-000987', date: '05/02/2026', items: 1, total: 2890000, status: 'Đã huỷ', statusColor: 'text-red-600 bg-red-50' },
]

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <>
      <Navbar />
      <main className="bg-surface min-h-screen">
        <div className="bg-surface-low">
          <div className="container mx-auto px-8 py-10">
            <h1 className="font-display font-black text-3xl text-[#1a1a2e] tracking-tight">Tài khoản</h1>
          </div>
        </div>

        <div className="container mx-auto px-8 py-10 flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            {/* Avatar */}
            <div className="bg-surface-lowest rounded-btn p-5 mb-4 text-center">
              <div className="w-16 h-16 rounded-full bg-surface-mid mx-auto mb-3 overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                  alt="Avatar" fill className="object-cover"
                />
              </div>
              <p className="font-display font-bold text-sm text-[#1a1a2e]">Nguyễn Minh Anh</p>
              <p className="text-xs text-on-surface-muted font-body mt-0.5">minh.anh@email.com</p>
              <span className="inline-flex items-center gap-1 mt-2 text-xs font-display font-bold text-primary">
                ⭐ 2.450 điểm
              </span>
            </div>

            <nav className="bg-surface-lowest rounded-btn overflow-hidden">
              {sidebarLinks.map((link, i) => (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all border-none cursor-pointer font-body text-sm ${
                    activeTab === link.id
                      ? 'bg-primary/5 text-primary font-semibold border-l-2 border-primary'
                      : 'bg-transparent text-on-surface hover:bg-surface-low'
                  } ${i < sidebarLinks.length - 1 ? 'border-b border-surface-mid' : ''}`}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </button>
              ))}
              <button className="w-full flex items-center gap-3 px-5 py-3.5 text-left border-t border-surface-mid text-sm text-red-500 hover:bg-red-50 transition-colors bg-transparent cursor-pointer font-body">
                <span>🚪</span>
                Đăng xuất
              </button>
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="bg-surface-lowest rounded-btn p-8">
                <h2 className="font-display font-bold text-xl text-[#1a1a2e] mb-6">Hồ sơ cá nhân</h2>
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { label: 'Họ và tên', value: 'Nguyễn Minh Anh', placeholder: '' },
                    { label: 'Số điện thoại', value: '0901 234 567', placeholder: '' },
                    { label: 'Email', value: 'minh.anh@email.com', placeholder: '' },
                    { label: 'Ngày sinh', value: '01/01/1995', placeholder: '' },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="section-label mb-2 block">{f.label}</label>
                      <input type="text" defaultValue={f.value} className="input-field" />
                    </div>
                  ))}
                  <div className="col-span-2">
                    <label className="section-label mb-2 block">Giới tính</label>
                    <div className="flex gap-4">
                      {['Nữ', 'Nam', 'Khác'].map(g => (
                        <label key={g} className="flex items-center gap-2 cursor-pointer font-body text-sm">
                          <input type="radio" name="gender" className="accent-primary" defaultChecked={g === 'Nữ'} />
                          {g}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-surface-mid">
                  <button className="btn-primary">Lưu thay đổi</button>
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="bg-surface-lowest rounded-btn overflow-hidden">
                <div className="p-6 border-b border-surface-mid">
                  <h2 className="font-display font-bold text-xl text-[#1a1a2e]">Đơn hàng của tôi</h2>
                </div>
                <div className="divide-y divide-surface-mid">
                  {orders.map(order => (
                    <div key={order.id} className="p-5 hover:bg-surface-low transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-display font-bold text-sm text-[#1a1a2e]">{order.id}</p>
                          <p className="text-xs text-on-surface-muted font-body mt-0.5">{order.date} · {order.items} sản phẩm</p>
                        </div>
                        <div className="text-right">
                          <p className="font-display font-bold text-sm text-[#1a1a2e]">{formatPrice(order.total)}</p>
                          <span className={`inline-flex mt-1 px-2.5 py-0.5 rounded-sm text-xs font-display font-bold ${order.statusColor}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-4">
                        <button className="btn-ghost text-xs">Xem chi tiết →</button>
                        {order.status === 'Đã giao' && (
                          <button className="text-xs font-display font-semibold text-on-surface-muted hover:text-primary transition-colors bg-transparent border-none cursor-pointer">
                            Đặt lại
                          </button>
                        )}
                        {order.status === 'Đang giao' && (
                          <button className="text-xs font-display font-semibold text-blue-600 bg-transparent border-none cursor-pointer hover:underline">
                            Theo dõi đơn hàng
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === 'wishlist' && (
              <div>
                <div className="bg-surface-lowest rounded-btn p-6 mb-4">
                  <h2 className="font-display font-bold text-xl text-[#1a1a2e]">Sản phẩm yêu thích ({products.length})</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {products.map(p => (
                    <div key={p.id} className="product-card group relative">
                      <div className="relative mb-4 overflow-hidden bg-surface-low" style={{ aspectRatio: '3/4' }}>
                        <Image src={p.image} alt={p.name} fill className="object-cover" />
                        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center border-none cursor-pointer hover:bg-red-50">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="#ab2e00" stroke="#ab2e00" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                          </svg>
                        </button>
                      </div>
                      <p className="font-display font-semibold text-sm text-[#1a1a2e] mb-2">{p.name}</p>
                      <p className="font-display font-bold text-sm text-primary mb-3">{formatPrice(p.price)}</p>
                      <button className="w-full py-2.5 bg-[#1a1a2e] text-white text-xs font-display font-bold rounded-btn hover:bg-primary transition-colors border-none cursor-pointer">
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PASSWORD TAB */}
            {activeTab === 'password' && (
              <div className="bg-surface-lowest rounded-btn p-8">
                <h2 className="font-display font-bold text-xl text-[#1a1a2e] mb-6">Đổi mật khẩu</h2>
                <div className="max-w-md space-y-5">
                  {['Mật khẩu hiện tại', 'Mật khẩu mới', 'Xác nhận mật khẩu mới'].map(label => (
                    <div key={label}>
                      <label className="section-label mb-2 block">{label}</label>
                      <input type="password" className="input-field" placeholder="••••••••" />
                    </div>
                  ))}
                  <button className="btn-primary mt-2">Cập nhật mật khẩu</button>
                </div>
              </div>
            )}

            {/* POINTS TAB */}
            {activeTab === 'points' && (
              <div className="bg-surface-lowest rounded-btn p-8">
                <h2 className="font-display font-bold text-xl text-[#1a1a2e] mb-6">Điểm tích lũy</h2>
                <div className="bg-gradient-to-r from-primary to-primary-container rounded-btn p-6 text-white mb-6">
                  <p className="text-white/70 text-sm font-body mb-1">Điểm hiện có</p>
                  <p className="font-display font-black text-4xl tracking-tight">2.450</p>
                  <p className="text-white/70 text-sm font-body mt-1">= {formatPrice(245000)} giảm giá</p>
                </div>
                <div className="space-y-3">
                  {[
                    { desc: 'Mua hàng #MSN-001234', date: '15/03', pts: '+387', color: 'text-green-600' },
                    { desc: 'Mua hàng #MSN-001198', date: '02/03', pts: '+89', color: 'text-green-600' },
                    { desc: 'Đổi điểm giảm giá', date: '18/02', pts: '-200', color: 'text-red-500' },
                  ].map((tx, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-surface-mid">
                      <div>
                        <p className="font-body text-sm text-on-surface font-medium">{tx.desc}</p>
                        <p className="text-xs text-on-surface-muted font-body">{tx.date}</p>
                      </div>
                      <span className={`font-display font-bold text-sm ${tx.color}`}>{tx.pts}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
