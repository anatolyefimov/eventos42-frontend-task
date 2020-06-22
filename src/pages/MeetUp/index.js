import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

import meetUp from 'api/meetUp';

import './MeetUp.css'

function MeetUp() {
    const [meetUps, setMeetUps] = useState([]);

    useEffect(() => {
        const fetchMeetUps = async () => {
            try {
                let res = await meetUp()
                setMeetUps(res)
            } catch(err) {
                console.error(err)
            }
        }

        fetchMeetUps();
    }, [])

    return (
        <div className='MeetUp'>
            <table className='MeetUp__table'>
                <thead className='MeetUp__thead'>
                    <tr>
                        <th className='MeetUp__th'>Название меропрития</th>
                        <th>Дата начала</th>
                        <th>Дата окончания</th>
                        <th>Количетсво пользователей</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        meetUps.map((meetup) => (
                                <tr className='MeetUp__tr' key={meetup.meetupId}>
                                    <td className='MeetUp__td'>

                                            <Link style={{ color: 'inherit'}} to={`m/${meetup.meetupId}`}>
                                                {meetup.name}
                                            </Link>

                                    </td>
                                    <td className='MeetUp__td'>
                                        {meetup.startTime}
                                    </td>
                                    <td className='MeetUp__td'>
                                        {meetup.endTime}
                                    </td>
                                    <td className='MeetUp__td'>
                                        {meetup.visitorsCount}
                                    </td>
                                </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MeetUp;