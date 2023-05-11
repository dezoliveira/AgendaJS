const calendar = document.querySelector('.calendar'),
  data = document.querySelector('.date'),
  daysContainer = document.querySelector('.days'),
  prev = document.querySelector('.prev'),
  next = document.querySelector('.next'),
  todayBtn = document.querySelector('.today-btn'),
  gotoBtn = document.querySelector('.goto-btn'),
  dateInput = document.querySelector('.date-input')

let today = new Date()
let activeDay
let month = today.getMonth()
let year = today.getFullYear()

console.log(new Date(year, (month + 1), 0))

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

const eventsArr = [
  {
    day: 21,
    month: 05,
    year: 2023,
    events: [
      {
        title: "Event 1 lorem ipsun dolar sit genda teds das",
        time: '10:00 AM'
      },
      {
        title: "Event 2",
        time: "11:00 AM"
      }
    ]
  }
]

const initCalendar = () => {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, (month + 1), 0)
  const prevLastDay = new Date(year, month, 0)
  const prevDays = prevLastDay.getDate()
  const lastDate = lastDay.getDate()
  const day = firstDay.getDay()
  const nextDays = 7 - lastDay.getDay() - 1

  //date now
  data.innerHTML = months[month] + "/" + year

  //adding days
  let days = ''

  for(let x = day; x > 0; x--){
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`
  }

  //current month days
  for(let i = 1; i <= lastDate; i++) {
    //if days is today, add class today
    if(i === new Date().getDate() 
      && year === new Date().getFullYear() 
      && month === new Date().getMonth())
    {
      days += `<div class="day today">${i}</div>`
    }

    else {
      days += `<div class="day">${i}</div>`
    }
  }

  //next month days
  for(let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`
  }

  daysContainer.innerHTML = days
}

initCalendar()

//prev month
const prevMonth = () => {
  month--
  if(month < 0) {
    month = 11
    year--
  }

  initCalendar()
}

const nextMonth = () => {
  month++
  if(month > 11) {
    month = 0
    year++
  }

  initCalendar()
}

//add eventlistener on prev and next
prev.addEventListener('click', prevMonth)
next.addEventListener('click', nextMonth)

todayBtn.addEventListener('click', () => {
  today = new Date()
  month = today.getMonth()
  year = today.getFullYear()

  initCalendar()
})

dateInput.addEventListener('keyup', (e) => {
  //regex to remove slashes
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, '')
  if(dateInput.value.length === 2) {
    //add a slash after two numbers
    dateInput.value += "/"
  }

  if(dateInput.value.length > 7) {
    //block if exist more than 7 characters
    dateInput.value = dateInput.value.slice(0, 7)
  }

  //if backspace is pressed
  if(e.inputType === "deleteContentBackward") {
    if(dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2)
    }
  }
})

const gotoDate = () => {
  const dateArr = dateInput.value.split("/")
  if(dateArr.length === 2) {
    if(dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1
      year = dateArr[1]
      initCalendar()
      return
    }
    //if invalid
    alert('invalid date')
  }
}

const addEventBtn = document.querySelector('.add-event'),
  addEventContainer = document.querySelector('.add-event-wrapper'),
  addEventCloseBtn = document.querySelector('.close'),
  addEventTitle = document.querySelector('.event-name'),
  addEventFrom = document.querySelector('.event-time-from'),
  addEventTo = document.querySelector('.event-time-to')

gotoBtn.addEventListener('click', gotoDate)

addEventBtn.addEventListener('click', () => {
  addEventContainer.classList.toggle("active")
})

addEventCloseBtn.addEventListener('click', () => {
  addEventContainer.classList.remove("active")
})

document.addEventListener('click', (e) => {
  if(e.target !== addEventBtn && !addEventContainer.contains(e.target)) {
    //if click outside (modal like)
    addEventContainer.classList.remove("active")
  }
})

//allow only 50 chars in title
addEventTitle.addEventListener('input', (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 50)
})

//--- FROM TIME ---
//format time in from and to
addEventFrom.addEventListener('input', (e) => {
  //remove anything else numbers
  //addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "")
  //if two numbers entered, auto add :
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":"
  }
  //dont allow user enter mroe than 5 chars
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5)
  }
})

//--- TO TIME ---
//format time in from and to
addEventTo.addEventListener('input', (e) => {
  //remove anything else numbers
  //addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "")
  //if two numbers entered, auto add :
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":"
  }
  //dont allow user enter mroe than 5 chars
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5)
  }
})