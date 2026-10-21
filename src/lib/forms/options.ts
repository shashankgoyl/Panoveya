/** Select options shared by forms, validation and email templates. */

export const businessTypes = [
  "Hotel / resort / homestay",
  "Restaurant / café / bar",
  "Wedding venue / banquet hall / event space",
  "Real estate (agent, owner or developer)",
  "Retail store / showroom",
  "School / college / institution",
  "Other",
] as const;

export const servicesRequired = [
  "Google Maps 360° imagery",
  "Branded website virtual tour",
  "Both Google Maps and website tour",
  "3D tour / floor-plan experience",
  "Professional 360° photography only",
  "Not sure yet — please advise",
] as const;

export const packageOptions = [
  { value: "starter", label: "Starter — small cafés, shops and compact spaces" },
  { value: "professional", label: "Professional — restaurants, boutique hotels and venues" },
  { value: "enterprise", label: "Enterprise — resorts, multi-location and complex properties" },
] as const;

export const photographyExperience = [
  "New to 360° photography (some general photography experience)",
  "Less than 1 year of 360° work",
  "1–3 years of 360° work",
  "More than 3 years of 360° work",
] as const;

export const availabilityOptions = [
  "Weekdays",
  "Weekends",
  "Flexible / full-time",
  "Occasional projects only",
] as const;
