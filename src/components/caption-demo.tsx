import { useEffect, useRef, useState } from 'react';
import { ArrowDownToLine, AudioLines, Code2, Contrast, Pause, Play, Presentation, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import lectureImage from '@/assets/lecture.jpg';
import accessibilityIcon from '@/assets/accessibility-icon.svg.asset.json';
import heapDiagram from '@/assets/heap-chunks.png.asset.json';

const speakers = [
  { name: 'Dr. Ellis', initials: 'DE', role: 'Lecturer', tone: 'green' },
  { name: 'Alex', initials: 'A', role: 'Student', tone: 'blue' },
  { name: 'Sam', initials: 'S', role: 'Student', tone: 'peach' },
];
const lecture = [
  { speaker: 'Dr. Ellis', text: "So malloc reserves the block, and free hands it back." },
  { speaker: 'Alex', text: "What happens if you never call free?" },
  { speaker: 'Dr. Ellis', text: "Good question. That is what we call a memory leak." },
  { speaker: 'Sam', text: "So we should free the memory when we are done?" },
  { speaker: 'Dr. Ellis', text: "Exactly. Every allocation needs a matching free." },
  { speaker: 'Alex', text: "Is a leak actually that bad, though? Computers have loads of memory now." },
  { speaker: 'Dr. Ellis', text: "Ah. Let me tell you a story. Have either of you heard of Huascarán?" },
  { speaker: 'Sam', text: "Is that a new JavaScript framework?" },
  { speaker: 'Dr. Ellis', text: "No, Sam. Although give it a week. It is the tallest mountain in Peru." },
  { speaker: 'Dr. Ellis', text: "Six thousand, seven hundred and sixty eight metres. I tried to climb it in my twenties." },
  { speaker: 'Alex', text: "Wait, you climbed a mountain? You get out of breath on the stairs to this room." },
  { speaker: 'Dr. Ellis', text: "That, Alex, is called character development. Sometimes it goes backwards." },
  { speaker: 'Dr. Ellis', text: "Now, the guide had one rule. Climb a little, rest a little, let your body catch up." },
  { speaker: 'Sam', text: "That sounds very sensible." },
  { speaker: 'Dr. Ellis', text: "It was. So naturally, I ignored it completely." },
  { speaker: 'Alex', text: "Of course you did." },
  { speaker: 'Dr. Ellis', text: "Every morning I grabbed more energy. Extra snacks, extra coffee, extra enthusiasm. Allocate, allocate, allocate." },
  { speaker: 'Dr. Ellis', text: "And did I ever rest? Did I ever give anything back? Never. Not once." },
  { speaker: 'Sam', text: "Oh no. You were the memory leak." },
  { speaker: 'Dr. Ellis', text: "I was the memory leak, Sam. A walking, wheezing memory leak in a very bright jacket." },
  { speaker: 'Alex', text: "What colour was the jacket?" },
  { speaker: 'Dr. Ellis', text: "Orange. Important detail. It becomes relevant for the rescue team." },
  { speaker: 'Sam', text: "The rescue team?" },
  { speaker: 'Dr. Ellis', text: "Day four. Base camp. I stand up, announce I feel amazing, and then I sit down again. Quite quickly." },
  { speaker: 'Dr. Ellis', text: "Very quickly. Mostly onto a goat." },
  { speaker: 'Alex', text: "Sorry, a goat?" },
  { speaker: 'Dr. Ellis', text: "It was a very patient goat. It did not press charges." },
  { speaker: 'Sam', text: "Was it altitude sickness?" },
  { speaker: 'Dr. Ellis', text: "A very serious case of it. My body had run completely out of resources. No free memory left." },
  { speaker: 'Dr. Ellis', text: "In computing, that is when your program crashes. In Peru, that is when a helicopter arrives." },
  { speaker: 'Alex', text: "They airlifted you?" },
  { speaker: 'Dr. Ellis', text: "They airlifted me. Down to the hospital in Huaraz. Easy to spot, thanks to the orange jacket." },
  { speaker: 'Sam', text: "So the jacket saved you." },
  { speaker: 'Dr. Ellis', text: "The jacket and a very calm pilot named Rosa, who said I was the third lecturer she had rescued that month." },
  { speaker: 'Alex', text: "Third? Is there a lecturer pipeline up there?" },
  { speaker: 'Dr. Ellis', text: "Apparently academics love a metaphor and hate resting." },
  { speaker: 'Sam', text: "Were you okay in the end?" },
  { speaker: 'Dr. Ellis', text: "Completely fine. A few days of rest, a lot of water, and a nurse who confiscated my snacks." },
  { speaker: 'Dr. Ellis', text: "Which, if you think about it, is garbage collection." },
  { speaker: 'Alex', text: "Please do not say that again." },
  { speaker: 'Dr. Ellis', text: "I will be saying it at every lecture for the rest of term." },
  { speaker: 'Sam', text: "So what is the actual lesson here? Besides avoiding goats." },
  { speaker: 'Dr. Ellis', text: "Avoiding goats is always a good lesson. But the real one is this." },
  { speaker: 'Dr. Ellis', text: "A program that keeps allocating and never frees will slowly run out of room. It might feel fine for a while." },
  { speaker: 'Dr. Ellis', text: "Then one day, usually during a demo, everything falls over at once." },
  { speaker: 'Alex', text: "That is so specific. Has that happened to you as well?" },
  { speaker: 'Dr. Ellis', text: "At a conference in Berlin. With three hundred people watching. We do not talk about Berlin." },
  { speaker: 'Sam', text: "So every malloc is like grabbing another snack." },
  { speaker: 'Dr. Ellis', text: "Exactly. And every free is a little rest stop. You need both, or you end up on a goat." },
  { speaker: 'Alex', text: "Can we put that on the exam?" },
  { speaker: 'Dr. Ellis', text: "Question four. Explain memory management using a goat. Ten marks." },
  { speaker: 'Sam', text: "What about the stack? Does that leak too?" },
  { speaker: 'Dr. Ellis', text: "The stack is tidier. It cleans up after itself when a function returns, like a guide packing up camp." },
  { speaker: 'Dr. Ellis', text: "The heap is where you are trusted to clean up yourself. And as we have established, I was not to be trusted." },
  { speaker: 'Alex', text: "Did you ever go back and finish the climb?" },
  { speaker: 'Dr. Ellis', text: "I did, ten years later. Slowly. Resting every day. I reached the top and cried a little." },
  { speaker: 'Sam', text: "That is actually really lovely." },
  { speaker: 'Dr. Ellis', text: "Rosa flew past and waved. I like to think she was proud." },
  { speaker: 'Alex', text: "And the goat?" },
  { speaker: 'Dr. Ellis', text: "Retired. Living his best life. Much like a well freed block of memory." },
  { speaker: 'Sam', text: "I think I finally understand memory leaks." },
  { speaker: 'Dr. Ellis', text: "Wonderful. Climb a little, rest a little, and always call free. Now, open your laptops. Let's find some leaks." },
];
export function CaptionDemo() {
  const [scene, setScene] = useState('lecture');
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [captionSize, setCaptionSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const transcriptRef = useRef<HTMLHeadingElement | null>(null);
  const transcriptTriggerRef = useRef<HTMLButtonElement | null>(null);
  const wordCounts = lecture.map(line => line.text.split(' ').length);
  const total = wordCounts.reduce((a, b) => a + b, 0);
  let remaining = position;
  let lineIndex = 0;
  while (lineIndex < lecture.length - 1 && remaining > (wordCounts[lineIndex] ?? 0)) {
    remaining -= wordCounts[lineIndex] ?? 0; lineIndex++;
  }
  const current = lecture[lineIndex] ?? { speaker: 'Dr. Ellis', text: '' };
  const speaker = speakers.find(person => person.name === current.speaker) ?? speakers[0];
  const words = current.text.split(' ');
  const transcript = lecture.slice(0, lineIndex).map(line => `${line.speaker}: ${line.text}`).concat(`${current.speaker}: ${words.slice(0, remaining).join(' ')}`).join('\n\n');

  useEffect(() => {
    if (!playing) return;
    if (position >= total) { setPlaying(false); return; }
    const timer = window.setTimeout(() => setPosition(p => p + 1), remaining === words.length ? 1400 : 450);
    return () => window.clearTimeout(timer);
  }, [playing, position, remaining, words.length, total]);
  useEffect(() => { if (transcriptOpen) transcriptRef.current?.focus(); }, [transcriptOpen]);
  function exportTranscript() {
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob); const anchor = document.createElement('a');
    anchor.href = url; anchor.download = 'caption-plus-transcript.txt'; anchor.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function selectSpeaker(name: string) {
    const nextLine = lecture.findIndex(line => line.speaker === name);
    if (nextLine < 0) return;
    setPosition(wordCounts.slice(0, nextLine).reduce((sum, count) => sum + count, 0) + 1);
    setPlaying(true);
  }

  return <section id="demo" className="demo-section" aria-label="Interactive Caption+ demo">
    <Tabs value={scene} onValueChange={setScene} className="demo-shell">
      <div className="demo-toolbar"><TabsList aria-label="Lecture view"><TabsTrigger value="lecture"><AudioLines size={18}/> <span>Lecture</span></TabsTrigger><TabsTrigger value="slides"><Presentation size={18}/> <span>Slides</span></TabsTrigger><TabsTrigger value="code"><Code2 size={18}/> <span>Code</span></TabsTrigger></TabsList><div className="toolbar-actions"><div className="speaker-roster" aria-label="Sample speakers">{speakers.map(person => <Button key={person.name} variant="ghost" size="icon" className={`speaker-avatar avatar-${person.tone}`} aria-label={`Show ${person.name}'s captions`} aria-pressed={current.speaker === person.name} title={`${person.name} · ${person.role}`} onClick={() => selectSpeaker(person.name)}>{person.initials}</Button>)}</div><Button variant="ghost" size="icon" className="accessibility-trigger" aria-label={`${settingsOpen ? 'Close' : 'Open'} caption accessibility settings`} aria-expanded={settingsOpen} aria-controls="caption-settings" onClick={() => setSettingsOpen(value => !value)}><img src={accessibilityIcon.url} alt="" aria-hidden="true"/></Button></div></div>
      <div id="caption-settings" className="caption-settings" aria-label="Caption controls" hidden={!settingsOpen}>
        <div className="size-controls" role="group" aria-label="Caption size"><span>Caption size</span>{(['small', 'medium', 'large'] as const).map((size, index) => <Button key={size} variant="ghost" size="icon" className={`size-choice size-choice-${size}`} aria-label={`${size} captions`} aria-pressed={captionSize === size} onClick={() => setCaptionSize(size)}>A<span aria-hidden="true">{index === 0 ? '−' : index === 2 ? '+' : ''}</span></Button>)}</div>
        <div className="setting-actions"><Button variant="ghost" aria-pressed={highContrast} onClick={() => setHighContrast(value => !value)}><Contrast/><span>High contrast</span></Button></div>
        <span className="sr-only" aria-live="polite">Captions set to {captionSize}. {highContrast ? 'High contrast on.' : 'Standard contrast.'} Transcript {playing ? 'playing.' : 'paused.'}</span>
      </div>
      <div className={`demo-stage scene-${scene}`}>
        <TabsContent value="lecture" className="scene-panel"><img src={lectureImage} width={1536} height={864} alt="Illustrative university computer science lecture"/></TabsContent>
        <TabsContent value="slides" className="scene-panel"><div className="virtual-call"><div className="call-header"><span>CS101 · Memory management</span><span>3 participants</span></div><div className="call-layout"><div className="shared-screen"><div className="sharing-badge"><span className="speaker-avatar avatar-green" aria-hidden="true">DE</span><span>Dr. Ellis is sharing</span></div><img className="shared-diagram" src={heapDiagram.url} width={656} height={514} alt="Diagram of heap chunks: a block of meta-data in front of each allocated data block, with the pointer returned by malloc"/></div><div className="call-participants" aria-label="Call participants">{speakers.map(person => <div key={person.name} className="participant-tile"><span className={`speaker-avatar avatar-${person.tone}`}>{person.initials}</span><span>{person.name}</span></div>)}</div></div></div></TabsContent>
        <TabsContent value="code" className="scene-panel"><div className="code-content"><span>memory.c</span><pre><code>{'#include <stdlib.h>\n\nint main(void) {\n    int *numbers = malloc(10 * sizeof(int));\n    free(numbers);\n    return 0;\n}'}</code></pre></div></TabsContent>
        <div className={`caption-strip caption-size-${captionSize}${highContrast ? ' caption-high-contrast' : ''}`} style={{ backdropFilter: highContrast ? 'none' : 'blur(20px) brightness(.42) saturate(1.1)' }}><div className="caption-speaker"><span className={`speaker-avatar avatar-${speaker?.tone ?? 'green'}`}>{speaker?.initials}</span><span>{current.speaker}<span className="speaker-role">{speaker?.role}</span></span></div><div className="caption-words">{words.map((word, index) => <span key={`${lineIndex}-${index}`} className={index >= remaining ? 'unspoken' : index === remaining - 1 ? 'current-word' : ''}>{word} </span>)}</div></div>
      </div>
      <div className="demo-controls"><p aria-live="polite">{position >= total ? 'Lecture complete' : playing ? 'Captions playing' : position === 0 ? 'Ready to begin' : 'Captions paused'}</p><Button variant="outline" className="play-toggle" aria-label={playing ? 'Pause captions' : position >= total ? 'Restart captions' : 'Resume captions'} onClick={() => { if (position >= total) { setPosition(0); setPlaying(true); } else setPlaying(value => !value); }}>{playing ? <Pause/> : <Play/>}<span>{playing ? 'Pause' : position >= total ? 'Restart' : 'Resume'}</span></Button><div className="demo-actions"><Button ref={transcriptTriggerRef} variant="ghost" className="transcript-button" aria-expanded={transcriptOpen} aria-controls="demo-transcript" onClick={() => setTranscriptOpen(!transcriptOpen)}><ArrowDownToLine/><span>Transcript</span></Button></div></div>
      <div id="demo-transcript" className="transcript-panel" hidden={!transcriptOpen}><div><h3 ref={transcriptRef} tabIndex={-1}>Session transcript</h3><Button variant="ghost" size="icon" aria-label="Close transcript" onClick={() => { setTranscriptOpen(false); transcriptTriggerRef.current?.focus(); }}><X/></Button></div><pre>{position === 0 ? 'The transcript will appear when the lecture starts.' : transcript}</pre><Button variant="outline" disabled={position === 0} onClick={exportTranscript}><ArrowDownToLine/> Export transcript</Button></div>
    </Tabs>
    <p className="demo-footnote">Sample lecture · Scripted captions, no audio.</p>
  </section>;
}