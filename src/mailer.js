'use strict';

const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

const welcomeMail = function(username, usermail){
  const destinationMail = JSON.stringify(usermail);
  const destinationName = JSON.stringify(username);
  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [
        {
          to: [
            {
              email: destinationMail,
            },
          ],
          subject: 'Welcome to Qode, '+ destinationName,
        },
      ],
      from: {
        email: 'noreply@qode.be',
      },
      content: [
        {
          type: 'text/plain',
          value: "Hello "+ destinationName +" !",
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