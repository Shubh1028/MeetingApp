import {
    addMeeting
} from '../services/auth.js';

const nameFetch = document.getElementById('name');
const nameAlert = document.getElementById('name-alert');
const dateFetch = document.getElementById('date2');
const startTimeHour = document.getElementById('s-time-hour');
const startTimeMinute = document.getElementById('s-time-minute')
const endTimeHour = document.getElementById('e-time-hour');
const endTimeMinute = document.getElementById('e-time-minute')
const descriptionFetch = document.getElementById('description');
const attendeesFetch = document.getElementById('email-teamShort');
const dateAlert = document.getElementById('date-alert');
const startTimeAlert = document.getElementById('start-time-alert');
const endTimeAlert = document.getElementById('end-time-alert');
const descriptionAlert = document.getElementById('description-alert');
const attendeesAlert = document.getElementById('attendees-alert');


function validation() {
    let errors = null;
    const dateMeet = dateFetch.value;
    const startTimeHourMeet = startTimeHour.value;
    const startTimeMinuteMeet = startTimeMinute.value;
    const endTimeHourMeet = endTimeHour.value;
    const endTimeMinuteMeet = endTimeMinute.value;
    const descriptionMeet = descriptionFetch.value;
    const attendeesMeet = attendeesFetch.value;

    let today = new Date()

    if(dateMeet === '') {
        errors = {
            ...errors,
            required: 'Date is required.'
        }
        dateAlert.textContent = errors.required;
    }else {
        dateAlert.textContent = '';
    }


    if(startTimeHourMeet === '' && startTimeMinuteMeet === '') {
        errors = {
            ...errors,
            required: 'Start Time is required.'
        }
        startTimeAlert.textContent = errors.required;
    }else {
        startTimeAlert.textContent = '';
    }

    if(endTimeHourMeet === '' && endTimeMinuteMeet === '') {
        errors = {
            ...errors,
            required: 'End Time is required.'
        }
        endTimeAlert.textContent = errors.required;
    }else {
        endTimeAlert.textContent = '';
    }


    if(descriptionMeet === '') {
        errors = {
            ...errors,
            required: 'Description is required.'
        }
        descriptionAlert.textContent = errors.required;
    }else {
        descriptionAlert.textContent = '';
    }


    if(attendeesMeet === '') {
        errors = {
            ...errors,
            required: 'Attendees is required.'
        }
        attendeesAlert.textContent = errors.required;
    }else {
        attendeesAlert.textContent = '';
    }
}

async function onAddMeetingFormSubmit( event ) {
    event.preventDefault();

    const date = dateFetch.value;
    const name= nameFetch.value;
     
    const description = descriptionFetch.value;

    let email = attendeesFetch.value;
    let arr = []
    let obj = {}
    let add = '';
     for(let i = 0;i <email.length; i++) {
        if(email[i] === ',') {
            obj = {
                email: add.trim
            }
            arr.push(obj);
            add = ''
            continue;
        }
        add = add + email[i];
     }
     obj = {
        email: add.trim()
     }
     arr.push(obj);

    const addMeetingDetails = {
       name,
       date,
       description,
       startTime : {
        hours: parseInt(startTimeHour.value),
        minutes: parseInt(startTimeMinute.value),
       },
       endTime : {
        hours: parseInt(endTimeHour.value),
        minutes: parseInt(endTimeMinute.value)
       },
       attendees : arr

    };

    console.log(date);

    const errors = {
       validate: validation()
    };

    if(!errors.validate) {
    try {
        const data = await addMeeting( addMeetingDetails );
       nameFetch.value = '';
       dateFetch.value = '';
       startTimeHour.value = '';
       startTimeMinute.value = '';
       endTimeHour.value = '';
       endTimeMinute.value = '';
       descriptionFetch.value = '';
       attendeesFetch.value = '';
       alert("Meeting Added Succcessfully");

    } catch( error ) {
        console.log( error.message );
    }
}
}

document.addEventListener( 'DOMContentLoaded', function() {
    document.querySelector( '#add-meeting-form' ).addEventListener( 'submit', onAddMeetingFormSubmit );
});