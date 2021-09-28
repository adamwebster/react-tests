import {
    Button,
    Input,
    Label,
    FormField,
    Alert,
} from '@adamwebster/fused-components';
import { useForm } from '../../hooks/useForm';

const UseFormPage = () => {
    const {
        data,
        handleChange,
        handleSubmit,
        errors,
        ErrorComponent,
    } = useForm({
        initialValues: {
            username: 'John',
            password: '',
            rememberMe: false,
            select: 'test1',
            radios: 'one',
        },
        onSubmit: () => console.log('submit', data),
        validations: {
            password: {
                required: {
                    value: true,
                    message: 'This password field is required',
                },
            },
            username: {
                required: {
                    value: true,
                    message: 'This username field is required',
                },
            },
            rememberMe: {
                required: {
                    value: true,
                    message: 'This remember me field is required',
                },
            },
        },
    });

    const checkIfInError = (key: string) => {
        return (
            errors.filter(
                (error: { key: string; message: string }) => error.key === key
            ).length > 0
        );
    };
    return (
        <>
            <ErrorComponent />
            <form onSubmit={handleSubmit}>
                <FormField
                    label="Name"
                    htmlFor="name"
                    validationMessage={errors.username}
                >
                    <Input
                        inError={checkIfInError('username')}
                        id="name"
                        value={data.username || ''}
                        onChange={handleChange('username')}
                    />
                </FormField>
                <FormField
                    label="Password"
                    htmlFor="Password"
                    validationMessage={errors.password}
                >
                    <Input
                        inError={checkIfInError('password')}
                        type="password"
                        id="password"
                        value={data.password || ''}
                        onChange={handleChange('password')}
                    />
                </FormField>
                <Label htmlFor="rememberMe">Remember Me</Label>
                <input
                    type="checkbox"
                    checked={data.rememberMe || false}
                    onChange={handleChange('rememberMe')}
                    id="rememberMe"
                />
                <select
                    value={data.select || ''}
                    onChange={handleChange('select')}
                >
                    <option value="test1">Test 1</option>
                    <option value="test2">Test 2</option>
                </select>
                <div>
                    <Label>
                        One
                        <input
                            type="radio"
                            checked={data.radios === 'one' || false}
                            value="one"
                            id="one"
                            name="test"
                            onChange={handleChange('radios')}
                        />
                    </Label>
                    <Label>
                        Two
                        <input
                            type="radio"
                            checked={data.radios === 'two' || false}
                            value="two"
                            name="test"
                            id="two"
                            onChange={handleChange('radios')}
                        />
                    </Label>

                    <Label>
                        Three
                        <input
                            type="radio"
                            checked={data.radios === 'three' || false}
                            value="three"
                            id="three"
                            name="test"
                            onChange={handleChange('radios')}
                        />
                    </Label>
                </div>
                <Button primary>Log in</Button>
            </form>
        </>
    );
};

export default UseFormPage;
