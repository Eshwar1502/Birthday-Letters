/* ============================================================================
   ✏️  EDIT EVERYTHING HERE  ✏️
   This is the ONLY file you need to touch to personalise the site.
   - Change the names, greetings, letter text and signatures below.
   - Replace the photos by dropping your own images into  public/photos/
     using the SAME file names that are referenced here (or change the paths).
   The placeholder images that ship with the project are clearly marked
   "REPLACE ME" so you can tell what still needs swapping.
============================================================================ */

// The birthday girl — used in the greeting ("Dear Aparna,") and the postbox sign.
export const birthdayGirl = 'Aparna'

// The postbox on the first screen.
export const postbox = {
  label: "Aparna's Postbox",
}

// The little footer line at the very bottom of every letter (handwritten style).
export const footerTagline = 'CALL ME IF YOU GET LOST'

/* ----------------------------------------------------------------------------
   The three letters. Order = the order the envelopes appear.
   theme:
     card   -> the pink letter-card background colour
     ink    -> the handwriting colour
     accent -> envelope / wax-seal / bow colour
---------------------------------------------------------------------------- */
export const letters = [
  {
    id: 'rithika',
    from: 'Rithika',
    handle: '@rithika',
    greeting: 'Dear Aparna,',
    body: `in the tapestry of our lives, your presence is a rare gem, illuminating the path with moments of warmth and acceptance. thank you for being my friend! i hope you're always surrounded by love because you really deserve it.`,
    signature: 'xo, Rithika',
    polaroidCaption: "FROM RITHIKA'S CAM!",
    envelopeTitle: 'FRIENDSHIP\nVALENTINES\nCARD',
    photos: {
      polaroid: '/photos/rithika-polaroid.svg',
      portrait: '/photos/rithika-portrait.svg',
    },
    theme: { card: '#f8d7dd', ink: '#8d2535', accent: '#c0566a' },
  },
  {
    id: 'kavya',
    from: 'Kavya',
    handle: '@kavya',
    greeting: 'Dear Aparna,',
    body: `from late-night talks to the silliest inside jokes, every memory with you feels like a tiny celebration. you make ordinary days sparkle. happy birthday to the kindest soul i know — here's to many more adventures together!`,
    signature: 'love always, Kavya',
    polaroidCaption: "FROM KAVYA'S CAM!",
    envelopeTitle: 'A LITTLE\nNOTE FOR\nYOU',
    photos: {
      polaroid: '/photos/kavya-polaroid.svg',
      portrait: '/photos/kavya-portrait.svg',
    },
    theme: { card: '#fbe2d4', ink: '#9a3b2a', accent: '#d98b5f' },
  },
  {
    id: 'avani',
    from: 'Avani',
    handle: '@avani',
    greeting: 'Dear Aparna,',
    body: `you have this way of making everyone around you feel seen and special — and today it's all about you. thank you for the laughter, the comfort, and the endless support. i'm so lucky to call you my friend. happiest birthday!`,
    signature: 'with all my heart, Avani',
    polaroidCaption: "FROM AVANI'S CAM!",
    envelopeTitle: 'HAPPY\nBIRTHDAY\nLETTER',
    photos: {
      polaroid: '/photos/avani-polaroid.svg',
      portrait: '/photos/avani-portrait.svg',
    },
    theme: { card: '#e9dcf3', ink: '#5e3a82', accent: '#9b7bc4' },
  },
]
