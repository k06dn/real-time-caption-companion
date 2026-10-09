import { useEffect, useRef, useState } from 'react';
import { ArrowDownToLine, AudioLines, Code2, Mic, Pause, Play, Presentation, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import lectureImage from '@/assets/lecture.jpg';

const speakers = [
  { name: 'Dr. Ellis', initials: 'DE', role: 'Lecturer', tone: 'green' },
  { name: 'Alex', initials: 'A', role: 'Student', tone: 'blue' },
  { name: 'Sam', initials: 'S', role: 'Student', tone: 'peach' },
];
const lecture = [
  { speaker: 'Dr. Ellis', text: 'So malloc reserves the block, and free hands it back.' },
  { speaker: 'Alex', text: 'What happens if you never call free?' },
  { speaker: 'Dr. Ellis', text: 'Good question. That is what we call a memory leak.' },
  { speaker: 'Sam', text: 'So we should free the memory when we are done?' },
  { speaker: 'Dr. Ellis', text: 'Exactly. Every allocation needs a matching free.' },
];
type RecognitionEvent = { resultIndex: number; results: { length: number; [index: number]: { isFinal: boolean; [index: number]: { transcript: string } } } };
type Recognition = { continuous: boolean; interimResults: boolean; lang: string; onresult: ((event: RecognitionEvent) => void) | null; onerror: ((event: { error: string }) => void) | null; onend: (() => void) | null; start: () => void; stop: () => void };
type SpeechWindow = Window & { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };

export function CaptionDemo() {
  const [scene, setScene] = useState('lecture');
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(8);
  const [micActive, setMicActive] = useState(false);
  const [micText, setMicText] = useState('');
  const [micFinal, setMicFinal] = useState('');
  const [notice, setNotice] = useState('');
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const recognitionRef = useRef<Recognition | null>(null);
  const wordCounts = lecture.map(line => line.text.split(' ').length);
  const total = wordCounts.reduce((a, b) => a + b, 0);
  let remaining = position;
  let lineIndex = 0;
  while (lineIndex < lecture.length - 1 && remaining > (wordCounts[lineIndex] ?? 0)) {
    remaining -= wordCounts[lineIndex] ?? 0; lineIndex++;
  }
  const current = lecture[lineIndex] ?? { speaker: 'Dr. Ellis', text: '' };
  const speaker = speakers.find(person => person.name === current.speaker) ?? speakers[0];
  const showingMic = micActive || Boolean(micFinal);
  const words = current.text.split(' ');
  const transcript = lecture.slice(0, lineIndex).map(line => `${line.speaker}: ${line.text}`).concat(`${current.speaker}: ${words.slice(0, remaining).join(' ')}`).join('\n\n');

  useEffect(() => {
    if (!playing || micActive) return;
    const timer = window.setInterval(() => setPosition(p => {
      if (p >= total) { setPlaying(false); return p; }
      return p + 1;
    }), 330);
    return () => window.clearInterval(timer);
  }, [playing, micActive, total]);
  useEffect(() => () => recognitionRef.current?.stop(), []);

  function toggleMic() {
    if (micActive) { recognitionRef.current?.stop(); setMicActive(false); return; }
    setPlaying(false); setNotice('');
    const browser = window as SpeechWindow;
    const Constructor = browser.SpeechRecognition ?? browser.webkitSpeechRecognition;
    if (!Constructor) { setNotice('Microphone captions need Chrome or Edge. You can still play the lecture demo.'); return; }
    const recognition = new Constructor();
    recognition.continuous = true; recognition.interimResults = true; recognition.lang = 'en-GB';
    recognition.onresult = event => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result?.[0]?.transcript;
        if (!result || !text) continue;
        if (result.isFinal) { setMicFinal(prev => `${prev} ${text}`.trim()); }
        else interim += text;
      }
      setMicText(interim);
    };
    recognition.onerror = event => { setMicActive(false); setNotice(event.error === 'not-allowed' ? 'Microphone access was denied. Allow it in your browser to try again.' : `Microphone captions stopped (${event.error}). Try the lecture demo instead.`); };
    recognition.onend = () => setMicActive(false);
    recognitionRef.current = recognition;
    setMicText(''); setMicFinal('');
    try { recognition.start(); setMicActive(true); } catch { setNotice('The microphone could not start. Please try again.'); }
  }
  function exportTranscript() {
    const blob = new Blob([micFinal || transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob); const anchor = document.createElement('a');
    anchor.href = url; anchor.download = 'caption-plus-transcript.txt'; anchor.click(); URL.revokeObjectURL(url);
  }

  function selectSpeaker(name: string) {
    const nextLine = lecture.findIndex(line => line.speaker === name);
    if (nextLine < 0) return;
    recognitionRef.current?.stop(); setMicActive(false); setMicFinal(''); setMicText('');
    setPosition(wordCounts.slice(0, nextLine).reduce((sum, count) => sum + count, 0) + 1);
    setPlaying(true);
  }

  return <section id="demo" className="demo-section" aria-label="Interactive Caption+ demo">
    <div className="demo-shell">
      <div className="demo-toolbar"><Tabs value={scene} onValueChange={setScene}><TabsList aria-label="Lecture view"><TabsTrigger value="lecture"><AudioLines size={14}/> <span>Lecture</span></TabsTrigger><TabsTrigger value="slides"><Presentation size={14}/> <span>Slides</span></TabsTrigger><TabsTrigger value="code"><Code2 size={14}/> <span>Code</span></TabsTrigger></TabsList></Tabs><div className="speaker-roster" aria-label="Sample speakers">{speakers.map(person => <Button key={person.name} variant="ghost" size="icon" className={`speaker-avatar avatar-${person.tone}`} aria-label={`Hear ${person.name}, ${person.role}`} aria-pressed={!showingMic && current.speaker === person.name} title={`${person.name} · ${person.role}`} onClick={() => selectSpeaker(person.name)}>{person.initials}</Button>)}</div></div>
      <div className={`demo-stage scene-${scene}`}>
        {scene === 'lecture' && <img src={lectureImage} width={1536} height={864} alt="Illustrative university computer science lecture"/>}
        {scene === 'slides' && <div className="slide-content"><h3>Memory management</h3><div className="memory-blocks"><span>allocate</span><span>use</span><span>free</span></div></div>}
        {scene === 'code' && <div className="code-content"><span>memory.c</span><pre><code>{'#include <stdlib.h>\n\nint main(void) {\n    int *numbers = malloc(10 * sizeof(int));\n\n    // Make a little room for your ideas.\n    free(numbers);\n    return 0;\n}'}</code></pre></div>}
        <div className="caption-strip" aria-live="polite"><div className="caption-speaker"><span className={`speaker-avatar avatar-${showingMic ? 'green' : speaker?.tone ?? 'green'}`}>{showingMic ? 'Y' : speaker?.initials}</span><span>{showingMic ? 'You' : current.speaker}<span className="speaker-role">{showingMic ? 'Microphone' : speaker?.role}</span></span></div><div className="caption-words">{showingMic ? <>{micFinal.split(' ').slice(-18).join(' ')} <span className="unspoken">{micText || (micActive && !micFinal ? 'Listening…' : '')}</span></> : words.map((word, index) => <span key={`${lineIndex}-${index}`} className={index >= remaining ? 'unspoken' : ''}>{word} </span>)}</div></div>
        {transcriptOpen && <div className="transcript-panel"><div><strong>Session transcript</strong><Button variant="ghost" size="icon" aria-label="Close transcript" onClick={() => setTranscriptOpen(false)}><X/></Button></div><pre>{micFinal || transcript}</pre><Button variant="outline" onClick={exportTranscript}><ArrowDownToLine/> Export transcript</Button></div>}
      </div>
      <div className="demo-controls"><div className="playback-controls"><Button variant="ghost" size="icon" aria-label={playing ? 'Pause demo' : 'Play demo'} onClick={() => { if (micActive) { recognitionRef.current?.stop(); setMicActive(false); } setMicFinal(''); if (position >= total) setPosition(0); setPlaying(!playing); }}>{playing ? <Pause/> : <Play/>}</Button><Button variant="ghost" size="icon" aria-label="Restart demo" onClick={() => { recognitionRef.current?.stop(); setMicActive(false); setMicFinal(''); setPosition(0); setPlaying(true); }}><RotateCcw/></Button><span className="playback-text">{playing ? 'Demo playing' : position >= total ? 'Lecture complete' : 'Play the lecture'}</span></div><div className="demo-actions"><Button variant="ghost" className="transcript-button" onClick={() => setTranscriptOpen(!transcriptOpen)}><ArrowDownToLine/><span>Transcript</span></Button><Button variant="microphone" onClick={toggleMic}><Mic/>{micActive ? 'Stop microphone' : 'Try your voice'}</Button></div></div>
    </div>
    <p className="demo-footnote">Scripted lecture preview · Three voices, one conversation.</p>
    {micActive && <p className="demo-notice">Browser microphone preview · Your browser processes speech; this is not the Caption+ engine.</p>}
    {notice && <p className="demo-notice" role="status">{notice}</p>}
  </section>;
}