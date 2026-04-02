
import 'dotenv/config' 
import App from "./src/App.js";
import { connection } from './src/Config/Database.js';
const PORT=process.env.PORT||3000
connection()


App.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})