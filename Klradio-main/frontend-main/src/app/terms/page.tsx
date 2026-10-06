
import { NavbarKL } from '@/components/ui/navbar-kl';
import { SiteFooter } from '@/components/site-footer';

export default function TermsPage() {
  return (
    <div className="relative flex min-h-screen flex-col text-foreground overflow-x-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-20"
      >
        <source src="https://ik.imagekit.io/bhanuteja110/Radio/WEBSITE_prob3.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50 -z-10" />

      <NavbarKL />

      <main className="flex-1 flex flex-col items-center pt-32 pb-20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="bg-background/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/10 text-muted-foreground">
            <h1 className="font-headline text-4xl font-bold tracking-tighter md:text-5xl mb-8 text-foreground text-center">
              Terms of Use, Copyright & Privacy Policy
            </h1>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold font-headline text-foreground">1. Acceptance of Terms</h2>
              <p>
                By accessing or using this website, you agree to comply with these Terms of Use and all applicable laws of India, including the Copyright Act, 1957. If you do not agree with these Terms, please discontinue use of this website.
              </p>

              <h2 className="text-2xl font-bold font-headline text-foreground">2. Copyright & Ownership of Songs</h2>
              <p>
                All songs and musical works featured on this website are the property of their respective copyright owners, including composers, lyricists, music publishers, sound recording owners, and other rights holders under the Copyright Act, 1957 (India).
              </p>
              <p>
                This website does not host, store, upload, or distribute any songs or musical works on its own servers. Songs are made available solely through licensed third-party streaming platforms such as Spotify and YouTube using their official embedding or API services.
              </p>
              <p>
                All rights, title, and interest in the songs remain exclusively with their respective copyright owners.
              </p>

              <h2 className="text-2xl font-bold font-headline text-foreground">3. Nature of the Service</h2>
              <p>
                This website functions solely as a discovery and access interface that enables users to listen to songs through authorized third-party streaming services.
              </p>
              <p>This website does not:</p>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>upload songs</li>
                <li>host songs</li>
                <li>modify songs</li>
                <li>distribute copies</li>
                <li>enable downloads</li>
                <li>sell or sublicense music</li>
              </ul>
              <p>
                Playback occurs directly from the respective third-party platform under its own licenses and terms.
              </p>

              <h2 className="text-2xl font-bold font-headline text-foreground">4. Third-Party Streaming Platforms</h2>
              <p>
                Songs available on this website are streamed via embedded players or APIs provided by third-party platforms, including but not limited to Spotify and YouTube.
              </p>
              <p>
                All playback, licensing, streaming rights, and data processing are governed by the respective terms and privacy policies of those platforms.
              </p>
              <p>
                By playing a song on this website, you are interacting directly with the third-party service and agree to its terms of use.
              </p>

              <h2 className="text-2xl font-bold font-headline text-foreground">5. Compliance with Indian Copyright Law</h2>
              <p>Under the Copyright Act, 1957:</p>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>Copyright in musical works and sound recordings belongs to their respective owners</li>
                <li>Public performance and communication to the public are licensed rights</li>
              </ul>
              <p>
                This website does not itself communicate songs to the public. Communication occurs solely through licensed third-party streaming platforms.
              </p>

              <h2 className="text-2xl font-bold font-headline text-foreground">6. Copyright Infringement Notice</h2>
              <p>
                We respect the intellectual property rights of copyright owners under Indian law.
              </p>
              <p>
                If you believe that any embedded or linked content on this website infringes your copyright, you may notify us by providing:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>Your name and contact details</li>
                <li>Identification of the copyrighted work</li>
                <li>URL/location of the content</li>
                <li>Statement of ownership or authorization</li>
                <li>Good-faith statement of infringement</li>
              </ul>
              <p>
                Upon receiving a valid notice, we will promptly review and remove or disable access to the identified content where appropriate.
              </p>
              <p>Contact Email: klradiokl@gmail.com</p>

              <h2 className="text-2xl font-bold font-headline text-foreground">7. No Ownership or Affiliation</h2>
              <p>
                The presence of any song, artist name, album name, artwork, or trademark on this website does not imply ownership, partnership, sponsorship, or endorsement by the respective rights holders unless expressly stated.
              </p>
              <p>
                All trademarks and copyrights belong to their respective owners.
              </p>

              <h2 className="text-2xl font-bold font-headline text-foreground">8. User Responsibility</h2>
              <p>By using this website, you agree not to:</p>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>attempt to download or extract songs</li>
                <li>bypass or circumvent platform protections</li>
                <li>reproduce or redistribute music</li>
                <li>use songs for commercial purposes</li>
              </ul>
              <p>
                Any use of songs remains subject to the licensing terms of the respective streaming platform.
              </p>

              <h2 className="text-2xl font-bold font-headline text-foreground">9. Limitation of Liability</h2>
              <p>
                This website provides access to third-party streaming content on an “as available” basis without warranties of any kind.
              </p>
              <p>We are not responsible for:</p>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>licensing status of third-party platforms</li>
                <li>availability or removal of songs</li>
                <li>third-party policies or terms</li>
                <li>copyright claims relating to third-party content</li>
              </ul>

              <h2 className="text-2xl font-bold font-headline text-foreground">10. Privacy Policy</h2>
              <p>
                This website may collect limited non-personal technical data such as:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>browser type</li>
                <li>device information</li>
                <li>pages visited</li>
                <li>interaction with embedded players</li>
              </ul>
              <p>
                Playback and streaming data may be processed by third-party platforms such as Spotify and YouTube in accordance with their privacy policies.
              </p>
              <p>
                We do not sell or share personal data with third parties except where required by law.
              </p>

              <h2 className="text-2xl font-bold font-headline text-foreground">11. Governing Law & Jurisdiction</h2>
              <p>
                These Terms are governed by the laws of India. Any disputes arising from or relating to this website shall be subject to the exclusive jurisdiction of the courts in Vijayawada, Andhra Pradesh, India.
              </p>

              <h2 className="text-2xl font-bold font-headline text-foreground">12. Contact</h2>
              <p>For copyright, legal, or privacy matters:</p>
              <ul className="list-none space-y-1 pl-4">
                <li>Email: klradiokl@gmail.com</li>
                <li>Location: Vijayawada, Andhra Pradesh, India</li>
                <li>Website: klradio.in</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
