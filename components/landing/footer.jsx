export default function Footer() {
  const cols = [
    {
      heading: "Product",
      links: [
        { name: "Overview", href: "/overview" },
        { name: "Changelog", href: "/changelog" },
        { name: "Roadmap", href: "/learn#path" },
        { name: "Pricing", href: "/pricing" },
      ],
    },
    {
      heading: "Tools",
      links: [
        { name: "Stock Market Tool", href: "/tools#stock-tool" },
        { name: "SIP Calculator", href: "/tools#sip-calc" },
        { name: "EMI Calculator", href: "/tools#emi-calc" },
        { name: "Financial Goal Tracker", href: "/tools#goal-tracker" },
      ],
    },
    {
  heading: "Blog",
      links: [
        { name: "Investing Basics", href: "/learn#blogs" },
        { name: "Tax Planning", href: "/learn#watch" },
        { name: "SIP Guide", href: "/learn#blogs" },
        { name: "Personal Finance 101", href: "/blog/personal-finance-101" },
      ],
    },
    {
      heading: "Company",
      links: [
        { name: "About", href: "/overview" },
        { name: "Careers", href: "/careers" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  return (
    <footer className="border-t border-[#EBEBEB] dark:border-[#222] bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#0F0F0F] dark:bg-white flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 10L7 4L12 10" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="7" cy="11" r="1.2" fill="#C9A84C"/>
                </svg>
              </div>
              <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#0F0F0F] dark:text-white">Finveda</span>
            </a>
            <p className="text-[13px] text-[#888] dark:text-[#777] leading-relaxed max-w-[180px]">
              Personal finance learning and tracking, simplified.
            </p>
          </div>

          {/* Link cols */}
          {cols.map((col) => (
            <div key={col.heading}>
              <div className="text-[11.5px] font-semibold text-[#0F0F0F] dark:text-white tracking-[0.06em] uppercase mb-4">
                {col.heading}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[13px] text-[#888] dark:text-[#777] hover:text-[#0F0F0F] dark:hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-6 border-t border-[#F0F0F0] dark:border-[#222] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12.5px] text-[#BBB] dark:text-[#555]">
            © {new Date().getFullYear()} FinanceFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
          <a
              href="https://x.com/buildwithyash"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12.5px] text-[#BBB] dark:text-[#555] hover:text-[#666] dark:hover:text-[#aaa] transition-colors duration-200"
              >
              Twitter
          </a>

            <a
              href="https://www.linkedin.com/in/buildwithyash/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12.5px] text-[#BBB] dark:text-[#555] hover:text-[#666] dark:hover:text-[#aaa] transition-colors duration-200"
            >
            LinkedIn
            </a>

            <a
              href="https://github.com/YASHSHARMAOFFICIALLY"
               target="_blank"
                rel="noopener noreferrer"
                className="text-[12.5px] text-[#BBB] dark:text-[#555] hover:text-[#666] dark:hover:text-[#aaa] transition-colors duration-200"
              >
              GitHub
            </a>
</div>
        </div>
      </div>
    </footer>
  );
}
