#Dashboard

-'/'
    -statystyki dzisiejszych zamowien (zdalne, lokalne)
    -lista rezerwacji i eventow zaplanowanych na dzisiaj

#Logowanie

-'/login'

    -pola na login i haslo
    -guzik do zalogowania(link do dashoboardu)

#Widok dostepnosci stolikow

-'/tables'
    -wybor daty i godziny
    -tabela z lista rezerwacji oraz wydarzen
        -kazda kolumna = 1 stolik
        -kazdy wiersz = 30min
        -bedzie przypominac widok tygodnia w kalendarzu google, gdzie w kolumnach zamiast dni sa rozne stoliki
        -po kliknieciu rezerwacji lub eventu przeodzimy na strone szczegolu

-'/tables/booking/:id'
    -zawiera wszystkie informacje dotyczace rezerwacji
    -umozliwia edycje i zapisanie zmian
-'/tables/booking/new'
    -umozliwia edycje i zapisanie zmian bez poczatkowych informacji
-'/tables/events/:id'
    -umozliwia edycje i zapisanie zmian eventow bez poczatkowych informacji
-'/tables/events/new'
    -umozliwia edycje i zapisanie zmian eventow bez poczatkowych informacji


#Widok kelnera

-'/waiter'
    -tabela, ktora w w wierszych wyswietla stoliki, 
    -w kolumnch rozne rodzaje informacji (status stolika, czas od ostatniej aktywnosci)
    -w ostatniej kolumnie wyswietla dostepne akcje dla danego stolika

-'/waiter/order/new'
    -numer stolika (edytowalny)
    -menu produktow dostepnych w restauracji
    -opcje wybranego produktu
    -zamowienie, czyli zamowione produkty z opcjami i cena
    -kwota zamowienia
-'/waiter/order/:id'
    -jak powyzsza
#Widok kuchni
-'/kitchen'
    -lista zamowien w kolejnosci zlozenia
        -numer stolika lub zamowienia zdalnego
        -pelne informacje dotyczace zamowionych dan
    -na liscie musi byc mozliwosc oznaczenia zamowienia jako zrealizowanego
