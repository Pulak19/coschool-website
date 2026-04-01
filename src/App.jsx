import Nav from './components/Nav/Nav.jsx';
import Hero from './components/Hero/Hero.jsx';
// import IcebergSection from './components/IcebergSection/IcebergSection.jsx'; // archived
import DisconnectedSteps from './components/DisconnectedSteps/DisconnectedSteps.jsx';
import ClosedLoopSection from './components/ClosedLoopSection/ClosedLoopSection.jsx';
// import LoopSequence from './components/LoopSequence/LoopSequence.jsx'; // archived — bring back when needed
import HowItWorks from './components/HowItWorks/HowItWorks.jsx';
import CardsStack from './components/CardsStack/CardsStack.jsx';
import Testimonials from './components/Testimonials/Testimonials.jsx';
import Founders from './components/Founders/Founders.jsx';
import CTASection from './components/CTASection/CTASection.jsx';
import Footer from './components/Footer/Footer.jsx';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <DisconnectedSteps />
        <ClosedLoopSection />
        <HowItWorks />
        <CardsStack />
        <Testimonials />
        <Founders />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
