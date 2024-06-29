import React, { useState,useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import businessStore from '../allMobx/businessData'
import EditIcon from "@mui/icons-material/Edit";
import {TextField } from '@mui/material';
import BusinessDetails from './businessDetails';
import { Card, Space } from 'antd';
const EditBusinessDetails = observer(({ setIsEditDatails }) => {
    const [newDetails, setNewDetails] = useState({
      name: '',
      address: '',
      email: '',
      phone: '',
      owner:'',
      logo:'',
      description:'',
    });
  
  useEffect(() => {
      setNewDetails({
        name: businessStore.businessData.name,
        address: businessStore.businessData.address,
        email: businessStore.businessData.email,
        phone: businessStore.businessData.phone,
        owner: businessStore.businessData.owner,
        logo: businessStore.businessData.logo,
        description: businessStore.businessData.description,
        id:businessStore.businessData.id,
      });
  }, []);
const [isClick,setIsClick]=useState(false);
  const handleChange = (e) => {
    setNewDetails({ ...newDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    businessStore.addBusiness(newDetails);
    setIsClick(false);
   setNewDetails(newDetails);
  };

  return (<>
    {!isClick&&<BusinessDetails></BusinessDetails>}
    <form onSubmit={handleSubmit}>
      
   <EditIcon onClick={() => setIsClick(!isClick)} fontSize='large'/>  
 <>  { isClick&&<>
  <Space direction="vertical" size={16}>
      <Card title="edit busniess" style={{ width: 550 , backgroundColor: "rgb(169, 124, 162)", boxShadow: '0px 0px 20px 5px rgba(0,0,0,0.3)',borderRadius: '10px'}}>
      <TextField type="text" name="name" value={newDetails.name} onChange={handleChange} placeholder="Enter the name of the studio" />
      <TextField type="text" name="address" value={newDetails.address} onChange={handleChange} placeholder="Enter the address of the studio" />
      <TextField type="text" name="email" value={newDetails.email} onChange={handleChange} placeholder="Enter email"/>
      <TextField type="text" name="phone" value={newDetails.phone} onChange={handleChange} placeholder="Enter a phone number"/>
      <TextField type="text" name="owner" value={newDetails.owner} onChange={handleChange} placeholder="Enter a owner "/>
      <TextField type="text" name="logo" value={newDetails.logo} onChange={handleChange} placeholder="Enter a logo"/>
      <TextField type="text" name="description" value={newDetails.description} onChange={handleChange} placeholder="Enter description"/>
      <TextField type='number' name='id' value={newDetails.id}  onChange={handleChange}  placeholder="Enter id"></TextField>
      <button type="submit">Save</button>
      </Card>
      </Space>
      </>}</>
    </form></>
  );
});

export default EditBusinessDetails;
























// import { useContext } from "react";
// import { StudioDatails } from "../businessDatails";

// const context = useContext(StudioDatails);

// export default function EditBusinessDatails(props)
// {
    
//     function handleSubmit(e){

//     }

//     return(
//         <>
//         <form onSubmit={handleSubmit}>
//         <TextField  onBlur={(e) => context.setStudioName(e.target.value)} placeholder="enter name of studiu" type="text" />
//         <TextField  onBlur={(e) => context.setEmail(e.target.value)} placeholder="enter email" type="text" />
//         <TextField  onBlur={(e) => context.setPhone(e.target.value)} placeholder="enter phone" type="text" />
//         <TextField  onBlur={(e) => context.setAddress(e.target.value)} placeholder="enter address" type="text" />
//         <button type='submit'>SAVE_CART</button>

//         </form>

//         </>
//     )
// }