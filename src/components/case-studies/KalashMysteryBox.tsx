"use client";

import { CaseStudyBento } from "@/components/case-studies/case-study-bento";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { CaseStudyMedia } from "@/components/case-studies/case-study-media";
import {
  CaseStudyH2,
  CaseStudyParagraph,
  CaseStudyProse,
  CaseStudySection,
  CaseStudyWide,
} from "@/components/case-studies/case-study-prose";
import { getCaseStudyContent } from "@/lib/project-content";

const SLUG = "kalash-mystery-box";

export default function KalashMysteryBoxContent() {
  const content = getCaseStudyContent(SLUG)!;

  return (
    <>
      <CaseStudyHero
        title={content.title}
        year={content.year}
        tagline="Mystery Box is a construct to activate regular users of one business vertical in another."
        meta={content.meta}
      />

      <CaseStudyProse>
        <CaseStudySection>
          <CaseStudyH2>Where This Started</CaseStudyH2>
          <CaseStudyParagraph>
            Kalash has two saving habits living inside one app — Gold, and Bitcoin
            rewards sitting quietly next to it. Almost everyone saves in gold.
            Almost no one touches Bitcoin. Of the app&apos;s ~1 million users, less
            than 50,000 have ever even opened that section.
          </CaseStudyParagraph>
          <CaseStudyParagraph>
            That&apos;s not because Bitcoin rewards are bad. It&apos;s because
            nobody&apos;s ever been properly introduced to them.
          </CaseStudyParagraph>
          <CaseStudyMedia
            aspect="video"
            alt="Where this started"
            className="max-w-4xl"
          />
          <CaseStudyH2>
            A Quick Look Around, Before Designing Anything
          </CaseStudyH2>
          <CaseStudyParagraph>
            Jar and Gullak already do round-up savings, streaks, and gamified
            reward UI well — spin wheels, streak fire icons, confetti on almost
            every screen. That&apos;s useful reference, but also a caution: a
            widely-read critique of Jar pointed out that gamification is great for
            a user&apos;s first ten sessions and exhausting by year two. So this
            isn&apos;t &ldquo;copy Jar&apos;s mechanic&rdquo; — it&apos;s
            &ldquo;borrow the habit-loop thinking, skip the fatigue.&rdquo;
          </CaseStudyParagraph>
          <CaseStudyMedia
            aspect="video"
            alt="Jar and Gullak competitive landscape"
            className="max-w-4xl"
          />
          <CaseStudyH2>We Didn&apos;t Guess — We Asked People</CaseStudyH2>
          <CaseStudyParagraph>
            Before building anything, we ran 23 usability interviews. A mix of
            working professionals, people between jobs, students, different age
            groups — everyone 18 or older. We wanted one simple answer: would
            people actually be interested in a crypto reward sitting inside a
            gold-saving app, or would it feel out of place?
          </CaseStudyParagraph>
          <CaseStudyParagraph>
            Most people said yes, they&apos;d be curious — but only if it felt
            optional, small, and safe. Nobody wanted to feel pushed into it. That
            single insight shaped everything that came after.
          </CaseStudyParagraph>
          <CaseStudyMedia
            aspect="video"
            alt="Interview insight: optional, small, and safe"
            className="max-w-4xl"
          />
          <CaseStudyH2>
            So We Decided Not to Guess Who&apos;s Interested Either
          </CaseStudyH2>
          <CaseStudyParagraph>
            It would have been easy to try and predict who&apos;s
            &ldquo;crypto-comfortable&rdquo; using app behaviour or spending
            patterns. We chose not to. Guessing wrong in this case means showing a
            Bitcoin reward to someone who never wanted to see it — and that&apos;s
            a worse outcome than simply asking.
          </CaseStudyParagraph>
          <CaseStudyParagraph>
            So we ask, once, right on the homepage:
          </CaseStudyParagraph>
          <CaseStudyParagraph>
            &ldquo;Are you interested in crypto?&rdquo; — Yes, or Not right now.
          </CaseStudyParagraph>
          <CaseStudyMedia
            aspect="video"
            alt="Homepage crypto interest prompt"
            className="max-w-4xl"
          />
          <CaseStudyParagraph>
            If someone says Yes, they become eligible for Mystery Box. If they say
            Not right now, their homepage stays exactly as it always was — no
            crypto, no follow-up, no reminders.
          </CaseStudyParagraph>
        </CaseStudySection>
      </CaseStudyProse>

      <CaseStudyProse>
        <CaseStudySection>
          <CaseStudyH2>
            What Happens If Someone Says No, and Then Changes Their Mind
          </CaseStudyH2>
          <CaseStudyParagraph>
            The question only ever shows up once. We didn&apos;t want Kalash
            nagging anyone about crypto. But we also didn&apos;t want to shut the
            door forever — so if someone said no and later changes their mind,
            they can simply go find Mystery Box themselves under the Rewards page
            and turn it on whenever they&apos;re ready.
          </CaseStudyParagraph>
          <CaseStudyMedia
            aspect="video"
            alt="Opting back into Mystery Box from Rewards"
            className="max-w-4xl"
          />
          <CaseStudyH2>Who Actually Gets the Reward</CaseStudyH2>
          <CaseStudyParagraph>
            This isn&apos;t for every saver — it&apos;s for people who show up
            daily. Mystery Box unlocks for users who keep a genuine daily saving
            streak going, not for someone who saves once a month. The idea is
            simple: reward the habit that&apos;s already forming, don&apos;t try to
            manufacture a new one.
          </CaseStudyParagraph>
          <CaseStudyParagraph>
            (We also chose to keep this tied to daily streaks specifically rather
            than any fixed monthly plan, so the whole thing stays lightweight —
            no extra structure for people to sign up for, just something that
            grows naturally out of showing up.)
          </CaseStudyParagraph>
          <CaseStudyMedia
            aspect="video"
            alt="Daily streak Mystery Box unlock"
            className="max-w-4xl"
          />
          <CaseStudyH2>The Moment It Unlocks</CaseStudyH2>
          <CaseStudyParagraph>
            Once someone&apos;s streak is strong enough, a Mystery Box card appears,
            locked, right on their homepage. A day or two later, it unlocks. They
            tap it, and it opens into a small reward — sometimes gold, sometimes
            Bitcoin.
          </CaseStudyParagraph>
          <CaseStudyMedia
            aspect="video"
            alt="Mystery Box unlock moment"
            className="max-w-4xl"
          />
          <CaseStudyH2>Where the 3% Actually Came From</CaseStudyH2>
          <CaseStudyParagraph>
            This wasn&apos;t a number we picked to feel generous. In India, every
            digital gold purchase already carries a 3% GST — money that quietly
            leaves a user&apos;s investment the moment they buy, whether they
            notice it or not.
          </CaseStudyParagraph>
          <CaseStudyParagraph>
            So instead of treating that 3% as a cost that just disappears, we asked
            a simpler question: what if we gave it back? Not as cash, and not as
            more gold — as a Bitcoin reward. The user still pays the same tax they
            always would, but Kalash returns an equivalent amount back to them in
            the form of a Mystery Box unlock. It turns something people already
            quietly pay into something they&apos;re actually happy to open.
          </CaseStudyParagraph>
          <CaseStudyParagraph>
            That&apos;s also why the cap sits between ₹10 and ₹100, capped further
            at 3% of what they&apos;ve saved so far, whichever is smaller — it&apos;s
            meant to roughly mirror the tax they already paid, not exceed it.
            It&apos;s a return, not a giveaway.
          </CaseStudyParagraph>
          <CaseStudyMedia
            aspect="video"
            alt="Where the 3% actually came from"
            className="max-w-4xl"
          />
          <CaseStudyH2>The One Thing We Were Careful About</CaseStudyH2>
          <CaseStudyParagraph>
            Saying &ldquo;Yes&rdquo; to the question only tells us someone&apos;s
            curious. It doesn&apos;t mean they understand what Bitcoin actually
            is, or what they&apos;re getting into. So the very first time someone
            opens a Bitcoin reward, before anything is credited, they land on a
            short, one-page explainer answering the one question everyone actually
            has: &ldquo;Wait, is this safe?&rdquo;
          </CaseStudyParagraph>
          <CaseStudyParagraph>
            It&apos;s written in plain language, shown once, and never blocks the
            flow — just a simple, honest answer before the reward lands.
          </CaseStudyParagraph>
          <CaseStudyMedia
            aspect="video"
            alt="One-page Bitcoin safety explainer"
            className="max-w-4xl"
          />
          <CaseStudyParagraph>
            And because the reward is tied to something the user already paid, it
            stays proportionate and small by design — capped at somewhere between
            ₹10 and ₹100, or no more than 3% of what they&apos;ve saved so far,
            whichever is smaller. Small enough that even in the worst case, this is
            a non-event for the user, never something that could actually hurt
            them.
          </CaseStudyParagraph>
          <CaseStudyH2>When We&apos;d Turn This Off for Someone</CaseStudyH2>
          <CaseStudyParagraph>
            A &ldquo;Yes&rdquo; isn&apos;t forever. If a user opens the one-time
            explainer and immediately switches their answer back to &ldquo;Not
            right now,&rdquo; that&apos;s a stronger negative signal than silence —
            treat it as an explicit opt-out, not just disinterest, and don&apos;t
            offer the question again.
          </CaseStudyParagraph>
          <CaseStudyH2>What We&apos;d Call This Working</CaseStudyH2>
          <CaseStudyParagraph>
            If about 40% of the people who say Yes open their very first Bitcoin
            reward within a week of it unlocking, that&apos;s a strong signal the
            idea works. Across the roughly 300,000 users we expect to say Yes,
            that&apos;s around 120,000 people trying Bitcoin for the very first
            time — not because they were sold on crypto, but because a bonus
            showed up on something they were already doing.
          </CaseStudyParagraph>
          <CaseStudyParagraph>
            And if more than 2% of people flip their answer back to &ldquo;Not
            right now&rdquo; right after reading the explainer, that&apos;s the
            signal to stop and rework the reward or the framing — not push
            forward.
          </CaseStudyParagraph>
        </CaseStudySection>
      </CaseStudyProse>

      <CaseStudyWide className="case-study-editorial-gallery">
        <CaseStudyBento
          cells={[
            {
              label: "Happy flow — Mystery Box journey",
              aspect: "video",
              span: "full",
            },
          ]}
        />
      </CaseStudyWide>

      <CaseStudyProse>
        <CaseStudySection>
          <CaseStudyH2>What We&apos;d Watch Closely</CaseStudyH2>
          <CaseStudyParagraph>
            Whether &ldquo;Not right now&rdquo; really means never asked again.
            Whether the reward stays small enough to be a nudge, not a giveaway.
            And whether that one-page explainer ever gets treated as a formality
            instead of the real safeguard it&apos;s meant to be.
          </CaseStudyParagraph>
          <CaseStudyH2>What&apos;s Next</CaseStudyH2>
          <CaseStudyParagraph>
            Let people revisit their answer anytime from the Rewards page without
            digging for it, and try the same idea in the other direction —
            nudging people who already like Bitcoin rewards to try their first
            Gold streak.
          </CaseStudyParagraph>
        </CaseStudySection>
      </CaseStudyProse>
    </>
  );
}
