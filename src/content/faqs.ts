export type Faq = { question: string; answer: string };

/** Homepage FAQs. Answers avoid guarantees and are rendered as crawlable HTML + FAQPage-free text. */
export const faqs: Faq[] = [
  {
    question: "What is a 360° virtual tour?",
    answer:
      "A 360° virtual tour is a series of connected panoramic photos that each show the full view around one point in a space. Visitors drag, swipe or tilt their device to look around and click to move between areas. It runs in a web browser — no app or headset needed.",
  },
  {
    question: "How is it different from Google Maps Street View?",
    answer:
      "360° imagery on Google Maps is hosted and displayed by Google inside its own interface, with no custom branding or clickable links. A website virtual tour is hosted for your own site and can include your branding, hotspots, information panels and enquiry buttons. Many businesses use both. PanoVeya is independent and not affiliated with Google.",
  },
  {
    question: "Can the tour be embedded on my website?",
    answer:
      "Yes. Website tours come with an embed code that works on most website builders and custom sites, plus a share link for WhatsApp, social media and email.",
  },
  {
    question: "Do you serve businesses outside major cities?",
    answer:
      "Yes, we welcome enquiries from across India. Availability depends on photographer coverage in your area, and travel costs are included transparently in your quote. We're actively growing our network to reach more towns and cities.",
  },
  {
    question: "How long does a project take?",
    answer:
      "It depends on the size of the space and the package. A compact space can often be captured in a single session, while large resorts or campuses take longer. We confirm capture and delivery timelines in your quote.",
  },
  {
    question: "Can customers explore different rooms?",
    answer:
      "Yes. Multi-area tours link scenes with navigation points, so viewers can move from an entrance to rooms, dining areas, halls and outdoor spaces.",
  },
  {
    question: "Is hosting included?",
    answer:
      "Hosting depends on your package and chosen platform. Your quote states where the tour is hosted, for how long and any renewal costs, so there are no surprises.",
  },
  {
    question: "Can you create tours for multiple branches?",
    answer:
      "Yes. Multi-location businesses can be captured to a consistent standard. Scheduling depends on photographer availability in each location, which we plan with you upfront.",
  },
  {
    question: "How can I join the photographer network?",
    answer:
      "Complete the photographer application with your location, experience and equipment. Applications are reviewed as we expand; joining the network doesn't guarantee assignments, but it puts you in consideration for work in your area.",
  },
];
