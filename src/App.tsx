import React, { useState, useEffect, useMemo } from 'react';
import {
  Zap,
  Cpu,
  HeartPulse,
  Sliders,
  Grid,
} from 'lucide-react';
import { DomainItem, Language } from './types';
import { PORTFOLIO_DOMAINS, PORTFOLIO_SECTIONS } from './data/domains';
import { getT } from './data/translations';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { DomainCard } from './components/DomainCard';
import { DomainSlider } from './components/DomainSlider';
import { DomainModal } from './components/DomainModal';
import { ContactSection } from './components/ContactSection';
import { AtomFaqSection } from './components/AtomFaqSection';
import { Footer } from './components/Footer';

export default function App() {
  const [language, setLanguage] = useState<Language>('ar');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [displayMode, setDisplayMode] = useState<'slider' | 'grid'>('slider');

  // Modal state for "Make an Offer"
  const [offerModalDomain, setOfferModalDomain] = useState<DomainItem | null>(null);
  const [contactInitialDomain, setContactInitialDomain] = useState<string>('');

  const t = getT(language);
  const isAr = language === 'ar';

  // Synchronize document dir and lang attribute
  useEffect(() => {
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isAr]);

  // Filtered domains logic
  const filteredDomains = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return PORTFOLIO_DOMAINS.filter((domain) => {
      if (selectedCategory !== 'all' && domain.sectionId !== selectedCategory) {
        return false;
      }
      if (!query) return true;

      const nameMatch = domain.name.toLowerCase().includes(query);
      const subEnMatch = domain.subtext.en.toLowerCase().includes(query);
      const subArMatch = domain.subtext.ar.toLowerCase().includes(query);
      const typeMatch = domain.type.toLowerCase().includes(query);

      return nameMatch || subEnMatch || subArMatch || typeMatch;
    });
  }, [searchQuery, selectedCategory]);

  // Filtered sections logic
  const filteredSections = useMemo(() => {
    return PORTFOLIO_SECTIONS.map((section) => {
      const sectionDomains = filteredDomains.filter((d) => d.sectionId === section.id);
      return {
        ...section,
        domains: sectionDomains,
      };
    }).filter((section) => section.domains.length > 0);
  }, [filteredDomains]);

  const handleMakeOffer = (domain: DomainItem) => {
    setOfferModalDomain(domain);
    setContactInitialDomain(domain.name);
  };

  const handleScrollToContact = () => {
    const el = document.getElementById('contact-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-[#8A1538]/20 selection:text-[#8A1538] ${
        isAr ? 'font-arabic' : 'font-sans'
      }`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Header with Qatar Maroon Top Line and Doha Live Clock */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onOpenContact={handleScrollToContact}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* Hero Section: Clean & Focused without redundant contact buttons */}
        <section className="relative overflow-hidden bg-white py-10 sm:py-14 border-b border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            {/* Main Platform Title */}
            <div className="inline-block">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight sm:leading-tight">
                {isAr ? (
                  <>
                    منصة النطاقات <span className="text-[#560018]">القطرية والعالمية والمتميزة</span>
                  </>
                ) : (
                  <>
                    Qatar & Global <span className="text-[#560018]">Premium Domains Platform</span>
                  </>
                )}
              </h1>
            </div>

            {/* Subtitle */}
            <p className="mx-auto mt-4 max-w-3xl text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
              {t.portfolioSubtitle}
            </p>

            {/* Search and Category Filter */}
            <div className="mt-8 mx-auto max-w-2xl" id="inventory-section">
              <SearchBar
                language={language}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
                resultsCount={filteredDomains.length}
                totalCount={PORTFOLIO_DOMAINS.length}
              />
            </div>
          </div>
        </section>

        {/* Domains Showcase Area */}
        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
            {/* View Mode Switcher: OpenSooq Slider vs Grid View */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#8A1538]" />
                <span className="text-sm font-bold text-slate-800">
                  {isAr ? 'معرض النطاقات الحصرية' : 'Exclusive Domain Showcase'}
                </span>
              </div>

              {/* Slider / Grid Toggle Buttons */}
              <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setDisplayMode('slider')}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    displayMode === 'slider'
                      ? 'bg-[#8A1538] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title={isAr ? 'عرض سلايدر متحرك' : 'Slider View'}
                >
                  <Sliders className="h-3.5 w-3.5" />
                  <span>{isAr ? 'سلايدر متحرك' : 'Slider'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDisplayMode('grid')}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    displayMode === 'grid'
                      ? 'bg-[#8A1538] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title={isAr ? 'عرض شبكة الأقسام' : 'Grid View'}
                >
                  <Grid className="h-3.5 w-3.5" />
                  <span>{isAr ? 'شبكة الأقسام' : 'Grid'}</span>
                </button>
              </div>
            </div>

            {/* If Slider Mode is active, render the OpenSooq-style Slider */}
            {displayMode === 'slider' && (
              <div className="animate-in fade-in duration-300">
                <DomainSlider
                  domains={filteredDomains.length > 0 ? filteredDomains : PORTFOLIO_DOMAINS}
                  language={language}
                  onMakeOffer={handleMakeOffer}
                />
              </div>
            )}

            {/* Categorized Grid View */}
            {(displayMode === 'grid' || filteredDomains.length === 0) && (
              <div>
                {filteredSections.length === 0 ? (
                  /* No Search Results */
                  <div className="py-16 text-center rounded-2xl border border-slate-200 bg-white p-8 space-y-4">
                    <p className="text-slate-600 font-semibold text-base">{t.noDomainsFound}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                      className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      {t.resetSearch}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-12 sm:space-y-16">
                    {filteredSections.map((section) => {
                      const title = isAr ? section.title.ar : section.title.en;
                      const subtitle = isAr ? section.subtitle.ar : section.subtitle.en;

                      const SectionIcon =
                        section.id === 'clean-energy'
                          ? Zap
                          : section.id === 'ai'
                          ? Cpu
                          : HeartPulse;

                      return (
                        <div
                          key={section.id}
                          id={`section-${section.id}`}
                          className="scroll-mt-24 space-y-5"
                        >
                          {/* Section Header with Qatar Maroon */}
                          <div className="border-b border-slate-200 pb-3">
                            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#8A1538] uppercase">
                              <SectionIcon className="h-4 w-4 text-[#8A1538]" />
                              <span>{isAr ? `القسم ${section.number}` : `SECTION ${section.number}`}</span>
                            </div>
                            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                              {title}
                            </h2>
                            <p className="mt-1 text-sm text-slate-600 max-w-3xl font-medium">
                              {subtitle}
                            </p>
                          </div>

                          {/* Domain Boxes / Cards Grid with specific visual images */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {section.domains.map((domain) => (
                              <DomainCard
                                key={domain.id}
                                domain={domain}
                                language={language}
                                onMakeOffer={handleMakeOffer}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Atom.com Secure Acquisition FAQ Section */}
            <AtomFaqSection language={language} />

            {/* Direct Contact & Inquiries Section */}
            <div className="mt-14">
              <ContactSection
                language={language}
                initialDomainName={contactInitialDomain}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Make an Offer Modal */}
      <DomainModal
        domain={offerModalDomain}
        isOpen={!!offerModalDomain}
        onClose={() => setOfferModalDomain(null)}
        language={language}
      />

      {/* Clean Footer */}
      <Footer language={language} />
    </div>
  );
}
