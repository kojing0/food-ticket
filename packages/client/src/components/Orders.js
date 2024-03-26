import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function createData(image, name) {
  return { image, name };
}

const rows = [
  createData('https://illust8.com/wp-content/uploads/2021/06/coffee_cup_13713.png', 'コーヒ', 6.0),
  createData('https://illust8.com/wp-content/uploads/2021/06/coffee_cup_13713.png', 'コーヒ', 9.0),
  createData('https://illust8.com/wp-content/uploads/2021/06/coffee_cup_13713.png', 'コーヒ', 16.0),
];

export default function Orders() {
  return (
    <TableContainer component={Paper} sx={{ height: 280 }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >商品画像</TableCell>
            <TableCell align="right">商品名</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.image}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                <img src={row.image} alt='main image description' width={70} />
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">
                {/* NFT取得のコントラクトを実装 */}
                <Button onClick={() => { }}>
                  購入
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}