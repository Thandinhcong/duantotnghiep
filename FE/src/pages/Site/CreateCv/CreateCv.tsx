import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
// import './main.css'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import { useAddEduMutation, useAddExpMutation, useAddProjectMutation, useAddSkillMutation, useDeleteEduMutation, useDeleteProjectMutation, useDeleteSkillMutation, useListCvQuery, useListInfoQuery, useRemoveExpMutation, useUpdateInfoProfileMutation } from '../../../api/cv/listCvApi';
import { useForm } from 'react-hook-form';
import { Notyf } from 'notyf';
import { IoTrashOutline } from 'react-icons/io5';
import { useGetMajorQuery } from '../../../api/manageWebsiteApi/manageWebApi';
const CreateCvTest = () => {
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
    const { id } = useParams();
    const { data: dataCV } = useListCvQuery();
    const dataMap = dataCV?.data.find((item: any) => item.id == id)
    const { data: getCV } = useListInfoQuery(id || '');
    const idPost = dataMap?.id;
    const { data } = useListInfoQuery(idPost || '');
    //call api update info cv
    const [updateInfoCv] = useUpdateInfoProfileMutation();

    const listProfile = data?.profile?.cv;
    const { register, handleSubmit, reset } = useForm<any>();
    const onHandleSubmit = async (data: any) => {
        try {
            await updateInfoCv({
                id: idPost,
                ...data
            }).unwrap();
            notyf.success("Cập nhật thông tin thành công")
            console.log(data);

        } catch (error: any) {
            notyf.error(error?.data?.error)

        }
    }
    //profile
    const [profile, setProfile] = useState({ title: '', name: '', birth: "", phone: "", email: '', address: '', image: "" });
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };
    //skill
    const [addSkill] = useAddSkillMutation();
    const [deleteSkill] = useDeleteSkillMutation();
    const listSkill = getCV?.profile?.skill_cv;
    const { register: registerSkill, handleSubmit: handleSubmitSkill, reset: resetSkill } = useForm<any>();
    const onHandleAddSkill = async (data: any) => {
        try {
            await addSkill(data).unwrap();
            notyf.success("Thêm kỹ năng thành công")

        } catch (error) {
            console.log("add skill", error);

        }
    }
    const onHandleDeleteSkill = async (id: any) => {
        try {
            await deleteSkill(id).unwrap();
            notyf.success("Xóa kỹ năng thành công")

        } catch (error) {
            console.log("skill", error);

        }
    }
    const [skills, setSkills] = useState(['']);

    const handleAddSkill = (e: any) => {
        e.preventDefault();
        setSkills([...skills, '']);
    };

    const handleRemoveSkill = (index: any) => {
        const updatedSkills = [...skills];
        updatedSkills.splice(index, 1);
        setSkills(updatedSkills);
    };

    const handleChangeSkill = (index: any, value: string) => {
        const updatedSkills = [...skills];
        updatedSkills[index] = value;
        setSkills(updatedSkills);
    };
    //project
    const [addProject] = useAddProjectMutation();
    const [deleteProject] = useDeleteProjectMutation();
    const { register: registerProject, handleSubmit: handleSubmitProject, reset: resetProject } = useForm<any>();
    const listProject = getCV?.profile?.projects;
    //thêm dự án
    const onHandleAddProject = async (data: any) => {
        try {
            addProject({
                profile_id: idPost,
                ...data
            }).unwrap();
            notyf.success("Thêm Dự án thành công")

        } catch (error: any) {
            console.log("error project", error);

            notyf.error("Xóa dự án thành công")
        }
    }
    //xóa dự án
    const handleDeleteProject = async (id: string | number) => {
        try {
            await deleteProject(id).unwrap();
            notyf.success("Xóa học vấn thành công")

        } catch (error: any) {
            notyf.error(error)
        }
    }
    const [projects, setProjects] = useState([{ project_name: '', project_describe: '', start_date: '', end_date: '', project_link: '' }]);

    const handleAddProject = () => {
        setProjects([...projects, { project_name: '', project_describe: '', start_date: '', end_date: '', project_link: '' }]);
    };

    const handleRemoveProject = (index: any) => {
        const updatedProjects = [...projects];
        updatedProjects.splice(index, 1);
        setProjects(updatedProjects);
    };

    const handleChangeProject = (index: any, field: any, value: any) => {
        const updatedProjects: any = [...projects];
        updatedProjects[index][field] = value;
        setProjects(updatedProjects);
    };
    //học vấn
    const { data: dataMajor } = useGetMajorQuery();
    const listMajor = dataMajor?.major;
    const listEducation = getCV?.profile?.educations;

    const [addEducation] = useAddEduMutation();
    const [deleteEducation] = useDeleteEduMutation();
    const { register: registerEducation, handleSubmit: handleSubmitEducation, reset: resetEducation, setValue, watch } = useForm<any>();
    //thêm học vấn
    const handleAddEducation = async (data: any) => {
        try {
            await addEducation({
                profile_id: idPost,
                ...data
            }).unwrap();
            notyf.success("Thêm học vấn thành công")

        } catch (error: any) {
            notyf.error(error)
            console.log("error eddu", error);
        }
    }
    // xóa học vấn
    const handleDeleteEducation = async (id: string | number) => {
        try {
            await deleteEducation(id).unwrap();
            notyf.success("Xóa học vấn thành công")

        } catch (error: any) {
            notyf.error(error)
        }
    }
    const [education, setEducation] = useState([{ major_id: "", name: '', gpa: '', start_date: '', end_date: '', type_degree: "" }]);

    const handleAddEdu = () => {
        setEducation([...education, { major_id: "", name: '', gpa: '', start_date: '', end_date: '', type_degree: "" }]);
    };

    const handleRemoveEdu = (index: any) => {
        const updatedEdu = [...education];
        updatedEdu.splice(index, 1);
        setEducation(updatedEdu);
    };

    const handleChangeEdu = (index: any, field: any, value: any) => {
        const updatedEdu: any = [...education];
        updatedEdu[index][field] = value;
        setEducation(updatedEdu);
    };
    // kinh nghiệm

    const [addExp] = useAddExpMutation();
    const { register: registerExp, handleSubmit: handleSubmitExp, reset: resetExp } = useForm<any>();

    const listExp = getCV?.profile?.exps;

    const [deleteExp] = useRemoveExpMutation();
    const handleDeleteExp = async (id: any) => {
        try {
            await deleteExp(id).unwrap();
            notyf.success("Xóa dự án thành công")

        } catch (error: any) {
            console.log(error);

            notyf.error(error)

        }
    }

    const onHandleSubmitExp = async (data: any) => {
        try {
            await addExp({
                profile_id: idPost,
                ...data
            }).unwrap();
            notyf.success("Thêm dự án thành công")

        } catch (error: any) {
            notyf.error(error?.data?.message)
        }
    }
    const [experience, setExperience] = useState([{ position: "", company_name: '', start_date: '', end_date: '' }]);

    const handleAddExp = () => {
        setExperience([...experience, { position: "", company_name: '', start_date: '', end_date: '' }]);
    };

    const handleRemoveExp = (index: any) => {
        const updatedExp = [...experience];
        updatedExp.splice(index, 1);
        setExperience(updatedExp);
    };

    const handleChangeExp = (index: any, field: any, value: any) => {
        const updatedExp: any = [...experience];
        updatedExp[index][field] = value;
        setExperience(updatedExp);
    };

    useEffect(() => {
        //skill
        setSkills(listSkill);
        //profile
        setProfile(listProfile);
        // dự án
        setProjects(listProject);
        //kinh nghiệm
        setExperience(listExp);
        //học vấn
        setEducation(listEducation);
        //reset
        resetSkill(listSkill);
        resetProject(listProject);
        reset(listProfile);
        resetExp(experience);
        resetEducation(education);
    }, [listProfile, listExp, listEducation, listProject, listSkill]);

    return (
        <div className='max-w-screen-xl mx-auto'>

            {/* nhập */}
            <div className='mx-24'>
                {/* thông tin cá nhân */}
                <div>
                    <h2 className='bg-[#304340] text-white text-lg font-semibold p-2 my-6'>Thông tin cá nhân</h2>
                    <form onSubmit={handleSubmit(onHandleSubmit)}>
                        <div className='border border-gray-200 p-5 grid grid-cols-3 gap-8'>
                            <div>
                                <label className='block font-semibold mb-2'>Hinh anh</label>
                                <input
                                    {...register('image')}
                                    name='title'
                                    defaultValue={profile.image}
                                    onChange={handleInputChange}
                                    type="file" className='border border-gray-200 p-2 w-full'
                                />
                            </div>
                            <div>
                                <label className='block font-semibold mb-2'>Vị trí ứng tuyển:</label>
                                <input
                                    {...register('title')}
                                    name='title'
                                    defaultValue={profile.title}
                                    onChange={handleInputChange}
                                    type="text" className='border border-gray-200 p-2 w-full'
                                />
                            </div>
                            <div>
                                <label htmlFor="full-name" className='block font-semibold mb-2'>Họ tên:</label>
                                <input type="text"
                                    {...register('name')}

                                    name='name'
                                    defaultValue={profile?.name}
                                    onChange={handleInputChange}
                                    className='border border-gray-200 p-2 w-full' />
                            </div>
                            <div>
                                <label htmlFor="full-name" className='block font-semibold mb-2'>Số điện thoại:</label>
                                <input type="text"
                                    {...register('phone')}
                                    name='phone'
                                    defaultValue={profile?.phone}
                                    onChange={handleInputChange}
                                    className='border border-gray-200 p-2 w-full' />
                            </div>
                            <div>
                                <label htmlFor="full-name" className='block font-semibold mb-2'>Email:</label>
                                <input type="text"
                                    {...register('email')}
                                    defaultValue={profile?.email}
                                    onChange={handleInputChange}
                                    name='email'
                                    className='border border-gray-200 p-2 w-full' />
                            </div>
                            <div>
                                <label htmlFor="full-name"
                                    className='block font-semibold mb-2'>Địa chỉ:</label>
                                <input type="text"
                                    defaultValue={profile?.address}
                                    onChange={handleInputChange}
                                    name="address" className='border border-gray-200 p-2 w-full' />
                            </div>
                            <div>
                                <label htmlFor="full-name"

                                    className='block font-semibold mb-2'>Ngày sinh</label>
                                <input type="text"
                                    {...register('birth')}
                                    defaultValue={profile?.birth}
                                    name='birth'
                                    onChange={handleInputChange} className='border border-gray-200 p-2 w-full' />
                            </div>

                        </div>
                        <button className='mt-5 bg-blue-500 text-white rounded px-5 py-2'>Lưu</button>
                    </form>
                </div>
                {/* kinh nghiệm làm việc */}
                <div>
                    <h2 className='bg-[#304340] text-white text-lg font-semibold p-2 my-6'>Kinh nghiệm làm việc</h2>
                    {experience?.map((experiences: any, index) => (
                        <div>
                            <button
                                type="button"
                                onClick={() => handleDeleteExp(experiences?.id)}
                                className='bg-red-500 text-white p-1.5 '
                            >
                                <IoTrashOutline />
                            </button>

                            <form key={index} onSubmit={handleSubmitExp(onHandleSubmitExp)}>
                                <div className='border border-gray-200 p-5 my-3 grid grid-cols-3 gap-8'>
                                    {/* tên công ty */}
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Tên công ty</div>
                                        </label>
                                        <input
                                            {...registerExp("company_name")}
                                            type="text"
                                            name='company_name'
                                            defaultValue={experiences.company_name}
                                            onChange={(e) => handleChangeExp(index, 'company_name', e.target.value)}
                                            className='border border-gray-200 p-2 w-full'
                                        />
                                    </div>

                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Mô tả</div>
                                        </label>
                                        <input
                                            {...registerExp("position")}
                                            type="text"
                                            name='position'
                                            defaultValue={experiences.position}
                                            onChange={(e) => handleChangeExp(index, 'position', e.target.value)}
                                            className='border border-gray-200 p-2 w-full'
                                        />
                                    </div>

                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveExp(index)}
                                            className='bg-red-500 text-white p-1.5 float-right'
                                        >
                                            <AiOutlineClose />
                                        </button>
                                    </div>
                                    {/* ngày bắt đầu */}
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Ngày bắt đầu</div>
                                        </label>
                                        <input
                                            type="text"
                                            {...registerExp('start_date')}
                                            name='start_date'
                                            defaultValue={experiences.start_date}
                                            onChange={(e) => handleChangeExp(index, 'start_date', e.target.value)}
                                            className='border border-gray-200 p-2 w-full'
                                        />
                                    </div>
                                    {/* ngày kết thúc */}
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Ngày kết thúc</div>
                                        </label>
                                        <input
                                            {...registerExp('end_date')}
                                            type="text"
                                            name='end_date'
                                            defaultValue={experiences.end_date}
                                            onChange={(e) => handleChangeExp(index, 'end_date', e.target.value)}
                                            className='border border-gray-200 p-2 w-full'
                                        />
                                    </div>
                                </div>
                                <button className='mt-3 mb-2 bg-blue-500 text-white rounded px-5 py-2'>Lưu</button>

                            </form>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddExp} className='bg-blue-500 text-white p-1.5'>
                        <AiOutlinePlus />
                    </button>
                </div>
                {/* học vấn */}
                <div>
                    <h2 className='bg-[#304340] text-white text-lg font-semibold p-2 my-6'>Học vấn</h2>
                    {education?.map((educations: any, index) => (
                        <div>
                            <button
                                onClick={() => handleDeleteEducation(educations?.id)}
                                className='text-white bg-red-500 px-3 py-2 rounded'
                            > <IoTrashOutline /></button>
                            <form key={index} onSubmit={handleSubmitEducation(handleAddEducation)}>
                                <div key={index} className='border border-gray-200 p-5 my-3 grid grid-cols-3 gap-8'>
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Trường học</div>
                                        </label>
                                        <input
                                            {...registerEducation('name')}
                                            type="text"
                                            name='name'
                                            defaultValue={educations.name}
                                            onChange={(e: any) => handleChangeEdu(index, 'name', e.target.value)}
                                            className='border border-gray-200 p-2 w-full'
                                        />
                                    </div>
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Điểm trung bình</div>
                                        </label>
                                        <input
                                            {...registerEducation('gpa')}

                                            type="text"
                                            name='gpa'
                                            defaultValue={educations.gpa}
                                            onChange={(e) => handleChangeEdu(index, 'gpa', e.target.value)}
                                            className='border border-gray-200 p-2 w-full'
                                        />
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveEdu(index)}
                                            className='bg-red-500 text-white p-1.5 float-right'
                                        >
                                            <AiOutlineClose />
                                        </button>
                                    </div>
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Chuyên ngành</div>
                                        </label>
                                        <select
                                            {...registerEducation('major_id')}
                                            defaultValue={educations.major_id}
                                            value={watch("major_id") || educations.major_id}
                                            className='border border-gray-200 p-2 w-full outline-none'
                                            onChange={(e: any) => {
                                                handleChangeEdu(index, 'major_id', e.target.value)
                                                setValue('major_id', e.target.value)
                                            }}
                                        >
                                            {listMajor?.map((item: any) => {
                                                return (<option
                                                    key={item?.id}
                                                    value={item?.id}
                                                >
                                                    {item?.major}
                                                </option>)
                                            })}

                                        </select>
                                    </div>
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Loại bằng</div>
                                        </label>
                                        <select
                                            {...registerEducation('type_degree')}
                                            defaultValue={educations.type_degree}
                                            className='border border-gray-200 p-2 w-full outline-none'
                                            onChange={(e: any) => handleChangeEdu(index, 'type_degree', e.target.value)}
                                        >
                                            <option
                                                value="1"
                                            >
                                                Đại Học
                                            </option>
                                            <option
                                                value="2"
                                            >
                                                Cao đẳng
                                            </option>
                                            <option
                                                value="3"
                                            >
                                                Trung cấp
                                            </option>
                                            <option
                                                value="4"
                                            >
                                                Sau đại học(Tiến sĩ/Thạc sỹ)
                                            </option>
                                            <option
                                                value="5"
                                            >
                                                Trung tâm đào tạo
                                            </option>
                                            <option
                                                value="6"
                                            >
                                                Du Học
                                            </option>
                                        </select>

                                    </div>

                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Ngày bắt đầu</div>
                                        </label>
                                        <input
                                            {...registerEducation('start_date')}

                                            type="text"
                                            name='start_date'
                                            defaultValue={educations.start_date}
                                            onChange={(e) => handleChangeEdu(index, 'start_date', e.target.value)}
                                            className='border border-gray-200 p-2 w-full'
                                        />
                                    </div>
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Ngày kết thúc</div>
                                        </label>
                                        <input
                                            {...registerEducation('end_date')}

                                            type="text"
                                            name='end_date'
                                            defaultValue={educations.end_date}
                                            onChange={(e) => handleChangeEdu(index, 'end_date', e.target.value)}
                                            className='border border-gray-200 p-2 w-full'
                                        />
                                    </div>
                                </div>
                                <button type="submit" className='bg-blue-500 text-white p-1.5 my-2 rounded'>
                                    Lưu
                                </button>
                            </form>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddEdu} className='bg-blue-500 text-white p-1.5'>
                        <AiOutlinePlus />
                    </button>
                </div>
                {/* kỹ năng */}
                <div>
                    <h2 className='bg-[#304340] text-white text-lg font-semibold p-2 my-6'>Kĩ năng</h2>
                    {skills?.map((skill: any, index) => (
                        <div>
                            <button
                                type="button"
                                onClick={() => onHandleDeleteSkill(skill?.id)}
                                className='bg-red-500 text-white p-1.5 '
                            >
                                <IoTrashOutline />
                            </button>
                            <form onSubmit={handleSubmitSkill(onHandleAddSkill)}>
                                <div key={index} className='border border-gray-200 p-5 my-3'>
                                    <div>
                                        <label className='font-semibold mb-2 flex justify-between items-center'>
                                            <div>Kĩ năng</div>
                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveSkill(index)}
                                                    className='bg-red-500 text-white p-1.5 float-right'
                                                >
                                                    <AiOutlineClose />
                                                </button>
                                            </div>

                                        </label>

                                        <input
                                            type="text"
                                            name='skill'
                                            defaultValue={skill}
                                            onChange={(e) => handleChangeSkill(index, e.target.value)}
                                            className='border border-gray-200 p-2 w-full'
                                        />
                                    </div>

                                </div>
                                <button type="submit" className='bg-blue-500 text-white p-1.5 my-2 rounded'>
                                    Lưu
                                </button>
                            </form>
                        </div>
                    ))}
                    <button type="submit" className='bg-blue-500 text-white p-1.5' onClick={handleAddSkill}>
                        <AiOutlinePlus />
                    </button>
                </div>

                {/* dự án */}
                <div>
                    <h2 className='bg-[#304340] text-white text-lg font-semibold p-2 my-6'>Project</h2>
                    {projects?.map((project: any, index) => (
                        <div>
                            <button
                                type="button"
                                onClick={() => handleDeleteProject(project?.id)}
                                className='bg-red-500 text-white p-1.5 '
                            >
                                <IoTrashOutline />
                            </button>
                            <form onSubmit={handleSubmitProject(onHandleAddProject)}>
                                <div key={index} className='border border-gray-200 p-5 my-3 grid grid-cols-3 gap-8'>
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Tên đề tài</div>
                                        </label>
                                        <input
                                            {...registerProject('project_name')}
                                            type="text"
                                            name='project_name'
                                            defaultValue={project.project_name}
                                            onChange={(e: any) => handleChangeProject(index, 'project_name', e.target.value)}
                                            className='border border-gray-200 p-2 w-full'
                                        />
                                    </div>
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Mô tả đề tài</div>
                                        </label>
                                        <input
                                            {...registerProject('project_name')}

                                            type="text"
                                            name='project_describe'
                                            defaultValue={project.project_describe}
                                            onChange={(e) => handleChangeProject(index, 'project_describe', e.target.value)}
                                            className='border border-gray-200 p-2 w-full'
                                        />
                                    </div>

                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveProject(index)}
                                            className='bg-red-500 text-white p-1.5 float-right'
                                        >
                                            <AiOutlineClose />
                                        </button>
                                    </div>

                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Link project</div>
                                        </label>
                                        <input
                                            type="text"
                                            name='project_link'
                                            defaultValue={project.project_link}
                                            onChange={(e) => handleChangeProject(index, 'project_link', e.target.value)}
                                            className='border border-gray-200 p-2 w-full'
                                        />
                                    </div>

                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Ngày bắt đầu</div>
                                        </label>
                                        <input
                                            {...registerProject('start_date')}
                                            type="text"
                                            name='start_date'
                                            defaultValue={project.start_date}
                                            onChange={(e) => handleChangeProject(index, 'start_date', e.target.value)}
                                            className='border border-gray-200 p-2 w-full'
                                        />
                                    </div>
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Ngày kết thúc</div>
                                        </label>
                                        <input
                                            {...registerProject('end_date')}

                                            type="text"
                                            name='end_date'
                                            defaultValue={project.end_date}
                                            onChange={(e) => handleChangeProject(index, 'end_date', e.target.value)}
                                            className='border border-gray-200 p-2 w-full'
                                        />
                                    </div>
                                </div>
                                <button className='mt-3 mb-2 bg-blue-500 text-white rounded px-5 py-2'>Lưu</button>
                            </form>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddProject} className='bg-blue-500 text-white p-1.5'>
                        <AiOutlinePlus />
                    </button>
                </div>
            </div>

            {/* cv hiện */}
            <div className='grid grid-cols-6 border shadow-4xl w-10/12 mx-auto rounded-xl my-6'>
                <div className='bg-[#246b5f] col-span-2 px-7 text-white py-12 rounded-tl-lg rounded-bl-xl'>
                    <div className=''>
                        <img className='w-28 h-28 rounded-full mx-auto' src={profile.image} alt="" />
                    </div>
                    <div className='text-center'>
                        <p className='text-2xl font-semibold mt-5'>{profile.name}</p>
                        <p className='border-b-2 my-3 border-gray-300 w-1/6 mx-auto'></p>
                        <p className='uppercase text-sm'>{profile.title}</p>
                    </div>
                    <div className='my-5'>
                        <h2 className='text-xl my-3 font-semibold'>Thông tin cá nhân</h2>
                        <div className='leading-8'>
                            <p>Ngày sinh: <span>{profile.birth}</span></p>
                            <p>Số điện thoại: <span>{profile.phone}</span></p>
                            <p>Email: <span>{profile.email}</span></p>
                            <p>Địa chỉ: <span>{profile.address}</span></p>
                        </div>
                    </div>
                    <div>
                        <h2 className='text-xl my-3 font-semibold'>Kĩ năng</h2>
                        <div>
                            <p>{skills.join(', ')} </p>
                        </div>
                    </div>
                </div>
                <div className='bg-white col-span-4 px-7 py-12 flex flex-col gap-8 rounded-tr-lg rounded-br-xl'>
                    <p className='text-[#1e7a6b] text-xl font-semibold'>Kinh nghiệm làm việc</p>
                    <p className='border-b border-gray-200 my-2'></p>
                    {experience?.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className='flex flex-col gap-1'>
                                    <p className='font-semibold mt-2'>Tên công ty:
                                        <span className='font-normal ml-1'>{item.company_name}</span>
                                    </p>
                                    <p className='font-semibold'>Thời gian:
                                        <span className='bg-[#1b6256] text-white py-1 px-2 rounded-lg mx-1'>{item.start_date}</span>-
                                        <span className='bg-[#1b6256] text-white py-1 px-2 rounded-lg ml-1'>{item.end_date}</span>
                                    </p>
                                    <p className='font-semibold mt-2'>Mô tả:
                                        <span className='font-normal ml-1'>{item.position}</span>
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                    <div >
                        <p className='text-[#1e7a6b] text-xl font-semibold'>Học vấn</p>
                        <p className='border-b border-gray-200 my-2'></p>
                        {education?.map((item, index) => {
                            return (
                                <div key={index}>
                                    <p className='bg-gray-100 font-semibold my-4 text-lg'>{item.name}</p>
                                    <div className='flex flex-col gap-1'>
                                        <p className='font-semibold'>Thời gian:
                                            <span className='bg-[#1b6256] text-white py-1 px-2 rounded-lg mx-1'>{item?.start_date}</span>-
                                            <span className='bg-[#1b6256] text-white py-1 px-2 rounded-lg ml-1'>{item?.end_date}</span>
                                        </p>
                                        <p className='font-semibold'>GPA:
                                            <span className='font-normal ml-1'>{item?.gpa}</span>
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <p className='text-[#1e7a6b] text-xl font-semibold'>Dự án</p>
                        <p className='border-b border-gray-200 my-2'></p>
                        {projects?.map((item, index) => {
                            return <div key={index}>
                                <p className='bg-gray-100 font-semibold my-4 text-lg'>{item?.project_name}</p>
                                <div className='flex flex-col gap-1'>
                                    <p className='font-semibold'>Thời gian:
                                        <span className='bg-[#1b6256] text-white py-1 px-2 rounded-lg mx-1'>{item.start_date}</span>-
                                        <span className='bg-[#1b6256] text-white py-1 px-2 rounded-lg ml-1'>{item.end_date}</span>
                                    </p>
                                    <p className='font-semibold mt-2'>Mô tả:
                                        <span className='font-normal ml-1'>{item.project_describe}</span>
                                    </p>
                                    <p className='font-semibold'>Link github:
                                        <span className='underline font-normal ml-1'>{item.project_link}</span>
                                    </p>
                                </div>
                            </div>
                        })}


                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCvTest