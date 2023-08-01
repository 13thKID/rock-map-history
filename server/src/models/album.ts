import { Schema, Types, model, Model, HydratedDocument } from 'mongoose'

export interface AlbumSchema {
  released: Date
  recorded: Date
  studio: string
  label: string
  producer: string
  cover: string
}

type AlbumMethods = AlbumSchema

export type AlbumModel = Model<AlbumMethods, NonNullable<unknown>, AlbumMethods>

export type HydratedAlbum = HydratedDocument<AlbumSchema, AlbumMethods>

const albumSchema = new Schema<AlbumSchema, AlbumModel, AlbumMethods>({
  released: {
    type: Date,
    required: true,
  },
  recorded: {
    type: Date,
    required: true,
  },
  studio: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  producer: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
})

export const Album = model<AlbumSchema, AlbumModel>('Album', albumSchema)
