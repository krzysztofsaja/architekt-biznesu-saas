export default function Regulamin({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100] overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full my-8 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Regulamin aplikacji</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl">&times;</button>
        </div>
        
        <div className="space-y-4 text-sm text-gray-700">
          <section>
            <h3 className="font-bold text-lg mb-2">1. Postanowienia ogólne</h3>
            <p>Smieciarka App to platforma do oddawania niepotrzebnych przedmiotów w sąsiedztwie. Korzystając z aplikacji akceptujesz niniejszy regulamin.</p>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-2">2. Zasady użytkowania</h3>
            <ul className="list-disc pl-4 space-y-1">
              <li>Dodawane przedmioty muszą być Twoją własnością</li>
              <li>Zdjęcia muszą przedstawiać rzeczywisty stan przedmiotu</li>
              <li>Kontakt musi być prawdziwy i aktywny</li>
              <li>Zabronione są przedmioty nielegalne lub niebezpieczne</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-2">3. Odpowiedzialność</h3>
            <p>Użytkownik odpowiada za prawdziwość podanych danych. Aplikacja nie ponosi odpowiedzialności za transakcje między użytkownikami.</p>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-2">4. Prywatność</h3>
            <p>Twoje dane są przechowywane zgodnie z polityką prywatności Supabase. Nie udostępniamy danych osobowych osobom trzecim.</p>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-2">5. Kontakt</h3>
            <p>W sprawach technicznych skontaktuj się przez formularz w aplikacji lub email.</p>
          </section>

          <div className="pt-4 text-center text-gray-500 text-xs">
            <p>Aktualizacja: {new Date().toLocaleDateString('pl-PL')}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-primary text-white py-3 rounded-lg font-medium mt-6 hover:bg-green-600"
        >
          Rozumiem i akceptuję
        </button>
      </div>
    </div>
  );
}