import 'isomorphic-fetch'
// Importamos el componente de Layout
import Layout from '../components/Layout'
// Importamos ChannelGrid 
import ChannelGrid from '../components/ChannelGrid'

export default class extends React.Component {

  static async getInitialProps(){
    const req = await fetch('https://api.audioboom.com/channels/recommended')
    const {body: channels} = await req.json()

    return {channels}
  }
  render() {
    const {channels} = this.props
    return (
      // Cambiamos el div por el Layout, el title es una prop de layout
      <Layout title="Podcasts">
        {/* Llamamos el componente channelgrid y le pasamos la prop con los datos que traemos en el fetch como petición a la API */}
        <ChannelGrid channels={channels} />
      </Layout>
    )
  }
}