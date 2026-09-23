import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { generateToken } from '@/lib/jwt';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password, phone } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide name, email and password' },
        { status: 400 }
      );
    }

    const cleanEmail = email ? email.trim().toLowerCase() : '';

    const userExists = await User.findOne({ email: cleanEmail });
    if (userExists) {
      return NextResponse.json(
        { success: false, message: 'An account with this email already exists. Please sign in.' },
        { status: 400 }
      );
    }

    const user = await User.create({
      name,
      email: cleanEmail,
      password,
      phone: phone || ''
    });

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
    console.error('Registration API Error:', error);
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
