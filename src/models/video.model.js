import mongoose from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'
const { Schema } = mongoose

const videoSchema = new Schema(
  {
    videoFile: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, //from cloudnary as when its uploaded it gives the tiem 
      default:0

    },
    views: {
      type: Number,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default:true
    },
  },
  { timestamps: true }
)
videoSchema.plugin(aggregatePaginate)
export const Video = mongoose.model('Video', videoSchema)
