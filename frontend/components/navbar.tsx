// components/Navbar.tsx
import Link from 'next/link'

const Navbar: React.FC = () => {
  return (
    <nav>
      <Link href="/"><a>Home</a></Link>
      <Link href="/about"><a>About</a></Link>
      {/* Add more links as needed */}
    </nav>
  )
}

export default Navbar
