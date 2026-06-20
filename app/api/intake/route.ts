import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

interface IntakeData {
  clientName: string
  phoneNumber: string
  email: string
  caseType: string
  description: string
}

export async function POST(request: NextRequest) {
  try {
    const data: IntakeData = await request.json()
    const timestamp = new Date().toISOString()
    const results: { googleSheets?: boolean; email?: boolean } = {}

    // Google Sheets Integration
    const googleSheetsWebhookUrl = process.env.GOOGLE_SHEETS_INTAKE_WEBHOOK_URL
    console.log("[v0] Google Sheets URL:", googleSheetsWebhookUrl ? "Set" : "Not set")
    
    if (googleSheetsWebhookUrl) {
      try {
        const payload = {
          timestamp,
          clientName: data.clientName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          caseType: data.caseType,
          description: data.description,
        }
        console.log("[v0] Sending to Google Sheets:", JSON.stringify(payload))
        
        const response = await fetch(googleSheetsWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        
        const responseText = await response.text()
        console.log("[v0] Google Sheets response status:", response.status)
        console.log("[v0] Google Sheets response:", responseText)
        
        results.googleSheets = response.ok
      } catch (error) {
        console.error("[v0] Google Sheets error:", error)
        results.googleSheets = false
      }
    } else {
      console.log("[v0] Google Sheets webhook URL not configured")
    }

    // Email Notification via Resend
    const notificationEmail = process.env.NOTIFICATION_EMAIL
    if (resend && notificationEmail) {
      try {
        await resend.emails.send({
          from: "Gabs Legal Tech <onboarding@resend.dev>",
          to: notificationEmail,
          subject: `New Client Inquiry: ${data.caseType} - ${data.clientName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background-color: #22c55e; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">New Client Inquiry</h1>
              </div>
              <div style="background-color: #1a1a1a; padding: 30px; color: #ffffff;">
                <h2 style="color: #22c55e; margin-top: 0;">Client Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #888;">Name:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #fff;">${data.clientName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #888;">Phone:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #fff;">${data.phoneNumber || "Not provided"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #888;">Email:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #fff;"><a href="mailto:${data.email}" style="color: #22c55e;">${data.email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #888;">Case Type:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #22c55e; font-weight: bold;">${data.caseType}</td>
                  </tr>
                </table>
                <h3 style="color: #22c55e; margin-top: 25px;">Description</h3>
                <p style="background-color: #262626; padding: 15px; border-radius: 8px; color: #ccc; line-height: 1.6;">
                  ${data.description || "No description provided"}
                </p>
                <p style="color: #666; font-size: 12px; margin-top: 30px; text-align: center;">
                  Submitted on ${new Date(timestamp).toLocaleString()}
                </p>
              </div>
              <div style="background-color: #0a0a0a; padding: 15px; text-align: center;">
                <p style="color: #666; margin: 0; font-size: 12px;">Gabs Legal Tech - Built in Botswana</p>
              </div>
            </div>
          `,
        })
        results.email = true
      } catch (error) {
        console.error("Email notification error:", error)
        results.email = false
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: "Intake submitted successfully",
      results 
    })
  } catch (error) {
    console.error("Intake submission error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to submit intake" },
      { status: 500 }
    )
  }
}
