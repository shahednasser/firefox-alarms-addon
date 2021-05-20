$(document).ready(() => {
    const listElement = $("#alarmsList");
    
    browser.storage.sync.get(['alarms'])
        .then((result) => {
            if (result.hasOwnProperty('alarms') && result.alarms) {
                //get current time
                const minutes = (new Date).getMinutes().toString().padStart(2, "0"),
                    hours = (new Date).getHours().toString().padStart(2, "0"),
                    now = new Date('1970-01-01T' + hours + ":" + minutes + 'Z').getTime()
                //loop over the alarms and display them
                result.alarms.forEach((alarm) => {
                    const alarmTime = new Date('1970-01-01T' + alarm.time + 'Z').getTime()
                    if (alarmTime > now) {
                        appendItem(alarm.content, alarm.time)
                    }
                })
            } else {
                //show no items available
                appendItem('No alarms are available')
            }
        });

    $("#optionsLink").on('click', () => {
        browser.runtime.openOptionsPage()
    });

    function appendItem (content, badgeContent = null) {
        listElement.append(`
        <li class="list-group-item d-flex justify-content-between align-items-center">
            ${content}
            ${badgeContent ? `<span class="badge bg-primary rounded-pill">${badgeContent}</span>` : ''}
        </li>
        `);
    }
});