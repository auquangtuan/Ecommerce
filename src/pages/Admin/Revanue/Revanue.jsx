import React, { useEffect, useState } from 'react'
import "./revanue.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { DOMAIN } from '../../../util/setting/config';
import axios from 'axios';

export default function Revanue() {
    const [order, setOrder] = useState([])
    console.log(order)
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
    }, [])
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Tổng Doanh Thu</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{order.reduce((total, item) => {
                        return total += (item.price * item.number)
                    }, 0).toLocaleString()}</span>
                    <span className="featuredMoneyRate">
                        %{Math.floor(12)}{" "}
                        {12 < 0 ? (
                            <ArrowDownward className="featuredIcon negative" />
                        ) : (
                            <ArrowUpward className="featuredIcon" />
                        )}
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Số Đơn Hàng</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$4,415</span>
                    <span className="featuredMoneyRate">
                        -1.4 <ArrowDownward className="featuredIcon negative" />
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Chờ Xác Nhận</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{order.reduce((total, item) => {
                        return total += (item.Order?.status === 1)
                    }, 0)}</span>
                    <span className="featuredMoneyRate">
                        +2.4 <ArrowUpward className="featuredIcon" />
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
        </div>
    )
}
