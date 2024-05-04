import React, { useState, Fragment } from 'react'

import { UploadDropzone } from '@uploadthing/react'
import { UploadButton } from '@utils/uploadthing.ts'

export function ImageUploader() {
	const [uploading, setUploading] = useState(false)
	return (
		<Fragment>
			<UploadDropzone
				endpoint="fileUploader"
				className="bg-white border border-gray-300 rounded-md p-4 h-full"
				onClientUploadComplete={(res) => {
					// Do something with the response
					console.log('Files: ', res)
					setUploading(false)
					alert('Upload Completed')
				}}
				onUploadError={(error) => {
					alert(`ERROR! ${error.message}`)
				}}
				onUploadBegin={(name) => {
					// Do something once upload begins
					setUploading(true)
					console.log('Uploading: ', name)
				}}
			/>

			{uploading && (
				<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-4 rounded-md">
						<p>
							Uploading... Please do not leave this page or use
							the back button until uploading is complete.
						</p>
					</div>
				</div>
			)}
		</Fragment>
	)
}
