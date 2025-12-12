import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

const passwordResetStore = new Map();

export async function POST(req: Request) {
  try {
    const { email, currentPassword, newPassword } = await req.json();

    if (!email || !currentPassword || !newPassword) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: "No user with this email exists." }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Incorrect current password." }, { status: 401 });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 15 * 60 * 1000; // 15 minutes

    passwordResetStore.set(token, {
      userId: user.id,
      newPassword,
      expires
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const link = `${process.env.NEXT_PUBLIC_APP_URL}/profiles/${user.id}/changePassword?token=${token}`;

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Confirm your password change",
      html: `
        <p>Click below to confirm your new password:</p>
        <a href="${link}">Confirm Password Change</a>
        <p>This link expires in 15 minutes.</p>
      `
    });

    return NextResponse.json({ message: "Confirmation email sent." });
  } catch (err: any) {
    console.error("ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Missing token." }, { status: 400 });
    }

    const entry = passwordResetStore.get(token);

    if (!entry) {
      return NextResponse.json({ error: "Invalid or expired token." }, { status: 400 });
    }

    if (Date.now() > entry.expires) {
      passwordResetStore.delete(token);
      return NextResponse.json({ error: "Token expired." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(entry.newPassword, 10);

    await prisma.user.update({
      where: { id: entry.userId },
      data: { password: hashedPassword }
    });

    passwordResetStore.delete(token);

    return NextResponse.json({ message: "Password updated successfully." });
  } catch (err: any) {
    console.error("ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
