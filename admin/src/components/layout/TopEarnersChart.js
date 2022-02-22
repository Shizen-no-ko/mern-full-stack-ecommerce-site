import { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Label } from 'recharts';

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
const ProductDiv = styled.div`
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


const TopEarnersChart = () => {

    const [topData, setTopData ] = useState([]);
    const [barChart, setBarChart] = useState(<BarChart/>);
    

    useEffect(() => {

        const getTopData = async () => {
            try {
                const res = await userReq.get('/orders/allsales');
                if(res){
                    console.log('TOP EARNERS DATA');
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
                console.log("IDs are");
                console.log(ids);
                const res = await userReq.get(`/products/findall/${ids}`);
                const tempData = topData;
                res.data.map((item) => {
                    tempData.find(x => x._id === item._id ).price = item.price;
                    tempData.find(x => x._id === item._id ).title = item.title.substring(0, 8);   
                })
                tempData.map(item => {
                    item.totalEarned = item.price * item.count;
                })
                tempData.sort((a, b) => b.totalEarned - a.totalEarned);
                setTopData(tempData.slice(0,5));
                console.log(topData);
                setBarChart(
                    <BarChart width={500} height={200} data={topData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis style={{fontSize: '0.8rem'}} dataKey="title" label={{ value: 'Products', offset: '-10', position: 'insideBottom' }}  />
              <YAxis dataKey="totalEarned" label={{ value: 'Total Earned', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              {/* <Legend /> */}
              <Bar barSize={25} dataKey="totalEarned" fill="#8884d8" />
            </BarChart>
                )
                
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
            <Title>Top Earning Products</Title>
            </TitleDiv>
            {barChart}
            </Container>

        </div>
    )
}

export default TopEarnersChart