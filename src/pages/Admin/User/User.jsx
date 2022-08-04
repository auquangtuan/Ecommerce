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
import { DOMAIN } from '../../../util/setting/config';
import "./User.css";
export default function User() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
    const [user, setUser] = useState([])
    console.log(user)
    const params = useParams()
    const handleChanges = (e) => {
        console.log(e.target.value)
    }
    const putUser = (e) => {
        e.preventDefault()
        console.log(age)
        console.log(handleChanges())
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
    }, [])
    return (
        <div className="user">
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
                            src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
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
                        {/* <div className="userShowInfo">
                                    <MailOutline className="userShowIcon" />
                                    <span className="userShowInfoTitle">{user.email || ""}</span>
                                </div> */}
                        <div className="userShowInfo">
                            <LocationSearching className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.address || ""}</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form onChange={handleChanges} className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Họ và Tên</label>
                                <input
                                    type="text"
                                    name='fullname'
                                    placeholder={user.fullname}
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input
                                    type="text"
                                    placeholder={user.email}
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>SĐT</label>
                                <input
                                    type="text"
                                    placeholder={user.phone}
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>address</label>
                                <input
                                    type="text"
                                    placeholder={user.address}
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
                    </form>
                </div>
            </div>
        </div>
    )
}
