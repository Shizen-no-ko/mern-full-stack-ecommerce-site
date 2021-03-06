import { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label } from 'recharts';
import styled from 'styled-components';

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


// Monthly sales chart
const SalesChart = () => {

    const [salesData, setSalesData ] = useState([]);

    const renderLineChart = (
        <LineChart width={500} height={200} data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="Sales" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="Month">
          <Label value="Month" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis label={{ value: 'Sales in USD', angle: -90, position: 'insideBottomLeft', offset: '12' }} dataKey = "Sales" angle={-45} />
          <Tooltip />
        </LineChart>
      );


    // Retrieve and sort sales data by month and format for chart
    useEffect(() => {
        const getSalesData = async () => {
            try {
                const res = await userReq.get('/orders/sales');
                if(res){
                    res.data.sort((a, b) => a._id.month - b._id.month);
                    res.data.sort((a, b) => a._id.year - b._id.year);
                    const data = res.data.map((item) => {
                        return {
                            Month: `${item._id.month}-${item._id.year}`,
                            Sales: item.sum
                        }
                    });
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
            <Title>Monthly Sales</Title>
            </TitleDiv>
               {renderLineChart}
            </Container>
        </div>
    )
}

export default SalesChart