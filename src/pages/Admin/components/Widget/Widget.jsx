import React, { Fragment, useEffect, useState } from 'react'
import './widget.css'
import { Visibility } from "@material-ui/icons";
import axios from 'axios';
import { DOMAIN, TOKEN } from '../../../../util/setting/config';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Widget() {
  const notify = (content) => toast(content);
  const [users, setUsers] = useState([])
  const [order, setOrder] = useState([])
  const [change, setChange] = useState([])
  const navigate = useNavigate()

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
        method: "GET",
        url: `${DOMAIN}/users`,
        data: users
      }).then((data) => {
        setUsers(data.data)
      }).catch((err) => {
        console.log(err)
      })
      await axios({
        method: 'get',
        url: `${DOMAIN}/order`,
        data: order
      }).then((data) => {
        setOrder(data.data)
      }).catch((err) => {
        console.log("err")
      })
    }
    renderUser()
  }, [change])
  return (
    <div className='container'>
      <ToastContainer />
      <div className="widgetLg">
        <h3 className="widgetLgTitle">Đơn Chưa Xác Nhận</h3>
        <table className="widgetLgTable">
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Họ Và Tên</th>
            <th className="widgetLgTh">SĐT</th>
            <th className="widgetLgTh">Địa Chỉ</th>
            <th className="widgetLgTh">Status</th>
          </tr>
          {order.map((order, index) => {
            return (
                <tr className="widgetLgTr">
                  <td className="widgetLgUser">
                    <span className="widgetLgName">{order.fullname}</span>
                  </td>
                  <td className="widgetLgAmount">{order.phone}</td>
                  <td className="widgetLgAmount">{order.address}</td>
                  {order.Status?.id === 1 ? <td style={{ textAlign: 'center' }}><button onClick={()=>UpadateStatus(order.id)} style={{ cursor: 'pointer', backgroundColor: 'orange', padding: '4px 16px', borderRadius: '12px', border: 'none', color: '#fff' }} >Confirm</button></td> : <td>Đã Xác Nhận</td>}
                </tr>
            )
          })}
        </table>
      </div>
      <div className="widgetSm">
        <span className="widgetSmTitle">New Join Members</span>
        <ul className="widgetSmList">
          {users.map((user, index) => {
            return (
              <>
                <li className="widgetSmListItem">
                  <img
                    src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                    alt=""
                    className="widgetSmImg"
                  />
                  <div className="widgetSmUser">
                    <span className="widgetSmUsername">{user.fullname}</span>
                  </div>
                  <button onClick={() => navigate(`users/${user.id}`)} className="widgetSmButton">
                    <Visibility className="widgetSmIcon" />
                    Xem
                  </button>
                </li>

              </>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
