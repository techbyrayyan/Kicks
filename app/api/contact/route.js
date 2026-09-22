import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import ContactMessage from '@/models/ContactMessage';

// POST /api/contact - Save contact form data to MongoDB
export async function POST(req) {
  try {
    await connectDB();
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'Please fill out all required fields.' },
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
      message: 'Thank you for reaching out! Your message has been saved successfully.',
      contactMsg
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || 'Error saving message to database.' },
      { status: 500 }
    );
  }
}

// GET /api/contact - Fetch saved contact messages from MongoDB (Admin)
export async function GET() {
  try {
    await connectDB();
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
