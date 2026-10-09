import { createFileRoute } from '@tanstack/react-router';
import { PolicyPage } from '@/components/policy-page';

export const Route = createFileRoute('/legal')({
  head: () => ({ meta: [
    { title: 'Legal information — Caption+' },
    { name: 'description', content: 'Information about the Caption+ preview, beta access, DSA funding status, and forthcoming terms.' },
    { property: 'og:title', content: 'Legal information — Caption+' },
    { property: 'og:description', content: 'Current Caption+ preview and funding information, and terms publication status.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: Legal,
});

function Legal() {
  return <PolicyPage title="Legal information"><p>Caption+ was founded by Nishit, a Deaf computer science student at UAL Creative Computing Institute.</p><h2>About the preview</h2><p>The lecture demonstration is scripted. Its speaker names and initials are sample identities, not live speaker identification. The optional microphone preview uses browser speech recognition, not the production Caption+ engine.</p><h2>Beta access and funding</h2><p>Joining the waitlist expresses interest in the beta; it does not guarantee access or a launch date.</p><p>Caption+ is working towards Disabled Students’ Allowance funding, with the aim of being free for eligible UK students. DSA funding is not yet available.</p><h2>Terms of use</h2><p className="policy-note">Full terms of use and the legal operator’s contact details have not yet been published. This information page is not a substitute for those terms.</p></PolicyPage>;
}