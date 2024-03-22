import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)
import EmailTemplate from '../../components/EmailTemplate'

export default async function sendEmail(req, res) {
  try {
    const data = req.body

    await resend.sendEmail({
      from: 'joeyclapton.vercel.app <website@joeyclapton.com>',
      to: 'joeyclapton42@gmail.com',
      replyTo: data.email,
      subject: `${data.name} - via joeyclapton.vercel.app`,
      react: <EmailTemplate {...data} />,
    })

    res.status(200).json({ message: 'Email sent' })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
