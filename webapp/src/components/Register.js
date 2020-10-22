import React from 'react';
import { Button, Input } from 'antd';
import { Link as RedirectLink } from "react-router-dom";

export default function Register(props) {
    return (
        <div>
            Register
            <RedirectLink to="/login">Already have an account? Log in</RedirectLink>
        </div>
    )
}