/** SVG filter defs for wireframe mode — preserves alpha, recolours opaque pixels to white. */
export function WireframeFilters(): React.ReactElement {
  return (
    <svg aria-hidden className="sr-only" width="0" height="0">
      <defs>
        <filter id="wireframe-monogram" colorInterpolationFilters="sRGB">
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
        </filter>
      </defs>
    </svg>
  );
}
