import { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

import { userReq } from '../../axiosRequests';



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


const TopSellersChart = () => {

    const [topData, setTopData ] = useState([]);

    const renderBarChart = (
        <BarChart width={750} height={250} data={topData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="title" angle={90} interval={0} />
  <YAxis dataKey="count" />
  <Tooltip />
  {/* <Legend /> */}
  <Bar dataKey="count" fill="#8884d8" />
</BarChart>
    )

   

    useEffect(() => {

        const getTopData = async () => {
            try {
                const res = await userReq.get('/orders/topsellers');
                if(res){
                    console.log('ITEM DATA');
                    console.log(res.data);

                    setTopData(res.data);
                }
               
               
            }
            catch (err) { console.log(err) };

        };
        getTopData();
    }, []);

    useEffect(() => {
       
            const getNames = async () => {
                try{
                const ids = topData.map((item) => {
                    return item._id;
                })
                const res = await userReq.get(`/products/findall/${ids}`);
                console.log('Names of TOPSELLERS ARE:');
                console.log(res.data);
                const tempData = topData;
                res.data.map((item, index) => {
                    tempData[index] = {...tempData[index], title: item.title};
                    console.log(tempData);
                })

            }
            catch (err) {
                console.log(err)
            }
        }
        getNames();
    }, [topData])

    return (
        <div>
            <Container>
            <TitleDiv>
            <Title>Top Selling Products</Title>
            </TitleDiv>
            {renderBarChart}
            </Container>

        </div>
    )
}

export default TopSellersChart