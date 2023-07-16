import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  //   console.log("DATOS: ", datos);
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Información del email

  const info = await transport.sendMail({
    from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "UpTask - Comprueba tu cuenta",
    text: "Comprueba tu cuenta en UpTask",
    html: `
    <p>Hola ${nombre} Comprueba tu cuenta en UpTask</p>
    
    <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:</p>
    
    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>

    <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    `,
  });
};

export const emailOlvidePassword = async (datos) => {
  //   console.log("DATOS: ", datos);
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Información del email

  const info = await transport.sendMail({
    from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "UpTask - Reestablece tu Password",
    text: "Reestablece tu Password",
    html: `
    <p>Hola ${nombre} has solicitado reestablecer tu password</p>
    
    <p>Sigue el siguiente enlace para generar un nuevo password:</p>

    <a href="${process.env.FRONTEND_URL}/nuevo-password/${token}">Reestablecer Password</a>

    <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
    `,
  });
};
