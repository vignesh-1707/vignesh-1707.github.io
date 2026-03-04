import { useState, useEffect } from "react"

const SKILLS = {
  Languages:    ['Java','JavaScript','HTML5','CSS3','SQL'],
  Backend:      ['Spring Boot','Spring MVC','Spring Security','JPA/Hibernate','JWT Auth','Flyway','REST API'],
  Frontend:     ['React.js','Vite','Tailwind CSS','AngularJS'],
  Database:     ['MySQL','SQL Workbench','Schema Design'],
  Integrations: ['Stripe API','Selenium','Thymeleaf','Spring Mail'],
  Tools:        ['Git','GitHub','Jira','Postman','IntelliJ','VS Code','Figma'],
}

const PROJECTS = [
  { id:1, num:'01', name:'PropTaxCheck', cat:'PropTech', color:'#00d4aa', role:'Property Tax Automation System', desc:'Full-stack tax automation platform serving 6 Alabama counties. Reduced manual lookup time by 60%.', bullets:['Stripe payment gateway — autopay & manual modes','6 Selenium WebDriver modules eliminating manual data entry','Email reports to 500+ users/cycle','JWT role-based access control','10+ Flyway migrations — zero-downtime deployments'], stack:['Java','Spring Boot','React.js','MySQL','Stripe','Selenium','JWT'] },
  { id:2, num:'02', name:'Hybrid HOA', cat:'PropTech', color:'#3b82f6', role:'Property Management Platform', desc:'Multi-module HOA platform for condominiums, associations and office buildings.', bullets:['10+ REST endpoints with normalized MySQL schemas','React.js + Tailwind CSS unified UI','Agile sprints with 4-member team via Jira'], stack:['Java','Spring Boot','React.js','Tailwind CSS','MySQL','Jira'] },
  { id:3, num:'03', name:'Bistro on 19th', cat:'F&B', color:'#ff6b35', role:'Restaurant Management App', desc:'Customer-facing restaurant app with admin panel for real-time order management.', bullets:['Spring Boot REST APIs for orders & menu','Vite + React.js + Tailwind CSS frontend','JWT-secured endpoints'], stack:['Java','Spring Boot','React.js','Vite','Tailwind CSS','JWT'] },
]

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Fira+Code:wght@300;400&family=Outfit:wght@300;400;500&display=swap');
  :root {
    --bg:#0a0d13; --surface:#10151f; --s2:#161d2b;
    --bd:#1e2a3a; --bd2:#263347;
    --acc:#00d4aa; --bl:#3b82f6; --or:#ff6b35;
    --tx:#dde4f0; --txd:#8a9ab5; --txf:#4a5568;
    --mono:'Fira Code',monospace; --sans:'Outfit',sans-serif; --dis:'Syne',sans-serif;
  }
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }
  body { background:var(--bg); color:var(--tx); font-family:var(--sans); font-weight:300; line-height:1.7; overflow-x:hidden; }
  ::selection { background:var(--acc); color:#000; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0} }
  .fa    { animation: fadeUp 0.6s both; }
  .blink { animation: blink 1s infinite; }

  .ham-line { display:block; width:22px; height:2px; background:var(--tx); border-radius:2px; transition:transform 0.3s, opacity 0.3s; }
  .ham-open .ham-line:nth-child(1){ transform:translateY(6px) rotate(45deg); }
  .ham-open .ham-line:nth-child(2){ opacity:0; }
  .ham-open .ham-line:nth-child(3){ transform:translateY(-6px) rotate(-45deg); }

  .mobile-drawer {
    display:none; position:fixed; top:64px; left:0; right:0; bottom:0; z-index:99;
    background:rgba(10,13,19,0.98); backdrop-filter:blur(24px);
    flex-direction:column; padding:24px 28px; overflow-y:auto;
  }
  .mobile-drawer.open { display:flex; }
  .mobile-drawer a { font-family:var(--mono); font-size:1rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--txd); text-decoration:none; padding:18px 0; border-bottom:1px solid var(--bd); transition:color 0.2s; }
  .mobile-drawer a:last-child { border-bottom:none; color:var(--acc); margin-top:12px; }
  .mobile-drawer a:hover { color:var(--acc); }

  /* responsive breakpoints */
  @media (max-width:768px) {
    .d-nav { display:none !important; }
    .hamburger { display:flex !important; }
    .projects-wrap { grid-template-columns:1fr !important; }
    .proj-tabs { flex-direction:row !important; overflow-x:auto; }
    .proj-tab { border-left:none !important; border-bottom:3px solid transparent !important; }
    .proj-tab.active { border-left:none !important; border-bottom-color:inherit !important; }
    .exp-grid { grid-template-columns:1fr !important; gap:28px !important; }
    .str-grid { grid-template-columns:1fr 1fr !important; }
    .hero-section { padding:100px 20px 60px !important; }
    .sec { padding:60px 20px !important; }
    .contact-box { padding:36px 20px !important; }
    .footer-bar { flex-direction:column !important; gap:6px; align-items:center; }
    .contact-links { flex-direction:column !important; }
  }
  @media (max-width:480px) {
    .skills-grid { grid-template-columns:1fr !important; }
    .str-grid { grid-template-columns:1fr !important; }
    .hero-btns { flex-direction:column !important; }
  }
`

function Tag({ children, color }) {
  const c = color || 'var(--acc)'
  return <span style={{ fontFamily:'var(--mono)', fontSize:'0.68rem', letterSpacing:'0.1em', textTransform:'uppercase', color:c, background:`${c}18`, border:`1px solid ${c}30`, padding:'3px 10px', borderRadius:'2px' }}>{children}</span>
}

/* ── NAVBAR ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', f)
    return () => window.removeEventListener('scroll', f)
  }, [])
  const close = () => setOpen(false)
  return (
    <>
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 28px', height:64, background: scrolled ? 'rgba(10,13,19,0.95)' : 'rgba(10,13,19,0.7)', backdropFilter:'blur(20px)', borderBottom:`1px solid ${scrolled ? 'var(--bd)' : 'transparent'}`, transition:'all 0.3s' }}>
        <div style={{ fontFamily:'var(--dis)', fontWeight:800, fontSize:'1rem', letterSpacing:'-0.02em' }}>VM<span style={{ color:'var(--acc)' }}>.</span></div>

        {/* Desktop */}
        <ul className="d-nav" style={{ display:'flex', gap:28, listStyle:'none' }}>
          {['About','Skills','Projects','Experience','Contact'].map(n => (
            <li key={n}><a href={`#${n.toLowerCase()}`} style={{ fontFamily:'var(--mono)', fontSize:'0.7rem', letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--txd)', textDecoration:'none', transition:'color 0.2s' }} onMouseEnter={e=>e.target.style.color='var(--acc)'} onMouseLeave={e=>e.target.style.color='var(--txd)'}>{n}</a></li>
          ))}
        </ul>
        <a className="d-nav" href="mailto:vigneshmannu1707@gmail.com" style={{ fontFamily:'var(--mono)', fontSize:'0.72rem', letterSpacing:'0.06em', textTransform:'uppercase', padding:'7px 16px', border:'1px solid var(--acc)', color:'var(--acc)', textDecoration:'none', borderRadius:'2px', transition:'all 0.2s' }} onMouseEnter={e=>{e.target.style.background='var(--acc)';e.target.style.color='#000'}} onMouseLeave={e=>{e.target.style.background='transparent';e.target.style.color='var(--acc)'}}>Hire Me</a>

        {/* Hamburger */}
        <button className={`hamburger ${open ? 'ham-open' : ''}`} onClick={() => setOpen(o => !o)} style={{ display:'none', flexDirection:'column', gap:4, background:'none', border:'none', cursor:'pointer', padding:6, zIndex:101 }}>
          <span className="ham-line"/><span className="ham-line"/><span className="ham-line"/>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${open ? 'open' : ''}`}>
        {['About','Skills','Projects','Experience','Contact'].map(n => (
          <a key={n} href={`#${n.toLowerCase()}`} onClick={close}>{n}</a>
        ))}
        <a href="mailto:vigneshmannu1707@gmail.com" onClick={close}>Hire Me →</a>
      </div>
    </>
  )
}

/* ── HERO ── */
function Hero() {
  const [typed, setTyped] = useState('')
  const full = 'Java Full-Stack Developer'
  useEffect(() => {
    let i = 0
    const t = setInterval(() => { if (i <= full.length) { setTyped(full.slice(0,i)); i++ } else clearInterval(t) }, 55)
    return () => clearInterval(t)
  }, [])
  return (
    <section id="about" className="hero-section" style={{ minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', padding:'120px 40px 80px', maxWidth:1100, margin:'0 auto', position:'relative' }}>
      <div style={{ position:'absolute', top:'20%', left:'-5%', width:400, height:400, borderRadius:'50%', background:'var(--acc)', opacity:0.05, filter:'blur(90px)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', top:'40%', right:'5%', width:350, height:350, borderRadius:'50%', background:'var(--bl)', opacity:0.05, filter:'blur(80px)', pointerEvents:'none' }}/>
      <div className="fa" style={{ animationDelay:'0.1s' }}><Tag>Available for opportunities</Tag></div>
      <h1 className="fa" style={{ fontFamily:'var(--dis)', fontWeight:800, fontSize:'clamp(2.8rem,9vw,6rem)', lineHeight:0.92, letterSpacing:'-0.03em', margin:'24px 0 10px', animationDelay:'0.25s' }}>
        Vignesh<br/><span style={{ WebkitTextStroke:'1px var(--bd2)', color:'transparent' }}>Mannu</span><span style={{ color:'var(--acc)' }}>.</span>
      </h1>
      <div className="fa" style={{ fontFamily:'var(--mono)', fontSize:'clamp(0.8rem,2.5vw,1.05rem)', color:'var(--acc)', marginBottom:28, minHeight:'1.5em', animationDelay:'0.4s' }}>
        {typed}<span className="blink">_</span>
      </div>
      <p className="fa" style={{ maxWidth:500, color:'var(--txd)', fontSize:'clamp(0.88rem,2vw,1rem)', lineHeight:1.85, marginBottom:40, animationDelay:'0.55s' }}>
        3 years building scalable web apps across property management, restaurant, and government tax automation. Based in Kanchipuram, Tamil Nadu.
      </p>
      <div className="fa hero-btns" style={{ display:'flex', gap:12, flexWrap:'wrap', animationDelay:'0.7s' }}>
        <a href="#projects" style={{ fontFamily:'var(--mono)', fontSize:'0.75rem', letterSpacing:'0.05em', textTransform:'uppercase', textDecoration:'none', padding:'13px 24px', background:'var(--acc)', color:'#000', borderRadius:'2px', fontWeight:500 }}>View Projects</a>
        <a href="#contact"  style={{ fontFamily:'var(--mono)', fontSize:'0.75rem', letterSpacing:'0.05em', textTransform:'uppercase', textDecoration:'none', padding:'13px 24px', background:'transparent', color:'var(--tx)', borderRadius:'2px', border:'1px solid var(--bd)' }}>Get In Touch</a>
      </div>
    </section>
  )
}

/* ── SKILLS ── */
function Skills() {
  const [hov, setHov] = useState(null)
  const colors = ['var(--acc)','var(--bl)','#34d399','#fb923c','#f472b6','#60a5fa']
  return (
    <section id="skills" className="sec" style={{ padding:'80px 40px', maxWidth:1100, margin:'0 auto' }}>
      <Tag>Technical Stack</Tag>
      <h2 style={{ fontFamily:'var(--dis)', fontWeight:700, fontSize:'clamp(1.6rem,4vw,2.8rem)', letterSpacing:'-0.02em', margin:'14px 0 40px' }}>Skills &amp; <span style={{ color:'var(--acc)' }}>Expertise</span></h2>
      <div className="skills-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:14 }}>
        {Object.entries(SKILLS).map(([cat, items], ci) => (
          <div key={cat} style={{ background:'var(--surface)', border:`1px solid ${hov===cat?'var(--acc)':'var(--bd)'}`, borderRadius:'6px', padding:'22px', transition:'border-color 0.3s,transform 0.3s', transform:hov===cat?'translateY(-2px)':'none', cursor:'default' }} onMouseEnter={()=>setHov(cat)} onMouseLeave={()=>setHov(null)}>
            <div style={{ fontFamily:'var(--mono)', fontSize:'0.62rem', letterSpacing:'0.15em', textTransform:'uppercase', color:colors[ci], marginBottom:14 }}>{String(ci+1).padStart(2,'0')} / {cat}</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
              {items.map(s => <span key={s} style={{ fontFamily:'var(--mono)', fontSize:'0.72rem', background:'var(--s2)', border:'1px solid var(--bd2)', color:'var(--txd)', padding:'4px 9px', borderRadius:'2px' }}>{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── PROJECTS ── */
function Projects() {
  const [active, setActive] = useState(0)
  const p = PROJECTS[active]
  return (
    <section id="projects" className="sec" style={{ padding:'80px 40px', background:'var(--surface)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <Tag>Portfolio</Tag>
        <h2 style={{ fontFamily:'var(--dis)', fontWeight:700, fontSize:'clamp(1.6rem,4vw,2.8rem)', letterSpacing:'-0.02em', margin:'14px 0 40px' }}>Featured <span style={{ color:'var(--acc)' }}>Projects</span></h2>
        <div className="projects-wrap" style={{ display:'grid', gridTemplateColumns:'240px 1fr', gap:2, background:'var(--bd)', borderRadius:'8px', overflow:'hidden' }}>
          {/* Tabs */}
          <div className="proj-tabs" style={{ background:'var(--surface)', display:'flex', flexDirection:'column' }}>
            {PROJECTS.map((proj, i) => (
              <button key={proj.id} onClick={()=>setActive(i)}
                className={`proj-tab ${active===i?'active':''}`}
                style={{ background:active===i?'var(--s2)':'transparent', border:'none', borderLeft:active===i?`3px solid ${proj.color}`:'3px solid transparent', padding:'22px 18px', textAlign:'left', cursor:'pointer', transition:'all 0.2s', flexShrink:0 }}
              >
                <div style={{ fontFamily:'var(--mono)', fontSize:'0.62rem', color:active===i?proj.color:'var(--txf)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:5 }}>{proj.num}</div>
                <div style={{ fontFamily:'var(--dis)', fontWeight:700, fontSize:'1rem', color:active===i?'var(--tx)':'var(--txd)' }}>{proj.name}</div>
                <div style={{ fontSize:'0.72rem', color:'var(--txf)', marginTop:3 }}>{proj.role}</div>
              </button>
            ))}
          </div>
          {/* Detail */}
          <div key={p.id} style={{ background:'var(--s2)', padding:'36px', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:-30, right:-30, width:140, height:140, borderRadius:'50%', background:p.color, opacity:0.07, filter:'blur(40px)', pointerEvents:'none' }}/>
            <div style={{ fontFamily:'var(--mono)', fontSize:'0.65rem', color:p.color, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:10 }}>{p.num} — {p.cat}</div>
            <h3 style={{ fontFamily:'var(--dis)', fontWeight:800, fontSize:'clamp(1.3rem,3vw,1.8rem)', letterSpacing:'-0.02em', marginBottom:4 }}>{p.name}</h3>
            <div style={{ color:'var(--txd)', fontSize:'0.85rem', marginBottom:18 }}>{p.role}</div>
            <p style={{ color:'var(--txd)', lineHeight:1.8, marginBottom:24, fontSize:'0.9rem' }}>{p.desc}</p>
            <div style={{ marginBottom:24 }}>
              <div style={{ fontFamily:'var(--mono)', fontSize:'0.62rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--txf)', marginBottom:10 }}>Key Highlights</div>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:7 }}>
                {p.bullets.map(b => <li key={b} style={{ display:'flex', gap:9, alignItems:'flex-start', fontSize:'0.83rem', color:'var(--txd)' }}><span style={{ color:p.color, marginTop:2, flexShrink:0 }}>▸</span>{b}</li>)}
              </ul>
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
              {p.stack.map(s => <span key={s} style={{ fontFamily:'var(--mono)', fontSize:'0.68rem', background:`${p.color}15`, border:`1px solid ${p.color}30`, color:p.color, padding:'4px 11px', borderRadius:'2px' }}>{s}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── EXPERIENCE ── */
function Experience() {
  return (
    <section id="experience" className="sec" style={{ padding:'80px 40px', maxWidth:1100, margin:'0 auto' }}>
      <Tag>Work History</Tag>
      <h2 style={{ fontFamily:'var(--dis)', fontWeight:700, fontSize:'clamp(1.6rem,4vw,2.8rem)', letterSpacing:'-0.02em', margin:'14px 0 40px' }}>Experience &amp; <span style={{ color:'var(--acc)' }}>Education</span></h2>
      <div className="exp-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:36 }}>
        {/* Work */}
        <div>
          <div style={{ fontFamily:'var(--mono)', fontSize:'0.62rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--txf)', marginBottom:20 }}>// Work Experience</div>
          <div style={{ position:'relative', paddingLeft:26 }}>
            <div style={{ position:'absolute', left:0, top:8, bottom:0, width:1, background:'linear-gradient(to bottom, var(--acc), transparent)' }}/>
            <div style={{ position:'absolute', left:-5, top:6, width:10, height:10, borderRadius:'50%', background:'var(--acc)', boxShadow:'0 0 10px var(--acc)' }}/>
            <div style={{ fontFamily:'var(--mono)', fontSize:'0.68rem', color:'var(--acc)', letterSpacing:'0.1em', marginBottom:10 }}>Aug 2022 — Present</div>
            <div style={{ fontFamily:'var(--dis)', fontWeight:700, fontSize:'clamp(0.95rem,2vw,1.1rem)', marginBottom:4 }}>Java Full-Stack Developer</div>
            <div style={{ color:'var(--txd)', fontSize:'0.83rem', marginBottom:14 }}>Quadprosoft Technologies Inc. · Kanchipuram, India</div>
            {['PropTaxCheck','Hybrid HOA','Bistro on 19th'].map(n => (
              <div key={n} style={{ fontFamily:'var(--mono)', fontSize:'0.72rem', color:'var(--txd)', display:'flex', gap:8, marginBottom:5 }}>
                <span style={{ color:'var(--acc)' }}>›</span>{n}
              </div>
            ))}
          </div>
        </div>
        {/* Education + Strengths */}
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          <div>
            <div style={{ fontFamily:'var(--mono)', fontSize:'0.62rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--txf)', marginBottom:16 }}>// Education</div>
            <div style={{ background:'var(--surface)', border:'1px solid var(--bd)', borderRadius:'6px', padding:'22px' }}>
              <div style={{ fontFamily:'var(--mono)', fontSize:'0.68rem', color:'var(--bl)', letterSpacing:'0.1em', marginBottom:10 }}>2018 — 2022</div>
              <div style={{ fontFamily:'var(--dis)', fontWeight:700, fontSize:'clamp(0.9rem,2vw,1.05rem)', marginBottom:4 }}>B.E. Computer Science &amp; Engineering</div>
              <div style={{ color:'var(--txd)', fontSize:'0.83rem', marginBottom:10 }}>University College of Engineering, Kanchipuram</div>
              <div style={{ fontFamily:'var(--mono)', fontSize:'0.8rem' }}>CGPA: <span style={{ color:'var(--acc)' }}>7.83 / 10.0</span></div>
            </div>
          </div>
          <div>
            <div style={{ fontFamily:'var(--mono)', fontSize:'0.62rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--txf)', marginBottom:16 }}>// Strengths</div>
            <div className="str-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {[{n:'01',t:'Clean Architecture',c:'var(--acc)'},{n:'02',t:'Mobile-First UI',c:'var(--bl)'},{n:'03',t:'Agile Delivery',c:'#34d399'},{n:'04',t:'Continuous Learning',c:'#fb923c'}].map(s => (
                <div key={s.t} style={{ background:'var(--surface)', border:'1px solid var(--bd)', borderRadius:'6px', padding:'14px', transition:'border-color 0.2s', cursor:'default' }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=s.c}
                  onMouseLeave={e=>e.currentTarget.style.borderColor='var(--bd)'}
                >
                  <span style={{ fontFamily:'var(--mono)', fontSize:'0.58rem', color:s.c, display:'block', marginBottom:5 }}>{s.n}</span>
                  <span style={{ fontSize:'0.82rem', fontWeight:500, color:'var(--txd)' }}>{s.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── CONTACT ── */
function Contact() {
  return (
    <section id="contact" style={{ padding:'80px 0', background:'var(--surface)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 40px' }}>
        <div className="contact-box" style={{ border:'1px solid var(--bd)', borderRadius:'12px', padding:'60px 40px', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:'60%', height:1, background:'linear-gradient(to right, transparent, var(--acc), transparent)' }}/>
          <Tag>Let's Connect</Tag>
          <h2 style={{ fontFamily:'var(--dis)', fontWeight:800, fontSize:'clamp(1.8rem,5vw,3.5rem)', letterSpacing:'-0.03em', margin:'20px 0 14px', lineHeight:1 }}>Open to new<br/><span style={{ color:'var(--acc)' }}>opportunities</span></h2>
          <p style={{ color:'var(--txd)', fontSize:'0.95rem', maxWidth:400, margin:'0 auto 36px', lineHeight:1.8 }}>Looking for a Java full-stack developer? Let's talk.</p>
          <div className="contact-links" style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            {[
              { l:'Email',    v:'vigneshmannu1707@gmail.com',     h:'mailto:vigneshmannu1707@gmail.com' },
              { l:'LinkedIn', v:'linkedin.com/in/vignesh-m',       h:'https://linkedin.com/in/vignesh-m-465ba5226' },
             
            ].map(c => (
              <a key={c.l} href={c.h} target={c.h.startsWith('http')?'_blank':undefined} rel="noopener noreferrer"
                style={{ fontFamily:'var(--mono)', fontSize:'0.75rem', background:'var(--s2)', border:'1px solid var(--bd2)', color:'var(--txd)', padding:'12px 18px', borderRadius:'4px', textDecoration:'none', display:'flex', flexDirection:'column', gap:2, alignItems:'flex-start', transition:'border-color 0.2s', flex:'1 1 auto', minWidth:180 }}
                onMouseEnter={e=>e.currentTarget.style.borderColor='var(--acc)'}
                onMouseLeave={e=>e.currentTarget.style.borderColor='var(--bd2)'}
              >
                <span style={{ fontSize:'0.58rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--txf)' }}>{c.l}</span>
                {c.v}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bar" style={{ borderTop:'1px solid var(--bd)', marginTop:40, paddingTop:20, display:'flex', justifyContent:'space-between', fontFamily:'var(--mono)', fontSize:'0.65rem', color:'var(--txf)', letterSpacing:'0.08em' }}>
          <span>VIGNESH MANNU</span>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div style={{ background:'var(--bg)', minHeight:'100vh', color:'var(--tx)', fontFamily:'var(--sans)', overflowX:'hidden' }}>
      <style>{css}</style>
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  )
}
