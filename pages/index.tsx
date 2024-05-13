import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Link href="/shared/1108">
        <h1>shared/1108페이지로 이동</h1>
      </Link>
      <Link href="/folder">
        <h1>folder페이지로 이동</h1>
      </Link>
      <Link href="/signin">
        <h1>signin페이지로 이동</h1>
      </Link>
      <Link href="/signup">
        <h1>signup페이지로 이동</h1>
      </Link>
    </>
  );
}
