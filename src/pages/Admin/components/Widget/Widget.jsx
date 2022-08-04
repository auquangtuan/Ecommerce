import React, { useEffect, useState } from 'react'
import './widget.css'
import { Visibility } from "@material-ui/icons";
import axios from 'axios';
import { DOMAIN } from '../../../../util/setting/config';
import { useNavigate } from 'react-router-dom';
export default function Widget() {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
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
    }
    renderUser()
  }, [])
  console.log(users)
  return (
    <div className='container'>
      <div className="widgetLg">
        <h3 className="widgetLgTitle">Đơn Chưa Xác Nhận</h3>
        <table className="widgetLgTable">
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <span className="widgetLgName">12</span>
            </td>
            <td className="widgetLgDate">123123123123</td>
            <td className="widgetLgAmount">123123</td>
            <td className="widgetLgStatus">
              <button className='widgetLgButton pending' type='pending' >approved</button>
            </td>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <span className="widgetLgName">12</span>
            </td>
            <td className="widgetLgDate">123123123123</td>
            <td className="widgetLgAmount">123123</td>
            <td className="widgetLgStatus">
              <button className='widgetLgButton approved' type='done' >approved</button>
            </td>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <span className="widgetLgName">12</span>
            </td>
            <td className="widgetLgDate">123123123123</td>
            <td className="widgetLgAmount">123123</td>
            <td className="widgetLgStatus">
              <button className='widgetLgButton pending' type='approved' >approved</button>
              <button className='widgetLgButton declined' type='declined' >approved</button>
            </td>
          </tr>
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
                  <button onClick={()=>navigate(`users/${user.id}`)} className="widgetSmButton">
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
