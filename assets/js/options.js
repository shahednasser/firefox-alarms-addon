$(document).ready(() => {
    const nameElm = $('#name');
    const timeElm = $('#time');
    const formElm = $('form');
    formElm.on('submit', () => {
        $('.alert').remove(); //remove previous success alerts, if any
        const self = this;
        //get existing alarms
        browser.storage.sync.get(['alarms'])
            .then((result) => {
                let alarms = result.alarms;
                const alarmName = nameElm.val().trim() + '_' + (Math.random() * 100);
                if (!alarms) {
                    alarms = [];
                }
                alarms.push({
                    content: nameElm.val().trim(),
                    time: timeElm.val(),
                    alarmName
                });

                //set alarms in the storage
                browser.storage.sync.set({alarms})
                    .then(() => {
                        //create a new alarm
                        const currentDate = new Date;
                        const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                        const currentDay = (currentDate.getDate()).toString().padStart(2, '0');

                        browser.alarms.create(alarmName, {
                            when: new Date(currentDate.getFullYear() + '-' + currentMonth + '-' + currentDay + 'T' + 
                                timeElm.val()).getTime(),
                            periodInMinutes: 1440
                        });

                        formElm.prepend('<div class="alert alert-success">Alarm added successfully</div>');
                        nameElm.val('');
                        timeElm.val('');
                    });
            });
        return false; //disable default form submit action
    });
});