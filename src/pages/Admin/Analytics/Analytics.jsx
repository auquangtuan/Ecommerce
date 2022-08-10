import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import axios from 'axios'
import { DOMAIN } from '../../../util/setting/config';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Analytics() {
  const [productSize, setProductSize] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const renderActiveShape = ({ cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value }) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value.toLocaleString()}đ`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
  const datas = productSize.map((item) => {
    return (
      (item.name)
    )
  })
  const setMapOrder = new Set(datas)
  const cate = [...setMapOrder]
  const arrProduct = []
  for (let i = 0; i < cate.length; i++) {
    arrProduct.push({
      "name": cate[i],
      "value": productSize?.filter(sp => sp.name.includes(cate[i])).reduce((total, item) => { return total += (item.price * item.number) }, 0),
      "number": productSize?.filter(sp => sp.name.includes(cate[i])).reduce((total, item) => { return total += item.number }, 0),
    })
  }

  const onPieEnter = (_, index) => {
    setActiveIndex(index)
  };
  useEffect(() => {
    const getProductSize = async () => {
      await axios({
        method: "GET",
        url: `${DOMAIN}/orderDetails/chart`,
        data: productSize
      }).then((data) => {
        setProductSize(data.data)
      }).catch((err) => { return console.log("err") })
    }
    getProductSize()
  }, [])
  return (
    <div className="featured">
      <div className="featuredItem" style={{ height: 500 }}>
        <h2>Tổng Doanh Thu : {arrProduct.reduce((total, item) => { return (total += item.value) }, 0).toLocaleString()}</h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={arrProduct}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="featuredItem" style={{ height: 500 }}>
        <h2 style={{marginBottom : 24}}>Trong Đó</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Tên Danh Mục</TableCell>
                <TableCell align="center">Tổng Số Lượng Bán</TableCell>
                <TableCell align="right">Tổng Giá bán</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {arrProduct.map((item, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell align="center">{item.number}</TableCell>
                    <TableCell align="right">{item.value.toLocaleString()}đ</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}