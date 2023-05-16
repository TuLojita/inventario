import Head from "next/head"

interface Props {
  children: JSX.Element | JSX.Element[];
  title: string;
}

export const Layout = ({children, title = "" }: Props) => {
  return (
    <>
      <Head>
        <title>{title !== "" ? `Inventario - ${title}`: "Inventario" }</title>
      </Head>
      { children }
    </>
  )
}
