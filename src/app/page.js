import {
  Flame,
  ArrowRight,
  Lightbulb,
  Users2,
  Rocket,
  Building2,
  Briefcase,
  MapPin,
} from "lucide-react";

import Link from "next/link";

const STATS = [
  { value: "240+", label: "Startups forged" },
  { value: "1,800+", label: "Opportunities posted" },
  { value: "5,300+", label: "Collaborators matched" },
];

const STEPS = [
  {
    number: "01",
    title: "Post your idea",
    description:
      "Founders list their startup with an industry, stage, and story — no pitch deck required.",
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "Find your people",
    description:
      "Post open roles and let collaborators with the right skills come find you.",
    icon: Users2,
  },
  {
    number: "03",
    title: "Build together",
    description:
      "Review applications, bring your team on board, and start shipping.",
    icon: Rocket,
  },
];

const FEATURED_STARTUPS = [
  {
    name: "Lumen Analytics",
    industry: "AI / ML",
    stage: "Seed",
    description: "Real-time analytics for early-stage product teams.",
  },
  {
    name: "GreenRoute",
    industry: "Climate Tech",
    stage: "Pre-Seed",
    description: "Route optimization to cut last-mile delivery emissions.",
  },
  {
    name: "Ledgerly",
    industry: "Fintech",
    stage: "Series A",
    description: "Bookkeeping automation built for freelancers and agencies.",
  },
];

const OPEN_ROLES = [
  { title: "Frontend Engineer", startup: "Lumen Analytics", type: "Remote" },
  { title: "Growth Marketer", startup: "GreenRoute", type: "Hybrid" },
  { title: "Backend Engineer", startup: "Ledgerly", type: "Remote" },
];

const HomePage = () => {
  return (
    <div className="bg-[#F5F8FC]">
    

      {/* Hero */}
      <section className="relative bg-[#e9ecf1] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #2F6FED 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/60 bg-black/5 px-4 py-1.5 mb-8">
            <Flame size={13} className="text-[#2F6FED]" />
            <span className="text-xs font-medium text-gray-600 tracking-wide">
              Where startups get built
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-semibold  tracking-tight leading-[1.1] max-w-3xl mx-auto">
            Raw ideas in.
            <br />
            <span className="text-[#2F6FED]">Real startups</span> out.
          </h1>

          <p className="text-base sm:text-lg text-gray-800 max-w-xl mx-auto mt-6 leading-relaxed">
            StartupForge connects founders with the collaborators who can
            actually help build — one opportunity, one applicant, one shipped
            feature at a time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-9">
            <Link
              href="/opportunities"
              className="flex items-center gap-2 rounded-lg bg-[#2F6FED] text-[#0B1424] text-sm font-semibold px-6 py-3 hover:bg-[#4C86FF] transition-colors w-full sm:w-auto justify-center"
            >
              Browse Opportunities
              <ArrowRight size={16} />
            </Link>
            <a
              href="/startups"
              className="flex items-center gap-2 rounded-lg border border-black/40  text-sm font-medium px-6 py-3 hover:bg-black/5 transition-colors w-full sm:w-auto justify-center"
            >
              Browse Startups
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mt-16 pt-10 border-t border-white/10">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-semibold ">
                  {stat.value}
                </p>
                <p className="text-xs text-[#6B7A90] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main>
        {/* How it works */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center max-w-lg mx-auto mb-14">
            <p className="text-xs font-semibold text-[#2F6FED] uppercase tracking-widest mb-3">
              How it works
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827] tracking-tight">
              From idea to shipped, in three steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map(({ number, title, description, icon: Icon }) => (
              <div
                key={number}
                className="relative rounded-xl border border-black/5 bg-white p-6 shadow-sm"
              >
                <span className="text-xs font-mono text-[#A8B3C4]">
                  {number}
                </span>
                <div className="h-11 w-11 rounded-lg bg-[#EAF1FF] flex items-center justify-center mt-3">
                  <Icon className="text-[#2F6FED]" size={20} />
                </div>
                <p className="text-base font-semibold text-[#111827] mt-4">
                  {title}
                </p>
                <p className="text-sm text-[#5B6472] mt-1.5 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured startups */}
        <section className="bg-white border-y border-black/5">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="flex items-end justify-between mb-10 gap-4">
              <div>
                <p className="text-xs font-semibold text-[#2F6FED] uppercase tracking-widest mb-3">
                  Featured
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827] tracking-tight">
                  Startups building right now
                </h2>
              </div>
              <a
                href="/startups"
                className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#111827] hover:text-[#2F6FED] transition-colors whitespace-nowrap"
              >
                View all
                <ArrowRight size={14} />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURED_STARTUPS.map((startup) => (
                <div
                  key={startup.name}
                  className="rounded-xl border border-black/5 bg-[#F5F8FC] p-5 hover:shadow-md transition-shadow"
                >
                  <div className="h-11 w-11 rounded-lg bg-[#EAF1FF] flex items-center justify-center">
                    <Building2 className="text-[#2F6FED]" size={20} />
                  </div>
                  <p className="text-base font-semibold text-[#111827] mt-4">
                    {startup.name}
                  </p>
                  <p className="text-sm text-[#5B6472] mt-1.5 leading-relaxed">
                    {startup.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="rounded-full bg-black/5 text-[#5B6472] text-xs font-medium px-2.5 py-1">
                      {startup.industry}
                    </span>
                    <span className="rounded-full bg-black/5 text-[#5B6472] text-xs font-medium px-2.5 py-1">
                      {startup.stage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open roles */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-semibold text-[#2F6FED] uppercase tracking-widest mb-3">
                Open roles
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827] tracking-tight">
                Opportunities looking for someone like you
              </h2>
            </div>
            <Link
              href="/opportunities"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#111827] hover:text-[#2F6FED] transition-colors whitespace-nowrap"
            >
              View all
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="rounded-xl border border-black/5 bg-white shadow-sm divide-y divide-black/5">
            {OPEN_ROLES.map((role) => (
              <div
                key={role.title}
                className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-[#F5F8FC] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-[#EAF1FF] flex items-center justify-center">
                    <Briefcase className="text-[#2F6FED]" size={17} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#111827] truncate">
                      {role.title}
                    </p>
                    <p className="text-xs text-[#6B7A90]">{role.startup}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-xs text-[#5B6472] shrink-0">
                  <MapPin size={12} />
                  {role.type}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA banner */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="rounded-xl bg-[#e9ecf1] px-8 py-14 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, #2F6FED 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-semibold text-black tracking-tight">
                Got an idea worth building?
              </h2>
              <p className="text-sm sm:text-base text-[#3d4a60] font-semibold mt-3 max-w-md mx-auto">
                Post your startup and start attracting collaborators today.
              </p>
              <a
                href="/signup"
                className="inline-flex items-center gap-2 rounded-lg bg-[#2F6FED] text-[#0B1424] text-sm font-semibold px-6 py-3 mt-7 hover:bg-[#4C86FF] transition-colors"
              >
                Get Started
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>

      
    </div>
  );
};

export default HomePage;