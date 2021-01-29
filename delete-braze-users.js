const request = require('request');
const neatCsv = require('neat-csv');
const fs = require('fs');

const apiKey = '';
const filePath = './test-SF_ACCOUNTS_CONTACTS_PERSONAS.csv';

const slowDown = () => {
	return new Promise(resolve => setTimeout(resolve, 50))
}

fs.readFile(filePath, async (err, data) => {
    if (err) {
        console.error(err)
        return
    }
	const idArrray = await neatCsv(data);
	
	console.log(`Array length is: ${idArrray.length}`)

    for await (let row of idArrray) {

		console.log(row);
        var options = {
            'method': 'POST',
            'url': 'https://rest.iad-06.braze.com/users/delete',
            'headers': {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "external_ids": [row.EXTERNAL_UNIQUE_ID] })
		};
		
		
        await request(options, async function (error, response) {
            if (error) throw new Error(error);
            await console.log(response.body);
		});
		// let response = await request(options);
		// console.log(response.body);
		await slowDown();
    }
});
