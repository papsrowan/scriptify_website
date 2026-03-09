import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation stricte des données d'entrée
    const { name, email, subject, phone, message } = body;

    if (!name || typeof name !== 'string' || name.length < 2 || name.length > 100) {
      return NextResponse.json({ error: "Nom invalide" }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    if (!subject || typeof subject !== 'string' || subject.length < 5 || subject.length > 200) {
      return NextResponse.json({ error: "Sujet invalide" }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.length < 10 || message.length > 5000) {
      return NextResponse.json({ error: "Message invalide" }, { status: 400 });
    }

    if (phone && (typeof phone !== 'string' || phone.length > 20)) {
      return NextResponse.json({ error: "Téléphone invalide" }, { status: 400 });
    }

    // Échapper les caractères dangereux
    const sanitizedName = name.replace(/[<>'"&]/g, '');
    const sanitizedSubject = subject.replace(/[<>'"&]/g, '');
    const sanitizedMessage = message.replace(/[<>'"&]/g, '');
    const sanitizedPhone = phone ? phone.replace(/[<>'"&]/g, '') : '';

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["brightman@scriptify.cm"],
      subject: `[SCRIPTIFY CONTACT FORM] ${sanitizedName}`,
      html: `
      <div>
        <p>Nouveau message de ${sanitizedName}</p>
        <p>Sujet: ${sanitizedSubject}</p>
        <p>Email: ${email}</p>
        <p>Téléphone: ${sanitizedPhone}</p>
        <div>Message: <p>${sanitizedMessage}</p></div>
      </div>
      `,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi d'email:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
