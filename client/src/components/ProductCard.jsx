import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useSelector } from 'react-redux';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function ProductCard(props) {
  const ele = props.state.ele;
  const user = useSelector(state=>state.user);

  const handleAddCart = async()=>{
    try {
      const email = user.email;
      const addedProduct = await axios.post("http://localhost:8000/auth/cartProduct", {email,ele});
      window.alert("Item added to cart!");
    } catch (error) {
      window.alert("error while adding to cart!");
    }
  }
 
  const handleDelete=async()=>{
    const id = ele._id;
    try {
      const delProduct = await axios.post("http://localhost:8000/product/deleteProduct", {id : id});
      window.alert("deleted success!");
    } catch (error) {
      window.alert("error while deleting!");
    }
   
  }

  const handleCartDelete=async()=>{
    const id = ele._id;
    try {
      const delCart = await axios.post("http://localhost:8000/auth/deleteCart", {...user , id : id});
      window.alert("deleted success!");
    } catch (error) {
      window.alert("error while deleting!");
    }
  }

  const handleEdit=()=>{
    props.state?.setFormValues({
      name : ele.name,
      desc : ele.desc,
      price : ele.price,
      method : ele.method
    })
  }

  return (
    <Card sx={{ width: 300 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.state.ele?.name}
        </Typography>
        <Typography variant="h5" component="div">
        {props.state.ele?.desc}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {props.state.ele?.price}
        </Typography>
      </CardContent>
      <CardActions>
        {
          user.role!="customer" && <Button size="small" onClick={handleDelete}>Delete</Button>
        }
        {
          ele.method=="draft" && <Button size="small" onClick={handleEdit}>Edit</Button>
        }

        {
          props.state?.url != "/cart" && <>
          
          {
          user.role=="customer" && <Button size="small" onClick={handleAddCart}>Add to Cart</Button>
        }
          </>
        }

        {
          props.state?.url=="/cart" && <Button size="small" onClick={handleCartDelete}>Remove from Cart</Button>
        }

        
      </CardActions>
    </Card>
  );
}