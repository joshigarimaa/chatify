const welcomeEmailTemplate = (fullName, clientUrl) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to ChatApp</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:40px 20px;">
      <tr>
        <td align="center">
          
          <table width="600" cellpadding="0" cellspacing="0" 
            style="max-width:600px; background:#ffffff; border-radius:8px; padding:40px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
            
            <!-- Header -->
            <tr>
              <td align="center" style="padding-bottom:30px;">
                <h1 style="margin:0; color:#111827; font-size:24px;">
                  Welcome to ChatApp 🚀
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="color:#374151; font-size:16px; line-height:1.6;">
                <p style="margin:0 0 20px 0;">
                  Hi <strong>${fullName}</strong>,
                </p>

                <p style="margin:0 0 20px 0;">
                  We're excited to have you on board! Your account has been successfully created.
                </p>

                <p style="margin:0 0 30px 0;">
                  You can now start connecting, chatting, and building meaningful conversations.
                </p>
              </td>
            </tr>

            <!-- Button -->
            <tr>
              <td align="center">
                <a href="${clientUrl}"
                   style="background-color:#2563eb;
                          color:#ffffff;
                          text-decoration:none;
                          padding:12px 24px;
                          border-radius:6px;
                          font-weight:bold;
                          display:inline-block;
                          font-size:14px;">
                  Get Started
                </a>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="padding:30px 0;">
                <hr style="border:none; border-top:1px solid #e5e7eb;" />
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="color:#6b7280; font-size:13px; text-align:center;">
                <p style="margin:0 0 10px 0;">
                  If you did not create this account, you can safely ignore this email.
                </p>
                <p style="margin:0;">
                  © ${new Date().getFullYear()} ChatApp. All rights reserved.
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};

module.exports = { welcomeEmailTemplate };
