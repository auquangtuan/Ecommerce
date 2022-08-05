import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { DOMAIN } from '../../util/setting/config';

export default function RenderUsers() {
    const [users, setUsers] = React.useState([])
    const navigate = useNavigate()
    React.useEffect(() => {
        const renderAllUser = async () => {
            await axios({
                method: "GET",
                url: `${DOMAIN}/users`,
                data: users
            }).then((data) => {
                setUsers(data.data)
            }).catch((err) => {
                console.log("err")
            })
        }
        renderAllUser()
    }, [])
    return (
        <TableContainer component={Paper}>
            <button className="userAddButton" style={{float: 'right', marginBottom : '1rem'}}>Create</button>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>ID</TableCell>
                        <TableCell>Họ Và Tên</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Số Điện Thoại</TableCell>
                        <TableCell align="right">Địa Chỉ</TableCell>
                        <TableCell align="right">Tổng Số Đơn Đặt</TableCell>
                        <TableCell align="right">Xem Thêm</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user, index) => {
                        return (
                            <React.Fragment>
                                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                    <TableCell>
                                        <IconButton
                                            aria-label="expand row"
                                            size="small">
                                        </IconButton>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {user.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {user.fullname}
                                    </TableCell>
                                    <TableCell align="right">{user.email}</TableCell>
                                    <TableCell align="right">{user.phone}</TableCell>
                                    <TableCell align="right">{user.address}</TableCell>
                                    <TableCell align="right">{user.Orders?.reduce((total)=>{return (total += 1)},0)}</TableCell>
                                    <TableCell align="right"><Button onClick={()=>navigate(`/admin/users/${user.id}`)} variant="outlined">Xem</Button></TableCell>
                                </TableRow>
                            </React.Fragment>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
