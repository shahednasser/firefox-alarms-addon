browser.alarms.onAlarm.addListener((alarmInfo) => {
    const alarmName = alarmInfo.name.split("_")[0]
    console.log(alarmName)
    //get user alarm from alarm name
    browser.storage.sync.get(['alarms'])
        .then((result) => {
            if (result.alarms && result.alarms.length) {
                const alarm = result.alarms.find((item) => item.name == alarmName)
                if (alarm) {
                    //TODO send notification
                }
            }
        })
})