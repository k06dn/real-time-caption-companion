import { useEffect, useRef, useState } from 'react';
import { ArrowDownToLine, AudioLines, Code2, Mic, Pause, Play, Presentation, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  const [position, setPosition] = useState(0);
  const [micActive, setMicActive] = useState(false);
  const [micText, setMicText] = useState('');
  const [micFinal, setMicFinal] = useState('');
  const [notice, setNotice] = useState('');
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const recognitionRef = useRef<Recognition | null>(null);
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
  const showingMic = micActive || Boolean(micFinal) || Boolean(micText);
  const words = current.text.split(' ');
  const transcript = lecture.slice(0, lineIndex).map(line => `${line.speaker}: ${line.text}`).concat(`${current.speaker}: ${words.slice(0, remaining).join(' ')}`).join('\n\n');

  useEffect(() => {
    if (!playing || micActive) return;
    if (position >= total) { setPlaying(false); return; }
    const timer = window.setTimeout(() => setPosition(p => p + 1), remaining === words.length ? 1400 : 450);
    return () => window.clearTimeout(timer);
  }, [playing, micActive, position, remaining, words.length, total]);
  useEffect(() => () => {
    const recognition = recognitionRef.current;
    if (recognition) { recognition.onresult = null; recognition.onerror = null; recognition.onend = null; recognition.stop(); }
  }, []);
  useEffect(() => { if (transcriptOpen) transcriptRef.current?.focus(); }, [transcriptOpen]);

  function stopMic() {
    const recognition = recognitionRef.current;
    recognitionRef.current = null;
    if (recognition) { recognition.onresult = null; recognition.onerror = null; recognition.onend = null; recognition.stop(); }
    setMicActive(false);
  }
  function returnToLecture() { stopMic(); setMicFinal(''); setMicText(''); setNotice(''); }

  function toggleMic() {
    if (micActive) { stopMic(); return; }
    setPlaying(false); setNotice('');
    stopMic();
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
    recognition.onerror = event => {
      if (recognitionRef.current !== recognition) return;
      stopMic();
      setNotice(event.error === 'not-allowed' || event.error === 'service-not-allowed' ? 'Microphone access is blocked. Allow microphone access in your browser, or play the sample lecture.' : event.error === 'no-speech' ? 'No speech was detected. Try your voice again, or play the sample lecture.' : 'Your browser could not caption your voice. You can still play the sample lecture.');
    };
    recognition.onend = () => {
      if (recognitionRef.current !== recognition) return;
      recognitionRef.current = null; setMicActive(false);
      setNotice('Microphone session ended. Try your voice again, or return to the sample lecture.');
    };
    recognitionRef.current = recognition;
    setMicText(''); setMicFinal('');
    try { recognition.start(); setMicActive(true); } catch { stopMic(); setNotice('The microphone could not start. Please try again or play the sample lecture.'); }
  }
  function exportTranscript() {
    const blob = new Blob([showingMic ? `${micFinal} ${micText}`.trim() : transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob); const anchor = document.createElement('a');
    anchor.href = url; anchor.download = 'caption-plus-transcript.txt'; anchor.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function selectSpeaker(name: string) {
    const nextLine = lecture.findIndex(line => line.speaker === name);
    if (nextLine < 0) return;
    returnToLecture();
    setPosition(wordCounts.slice(0, nextLine).reduce((sum, count) => sum + count, 0) + 1);
    setPlaying(true);
  }

  return <section id="demo" className="demo-section" aria-label="Interactive Caption+ demo">
    <Tabs value={scene} onValueChange={setScene} className="demo-shell">
      <div className="demo-toolbar"><TabsList aria-label="Lecture view"><TabsTrigger value="lecture"><AudioLines size={18}/> <span>Lecture</span></TabsTrigger><TabsTrigger value="slides"><Presentation size={18}/> <span>Slides</span></TabsTrigger><TabsTrigger value="code"><Code2 size={18}/> <span>Code</span></TabsTrigger></TabsList><div className="speaker-roster" aria-label="Sample speakers">{speakers.map(person => <Button key={person.name} variant="ghost" size="icon" className={`speaker-avatar avatar-${person.tone}`} aria-label={`Show ${person.name}'s captions`} aria-pressed={!showingMic && current.speaker === person.name} title={`${person.name} · ${person.role}`} onClick={() => selectSpeaker(person.name)}>{person.initials}</Button>)}</div></div>
      <div className={`demo-stage scene-${scene}`}>
        <TabsContent value="lecture" className="scene-panel"><img src={lectureImage} width={1536} height={864} alt="Illustrative university computer science lecture"/></TabsContent>
        <TabsContent value="slides" className="scene-panel"><div className="slide-content"><h3>Memory management</h3><div className="memory-blocks"><span>allocate</span><span>use</span><span>free</span></div></div></TabsContent>
        <TabsContent value="code" className="scene-panel"><div className="code-content"><span>memory.c</span><pre><code>{'#include <stdlib.h>\n\nint main(void) {\n    int *numbers = malloc(10 * sizeof(int));\n    free(numbers);\n    return 0;\n}'}</code></pre></div></TabsContent>
        <div className="caption-strip"><div className="caption-speaker"><span className={`speaker-avatar avatar-${showingMic ? 'green' : speaker?.tone ?? 'green'}`}>{showingMic ? 'Y' : speaker?.initials}</span><span>{showingMic ? 'You' : current.speaker}<span className="speaker-role">{showingMic ? 'Microphone' : speaker?.role}</span></span></div><div className="caption-words">{showingMic ? <>{micFinal.split(' ').slice(-18).join(' ')} <span className="unspoken">{micText || (micActive && !micFinal ? 'Listening…' : '')}</span></> : words.map((word, index) => <span key={`${lineIndex}-${index}`} className={index >= remaining ? 'unspoken' : index === remaining - 1 ? 'current-word' : ''}>{word} </span>)}</div></div>
      </div>
      <div className="demo-controls"><div className="playback-controls"><Button variant="outline" aria-label={playing ? 'Pause demo' : position >= total ? 'Replay demo' : 'Play demo'} onClick={() => { returnToLecture(); if (position >= total) setPosition(0); setPlaying(!playing); }}>{playing ? <Pause/> : <Play/>}<span>{playing ? 'Pause' : position >= total ? 'Replay lecture' : 'Play lecture'}</span></Button><Button variant="ghost" size="icon" aria-label="Restart demo" title="Restart demo" onClick={() => { returnToLecture(); setPosition(0); setPlaying(true); }}><RotateCcw/></Button></div><div className="demo-actions"><Button ref={transcriptTriggerRef} variant="ghost" className="transcript-button" aria-expanded={transcriptOpen} aria-controls="demo-transcript" onClick={() => setTranscriptOpen(!transcriptOpen)}><ArrowDownToLine/><span>Transcript</span></Button><Button variant="microphone" aria-pressed={micActive} onClick={toggleMic}><Mic/>{micActive ? 'Stop microphone' : 'Try your voice'}</Button></div></div>
      <div className="demo-notice" role="status">{notice || (micActive ? 'Listening · Browser speech recognition, not the Caption+ engine.' : '')}</div>
      <div id="demo-transcript" className="transcript-panel" hidden={!transcriptOpen}><div><h3 ref={transcriptRef} tabIndex={-1}>Session transcript</h3><Button variant="ghost" size="icon" aria-label="Close transcript" onClick={() => { setTranscriptOpen(false); transcriptTriggerRef.current?.focus(); }}><X/></Button></div><pre>{showingMic ? `${micFinal} ${micText}`.trim() || 'No speech captured yet.' : position === 0 ? 'The transcript will appear when the lecture starts.' : transcript}</pre><Button variant="outline" disabled={showingMic ? !micFinal && !micText : position === 0} onClick={exportTranscript}><ArrowDownToLine/> Export transcript</Button></div>
    </Tabs>
    <p className="demo-footnote">Sample lecture · Scripted captions, no audio. Microphone captions use your browser, not Caption+.</p>
  </section>;
}