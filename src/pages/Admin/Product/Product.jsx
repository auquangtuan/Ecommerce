import React from 'react'
import { Link } from "react-router-dom";
import './Product.css'
import { Publish } from "@material-ui/icons";

export default function Product() {
    
  return (
    <div className="product">
    <div className="productTitleContainer">
      <h1 className="productTitle">Product</h1>
      <Link to="/newproduct">
        <button className="productAddButton">Create</button>
      </Link>
    </div>
    <div className="productTop">
      <div className="productTopLeft">
        {/* <Chart data={pStats} dataKey="Sales" title="Sales Performance" /> */}
      </div>
      <div className="productTopRight">
        <div className="productInfoTop">
          <img src='https://bizweb.dktcdn.net/thumb/large/100/399/392/products/ao-thun-nam-co-tron-tay-ngan-hi-basic-fit-ao-phong-nam-khong-co-nhieu-ma-u-hiddle-8.jpg?v=1637318145000' alt="" className="productInfoImg" />
          <span className="productName">Áo Thun Hi Basic</span>
        </div>
        <div className="productInfoBottom">
          <div className="productInfoItem">
            <span className="productInfoKey">id:</span>
            <span className="productInfoValue">12</span>
          </div>
          <div className="productInfoItem">
            <span className="productInfoKey">sales:</span>
            <span className="productInfoValue">5123</span>
          </div>
          <div className="productInfoItem">
            <span className="productInfoKey">in stock:</span>
            <span className="productInfoValue">Còn</span>
          </div>
        </div>
      </div>
    </div>
    <div className="productBottom">
      <form className="productForm">
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
            <img src='https://bizweb.dktcdn.net/thumb/large/100/399/392/products/ao-thun-nam-co-tron-tay-ngan-hi-basic-fit-ao-phong-nam-khong-co-nhieu-ma-u-hiddle-8.jpg?v=1637318145000' alt="" className="productUploadImg" />
            <label for="file">
              <Publish />
            </label>
            <input type="file" id="file" style={{ display: "none" }} />
          </div>
          <button className="productButton">Update</button>
        </div>
      </form>
    </div>
  </div>
  )
}
