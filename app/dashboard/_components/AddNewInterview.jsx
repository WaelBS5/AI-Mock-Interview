"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '@/@/components/ui/input'
import { Textarea } from '@/@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiModel'
  
function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobPosition, setJobPosition] = useState();
    const [jobDescription, setJobDescription] = useState();

    const onSubmit=async(e)=>{
        e.preventDefault()
        console.log(jobPosition, jobDescription);
        const InputPrompt = "Job Position : "+jobPosition+", Job Description : "+jobDescription+". Depending on job position and job description give us 5 interview questions along with answers in JSON format, Give us question and answer field on JSON"
        
        const result = await chatSession.sendMessage(InputPrompt);

        console.log(result.response.text()); 
   
    }
  return (
    <div>
        <div className='p-10 border rounded-lg bg-secondary
        hover:scale-105 hover:shadow-md cursor-pointer transition-all '
        onClick={()=>setOpenDialog(true)}
        >
            <h2 className='font-bold text-lg text-center'>+ Add New</h2>
        </div>
        <Dialog open={openDialog}>

        <DialogContent className='max-w-2xl'>
            <DialogHeader>
            <DialogTitle className='text-2xl'>Tell us more about your interview</DialogTitle>
            <DialogDescription>
                <form onSubmit={onSubmit}>
                <div> 
                    <h2>Paste the job description over here</h2>
                    <div className='mt-7 my-3'>
                        <lable>Role/Position</lable>
                        <Input placeholder="Ex: Software Engineering Intern" required
                        onChange={(event)=>setJobDescription(event.target.value)}
                        />
                    </div>
                    <div className='my-3'>
                        <lable>Job Description</lable>
                        <Textarea placeholder="Ex: We are seeking a motivated Software Engineering Intern to assist in 
                        the development, testing, and optimization of scalable software solutions using technologies such 
                        as Python, JavaScript, React, and Node.js. The ideal candidate will collaborate with our engineering 
                        team on real-world projects, contributing to both front-end (React) and back-end (Node.js, Express) 
                        development, while enhancing their coding and problem-solving skills." required
                        onChange={(event)=>setJobPosition(event.target.value)}
                        />
                    </div>
                </div>
                <div classname='flex gap-5 justify-end'>
                    <Button type = 'button' variant ='ghost' onClick={()=>setOpenDialog(false)}>Cancel</Button>
                    <Button type='submit'>Start Your Interview</Button>
                </div>
                </form>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>

    </div>
  )
} 

export default AddNewInterview 