import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowDown, ArrowUpRight, BookOpen, CheckCheck, GraduationCap, MessageSquareText, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CaptionDemo } from '@/components/caption-demo';
import { Scribble, Doodle } from '@/components/doodles';
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
    <h1>Live captions that<br/>work like <em><Scribble>subtitles.</Scribble></em><Doodle type="star" className="doodle-hero"/></h1>
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
    <h2>Not more captions.<br/><em><Scribble>Better</Scribble> captions.</em></h2>
    <div className="feature-grid">{features.map(({ icon: Icon, title, text, tone }) => <article className="feature" key={title}><span className={`feature-icon icon-${tone}`}><Icon size={25} strokeWidth={1.5} aria-hidden="true"/></span><h3>{title}</h3><p>{text}</p></article>)}</div>
  </section>;
}

function Story() {
  return <section id="story" className="story-band"><div className="story-inner page-width">
    <img className="founder-portrait" src={nishitPortrait.url} alt="Nishit, founder of Caption+" width={200} height={200} loading="lazy"/>
    <div className="story-content"><h2>Built from <Scribble>lived experience.</Scribble></h2>
    <p>Nishit is a Deaf computer science student at UAL Creative Computing Institute. Captions that couldn’t keep up with his lectures made him build Caption+, so students can focus on what’s being taught, not on filling in the gaps.</p></div>
  </div></section>;
}

const faqs = [
  { q: 'What is Caption+?', a: 'Live captions that work like subtitles: steady, readable lines that keep up with lectures, slides and code.' },
  { q: 'Who is the beta for?', a: 'Students who rely on captions to follow teaching, including Deaf and hard of hearing students in the UK.' },
  { q: 'Why does it matter?', a: 'When captions lag or jump around, you miss the lecture while decoding the text. Caption+ lets you stay with what’s being taught.' },
  { q: 'Is it co-designed?', a: 'Yes. It’s built by a Deaf student and shaped with beta students, so feedback from real lectures guides what comes next.' },
  { q: 'What accessibility features does it offer?', a: 'Adjustable caption size, a high-contrast mode, pause and resume, a full transcript, and full keyboard control.' },
  { q: 'How do I request access?', a: 'Join the beta waitlist below and we’ll send you updates when places open.' },
];

function Faq() {
  return <section id="faq" className="faq-section page-width" aria-labelledby="faq-heading"><h2 id="faq-heading">Questions, <Scribble>answered.</Scribble></h2>
    <div className="faq-list">{faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div>
  </section>;
}

function Supporters() {
  return <section className="supporters-section page-width" aria-labelledby="supporters-heading"><h2 id="supporters-heading" className="supporters-title"><Doodle type="squiggle" className="doodle-left"/><Scribble variant="circle">Supported by</Scribble><Doodle type="star" className="doodle-right"/></h2><div className="supporters-grid"><div><Award size={22} aria-hidden="true"/><strong>UAL Social Purpose<br/>Innovation Fund</strong></div><div><Award size={22} aria-hidden="true"/><strong>Pitch It</strong><span>Top prize winner</span></div><div><Award size={22} aria-hidden="true"/><strong>London Social Ventures</strong><span>Build grant</span></div></div></section>;
}

function Waitlist() {
  return <section id="waitlist" className="waitlist-section"><div className="waitlist-inner page-width">
    <div className="waitlist-copy">
      <h2>Focus on the lecture.<br/><em>Not the <Scribble>missing words.</Scribble></em></h2><Doodle type="arrow" className="doodle-arrow"/>
      <p>Join the beta waitlist. Tell us a little about you, and we’ll be in touch when places open.</p>
      <div className="dsa-note"><GraduationCap size={26} aria-hidden="true"/><h3>Working towards DSA funding</h3><p>We’re working towards making Caption+ free for eligible UK students through Disabled Students’ Allowance. Funding is not yet available.</p></div>
    </div>
    <WaitlistForm/>
  </div></section>;
}

function Index() {
  return <div className="site-page">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header page-width"><Brand/><nav aria-label="Main navigation"><a href="#difference">Why Caption+</a><a href="#story">Our story</a></nav><Button variant="ghost" asChild><a href="#waitlist">Join the waitlist <ArrowUpRight/></a></Button></header>
    <main id="main-content" tabIndex={-1}><Introduction/><div className="demo-width"><CaptionDemo/></div><Difference/><Story/><Supporters/><Waitlist/></main>
    <footer className="site-footer page-width"><Brand/><nav aria-label="Legal navigation"><Link to="/privacy">Privacy</Link><Link to="/legal">Legal</Link></nav><span>© 2026 Caption+</span></footer>
  </div>;
}
