import { type ReactElement } from 'react'
import { useAuth } from '@context/AuthContext/useAuth';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Group, Button } from '@mantine/core';
import type { LoginValues } from '@types';

const Login = (): ReactElement => {
    const { logIn, currentUser } = useAuth();
    const navigate = useNavigate();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length >= 6 ? null : 'Password too short')
        }
    });

    const submitLoginInfo = async (values: LoginValues) => {
        const { email, password } = values;
        try {
            await logIn(email, password);
            navigate('/home');
        } catch (error) {
            // Handle errors
            console.log(error);
        }
    };

    return (
        <>
            {currentUser ?
                <div>
                    You're already logged in
                </div> :
                <form onSubmit={form.onSubmit((values) => submitLoginInfo(values))}>
                    <TextInput
                        withAsterisk
                        label='Email'
                        placeholder='your@email.com'
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                    />

                    <PasswordInput
                        withAsterisk
                        label='Password'
                        placeholder='password'
                        key={form.key('password')}
                        {...form.getInputProps('password')}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button type="submit">Log in</Button>
                    </Group>
                </form>
            }
        </>
    )
};

export default Login;