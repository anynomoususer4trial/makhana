export default function Navbar() {
  return (
    <nav className="w-full sticky top-0 z-50 bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 h-[76px] flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center group">
          <img
            src="/LogoText.png"
            alt="HealtheBites Logo"
            className="h-9 md:h-11 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide">
          <a
            href="/shop"
            className="text-[var(--heading-color)] hover:text-[var(--color-primary)] transition"
          >
            Shop
          </a>
          <a
            href="/about"
            className="text-[var(--heading-color)] hover:text-[var(--color-primary)] transition"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-[var(--heading-color)] hover:text-[var(--color-primary)] transition"
          >
            Contact
          </a>
        </div>

        {/* Cart Button */}
        <button className="bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-full text-sm tracking-wide shadow-sm hover:shadow-md transition-all duration-300">
          Cart
        </button>

      </div>
    </nav>
  );
}