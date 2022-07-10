import {
    fetchMeetings
} from '../services/auth.js';


const showMeetings = ( meetings ) => {
    const workshopsListEl = document.querySelector( '.search-results' );

    let workshopsListStr = '';

    meetings.forEach(
        meeting => {
            let eachEmail = ''
            let emailList =  meeting.attendees;
           emailList.forEach(
                object => {
                    eachEmail += `${object.email}  `;
                }
            )
            let newDate = new Date(meeting.date).toLocaleDateString();
            const {
                name,
            } = meeting;

            const workshopStr = `
            <div class="meetings-matching-box">
            <span class="f-b f-l">${newDate}</span
            ><span class="pl-2">${meeting.startTime.hours}:${meeting.startTime.minutes} - ${meeting.endTime.hours}:${meeting.endTime.minutes}</span><br />
            <span>${name}</span><br />
            <button class="btn btn-danger">Excuse yourself</button>
            <hr />
            <span class="f-b f-m">Attendees</span><br />
            <span>${eachEmail}</span><br />
            <input class="p-2 b-r" type="email" placeholder="Select Member" />
            <button class="btn btn-primary mt-2">Add</button>
          </div>
            `;

            workshopsListStr += workshopStr;
        }
    );

    workshopsListEl.innerHTML = workshopsListStr;
};






const fetchAndShowMeetings = async () => {
    const time = document.getElementById('time').value;
const search = document.getElementById('search').value;

    try {
        const meetings = await fetchMeetings( time, search );
        showMeetings(meetings);
    } catch( error ) {
        console.log( error.message );
    }
};









document.addEventListener( 'DOMContentLoaded', function() {
    document.querySelector( '#search-meeting-form' ).addEventListener( 'submit', function(event) {
        event.preventDefault();
        fetchAndShowMeetings();
    } );
});