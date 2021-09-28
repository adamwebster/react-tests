import { Alert } from '@adamwebster/fused-components';
import { ChangeEvent, FormEvent, useState } from 'react';

export const useForm = ({ initialValues, onSubmit, validations = {} }: any) => {
    const [data, setData] = useState(initialValues || {});
    const [errors, setErrors] = useState<any>([]);

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

    const ErrorComponent = () => {
        if (errors.length > 0)
            return (
                <Alert fcStyle="danger">
                    <ul>
                        {errors.map((error: any) => (
                            <li>{error.message}</li>
                        ))}
                    </ul>
                </Alert>
            );
        return <></>;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validations) {
            let valid = true;
            const newErrors: any = [];
            for (const key in validations) {
                const value = data[key];
                const validation = validations[key];
                if (validation?.required?.value && !value) {
                    valid = false;
                    newErrors.push({
                        key,
                        message: validation?.required?.message,
                    });
                }

                const pattern = validation?.pattern;
                if (pattern?.value && !RegExp(pattern.value).test(value)) {
                    valid = false;
                    newErrors.push({ key, message: pattern.message });
                }

                const custom = validation?.custom;
                if (custom?.isValid && !custom.isValid(value)) {
                    valid = false;
                    newErrors.push({ key, message: custom.message });
                }
            }

            if (!valid) {
                setErrors(newErrors);
                return;
            }
        }

        setErrors({});
        if (onSubmit) {
            onSubmit();
        }
    };

    return { data, handleChange, handleSubmit, errors, ErrorComponent };
};
