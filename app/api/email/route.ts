import RegistrationEmail from "@/app/emails/registration-email";
import * as React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["joaquimubisse@gmail.com"],
      subject: "Cofirmação de registro | Am Power Trading",
      react: RegistrationEmail({
        firstName: "Joaquim",
        lastName: "Ubisse",
        email: "joaquimubisse@gmail.com",
        password: "sjhnsks9",
        role: "Administrador",
      }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error });
  }
}
