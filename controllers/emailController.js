const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Email,
    pass: process.env.password,
  },
});

const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views/"),
};

transporter.use("compile", hbs(handlebarOptions));

const sendEmail = async (req, res) => {
  try {
    const { name, email, work, my_info, message } = req.body.inputs;

    const mailOptions = {
      from: email,
      to: process.env.Email,
      subject: `You have a new email from ${name}`,
      text: message,
      template: "email",
      context: {
        name: name,
        email: email,
        work: work,
        my_info: my_info,
        message: message,
      },
    };

    const ResMailOptions = {
      from: email,
      to: email,
      subject: `Thank you for contacting Aakash`,
      text: message,
      template: "thankyou",
      context: {
        name: name,
        messgae: message,
      },
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (info) {
        res.send({ Message: "Email sent" });
        transporter.sendMail(ResMailOptions, function (error, info) {
          if (info) return res.send({ Message: "Email sent" });
        });
      } else return res.send({ Message: error });
    });
  } catch (error) {
    console.log(error);
    res.send({ Error: error });
  }
};

module.exports = sendEmail;
