import React, { Fragment, useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { DOMAIN, TOKEN } from '../../util/setting/config';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function DonHang() {
    const notify = (content) => toast(content);
    const {userLogin} = useSelector(state=>state.userReducer)
    const [order, setOrder] = useState([])
    const [change, setChange] = useState(false)
    const handleClicker = (number) => {
        const updateStatus = async () => {
            await axios({
                method: 'put',
                url: `${DOMAIN}/order/setStatus/${number}`,
                data: { 'status': 5 },
                headers: { 'asscess_Token': localStorage.getItem(TOKEN) }
            }).then(() => {
                notify("Xác Nhận Thành Công")
                setChange(!change)
            }).catch((err) => {
                notify("Lỗi, đã xác nhận hoặc lỗi hệ thống")
            })

        }
        updateStatus()
    }
    useEffect(() => {
        axios({
            method: 'get',
            url: `${DOMAIN}/users/getOrder/${userLogin.id}`,
            data: order
        }).then((data) => {
            setOrder(data.data)
        }).catch((err) => {
            
        })
    }, [change, order, userLogin.id])
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <ToastContainer />
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Giá</TableCell>
                        {/* <TableCell align="right">Số Lượng</TableCell> */}
                        <TableCell align="right">Trạng Thái</TableCell>
                        <TableCell align="right">Xác Nhận</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {order?.map((row,index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row?.id}
                            </TableCell>
                            <TableCell align="right">{row?.price}</TableCell>
                            {/* <TableCell align="right">{row.number}</TableCell> */}
                            <TableCell align="right">{row?.Order?.Status?.name}</TableCell>
                            {/* <TableCell align="right">{row.protein}</TableCell> */}
                            {row?.Order?.Status?.id === 1 ? <TableCell align="right">Chờ Xác Nhận</TableCell> : <Fragment>{row?.Order?.Status?.id === 5 ? <TableCell align="right">Đã Xác Nhận</TableCell> : <TableCell align="right" style={{ textAlign: 'center' }}><button onClick={() => handleClicker(row?.order_ID)} style={{ cursor: 'pointer', backgroundColor: 'orange', padding: '4px 16px', borderRadius: '12px', border: 'none', color: '#fff' }} >Đã Nhận</button></TableCell>}</Fragment> }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
