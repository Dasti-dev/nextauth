import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({email ,emailType ,userId}:any) => {
    try {
        const hash = await bcryptjs.hash(userId.toString(),10);
        // configure mailer
        if(emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId,{
                verifyToken: hash,
                verifyTokenExpiry: Date.now() + 3600000,
            }) 
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId,{
                forgetPasswordToken: hash,
                forgetPasswordExpiry: Date.now() + 3600000,
            })   
        }
        var transport = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
              user: "verse.billu.portfolio@gmail.com",
              pass: "twxw krbi jwck dwhf",
            }});

        const verifyMailHTML = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hash}">here</a> to 
        ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
        or copy and paste the link below in your browser.
        <br> ${process.env.DOMAIN}/verifyemail?token=${hash}
        </p>`;

        const resetMailHTML = `<p>Click <a href="${process.env.DOMAIN}/resetemail?token=${hash}">here</a> to 
        "reset your password"
        or copy and paste the link below in your browser.
        <br> ${process.env.DOMAIN}/resetemail?token=${hash}
        </p>`

        const mailOptions = {
            from: 'verse.billu.portfolio@gmail.com', // sender address
            to: email,
            subject: emailType === 'VERIFY'? "Verify your email" : "RESET YOUR PASSWORD !!!",
            html: emailType === 'VERIFY'? verifyMailHTML : resetMailHTML, 
        }

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;

    } catch (error:any) {
        console.log('Error from mailing services');
        throw new Error(error.message);
    }
}