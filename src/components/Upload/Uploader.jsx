import { ImageUploader } from './ImageUploader.jsx'

const Uploader = ({ submissionData }) => {
	console.log('submissionData', submissionData)
	return <ImageUploader submissionData={submissionData} />
}
export default Uploader
