import { useState, useEffect } from 'react';
import moment from 'moment';
import { publicReq, userReq } from '../../axiosRequests';

import styled from 'styled-components';

const Container = styled.div`
display:flex;
flex-direction: column;
height: auto;
margin: 20px 100px;
max-width: 100%;
`
const UserDiv = styled.div`
border: 1px solid lightgray;
margin: 2px;
padding: 10px;
width: 100%;
`
const Title = styled.h1`
font-size: 1.5rem;
margin: 5px 10px;
padding: 0px;
`

const Detail = styled.p`
margin: 5px 10px;
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
                    return <UserDiv key={user._id}>
                    <Title>{user.username}</Title>
                    <Detail><strong>User Id: </strong>{user._id}</Detail>
                    <Detail><strong>Email: </strong>{user.email}</Detail>
                    <Detail><strong>Account Opened On: </strong>{moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Detail>
                    </UserDiv>
                }) }
            </Container>

        </div>
    )
}

export default UserStats