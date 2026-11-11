export type Partner = { file: string; name: string };

const p = (file: string, name = "Company Name"): Partner => ({ file, name });


export const partners: Partner[] = [
  p("acetech.svg", "Acetech"), 
  p("della.svg", "Della Resorts"), 
  p("IHFF.svg", "IHFF"),
  p("ILAS.svg", "ILAS"), 
  p("wizcraft.svg", "Wizcraft"), 
  
];
