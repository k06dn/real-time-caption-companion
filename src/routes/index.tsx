import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowDown, ArrowUpRight, BookOpen, CheckCheck, GraduationCap, MessageSquareText, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CaptionDemo } from '@/components/caption-demo';
import { WaitlistForm } from '@/components/waitlist-form';
import nishitPortrait from '@/assets/nishit-portrait.png.asset.json';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Caption+ — Every word. With you.' },
    { name: 'description', content: 'Live captions that work like subtitles. Stable, technical and readable captioning, built for the whole lecture. Discover Caption+ and join the beta waitlist.' },
    { property: 'og:title', content: 'Caption+ — Every word. With you.' },
    { property: 'og:description', content: 'Stay with the lecture. Live captions over slides, code or video, built by a Deaf student who needed them to exist.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

function Brand() { return <a href="#" className="brand" aria-label="Caption+ home">Caption<span className="brand-plus">+</span></a>; }
function Introduction() {
  return <section className="hero page-width">
    <h1>Live captions that<br/>work like <em>subtitles.</em></h1>
    <p>Stay with the lecture. Follow every voice.<br/>Clear, steady captions that don’t get in the way.</p>
    <div className="hero-actions"><Button variant="caption" size="lg" asChild><a href="#waitlist">Join the waitlist <ArrowUpRight/></a></Button><Button variant="outline" size="lg" asChild><a href="#demo">See it in action <ArrowDown/></a></Button></div>
    <div className="pilot-line"><GraduationCap size={28} aria-hidden="true"/><p>Piloting at <strong>UAL Creative Computing Institute</strong></p></div>
  </section>;
}

function Difference() {
  const features = [
    { icon: CheckCheck, title: 'Words that stay put.', text: 'No jumping lines or changing sentences. Just a steady place to follow along.', tone: 'green' },
    { icon: BookOpen, title: 'The right words.', text: 'From malloc to mitosis. Course vocabulary matters, even when it gets technical.', tone: 'blue' },
    { icon: MessageSquareText, title: 'A readable rhythm.', text: 'Captions that keep pace with the speaker. Less catching up, more taking it in.', tone: 'peach' },
  ];
  return <section id="difference" className="difference-section page-width">
    <h2>Not more captions.<br/><em>Better captions.</em></h2>
    <div className="feature-grid">{features.map(({ icon: Icon, title, text, tone }) => <article className="feature" key={title}><span className={`feature-icon icon-${tone}`}><Icon size={25} strokeWidth={1.5} aria-hidden="true"/></span><h3>{title}</h3><p>{text}</p></article>)}</div>
  </section>;
}

function Story() {
  return <section id="story" className="story-band"><div className="story-inner page-width">
    <img className="founder-portrait" src={nishitPortrait.url} alt="Nishit, founder of Caption+" width={200} height={200} loading="lazy"/>
    <div className="story-content"><h2>Built from lived experience.</h2>
    <p>Nishit is a Deaf computer science student at UAL Creative Computing Institute. Captions that couldn’t keep up with his lectures made him build Caption+, so students can focus on what’s being taught, not on filling in the gaps.</p></div>
  </div></section>;
}

const faqs = [
  { q: 'What is Caption+?', a: 'Caption+ is live captioning that works like subtitles: steady, readable lines that keep up with a lecture instead of fighting it. It runs alongside whatever is on screen — slides, code, video — so the words and the teaching stay together. It was built by a Deaf student who spent years decoding lectures on his own, and it shows: every design decision exists because a real lecture demanded it.' },
  { q: 'Who is the beta for?', a: 'Students who rely on captions to follow teaching — including Deaf and hard of hearing students. Today’s auto-captions fail exactly when the material gets hard: dense technical vocabulary, multiple speakers, fast-paced discussion. Caption+ is being piloted with students at UAL Creative Computing Institute, and feedback from those real lectures shapes what we build next.' },
  { q: 'Why does it matter?', a: 'Imagine trying to follow a lecture while the subtitles fall fifteen seconds behind. By the time the words arrive, the moment has moved on — the joke, the exam hint, the explanation that made everything click. That gap is where learning is lost. Caption+ closes it, so a student can look up at the board, hear the room laugh, and still not miss a single word. Education should not depend on how fast a caption engine can type.' },
  { q: 'What makes it different?', a: 'Most captioning treats every word as equal. Caption+ is built for the realities of a lecture: course vocabulary like malloc and mitosis rendered correctly, lines that stay put instead of jumping around, and a rhythm that matches the speaker. The goal is not more text on screen — it is text you can actually follow, all the way through a three-hour seminar.' },
  { q: 'What accessibility features does it offer?', a: 'Caption size can be adjusted, and a high-contrast mode helps in bright rooms or for low-vision users. Captions can be paused and resumed at any time, a full transcript is available to review and export, and every control works with a keyboard alone. These are not extras bolted on at the end — they are the product.' },
  { q: 'What is the long-term vision?', a: 'Caption+ is working towards being free for eligible UK students through Disabled Students’ Allowance funding, so the students who need it most are never priced out of their own education. The beta waitlist is open now, and every early user helps make the case that accessible learning should be the default, not the exception.' },
];

function Faq() {
  return <section id="faq" className="faq-section page-width" aria-labelledby="faq-heading"><h2 id="faq-heading">FAQ</h2>
    <div className="faq-list">{faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div>
  </section>;
}

function Supporters() {
  return <section className="supporters-section page-width" aria-labelledby="supporters-heading"><h2 id="supporters-heading" className="supporters-title">Supported by</h2><div className="supporters-grid"><div><Award size={22} aria-hidden="true"/><strong>UAL Social Purpose<br/>Innovation Fund</strong></div><div><Award size={22} aria-hidden="true"/><strong>Pitch It</strong><span>Top prize winner</span></div><div><Award size={22} aria-hidden="true"/><strong>London Social Ventures</strong><span>Build grant</span></div></div></section>;
}

function Waitlist() {
  return <section id="waitlist" className="waitlist-section"><div className="waitlist-inner page-width">
    <div className="waitlist-copy">
      <h2>Focus on the lecture.<br/><em>Not the missing words.</em></h2>
      <p>Join the beta waitlist. Tell us a little about you, and we’ll be in touch when places open.</p>
      <div className="dsa-note"><GraduationCap size={26} aria-hidden="true"/><h3>Working towards DSA funding</h3><p>We’re working towards making Caption+ free for eligible UK students through Disabled Students’ Allowance. Funding is not yet available.</p></div>
    </div>
    <WaitlistForm/>
  </div></section>;
}

function Index() {
  return <div className="site-page">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header page-width"><Brand/><nav aria-label="Main navigation"><a href="#difference">Why Caption+</a><a href="#story">Our story</a><a href="#faq">FAQ</a></nav><Button variant="ghost" asChild><a href="#waitlist">Join the waitlist <ArrowUpRight/></a></Button></header>
    <main id="main-content" tabIndex={-1}><Introduction/><div className="demo-width"><CaptionDemo/></div><Difference/><Story/><Supporters/><Faq/><Waitlist/></main>
    <footer className="site-footer page-width"><Brand/><nav aria-label="Legal navigation"><Link to="/privacy">Privacy</Link><Link to="/legal">Legal</Link></nav><span>© 2026 Caption+</span></footer>
  </div>;
}
