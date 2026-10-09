import { useEffect, useRef, useState } from 'react';
import { ArrowDownToLine, AudioLines, Code2, Mic, Pause, Play, Presentation, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import lectureImage from '@/assets/lecture.jpg';

const lecture = [
  { speaker: 'Lecturer', text: 'So malloc reserves the block, and free hands it back.' },
  { speaker: 'Room', text: 'What happens if you never call free?' },
  { speaker: 'Lecturer', text: 'Good question. That is what we call a memory leak.' },
  { speaker: 'Lecturer', text: 'The memory stays allocated, even when you no longer need it.' },
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
  while (lineIndex < lecture.length - 1 && remaining > wordCounts[lineIndex]) {
    remaining -= wordCounts[lineIndex]; lineIndex++;
  }
  const current = lecture[lineIndex];
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
        if (event.results[i].isFinal) { const text = event.results[i][0].transcript; setMicFinal(prev => `${prev} ${text}`.trim()); }
        else interim += event.results[i][0].transcript;
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

  return <section id="demo" className="demo-section" aria-label="Interactive Caption+ demo">
    <div className="demo-topline"><div className="demo-label"><span className="status-dot" /> A little preview. A big difference.</div><span className="small-label">MEET YOUR NEW CAPTIONS</span></div>
    <div className="demo-shell">
      <div className="demo-toolbar"><div className="window-dots"><i/><i/><i/></div><Tabs value={scene} onValueChange={setScene}><TabsList><TabsTrigger value="lecture"><AudioLines size={14}/> <span>Lecture</span></TabsTrigger><TabsTrigger value="slides"><Presentation size={14}/> <span>Slides</span></TabsTrigger><TabsTrigger value="code"><Code2 size={14}/> <span>Code</span></TabsTrigger></TabsList></Tabs><span className="demo-product">Caption<span>+</span></span></div>
      <div className={`demo-stage scene-${scene}`}>
        {scene === 'lecture' && <><img src={lectureImage} width={1536} height={864} alt="Illustrative university computer science lecture"/><span className="scene-tag">COMPUTER SCIENCE · MEMORY MANAGEMENT</span></>}
        {scene === 'slides' && <div className="slide-content"><span>COMPUTER SCIENCE / 03</span><h3>A little space.<br/>A lot of possibility.</h3><div className="memory-blocks"><span>allocate</span><span>use</span><span>free</span></div></div>}
        {scene === 'code' && <div className="code-content"><span>memory.c</span><pre><code>{'#include <stdlib.h>\n\nint main(void) {\n    int *numbers = malloc(10 * sizeof(int));\n\n    // Make a little room for your ideas.\n    free(numbers);\n    return 0;\n}'}</code></pre></div>}
        <div className="caption-strip" aria-live="polite"><div className="caption-speaker"><span className="status-dot"/>{micActive || micFinal ? 'YOU' : current.speaker.toUpperCase()}<span className="caption-live">LIVE</span></div><div className="caption-words">{micActive || micFinal ? <>{micFinal.split(' ').slice(-18).join(' ')} <span className="unspoken">{micText || (micActive && !micFinal ? 'Listening…' : '')}</span></> : words.map((word, index) => <span key={`${lineIndex}-${index}`} className={index >= remaining ? 'unspoken' : ''}>{word} </span>)}</div></div>
        {transcriptOpen && <div className="transcript-panel"><div><strong>Session transcript</strong><Button variant="ghost" size="icon" aria-label="Close transcript" onClick={() => setTranscriptOpen(false)}><X/></Button></div><pre>{micFinal || transcript}</pre><Button variant="outline" onClick={exportTranscript}><ArrowDownToLine/> Export transcript</Button></div>}
      </div>
      <div className="demo-controls"><div className="playback-controls"><Button variant="ghost" size="icon" aria-label={playing ? 'Pause demo' : 'Play demo'} onClick={() => { if (micActive) { recognitionRef.current?.stop(); setMicActive(false); } setMicFinal(''); if (position >= total) setPosition(0); setPlaying(!playing); }}>{playing ? <Pause/> : <Play/>}</Button><Button variant="ghost" size="icon" aria-label="Restart demo" onClick={() => { recognitionRef.current?.stop(); setMicActive(false); setMicFinal(''); setPosition(0); setPlaying(true); }}><RotateCcw/></Button><span className="playback-text">{playing ? 'Demo playing' : position >= total ? 'Lecture complete' : 'Play the lecture'}</span></div><div className="demo-actions"><Button variant="ghost" className="transcript-button" onClick={() => setTranscriptOpen(!transcriptOpen)}><ArrowDownToLine/><span>Transcript</span></Button><Button variant="microphone" onClick={toggleMic}><Mic/>{micActive ? 'Stop microphone' : 'Try your voice'}</Button></div></div>
    </div>
    <div className="demo-footnote"><span>Whatever’s on your screen. Every word, right there.</span><span>Dimmed words are still being spoken.</span></div>
    {micActive && <p className="demo-notice">Browser microphone preview · Your browser processes speech; this is not the Caption+ engine.</p>}
    {notice && <p className="demo-notice" role="status">{notice}</p>}
  </section>;
}