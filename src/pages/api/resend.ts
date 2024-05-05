import type { APIRoute } from 'astro'
import { Resend } from 'resend'

const resend = new Resend(import.meta.env.RESEND_API_KEY)

export const POST: APIRoute = async ({ request }) => {
	const data = await request.formData()
	const firstname = data.get('firstname')
	const lastname = data.get('lastname')
	const email = data.get('email')
	const message = data.get('message')
	const phone = data.get('phone')
	const formId = data.get('formId')
	// Validate the data - you'll probably want to do more than this
	if (!firstname || !email || !phone) {
		return new Response(
			JSON.stringify({
				message: 'Please fill out all required fields.',
			}),
			{ status: 400 }
		)
	}

	let html = `<p>Submission ${formId} from ${firstname} ${lastname} (${email})</p>`

	html += `<p>Name: ${firstname} ${lastname}</p>`

	html += `<p>Email: ${email}</p>`

	html += `<p>Phone: ${phone}</p>`

	html += `<p>Message: ${message}</p>`

	resend.emails.send({
		from: 'submissions@towerlakes100.org',
		to: 'tl@towerlakes100.org',
		subject: `New submission from Tower Lakes 100 website - ${formId}`,
		html: html,
	})
	// Do something with the data, then return a success response
	return new Response(
		JSON.stringify({
			message: 'Success!',
		}),
		{ status: 200 }
	)
}
