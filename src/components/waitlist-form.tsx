import { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'done'; name: string }
  | { kind: 'already' }
  | { kind: 'error'; message: string };

const roleOptions = ['Student', 'Staff or teacher', 'Other'];

export function WaitlistForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Student');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      setStatus({ kind: 'error', message: 'Please add your name so we know who to look out for.' });
      return;
    }
    if (trimmedEmail.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setStatus({ kind: 'error', message: 'That email doesn’t look quite right — mind checking it?' });
      return;
    }

    setStatus({ kind: 'sending' });
    const { error } = await supabase.from('beta_waitlist').insert({
      full_name: trimmedName.slice(0, 100),
      email: trimmedEmail,
      role,
    });

    if (error) {
      if (error.code === '23505') {
        setStatus({ kind: 'already' });
      } else {
        setStatus({ kind: 'error', message: 'Something went wrong on our side. Please try again in a moment.' });
      }
      return;
    }
    setStatus({ kind: 'done', name: trimmedName });
  }

  if (status.kind === 'done') {
    return (
      <div className="waitlist-card waitlist-done" aria-live="polite">
        <CheckCircle2 size={34} strokeWidth={1.5} aria-hidden="true" />
        <h3>You’re on the list.</h3>
        <p>Thanks, {status.name}. We’ll be in touch when beta places open.</p>
      </div>
    );
  }

  if (status.kind === 'already') {
    return (
      <div className="waitlist-card waitlist-done" aria-live="polite">
        <CheckCircle2 size={34} strokeWidth={1.5} aria-hidden="true" />
        <h3>You’re already on the list.</h3>
        <p>No need to sign up twice — we’ll be in touch when beta places open.</p>
      </div>
    );
  }

  return (
    <form className="waitlist-card" onSubmit={handleSubmit} noValidate>
      <h3>Save your spot.</h3>
      <label htmlFor="waitlist-name">Your name</label>
      <input
        id="waitlist-name"
        name="name"
        type="text"
        autoComplete="name"
        maxLength={100}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="waitlist-email">Your email</label>
      <input
        id="waitlist-email"
        name="email"
        type="email"
        autoComplete="email"
        maxLength={255}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label id="waitlist-role-label">I’m a…</label>
      <div className="role-chips" role="group" aria-labelledby="waitlist-role-label">
        {roleOptions.map((option) => (
          <button
            key={option}
            type="button"
            className="role-chip"
            aria-pressed={role === option}
            onClick={() => setRole(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <Button type="submit" variant="caption" size="lg" className="waitlist-submit" disabled={status.kind === 'sending'}>
        {status.kind === 'sending' ? 'Saving…' : 'Count me in'} <ArrowUpRight />
      </Button>
      <p className="waitlist-status" role="status" aria-live="polite">
        {status.kind === 'error' ? status.message : ''}
      </p>
    </form>
  );
}
