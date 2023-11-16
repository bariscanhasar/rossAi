import {Request} from 'express'
import multer from 'multer'


type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void


export const fileStorage = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        callback: DestinationCallback
    ): void => {
        callback(null, 'upload')
    },

    filename: (
        req: Request,
        file: Express.Multer.File,
        callback: FileNameCallback
    ): void => {
        callback(null, file.originalname)
    }
})


export const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    callback: any
): void => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/avif' ||
        file.mimetype === 'image/webp'
    ) {
        callback(null, true)
    } else {
        callback(new Error("Image uploaded is not of type jpg/jpeg or png"), false)
    }
}

export const upload = multer({storage: fileStorage, fileFilter: fileFilter})