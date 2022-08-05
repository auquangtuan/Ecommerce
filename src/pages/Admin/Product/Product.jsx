import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import './Product.css'
import { Publish } from "@material-ui/icons";
import axios from 'axios';
import { DOMAIN } from '../../../util/setting/config';

export default function Product() {
  const [product,setProduct] = useState([])
  console.log(product)
  const params = useParams()
  useEffect(()=>{
    const getOneProduct = async () => {
      await axios({
        method: "GET",
        url: `${DOMAIN}/product/${params.id}`,
        data: product
      }).then((data)=>{
        setProduct(data.data)
      }).catch((err)=>{
        console.log(err)
      })
    }
    getOneProduct()
  },[])
  return (
    <div className="product">
    <div className="productTitleContainer">
      <h1 className="productTitle">Product Số {params.id}</h1>
    </div>
    <div className="productTop">
      <div className="productTopLeft">
        {/* <Chart data={pStats} dataKey="Sales" title="Sales Performance" /> */}
      </div>
      <div className="productTopRight">
        <div className="productInfoTop">
          <img src={product[0]?.thumbnail} alt="" className="productInfoImg" />
          <span className="productName">{product[0]?.title}</span>
        </div>
        <div className="productInfoBottom">
          <div className="productInfoItem">
            <span className="productInfoKey">id:</span>
            <span className="productInfoValue">{product[0]?.id}</span>
          </div>
          <div className="productInfoItem">
            <span className="productInfoKey">Tag:</span>
            <span className="productInfoValue">{product[0]?.Tag?.name}</span>
          </div>
          <div className="productInfoItem">
            <span className="productInfoKey">Giới Tính:</span>
            <span className="productInfoValue">{product[0]?.Gender?.gender}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="productBottom">
      <form className="productForm">
        <div className="productFormLeft">
          <label>Tiêu Đề</label>
          <input type="text" defaultValue={product[0]?.title} />
          <label>Nội Dung</label>
          <input type="text" defaultValue={product[0]?.description} />
          <label>Price</label>
          <input type="text" defaultValue={product[0]?.price} />
          <label>Discount</label>
          <input type="text" defaultValue={product[0]?.discount} />
          <label>In Stock</label>
          <select name="inStock" id="idStock">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="productFormLeft">
          <label>Product Name</label>
          <input type="text" placeholder='Áo Thun ' />
          <label>Product Description</label>
          <input type="text" placeholder='Nội Dung' />
          <label>Price</label>
          <input type="text" placeholder="Giá" />
          <label>In Stock</label>
          <select name="inStock" id="idStock">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="productFormRight">
          <div className="productUpload">
            <img src={product[0]?.thumbnail} alt="" className="productUploadImg" />
            <label for="file">
              <Publish />
            </label>
            <input type="file" id="file" style={{ display: "none" }} />
          </div>
          <button className="productButton">Cập Nhật</button>
        </div>
      </form>
    </div>
  </div>
  )
}
