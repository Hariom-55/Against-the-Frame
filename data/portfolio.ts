export type PortfolioEvent = {
  title: string;
  description: string;
  contributions: string[];
  images: string[];
};


export const events: PortfolioEvent[] = [
  {
    title: "ILAS Mumbai", 
    description: "ILAS Mumbai - India's first dedicated lighting & automation summit, uniting architects, designers, and manufacturers for keynotes, panels, and product showcases on architectural lighting and smart building control. Held at Bombay Exhibition Centre (NESCO) as an allied event of Acetech Expo.", // <- REPLACE
    contributions: ["Edited the post-event video from raw multi-camera footage, syncing audio from keynote sessions and panel discussions.", 
      "Designed and animated the event title sequence and lower-third graphics, maintaining brand consistency with ILAS and Acetech Expo visual identity.", 
      "Colour-graded and mixed the final deliverables, ensuring consistent look and sound across all formats."], 
    images: ["ILAS_event1.png", "ILAS_event2.png", "ILAS_event3.png"],
  },
  {
    title: "PRE-WEDDING SHOOT", 
    description: "A cinematic pre-wedding film capturing the couple's story — blending candid moments, styled portraits, and dramatic landscapes into a narrative-driven short film.", // <- REPLACE
    contributions: ["Edited the full pre-wedding film from 4K multi-camera and drone footage, cutting a 1-minute narrative edit with a music-driven pacing structure.", 
      "Created the opening title sequence and transition animations, matching the couple's chosen aesthetic and colour palette.", 
      "Colour-graded all footage and mixed the final audio, balancing ambient sound, music, and voiceover for a consistent cinematic look across the film and social media cuts."], // <- REPLACE
    images: ["image1.png", "image2.png", "image3.png"], 
  },
  {
    title: "ACE ALPHA AWARDS", 
    description: "The ACE Alpha Awards brought together industry professionals and distinguished guests for an event celebrating achievements and recognition. The event featured award presentations, keynote moments, stage appearances, audience interactions and celebratory highlights.", 
    contributions: [
      "Structured the footage into a concise highlight sequence covering event branding, stage presentations, award moments and audience reactions.", 
      "Incorporated event branding and title sequences to establish the identity of the ACE Alpha Awards.", 
      "Delivered a short-form promotional edit designed to communicate the atmosphere and highlights of the event within a limited runtime."
    ],
    images: ["awards1.png", "awards2.png", "awards3.png"], 
  },
  
];
