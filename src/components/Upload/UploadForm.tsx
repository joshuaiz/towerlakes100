import { FormEvent, useState, useEffect, Fragment } from 'react'
import { ImageUploader } from './ImageUploader.jsx'
import {
	isValidEmail,
	isValidPhone,
	shuffleArray,
	slugify,
	get6RandomChars,
} from '@utils/utils.js'

let islands: string[] = [
	'Rest Island',
	'Play Island',
	'Toy Island',
	'Duck Island',
	'Goose Egg Island',
]

const UploadForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [formSubmitted, setFormSubmitted] = useState(false)
	const [responseMessage, setResponseMessage] = useState('')
	const [formErrors, setFormErrors] = useState({
		firstname: '',
		lastname: '',
		email: '',
		phone: '',
		submissionType: '',
		islands: '',
	})

	const [selectValue, setSelectValue] = useState('default')
	const [formIslands, setFormIslands] = useState([])
	const [radioValue, setRadioValue] = useState('')
	const [isFilled, setIsFilled] = useState({
		firstname: false,
		lastname: false,
		email: false,
		phone: false,
		submissionType: false,
		islands: false,
	})

	const [formId, setFormId] = useState('')

	const [submissionData, setSubmissionData] = useState({})

	const handleSelectChange = (e) => {
		console.log('select change', e.target.value)
		setSelectValue(e.target.value)
	}

	const onRadioChange = (e) => {
		console.log('radio change', e.target.value)
		setRadioValue(e.target.value)
	}

	let newFormId = get6RandomChars()

	useEffect(() => {
		setFormSubmitted(false)
		setRadioValue('')
		islands = shuffleArray(islands)
		setFormIslands(islands)
		const newFormId = get6RandomChars()
		console.log('newFormId', newFormId)
		setFormId(newFormId)
		localStorage.removeItem('submissionData')
	}, [])

	const submitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.target as HTMLFormElement)

		// formData.forEach((value, key) => {
		// 	console.log('key', key)
		// 	console.log('value', value)
		// })

		setFormErrors({
			firstname: '',
			lastname: '',
			email: '',
			phone: '',
			submissionType: '',
			islands: '',
		})

		const firstname = formData.get('firstname')
		const lastname = formData.get('lastname')
		const email = formData.get('email')
		const phone = formData.get('phone')
		const submissionType = formData.get('submissionType')
		const formIslands = formData.get('islands')
		const message = formData.get('message')
		const submitFormId = formData.get('formId')

		if (typeof firstname !== 'string' || firstname.length < 1) {
			setFormErrors({
				...formErrors,
				firstname: 'Please include a first name. ',
			})
		}

		if (typeof lastname !== 'string' || lastname.length < 1) {
			setFormErrors({
				...formErrors,
				lastname: 'Please include a last name. ',
			})
		}

		if (typeof email !== 'string' || !isValidEmail(email)) {
			setFormErrors({
				...formErrors,
				email: 'Email is not valid. Please enter a valid email address.',
			})
		}

		if (typeof phone !== 'string' || !isValidPhone(phone)) {
			console.log('phone', phone, typeof phone, isValidPhone(phone))
			setFormErrors({
				...formErrors,
				phone: 'Please enter a valid phone number.',
			})
		}

		if (
			typeof submissionType !== 'string' ||
			submissionType.length < 1 ||
			submissionType === 'default' ||
			submissionType === '' ||
			submissionType === null ||
			submissionType === undefined
		) {
			setFormErrors({
				...formErrors,
				submissionType: 'Please select a submission type.',
			})

			console.log(
				'submissionType error',
				submissionType,
				formErrors.submissionType
			)
		}

		if (
			typeof formIslands !== 'string' ||
			formIslands !== 'goose-egg-island'
		) {
			setFormErrors({
				...formErrors,
				islands: 'Please select the correct island.',
			})
		}

		console.log('formErrors', formErrors)

		if (
			!formErrors.firstname &&
			!formErrors.lastname &&
			!formErrors.email &&
			!formErrors.phone &&
			!formErrors.submissionType &&
			!formErrors.islands
		) {
			if (
				isFilled.firstname &&
				isFilled.lastname &&
				isFilled.email &&
				isFilled.phone &&
				isFilled.submissionType &&
				isFilled.islands
			) {
				console.log('form is filled')
				setIsFilled({
					firstname: true,
					lastname: true,
					email: true,
					phone: true,
					submissionType: true,
					islands: true,
				})
			}

			setSubmissionData({
				firstname,
				lastname,
				email,
				phone,
				submissionType,
				formIslands,
				message,
				submitFormId,
			})

			localStorage.setItem(
				'submissionData',
				JSON.stringify({
					firstname,
					lastname,
					email,
					phone,
					submissionType,
					formIslands,
					message,
					submitFormId,
				})
			)

			setIsSubmitting(true)
			console.log('Form submitted', submitFormId)

			const response = await fetch('/api/resend', {
				method: 'POST',
				body: formData,
			})
			const data = await response.json()
			console.log('data, status', data, response.status)
			if (response.status === 200) {
				if (data.message) {
					console.log('form response', data.message)

					setResponseMessage(
						'Form submitted successfully! Please wait for the file uploader to appear and upload your files.'
					)
					setTimeout(() => {
						setIsSubmitting(false)
						setFormSubmitted(true)
						setResponseMessage('')
					}, 5000)
				}
			}
		}
	}

	return (
		<div className="upload-form-outer mb-12 relative p-4 lg:p-12 bg-carribbean/10 rounded rounded-4">
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
							<strong>Preferred:</strong> Please create a `.zip`
							archive of your files (optional)
						</li>
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
							.avif, .tiff, CAMERA RAW, .zip
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
						isSubmitting ? 'opacity-50 pointer-events-none' : ''
					} ${formSubmitted ? 'hidden' : ''}`}
				>
					<h3 className="!mt-0">Upload Form</h3>
					<p className="text-base leading-tight">
						Please fill out all fields and submit the form. Once
						submitted you will be able to upload your images and
						documents.
					</p>

					{formErrors.firstname ? (
						<p className="text-red-500 !my-0 font-semibold">
							{formErrors.firstname}
						</p>
					) : null}
					{formErrors.lastname ? (
						<p className="text-red-500 !my-0 font-semibold">
							{formErrors.lastname}
						</p>
					) : null}
					{formErrors.email ? (
						<p className="text-red-500 !my-0 font-semibold">
							{formErrors.email}
						</p>
					) : null}
					{formErrors.phone ? (
						<p className="text-red-500 !my-0 font-semibold">
							{formErrors.phone}
						</p>
					) : null}

					<form
						method="POST"
						onSubmit={submitForm}
						className="flex flex-col"
						id="submissionForm"
					>
						<div
							className={`form-wrap flex gap-x-4 w-full flex-wrap lg:flex-nowrap`}
						>
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
						<div className="form-wrap flex gap-x-4 w-full flex-wrap lg:flex-nowrap">
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
								Phone:&nbsp;<small>Format: 123-456-7890</small>
								<input
									type="tel"
									id="phone"
									name="phone"
									required
									pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
								/>
							</label>
						</div>

						<label className={`my-6`} htmlFor="submissionType">
							Submission Type:
							<select
								id="submissionType"
								className={`select select-bordered ${
									formErrors.submissionType
										? 'border border-red-500'
										: ''
								}`}
								name="submissionType"
								required
								value={selectValue}
								onChange={handleSelectChange}
							>
								<option value="default" disabled>
									Select type
								</option>
								<option value="Cover Content">
									Yearbook Cover Contest
								</option>
								<option value="Seasonal Photos">
									Seasonal Photos
								</option>
								<option value="Other">
									Other Photos/Images
								</option>
							</select>
							<p className="text-xs text-slate-green not-prose ">
								Only upload images for one type per upload. If
								you have multiple groups of photos for different
								types, please make one upload for each group.
								This helps us keep organized!
							</p>
							{formErrors.submissionType ? (
								<p className="text-red-500 !my-0 mt-2 font-semibold">
									{formErrors.submissionType}
								</p>
							) : null}
						</label>

						<div className="form-wrap flex flex-col w-full mb-6">
							<p className="font-bold text-lg !mb-2">
								Island Select (to prevent spam):
							</p>
							<div
								className={`form-inner-wrap p-4 bg-sunset/40 rounded rounded-4 ${
									formErrors.islands
										? 'border border-red-500'
										: ''
								}`}
							>
								<legend className="mb-3">
									Please select the island that{' '}
									<strong>is not</strong> part of Tower Lakes:
								</legend>
								<div className="flex items-start lg:items-center gap-x-4 w-full flex-wrap lg:flex-nowrap flex-col lg:flex-row">
									{formIslands.map((island, index) => (
										<div
											key={island}
											className="gap-x-1 flex items-center"
										>
											<input
												type="radio"
												id={slugify(island)}
												name="islands"
												value={slugify(island)}
												onChange={onRadioChange}
												checked={
													radioValue ===
													slugify(island)
												}
											/>
											<label htmlFor={slugify(island)}>
												{island}
											</label>
										</div>
									))}
								</div>
								{formErrors.islands ? (
									<p className="text-red-500 !my-0 font-semibold">
										{formErrors.islands}
									</p>
								) : null}
							</div>
						</div>

						<div className="form-wrap flex flex-col w-full mt-3">
							<label className="not-prose" htmlFor="message">
								Message:
								<textarea
									className="not-prose w-full textarea textarea-bordered"
									id="message"
									name="message"
									rows={4}
									maxLength={1000}
								></textarea>
								<p className="text-xs text-slate-green not-prose">
									Please describe the photos you are
									uploading. Include any relevant details,
									such as event names, dates, and people in
									the photos. (1000 character limit)
								</p>
								<p className="text-xs text-slate-green not-prose">
									<strong>Note:</strong> you may also upload a
									document with this info using the uploader
									(PDF, DOC, DOCX, TXT, RTF, XLS, or CSV file
									types allowed). Or include the document in
									your .zip archive. Uploader will be
									available after form is submitted.
								</p>
							</label>
						</div>

						<input
							type="hidden"
							id="formId"
							name="formId"
							value={formId}
						/>

						<div className="form-submit w-full flex flex-col items-center justify-center">
							<button
								type="submit"
								className="btn bg-carribbean w-full hover:bg-jungle text-lg lg:text-2xl uppercase tracking-wide"
							>
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

				{responseMessage && (
					<div className="bg-carribbean p-6 rounded rounded-4 flex items-center justify-center text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[400px] opacity-100">
						<p className="text-[#FFFFFF] !m-0 text-center">
							{responseMessage}
						</p>
					</div>
				)}

				<div
					className={`upload-outer flex flex-col gap-y-6 w-1/2 ${
						formSubmitted ? '' : 'hidden'
					}`}
				>
					<div
						className={`upload-wrap p-6 bg-sunset/40 flex flex-col w-full relative`}
					>
						<h2 className="!mt-0 mb-2">Upload Your Files:</h2>
						<ImageUploader />
					</div>
				</div>
			</div>
		</div>
	)
}
export default UploadForm
