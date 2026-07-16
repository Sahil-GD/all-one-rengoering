import { type Locale } from '@/i18n/routing';
import { type MediaRef } from '@/content/home';
import { type ServiceSlug } from '@/lib/schemas/quote';

/**
 * Service detail content — original copy for All One Rengøring.
 * Business STRUCTURE informed by market research; no competitor text,
 * prices, or claims are reproduced. Unverifiable claims carry [BEKRÆFT].
 */
export interface ServiceDetail {
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  image: MediaRef;
  /** "Det indeholder" — concrete task list; the SEO + trust workhorse. */
  includes: readonly string[];
  /** "Hvem er det til" — situations that trigger this service. */
  suitedFor: readonly string[];
  /** Price drivers — honest structure, no invented numbers. */
  priceFactors: readonly string[];
  faq: ReadonlyArray<{ question: string; answer: string }>;
}

const px = (id: number): string =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;

const da: Record<ServiceSlug, ServiceDetail> = {
  'fast-rengoering': {
    title: 'Fast rengøring',
    metaTitle: 'Fast rengøring på Sjælland',
    metaDescription:
      'Fast rengøring hver uge eller hver 14. dag til private på hele Sjælland. Fast pris, ingen binding, gratis tilbud.',
    eyebrow: 'Privat',
    intro:
      'Kom hjem til et hjem, der er ordnet. Vi kommer med et fast interval, følger en plan, du selv har været med til at lægge, og efterlader boligen, som du gerne vil komme hjem til.',
    image: { src: px(4239146), alt: 'Fast rengøring af hjemmet' },
    includes: [
      'Støvsugning og gulvvask i alle rum',
      'Aftørring af flader, hylder og paneler',
      'Rengøring af køkken: bordplader, vask, hvidevarer udvendigt',
      'Badeværelse: håndvask, toilet, bruseniche og spejle',
      'Tømning af affald',
      'Ekstraopgaver efter aftale',
    ],
    suitedFor: [
      'Travle familier og par med fuldtidsarbejde',
      'Hjem, hvor rengøringen altid ryger nederst på listen',
      'Lejligheder og huse, der skal holdes ved lige mellem hovedrengøringer',
    ],
    priceFactors: [
      'Boligens størrelse og antal rum',
      'Hvor ofte vi kommer – ugentligt eller hver 14. dag',
      'Om der er ekstraopgaver med i aftalen',
    ],
    faq: [
      {
        question: 'Kommer det samme personale hver gang?',
        // [BEKRÆFT: fast personale]
        answer:
          'Vi tilstræber at sende det samme faste personale, så du får den samme kvalitet og slipper for at forklare tingene forfra.',
      },
      {
        question: 'Er der binding på en fast aftale?',
        // [BEKRÆFT: ingen binding]
        answer:
          'Nej. Du kan ændre eller stoppe aftalen – vi vil hellere have kunder, der bliver, fordi de er tilfredse.',
      },
      {
        question: 'Skal jeg være hjemme?',
        answer:
          'Det bestemmer du selv. Mange giver os adgang, mens de er på arbejde, så hjemmet er rent, når de kommer hjem.',
      },
    ],
  },
  hovedrengoering: {
    title: 'Hovedrengøring',
    metaTitle: 'Hovedrengøring på Sjælland',
    metaDescription:
      'Grundig hovedrengøring fra loft til gulv på hele Sjælland. Fast pris efter opgavens omfang. Gratis og uforpligtende tilbud.',
    eyebrow: 'Privat',
    intro:
      'Hovedrengøringen er den, hvor vi kommer derhen, hvor den daglige rengøring aldrig når: bag møblerne, oven på skabene, ind i hjørnerne. Resultatet er et hjem, der føles nyt igen.',
    image: { src: px(4239031), alt: 'Grundig hovedrengøring' },
    includes: [
      'Grundig rengøring af alle rum fra loft til gulv',
      'Afkalkning af badeværelse: fliser, armaturer, bruseniche',
      'Køkken: emhætte, fronter og hvidevarer udvendigt',
      'Aftørring af paneler, lister, dørkarme og kontakter',
      'Vinduesplader, radiatorer og hylder',
      'Støvsugning og vask af gulve i flere omgange',
    ],
    suitedFor: [
      'Forårsrengøring, når hjemmet trænger til en frisk start',
      'Efter håndværkere, renovering eller en større fest',
      'Før eller efter en udlejning',
    ],
    priceFactors: [
      'Boligens størrelse og antal rum',
      'Boligens aktuelle stand',
      'Om særlige opgaver skal med i aftalen',
    ],
    faq: [
      {
        question: 'Hvor lang tid tager en hovedrengøring?',
        answer:
          'Det afhænger af boligens størrelse og stand. Vi giver dig et realistisk estimat sammen med tilbuddet – ikke en optimistisk gætning.',
      },
      {
        question: 'Medbringer I udstyr og rengøringsmidler?',
        // [BEKRÆFT: medbringer udstyr og midler]
        answer:
          'Ja. Vi kommer med professionelt udstyr og rengøringsmidler – du skal ikke stille noget frem.',
      },
    ],
  },
  flytterengoering: {
    title: 'Flytterengøring',
    metaTitle: 'Flytterengøring på Sjælland',
    metaDescription:
      'Professionel flytterengøring til fraflytningssyn på hele Sjælland. Fast pris, grundig rengøring, gratis tilbud.',
    eyebrow: 'Privat',
    intro:
      'En flytning er stressende nok i forvejen. Vi tager rengøringen, så boligen står klar til syn og overdragelse – og du kan aflevere nøglerne med ro i maven.',
    image: { src: px(6197122), alt: 'Tom lejlighed klar til fraflytningssyn' },
    includes: [
      'Rengøring af alle rum, skabe og skuffer indvendigt',
      'Køkken: hvidevarer indvendigt og udvendigt, emhætte og fronter',
      'Badeværelse: afkalkning af fliser, armaturer og bruseniche',
      'Aftørring af paneler, lister, dørkarme, kontakter og radiatorer',
      'Gulve vaskes grundigt – flere gange hvor det er nødvendigt',
      'Fjernelse af mærker og snavs på synlige flader',
    ],
    suitedFor: [
      'Fraflytning af lejebolig, hvor synet skal bestås',
      'Klargøring af bolig til nye lejere eller købere',
      'Indflytning i en bolig, der ikke blev afleveret ordentligt',
    ],
    priceFactors: [
      'Boligens kvadratmeter og antal rum',
      'Boligens stand ved fraflytning',
      'Om hårde hvidevarer og skabe skal med indvendigt',
    ],
    faq: [
      {
        question: 'Kan I hjælpe, hvis udlejer ikke godkender rengøringen?',
        // [BEKRÆFT: politik ved reklamation efter syn]
        answer:
          'Kontakt os hurtigst muligt, hvis der bliver bemærket noget ved synet – så finder vi en løsning sammen.',
      },
      {
        question: 'Hvornår skal rengøringen foregå?',
        answer:
          'Typisk når boligen er tømt, og lige inden synet. Vi planlægger tidspunktet efter din flytteplan.',
      },
    ],
  },
  erhvervsrengoering: {
    title: 'Erhvervsrengøring',
    metaTitle: 'Erhvervsrengøring på Sjælland',
    metaDescription:
      'Professionel erhvervsrengøring til kontorer og erhvervslokaler på hele Sjælland. Fast kontaktperson og fast pris.',
    eyebrow: 'Erhverv',
    intro:
      'Rene lokaler er en del af jeres ansigt udadtil – og af et arbejdsmiljø, medarbejderne har lyst til at møde ind i. Vi tilrettelægger rengøringen efter jeres lokaler og jeres åbningstider.',
    image: { src: px(1181406), alt: 'Rengøring af moderne kontor' },
    includes: [
      'Kontorer og fælles­arealer: borde, flader og inventar',
      'Køkken og kantineområde',
      'Toiletter: rengøring, afkalkning og påfyldning',
      'Gulve: støvsugning og vask',
      'Mødelokaler og receptionsområde',
      'Tømning af affald og sortering',
    ],
    suitedFor: [
      'Kontorer og kontorfællesskaber',
      'Butikker, klinikker og showrooms',
      'Ejendomme og erhvervslejemål under administration',
    ],
    priceFactors: [
      'Lokalernes areal og indretning',
      'Rengøringsfrekvens – dagligt, ugentligt eller efter behov',
      'Tidspunkt – i eller uden for jeres arbejdstid',
    ],
    faq: [
      {
        question: 'Kan I gøre rent uden for vores åbningstid?',
        answer:
          'Ja. Vi tilpasser os jeres arbejdstider, så rengøringen ikke forstyrrer driften.',
      },
      {
        question: 'Får vi en fast kontaktperson?',
        // [BEKRÆFT: fast kontaktperson]
        answer:
          'Ja. I får én fast kontakt, der kender aftalen og jeres lokaler – ikke et nyt nummer hver gang.',
      },
      {
        question: 'Hvor hurtigt kan I starte?',
        // [BEKRÆFT: opstartstid]
        answer:
          'Kontakt os med opgaven, så melder vi ærligt tilbage, hvornår vi kan være klar.',
      },
    ],
  },
};

const _en: Record<ServiceSlug, ServiceDetail> = {
  'fast-rengoering': {
    title: 'Recurring cleaning',
    metaTitle: 'Recurring home cleaning in Zealand',
    metaDescription:
      'Recurring cleaning weekly or every other week for private homes across Zealand. Fixed price, no lock-in, free quote.',
    eyebrow: 'Private',
    intro:
      'Come home to a home that is taken care of. We arrive at a fixed interval, follow a plan you helped shape, and leave the home the way you want to come back to it.',
    image: { src: px(4239146), alt: 'Recurring home cleaning' },
    includes: [
      'Vacuuming and floor washing in all rooms',
      'Wiping surfaces, shelves and skirting boards',
      'Kitchen: countertops, sink, appliance exteriors',
      'Bathroom: basin, toilet, shower and mirrors',
      'Emptying waste',
      'Extra tasks by agreement',
    ],
    suitedFor: [
      'Busy families and couples working full time',
      'Homes where cleaning always ends up last on the list',
      'Flats and houses to be maintained between deep cleans',
    ],
    priceFactors: [
      'Size of the home and number of rooms',
      'How often we come – weekly or every other week',
      'Whether extra tasks are part of the agreement',
    ],
    faq: [
      {
        question: 'Do we get the same cleaner every time?',
        answer:
          'We aim to send the same regular staff, so you get consistent quality and never have to explain things twice.',
      },
      {
        question: 'Is there a lock-in on a recurring agreement?',
        answer:
          'No. You can change or stop the agreement – we would rather keep customers who stay because they are happy.',
      },
      {
        question: 'Do I need to be home?',
        answer:
          'That is up to you. Many customers give us access while they are at work, so the home is clean when they return.',
      },
    ],
  },
  hovedrengoering: {
    title: 'Deep cleaning',
    metaTitle: 'Deep cleaning in Zealand',
    metaDescription:
      'Thorough deep cleaning from ceiling to floor across Zealand. Fixed price based on scope. Free, no-obligation quote.',
    eyebrow: 'Private',
    intro:
      'The deep clean is where we reach what everyday cleaning never does: behind the furniture, on top of the cupboards, into the corners. The result is a home that feels new again.',
    image: { src: px(4239031), alt: 'Thorough deep cleaning' },
    includes: [
      'Thorough cleaning of every room, ceiling to floor',
      'Descaling the bathroom: tiles, fittings, shower',
      'Kitchen: extractor hood, fronts and appliance exteriors',
      'Wiping skirting boards, mouldings, door frames and switches',
      'Window sills, radiators and shelves',
      'Vacuuming and washing floors in several passes',
    ],
    suitedFor: [
      'Spring cleaning, when the home needs a fresh start',
      'After tradesmen, renovation or a large party',
      'Before or after a rental period',
    ],
    priceFactors: [
      'Size of the home and number of rooms',
      'The current condition of the home',
      'Whether special tasks are included',
    ],
    faq: [
      {
        question: 'How long does a deep clean take?',
        answer:
          'It depends on the size and condition of the home. We give you a realistic estimate with the quote – not an optimistic guess.',
      },
      {
        question: 'Do you bring equipment and products?',
        answer:
          'Yes. We arrive with professional equipment and cleaning products – you need to provide nothing.',
      },
    ],
  },
  flytterengoering: {
    title: 'Move-out cleaning',
    metaTitle: 'Move-out cleaning in Zealand',
    metaDescription:
      'Professional move-out cleaning for handover inspection across Zealand. Fixed price, thorough work, free quote.',
    eyebrow: 'Private',
    intro:
      'Moving is stressful enough. We take the cleaning, so the home is ready for inspection and handover – and you can hand over the keys with peace of mind.',
    image: { src: px(6197122), alt: 'Empty apartment ready for inspection' },
    includes: [
      'Cleaning of all rooms, cupboards and drawers inside',
      'Kitchen: appliances inside and out, extractor hood and fronts',
      'Bathroom: descaling tiles, fittings and shower',
      'Wiping skirting boards, door frames, switches and radiators',
      'Floors washed thoroughly – several passes where needed',
      'Removing marks and grime from visible surfaces',
    ],
    suitedFor: [
      'Moving out of a rental that must pass inspection',
      'Preparing a home for new tenants or buyers',
      'Moving into a home that was not handed over properly',
    ],
    priceFactors: [
      'Square metres and number of rooms',
      'Condition of the home at move-out',
      'Whether appliances and cupboards are included inside',
    ],
    faq: [
      {
        question: 'What if the landlord does not approve the cleaning?',
        answer:
          'Contact us as soon as possible if anything is noted at the inspection – and we will find a solution together.',
      },
      {
        question: 'When should the cleaning take place?',
        answer:
          'Typically once the home is empty and just before the inspection. We plan the timing around your moving schedule.',
      },
    ],
  },
  erhvervsrengoering: {
    title: 'Commercial cleaning',
    metaTitle: 'Commercial cleaning in Zealand',
    metaDescription:
      'Professional commercial cleaning for offices and business premises across Zealand. Dedicated contact and fixed price.',
    eyebrow: 'Business',
    intro:
      'Clean premises are part of your public face – and of a work environment people actually want to show up to. We plan the cleaning around your premises and your opening hours.',
    image: { src: px(1181406), alt: 'Cleaning a modern office' },
    includes: [
      'Offices and shared areas: desks, surfaces and fixtures',
      'Kitchen and canteen areas',
      'Restrooms: cleaning, descaling and restocking',
      'Floors: vacuuming and washing',
      'Meeting rooms and reception areas',
      'Emptying and sorting waste',
    ],
    suitedFor: [
      'Offices and co-working spaces',
      'Shops, clinics and showrooms',
      'Properties and commercial leases under management',
    ],
    priceFactors: [
      'Area and layout of the premises',
      'Cleaning frequency – daily, weekly or as needed',
      'Timing – during or outside your working hours',
    ],
    faq: [
      {
        question: 'Can you clean outside our opening hours?',
        answer:
          'Yes. We adapt to your working hours so cleaning never disrupts operations.',
      },
      {
        question: 'Do we get a dedicated contact person?',
        answer:
          'Yes. You get one fixed contact who knows the agreement and your premises – not a new number every time.',
      },
      {
        question: 'How quickly can you start?',
        answer:
          'Send us the task and we will tell you honestly when we can be ready.',
      },
    ],
  },
};

export const serviceContent: Record<Locale, Record<ServiceSlug, ServiceDetail>> = {
  da,
};
