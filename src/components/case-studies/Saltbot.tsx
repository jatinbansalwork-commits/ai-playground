"use client";

import { CaseStudyBento } from "@/components/case-studies/case-study-bento";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { CaseStudyMedia } from "@/components/case-studies/case-study-media";
import {
  CaseStudyH2,
  CaseStudyH3,
  CaseStudyParagraph,
  CaseStudyProse,
  CaseStudyQuote,
  CaseStudyTightStack,
  CaseStudyWide,
  CaseStudyLabel,
} from "@/components/case-studies/case-study-prose";
import { CASE_STUDY_CDN_MEDIA } from "@/lib/asset-cdn";
import { getCaseStudyContent } from "@/lib/project-content";

const SLUG = "saltbot-ai-saltmine";

export default function SaltbotContent() {
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
          src={CASE_STUDY_CDN_MEDIA.saltbot}
          alt="Saltbot project overview"
        />
      </CaseStudyWide>

      <CaseStudyProse dense>
        <CaseStudyLabel>PROJECT OVERVIEW</CaseStudyLabel>
        <CaseStudyH2>Why Saltbot?</CaseStudyH2>
        <CaseStudyTightStack>
          <CaseStudyParagraph tight>
            Have you ever wished your workspace could talk back to you?
          </CaseStudyParagraph>
          <CaseStudyParagraph tight>
            Not with dashboards or filters — but with clarity.
          </CaseStudyParagraph>
          <CaseStudyParagraph tight>
            A moment where data stops feeling heavy, and suddenly everything makes
            sense.
          </CaseStudyParagraph>
          <CaseStudyParagraph tight>
            A moment when you ask a question, and the answer feels like it was already
            waiting for you.
          </CaseStudyParagraph>
          <CaseStudyParagraph tight>
            A moment when complexity shifts into confidence.
          </CaseStudyParagraph>
          <CaseStudyParagraph tight>
            That&apos;s where Saltbot comes in.
          </CaseStudyParagraph>
        </CaseStudyTightStack>
        <CaseStudyParagraph dense>
          Saltbot helps you capture the right signals from your workspace — the ones
          hidden behind layers of data, layouts, and decisions. It sets the lens just
          right, cuts through the noise, and brings the most meaningful insight into
          focus.
        </CaseStudyParagraph>
        <CaseStudyParagraph dense>
          So every time you ask, &ldquo;What should I do next?&rdquo; and Saltbot reveals
          the path forward, you pause and go,
        </CaseStudyParagraph>
        <CaseStudyQuote>
          &ldquo;Ah. That&apos;s exactly what I needed.&rdquo;
        </CaseStudyQuote>
        <CaseStudyH2>Collaboration with</CaseStudyH2>
        <CaseStudyTightStack>
          <CaseStudyParagraph tight>
            Product Manager: Ajeya Mansabdar
          </CaseStudyParagraph>
          <CaseStudyParagraph tight>Product &amp; Design Led by Me</CaseStudyParagraph>
          <CaseStudyParagraph tight>
            Engineering: Hunor Nyeki &amp; Andrei Vogulkin
          </CaseStudyParagraph>
        </CaseStudyTightStack>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyMedia
          aspect="video"
          src={CASE_STUDY_CDN_MEDIA["saltbot-conversation-thread"]}
          alt="Saltbot conversation thread"
        />
      </CaseStudyWide>

      <CaseStudyProse dense>
        <CaseStudyH2>Just Ask Saltbot?</CaseStudyH2>
        <CaseStudyParagraph dense>
          You shouldn&apos;t need dashboards, filters, or multiple tools to understand
          how your workspace is performing. With Saltbot, you simply ask — and get the
          answer in seconds.
        </CaseStudyParagraph>
        <CaseStudyParagraph dense>
          Saltbot turns natural prompts into insights, explains what&apos;s happening,
          and guides your next step.
        </CaseStudyParagraph>
        <CaseStudyParagraph dense>No complexity. No digging.</CaseStudyParagraph>
        <CaseStudyParagraph dense>
          Just ask Saltbot, and make decisions faster with the information you actually
          need.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyMedia
          aspect="video"
          src={CASE_STUDY_CDN_MEDIA["saltbot-automation-guardrails"]}
          alt="Saltbot automation guardrails"
        />
      </CaseStudyWide>

      <CaseStudyProse dense>
        <CaseStudyH2>Only What You Need to Know</CaseStudyH2>
        <CaseStudyParagraph dense>
          Workspace data gets complicated quickly. The more offices you manage, the
          harder it becomes to spot what truly matters.
        </CaseStudyParagraph>
        <CaseStudyParagraph dense>Saltbot cuts through that complexity.</CaseStudyParagraph>
        <CaseStudyParagraph dense>
          It highlights important changes — a sudden drop in usage, a spike in demand,
          or an unusual pattern in a floorplan — and explains them clearly. Instead of
          searching through charts, Saltbot tells you exactly what&apos;s worth paying
          attention to. You don&apos;t just see the data. You understand it.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyMedia
          aspect="video"
          src={CASE_STUDY_CDN_MEDIA["saltbot-insights-video-1"]}
          alt="Saltbot insights preview still"
        />
      </CaseStudyWide>

      <CaseStudyProse dense>
        <CaseStudyH2>See the Signal, Not the Spreadsheet</CaseStudyH2>
        <CaseStudyParagraph dense>
          In fast-moving workplaces, timing is everything. Saltbot helps you stay ahead
          by sending real-time alerts when something important changes.
        </CaseStudyParagraph>
        <CaseStudyQuote>
          Want to know when a floor hits capacity?
          <br />
          When meeting rooms stay empty?
          <br />
          Or when a space suddenly gets overused?
        </CaseStudyQuote>
        <CaseStudyParagraph dense>
          Saltbot lets you set the exact triggers you care about — and notifies you
          instantly when they happen.
        </CaseStudyParagraph>
        <CaseStudyH3>Set Smart Alerts</CaseStudyH3>
        <CaseStudyParagraph dense>
          Choose the workspace signals you want Saltbot to monitor, from usage drops to
          capacity limits.
        </CaseStudyParagraph>
        <CaseStudyH3>Customise Your Alerts</CaseStudyH3>
        <CaseStudyParagraph dense>
          Get notified the moment something crosses a threshold.
        </CaseStudyParagraph>
        <CaseStudyParagraph dense>
          No constant checking. No surprises. Saltbot watches it for you.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyBento
          cells={[
            {
              label: "Usage pattern detail",
              caption: (
                <>
                  Sets Smart Alerts
                  <br />
                  Select precisely what you want to be alerted about
                </>
              ),
              aspect: "square",
              src: CASE_STUDY_CDN_MEDIA["saltbot-insights-grid-01"],
              alt: "Saltbot usage pattern detail",
            },
            {
              label: "Floorplan anomaly view",
              caption: (
                <>
                  Customize Your Alerts
                  <br />
                  Get notified whenever a metric is broken
                </>
              ),
              aspect: "square",
              src: CASE_STUDY_CDN_MEDIA["saltbot-insights-grid-02"],
              alt: "Saltbot floorplan anomaly view",
            },
          ]}
        />
      </CaseStudyWide>

      <CaseStudyProse dense>
        <CaseStudyH2>All Your Insights, Only Made Clearer</CaseStudyH2>
        <CaseStudyParagraph dense>
          Workspace tools often feel complicated — especially when data sits in different
          places. Saltbot solves this by connecting directly to the tools and information
          you already use inside Saltmine.
        </CaseStudyParagraph>
        <CaseStudyParagraph dense>
          It brings occupancy data, layouts, and workspace patterns together into one
          simple conversation.
        </CaseStudyParagraph>
        <CaseStudyParagraph dense>
          So you always know what&apos;s happening, what it means, and what you should do
          next. Saltbot doesn&apos;t add more tools. It makes the ones you have easier to
          understand.
        </CaseStudyParagraph>
      </CaseStudyProse>

      <CaseStudyWide>
        <CaseStudyMedia
          aspect="video"
          src={CASE_STUDY_CDN_MEDIA["saltbot-insights-video-2"]}
          alt="Saltbot action workflow"
        />
      </CaseStudyWide>
    </div>
  );
}
