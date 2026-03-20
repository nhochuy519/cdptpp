'use client'

import Link from 'next/link'

export default function CategoriesPage() {
  const categories = [
    { id: 1, name: 'Nam', products: 45, status: 'Active' },
    { id: 2, name: 'Nữ', products: 52, status: 'Active' },
    { id: 3, name: 'Trẻ em', products: 28, status: 'Active' },
    { id: 4, name: 'Phụ kiện', products: 36, status: 'Active' },
    { id: 5, name: 'Clearance', products: 12, status: 'Active' },
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
              <h1 className="text-3xl font-bold text-gray-900 mt-2">Quản lý danh mục</h1>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              + Thêm danh mục
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
                  Tên danh mục
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Số sản phẩm
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
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{category.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{category.products}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                      {category.status}
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
