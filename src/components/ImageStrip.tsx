"use client";

import { motion } from "framer-motion";

/**
 * Single panoramic B&W image with optional caption.
 *
 * Responsive caption placement:
 *   - Mobile (< sm): caption sits BELOW the image. Image has no overlay
 *     gradient and reads cleanly as a banner. Text is in document flow.
 *   - Tablet+ (sm:): caption is overlaid on the lower part of the image
 *     with a soft gradient — the original cinematic treatment.
 *
 * Always renders inside a dark fallback so a network failure shows a clean
 * dark band, not a broken image icon.
 */
type Props = {
  src: string;
  alt: string;
  eyebrow?: string;
  caption?: string;
  height?: "short" | "medium" | "tall";
};

const HEIGHTS = {
  short:  "aspect-[16/9] md:aspect-[21/6]",
  medium: "aspect-[4/3]  md:aspect-[21/7]",
  tall:   "aspect-[4/3]  md:aspect-[16/8]",
};

export function ImageStrip({ src, alt, eyebrow, caption, height = "medium" }: Props) {
  const hasCaption = Boolean(eyebrow || caption);

  return (
    <section className="container-kapture py-12 md:py-16">
      <motion.figure
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        {/* Image container */}
        <div className={`relative w-full overflow-hidden rounded-2xl bg-kapture-coal ${HEIGHTS[height]}`}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            className="h-full w-full object-cover grayscale contrast-[1.05]"
          />

          {/* Tablet+ overlay caption */}
          {hasCaption && (
            <>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-black/75 via-black/15 to-transparent sm:block"
              />
              <figcaption className="absolute inset-x-0 bottom-0 hidden p-6 text-kapture-white sm:block md:p-8">
                {eyebrow && (
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-kapture-yellow">
                    {eyebrow}
                  </p>
                )}
                {caption && (
                  <p className="mt-1 max-w-2xl font-display text-xl font-bold tracking-tight md:text-2xl">
                    {caption}
                  </p>
                )}
              </figcaption>
            </>
          )}
        </div>

        {/* Mobile caption — below the image, clean stacked layout */}
        {hasCaption && (
          <figcaption className="mt-5 sm:hidden">
            {eyebrow && (
              <p className="text-[10px] font-semibold uppercase tracking-wider text-kapture-yellow">
                {eyebrow}
              </p>
            )}
            {caption && (
              <p className="mt-2 font-display text-xl font-bold tracking-tight text-kapture-black dark:text-kapture-white">
                {caption}
              </p>
            )}
          </figcaption>
        )}
      </motion.figure>
    </section>
  );
}
