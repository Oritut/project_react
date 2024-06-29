import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import singletonServices from '../allMobx/mobxService';
import { TextField, CardActionArea, Card, CardActions, CardContent, Typography, Button } from '@mui/material';
export default function ShowService(){
    const [data, setData] = useState([]);

    return(
        <>
         {data.length > 0 && (
        data.map(x => (
          <Card sx={{ minWidth: 275 }} key={x.id}>
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
            {/* { !isManager&& <Button onClick={()=>handleClick(x.id)}>add a meet</Button>} */}
                </Typography>
              </CardContent>
              <CardActions>
              </CardActions>
            </CardActionArea>
          </Card>

        )))}
        </>
    )
}