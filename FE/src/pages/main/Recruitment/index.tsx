import { BsArrowRight, BsCurrencyDollar } from 'react-icons/bs'
import { MdFavoriteBorder, MdRoom } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useGetAllJobsQuery } from '../../../api/jobApi'
import { VND } from '../../../components/upload'
import { Skeleton } from 'antd'
import React from 'react'

const Recruitment = React.memo(() => {
    const { data, isLoading } = useGetAllJobsQuery();
    const listJobs = data?.job_list;
    if (isLoading) return <Skeleton />
    return (
        <div>
            <div className='mb-10   lg:p-1'>
                <div className='flex justify-between'>
                    <h2 className='font-bold md:text-2xl'>
                        Tuyển dụng, việc làm
                        <span className='text-blue-500'> tốt nhất</span>
                    </h2>
                    <Link to="/jobs" className='flex items-center gap-2  hover:text-blue-500'>Xem tất cả  <BsArrowRight /></Link>
                </div>
                <div className='my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 '>
                    {listJobs?.map((item) => {
                        if (item.status === 0 || item.status === 2) {
                            return null;
                        }
                        else if (new Date() > new Date(item?.end_date)) {
                            return null;
                        } else {
                            return (
                                <Link to={`/job-detail/${item?.title}/${item?.id}`} className='shadow-lg p-2 rounded' key={item?.id}>
                                    <div className='flex gap-2'>
                                        <img src={item?.logo} className='border rounded-md p-2' width={70} />
                                        <div>
                                            <Link to="/">
                                                <p className='text-slate-500 font-semibold text-lg'>{item?.title}</p>
                                            </Link>
                                            <p className='text-lg'>{item?.company_name}</p>
                                        </div>
                                    </div>
                                    <p className='flex items-center gap-1 my-2'> <MdRoom /> <span>{item?.province} - {item?.district}</span> </p>
                                    <div className='flex justify-between items-center mb-2'>
                                        <p className='flex items-center gap-1'> <BsCurrencyDollar /><span>{VND.format(item?.min_salary)} - {VND.format(item?.max_salary)}</span></p>
                                        <i className='border p-1'><MdFavoriteBorder /></i>
                                    </div>
                                    <div>

                                    </div>
                                </Link>
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    )
});

export default Recruitment