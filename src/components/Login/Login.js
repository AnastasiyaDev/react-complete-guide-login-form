import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

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
                <div
                    className={`${classes.control} ${
                        emailState.isValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        passwordState.isValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={passwordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                    />
                </div>
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
