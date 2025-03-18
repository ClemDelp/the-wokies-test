import * as SibApiV3Sdk from '@getbrevo/brevo';
import { NextResponse } from 'next/server';

// Initialize Brevo
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);

export async function POST(request: Request) {
  try {
    const { player } = await request.json();
    const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/invite/${player.id}`;

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = "Welcome to The Wokies!";
    sendSmtpEmail.htmlContent = `
      <h1>Welcome to The Wokies!</h1>
      <p>You've been invited to join our team.</p>
      <p>Please click the link below to confirm your participation:</p>
      <a href="${inviteLink}">Accept Invitation</a>
    `;
    sendSmtpEmail.sender = { name: "The Wokies", email: "your-verified-sender@yourdomain.com" };
    sendSmtpEmail.to = [{ email: player.mail, name: player.name }];

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return NextResponse.json({ success: true, messageId: response.body.messageId });
  } catch (error) {
    console.error('Error sending invite:', error);
    return NextResponse.json({ error: 'Failed to send invite' }, { status: 500 });
  }
}