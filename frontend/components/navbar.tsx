import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuRadioItem, DropdownMenuRadioGroup, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"

export default function Component() {
  return (
    <nav className="flex items-center h-14 px-4 border-b gap-2 md:gap-4 text-sm font-medium dark:text-gray-400">
      <Link className="flex items-center gap-2" href="#">
        Acme Inc
      </Link>
      <div className="ml-auto flex items-center space-x-4">
        <Link className="font-semibold" href="#">
          Login
        </Link>
        <Link className="font-semibold" href="#">
          Signup
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Options</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuRadioGroup defaultValue="option1">
              <DropdownMenuRadioItem value="option1">Option 1</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value=" dos">Option 2</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="option3">Option 3</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="option4">Option 4</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}