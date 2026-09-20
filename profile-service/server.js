import { configDotenv } from "dotenv";
import { connectDb } from './src/config/db.js';
import { connectRabbitMq} from './src/config/rabbitMQ.js'
import app from './src/app.js'

connectDb()
connectRabbitMq()
app.listen(5002,()=>{
    console.log(`Profile Service listening on port 5002`);
})