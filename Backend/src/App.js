import express from 'express'


import cookie from 'cookie-parser'

const App=express()
App.use(express.json())
App.use(cookie())


//&Import routes
import userRoutes from './Routes/user.routes'
import postRoutes from './Routes/post.routes'


//?User all Routes
App.use('/api/v1/user',userRoutes)
App.use('/api/v1/post',postRoutes)


export default App