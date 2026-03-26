import Hero from '../components/Hero'
import VideoScrub from '../components/VideoScrub'
import Products from '../components/Products'
import VideoSection from '../components/VideoSection'
import Gallery from '../components/Gallery'
import LeadForm from '../components/LeadForm'
import PreventivoDedicato from '../components/PreventivoDedicato'
import SocialVideoWidget from '../components/SocialVideoWidget'

export default function Home() {
  return (
    <>
      <Hero />
      <VideoScrub />
      <SocialVideoWidget count={4} />
      <Products />
      <VideoSection />
      <Gallery />
      <LeadForm />
      <PreventivoDedicato />
    </>
  )
}
