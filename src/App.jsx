import React, { useEffect, useMemo, useRef, useState } from "react";

const testimonials = [
  {
    quote: "We had a sign issue we'd been living with for months. I texted Eddie a photo and it was handled.",
    author: "Local retail owner",
  },
  {
    quote: "The biggest win was not having to chase vendors. I approved it and moved on with my day.",
    author: "Restaurant manager",
  },
  {
    quote: "Exactly the kind of help small businesses need. Simple, direct, and easy to work with.",
    author: "Auto shop owner",
  },
  {
    quote: "Stuff that kept getting pushed off finally got done right.",
    author: "Office manager",
  },
];

const issues = [
  "Broken signs that got patched instead of replaced",
  "Lights that keep flickering or failing",
  "Patch repairs that became permanent",
  "Safety fixes nobody has time to schedule",
  "Vendor quotes that never got followed up on",
  'The "we\'ll get to it later" stuff',
];

const badges = ["Small jobs welcome", "No contracts", "You approve everything first", "Serving Tennessee businesses"];

const processSteps = [
  {
    title: "1. You text me a photo",
    text: "Show me what's been sitting too long. A photo or quick description is enough.",
  },
  {
    title: "2. I get it priced",
    text: "I handle vendors, pricing, and next steps so you don't have to chase anyone.",
  },
  {
    title: "3. You approve it",
    text: "You get a clear all-in number and decide if you want to move forward.",
  },
  {
    title: "4. I get it handled",
    text: "I make sure it gets done right so it stops living on your to-do list.",
  },
];

export default function KeystoneLanding() {
  const [budget, setBudget] = useState(0);
  const [priority, setPriority] = useState(false);
  const [ctaLabel, setCtaLabel] = useState("Call Eddie");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const touchStartX = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 500) setCtaLabel("Call Eddie");
      else if (y < 1600) setCtaLabel("Text Me a Photo");
      else setCtaLabel("Start Your Project");
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const vendor = useMemo(() => Math.round(budget * 0.7), [budget]);
  const profit = useMemo(() => Math.round(budget - vendor + (priority ? 200 : 0)), [budget, vendor, priority]);
  const margin = budget ? Math.round((profit / budget) * 100) : 0;

  const submit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    let body = "New Keystone Project:%0D%0A";
    for (const [k, v] of form.entries()) {
      body += `${k}: ${v}%0D%0A`;
    }
    window.location.href = `mailto:eddie.snyder@getkeystoneps.com?subject=New Project Request&body=${body}`;
  };

  const primaryHref = ctaLabel === "Text Me a Photo" ? "sms:6156032573" : "tel:6156032573";

  return (
    <div className="min-h-screen bg-white text-slate-800 pb-24">
      <style>{`
        body { margin: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #ffffff; color: #1f2937; }
        .hero-bg { background: linear-gradient(180deg, #0B1F3A 0%, #132F52 100%); color: white; }
        .card { background: #f7f8fb; border-radius: 20px; padding: 24px; box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06); }
        .cta { background: #C8A46A; color: #111827; padding: 14px 20px; border-radius: 12px; font-weight: 800; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px; transition: transform .18s ease, box-shadow .18s ease, background .18s ease; }
        .cta:hover { transform: translateY(-1px); box-shadow: 0 10px 24px rgba(200,164,106,0.28); background: #d2b27c; }
        .cta-secondary { background: white; color: #0B1F3A; }
        .soft-pill { border: 1px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.09); border-radius: 999px; padding: 8px 14px; }
        .trust-pill { background: #fff8ee; border: 1px solid #f1ddbb; color: #6b4f1d; border-radius: 999px; padding: 10px 14px; font-weight: 600; }
        .pulse { animation: pulse 1.8s infinite; }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(200,164,106,0.42); }
          70% { box-shadow: 0 0 0 14px rgba(200,164,106,0); }
          100% { box-shadow: 0 0 0 0 rgba(200,164,106,0); }
        }
      `}</style>

      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3 font-bold text-slate-900">
            <img src="/logo.png" alt="Keystone Permanent Solutions logo" className="h-10 w-auto" />
            <div>
              <div className="text-sm uppercase tracking-[0.18em] text-slate-500">Keystone</div>
              <div className="text-base md:text-lg">Permanent Solutions</div>
            </div>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <a href="sms:6156032573" className="font-semibold text-slate-700">Text a photo</a>
            <a href={primaryHref} className="cta pulse">{ctaLabel}</a>
          </div>
        </div>
      </nav>

      <section className="hero-bg px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1.15fr_.85fr]">
          <div>
            <div className="mb-6 flex flex-wrap gap-3 text-sm">
              {badges.map((badge) => (
                <span key={badge} className="soft-pill">{badge}</span>
              ))}
            </div>
            <h1 className="mb-5 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              Stop living with <span className="text-[#C8A46A]">“temporary”</span> fixes.
            </h1>
            <p className="mb-4 max-w-2xl text-lg text-slate-200 md:text-xl">
              I help small businesses fix the stuff that has been sitting too long — without you having to deal with vendors,
              pricing, or scheduling.
            </p>
            <p className="mb-8 max-w-2xl text-base text-slate-300">
              You show me the problem. I handle the rest. You approve everything first.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="sms:6156032573" className="cta">Text Me a Photo</a>
              <a href="tel:6156032573" className="cta cta-secondary">Call 615-603-2573</a>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/10 backdrop-blur">
            <div className="mb-4 inline-flex rounded-full bg-[#C8A46A] px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-slate-900">
              What this solves
            </div>
            <h2 className="mb-4 text-2xl font-bold">The stuff that keeps getting pushed off</h2>
            <div className="grid gap-3">
              {issues.slice(0, 4).map((item) => (
                <div key={item} className="rounded-2xl bg-white/10 p-4 text-slate-100">
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-slate-300">
              Most places are not broken. They are unfinished. That is where Keystone steps in.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
          <div className="card">
            <div className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-[#8f6a2d]">Built for small business</div>
            <h2 className="mb-4 text-3xl font-black text-slate-900">I take things off your plate.</h2>
            <p className="mb-4 text-slate-700">
              I’m Eddie. Keystone was built around one simple truth: small businesses usually do not ignore problems because they do not care.
              They ignore them because they are busy, understaffed, and tired of chasing vendors.
            </p>
            <p className="text-slate-700">
              So instead of giving you one more thing to manage, I help you get it handled — clearly, quickly, and without the runaround.
            </p>
          </div>

          <div className="card bg-slate-900 text-slate-100">
            <div className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-[#C8A46A]">Best fit</div>
            <h2 className="mb-5 text-3xl font-black">Who this is for</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Restaurants",
                "Retail shops",
                "Auto shops",
                "Salons & gyms",
                "Small offices",
                "Property managers",
              ].map((segment) => (
                <div key={segment} className="rounded-2xl bg-white/10 p-4">{segment}</div>
              ))}
            </div>
            <p className="mt-5 text-sm text-slate-300">Not built for major construction, big corporate bidding, or emergency response.</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <div className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-[#8f6a2d]">What I fix all the time</div>
            <h2 className="text-3xl font-black text-slate-900 md:text-4xl">The problems businesses live with longer than they should.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {issues.map((item) => (
              <div key={item} className="card">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 max-w-3xl">
          <div className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-[#8f6a2d]">How it works</div>
          <h2 className="text-3xl font-black text-slate-900 md:text-4xl">Simple, clear, and easy to say yes to.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step) => (
            <div key={step.title} className="card">
              <h3 className="mb-3 text-xl font-black text-slate-900">{step.title}</h3>
              <p className="text-slate-700">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 px-6 py-16 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.05fr_.95fr]">
          <div>
            <div className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-[#C8A46A]">Closing the loop</div>
            <h2 className="mb-4 text-3xl font-black md:text-4xl">Not just a quick fix. A finished job.</h2>
            <p className="mb-4 text-slate-300">
              The biggest difference with Keystone is that I do not just point you toward a vendor. I make sure the problem actually gets handled,
              so it stops sitting on your list and stops coming back.
            </p>
            <p className="text-slate-300">
              That means less chasing, less clutter, and fewer things hanging over your business.
            </p>
          </div>
          <div className="card bg-white text-slate-900">
            <h3 className="mb-4 text-2xl font-black">Monthly Fix Help</h3>
            <p className="mb-5 text-slate-700">
              If you have a few things like this, I can help you stay on top of them over time instead of letting them pile up.
            </p>
            <div className="grid gap-3">
              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="font-black">$500/month</div>
                <div className="text-sm text-slate-600">Great for smaller locations with 1–3 ongoing issues.</div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="font-black">$1,000/month</div>
                <div className="text-sm text-slate-600">For busier locations that want faster, ongoing support.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-[#8f6a2d]">Why people say yes</div>
            <h2 className="text-3xl font-black text-slate-900 md:text-4xl">Small business owners want relief, not more work.</h2>
          </div>
          <a href="sms:6156032573" className="cta">Text Me a Photo</a>
        </div>

        <div
          className="overflow-hidden"
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStartX.current == null) return;
            const diff = touchStartX.current - e.changedTouches[0].clientX;
            if (diff > 40) setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
            if (diff < -40) setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
            touchStartX.current = null;
          }}
        >
          <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
            {testimonials.map((item) => (
              <div key={`${item.author}-${item.quote}`} className="w-full shrink-0 px-1">
                <div className="card min-h-[220px] flex flex-col justify-between">
                  <div className="mb-6 text-2xl leading-relaxed text-slate-800">“{item.quote}”</div>
                  <div className="font-bold text-slate-600">— {item.author}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show testimonial ${index + 1}`}
              onClick={() => setActiveTestimonial(index)}
              className={`h-2.5 rounded-full transition-all ${index === activeTestimonial ? "w-8 bg-[#C8A46A]" : "w-2.5 bg-slate-300"}`}
            />
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div className="card">
            <div className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-[#8f6a2d]">Quick estimate</div>
            <h2 className="mb-4 text-3xl font-black text-slate-900">See how the job could be structured.</h2>
            <p className="mb-5 text-slate-700">Enter the budget range you are comfortable with. This gives a rough vendor target and Keystone margin.</p>
            <input
              type="number"
              min="0"
              placeholder="Enter budget"
              className="mb-4 w-full rounded-xl border border-slate-300 p-3"
              value={budget || ""}
              onChange={(e) => setBudget(Number(e.target.value || 0))}
            />
            <label className="mb-5 flex items-center gap-3 text-slate-700">
              <input type="checkbox" checked={priority} onChange={(e) => setPriority(e.target.checked)} />
              Add priority handling (+$200)
            </label>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-4">
                <div className="text-sm text-slate-500">Vendor target</div>
                <div className="text-2xl font-black">${vendor}</div>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <div className="text-sm text-slate-500">Keystone margin</div>
                <div className="text-2xl font-black">${profit}</div>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <div className="text-sm text-slate-500">Margin %</div>
                <div className="text-2xl font-black">{margin}%</div>
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="card">
            <div className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-[#8f6a2d]">Start your project</div>
            <h2 className="mb-4 text-3xl font-black text-slate-900">Show me what needs fixing.</h2>
            <p className="mb-6 text-slate-700">Send the basics here, or just text me a photo. Either way, I’ll take it from there.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="name" placeholder="Your name" className="rounded-xl border border-slate-300 p-3" required />
              <input name="business" placeholder="Business name" className="rounded-xl border border-slate-300 p-3" />
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input name="phone" placeholder="Phone" className="rounded-xl border border-slate-300 p-3" required />
              <input name="budget" value={budget || ""} readOnly placeholder="Budget" className="rounded-xl border border-slate-300 p-3" />
            </div>
            <textarea name="details" rows="6" placeholder="What needs fixed? What's been temporary too long?" className="mt-3 w-full rounded-xl border border-slate-300 p-3" />
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="cta" type="submit">Start Your Project</button>
              <a href="sms:6156032573" className="cta cta-secondary">Text Me a Photo</a>
            </div>
          </form>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl rounded-[28px] bg-slate-900 px-8 py-12 text-center text-white shadow-2xl shadow-slate-900/10">
          <div className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-[#C8A46A]">Final CTA</div>
          <h2 className="mb-4 text-3xl font-black md:text-5xl">Got something that has been “temporary” too long?</h2>
          <p className="mx-auto mb-8 max-w-3xl text-slate-300 md:text-lg">
            Text me a photo or give me a call. I’ll help you get it priced, approved, and handled.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="sms:6156032573" className="cta">Text Me a Photo</a>
            <a href="tel:6156032573" className="cta cta-secondary">Call Eddie</a>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 p-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md gap-3">
          <a href={primaryHref} className="cta flex-1">{ctaLabel}</a>
          <a href="sms:6156032573" className="rounded-xl border border-slate-300 px-4 py-3 font-bold text-slate-700">Text</a>
        </div>
      </div>
    </div>
  );
}
