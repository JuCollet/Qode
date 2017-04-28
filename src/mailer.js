'use strict';

const helper = require('sendgrid').mail,
      mails = require('./assets/mails.js'),
      sg = require('sendgrid')(process.env.SENDGRID_API_KEY),
      baseUrl = "http://qode.herokuapp.com/";

const welcomeMail = function(username, usermail){

  const from_email = new helper.Email('noreply@qode.be'),
        to_email = new helper.Email(usermail),
        subject = 'Hello, '+username+" ! "+ "Welcome to Qode.be",
        content = new helper.Content('text/html', mails.welcomeMail.part1+username+mails.welcomeMail.part2),
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

const recoveryMail = function(usermail,recoveryToken){
  
  const from_email = new helper.Email('noreply@qode.be'),
        to_email = new helper.Email(usermail),
        subject = "Lost your password ?",
        content = new helper.Content('text/html', mails.recoveryMail.part1+baseUrl+recoveryToken+mails.recoveryMail.part2),
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

module.exports = {
  welcomeMail:welcomeMail,
  recoveryMail:recoveryMail
}