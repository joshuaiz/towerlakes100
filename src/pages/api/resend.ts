import type { APIRoute } from 'astro'
import { Resend } from 'resend'

const resend = new Resend(import.meta.env.RESEND_API_KEY)

export const POST: APIRoute = async ({ request }) => {
	const data = await request.formData()
	const firstname = data.get('firstname')
	const lastname = data.get('lastname')
	const email = data.get('email')
	const message = data.get('message')
	// Validate the data - you'll probably want to do more than this
	if (!firstname || !email || !message) {
		return new Response(
			JSON.stringify({
				message: 'Missing required fields',
			}),
			{ status: 400 }
		)
	}

	let html = `Submission from ${firstname} ${lastname} (${email}):\n${message}`

	resend.emails.send({
		from: 'submissions@towerlakes100.org',
		to: 'tl@towerlakes100.org',
		subject: 'New submission from Tower Lakes 100 website',
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
