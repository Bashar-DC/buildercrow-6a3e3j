import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Atom, 
  Sparkles, 
  Award, 
  Dna, 
  Beaker, 
  HelpCircle, 
  BookOpen, 
  ChevronRight, 
  Check, 
  X, 
  RotateCcw, 
  Activity,
  Heart,
  Brain,
  Zap,
  ShieldCheck,
  Info
} from 'lucide-react';

// Define educational Amino Acids for the builder
interface AminoAcid {
  id: string;
  name: string;
  short: string;
  color: string;
  role: string;
  benefit: string;
}

const AMINO_ACIDS: AminoAcid[] = [
  { id: 'gly', name: 'Glycine', short: 'Gly', color: 'bg-pink-400 hover:bg-pink-500 text-white', role: 'Structural Support', benefit: 'Helps build sturdy collagen molecules!' },
  { id: 'ala', name: 'Alanine', short: 'Ala', color: 'bg-emerald-400 hover:bg-emerald-500 text-white', role: 'Energy Engine', benefit: 'Helps turn sugar into active energy!' },
  { id: 'val', name: 'Valine', short: 'Val', color: 'bg-indigo-400 hover:bg-indigo-500 text-white', role: 'Muscle Guardian', benefit: 'Supports protein synthesis and tissue growth!' },
  { id: 'pro', name: 'Proline', short: 'Pro', color: 'bg-amber-400 hover:bg-amber-500 text-white', role: 'Skin Shield', benefit: 'Keeps cell structures strong and flexible!' },
  { id: 'ser', name: 'Serine', short: 'Ser', color: 'bg-cyan-400 hover:bg-cyan-500 text-white', role: 'Brain Booster', benefit: 'Important for healthy brain and nervous system cell communication!' },
];

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "What is a peptide?",
    options: [
      "A small chain of amino acids, the building blocks of life!",
      "A type of rare space meteorite.",
      "A musical instrument played in an orchestra.",
      "A computer programming language."
    ],
    answer: 0,
    explanation: "Peptides are short chains of amino acids (usually 2 to 50) linked by chemical bonds. They are smaller versions of proteins!"
  },
  {
    question: "What do amino acids join together to form when the chain gets very long?",
    options: [
      "Diamonds",
      "Proteins",
      "Water molecules",
      "Bones"
    ],
    answer: 1,
    explanation: "When a chain of amino acids grows longer than 50 links, it officially folds into a fully-fledged Protein!"
  },
  {
    question: "Which of these is a famous naturally occurring peptide in our bodies?",
    options: [
      "Plastic",
      "Insulin (helps regulate energy!)",
      "Kryptonite",
      "Helium"
    ],
    answer: 1,
    explanation: "Insulin is a vital peptide hormone made in the pancreas that controls glucose levels in our bodies!"
  }
];

export default function App() {
  // State for Peptide Builder
  const [peptideChain, setPeptideChain] = useState<AminoAcid[]>([]);
  
  // State for Science Quiz
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // State for interactive info modal
  const [activeCard, setActiveCard] = useState<string | null>(null);

  // Peptide builder handlers
  const addAminoAcid = (acid: AminoAcid) => {
    if (peptideChain.length < 8) {
      setPeptideChain([...peptideChain, acid]);
    }
  };

  const removeLastAcid = () => {
    setPeptideChain(peptideChain.slice(0, -1));
  };

  const resetChain = () => {
    setPeptideChain([]);
  };

  // Quiz handlers
  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === QUIZ_QUESTIONS[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-900 overflow-x-hidden">
      {/* Aurora Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation Header */}
      <header className="border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-cyan-400 to-indigo-500 p-2.5 rounded-2xl shadow-lg shadow-indigo-500/20">
              <Dna className="h-6 w-6 text-slate-900 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Peptide Pioneers
              </span>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Micro-Science Lab</p>
            </div>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#about" className="text-sm text-slate-300 hover:text-cyan-400 transition-colors">What is a Peptide?</a>
            <a href="#builder" className="text-sm text-slate-300 hover:text-cyan-400 transition-colors">Lab Workbench</a>
            <a href="#quiz" className="text-sm text-slate-300 hover:text-cyan-400 transition-colors">Science Quiz</a>
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Kid-Safe STEM Content
            </span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700/60 text-slate-200 text-sm mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Discover the microscopic building blocks of you!</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto">
          Explore the Secret World of{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Peptides & Proteins
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Welcome to the microscopic world! Learn how amino acids snap together like biological Lego bricks to build life, fuel energy, and protect our health.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a 
            href="#builder" 
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-900 font-bold rounded-2xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
          >
            <Beaker className="w-5 h-5 text-slate-900" />
            Go to Peptide Lab
          </a>
          <a 
            href="#quiz" 
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold rounded-2xl transition-all flex items-center gap-2"
          >
            <HelpCircle className="w-5 h-5 text-purple-400" />
            Test Your Knowledge
          </a>
        </div>

        {/* Feature Grid Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left">
          <div className="p-6 rounded-3xl bg-slate-800/40 border border-slate-800 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">What is a Peptide?</h3>
            <p className="text-sm text-slate-400">
              They are tiny chains of amino acids that serve as specific biological messengers in both plants and animals.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-800/40 border border-slate-800 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">The Power of Proteins</h3>
            <p className="text-sm text-slate-400">
              When peptides grow longer and fold up, they form functional proteins like hemoglobin or healing enzymes!
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-800/40 border border-slate-800 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">No Artificial Scams</h3>
            <p className="text-sm text-slate-400">
              We focus on 100% science-backed knowledge, empowering kids to learn organic chemistry safely and truthfully.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 pb-24 space-y-24">
        
        {/* Interactive Peptide Builder Section */}
        <section id="builder" className="scroll-mt-24">
          <div className="bg-gradient-to-b from-slate-800/80 to-slate-900/80 border border-slate-800 rounded-[32px] p-6 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full">Interactive Station</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-4">Molecular Builder Lab</h2>
              <p className="text-slate-400 text-base leading-relaxed mb-8">
                Build your own peptide chain! Click amino acids below to chain them together. See how proteins are constructed link-by-link. (Maximum 8 links)
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Amino Acid Selection Panel */}
              <div className="lg:col-span-5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
                  <Atom className="w-5 h-5 text-indigo-400" />
                  Available Amino Acids
                </h3>
                <div className="space-y-3">
                  {AMINO_ACIDS.map((acid) => (
                    <button
                      key={acid.id}
                      onClick={() => addAminoAcid(acid)}
                      disabled={peptideChain.length >= 8}
                      className="w-full text-left p-3.5 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-all flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs uppercase shadow-inner ${acid.color}`}>
                          {acid.short}
                        </span>
                        <div>
                          <p className="font-semibold text-slate-200 text-sm group-hover:text-cyan-400 transition-colors">{acid.name}</p>
                          <p className="text-xs text-slate-400">{acid.role}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Peptide Laboratory Output */}
              <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950/60 p-6 rounded-2xl border border-slate-800 min-h-[350px]">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-slate-200 flex items-center gap-2">
                      <Beaker className="w-5 h-5 text-emerald-400" />
                      Your Peptide Chain
                    </h3>
                    <div className="flex gap-2">
                      <button 
                        onClick={removeLastAcid} 
                        disabled={peptideChain.length === 0}
                        className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg disabled:opacity-40 transition-colors"
                      >
                        Undo Link
                      </button>
                      <button 
                        onClick={resetChain} 
                        disabled={peptideChain.length === 0}
                        className="px-3 py-1.5 text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg disabled:opacity-40 transition-colors"
                      >
                        Reset Lab
                      </button>
                    </div>
                  </div>

                  {/* Chain Visualization */}
                  <div className="min-h-[140px] flex flex-wrap items-center gap-2 p-6 bg-slate-900/80 rounded-2xl border border-dashed border-slate-800 justify-center">
                    {peptideChain.length === 0 ? (
                      <div className="text-center text-slate-500 py-6">
                        <Dna className="w-8 h-8 mx-auto mb-2 opacity-30 animate-pulse" />
                        <p className="text-sm">Lab is currently empty.</p>
                        <p className="text-xs text-slate-600 mt-1">Select amino acids on the left to synthesize!</p>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        {peptideChain.map((acid, idx) => (
                          <React.Fragment key={idx}>
                            <motion.div 
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="flex flex-col items-center"
                            >
                              <div className={`w-14 h-14 rounded-full flex items-center justify-center font-extrabold text-sm shadow-lg border border-white/15 ${acid.color}`}>
                                {acid.short}
                              </div>
                              <span className="text-[10px] text-slate-400 font-semibold mt-1.5">{acid.name}</span>
                            </motion.div>
                            {idx < peptideChain.length - 1 && (
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: 16 }}
                                className="h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                              />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Info and Chemistry details */}
                <div className="mt-6 pt-6 border-t border-slate-800">
                  {peptideChain.length > 0 ? (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5" /> Latest Chain Addition Effect:
                      </h4>
                      <p className="text-sm text-slate-300">
                        Adding <strong className="text-slate-100">{peptideChain[peptideChain.length - 1].name}</strong>: {peptideChain[peptideChain.length - 1].benefit}
                      </p>
                      <div className="mt-4 flex items-center gap-4 bg-indigo-500/5 p-3 rounded-xl border border-indigo-500/10 text-xs text-indigo-300">
                        <p>
                          <strong>Chemistry Fact:</strong> You created a <strong className="text-cyan-400">{peptideChain.length}-mer peptide</strong>! If you reached 50 links, this would fold into a 3D Protein.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic text-center">
                      Create a peptide chain to view its chemical properties and structural potential.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Info Section */}
        <section id="about" className="scroll-mt-24 space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">Learn & Explore</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-4">The Science Behind Peptides</h2>
            <p className="text-slate-400">
              Ever wonder how your body talks to different cells? It uses microscopic chemical messengers called Peptides. Here is how they work in real biology!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 'skin',
                title: 'Collagen & Skin',
                icon: Heart,
                color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
                desc: 'Collagen is a famous structural protein. It starts as small peptides working together to keep human skin strong, bouncy, and resilient!'
              },
              {
                id: 'brain',
                title: 'Brain Messengers',
                icon: Brain,
                color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
                desc: 'Neuropeptides allow brain cells to whisper thoughts and signals to each other, helping you think, read, and learn science facts!'
              },
              {
                id: 'energy',
                title: 'Insulin & Sugar',
                icon: Zap,
                color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
                desc: 'Insulin is a small protein-hormone peptide that acts as a key, letting energy sugars leave your blood and enter cells to power your play.'
              },
              {
                id: 'defense',
                title: 'Immune Warriors',
                icon: ShieldCheck,
                color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
                desc: 'Antimicrobial peptides act like molecular shields. They spot bad bacteria on your skin or cuts and help safely keep them away.'
              }
            ].map((card) => (
              <div 
                key={card.id} 
                onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
                className={`p-6 rounded-3xl border bg-slate-800/40 cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between ${card.color}`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-900/80 flex items-center justify-center mb-4 border border-slate-800">
                    <card.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-100 mb-2">{card.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400">Click to learn chemical truth</span>
                  <span className="underline hover:text-white">Expand &rarr;</span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Modal / Pop-out detail explanation */}
          <AnimatePresence>
            {activeCard && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-indigo-950/60 border border-indigo-500/30 p-6 rounded-3xl"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-indigo-400" />
                    <h4 className="text-lg font-bold text-slate-100">
                      Deep Dive: {activeCard === 'skin' ? 'How Collagen Heals' : activeCard === 'brain' ? 'Brain Communication Paths' : activeCard === 'energy' ? 'Metabolic Fueling Systems' : 'The Immune Shield Chemistry'}
                    </h4>
                  </div>
                  <button 
                    onClick={() => setActiveCard(null)}
                    className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {activeCard === 'skin' && 'Collagen works in a triple helix format. Three amino acid chains wind tightly around each other. Because it is so tightly wound, it acts like steel cables inside our skin, tendon, and bones! Synthetic peptides are sometimes studied to mimic this healing power.'}
                  {activeCard === 'brain' && 'Our bodies produce endorphins, which are natural peptides that act like internal pain-relievers. Whenever you exercise, run, or laugh, endorphin peptides plug into brain receptors to make you feel content and energized.'}
                  {activeCard === 'energy' && 'Without the peptide hormone insulin, our muscle cells would not receive nutrition. It serves as a biological password to safely process sugar molecules and turn food into pure energy for studying chemistry.'}
                  {activeCard === 'defense' && 'Host defense peptides have unique electrostatic charges. They hold positive charges while bad bacterial membranes hold negative charges. They snap together, neutralizing threat cells without needing chemical medication!'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Science Quiz Section */}
        <section id="quiz" className="scroll-mt-24">
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 border border-indigo-900/40 rounded-[32px] p-6 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-2xl mx-auto text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">Interactive Challenge</span>
              <h2 className="text-3xl font-extrabold mt-3 text-slate-100">Are You a Peptide Pioneer?</h2>
              <p className="text-slate-400 text-sm mt-1">
                Take our fast interactive quiz to test your newly discovered knowledge!
              </p>
            </div>

            <div className="max-w-2xl mx-auto bg-slate-900/80 rounded-2xl border border-slate-800 p-6 md:p-8">
              {!quizFinished ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                      Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
                    </span>
                    <span className="text-xs font-semibold bg-slate-800 px-2.5 py-1 rounded-md text-slate-300">
                      Score: {score}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-slate-100 mb-6">
                    {QUIZ_QUESTIONS[currentQuestion].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[currentQuestion].options.map((option, idx) => {
                      let btnStyle = "border-slate-800 bg-slate-800/40 hover:bg-slate-800 text-slate-300";
                      
                      if (selectedAnswer !== null) {
                        if (idx === QUIZ_QUESTIONS[currentQuestion].answer) {
                          btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-300";
                        } else if (idx === selectedAnswer) {
                          btnStyle = "border-rose-500 bg-rose-500/10 text-rose-300";
                        } else {
                          btnStyle = "opacity-40 border-slate-800 bg-slate-800/40 text-slate-400";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleAnswerSelect(idx)}
                          disabled={selectedAnswer !== null}
                          className={`w-full text-left p-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{option}</span>
                          {selectedAnswer !== null && idx === QUIZ_QUESTIONS[currentQuestion].answer && (
                            <Check className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                          )}
                          {selectedAnswer !== null && idx === selectedAnswer && idx !== QUIZ_QUESTIONS[currentQuestion].answer && (
                            <X className="w-5 h-5 text-rose-400 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {selectedAnswer !== null && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-sm"
                    >
                      <p className="font-bold text-indigo-300 mb-1">Did you know?</p>
                      <p className="text-slate-300">{QUIZ_QUESTIONS[currentQuestion].explanation}</p>
                      
                      <button
                        onClick={nextQuestion}
                        className="mt-4 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-slate-100 font-bold rounded-lg text-xs tracking-wide uppercase transition-colors"
                      >
                        {currentQuestion === QUIZ_QUESTIONS.length - 1 ? "Finish Quiz" : "Next Question"}
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-yellow-500/20">
                    <Award className="w-8 h-8 text-slate-900" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-100">Lab Certification Complete!</h3>
                  <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">
                    You completed the Peptide Pioneer Challenge! Your biochemistry knowledge is growing stronger.
                  </p>
                  <div className="mt-6 inline-block bg-slate-800/80 px-6 py-3 rounded-2xl border border-slate-700">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Final Score</p>
                    <p className="text-3xl font-extrabold text-cyan-400 mt-1">{score} / {QUIZ_QUESTIONS.length}</p>
                  </div>
                  <div className="mt-8">
                    <button
                      onClick={resetQuiz}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-sm transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" /> Try Again
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Safe STEM Information Banner */}
        <section className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h4 className="font-bold text-slate-200 text-lg flex items-center gap-2 justify-center md:justify-start">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              100% Safe STEM Education Initiative
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We never collect payment data or sell products. Peptide Pioneers is an educational gateway created solely to introduce young learners, parents, and schools to the organic chemical structures of natural micro-biology. Always consult medical professionals regarding real-world healthcare!
            </p>
          </div>
          <div className="shrink-0 flex gap-3">
            <span className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-300">
              No Purchases
            </span>
            <span className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-300">
              No Sign-ups
            </span>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/60 py-12 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Dna className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-400">Peptide Pioneers Laboratory Portal</span>
          </div>
          <p className="max-w-md mx-auto">
            Design inspired by chemistry textbooks and molecular physics. Built using React, Tailwind CSS, and Framer Motion animation sets.
          </p>
          <p className="text-[10px] text-slate-600">
            &copy; {new Date().getFullYear()} Peptide Pioneers. Created for safe science classrooms everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
}