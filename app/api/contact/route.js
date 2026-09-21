import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import ContactMessage from '@/models/ContactMessage';

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'Please fill out all required fields' },
        { status: 400 }
      );
    }

    const contactMsg = await ContactMessage.create({
      name,
      email,
      phone: phone || '',
      subject,
      message
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out! Our support team will get back to you shortly.',
      contactMsg
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
