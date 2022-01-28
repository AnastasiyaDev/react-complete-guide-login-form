import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import classes from './Login.module.css';

const emailReducer = (state, action) => {
    if (action.type === 'ON_INPUT') {
        return {value: action.val, isValid: action.val.includes('@')}
    }

    if (action.type === 'ON_BLUR') {
        return {value: state.value, isValid: state.value.includes('@')}
    }

    return {value: '', isValid: false}
};

const passwordReducer = (state, action) => {
    if (action.type === 'ON_INPUT') {
        return {value: action.val, isValid: action.val.trim().length > 6}
    }

    if (action.type === 'ON_BLUR') {
        return {value: state.value, isValid: state.value.trim().length > 6}
    }

    return {value: '', isValid: false}
};

const Login = (props) => {
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null});

    const { isValid: isValidEmail } = emailState;
    const { isValid: isValidPassword } = passwordState;

    useEffect(() => {
        // clearTimeout and setTimeout need for optimization
        const timeout = setTimeout(() => {
            setFormIsValid(isValidEmail&& isValidPassword);
        }, 500);

        return () => {
            clearTimeout(timeout);
        }

    }, [isValidEmail, isValidPassword]);

    const emailChangeHandler = (event) => {
        dispatchEmail({type: 'ON_INPUT', val: event.target.value});
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({type: 'ON_INPUT', val: event.target.value});
    };

    const emailBlurHandler = () => {
        dispatchEmail({type: 'ON_BLUR'});
    };

    const passwordBlurHandler = () => {
        dispatchPassword({type: 'ON_BLUR'})
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailState.value, passwordState.value);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    id="email"
                    label="E-Mail"
                    type="email"
                    isValis={isValidEmail}
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                />

                <Input
                    id="password"
                    label="Password"
                    type="password"
                    isValis={isValidPassword}
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={passwordBlurHandler}
                />

                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
