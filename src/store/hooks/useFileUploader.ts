import { useCallback } from 'react';

type UploadParams = Record<string, any> & { file: File };

export const useFileUploader = (mutationTrigger: (body: FormData) => any) => {
    const uploadFile = useCallback(
        async (params: UploadParams) => {
            const formData = new FormData();

            Object.entries(params).forEach(([key, value]) => {
                if (key !== 'file') {
                    formData.append(key, value);
                }
            });

            formData.append('file', params.file);

            const result = await mutationTrigger(formData).unwrap();
            return result;
        },
        [mutationTrigger]
    );

    return { uploadFile };
};
