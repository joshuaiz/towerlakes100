import { UploadDropzone } from '@uploadthing/react'
import { UploadButton } from '@utils/uploadthing.ts'

export function ImageUploader() {
	return (
		<UploadDropzone
			endpoint="imageUploader"
			onClientUploadComplete={(res) => {
				// Do something with the response
				console.log('Files: ', res)
				alert('Upload Completed')
			}}
			onUploadError={(error) => {
				alert(`ERROR! ${error.message}`)
			}}
			onUploadBegin={(name) => {
				// Do something once upload begins
				console.log('Uploading: ', name)
			}}
		/>
	)
}
