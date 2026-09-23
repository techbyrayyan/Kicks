import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { generateToken } from '@/lib/jwt';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide email and password' },
        { status: 400 }
      );
    }

    const cleanEmail = email ? email.trim().toLowerCase() : '';

    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'No account found with this email. Please click "Create One" to register.' },
        { status: 404 }
      );
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Incorrect password. Please try again.' },
        { status: 401 }
      );
    }

    if (user.isBlocked) {
      return NextResponse.json(
        { success: false, message: 'Your account has been suspended' },
        { status: 403 }
      );
    }

    const token = generateToken({ id: user._id, role: user.role });

    return NextResponse.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        addresses: user.addresses
      }
    });
  } catch (error) {
    console.error('Login API Error:', error);
    const isConnErr = error.message?.includes('ECONNREFUSED') || error.message?.includes('selection timed out');
    return NextResponse.json(
      {
        success: false,
        message: isConnErr
          ? 'Database connection failed. Please ensure MONGODB_URI is set in Vercel Environment Variables.'
          : error.message
      },
      { status: 500 }
    );
  }
}
