import Button from '@mui/material/Button'
import LoginComponent from './LoginComponent';

function CustomerNavBar() {

  return (
    <>
      <nav className="mx-3">
        <Button variant="text" href="/products?category=case">PC Case</Button>
        <Button variant="text" href="/products?category=processor">Processors</Button>
        <Button variant="text" href="/products?category=motherboard">Motherboard</Button>
        <Button variant="text" href="/products?category=graphics-card">Graphics Card</Button>
        <Button variant="text" href="/products?category=memory">Memory</Button>
        <Button variant="text" href="/products?category=storage">Storage</Button>
        <Button variant="text" href="/products?category=power-supply">Power Supply</Button>
        <LoginComponent></LoginComponent>
      </nav>
    </>
  );
}
export default CustomerNavBar;
