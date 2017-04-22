'use strict';

const helper = require('sendgrid').mail,
      welcomemail = require('./mails.js'),
      sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

const welcomeMail = function(username, usermail){

  const from_email = new helper.Email('noreply@qode.be'),
        to_email = new helper.Email(usermail),
        subject = 'Hello, '+username+" ! "+ "Welcome to Qode.be",
        content = new helper.Content('text/html', welcomemail.welcomemailPart1+username+welcomemail.welcomemailPart2),
        mail = new helper.Mail(from_email, subject, to_email, content);

  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  sg.API(request, function(error, response) {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });
  
};

module.exports = welcomeMail;