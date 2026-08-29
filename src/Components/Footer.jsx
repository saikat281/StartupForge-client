import { Flame, LogoGithub, LogoLinkedin, XmarkShape } from "@gravity-ui/icons";


const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: ["Browse Startups", "Opportunities", "Pricing", "How it works"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#0B1424] text-[#9CA8BC] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-[#2F6FED] flex items-center justify-center">
                <Flame size={14} className="text-[#0B1424]" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-semibold text-white">
                Startup<span className="text-[#2F6FED]">Forge</span>
              </span>
            </div>
            <p className="text-sm text-[#6B7A90] mt-3 max-w-xs leading-relaxed">
              Where founders and collaborators forge startups together — one
              opportunity at a time.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="#"
                aria-label="Twitter"
                className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors"
              >
                <XmarkShape size={15} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors"
              >
                <LogoLinkedin size={15} />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors"
              >
                <LogoGithub size={15} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="text-xs font-semibold text-white uppercase tracking-wide mb-4">
                {column.title}
              </p>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#6B7A90] hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#6B7A90]">
            © {new Date().getFullYear()} StartupForge. All rights reserved.
          </p>
          <p className="text-xs text-[#6B7A90]">Forged with ambition.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;