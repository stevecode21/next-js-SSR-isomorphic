import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import PodcastListWithClick from '../components/PodcastListWithClick'
import Error from '../pages/_error'
// Importamos el componente Podcast Player
import PodcastPlayer from '../components/PodcastPlayer'
export default class extends React.Component {
  
      // Inicializamos el constructor para que el state funcione correctamente
    constructor(props){
      super(props)
      // Declaramos el state que nos servirá para que se abra un modal dentro de la misma página una vez se abra un audio
      this.state = { 
        openPodcast: null 
      }
    }
  

  static async getInitialProps ({ query, res }) {
    
    const idChannel = query.id

    try {
      const [reqChannel, reqSeries, reqAudios] = await Promise.all([
        fetch(`https://api.audioboom.com/channels/${idChannel}`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
      ])

      if (reqChannel.status >= 400) {
        res.statusCode = reqChannel.status
        return { channel: null, audioClips: null, series: null, statusCode: reqChannel }
      }

      const dataChannel = await reqChannel.json()
      const channel = dataChannel.body.channel

      const dataAudios = await reqAudios.json()
      const audioClips = dataAudios.body.audio_clips

      const dataSeries = await reqSeries.json()
      const series = dataSeries.body.channels

      return { channel, audioClips, series, statusCode: 200 }
    } catch (e) {
      return { channel: null, audioClips: null, series: null, statusCode: 503 }
    }
  }

  // Creamos la función para abrir el modal cuando se quierá escuchar un podcast, recibimos un evento cuando se haga un click y recibimos la información del podcast que queremos escuchar
  openPodcast = (event, podcast)=>{
    // Cuando clickeemos en cda uno de los links de los podcast queremos que no pase nada, que se cancele el comportamiento, con preventDefault
    event.preventDefault()
    // Actualizamos el estado interno con setState, por lo cual seteamos el estado con la información del podcast que esté requiriendo el usuario
    this.setState({
      openPodcast: podcast
    })
  }

  // Declaramos una función para el evento de cierre del modal
  closePodcast = (event) => {
    event.preventDefault()
    // Cambiamos el estado a null
    this.setState({
      openPodcast: null
    })
  }
  render () {
    
    const { channel, audioClips, series, statusCode } = this.props
    // Traemos openPodcast desde el estado interno
    const {openPodcast} = this.state

    if (statusCode !== 200) {
      return <Error statusCode={statusCode} />
    }
    return (

      <Layout title={channel.title}>
        <div className='banner' style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />

        {/* Si hay un podcast (true) mostramos el modal,  si no es true, no mostraremos nada */}
        {openPodcast && 
        // Asignamos una clase a este div que contendrá los estilos del css y asimismo lo que vamos a mostrar es el componente, esta recibe 2 props, el clip que será el openPodcast y un onClose con la prop para cerrar el modal, recordemos que cuando queremos referir a una función que hay en la clase es necesario usar el "this."
        <div className="modal"><PodcastPlayer clip={openPodcast} onClose={this.closePodcast} /></div>
        
        }

        <h1>{channel.title}</h1>
        {series.length > 0 &&
          <div>
            <h2>Series</h2>
            <ChannelGrid channels={series} />
          </div>}
        {/* Le enviamos la prop onclick podcast la cual contiene la función que actualiza mi state */}
        <PodcastListWithClick podcasts={audioClips} onClickPodcast={this.openPodcast}/>
        <style jsx>{`
          .banner {
            width: 100%;
            padding-bottom: 25%;
            background-position: 50% 50%;
            background-size: cover;
            background-color: #aaa;
          }
          h1 {
            font-weight: 600;
            padding: 15px;
          }
          h2 {
            padding: 5px;
            font-size: 0.9em;
            font-weight: 600;
            margin: 0;
            text-align: center;
          }
          .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: black;
            z-index: 99999;
          }
        `}
        </style>
      </Layout>
    )
  }
}
