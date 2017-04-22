'use strict';

const helper = require('sendgrid').mail,
      sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

const welcomeMail = function(username, usermail){

  const from_email = new helper.Email('test@example.com'),
        to_email = new helper.Email(usermail),
        subject = 'Hello World from the SendGrid Node.js Library!',
        content = new helper.Content('text/plain', 'Hello, Email!'),
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