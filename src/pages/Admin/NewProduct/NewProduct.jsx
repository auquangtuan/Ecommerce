import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DOMAIN, TOKEN } from '../../../util/setting/config';
export default function NewProduct() {
    const notify = (content) => toast(content);

    const [thumbnail, setThumbnail] = useState()
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState()
    const [discount, setDiscount] = useState()
    const [description, setDescription] = useState("")
    const [categoryID, setCategoryID] = useState()
    const [gender, setGender] = useState()
    const [tag, setTag] = useState()
    const [S, setS] = useState(47)
    const [M, setM] = useState(47)
    const [L, setL] = useState(47)
    const [XL, setXL] = useState(47)
    const [XXL, setXXL] = useState(47)

    const [change, setChange] = useState(false)
    const params = useParams()
    const handleChangeCate = (e) => {
        {
            setCategoryID(parseInt(e.target.value))
        }
    }
    const handleChangeGender = (e) => {
        {
            setGender(parseInt(e.target.value))
        }
    }
    const handleChangeTag = (e) => {
        {
            setTag(parseInt(e.target.value))
        }
    }
    const navigate = useNavigate()
    const handleClick = (e) => {
        e.preventDefault()
        if(!(thumbnail) || title.length < 2 || price < 10000 || discount < 10000 || description.length < 2 || !categoryID || !tag || !gender) {
            notify("Tạo Thất Bại, Vui Lòng Thử Lại")
        } else {
        const formData = new FormData();
        formData.append("thumnail", thumbnail);

        let values = {
            "thumbnail": thumbnail,
            "title": title,
            "price": price,
            "discount": discount,
            "description": description,
            "category_id": categoryID,
            "tag_id": tag,
            "gender_ID": gender,
            "S": S,
            "M": M,
            "L": L,
            "XL": XL,
            "XXL": XXL,
        }
        const putProduct = async () => {
            await axios({
                method: "POST",
                url: `${DOMAIN}/product`,
                data: values,
                formData: formData,
                headers: {
                    "asscess_Token": localStorage.getItem(TOKEN),
                    "Content-Type": 'multipart/form-data',
                }
            }).then((data) => {
                notify("Tạo Thành Công")
                setTimeout(()=>{navigate(`/admin/products/${data.data.id}`)}, 1300)
            }).catch((err) => {
                console.log(err)
                notify("Tạo Thất Bại, Vui Lòng Thử Lại")
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
            }).then(() => {
                console.log("Sussess")
            }).catch((err) => {
                console.log("err")
            })
        }
        getOneProduct()
    }, [change])
    return (
        <div className="product">
            <ToastContainer />
            <div className="productTitleContainer">
                <h1 className="productTitle">NEW Product</h1>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Tiêu Đề</label>
                        <input minlength="2" placeholder='ít nhất 2 kí tự'  required onChange={(e) => setTitle(e.target.value)} type="text" />
                        <label>Nội Dung</label>
                        <input minlength="2" placeholder='ít nhất 2 kí tự'  onChange={(e) => setDescription(e.target.value)} type="text" />
                        <label>Danh Mục</label>
                        <select required onChange={handleChangeCate} name="inStock" id="idStock">
                            <option value="">Bắt Buộc</option>
                            <option value="1">Áo Polo</option>
                            <option value="2">Áo Thun Cổ Tròn</option>
                            <option value="3">Áo Khoác Nam</option>
                            <option value="4">Quần Nam</option>
                            <option value="5">Ví Nam</option>
                            <option value="6">Balo Nam</option>
                            <option value="7">Boxer Nam</option>
                            <option value="8">Giày Nam</option>
                        </select>
                        <label>Số Lượng Size S</label>
                        <input type='number' defaultValue={47}  required onChange={(e) => setS(e.target.value)} />
                        <label>Số Lượng Size M</label>
                        <input type='number' defaultValue={47}  required onChange={(e) => setM(e.target.value)} />
                        <label>Số Lượng Size L</label>
                        <input type='number' defaultValue={47}  required onChange={(e) => setL(e.target.value)} />
                    </div>
                    <div className="productFormLeft">
                        <label>Giá</label>
                        <input placeholder='từ 10.000 - 1.000.000'  required min='10000' max='1000000' onChange={(e) => setPrice(parseInt(e.target.value))} type="number" />
                        <label>Giá Giảm</label>
                        <input placeholder='từ 10.000 - 1.000.000' required min='10' max='1000000' onChange={(e) => setDiscount(parseInt(e.target.value))} type="number" />
                        <label>Tag</label>
                        <select required onChange={handleChangeTag} name="inStock" id="idStock">
                            <option value=''>Bắt Buộc</option>
                            <option value="1">Đi Chơi</option>
                            <option value="2">Đi Làm</option>
                            <option value="3">Cá Tính</option>
                            <option value="4">Thanh Lịch</option>
                            <option value="5">Mạnh Mẽ</option>
                        </select>
                        <label>Giới Tính</label>
                        <select required onChange={handleChangeGender} name="inStock" id="idStock">
                            <option value=''>Bắt Buộc</option>
                            <option value="1">Nam</option>
                            <option value="2">Nữ</option>
                            <option value="3">Unisex</option>
                        </select>
                        <label>Số Lượng Size XL</label>
                        <input defaultValue={47} required onChange={(e) => setXL(e.target.value)} type="number" />
                        <label>Số Lượng Size XXL</label>
                        <input defaultValue={47} required onChange={(e) => setXXL(e.target.value)} type="number" />
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Button variant="contained" component="label">
                                    Upload Hình (Bắt Buộc)
                                    <input required name='thumbnail' onChange={(e) => setThumbnail(e.target.files[0])} hidden accept="image/*" multiple type="file" />
                                </Button>
                            </Stack>
                        </div>
                        <button onClick={handleClick} className="productButton">Thêm</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
