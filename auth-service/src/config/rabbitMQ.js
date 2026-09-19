import amqp from 'amqplib'

export let rabbitChannel=null;

export const connectRabbitMQ=async()=>{
    try{
        const connection=await amqp.connect('amqp://rabbitmq');
        rabbitChannel=await connection.createChannel();

        await rabbitChannel.assertExchange('user_events','fanout',{durable:true});
        console.log('auth service connected to rabbitMQ');
        
    }
    catch(err){
        console.error('RabbitMQ catched and error',err);

        process.exit(1)
        }
}