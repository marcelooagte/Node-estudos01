import {fastify} from 'fastify';
import { prisma } from './lib/prisma';
import { getAllPromptsRoute } from './routers/get-all-prompts';
import { uploadVideoRoute } from './routers/upload-video';
import { createTranscriptionRouter } from './routers/create-transcription';
const app = fastify()
app.register(getAllPromptsRoute);
app.register(uploadVideoRoute);
app.register(createTranscriptionRouter);

app.listen({
    port:3333,
     
}).then(()=>{
    console.log('Http Server running.. ')
})