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
import { LoaderCircle } from 'lucide-react'
import { db } from '../../../utils/db'
import { MockInterview } from '../../../utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
  
function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobPosition, setJobPosition] = useState();
    const [jobDescription, setJobDescription] = useState();
    const [loading, setLoading]= useState(false); 
    const [jsonResponse, setJsonResponse]= useState([]); 
    const {user}=useUser(); 

    const onSubmit=async(e)=>{
        setLoading(true); 
        e.preventDefault()
        console.log(jobPosition, jobDescription);
        const InputPrompt = "Job Position : "+jobPosition+", Job Description : "+jobDescription+". Depending on job position and job description give us 5 interview questions along with answers in JSON format, Give us question and answer field on JSON"
        
        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResponse= (result.response.text()).replace('```json', '').replace('```', '')

        console.log(JSON.parse(MockJsonResponse)); 
        setJsonResponse(MockJsonResponse); 
        if (MockJsonResponse){
        const resp= await db.insert(MockInterview)
        .values({
            mockId:uuidv4(), 
            jsonMockResp:MockJsonResponse,
            jobPosition:jobPosition,
            jobDescription:jobDescription,
            createBy:user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-YYYY ')
        }).returning({mockId:MockInterview.mockId}); 

        console.log("Inserted ID: ", resp)
        if (resp){
            setOpenDialog(false); 
        }
    }
    else {
        console.log('Error'); 
    }
        setLoading(false); 
   
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
                    <Button type='submit' disabled={loading}>
                        {loading? 
                        <>
                        <LoaderCircle className='animate-spin '/> 'Generating your interview'
                        </> : 'Start Interview'                     
                    }
                        Start Your Interview</Button>
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