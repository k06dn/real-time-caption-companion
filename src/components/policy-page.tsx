import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

export function PolicyPage({ title, children }: { title: string; children: ReactNode }) {
  return <div className="site-page"><header className="site-header policy-header page-width"><Link to="/" className="brand">Caption<span className="brand-plus">+</span></Link><Button variant="ghost" asChild><Link to="/"><ArrowLeft/>Back to Caption+</Link></Button></header><main className="policy-content page-width"><h1>{title}</h1>{children}</main><footer className="site-footer page-width"><span>© 2026 Caption+</span><nav aria-label="Legal navigation"><Link to="/privacy">Privacy</Link><Link to="/legal">Legal</Link></nav></footer></div>;
}