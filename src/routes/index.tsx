import { createFileRoute } from '@tanstack/react-router';
import { ArrowDown, ArrowUpRight, BookOpen, CheckCheck, MessageSquareText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CaptionDemo } from '@/components/caption-demo';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Caption+ — Every word. With you.' },
    { name: 'description', content: 'Live captions that work like subtitles. Stable, technical and readable captioning, built for the whole lecture. Discover Caption+ and join the beta waitlist.' },
    { property: 'og:title', content: 'Caption+ — Every word. With you.' },
    { property: 'og:description', content: 'Stay with the lecture. Live captions over slides, code or video, built by a deaf student who needed them to exist.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

function Brand() { return <a href="#" className="brand" aria-label="Caption+ home"><span className="brand-mark">c<Plus size={12}/></span><span>Caption<span className="brand-plus">+</span></span></a>; }
function Introduction() {
  return <section className="hero page-width">
    <h1>Live captions that<br/>work like <em>subtitles.</em></h1>
    <p>Stay with the lecture. Follow every voice.<br/>Clear, steady captions that don’t get in the way.</p>
    <div className="hero-actions"><Button variant="caption" size="lg" asChild><a href="#waitlist">Join the waitlist <ArrowUpRight/></a></Button><Button variant="ghost" asChild><a href="#demo">See it in action <ArrowDown/></a></Button></div>
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
    <h2>Built by someone<br/>who needed it.</h2>
    <div className="story-content"><blockquote>“As a deaf student, I struggled daily with captions that couldn’t keep up with lectures. I built Caption+ because <em>I needed it to exist.</em>”</blockquote>
    <div className="founder"><span className="founder-initial">N</span><div><strong>Nishit <span>— Founder, Caption+</span></strong><p>Deaf computer science student at UAL Creative Computing Institute</p></div></div></div>
    <p className="funding">Supported by the UAL Social Purpose Innovation Fund, Pitch It top prize, and a London Social Ventures build grant.</p>
  </div></section>;
}

function Waitlist() {
  return <section id="waitlist" className="waitlist-section page-width"><h2>Your next lecture.<br/><em>A little clearer.</em></h2><p>Join the waitlist for Caption+.</p><Button variant="caption" size="lg" asChild><a href="https://captionplus.ai/#waitlist" target="_blank" rel="noreferrer">Get access to the beta <ArrowUpRight/></a></Button><p className="dsa-note">We’re working towards DSA funding for UK students,<br/>with the aim of making Caption+ free for those eligible.</p></section>;
}

function Index() {
  return <div className="site-page">
    <header className="site-header page-width"><Brand/><nav aria-label="Main navigation"><a href="#difference">Why Caption+</a><a href="#story">Our story</a></nav><Button variant="ghost" asChild><a href="#waitlist">Join the waitlist <ArrowUpRight/></a></Button></header>
    <main><Introduction/><div className="demo-width"><CaptionDemo/></div><p className="pilot-line">Piloting at <strong>UAL Creative Computing Institute</strong></p><Difference/><Story/><Waitlist/></main>
    <footer className="site-footer page-width"><Brand/><span>© 2026 Caption+</span></footer>
  </div>;
}
