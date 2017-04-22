'use strict';

const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

const welcomeMail = function(username, usermail){
  console.log('La demande de mail est lancée '+username+' '+usermail);
  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [
        {
          to: [
            {
              email: usermail,
            },
          ],
          subject: 'Welcome to Qode, '+username,
        },
      ],
      from: {
        email: 'noreply@qode.be',
      },
      content: [
        {
          type: 'text/plain',
          value: "Hello "+username+" !",
        },
      ],
    },
  });
  
sg.API(request, function(error, response) {
  if (error) {
    console.log('Error response received');
  }
  console.log(response.statusCode);
  console.log(response.body);
  console.log(response.headers);
});
  
};

module.exports = welcomeMail;