const { SENDGRID_API_KEY, VERIFIED_EMAIL } = require("../core/config");
const sgMail = require("@sendgrid/mail");
const moment = require("moment");
sgMail.setApiKey(SENDGRID_API_KEY);
const { logger } = require("../utils/logger");
// const { cacheData } = require("../service/Redis");
const { log } = require("winston");
const verificationCode = Math.floor(100000 + Math.random() * 100000);

async function sendEmailToken(Email, token) {
    console.log({Email})
  const msg = {
    to: Email, // Change to your recipient
    from: VERIFIED_EMAIL, // Change to your verified sender
    subject: "Activation Token",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
        <head>
            <!--[if gte mso 9]>
                <xml>
                    <o:OfficeDocumentSettings><o:AllowPNG /><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings>
                </xml>
            <![endif]-->
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <meta content="width=device-width" name="viewport" />
            <!--[if !mso]><!-->
            <meta content="IE=edge" http-equiv="X-UA-Compatible" />
            <!--<![endif]-->
            <title></title>
            <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css" />
            <!--<![endif]-->
            <style type="text/css">
                body {
                    margin: 0;
                    padding: 0;
                }
    
                table,
                td,
                tr {
                    vertical-align: top;
                    border-collapse: collapse;
                }
    
                * {
                    line-height: inherit;
                }
    
                a[x-apple-data-detectors="true"] {
                    color: inherit !important;
                    text-decoration: none !important;
                }
            </style>
            <style id="media-query" type="text/css">
                @media (max-width: 670px) {
                    .block-grid,
                    .col {
                        min-width: 320px !important;
                        max-width: 100% !important;
                        display: block !important;
                    }
    
                    .block-grid {
                        width: 100% !important;
                    }
    
                    .col {
                        width: 100% !important;
                    }
    
                    .col_cont {
                        margin: 0 auto;
                    }
    
                    img.fullwidth,
                    img.fullwidthOnMobile {
                        max-width: 100% !important;
                    }
    
                    .no-stack .col {
                        min-width: 0 !important;
                        display: table-cell !important;
                    }
    
                    .no-stack.two-up .col {
                        width: 50% !important;
                    }
    
                    .no-stack .col.num2 {
                        width: 16.6% !important;
                    }
    
                    .no-stack .col.num3 {
                        width: 25% !important;
                    }
    
                    .no-stack .col.num4 {
                        width: 33% !important;
                    }
    
                    .no-stack .col.num5 {
                        width: 41.6% !important;
                    }
    
                    .no-stack .col.num6 {
                        width: 50% !important;
                    }
    
                    .no-stack .col.num7 {
                        width: 58.3% !important;
                    }
    
                    .no-stack .col.num8 {
                        width: 66.6% !important;
                    }
    
                    .no-stack .col.num9 {
                        width: 75% !important;
                    }
    
                    .no-stack .col.num10 {
                        width: 83.3% !important;
                    }
    
                    .video-block {
                        max-width: none !important;
                    }
    
                    .mobile_hide {
                        min-height: 0px;
                        max-height: 0px;
                        max-width: 0px;
                        display: none;
                        overflow: hidden;
                        font-size: 0px;
                    }
    
                    .desktop_hide {
                        display: block !important;
                        max-height: none !important;
                    }
                }
            </style>
        </head>
        <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #f5f5f5;">
            <!--[if IE]><div class="ie-browser"><![endif]-->
            <table
                bgcolor="#F5F5F5"
                cellpadding="0"
                cellspacing="0"
                class="nl-container"
                role="presentation"
                style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5; width: 100%;"
                valign="top"
                width="100%"
            >
                <tbody>
                    <tr style="vertical-align: top;" valign="top">
                        <td style="word-break: break-word; vertical-align: top;" valign="top">
                            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#F5F5F5"><![endif]-->
                            <div style="background-color: transparent;">
                                <div class="block-grid" style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; margin: 0 auto; background-color: transparent;">
                                    <div style="border-collapse: collapse; display: table; width: 100%; background-color: transparent;">
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                                        <!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:transparent;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                                        <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
                                            <div class="col_cont" style="width: 100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div
                                                    style="
                                                        border-top: 0px solid transparent;
                                                        border-left: 0px solid transparent;
                                                        border-bottom: 0px solid transparent;
                                                        border-right: 0px solid transparent;
                                                        padding-top: 5px;
                                                        padding-bottom: 5px;
                                                        padding-right: 0px;
                                                        padding-left: 0px;
                                                    "
                                                >
                                                    <!--<![endif]-->
                                                    <table
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        class="divider"
                                                        role="presentation"
                                                        style="
                                                            table-layout: fixed;
                                                            vertical-align: top;
                                                            border-spacing: 0;
                                                            border-collapse: collapse;
                                                            mso-table-lspace: 0pt;
                                                            mso-table-rspace: 0pt;
                                                            min-width: 100%;
                                                            -ms-text-size-adjust: 100%;
                                                            -webkit-text-size-adjust: 100%;
                                                        "
                                                        valign="top"
                                                        width="100%"
                                                    >
                                                        <tbody>
                                                            <tr style="vertical-align: top;" valign="top">
                                                                <td
                                                                    class="divider_inner"
                                                                    style="
                                                                        word-break: break-word;
                                                                        vertical-align: top;
                                                                        min-width: 100%;
                                                                        -ms-text-size-adjust: 100%;
                                                                        -webkit-text-size-adjust: 100%;
                                                                        padding-top: 10px;
                                                                        padding-right: 10px;
                                                                        padding-bottom: 10px;
                                                                        padding-left: 10px;
                                                                    "
                                                                    valign="top"
                                                                >
                                                                    <table
                                                                        align="center"
                                                                        border="0"
                                                                        cellpadding="0"
                                                                        cellspacing="0"
                                                                        class="divider_content"
                                                                        height="10"
                                                                        role="presentation"
                                                                        style="
                                                                            table-layout: fixed;
                                                                            vertical-align: top;
                                                                            border-spacing: 0;
                                                                            border-collapse: collapse;
                                                                            mso-table-lspace: 0pt;
                                                                            mso-table-rspace: 0pt;
                                                                            border-top: 0px solid transparent;
                                                                            height: 10px;
                                                                            width: 100%;
                                                                        "
                                                                        valign="top"
                                                                        width="100%"
                                                                    >
                                                                        <tbody>
                                                                            <tr style="vertical-align: top;" valign="top">
                                                                                <td height="10" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
                            <div style="background-color: transparent;">
                                <div class="block-grid two-up no-stack" style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; margin: 0 auto; background-color: #ffffff;">
                                    <div style="border-collapse: collapse; display: table; width: 100%; background-color: #ffffff;">
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]-->
                                        <!--[if (mso)|(IE)]><td align="center" width="325" style="background-color:#FFFFFF;width:325px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 25px; padding-top:25px; padding-bottom:25px;"><![endif]-->
                                        <div class="col num6" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 324px; width: 325px;">
                                            <div class="col_cont" style="width: 100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div
                                                    style="
                                                        border-top: 0px solid transparent;
                                                        border-left: 0px solid transparent;
                                                        border-bottom: 0px solid transparent;
                                                        border-right: 0px solid transparent;
                                                        padding-top: 25px;
                                                        padding-bottom: 25px;
                                                        padding-right: 0px;
                                                        padding-left: 25px;
                                                    "
                                                >
                                                    <!--<![endif]-->
                                                    <div align="left" class="img-container left fixedwidth" style="padding-right: 0px; padding-left: 0px;text-align: center;">
                                                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="left"><![endif]-->
                                                        <img
                                                            alt="Image"
                                                            border="0"
                                                            class="left fixedwidth"
                                                            src="https://res.cloudinary.com/pebbles-signature/image/upload/v1651047881/Logo_p7jflj.svg"
                                                            style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 100px; display: block;"
                                                            title="Image"
                                                            width="195"
                                                        />
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </div>
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td><td align="center" width="325" style="background-color:#FFFFFF;width:325px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 25px; padding-left: 0px; padding-top:25px; padding-bottom:25px;"><![endif]-->
                                        <div class="col num6" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 324px; width: 325px;">
                                            <div class="col_cont" style="width: 100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div
                                                    style="
                                                        border-top: 0px solid transparent;
                                                        border-left: 0px solid transparent;
                                                        border-bottom: 0px solid transparent;
                                                        border-right: 0px solid transparent;
                                                        padding-top: 25px;
                                                        padding-bottom: 25px;
                                                        padding-right: 25px;
                                                        padding-left: 0px;
                                                    "
                                                >
                                                    <!--<![endif]-->
                                                    <div></div>
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                                
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
                            <div style="background-color: transparent;">
                                <div class="block-grid" style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; margin: 0 auto; background-color: #ffffff;">
                                    <div style="border-collapse: collapse; display: table; width: 100%; background-color: #ffffff;">
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                                        <!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:#ffffff;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 25px; padding-left: 25px; padding-top:5px; padding-bottom:60px;"><![endif]-->
                                        <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
                                            <div class="col_cont" style="width: 100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div
                                                    style="
                                                        border-top: 0px solid transparent;
                                                        border-left: 0px solid transparent;
                                                        border-bottom: 0px solid transparent;
                                                        border-right: 0px solid transparent;
                                                        padding-top: 5px;
                                                        padding-bottom: 60px;
                                                        padding-right: 25px;
                                                        padding-left: 25px;
                                                    "
                                                >
                                                    <!--<![endif]-->
                                                    <div align="center" class="img-container center fixedwidth" style="padding-right: 0px; padding-left: 0px;">
                                                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]-->
                                                        <div style="font-size: 1px; line-height: 45px;"></div>
                                                        <img
                                                            align="center"
                                                            alt="Image"
                                                            border="0"
                                                            class="center fixedwidth"
                                                            src="https://res.cloudinary.com/pebbles-signature/image/upload/v1649685746/pebbles-2_ppknln.png"
                                                            style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 540px; display: block;"
                                                            title="Image"
                                                            width="540"
                                                        />
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </div>
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 15px; padding-top: 20px; padding-bottom: 0px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                                    <div style="color: #2b562e; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; line-height: 1.5; padding-top: 20px; padding-right: 10px; padding-bottom: 0px; padding-left: 15px;">
                                                        <div style="font-size: 12px; line-height: 1.5; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; color: #2b562e; mso-line-height-alt: 18px;">
                                                            
                                                            <p style="font-size: 34px; line-height: 1.5; text-align: center; word-break: break-word; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 51px; margin: 0;">
                                                                <span style="font-size: 34px; color: #003399;">
                                                                    <strong>
                                                                        <span style="font-size: 24px;"><span style="font-size: 24px;">Welcome to Pebbles Signatures</span></span>
                                                                    </strong>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                                    <div style="color: #555555; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; line-height: 1.2; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;">
                                                        <div style="font-size: 12px; line-height: 1.2; color: #555555; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">
                                                            <p style="font-size: 18px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 22px; margin: 0;">
                                                                <span style="font-size: 18px; color: #000000;">
                                                                    Thanks for signing up to Pebbles Signature. Please use this <b> ${token} </b> to activate your account.
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                    <div align="center" class="button-container" style="padding-top: 20px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;">
                                                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 20px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:39pt; width:213.75pt; v-text-anchor:middle;" arcsize="29%" stroke="false" fillcolor="#003399"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Tahoma, Verdana, sans-serif; font-size:16px"><![endif]-->
                                                        <a
                                                            href="#"
                                                            style="
                                                                -webkit-text-size-adjust: none;
                                                                text-decoration: none;
                                                                display: inline-block;
                                                                color: #ffffff;
                                                                background-color: #003399;
                                                                border-radius: 15px;
                                                                -webkit-border-radius: 15px;
                                                                -moz-border-radius: 15px;
                                                                width: auto;
                                                                width: auto;
                                                                border-top: 1px solid #003399;
                                                                border-right: 1px solid #003399;
                                                                border-bottom: 1px solid #003399;
                                                                border-left: 1px solid #003399;
                                                                padding-top: 10px;
                                                                padding-bottom: 10px;
                                                                font-family: Lato, Tahoma, Verdana, Segoe, sans-serif;
                                                                text-align: center;
                                                                mso-border-alt: none;
                                                                word-break: keep-all;
                                                            "
                                                            target="_blank"
                                                        >
                                    
                                                        </a>
                                                        <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                                                    </div>
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
                            <div style="background-color: transparent;">
                                <div class="block-grid" style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; margin: 0 auto; background-color: transparent;">
                                    <div style="border-collapse: collapse; display: table; width: 100%; background-color: transparent;">
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                                        <!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:transparent;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:20px; padding-bottom:60px;"><![endif]-->
                                        <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
                                            <div class="col_cont" style="width: 100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div
                                                    style="
                                                        border-top: 0px solid transparent;
                                                        border-left: 0px solid transparent;
                                                        border-bottom: 0px solid transparent;
                                                        border-right: 0px solid transparent;
                                                        padding-top: 20px;
                                                        padding-bottom: 60px;
                                                        padding-right: 0px;
                                                        padding-left: 0px;
                                                    "
                                                >
                                                    <!--<![endif]-->
                                                    <table
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        class="social_icons"
                                                        role="presentation"
                                                        style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                        valign="top"
                                                        width="100%"
                                                    >
                                                        <tbody>
                                                            <tr style="vertical-align: top;" valign="top">
                                                                <td style="word-break: break-word; vertical-align: top; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
                                                                    <table
                                                                        align="center"
                                                                        cellpadding="0"
                                                                        cellspacing="0"
                                                                        class="social_table"
                                                                        role="presentation"
                                                                        style="
                                                                            table-layout: fixed;
                                                                            vertical-align: top;
                                                                            border-spacing: 0;
                                                                            border-collapse: collapse;
                                                                            mso-table-tspace: 0;
                                                                            mso-table-rspace: 0;
                                                                            mso-table-bspace: 0;
                                                                            mso-table-lspace: 0;
                                                                        "
                                                                        valign="top"
                                                                    >
                                                                        <tbody>
                                                                            <tr align="center" style="vertical-align: top; display: inline-block; text-align: center;" valign="top">
                                                                                <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 15px; padding-left: 0;" valign="top">
                                                                                    <a href="https://www.facebook.com/" target="_blank">
                                                                                        <img
                                                                                            alt="Facebook"
                                                                                            height="32"
                                                                                            src="https://res.cloudinary.com/pebbles-signature/image/upload/v1650925850/facebook2x_digzov.png"
                                                                                            style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"
                                                                                            title="Facebook"
                                                                                            width="32"
                                                                                        />
                                                                                    </a>
                                                                                </td>
                                                                                <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 15px; padding-left: 0;" valign="top">
                                                                                    <a href="https://twitter.com/" target="_blank">
                                                                                        <img
                                                                                            alt="Twitter"
                                                                                            height="32"
                                                                                            src="https://res.cloudinary.com/pebbles-signature/image/upload/v1650926028/twitter2x_aqk72d.png"
                                                                                            style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"
                                                                                            title="Twitter"
                                                                                            width="32"
                                                                                        />
                                                                                    </a>
                                                                                </td>
                                                                                <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 15px; padding-left: 0;" valign="top">
                                                                                    <a href="https://instagram.com/" target="_blank">
                                                                                        <img
                                                                                            alt="Instagram"
                                                                                            height="32"
                                                                                            src="https://res.cloudinary.com/pebbles-signature/image/upload/v1650925969/instagram2x_zx21vw.pngimages/linkedin.png"
                                                                                            style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"
                                                                                            title="Instagram"
                                                                                            width="32"
                                                                                        />
                                                                                    </a>
                                                                                </td>
                                                                                
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                                    <div style="color: #555555; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; line-height: 1.5; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;">
                                                        <div style="font-size: 12px; line-height: 1.5; color: #555555; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 18px;">
                                                            <p style="font-size: 14px; line-height: 1.5; text-align: center; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">
                                                                Pebble Signature - Find a home away from home.
                                                            </p>
                                                            <p style="font-size: 14px; line-height: 1.5; text-align: center; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">www.pebbles-signature.com</p>
                                                        </div>
                                                    </div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                    <table
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        class="divider"
                                                        role="presentation"
                                                        style="
                                                            table-layout: fixed;
                                                            vertical-align: top;
                                                            border-spacing: 0;
                                                            border-collapse: collapse;
                                                            mso-table-lspace: 0pt;
                                                            mso-table-rspace: 0pt;
                                                            min-width: 100%;
                                                            -ms-text-size-adjust: 100%;
                                                            -webkit-text-size-adjust: 100%;
                                                        "
                                                        valign="top"
                                                        width="100%"
                                                    >
                                                        <tbody>
                                                            <tr style="vertical-align: top;" valign="top">
                                                                <td
                                                                    class="divider_inner"
                                                                    style="
                                                                        word-break: break-word;
                                                                        vertical-align: top;
                                                                        min-width: 100%;
                                                                        -ms-text-size-adjust: 100%;
                                                                        -webkit-text-size-adjust: 100%;
                                                                        padding-top: 10px;
                                                                        padding-right: 10px;
                                                                        padding-bottom: 10px;
                                                                        padding-left: 10px;
                                                                    "
                                                                    valign="top"
                                                                >
                                                                    <table
                                                                        align="center"
                                                                        border="0"
                                                                        cellpadding="0"
                                                                        cellspacing="0"
                                                                        class="divider_content"
                                                                        height="0"
                                                                        role="presentation"
                                                                        style="
                                                                            table-layout: fixed;
                                                                            vertical-align: top;
                                                                            border-spacing: 0;
                                                                            border-collapse: collapse;
                                                                            mso-table-lspace: 0pt;
                                                                            mso-table-rspace: 0pt;
                                                                            border-top: 1px dotted #c4c4c4;
                                                                            height: 0px;
                                                                            width: 60%;
                                                                        "
                                                                        valign="top"
                                                                        width="60%"
                                                                    >
                                                                        <tbody>
                                                                            <tr style="vertical-align: top;" valign="top">
                                                                                <td height="0" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                                    <div style="color: #4f4f4f; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; line-height: 1.2; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;">
                                                        <div style="font-size: 12px; line-height: 1.2; color: #4f4f4f; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">
                                                            <p style="font-size: 14px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 17px; margin: 0;">
                                                                <span style="font-size: 14px;">
                                                                    <a href="#" rel="noopener" style="text-decoration: none; color: #2190e3;" target="_blank">
                                                                        <strong><span style="color: #003399;">Help&amp; FAQ's</span></strong>
                                                                    </a>
                                                                    |
                                                                    <strong>
                                                                        <span style="color: #003399;"><a href="#" rel="noopener" style="text-decoration: none; color: #003399;" target="_blank">Returns</a></span>
                                                                    </strong>
                                                                    | <span style="background-color: transparent; font-size: 14px; color: #003399;">1-998-9283-19832</span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
                            <div style="background-color: transparent;">
                                <div class="block-grid two-up no-stack" style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; margin: 0 auto; background-color: transparent;">
                                    <div style="border-collapse: collapse; display: table; width: 100%; background-color: transparent;">
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                                        <!--[if (mso)|(IE)]><td align="center" width="325" style="background-color:transparent;width:325px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:10px; padding-bottom:10px;"><![endif]-->
                                        <div class="col num6" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 324px; width: 325px;">
                                            <div class="col_cont" style="width: 100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div
                                                    style="
                                                        border-top: 0px solid transparent;
                                                        border-left: 0px solid transparent;
                                                        border-bottom: 0px solid transparent;
                                                        border-right: 0px solid transparent;
                                                        padding-top: 10px;
                                                        padding-bottom: 10px;
                                                        padding-right: 0px;
                                                        padding-left: 0px;
                                                    "
                                                >
                                                    <!--<![endif]-->
                                                    
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td><td align="center" width="325" style="background-color:transparent;width:325px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:10px; padding-bottom:10px;"><![endif]-->
                                        <div class="col num6" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 324px; width: 325px;">
                                            <div class="col_cont" style="width: 100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div
                                                    style="
                                                        border-top: 0px solid transparent;
                                                        border-left: 0px solid transparent;
                                                        border-bottom: 0px solid transparent;
                                                        border-right: 0px solid transparent;
                                                        padding-top: 10px;
                                                        padding-bottom: 10px;
                                                        padding-right: 0px;
                                                        padding-left: 0px;
                                                    "
                                                >
                                                    <!--<![endif]-->
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 4px; padding-left: 4px; padding-top: 4px; padding-bottom: 4px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                                    <div style="color: #9d9d9d; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; line-height: 1.2; padding-top: 4px; padding-right: 4px; padding-bottom: 4px; padding-left: 4px;">
                                                        <div style="line-height: 1.2; font-size: 12px; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; color: #9d9d9d; mso-line-height-alt: 14px;"></div>
                                                    </div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
                            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
            <!--[if (IE)]></div><![endif]-->
        </body>
      `,
  };
 return sgMail
    .send(msg)
    .then((result) => { console.log(result)})
    .catch((error) => {
      console.error(error);
      if (error.response) {
        const { response } = error;
        const { body } = response;
        return body;
      }
    });
}

async function  sendResetPasswordToken(Email, firstName, token) {
  const msg = {
    to: Email, // Change to your recipient
    from: VERIFIED_EMAIL, // Change to your verified sender
    subject: "Password Reset Token",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
        <head>
            <!--[if gte mso 9]>
                <xml>
                    <o:OfficeDocumentSettings><o:AllowPNG /><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings>
                </xml>
            <![endif]-->
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <meta content="width=device-width" name="viewport" />
            <!--[if !mso]><!-->
            <meta content="IE=edge" http-equiv="X-UA-Compatible" />
            <!--<![endif]-->
            <title></title>
            <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css" />
            <!--<![endif]-->
            <style type="text/css">
                body {
                    margin: 0;
                    padding: 0;
                }
    
                table,
                td,
                tr {
                    vertical-align: top;
                    border-collapse: collapse;
                }
    
                * {
                    line-height: inherit;
                }
    
                a[x-apple-data-detectors="true"] {
                    color: inherit !important;
                    text-decoration: none !important;
                }
            </style>
            <style id="media-query" type="text/css">
                @media (max-width: 670px) {
                    .block-grid,
                    .col {
                        min-width: 320px !important;
                        max-width: 100% !important;
                        display: block !important;
                    }
    
                    .block-grid {
                        width: 100% !important;
                    }
    
                    .col {
                        width: 100% !important;
                    }
    
                    .col_cont {
                        margin: 0 auto;
                    }
    
                    img.fullwidth,
                    img.fullwidthOnMobile {
                        max-width: 100% !important;
                    }
    
                    .no-stack .col {
                        min-width: 0 !important;
                        display: table-cell !important;
                    }
    
                    .no-stack.two-up .col {
                        width: 50% !important;
                    }
    
                    .no-stack .col.num2 {
                        width: 16.6% !important;
                    }
    
                    .no-stack .col.num3 {
                        width: 25% !important;
                    }
    
                    .no-stack .col.num4 {
                        width: 33% !important;
                    }
    
                    .no-stack .col.num5 {
                        width: 41.6% !important;
                    }
    
                    .no-stack .col.num6 {
                        width: 50% !important;
                    }
    
                    .no-stack .col.num7 {
                        width: 58.3% !important;
                    }
    
                    .no-stack .col.num8 {
                        width: 66.6% !important;
                    }
    
                    .no-stack .col.num9 {
                        width: 75% !important;
                    }
    
                    .no-stack .col.num10 {
                        width: 83.3% !important;
                    }
    
                    .video-block {
                        max-width: none !important;
                    }
    
                    .mobile_hide {
                        min-height: 0px;
                        max-height: 0px;
                        max-width: 0px;
                        display: none;
                        overflow: hidden;
                        font-size: 0px;
                    }
    
                    .desktop_hide {
                        display: block !important;
                        max-height: none !important;
                    }
                }
            </style>
        </head>
        <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #f5f5f5;">
            <!--[if IE]><div class="ie-browser"><![endif]-->
            <table
                bgcolor="#F5F5F5"
                cellpadding="0"
                cellspacing="0"
                class="nl-container"
                role="presentation"
                style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5; width: 100%;"
                valign="top"
                width="100%"
            >
                <tbody>
                    <tr style="vertical-align: top;" valign="top">
                        <td style="word-break: break-word; vertical-align: top;" valign="top">
                            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#F5F5F5"><![endif]-->
                            <div style="background-color: transparent;">
                                <div class="block-grid" style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; margin: 0 auto; background-color: transparent;">
                                    <div style="border-collapse: collapse; display: table; width: 100%; background-color: transparent;">
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                                        <!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:transparent;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                                        <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
                                            <div class="col_cont" style="width: 100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div
                                                    style="
                                                        border-top: 0px solid transparent;
                                                        border-left: 0px solid transparent;
                                                        border-bottom: 0px solid transparent;
                                                        border-right: 0px solid transparent;
                                                        padding-top: 5px;
                                                        padding-bottom: 5px;
                                                        padding-right: 0px;
                                                        padding-left: 0px;
                                                    "
                                                >
                                                    <!--<![endif]-->
                                                    <table
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        class="divider"
                                                        role="presentation"
                                                        style="
                                                            table-layout: fixed;
                                                            vertical-align: top;
                                                            border-spacing: 0;
                                                            border-collapse: collapse;
                                                            mso-table-lspace: 0pt;
                                                            mso-table-rspace: 0pt;
                                                            min-width: 100%;
                                                            -ms-text-size-adjust: 100%;
                                                            -webkit-text-size-adjust: 100%;
                                                        "
                                                        valign="top"
                                                        width="100%"
                                                    >
                                                        <tbody>
                                                            <tr style="vertical-align: top;" valign="top">
                                                                <td
                                                                    class="divider_inner"
                                                                    style="
                                                                        word-break: break-word;
                                                                        vertical-align: top;
                                                                        min-width: 100%;
                                                                        -ms-text-size-adjust: 100%;
                                                                        -webkit-text-size-adjust: 100%;
                                                                        padding-top: 10px;
                                                                        padding-right: 10px;
                                                                        padding-bottom: 10px;
                                                                        padding-left: 10px;
                                                                    "
                                                                    valign="top"
                                                                >
                                                                    <table
                                                                        align="center"
                                                                        border="0"
                                                                        cellpadding="0"
                                                                        cellspacing="0"
                                                                        class="divider_content"
                                                                        height="10"
                                                                        role="presentation"
                                                                        style="
                                                                            table-layout: fixed;
                                                                            vertical-align: top;
                                                                            border-spacing: 0;
                                                                            border-collapse: collapse;
                                                                            mso-table-lspace: 0pt;
                                                                            mso-table-rspace: 0pt;
                                                                            border-top: 0px solid transparent;
                                                                            height: 10px;
                                                                            width: 100%;
                                                                        "
                                                                        valign="top"
                                                                        width="100%"
                                                                    >
                                                                        <tbody>
                                                                            <tr style="vertical-align: top;" valign="top">
                                                                                <td height="10" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
                            <div style="background-color: transparent;">
                                <div class="block-grid two-up no-stack" style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; margin: 0 auto; background-color: #ffffff;">
                                    <div style="border-collapse: collapse; display: table; width: 100%; background-color: #ffffff;">
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]-->
                                        <!--[if (mso)|(IE)]><td align="center" width="325" style="background-color:#FFFFFF;width:325px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 25px; padding-top:25px; padding-bottom:25px;"><![endif]-->
                                        <div class="col num6" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 324px; width: 325px;">
                                            <div class="col_cont" style="width: 100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div
                                                    style="
                                                        border-top: 0px solid transparent;
                                                        border-left: 0px solid transparent;
                                                        border-bottom: 0px solid transparent;
                                                        border-right: 0px solid transparent;
                                                        padding-top: 25px;
                                                        padding-bottom: 25px;
                                                        padding-right: 0px;
                                                        padding-left: 25px;
                                                    "
                                                >
                                                    <!--<![endif]-->
                                                    <div align="left" class="img-container left fixedwidth" style="padding-right: 0px; padding-left: 0px;text-align: center;">
                                                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="left"><![endif]-->
                                                        <img
                                                            alt="Image"
                                                            border="0"
                                                            class="left fixedwidth"
                                                            src="https://res.cloudinary.com/pebbles-signature/image/upload/v1651047881/Logo_p7jflj.svg"
                                                            style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 100px; display: block;"
                                                            title="Image"
                                                            width="195"
                                                        />
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </div>
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td><td align="center" width="325" style="background-color:#FFFFFF;width:325px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 25px; padding-left: 0px; padding-top:25px; padding-bottom:25px;"><![endif]-->
                                        <div class="col num6" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 324px; width: 325px;">
                                            <div class="col_cont" style="width: 100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div
                                                    style="
                                                        border-top: 0px solid transparent;
                                                        border-left: 0px solid transparent;
                                                        border-bottom: 0px solid transparent;
                                                        border-right: 0px solid transparent;
                                                        padding-top: 25px;
                                                        padding-bottom: 25px;
                                                        padding-right: 25px;
                                                        padding-left: 0px;
                                                    "
                                                >
                                                    <!--<![endif]-->
                                                    <div></div>
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                                
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
                            <div style="background-color: transparent;">
                                <div class="block-grid" style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; margin: 0 auto; background-color: #ffffff;">
                                    <div style="border-collapse: collapse; display: table; width: 100%; background-color: #ffffff;">
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                                        <!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:#ffffff;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 25px; padding-left: 25px; padding-top:5px; padding-bottom:60px;"><![endif]-->
                                        <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
                                            <div class="col_cont" style="width: 100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div
                                                    style="
                                                        border-top: 0px solid transparent;
                                                        border-left: 0px solid transparent;
                                                        border-bottom: 0px solid transparent;
                                                        border-right: 0px solid transparent;
                                                        padding-top: 5px;
                                                        padding-bottom: 60px;
                                                        padding-right: 25px;
                                                        padding-left: 25px;
                                                    "
                                                >
                                                    <!--<![endif]-->
                                                    <div align="center" class="img-container center fixedwidth" style="padding-right: 0px; padding-left: 0px;">
                                                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]-->
                                                        <div style="font-size: 1px; line-height: 45px;"></div>
                                                        <img
                                                            align="center"
                                                            alt="Image"
                                                            border="0"
                                                            class="center fixedwidth"
                                                            src="https://res.cloudinary.com/pebbles-signature/image/upload/v1649685746/pebbles-2_ppknln.png"
                                                            style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 540px; display: block;"
                                                            title="Image"
                                                            width="540"
                                                        />
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </div>
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 15px; padding-top: 20px; padding-bottom: 0px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                                    <div style="color: #2b562e; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; line-height: 1.5; padding-top: 20px; padding-right: 10px; padding-bottom: 0px; padding-left: 15px;">
                                                        <div style="font-size: 12px; line-height: 1.5; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; color: #2b562e; mso-line-height-alt: 18px;">
                                                            
                                                            <p style="font-size: 34px; line-height: 1.5; text-align: center; word-break: break-word; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 51px; margin: 0;">
                                                                <span style="font-size: 34px; color: #003399;">
                                                                    <strong>
                                                                        <span style="font-size: 24px;"><span style="font-size: 24px;">Hello ${firstName},</span></span>
                                                                    </strong>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                                    <div style="color: #555555; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; line-height: 1.2; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;">
                                                        <div style="font-size: 12px; line-height: 1.2; color: #555555; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">
                                                            <p style="font-size: 18px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 22px; margin: 0;">
                                                                <span style="font-size: 18px; color: #000000;">
                                                                <p>Please use this <b> ${token} </b> to reset your password </p>
                                                                <p><b>Regards,</b></p>
                                                                <p><b>Pebble Signature</b></p>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                    <div align="center" class="button-container" style="padding-top: 20px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;">
                                                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 20px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:39pt; width:213.75pt; v-text-anchor:middle;" arcsize="29%" stroke="false" fillcolor="#003399"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Tahoma, Verdana, sans-serif; font-size:16px"><![endif]-->
                                                        <a
                                                            href="#"
                                                            style="
                                                                -webkit-text-size-adjust: none;
                                                                text-decoration: none;
                                                                display: inline-block;
                                                                color: #ffffff;
                                                                background-color: #003399;
                                                                border-radius: 15px;
                                                                -webkit-border-radius: 15px;
                                                                -moz-border-radius: 15px;
                                                                width: auto;
                                                                width: auto;
                                                                border-top: 1px solid #003399;
                                                                border-right: 1px solid #003399;
                                                                border-bottom: 1px solid #003399;
                                                                border-left: 1px solid #003399;
                                                                padding-top: 10px;
                                                                padding-bottom: 10px;
                                                                font-family: Lato, Tahoma, Verdana, Segoe, sans-serif;
                                                                text-align: center;
                                                                mso-border-alt: none;
                                                                word-break: keep-all;
                                                            "
                                                            target="_blank"
                                                        >
                                                            <span style="padding-left: 40px; padding-right: 40px; font-size: 16px; display: inline-block;">
                                                                <span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><strong>CONFIRM EMAIL</strong></span>
                                                            </span>
                                                        </a>
                                                        <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                                                    </div>
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
                            <div style="background-color: transparent;">
                                <div class="block-grid" style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; margin: 0 auto; background-color: transparent;">
                                    <div style="border-collapse: collapse; display: table; width: 100%; background-color: transparent;">
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                                        <!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:transparent;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:20px; padding-bottom:60px;"><![endif]-->
                                        <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
                                            <div class="col_cont" style="width: 100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div
                                                    style="
                                                        border-top: 0px solid transparent;
                                                        border-left: 0px solid transparent;
                                                        border-bottom: 0px solid transparent;
                                                        border-right: 0px solid transparent;
                                                        padding-top: 20px;
                                                        padding-bottom: 60px;
                                                        padding-right: 0px;
                                                        padding-left: 0px;
                                                    "
                                                >
                                                    <!--<![endif]-->
                                                    <table
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        class="social_icons"
                                                        role="presentation"
                                                        style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                        valign="top"
                                                        width="100%"
                                                    >
                                                        <tbody>
                                                            <tr style="vertical-align: top;" valign="top">
                                                                <td style="word-break: break-word; vertical-align: top; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
                                                                    <table
                                                                        align="center"
                                                                        cellpadding="0"
                                                                        cellspacing="0"
                                                                        class="social_table"
                                                                        role="presentation"
                                                                        style="
                                                                            table-layout: fixed;
                                                                            vertical-align: top;
                                                                            border-spacing: 0;
                                                                            border-collapse: collapse;
                                                                            mso-table-tspace: 0;
                                                                            mso-table-rspace: 0;
                                                                            mso-table-bspace: 0;
                                                                            mso-table-lspace: 0;
                                                                        "
                                                                        valign="top"
                                                                    >
                                                                        <tbody>
                                                                            <tr align="center" style="vertical-align: top; display: inline-block; text-align: center;" valign="top">
                                                                                <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 15px; padding-left: 0;" valign="top">
                                                                                    <a href="https://www.facebook.com/" target="_blank">
                                                                                        <img
                                                                                            alt="Facebook"
                                                                                            height="32"
                                                                                            src="https://res.cloudinary.com/pebbles-signature/image/upload/v1650925850/facebook2x_digzov.png"
                                                                                            style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"
                                                                                            title="Facebook"
                                                                                            width="32"
                                                                                        />
                                                                                    </a>
                                                                                </td>
                                                                                <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 15px; padding-left: 0;" valign="top">
                                                                                    <a href="https://twitter.com/" target="_blank">
                                                                                        <img
                                                                                            alt="Twitter"
                                                                                            height="32"
                                                                                            src="https://res.cloudinary.com/pebbles-signature/image/upload/v1650926028/twitter2x_aqk72d.png"
                                                                                            style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"
                                                                                            title="Twitter"
                                                                                            width="32"
                                                                                        />
                                                                                    </a>
                                                                                </td>
                                                                                <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 15px; padding-left: 0;" valign="top">
                                                                                    <a href="https://instagram.com/" target="_blank">
                                                                                        <img
                                                                                            alt="Instagram"
                                                                                            height="32"
                                                                                            src="https://res.cloudinary.com/pebbles-signature/image/upload/v1650925969/instagram2x_zx21vw.pngimages/linkedin.png"
                                                                                            style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"
                                                                                            title="Instagram"
                                                                                            width="32"
                                                                                        />
                                                                                    </a>
                                                                                </td>
                                                                                
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                                    <div style="color: #555555; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; line-height: 1.5; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;">
                                                        <div style="font-size: 12px; line-height: 1.5; color: #555555; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 18px;">
                                                            <p style="font-size: 14px; line-height: 1.5; text-align: center; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">
                                                                Pebbles Signature - Find a home away from home.
                                                            </p>
                                                            <p style="font-size: 14px; line-height: 1.5; text-align: center; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">329 California St, San Francisco, CA 94118</p>
                                                        </div>
                                                    </div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                    <table
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        class="divider"
                                                        role="presentation"
                                                        style="
                                                            table-layout: fixed;
                                                            vertical-align: top;
                                                            border-spacing: 0;
                                                            border-collapse: collapse;
                                                            mso-table-lspace: 0pt;
                                                            mso-table-rspace: 0pt;
                                                            min-width: 100%;
                                                            -ms-text-size-adjust: 100%;
                                                            -webkit-text-size-adjust: 100%;
                                                        "
                                                        valign="top"
                                                        width="100%"
                                                    >
                                                        <tbody>
                                                            <tr style="vertical-align: top;" valign="top">
                                                                <td
                                                                    class="divider_inner"
                                                                    style="
                                                                        word-break: break-word;
                                                                        vertical-align: top;
                                                                        min-width: 100%;
                                                                        -ms-text-size-adjust: 100%;
                                                                        -webkit-text-size-adjust: 100%;
                                                                        padding-top: 10px;
                                                                        padding-right: 10px;
                                                                        padding-bottom: 10px;
                                                                        padding-left: 10px;
                                                                    "
                                                                    valign="top"
                                                                >
                                                                    <table
                                                                        align="center"
                                                                        border="0"
                                                                        cellpadding="0"
                                                                        cellspacing="0"
                                                                        class="divider_content"
                                                                        height="0"
                                                                        role="presentation"
                                                                        style="
                                                                            table-layout: fixed;
                                                                            vertical-align: top;
                                                                            border-spacing: 0;
                                                                            border-collapse: collapse;
                                                                            mso-table-lspace: 0pt;
                                                                            mso-table-rspace: 0pt;
                                                                            border-top: 1px dotted #c4c4c4;
                                                                            height: 0px;
                                                                            width: 60%;
                                                                        "
                                                                        valign="top"
                                                                        width="60%"
                                                                    >
                                                                        <tbody>
                                                                            <tr style="vertical-align: top;" valign="top">
                                                                                <td height="0" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                                    <div style="color: #4f4f4f; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; line-height: 1.2; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;">
                                                        <div style="font-size: 12px; line-height: 1.2; color: #4f4f4f; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">
                                                            <p style="font-size: 14px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 17px; margin: 0;">
                                                                <span style="font-size: 14px;">
                                                                    <a href="#" rel="noopener" style="text-decoration: none; color: #2190e3;" target="_blank">
                                                                        <strong><span style="color: #003399;">Help&amp; FAQ's</span></strong>
                                                                    </a>
                                                                    |
                                                                    <strong>
                                                                        <span style="color: #003399;"><a href="#" rel="noopener" style="text-decoration: none; color: #003399;" target="_blank">Returns</a></span>
                                                                    </strong>
                                                                    | <span style="background-color: transparent; font-size: 14px; color: #003399;">1-998-9283-19832</span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
                            <div style="background-color: transparent;">
                                <div class="block-grid two-up no-stack" style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; margin: 0 auto; background-color: transparent;">
                                    <div style="border-collapse: collapse; display: table; width: 100%; background-color: transparent;">
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                                        <!--[if (mso)|(IE)]><td align="center" width="325" style="background-color:transparent;width:325px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:10px; padding-bottom:10px;"><![endif]-->
                                        <div class="col num6" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 324px; width: 325px;">
                                            <div class="col_cont" style="width: 100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div
                                                    style="
                                                        border-top: 0px solid transparent;
                                                        border-left: 0px solid transparent;
                                                        border-bottom: 0px solid transparent;
                                                        border-right: 0px solid transparent;
                                                        padding-top: 10px;
                                                        padding-bottom: 10px;
                                                        padding-right: 0px;
                                                        padding-left: 0px;
                                                    "
                                                >
                                                    <!--<![endif]-->
                                                    
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td><td align="center" width="325" style="background-color:transparent;width:325px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:10px; padding-bottom:10px;"><![endif]-->
                                        <div class="col num6" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 324px; width: 325px;">
                                            <div class="col_cont" style="width: 100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div
                                                    style="
                                                        border-top: 0px solid transparent;
                                                        border-left: 0px solid transparent;
                                                        border-bottom: 0px solid transparent;
                                                        border-right: 0px solid transparent;
                                                        padding-top: 10px;
                                                        padding-bottom: 10px;
                                                        padding-right: 0px;
                                                        padding-left: 0px;
                                                    "
                                                >
                                                    <!--<![endif]-->
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 4px; padding-left: 4px; padding-top: 4px; padding-bottom: 4px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                                    <div style="color: #9d9d9d; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; line-height: 1.2; padding-top: 4px; padding-right: 4px; padding-bottom: 4px; padding-left: 4px;">
                                                        <div style="line-height: 1.2; font-size: 12px; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; color: #9d9d9d; mso-line-height-alt: 14px;"></div>
                                                    </div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
                            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
            <!--[if (IE)]></div><![endif]-->
        </body>
    </html>`,
  };
  console.log(token);
 return sgMail
    .send(msg)
    .then((result) => {
        console.log(result);
      return result;
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        const { response } = error;
        const { body } = response;
        console.error(body);
      }
    });
}

async function registrationSuccessful(Email, firstName) {
  const msg = {
    to: Email, // Change to your recipient
    from: VERIFIED_EMAIL, // Change to your verified sender
    subject: "Registration Successful",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
        <head>
            <!--[if gte mso 9]>
                <xml>
                    <o:OfficeDocumentSettings><o:AllowPNG /><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings>
                </xml>
            <![endif]-->
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <meta content="width=device-width" name="viewport" />
            <!--[if !mso]><!-->
            <meta content="IE=edge" http-equiv="X-UA-Compatible" />
            <!--<![endif]-->
            <title></title>
            <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css" />
            <!--<![endif]-->
            <style type="text/css">
                body {
                    margin: 0;
                    padding: 0;
                }
    
                table,
                td,
                tr {
                    vertical-align: top;
                    border-collapse: collapse;
                }
    
                * {
                    line-height: inherit;
                }
    
                a[x-apple-data-detectors="true"] {
                    color: inherit !important;
                    text-decoration: none !important;
                }
            </style>
            <style id="media-query" type="text/css">
                @media (max-width: 670px) {
                    .block-grid,
                    .col {
                        min-width: 320px !important;
                        max-width: 100% !important;
                        display: block !important;
                    }
    
                    .block-grid {
                        width: 100% !important;
                    }
    
                    .col {
                        width: 100% !important;
                    }
    
                    .col_cont {
                        margin: 0 auto;
                    }
    
                    img.fullwidth,
                    img.fullwidthOnMobile {
                        max-width: 100% !important;
                    }
    
                    .no-stack .col {
                        min-width: 0 !important;
                        display: table-cell !important;
                    }
    
                    .no-stack.two-up .col {
                        width: 50% !important;
                    }
    
                    .no-stack .col.num2 {
                        width: 16.6% !important;
                    }
    
                    .no-stack .col.num3 {
                        width: 25% !important;
                    }
    
                    .no-stack .col.num4 {
                        width: 33% !important;
                    }
    
                    .no-stack .col.num5 {
                        width: 41.6% !important;
                    }
    
                    .no-stack .col.num6 {
                        width: 50% !important;
                    }
    
                    .no-stack .col.num7 {
                        width: 58.3% !important;
                    }
    
                    .no-stack .col.num8 {
                        width: 66.6% !important;
                    }
    
                    .no-stack .col.num9 {
                        width: 75% !important;
                    }
    
                    .no-stack .col.num10 {
                        width: 83.3% !important;
                    }
    
                    .video-block {
                        max-width: none !important;
                    }
    
                    .mobile_hide {
                        min-height: 0px;
                        max-height: 0px;
                        max-width: 0px;
                        display: none;
                        overflow: hidden;
                        font-size: 0px;
                    }
    
                    .desktop_hide {
                        display: block !important;
                        max-height: none !important;
                    }
                }
            </style>
        </head>
        <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #f5f5f5;">
            <!--[if IE]><div class="ie-browser"><![endif]-->
            <table
                bgcolor="#F5F5F5"
                cellpadding="0"
                cellspacing="0"
                class="nl-container"
                role="presentation"
                style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5; width: 100%;"
                valign="top"
                width="100%"
            >
                <tbody>
                    <tr style="vertical-align: top;" valign="top">
                        <td style="word-break: break-word; vertical-align: top;" valign="top">
                            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#F5F5F5"><![endif]-->
                            <div style="background-color: transparent;">
                                <div class="block-grid" style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; margin: 0 auto; background-color: transparent;">
                                    <div style="border-collapse: collapse; display: table; width: 100%; background-color: transparent;">
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                                        <!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:transparent;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                                        <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
                                            <div class="col_cont" style="width: 100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div
                                                    style="
                                                        border-top: 0px solid transparent;
                                                        border-left: 0px solid transparent;
                                                        border-bottom: 0px solid transparent;
                                                        border-right: 0px solid transparent;
                                                        padding-top: 5px;
                                                        padding-bottom: 5px;
                                                        padding-right: 0px;
                                                        padding-left: 0px;
                                                    "
                                                >
                                                    <!--<![endif]-->
                                                    <table
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        class="divider"
                                                        role="presentation"
                                                        style="
                                                            table-layout: fixed;
                                                            vertical-align: top;
                                                            border-spacing: 0;
                                                            border-collapse: collapse;
                                                            mso-table-lspace: 0pt;
                                                            mso-table-rspace: 0pt;
                                                            min-width: 100%;
                                                            -ms-text-size-adjust: 100%;
                                                            -webkit-text-size-adjust: 100%;
                                                        "
                                                        valign="top"
                                                        width="100%"
                                                    >
                                                        <tbody>
                                                            <tr style="vertical-align: top;" valign="top">
                                                                <td
                                                                    class="divider_inner"
                                                                    style="
                                                                        word-break: break-word;
                                                                        vertical-align: top;
                                                                        min-width: 100%;
                                                                        -ms-text-size-adjust: 100%;
                                                                        -webkit-text-size-adjust: 100%;
                                                                        padding-top: 10px;
                                                                        padding-right: 10px;
                                                                        padding-bottom: 10px;
                                                                        padding-left: 10px;
                                                                    "
                                                                    valign="top"
                                                                >
                                                                    <table
                                                                        align="center"
                                                                        border="0"
                                                                        cellpadding="0"
                                                                        cellspacing="0"
                                                                        class="divider_content"
                                                                        height="10"
                                                                        role="presentation"
                                                                        style="
                                                                            table-layout: fixed;
                                                                            vertical-align: top;
                                                                            border-spacing: 0;
                                                                            border-collapse: collapse;
                                                                            mso-table-lspace: 0pt;
                                                                            mso-table-rspace: 0pt;
                                                                            border-top: 0px solid transparent;
                                                                            height: 10px;
                                                                            width: 100%;
                                                                        "
                                                                        valign="top"
                                                                        width="100%"
                                                                    >
                                                                        <tbody>
                                                                            <tr style="vertical-align: top;" valign="top">
                                                                                <td height="10" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
                            <div style="background-color: transparent;">
                                <div class="block-grid two-up no-stack" style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; margin: 0 auto; background-color: #ffffff;">
                                    <div style="border-collapse: collapse; display: table; width: 100%; background-color: #ffffff;">
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]-->
                                        <!--[if (mso)|(IE)]><td align="center" width="325" style="background-color:#FFFFFF;width:325px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 25px; padding-top:25px; padding-bottom:25px;"><![endif]-->
                                        <div class="col num6" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 324px; width: 325px;">
                                            <div class="col_cont" style="width: 100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div
                                                    style="
                                                        border-top: 0px solid transparent;
                                                        border-left: 0px solid transparent;
                                                        border-bottom: 0px solid transparent;
                                                        border-right: 0px solid transparent;
                                                        padding-top: 25px;
                                                        padding-bottom: 25px;
                                                        padding-right: 0px;
                                                        padding-left: 25px;
                                                    "
                                                >
                                                    <!--<![endif]-->
                                                    <div align="left" class="img-container left fixedwidth" style="padding-right: 0px; padding-left: 0px;text-align: center;">
                                                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="left"><![endif]-->
                                                        <img
                                                            alt="Image"
                                                            border="0"
                                                            class="left fixedwidth"
                                                            src="https://res.cloudinary.com/pebbles-signature/image/upload/v1651047881/Logo_p7jflj.svg"
                                                            style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 100px; display: block;"
                                                            title="Image"
                                                            width="195"
                                                        />
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </div>
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td><td align="center" width="325" style="background-color:#FFFFFF;width:325px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 25px; padding-left: 0px; padding-top:25px; padding-bottom:25px;"><![endif]-->
                                        <div class="col num6" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 324px; width: 325px;">
                                            <div class="col_cont" style="width: 100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div
                                                    style="
                                                        border-top: 0px solid transparent;
                                                        border-left: 0px solid transparent;
                                                        border-bottom: 0px solid transparent;
                                                        border-right: 0px solid transparent;
                                                        padding-top: 25px;
                                                        padding-bottom: 25px;
                                                        padding-right: 25px;
                                                        padding-left: 0px;
                                                    "
                                                >
                                                    <!--<![endif]-->
                                                    <div></div>
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                                
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
                            <div style="background-color: transparent;">
                                <div class="block-grid" style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; margin: 0 auto; background-color: #ffffff;">
                                    <div style="border-collapse: collapse; display: table; width: 100%; background-color: #ffffff;">
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                                        <!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:#ffffff;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 25px; padding-left: 25px; padding-top:5px; padding-bottom:60px;"><![endif]-->
                                        <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
                                            <div class="col_cont" style="width: 100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div
                                                    style="
                                                        border-top: 0px solid transparent;
                                                        border-left: 0px solid transparent;
                                                        border-bottom: 0px solid transparent;
                                                        border-right: 0px solid transparent;
                                                        padding-top: 5px;
                                                        padding-bottom: 60px;
                                                        padding-right: 25px;
                                                        padding-left: 25px;
                                                    "
                                                >
                                                    <!--<![endif]-->
                                                    <div align="center" class="img-container center fixedwidth" style="padding-right: 0px; padding-left: 0px;">
                                                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]-->
                                                        <div style="font-size: 1px; line-height: 45px;"></div>
                                                        <img
                                                            align="center"
                                                            alt="Image"
                                                            border="0"
                                                            class="center fixedwidth"
                                                            src="https://res.cloudinary.com/pebbles-signature/image/upload/v1649685746/pebbles-2_ppknln.png"
                                                            style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 540px; display: block;"
                                                            title="Image"
                                                            width="540"
                                                        />
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </div>
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 15px; padding-top: 20px; padding-bottom: 0px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                                    <div style="color: #2b562e; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; line-height: 1.5; padding-top: 20px; padding-right: 10px; padding-bottom: 0px; padding-left: 15px;">
                                                        <div style="font-size: 12px; line-height: 1.5; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; color: #2b562e; mso-line-height-alt: 18px;">
                                                            
                                                            <p style="font-size: 34px; line-height: 1.5; text-align: center; word-break: break-word; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 51px; margin: 0;">
                                                                <span style="font-size: 34px; color: #003399;">
                                                                    <strong>
                                                                        <span style="font-size: 24px;"><span style="font-size: 24px;">Hello ${firstName}</span></span>
                                                                    </strong>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                                    <div style="color: #555555; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; line-height: 1.2; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;">
                                                        <div style="font-size: 12px; line-height: 1.2; color: #555555; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">
                                                            <p style="font-size: 18px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 22px; margin: 0;">
                                                                <span style="font-size: 18px; color: #000000;">
                                                                    Thanks for signing up to Pebbles Signature. Your registration is successful.
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                    <div align="center" class="button-container" style="padding-top: 20px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;">
                                                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 20px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:39pt; width:213.75pt; v-text-anchor:middle;" arcsize="29%" stroke="false" fillcolor="#003399"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Tahoma, Verdana, sans-serif; font-size:16px"><![endif]-->
                                                        <a
                                                            href="#"
                                                            style="
                                                                -webkit-text-size-adjust: none;
                                                                text-decoration: none;
                                                                display: inline-block;
                                                                color: #ffffff;
                                                                background-color: #003399;
                                                                border-radius: 15px;
                                                                -webkit-border-radius: 15px;
                                                                -moz-border-radius: 15px;
                                                                width: auto;
                                                                width: auto;
                                                                border-top: 1px solid #003399;
                                                                border-right: 1px solid #003399;
                                                                border-bottom: 1px solid #003399;
                                                                border-left: 1px solid #003399;
                                                                padding-top: 10px;
                                                                padding-bottom: 10px;
                                                                font-family: Lato, Tahoma, Verdana, Segoe, sans-serif;
                                                                text-align: center;
                                                                mso-border-alt: none;
                                                                word-break: keep-all;
                                                            "
                                                            target="_blank"
                                                        >
                                                            <span style="padding-left: 40px; padding-right: 40px; font-size: 16px; display: inline-block;">
                                                                <span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><strong>CONFIRM EMAIL</strong></span>
                                                            </span>
                                                        </a>
                                                        <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                                                    </div>
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
                            <div style="background-color: transparent;">
                                <div class="block-grid" style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; margin: 0 auto; background-color: transparent;">
                                    <div style="border-collapse: collapse; display: table; width: 100%; background-color: transparent;">
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                                        <!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:transparent;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:20px; padding-bottom:60px;"><![endif]-->
                                        <div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
                                            <div class="col_cont" style="width: 100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div
                                                    style="
                                                        border-top: 0px solid transparent;
                                                        border-left: 0px solid transparent;
                                                        border-bottom: 0px solid transparent;
                                                        border-right: 0px solid transparent;
                                                        padding-top: 20px;
                                                        padding-bottom: 60px;
                                                        padding-right: 0px;
                                                        padding-left: 0px;
                                                    "
                                                >
                                                    <!--<![endif]-->
                                                    <table
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        class="social_icons"
                                                        role="presentation"
                                                        style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                        valign="top"
                                                        width="100%"
                                                    >
                                                        <tbody>
                                                            <tr style="vertical-align: top;" valign="top">
                                                                <td style="word-break: break-word; vertical-align: top; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
                                                                    <table
                                                                        align="center"
                                                                        cellpadding="0"
                                                                        cellspacing="0"
                                                                        class="social_table"
                                                                        role="presentation"
                                                                        style="
                                                                            table-layout: fixed;
                                                                            vertical-align: top;
                                                                            border-spacing: 0;
                                                                            border-collapse: collapse;
                                                                            mso-table-tspace: 0;
                                                                            mso-table-rspace: 0;
                                                                            mso-table-bspace: 0;
                                                                            mso-table-lspace: 0;
                                                                        "
                                                                        valign="top"
                                                                    >
                                                                        <tbody>
                                                                            <tr align="center" style="vertical-align: top; display: inline-block; text-align: center;" valign="top">
                                                                                <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 15px; padding-left: 0;" valign="top">
                                                                                    <a href="https://www.facebook.com/" target="_blank">
                                                                                        <img
                                                                                            alt="Facebook"
                                                                                            height="32"
                                                                                            src="https://res.cloudinary.com/pebbles-signature/image/upload/v1650925850/facebook2x_digzov.png"
                                                                                            style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"
                                                                                            title="Facebook"
                                                                                            width="32"
                                                                                        />
                                                                                    </a>
                                                                                </td>
                                                                                <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 15px; padding-left: 0;" valign="top">
                                                                                    <a href="https://twitter.com/" target="_blank">
                                                                                        <img
                                                                                            alt="Twitter"
                                                                                            height="32"
                                                                                            src="https://res.cloudinary.com/pebbles-signature/image/upload/v1650926028/twitter2x_aqk72d.png"
                                                                                            style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"
                                                                                            title="Twitter"
                                                                                            width="32"
                                                                                        />
                                                                                    </a>
                                                                                </td>
                                                                                <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 15px; padding-left: 0;" valign="top">
                                                                                    <a href="https://instagram.com/" target="_blank">
                                                                                        <img
                                                                                            alt="Instagram"
                                                                                            height="32"
                                                                                            src="https://res.cloudinary.com/pebbles-signature/image/upload/v1650925969/instagram2x_zx21vw.png"
                                                                                            style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"
                                                                                            title="Instagram"
                                                                                            width="32"
                                                                                        />
                                                                                    </a>
                                                                                </td>
                                                                                
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                                    <div style="color: #555555; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; line-height: 1.5; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;">
                                                        <div style="font-size: 12px; line-height: 1.5; color: #555555; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 18px;">
                                                            <p style="font-size: 14px; line-height: 1.5; text-align: center; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">
                                                                Pebbles Signature- Find a home away from home.
                                                            </p>
                                                            <p style="font-size: 14px; line-height: 1.5; text-align: center; word-break: break-word; mso-line-height-alt: 21px; margin: 0;">329 California St, San Francisco, CA 94118</p>
                                                        </div>
                                                    </div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                    <table
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        class="divider"
                                                        role="presentation"
                                                        style="
                                                            table-layout: fixed;
                                                            vertical-align: top;
                                                            border-spacing: 0;
                                                            border-collapse: collapse;
                                                            mso-table-lspace: 0pt;
                                                            mso-table-rspace: 0pt;
                                                            min-width: 100%;
                                                            -ms-text-size-adjust: 100%;
                                                            -webkit-text-size-adjust: 100%;
                                                        "
                                                        valign="top"
                                                        width="100%"
                                                    >
                                                        <tbody>
                                                            <tr style="vertical-align: top;" valign="top">
                                                                <td
                                                                    class="divider_inner"
                                                                    style="
                                                                        word-break: break-word;
                                                                        vertical-align: top;
                                                                        min-width: 100%;
                                                                        -ms-text-size-adjust: 100%;
                                                                        -webkit-text-size-adjust: 100%;
                                                                        padding-top: 10px;
                                                                        padding-right: 10px;
                                                                        padding-bottom: 10px;
                                                                        padding-left: 10px;
                                                                    "
                                                                    valign="top"
                                                                >
                                                                    <table
                                                                        align="center"
                                                                        border="0"
                                                                        cellpadding="0"
                                                                        cellspacing="0"
                                                                        class="divider_content"
                                                                        height="0"
                                                                        role="presentation"
                                                                        style="
                                                                            table-layout: fixed;
                                                                            vertical-align: top;
                                                                            border-spacing: 0;
                                                                            border-collapse: collapse;
                                                                            mso-table-lspace: 0pt;
                                                                            mso-table-rspace: 0pt;
                                                                            border-top: 1px dotted #c4c4c4;
                                                                            height: 0px;
                                                                            width: 60%;
                                                                        "
                                                                        valign="top"
                                                                        width="60%"
                                                                    >
                                                                        <tbody>
                                                                            <tr style="vertical-align: top;" valign="top">
                                                                                <td height="0" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                                    <div style="color: #4f4f4f; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; line-height: 1.2; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;">
                                                        <div style="font-size: 12px; line-height: 1.2; color: #4f4f4f; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">
                                                            <p style="font-size: 14px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 17px; margin: 0;">
                                                                <span style="font-size: 14px;">
                                                                    <a href="#" rel="noopener" style="text-decoration: none; color: #2190e3;" target="_blank">
                                                                        <strong><span style="color: #003399;">Help&amp; FAQ's</span></strong>
                                                                    </a>
                                                                    |
                                                                    <strong>
                                                                        <span style="color: #003399;"><a href="#" rel="noopener" style="text-decoration: none; color: #003399;" target="_blank">Returns</a></span>
                                                                    </strong>
                                                                    | <span style="background-color: transparent; font-size: 14px; color: #003399;">1-998-9283-19832</span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
                            <div style="background-color: transparent;">
                                <div class="block-grid two-up no-stack" style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; margin: 0 auto; background-color: transparent;">
                                    <div style="border-collapse: collapse; display: table; width: 100%; background-color: transparent;">
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                                        <!--[if (mso)|(IE)]><td align="center" width="325" style="background-color:transparent;width:325px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:10px; padding-bottom:10px;"><![endif]-->
                                        <div class="col num6" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 324px; width: 325px;">
                                            <div class="col_cont" style="width: 100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div
                                                    style="
                                                        border-top: 0px solid transparent;
                                                        border-left: 0px solid transparent;
                                                        border-bottom: 0px solid transparent;
                                                        border-right: 0px solid transparent;
                                                        padding-top: 10px;
                                                        padding-bottom: 10px;
                                                        padding-right: 0px;
                                                        padding-left: 0px;
                                                    "
                                                >
                                                    <!--<![endif]-->
                                                    
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td><td align="center" width="325" style="background-color:transparent;width:325px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:10px; padding-bottom:10px;"><![endif]-->
                                        <div class="col num6" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 324px; width: 325px;">
                                            <div class="col_cont" style="width: 100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div
                                                    style="
                                                        border-top: 0px solid transparent;
                                                        border-left: 0px solid transparent;
                                                        border-bottom: 0px solid transparent;
                                                        border-right: 0px solid transparent;
                                                        padding-top: 10px;
                                                        padding-bottom: 10px;
                                                        padding-right: 0px;
                                                        padding-left: 0px;
                                                    "
                                                >
                                                    <!--<![endif]-->
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 4px; padding-left: 4px; padding-top: 4px; padding-bottom: 4px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                                    <div style="color: #9d9d9d; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; line-height: 1.2; padding-top: 4px; padding-right: 4px; padding-bottom: 4px; padding-left: 4px;">
                                                        <div style="line-height: 1.2; font-size: 12px; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; color: #9d9d9d; mso-line-height-alt: 14px;"></div>
                                                    </div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
                            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
            <!--[if (IE)]></div><![endif]-->
        </body>
    </html>`,
  };
  try {
        const result = await sgMail
            .send(msg);
        return result;
    } catch (error) {
        console.log(error);
        if (error.response) {
            const { response } = error;
            const { body } = response;
            console.error(body);
        }
    }
}

function passwordEmail(Name, Email, link) {
  const msg = {
    to: Email, // Change to your recipient
    from: VERIFIED_EMAIL, // Change to your verified sender
    subject: "Reset Your Password",
    html: ``,
  };

  return sgMail
    .send(msg)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      // Log friendly error
      console.error(error);

      if (error.response) {
        // Extract error msg
        const { message, code, response } = error;

        // Extract response msg
        const { headers, body } = response;

        console.error(body);
      }
    });
}

function SuccessfulPasswordReset(Name, Email) {
  const msg = {
    to: Email, // Change to your recipient
    from: VERIFIED_EMAIL, // Change to your verified sender
    subject: "Your Password Reset Successful",
    html: ``,
  };

 return sgMail
    .send(msg)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      // Log friendly error
      console.error(error);

      if (error.response) {
        // Extract error msg
        const { message, code, response } = error;

        // Extract response msg
        const { headers, body } = response;

        console.error(body);
      }
    });
}

async function bookingEmail(Name, Email, ApartmentName, CheckIn, CheckOut, BookingAmount, bookingOrderId) {
  const msg = {
    to: Email, // Change to your recipient
    from: VERIFIED_EMAIL, // Change to your verified sender
    subject: "Booking Confirmation",
    html: `<h1>Dear ${Name},</h1>
        <p>Booking with order number <b>${bookingOrderId}</b> has been <b>Confirmed</b></p>
        <h5> Booking Details</h5>
        <p>Apartment Name: ${ApartmentName}</p>
        <p>Check In Date:${moment(CheckIn)}</p>
        <p>Check Out Date:${moment(CheckOut)}</p>
        <p>Booking Amount:${BookingAmount}</p>`,
  };

 try {
        const result = await sgMail
            .send(msg);
        return result;
    } catch (error) {
        // Log friendly error
        console.error(error);

        if (error.response) {
            // Extract error msg
            const { message: message_1, code, response } = error;

            // Extract response msg
            const { headers, body } = response;

            console.error(body);
        }
    }
}

async function mentorshipEmail(Name, Email, industry, uniqueId) {
    const msg = {
      to: Email, // Change to your recipient
      from: VERIFIED_EMAIL, // Change to your verified sender
      subject: "Booking Confirmation",
      html: `<h1>Dear ${Name},</h1>
          <p>request for <b>${industry}</b> event has been <b>Confirmed</b></p>
          <p>You will be sent an email or get a call from the mentor within 24hrs</p>
          <p>After you get intouch with the mentor pls click the link below to comfirm your request</p>
          <p>http://localhost:7000/api/mentor/comfirm/?uniqueId=${uniqueId}</p>`,
    };
  
   try {
          const result = await sgMail
              .send(msg);
          return result;
      } catch (error) {
          // Log friendly error
          console.error(error);
  
          if (error.response) {
              // Extract error msg
              const { message: message_1, code, response } = error;
  
              // Extract response msg
              const { headers, body } = response;
  
              console.error(body);
          }
      }
  }

async function sendEmailVerificationToken(email) {
  try {
    const verificationCode1 = Math.floor(100000 + Math.random() * 100000);
    await sendEmailToken(email, verificationCode1);
    // this.data(email, verificationCode1);
     console.log('Expected email:',email)
    return {
      message: `OTP Message sent to ${email} successfully`,
      data: "success",
      status: 200,
      code: verificationCode1,
    };
  } catch (error) {
    logger.error("Error occurred sending token", error);
    return {
      message: `Error occurred sending OTP Message to ${email}`,
      data: error.message,
      status: 500,
    };
  }
}

module.exports = {
    sendEmailToken,
  sendEmailVerificationToken,
  passwordEmail,
  SuccessfulPasswordReset,
  registrationSuccessful,
  sendResetPasswordToken,
  bookingEmail,
  verificationCode,
  mentorshipEmail
};
