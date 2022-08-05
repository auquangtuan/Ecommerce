import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DOMAIN } from '../../../../util/setting/config';
import "./chart.css";

export default function Chart() {
  const [order, setOrder] = useState([])
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
  const orderMap = order.map((item) => {
    return (
      { date: item.createdAt.slice(0, 10), "SL": item.number, "DT": (item.number * item.price) }
    )
  })
  const orderssing = order.map((item) => {
    return (
      item.createdAt.slice(0, 10)
    )
  })
  const setMapOrder = new Set(orderssing)
  const mapNew = [...setMapOrder]
  const arrFinaly = []
  for(let i = 0; i < mapNew.length ; i++) {
    arrFinaly.push({
      "Ngày" : mapNew[i],
      "Số Lượng": orderMap.filter(sp => sp.date.includes(mapNew[i])).reduce((total,item)=>{return (total += item.SL)},0),
      "Doanh Thu Theo Giá (Price)" : orderMap.filter(sp => sp.date.includes(mapNew[i])).reduce((total,item)=>{return (total += item.DT)},0)
    })
  }
  console.log(arrFinaly)
  return (
    <div className="chart">
      <h3 className="chartTitle">DASH BOARD</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart width={730} height={250} data={arrFinaly}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey='Ngày' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Số Lượng" stroke="#8884d8" />
          <Line type="monotone" dataKey={`Doanh Thu Theo Giá (Price)`} stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
