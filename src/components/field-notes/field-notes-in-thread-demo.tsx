"use client";

/**
 * First-idea sketch — policy lands in chat, then the thread eats it.
 * Same Policy Copilot colour system as the split workspace; layout stays chat-only.
 */
export function FieldNotesInThreadDemo() {
  return (
    <figure
      className="field-notes-chat-demo"
      aria-label="Chat-only sketch showing a draft policy card buried under follow-ups, with Approve stuck in the thread"
    >
      <div className="field-notes-chat-demo__shell">
        <header className="field-notes-chat-demo__bar">
          <div className="field-notes-chat-demo__brand">
            <span className="field-notes-chat-demo__avatar" aria-hidden>
              P
            </span>
            <div className="field-notes-chat-demo__brand-copy">
              <span className="field-notes-chat-demo__title">Policy Copilot</span>
              <span className="field-notes-chat-demo__subtitle">Conversation</span>
            </div>
          </div>
          <span className="field-notes-chat-demo__meta">Chat only</span>
        </header>

        <div className="field-notes-chat-demo__thread">
          <div className="field-notes-chat-demo__scroll-hint" aria-hidden>
            <span className="field-notes-chat-demo__scroll-arrow">↑</span>
            Scroll for earlier draft
          </div>

          <div className="field-notes-chat-demo__row field-notes-chat-demo__row--user field-notes-chat-demo__row--buried">
            <p className="field-notes-chat-demo__bubble field-notes-chat-demo__bubble--user">
              Allow doctors to securely access Electronic Health Records from
              hospital-managed devices
            </p>
          </div>

          <div className="field-notes-chat-demo__row field-notes-chat-demo__row--copilot">
            <div className="field-notes-chat-demo__stack field-notes-chat-demo__stack--buried">
              <p className="field-notes-chat-demo__bubble field-notes-chat-demo__bubble--copilot">
                Got it — here&rsquo;s a draft policy for that request. Users,
                apps, and rules are in the card below.
              </p>

              <article className="field-notes-chat-demo__card">
                <header className="field-notes-chat-demo__card-top">
                  <span className="field-notes-chat-demo__card-label">
                    Draft policy
                  </span>
                  <span className="field-notes-chat-demo__pill">Lost in thread</span>
                </header>

                <h4 className="field-notes-chat-demo__card-title">
                  Doctors → EHR access
                </h4>

                <ul className="field-notes-chat-demo__rules">
                  <li>
                    <span className="field-notes-chat-demo__rule-tone field-notes-chat-demo__rule-tone--allow">
                      Allow
                    </span>
                    <span>
                      Doctors-AD-Group → EHR-App · HTTPS 443
                    </span>
                  </li>
                  <li>
                    <span className="field-notes-chat-demo__rule-tone field-notes-chat-demo__rule-tone--deny">
                      Deny
                    </span>
                    <span>Nurses → EHR-App · explicit block</span>
                  </li>
                  <li>
                    <span className="field-notes-chat-demo__rule-tone field-notes-chat-demo__rule-tone--deny">
                      Deny
                    </span>
                    <span>All others → EHR-App · default deny</span>
                  </li>
                </ul>

                <div className="field-notes-chat-demo__card-actions">
                  <span className="field-notes-chat-demo__ghost-btn">Edit</span>
                  <span className="field-notes-chat-demo__ghost-btn field-notes-chat-demo__ghost-btn--primary">
                    Approve
                  </span>
                </div>

                <footer className="field-notes-chat-demo__card-foot">
                  <span>3 rules · jammed into a message</span>
                  <span className="field-notes-chat-demo__card-link">
                    Dig to reopen
                  </span>
                </footer>
              </article>
            </div>
          </div>

          <div className="field-notes-chat-demo__row field-notes-chat-demo__row--user">
            <p className="field-notes-chat-demo__bubble field-notes-chat-demo__bubble--user">
              Also exclude contractors from EHR, and log every allow path
            </p>
          </div>

          <div className="field-notes-chat-demo__row field-notes-chat-demo__row--copilot">
            <div className="field-notes-chat-demo__stack">
              <p className="field-notes-chat-demo__bubble field-notes-chat-demo__bubble--copilot">
                Updated — contractors denied, logging on. The draft is still in
                the message above if you need to review or approve it.
              </p>
            </div>
          </div>

          <div className="field-notes-chat-demo__row field-notes-chat-demo__row--user">
            <p className="field-notes-chat-demo__bubble field-notes-chat-demo__bubble--user">
              Should managed tablets count, or only workstations?
            </p>
          </div>

          <div className="field-notes-chat-demo__row field-notes-chat-demo__row--copilot">
            <div className="field-notes-chat-demo__stack">
              <p className="field-notes-chat-demo__bubble field-notes-chat-demo__bubble--copilot">
                Including tablets. Scroll up for the card — Edit and Approve are
                still attached to that earlier reply.
              </p>
              <p className="field-notes-chat-demo__aside">
                New replies keep landing. The draft stays put. History grows over
                the work.
              </p>
            </div>
          </div>
        </div>

        <div className="field-notes-chat-demo__composer" aria-hidden>
          <span className="field-notes-chat-demo__composer-placeholder">
            Ask another follow-up…
          </span>
          <span className="field-notes-chat-demo__send">Send</span>
        </div>
      </div>
    </figure>
  );
}
