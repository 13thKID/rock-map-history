import {
  Schema,
  Types,
  model,
  Model,
  HydratedDocument,
  Query,
  Document,
  QueryWithHelpers,
} from 'mongoose'

export interface AlbumSchema {
  title: string
  released: Date
  recorded: Date
  studio: string
  label: string
  producer: string
  cover: string
}

interface AlbumMethods extends AlbumSchema {
  sampleMethod(): Promise<void>
}

interface AlbumQueryHelpers extends AlbumSchema {
  byId(id: string): QueryWithHelpers<HydratedAlbum | null, HydratedAlbum, AlbumQueryHelpers>
}

export type AlbumModel = Model<AlbumMethods, AlbumQueryHelpers, AlbumMethods>

export type HydratedAlbum = HydratedDocument<AlbumSchema, AlbumMethods, AlbumQueryHelpers>

const albumSchema = new Schema<AlbumSchema, AlbumModel, AlbumMethods, AlbumQueryHelpers>({
  title: {
    type: String,
    required: true,
  },
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

/** Query helpers */

albumSchema.query.byId = function (
  this: QueryWithHelpers<HydratedAlbum | null, HydratedAlbum, AlbumQueryHelpers>,
  id: string
) {
  return this.findOne({ _id: new Types.ObjectId(id) })
}

/** Methods */

albumSchema.methods.sampleMethod = async function () {
  null
}

export const Album = model<AlbumSchema, AlbumModel>('Album', albumSchema)
