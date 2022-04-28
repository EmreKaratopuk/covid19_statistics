const axios = require("axios");

async function getDatas() {
    var request = await axios.get("https://disease.sh/v3/covid-19/all");
    return request.data;
}

async function run() {
    data = await getDatas();
    await send();
}

var data;
var config = {
    headers: {
        "api-key": "*",
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
}



async function send() {
    var body = {
        "sender": {
            "name": "Sender",
            "email": "*",
        },
        "to": [
            {
                "name": "Recipient",
                "email": "*",
            }
        ],
        "templateId": 2,
        "subject": "Covid-19 Statistics",
        "params": {
            "DATE": new Date(data["updated"]).toLocaleDateString(),
            "TOTALCASES": data["cases"],
            "TODAYCASES": data["todayCases"],
            "DEATHS": data["deaths"],
            "TODAYDEATHS": data["todayDeaths"],
            "RECOVERED": data["recovered"],
            "TODAYRECOVERED": data["todayRecovered"],
            "ACTIVE": data["active"],
            "CRITICAL": data["critical"],
        },
    };
    try {
        await axios.post("https://api.sendinblue.com/v3/smtp/email", body, config);
    } catch (error) {
        console.log(error);
    }

}

run();