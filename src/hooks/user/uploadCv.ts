import { useCustomMutation } from '@refinedev/core';
import { UploadChangeParam } from 'antd/es/upload';
import { InternalUploadFile } from 'antd/es/upload/interface';
import { UploadFile } from 'antd/lib';

type ResponseUploadCv = {
    filename: string;
    id: string;
    size: number;
    url: string;
};

type UseUploadCv = {
    handleSetLinkCv: (link: string) => void;
};

const useUploadCv = ({ handleSetLinkCv }: UseUploadCv) => {
    const cv = useCustomMutation<ResponseUploadCv>();
    const handleUpload = async (files: UploadChangeParam<UploadFile>) => {
        const newfiles = files as unknown as UploadChangeParam<
            InternalUploadFile<ResponseUploadCv>
        >;
        const formData = new FormData();
        formData.append('upload', newfiles.fileList[0].originFileObj);
        const res = await cv.mutateAsync({
            method: 'post',
            url: 'upload-file',
            values: formData,
            dataProviderName: 'media',
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        });
        handleSetLinkCv(res.data.url);
    };

    return handleUpload;
};
export default useUploadCv;
