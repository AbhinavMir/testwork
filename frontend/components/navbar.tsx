import Link from "next/link"

export function Navbar() {
  return (
    <nav className="flex items-center h-14 px-4 border-b gap-2 md:gap-4 text-sm font-medium dark:text-gray-400">
      <Link className="flex items-center gap-2" href="#">
        GoldCarder Inc.
      </Link>
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
