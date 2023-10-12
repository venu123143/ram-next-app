"use client"
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { jobsData } from '../../../redux/features/auth-slice';
import { useEffect } from 'react';
import { AiFillStar } from "react-icons/ai"
import { IoLocationSharp, IoMailUnread } from "react-icons/io5"
import Link from 'next/link';
import ProtectedRoute from '../components/ProtectedRoute';

const Sidebar = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const [selectedOption, setSelectedOption] = useState("10 LPA");
    const { data } = useSelector((state: any) => state.auth)
    const [checkboxes, setCheckboxes] = useState({
        fulltime: false,
        parttime: false,
        freelance: false,
        Internship: false,
    }); 

    useEffect(() => {
        dispatch(jobsData())
    }, [])
    const handleCheckboxChange = (event: any) => {
        const { name, checked } = event.target;
        setCheckboxes({
            ...checkboxes,
            [name]: checked,
        });

    };
    if (typeof window !== 'undefined') {
        var requiredUser: any = JSON.parse(localStorage.getItem("currentUser") as string)
    }
    console.log(requiredUser);

    const handleOptionChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    const handleInputChange = (event: any) => {
        setSearchValue(event.target.value);
    };
    const applyFilters = () => {
        if (!(checkboxes.freelance && checkboxes.fulltime && checkboxes.Internship && checkboxes.parttime)) {
            if (data && data.jobs) {
                setFilter(data.jobs);
            }
        }
        const filteredItems = data?.jobs?.filter((item: any) => {
            const titleMatch = item.title.toLowerCase().includes(searchValue.toLowerCase());
            const fullTimeMatch = checkboxes.fulltime && item.employment_type === 'Full Time';
            const partTimeMatch = checkboxes.parttime && item.employment_type === 'Part Time';
            const InternshipMatch = checkboxes.Internship && item.employment_type === 'Internship';
            const freelanceMatch = checkboxes.freelance && item.employment_type === 'Freelance';

            const selectedSalary = parseInt(selectedOption.replace('LPA', '').trim());
            const itemSalary = parseInt(item.package_per_annum.replace('LPA', '').trim());

            const selectedSalaryRange = isNaN(selectedSalary) || itemSalary >= selectedSalary;

            return (
                (!checkboxes.fulltime && !checkboxes.parttime && !checkboxes.Internship && !checkboxes.freelance) ||
                (titleMatch && (fullTimeMatch || partTimeMatch || InternshipMatch || freelanceMatch)) &&
                selectedSalaryRange
            );
        });

        setFilter(filteredItems);
    };


    const [filter, setFilter] = useState([]);
    useEffect(() => {
        applyFilters()
    }, [searchValue, checkboxes, selectedOption]);
    console.log(filter, "fil");

    return (
        <ProtectedRoute>
            <div className='flex bg-black min-h-screen p-5'>
                <div className='w-1/4 fixed top-20 left-3 flex flex-col justify-center items-start'>
                    <div className='bg-jobs-profile p-6'>
                        <img src={requiredUser?.image_url} alt='user-profile' className='w-12 h-12 rounded-full object-cover' />
                        <h1 className='text-violet-600 text-xl font-semibold mt-2'>{requiredUser?.name}</h1>
                        <p className='text-gray-800 text-sm mt-2'>{requiredUser?.bio}</p>
                    </div>
                    <hr className='text-white border  w-[290px] mt-6' />
                    <h1 className='text-white text-[18px] font-bold mt-6'>Type of Employment</h1>
                    <div className='mt-3'>
                        <label>
                            <input
                                type="checkbox"
                                name="fulltime"
                                checked={checkboxes.fulltime}
                                onChange={handleCheckboxChange}
                            />
                            <span className='text-white ml-2'>Full Time</span>
                        </label>
                        <br />
                        <label className='text-white'>
                            <input
                                type="checkbox"
                                name="parttime"
                                checked={checkboxes.parttime}
                                onChange={handleCheckboxChange}
                                className='text-white'
                            />
                            <span className='text-white ml-2'>Part Time</span>
                        </label>
                        <br />
                        <label className='text-white'>
                            <input
                                type="checkbox"
                                name="freelance"
                                checked={checkboxes.freelance}
                                onChange={handleCheckboxChange}
                                className='text-white'
                            />
                            <span className='text-white ml-2'>Freelance</span>
                        </label >
                        <br />
                        <label className='text-white'>
                            <input
                                type="checkbox"
                                name="Internship"
                                checked={checkboxes.Internship}
                                onChange={handleCheckboxChange}
                                className='text-white'
                            />
                            <span className='text-white ml-2'>Internship</span>
                        </label>
                    </div>
                    <hr className='text-white border  w-[290px] mt-6' />
                    <h1 className='text-white text-[18px] font-bold mt-6'>Salary Range</h1>
                    <div className='mt-3'>
                        <label>
                            <input
                                type="radio"
                                name="option"
                                value="10 LPA"
                                checked={selectedOption === "10 LPA"}
                                onChange={handleOptionChange}
                            />
                            <span className='text-white ml-2'>10LPA and above</span>
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="option"
                                value="20 LPA"
                                checked={selectedOption === "20 LPA"}
                                onChange={handleOptionChange}
                            />
                            <span className='text-white ml-2'>20LPA and above</span>
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="option"
                                value="30 LPA"
                                checked={selectedOption === "30 LPA"}
                                onChange={handleOptionChange}
                            />
                            <span className='text-white ml-2'>30LPA and above</span>
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="option"
                                value="40 LPA"
                                checked={selectedOption === "40 LPA"}
                                onChange={handleOptionChange}
                            />
                            <span className='text-white ml-2'>40LPA and above</span>
                        </label>
                    </div>
                </div>

                <div className='flex flex-col gap-4 items-center justify-start ml-[25%] mt-16'>
                    <div className='fixed top-18 left-1/4'>
                        <div className=" w-64">
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-full py-2 px-4 pr-10 focus:outline-none"
                                placeholder="Search"
                                value={searchValue}
                                onChange={handleInputChange}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg
                                    className="h-6 w-6 text-gray-400"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M21 21l-5.2-5.2" />
                                    <circle cx="10" cy="10" r="7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    {filter?.length > 0 ? (
                        filter?.map((each: any,index:number) => (
                            <Link key={index} href={`/jobs/${each.id}`} className="cursor-pointer bg-gray-800 p-4 rounded-md text-gray-400 mt-16">
                                <div className="flex items-center">
                                    <img src={each.company_logo_url} alt="company_logo" className="w-10 h-10" />
                                    <div className="ml-4">
                                        <h1 className="text-white text-lg">{each.title}</h1>
                                        <div className="flex items-center">
                                            <AiFillStar className="text-yellow-500" />
                                            <h2 className="ml-1">{each.rating}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center mt-2">
                                    <IoLocationSharp className="mr-1" />
                                    <p>{each.location}</p>
                                </div>
                                <div className="flex items-center mt-2">
                                    <IoMailUnread className="mr-1" />
                                    <p>{each.employment_type}</p>
                                </div>
                                <h2 className="mt-2">{each.package_per_annum}</h2>
                                <hr className="text-white border-1 mt-4" />
                                <h1 className="text-white mt-4">Description</h1>
                                <p>{each.job_description}</p>
                            </Link>
                        ))
                    ) : (
                        data?.jobs?.map((each: any,index:number) => (
                            <Link key={index} href={`/jobs/${each.id}`} className="bg-gray-800 p-4 rounded-md text-gray-400 mt-16">
                                <div className="flex items-center">
                                    <img src={each.company_logo_url} alt="company_logo" className="w-10 h-10" />
                                    <div className="ml-4">
                                        <h1 className="text-white text-lg">{each.title}</h1>
                                        <div className="flex items-center">
                                            <AiFillStar className="text-yellow-500" />
                                            <h2 className="ml-1">{each.rating}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center mt-2">
                                    <IoLocationSharp className="mr-1" />
                                    <p>{each.location}</p>
                                </div>
                                <div className="flex items-center mt-2">
                                    <IoMailUnread className="mr-1" />
                                    <p>{each.employment_type}</p>
                                </div>
                                <h2 className="mt-2">{each.package_per_annum}</h2>
                                <hr className="text-white border-1 mt-4" />
                                <h1 className="text-white mt-4">Description</h1>
                                <p>{each.job_description}</p>
                            </Link>
                        ))
                    )}

                </div>
            </div>
        </ProtectedRoute>
    );
};

export default Sidebar;
