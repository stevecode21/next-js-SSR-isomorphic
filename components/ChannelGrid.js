import Link from 'next/link'
export default class ChannelGrid extends React.Component{
  render(){

    // Traemos la prop channel
    const {channels} = this.props
    // Aquí usaremos la renderización de todos los channels que pedimos con el fetch
    return(
      <div className="channels">
        {channels.map((channel)=> (
          <Link href={`/channel?id=${channel.id}`}>
              <a className="channel" >
                <img src={channel.urls.logo_image.original} alt=""/>
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