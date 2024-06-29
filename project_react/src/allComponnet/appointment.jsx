import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import React from 'react';
import { TextField, Box, Button, Stack } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Card, Space } from 'antd';
import singleton from '../allMobx/mobx-dataStore';
import dayjs from 'dayjs';

const Appointment = observer(({serviceId}) => {
    const [add,setAdd]=useState(false)
    const [valueDate, setValueDate] = React.useState(dayjs());
    const [meet, setMeet] = useState({
        id: "",
        serviceType: "",
        dateTime: "",
        clientName: "",
        clientPhone: "",
        clientEmail: ""
    });

    let addMeet = (e) => {
        e.preventDefault();
        meet["dateTime"] = valueDate.toISOString();
   singleton.addMeet(meet)
        setAdd(true);
       
    }

    const handleBlur = (field, value) => {
        setMeet(prevState => ({
            ...prevState,
            [field]: value
        }));
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
             {  !add&& <form>
                    <div style={{ width: "250px", position: 'relative' }}>
                        <Space direction="vertical" size={16} >
                        <Card title="new meeting" style={{ width: 300, backgroundColor:  "pink" , position: 'absolute', top: '50%', left: '65%', transform: 'translate(-50%, -50%)', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 20px 5px rgba(0,0,0,0.3)' }}>
                                <TextField id="outlined-basic" label="insert Id" variant="outlined" style={{ marginTop: "5px" }} onBlur={(e) => handleBlur("id", e.target.value)} />
                                <TextField id="outlined-basic" label='insert service type' style={{ marginTop: "5px", marginBottom: " 5px" }} onBlur={(e) => handleBlur("serviceType", e.target.value)} value={serviceId} />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker label="Basic date time picker" onChange={(newValue) => setValueDate(newValue)} />
                                </LocalizationProvider>
                                <TextField id="outlined-basic" label='insert client name' style={{ marginTop: "5px" }} onBlur={(e) => handleBlur("clientName", e.target.value)} />
                                <TextField id="outlined-basic" label='insert client phone' style={{ marginTop: "5px" }} onBlur={(e) => handleBlur("clientPhone", e.target.value)} />
                                <TextField id="outlined-basic" label='insert client email' style={{ marginTop: "5px" }} onBlur={(e) => handleBlur("clientEmail", e.target.value)} />
                                <Button variant="outlined" onClick={addMeet} size="large" style={{ width: "150px" }} color="secondary">add</Button>
                            </Card>
                        </Space>
                    </div>
                </form>}
            </Stack>
        </Box>
    );
});

export default Appointment;
