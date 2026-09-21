import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User';
import Category from '@/models/Category';
import { getAuthUser } from '@/lib/jwt';

export async function GET(req) {
  try {
    const auth = getAuthUser(req);
    if (!auth || auth.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }

    await connectDB();

    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const totalCategories = await Category.countDocuments();

    const deliveredOrders = await Order.find({ orderStatus: 'Delivered' });
    const totalRevenue = deliveredOrders.reduce((sum, o) => sum + o.grandTotal, 0);

    const pendingOrders = await Order.countDocuments({ orderStatus: 'Pending' });

    const recentOrders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 }).limit(5);

    return NextResponse.json({
      success: true,
      stats: {
        totalOrders,
        totalProducts,
        totalCustomers,
        totalCategories,
        totalRevenue,
        pendingOrders
      },
      recentOrders
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
