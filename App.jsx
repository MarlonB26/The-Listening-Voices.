import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Mic, 
  Headphones, 
  Heart, 
  Share2, 
  Search,
  Mail,
  Play,
  Volume2,
  Send,
  CheckCircle,
  Clock,
  ChevronLeft,
  Quote
} from 'lucide-react';

/* --- Posts Array --- */
const POSTS = [
  {
    id: 1,
    title: "The Unheard Songs of the 5th Street Market",
    excerpt: "Elias has sat on the same corner for 30 years. We finally sat down to listen to the music of his memories.",
    content: `
      <p class="mb-6 text-xl italic font-serif text-slate-600 border-l-4 border-indigo-200 pl-6">"People walk past me like I'm part of the brickwork. But the bricks have ears, and I've been listening to this city breathe for three decades."</p>
      <p class="mb-4">Elias doesn't ask for much. He doesn't even hold a sign. He just watches. When I sat down next to him, he was hesitant. 'Why do you want to hear me?' he asked. I told him because his voice is part of the city's soul.</p>
      <p class="mb-4">What followed was a journey through jazz clubs in the 70s and the quiet dignity of a man who chose a different path. By bringing his story here, we aren't just giving him a voice—we are finally giving him an audience.</p>
    `,
    author: "Founder",
    leadListener: "Lead Listener",
    date: "Dec 2023",
    category: "The Forgotten",
    image: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=80&w=1000",
    hasAudio: true
  }
];

export default function App() {
  const [view, setView] = useState('home'); 
  const [selectedPost, setSelectedPost] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const openPost = (post) => {
    setSelectedPost(post);
    setView('post');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white/90 backdrop-blur-lg shadow-sm py-3" : "bg-transparent py-6"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div onClick={() => {setView('home'); setSelectedPost(null);}} className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-slate-900 text-white p-2 rounded-lg group-hover:bg-indigo-600 transition-colors shadow-lg"><Mic size={20} /></div>
            <span className="font-bold text-xl tracking-tight">The Listening Voices</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600 uppercase tracking-widest">
            <button onClick={() => setView('home')} className="hover:text-indigo-600 transition-colors">Archive</button>
            <button onClick={() => setView('submit')} className="hover:text-indigo-600 transition-colors">Submit a Voice</button>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-all shadow-md">Join the Archive</button>
          </div>
        </div>
      </nav>

      {view === 'home' && (
        <div className="animate-in fade-in duration-700">
          {/* Hero Section */}
          <section className="pt-48 pb-24 px-6 bg-white border-b border-slate-100 relative overflow-hidden">
            <div className="absolute top-20 right-[-5%] text-slate-50 opacity-10 pointer-events-none">
              <Quote size={400} />
            </div>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest">
                A sanctuary for the voiceless
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
                Bringing the <span className="italic font-serif text-indigo-600 underline decoration-indigo-200 underline-offset-8">forgotten</span> to the forefront.
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10 font-serif italic">
                "To listen is to love. We archive the wisdom of those the world has passed by."
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={() => setView('submit')} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl flex items-center justify-center gap-2">
                  <Mic size={18} /> Suggest a Story
                </button>
                <button className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  <Headphones size={18} /> Explore Archive
                </button>
              </div>
            </div>
          </section>

          {/* Stories Grid */}
          <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-bold">The Latest Voices</h2>
              <div className="h-px flex-grow mx-8 bg-slate-200 hidden md:block"></div>
              <div className="text-sm font-bold text-indigo-600 cursor-pointer">View Entire Archive</div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              {POSTS.map(post => (
                <div key={post.id} onClick={() => openPost(post)} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-[2.5rem] aspect-video mb-6 shadow-md border border-slate-100">
                    <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={post.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <div className="bg-white p-4 rounded-full text-indigo-600 shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                          <Play fill="currentColor" size={24} />
                       </div>
                    </div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-indigo-600 border border-indigo-100">
                      {post.category}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-600 transition-colors leading-tight">{post.title}</h3>
                  <p className="text-slate-600 line-clamp-2 mb-4 leading-relaxed font-serif italic text-lg">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <span className="bg-slate-100 px-2 py-1 rounded text-slate-500">Curated by Lead Listener</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="flex items-center gap-1.5 text-indigo-500"><Volume2 size={14} /> Audio Feature</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {view === 'post' && selectedPost && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pt-24 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
             <button onClick={() => setView('home')} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 font-bold text-sm uppercase tracking-widest transition-colors">
                <ChevronLeft size={20} /> Back to Archive
             </button>
             
             <div className="relative rounded-[3rem] overflow-hidden aspect-[21/9] mb-12 shadow-2xl">
                <img src={selectedPost.image} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute bottom-8 left-8">
                   <span className="px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest border border-white/30">
                      {selectedPost.category}
                   </span>
                </div>
             </div>

             <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
                   <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white">
                      <Mic size={20} />
                   </div>
                   <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 mb-0.5">Lead Listener</div>
                      <div className="font-bold text-slate-900">The Listening Voices Archive</div>
                   </div>
                   <div className="ml-auto text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      {selectedPost.date}
                   </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight">{selectedPost.title}</h1>
                
                {/* Audio Player UI */}
                <div className="bg-slate-900 rounded-[2.5rem] p-8 mb-12 flex items-center gap-6 shadow-2xl shadow-slate-200">
                   <button className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform flex-shrink-0">
                      <Play fill="currentColor" size={28} className="ml-1" />
                   </button>
                   <div className="flex-grow">
                      <div className="text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Preservation Audio Active</div>
                      <div className="h-1.5 bg-white/10 rounded-full w-full">
                         <div className="h-full bg-indigo-500 w-1/3 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                      </div>
                      <div className="flex justify-between mt-2 text-white/40 text-[10px] font-bold uppercase tracking-tighter">
                         <span>02:45</span>
                         <span>08:20</span>
                      </div>
                   </div>
                </div>

                <div 
                  className="prose prose-lg prose-slate font-serif leading-relaxed text-slate-700 first-letter:text-7xl first-letter:font-bold first-letter:text-indigo-600 first-letter:mr-3 first-letter:float-left" 
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }} 
                />
             </div>
          </div>
        </div>
      )}

      {view === 'submit' && (
        <section className="pt-40 pb-20 px-6 animate-in slide-in-from-bottom-8 duration-500">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Whose voice are we missing?</h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed font-serif italic">
              "Every person we pass on the street is a library of stories. Help us open the doors."
            </p>
            
            {submitted ? (
              <div className="bg-white border border-slate-100 p-12 rounded-[3rem] text-center shadow-xl">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Submission Received.</h3>
                <p className="text-slate-500">The Lead Listener will review this suggestion personally. Thank you for helping us find the forgotten.</p>
                <button onClick={() => setView('home')} className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-full font-bold">Return Home</button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-8 bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-slate-100">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 ml-2">Your Name</label>
                    <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 ml-2">Your Email</label>
                    <input required type="email" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 ml-2">Whose voice should we hear?</label>
                  <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. My grandmother, Maria" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 ml-2">What makes their story essential?</label>
                  <textarea required rows="4" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none" placeholder="Give us a glimpse into their world..."></textarea>
                </div>
                <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl flex items-center justify-center gap-3">
                  <Send size={20} /> Submit to Lead Listener
                </button>
              </form>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-24 px-6 bg-slate-900 text-white mt-20 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-8">
              <Mic size={32} className="text-indigo-400" />
              <span className="font-bold text-3xl tracking-tighter text-white">The Listening Voices</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-10 text-lg font-serif italic">
              "We provide a digital sanctuary for the stories that go unheard, ensuring wisdom is never lost to time."
            </p>
            <div className="flex gap-4">
               {[1,2,3].map(i => <div key={i} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-indigo-600 transition-all cursor-pointer border border-white/10"><Share2 size={18}/></div>)}
            </div>
          </div>
          <div className="w-full md:w-auto">
            <h4 className="font-bold text-xl mb-8">Support the Mission</h4>
            <p className="text-slate-400 mb-6 max-w-xs">Join our monthly newsletter to receive one profound story directly in your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/5 rounded-[2rem] border border-white/10 max-w-md">
              <input type="email" placeholder="email@example.com" className="bg-transparent border-none outline-none px-6 py-4 flex-grow text-white" />
              <button className="bg-indigo-600 px-8 py-4 rounded-[1.5rem] font-bold hover:bg-indigo-500 transition-all">Subscribe</button>
            </div>
            <p className="mt-6 text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">Curated with care by Lead Listener.</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest gap-6">
           <p>© 2023 The Listening Voices Archive. Preserving the Forgotten.</p>
           <div className="flex gap-8">
              <span className="cursor-pointer hover:text-white transition-colors">Mission</span>
              <span className="cursor-pointer hover:text-white transition-colors">Privacy</span>
              <span className="cursor-pointer hover:text-white transition-colors">Legacy Services</span>
           </div>
        </div>
      </footer>
    </div>
  );
}
