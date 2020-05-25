import Link from 'next/link'
// Importamos el componente Head de next
import Head from 'next/head'
export default class Layout extends React.Component{
  render(){
    //Se carga automaticamente y es parte de react
    const {children, title} = this.props

    return(
      <div>
        <Head>
          <title>{title}</title>
        </Head>

        <header><Link href="/"><a>Podcasts</a></Link></header>
        {children}
        <style jsx>{`
          header {
            color: #fff;
            background: #8756CA;
            padding: 15px;
            text-align: center
          }
          header a {
            color: #fff;
            text-decoration: none;
          }
        `}</style>

        <style jsx global>{`
            body {
                margin: 0;
                font-family: system-ui;
                background: white;
            }
          `}</style>

      </div>
    )
  }
}