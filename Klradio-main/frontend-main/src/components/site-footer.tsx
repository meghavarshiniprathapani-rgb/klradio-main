import { Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:px-8">
      <div className="container flex flex-col items-center justify-center gap-4">
        <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <Image src="https://ik.imagekit.io/tz33swtq7h/logo.jpg" alt="KL Radio Logo" width={56} height={56} className="h-14 w-14 rounded-full" />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              KL Radio &copy; {new Date().getFullYear()}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <div className="flex items-center gap-4">
              <Link href="https://www.instagram.com/kl__radio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://www.youtube.com/@klradio9994" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="pt-4 text-center text-xs text-muted-foreground/80">
          Developed by{' '}
          <Link href="https://nallamothu-bhanuteja.vercel.app/" className="font-medium hover:text-foreground hover:underline" target="_blank" rel="noopener noreferrer">
            N.BHANUTEJA
          </Link>{' '}
          and{' '}
          <Link href="#" className="font-medium hover:text-foreground hover:underline" target="_blank" rel="noopener noreferrer">
            P S MEGHAVARSHINI
          </Link>
        </div>
        <p className="pt-4 text-center text-xs text-muted-foreground/60 max-w-2xl">
          Songs are streamed via Spotify/YouTube embeds and remain the property of their respective copyright owners under the Copyright Act, 1957 (India). This website does not host or own any music.
        </p>
      </div>
    </footer>
  );
}
