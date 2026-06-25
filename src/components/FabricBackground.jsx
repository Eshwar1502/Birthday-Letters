/* Deep maroon WOVEN-FABRIC texture, recreated in CSS/SVG to match the
   reference card. Layers: a vignette gradient for depth, a fine thread
   "weave", and an SVG grain overlay for the cloth feel.

   👉 Want to use a real photo of fabric instead? Drop an image into
      public/  and set BG_IMAGE below to e.g. '/background.jpg'. */
const BG_IMAGE = null

export default function FabricBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ backgroundColor: '#5c1622' }}
      aria-hidden="true"
    >
      {/* depth / vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(125% 125% at 50% 15%, #722236 0%, #5c1622 40%, #47111d 76%, #350b15 100%)',
        }}
      />

      {/* woven threads (warp + weft) */}
      <div
        className="absolute inset-0 mix-blend-soft-light"
        style={{
          opacity: 0.2,
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.55) 0 1px, transparent 1px 3px),' +
            'repeating-linear-gradient(90deg, rgba(0,0,0,0.55) 0 1px, transparent 1px 3px)',
          backgroundSize: '3px 3px',
        }}
      />

      {/* cloth grain */}
      <svg
        className="absolute inset-0 h-full w-full mix-blend-overlay"
        style={{ opacity: 0.22 }}
        preserveAspectRatio="none"
      >
        <filter id="fabric-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#fabric-grain)" />
      </svg>

      {/* optional real photo override */}
      {BG_IMAGE && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${BG_IMAGE})` }}
        />
      )}
    </div>
  )
}
