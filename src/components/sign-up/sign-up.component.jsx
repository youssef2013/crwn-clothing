import React from 'react';
import FormInput from '../../components/form-input/form-input.component';
import './sign-up.styles.scss';
import CustomButton from '../../components/custom-button/custom-button.component';
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, { displayName });
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }
    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='sign-up'>
                <h2>I do not have an account</h2>
                <span>Sig up with your email and password</span>

                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        label='Ddisplay Name'
                        handleChange={this.handleChange}
                        value={displayName}
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        label='email'
                        handleChange={this.handleChange}
                        value={email}
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        label='Password'
                        handleChange={this.handleChange}
                        value={password}
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        label='Confirm Password'
                        handleChange={this.handleChange}
                        value={confirmPassword}
                        required
                    />
                    <CustomButton type='submit'>Sign Up</CustomButton>

                </form>
            </div>

        )
    }
}

export default SignUp;


