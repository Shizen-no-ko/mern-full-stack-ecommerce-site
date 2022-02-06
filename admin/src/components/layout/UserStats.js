import { useState, useEffect } from 'react';
import moment from 'moment';
import { userReq } from '../../axiosRequests';

import styled from 'styled-components';

const Container = styled.div`
align-items: center;
border: 1px solid lightgray;
display:flex;
flex-direction: column;
height: auto;
margin: 20px 100px;
max-width: 50vw;
padding: 10px 20px 10px;
text-align: left;
width: auto;
`
const UserDiv = styled.div`
border: 1px solid lightgray;
margin: 2px;
padding: 10px;
width: 100%;

&:hover {
    background-color: pink;
    border: 1px solid red;
    box-shadow: 3px 3px 3px lightgray;
    transform: scale(101%);
}
`

const TitleDiv = styled.div`
margin-left: -20px;
padding-bottom: 10px;
text-align: left;
width: 100%;
`



const Title = styled.h3`
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
            <TitleDiv>
            <Title>Most Recently Registered Users</Title>
            </TitleDiv>
                
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