const influxClient = require('./influxSetup').influxClient;
const request = require('request');

const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));


const sendData = (data) => {
    const options = {
        uri: config.server.sendData,
        json: data
    }
    request.post(options, (_, __, body) => {
        console.log(body);

    });
}

const fetchMeanData = () => {
        influxClient.queryPost("select * from dataghost.autogen.agrtd limit 1", "dataghost")
            .then(info => {
                try {
                    const queryRes = info.results[0].series[0]
                        // console.log(queryRes);
                        // console.log(mapper(queryRes));
                    const mappedData = mapper(queryRes);
                    let dataSchema = config.device.data;

                    const dataArray = dataSchema.map(data => {
                            return mappedData[data]
                        })
                        // console.log(dataArray);

                    const payload = {
                            device: config.deviceID,
                            value: dataArray
                        }
                        // console.log(payload);

                    sendData(payload)

                } catch (error) {
                    console.error(error);

                }

            })
    }
    // fetchMeanData();
setInterval(fetchMeanData, 1000);

const mapper = (queryRes) => {
    let mappedData = {}
    queryRes.columns.forEach((column, index) => {
        if (index !== 0)
            mappedData[column.split('_')[1]] = queryRes.values[0][index]
    })
    return mappedData;
}