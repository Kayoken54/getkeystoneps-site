import React, { useEffect, useRef, useState } from "react";

export default function KeystoneLanding() {
  const [budget, setBudget] = useState(0);
  const [priority, setPriority] = useState(false);
  const trackRef = useRef(null);
  const indexRef = useRef(0);

  const vendor = Math.round(budget * 0.7);
  const profit = Math.round((budget - vendor) + (priority ? 200 : 0));
  const margin = budget ? Math.round((profit / budget) * 100) : 0;

  useEffect(() => {
    const interval = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      indexRef.current++;
      if (indexRef.current > track.children.length - 1) {
        indexRef.current = 0;
      }
      track.style.transform = `translateX(-${indexRef.current * 320}px)`;
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      const nav = document.getElementById("navCTA");
      const bottom = document.getElementById("bottomCTA");

      if (!nav || !bottom) return;

      if (y < 400) {
        nav.textContent = "Call Now";
        bottom.textContent = "Call Now";
      } else if (y < 1200) {
        nav.textContent = "Get Estimate";
        bottom.textContent = "Get Estimate";
      } else {
        nav.textContent = "Start Project";
        bottom.textContent = "Start Project";
      }
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    let body = "New Keystone Project:%0D%0A";
    for (const [k, v] of form.entries()) {
      body += `${k}: ${v}%0D%0A`;
    }
    window.location.href = `mailto:eddie.snyder@getkeystoneps.com?subject=New Project Request&body=${body}`;
  };

  return (
    <div className="min-h-screen text-slate-800">
      <style>{`
        body{margin:0;font-family:system-ui}
        .hero{background:linear-gradient(180deg,#0B1F3A,#132F52);color:white}
        .card{background:#f7f8fb;border-radius:14px;padding:20px}
        .cta{background:#C8A46A;color:black;padding:12px 18px;border-radius:10px;font-weight:700}
      `}</style>

      <nav className="flex justify-between items-center p-5 shadow-sm sticky top-0 bg-white z-50">
        <div className="flex items-center gap-2 font-bold">
          <img src="\images\logo.png" className="h-10" />
          Keystone Permanent Solutions
        </div>
        <a href="tel:6156032573" id="navCTA" className="cta">Call Now</a>
      </nav>

      <section className="hero text-center py-24 px-6">
        <h1 className="text-4xl font-bold mb-3">Finally Fix What's Been Temporary</h1>
        <p className="opacity-90 mb-6">We handle vendors, pricing, and scheduling — you just approve it.</p>
        <a href="tel:6156032573" className="cta">Call Now</a>
      </section>

      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Temporary fixes that never get fixed</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card">Broken signage patched instead of replaced</div>
          <div className="card">Safety workarounds that stay forever</div>
          <div className="card">Temporary wiring or lighting</div>
          <div className="card">Repairs that keep getting delayed</div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-10">Simple. Clear. Done.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold">You Show Us</h3>
              <p>Send a photo or describe the issue</p>
            </div>
            <div>
              <h3 className="font-bold">We Handle It</h3>
              <p>We source vendors and pricing</p>
            </div>
            <div>
              <h3 className="font-bold">You Approve</h3>
              <p>We manage completion</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <h2 className="text-center text-2xl font-semibold mb-8">Trusted By Small Businesses</h2>
        <div className="overflow-hidden max-w-5xl mx-auto">
          <div ref={trackRef} className="flex gap-5 transition-transform duration-500">
            <div className="card min-w-[300px]">They fixed something we ignored for a year.<br/><strong>- Shop Owner</strong></div>
            <div className="card min-w-[300px]">I didn't chase contractors once.<br/><strong>- Warehouse Manager</strong></div>
            <div className="card min-w-[300px]">Approved it and it was done.<br/><strong>- Restaurant Owner</strong></div>
            <div className="card min-w-[300px]">Saved me hours of calls.<br/><strong>- Retail Manager</strong></div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-xl mx-auto card">
          <h2 className="text-xl font-semibold mb-4">Project Pricing Estimator</h2>
          <input
            type="number"
            placeholder="Enter your budget"
            className="w-full border p-2 rounded mb-3"
            onChange={(e) => setBudget(Number(e.target.value))}
          />
          <label className="flex gap-2 mb-3">
            <input type="checkbox" onChange={(e) => setPriority(e.target.checked)} />
            Priority Service (+$200)
          </label>
          <p>Vendor Cost: ${vendor}</p>
          <p>Your Profit: ${profit}</p>
          <p>Margin: {margin}%</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <form onSubmit={submit} className="max-w-xl mx-auto card">
          <h2 className="text-xl font-semibold mb-4">Start Your Project</h2>
          <input name="name" placeholder="Your Name" className="w-full border p-2 rounded mb-2" required />
          <input name="business" placeholder="Business Name" className="w-full border p-2 rounded mb-2" />
          <input name="phone" placeholder="Phone" className="w-full border p-2 rounded mb-2" required />
          <input name="budget" value={budget} readOnly className="w-full border p-2 rounded mb-2" />
          <textarea name="details" placeholder="What needs fixed?" className="w-full border p-2 rounded mb-2" />
          <button className="cta w-full">Submit Project</button>
        </form>
      </section>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex justify-center gap-3">
        <a href="tel:6156032573" id="bottomCTA" className="cta">Call Now</a>
        <a href="#" className="border px-4 py-2 rounded">Get Estimate</a>
      </div>
    </div>
  );
}
