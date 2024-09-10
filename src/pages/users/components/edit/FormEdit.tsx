import { Edit } from '@/components/crud/edit';
import MediaManager from '@/components/media/MediaManager';
import { UserOutlined } from '@ant-design/icons';
import { getValueFromEvent } from '@refinedev/antd';
import MDEditor from '@uiw/react-md-editor';
import dayjs from 'dayjs';
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Select,
    Typography,
    Upload,
    theme,
    Avatar,
    Flex,
} from 'antd';
import { CSSProperties, useState } from 'react';
import Heading from './Heading';
import GroupButton from './GroupButton';
import useApiEdit from '@/hooks/user/apiEdit';
import useUploadCv from '@/hooks/user/uploadCv';
import useBanks from '@/hooks/qr/banks';
const { useToken } = theme;

const dateFormatList = ['YYYY/MM/DD', 'DD/MM/YY'];

const FormEdit = () => {
    const { token } = useToken();
    const { formEdit, data, init } = useApiEdit();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const { options } = useBanks();

    const handleUpload = useUploadCv({
        handleSetLinkCv: (link) => formEdit.form.setFieldValue('link_cv', link),
    });
    // props for wrapper
    const cssWrapper: CSSProperties = {
        backgroundColor: token.colorBgContainer,
        paddingBlock: '20px',
        borderRadius: '8px',
    };
    const wrapperProps = {
        style: cssWrapper,
    };

    return (
        <>
            <Edit
                breadcrumb={false}
                wrapperProps={wrapperProps}
                title={<Heading fullName={data?.full_name} />}
                goBack={false}
                isLoading={formEdit.formLoading}
                headerButtons={
                    <GroupButton saveButtonProps={formEdit.saveButtonProps} />
                }
                footerButtons={
                    <GroupButton saveButtonProps={formEdit.saveButtonProps} />
                }
            >
                <Form
                    {...formEdit.formProps}
                    layout="vertical"
                    initialValues={init}
                >
                    <Row style={{ width: '100%' }} gutter={{ sm: 32 }}>
                        <Col span={14}>
                            <Form.Item
                                label={'Họ & Tên'}
                                name={['full_name']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Xin vui lòng nhập tên user!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label={'Email'}
                                name={['email']}
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'Địa chỉ email không hợp lệ!',
                                    },
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập email!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label={'Số điện thoại'}
                                name={['phone']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại',
                                    },
                                    {
                                        pattern: /^[0-9]{10,11}$/,
                                        message:
                                            'Sai định dạng, số điện thoại phải có 10 hoặc 11 số!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label={'Ngày sinh'} name={['dob']}>
                                <DatePicker
                                    defaultPickerValue={dayjs(new Date())}
                                    format={dateFormatList}
                                    style={{ width: '100%' }}
                                    type="date"
                                />
                            </Form.Item>
                            <Form.Item label={'Giới thiệu'} name="description">
                                <MDEditor
                                    preview="edit"
                                    style={{ width: '100%' }}
                                    data-color-mode="light"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item
                                label={'Tên ngân hàng'}
                                name={['bank_name']}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    defaultValue={'Chưa có'}
                                    options={options}
                                />
                            </Form.Item>
                            <Form.Item
                                label={'Số tài khoản'}
                                name={['bank_account']}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label={'Trạng thái'} name={['status']}>
                                <Select
                                    disabled
                                    options={[
                                        {
                                            value: true,
                                            label: 'Kích hoạt',
                                        },
                                        {
                                            value: false,
                                            label: 'Vô hiệu hóa',
                                        },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item label={'Link CV'} name={'link_cv'}>
                                <Flex vertical>
                                    {formEdit.formProps.initialValues
                                        ?.link_cv && (
                                        <div style={{ marginBottom: '10px' }}>
                                            <Typography.Link
                                                href={
                                                    formEdit.formProps
                                                        .initialValues?.link_cv
                                                }
                                                target="_blank"
                                                style={{
                                                    border: '1px solid',
                                                    display: 'block',
                                                    textAlign: 'center',
                                                    borderRadius: '4px',
                                                    padding: '4px 0',
                                                }}
                                            >
                                                Xem CV
                                            </Typography.Link>
                                        </div>
                                    )}
                                    <Upload
                                        accept=".pdf"
                                        name="upload"
                                        maxCount={1}
                                        onChange={handleUpload}
                                        beforeUpload={() => false}
                                    >
                                        <Button>Tải CV</Button>
                                    </Upload>
                                </Flex>
                            </Form.Item>
                            <Form.Item
                                label={'Avatar'}
                                name={'avatar'}
                                getValueFromEvent={getValueFromEvent}
                            >
                                <Flex vertical align="center">
                                    <Avatar
                                        src={
                                            formEdit.formProps.initialValues
                                                ?.avatar
                                        }
                                        size={72}
                                        icon={<UserOutlined />}
                                        style={{
                                            borderRadius: '999px',
                                        }}
                                    />

                                    <div style={{ marginTop: '10px' }}>
                                        <Button type="default">
                                            Thay đổi avatar
                                        </Button>
                                    </div>
                                </Flex>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Edit>
            {isModalOpen && <MediaManager onClose={handleCancel} />}
        </>
    );
};

export default FormEdit;
