import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const { name, email, subject, phone, message } = await request.json();

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["brightman@scriptify.cm"],
      subject: `[SCRIPTIFY CONTACT FORM] ${name}`,
      html: `
      <div>
        <p>Nouveau message de ${name}</p>
        <p>Sujet: ${subject}</p>
        <p>Email: ${email}</p>
        <p>Téléphone: ${phone}</p>
        <div>Message: <p>${message}</p></div>
      </div>
      `,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
