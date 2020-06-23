async function checkSession() {
    try {
        let res = await fetch('/api/check-session', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('sessionId')
            }
        });
        const statusCode = res.status;
        res = await res.json();
        res.statusCode = statusCode;
        return res;

    } catch (err) {
        console.error(err);
    }

}

export default checkSession;
