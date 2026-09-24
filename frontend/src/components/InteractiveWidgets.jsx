import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  RotateCcw,
  MousePointerClick,
  Layers,
  ListChecks,
  RefreshCw,
  HelpCircle,
  GitBranch,
} from 'lucide-react';
import './InteractiveWidgets.css';

/* ------------------------------------------------------------------ */
/* Scroll-reveal wrapper: content fades/slides in when it enters view  */
/* ------------------------------------------------------------------ */
export function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`iw-reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function WidgetShell({ icon: Icon, label, children }) {
  return (
    <Reveal className="iw-shell-wrap">
      <div className="iw-shell">
        <div className="iw-shell-head">
          <span className="iw-shell-badge">
            <Icon size={15} />
            Interactive
          </span>
          {label && <span className="iw-shell-label">{label}</span>}
        </div>
        {children}
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Tabs: switch between panels (e.g. current-state vs future-state)     */
/* ------------------------------------------------------------------ */
function TabsWidget({ block }) {
  const items = Array.isArray(block.items) ? block.items : [];
  const [active, setActive] = useState(0);
  if (!items.length) return null;

  return (
    <WidgetShell icon={Layers} label={block.label}>
      <div className="iw-tabs-bar" role="tablist">
        {items.map((item, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === active}
            className={`iw-tab${i === active ? ' is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            {item.tab || `Tab ${i + 1}`}
          </button>
        ))}
      </div>
      <div className="iw-tab-panel" key={active} role="tabpanel">
        {items[active].heading && (
          <h4 className="iw-panel-heading">{items[active].heading}</h4>
        )}
        {(items[active].paragraphs || []).map((t, i) => (
          <p key={i} className="iw-panel-text">
            {t}
          </p>
        ))}
      </div>
    </WidgetShell>
  );
}

/* ------------------------------------------------------------------ */
/* Accordion: expandable FAQ / mistake cards                            */
/* ------------------------------------------------------------------ */
function AccordionWidget({ block }) {
  const items = Array.isArray(block.items) ? block.items : [];
  const [open, setOpen] = useState(0);
  if (!items.length) return null;

  return (
    <WidgetShell icon={HelpCircle} label={block.label}>
      <div className="iw-accordion">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className={`iw-acc-item${isOpen ? ' is-open' : ''}`}>
              <button
                className="iw-acc-btn"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
              >
                <span className="iw-acc-q">{item.q}</span>
                <span className="iw-acc-chev">
                  <ChevronDown size={18} />
                </span>
              </button>
              <div className={`iw-acc-body${isOpen ? ' is-open' : ''}`}>
                <p className="iw-acc-a">{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </WidgetShell>
  );
}

/* ------------------------------------------------------------------ */
/* Steps: click-through walkthrough with progress                       */
/* ------------------------------------------------------------------ */
function StepsWidget({ block }) {
  const items = Array.isArray(block.items) ? block.items : [];
  const [idx, setIdx] = useState(0);
  if (!items.length) return null;

  const go = (n) => setIdx(Math.max(0, Math.min(items.length - 1, n)));
  const pct = ((idx + 1) / items.length) * 100;

  return (
    <WidgetShell icon={ListChecks} label={block.label}>
      {block.intro && <p className="iw-steps-intro">{block.intro}</p>}
      <div className="iw-steps-bar">
        <div className="iw-steps-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="iw-step-card" key={idx}>
        <div className="iw-step-num">
          Step {idx + 1} <span>of {items.length}</span>
        </div>
        <h4 className="iw-panel-heading">{items[idx].title}</h4>
        <p className="iw-panel-text">{items[idx].text}</p>
      </div>
      <div className="iw-steps-nav">
        <button
          className="iw-nav-btn"
          onClick={() => go(idx - 1)}
          disabled={idx === 0}
        >
          <ChevronLeft size={16} /> Previous
        </button>
        <div className="iw-steps-dots">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to step ${i + 1}`}
              className={`iw-dot${i === idx ? ' is-active' : ''}${i < idx ? ' is-done' : ''}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button
          className="iw-nav-btn"
          onClick={() => go(idx + 1)}
          disabled={idx === items.length - 1}
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </WidgetShell>
  );
}

/* ------------------------------------------------------------------ */
/* Flip cards: tap to reveal the other side (3D flip)                   */
/* ------------------------------------------------------------------ */
function FlipWidget({ block }) {
  const items = Array.isArray(block.items) ? block.items : [];
  const [flipped, setFlipped] = useState({});
  if (!items.length) return null;

  const toggle = (i) => setFlipped((f) => ({ ...f, [i]: !f[i] }));

  return (
    <WidgetShell icon={RefreshCw} label={block.label}>
      {block.hint !== false && (
        <p className="iw-flip-hint">
          <MousePointerClick size={14} /> Tap a card to flip it
        </p>
      )}
      <div className="iw-flip-grid">
        {items.map((item, i) => (
          <button
            key={i}
            className={`iw-flip${flipped[i] ? ' is-flipped' : ''}`}
            onClick={() => toggle(i)}
            aria-label={`Flip card ${i + 1}`}
          >
            <div className="iw-flip-inner">
              <div className="iw-flip-face iw-flip-front">
                <span className="iw-flip-kicker">Before</span>
                <span className="iw-flip-text">{item.front}</span>
              </div>
              <div className="iw-flip-face iw-flip-back">
                <span className="iw-flip-kicker">After</span>
                <span className="iw-flip-text">{item.back}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </WidgetShell>
  );
}

/* ------------------------------------------------------------------ */
/* Quiz: self-check questions with instant feedback                     */
/* ------------------------------------------------------------------ */
function QuizWidget({ block }) {
  const questions = Array.isArray(block.questions) ? block.questions : [];
  const [answers, setAnswers] = useState({});
  if (!questions.length) return null;

  const answered = Object.keys(answers).length;
  const correct = questions.filter((q, qi) =>
    q.options && q.options[answers[qi]] && q.options[answers[qi]].correct
  ).length;

  const pick = (qi, oi) => {
    if (answers[qi] !== undefined) return;
    setAnswers((a) => ({ ...a, [qi]: oi }));
  };

  return (
    <WidgetShell icon={Check} label={block.label || 'Check your understanding'}>
      {questions.map((q, qi) => {
        const chosen = answers[qi];
        const done = chosen !== undefined;
        return (
          <div key={qi} className="iw-quiz-q">
            <p className="iw-quiz-question">
              <span className="iw-quiz-n">{qi + 1}</span> {q.q}
            </p>
            <div className="iw-quiz-opts">
              {(q.options || []).map((opt, oi) => {
                let cls = 'iw-quiz-opt';
                if (done) {
                  if (opt.correct) cls += ' is-correct';
                  else if (oi === chosen) cls += ' is-wrong';
                  else cls += ' is-dim';
                }
                return (
                  <button
                    key={oi}
                    className={cls}
                    disabled={done}
                    onClick={() => pick(qi, oi)}
                  >
                    <span className="iw-quiz-letter">
                      {String.fromCharCode(65 + oi)}
                    </span>
                    {opt.text}
                  </button>
                );
              })}
            </div>
            {done && (
              <div
                className={`iw-quiz-why${
                  q.options[chosen] && q.options[chosen].correct
                    ? ' is-right'
                    : ' is-wrong-note'
                }`}
              >
                {q.options[chosen] && q.options[chosen].correct ? (
                  <Check size={15} />
                ) : (
                  <HelpCircle size={15} />
                )}
                <span>{q.why || (q.options[chosen] && q.options[chosen].why) || ''}</span>
              </div>
            )}
          </div>
        );
      })}
      <div className="iw-quiz-foot">
        <span className="iw-quiz-score">
          Score: <strong>{correct}</strong> / {questions.length}
          {answered === questions.length && answered > 0 && (
            <span className="iw-quiz-done">
              {correct === questions.length ? ' — perfect!' : ' — review the answers above'}
            </span>
          )}
        </span>
        {answered > 0 && (
          <button className="iw-quiz-reset" onClick={() => setAnswers({})}>
            <RotateCcw size={14} /> Try again
          </button>
        )}
      </div>
    </WidgetShell>
  );
}

/* ------------------------------------------------------------------ */
/* Compare: before/after drag slider                                    */
/* ------------------------------------------------------------------ */
function CompareWidget({ block }) {
  const [pos, setPos] = useState(50);

  return (
    <WidgetShell icon={GitBranch} label={block.label}>
      <div className="iw-compare">
        <div className="iw-compare-stage">
          <div className="iw-compare-pane iw-compare-before">
            <span className="iw-compare-tag">{block.beforeTitle || 'Before'}</span>
            <p className="iw-compare-text">{block.before}</p>
            {(block.beforeItems || []).map((t, i) => (
              <div key={i} className="iw-compare-line">
                {t}
              </div>
            ))}
          </div>
          <div
            className="iw-compare-pane iw-compare-after"
            style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
          >
            <span className="iw-compare-tag">{block.afterTitle || 'After'}</span>
            <p className="iw-compare-text">{block.after}</p>
            {(block.afterItems || []).map((t, i) => (
              <div key={i} className="iw-compare-line">
                {t}
              </div>
            ))}
          </div>
          <div className="iw-compare-handle" style={{ left: `${pos}%` }}>
            <span className="iw-compare-grip">
              <ChevronLeft size={14} />
              <ChevronRight size={14} />
            </span>
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="iw-compare-range"
          aria-label="Drag to compare before and after"
        />
      </div>
    </WidgetShell>
  );
}

/* ------------------------------------------------------------------ */
/* Dispatcher: maps blogPosts.json block types to widgets               */
/*                                                                     */
/* Block schemas (all plain text, no markdown):                        */
/*  {type:'tabs', label?, items:[{tab, heading?, paragraphs:[..]}]}     */
/*  {type:'accordion', label?, items:[{q, a}]}                         */
/*  {type:'steps', label?, intro?, items:[{title, text}]}               */
/*  {type:'flip', label?, hint?, items:[{front, back}]}                 */
/*  {type:'quiz', label?, questions:[{q, why?, options:[{text,         */
/*    correct, why?}]}]}                                               */
/*  {type:'compare', label?, beforeTitle?, afterTitle?, before?,       */
/*    after?, beforeItems?[], afterItems?[]}                           */
/* ------------------------------------------------------------------ */
export function InteractiveBlock({ block }) {
  if (!block || typeof block.type !== 'string') return null;
  switch (block.type) {
    case 'tabs':
      return <TabsWidget block={block} />;
    case 'accordion':
      return <AccordionWidget block={block} />;
    case 'steps':
      return <StepsWidget block={block} />;
    case 'flip':
      return <FlipWidget block={block} />;
    case 'quiz':
      return <QuizWidget block={block} />;
    case 'compare':
      return <CompareWidget block={block} />;
    default:
      return null;
  }
}

export const INTERACTIVE_TYPES = [
  'tabs',
  'accordion',
  'steps',
  'flip',
  'quiz',
  'compare',
];
