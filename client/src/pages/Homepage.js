import React, { useEffect, useState } from 'react'
import ProductCard from "../components/ProductCard"
import axios from 'axios'
import { useSelector } from 'react-redux';
import Method from '../components/Method';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const user = useSelector(state => state.user);
  const [formValues, setFormValues] = useState({ method: "product", publishedBy: user.email });
  const [click, setClick] = useState(false);
  const [producstArray, setProductsArray] = useState([]);
  const [draftsArray, setDraftsArray] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleClick = async () => {
    try {
      const result = await axios.post("http://localhost:8000/product/addProduct", { ...formValues });
      window.alert("Product added successfully!");
      setClick(!click);
    } catch (error) {
      window.alert("Error while adding Product!");
    }
    // console.log(formValues);
  }
  // getVendorProducts
  // getVendorDrafts
  useEffect(() => {
    const getData = async () => {
      try {
         if (user.role == "vendor") {
          const products = await axios.post("http://localhost:8000/product/getVendorProducts", { ...user });
          const drafts = await axios.post("http://localhost:8000/product/getVendorDrafts", { ...user });
          // console.log("vendor", products.data);
          setProductsArray(products.data);
          // console.log("drafts", drafts.data);
          setDraftsArray(drafts.data);
        }else{
          const products = await axios.get("http://localhost:8000/product/getProducts");
          // console.log(products.data);
          setProductsArray(products.data);
        }
      } catch (error) {
        window.alert("error while getting data");
      }
    }
    getData();
  }, [click])

  // console.log(formValues.method);
  return (
    <>
    {
      user.role=="customer" && <button onClick={()=>navigate("/cart")}>cart</button>
    }
      {
        user.role != "customer" && <div className='register'>
          <input type="text" name="name" id="" placeholder='name' onChange={handleChange} value={formValues?.name} />
          <input type="text" name="desc" id="" placeholder='description' onChange={handleChange} value={formValues?.desc} />
          <input type="text" name="price" id="" placeholder='price' onChange={handleChange} value={formValues?.price} />
          {
            user.role == "vendor" && <Method state={{ formValues, setFormValues }} />
          }
          <button onClick={handleClick}>ADD</button>
        </div>
      }

      <h1>Products!</h1>
      <div className='products'>
        {
          producstArray?.map((ele, ind) => {
            return <ProductCard key={ind} state={{ ind, ele }} />
          })
        }
      </div>

      {
        user.role == "vendor" && <>
          <h1>Drafts</h1>
          <div className='products'>
            {
              draftsArray?.map((ele, ind) => {
                return <ProductCard key={ind} state={{ ind, ele , setClick,setFormValues}} />
              })
            }
          </div>
        </>
      }

    </>
  )
}

export default Homepage