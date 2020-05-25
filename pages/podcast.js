import 'isomorphic-fetch'
import Link from 'next/link'
import Layout from '../components/Layout'
import PodcastClips from '../components/PodcastClips'

export default class extends React.Component{
  static async getInitialProps({query}){
    let id = query.id
    let fetchClip = await fetch(`https://api.audioboom.com/audio_clips/${id}.mp3`)
    let clip = (await fetchClip.json()).body.audio_clip
    return {clip}
  }

  render(){
    const {clip} = this.props

    return (
      <Layout title={`${clip.channel.title} - ${clip.title}`}>
        <PodcastClips clip={clip} />
      </Layout>
    )
  }
}