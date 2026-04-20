-- Dane do tabeli items (do wklejenia w Supabase SQL Editor)
-- Wklej i uruchom w: https://smfplvmqzqhjcnqsjhyp.supabase.co/project/_/sql

INSERT INTO items (title, description, status, latitude, longitude, contact) VALUES
('Stary wózek dziecięcy', 'Kompletny wózek marki Britax, stan dobry', 'available', 52.2297, 21.0122, 'kontakt@email.pl'),
('Krzesło biurowe', 'Ergonomiczne krzesło z podłokietnikami', 'available', 52.4064, 16.9253, 'info@firma.pl'),
('Lodówka', 'Mała lodówka Ariston, sprawna', 'available', 52.2328, 21.0181, 'tel:123456789'),
('Rower dziecięcy', 'Rowerek dla dziecka 3-5 lat', 'available', 52.2297, 21.0122, 'rodzice@email.pl'),
('Stół drewniany', 'Dębowy stół rozkładany', 'available', 52.4064, 16.9253, 'stol@email.pl'),
('Laptop HP', 'Laptop Pavilion, wymaga naprawy', 'available', 52.2297, 21.0122, 'laptop@email.pl'),
('Telewizor Samsung', 'TV 32 cale, ekran pęknięty', 'unavailable', 52.4064, 16.9253, 'tv@email.pl'),
('Meble ogrodowe', 'Zestaw 4 krzesła + stół', 'available', 52.2297, 21.0122, 'ogrod@email.pl');

INSERT INTO messages (itemId, sender, message) VALUES
((SELECT id FROM items WHERE title = 'Stary wózek dziecięcy' LIMIT 1), 'Jan Kowalski', 'Czy wózek jest jeszcze dostępny?'),
((SELECT id FROM items WHERE title = 'Stary wózek dziecięcy' LIMIT 1), 'Anna Nowak', 'Interesuje mnie, odbiorę jutro'),
((SELECT id FROM items WHERE title = 'Krzesło biurowe' LIMIT 1), 'Piotr Wiśniewski', 'Jaki jest stan krzesła?');