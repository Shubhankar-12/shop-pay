import nodemailer from "nodemailer"
import { google } from "googleapis"

const { OAuth2 } = google.auth
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground"

const { MAILING_CID, MAILING_CSECRET, MAILING_CREFRESH_TOKEN, SENDER_EMAIL } = process.env

const oauthClient = new OAuth2(MAILING_CID, MAILING_CSECRET, MAILING_CREFRESH_TOKEN, OAUTH_PLAYGROUND);

export const sendEmail = (to, url, subject) => {
    oauthClient.setCredentials({
        refresh_token: MAILING_CREFRESH_TOKEN
    });
    const accessToken = oauthClient.getAccessToken();
    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: SENDER_EMAIL,
            clientId: MAILING_CID,
            clientSecret: MAILING_CSECRET,
            refreshToken: MAILING_CREFRESH_TOKEN,
            accessToken
        }
    });
    const mailOptions = {
        from: SENDER_EMAIL,
        to: to,
        subject: subject,
        html: ""
    };
    smtpTransport.sendMail(mailOptions, (err, infos) => {
        if (err) return err;
        return infos;
    })

}