import React from 'react'
import Layout from '../components/Layout'
// Importamos el componente Link
import Link from 'next/link'

export default class Error extends React.Component {
  static getInitialProps ({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render () {
    // Obtenemos es statuscode de las props del get initial props
    const { statusCode } = this.props
    return (
      // Envolvemos el error en un layout con un title personalizado
      <Layout title='Oh no :('>
        {/* Si el error es igual a 404 mostraremos este mensaje */}
        {statusCode === 404
          ? (
            <div className='message'>
              <h1>Esta página no existe :(</h1>
              <p><Link href='/'><a>Volver a la home</a></Link></p>
            </div>
          )
        // Si no se cumple la condición, mostrará este otro mensaje
          : (
            <div className='mesage'>
              <h1>Hubo un problema :(</h1>
              <p>Intenta nuevamente en unos segundos</p>
            </div>
          )}
        <style jsx>{`
        .message {
          padding: 100px 30px;
          text-align: center;
        }
        h1{
          margin-bottom: 2em;
        }
        a{
          color: #8756CA;
        }
      `}
        </style>
      </Layout>
    )
  }
}
