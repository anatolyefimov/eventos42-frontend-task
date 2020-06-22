async function meetUp() {
    try {
        let res = await fetch('/api/meetup?showAll=false', {
            method:  'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('sessionId')
            }
        });

        res = await res.json();
        return res;

    } catch (err) {
        console.error(err);
    }


}

export default meetUp;
