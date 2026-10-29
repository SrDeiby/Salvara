import ProposalBanner from "@/components/ProposalBanner";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Catalogo from "@/components/Catalogo";
import ComoComprar from "@/components/ComoComprar";
import Nosotros from "@/components/Nosotros";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import NotesToggle from "@/components/NotesToggle";
import { PedidoProvider } from "@/components/Pedido";

export default function Home() {
  return (
    <PedidoProvider>
      <ProposalBanner />
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <Catalogo />
        <ComoComprar />
        <Nosotros />
      </main>
      <Footer />
      <WhatsAppButton />
      <NotesToggle />
    </PedidoProvider>
  );
}
