import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function Orders() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://zkatana.explorer.startale.com/api/v2/tokens/0x81fFb522f3a1D2071A86736156E2E215D5e31ee0/instances', {
        headers: {
          'accept': 'application/json'
        }
      });
      const jsonData = await response.json();
      setItems(jsonData.items);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ height: 280 }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>商品画像</TableCell>
            <TableCell align="right">商品名</TableCell>
            <TableCell align="right">商品詳細</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={3} align="center">Loading...</TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <img src={item.image_url} alt='main image description' width={70} />
                </TableCell>
                <TableCell align="right">{item.metadata.name}</TableCell>
                <TableCell align="right">{item.metadata.description}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => {}}>
                    購入
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Orders;