import {
    Button,
    Checkbox,
    Input,
    Label,
    FormField,
} from '@adamwebster/fused-components';
import { useForm } from '../../hooks/useForm';

const UseFormPage = () => {
    const { data, handleChange, handleSubmit } = useForm({
        initialValues: {
            username: 'John',
            password: '',
            rememberMe: false,
            select: 'test1',
            radios: 'one',
        },
        onSubmit: () => console.log('submit', data),
    });
    return (
        <>
            <form onSubmit={handleSubmit}>
                <FormField label="Name" htmlFor="name">
                    <Input
                        id="name"
                        value={data.username || ''}
                        onChange={handleChange('username')}
                    />
                </FormField>
                <FormField label="Password" htmlFor="Password">
                    <Input
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
