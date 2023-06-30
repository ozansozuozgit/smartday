import sgMail from '@sendgrid/mail';
import { NextRequest, NextResponse } from 'next/server';
sgMail.setApiKey(process.env.SENDGRID_API_KEY as any);

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, name, message } = await req.json();

  const content = {
    to: 'ozansozuoz@gmail.com', // Your client's email address
    from: 'ozansozuoz@gmail.com', // Your SendGrid verified sender email
    replyTo: email, // User's email address
    subject: 'New Message from Smart Days', // Can be predefined or based on a form field
    text: `${name} says: ${message}`, // You could format this however you want
  };

  try {
    await sgMail.send(content);
    return NextResponse.json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.log('ERROR', error);
    return NextResponse.json({ message: 'Message not sent.' });
  }
}
