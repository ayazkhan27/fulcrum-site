// Content images use user-supplied assets or credited open-licensed photographs.
export const suppliedAssets = {
  terminal: {
    src: "/assets/su-jun-mega-projects-8020883_1920.png",
    alt: "Sweeping roof structure and skylight inside a transport terminal",
    treatment: "photo",
  },
  cotton: {
    src: "/assets/digital_expert-cotton-boll-10195901.png",
    alt: "Close view of a cotton boll and its fibres",
    treatment: "object",
  },
  cottonField: {
    src: "/assets/cotton-field-jackcalll.png",
    alt: "Rows of white cotton in a field beneath a blue sky",
    treatment: "photo",
  },
  cottonBlack: {
    src: "/assets/cotton-black-background.png",
    alt: "Cotton boll and its fibres against a black background",
    treatment: "photo",
  },
  fabric: {
    src: "/assets/mahwishz-ai-generated-8912880.jpg",
    alt: "Warm golden fabric arranged in flowing folds",
    treatment: "photo",
  },
  fabricFolds: {
    src: "/assets/nomevisualizzato-folds-4397703.jpg",
    alt: "Close-up of golden woven fabric arranged in folds",
    treatment: "photo",
  },
  fibre: {
    src: "/assets/serenityseeker-ai-generated-8369846.jpg",
    alt: "Pale textile fibres arranged against a black background",
    treatment: "photo",
  },
  petroleum: {
    src: "/assets/alexandra_koch-fossil-energy-7174463_1920.jpg",
    alt: "Illustration of a petroleum barrel with an oil-drop symbol",
    treatment: "object",
  },
  edibleOil: {
    src: "/assets/openclipart-vectors-olive-oil-576533.png",
    alt: "Illustration of bottles of olive oil",
    treatment: "object",
  },
  aircraft: {
    src: "/assets/openclipart-vectors-aircraft-159115_1920.png",
    alt: "Illustration of a military aircraft",
    treatment: "object",
  },
  cogwheel: {
    src: "/assets/openclipart-vectors-cogwheel-1297118.svg",
    alt: "Metal cogwheel illustration representing industrial components",
    treatment: "object",
  },
  steampunkVehicle: {
    src: "/assets/juliush-steampunk-7677123.jpg",
    alt: "Steampunk vehicle illustration with exposed mechanical components and large wheels",
    treatment: "photo",
  },
  avonCutaway: {
    src: "/assets/rolls-royce-avon-cutaway-andrew-basterfield.jpg",
    alt: "Rolls-Royce Avon jet engine cutaway showing its compressor blades and internal components",
    treatment: "photo",
  },
  paperPlane: {
    src: "/assets/6034354-airline-3807267_1920.png",
    alt: "Teal paper-plane illustration",
    treatment: "object",
  },
} as const
export type AssetKey = keyof typeof suppliedAssets
