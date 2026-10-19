import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle, AlertCircle, ArrowLeft, ArrowRight, Phone, Mail, MapPin, MessageCircle, Menu, X, Waves, Utensils, Dumbbell, Presentation, Zap, Wifi, Star, ChevronDown, Instagram, Facebook } from 'lucide-react'

// FIXED: Using online images instead of local ./assets/... so Vite won't crash
const lobbyImg = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80"
const deluxeImg = "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80"
const executiveImg = "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80"
const presidentialImg = "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80"
const restaurantImg = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
import bedroom2Img from "./assets/bedroom 2.jpg"
const outdoorImg = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80"
const poolImg = "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"
const pool2Img = "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80"
const pool3Img = "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80"
const pool4Img = "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"
import receptionImg from "./assets/reception.jpg"
const PHONE = '09069343206', WA = '2349069343206', EMAIL = 'deplaymaker19@gmail.com'
const ROOMS = [
  { id: 'Deluxe Room', price: 35000, img: deluxeImg, amenities: ['King bed', 'Air conditioning', 'Smart TV', 'Free WiFi', 'En-suite bathroom'] },
  { id: 'Executive Suite', price: 55000, img: executiveImg, amenities: ['Separate lounge', 'King bed', 'Work desk', 'Mini bar', 'Free breakfast'] },
  { id: 'Presidential Suite', price: 120000, img: presidentialImg, amenities: ['Master bedroom', 'Living & dining area', 'Private balcony', 'Butler service', 'Jacuzzi'] },
]
const GALLERY = [
  { src: outdoorImg, alt: 'Pool and lounge area at night' },
  { src: poolImg, alt: 'Pool surrounded by palm trees at night' },
  { src: bedroom2Img, alt: 'Guest bedroom' },
  { src: pool2Img, alt: 'Poolside at sunset' },
  { src: receptionImg, alt: 'Reception area' },
  { src: pool3Img, alt: 'Pool and garden deck' },
  { src: lobbyImg, alt: 'Grand lobby hallway' },
  { src: pool4Img, alt: 'Pool steps and loungers at dusk' },
]
const FACILITIES = [[Waves, 'Swimming Pool'], [Utensils, 'Restaurant & Bar'], [Dumbbell, 'Gym'], [Presentation, 'Conference Hall'], [Zap, '24/7 Power'], [Wifi, 'Free WiFi']]
const REVIEWS = [
  ['Chioma A.', 'Calm, clean and beautifully run. Easily the best stay I have had in Enugu.'],
  ['Emeka O.', 'Power and WiFi never dropped. Perfect for my business trip. Staff were excellent.'],
  ['Ngozi E.', 'The Executive Suite felt like home. The jollof and grilled fish were superb.'],
]
const fmt = (n) => '₦' + n.toLocaleString('en-NG')
const today = () => new Date().toISOString().split('T')[0]
const store = (k, v) => { try { const a = JSON.parse(localStorage.getItem(k) || '[]'); a.push(v); localStorage.setItem(k, JSON.stringify(a)) } catch {} }
const fade = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } }
const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

function Field({ label, error, children }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-espresso">{label}</span>
      {children}
      {error && <span className="mt-1 flex items-center gap-1 text-red-500"><AlertCircle size={14} />{error}</span>}
    </label>
  )
}
function TopBar() {
  return <div className="bg-beige text-espresso text-xs text-center py-2 px-2 border-b border-gold/40">Call to book: <a href={`tel:${PHONE}`}>{PHONE}</a> | Email: {EMAIL}</div>
}
function Navbar({ onBook }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const links = ['Home', 'Rooms', 'Dining', 'Facilities', 'Gallery', 'Contact']
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h)
  }, [])
  const nav = (l) => { go(l.toLowerCase()); setOpen(false) }
  return (
    <nav className={`sticky top-0 z-40 bg-white/80 backdrop-blur transition-shadow ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <span className="font-serif text-lg font-bold tracking-wide text-espresso">DE PLAYMAKER SUITES</span>
        <ul className="hidden md:flex gap-8">
          {links.map((l) => <li key={l}><button onClick={() => nav(l)} className="text-espresso border-b-2 border-transparent hover:border-gold pb-1 transition">{l}</button></li>)}
        </ul>
        <button onClick={onBook} className="btn-gold hidden md:block py-2">Book Now</button>
        <button className="md:hidden text-espresso" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween' }} className="fixed inset-y-0 right-0 w-3/4 bg-beige shadow-2xl p-8 z-50 md:hidden">
            <button onClick={() => setOpen(false)} className="mb-8 text-espresso" aria-label="Close menu"><X /></button>
            <ul className="space-y-6">{links.map((l) => <li key={l}><button onClick={() => nav(l)} className="font-serif text-xl text-espresso">{l}</button></li>)}</ul>
            <button onClick={() => { setOpen(false); onBook() }} className="btn-gold mt-10 w-full">Book Now</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
function Hero({ onBook }) {
  return (
    <header id="home" className="bg-beige">
      <div className="section grid md:grid-cols-2 gap-12 items-center">
        <motion.div {...fade}>
          <p className="text-gold-dark tracking-widest text-sm mb-4">ENUGU, ENUGU STATE</p>
          <h1 className="text-4xl md:text-[64px] leading-tight tracking-tight">Experience 4-Star Luxury in Enugu</h1>
          <div className="h-0.5 w-20 bg-gold my-6" />
          <p className="mb-8 max-w-md">Luxury, Comfort, Home in the Heart of Enugu. Quiet rooms, warm service and reliable power, made for rest and for business.</p>
          <div className="flex flex-wrap gap-4">
            <button onClick={onBook} className="btn-gold shadow-md">Check Availability</button>
            <button onClick={() => go('gallery')} className="btn-outline">Take a Tour</button>
          </div>
        </motion.div>
        <motion.div {...fade} className="aspect-3/4 w-full max-w-md justify-self-center overflow-hidden rounded-2xl border-2 border-gold shadow-xl">
          <img src={lobbyImg} alt="De Playmaker Suites lobby" className="h-full w-full object-cover" />
        </motion.div>
      </div>
    </header>
  )
}
function Rooms({ onBook }) {
  const [open, setOpen] = useState(null)
  return (
    <section id="rooms" className="section">
      <motion.h2 {...fade} className="text-4xl text-center mb-14">Rooms & Suites</motion.h2>
      <div className="grid md:grid-cols-3 gap-8">
        {ROOMS.map((r) => (
          <motion.article key={r.id} {...fade} className="bg-white rounded-3xl shadow-lg border border-transparent hover:border-gold hover:-translate-y-2 transition-all duration-300 overflow-hidden">
            <div className="relative h-48 rounded-t-3xl overflow-hidden">
              <img src={r.img} alt={r.id} className="h-full w-full object-cover" />
              <span className="absolute top-4 right-4 bg-gold text-espresso text-sm font-semibold rounded-full px-4 py-1">{fmt(r.price)}/night</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl mb-4">{r.id}</h3>
              <button onClick={() => setOpen(open === r.id ? null : r.id)} className="flex items-center gap-1 text-gold-dark font-medium">View Details <ChevronDown size={16} className={`transition ${open === r.id ? 'rotate-180' : ''}`} /></button>
              <AnimatePresence initial={false}>
                {open === r.id && (
                  <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-3 space-y-2">
                    {r.amenities.map((a) => <li key={a} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-gold" />{a}</li>)}
                  </motion.ul>
                )}
              </AnimatePresence>
              <button onClick={() => onBook(r.id)} className="btn-gold w-full mt-6">Book This Room</button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
function Facilities() {
  return (
    <section id="facilities" className="bg-white/50"><div className="section">
      <motion.h2 {...fade} className="text-4xl text-center mb-14">Facilities</motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {FACILITIES.map(([Icon, name]) => (
          <motion.div key={name} {...fade} className="text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-beige grid place-items-center text-gold mb-4"><Icon /></div>
            <h3 className="text-lg">{name}</h3>
          </motion.div>
        ))}
      </div>
    </div></section>
  )
}
function Dining() {
  return (
    <section id="dining" className="section grid md:grid-cols-2 gap-12 items-center">
      <motion.div {...fade} className="h-72 rounded-3xl overflow-hidden">
        <img src={restaurantImg} alt="De Playmaker Suites restaurant and bar" className="h-full w-full object-cover" />
      </motion.div>
      <motion.div {...fade}>
        <h2 className="text-4xl mb-4">Dining & Bar</h2>
        <div className="h-0.5 w-20 bg-gold mb-6" />
        <p className="mb-4">Enjoy local favourites and continental dishes prepared fresh by our chefs, from pepper soup and jollof to grilled fish and club sandwiches.</p>
        <p>Unwind at our bar with chilled drinks and signature cocktails in a calm, warm setting.</p>
      </motion.div>
    </section>
  )
}
function Gallery() {
  const [idx, setIdx] = useState(null)
  useEffect(() => {
    if (idx === null) return
    const k = (e) => {
      if (e.key === 'Escape') setIdx(null)
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % 8)
      if (e.key === 'ArrowLeft') setIdx((i) => (i + 7) % 8)
    }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [idx])
  return (
    <section id="gallery" className="section">
      <motion.h2 {...fade} className="text-4xl text-center mb-14">Gallery</motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {GALLERY.map((g, i) => (
          <button key={i} onClick={() => setIdx(i)} className="aspect-square rounded-2xl overflow-hidden hover:opacity-80 transition">
            <img src={g.src} alt={g.alt} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      {idx !== null && (
        <div className="fixed inset-0 z-60 bg-espresso/95 grid place-items-center" onClick={() => setIdx(null)}>
          <button className="absolute top-6 right-6 text-beige" aria-label="Close"><X size={32} /></button>
          <button onClick={(e) => { e.stopPropagation(); setIdx((idx + 7) % 8) }} className="absolute left-4 text-beige" aria-label="Previous"><ArrowLeft size={36} /></button>
          <div onClick={(e) => e.stopPropagation()} className="w-[80vw] max-w-3xl aspect-4/3 rounded-2xl overflow-hidden bg-espresso">
            <img src={GALLERY[idx].src} alt={GALLERY[idx].alt} className="h-full w-full object-contain" />
          </div>
          <button onClick={(e) => { e.stopPropagation(); setIdx((idx + 1) % 8) }} className="absolute right-4 text-beige" aria-label="Next"><ArrowRight size={36} /></button>
        </div>
      )}
    </section>
  )
}
function Testimonials() {
  const [i, setI] = useState(0)
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % REVIEWS.length), 5000); return () => clearInterval(t) }, [])
  return (
    <section className="bg-espresso text-beige"><div className="section text-center">
      <h2 className="text-4xl text-beige! mb-10">Guest Reviews</h2>
      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-xl mx-auto">
          <div className="flex justify-center gap-1 text-gold mb-4">{[...Array(5)].map((_, k) => <Star key={k} size={18} fill="currentColor" />)}</div>
          <p className="text-lg mb-4">"{REVIEWS[i][1]}"</p>
          <p className="text-gold">{REVIEWS[i][0]}</p>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center gap-2 mt-8">{REVIEWS.map((_, k) => <button key={k} onClick={() => setI(k)} aria-label={`Review ${k + 1}`} className={`h-2 w-2 rounded-full ${k === i ? 'bg-gold' : 'bg-beige/40'}`} />)}</div>
    </div></section>
  )
}
function Contact({ toast }) {
  const [f, setF] = useState({ name: '', phone: '', message: '' })
  const [err, setErr] = useState({})
  const validate = (v) => {
    const e = {}
    if (!v.name.trim()) e.name = 'Name is required'
    if (!/^0\d{10}$/.test(v.phone)) e.phone = 'Enter 11 digits starting with 0'
    if (!v.message.trim()) e.message = 'Message is required'
    return e
  }
  const set = (k, val) => { const n = { ...f, [k]: val }; setF(n); if (err[k] !== undefined) setErr(validate(n)) }
  const submit = (e) => {
    e.preventDefault()
    const v = validate(f); setErr(v)
    if (Object.keys(v).length) return
    store('hotel_messages', { ...f, date: new Date().toISOString() })
    toast(`Message sent! We will reply to ${EMAIL}`)
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(`Hi De Playmaker Suites, I'm ${f.name} (${f.phone}). ${f.message}`)}`, '_blank')
    setF({ name: '', phone: '', message: '' })
  }
  return (
    <section id="contact" className="section grid md:grid-cols-2 gap-12">
      <motion.div {...fade}>
        <h2 className="text-4xl mb-4">Contact Us</h2>
        <div className="h-0.5 w-20 bg-gold mb-6" />
        <ul className="space-y-4 text-lg">
          <li className="flex gap-3 items-center"><Phone className="text-gold" /><a href={`tel:${PHONE}`}>{PHONE}</a></li>
          <li className="flex gap-3 items-center"><Mail className="text-gold" /><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          <li className="flex gap-3 items-center"><MapPin className="text-gold" />Enugu, Enugu State</li>
        </ul>
      </motion.div>
      <motion.form {...fade} onSubmit={submit} noValidate className="bg-white rounded-3xl shadow-lg p-8 space-y-4">
        <Field label="Name" error={err.name}><input className={`input ${err.name ? 'input-err' : ''}`} value={f.name} onChange={(e) => set('name', e.target.value)} /></Field>
        <Field label="Phone" error={err.phone}><input inputMode="numeric" maxLength={11} className={`input ${err.phone ? 'input-err' : ''}`} value={f.phone} onChange={(e) => set('phone', e.target.value.replace(/\D/g, ''))} /></Field>
        <Field label="Message" error={err.message}><textarea rows={4} className={`input ${err.message ? 'input-err' : ''}`} value={f.message} onChange={(e) => set('message', e.target.value)} /></Field>
        <button className="btn-gold w-full">Send Message</button>
      </motion.form>
    </section>
  )
}
function Footer() {
  return (
    <footer className="bg-espresso text-beige/80">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div><h3 className="text-gold! text-lg mb-2">DE PLAYMAKER SUITES</h3><p>Luxury, Comfort, Home in the Heart of Enugu</p></div>
        <div className="space-y-2"><p className="flex gap-2"><Phone size={16} />{PHONE}</p><p className="flex gap-2"><Mail size={16} />{EMAIL}</p><p className="flex gap-2"><MapPin size={16} />Enugu, Enugu State</p></div>
        <div className="flex gap-4 text-gold"><Instagram /><Facebook /></div>
      </div>
      <p className="text-center text-xs py-4 border-t border-beige/10">© {new Date().getFullYear()} De Playmaker Suites. All rights reserved.</p>
    </footer>
  )
}
function BookingModal({ room, onClose }) {
  const empty = { name: '', phone: '', email: '', checkIn: '', checkOut: '', guests: 1, room: room || ROOMS[0].id }
  const [f, setF] = useState(empty)
  const [err, setErr] = useState({})
  const [step, setStep] = useState('form')
  const validate = (v) => {
    const e = {}
    if (!v.name.trim()) e.name = 'Name is required'
    if (!/^0\d{10}$/.test(v.phone)) e.phone = 'Enter 11 digits starting with 0'
    if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Invalid email'
    if (!v.checkIn || v.checkIn < today()) e.checkIn = 'Check-in must be today or later'
    if (!v.checkOut || v.checkOut <= v.checkIn) e.checkOut = 'Check-out must be after check-in'
    if (v.guests < 1 || v.guests > 6) e.guests = 'Guests must be 1 to 6'
    return e
  }
  const nights = f.checkIn && f.checkOut && f.checkOut > f.checkIn ? Math.round((new Date(f.checkOut) - new Date(f.checkIn)) / 864e5) : 0
  const price = ROOMS.find((r) => r.id === f.room).price
  const set = (k, val) => { const n = { ...f, [k]: val }; setF(n); setErr(validate(n)) }
  const [touched, setTouched] = useState(false)
  const shown = touched ? err : {}
  const submit = (e) => {
    e.preventDefault(); setTouched(true)
    const v = validate(f); setErr(v)
    if (Object.keys(v).length) return
    setStep('loading')
    setTimeout(() => {
      store('hotel_bookings', { ...f, nights, total: nights * price, date: new Date().toISOString() })
      setStep('done')
    }, 1500)
  }
  const cls = (k) => `input ${shown[k] ? 'input-err' : ''}`
  return (
    <div className="fixed inset-0 z-70 bg-espresso/60 backdrop-blur-sm overflow-y-auto p-4" onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl max-w-lg mx-auto my-8 p-6 md:p-8">
        <button onClick={onClose} className="flex items-center gap-1 text-espresso mb-4"><ArrowLeft size={20} />Back</button>
        {step === 'form' && (
          <form onSubmit={submit} noValidate className="space-y-4">
            <h3 className="text-2xl">Book Your Stay</h3>
            <Field label="Name *" error={shown.name}><input className={cls('name')} value={f.name} onChange={(e) => set('name', e.target.value)} /></Field>
            <Field label="Phone *" error={shown.phone}><input inputMode="numeric" maxLength={11} className={cls('phone')} value={f.phone} onChange={(e) => set('phone', e.target.value.replace(/\D/g, ''))} /></Field>
            <Field label="Email" error={shown.email}><input type="email" className={cls('email')} value={f.email} onChange={(e) => set('email', e.target.value)} /></Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Check-in *" error={shown.checkIn}><input type="date" min={today()} className={cls('checkIn')} value={f.checkIn} onChange={(e) => set('checkIn', e.target.value)} /></Field>
              <Field label="Check-out *" error={shown.checkOut}><input type="date" min={f.checkIn || today()} className={cls('checkOut')} value={f.checkOut} onChange={(e) => set('checkOut', e.target.value)} /></Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Guests (1-6)" error={shown.guests}><input type="number" min={1} max={6} className={cls('guests')} value={f.guests} onChange={(e) => set('guests', Number(e.target.value))} /></Field>
              <Field label="Room Type"><select className="input" value={f.room} onChange={(e) => set('room', e.target.value)}>{ROOMS.map((r) => <option key={r.id} value={r.id}>{r.id} ({'₦' + r.price / 1000}k)</option>)}</select></Field>
            </div>
            {nights > 0 && <p className="font-semibold text-espresso">Total: {fmt(nights * price)} for {nights} night{nights > 1 ? 's' : ''}</p>}
            <button className="btn-gold w-full">Submit Booking</button>
          </form>
        )}
        {step === 'loading' && <div className="py-16 text-center"><Loader2 className="mx-auto animate-spin text-gold" size={40} /><p className="mt-4">Processing booking...</p></div>}
        {step === 'done' && (
          <div className="py-8 text-center">
            <CheckCircle className="mx-auto text-gold" size={56} />
            <h3 className="text-2xl my-3">Booking Request Sent!</h3>
            <p className="mb-6">We will call you on {PHONE} within 30 minutes.</p>
            <a target="_blank" rel="noreferrer" className="btn-gold inline-block" href={`https://wa.me/${WA}?text=${encodeURIComponent(`Hi De Playmaker Suites, I just booked ${f.room} from ${f.checkIn} to ${f.checkOut}`)}`}>Confirm on WhatsApp</a>
          </div>
        )}
      </motion.div>
    </div>
  )
}
export default function App() {
  const [modal, setModal] = useState({ open: false, room: null })
  const [toast, setToast] = useState('')
  const book = (room) => setModal({ open: true, room: typeof room === 'string' ? room : null })
  const showToast = (m) => { setToast(m); setTimeout(() => setToast(''), 3000) }
  return (
    <>
      <TopBar />
      <Navbar onBook={book} />
      <main>
        <Hero onBook={book} />
        <Rooms onBook={book} />
        <Dining />
        <Facilities />
        <Gallery />
        <Testimonials />
        <Contact toast={showToast} />
      </main>
      <Footer />
      {modal.open && <BookingModal key={modal.room} room={modal.room} onClose={() => setModal({ open: false, room: null })} />}
      {toast && <div className="fixed bottom-24 right-6 z-80 bg-gold text-espresso rounded-xl px-5 py-3 shadow-xl max-w-xs">{toast}</div>}
      <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gold text-espresso grid place-items-center pulse-gold"><MessageCircle /></a>
      <a href={`tel:${PHONE}`} aria-label="Call" className="fixed bottom-6 left-6 z-50 h-14 w-14 rounded-full bg-espresso text-gold grid place-items-center shadow-lg"><Phone /></a>
    </>
  )
}