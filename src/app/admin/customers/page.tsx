'use client'

import Link from 'next/link'

export default function CustomersPage() {
  const customers = [
    { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', phone: '0912345678', orders: 5, spent: '12.5M' },
    { id: 2, name: 'Trần Thị B', email: 'b@example.com', phone: '0923456789', orders: 3, spent: '6.8M' },
    { id: 3, name: 'Lê Văn C', email: 'c@example.com', phone: '0934567890', orders: 8, spent: '24.2M' },
    { id: 4, name: 'Phạm Thị D', email: 'd@example.com', phone: '0945678901', orders: 2, spent: '3.5M' },
    { id: 5, name: 'Hoàng Văn E', email: 'e@example.com', phone: '0956789012', orders: 4, spent: '9.2M' },
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
              <h1 className="text-3xl font-bold text-gray-900 mt-2">Quản lý khách hàng</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow overflow-hidden overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Tên khách hàng
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Điện thoại
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Số lần mua
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Tổng chi tiêu
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{customer.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.orders}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{customer.spent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
