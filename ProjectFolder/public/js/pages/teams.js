import {
    addTeam,
    getTeams
} from '../services/auth.js';

// const teamName = document.getElementById('team-name');
// const teamShortName = document.getElementById('team-short-name');
// const teamDescription = document.getElementById('team-description');
// const btnTeamName = document.getElementById('btn-team-name');

let teamsList = [];

let addedData;


const showTeams = ( teamsList ) => {
    const workshopsListEl = document.querySelector( '.teams-outer-box' );

    let teamsForm = `<div class="teams-inner-box icon-div">
    <form id="add-team-form">
      <input class="p-2 b-r w-full mb-3 input-out-n border-gray" id="team-name" type="text" placeholder="Team Name"/><br>
      <input class="p-2 b-r w-full mb-3 border-gray" id="team-short-name" type="text" placeholder="Team Short Name"/><br>
      <textarea class="p-2 b-r w-full mb-3" id="team-description" placeholder="Provide a description for a team"></textarea>
      <hr>
      <span class="f-b pr-1">Members: </span><span id="team-mebers">john@example.com, jane@example.com</span>
      <input class="p-2 b-r border-gray"  type="email" placeholder="Select Member" />
      <button class="btn btn-primary mt-2">Add</button>
      <button class="btn btn-primary mt-2 w-full" id="btn-add-team" type="submit">Add Team</button>
      </form>
  </div>`

    let workshopsListStr = '';

    teamsList.forEach(
        team => {
            const {
                name,
                shortName,
                description
            } = team;

            const workshopStr = `
            <div class="teams-inner-box">
            <span class="f-l f-b">${name}</span><br>
            <span class="f-m">${shortName}</span><br>
            <span class="lighter">${description}</span><br>
            <button class="btn btn-danger">Excuse Yourself</button>
            <hr>
            <span class="f-b pr-1">Members: </span><span>shubh410sekhar@gmil.com,</span><br>
            <span>shubhsekhar@gmil.com,</span><br>
            <input class="p-2 b-r border-gray" type="email" placeholder="Select Member" />
            <button class="btn btn-primary mt-2">Add</button>

        </div>
            `;

            workshopsListStr += workshopStr;
        }
    );

    workshopsListEl.innerHTML = workshopsListStr + teamsForm;
};



async function onAddTeamFormSubmit( event ) {
    event.preventDefault();
    const teamName = document.getElementById('team-name');
const teamShortName = document.getElementById('team-short-name');
const teamDescription = document.getElementById('team-description');
const btnTeamName = document.getElementById('btn-team-name');

    const name= teamName.value;
    const shortName = teamShortName.value;
    const description = teamDescription.value;
     
    const addTeamDetails = {
       name,
       shortName,
       description,
    };

    try {
        const data = await addTeam( addTeamDetails );
        teamName.value = '';
        teamShortName.value = '';
        teamDescription.value = '';
        // alert("Teams Added Successfully");
        teamsList.push(data);
        // location.reload()
        showTeams(teamsList);
        alert("Teams Added Successfully");

    } catch( error ) {
        console.log( error.message );
}
}

const getAndShowTeams = async () => {
    try {
        const teams = await getTeams();
        teamsList = [...teams]
        showTeams(teamsList)
        document.querySelector( '#add-team-form' ).addEventListener( 'submit', onAddTeamFormSubmit );
    } catch(error) {
        console.log( error.message );
    }
}

document.addEventListener( 'DOMContentLoaded', function() {
     getAndShowTeams()
});