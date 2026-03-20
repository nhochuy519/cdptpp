'use client'

import Link from 'next/link'

export default function AdminDashboard() {
  const stats = [
    { label: 'Tổng doanh thu', value: '45.2M', icon: '💰', trend: '+12.5%' },
    { label: 'Tổng đơn hàng', value: '1,234', icon: '📦', trend: '+8.2%' },
    { label: 'Khách hàng', value: '892', icon: '👥', trend: '+5.1%' },
    { label: 'Sản phẩm', value: '156', icon: '🛍️', trend: '+3.2%' },
  ]

  const recentOrders = [
    { id: '#2024-001', customer: 'Nguyễn Văn A', total: '2.5M', status: 'Pending' },
    { id: '#2024-002', customer: 'Trần Thị B', total: '1.8M', status: 'Shipped' },
    { id: '#2024-003', customer: 'Lê Văn C', total: '3.2M', status: 'Delivered' },
    { id: '#2024-004', customer: 'Phạm Thị D', total: '1.5M', status: 'Pending' },
  ]

  const adminMenu = [
    { title: 'Quản lý sản phẩm', href: '/admin/products', icon: '📦' },
    { title: 'Quản lý đơn hàng', href: '/admin/orders', icon: '📋' },
    { title: 'Quản lý khách hàng', href: '/admin/customers', icon: '👥' },
    { title: 'Quản lý danh mục', href: '/admin/categories', icon: '🏷️' },
    { title: 'Thống kê báo cáo', href: '/admin/analytics', icon: '📊' },
    { title: 'Cài đặt', href: '/admin/settings', icon: '⚙️' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <Link href="/" className="text-sm text-blue-600 hover:text-blue-800">
              ← Quay về trang chủ
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-2">{stat.trend}</p>
                </div>
                <div className="text-4xl">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {adminMenu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1">Quản lý và cập nhật</p>
            </Link>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Đơn hàng gần đây</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Mã đơn hàng
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Khách hàng
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Tổng tiền
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.total}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
