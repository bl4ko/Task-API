require('dotenv').config()
// sendgrid key https://app.sendgrid.com/settings/api_keys
// npm i sendgrid
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.sendgridAPIKey);

sgMail.send({
    to: 'gasperoblak88@gmail.com',
    from: 'gasperoblak88@gmail.com',
    subject: 'This is my first creation!',
    text: 'I hope this one actually get to you.'
})
