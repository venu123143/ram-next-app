"use client"
import React, { CSSProperties, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { useEffect } from 'react'
import { AiFillStar } from "react-icons/ai"
import { IoLocationSharp, IoMailUnread } from "react-icons/io5"
import ProtectedRoute from '@/app/components/ProtectedRoute'
import { SyncLoader } from 'react-spinners'

const EachJobDetails = () => {
    const [apiData, setApiData] = useState<any>()
    const [isLoading, setIsLoading] = useState(true);

    const { jobDetails } = useParams()
    console.log(jobDetails);
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://apis.ccbp.in/jobs/${jobDetails}`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU`,
                },
            });
            setApiData(response.data)
            setIsLoading(false)
            return response.data
        } catch (error) {
            setIsLoading(false)

        }
    }
    console.log(apiData);
    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
        width: 380,
        position: 'absolute',
        top: "50%",
        left: "50%",
        transform: 'translateX(-50%, -50%)'
    };
    useEffect(() => {
        fetchData()
    }, [])
    if (isLoading) {
        return (
            <SyncLoader
                color="#361AE3"
                loading={true}
                cssOverride={override}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        )
    }
    return (
        <ProtectedRoute>
            <div className='bg-black min-h-screen flex justify-center flex-col gap-2 items-start mt-14 px-14'>
                <div className="bg-gray-800 p-4 rounded-md text-gray-400 mt-16 relative">
                    <div className="flex items-center">
                        <img src={apiData?.job_details?.company_logo_url} alt="company_logo" className="w-10 h-10" />
                        <div className="ml-4">
                            <h1 className="text-white text-lg">{apiData?.job_details?.title}</h1>
                            <div className="flex items-center">
                                <AiFillStar className="text-yellow-500" />
                                <h2 className="ml-1">{apiData?.job_details?.rating}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center mt-2">
                        <IoLocationSharp className="mr-1" />
                        <p>{apiData?.job_details?.location}</p>
                    </div>
                    <div className="flex items-center mt-2">
                        <IoMailUnread className="mr-1" />
                        <p>{apiData?.job_details?.employment_type}</p>
                    </div>
                    <div>
                        <h2 className="mt-2 absolute top-24 right-28">{apiData?.job_details?.package_per_annum}</h2>
                    </div>
                    <hr className="text-white border-1 mt-4" />
                    <div className='flex justify-between items-center px-4'>
                        <h1 className="text-white font-bold mt-4">Description</h1>
                        <a href={apiData?.job_details.company_website_url} target='_blank' className='text-blue-600'>Visit</a>
                    </div>
                    <p>{apiData?.job_details?.job_description}</p>
                    <h1 className="text-white font-bold mt-4">Skills</h1>
                    <div className="grid grid-cols-3 pt-5 gap-4">
                        {apiData?.job_details?.skills.map((each: any, index: number) => {
                            return (
                                <div key={index} className="flex items-center space-x-2">
                                    <img
                                        src={each.image_url}
                                        alt={each.name}
                                        className="w-12 h-12"
                                    />
                                    <h2 className="text-xl">{each.name}</h2>
                                </div>
                            )
                        })}
                    </div>
                    <h1 className="text-white font-bold mt-8">Similar Jobs</h1>
                    <div className='flex gap-3 justify-center items-center'>
                        <p>{apiData?.job_details?.life_at_company.description}</p>
                        <img src={apiData?.job_details?.life_at_company.image_url} />
                    </div>
                </div>
                <div>
                    <h1 className="text-white font-bold mt-8">Life at Company</h1>
                    <div className='grid grid-cols-3 gap-10 justify-center items-center pb-20'>
                        {apiData?.similar_jobs.map((each: any,index:number) => {
                            return (
                                <div key={index} className="bg-gray-800 p-4 rounded-md max-w-[350px] h-[450px]  text-gray-400 mt-16">
                                    <div className="flex items-center align-middle">
                                        <img src={each.company_logo_url} alt="company_logo" className="w-10 h-10" />
                                        <div className="ml-4">
                                            <h1 className="text-white text-lg">{each.title}</h1>
                                            <div className="flex items-center">
                                                <AiFillStar className="text-yellow-500" />
                                                <h2 className="ml-1">{each.rating}</h2>
                                            </div>
                                        </div>
                                    </div>

                                    <h2 className="mt-2">{each.package_per_annum}</h2>
                                    <h1 className="text-white mt-4">Description</h1>
                                    <p className='h-[200px]'>{each.job_description}</p>
                                    <div className='flex justify-between mt-5'>
                                        <div className="flex items-center mt-2">
                                            <IoLocationSharp className="mr-1" />
                                            <p>{each.location}</p>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <IoMailUnread className="mr-1" />
                                            <p>{each.employment_type}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default EachJobDetails;