"use client";

import { useState } from "react";
import Link from "next/link";

// Admin sidebar
function AdminSidebar() {
  const menuItems = [
    {
      id: "user",
      label: "User Management",
      href: "/admin",
      icon: "👤",
      active: true,
    },
    {
      id: "product",
      label: "Product Management",
      href: "/admin/products",
      icon: "📦",
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
      label: "Total Revenue",
      value: "₫45.2M",
      trend: "+12.5%",
      color: "bg-surface-low",
    },
    {
      label: "Total Orders",
      value: "1,234",
      trend: "+8.2%",
      color: "bg-surface-low",
    },
    {
      label: "Customers",
      value: "892",
      trend: "+5.1%",
      color: "bg-surface-low",
    },
    {
      label: "Products",
      value: "156",
      trend: "+3.2%",
      color: "bg-surface-low",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className={`${stat.color} rounded-btn p-6`}>
          <p className="text-xs font-display font-bold text-on-surface-muted uppercase tracking-wider mb-2">
            {stat.label}
          </p>
          <p className="text-2xl font-display font-black text-on-surface mb-1">
            {stat.value}
          </p>
          <p className="text-xs text-primary font-body">{stat.trend}</p>
        </div>
      ))}
    </div>
  );
}

// Menu Cards
function MenuCards() {
  const adminMenu = [
    { title: "Product Management", href: "/admin/products", icon: "📦" },
    { title: "Orders", href: "/admin/orders", icon: "🛒" },
    { title: "Customers", href: "/admin/customers", icon: "👥" },
    { title: "Categories", href: "/admin/categories", icon: "🏷️" },
    { title: "Analytics", href: "/admin/analytics", icon: "📊" },
    { title: "Settings", href: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {adminMenu.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="bg-surface-lowest border border-outline-variant/20 rounded-btn p-6 hover:shadow-lg hover:border-primary/30 transition-all group"
        >
          <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
            {item.icon}
          </div>
          <h3 className="font-display font-semibold text-on-surface">
            {item.title}
          </h3>
          <p className="text-xs text-on-surface-muted font-body mt-1">
            Manage and update
          </p>
        </Link>
      ))}
    </div>
  );
}

// Recent Orders Table
function RecentOrders() {
  const orders = [
    {
      id: "#2024-001",
      customer: "Nguyễn Văn A",
      total: "₫2.5M",
      status: "Pending",
    },
    {
      id: "#2024-002",
      customer: "Trần Thị B",
      total: "₫1.8M",
      status: "Shipped",
    },
    {
      id: "#2024-003",
      customer: "Lê Văn C",
      total: "₫3.2M",
      status: "Delivered",
    },
    {
      id: "#2024-004",
      customer: "Phạm Thị D",
      total: "₫1.5M",
      status: "Pending",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-50";
      case "Shipped":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-orange-600 bg-orange-50";
    }
  };

  return (
    <div className="bg-surface-lowest rounded-btn overflow-hidden border border-outline-variant/20">
      <div className="px-6 py-4 border-b border-outline-variant/20">
        <h2 className="font-display font-semibold text-on-surface">
          Recent Orders
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-low border-b border-outline-variant/20">
              <th className="px-6 py-4 text-left text-xs font-display font-bold text-on-surface-muted uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-display font-bold text-on-surface-muted uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-4 text-left text-xs font-display font-bold text-on-surface-muted uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-4 text-left text-xs font-display font-bold text-on-surface-muted uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-surface-low transition-colors"
              >
                <td className="px-6 py-4 text-sm font-body font-semibold text-on-surface">
                  {order.id}
                </td>
                <td className="px-6 py-4 text-sm font-body text-on-surface">
                  {order.customer}
                </td>
                <td className="px-6 py-4 text-sm font-body font-semibold text-on-surface">
                  {order.total}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2.5 py-1 text-xs font-display font-bold uppercase rounded-btn ${getStatusColor(order.status)}`}
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
  );
}

export default function AdminDashboard() {
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
            <div className="mb-8">
              <h1 className="font-display font-black text-3xl text-on-surface mb-2">
                Dashboard
              </h1>
              <p className="text-sm text-on-surface-muted font-body">
                Welcome back to your admin dashboard
              </p>
            </div>

            {/* Stats */}
            <StatsCards />

            {/* Menu Cards */}
            <h2 className="font-display font-semibold text-on-surface mb-6">
              Quick Actions
            </h2>
            <MenuCards />

            {/* Recent Orders */}
            <h2 className="font-display font-semibold text-on-surface mb-6">
              Recent Orders
            </h2>
            <RecentOrders />
          </div>
        </main>
      </div>
    </div>
  );
}
