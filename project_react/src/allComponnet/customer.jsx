import LoginForm from './loginForm';
import BusinessDetails from './businessDetails';
import ServiceData from './servicesData';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function Customer() {
    const [login, setLogin] = useState(false);
   const navigate=useNavigate();

    return (
        <div>
            {login && (
                <div style={{ order: 2 }}>
                    <LoginForm  />
                </div>
            )}
            {!login && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div style={{ order: 1 }}>
                        <BusinessDetails />
                    </div>
                    <div style={{ display: 'flex', order: 4, marginTop: "30px" }}>
                        <ServiceData Manager={false} />
                    </div>

                    <div style={{ display: 'flex', order: 3 }}>
                        <Button variant="contained" onClick={() => setLogin(!login)} color="secondary">{login ? <span>Cancel Login</span> : <span>Login</span>}</Button>
                    </div>
                </div>
            )}
        </div>
    );
}