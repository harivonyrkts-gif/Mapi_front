import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ectorvec@gmail.com',
    pass: 'ymxfsqiydjyekhle',
  },
});

export async function sendMail({ prenom, nom, telephone, email, message }) {
  await transporter.sendMail({
    from: '"Formulaire Mapi" <ectorvec@gmail.com>',
    to: 'ectorvec@gmail.com',
    subject: `Nouveau message de contact - ${prenom} ${nom}`,
    replyTo: email,
    html: `
      <h2>Nouveau message depuis le formulaire Mapi</h2>
      <p><strong>Prénom :</strong> ${prenom}</p>
      <p><strong>Nom :</strong> ${nom}</p>
      <p><strong>Téléphone :</strong> ${telephone}</p>
      <p><strong>Email :</strong> ${email}</p>
      <hr>
      <p><strong>Message :</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  });
}