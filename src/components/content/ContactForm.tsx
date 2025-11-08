import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  prompt: string;
}

const ContactForm: React.FC<ContactProps> = ({ prompt }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const elementsRef = useRef<(HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement)[]>([]);
  useEffect(() => {
    if (formRef.current) {
      gsap.from(elementsRef.current, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          end: "bottom center",
          // markers: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submission is a placeholder!'); // Placeholder for actual submission logic
    // You would integrate a backend service here
  };

  return (
    <section id="contact" className="min-h-[80vh] flex flex-col justify-center py-20 px-8 relative z-10">
      <h2 className="text-4xl font-bold text-center mb-16 text-glimpse-blue z-20 sticky top-20 mix-blend-screen hover-target">
        Connect With Me
      </h2>
      <div className="max-w-2xl mx-auto w-full bg-glimpse-component-bg p-8 rounded-lg border border-glimpse-purple shadow-xl shadow-glimpse-purple/20">
        <p className="text-lg text-glimpse-dark-text text-center mb-8">{prompt}</p>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:border-glimpse-blue outline-none transition-colors text-glimpse-text"
            ref={el => { if (el) elementsRef.current[0] = el; }}
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:border-glimpse-blue outline-none transition-colors text-glimpse-text"
            ref={el => { if (el) elementsRef.current[1] = el; }}
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:border-glimpse-blue outline-none transition-colors text-glimpse-text"
            ref={el => { if (el) elementsRef.current[2] = el; }}
          ></textarea>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-glimpse-blue text-glimpse-bg font-bold rounded-lg hover:bg-glimpse-purple transition-colors hover-target
                       shadow-md shadow-glimpse-blue/30 hover:shadow-glimpse-purple/40 transform hover:scale-[1.01]"
            ref={el => { if (el) elementsRef.current[3] = el as HTMLInputElement; }}
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;