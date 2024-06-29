import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import singletonServices from '../allMobx/mobxService';
import {Grid,CardMedia, TextField, CardActionArea, Card, CardActions, CardContent, Typography, Button, Paper } from '@mui/material';
import Appointment from './appointment';

const ServiceData = observer(({ Manager }) => {
  
  const [data, setData] = useState([]);
  const [addAppointment, setAddAppointment] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await singletonServices.init();
        setData(singletonServices.getServices);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const [add, setAdd] = useState({
    id: "",
    name: "",
    description: "",
    price: '',
    duration: '',
    img: ""
  });

  const [clickAdd, setClickAdd] = useState(false);
  const [serviceId,setServiceId]=useState("");
  function addService(field, value) {
    let temp = { ...add };
    temp[field] = value;
    setAdd(temp);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await singletonServices.addServices(add);
    await singletonServices.init();
   setData(singletonServices.getServices);
    setClickAdd(false);
  }

   const handleClickAddAppointment = (id) => {
    setAddAppointment(!addAppointment);
    setServiceId(id);
}

  return (
    <>
      {data.length > 0 ? (
        data.map(x => (
          <Card sx={{ minWidth: 275 }} key={x.id} style={{margin: "5px"}}>
           <CardMedia
        sx={{ height: 140,width: 275 }}
        image={x.img}
        title="green iguana"
      />
            <CardActionArea>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {"service code "}{x.id}
                </Typography>
                <Typography variant="h5" component="div">
                  {x.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {x.description}
                </Typography>
                <Typography variant="body2">
                  {"price " + x.price}
                  <br />
                  <br/>
                  {!Manager && <Button variant="outlined" onClick={() => handleClickAddAppointment(x.id)} color="secondary">add a meet</Button>}
            
                </Typography>
              </CardContent>
              <CardActions>
              </CardActions>
            </CardActionArea>
          </Card>
        ))
      ) : (
        <div>
          <p>The array is empty, add values ​​here</p>
        </div>
      )}
      {Manager && (
     
        <button onClick={() => setClickAdd(!clickAdd)} style={{border: "solid 3px purple",height: "90px", marginTop: "50px"}}>{clickAdd? <span>cancle add service</span>: <span>add service</span>}</button>
      )}
      { clickAdd && (
        <form onSubmit={handleSubmit}>
          <Paper style={{ backgroundColor: "pink"}}>
          <TextField label='Enter Id' onBlur={(e) => addService("id", e.target.value)} />
          <TextField label='Enter name' onBlur={(e) => addService("name", e.target.value)} />
          <TextField label='Enter description' onBlur={(e) => addService("description", e.target.value)} />
          <TextField label='Enter price' onBlur={(e) => addService("price", e.target.value)} />
          <TextField label='Enter duration' onBlur={(e) => addService("duration", e.target.value)} />
          <TextField label='Enter image' onBlur={(e)=>addService("img",e.target.value)}></TextField>
          <button type='submit'>submit</button></Paper>
        </form>
      )}
      {addAppointment && <Appointment serviceId={serviceId}></Appointment>}
    </>
  );
});

export default ServiceData;
