import { app } from './app.js'
import connectDB from './db/index.js'
// require('dotenv').config({path:'./env})
import dotenv from 'dotenv'

dotenv.config({ path: './env' })

//This is an async function so it returns a promise
connectDB()
  .then(() => {
    app.on('error', (error) => {
      console.log(`Error: ${error}`)
    })
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port: ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.log('MONGODB connection failed', err)
  })

// the below code is the first approach
/*
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    app.on('error', (error) => {
      console.log(`Error: ${error}`) 
    })
    app.listen(process.env.PORT,()=>{
        console.log(`Server is listenng at port : ${process.env.PORT}`);
    })
  } catch (error) {
    console.log(`Error: ${error}`)
    throw error
  }
})()

*/
