$(document).ready(() => {
    const nameElm = $("#name"),
        timeElm = $("#time"),
        formElm = $("form")
    formElm.on('submit', () => {
        $(this).find(".alert").remove() //remove previous success alerts, if any
        const self = this
        //get existing alarms
        browser.storage.sync.get(['alarms'])
            .then((result) => {
                let alarms = result.alarms 
                if (!alarms) {
                    alarms = []
                }
                alarms.push({
                    content: nameElm.val().trim(),
                    time: timeElm.val()
                })

                //set alarms in the storage
                browser.storage.sync.set({alarms})
                    .then(() => {
                        //create a new alarm
                        const currentDate = new Date,
                            currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0"),
                            currentDay = (currentDate.getDate() + 1).toString().padStart(2, "0")

                        browser.alarms.create(nameElm.val().trim() + "_" + (Math.random() * 100), {
                            when: new Date(currentDate.getFullYear() + "-" + currentMonth + "-" + currentDay + 'T' + 
                                timeElm.val()).getTime(),
                            periodInMinutes: 1440
                        })

                        formElm.prepend(`<div class="alert alert-success">Alarm added successfully</div>`)
                        nameElm.val("")
                        timeElm.val("")
                    })
            })
        return false //disable default form submit action
    });
});