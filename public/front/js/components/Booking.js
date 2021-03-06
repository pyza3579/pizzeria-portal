import {select, templates, settings,classNames} from '../settings.js';
import utils from '../utils.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';

export class Booking {
  constructor(xyz) { 
    const thisBooking = this;
    thisBooking.render(xyz);
    thisBooking.initWidgets();
    thisBooking.getData();
    thisBooking.selectTable();
    
    
  }

  getData(){
    const thisBooking = this;

    const startDateParam = settings.db.dateStartParamKey + '=' + utils.dateToStr(thisBooking.datePicker.minDate);
    const endDateParam = settings.db.dateEndParamKey + '=' + utils.dateToStr(thisBooking.datePicker.maxDate);
    
    const params = {
      booking: [
        startDateParam,
        endDateParam,
      ],
      eventsCurrent: [
        startDateParam,
        endDateParam,
        settings.db.notRepeatParam,

      ],
      eventsRepeat: [
        endDateParam,
        settings.db.repeatParam,

      ],
    };

    //console.log('params', params);
    const urls = {
      booking:       settings.db.url + '/' + settings.db.booking + '?' + params.booking.join('&'),
      eventsCurrent: settings.db.url + '/' + settings.db.event   + '?' + params.eventsCurrent.join('&'),
      eventsRepeat:  settings.db.url + '/' + settings.db.event   + '?' + params.eventsRepeat.join('&'),

    };
    Promise.all([
      fetch(urls.booking),
      fetch(urls.eventsCurrent),
      fetch(urls.eventsRepeat),
    ])
      .then(function(allResponses){
        const bookingsResponse = allResponses[0];
        const eventsCurrentResponse = allResponses[1];
        const eventsRepeatResponse = allResponses[2];
        return Promise.all([
          bookingsResponse.json(),
          eventsCurrentResponse.json(),
          eventsRepeatResponse.json(),
        ]);
      })
      .then(function([bookings, eventsCurrent, eventsRepeat]){
        
        //console.log('bookings', bookings);
        //console.log('eventsCurrent', eventsCurrent);
        //console.log('eventsRepeat', eventsRepeat);
        thisBooking.parseData(bookings, eventsCurrent, eventsRepeat);
      });
  }
  parseData(bookings, eventsCurrent, eventsRepeat){
    const thisBooking = this;
    thisBooking.booked = {};
    console.log('thisBooking.booked', thisBooking.booked);

    for(let item of eventsCurrent){
      
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }
    //console.log('thisBooking.booked', thisBooking.booked);
    
    for(let item of bookings){
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }

    const minDate= thisBooking.datePicker.minDate;
    const maxDate= thisBooking.datePicker.maxDate;
        
    for(let item of eventsRepeat){ 
      if(item.repeat == 'daily'){
        for(let loopDate = minDate; loopDate <= maxDate; loopDate = utils.addDays(loopDate, 1)){
          thisBooking.makeBooked(utils.dateToStr(loopDate), item.hour, item.duration, item.table);
        }
      }
    }

    thisBooking.updateDOM();
  }
  makeBooked(date, hour, duration, table){
    const thisBooking = this;

    if(typeof thisBooking.booked[date] == 'undefined'){
      thisBooking.booked[date] = {};
    }

    const startHour = utils.hourToNumber(hour);
    

    for(let hourBlock = startHour; hourBlock < startHour + duration; hourBlock += 0.5){
      //console.log('loop',hourBlock);
      if(typeof thisBooking.booked[date][hourBlock] == 'undefined'){
        thisBooking.booked[date][hourBlock] = [];
      }
      thisBooking.booked[date][hourBlock].push(table);
    }

  }

  updateDOM(){
    const thisBooking = this;
    thisBooking.selectedTables = [];
    thisBooking.date = thisBooking.datePicker.value;
    if (thisBooking.date.length === 1) {
      thisBooking.date = utils.dateToStr(thisBooking.date[0]);
    }
    thisBooking.hour = utils.hourToNumber(thisBooking.hourPicker.value);

    let allAvailable = false;

    if(
      typeof thisBooking.booked[thisBooking.date] == 'undefined',
      
      typeof thisBooking.booked[thisBooking.date][thisBooking.hour] == 'undefined'
    ){
      allAvailable = true;
    }

    for(let table of thisBooking.dom.tables){
      //console.log('thisBooking.dom.tables',thisBooking.dom.tables);
      let tableId = table.getAttribute(settings.booking.tableIdAttribute);
      if(!isNaN(tableId)){
        tableId = parseInt(tableId);
      }

      if(
        !allAvailable
        &&
        thisBooking.booked[thisBooking.date][thisBooking.hour].includes(tableId)
      ){
        table.classList.add(classNames.booking.tableBooked);
      } else {
        table.classList.remove(classNames.booking.tableBooked);
      }

    }
  }
  selectTable(){
    const thisBooking = this;
    thisBooking.date = thisBooking.datePicker.value;
    thisBooking.hour = utils.hourToNumber(thisBooking.hourPicker.value);
    thisBooking.selectedTables = thisBooking.selectedTables || [];
    
    //find free tables
    for(let table of thisBooking.dom.tables){
      table.addEventListener('click', function(){
        let tableId = table.getAttribute(settings.booking.tableIdAttribute); 
        const bookedTable = table.classList.contains(classNames.booking.tableBooked);
        thisBooking.selectedTables.push(tableId);
        //console.log('bookedTable', bookedTable);
        
        if (!bookedTable) {
          //debugger;
          table.classList.add(classNames.booking.tableBooked);
          console.log('rezerwacja', tableId);
        } else {
          table.classList.remove(classNames.booking.tableBooked);
          console.log('koniec rezerwacji', tableId);
        }

      });
    }
  }

  sendReservation() {
    const thisBooking= this;
    const url = settings.db.url + '/' + settings.db.booking;
    const payload = {
      address: thisBooking.dom.adress.value, //dodalam wlasciwosc w setting tez, no bo skad inaczej mialby ciagnac info?
      phone: thisBooking.dom.phone.value,
      peopleAmount: thisBooking.peopleAmount.correctValue,
      hourAmount: thisBooking.hoursAmount.correctValue,
      Date: thisBooking.date,
      hour: thisBooking.hourPicker.value,
      tables: thisBooking.selectedTables,
      starters: [],
    };
    console.log('payload :', payload );

    for(let starter of thisBooking.dom.starters){
      if (starter.checked == true){
        payload.starters.push(starter.value);
        console.log('starter.value:', starter.value);
      }
    }

    for(let table of thisBooking.dom.tables){
      const bookedTable = table.classList.contains(classNames.booking.tableBooked);
      if (bookedTable == true){ //nie wiem co dalej tutaj
       
      }
    }
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    fetch(url, options)
      .then(function(response){
        return response.json();
      })
      .then(function(parsedResponse){
        console.log('parsedResponse', parsedResponse);
      });
  }
  render(booking) {
    const thisBooking = this;

    /* generate HTML based on template */
    const generatedHTML = templates.bookingWidget();
    /* generate empty object thisBoking.dom */
    thisBooking.dom = {};
    /* save to this object wrapper as argument*/
    thisBooking.dom.wrapper = booking;
    /* change wrapper into HTML from the template */
    thisBooking.dom.wrapper.innerHTML = generatedHTML;
    /* in property thisBooking.dom.peopleAmount save every singleelement find in wrapper passend to the selector select.booking.peopleAmount */
    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(select.booking.peopleAmount);
    /* the same for hoursAmount */
    thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(select.booking.hoursAmount);
    
    thisBooking.dom.datePicker = thisBooking.dom.wrapper.querySelector(select.widgets.datePicker.wrapper); //wyszukane we wraperze, tak? czy document?
    thisBooking.dom.hourPicker = thisBooking.dom.wrapper.querySelector(select.widgets.hourPicker.wrapper); 
    thisBooking.dom.tables = thisBooking.dom.wrapper.querySelectorAll(select.booking.tables); 
    thisBooking.dom.phone = thisBooking.dom.wrapper.querySelector(select.booking.phone); 
    thisBooking.dom.adress = thisBooking.dom.wrapper.querySelector(select.booking.address); 
    thisBooking.dom.form = thisBooking.dom.wrapper.querySelector(select.booking.bookingForm);
    thisBooking.dom.starters = thisBooking.dom.wrapper.querySelectorAll(select.booking.starters);
  }

  initWidgets() {
    const thisBooking = this;
    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);

    thisBooking.dom.wrapper.addEventListener('updated', function(){
      thisBooking.updateDOM();
    });
    thisBooking.dom.form.addEventListener('submit', function(){
      event.preventDefault();
      thisBooking.sendReservation();
    });
    
  }
}
export default Booking;