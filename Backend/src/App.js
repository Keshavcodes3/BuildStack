import express from 'express'
import cors from 'cors'

import cookie from 'cookie-parser'

const App=express()
App.use(express.json())
App.use(cookie())
App.use(cors({
    origin:'https://build-stack-alpha.vercel.app',
    credentials:true,
}))

//&Import routes
import userRoutes from './Routes/user.routes.js'
import postRoutes from './Routes/post.routes.js'
import commentRoutes from './Routes/comment.routes.js'


//?User all Routes
App.use('/api/v1/user',userRoutes)
App.use('/api/v1/post',postRoutes)
App.use('/api/v1/comments',commentRoutes)


export default App