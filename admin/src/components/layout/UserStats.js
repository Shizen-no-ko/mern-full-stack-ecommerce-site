import { useState, useEffect } from 'react';
import { publicReq, userReq } from '../../axiosRequests';

import styled from 'styled-components';

const Container = styled.div`
display:flex;
flex-direction: column;
height: auto;
margin: 20px 100px;
max-width: 100%;
overflow: hidden;
`
const UserDiv = styled.div`
width: 100%;

`


const UserStats = () => {

    const [recentUsers, setRecentUsers] = useState([]);

    useEffect(() => {

        const getTenMostRecent = async () => {
            try {
                const res = await userReq.get('/users/latest');
                console.log(res.data);
                setRecentUsers(res.data);
            }
            catch (err) { console.log(err) };

        };
        getTenMostRecent();
    }, []);


    return (
        <div>
            <Container>
                USER STATS
                { recentUsers.map((user) => {
                    return <UserDiv key={user._id}>{user.username}</UserDiv>
                }) }
            </Container>

        </div>
    )
}

export default UserStats