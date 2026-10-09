CREATE TABLE public.beta_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL UNIQUE,
  role text NOT NULL DEFAULT 'student',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.beta_waitlist TO anon;
GRANT ALL ON public.beta_waitlist TO service_role;

ALTER TABLE public.beta_waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join the waitlist"
  ON public.beta_waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);