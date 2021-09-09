import { ChangeEvent, FormEvent, useState } from 'react';

export const useForm = ({ initialValues, onSubmit }: any) => {
    const [data, setData] = useState(initialValues || {});

    const getValue = (element: ChangeEvent<HTMLInputElement>) => {
        switch (element.target.type) {
            case 'checkbox':
                return element.target.checked;
            default:
                return element.target.value;
        }
    };
    const handleChange = (key: any, sanitizeFn?: any) => (
        e: ChangeEvent<HTMLInputElement & HTMLSelectElement>
    ) => {
        const value = sanitizeFn ? sanitizeFn(e.target.value) : getValue(e);
        setData({
            ...data,
            [key]: value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit();
        }
    };

    return { data, handleChange, handleSubmit };
};
