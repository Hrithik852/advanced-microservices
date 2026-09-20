import amqp from 'amqplib'
import { profileModel } from '../models/profile.model.js'
export const connectRabbitMq=async()=>{
    try{
        const connection=await amqp.connect('amqp://rabbitmq')
        const channel=await connection.createChannel()
        await channel.assertExchange('user_events','fanout',{durable:true})
        const q=await channel.assertQueue('profile_creation_queue',{durable:true});
        await channel.bindQueue(q.queue,'user_events','')
        console.log('Profile Service waiting for messages in profile_creation_queue...');

        channel.consume(q.queue,async(msg)=>{
            if(msg.content){
                const eventData=JSON.parse(msg.content.toString());
                console.log(`[x] Profile Service received event:`, eventData);
                if(eventData.action=='user_registered'){
                    try{
                        await profileModel.create({
                            authUserId:eventData.userId,
                            email:eventData.email
                        })
                        console.log(`[x] Successfully created profile for ${eventData.email}`);
                        channel.ack(msg)
                    }

                    catch(err){
                        console.error(`[!] Failed to create profile:`, err.message);
                        
                    }
                }
            }
        })
    }
    catch(err){

        console.error('RabbitMQ connection error:', error);
    process.exit(1);
    }
}