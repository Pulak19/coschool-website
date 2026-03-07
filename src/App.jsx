import Nav from './components/Nav/Nav.jsx';
import Hero from './components/Hero/Hero.jsx';
import LoopSequence from './components/LoopSequence/LoopSequence.jsx';
import HowItWorks from './components/HowItWorks/HowItWorks.jsx';
import CardsStack from './components/CardsStack/CardsStack.jsx';
import Founders from './components/Founders/Founders.jsx';
import CTASection from './components/CTASection/CTASection.jsx';
import Footer from './components/Footer/Footer.jsx';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <LoopSequence />
        <HowItWorks />
        <CardsStack />
        <Founders />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
