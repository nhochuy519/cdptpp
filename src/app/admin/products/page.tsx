"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Admin sidebar
function AdminSidebar() {
  const menuItems = [
    { id: "user", label: "User Management", href: "/admin", icon: "👤" },
    {
      id: "product",
      label: "Product Management",
      href: "/admin/products",
      icon: "📦",
      active: true,
    },
    { id: "orders", label: "Orders", href: "/admin/orders", icon: "🛒" },
    {
      id: "analytics",
      label: "Analytics",
      href: "/admin/analytics",
      icon: "📊",
    },
    { id: "settings", label: "Settings", href: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-56 bg-surface-lowest border-r border-outline-variant/20 h-screen sticky top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-outline-variant/20">
        <h1 className="font-display font-black text-lg text-primary">
          MAISON<span className="text-on-surface-muted">.</span>
        </h1>
        <p className="text-xs text-on-surface-muted font-body mt-1 tracking-wide uppercase">
          Management Portal
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-btn font-body text-sm transition-all
              ${
                item.active
                  ? "bg-primary text-white font-semibold"
                  : "text-on-surface hover:bg-surface-low"
              }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-outline-variant/20">
        <div className="flex items-center gap-3 px-3 py-3 rounded-btn bg-surface-low">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-display font-bold text-xs text-primary">
            A
          </div>
          <div className="text-xs">
            <p className="font-display font-semibold text-on-surface">
              Admin User
            </p>
            <p className="text-on-surface-muted">Super Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// Header
function AdminHeader() {
  const [tab, setTab] = useState("dashboard");

  return (
    <header className="bg-surface-lowest border-b border-outline-variant/20 sticky top-0 z-40">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Search */}
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2.5 bg-surface-low rounded-btn border border-outline-variant/20 text-sm font-body placeholder-on-surface-subtle focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
            <svg
              className="absolute right-3 top-3 w-4 h-4 text-on-surface-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Tabs */}
          <div className="flex gap-1">
            {["Dashboard", "Reports"].map((tabName) => (
              <button
                key={tabName}
                onClick={() => setTab(tabName.toLowerCase())}
                className={`px-4 py-2 text-sm font-body transition-colors
                  ${
                    tab === tabName.toLowerCase()
                      ? "text-primary font-semibold border-b-2 border-primary"
                      : "text-on-surface-muted hover:text-on-surface"
                  }`}
              >
                {tabName}
              </button>
            ))}
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-btn hover:bg-surface-low transition-colors text-on-surface-muted hover:text-on-surface">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          <button className="p-2 rounded-btn hover:bg-surface-low transition-colors text-on-surface-muted hover:text-on-surface">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

// Stats Cards
function StatsCards() {
  const stats = [
    {
      label: "TOTAL PRODUCTS",
      value: "1,284",
      trend: "+12%",
      color: "bg-surface-low",
    },
    {
      label: "LOW STOCK ALERTS",
      value: "18",
      subtext: "Require action",
      color: "bg-error-container",
    },
    {
      label: "ACTIVE CATEGORIES",
      value: "24",
      subtext: "Across all collections",
      color: "bg-surface-low",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className={`${stat.color} rounded-btn p-6`}>
          <p className="text-xs font-display font-bold text-on-surface-muted uppercase tracking-wider mb-2">
            {stat.label}
          </p>
          <p className="text-3xl font-display font-black text-on-surface mb-1">
            {stat.value}
          </p>
          {stat.trend && (
            <p className="text-xs text-primary font-body">{stat.trend}</p>
          )}
          {stat.subtext && (
            <p className="text-xs text-on-surface-muted font-body">
              {stat.subtext}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// Product Table
function ProductTable() {
  const products = [
    {
      id: 1,
      name: "Nordic Oak Lounge Chair",
      sku: "FUR-NK-01",
      category: "Furniture",
      price: "$450.00",
      stock: 42,
      status: "PUBLISHED",
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&q=80",
    },
    {
      id: 2,
      name: "Matte Terra Cotta Vase",
      sku: "CER-TC-08",
      category: "Ceramics",
      price: "$85.00",
      stock: 3,
      status: "PUBLISHED",
      image:
        "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=100&q=80",
    },
    {
      id: 3,
      name: "Handwoven Linen Throw",
      sku: "TEX-LN-22",
      category: "Textiles",
      price: "$120.00",
      stock: 0,
      status: "DRAFT",
      image:
        "https://images.unsplash.com/photo-1565182999555-2142b9c73b3d?w=100&q=80",
    },
  ];

  const getStatusColor = (status: string) => {
    return status === "PUBLISHED"
      ? "text-green-600 bg-green-50"
      : "text-gray-600 bg-gray-50";
  };

  return (
    <div className="bg-surface-lowest rounded-btn overflow-hidden border border-outline-variant/20">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-low border-b border-outline-variant/20">
              <th className="px-6 py-4 text-left text-xs font-display font-bold text-on-surface-muted uppercase tracking-wider">
                PRODUCT
              </th>
              <th className="px-6 py-4 text-left text-xs font-display font-bold text-on-surface-muted uppercase tracking-wider">
                CATEGORY
              </th>
              <th className="px-6 py-4 text-left text-xs font-display font-bold text-on-surface-muted uppercase tracking-wider">
                PRICE
              </th>
              <th className="px-6 py-4 text-left text-xs font-display font-bold text-on-surface-muted uppercase tracking-wider">
                STOCK
              </th>
              <th className="px-6 py-4 text-left text-xs font-display font-bold text-on-surface-muted uppercase tracking-wider">
                STATUS
              </th>
              <th className="px-6 py-4 text-left text-xs font-display font-bold text-on-surface-muted uppercase tracking-wider">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-surface-low transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded-btn object-cover"
                    />
                    <div>
                      <p className="font-body font-semibold text-on-surface text-sm">
                        {product.name}
                      </p>
                      <p className="text-xs text-on-surface-muted font-body">
                        SKU: {product.sku}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-body text-on-surface">
                  {product.category}
                </td>
                <td className="px-6 py-4 text-sm font-body text-on-surface font-semibold">
                  {product.price}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-surface-low rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(product.stock / 50) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-body text-on-surface-muted">
                      {product.stock} left
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2.5 py-1 text-xs font-display font-bold uppercase rounded-btn ${getStatusColor(product.status)}`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-surface-low rounded-btn transition-colors text-on-surface-muted hover:text-on-surface">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-surface-low rounded-btn transition-colors text-on-surface-muted hover:text-error">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 bg-surface-low border-t border-outline-variant/20 flex items-center justify-between">
        <p className="text-xs text-on-surface-muted font-body">
          Showing 1 to 10 of 1,284 products
        </p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm font-body text-on-surface-muted hover:text-on-surface transition-colors">
            ←
          </button>
          <button className="w-8 h-8 bg-primary text-white rounded-btn text-xs font-display font-bold">
            1
          </button>
          <button className="w-8 h-8 hover:bg-surface-low text-on-surface rounded-btn text-xs font-body font-semibold transition-colors">
            2
          </button>
          <button className="w-8 h-8 hover:bg-surface-low text-on-surface rounded-btn text-xs font-body font-semibold transition-colors">
            3
          </button>
          <button className="px-3 py-1 text-sm font-body text-on-surface-muted hover:text-on-surface transition-colors">
            →
          </button>
        </div>
      </div>
    </div>
  );
}

// Filters
function FilterBar() {
  return (
    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-outline-variant/20">
      <select className="px-4 py-2 bg-surface-lowest border border-outline-variant/20 rounded-btn text-sm font-body text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/30">
        <option>All Categories</option>
        <option>Furniture</option>
        <option>Ceramics</option>
        <option>Textiles</option>
      </select>

      <select className="px-4 py-2 bg-surface-lowest border border-outline-variant/20 rounded-btn text-sm font-body text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/30">
        <option>Price Range</option>
        <option>Under $50</option>
        <option>$50 - $200</option>
        <option>$200+</option>
      </select>

      <select className="px-4 py-2 bg-surface-lowest border border-outline-variant/20 rounded-btn text-sm font-body text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/30">
        <option>Stock Status</option>
        <option>In Stock</option>
        <option>Low Stock</option>
        <option>Out of Stock</option>
      </select>

      <button className="px-4 py-2 text-sm font-body text-on-surface-muted hover:text-on-surface flex items-center gap-2 transition-colors">
        More Filters
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="flex h-screen bg-surface">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-8 py-8">
            {/* Page Title */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="font-display font-black text-3xl text-on-surface mb-2">
                  Products
                </h1>
                <p className="text-sm text-on-surface-muted font-body">
                  Manage your boutique inventory and product listings.
                </p>
              </div>
              <button className="px-6 py-3 bg-primary hover:bg-primary-container text-white font-display font-bold text-sm rounded-btn transition-all flex items-center gap-2">
                <span>+</span> Create Product
              </button>
            </div>

            {/* Stats */}
            <StatsCards />

            {/* Filters */}
            <FilterBar />

            {/* Table */}
            <ProductTable />
          </div>
        </main>
      </div>
    </div>
  );
}
