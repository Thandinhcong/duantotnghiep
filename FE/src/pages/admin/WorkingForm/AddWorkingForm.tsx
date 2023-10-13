import { Button, Form, Input, Skeleton } from 'antd';
import { useAddWorkingFormMutation } from '../../../api/workingFormApi';
import { Link, useNavigate } from 'react-router-dom';
import { IWorkingForm } from '../../../interfaces';
import { EnterOutlined } from "@ant-design/icons"

const AddWorkingForm = () => {
    const [addWorkForm, { isLoading }] = useAddWorkingFormMutation();
    const navigate = useNavigate();

    if (isLoading) return <Skeleton />
    const onFinish = (values: IWorkingForm) => {
        addWorkForm(values)
            .unwrap()
            .then(() => {
                return navigate({
                    pathname: "/admin/working-form"
                })
            });
    }

    return (
        <div>
            <Link to="/admin/skill-manage">Quay lại <EnterOutlined /></Link>
            <h2 className="m-6 text-2xl font-semibold">Thêm hình thức làm việc</h2>
            <Form className="mx-40"
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 400 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"

            >
                <Form.Item<IWorkingForm>
                    label="Name"
                    name="working_form"
                    rules={[
                        { required: true, message: 'Vui lòng nhập hình thức làm việc!' },
                        { pattern: /^\S{3,}$/, message: "Kỹ năng phải trên 3 kí tự" }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<IWorkingForm>
                    label="Description"
                    name="description"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mô tả!' },
                        { pattern: /^\S{10,}$/, message: "Kỹ năng phải trên 10 kí tự" }

                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item labelAlign="left">
                    <Button type='primary' htmlType="submit" className='bg-blue-500'>
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddWorkingForm