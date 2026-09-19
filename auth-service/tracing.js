import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { AmqplibInstrumentation } from '@opentelemetry/instrumentation-amqplib';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const traceExporter=new OTLPTraceExporter({
    url:'http://jaeger:4318/v1/traces'
})

const sdk=new NodeSDK({
   
    traceExporter:traceExporter,
    instrumentations:[
        getNodeAutoInstrumentations(),
        new AmqplibInstrumentation()
    ]
})
sdk.start()
console.log('Tracing initialized');

process.on('SIGTERM',()=>{
    sdk.shutdown().then(()=>{
    console.log('Tracing terminated');
    }).finally(()=>{
        process.exit(0);
    })    
});

