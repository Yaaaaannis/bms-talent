import Navbar from './components/Navbar'
import BentoGrid from './components/BentoGrid'
import ThreeScene from './components/ThreeScene'
import { HoverProvider } from './components/3D/BmsModel'

export default function Home() {
  return (
    <HoverProvider>
      <Navbar />
      <ThreeScene />
      <div className="pt-24 min-h-screen  flex items-center justify-center relative">
        <BentoGrid />
      </div>
    </HoverProvider>
  );
}
