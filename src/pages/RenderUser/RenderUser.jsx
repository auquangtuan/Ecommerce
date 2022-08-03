import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function RenderUsers() {
    const [open, setOpen] = React.useState(false);
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <React.Fragment>
                        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                            <TableCell>
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => setOpen(!open)}
                                >
                                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                Name
                            </TableCell>
                            <TableCell align="right">calories</TableCell>
                            <TableCell align="right">fat</TableCell>
                            <TableCell align="right">carbs</TableCell>
                            <TableCell align="right">protein</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <Box sx={{ margin: 1 }}>
                                        <Typography variant="h6" gutterBottom component="div">
                                            History
                                        </Typography>
                                        <Table size="small" aria-label="purchases">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Date</TableCell>
                                                    <TableCell>Customer</TableCell>
                                                    <TableCell align="right">Amount</TableCell>
                                                    <TableCell align="right">Total price ($)</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">
                                                           history rơ date
                                                        </TableCell>
                                                        <TableCell>customer ID history rơ</TableCell>
                                                        <TableCell align="right">history rơ amunt</TableCell>
                                                        <TableCell align="right">
                                                            tính toán gì đó
                                                        </TableCell>
                                                    </TableRow>
                                            </TableBody>
                                        </Table>
                                    </Box>
                                </Collapse>
                            </TableCell>
                        </TableRow>
                    </React.Fragment>
                    <React.Fragment>
                        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                            <TableCell>
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => setOpen(!open)}
                                >
                                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                Name
                            </TableCell>
                            <TableCell align="right">calories</TableCell>
                            <TableCell align="right">fat</TableCell>
                            <TableCell align="right">carbs</TableCell>
                            <TableCell align="right">protein</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <Box sx={{ margin: 1 }}>
                                        <Typography variant="h6" gutterBottom component="div">
                                            History
                                        </Typography>
                                        <Table size="small" aria-label="purchases">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Date</TableCell>
                                                    <TableCell>Customer</TableCell>
                                                    <TableCell align="right">Amount</TableCell>
                                                    <TableCell align="right">Total price ($)</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">
                                                           history rơ date
                                                        </TableCell>
                                                        <TableCell>customer ID history rơ</TableCell>
                                                        <TableCell align="right">history rơ amunt</TableCell>
                                                        <TableCell align="right">
                                                            tính toán gì đó
                                                        </TableCell>
                                                    </TableRow>
                                            </TableBody>
                                        </Table>
                                    </Box>
                                </Collapse>
                            </TableCell>
                        </TableRow>
                    </React.Fragment>
                    <React.Fragment>
                        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                            <TableCell>
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => setOpen(!open)}
                                >
                                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                Name
                            </TableCell>
                            <TableCell align="right">calories</TableCell>
                            <TableCell align="right">fat</TableCell>
                            <TableCell align="right">carbs</TableCell>
                            <TableCell align="right">protein</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <Box sx={{ margin: 1 }}>
                                        <Typography variant="h6" gutterBottom component="div">
                                            History
                                        </Typography>
                                        <Table size="small" aria-label="purchases">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Date</TableCell>
                                                    <TableCell>Customer</TableCell>
                                                    <TableCell align="right">Amount</TableCell>
                                                    <TableCell align="right">Total price ($)</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">
                                                           history rơ date
                                                        </TableCell>
                                                        <TableCell>customer ID history rơ</TableCell>
                                                        <TableCell align="right">history rơ amunt</TableCell>
                                                        <TableCell align="right">
                                                            tính toán gì đó
                                                        </TableCell>
                                                    </TableRow>
                                            </TableBody>
                                        </Table>
                                    </Box>
                                </Collapse>
                            </TableCell>
                        </TableRow>
                    </React.Fragment>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
