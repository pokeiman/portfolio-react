import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [isPurseOpen, setIsPurseOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  // contact form setup
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  const onContactSubmit = (data) => {
    alert(`Thanks ${data.name}! Your message was simulated successfully.`);
    reset(); 
    closeModal();
  };

  const handlePurseClick = () => setIsPurseOpen(!isPurseOpen);
  
  const handleItemClick = (e, modalId) => {
    e.stopPropagation();
    setActiveModal(modalId);
  };

  const closeModal = () => setActiveModal(null);

  // item coordinates
  const purseItems = [
    { id: 'modal-bio', label: 'Bio & Values', closedImg: '/images/smiski.png', openImg: '/images/smiski_open.png', x: '-170%', y: '-110%' },
    { id: 'modal-projects', label: 'Web Design', closedImg: '/images/laptop.png', openImg: '/images/laptop_open.png', x: '70%', y: '-110%' },
    { id: 'modal-art', label: 'Art & Design', closedImg: '/images/sketchbook.png', openImg: '/images/open_sketchbook.png', x: '-220%', y: '-10%' },
    { id: 'modal-edu', label: 'Education', closedImg: '/images/gradcat.png', openImg: '/images/gradcat_open.png', x: '120%', y: '-10%' },
    { id: 'modal-exp', label: 'Experience', closedImg: '/images/folder.png', openImg: '/images/openfolder.png', x: '-170%', y: '90%' },
    { id: 'modal-skills', label: 'Skills', closedImg: '/images/pouch.png', openImg: '/images/pouch_open.png', x: '70%', y: '90%' },
    { id: 'modal-contact', label: 'Contact', closedImg: '/images/phone_close.png', openImg: '/images/phone.png', x: '-50%', y: '140%' },
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col">
      
      {/* landing page */}
      <section className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-8 transition-all duration-700 ease-in-out z-10 ${currentView === 'landing' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none -translate-y-10'}`}>
        <div className="relative flex items-center justify-center w-full">
          {/* rotating text */}
          <div className="absolute w-[85vw] md:w-[55vw] max-w-[700px] aspect-square pointer-events-none animate-[spin_20s_linear_infinite] opacity-90">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path id="text-circle" d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0" fill="none" />
              <text fontSize="8" fontWeight="bold" fill="white" stroke="black" strokeWidth="0.5" paintOrder="stroke fill" className="font-display uppercase" letterSpacing="4">
                <textPath href="#text-circle" startOffset="0%">
                  Click to View • Click to View • Click to View • 
                </textPath>
              </text>
            </svg>
          </div>
          <img 
            src="/images/Iman_logo_black.png" 
            alt="Iman Attar Logo" 
            className="w-[60vw] md:w-[40vw] max-w-xl h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500 relative z-10 cursor-pointer" 
            onClick={() => setCurrentView('portfolio')} 
          />
        </div>
      </section>

      {/* portfolio canvas */}
      <section className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out z-10 ${currentView === 'portfolio' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none scale-95'}`}>
        
        <button onClick={() => { setCurrentView('landing'); setIsPurseOpen(false); }} className="absolute top-8 left-8 z-50 font-display text-2xl text-gray-900 hover:text-purple-600 transition-colors flex items-center gap-3">
          ← Back
        </button>

        <div className={`absolute top-16 md:top-20 left-0 w-full text-center z-10 transition-opacity duration-500 ${isPurseOpen ? 'opacity-0' : 'opacity-100'}`}>
          <h2 className="font-display text-4xl md:text-5xl text-gray-900 drop-shadow-sm">Click the purse to open</h2>
        </div>

        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* purse */}
          <div onClick={handlePurseClick} className={`cursor-pointer z-50 transition-transform duration-300 drop-shadow-2xl hover:scale-105 ${isPurseOpen ? 'scale-90 translate-y-4' : ''}`}>
            <img src={isPurseOpen ? "/images/openpurse.png" : "/images/purse.png"} alt="Purse" className="w-56 md:w-72 h-auto object-contain" />
          </div>

          {/* floating items */}
          <AnimatePresence>
            {isPurseOpen && purseItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.2, x: '-50%', y: '-50%' }}
                animate={{ opacity: 1, scale: activeModal === item.id ? 2.2 : 1, x: item.x, y: item.y, zIndex: activeModal === item.id ? 60 : 40 }}
                exit={{ opacity: 0, scale: 0.2, x: '-50%', y: '-50%' }}
                transition={{ type: "spring", stiffness: 120, damping: 14, delay: activeModal ? 0 : index * 0.08 }}
                className="absolute top-1/2 left-1/2 flex flex-col items-center cursor-pointer group"
                onClick={(e) => handleItemClick(e, item.id)}
              >
                <img 
                  src={activeModal === item.id ? item.openImg : item.closedImg} 
                  alt={item.label} 
                  className={`w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${item.id === 'modal-contact' ? 'w-20 h-20 md:w-28 md:h-28' : ''}`} 
                />
                <span className={`font-outfit font-semibold mt-3 bg-gray-800 text-[#E1E6D8] px-4 py-1.5 rounded-full text-sm tracking-wide opacity-0 group-hover:opacity-100 transition-opacity ${activeModal === item.id ? 'hidden' : ''}`}>
                  {item.label}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>

        </div>
      </section>

      {/* modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-screen h-screen bg-[#E1E6D8]/85 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div 
              initial={{ y: 50, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.95 }} transition={{ type: "spring", bounce: 0.3 }}
              className="bg-[#FAFAFA] w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-[24px] p-10 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()} 
            >
              <button onClick={closeModal} className="absolute top-6 right-6 bg-[#E1E6D8] w-10 h-10 rounded-full flex items-center justify-center text-gray-800 hover:bg-[#cbd5c0] transition-colors z-50">
                ✕
              </button>
              
              {/* contact modal */}
              {activeModal === 'modal-contact' && (
                <div className="text-center max-w-2xl mx-auto">
                  <h2 className="text-6xl font-display mb-4 text-gray-900">Let's Connect</h2>
                  <p className="text-lg text-gray-600 mb-8 font-medium">Have a project in mind? Fill out the form below!</p>
                  
                  <form onSubmit={handleSubmit(onContactSubmit)} className="flex flex-col gap-4 text-left">
                    <div>
                      <label className="font-display text-gray-700">Name</label>
                      <input 
                        {...register("name", { required: "Name is required" })} 
                        className="w-full p-3 rounded-xl border-2 border-[#E1E6D8] bg-white focus:outline-none focus:border-purple-500 transition-colors" 
                        placeholder="John Doe" 
                      />
                      {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
                    </div>

                    <div>
                      <label className="font-display text-gray-700">Email</label>
                      <input 
                        {...register("email", { 
                          required: "Email is required",
                          pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } 
                        })} 
                        className="w-full p-3 rounded-xl border-2 border-[#E1E6D8] bg-white focus:outline-none focus:border-purple-500 transition-colors" 
                        placeholder="john@example.com" 
                      />
                      {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>}
                    </div>

                    <div>
                      <label className="font-display text-gray-700">Message</label>
                      <textarea 
                        {...register("message", { required: "Please enter a message" })} 
                        rows="4"
                        className="w-full p-3 rounded-xl border-2 border-[#E1E6D8] bg-white focus:outline-none focus:border-purple-500 transition-colors resize-none" 
                        placeholder="Hello Iman, I'd love to work with you..." 
                      />
                      {errors.message && <span className="text-red-500 text-sm mt-1">{errors.message.message}</span>}
                    </div>

                    <button type="submit" className="mt-4 bg-purple-600 text-white font-display text-xl py-4 rounded-xl hover:bg-purple-700 transition-colors shadow-md">
                      Send Message ✨
                    </button>
                  </form>
                </div>
              )}

              {/* bio modal */}
              {activeModal === 'modal-bio' && (
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="flex justify-center">
                    <div className="w-72 h-72 md:w-96 md:h-96 bg-purple-600 rounded-full overflow-hidden flex items-center justify-center text-white border-8 border-white shadow-xl relative">
                      <img src="/images/portrait.jpg" alt="Iman Attar Portrait" className="w-full h-full object-cover" />
                      <div className="absolute bottom-4 right-4 text-4xl">✨</div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h2 className="text-5xl font-display mb-6 text-gray-900">About me</h2>
                    <p className="text-lg leading-relaxed text-gray-600 mb-8 font-medium">
                      Hello, my name is Iman Attar and I am a Digital Media major at UCF specializing in Web Design. I am an aspiring UI/UX designer and web developer and I am passionate about crafting seamless, user-friendly digital experiences. With a keen eye for design and functionality, I create intuitive interfaces that prioritize both aesthetics and usability.
                    </p>
                    <h3 className="text-3xl font-display mb-4 text-purple-600 flex items-center gap-3">
                      Design Philosophy
                    </h3>
                    <p className="text-lg leading-relaxed text-gray-600 font-medium">
                      I believe great design is more than just visuals. It's about problem-solving, storytelling, and enhancing user experiences. My process involves research, iteration, and attention to detail to create digital solutions that are both functional and visually engaging.
                    </p>
                  </div>
                </div>
              )}

              {/* web design modal */}
              {activeModal === 'modal-projects' && (
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-6xl font-display mb-2 text-gray-900">Web Design</h2>
                  <p className="text-lg uppercase tracking-widest text-gray-500 mb-8 font-bold">Featured UI/UX & Development</p>
                  <div className="space-y-16">
                    {/* penpath */}
                    <div className="border-t border-gray-200 pt-8">
                      <div className="flex items-center gap-6 mb-4">
                        {/* UPDATED APP ICON: object-contain with a white background and padding! */}
                        <img src="/images/penpath_mascot.jpg" alt="PenPath App Icon" className="h-16 w-16 object-contain bg-white p-1 rounded-xl drop-shadow-sm border border-gray-100" />
                        <h3 className="text-5xl font-display text-blue-500 m-0">PenPath</h3>
                      </div>
                      <p className="font-bold text-gray-500 mb-4 uppercase text-sm tracking-widest">Cursive Learning App</p>
                      <p className="text-gray-700 leading-relaxed mb-6 max-w-3xl text-lg font-medium">PenPath is a gamified cursive learning application designed for K–5 students to develop handwriting skills through structured lessons, level progression, and interactive rewards. Inspired by platforms like Duolingo, the app combines educational content with badges, mascot-based motivation, and a handwriting scan feature to create an engaging and accessible learning experience.</p>
                      <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-100">
                        <h4 className="font-bold text-gray-900 mb-2">My Role: Branding, Graphic Design & Documentation</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                          <li>Developed PenPath’s visual identity, including logo design, color palette, and cohesive brand elements tailored to a young audience.</li>
                          <li>Designed marketing and presentation materials such as pins, buttons, and a trifold display board to communicate the product concept effectively.</li>
                          <li>Created supporting visual assets and contributed to UI design elements to maintain a consistent, child-friendly aesthetic across the app.</li>
                          <li>Led documentation efforts, organizing project materials, writing content, and clearly communicating design decisions and features for both team members and presentations.</li>
                        </ul>
                      </div>
                      <div className="mt-6">
                        <img src="/images/penpath_wireframe.png" alt="PenPath Wireframes & Designs" className="w-full rounded-xl shadow-md border border-gray-200 bg-white" />
                      </div>
                    </div>
                    {/* plate up */}
                    <div className="border-t border-gray-200 pt-8">
                      <div className="flex items-center gap-6 mb-4">
                        <img src="/images/plateup_logo.jpg" alt="PlateUp Logo" className="h-16 w-auto object-contain rounded-xl drop-shadow-sm" />
                        <h3 className="text-5xl font-display text-orange-500 m-0">Plate Up</h3>
                      </div>
                      <p className="font-bold text-gray-500 mb-4 uppercase text-sm tracking-widest">A Food Waste App</p>
                      <p className="text-gray-700 leading-relaxed mb-6 max-w-3xl text-lg font-medium">PlateUP is a user-centered mobile app designed to reduce food waste by connecting individuals with surplus food to those in need. The app allows users to share, donate, and track excess food, promoting sustainability and community support.</p>
                      <div className="bg-orange-50 rounded-xl p-6 mb-8 border border-orange-100">
                        <h4 className="font-bold text-gray-900 mb-2">My Role: UI/UX Designer</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                          <li>Conducted user research to understand food-sharing behaviors.</li>
                          <li>Created wireframes and prototypes to design an intuitive, user-friendly interface.</li>
                          <li>Collaborated with the project manager and design team to align app features with user needs.</li>
                          <li>Focused on accessibility, ensuring seamless navigation and clear call-to-actions.</li>
                        </ul>
                      </div>
                      <div className="mt-6">
                        <img src="/images/plateup_figma.jpg" alt="PlateUp Figma Designs" className="w-full rounded-xl shadow-md border border-gray-200 bg-white" />
                      </div>
                    </div>
                    {/* cat cafe */}
                    <div className="border-t border-gray-200 pt-8">
                      <div className="flex items-center gap-6 mb-4">
                        <img src="/images/ccc_logo.png" alt="The Cozy Cat Cafe Logo" className="h-16 w-auto object-contain drop-shadow-sm" />
                        <h3 className="text-5xl font-display text-yellow-600 m-0">The Cozy Cat Cafe</h3>
                      </div>
                      <p className="font-bold text-gray-500 mb-4 uppercase text-sm tracking-widest">One Page Landing Website</p>
                      <p className="text-gray-700 leading-relaxed mb-6 max-w-3xl text-lg font-medium">The Cozy Cat Cafe is a fictional local coffee shop website designed to create a warm, inviting online presence. The site highlights the cafe's unique concept blending a love for coffee with the charm of adoptable cats—while ensuring an engaging and user-friendly experience.</p>
                      <div className="bg-yellow-50 rounded-xl p-6 mb-8 border border-yellow-100">
                        <h4 className="font-bold text-gray-900 mb-2">My Role: Web Designer</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                          <li>Designed a responsive, visually appealing one-page layout using Canva and custom CSS.</li>
                          <li>Focused on intuitive navigation, clear call-to-actions, and a cozy aesthetic.</li>
                          <li>Implemented smooth animations and micro-interactions for a dynamic user experience.</li>
                        </ul>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <img src="/images/ccc1.jpg" alt="Cat Cafe Design 1" className="w-full h-auto rounded-xl shadow-sm border border-gray-200 object-cover" />
                        <img src="/images/ccc2.jpg" alt="Cat Cafe Design 2" className="w-full h-auto rounded-xl shadow-sm border border-gray-200 object-cover" />
                        <img src="/images/ccc3.jpg" alt="Cat Cafe Design 3" className="w-full h-auto rounded-xl shadow-sm border border-gray-200 object-cover" />
                        <img src="/images/ccc4.jpg" alt="Cat Cafe Design 4" className="w-full h-auto rounded-xl shadow-sm border border-gray-200 object-cover" />
                        <img src="/images/ccc5.jpg" alt="Cat Cafe Design 5" className="w-full h-auto rounded-xl shadow-sm border border-gray-200 object-cover md:col-span-2" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* art & design modal */}
              {activeModal === 'modal-art' && (
                <div className="max-w-5xl mx-auto">
                  <h2 className="text-6xl font-display mb-2 text-gray-900">Photoshop & Physical</h2>
                  <p className="text-lg uppercase tracking-widest text-gray-500 mb-12 font-bold">Art, Composites, and Graphic Design</p>
                  <div className="space-y-16">
                    {/* physical models */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-4xl font-display mb-1 text-gray-900">Physical Models</h3>
                      <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-8">Cardboard & Paper Sculptures</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <img src="/images/chipboard1.jpg" alt="Physical Model" className="w-full aspect-[4/3] object-contain bg-gray-50 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow" />
                        <img src="/images/chipboard2.jpg" alt="Physical Model" className="w-full aspect-[4/3] object-contain bg-gray-50 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow" />
                        <img src="/images/abstract.jpg" alt="Abstract Model" className="w-full aspect-[4/3] object-contain bg-gray-50 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow" />
                        <img src="/images/dancing_house.jpg" alt="Dancing House Model" className="w-full aspect-[4/3] object-contain bg-gray-50 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow" />
                        <img src="/images/dancing_house2.jpg" alt="Dancing House Model Alt" className="w-full aspect-[4/3] object-contain bg-gray-50 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow" />
                      </div>
                    </div>
                    {/* photoshop */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-4xl font-display mb-1 text-gray-900">Photoshop Composites</h3>
                      <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-8">Digital Manipulation</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <img src="/images/photoshop1.jpg" alt="Photoshop Composite" className="w-full aspect-video object-cover rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow" />
                        <img src="/images/photoshop2.jpg" alt="Photoshop Composite" className="w-full aspect-video object-cover rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow" />
                        <img src="/images/photoshop3.jpg" alt="Photoshop Composite" className="w-full aspect-video object-cover rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow" />
                        <img src="/images/photoshop4.jpeg" alt="Photoshop Composite" className="w-full aspect-video object-cover rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow" />
                      </div>
                    </div>
                    {/* flyers */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-4xl font-display mb-1 text-gray-900">Graphic Flyers</h3>
                      <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-8">Layout & Typography</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <img src="/images/shaabana_flyer.png" alt="Shaabana Flyer" className="w-full h-auto object-contain rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow bg-gray-50" />
                        <img src="/images/hteyl.png" alt="Boston Lobster Feast Flyer" className="w-full h-auto object-contain rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow bg-gray-50" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* education modal */}
              {activeModal === 'modal-edu' && (
                <div className="max-w-2xl mx-auto">
                  <h2 className="text-6xl font-display mb-8 text-center text-gray-900">Education</h2>
                  <div className="bg-[#E1E6D8]/30 border-2 border-[#E1E6D8] p-10 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-6 mb-4">
                      <img src="/images/ucf_logo.svg" alt="UCF Logo" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
                      <div>
                        <h3 className="text-4xl font-display text-gray-900">University of Central Florida</h3>
                        <p className="text-gray-600 uppercase tracking-widest text-sm mt-1 font-bold">Bachelor of Arts in Digital Media</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-6 pb-6 border-b border-gray-300">Orlando, FL &bull; Expected May 2026 &bull; <span className="font-bold text-purple-600">GPA: 3.8</span></div>
                    <p className="text-gray-700 leading-relaxed font-medium"><strong className="font-bold text-gray-900">Relevant Coursework:</strong> Digital Video Fundamentals, Interactive Design, Web Development, User-Centered Design, Client/Server Side Scripting.</p>
                  </div>
                </div>
              )}

              {/* experience modal */}
              {activeModal === 'modal-exp' && (
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-6xl font-display mb-12 text-gray-900">Work Experience</h2>
                  <div className="relative border-l-2 border-gray-200 pl-10 ml-4 space-y-16">
                    <div className="relative">
                      <div className="absolute w-5 h-5 bg-purple-600 rounded-full -left-[51px] top-1 border-4 border-white shadow-sm"></div>
                      <h3 className="text-4xl font-display text-gray-900">Web Design & Marketing Intern</h3>
                      <p className="text-purple-600 font-bold mb-4 mt-1 uppercase tracking-widest text-xs">NVEEE &bull; May 2024 - Aug 2024</p>
                      <ul className="list-disc list-outside ml-4 text-gray-700 space-y-3 leading-relaxed font-medium text-lg">
                        <li>Designed and updated WordPress web pages to improve site navigation and user experience.</li>
                        <li>Collaborated with cross-functional marketing teams using Slack to align branding and digital content strategy.</li>
                        <li>Optimized FAQ and informational pages to increase clarity and accessibility for users.</li>
                      </ul>
                    </div>
                    <div className="relative">
                      <div className="absolute w-5 h-5 bg-blue-500 rounded-full -left-[51px] top-1 border-4 border-white shadow-sm"></div>
                      <h3 className="text-4xl font-display text-gray-900">Graphic Designer</h3>
                      <p className="text-blue-600 font-bold mb-4 mt-1 uppercase tracking-widest text-xs">Moroccan Breeze &bull; March 2023 - Present</p>
                      <ul className="list-disc list-outside ml-4 text-gray-700 space-y-3 leading-relaxed font-medium text-lg">
                        <li>Designed and marketed custom flyers using Adobe Photoshop, leading to greater demand and an increase in profits.</li>
                        <li>Promoted large events through social media.</li>
                        <li>Illustrated the company's vision through analytical and artistic outputs.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* skills modal */}
              {activeModal === 'modal-skills' && (
                <div className="max-w-4xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <h2 className="text-5xl font-display mb-6 text-gray-900 border-b-4 border-purple-200 pb-2 inline-block">Core Skills</h2>
                      <div className="flex flex-wrap gap-3 mt-4">
                        <span className="px-5 py-2.5 bg-gray-100 border border-gray-300 rounded-full text-sm font-bold text-gray-800 shadow-sm flex items-center gap-2">
                           React.js
                        </span>
                        <span className="px-5 py-2.5 bg-gray-100 border border-gray-300 rounded-full text-sm font-bold text-gray-800 shadow-sm flex items-center gap-2">
                          <img src="/images/wordpress_logo.png" alt="WordPress" className="w-5 h-5 object-contain" /> WordPress
                        </span>
                        <span className="px-5 py-2.5 bg-gray-100 border border-gray-300 rounded-full text-sm font-bold text-gray-800 shadow-sm flex items-center gap-2">
                          <img src="/images/html_code_icon.png" alt="HTML" className="w-5 h-5 object-contain" /> HTML
                        </span>
                        <span className="px-5 py-2.5 bg-gray-100 border border-gray-300 rounded-full text-sm font-bold text-gray-800 shadow-sm flex items-center gap-2">
                          <img src="/images/css_logo.png" alt="CSS" className="w-5 h-5 object-contain" /> CSS
                        </span>
                        <span className="px-5 py-2.5 bg-gray-100 border border-gray-300 rounded-full text-sm font-bold text-gray-800 shadow-sm flex items-center gap-2">
                          <img src="/images/javascript_logo.png" alt="JavaScript" className="w-5 h-5 object-contain" /> JavaScript
                        </span>
                        <span className="px-5 py-2.5 bg-gray-100 border border-gray-300 rounded-full text-sm font-bold text-gray-800 shadow-sm flex items-center gap-2">
                          <img src="/images/figma_logo.png" alt="Figma" className="w-5 h-5 object-contain" /> Figma
                        </span>
                        <span className="px-5 py-2.5 bg-gray-100 border border-gray-300 rounded-full text-sm font-bold text-gray-800 shadow-sm flex items-center gap-2">
                          <img src="/images/xd_logo.png" alt="Adobe XD" className="w-5 h-5 object-contain" /> Adobe XD
                        </span>
                        <span className="px-5 py-2.5 bg-gray-100 border border-gray-300 rounded-full text-sm font-bold text-gray-800 shadow-sm flex items-center gap-2">
                          <img src="/images/photoshop_logo.png" alt="Photoshop" className="w-5 h-5 object-contain" /> Photoshop
                        </span>
                        <span className="px-5 py-2.5 bg-gray-100 border border-gray-300 rounded-full text-sm font-bold text-gray-800 shadow-sm flex items-center gap-2">
                          <img src="/images/illustrate_logo.png" alt="Illustrator" className="w-5 h-5 object-contain" /> Illustrator
                        </span>
                        <span className="px-5 py-2.5 bg-gray-100 border border-gray-300 rounded-full text-sm font-bold text-gray-800 shadow-sm flex items-center gap-2">
                          <img src="/images/canva_logo.png" alt="Canva" className="w-5 h-5 object-contain" /> Canva
                        </span>
                        <span className="px-5 py-2.5 bg-gray-100 border border-gray-300 rounded-full text-sm font-bold text-gray-800 shadow-sm flex items-center gap-2">
                          <img src="/images/excel_logo.png" alt="Microsoft Excel" className="w-5 h-5 object-contain" /> Microsoft Excel
                        </span>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-5xl font-display mb-6 text-gray-900 border-b-4 border-blue-200 pb-2 inline-block">Soft Skills</h2>
                      <ul className="space-y-4 mt-4">
                        <li className="text-gray-700 text-lg"><strong className="font-bold text-gray-900">Communication</strong> - Presenting ideas clearly, gathering feedback, and collaborating.</li>
                        <li className="text-gray-700 text-lg"><strong className="font-bold text-gray-900">Empathy</strong> - Understanding users' needs to create meaningful designs.</li>
                        <li className="text-gray-700 text-lg"><strong className="font-bold text-gray-900">Problem-Solving</strong> - Finding creative solutions to challenges.</li>
                        <li className="text-gray-700 text-lg"><strong className="font-bold text-gray-900">Collaboration</strong> - Working with developers and stakeholders.</li>
                        <li className="text-gray-700 text-lg"><strong className="font-bold text-gray-900">Adaptability</strong> - Quickly iterating based on feedback and ideas.</li>
                        <li className="text-gray-700 text-lg"><strong className="font-bold text-gray-900">Time Management</strong> - Balancing multiple projects effectively.</li>
                        <li className="text-gray-700 text-lg"><strong className="font-bold text-gray-900">Attention to Detail</strong> - Ensuring polished, user-friendly designs.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* footer */}
      <footer className={`absolute bottom-0 w-full p-4 text-center text-sm font-medium text-gray-500 z-20 transition-opacity duration-500 ${currentView === 'portfolio' ? 'opacity-100' : 'opacity-0'}`}>
        <p>© {new Date().getFullYear()} Iman Attar • Digital Media & Web Design Portfolio</p>
      </footer>

    </div>
  );
}