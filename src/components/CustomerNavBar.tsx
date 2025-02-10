import Button from '@mui/material/Button';
function CustomerNavBar() {
  return (
    <>
      <nav>
        <Button variant="text" href="/products">PC Case</Button>
        <Button variant="text" href="/products">Processors</Button>
        <Button variant="text" href="/products">Motherboard</Button>
        <Button variant="text" href="/products">Graphics Card</Button>
        <Button variant="text" href="/products">Memory</Button>
        <Button variant="text" href="/products">Storage</Button>
        <Button variant="text" href="/products">Power Supply</Button>
      </nav>
    </>
  );
}

export default CustomerNavBar;
