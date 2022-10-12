import Link from 'next/link';

const NavBar = () => (
    <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
    <Link href="/" className="d-flex align-items-center text-dark text-decoration-none">
      <span className="fs-4">{process.env.NEXT_PUBLIC_NAME}</span>
    </Link>

    <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
      <Link className="me-3 py-2 text-dark text-decoration-none" href="/investments">Investments</Link>
    </nav>
  </div>
)

export default NavBar
