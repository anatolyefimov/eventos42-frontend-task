import React from 'react';
import { Link , useParams } from 'react-router-dom';

function MeetUpBar() {
    let {meetUpId} = useParams();
    return (
        <div>
        <Link to={`/m/${meetUpId}/visitor`}>
                <button>ПОСЕТИТЕЛИ</button>
            </Link>
            <Link to={`/m/${meetUpId}/settings`}>
                <button>НАСТРОЙКИ</button>
            </Link>
        </div>
    );
}

export default MeetUpBar;