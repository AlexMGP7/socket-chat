const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify = async (idToken = '') => {
  console.log("El token es: ", idToken);
  console.log('Iniciando la verificación de Google...');
  try {
    console.log('Verificando el token ID...');

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    console.log('Token ID verificado, obteniendo el payload...');
    const payload = ticket.getPayload();

    console.log('Payload:', payload); // Imprime el payload completo

    const { name: nombre, picture: img, email: correo } = payload;

    return { nombre, img, correo };
  } catch (error) {
    console.error('Error durante la verificación de Google:', error.message);
    throw error; // Re-lanzamos el error para que el manejador externo pueda manejarlo si es necesario
  }
};

module.exports = {
  googleVerify
};
