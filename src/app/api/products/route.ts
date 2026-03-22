import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/connect";
import Product from "@/models/Product";
import Category from "@/models/Category";

/**
 * GET /api/products
 * Get all products with pagination and filtering
 * Query params:
 *   - page: page number (default: 1)
 *   - limit: items per page (default: 12)
 *   - category: filter by category slug
 *   - featured: only featured products (true/false)
 *   - new: only new products (true/false)
 *   - search: search by name or description
 */
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured") === "true";
    const isNew = searchParams.get("new") === "true";
    const search = searchParams.get("search");

    // Build filter query
    const filter: any = { isActive: true };

    if (featured) filter.isFeatured = true;
    if (isNew) filter.isNew = true;

    // Filter by category
    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      }
    }

    // Text search
    if (search) {
      filter.$text = { $search: search };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    // Fetch products
    const products = await Product.find(filter)
      .populate("category", "name slug")
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error: any) {
    console.error("Get products error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get products" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/products
 * Create new product (admin only)
 */
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();

    // Validate required fields
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Create product
    const product = await Product.create(body);
    await product.populate("category", "name slug");

    return NextResponse.json(
      { message: "Product created successfully", product },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500 },
    );
  }
}
