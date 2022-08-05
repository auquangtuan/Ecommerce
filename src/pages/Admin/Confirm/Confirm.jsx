import Button from '@mui/material/Button';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DOMAIN, TOKEN } from '../../../util/setting/config';

export default function Confirm() {
    const notify = (content) => toast(content);
    const [order, setOrder] = useState([])
    const [orders, setOrders] = useState([])
    const [change, setChange] = useState([])
    const UpadateStatus = (num) => {
        const updateStatuses = async () =>
            await axios({
                method: 'put',
                url: `${DOMAIN}/order/setStatus/${num}`,
                data: { 'status': 2 },
                headers: { 'asscess_Token': localStorage.getItem(TOKEN) }
            }).then((values) => {
                notify("Sửa Thành Công")
                setChange(!change)
            }).catch((err) => {
                alert("XOAI")
            })
        updateStatuses()
    }

    useEffect(() => {
        const renderUser = async () => {
            await axios({
                method: 'get',
                url: `${DOMAIN}/order`,
                data: order
            }).then((data) => {
                setOrder(data.data)
                setOrders(data.data)
            }).catch((err) => {
                console.log("err")
            })
        }
        renderUser()
    }, [change])
    const handleClick = (num) => {
        let number = parseInt(num)
        if (number === 1) {
            setOrder(orders.filter(sp => sp.Status.id === 2))
        } else if (number === 2) {
            setOrder(orders.filter(sp => sp.Status.id === 1))
        } else if (number === 3) {
            setOrder(orders.filter(sp => sp.Status.id === 5))
        } else if (number === 4) {
            setOrder(orders)
        }
    }

    return (
        <div className="widgetLg">
            <ToastContainer />
            <h3 className="widgetLgTitle">Xác Nhận Đơn</h3>
            <Button onClick={() => handleClick(1)} variant="outlined">Đã Xác Nhận (ADMIN đã Confirm) </Button>
            <Button onClick={() => handleClick(2)} variant="outlined">Chưa Xác Nhận (KH mới lên đơn)</Button>
            <Button onClick={() => handleClick(3)} variant="outlined">Hoàn Thành (KH bấm đã nhận hàng)</Button>
            <Button onClick={() => handleClick(4)} variant="outlined">Tất Cả</Button>
            <table className="widgetLgTable">
                <tr className="widgetLgTr">
                    <th className="widgetLgTh">Họ Và Tên</th>
                    <th className="widgetLgTh">SĐT</th>
                    <th className="widgetLgTh">Địa Chỉ</th>
                    <th className="widgetLgTh">Status</th>
                </tr>
                {order.map((order, index) => {
                    return (
                        <tr className="widgetLgTr" key={index}>
                            <td className="widgetLgUser">
                                <span className="widgetLgName">{order.fullname}</span>
                            </td>
                            <td className="widgetLgAmount">{order.phone}</td>
                            <td className="widgetLgAmount">{order.address}</td>
                            {order.Status?.id === 1 ?
                                <td style={{ textAlign: 'center' }}><button onClick={() => UpadateStatus(order.id)} style={{ cursor: 'pointer', backgroundColor: 'orange', padding: '4px 16px', borderRadius: '12px', border: 'none', color: '#fff' }} >Confirm</button></td>
                                :
                                <Fragment> {order.Status?.id === 2 ? <td>Đã Xác Nhận</td> : <td>Hoàn Thành</td>}  </Fragment>}
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}
