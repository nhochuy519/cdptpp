'use client'

import Link from 'next/link'

export default function OrdersPage() {
  const orders = [
    { id: '#2024-001', customer: 'Nguyễn Văn A', total: '2.5M', status: 'Pending', date: '2024-03-20' },
    { id: '#2024-002', customer: 'Trần Thị B', total: '1.8M', status: 'Shipped', date: '2024-03-19' },
    { id: '#2024-003', customer: 'Lê Văn C', total: '3.2M', status: 'Delivered', date: '2024-03-18' },
    { id: '#2024-004', customer: 'Phạm Thị D', total: '1.5M', status: 'Pending', date: '2024-03-20' },
    { id: '#2024-005', customer: 'Hoàng Văn E', total: '4.2M', status: 'Processing', date: '2024-03-20' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/admin" className="text-blue-600 hover:text-blue-800">
                ← Admin
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">Quản lý đơn hàng</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Mã đơn
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Tổng tiền
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Ngày
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.total}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'Processing'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">Chi tiết</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
