import { Publish } from "@material-ui/icons";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { DOMAIN, TOKEN } from '../../../util/setting/config';
import './Product.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Product() {
  const notify = (content) => toast(content);
  const [product, setProduct] = useState([])
  const [thumbnail, setThumbnail] = useState()
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState()
  const [discount, setDiscount] = useState()
  const [description, setDescription] = useState("")
  const [categoryID, setCategoryID] = useState()
  const [change, setChange] = useState(false)
  const params = useParams()
  const handleChange = (e) => {
    {
      setCategoryID(parseInt(e.target.value))
    }
  }
  const handleClick = (e) => {
    e.preventDefault()
    if (thumbnail) {
      const formData = new FormData();
      formData.append("thumnail", thumbnail);

      let values = {
        "thumbnail": thumbnail || "",
        "title": title || product[0]?.title,
        "price": price || product[0]?.price,
        "discount": discount || product[0]?.discount,
        "description": description || product[0]?.description,
        "category_id": categoryID || product[0]?.category_id,
      }
      const putProduct = async () => {
        await axios({
          method: "PUT",
          url: `${DOMAIN}/product/${product[0]?.id}`,
          data: values,
          formData: formData || "",
          headers: {
            "asscess_Token": localStorage.getItem(TOKEN),
            "Content-Type": 'multipart/form-data',
          }
        }).then(() => {
          notify("Chỉnh Sửa Thành Công")
          setChange(!change)
        }).catch((err) => {
          console.log(err)
        })
      }
      putProduct()
    } else {
      let values = {
        "title": title || product[0]?.title,
        "price": price || product[0]?.price,
        "discount": discount || product[0]?.discount,
        "description": description || product[0]?.description,
        "category_id": categoryID || product[0]?.category_id,
      }
      const putProduct = async () => {
        await axios({
          method: "PUT",
          url: `${DOMAIN}/product/${product[0]?.id}`,
          data: values,
          headers: { "asscess_Token": localStorage.getItem(TOKEN) }
        }).then(() => {
          notify("Chỉnh Sửa Thành Công")
          setChange(!change)
        }).catch((err) => {
          console.log(err)
        })
      }
      putProduct()
    }
  }


  useEffect(() => {
    const getOneProduct = async () => {
      await axios({
        method: "GET",
        url: `${DOMAIN}/product/${params.id}`,
        data: product
      }).then((data) => {
        setProduct(data.data)
      }).catch((err) => {
        console.log(err)
      })
    }
    getOneProduct()
  }, [change])
  return (
    <div className="product">
      <ToastContainer />
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
            <input required onChange={(e) => setTitle(e.target.value)} type="text" defaultValue={product[0]?.title} />
            <label>Nội Dung</label>
            <input onChange={(e) => setDescription(e.target.value)} type="text" defaultValue={product[0]?.description} />
            <label>Danh Mục</label>
            <select required onChange={handleChange} name="inStock" id="idStock">
              <option value={product[0]?.category_id}>---</option>
              <option value="1">Áo Polo</option>
              <option value="2">Áo Thun Cổ Tròn</option>
              <option value="3">Áo Khoác Nam</option>
              <option value="4">Quần Nam</option>
              <option value="5">Ví Nam</option>
              <option value="6">Balo Nam</option>
              <option value="7">Boxer Nam</option>
              <option value="8">Giày Nam</option>
            </select>
          </div>
          <div className="productFormLeft">
            <label>Giá</label>
            <input required onChange={(e) => setPrice(parseInt(e.target.value))} type="number" defaultValue={product[0]?.price} />
            <label>Giá Giảm</label>
            <input required onChange={(e) => setDiscount(parseInt(e.target.value))} type="number" defaultValue={product[0]?.discount} />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product[0]?.thumbnail} alt="" className="productUploadImg" />
              <label for="file" >
                <Publish />
              </label>
              <input required defaultValue={product[0]?.thumbnail} type="file" id="file" name='thumbnail' onChange={(e) => setThumbnail(e.target.files[0])} style={{ display: "none" }} />
            </div>
            <button onClick={handleClick} className="productButton">Cập Nhật</button>
          </div>
        </form>
      </div>
    </div>
  )
}
