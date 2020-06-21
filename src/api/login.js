async function login(data) {
    try {
        let res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const statusCode = res.status
        res = await res.json()
        res.statusCode = statusCode


        return res;
    } catch(err) {
        console.error(err)
    }

}

export default login;