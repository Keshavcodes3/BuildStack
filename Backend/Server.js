
import 'dotenv/config' 
import App from "./src/App";
import { connection } from './src/Config/Database';
const PORT=process.env.PORT||3000
connection()


App.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})