import { createFileRoute } from '@tanstack/react-router';
import { ArrowDown, ArrowUpRight, Check, MoveRight, Plus } from 'lucide-react';
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
function Index() {
  return <div className="site-page">
    <header className="site-header page-width"><Brand/><nav aria-label="Main navigation"><a href="#difference">The difference</a><a href="#story">Our story</a></nav><Button variant="caption" asChild><a href="#waitlist">Join the waitlist <ArrowUpRight/></a></Button></header>
    <main>
      <section className="hero page-width">
        <div className="hero-eyebrow"><span className="status-dot"/> BUILT FOR THE LECTURE. AND EVERYONE IN IT.</div>
        <h1>Live captions that<br/>work like <span className="subtitle-word">subtitles.<svg viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden="true"><path d="M3 13 Q190 -2 396 10 M20 17 Q210 4 375 15"/></svg></span></h1>
        <p>A little strip. A whole lot of clarity.<br/>Captions that stay in step with the speaker, not in your way.</p>
        <div className="hero-actions"><Button variant="caption" size="lg" asChild><a href="#waitlist">Join the waitlist <ArrowUpRight/></a></Button><Button variant="ghost" asChild><a href="#demo">See it in action <ArrowDown/></a></Button></div>
        <div className="hero-note">Made by a deaf student. For a better way to follow along.</div>
      </section>
      <div className="page-width"><CaptionDemo/></div>
      <section className="pilot-band page-width"><span>GOOD IDEAS START IN REAL CLASSROOMS.</span><div><strong className="ual-logo">ual:</strong><span>Piloting at <strong>UAL Creative<br className="desktop-break"/> Computing Institute</strong></span></div><div className="pilot-status"><span className="status-dot"/> BUILT WITH LIVED EXPERIENCE</div></section>
      <section id="difference" className="difference-section page-width">
        <div className="section-heading"><div><span className="small-label">LESS FRICTION. MORE UNDERSTANDING.</span><h2>Not just more captions.<br/><em>Better</em> captions.</h2></div><p>A lecture moves fast.<br/>Your captions shouldn’t make it harder.</p></div>
        <div className="feature-grid">
          <article className="feature-paper paper-stable"><div className="paper-top"><span>01 / STABLE</span><Plus size={18}/></div><div className="stable-illustration"><div><Check size={15}/><span>Nothing you’ve read</span></div><div><Check size={15}/><span>changes or jumps.</span></div><span className="handwritten">Right where you left it.</span></div><h3>Read it.<br/>Trust it.</h3><p>Nothing you’ve read changes or jumps. A steady place for your eyes, for the whole lecture.</p><div className="paper-bottom">A LITTLE MORE CERTAINTY <span>↗</span></div></article>
          <article className="feature-paper paper-technical"><div className="paper-top"><span>02 / TECHNICAL</span><Plus size={18}/></div><div className="technical-illustration"><span className="wrong-word">“my lock”</span><MoveRight size={23}/><code>malloc()</code><span className="handwritten">Yes, that malloc.</span></div><h3>The right words.<br/>Even the tricky ones.</h3><p>Course vocabulary comes out right. From malloc to mitosis, the details matter.</p><div className="paper-bottom">A LITTLE MORE PRECISION <span>↗</span></div></article>
          <article className="feature-paper paper-readable"><div className="paper-top"><span>03 / READABLE</span><Plus size={18}/></div><div className="readable-illustration"><span>Stay with the thought.</span><span>Not behind <em>the words.</em></span><div className="rhythm-line"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div><h3>Keep up.<br/>Without the catch-up.</h3><p>A readable rhythm that keeps pace with the speaker. Stay in the lecture, not a sentence behind.</p><div className="paper-bottom">A LITTLE MORE HEADSPACE <span>↗</span></div></article>
        </div>
      </section>
      <section id="story" className="story-band"><div className="page-width story-inner"><div className="story-label"><span className="small-label">BUILT FROM EXPERIENCE.<br/>NOT ASSUMPTIONS.</span><span className="story-asterisk">✳</span></div><div className="story-content"><blockquote>“As a deaf student, I struggled daily with captions that couldn’t keep up with lectures. I built Caption+ because <em>I needed it to exist.</em>”</blockquote><div className="founder"><span className="founder-initial">N</span><div><strong>Nishit <span>— Founder, Caption+</span></strong><p>Deaf computer science student at UAL Creative Computing Institute</p></div></div><div className="funding"><span>BACKED BY PEOPLE WHO BELIEVE IN THE DIFFERENCE</span><div><strong>UAL Social Purpose<br/>Innovation Fund</strong><strong>Pitch It<br/><span>Top prize winner ↗</span></strong><strong>London Social<br/>Ventures</strong></div></div></div></div></section>
      <section id="waitlist" className="waitlist-section page-width"><div><span className="small-label">LET’S MAKE ROOM FOR EVERYONE.</span><h2>Your next lecture.<br/><em>A little clearer.</em></h2><p>Be first to try Caption+. Join students and educators<br className="desktop-break"/> building a more accessible classroom.</p></div><div className="waitlist-action"><Button variant="caption" size="lg" asChild><a href="https://captionplus.ai/#waitlist" target="_blank" rel="noreferrer">Get access to the beta <ArrowUpRight/></a></Button><span>Students · Educators · Institutions</span><p>UK students: we’re working towards DSA funding,<br/>designed to be free for eligible students.</p></div></section>
    </main>
    <footer className="site-footer page-width"><Brand/><span>Every word. With you.</span><span>© 2026 Caption+ <span className="footer-dot">·</span> Engineered for clarity.</span></footer>
  </div>;
}
