
const calendar = document.querySelector('.calendar'),
  data = document.querySelector('.date'),
  daysContainer = document.querySelector('.days'),
  prev = document.querySelector('.prev'),
  next = document.querySelector('.next'),
  todayBtn = document.querySelector('.today-btn'),
  gotoBtn = document.querySelector('.goto-btn'),
  dateInput = document.querySelector('.date-input'),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventSubmit = document.querySelector(".add-event-btn")

let today = new Date()
let activeDay
let month = today.getMonth()
let year = today.getFullYear()

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
        title: "Event 1",
        time: '10:00 AM'
      },
      {
        title: "Event 2",
        time: "11:00 AM"
      }
    ]
  }, 
  {
    day: 17,
    month: 05,
    year: 2023,
    events: [
      {
        title: "Event 1 lorem ipsun dolar sit genda teds das",
        time: '10:00 AM'
      },
    ]
  }
]

//active day events and date at top
const getActiveDay = (date) => {
  const day = new Date(year, month, date)
  const dayName = day.toString().split(" ")[0]
  eventDay.innerHTML = dayName
  eventDate.innerHTML = date + " " + months[month] + " " + year
}

//function to show events of that day
const updateEvents = (date) => {
  let events = ''
  eventsArr.forEach((event) => {
    //get events of active day only
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      //show event on document
      event.events.forEach((event) => {
        events += `
          <div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
          </div>
        `
      })
    }
  })

  if ((events === '')) {
    events = `
      <div class="no-event">
        <h3>No Events</h3>
      </div>
    `
  }

  eventsContainer.innerHTML = events
}

//add days after render
const addListener = () => {
  const days = document.querySelectorAll('.day')
  days.forEach((day) => {
    day.addEventListener('click', (e) => {
      //set current day as active day
      activeDay = Number(e.target.innerHTML)

      //call active day after click
      getActiveDay(e.target.innerHTML)
      updateEvents(Number(e.target.innerHTML))

      //remove active from already active day
      days.forEach((day) => {
        day.classList.remove('active')
      })

      //if prev month day clicked goto prev month and add active
      if(e.target.classList.contains("prev-date")) {
        prevMonth()

        setTimeout(() => {
          //select all days of that month
          const days = document.querySelectorAll('.day')

          //after going to prev moth, add active to clicked
          days.forEach((day) => {
            if(!day.classList.contains('prev-date') && 
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add('active')
            }
          })
        }, 100)
      } else if (e.target.classList.contains("next-date")) {
        nextMonth()

        setTimeout(() => {
          //select all days of that month
          const days = document.querySelectorAll('.day')

          //after going to prev moth, add active to clicked
          days.forEach((day) => {
            if(!day.classList.contains('next-date') && 
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add('active')
            }
          })
        }, 100)
      } else {
        //remaing current month days
        e.target.classList.add('active')

      }
    })
  })
}

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
  for (let i = 1; i <= lastDate; i++) {
    //check if event is present on current day
    let event = false
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        //if event found
        event = true
      }
    })

    //if days is today, add class today
    if(i === new Date().getDate() 
      && year === new Date().getFullYear() 
      && month === new Date().getMonth())
    {
      activeDay = i
      getActiveDay(i)
      updateEvents(i)
      //if event found also add event class
      //add active on today at startup
      if (event) {
        days += `<div class="day today active event">${i}</div>`
      } else {
        days += `<div class="day today active">${i}</div>`
      }
    }

    else {
      if (event) {
        days += `<div class="day event">${i}</div>`
      } else {
        days += `<div class="day">${i}</div>`
      }
    }
  }

  //next month days
  for(let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`
  }

  daysContainer.innerHTML = days

  //add listener after calendar initialized
  addListener()
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

const convertTime = (time) => {
  let timeArr = time.split(":")
  let timeHour = timeArr[0]
  let timeMin = timeArr[1]
  let timeFormat = timeHour >= 12 ? 'PM' : 'AM'
  timeHour = timeHour % 12 || 12
  time = timeHour + ":" + timeMin + " " + timeFormat
  return time
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

//function to add events
addEventSubmit.addEventListener('click', () => {
  const eventTitle = addEventTitle.value
  const eventTimeFrom = addEventFrom.value
  const eventTimeTo = addEventTo.value

  //validations
  if(eventTitle === "" || eventTimeFrom === '' || eventTimeTo === '') {
    alert('Please fill all the fields')
  }

  const timeFromArr = eventTimeFrom.split(':')
  const timeToArr = eventTimeTo.split(':')

  if(
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert('Invalid Time')
  }

  const timeFrom = convertTime(eventTimeFrom)
  const timeTo = convertTime(eventTimeTo)

  const newEvent = {
    title : eventTitle,
    time: timeFrom + " - " + timeTo,
  }

  let eventAdded = false

  //check if eventsArr not empty
  if (eventsArr.length > 0) {
    //check if current day has already an event
    eventsArr.forEach((item) => {
      if(
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newEvent)
        eventAdded = true
      }
    })
  }

  //if event array empty or current day has no event create a new
  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent]
    })
  }

  //remove active from add event form
  addEventContainer.classList.remove('active')
  //clear the fields
  addEventTitle.value = ""
  addEventFrom.value = ""
  addEventTo.value = ""

  //show current added event
  updateEvents(activeDay)

  //add event class to newly event
  const activeDayElem = document.querySelector('.day.active')
  if (!activeDayElem.classList.contains('event')) {
    activeDayElem.classList.add('event')
  }
})

//remove events on click
eventsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('event')) {
    const eventTitle = e.target.children[0].children[1].innerHTML

    //get title of event and search in the array to delete
    eventsArr.forEach((event) => {
      if (
        event.day === activeDay &&
        event.month === month + 1 &&
        event.year === year
      ) {
        event.events.forEach((item, index) => {
          if (item.title === eventTitle) {
            event.events.splice(index, 1)
          }
        })

        //if not event remaing on day, remove complete day
        if (event.events.length === 0) {
          eventsArr.splice(eventsArr.indexOf(event), 1)
          //after remove complete day also remove active class of that day


          const activeDayElem = document.querySelector('.day.active')
          if (activeDayElem.classList.contains('event')) {
            activeDayElem.classList.remove('event')
          }
        }
      }
    })

    //after remove, update
    updateEvents(activeDay)
  }
})