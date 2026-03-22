import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/connect";
import User from "@/models/User";

/**
 * POST /api/auth/register
 * Register a new user
 */
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { name, email, password, phone } = await req.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 },
      );
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: "customer",
    });

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: userResponse,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error.message || "Registration failed" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/auth/login
 * Login user
 */
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 },
      );
    }

    // Find user and include password field
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // Check password
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    return NextResponse.json({
      message: "Login successful",
      user: userResponse,
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error.message || "Login failed" },
      { status: 500 },
    );
  }
}
