import {
    CalendarToday,
    LocationSearching, PermIdentity,
    PhoneAndroid
} from "@material-ui/icons";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { DOMAIN, TOKEN } from '../../../util/setting/config';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./User.css";

export default function User() {
    const notify = (content) => toast(content);
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(parseInt(event.target.value));
    };
    const [user, setUser] = useState([])
    const params = useParams()
    const [change,setChange] = useState(false)
    const putUser = (e) => {
        e.preventDefault()
        const userUpdate = {
            "fullname": fullname || user.fullname,
            "email": email || user.email,
            "address": address || user.address,
            "phone": phone || user.phone,
            "role_id": age || user.role_id
        }
        const putUser = async () => {
            await axios({
                method: "PUT",
                url: `${DOMAIN}/users/${user.id}`,
                data : userUpdate,
                headers : { "asscess_Token" : localStorage.getItem(TOKEN)}
            }).then(()=>{
                setChange(!change)
                notify("Chỉnh Sửa Thành Công")
            }).catch((err)=>{
                console.log(err)
            })
        }
        putUser()

    }
    useEffect(() => {
        const getOneUser = async () => {
            await axios({
                method: "GET",
                url: `${DOMAIN}/users/${params.id}`,
                data: user
            }).then((data) => {
                setUser(data.data)
            }).catch((err) => {
                console.log(err)
            })
        }
        getOneUser()
    }, [change])
    return (
        <div className="user">
            <ToastContainer />
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to="/newUser">
                    <button className="userAddButton">Create</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img
                            src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{user.fullname}</span>
                            <span className="userShowUserTitle">{user.Role?.name}</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Thông Tin</span>
                        <div className="userShowInfo">
                            <PermIdentity className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.email}</span>
                        </div>
                        <div className="userShowInfo">
                            <CalendarToday className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.createdAt?.slice(0, 10)}</span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                            <PhoneAndroid className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.phone || ""}</span>
                        </div>

                        <div className="userShowInfo">
                            <LocationSearching className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.address || ""}</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <div className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Họ và Tên</label>
                                <input
                                    required
                                    onChange={(e) => setFullname(e.target.value)}
                                    defaultValue={user.fullname}
                                    type="text"
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label for='email'>Email</label>
                                <input
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    name="email"
                                    defaultValue={user.email}
                                    className="userUpdateInput"  
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>SĐT</label>
                                
                                <input
                                    required
                                    type="tel"
                                    onChange={(e) => setPhone(e.target.value)}
                                    defaultValue={user.phone}
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>address</label>
                                <input
                                    required
                                    type="text"
                                    onChange={(e) => setAddress(e.target.value)}
                                    defaultValue={user.address}
                                    className="userUpdateInput"
                                />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Age"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={1}>ADMIN</MenuItem>
                                        <MenuItem value={2}>USER</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <button type='submit' onClick={putUser} className="userUpdateButton">Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Họ Và tên</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Số Điện Thoại</TableCell>
                            <TableCell align="right">Địa Chỉ</TableCell>
                            <TableCell align="right">Note</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user.Orders?.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.fullname}
                                </TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.phone}</TableCell>
                                <TableCell align="right">{row.address}</TableCell>
                                <TableCell align="right">{row.note}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}