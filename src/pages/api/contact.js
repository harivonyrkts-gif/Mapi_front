import { sendMail } from '@/lib/mailer';

export const prerender = false;

export async function POST({ request }) {
  try {
    const data = await request.json();
    const { prenom, nom, telephone, email, message } = data;

    // Validation simple
    if (!prenom || !nom || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: 'Champs obligatoires manquants' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await sendMail({ prenom, nom, telephone, email, message });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erreur envoi mail:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}