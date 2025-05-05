import { TextInput, Group, Button, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { type ReactElement } from 'react';
import type { SignUpFormValues } from '@types'
import { useAuth } from '@context/AuthContext/useAuth';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';

const SignUpForm = (): ReactElement => {
    const {signUp, currentUser} = useAuth();
    const [visible, { toggle }] = useDisclosure(false);
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
          password: (value) => (value.length >= 6 ? null : 'Password too short'),
          confirmPassword: (value, values) => (value !== values.password ? 'Passwords do not match' : null)
        }
    });

      const submitSignUpInfo = async (values: SignUpFormValues) => {
        const {email, password} = values;

        try {
            const userCredential = await signUp(email, password);
            if (userCredential) {
                navigate('/home');
            }
            // Handle successful sign up
        } catch (error) {
            // Handle errors
            console.log(error);
        }
      }
      
    return (
        <>
            {currentUser ? 
            <div>
                You're already logged in
            </div> : 
            <form onSubmit={form.onSubmit((values) => submitSignUpInfo(values))}>
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
                    visible={visible}
                    onVisibilityChange={toggle}
                />

                <PasswordInput
                    withAsterisk
                    label='Confirm password'
                    placeholder='Confirm password'
                    key={form.key('confirmPassword')}
                    {...form.getInputProps('confirmPassword')}
                    visible={visible}
                    onVisibilityChange={toggle}
                />
        
                <Group justify="flex-end" mt="md">
                    <Button type="submit">Register</Button>
                </Group>
            </form>
            }
        </>
      );
};

export default SignUpForm;
