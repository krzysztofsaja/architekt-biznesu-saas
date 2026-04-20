import { useState } from 'react';

export default function LandingModal({ onStart }) {
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      emoji: '🌍',
      title: 'Daj przedmiotom drugie życie',
      text: 'Nie wyrzucaj - oddaj komuś kto ich naprawdę potrzebuje!',
    },
    {
      emoji: '♻️',
      title: 'Eco to trendy',
      text: 'Każdy oddany przedmiot to mniej śmieci na wysypisku. Razem chronimy planetę!',
    },
    {
      emoji: '🤝',
      title: 'Pomagasz sąsiadom',
      text: 'Twoje niepotrzebne rzeczy mogą komuś bardzo pomóc. Za darmo!',
    },
  ];

  const handleNext = () => {
    if (slide < slides.length - 1) {
      setSlide(slide + 1);
    } else {
      onStart();
    }
  };

  return (
    <div className="fixed inset-0 bg-[#1e3a8a] flex items-center justify-center p-4 z-[200]">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="text-6xl mb-6">{slides[slide].emoji}</div>
        
        <h1 className="text-2xl font-bold text-[#1e3a8a] mb-4">
          {slides[slide].title}
        </h1>
        
        <p className="text-gray-600 text-lg mb-8">
          {slides[slide].text}
        </p>

        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, i) => (
            <div 
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === slide ? 'bg-[#1e3a8a]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-3">
          {slide > 0 && (
            <button
              onClick={() => setSlide(slide - 1)}
              className="flex-1 border-2 border-[#1e3a8a] text-[#1e3a8a] py-3 rounded-lg font-medium"
            >
              Wstecz
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 bg-[#1e3a8a] text-white py-3 rounded-lg font-medium hover:bg-[#1e40af]"
          >
            {slide === slides.length - 1 ? '🚀 Rozpocznij' : 'Dalej'}
          </button>
        </div>

        <button
          onClick={onStart}
          className="mt-4 text-gray-400 text-sm hover:text-gray-600"
        >
          Pomiń →
        </button>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center text-white/70 text-sm">
        🌱 Smieciarka App - oddaj, nie wyrzucaj!
      </div>
    </div>
  );
}