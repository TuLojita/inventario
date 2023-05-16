import Head from "next/head"
import { Nav } from "../ui";

interface Props {
  children: JSX.Element | JSX.Element[];
  title: string;
}

export const LayoutAuth = ({children, title = "" }: Props) => {
  return (
    <>
      <Head>
        <title>{title !== "" ? `Inventario - ${title}`: "Inventario" }</title>
      </Head>
      <Nav />
      { children }
      {/* <Footer /> */}
    </>
  )
}
