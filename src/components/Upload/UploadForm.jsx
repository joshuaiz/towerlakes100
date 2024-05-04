import { useState, useEffect, Fragment } from 'react'
import { ImageUploader } from './ImageUploader.jsx'
import { isValidEmail, isValidPhone } from '@utils/utils.js'

const UploadForm = () => {
	const [formSubmitted, setFormSubmitted] = useState(false)
	const [errors, setErrors] = useState({
		firstname: '',
		lastname: '',
		email: '',
		phone: '',
		submissionType: '',
	})

	useEffect(() => {
		setFormSubmitted(false)
	}, [])

	const submitForm = (e) => {
		e.preventDefault()

		const firstname = e.target.firstname.value
		const lastname = e.target.lastname.value
		const email = e.target.email.value
		const phone = e.target.phone.value
		const address = e.target.address.value
		const address2 = e.target.address2.value
		const city = e.target.city.value
		const state = e.target.state.value
		const zip = e.target.zip.value
		const submissionType = e.target['submission-type'].value
		const message = e.target.message.value

		if (typeof firstname !== 'string' || firstname.length < 1) {
			setErrors((prev) => ({
				...prev,
				firstname: 'Please include a first name. ',
			}))
		}
		if (typeof lastname !== 'string' || lastname.length < 1) {
			setErrors((prev) => ({
				...prev,
				lastname: 'Please include a last name. ',
			}))
		}
		if (typeof email !== 'string' || !isValidEmail(email)) {
			setErrors((prev) => ({
				...prev,
				email: 'Email is not valid. Please enter a valid email address.',
			}))
		}

		if (typeof phone !== 'string' || !isValidPhone(phone)) {
			setErrors((prev) => ({
				...prev,
				phone: 'Please enter a valid phone number.',
			}))
		}

		if (typeof submissionType !== 'string' || submissionType.length < 1) {
			setErrors((prev) => ({
				...prev,
				submissionType: 'Please select a submission type. ',
			}))
		}

		if (
			!errors.firstname &&
			!errors.lastname &&
			!errors.email &&
			!errors.phone &&
			!errors.submissionType
		) {
			setFormSubmitted(true)
			console.log('Form submitted')

			fetch('/api/sendmail.php', {
				method: 'POST',

				body: JSON.stringify({
					firstname,
					lastname,
					email,
					phone,
					address,
					address2,
					city,
					state,
					zip,
					submissionType,
					message,
				}),
			})
				.then((response) => {
					console.log(response)
				})
				.then((data) => {
					console.log('Success:', data)
				})
				.catch((error) => {
					console.error('Error:', error)
				})
		}
	}

	return (
		<div className="upload-form-outer mb-12">
			<div className="upload-form-inner prose flex flex-wrap lg:flex-nowrap gap-x-8">
				<div className="instructions w-full lg:w-1/2">
					<h2 className="!mt-0">
						Tower Lakes 100 Yearbook Upload & Submission Form
					</h2>
					<p className="not-prose">
						Use this form to upload any of the following:
					</p>
					<ul>
						<li>Yearbook Cover Contest</li>
						<li>Seasonal Photos</li>
						<li>
							Other photos to be considered for the TL 100
							Yearbook
						</li>
					</ul>
					<h3>Important notes:</h3>
					<ul>
						<li>
							Upload images/photos at full resolution (at least
							300dpi); higher is better
						</li>
						<li>
							Do not crop or resize photos — we will crop and
							resize
						</li>
						<li>
							File types allowed: .jpg, .png, .pdf, .webp, .heic,
							.avif, .tiff, or CAMERA RAW
						</li>
						<li>You *can* upload multiple files at one time</li>
						<li>Max file size per upload is 1024MB (1GB)</li>
						<li>
							Photos must be submitted by the deadline of August
							16, 2024
						</li>
					</ul>
					<p>
						Questions about submitting? Contact{' '}
						<a href="mailto:yearbook@towerlakes100.org">
							yearbook@towerlakes100.org
						</a>
					</p>
				</div>

				<div
					className={`form-wrap mt-8 lg:mt-0 flex flex-col w-full lg:w-1/2 ${
						formSubmitted ? 'hidden' : ''
					}`}
				>
					<h3 className="!mt-0">Upload Form</h3>
					<p className="text-base leading-tight">
						Please fill out all required fields and submit the form.
						Once submitted you will be able to upload your images
						and documents.
					</p>
					<form
						method="POST"
						onSubmit={(e) => submitForm(e)}
						className="flex flex-col"
					>
						<div className="form-wrap flex gap-x-4 w-full">
							<label
								className="w-full lg:w-1/2"
								htmlFor="firstname"
							>
								First Name:
								<input
									type="text"
									id="firstname"
									name="firstname"
									required
								/>
							</label>
							<label
								className="w-full lg:w-1/2"
								htmlFor="lastname"
							>
								Last Name:
								<input
									type="text"
									id="lastname"
									name="lastname"
									required
								/>
							</label>
						</div>
						<div className="form-wrap flex gap-x-4 w-full">
							<label className="w-full lg:w-1/2" htmlFor="email">
								Email:
								<input
									type="email"
									id="email"
									name="email"
									required
								/>
							</label>
							<label className="w-full lg:w-1/2" htmlFor="phone">
								Phone:
								<input
									type="tel"
									id="phone"
									name="phone"
									required
								/>
							</label>
						</div>

						<label htmlFor="address">
							Address:
							<input
								type="text"
								id="address"
								name="address"
								required
							/>
						</label>
						<label htmlFor="address2">
							Address 2 (optional):
							<input type="text" id="address2" name="address2" />
						</label>
						<div className="form-wrap flex gap-x-4 w-full">
							<label htmlFor="city">
								City:
								<input
									type="text"
									id="city"
									name="city"
									required
								/>
							</label>

							<label className="" htmlFor="state">
								State (please select):
								<select
									id="state"
									defaultValue="default"
									className="select select-bordered"
								>
									<option value="default" disabled>
										Select your state
									</option>
									<option value="AL">Alabama</option>
									<option value="AK">Alaska</option>
									<option value="AZ">Arizona</option>
									<option value="AR">Arkansas</option>
									<option value="CA">California</option>
									<option value="CO">Colorado</option>
									<option value="CT">Connecticut</option>
									<option value="DE">Delaware</option>
									<option value="DC">
										District Of Columbia
									</option>
									<option value="FL">Florida</option>
									<option value="GA">Georgia</option>
									<option value="HI">Hawaii</option>
									<option value="ID">Idaho</option>
									<option value="IL">Illinois</option>
									<option value="IN">Indiana</option>
									<option value="IA">Iowa</option>
									<option value="KS">Kansas</option>
									<option value="KY">Kentucky</option>
									<option value="LA">Louisiana</option>
									<option value="ME">Maine</option>
									<option value="MD">Maryland</option>
									<option value="MA">Massachusetts</option>
									<option value="MI">Michigan</option>
									<option value="MN">Minnesota</option>
									<option value="MS">Mississippi</option>
									<option value="MO">Missouri</option>
									<option value="MT">Montana</option>
									<option value="NE">Nebraska</option>
									<option value="NV">Nevada</option>
									<option value="NH">New Hampshire</option>
									<option value="NJ">New Jersey</option>
									<option value="NM">New Mexico</option>
									<option value="NY">New York</option>
									<option value="NC">North Carolina</option>
									<option value="ND">North Dakota</option>
									<option value="OH">Ohio</option>
									<option value="OK">Oklahoma</option>
									<option value="OR">Oregon</option>
									<option value="PA">Pennsylvania</option>
									<option value="RI">Rhode Island</option>
									<option value="SC">South Carolina</option>
									<option value="SD">South Dakota</option>
									<option value="TN">Tennessee</option>
									<option value="TX">Texas</option>
									<option value="UT">Utah</option>
									<option value="VT">Vermont</option>
									<option value="VA">Virginia</option>
									<option value="WA">Washington</option>
									<option value="WV">West Virginia</option>
									<option value="WI">Wisconsin</option>
									<option value="WY">Wyoming</option>
								</select>
							</label>
							<label className="w-1/3" htmlFor="zip">
								Zip:
								<input
									type="text"
									id="zip"
									name="zip"
									required
								/>
							</label>
						</div>

						<label className="" htmlFor="submission-type">
							Submission Type:
							<select
								id="submission-type"
								defaultValue="default"
								className="select select-bordered"
							>
								<option value="default" disabled>
									Select type
								</option>
								<option value="cover-contest">
									Yearbook Cover Contest
								</option>
								<option value="seasonal-photos">
									Seasonal Photos
								</option>
								<option value="other-photos">
									Other Photos/Images
								</option>
							</select>
							<p className="text-xs text-slate-green not-prose">
								Only upload images for one type per upload. If
								you have multiple groups of photos for different
								types, please make one upload for each group.
								This helps us keep organized!
							</p>
						</label>
						<div className="form-wrap flex flex-col w-full mt-3">
							<label className="not-prose" htmlFor="message">
								Message:
								<textarea
									className="not-prose w-full textarea textarea-bordered"
									id="message"
									name="message"
									rows="4"
								></textarea>
								<p className="text-xs text-slate-green not-prose">
									Please describe the photos you are
									uploading. Include any relevant details,
									such as event names, dates, and people in
									the photos. <strong>Note:</strong> you may
									also upload a document with this info using
									the uploader (PDF, DOC, DOCX, TXT, RTF, XLS,
									or CSV file types allowed). Uploader will be
									available after form is submitted.
								</p>
							</label>
						</div>

						<div className="form-submit w-full flex flex-col items-center justify-center">
							<button className="btn bg-carribbean w-full hover:bg-jungle text-lg lg:text-2xl uppercase tracking-wide">
								Submit Form
							</button>
							<p className="text-xs text-slate-green not-prose">
								Once you submit the form, you will be able to
								upload your images/photos/documents. Please do
								not close the window until you have uploaded
								your files.
							</p>
						</div>
					</form>
				</div>
				<div
					className={`upload-wrap p-6 bg-sunset/40 flex flex-col w-1/2 ${
						formSubmitted ? '' : 'hidden'
					}`}
				>
					<h2 className="!mt-0 mb-2">Upload Your Files:</h2>
					<ImageUploader client:load />
				</div>
			</div>
		</div>
	)
}
export default UploadForm

// if (Astro.request.method === 'POST') {
// 	try {
// 		const data = await Astro.request.formData()
// 		const firstname = data.get('firstname')
// 		const lastname = data.get('lastname')
// 		const email = data.get('email')
// 		const phone = data.get('phone')
// 		const password = data.get('password')
// 		const address = data.get('address')
// 		const address2 = data.get('address2')
// 		const city = data.get('city')
// 		const state = data.get('state')
// 		const zip = data.get('zip')
// 		const submissionType = data.get('submission-type')
// 		const message = data.get('message')

// 		if (typeof firstname !== 'string' || firstname.length < 1) {
// 			errors.firstname += 'Please include a first name. '
// 		}
// 		if (typeof lastname !== 'string' || lastname.length < 1) {
// 			errors.lastname += 'Please include a last name. '
// 		}
// 		if (typeof email !== 'string' || !isValidEmail(email)) {
// 			errors.email +=
// 				'Email is not valid. Please enter a valid email address.'
// 		}

// 		if (typeof phone !== 'string' || !isValidPhone(phone)) {
// 			errors.phone += 'Please enter a valid phone number.'
// 		}

// 		if (typeof submissionType !== 'string' || submissionType.length < 1) {
// 			errors.submissionType += 'Please select a submission type. '
// 		}

// 		if (
// 			!errors.firstname &&
// 			!errors.lastname &&
// 			!errors.email &&
// 			!errors.phone &&
// 			!errors.submissionType
// 		) {
// 			formSubmitted = true
// 			console.log('Form submitted')

// 			fetch('/api/sendmail.php', {
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 				body: JSON.stringify({
// 					firstname,
// 					lastname,
// 					email,
// 					phone,
// 					password,
// 					address,
// 					address2,
// 					city,
// 					state,
// 					zip,
// 					submissionType,
// 					message,
// 				}),
// 			})
// 				.then((response) => response.json())
// 				.then((data) => {
// 					console.log('Success:', data)
// 				})
// 				.catch((error) => {
// 					console.error('Error:', error)
// 				})
// 		}

// 		// Do something with the data
// 	} catch (error) {
// 		if (error instanceof Error) {
// 			console.error(error.message)
// 		}
// 	}
// }
