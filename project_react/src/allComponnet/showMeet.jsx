import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import React from 'react';
import {Box,Button, Stack, StepLabel} from '@mui/material'
import StickyHeadTable from './tableMeets';
import singleton from '../allMobx/mobx-dataStore';
const ShowMeets = observer(() => {
    const [listMeets, setListMeets] = useState("");
    const [show, setShow] = useState(false);
    function showMeets() {
        singleton.init();
        setListMeets(singleton.getMeets);
        setShow(!show);
    }
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Stack spacing={2}>
                    <Button variant="outlined" onClick={showMeets} size="large" style={{ width: "150px" }} color="secondary">{show? <span>close meets</span>: <span>show meets</span>}</Button>
                   {listMeets &&  show &&
                        <StickyHeadTable></StickyHeadTable>}
                </Stack>
            </Box>
        </>
    )
});

export default ShowMeets;
