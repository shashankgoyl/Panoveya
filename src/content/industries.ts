import type { StaticImageData } from "next/image";
import type { IndustrySlug } from "./route-slugs";
import banquetBalcony from "@/assets/images/banquet-hall-balcony.jpg";
import cafeCorner from "@/assets/images/cafe-corner.jpg";
import eventStage from "@/assets/images/event-hall-stage.jpg";
import garden from "@/assets/images/garden-courtyard.jpg";
import loft from "@/assets/images/heritage-loft.jpg";
import waterfront from "@/assets/images/waterfront-architecture.jpg";

export type Industry = {
  slug: IndustrySlug;
  name: string;
  /** Card copy on the homepage. */
  cardDescription: string;
  cardCta: string;
  image: StaticImageData;
  imageAlt: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  /** What customers in this industry want to see before they visit. */
  customerQuestions: string[];
  /** Areas we typically capture. */
  whatToCapture: string[];
  useCases: { title: string; body: string }[];
  recommendedServices: { label: string; href: string }[];
  tips: string[];
  faqs: { question: string; answer: string }[];
};

export const industries: Industry[] = [
  {
    slug: "hotels-resorts",
    name: "Hotels & resorts",
    cardDescription:
      "Let guests walk through room categories, lobbies, pools, spas and dining before they book — and see exactly what each upgrade offers.",
    cardCta: "Explore hotel tours",
    image: garden,
    imageAlt: "Landscaped garden courtyard with a pond, rockery and pavilion — illustrative resort setting",
    metaTitle: "Virtual Tours for Hotels & Resorts in India",
    metaDescription:
      "Multi-room 360° virtual tours for hotels, resorts, homestays and boutique stays. Show room categories, amenities and event spaces before guests book.",
    headline: "Show guests their stay before they book it",
    intro:
      "Guests compare properties on photos that are often cropped, wide-angle or out of date. A multi-room virtual tour lets them look around each room category, follow the route from reception to the pool, and see your restaurant and event spaces in context. PanoVeya captures hotels, resorts, homestays and boutique stays, and builds tours you can use on your website, in sales enquiries and with event clients.",
    customerQuestions: [
      "How big is the room, and what's the view from the window?",
      "What's the difference between the deluxe room and the suite?",
      "Is the pool, spa or restaurant as it appears in the photos?",
      "Is the property suitable for families, accessibility needs or groups?",
    ],
    whatToCapture: [
      "Entrance, lobby and reception",
      "Each room category, including bathroom",
      "Views from balconies and windows",
      "Pool, spa, gym and recreation areas",
      "Restaurants, bars and breakfast areas",
      "Banquet halls, lawns and meeting rooms",
    ],
    useCases: [
      {
        title: "Room-category comparison",
        body: "Link each room type in your tour so guests can see what an upgrade includes before choosing.",
      },
      {
        title: "Event and wedding sales",
        body: "Share banquet and lawn scenes with planners and families who can't visit in person.",
      },
      {
        title: "Direct-website experience",
        body: "Embed the tour on your own website alongside your booking or enquiry options.",
      },
    ],
    recommendedServices: [
      { label: "360° virtual tours for websites", href: "/services/360-virtual-tours" },
      { label: "Google Maps virtual tours", href: "/services/google-maps-virtual-tours" },
      { label: "3D tours for large properties", href: "/services/3d-virtual-tours" },
    ],
    tips: [
      "Prepare every room category to the same standard as a guest arrival.",
      "Schedule outdoor areas for good daylight and indoor areas when they're empty.",
      "Decide which upgrade or package you most want guests to notice — we can open the tour there.",
    ],
    faqs: [
      {
        question: "Can guests move between rooms in the tour?",
        answer:
          "Yes. Scenes are connected with navigation points, so guests can move from the lobby to rooms, dining and outdoor areas.",
      },
      {
        question: "Can you capture a resort spread over a large area?",
        answer:
          "Yes. Larger sites need more capture points and possibly more time on site, which we include in the quote.",
      },
    ],
  },
  {
    slug: "restaurants-cafes",
    name: "Restaurants & cafés",
    cardDescription:
      "Show ambience, seating options and private dining areas so diners know what to expect — from a quick coffee to a celebration dinner.",
    cardCta: "Explore restaurant tours",
    image: cafeCorner,
    imageAlt: "Café corner with a small table for two, framed botanical prints and a staircase",
    metaTitle: "360° Virtual Tours for Restaurants & Cafés",
    metaDescription:
      "Show your restaurant or café's ambience, seating and private dining through a 360° virtual tour on Google Maps and your website.",
    headline: "Let diners feel the ambience before they reserve",
    intro:
      "Diners choose a restaurant for the food and the atmosphere. Menus and plated photos show the first; a 360° tour shows the second. PanoVeya captures your dining room, terraces, private areas and entrance so people know whether you're right for a date night, a family lunch or a group celebration.",
    customerQuestions: [
      "Is it suitable for a date, a family meal or a large group?",
      "Is there outdoor or rooftop seating?",
      "Is there a private dining room for celebrations?",
      "How easy is it to find the entrance?",
    ],
    whatToCapture: [
      "Street-level entrance and signage",
      "Main dining room and bar",
      "Outdoor, terrace or rooftop seating",
      "Private dining and event areas",
      "Open kitchen or signature features",
    ],
    useCases: [
      {
        title: "Google Maps discovery",
        body: "Many diners decide from Google Maps. 360° imagery published there helps them recognise your space.",
      },
      {
        title: "Group and party enquiries",
        body: "Share private dining scenes with people planning birthdays, office dinners and celebrations.",
      },
      {
        title: "Menu and story hotspots",
        body: "Add hotspots for your menu, chef's story or event packages inside the tour.",
      },
    ],
    recommendedServices: [
      { label: "Google Maps virtual tours", href: "/services/google-maps-virtual-tours" },
      { label: "360° virtual tours for websites", href: "/services/360-virtual-tours" },
    ],
    tips: [
      "Shoot before opening hours so tables are set and the room is empty.",
      "Use your service lighting, not cleaning lights, so the mood matches the evening experience.",
      "Set a few signature tables exactly as you would for guests.",
    ],
    faqs: [
      {
        question: "How long does a café or small restaurant shoot take?",
        answer:
          "Compact spaces can often be captured in a single short session. We confirm timing once we know the number of areas.",
      },
      {
        question: "Can the tour link to my menu or reservations?",
        answer:
          "In a website tour, yes — hotspots can link to your menu, reservation page or WhatsApp. Google Maps imagery can't include links.",
      },
    ],
  },
  {
    slug: "wedding-venues",
    name: "Wedding & event venues",
    cardDescription:
      "Help couples and planners explore halls, lawns, mandap areas and entrances, and picture layouts for every function.",
    cardCta: "Explore venue tours",
    image: banquetBalcony,
    imageAlt: "Ornate banquet hall with columns, gilded details, a balcony and parquet flooring",
    metaTitle: "Virtual Tours for Wedding Venues & Banquet Halls",
    metaDescription:
      "360° virtual tours for wedding venues, banquet halls, lawns and event spaces. Help families and planners explore layouts and capacities remotely.",
    headline: "Help couples and planners explore every function space",
    intro:
      "Wedding decisions involve families, planners and guests who are often in different cities. A virtual tour lets everyone explore the banquet hall, lawns, mandap area, bridal rooms, parking and entrance without arranging multiple site visits. PanoVeya captures venues so people can understand layouts and picture each function before they commit.",
    customerQuestions: [
      "Will the hall accommodate our guest list comfortably?",
      "Where would the stage, mandap, dining and dance floor go?",
      "What do the lawns and outdoor areas look like?",
      "Are there bridal rooms, green rooms and enough parking?",
    ],
    whatToCapture: [
      "Approach, entrance and parking",
      "Banquet halls, empty and dressed if possible",
      "Lawns, poolside and outdoor function areas",
      "Mandap, stage and dining areas",
      "Bridal and green rooms",
      "Accommodation, if available on site",
    ],
    useCases: [
      {
        title: "Remote family decisions",
        body: "Share a single link with relatives and planners in other cities and abroad.",
      },
      {
        title: "Capacity and layout hotspots",
        body: "Add hotspots with seating capacities, dimensions or layout options for each space.",
      },
      {
        title: "Fewer wasted site visits",
        body: "Shortlisted families arrive already familiar with the venue, so visits focus on details.",
      },
    ],
    recommendedServices: [
      { label: "360° virtual tours for websites", href: "/services/360-virtual-tours" },
      { label: "3D tours & floor-plan experiences", href: "/services/3d-virtual-tours" },
      { label: "Google Maps virtual tours", href: "/services/google-maps-virtual-tours" },
    ],
    tips: [
      "If possible, capture key spaces both empty and dressed for an event.",
      "Plan shoots around bookings so halls are clean and accessible.",
      "Have capacity figures and dimensions ready for hotspot panels.",
    ],
    faqs: [
      {
        question: "Can you capture the venue during an event?",
        answer:
          "Usually we capture when the venue is empty for privacy and clarity. Capturing a dressed setup is possible with the client's consent and when guests are not present.",
      },
      {
        question: "Can couples see floor plans?",
        answer:
          "Floor-plan style experiences are possible with some 3D capture approaches, scoped on request.",
      },
    ],
  },
  {
    slug: "real-estate",
    name: "Real estate & property",
    cardDescription:
      "Give buyers and tenants a clear sense of layout, light and flow — including NRI buyers and investors who can't visit easily.",
    cardCta: "Explore property tours",
    image: loft,
    imageAlt: "Sunlit heritage room with a green wall, leather armchair, writing desk and tall windows",
    metaTitle: "Real Estate Virtual Tours for Agents & Developers",
    metaDescription:
      "360° and 3D virtual tours for property listings, show flats and commercial spaces. Help buyers, tenants and NRI investors understand layouts remotely.",
    headline: "Help buyers understand a property before the site visit",
    intro:
      "Listing photos rarely show how rooms connect or how much light a home gets. A virtual tour lets buyers and tenants walk through a property at their own pace, which is especially useful for out-of-town and NRI buyers. PanoVeya works with agents, owners and developers on resale homes, rentals, show flats and commercial spaces.",
    customerQuestions: [
      "How do the rooms connect, and how big do they feel?",
      "Which direction does the balcony face, and what's the view?",
      "What condition are the kitchen and bathrooms in?",
      "What do the amenities and common areas look like?",
    ],
    whatToCapture: [
      "Entrance, living and dining areas",
      "Bedrooms, kitchen and bathrooms",
      "Balconies, terraces and views",
      "Common areas, amenities and parking",
      "Sample flats and sales galleries for projects",
    ],
    useCases: [
      {
        title: "Remote and NRI buyers",
        body: "Share a tour link so buyers abroad or in other cities can shortlist with confidence.",
      },
      {
        title: "Show flats and launches",
        body: "Keep a show flat available online long after the physical setup changes.",
      },
      {
        title: "Better-qualified site visits",
        body: "Buyers who have toured online arrive with clearer questions.",
      },
    ],
    recommendedServices: [
      { label: "3D tours & digital twins", href: "/services/3d-virtual-tours" },
      { label: "360° virtual tours for websites", href: "/services/360-virtual-tours" },
    ],
    tips: [
      "Declutter surfaces and remove personal items before the shoot.",
      "Open curtains and switch on all lights for even exposure.",
      "Note the facing direction and key dimensions for hotspot panels.",
    ],
    faqs: [
      {
        question: "Do you provide measurements?",
        answer:
          "Some 3D capture approaches show approximate measurements. They are for visualisation only and are not a substitute for a survey or approved drawings.",
      },
      {
        question: "Can tours be added to property portals?",
        answer:
          "Many portals accept a tour link or embed. Support varies by portal, so we check the requirements for the platforms you use.",
      },
    ],
  },
  {
    slug: "retail-showrooms",
    name: "Retail & showrooms",
    cardDescription:
      "Let shoppers browse your floor, displays and product zones online, and recognise your store when they arrive.",
    cardCta: "Explore retail tours",
    image: waterfront,
    imageAlt: "Modern glass-fronted commercial building beside a river, viewed from a paved plaza",
    metaTitle: "Virtual Tours for Retail Stores & Showrooms",
    metaDescription:
      "360° virtual tours for showrooms, retail stores and commercial spaces. Let customers browse displays and product zones before they visit.",
    headline: "Open your showroom to customers who haven't visited yet",
    intro:
      "Furniture, automobile, jewellery, lighting and lifestyle showrooms sell experiences that are hard to convey in product photos. A 360° tour lets customers browse your floor, see displays in context and recognise your store when they arrive. Hotspots can point to product categories, catalogues or a WhatsApp enquiry.",
    customerQuestions: [
      "How large is the range on display?",
      "Which products are on the floor to see in person?",
      "Is the store easy to find, with parking?",
      "Is there a private consultation or trial area?",
    ],
    whatToCapture: [
      "Storefront and entrance",
      "Main floor and product zones",
      "Feature displays and experience areas",
      "Consultation, trial or demo areas",
    ],
    useCases: [
      {
        title: "Product-zone hotspots",
        body: "Link areas of the floor to catalogues, price lists or enquiry options.",
      },
      {
        title: "Multi-location consistency",
        body: "Capture each branch in a consistent style for a single, comparable experience.",
      },
      {
        title: "Launch and seasonal displays",
        body: "Keep a record of special displays after they change.",
      },
    ],
    recommendedServices: [
      { label: "360° virtual tours for websites", href: "/services/360-virtual-tours" },
      { label: "Google Maps virtual tours", href: "/services/google-maps-virtual-tours" },
    ],
    tips: [
      "Restock and face up shelves before the shoot.",
      "Capture before opening so the floor is clear of customers.",
      "Decide which product categories deserve hotspots.",
    ],
    faqs: [
      {
        question: "Can you capture multiple branches?",
        answer:
          "Yes. Multi-location projects are scheduled through our photographer network where coverage allows, with a consistent capture standard.",
      },
      {
        question: "Can tours link to my online store?",
        answer: "Yes, website tours can include hotspots linking to product or catalogue pages.",
      },
    ],
  },
  {
    slug: "education-institutions",
    name: "Education & institutions",
    cardDescription:
      "Give prospective students and parents a campus visit from anywhere — classrooms, labs, libraries, hostels and sports facilities.",
    cardCta: "Explore campus tours",
    image: eventStage,
    imageAlt: "Large empty hall with a stage, teal curtains and patterned flooring — illustrative auditorium",
    metaTitle: "Virtual Campus Tours for Schools & Colleges",
    metaDescription:
      "360° virtual campus tours for schools, colleges, coaching institutes and training centres. Show classrooms, labs, hostels and facilities to students and parents.",
    headline: "A campus visit for every applicant, wherever they live",
    intro:
      "Parents and students increasingly shortlist institutions online, often from other cities. A virtual campus tour shows classrooms, labs, libraries, hostels, sports grounds and transport areas so families can understand the environment before admissions visits. PanoVeya captures schools, colleges, coaching institutes and training centres with attention to privacy and safeguarding.",
    customerQuestions: [
      "What are the classrooms, labs and library like?",
      "What are the hostel rooms and mess facilities like?",
      "What sports and activity facilities are available?",
      "Is the campus safe and well maintained?",
    ],
    whatToCapture: [
      "Main gate, reception and administration",
      "Classrooms, labs and libraries",
      "Auditoriums and activity spaces",
      "Hostels, dining and common rooms",
      "Sports grounds and facilities",
    ],
    useCases: [
      {
        title: "Admissions season",
        body: "Share the tour with applicants and parents who can't travel for an open day.",
      },
      {
        title: "Facility hotspots",
        body: "Add descriptions of labs, equipment and programmes at the relevant locations.",
      },
      {
        title: "International and out-of-state applicants",
        body: "Give distant applicants a clear picture of campus life.",
      },
    ],
    recommendedServices: [
      { label: "360° virtual tours for websites", href: "/services/360-virtual-tours" },
      { label: "Google Maps virtual tours", href: "/services/google-maps-virtual-tours" },
    ],
    tips: [
      "Schedule shoots during holidays or outside class hours to protect student privacy.",
      "Coordinate access to labs, hostels and restricted areas in advance.",
      "Prepare short descriptions for each facility hotspot.",
    ],
    faqs: [
      {
        question: "How do you handle student privacy?",
        answer:
          "We capture when spaces are empty wherever possible and blur any identifiable people that remain in the final imagery.",
      },
      {
        question: "Can large campuses be captured in phases?",
        answer: "Yes. Large campuses can be captured in phases, starting with the facilities that matter most to applicants.",
      },
    ],
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
