import type { APIRoute } from 'astro'
import { Resend } from 'resend'

const resend = new Resend(import.meta.env.RESEND_API_KEY)

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData()
    console.log('data from request', data)
    const firstname = data.get('firstname')
    const lastname = data.get('lastname')
    const email = data.get('email')
    const message = data.get('message')
    const phone = data.get('phone')
    const formId = data.get('formId')
    let submissionTypes = data.getAll('submissionType')
    let submissionTypesArray = submissionTypes.join(', ')

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

    html += `<p>Submission Categories: ${submissionTypesArray}</p>`

    let html2 = `<p>Thank you for submitting on the Tower Lakes 100 website</p>`

    html2 += `<p>Your submission ${formId} has been received</p>`

    html2 += `<p>Name: ${firstname} ${lastname}</p>`

    html2 += `<p>Email: ${email}</p>`

    html2 += `<p>Phone: ${phone}</p>`

    html2 += `<p>Message: ${message}</p>`

    html2 += `<p>Submission Categories: ${submissionTypesArray}</p>`

    html2 += `<p>If we have any questions about your submission we will contact you. If you have any questions, please email: <a href="mailto:yearbook@towerlakes100.org">yearbook@towerlakes100.org</a>.</p>`

    html2 += `<p>Thank you for your submission!</p>`

    await resend.emails.send({
        from: 'submissions@towerlakes100.org',
        to: 'tl@towerlakes100.org',
        subject: `New submission from Tower Lakes 100 website - ${formId}`,
        html: html,
    })

    await resend.emails.send({
        from: 'submissions@towerlakes100.org',
        to: `${email}`,
        subject: `Thank you for submitting on the Tower Lakes 100 website`,
        html: html2,
    })

    // Do something with the data, then return a success response
    return new Response(
        JSON.stringify({
            message: 'Success!',
        }),
        { status: 200 }
    )
}
