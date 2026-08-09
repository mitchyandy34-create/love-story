import Hero from '../components/Hero';
import BirthdayCountdown from '../components/BirthdayCountdown';
import LoveStory from '../components/LoveStory';
import MemoryGallery from '../components/MemoryGallery';
import MusicPlayer from '../components/MusicPlayer';
import LoveLetters from '../components/LoveLetters';
import Reasons from '../components/Reasons';
import MemoryReveal from '../components/MemoryReveal';
import GiveWorld from '../components/GiveWorld';
import PolaroidGallery from '../components/PolaroidGallery';
import LoveMeter from '../components/LoveMeter';
import FutureDreams from '../components/FutureDreams';
import NightMode from '../components/NightMode';
import FinalSection from '../components/FinalSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <BirthdayCountdown />
      <LoveStory />
      <MemoryGallery />
      <MusicPlayer />
      <LoveLetters />
      <Reasons />
      <MemoryReveal />
      <GiveWorld />
      <PolaroidGallery />
      <LoveMeter />
      <FutureDreams />
      <NightMode />
      <FinalSection />
      <Footer />
    </main>
  );
}