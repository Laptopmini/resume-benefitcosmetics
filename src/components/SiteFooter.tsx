import { COPY, PROFILE } from "@/content/resume";

export default function SiteFooter() {
  return (
    <footer data-testid="site-footer" className="bg-ink text-cream py-12 mt-24">
      <div className="max-w-editorial mx-auto px-6">
        <p data-testid="footer-tagline" className="font-script text-2xl text-mustard text-center">
          {COPY.footerLine}
        </p>
        <div className="mt-4 flex justify-center gap-6">
          <a
            href={`mailto:${PROFILE.email}`}
            className="font-mono text-sm underline decoration-mustard"
          >
            Email
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm underline decoration-mustard"
          >
            LinkedIn
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm underline decoration-mustard"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
