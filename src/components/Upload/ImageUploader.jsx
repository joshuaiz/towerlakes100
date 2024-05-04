import { UploadDropzone } from '@uploadthing/react'
import { UploadButton } from '@utils/uploadthing.ts'

export function ImageUploader() {
	return (
		<UploadDropzone
			endpoint="fileUploader"
			className="bg-white border border-gray-300 rounded-md p-4"
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
