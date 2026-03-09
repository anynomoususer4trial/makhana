import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {

    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS

  }

});

export async function sendOtpEmail(email: string, otp: string) {

  await transporter.sendMail({

    from: process.env.EMAIL_FROM,

    to: email,

    subject: "Verify your email - Makhana Store",

    html: `

    <div style="
      max-width:500px;
      margin:auto;
      font-family:Arial,sans-serif;
      border:1px solid #eee;
      padding:30px;
      border-radius:8px
    ">

      <h2 style="text-align:center;color:#333">
        Makhana Store
      </h2>

      <p style="font-size:16px">
        Hello,
      </p>

      <p>
        Use the following OTP to verify your email address.
      </p>

      <div style="
        text-align:center;
        margin:30px 0;
      ">

        <span style="
          font-size:32px;
          font-weight:bold;
          letter-spacing:6px;
          background:#f4f4f4;
          padding:10px 20px;
          border-radius:6px;
        ">
          ${otp}
        </span>

      </div>

      <p>
        This OTP will expire in <b>5 minutes</b>.
      </p>

      <p style="font-size:14px;color:#777">

        If you didn't request this email, you can safely ignore it.

      </p>

      <hr/>

      <p style="
        font-size:12px;
        text-align:center;
        color:#aaa
      ">

        © ${new Date().getFullYear()} Makhana Store

      </p>

    </div>

    `

  });

}