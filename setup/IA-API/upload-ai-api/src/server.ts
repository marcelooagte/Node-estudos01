import {fastify} from 'fastify';
import {fastifyCors } from '@fastify/cors'
import { prisma } from './lib/prisma';
import { getAllPromptsRoute } from './routers/get-all-prompts';
import { uploadVideoRoute } from './routers/upload-video';
import { createTranscriptionRoute } from './routers/create-transcription';
import {generationAICompletionRoute} from './routers/generate-ai-completion';
const app = fastify()

app.register(fastifyCors, {
    origin: '*', 
})
app.register(getAllPromptsRoute);
app.register(uploadVideoRoute);
app.register(createTranscriptionRoute);
app.register(generationAICompletionRoute)

app.listen({
    port:3333,
     
}).then(()=>{
    console.log('Http Server running.. ')
})