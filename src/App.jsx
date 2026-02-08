import { useEffect, useMemo, useRef, useState } from "react";

const scenes = [
  {
    title: "Authorized Repairs",
    copy: "Certified technicians with genuine parts and transparent diagnostics.",
    detail:
      "Same-day service on popular models, plus careful care for water-damage recovery.",
  },
  {
    title: "Easy Financing",
    copy: "Flexible plans designed for upgrades without stress.",
    detail: "Fast in-store verification with friendly guidance from our team.",
  },
  {
    title: "Exchange & Upgrade",
    copy: "Trade in your current phone and step into the latest tech.",
    detail: "Fair valuations with instant credit toward a new device.",
  },
  {
    title: "Visit & Contact",
    copy: "Drop by the Bhadranee hub or reach us instantly on your favorite channel.",
    detail: "Our team walks you through every step before service begins.",
  },
];

const contactLinks = {
  call: "tel:+910000000000",
  instagram: "https://instagram.com/bhadranee.mobile",
  whatsapp: "https://wa.me/910000000000",
};

const trustBadges = [
  "Authorized Service Partner",
  "Genuine Parts",
  "Certified Technicians",
  "Warranty Protected",
];

const useClickSound = (enabled) => {
  return useMemo(() => {
    if (!enabled) {
      return () => {};
    }
    let audioContext;
    return () => {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = "triangle";
      oscillator.frequency.value = 520;
      gain.gain.value = 0.02;
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.08);
    };
  }, [enabled]);
};

export default function App() {
  const [activeScene, setActiveScene] = useState(0);
  const [lowGraphics, setLowGraphics] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [heroReveal, setHeroReveal] = useState(false);
  const contactRef = useRef(null);
  const playClick = useClickSound(audioEnabled);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 5500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.dataset.lowGraphics = lowGraphics ? "true" : "false";
  }, [lowGraphics]);

  const handleNextScene = () => {
    playClick();
    setActiveScene((prev) => (prev + 1) % scenes.length);
  };

  const handleScrollToContact = () => {
    playClick();
    contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="page">
      {showIntro && (
        <div className="intro" role="dialog" aria-modal="true">
          <div className="intro-card">
            <p className="intro-kicker">Bhadranee</p>
            <h1 className="intro-title">Tech + Retro Mobile Service Hub</h1>
            <p className="intro-copy">
              Authorized repairs, upgrades, and trusted support — tap to enter.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => setShowIntro(false)}
              aria-label="Skip intro"
            >
              Skip intro
            </button>
          </div>
        </div>
      )}

      <header className="site-header">
        <div className="logo">
          <div className="logo-mark" aria-hidden="true">
            <span className="logo-dot" />
            <span className="logo-bar" />
          </div>
          <div>
            <p className="logo-title">Bhadranee</p>
            <p className="logo-subtitle">Authorized Mobile Service Hub</p>
          </div>
        </div>
        <div className="toggle-stack" role="group" aria-label="Site toggles">
          <button
            className={`toggle ${lowGraphics ? "is-active" : ""}`}
            onClick={() => setLowGraphics((prev) => !prev)}
            aria-pressed={lowGraphics}
          >
            Low Graphics
          </button>
          <button
            className={`toggle ${audioEnabled ? "is-active" : ""}`}
            onClick={() => setAudioEnabled((prev) => !prev)}
            aria-pressed={audioEnabled}
          >
            Audio {audioEnabled ? "On" : "Off"}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="eyebrow">Tech + Retro</p>
            <h2 id="hero-title">Trusted authorized care for every device.</h2>
            <p className="hero-copy">
              Bhadranee blends certified repairs with retro-futurist calm. Tap the
              plinth to reveal services, or connect instantly.
            </p>
            <div className="cta-row" role="group" aria-label="Primary actions">
              <a
                className="btn btn-primary"
                href={contactLinks.call}
                onClick={playClick}
                aria-label="Call Bhadranee"
              >
                Call Now
              </a>
              <a
                className="btn btn-secondary"
                href={contactLinks.instagram}
                target="_blank"
                rel="noreferrer"
                onClick={playClick}
                aria-label="Open Instagram"
              >
                Instagram
              </a>
              <a
                className="btn btn-ghost"
                href={contactLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                onClick={playClick}
                aria-label="Open WhatsApp"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <div className="hero-visual" aria-label="Interactive phone plinth">
            <button
              className={`phone-plinth ${heroReveal ? "is-revealed" : ""}`}
              onClick={() => {
                playClick();
                setHeroReveal((prev) => !prev);
              }}
              aria-pressed={heroReveal}
              aria-label="Reveal services"
            >
              <div className="phone-shell" aria-hidden="true">
                <div className="phone-screen" />
                <div className="phone-glow" />
              </div>
              <div className="phone-services">
                <p>Authorized Repairs</p>
                <p>Easy Financing</p>
                <p>Exchange & Upgrade</p>
              </div>
            </button>
            <p className="hero-note">
              {lowGraphics
                ? "2D fallback active — smoother on older devices."
                : "Tap the phone for service layers."}
            </p>
          </div>
        </section>

        <section className="scene" aria-labelledby="scene-title">
          <div className="scene-card">
            <p className="scene-kicker">Story Scene {activeScene + 1}</p>
            <h3 id="scene-title">{scenes[activeScene].title}</h3>
            <p>{scenes[activeScene].copy}</p>
            <p className="scene-detail">{scenes[activeScene].detail}</p>
            <div className="scene-actions">
              <button
                className="btn btn-secondary"
                onClick={handleNextScene}
                aria-label="Next story scene"
              >
                Next
              </button>
              <button
                className="btn btn-ghost"
                onClick={handleScrollToContact}
                aria-label="Go to contact section"
              >
                Go to Contact
              </button>
            </div>
          </div>
          <div className="scene-visual" aria-hidden="true">
            <div className="pixel-grid">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </section>

        <section className="service-detail" aria-labelledby="service-title">
          <div className="service-card">
            <p className="eyebrow">Service Detail</p>
            <h3 id="service-title">Care for every component.</h3>
            <p className="service-copy">
              Screen &amp; Battery and many more parts
            </p>
            <button
              className="btn btn-primary"
              onClick={handleScrollToContact}
              aria-label="Book a service and scroll to contact"
            >
              Book a Service
            </button>
          </div>
        </section>

        <section className="exchange" aria-labelledby="exchange-title">
          <div className="exchange-content">
            <p className="eyebrow">Exchange & Upgrade</p>
            <h3 id="exchange-title">Retro meter valuation</h3>
            <p>
              Spin the dial, feel the glow — a retro-inspired valuation meter
              keeps upgrades smooth and transparent.
            </p>
            <button
              className="btn btn-secondary"
              onClick={handleScrollToContact}
              aria-label="Next and go to contact section"
            >
              Next
            </button>
          </div>
          <div className="exchange-visual" aria-hidden="true">
            <div className="retro-meter">
              <div className="retro-arc" />
              <div className="retro-needle" />
              <div className="retro-label">Value</div>
            </div>
          </div>
        </section>

        <section className="about" aria-labelledby="about-title">
          <div className="about-card">
            <p className="eyebrow">About & Trust</p>
            <h3 id="about-title">Authorized by leading manufacturers.</h3>
            <p>
              Bhadranee is recognized for genuine parts, certified technicians,
              and careful in-store diagnostics.
            </p>
            <div className="badge-grid" role="list">
              {trustBadges.map((badge) => (
                <div className="badge" role="listitem" key={badge}>
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="contact"
          aria-labelledby="contact-title"
          ref={contactRef}
        >
          <div className="contact-card">
            <p className="eyebrow">Visit & Contact</p>
            <h3 id="contact-title">Ready when you are.</h3>
            <p>
              Visit the Bhadranee hub for a guided in-store process. We confirm
              your issue, explain the plan, and start only when you approve.
            </p>
            <div className="contact-actions" role="group" aria-label="Contact">
              <a
                className="btn btn-primary"
                href={contactLinks.call}
                onClick={playClick}
                aria-label="Call Bhadranee"
              >
                Call
              </a>
              <a
                className="btn btn-secondary"
                href={contactLinks.instagram}
                target="_blank"
                rel="noreferrer"
                onClick={playClick}
                aria-label="Instagram DM"
              >
                Instagram
              </a>
              <a
                className="btn btn-ghost"
                href={contactLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                onClick={playClick}
                aria-label="WhatsApp chat"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2024 Bhadranee. Mobile-first retro tech care.</p>
      </footer>
    </div>
  );
}
