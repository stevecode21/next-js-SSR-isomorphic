import React from 'react'
// Ahora lo que hacemos es usar el link pero de routes que es donde estamos importante next-route, especificando con ({}) que queremos ese elemento precisamente
import { Link } from '../routes'
// Importamos el helper
import slug from '../helpers/slug'
export default class ChannelGrid extends React.Component {
  render () {
    const { channels } = this.props
    return (
      <div className='channels'>
        {channels.map((channel) => (
          // A diferencia del link actual que usabamos propio de Next, este cambia un poco su uso, ya no será necesario un href y por el contrario usaremos "route", que será hacia qué ruta que ruta queremos dirigirnos y "params", que básicamente es, cómo voy a construir esa ruta (named)
          <Link
            route='channel' params={{
            // Para el slug, que finalmente será el nombre del canal, los mostraremos llamando nuestra función slug, enviando por parametro el title del channel
              slug: slug(channel.title),
              // el id será igual al id del channel solicitado por le usuario
              id: channel.id
            }} key={channel.id}
          >
            <a className='channel'>
              <img src={channel.urls.logo_image.original} alt='' />
              <h2>{channel.title}</h2>
            </a>
          </Link>
        ))}
        <style jsx>
          {`
            .channels{
              display: grid;
              grid-gap: 15px;
              padding: 15px;
              grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            }
            .channel {
              display: block;
              border-radius: 3px;
              box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
              margin-bottom: 0.5em;
            }
            .channel img{
              width: 100%;
            }
            h2 {
              padding: 5px;
              font-size: 0.9em;
              font-weight: 600;
              margin: 0;
              text-align: center;
            }
          `}
        </style>
      </div>
    )
  }
}
