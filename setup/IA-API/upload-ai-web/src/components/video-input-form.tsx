import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { FileVideo, Upload } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { InputHTMLAttributes, useState, useRef } from "react";
import { ChangeEvent } from 'react';
import { useMemo } from 'react';
import { FormEvent } from "react";
import { getFFmpeg } from "@/lib/ffmpeg";
import {fetchFile} from '@ffmpeg/util';
import { api } from "@/lib/axios";

export function VideoInputForm(){
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const promptInputRef = useRef<HTMLTextAreaElement>(null)

    function handleFileSelect(event: ChangeEvent<HTMLInputElement>){
        const { files } = event.currentTarget;

        if(!files){
            return 
        }
        const selectFile = files[0];
        setVideoFile(selectFile); 

    }

    async function convertVideoToAudio(video: File){
        console.log('convert Start..')
        const ffmpeg = await getFFmpeg();
        await ffmpeg.writeFile('input.mp4', await fetchFile(video))
        
        //mostrar log de erros 
        //ffmpeg.on('log', log => {console.log(log)} )

        ffmpeg.on('progress', progress =>{
            console.log('Convert progress:' + Math.round(progress.progress*100))
        })

        await ffmpeg.exec([
            '-i', 
            'input.mp4',
            '-map',
            '0:a',
            '-b:a',
            '20k', 
            '-acodec',
            'libmp3lame',
            'output.mp3',

        ])
        const data = await ffmpeg.readFile('output.mp3');
        const audioFileBlob = new Blob([data], {type:'audio/mpeg'});
        
        const audioFile = new File([audioFileBlob], 'audio.mp3',{
            type:'audio/mpeg',
        })
        console.log('Convert finished.')
        return(audioFile)
    }


    async function handleUploadVideo(event : FormEvent<HTMLFormElement>){
        event.preventDefault();

        const prompt = promptInputRef.current?.value;
        if(!videoFile){
            return 
        }
        const audioFile = await convertVideoToAudio(videoFile);
        console.log(audioFile, prompt)
         

        
        const data = new FormData();
        data.append('file', audioFile);

        const response = await api.post('/videos', data);
       
        //console.log(response);
        const videoId = response.data.video.id
        await api.post(`/videos/${videoId}/transcription`, {
            prompt,
        })
        
        console.log('Finalizou')
    } 

    const previewURL = useMemo(()=>{
        if(!videoFile){return null }
        return URL.createObjectURL(videoFile);

    },[videoFile]);
    return(

        <form className="space-y-6" onSubmit={handleUploadVideo}>
                <label 
                    htmlFor="video" 
                    className="relative border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5" >
                
                
                { previewURL ? <video src={previewURL} controls={false} className="pointer-events-none absolute inset-0" />: (
                    <>
                        <FileVideo className="h-4 w-4"/>
                        Carregar vídeo
                    </>
                )}
                
                
                </label>
                <input type="file" id="video" accept="video/mp4" className="sr-only" onChange={handleFileSelect}/>
            
                <Separator/>

                
                <div className="space-y-2">
                <Label htmlFor="transcription_form">Prompt de transcrição </Label>
                <Textarea 
                    ref={promptInputRef}
                    id="transcription_prompt" 
                    className="h-20 leading-relaxed resize-none"
                    placeholder="Inclua palavras-chave mencionadas no video separadas por virgula (,)" 
                />          
                </div>
                <Button type="submit" className="w-full">
                    Carregar vídeo 
                    <Upload className="w-4 h-4 ml-2"/>
                </Button>
        </form>
    )
}
