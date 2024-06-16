import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const { Schema } = mongoose

const userSchema = new Schema(
  {
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
      },
    ],
    username: {
      type: String,
      unique: true,
      required: true,
      lowecase: true,
      index: true, //This helps to enable search optimisation
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowecase: true,
    },
    fullName: {
      type: String,
      trim: true,
      index: true,
      required: true,
    },
    avatar: {
      type: String, //from cloudinary
      required: true,
    },
    coverImage: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    //This ensures that the encryption occurs only when the pasword is changed and not when there are any pther updates like change of bg image or avatar
    this.password = bcrypt.hash(this.password, 10)
  }
  next()
})

// we can add our own custom methods for eg here this isPasswordCorrect
userSchema.methods.isPasswordCorrect= async function(password){
    return await bcrypt.compare(password,this.password)
}
// this normally doesnt take time so doesnt need async
userSchema.methods.generateAccessToken=function(){
    jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
// this is similar to access token, however it needs lesser paylaod as it keeps getting refreshed
userSchema.methods.generateGenerateToken=function(){
    jwt.sign({
        _id:this._id,        
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model('User', userSchema)
