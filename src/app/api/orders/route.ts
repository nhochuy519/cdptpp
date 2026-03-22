import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/connect";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";
import Coupon from "@/models/Coupon";

/**
 * POST /api/orders
 * Create a new order
 */
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { userId, items, shippingAddress, paymentMethod, couponCode } =
      await req.json();

    // Validate required fields
    if (!userId || !items || !shippingAddress || !paymentMethod) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify products exist and have sufficient stock
    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 404 },
        );
      }

      // Check stock from variant
      let variant = null;
      if (item.size && item.color) {
        variant = product.variants.find(
          (v: any) => v.size === item.size && v.color === item.color,
        );
        if (!variant || variant.stock < item.quantity) {
          return NextResponse.json(
            { error: `Insufficient stock for ${product.name}` },
            { status: 400 },
          );
        }
      }

      const itemPrice = item.salePrice || product.salePrice || product.price;
      const itemSubtotal = itemPrice * item.quantity;

      validatedItems.push({
        productId: product._id,
        name: product.name,
        sku: product.sku,
        price: product.price,
        salePrice: product.salePrice,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        subtotal: itemSubtotal,
      });

      subtotal += itemSubtotal;
    }

    // Validate coupon if provided
    let discountAmount = 0;
    if (couponCode) {
      const coupon = await Coupon.findOne({
        code: couponCode.toUpperCase(),
        isActive: true,
        expiresAt: { $gt: new Date() },
      });

      if (!coupon) {
        return NextResponse.json(
          { error: "Invalid or expired coupon" },
          { status: 400 },
        );
      }

      if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
        return NextResponse.json(
          { error: "Coupon usage limit reached" },
          { status: 400 },
        );
      }

      if (subtotal < coupon.minOrderValue) {
        return NextResponse.json(
          { error: `Minimum order value ₫${coupon.minOrderValue} required` },
          { status: 400 },
        );
      }

      // Calculate discount
      if (coupon.discountType === "percent") {
        discountAmount = (subtotal * coupon.discountValue) / 100;
        if (coupon.maxDiscountAmount) {
          discountAmount = Math.min(discountAmount, coupon.maxDiscountAmount);
        }
      } else {
        discountAmount = coupon.discountValue;
      }

      // Increment coupon usage
      await Coupon.findByIdAndUpdate(coupon._id, {
        usedCount: coupon.usedCount + 1,
      });
    }

    // Generate order number
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const ordersToday = await Order.countDocuments({
      createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
    });
    const orderNumber = `ORD-${dateStr}-${String(ordersToday + 1).padStart(4, "0")}`;

    // Calculate final amount
    const shippingCost = 30000; // Fixed for now
    const taxAmount = 0;
    const totalAmount = subtotal + shippingCost + taxAmount - discountAmount;

    // Create order
    const order = await Order.create({
      orderNumber,
      userId,
      items: validatedItems,
      shippingAddress,
      paymentMethod,
      couponCode: couponCode?.toUpperCase(),
      discountAmount,
      shippingCost,
      taxAmount,
      subtotal,
      totalAmount,
      paymentStatus: paymentMethod === "COD" ? "pending" : "pending",
      orderStatus: "pending",
    });

    // Add initial status to timeline
    order.orderTimeline = [
      {
        status: "pending",
        timestamp: new Date(),
        note: "Order created",
      },
    ];
    await order.save();

    await order.populate("userId", "name email phone");

    return NextResponse.json(
      { message: "Order created successfully", order },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 },
    );
  }
}

/**
 * GET /api/orders?userId=...
 * Get orders for a user
 */
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 });
    }

    const orders = await Order.find({ userId })
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 });

    return NextResponse.json({ orders });
  } catch (error: any) {
    console.error("Get orders error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get orders" },
      { status: 500 },
    );
  }
}
