$(document).ready(() => {
    const listElement = $("#alarmsList");
    
    browser.storage.sync.get(['alarms'])
        .then((result) => {
            if (result.hasOwnProperty('alarms') && result.alarms) {
                //get current time
                const minutes = (new Date).getMinutes(),
                    hours = (new Date).getHours(),
                    now = new Date('1970-01-01T' + (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + 'Z').getTime()
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