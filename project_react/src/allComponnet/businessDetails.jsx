import { observer } from "mobx-react-lite";
import businessStore from "../allMobx/businessData";
import { useState, useEffect } from "react";
import { Paper } from "@mui/material";
const BusinessDetails = observer(() => {
    const [isLoading, setIsLoading] = useState(true);
    const [businessDetailsDisplay, setBusinessDetailsDisplay] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
              const res=await businessStore.initList();
                const data = businessStore.getBusiness;
                setBusinessDetailsDisplay(data);
            } catch (error) {
                console.error('Error fetching business data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading || !businessDetailsDisplay) {
        return null;
    }

    const { name, address, phone, owner, logo, description } = businessDetailsDisplay;
   

    return (
<Paper className='business-details-paper' style={{ width: "550px", height: "220px", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ marginRight: "20px" }}>
        <p>{name}</p>
        <p>{address}</p>
        <p>{phone}</p>
    </div>
    <img src={logo} alt="logo" className='logo-image' style={{ width: "150px" }}/>
</Paper>
    );
});

export default BusinessDetails;










