"use client";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex items-center h-14 px-4 border-b gap-2 md:gap-4 text-sm font-medium dark:text-gray-400">
      <Link className="flex items-center gap-2" href="#">
        GoldCarder Inc.
      </Link>
      <div className="dropdown relative">
        <button className="px-3 py-2 rounded-md text-sm font-medium">Options</button>
        <div className="dropdown-content absolute hidden bg-white shadow-lg">
          <Link href="/option1" className="block px-4 py-2 text-black hover:bg-gray-100">Option 1</Link>
          <Link href="/option2" className="block px-4 py-2 text-black hover:bg-gray-100">Option 2</Link>
          <Link href="/option3" className="block px-4 py-2 text-black hover:bg-gray-100">Option 3</Link>
          <Link href="/option4" className="block px-4 py-2 text-black hover:bg-gray-100">Option 4</Link>
          <Link href="/option5" className="block px-4 py-2 text-black hover:bg-gray-100">Option 5</Link>
        </div>
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <Link className="font-semibold" href="/login">
          Login
        </Link>
        <Link className="font-semibold" href="/signup">
          Signup
        </Link>
      </div>
    </nav>
  )
}

// Add some CSS for dropdown functionality
<style jsx>{`
  .dropdown:hover .dropdown-content {
    display: block;
  }
`}</style>
