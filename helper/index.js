const nodemailer = require('nodemailer');

const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

const examReport = async (candidateName, correctAnswer) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'himanshusingh@real11.com',
          pass: 'singh@789'
        }
    });
      
    const mailOptions = {
        from: 'himanshusingh@real11.com',
        to: 'himanshusingh@real11.com',
        subject: `Exam Report of ${candidateName}`,
        text: `Candidate given ${correctAnswer} correct answer`
    };
      
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}

  

module.exports = {
    shuffle,
    examReport
}