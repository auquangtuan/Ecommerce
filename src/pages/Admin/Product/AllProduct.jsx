import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { DOMAIN } from '../../../util/setting/config'
export default function AllProduct() {
    const navigate = useNavigate()
    const [product, setProduct] = useState([])
    console.log(product)
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
    }, [])
    return (
        <>
            <div className="product">
                <div className="productTitleContainer">
                    <h4 className="productTitle">Product</h4>
                    <Link to={`product/${123}`}>
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
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
