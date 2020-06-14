import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
// Importamos la librería de nprogress
import NProgress from 'nprogress'
// Importamos también el router de next router
import Router from 'next/router'

// Implementamos los tres eventos de la documentación oficial de NProgress
// El primer evento, cuando comienza un cambio de ruta, es decir que clickeamos en un link, nprogress comenzará a mostrar el indicador de carga
Router.onRouteChangeStart = (url) => {
  NProgress.start()
}
// Cuando termina el indicador quedará oculto ya que la carga está hecha
Router.onRouteChangeComplete = () => NProgress.done()
// Si hay un error el proceso de carga también termina su indicador de carga
Router.onRouteChangeError = () => NProgress.done()
export default class Layout extends React.Component {
  render () {
    const { children, title } = this.props

    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta name='viewport' content='width=device-width' />
        </Head>

        <header><Link href='/'><a>Podcasts</a></Link></header>
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
        `}
        </style>

        <style jsx global>{`
            body {
                margin: 0;
                font-family: system-ui;
                background: white;
            }
            /* Aquí crearemos los estilos globales para el loader */
            /* Make clicks pass-through */
            #nprogress {
              pointer-events: none;
            }

            #nprogress .bar {
              background: #29d;

              position: fixed;
              z-index: 1031;
              top: 0;
              left: 0;

              width: 100%;
              height: 2px;
            }

            /* Fancy blur effect */
            #nprogress .peg {
              display: block;
              position: absolute;
              right: 0px;
              width: 100px;
              height: 100%;
              box-shadow: 0 0 10px #29d, 0 0 5px #29d;
              opacity: 1.0;

              -webkit-transform: rotate(3deg) translate(0px, -4px);
                  -ms-transform: rotate(3deg) translate(0px, -4px);
                      transform: rotate(3deg) translate(0px, -4px);
            }

            /* Remove these to get rid of the spinner */
            #nprogress .spinner {
              display: block;
              position: fixed;
              z-index: 1031;
              top: 15px;
              right: 15px;
            }

            #nprogress .spinner-icon {
              width: 18px;
              height: 18px;
              box-sizing: border-box;

              border: solid 2px transparent;
              border-top-color: #29d;
              border-left-color: #29d;
              border-radius: 50%;

              -webkit-animation: nprogress-spinner 400ms linear infinite;
                      animation: nprogress-spinner 400ms linear infinite;
            }

            .nprogress-custom-parent {
              overflow: hidden;
              position: relative;
            }

            .nprogress-custom-parent #nprogress .spinner,
            .nprogress-custom-parent #nprogress .bar {
              position: absolute;
            }

            @-webkit-keyframes nprogress-spinner {
              0%   { -webkit-transform: rotate(0deg); }
              100% { -webkit-transform: rotate(360deg); }
            }
            @keyframes nprogress-spinner {
              0%   { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }

          `}
        </style>

      </div>
    )
  }
}
