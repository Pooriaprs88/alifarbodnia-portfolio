"use client";

import Image from "next/image";
import { FaEnvelope, FaYoutube, FaInstagram, FaSpotify, FaLink } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "../../hooks/useTranslation";

export default function Home() {
  const params = useParams();
  const locale = Array.isArray(params?.locale) ? params.locale[0] : params?.locale || 'en';
  const { t } = useTranslation();
  const [navOpen, setNavOpen] = useState(false);
  const router = useRouter();
  const currentLocale = locale;
  const otherLocale = currentLocale === 'en' ? 'fr' : 'en';

  const handleLocaleSwitch = () => {
    // Remove the current locale from the pathname and replace with the other
    let newPath = window.location.pathname.replace(`/${currentLocale}`, `/${otherLocale}`);
    // If already at root (e.g. /en), just swap
    if (window.location.pathname === `/${currentLocale}`) newPath = `/${otherLocale}`;
    // Preserve hash if present
    if (window.location.hash) newPath += window.location.hash;
    router.push(newPath);
  };

  // Ensure t is a function before using it
  const translate = (key: string) => {
    if (typeof t === 'function') {
      return t(key);
    }
    return key;
  };

  console.log('Current locale:', locale);

  // Testimonials slider state/hooks
  const reviews = [
    { src: "/Review1.jpg", alt: "Fiverr review 1" },
    { src: "/Review2.jpg", alt: "Fiverr review 2" },
    { src: "/Review3.jpg", alt: "Fiverr review 3" },
    { src: "/Review4.jpg", alt: "Fiverr review 4" },
    { src: "/Review5.jpg", alt: "Fiverr review 5" },
    { src: "/Review6.jpg", alt: "Fiverr review 6" },
    { src: "/Review7.jpg", alt: "Fiverr review 7" },
    { src: "/Review8.jpg", alt: "Fiverr review 8" },
    { src: "/Review9.jpg", alt: "Fiverr review 9" },
    { src: "/Review10.jpg", alt: "Fiverr review 10" },
    { src: "/Review11.jpg", alt: "Fiverr review 11" },
    { src: "/Review12.jpg", alt: "Fiverr review 12" },
    { src: "/Review13.jpg", alt: "Fiverr review 13" },
    { src: "/Review14.jpg", alt: "Fiverr review 14" },
    { src: "/Review15.jpg", alt: "Fiverr review 15" },
    { src: "/Review16.jpg", alt: "Fiverr review 16" },
    { src: "/Review17.jpg", alt: "Fiverr review 17" },
  ];
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialModal, setTestimonialModal] = useState<{src: string, alt: string} | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const testimonialVisible = isMobile ? [reviews[testimonialIndex]] : [reviews[testimonialIndex], reviews[(testimonialIndex+1)%reviews.length]];
  const goTestimonialLeft = () => setTestimonialIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  const goTestimonialRight = () => setTestimonialIndex((prev) => (prev + 1) % reviews.length);
  const closeTestimonialModal = () => setTestimonialModal(null);

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-auto">
      {/* Main Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-[100] w-full bg-white/95 backdrop-blur-sm border-b border-orange-200 shadow-sm">
        <nav className="flex items-center justify-between py-3 px-4 text-base font-semibold text-gray-700">
          {/* Logo or Name (left) */}
          <a href="#" className="font-bold text-orange-600 text-lg hover:underline focus:outline-none" aria-label="Go to top">Ali Farbodnia</a>
          {/* Centered Nav Links */}
          <div className="flex-1 flex justify-center">
            <div className="hidden md:flex gap-8">
              <a href="#my-book" className="hover:text-orange-600 transition-colors">{translate('nav.myBook')}</a>
              <a href="#albums" className="hover:text-orange-600 transition-colors">{translate('nav.albums')}</a>
              <a href="#performances" className="hover:text-orange-600 transition-colors">{translate('nav.performances')}</a>
              <a href="#contact" className="hover:text-orange-600 transition-colors">{translate('nav.contact')}</a>
            </div>
          </div>
          {/* Social Icons + Language Switcher (right) */}
          <div className="flex items-center gap-3 ml-4">
            <a href="mailto:a.farbodnia@gmail.com" title="Email" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-600 transition-colors"><FaEnvelope /></a>
            <a href="https://youtube.com/@alifarbodnia?si=brU9QaL-TaX8eqCF" title="My Youtube" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-600 transition-colors"><FaYoutube /></a>
            <a href="https://www.instagram.com/alifarbodnia/profilecard/?igsh=MXI3Z2xyd2h4cTNobQ==" title="My Instagram" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-600 transition-colors"><FaInstagram /></a>
            <a href="https://open.spotify.com/artist/7s8YtMTj8iNp9PUVX3a3CS?si=EtS7qZmJTsaCvVXtKuHQCQ" title="My Spotify" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-600 transition-colors"><FaSpotify /></a>
            <a href="https://www.fiverr.com/farbodnia" title="Fiverr" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-600 transition-colors"><FaLink /></a>
            <button
              onClick={handleLocaleSwitch}
              className="ml-2 px-3 py-1 rounded border border-orange-400 text-orange-600 bg-white hover:bg-orange-50 font-semibold text-sm transition"
              aria-label="Switch language"
            >
              {otherLocale.toUpperCase()}
            </button>
            {/* Hamburger for Mobile - always visible */}
            <button className="md:hidden flex items-center ml-2 z-[102]" onClick={() => setNavOpen(!navOpen)} aria-label={navOpen ? "Close navigation" : "Open navigation"}>
              {navOpen ? (
                // X icon
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>
      {/* Mobile Nav Dropdown */}
      {navOpen && (
        <div className="md:hidden flex flex-col gap-2 px-6 pb-4 bg-white border-b border-orange-200 shadow-lg z-[101] fixed top-[64px] left-0 right-0">
          <a href="#my-book" className="py-3 text-lg font-semibold text-gray-900 hover:text-orange-600 transition-colors border-b border-orange-100" onClick={() => setNavOpen(false)}>{translate('nav.myBook')}</a>
          <a href="#albums" className="py-3 text-lg font-semibold text-gray-900 hover:text-orange-600 transition-colors border-b border-orange-100" onClick={() => setNavOpen(false)}>{translate('nav.albums')}</a>
          <a href="#performances" className="py-3 text-lg font-semibold text-gray-900 hover:text-orange-600 transition-colors border-b border-orange-100" onClick={() => setNavOpen(false)}>{translate('nav.performances')}</a>
          <a href="#contact" className="py-3 text-lg font-semibold text-gray-900 hover:text-orange-600 transition-colors" onClick={() => setNavOpen(false)}>{translate('nav.contact')}</a>
        </div>
      )}
      {/* Main Content with responsive padding */}
      <div className="flex-1 flex flex-row p-0 md:p-0">
        {/* Left Accent Bar - responsive height */}
        <div className="w-2 md:w-3 bg-orange-400" />
        {/* Main Content */}
        <div className="flex-1 flex flex-col p-3 sm:p-4 md:p-8 lg:p-16 w-full max-w-full">
          {/* Bio Section - Modern, Centered, Mobile-Friendly */}
          <section className="w-full flex flex-col items-center mt-8 mb-12 max-w-full">
            {/* Profile Image - Top, Centered */}
            <div className="relative w-full max-w-xs sm:max-w-md flex items-center justify-center mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-300 via-orange-100 to-white p-1" />
              <div className="relative rounded-full overflow-hidden w-full h-full shadow-xl border-4 border-white">
                <Image src="/profile.jpg" alt="Ali Farbodnia" width={384} height={384} className="object-contain w-full h-full" />
              </div>
            </div>
            {/* Name and Subtitle */}
            <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-center text-gray-900">Ali Farbodnia</h1>
            <div className="text-orange-500 mb-4 text-lg sm:text-xl font-semibold text-center">{translate('site.subtitle')}</div>
            {/* Bio Card */}
            <div className="w-full max-w-xl bg-white/80 border border-orange-100 rounded-2xl shadow p-6 mb-6 text-center overflow-x-auto">
              <div className="text-gray-700 mb-2 text-lg">{translate('bio.intro1')}</div>
              <div className="text-gray-700 text-lg">{translate('bio.intro2')}</div>
            </div>
            {/* Badges - Scrollable on mobile, wrap on desktop */}
            <div className="flex flex-wrap gap-1 mt-2 mb-2 overflow-x-auto sm:overflow-x-visible px-2 w-full justify-center">
              <span className="rounded-full px-2 py-1 text-xs font-semibold sm:px-4 sm:py-2 sm:text-base sm:font-bold whitespace-nowrap" style={{background:'#171717',color:'#fff'}}>{translate('badges.vazir')}</span>
              <span className="rounded-full px-2 py-1 text-xs font-semibold sm:px-4 sm:py-2 sm:text-base sm:font-bold whitespace-nowrap" style={{background:'#33302C',color:'#fff'}}>{translate('badges.hesar')}</span>
              <span className="rounded-full px-2 py-1 text-xs font-semibold sm:px-4 sm:py-2 sm:text-base sm:font-bold whitespace-nowrap" style={{background:'#FFA552',color:'#33302C'}}>{translate('badges.sooreh')}</span>
              <span className="rounded-full px-2 py-1 text-xs font-semibold sm:px-4 sm:py-2 sm:text-base sm:font-bold whitespace-nowrap" style={{background:'#FF8800',color:'#fff'}}>{translate('badges.tar')}</span>
              <span className="rounded-full px-2 py-1 text-xs font-semibold sm:px-4 sm:py-2 sm:text-base sm:font-bold whitespace-nowrap" style={{background:'#B34E00',color:'#fff'}}>{translate('badges.lotfi')}</span>
              <span className="rounded-full px-2 py-1 text-xs font-semibold sm:px-4 sm:py-2 sm:text-base sm:font-bold whitespace-nowrap" style={{background:'#FFA552',color:'#33302C'}}>{translate('badges.khayyam')}</span>
              <span className="rounded-full px-2 py-1 text-xs font-semibold sm:px-4 sm:py-2 sm:text-base sm:font-bold whitespace-nowrap" style={{background:'#FF8800',color:'#fff'}}>{translate('badges.alest')}</span>
            </div>
          </section>

          {/* My Book Section */}
          <section id="my-book" className="mt-8 sm:mt-16 scroll-mt-24 relative w-full">
            {/* Decorative musical note icon (background) */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 opacity-10 pointer-events-none z-0 text-[8rem] sm:text-[16rem] text-orange-200 select-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" className="w-[6rem] h-[6rem] sm:w-[12rem] sm:h-[12rem] mx-auto">
                <path d="M48 8v32.5a10 10 0 1 1-4-8V16h-20v24.5a10 10 0 1 1-4-8V8h28z" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 relative z-10 text-center">{translate('nav.myBook')}</h2>
            <div className="border-t border-gray-200 pt-6 relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-10 bg-gradient-to-br from-orange-50 via-white to-orange-100 p-4 sm:p-10 rounded-2xl shadow-xl border border-orange-100">
                {/* Left Book Image */}
                <div className="flex-1 flex justify-center mb-4 lg:mb-0 w-full max-w-[220px] sm:max-w-[280px]">
                  <Image src="/book1.jpg" alt="Melody Ney - Pieces For Ney" width={220} height={300} className="rounded-xl shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl w-full h-auto object-contain" />
                </div>
                {/* Center Content */}
                <div className="flex-[2] max-w-xl w-full text-center lg:text-left px-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold mb-2 text-orange-700 tracking-tight">{translate('book.title')} <span className="ml-2 bg-orange-200 text-orange-900 text-xs font-bold px-2 py-1 rounded-full align-middle">{translate('book.edition')}</span></h3>
                  <div className="text-base sm:text-lg text-gray-700 mb-2 font-semibold">{translate('book.subtitle')}</div>
                  <p className="text-gray-700 mb-4 text-sm sm:text-base">
                    {translate('book.description')}
                  </p>
                  <hr className="my-4 border-gray-300" />
                  <div className="flex flex-col items-center gap-2">
                    <span className="font-bold text-gray-800">{translate('book.publisher')}</span>
                    <Image src="/score.jpg" alt="Sample Score from Navaye-Ney" width={220} height={80} className="rounded shadow w-full max-w-xs h-auto object-contain" />
                    <a href="https://sazzbazz.com/product/%DA%A9%D8%AA%D8%A7%D8%A8-%D9%86%D9%88%D8%A7%DB%8C-%D9%86%DB%8C-%D9%82%D8%B7%D8%B9%D8%A7%D8%AA%DB%8C-%D8%A8%D8%B1%D8%A7%DB%8C-%D9%86%DB%8C/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 sm:px-5 py-2 rounded-lg shadow transition text-sm sm:text-base">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9" />
                      </svg>
                      {translate('book.purchase')}
                    </a>
                  </div>
                </div>
                {/* Right Book Image */}
                <div className="flex-1 flex justify-center mt-4 lg:mt-0 w-full max-w-[220px] sm:max-w-[280px]">
                  <Image src="/book2.jpg" alt="Navaye Ney - Ali Farbodnia" width={220} height={300} className="rounded-xl shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl w-full h-auto object-contain" />
                </div>
              </div>
            </div>
          </section>

          {/* Albums & Soundtracks Section */}
          <section id="albums" className="mt-8 sm:mt-16 scroll-mt-24 w-full">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">{translate('nav.albums')}</h2>
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {/* Duduk */}
                <div className="flex flex-col items-center">
                  <a href="https://ancient-sounds.com/product/duduk-sample-pack-vol-2/" target="_blank" rel="noopener noreferrer">
                    <Image src="/duduk.jpg" alt="Duduk Sample Pack" width={240} height={240} className="rounded shadow transition-transform duration-300 hover:scale-105 hover:shadow-xl w-full h-auto object-contain" />
                  </a>
                  <div className="mt-4 text-center">
                    <div className="font-semibold text-gray-900">{translate('albums.duduk.title')}</div>
                    <a href="https://ancient-sounds.com/product/duduk-sample-pack-vol-2/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9" />
                      </svg>
                      {translate('albums.duduk.link')}
                    </a>
                  </div>
                </div>
                {/* Waiting for the Sun */}
                <div className="flex flex-col items-center">
                  <a href="https://youtu.be/xaghY0ipdC0?si=XnblZ-dt7IdSvP95" target="_blank" rel="noopener noreferrer">
                    <Image src="/waiting-for-sun.jpg" alt="Waiting for the Sun" width={240} height={240} className="rounded shadow transition-transform duration-300 hover:scale-105 hover:shadow-xl w-full h-auto object-contain" />
                  </a>
                  <div className="mt-4 text-center">
                    <div className="font-semibold text-gray-900">{translate('albums.waitingForSun.title')}</div>
                    <a href="https://youtu.be/xaghY0ipdC0?si=XnblZ-dt7IdSvP95" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9" />
                      </svg>
                      {translate('albums.waitingForSun.link')}
                    </a>
                  </div>
                </div>
                {/* Mawlana */}
                <div className="flex flex-col items-center">
                  <a href="https://youtu.be/x4Mh71hB9b0?si=yqgBUFW6DK8EUIdr" target="_blank" rel="noopener noreferrer">
                    <Image src="/mawlana.jpg" alt="Mawlana" width={240} height={240} className="rounded shadow transition-transform duration-300 hover:scale-105 hover:shadow-xl w-full h-auto object-contain" />
                  </a>
                  <div className="mt-4 text-center">
                    <div className="font-semibold text-gray-900">{translate('albums.mawlana.title')}</div>
                    <a href="https://youtu.be/x4Mh71hB9b0?si=yqgBUFW6DK8EUIdr" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9" />
                      </svg>
                      {translate('albums.mawlana.link')}
                    </a>
                  </div>
                </div>
                {/* Habrban */}
                <div className="flex flex-col items-center">
                  <a href="https://youtu.be/GNnFnPWzXAk?si=svuFP8o5sEJWCKSj" target="_blank" rel="noopener noreferrer">
                    <Image src="/Habrban.jpg" alt="Habrban" width={240} height={240} className="rounded shadow transition-transform duration-300 hover:scale-105 hover:shadow-xl w-full h-auto object-contain" />
                  </a>
                  <div className="mt-4 text-center">
                    <div className="font-semibold text-gray-900">{translate('albums.habrban.title')}</div>
                    <a href="https://youtu.be/GNnFnPWzXAk?si=svuFP8o5sEJWCKSj" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9" />
                      </svg>
                      {translate('albums.habrban.link')}
                    </a>
                  </div>
                </div>
                {/* Miravi */}
                <div className="flex flex-col items-center">
                  <a href="https://youtu.be/LAhzsUIc2Ok?si=PX0NmgEAkHNbB-iy" target="_blank" rel="noopener noreferrer">
                    <Image src="/Miravi.jpg" alt="Miravi" width={240} height={240} className="rounded shadow transition-transform duration-300 hover:scale-105 hover:shadow-xl w-full h-auto object-contain" />
                  </a>
                  <div className="mt-4 text-center">
                    <div className="font-semibold text-gray-900">{translate('albums.miravi.title')}</div>
                    <a href="https://youtu.be/LAhzsUIc2Ok?si=PX0NmgEAkHNbB-iy" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9" />
                      </svg>
                      {translate('albums.miravi.link')}
                    </a>
                  </div>
                </div>
                {/* Va Dobareh Bahar */}
                <div className="flex flex-col items-center">
                  <a href="https://youtu.be/CtCL3cXmxno?si=9AwLUNijLluxeOnz" target="_blank" rel="noopener noreferrer">
                    <Image src="/Va-Dobareh-Bahar.jpg" alt="Va Dobareh Bahar" width={240} height={240} className="rounded shadow transition-transform duration-300 hover:scale-105 hover:shadow-xl w-full h-auto object-contain" />
                  </a>
                  <div className="mt-4 text-center">
                    <div className="font-semibold text-gray-900">{translate('albums.vaDobarehBahar.title')}</div>
                    <a href="https://youtu.be/CtCL3cXmxno?si=9AwLUNijLluxeOnz" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9" />
                      </svg>
                      {translate('albums.vaDobarehBahar.link')}
                    </a>
                  </div>
                </div>
              </div>
              {/* Screenshot-matching albums layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                {/* Chang-e-Eshgh */}
                <div className="flex flex-col items-center">
                  <a href="https://open.spotify.com/track/0tqW4oRK1w3AzMbiNyLPof?si=QgFD8c9OQSS-5eTI2FvJXw" target="_blank" rel="noopener noreferrer">
                    <Image src="/Chang-e-Eshgh.jpg" alt="Chang-e-Eshgh" width={240} height={240} className="rounded shadow transition-transform duration-300 hover:scale-105 hover:shadow-xl w-full h-auto object-contain" />
                  </a>
                  <div className="mt-4 text-center">
                    <div className="font-semibold text-gray-900">"Chang-e-Eshgh"</div>
                    <a href="https://open.spotify.com/track/0tqW4oRK1w3AzMbiNyLPof?si=QgFD8c9OQSS-5eTI2FvJXw" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9" />
                      </svg>
                      Link: composer & Ney player: Ali Farbodnia
                    </a>
                  </div>
                </div>
                {/* Sanam-e-Nahanjar */}
                <div className="flex flex-col items-center">
                  <a href="https://open.spotify.com/track/2vs9GfwwRR1f0G3OBtfTaJ?si=I56bsGIYSeWqDVTUyiZuEw" target="_blank" rel="noopener noreferrer">
                    <Image src="/Sanam-e-Nahanjar.jpg" alt="Sanam-e-Nahanjar" width={240} height={240} className="rounded shadow transition-transform duration-300 hover:scale-105 hover:shadow-xl w-full h-auto object-contain" />
                  </a>
                  <div className="mt-4 text-center">
                    <div className="font-semibold text-gray-900">"Sanam-e-Nahanjar" Ali Ghamsari</div>
                    <div className="font-semibold">"Sanam-e-Nahanjar" Ali Ghamsari</div>
                    <a href="https://open.spotify.com/track/2vs9GfwwRR1f0G3OBtfTaJ?si=I56bsGIYSeWqDVTUyiZuEw" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9" />
                      </svg>
                      Link: Clarinet player: Ali Farbodnia
                    </a>
                  </div>
                </div>
                {/* Lullaby-Azaldi */}
                <div className="flex flex-col items-center">
                  <a href="https://www.festivalnikon.fr/en/video/2024/6296" target="_blank" rel="noopener noreferrer">
                    <Image src="/Lullaby-Azaldi.jpg" alt="Lullaby-Azaldi" width={240} height={240} className="rounded shadow transition-transform duration-300 hover:scale-105 hover:shadow-xl w-full h-auto object-contain" />
                  </a>
                  <div className="mt-4 text-center">
                    <div className="font-semibold text-gray-900">Film Score for "Lullaby-Azaldi"<br/>Directed by Aurélien Cavagna</div>
                    <a href="https://www.festivalnikon.fr/en/video/2024/6296" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9" />
                      </svg>
                      Link: Music: Ali Farbodnia
                    </a>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                {/* Moj-e-Soda */}
                <div className="flex flex-col items-center">
                  <Image src="/Moj-e-Soda.jpg" alt="Moj-e-Soda" width={240} height={240} className="rounded shadow transition-transform duration-300 hover:scale-105 hover:shadow-xl w-full h-auto object-contain" />
                  <div className="mt-4 text-center">
                    <div className="font-semibold text-gray-900">Moj-e-Soda</div>
                    <span className="block text-gray-500 text-sm mt-1">Old Music Album</span>
                  </div>
                </div>
                {/* Darius-the-Great */}
                <div className="flex flex-col items-center">
                  <a href="https://youtu.be/CT_KtiGv3qM?si=ZvYBK1Rq-BI02o1y" target="_blank" rel="noopener noreferrer">
                    <Image src="/Darius-the-Great.jpg" alt="Darius-the-Great" width={240} height={240} className="rounded shadow transition-transform duration-300 hover:scale-105 hover:shadow-xl w-full h-auto object-contain" />
                  </a>
                  <div className="mt-4 text-center">
                    <div className="font-semibold text-gray-900">Darius-the-Great composer Farya Faraji Persian</div>
                    <a href="https://youtu.be/CT_KtiGv3qM?si=ZvYBK1Rq-BI02o1y" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9" />
                      </svg>
                      Link: Ney: Ali Farbodnia
                    </a>
                  </div>
                </div>
                {/* Paeiz-Ta-Paeiz */}
                <div className="flex flex-col items-center">
                  <Image src="/Paeiz-Ta-Paeiz.jpg" alt="Paeiz-Ta-Paeiz" width={240} height={240} className="rounded shadow transition-transform duration-300 hover:scale-105 hover:shadow-xl w-full h-auto object-contain" />
                  <div className="mt-4 text-center">
                    <div className="font-semibold text-gray-900">Paeiz-Ta-Paeiz</div>
                    <span className="block text-gray-500 text-sm mt-1">Old Music Album</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 justify-items-center">
                {/* Mastanye */}
                <div className="flex flex-col items-center">
                  <a href="https://youtu.be/YMDfraipmA8?si=VLUFVQKeiAgEgt67" target="_blank" rel="noopener noreferrer">
                    <Image src="/Mastanye.jpg" alt="Mastanye" width={320} height={400} className="rounded shadow transition-transform duration-300 hover:scale-105 hover:shadow-xl w-full h-auto object-contain" />
                  </a>
                  <div className="mt-8 text-center">
                    <div className="font-semibold text-xl mb-2 text-gray-900">Film Score for "Mastanye" directed by Sharan Art (India)</div>
                    <a href="https://youtu.be/YMDfraipmA8?si=VLUFVQKeiAgEgt67" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-orange-600 font-medium">
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9' />
                      </svg>
                      Duduk player In This Film: Ali Farbodnia
                    </a>
                  </div>
                </div>
                {/* Dinesht */}
                <div className="flex flex-col items-center">
                  <Image src="/Dinesht.jpg" alt="Dinesht" width={320} height={400} className="rounded shadow transition-transform duration-300 hover:scale-105 hover:shadow-xl w-full h-auto object-contain" />
                  <div className="mt-8 text-center">
                    <div className="font-semibold text-xl mb-2 text-gray-900">Dinesht Bakhtiari folk music album</div>
                    <div className="mt-2 inline-flex items-center gap-2 text-orange-600 font-medium">
                      Ney player in Dinesht Concert: Ali Farbodnia
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Performances & Concerts Section */}
          <section id="performances" className="mt-8 sm:mt-16 scroll-mt-24 w-full">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">{translate('nav.performances')}</h2>
            <div className="border-t border-gray-200 pt-6">
              {/* Part 1: Hamnavazan e Hesar Ensemble */}
              <div className="flex flex-col md:flex-row gap-4 sm:gap-8 bg-[#f7f5f2] p-2 sm:p-6 rounded-xl shadow-md items-stretch mb-8">
                {/* Left: Info */}
                <div className="flex-1 flex flex-col justify-between bg-white rounded-lg p-6 border border-orange-100">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 text-3xl font-bold border-4 border-white shadow">01</div>
                      <div>
                        <div className="text-xl font-bold text-gray-800">{translate('performances.hesar.title')}</div>
                        <div className="text-orange-500 font-semibold text-sm mt-1">{translate('performances.hesar.subtitle')}</div>
                      </div>
                    </div>
                    <div className="text-gray-700 mb-4 text-base">
                      {translate('performances.hesar.description')}
                    </div>
                    <div className="text-orange-600 font-medium text-sm mb-2">"Sanam-e Nahanjar" Concert, Arasbaran Cultural Center, Tehran (2019)</div>
                  </div>
                  <div className="flex items-end justify-between mt-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-7 h-7'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M9 19V6.75A2.25 2.25 0 0111.25 4.5h1.5A2.25 2.25 0 0115 6.75V19m-6 0h6m-6 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 003 0' />
                      </svg>
                      <span className="text-xs">Music event</span>
                    </div>
                  </div>
                </div>
                {/* Right: Poster/Image */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full max-w-md h-[400px] flex items-center justify-center overflow-hidden">
                    <Image src="/Sanam-e-Nahaanjar.jpg" alt="Sanam-e-Nahaanjar" width={320} height={400} className="object-cover w-full h-full" />
                  </div>
                </div>
              </div>
              {/* Part 1: Additional screenshot block */}
              <div className="flex flex-col items-center bg-white rounded-xl p-8 mt-8">
                <div className="flex flex-row gap-6 w-full max-w-4xl">
                  <div className="flex-1 h-[400px] flex items-center justify-center">
                    <Image src="/Hamnavazan1.jpg" alt="Hamnavazan1" width={600} height={400} className="object-contain w-full h-full rounded" />
                  </div>
                  <div className="flex-1 h-[400px] flex items-center justify-center">
                    <Image src="/Hamnavazan2.jpg" alt="Hamnavazan2" width={600} height={400} className="object-contain w-full h-full rounded" />
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <div className="font-semibold text-xl mb-2 text-gray-900">Hamnavazan-e Hesar Ensemble</div>
                  <a href="https://youtu.be/4lw9bp_buzs?si=8WK6cUgSOE-8IGqc" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-orange-600 font-medium">
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9' />
                    </svg>
                    Link: "Sanam-e NahaAnjar" Concert, Arasbaran Cultural Center, Tehran (2019)
                  </a>
                </div>
              </div>
              {/* Part 2: Vaziri Music Orchestra */}
              <div className="flex flex-col md:flex-row gap-8 bg-[#f7f5f2] p-8 rounded-xl shadow-md items-stretch mt-12">
                {/* Left: Info */}
                <div className="flex-1 flex flex-col justify-between bg-white rounded-lg p-6 border border-orange-100">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 text-3xl font-bold border-4 border-white shadow">02</div>
                      <div>
                        <div className="text-xl font-bold text-gray-800">{translate('performances.vaziri.title')}</div>
                        <div className="text-orange-500 font-semibold text-sm mt-1">{translate('performances.vaziri.subtitle')}</div>
                      </div>
                    </div>
                    <div className="text-gray-700 mb-4 text-base">
                      {translate('performances.vaziri.description')}
                    </div>
                  </div>
                  <div className="flex flex-row gap-6 justify-center mt-4">
                    <div className="w-[360px] h-[240px] flex items-center justify-center">
                      <Image src="/news1.jpg" alt="Vaziri News 1" width={360} height={240} className="object-contain w-full h-full rounded" />
                    </div>
                    <div className="w-[360px] h-[240px] flex items-center justify-center">
                      <Image src="/news2.jpg" alt="Vaziri News 2" width={360} height={240} className="object-contain w-full h-full rounded" />
                    </div>
                  </div>
                </div>
                {/* Right: Poster/Image and below info */}
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-full max-w-md h-[400px] flex items-center justify-center overflow-hidden mb-4">
                    <Image src="/VAZIRI.jpg" alt="Vaziri Music Orchestra Poster" width={320} height={400} className="object-contain w-full h-full" />
                  </div>
                  <div className="font-semibold text-xl mb-2 text-gray-900">{translate('performances.vaziri.title')}</div>
                  <div className="text-orange-600 font-medium text-base">{translate('performances.vaziri.concerts')}</div>
                </div>
              </div>
              {/* Part 2: Additional screenshot block */}
              <div className="flex flex-col items-center bg-white rounded-xl p-8 mt-8">
                <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
                  <div className="flex-1 h-[400px] flex items-center justify-center">
                    <Image src="/Neyshabur.jpg" alt="Neyshabur Concert" width={600} height={400} className="object-contain w-full h-full rounded" />
                  </div>
                  <div className="flex-1 h-[400px] flex items-center justify-center">
                    <Image src="/Tehran.jpg" alt="Tehran Concert" width={600} height={400} className="object-contain w-full h-full rounded" />
                  </div>
                </div>
                <div className="mt-8 text-center max-w-3xl text-gray-700">
                  {translate('performances.vaziri.participation')}
                </div>
                <div className="mt-4 inline-flex items-center gap-2 text-orange-600 font-medium text-base">
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9' />
                  </svg>
                  <a href="https://youtu.be/RVtxbmV61q4?si=8WRlnLPBBX4nDwmW" target="_blank" rel="noopener noreferrer" className="hover:underline">Link: Simorgh Hall, Neyshabur (2009)</a> <span className='mx-2'>and</span> Vahdat Hall, Tehran (2020)
                </div>
              </div>
              {/* Part 3: Fajr Festival */}
              <div className="flex flex-col md:flex-row gap-8 bg-[#f7f5f2] p-8 rounded-xl shadow-md items-stretch mt-12">
                {/* Left: Info */}
                <div className="flex-1 flex flex-col justify-between bg-white rounded-lg p-6 border border-orange-100">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 text-3xl font-bold border-4 border-white shadow">03</div>
                      <div>
                        <div className="text-xl font-bold text-gray-800">{translate('performances.fajr.title')}</div>
                        <div className="text-orange-500 font-semibold text-sm mt-1">{translate('performances.fajr.subtitle')}</div>
                      </div>
                    </div>
                    <div className="text-gray-700 mb-4 text-base">
                      {translate('performances.fajr.description')}
                    </div>
                    <div className="text-orange-600 font-medium text-sm mb-2">{translate('performances.fajr.event')}</div>
                  </div>
                </div>
                {/* Right: Poster/Image and below info */}
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-full max-w-xl h-[400px] flex items-center justify-center overflow-hidden">
                    <Image src="/Khonyagaran-e-Khayyam.jpg" alt="Khonyagaran-e-Khayyam Ensemble" width={320} height={400} className="object-contain w-full h-full" />
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 text-orange-600 font-medium text-base">
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9' />
                    </svg>
                    <a href="https://youtu.be/iiWrVc084hE?si=2QoF-QYL2kuQKF1Y" target="_blank" rel="noopener noreferrer" className="hover:underline">{translate('performances.fajr.event')}</a>
                  </div>
                </div>
              </div>
              {/* Part 3: Additional screenshot block */}
              <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow p-8 mt-8 items-stretch">
                {/* Left: Two stacked images */}
                <div className="flex-1 flex flex-col gap-6">
                  <div className="w-full h-[300px] flex items-center justify-center overflow-hidden">
                    <Image src="/Ali-fajr.jpg" alt="Ali Farbodnia at Fajr Festival" width={600} height={300} className="object-contain w-full h-full" />
                  </div>
                  <div className="w-full h-[300px] flex items-center justify-center overflow-hidden">
                    <Image src="/Ali-fajr2.jpg" alt="Ali Farbodnia performing at Fajr Festival" width={600} height={300} className="object-contain w-full h-full" />
                  </div>
                </div>
                {/* Right: Large image */}
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-full h-[620px] flex items-center justify-center overflow-hidden mb-4">
                    <Image src="/Ali-fajr3.jpg" alt="Ali Farbodnia with ensemble at Fajr Festival" width={600} height={620} className="object-contain w-full h-full" />
                  </div>
                  <div className="text-center max-w-2xl mx-auto">
                    <div className="font-medium text-lg mb-1 text-gray-900">"Traditional Iranian Music"</div>
                    <div className="text-gray-700">34th Fajr International Music Festival, Azadi Hall, Tehran (2019)</div>
                  </div>
                </div>
              </div>
              {/* Part 4: Mugham Festival */}
              <div className="flex flex-col md:flex-row gap-8 bg-[#f7f5f2] p-8 rounded-xl shadow-md items-stretch mt-12">
                {/* Left: Info */}
                <div className="flex-1 flex flex-col justify-between bg-white rounded-lg p-8 border border-orange-100">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-20 h-20 flex items-center justify-center rounded-full border-4 border-orange-200 bg-white text-orange-500 text-4xl font-bold shadow">04</div>
                      <div>
                        <div className="text-2xl font-bold text-gray-800 tracking-tight">{translate('performances.mugham.title')}</div>
                        <div className="text-orange-500 font-semibold text-base mt-1 uppercase tracking-wide">{translate('performances.mugham.subtitle')}</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4 text-gray-700 text-base shadow-inner border border-gray-100">
                      {translate('performances.mugham.description')}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-8 text-orange-600 font-medium text-base">
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9' />
                    </svg>
                    <a href="https://youtu.be/iiWrVc084hE?si=2QoF-QYL2kuQKF1Y" target="_blank" rel="noopener noreferrer" className="hover:underline">{translate('performances.mugham.event')}</a>
                  </div>
                </div>
                {/* Right: Poster/Image */}
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-full max-w-2xl h-[520px] flex items-center justify-center text-gray-400 overflow-hidden">
                    <Image src="/Mugham.jpg" alt="Mugham Festival Poster" width={900} height={520} className="object-contain w-full h-full" />
                  </div>
                </div>
              </div>
              {/* Part 4: Additional screenshot block */}
              <div className="bg-white rounded-xl shadow p-8 mt-8 flex flex-col items-center">
                {/* Top: Large image */}
                <div className="w-full max-4xl h-[480px] flex items-center justify-center text-gray-400 mb-8">
                  <Image src="/Mugham1.jpg" alt="Mugham Festival Performance 1" width={900} height={480} className="object-contain w-full h-full" />
                </div>
                {/* Bottom row: two images and center text */}
                <div className="flex flex-col md:flex-row w-full max-w-4xl gap-6 items-center mb-8">
                  <div className="flex-1 h-[180px] flex items-center justify-center text-gray-400">
                    <Image src="/Mugham2.jpg" alt="Mugham Festival Performance 2" width={400} height={180} className="object-contain w-full h-full" />
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="bg-gray-50 rounded-lg px-6 py-4 shadow-inner border border-gray-100 text-center">
                      <div className="font-medium text-lg mb-1">"Traditional Iranian Music"</div>
                      <div className="text-gray-700">Mugham International Music Festival, Azerbaijan (2017)</div>
                    </div>
                  </div>
                  <div className="flex-1 h-[180px] flex items-center justify-center text-gray-400">
                    <Image src="/Mugham3.jpg" alt="Mugham Festival Performance 3" width={400} height={180} className="object-contain w-full h-full" />
                  </div>
                </div>
              </div>
              {/* Part 5: The Best of Master Mohamadreza Lotfi */}
              <div className="flex flex-col md:flex-row gap-8 bg-[#f7f5f2] p-8 rounded-xl shadow-md items-stretch mt-12">
                {/* Left: Info */}
                <div className="flex-1 flex flex-col justify-between bg-white rounded-lg p-8 border border-orange-100 min-w-[320px] max-w-lg">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-20 h-20 flex items-center justify-center rounded-full border-4 border-orange-200 bg-white text-orange-500 text-4xl font-bold shadow">05</div>
                      <div>
                        <div className="text-2xl font-bold text-gray-800 tracking-tight">{translate('performances.lotfi.title')}</div>
                        <div className="text-orange-500 font-semibold text-base mt-1 uppercase tracking-wide">{translate('performances.lotfi.subtitle')}</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4 text-gray-700 text-base shadow-inner border border-gray-100">
                      <span className="font-bold">{translate('performances.lotfi.title')}</span><br/>
                      {translate('performances.lotfi.description')}
                    </div>
                  </div>
                  <div className="flex items-end justify-between mt-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-7 h-7'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M9 19V6.75A2.25 2.25 0 0111.25 4.5h1.5A2.25 2.25 0 0115 6.75V19m-6 0h6m-6 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 003 0' />
                      </svg>
                      <span className="text-xs">2017 Tehran</span>
                    </div>
                  </div>
                </div>
                {/* Right: Poster/Image */}
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-full max-w-xl h-[500px] flex items-center justify-center overflow-hidden">
                    <Image src="/Lotfi.jpg" alt="Poster for The Best of Master Mohamadreza Lotfi" width={600} height={500} className="object-contain w-full h-full" />
                  </div>
                </div>
              </div>
              {/* Part 5: Additional screenshot block */}
              <div className="bg-white rounded-xl shadow p-8 mt-8 flex flex-col md:flex-row gap-8 items-stretch">
                {/* Left column: Top image and text box */}
                <div className="flex-1 flex flex-col gap-6 min-w-[320px] max-w-xl">
                  <div className="w-full h-[360px] flex items-center justify-center">
                    <Image src="/Lotfi1.jpg" alt="Lotfi Performance 1" width={700} height={360} className="object-contain w-full h-full" />
                  </div>
                  <div className="bg-[#f7f5f2] border-l-4 border-orange-400 rounded-lg p-6 shadow-inner text-gray-700">
                    <div className="text-orange-500 font-semibold text-lg mb-2 uppercase tracking-wide">{translate('performances.lotfi.contributions.title')}</div>
                    <div className="text-base">
                      {translate('performances.lotfi.contributions.text')}
                    </div>
                  </div>
                </div>
                {/* Right column: Event title/bar and image */}
                <div className="flex-1 flex flex-col gap-6 min-w-[320px] max-w-xl">
                  <div className="flex flex-col items-end mb-2">
                    <div className="text-right">
                      <div className="font-medium text-lg text-gray-900">"Traditional Iranian Music"<br/>The Best of master mohamadreza lotfi<br/>2017 Tehran</div>
                    </div>
                    <div className="w-40 h-6 bg-orange-400 rounded mt-2" />
                  </div>
                  <div className="w-full h-[360px] flex items-center justify-center">
                    <Image src="/Lotfi2.jpg" alt="Lotfi Performance 2" width={700} height={360} className="object-contain w-full h-full" />
                  </div>
                </div>
              </div>

              {/* Part 6: Feyksahne Tar Band */}
              <div className="flex flex-col md:flex-row gap-8 bg-[#f7f5f2] p-8 rounded-xl shadow-md items-stretch mt-12">
                {/* Left: Info and accent */}
                <div className="flex-1 flex flex-col justify-between bg-white rounded-lg p-8 border-l-8 border-orange-400 min-w-[320px] max-w-lg">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-20 h-20 flex items-center justify-center rounded-full border-4 border-orange-200 bg-white text-orange-500 text-4xl font-bold shadow">06</div>
                      <div>
                        <div className="text-2xl font-bold text-gray-800 tracking-tight">{translate('performances.feyksahne.title')}</div>
                        <div className="text-orange-500 font-semibold text-base mt-1 uppercase tracking-wide">{translate('performances.feyksahne.subtitle')}</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4 text-gray-700 text-base shadow-inner border border-gray-100">
                      {translate('performances.feyksahne.description')}
                    </div>
                  </div>
                </div>
                {/* Right: Two stacked images */}
                <div className="flex-1 flex flex-col gap-8 items-center justify-center">
                  <div className="w-full max-w-2xl h-[340px] bg-white p-2" style={{ border: '2px solid #eee' }}>
                    <Image src="/Feyksahne1.jpg" alt="Feyksahne Tar Band Performance 1" width={700} height={340} className="object-cover w-full h-full" />
                  </div>
                  <div className="w-full max-w-2xl h-[340px] bg-white p-2" style={{ border: '2px solid #eee' }}>
                    <Image src="/Feyksahne2.jpg" alt="Feyksahne Tar Band Performance 2" width={700} height={340} className="object-cover w-full h-full" />
                  </div>
                </div>
              </div>
              {/* Part 6: Additional screenshot block (2nd block) */}
              <div className="bg-white rounded-xl shadow p-8 mt-8 flex flex-col items-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
                  <div className="bg-white p-2" style={{ border: '2px solid #eee' }}>
                    <Image src="/Feyksahne3.jpg" alt="Feyksahne Tar Band 3" width={500} height={280} className="object-cover w-full h-full" />
                  </div>
                  <div className="bg-white p-2" style={{ border: '2px solid #eee' }}>
                    <Image src="/Feyksahne4.jpg" alt="Feyksahne Tar Band 4" width={500} height={280} className="object-cover w-full h-full" />
                  </div>
                  <div className="bg-white p-2" style={{ border: '2px solid #eee' }}>
                    <Image src="/Feyksahne5.jpg" alt="Feyksahne Tar Band 5" width={500} height={280} className="object-cover w-full h-full" />
                  </div>
                  <div className="bg-white p-2" style={{ border: '2px solid #eee' }}>
                    <Image src="/Feyksahne6.jpg" alt="Feyksahne Tar Band 6" width={500} height={280} className="object-cover w-full h-full" />
                  </div>
                  <div className="bg-white p-2" style={{ border: '2px solid #eee' }}>
                    <Image src="/Feyksahne7.jpg" alt="Feyksahne Tar Band 7" width={500} height={280} className="object-cover w-full h-full" />
                  </div>
                  <div className="bg-white p-2" style={{ border: '2px solid #eee' }}>
                    <Image src="/Feyksahne8.jpg" alt="Feyksahne Tar Band 8" width={500} height={280} className="object-cover w-full h-full" />
                  </div>
                </div>
                <div className="mt-8 flex items-center gap-2 text-orange-600 font-medium text-base">
                  <FaLink className="w-5 h-5" />
                  <a href="https://youtu.be/N0TYb0xg63Y?si=aprNyKITfFGURtLK" target="_blank" rel="noopener noreferrer" className="hover:underline">Link: Feyksahne Tar Band, Istanbul Concert, 2024. Ali Farbodnia</a>
                </div>
              </div>
              {/* Part 6: Additional screenshot block (3rd block) */}
              <div className="bg-white rounded-xl shadow p-8 mt-8">
                <div className="w-full mb-8">
                  <div className="text-center text-xl md:text-2xl font-semibold uppercase tracking-wide text-orange-500 border-b-2 border-orange-300 pb-4" style={{letterSpacing: '0.04em'}}>
                    DAR HAMIN HAVALI-MASHAD CONCERT-2020 TAR BAND
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-8 items-stretch">
                  {/* Left: Large image */}
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-2xl h-[520px] bg-white p-2 flex items-center justify-center" style={{ border: '2px solid #eee' }}>
                      <Image src="/Hamin-Havali1.jpg" alt="Dar Hamin Havali Mashad Concert 2020" width={520} height={520} className="object-cover w-full h-full" />
                    </div>
                  </div>
                  {/* Right: Poster and two images below */}
                  <div className="flex-1 flex flex-col gap-8">
                    <div className="w-full h-[500px] bg-white p-2 flex items-center justify-center" style={{ border: '2px solid #eee' }}>
                      <Image src="/Hamin-Havali2.jpg" alt="Hamin Havali Poster" width={500} height={500} className="object-contain w-full h-full" />
                    </div>
                    <div className="flex flex-row gap-8">
                      <div className="flex-1 h-[320px] bg-white p-2 flex items-center justify-center" style={{ border: '2px solid #eee' }}>
                        <Image src="/Hamin-Havali3.jpg" alt="Hamin Havali 3" width={320} height={320} className="object-contain w-full h-full" />
                      </div>
                      <div className="flex-1 h-[320px] bg-white p-2 flex items-center justify-center" style={{ border: '2px solid #eee' }}>
                        <Image src="/Hamin-Havali4.jpg" alt="Hamin Havali 4" width={320} height={320} className="object-contain w-full h-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Part 6: Additional screenshot block (4th block) */}
              <div className="bg-white rounded-xl shadow p-8 mt-8">
                <div className="w-full mb-8">
                  <div className="text-center text-xl md:text-2xl font-semibold uppercase tracking-wide text-orange-500 border-b-2 border-orange-300 pb-4" style={{letterSpacing: '0.04em'}}>
                    TIGRAN FESTIVAL-CANADA 2022
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-8 items-stretch">
                  {/* Left: Two stacked images */}
                  <div className="flex-1 flex flex-col gap-8 justify-center">
                    <div className="w-full h-[320px] bg-white p-2 flex items-center justify-center" style={{ border: '2px solid #eee' }}>
                      <Image src="/Tirgan2.jpg" alt="Tirgan Festival Top" width={400} height={320} className="object-contain w-full h-full" />
                    </div>
                    <div className="w-full h-[320px] bg-white p-2 flex items-center justify-center" style={{ border: '2px solid #eee' }}>
                      <Image src="/Tirgan3.jpg" alt="Tirgan Festival Bottom" width={400} height={320} className="object-contain w-full h-full" />
                    </div>
                  </div>
                  {/* Right: Large image */}
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-full h-[660px] bg-white p-2 flex items-center justify-center" style={{ border: '2px solid #eee' }}>
                      <Image src="/Tirgan1.jpg" alt="Tirgan Festival Main" width={500} height={660} className="object-contain w-full h-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Part 7: Sohreh Music Group */}
              <div className="flex flex-col md:flex-row gap-8 bg-[#f7f5f2] p-8 rounded-xl shadow-md items-stretch mt-12">
                {/* Left: Info */}
                <div className="flex-1 flex flex-col justify-between bg-white rounded-lg p-8 border-l-8 border-orange-400 min-w-[320px] max-w-lg">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-20 h-20 flex items-center justify-center rounded-full border-4 border-orange-200 bg-white text-orange-500 text-4xl font-bold shadow">07</div>
                      <div>
                        <div className="text-2xl font-bold text-gray-800 tracking-tight">{translate('performances.sohreh.title')}</div>
                        <div className="text-orange-500 font-semibold text-base mt-1 uppercase tracking-wide">{translate('performances.sohreh.subtitle')}</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4 text-gray-700 text-base shadow-inner border border-gray-100">
                      {translate('performances.sohreh.description')}
                    </div>
                  </div>
                </div>
                {/* Right: Two stacked images */}
                <div className="flex-1 flex flex-col gap-8 items-center justify-center">
                  <div className="w-full max-w-2xl h-[340px] bg-white p-2" style={{ border: '2px solid #eee' }}>
                    <Image src="/Sohre1.jpg" alt="Sohreh Music Group Performance 1" width={700} height={340} className="object-cover w-full h-full" />
                  </div>
                  <div className="w-full max-w-2xl h-[340px] bg-white p-2" style={{ border: '2px solid #eee' }}>
                    <Image src="/Sohre2.jpg" alt="Sohreh Music Group Performance 2" width={700} height={340} className="object-cover w-full h-full" />
                  </div>
                </div>
              </div>
              {/* Part 7: Additional screenshot block */}
              <div className="bg-white rounded-xl shadow p-8 mt-8 flex flex-col md:flex-row gap-8 items-stretch">
                {/* Left: Poster image (larger, natural aspect) */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full max-w-lg max-h-[650px] aspect-[7/10] bg-white p-2 flex items-center justify-center" style={{ border: '2px solid #eee' }}>
                    <Image src="/Sohre3.jpg" alt="Sohreh Music Group Poster" fill={false} width={420} height={600} className="object-contain max-h-[600px] max-w-full" />
                  </div>
                </div>
                {/* Right: Two stacked images and link below (natural aspect) */}
                <div className="flex-1 flex flex-col items-center justify-center gap-6">
                  <div className="w-full flex flex-col gap-6">
                    <div className="w-full max-w-xl max-h-[300px] aspect-video bg-white p-2 flex items-center justify-center" style={{ border: '2px solid #eee' }}>
                      <Image src="/Sohre4.jpg" alt="Sohreh Music Group Performance 3" fill={false} width={480} height={270} className="object-contain max-h-[270px] max-w-full" />
                    </div>
                    <div className="w-full max-w-xl max-h-[300px] aspect-video bg-white p-2 flex items-center justify-center" style={{ border: '2px solid #eee' }}>
                      <Image src="/Sohre5.jpg" alt="Sohreh Music Group Performance 4" fill={false} width={480} height={270} className="object-contain max-h-[270px] max-w-full" />
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-orange-600 font-medium text-base">
                    <FaLink className="w-5 h-5" />
                    <a href="https://youtu.be/g4yjfrTKLGc?si=wsJK4eJRSF_Gax2K" target="_blank" rel="noopener noreferrer" className="hover:underline">Link: Sohreh Music Band-Izmir (2022)</a>
                  </div>
                </div>
              </div>

              {/* Part 8: Alest Music Group */}
              <div className="flex flex-col md:flex-row gap-8 bg-[#f7f5f2] p-8 rounded-xl shadow-md items-stretch mt-12">
                {/* Left: Info */}
                <div className="flex-1 flex flex-col justify-between bg-white rounded-lg p-8 border-l-8 border-orange-400 min-w-[320px] max-w-lg">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-20 h-20 flex items-center justify-center rounded-full border-4 border-orange-200 bg-white text-orange-500 text-4xl font-bold shadow">08</div>
                      <div>
                        <div className="text-2xl font-bold text-gray-800 tracking-tight">{translate('performances.alest.title')}</div>
                        <div className="text-orange-500 font-semibold text-base mt-1 uppercase tracking-wide">{translate('performances.alest.subtitle')}</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4 text-gray-700 text-base shadow-inner border border-gray-100">
                      {translate('performances.alest.description')}
                    </div>
                  </div>
                </div>
                {/* Right: Poster image */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full max-w-xl bg-white p-4 rounded-lg shadow-lg border border-gray-200 flex items-center justify-center">
                    <Image src="/Alast.jpg" alt="Alest Music Group Poster" width={500} height={650} className="object-contain w-full h-full" />
                  </div>
                </div>
              </div>
              {/* Part 8: Additional screenshot block */}
              <div className="bg-white rounded-xl shadow p-8 mt-8 flex flex-col gap-8 items-stretch">
                {/* Top: Centered image on tan background */}
                <div className="w-full flex justify-center items-center bg-[#e2a96b] py-6 rounded-t-xl">
                  <div className="bg-white p-2 rounded shadow-lg" style={{ border: '4px solid #fff' }}>
                    <Image src="/Alast1.jpg" alt="Alest Music Group Outdoor" width={600} height={400} className="object-contain max-h-[400px] max-w-full" />
                  </div>
                </div>
                {/* Bottom: Two images side by side on light tan background */}
                <div className="w-full flex flex-row gap-8 bg-[#f7e7d3] py-6 px-2 rounded-b-xl justify-center">
                  <div className="flex-1 flex items-center justify-center">
                    <div className="bg-white p-2 rounded shadow-lg" style={{ border: '4px solid #fff' }}>
                      <Image src="/Alast2.jpg" alt="Alest Music Group Indoor 1" width={400} height={220} className="object-contain max-h-[220px] max-w-full" />
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="bg-white p-2 rounded shadow-lg" style={{ border: '4px solid #fff' }}>
                      <Image src="/Alast3.jpg" alt="Alest Music Group Indoor 2" width={400} height={220} className="object-contain max-h-[220px] max-w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section - Fiverr Reviews */}
          <section id="testimonials" className="mt-12 sm:mt-20 scroll-mt-24 w-full flex flex-col items-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h2 className="text-3xl font-bold text-gray-900 text-center">{translate('testimonials.title')}</h2>
              <a href="https://www.fiverr.com/farbodnia" title="Fiverr" target="_blank" rel="noopener noreferrer" className="ml-2 flex items-center gap-1 px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white font-semibold text-sm shadow transition">
                <FaLink className="w-5 h-5" /> Fiverr
              </a>
            </div>
            <div className="flex justify-center mb-6 w-full">
              <Image src="/ReviewFiverr.jpg" alt="Fiverr Profile Screenshot" width={480} height={160} className="rounded-xl shadow-lg object-contain w-full max-w-xl h-auto" />
            </div>
            <div className="relative w-full flex justify-center items-center">
              <button onClick={goTestimonialLeft} aria-label="Previous review" className="absolute left-0 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 shadow z-10 disabled:opacity-40" style={{left: '-2rem'}}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <div className="flex gap-6 w-full max-w-3xl justify-center">
                {testimonialVisible.map((review, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-lg p-2 flex flex-col items-center w-full max-w-lg border border-orange-100 cursor-pointer transition-transform hover:scale-105" onClick={() => setTestimonialModal(review)}>
                    <img src={review.src} alt={review.alt} className="rounded-lg object-contain w-full h-56 mb-2 border" />
                  </div>
                ))}
              </div>
              <button onClick={goTestimonialRight} aria-label="Next review" className="absolute right-0 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 shadow z-10 disabled:opacity-40" style={{right: '-2rem'}}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            {/* Modal for full-size review */}
            {testimonialModal && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70" onClick={closeTestimonialModal}>
                <div className="relative max-w-2xl w-full p-4" onClick={e => e.stopPropagation()}>
                  <button onClick={closeTestimonialModal} className="absolute top-2 right-2 bg-white rounded-full p-2 shadow text-orange-600 hover:bg-orange-100 z-10" aria-label="Close">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                  <img src={testimonialModal.src} alt={testimonialModal.alt} className="rounded-lg object-contain w-full max-h-[80vh] border bg-white" />
                </div>
              </div>
            )}
          </section>
          {/* Contact Section - Thank You & Ways to Contact */}
          <section id="contact" className="mt-8 sm:mt-16 scroll-mt-24 w-full">
            {/* Top orange accent bars */}
            <div className="w-full flex flex-col">
              <div className="h-4 w-full bg-orange-300" />
              <div className="h-4 w-full bg-orange-600" />
              <div className="h-4 w-full bg-orange-400" />
            </div>
            <div className="flex flex-col items-center justify-center py-8 sm:py-16 px-2 sm:px-4 bg-white border border-orange-200 rounded-b-2xl">
              <div className="text-3xl sm:text-[3rem] md:text-[4rem] font-bold mb-4 text-center text-gray-900" style={{ fontFamily: 'cursive, Brush Script MT, Segoe Script, sans-serif' }}>
                {translate('contact.thankYou')}
              </div>
              <hr className="w-2/3 max-w-lg border-gray-400 my-6" />
              <div className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 text-center text-gray-900" style={{ fontFamily: 'cursive, Brush Script MT, Segoe Script, sans-serif' }}>
                {translate('contact.waysToContact')}
              </div>
              <div className="flex flex-col gap-4 text-base sm:text-lg md:text-xl font-medium w-full max-w-md">
                <div className="flex items-center gap-4 justify-center">
                  <span className="bg-orange-500 text-white rounded-full p-2 text-2xl flex items-center justify-center"><FaEnvelope /></span>
                  <a href="mailto:a.farbodnia@gmail.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-orange-600 transition-colors break-all">{translate('contact.email')}</a>
                </div>
                <div className="flex items-center gap-4 justify-center">
                  <span className="bg-orange-500 text-white rounded-full p-2 text-2xl flex items-center justify-center"><FaYoutube /></span>
                  <a href="https://youtube.com/@alifarbodnia?si=brU9QaL-TaX8eqCF" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-orange-600 transition-colors break-all">{translate('contact.youtube')}</a>
                </div>
                <div className="flex items-center gap-4 justify-center">
                  <span className="bg-orange-500 text-white rounded-full p-2 text-2xl flex items-center justify-center"><FaInstagram /></span>
                  <a href="https://www.instagram.com/alifarbodnia/profilecard/?igsh=MXI3Z2xyd2h4cTNobQ==" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-orange-600 transition-colors break-all">{translate('contact.instagram')}</a>
                </div>
                <div className="flex items-center gap-4 justify-center">
                  <span className="bg-orange-500 text-white rounded-full p-2 text-2xl flex items-center justify-center"><FaLink /></span>
                  <a href="https://www.fiverr.com/farbodnia" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-orange-600 transition-colors break-all">{translate('contact.fiverr')}</a>
                </div>
                <div className="flex items-center gap-4 justify-center">
                  <span className="bg-orange-500 text-white rounded-full p-2 text-2xl flex items-center justify-center"><FaSpotify /></span>
                  <a href="https://open.spotify.com/artist/7s8YtMTj8iNp9PUVX3a3CS?si=EtS7qZmJTsaCvVXtKuHQCQ" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-orange-600 transition-colors break-all">{translate('contact.spotify')}</a>
                </div>
              </div>
            </div>
            {/* Bottom orange accent bars */}
            <div className="w-full flex flex-col mt-8">
              <div className="h-8 w-full bg-orange-300" />
              <div className="h-4 w-full bg-orange-700" />
              <div className="h-8 w-full bg-orange-400" />
            </div>
          </section>
        </div>
      </div>
      <style jsx global>{`
      html {
        scroll-behavior: smooth;
      }
      `}</style>
      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  );
}

function BackToTopButton() {
    const [show, setShow] = useState(false);
    // Show button after scrolling 300px
    useEffect(() => {
      const onScroll = () => setShow(window.scrollY > 300);
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return show ? (
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-50 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg p-3 md:p-4 transition-all"
        aria-label="Back to top"
      >
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    ) : null;
  }