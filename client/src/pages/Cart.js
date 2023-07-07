import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';

const Cart = () => {
    const user = useSelector(state=>state.user);
    const location = useLocation();
    const url = location.pathname;
    const [carts,setCart] = useState([]);
    useEffect(()=>{
        const getData=async()=>{
            try {
                const userInfo = await axios.post("http://localhost:8000/auth/getCart", { ...user });
                console.log(userInfo.data.cart);
                setCart(userInfo.data.cart)
            } catch (error) {
                window.alert("cart not working!");
            }
        }
        getData();
    },[])

    
  return (
    <>
    <h1>Cart!</h1>
    <div className='register'>
        {
            carts?.map((ele,ind)=>{
                return <ProductCard state={{ele,ind,url}} key={ind}/>
            })
        }
    </div>
    </>
  )
}

export default Cart