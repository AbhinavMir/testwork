"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

export default function Component() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token);
  }, []);

  return (
    <nav className="flex items-center h-14 px-4 border-b gap-2 md:gap-4 text-sm font-medium dark:text-gray-400">
      <Link className="flex items-center gap-2" href="#">
        goldCarder
      </Link>
      <div className="ml-auto flex items-center space-x-4">
        {hasToken ? (
          <>
            <Button
              onClick={() => {
                localStorage.removeItem("token");
                setHasToken(false);
              }}
            >
              Logout
            </Button>
            <Button
              onClick={() => {
                window.location.href = "/dashboard";
              }}
            >
              Dashboard
            </Button>
          </>
        ) : (
          <>
            <Link className="font-semibold" href="/login">
              Login
            </Link>
            <Link className="font-semibold" href="/signup">
              Signup
            </Link>
          </>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Options</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuRadioGroup defaultValue="option1">
              <DropdownMenuRadioItem value="option1">
                <Link href="/payers">Payers</Link>
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="option2">
                <Link href="/providers">Providers</Link>
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
