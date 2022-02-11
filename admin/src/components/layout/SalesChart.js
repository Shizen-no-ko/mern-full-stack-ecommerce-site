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


const SalesChart = () => {

    const [salesData, setSalesData ] = useState([]);

    useEffect(() => {

        const getSalesData = async () => {
            try {
                const res = await userReq.get('/orders/sales');
                if(res){
                    const data = res.data;
                    data.sort((a, b) => a._id.month - b._id.month);
                    data.sort((a, b) => a._id.year - b._id.year);
                    console.log(data);
                    setSalesData(data);
                }
               
            }
            catch (err) { console.log(err) };

        };
        getSalesData();
    }, []);


    return (
        <div>
            <Container>
            <TitleDiv>
            <Title>Sales Data</Title>
            </TitleDiv>
                
            </Container>

        </div>
    )
}

export default SalesChart