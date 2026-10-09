import { createFileRoute } from '@tanstack/react-router';
import { PolicyPage } from '@/components/policy-page';

export const Route = createFileRoute('/privacy')({
  head: () => ({ meta: [
    { title: 'Privacy information — Caption+' },
    { name: 'description', content: 'The current status of Caption+ privacy information and its forthcoming privacy policy.' },
    { property: 'og:title', content: 'Privacy information — Caption+' },
    { property: 'og:description', content: 'Privacy policy publication status for Caption+.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: Privacy,
});

function Privacy() {
  return <PolicyPage title="Privacy information"><p className="policy-note">Caption+ has not yet published its full privacy policy. This page is a publication notice, not a completed policy.</p><h2>A clear policy, before launch.</h2><p>The full notice will need to identify the organisation responsible for personal information, its privacy contact, and the purposes and legal basis for processing. It will also need to explain service providers, retention, international transfers, and how to exercise privacy rights.</p><h2>Joining the waitlist</h2><p>The waitlist link takes you to the existing <a href="https://captionplus.ai/#waitlist" target="_blank" rel="noreferrer">Caption+ website</a>. Review the privacy information provided there before submitting personal information. Please do not submit sensitive personal information through the waitlist.</p></PolicyPage>;
}