const dateField = document.getElementById("date-field");

const fetchCalenderDetails = async (date) => {
  const response = await fetch(
    `https://mymeetingsapp.herokuapp.com/api/calendar?date=${date}`,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(responseText || "Some error occured");
  }
  const calenderDetails = await response.json();

  calculateCalenderDetails(calenderDetails);

  return calenderDetails;
};

function calculateCalenderDetails(details) {
  for (let i = 0; i < details.length; i++) {
    const meetAttendees = details[i].attendees;
    console.log(meetAttendees);
    let marginTopMeet =
      details[i].startTime.hours * 60 + details[i].startTime.minutes;
    console.log(marginTopMeet);
    let heightMeet =
      60 * (details[i].endTime.hours - details[i].startTime.hours) - (details[i].startTime.minutes - details[i].endTime.minutes) - 10;
    console.log(heightMeet);

    attendeesEmailList = [];
    meetAttendees.forEach((attendee) => {
      attendeesEmailList.push(attendee.email);
    });
    showMeetings(
      details[i].name,
      attendeesEmailList,
      marginTopMeet,
      heightMeet
    );
  }
}

function showMeetings(meetName, membersList, marginTopMeet, heightMeet) {
  let showMeetContainer = document.getElementById("show-meetings-container");

  let showMeetContainerStr = "";
  let attendeesList = membersList.join(" ");

  const meetingStr = ` <div class="meeting" style="top: ${marginTopMeet}px; height: ${heightMeet}px">
    <span>${meetName}</span><br>
    <span>${attendeesList}</span>
</div>`;

  showMeetContainerStr += meetingStr;
  showMeetContainer.innerHTML = showMeetContainerStr;
}

const fetchAndShowCalender = async (date) => {
  try {
    const calenderDetails = await fetchCalenderDetails(date);
    console.log(calenderDetails);
  } catch (error) {
    console.log(error);
  }
};

function dateSelect(e) {
  e.preventDefault();
  const selectedDate = e.target.value;
  fetchAndShowCalender(selectedDate);
}

const getTodaysDate = () => {
  let today = new Date().toISOString().slice(0, 10);
  dateField.defaultValue = today;
  return today;
};

const setDateAndDay = async (today) => {
  const todayInWords = today.split("-");
  const month = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // show the Todays Date month and year
  const monthKey = parseInt(todayInWords[1]) - 1;
  document.getElementById(
    "date-show"
  ).textContent = `${todayInWords[2]} ${month[monthKey]} ${todayInWords[0]}`;

  // show the Todays date
  const day = new Date(
    `${month[monthKey]} ${todayInWords[2]}, ${todayInWords[0]}`
  );
  document.getElementById("day-show").textContent = `${daysArr[day.getDay()]}`;
};

document.addEventListener("DOMContentLoaded", function () {
  setDateAndDay(getTodaysDate());

  let today = new Date().toISOString().slice(0, 10);
  dateField.value = today;
  fetchAndShowCalender(today);
});
