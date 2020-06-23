async function sendVisitorsData(token, data) {
    try {
        let res = await fetch(`https://form.eventos42.ru/api/form/${token}`, {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
        })

        return res;
    } catch(err) {
        console.error(err);
    }
}

export default sendVisitorsData;