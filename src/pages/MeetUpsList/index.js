import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import meetUp from 'api/meetUp';

import './MeetUpsList.css';

function MeetUp() {
    const [meetUps, setMeetUps] = useState([]);

    useEffect(() => {
        const fetchMeetUps = async () => {
            try {
                let res = await meetUp();
                setMeetUps(res);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMeetUps();
    }, []);

    return (
        <div className='MeetUpsList'>
            <table className='MeetUpsList__table'>
                <thead className='MeetUpsList__thead'>
                    <tr>
                        <th className='MeetUpsList__th'>Название меропрития</th>
                        <th>Дата начала</th>
                        <th>Дата окончания</th>
                        <th>Количетсво пользователей</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        meetUps.map((meetup) => (
                            <tr className='MeetUpsList__tr' key={meetup.meetupId}>
                                <td className='MeetUpsList__td'>

                                    <Link style={{ color: 'inherit' }} to={`m/${meetup.meetupId}`}>
                                        {meetup.name}
                                    </Link>

                                </td>
                                <td className='MeetUpsList__td'>
                                    {meetup.startTime}
                                </td>
                                <td className='MeetUpsList__td'>
                                    {meetup.endTime}
                                </td>
                                <td className='MeetUpsList__td'>
                                    {meetup.visitorsCount}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default MeetUp;
