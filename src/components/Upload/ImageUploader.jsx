import React, { useState, Fragment } from 'react'

import { UploadDropzone } from '@uploadthing/react'
import { UploadButton } from '@utils/uploadthing.ts'

export function ImageUploader({ submissionData }) {
	const [uploading, setUploading] = useState(false)
	const [uploadComplete, setUploadComplete] = useState(false)

	console.log('submissionData in ImageUploader', submissionData)

	return (
		<Fragment>
			<UploadDropzone
				endpoint="fileUploader"
				className={`bg-white border border-gray-300 rounded-md p-4 h-full ${
					uploading ? 'opacity-50 pointer-events-none' : ''
				}`}
				onClientUploadComplete={(res) => {
					// Do something with the response
					console.log('Files: ', res)
					setUploading(false)

					localStorage.removeItem('submissionData')
					setUploadComplete(true)
					alert('Upload Completed')
					// setTimeout(function () {
					// 	window.location.reload(1)
					// }, 3000)
				}}
				onUploadError={(error) => {
					alert(`ERROR! ${error.message}`)
				}}
				onBeforeUploadBegin={(files) => {
					let formId = submissionData.submitFormId

					console.log('formId before upload', formId)
					if (!formId || formId === '' || formId === 'undefined') {
						formId = 'default'
					}
					return files.map(
						(f) =>
							new File([f], formId + '-' + f.name, {
								type: f.type,
							})
					)
				}}
				onUploadBegin={(name) => {
					// Do something once upload begins
					setUploading(true)
					console.log('Uploading: ', name)
				}}
			/>

			<div className="flex justify-center">
				<p className="prose">
					<strong>Note:</strong> after selecting or
					dragging-and-dropping your file(s) click the Upload button
					above to complete the upload.
				</p>
			</div>

			{uploading && (
				<div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center p-12">
					<div className="bg-white p-4 rounded-md max-w-[400px]">
						<p>
							Uploading... Please do not leave this page or use
							the back button until uploading is complete.
						</p>
					</div>
				</div>
			)}

			{uploadComplete && (
				<div className="absolute top-0 left-0 mx-auto w-full h-full bg-black bg-opacity-50 flex items-center justify-center p-12">
					<div className="bg-white p-4 rounded-md max-w-[400px]">
						<p className="text-center">
							Upload Complete! Thanks for your submission. Please
							wait while we redirect you back to the form.
						</p>
					</div>
				</div>
			)}
		</Fragment>
	)
}
