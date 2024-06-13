import connectDB from './db/index.js'
// require('dotenv').config({path:'./env})
import dotenv from 'dotenv'

dotenv.config({path:'./env'})
 
connectDB()


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