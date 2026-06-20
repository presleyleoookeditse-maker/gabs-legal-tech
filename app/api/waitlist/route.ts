import { NextRequest, NextResponse } from 'next/server'

const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, company } = body

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      )
    }

    // If Google Sheets webhook URL is configured, send data there
    if (GOOGLE_SHEET_URL) {
      try {
        await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            name,
            company: company || '',
            timestamp: new Date().toISOString(),
            source: 'Gabs Legal Tech Waitlist',
          }),
        })
      } catch (sheetError) {
        console.error('Failed to send to Google Sheets:', sheetError)
        // Continue even if Google Sheets fails - we don't want to block the user
      }
    } else {
      // Log for development/debugging when no webhook is configured
      console.log('[Waitlist Signup]', { email, name, company, timestamp: new Date().toISOString() })
    }

    return NextResponse.json(
      { success: true, message: 'Successfully joined the waitlist' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
