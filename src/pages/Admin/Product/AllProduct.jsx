import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { DOMAIN, TOKEN } from '../../../util/setting/config'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AllProduct() {
    const navigate = useNavigate()
    const [product, setProduct] = useState([])
    const [change,setChange] = useState(false)
    const notify = (content) => toast(content);
    const deleteItem = (number) => {

        const deleteProduct = async () => {
            await axios({
                method: "DELETE",
                url: `${DOMAIN}/product/${number}`,
                headers : {"asscess_Token": localStorage.getItem(TOKEN)}
            }).then(() => {
                notify("Xóa Thành Công")
                setChange(!change)
            }).catch((err) => {
                console.log(err)
            })
        }
        deleteProduct()
    }
    useEffect(() => {
        const getAllProduct = async () => {
            axios({
                method: "GET",
                url: `${DOMAIN}/product`,
                data: product
            }).then((data) => {
                setProduct(data.data)
            }).catch((err) => {
                console.log(err)
            })
        }
        getAllProduct()
    }, [change])
    return (
        <>
            <div className="product">
            <ToastContainer />
                <div className="productTitleContainer">
                    <h4 className="productTitle">Product</h4>
                    <Link to={`/admin/newProduct`}>
                        <button className="productAddButton">Create</button>
                    </Link>
                </div>
                <div className="productTop">
                    {product.map((item, index) => {
                        return (
                            <div className="productTopRight" key={index}>
                                <div>
                                    <div className="productInfoTop">
                                        <img src={item.thumbnail} alt="" className="productInfoImg" />
                                        <span className="productName">{item.title}</span>
                                    </div>
                                    
                                    <div className="productInfoBottom">
                                        <div className="productInfoItem">
                                            <span className="productInfoKey">id:</span>
                                            <span className="productInfoValue">{item.id}</span>
                                        </div>
                                        <div className="productInfoItem">
                                            <span className="productInfoKey">Category:</span>
                                            <span className="productInfoValue">{item.Category?.name}</span>
                                        </div>
                                        <div className="productInfoItem">
                                            <span className="productInfoKey">Kho: </span>
                                        </div>
                                        <table>
                                            {item.Sizes?.map((size, index) => {
                                                return (
                                                    <Fragment>
                                                        <th>{size.size} : </th> &nbsp;
                                                        <td>{size.Product_Size?.amount}</td> &nbsp;
                                                    </Fragment>
                                                )
                                            })}
                                        </table>
                                    </div>
                                </div>
                                <button onClick={()=>navigate(`${item.id}`)} className="productAddButton">EDIT</button>
                                {item.id > 70 ? <button onClick={()=>deleteItem(item.id)} className="productAddButton">XOÁ</button> : ""}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
