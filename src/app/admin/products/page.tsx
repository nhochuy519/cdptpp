'use client'

import Link from 'next/link'

export default function ProductsPage() {
  const products = [
    { id: 1, name: 'Áo sơ mi nam', price: '450,000₫', stock: 45, status: 'Active' },
    { id: 2, name: 'Quần jeans nữ', price: '650,000₫', stock: 32, status: 'Active' },
    { id: 3, name: 'Váy maxi', price: '850,000₫', stock: 18, status: 'Active' },
    { id: 4, name: 'Áo khoác nam', price: '1,200,000₫', stock: 5, status: 'Low Stock' },
    { id: 5, name: 'Áo thun nữ', price: '250,000₫', stock: 0, status: 'Out of Stock' },
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
              <h1 className="text-3xl font-bold text-gray-900 mt-2">Quản lý sản phẩm</h1>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              + Thêm sản phẩm
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Tên sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Giá
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Tồn kho
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
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.stock}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                        product.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : product.status === 'Low Stock'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
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
