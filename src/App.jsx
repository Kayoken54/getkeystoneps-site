import React, { useEffect, useRef, useState } from "react";

export default function KeystoneLanding() {
  const [budget, setBudget] = useState(0);
  const [priority, setPriority] = useState(false);
  const trackRef = useRef(null);
  const indexRef = useRef(0);
  const startX = useRef(0);

  const vendor = Math.round(budget * 0.7);
  const profit = Math.round(budget - vendor + (priority ? 200 : 0));
  const margin = budget ? Math.round((profit / budget) * 100) : 0;

  useEffect(() => {
    const interval = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      indexRef.current++;
      if (indexRef.current > track.children.length - 1) indexRef.current = 0;
      track.style.transform = `translateX(-${indexRef.current * 320}px)`;
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;
    const track = trackRef.current;
    if (!track) return;

    if (diff > 50) indexRef.current++;
    if (diff < -50) indexRef.current--;

    if (indexRef.current < 0) indexRef.current = 0;
    if (indexRef.current > track.children.length - 1)
      indexRef.current = track.children.length - 1;

    track.style.transform = `translateX(-${indexRef.current * 320}px)`;
  };

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
    <div className="min-h-screen text-slate-800" style={{ fontFamily: "system-ui" }}>

      {/* NAV */}
      <nav className="flex justify-between items-center p-5 shadow-sm sticky top-0 bg-white z-50">
        <div className="flex items-center gap-2 font-bold">
          <img src="/images/logo.png" className="h-10" alt="Keystone Permanent Solutions logo" />
          Keystone Permanent Solutions
        </div>
        <a href="tel:6156012865" className="bg-[#C8A46A] px-4 py-2 rounded font-semibold animate-pulse">
          Call Eddie
        </a>
      </nav>

      {/* HERO */}
      <section style={{ background: "#0B1F3A", color: "white" }} className="text-center py-24 px-6">
        <div className="mb-4 inline-block bg-white/10 px-4 py-1 rounded-full text-sm">
          Serving Tennessee Small Businesses
        </div>

        <h1 className="text-4xl font-bold mb-3">
          Stop Living With "Temporary" Fixes
        </h1>

        <p className="opacity-90 mb-6 max-w-2xl mx-auto">
          Broken sign? Safety workaround? Something that's been "temporary" for months?
          
          Text me a photo. I’ll handle vendors, pricing, and getting it permanently fixed.
        </p>

        <div className="flex justify-center gap-3 flex-wrap">
          <a href="sms:6156012865" className="bg-[#C8A46A] px-6 py-3 rounded font-semibold hover:scale-105 transition">
            Text Me a Photo
          </a>
          <a href="tel:6156012865" className="bg-white text-black px-6 py-3 rounded font-semibold hover:scale-105 transition">
            Call 615-601-2865
          </a>
        </div>

        <div className="mt-6 text-sm opacity-80">
          Small jobs welcome • No contracts • You approve everything first • Your budget our resources
        </div>
      </section>

      {/* THINGS I FIX */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Things I Fix All The Time
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-5 rounded">
              Temporary signs that stayed temporary
            </div>
            <div className="bg-gray-100 p-5 rounded">
              Safety fixes nobody scheduled
            </div>
            <div className="bg-gray-100 p-5 rounded">
              Broken fixtures patched with tape
            </div>
            <div className="bg-gray-100 p-5 rounded">
              Vendor quotes nobody followed up on
            </div>
            <div className="bg-gray-100 p-5 rounded">
              "We'll get to it later" repairs
            </div>
            <div className="bg-gray-100 p-5 rounded">
              Temporary workarounds that became permanent
            </div>
          </div>
        </div>
      </section>

      {/* CREDIBILITY BADGES */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-bold">No Contracts*</div>
            <div className="text-sm text-gray-600">Use only when needed</div>
          </div>
          <div>
            <div className="font-bold">Small Jobs Welcome</div>
            <div className="text-sm text-gray-600">Even the annoying stuff</div>
          </div>
          <div>
            <div className="font-bold">Local Vendors</div>
            <div className="text-sm text-gray-600">Tennessee based</div>
          </div>
          <div>
            <div className="font-bold">Your budget sets the stage</div>
            <div className="text-sm text-gray-600">We only go by your budget</div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6">
        <h2 className="text-center text-2xl font-semibold mb-8">What businesses say</h2>
        <div
          className="overflow-hidden max-w-5xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
            <div className="bg-gray-100 p-5 rounded min-w-[300px]">
              Didn't chase contractors once.<br />
              <strong>- Franklin Warehouse</strong>
            </div>
            <div className="bg-gray-100 p-5 rounded min-w-[300px]">
              Approved it and it was done.<br />
              <strong>- Murfreesboro Restaurant</strong>
            </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-20 px-6">
        <form onSubmit={submit} className="max-w-xl mx-auto bg-gray-100 p-6 rounded">
          <h2 className="text-xl font-semibold mb-4">Text me a photo or fill this out</h2>
          <input name="name" placeholder="Your Name" className="w-full border p-2 rounded mb-2" required />
          <input name="business" placeholder="Business" className="w-full border p-2 rounded mb-2" />
          <input name="phone" placeholder="Phone" className="w-full border p-2 rounded mb-2" required />
          <textarea name="details" placeholder="What needs fixed?" className="w-full border p-2 rounded mb-2" />
          <button className="bg-[#C8A46A] w-full py-3 rounded font-semibold">
            I'll take it from here
          </button>
        </form>
      </section>

      {/* STICKY CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex gap-3 z-50 md:hidden">
        <a
          href="sms:6156012865"
          className="flex-1 bg-[#C8A46A] text-center py-3 rounded font-semibold animate-bounce"
        >
          Text Photo
        </a>
        <a
          href="tel:6156012865"
          className="flex-1 bg-black text-white text-center py-3 rounded font-semibold"
        >
          Call
        </a>
      </div>
      
    </div>
  );
}
