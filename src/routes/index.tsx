import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Bike, Car, Truck, ShieldCheck, FileCheck2, MapPin, MessageCircle, BadgeCheck, Route as RouteIcon, Warehouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuoteAssistant } from "@/components/QuoteAssistant";
import logoGold from "@/assets/reylog-logo-gold.jpeg.asset.json";
import logoDark from "@/assets/reylog-logo-dark.jpeg.asset.json";
import rhayane from "@/assets/rhayane.png.asset.json";
import leonardo from "@/assets/leonardo-perfil-v3.jpg.asset.json";
import mercedesPatio from "@/assets/mercedes-patio.jpg.asset.json";
import jaguarPatio from "@/assets/jaguar-patio.jpg.asset.json";
import volvoCinza from "@/assets/volvo-cinza.jpg.asset.json";
import volvoBranca from "@/assets/volvo-branca.jpg.asset.json";
import bmwX1 from "@/assets/bmw-x1.jpg.asset.json";

const WHATSAPP_RHAYANE = "5531994527926";
const WHATSAPP_LEONARDO = "553191522756";
const CNPJ = "53.931.161/0001-65";
const ADDRESS = "Av. Raimundo Marçal de Melo, 158 - Paulo Camilo, Betim - MG, 32667-562, Brasil";
const MAPS_KEY = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"];
const QUOTE_MESSAGE = "Olá! Vim pelo site da ReyLog e gostaria de fazer uma cotação de transporte de veículo.";
function whatsappUrl(number: string) { return `https://wa.me/${number}?text=${encodeURIComponent(QUOTE_MESSAGE)}`; }

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "ReyLog Transportes — Transporte de veículos em todo o Brasil" },
    { name: "description", content: "Rey Log Transportes Ltda. Transporte de carros, motos, utilitários e caminhonetes em todo o Brasil, com pátio coberto e fechado em Betim/MG. CNPJ 53.931.161/0001-65. Cotação pelo WhatsApp." },
    { property: "og:title", content: "ReyLog Transportes — Transporte de veículos em todo o Brasil" },
    { property: "og:description", content: "Seu veículo em boas mãos. Transporte nacional de carros, motos, utilitários e caminhonetes. Fale com o comercial da ReyLog pelo WhatsApp." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});
const vehicles = [
  { icon: Car, title: "Carros de passeio", text: "Hatches, sedãs, SUVs e esportivos. Cuidado em cada detalhe." },
  { icon: Bike, title: "Motos", text: "Fixação adequada para transportar sua motocicleta com segurança." },
  { icon: Truck, title: "Utilitários", text: "Vans, furgões e veículos comerciais leves." },
  { icon: Car, title: "Caminhonetes", text: "Picapes de todos os portes, em todo o Brasil." },
];
const modalities = [
  { icon: RouteIcon, title: "Carreta cegonha", text: "Para frotas e múltiplos veículos em longas distâncias." },
  { icon: Truck, title: "Caminhão sider", text: "Proteção contra intempéries durante o trajeto." },
  { icon: Warehouse, title: "Prancha", text: "Coletas e entregas dedicadas, com atendimento individual." },
];
const docs = ["CIOT", "Manifesto", "CT-e", "Guia de ICMS"];
const clients = ["Mercedes-Benz — Grupo Bamaq", "BMW — Grupo Euroville", "Grupo Via Jap", "Ford São Paulo", "Grupo Tecar — Volkswagen"];
const gallery = [
  { src: mercedesPatio.url, alt: "Mercedes-Benz transportada pela ReyLog em pátio de apoio" },
  { src: jaguarPatio.url, alt: "Jaguar transportado pela ReyLog" },
  { src: volvoCinza.url, alt: "Volvo transportada pela ReyLog" },
  { src: volvoBranca.url, alt: "Volvo branca em pátio de apoio da ReyLog" },
  { src: bmwX1.url, alt: "BMW transportada pela ReyLog" },
];
function WhatsAppButton({ number, label, className = "", outline = false }: { number: string; label: string; className?: string; outline?: boolean }) {
  return <Button asChild variant={outline ? "outline" : "default"} className={`h-auto min-h-11 rounded-full px-6 py-3 font-semibold shadow-none ${className}`}><a href={whatsappUrl(number)} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden />{label}</a></Button>;
}
function Index() {
  return <div className="min-h-screen bg-background text-foreground">
    <nav aria-label="Navegação principal" className="sticky top-0 z-40 border-b border-inverse-foreground/10 bg-inverse/95 text-inverse-foreground backdrop-blur-xl">
      <div className="mx-auto grid h-20 max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:flex sm:justify-between sm:px-8">
        <a href="#inicio" aria-label="ReyLog início" className="min-w-0 shrink-0"><img src={logoDark.url} alt="ReyLog Transportes" className="h-14 w-36 object-cover sm:h-16 sm:w-44" /></a>
        <div className="hidden items-center gap-8 text-xs font-medium text-inverse-foreground/80 md:flex"><a href="#servicos" className="hover:text-brand">Transporte</a><a href="#sobre" className="hover:text-brand">A ReyLog</a><a href="#galeria" className="hover:text-brand">Nosso trabalho</a><a href="#localizacao" className="hover:text-brand">Localização</a><a href="#equipe" className="hover:text-brand">Contato</a></div>
        <Button asChild size="sm" className="rounded-full bg-brand px-4 text-brand-foreground shadow-none hover:bg-brand/90"><a href="#cotacao">Fazer cotação <ArrowUpRight aria-hidden /></a></Button>
      </div>
    </nav>
    <header id="inicio" className="scroll-mt-16">
      <div className="relative isolate overflow-hidden bg-inverse text-inverse-foreground">
        <img src={bmwX1.url} alt="BMW X1 sob os cuidados da ReyLog no pátio de apoio" className="hero-photo absolute inset-0 -z-20 h-full w-full object-cover" fetchPriority="high" />
        <div className="hero-shade absolute inset-0 -z-10" />
        <div className="mx-auto flex min-h-[500px] max-w-6xl flex-col items-center px-5 pt-7 pb-6 text-center sm:min-h-[650px] sm:pt-12">
          <img src={logoGold.url} alt="Emblema ReyLog Transportes" className="size-20 rounded-full object-cover sm:size-24" />
          <h1 className="mt-5 max-w-4xl font-display text-[32px] leading-[1.12] font-semibold sm:text-6xl">Rey Log Transportes Ltda.</h1>
          <p className="mt-4 max-w-xl text-lg font-medium text-inverse-foreground/90 sm:text-2xl">Seu veículo. Nosso cuidado.<br />Em todo o Brasil.</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3"><WhatsAppButton number={WHATSAPP_RHAYANE} label="Falar com Rhayane" className="bg-brand text-brand-foreground hover:bg-brand/90" /><Button asChild variant="ghost" className="h-auto rounded-full px-5 py-3 text-inverse-foreground hover:bg-inverse-foreground/10 hover:text-inverse-foreground"><a href="#servicos">Conheça o transporte <ArrowDown aria-hidden /></a></Button></div>
          <p className="mt-auto pt-14 text-xs text-inverse-foreground/80">Veículos reais. Transportados pela ReyLog.</p>
        </div>
      </div>
      <div className="border-b border-border bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 py-6 sm:grid-cols-3 sm:gap-8 sm:px-8">
          <div className="flex items-center gap-3"><BadgeCheck className="size-5 shrink-0 text-primary" /><div><p className="text-xs text-muted-foreground">CNPJ</p><p className="text-sm font-semibold">{CNPJ}</p></div></div>
          <div className="flex items-center gap-3"><MapPin className="size-5 shrink-0 text-primary" /><div><p className="text-xs text-muted-foreground">Cobertura</p><p className="text-sm font-semibold">Todo o território nacional</p></div></div>
          <a href={whatsappUrl(WHATSAPP_RHAYANE)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3"><MessageCircle className="size-5 shrink-0 text-primary" /><div><p className="text-xs text-muted-foreground">Rhayane · Comercial</p><p className="text-sm font-semibold">(31) 9 9452-7926 <span className="text-primary">↗</span></p></div></a>
        </div>
      </div>
    </header>
    <main>
      <section id="servicos" className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl"><div className="max-w-3xl"><p className="section-label">Transporte de veículos</p><h2 className="section-title mt-3">Cada veículo é único.<br /><span className="text-muted-foreground">Nosso cuidado também.</span></h2><p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">Da coleta à entrega, transportamos o que importa para você. Diretamente com o cliente ou em pátios de apoio, em qualquer lugar do Brasil.</p></div>
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">{vehicles.map(v => <div key={v.title} className="border-t border-border pt-6"><v.icon className="size-7 text-primary" aria-hidden /><h3 className="mt-5 text-lg font-semibold">{v.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p></div>)}</div>
        </div>
      </section>
      <section className="bg-secondary px-5 py-20 sm:px-8 sm:py-24"><div className="mx-auto max-w-6xl"><div className="text-center"><p className="section-label">Como funciona</p><h2 className="section-title mt-3">O transporte certo.<br />Para o seu caminho.</h2></div><div className="mt-14 grid gap-10 md:grid-cols-3">{modalities.map((m, i) => <div key={m.title} className="border-t border-border pt-6"><div className="flex items-center justify-between"><m.icon className="size-7 text-primary" aria-hidden /><span className="text-sm text-muted-foreground">0{i + 1}</span></div><h3 className="mt-6 text-xl font-semibold">{m.title}</h3><p className="mt-3 text-base leading-relaxed text-muted-foreground">{m.text}</p></div>)}</div></div></section>
      <section id="sobre" className="scroll-mt-16 bg-inverse px-5 py-20 text-inverse-foreground sm:px-8 sm:py-24"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center"><div><p className="section-label text-brand">A ReyLog</p><h2 className="section-title mt-3">Confiança em<br />cada quilômetro.</h2><p className="mt-6 max-w-lg text-lg leading-relaxed text-inverse-muted">A Rey Log Transportes Ltda., CNPJ {CNPJ}, está há quatro anos em atividade. Operamos em conformidade com a ANTT e emitimos a documentação exigida para o transporte.</p><p className="mt-4 max-w-lg text-lg leading-relaxed text-inverse-muted">Nosso pátio é coberto e fechado, com portões de acesso controlado para preservar e proteger cada veículo.</p><div className="mt-8 flex flex-wrap gap-4">{docs.map(d => <span key={d} className="inline-flex items-center gap-2 text-sm text-inverse-muted"><FileCheck2 className="size-4 text-brand" aria-hidden />{d}</span>)}</div></div><div className="grid grid-cols-2 gap-8 border-t border-inverse-foreground/20 pt-8"><div><BadgeCheck className="size-7 text-brand" aria-hidden /><p className="mt-6 text-5xl font-semibold sm:text-6xl">4 anos</p><p className="mt-3 text-sm text-inverse-muted">de CNPJ ativo</p></div><div><ShieldCheck className="size-7 text-brand" aria-hidden /><p className="mt-6 text-5xl font-semibold sm:text-6xl">100%</p><p className="mt-3 text-sm text-inverse-muted">documentação ANTT em dia</p></div></div></div></section>
      <section className="px-5 py-16 sm:px-8"><div className="mx-auto max-w-6xl"><h2 className="text-center text-2xl font-semibold">Quem confia na ReyLog</h2><ul className="mt-9 flex flex-wrap justify-center gap-x-10 gap-y-5">{clients.map(c => <li key={c} className="text-center text-sm font-semibold text-muted-foreground">{c}</li>)}</ul></div></section>
      <section id="galeria" className="scroll-mt-20 bg-secondary px-5 py-20 sm:px-8 sm:py-24"><div className="mx-auto max-w-6xl"><p className="section-label">Nosso trabalho em imagens</p><h2 className="section-title mt-3">Cuidado que você pode ver.</h2><div className="vehicle-gallery mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-3">{gallery.map((g, i) => <figure key={g.src} className={i === 0 ? "sm:row-span-2" : ""}><img src={g.src} alt={g.alt} loading="lazy" className={`w-full rounded-lg object-cover ${i === 0 ? "h-full min-h-80" : "aspect-[4/3]"}`} /></figure>)}</div></div></section>
      <section id="localizacao" className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24"><div className="mx-auto max-w-6xl"><div className="max-w-3xl"><p className="section-label">Onde estamos</p><h2 className="section-title mt-3">Pátio coberto e seguro.<br /><span className="text-muted-foreground">Fácil de encontrar.</span></h2><p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">Nosso pátio é coberto, protegendo os veículos contra chuva, granizo e eventuais problemas de clima. Ele também é fechado e protegido por portões com acesso controlado, garantindo a preservação e a proteção dos veículos durante toda a estadia.</p><p className="mt-5 flex items-start gap-2 text-base text-muted-foreground"><MapPin className="mt-1 size-5 shrink-0 text-primary" aria-hidden />{ADDRESS}</p></div><div className="mt-8 overflow-hidden rounded-xl border border-border bg-secondary"><iframe title="Mapa da ReyLog Transportes em Betim - MG" src={`https://www.google.com/maps/embed/v1/place?key=${MAPS_KEY}&q=${encodeURIComponent(ADDRESS)}&zoom=16`} className="h-72 w-full border-0 sm:h-96" loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /></div><div className="mt-5"><Button asChild variant="outline" className="h-auto min-h-11 rounded-full px-6 py-3 font-semibold shadow-none"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`} target="_blank" rel="noopener noreferrer"><MapPin aria-hidden />Abrir no Google Maps</a></Button></div></div></section>
      <section id="cotacao" className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24"><div className="mx-auto max-w-6xl"><p className="section-label">Sua próxima viagem começa aqui</p><h2 className="section-title mt-3">Monte sua cotação.</h2><p className="mt-5 mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground">Qual veículo vamos transportar? Conte a origem, o destino e o que você precisa.</p><QuoteAssistant contacts={[{ name: "Rhayane", number: WHATSAPP_RHAYANE }, { name: "Leonardo", number: WHATSAPP_LEONARDO }]} /></div></section>
      <section id="equipe" className="scroll-mt-20 bg-secondary px-5 py-20 sm:px-8 sm:py-24"><div className="mx-auto max-w-6xl"><div className="text-center"><p className="section-label">Nosso time comercial</p><h2 className="section-title mt-3">Pessoas de verdade.<br />Atendimento direto.</h2></div><div className="mx-auto mt-12 grid max-w-3xl gap-10 sm:grid-cols-2">{[{ name: "Rhayane", photo: rhayane.url, number: WHATSAPP_RHAYANE, phone: "(31) 9 9452-7926" }, { name: "Leonardo", photo: leonardo.url, number: WHATSAPP_LEONARDO, phone: "(31) 9 9152-2756" }].map(p => <div key={p.name} className="text-center"><img src={p.photo} alt={`Foto de ${p.name}, equipe comercial ReyLog`} className="mx-auto size-36 rounded-full object-cover" loading="lazy" /><h3 className="mt-5 text-2xl font-semibold">{p.name}</h3><p className="mt-2 text-sm text-muted-foreground">{p.phone}</p><WhatsAppButton number={p.number} label={`Falar com ${p.name}`} className="mt-5" /></div>)}</div></div></section>
    </main>
    <footer className="bg-inverse px-5 py-10 text-inverse-muted sm:px-8"><div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><img src={logoDark.url} alt="ReyLog Transportes" className="h-12 w-32 object-contain" /><div className="text-xs leading-relaxed sm:text-right"><p className="font-semibold text-inverse-foreground">Rey Log Transportes Ltda.</p><p>CNPJ {CNPJ} · Todo o Brasil</p></div></div></footer>
    <div className="mobile-quote-bar fixed inset-x-0 bottom-0 z-50 grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-t border-inverse-foreground/15 bg-inverse/95 px-5 pt-3 text-inverse-foreground backdrop-blur-xl sm:hidden"><Button asChild className="h-12 rounded-full bg-brand text-brand-foreground shadow-none hover:bg-brand/90"><a href="#cotacao">Fazer cotação <ArrowUpRight aria-hidden /></a></Button><Button asChild size="icon" className="size-12 rounded-full bg-inverse-foreground/10 text-inverse-foreground shadow-none hover:bg-inverse-foreground/20"><a href={whatsappUrl(WHATSAPP_RHAYANE)} target="_blank" rel="noopener noreferrer" aria-label="Falar com Rhayane pelo WhatsApp"><MessageCircle aria-hidden /></a></Button></div>
    <Button asChild size="icon" className="fixed right-5 bottom-5 z-50 hidden size-12 rounded-full shadow-lg sm:inline-flex"><a href={whatsappUrl(WHATSAPP_RHAYANE)} target="_blank" rel="noopener noreferrer" aria-label="Fazer cotação pelo WhatsApp"><MessageCircle className="size-6" aria-hidden /></a></Button>
  </div>;
}
