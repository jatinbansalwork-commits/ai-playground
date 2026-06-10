"use client";

import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { CaseStudyMedia } from "@/components/case-studies/case-study-media";
import {
  CaseStudyH2,
  CaseStudyParagraph,
  CaseStudyProse,
  CaseStudyQuote,
  CaseStudyWide,
  CaseStudyYear,
} from "@/components/case-studies/case-study-prose";
import { CASE_STUDY_CDN_MEDIA } from "@/lib/asset-cdn";
import { getCaseStudyContent } from "@/lib/project-content";

const SLUG = "freshprints-image-gen";

const M = CASE_STUDY_CDN_MEDIA;

export default function FreshprintsImageGenContent() {
  const content = getCaseStudyContent(SLUG)!;

  return (
    <div className="w-full space-y-16">
      <CaseStudyHero
        title={content.title}
        year={content.year}
        overview={content.overviewText}
        meta={content.meta}
      />

      <CaseStudyWide>
        <CaseStudyMedia
          aspect="video"
          src={M["freshprints-image-gen-hero"]}
          alt="FreshPrints image generation overview"
        />
      </CaseStudyWide>

      <CaseStudyProse dense>
        <CaseStudyYear>PROJECT OVERVIEW</CaseStudyYear>
        <CaseStudyH2>The problem</CaseStudyH2>
        <CaseStudyParagraph dense>
          While auditing I started noticing something important in Mixpanel. Nothing
          dramatic at first—just a small pattern that kept repeating. When I spoke with
          a few of our users, the story became clearer. They come in with all kinds of
          creative plans, but our image library isn&apos;t always ready for what they have
          in mind. So when they scroll through the options and don&apos;t find anything
          that fits, the excitement fades. That initial spark disappears—and many users
          simply don&apos;t return.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyMedia
          src={M["freshprints-image-gen-01"]}
          alt="FreshPrints prompt composer interface"
        />
      </CaseStudyWide>

      <CaseStudyProse dense>
        <CaseStudyParagraph dense>
          Instead of clicking &ldquo;customise this&rdquo; and entering the editor, more
          users were skipping that step and going straight to &ldquo;request a
          mockup.&rdquo; It turned into a quick escape whenever they couldn&apos;t find the
          visuals they needed. What seems like a small shift on the surface created a
          much bigger ripple behind the scenes: a growing stack of manual mockup requests
          for our template design team.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyMedia
          aspect="video"
          src={M["freshprints-image-gen-video-2"]}
          alt="FreshPrints generation workflow"
        />
      </CaseStudyWide>

      <CaseStudyProse dense>
        <CaseStudyParagraph dense>
          This wasn&apos;t a usability issue. It was a confidence problem. Users
          didn&apos;t trust that they could create something good from scratch.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyMedia
          src={M["freshprints-image-gen-02"]}
          alt="FreshPrints asset review"
        />
      </CaseStudyWide>

      <CaseStudyProse dense>
        <CaseStudyH2>Strategic Question</CaseStudyH2>
        <CaseStudyParagraph dense>
          How might we reduce the effort required to go from intent → usable design?
        </CaseStudyParagraph>
        <CaseStudyParagraph dense>
          We began with deep discovery sessions, including stakeholder interviews,
          competitor audits, and real user shadowing. These insights revealed major
          friction points in engagement.
        </CaseStudyParagraph>
        <CaseStudyH2>The solution</CaseStudyH2>
        <CaseStudyParagraph dense>
          By creating an AI image generation feature, we can supply our users with any
          images they need—and inspire them to keep creating. And our users loved the
          result, after it launched at Image AI 2025.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyMedia
          src={M["freshprints-image-gen-video-3"]}
          alt="FreshPrints generation queue"
          trimTop={80 / 1870}
          intrinsicAspect={2880 / 1870}
        />
      </CaseStudyWide>

      <CaseStudyWide>
        <CaseStudyMedia
          src={M["freshprints-image-gen-04"]}
          alt="FreshPrints asset comparison"
        />
      </CaseStudyWide>

      <CaseStudyProse dense>
        <CaseStudyH2>The process</CaseStudyH2>
        <CaseStudyParagraph dense>
          As AI image generation rapidly developed in quality, we hypothesised that it
          could solve one of our most important problems—supplying every user with any
          image they could imagine.
        </CaseStudyParagraph>
        <CaseStudyParagraph dense>
          We knew that images are critical to the success of a user&apos;s design, as
          users who experienced a 0 result search while looking for content were 4.4%
          less likely to return.
        </CaseStudyParagraph>
        <CaseStudyH2>The problem with prompting</CaseStudyH2>
        <CaseStudyQuote>
          I jumped into fast research on other existing AI image tools, and saw users often
          struggled with describing what they wanted to create.
        </CaseStudyQuote>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyMedia
          src={M["freshprints-image-gen-05"]}
          alt="FreshPrints early concept mock"
        />
      </CaseStudyWide>

      <CaseStudyProse dense>
        <CaseStudyParagraph dense>
          To combat this issue, I worked with engineers and our visual designers to train
          &ldquo;Style selectors&rdquo; that would allow our users to pick a style via
          thumbnails with visual examples, removing the need to learn a complete lexicon
          to prompt.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyMedia
          src={M["freshprints-image-gen-06"]}
          alt="FreshPrints brand guardrails"
          label="Early concept mock in FreshPrints :"
        />
      </CaseStudyWide>

      <CaseStudyProse dense>
        <CaseStudyParagraph dense>
          We explored different thumbnail and messaging for styles. Initially we did not
          provide a &ldquo;no style&rdquo; option, until testing showed that some users
          really wanted an option to let the product choose the best style for them.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyMedia
          src={M["freshprints-image-gen-08"]}
          alt="FreshPrints merchant dashboard"
        />
      </CaseStudyWide>

      <CaseStudyWide>
        <CaseStudyMedia
          src={M["freshprints-image-gen-09"]}
          alt="FreshPrints end-to-end flow"
        />
      </CaseStudyWide>

      <CaseStudyProse dense>
        <CaseStudyH2>The launch</CaseStudyH2>
        <CaseStudyParagraph dense>
          Text to Image launched on April 4th 2025, with a quarter of a million images
          published in the first month.
        </CaseStudyParagraph>
        <CaseStudyQuote>
          But after launch&hellip;retention trended downwards by 4%
        </CaseStudyQuote>
        <CaseStudyParagraph dense>
          Testing led to the hypothesis this was because we had initially built the feature
          as a mobile app to save development time. We refined our discovery
          experience—plus added new and improved styles, and removed a limit to free usage
        </CaseStudyParagraph>
        <CaseStudyParagraph dense>
          We included an &ldquo;AI Image Generator&rdquo; entry point when users open the
          Design tab to look for photos.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyMedia
          src={M["freshprints-image-gen-10"]}
          alt="FreshPrints before approval"
        />
      </CaseStudyWide>

      <CaseStudyProse dense>
        <CaseStudyParagraph dense>
          We also welcomed DALL-E to our ecosystem. We can&apos;t wait to see where it goes
          from here!
        </CaseStudyParagraph>
      </CaseStudyProse>
    </div>
  );
}
