'use strict';

const helper = require('sendgrid').mail,
      cfg = require('../cfg'),
      mails = require('./assets/mails.js'),
      sg = require('sendgrid')(cfg.sendgrid.apikey),
      baseUrl = "http://qode-jucollet469715.codeanyapp.com:5000/";


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

  sg.API(request);
  
};

const recoveryMail = function(usermail, recoveryToken){

  const from_email = new helper.Email('noreply@qode.be'),
        to_email = new helper.Email(usermail),
        subject = "Lost your password ?",
        content = new helper.Content('text/html', mails.recoveryMail.part1+baseUrl+'user/passwordrecovery/'+recoveryToken+mails.recoveryMail.part2),
        mail = new helper.Mail(from_email, subject, to_email, content);

  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  sg.API(request);
  
};

module.exports = {
  welcomeMail:welcomeMail,
  recoveryMail:recoveryMail
}