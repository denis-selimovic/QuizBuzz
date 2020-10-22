import React from 'react';
import { Button, Input } from 'antd';
import { Link as RedirectLink } from "react-router-dom";

export default function Login(props) {
    return (
        <div>
            <Input placeholder="Username"></Input>
            <Input placeholder="Password" type="password"></Input>
            <Button type="primary">Log in</Button>
            <RedirectLink to="/register">Don't have an account? Register.</RedirectLink>
        </div>
    )
}