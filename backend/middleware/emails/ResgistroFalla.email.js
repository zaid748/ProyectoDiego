const nodemailer = require('nodemailer');


const Email = async (req, res, next)=>{
    // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "info.swarmtech@gmail.com", // generated ethereal user
      pass: "hfbsroomiywwtayw", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'info.swarmtech@gmail.com', // sender address
    to: "proyectos@swarmtech.com.mx", // list of receivers
    subject: "Se ha registrado una nueva falla", // Subject line
    text: `${req.body.Titulo}`, // plain text body
    html: `
    <div style="margin: 10px; background: antiquewhite;">
        <h1>Reporte de Falla</h1>
        <h3 style="margin-left: 10px">Usuario: ${req.user.name}</h3>
        <h3 style="margin-left: 10px">Empresa: ${req.empresa.Nombre}</h3>
        <h3 style="margin-left: 10px">Titulo de falla: ${req.body.Titulo}</h3>
        <h3 style="margin-left: 10px">Descricion: ${req.body.Descripcion}</h3>
    </div>`
     // html body
  });
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...   
  next();
}

module.exports = Email;