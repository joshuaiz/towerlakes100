import { createUploadthing, type FileRouter, UTFiles } from 'uploadthing/server'
import { slugify, generateId } from '@utils/utils.js'

const f = createUploadthing()

const auth = (req: Request) => ({ id: 'fakeId' }) // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	fileUploader: f({
		image: { maxFileSize: '1024MB', maxFileCount: 10 },
		blob: { maxFileSize: '64MB', maxFileCount: 3 },
		pdf: { maxFileSize: '256MB', maxFileCount: 5 },
		text: { maxFileSize: '64MB', maxFileCount: 3 },
	})
		// Set permissions and file types for this FileRoute
		.middleware(async ({ req, files }) => {
			// This code runs on your server before upload
			const fileOverrides = files.map((file) => {
				const newName = slugify(file.name)
				const myIdentifier = generateId()
				return { ...file, name: newName, customId: myIdentifier }
			})

			// Return userId to be used in onUploadComplete
			return { foo: 'bar' as const, [UTFiles]: fileOverrides }
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload
			console.log('metadata', metadata)

			console.log('file url', file.url)

			// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
			return { metadata, file: { ...file, customId: file.customId } }
		}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
