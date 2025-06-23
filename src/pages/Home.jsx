import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to PayFlex</h1>
      <Link to="/pay">
        <button>Make a Payment</button>
      </Link>
    </div>
  );
}
