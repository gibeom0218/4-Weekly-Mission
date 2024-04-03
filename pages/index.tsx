import { Inter } from "next/font/google";
import Link from "next/link";
import Input from "@/components/Input";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Link href="/shared">
        <h1>shared페이지로 이동</h1>
      </Link>
      <Link href="/folder">
        <h1>folder페이지로 이동</h1>
      </Link>
      <br />
      <Input inputType="id" />
      <br />
      <br />
      <Input inputType="password" />
    </>
  );
}
