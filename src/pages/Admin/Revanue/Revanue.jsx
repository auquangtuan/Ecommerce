import React, { useEffect, useState } from 'react'
import "./revanue.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { DOMAIN } from '../../../util/setting/config';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Revanue() {
    const {change} = useSelector(state=>state.AdminReducer)

    const [order, setOrder] = useState([])
    const [orders, setOrders] = useState([])
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth()+1;
    const renderOrder = order.filter(sp=>sp.createdAt.slice(0,10).includes(`2022-0${month}-0${date}`)).reduce((total,item)=>{return total+=(item.price*item.number)},0)
    const renderOrders = order.filter(sp=>sp.createdAt.slice(0,10).includes(`2022-0${month}-0${date-1}`)).reduce((total,item)=>{return total+=(item.price*item.number)},0)
    const orderToDay = orders.filter(sp=>sp.createdAt.slice(0,10).includes(`2022-0${month}-0${date}`)).reduce((total)=>{return total+=1},0)
    const orderTomorow = orders.filter(sp=>sp.createdAt.slice(0,10).includes(`2022-0${month}-0${date-1}`)).reduce((total)=>{return total+=1},0)
    const confirmToday = orders.filter(sp=>sp.status === 1).filter(sp=>sp.createdAt.slice(0,10).includes(`2022-0${month}-0${date}`)).reduce((toal)=>{return toal+=1},0)

    useEffect(() => {
        axios({
            method: 'get',
            url: `${DOMAIN}/orderDetails`,
            data: order
        }).then((data) => {
            setOrder(data.data)
        }).catch((err) => {
            console.log("err")
        })
        axios({
            method: 'get',
            url: `${DOMAIN}/order`,
            data: order
        }).then((data) => {
            setOrders(data.data)
        }).catch((err) => {
            console.log("err")
        })
    }, [change])
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Tổng Doanh Thu</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{order.reduce((total, item) => {
                        return total += (item.price * item.number)
                    }, 0).toLocaleString()}</span>
                    <span className="featuredMoneyRate">
                        {(renderOrder - renderOrders).toLocaleString()}{" "}
                        {(renderOrder - renderOrders) < 0 ? (
                            <ArrowDownward className="featuredIcon negative" />
                        ) : (
                            <ArrowUpward className="featuredIcon" />
                        )}
                    </span>
                </div>
                <span className="featuredSub">So Với Ngày Trước (Tính Theo Giá (Price))</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Số Đơn Hàng</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{orders.reduce((toal) => { return (toal += 1) }, 0)}</span>
                    <span className="featuredMoneyRate">
                    {(orderToDay - orderTomorow).toLocaleString()}{" "}
                        {(orderToDay - orderTomorow) < 0 ? (
                            <ArrowDownward className="featuredIcon negative" />
                        ) : (
                            <ArrowUpward className="featuredIcon" />
                        )}
                    </span>
                </div>
                <span className="featuredSub">So Với Ngày Trước</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Chờ Xác Nhận</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{orders.reduce((total, item) => {
                        return total += (item.status === 1)
                    }, 0)} Đơn</span>
                    <span className="featuredMoneyRate">
                       Và {confirmToday} Đơn
                    </span>
                </div>
                <span className="featuredSub">Đặt Hôm Nay Chưa Xác Nhận</span>
            </div>
        </div>
    )
}
