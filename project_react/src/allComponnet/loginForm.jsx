import { TextField, Button } from '@mui/material';
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Alert from '@mui/material/Alert';
import { Card } from 'antd';
import Manager from './manager';
import BusinessDetails from './businessDetails';
import { useNavigate } from 'react-router-dom';
export default function LoginForm() {
    const [errorMessage, setErrorMessage] = useState("");
    const [succed, setSucced] = useState(false);
    const nameRef = useRef();
    const passwordRef = useRef();
    const url = "http://localhost:8787";
    const navigate = useNavigate()
    useEffect(() => {
        navigate("/login");
    }, [])
    async function post() {
        try {
            const response = await axios.post(`${url}/login`, {
                name: nameRef.current.value,
                password: passwordRef.current.value
            });

            console.log(response.data);
            if (response.status === 200) {
                setSucced(true);
                navigate("/admin");
            } else {

                setErrorMessage("oops the code or the password is wrong!");
            }
        } catch (error) {

            console.log(error.response.data);
            setErrorMessage("oops the code or the password is wrong!");
            setTimeout(() => {
                setErrorMessage("");
            }, 2000);
        }
    }

    useEffect(() => {
        if (!succed) {
            const timer = setTimeout(() => {
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [succed]);

    return (

        <>    {!succed ? (
            <>
                <div style={{ marginTop: "-250px" }}> <BusinessDetails></BusinessDetails></div>
                <div style={{ marginTop: "50px" }}>
                    {!errorMessage ? (<Card >

                        <>
                            <Button variant='contained' color="secondary" onClick={post}>Login</Button>
                            {/* <button onClick={post}>Login</button> */}
                            <TextField inputRef={nameRef} label='Enter name' variant="outlined" />
                            <TextField inputRef={passwordRef} label='Enter password' variant="outlined" />
                        </>

                    </Card>) :
                        <Alert severity="success" color="info" >{errorMessage}</Alert>}
                </div>
            </>
        ) : (
            <>

                <Manager></Manager>
            </>
        )}</>



    );
}
