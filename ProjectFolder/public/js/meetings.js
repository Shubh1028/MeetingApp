document.getElementById('add-meetings-btn').addEventListener('click', display);
document.getElementById('filter-meetings-btn').addEventListener('click', display2);

function display(){
    let selectedNewMeetings = document.getElementById('new-meetings')
    let selectedFilterMettings = document.getElementById('search-for-meetings')
    let classAddMeeting = document.querySelector('.add-meetings')
    let classFilterMeeting = document.querySelector('.filter-meetings')

    selectedNewMeetings.style.display = 'block';
    selectedFilterMettings.style.display = 'none';
    classAddMeeting.style.color = 'blue';
    classFilterMeeting.style.color = 'black';
}

function display2(){
    let selectedNewMeetings = document.getElementById('new-meetings')
    let selectedFilterMettings = document.getElementById('search-for-meetings')
    let classAddMeeting = document.querySelector('.add-meetings')
    let classFilterMeeting = document.querySelector('.filter-meetings')

        selectedFilterMettings.style.display = 'block';
        selectedNewMeetings.style.display = 'none'
        classAddMeeting.style.color = 'black';
        classFilterMeeting.style.color = 'blue';
}