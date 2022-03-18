import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

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


const TopEarnersChart = () => {

    const [ids, setIds] = useState([]);
    const [topData, setTopData] = useState([]);
    const [chartData, setChartData] = useState();
    const [barChart, setBarChart] = useState(<BarChart />);


    // Get all unique sales items with amount sold per item
    useEffect(() => {
        const getTopData = async () => {
            try {
                // Get all sales items via API; with amount sold for each item
                const res = await userReq.get('/orders/allsales');
                if (res) {
                    setTopData(res.data);
                    // Get ids of each item to search for products' details
                    const resIds = res.data.map((item) => {
                        return item._id;
                    });
                    setIds(resIds);
                }
            }
            catch (err) { console.log(err) };
        };
        getTopData();
    }, []);


    useEffect(() => {
        const getNames = async () => {
            try {
                // Retrieve all products details by their ids to obtain price and title
                // Necessary due to price and title not being stored with items in orders DB
                // Possible place for improvement
                const res = await userReq.get(`/products/findall/${ids}`);
                const tempData = [...topData];
                res.data.map((item) => {
                    // Find item in tempData with same id as current res item and 
                    //set the price for corresponding item in tempData
                    tempData.find(x => x._id === item._id).price = item.price;
                    // Likewise set a cropped title for corresponding item
                    return tempData.find(x => x._id === item._id).title = item.title.substring(0, 8);
                })
                tempData.map(item => {
                    // Calculate and set totalEarned
                    return item.totalEarned = item.price * item.count;
                })
                // Sort by descending
                tempData.sort((a, b) => b.totalEarned - a.totalEarned);
                // If chartData not yet set, then set to top 5 items
                !chartData && setChartData([...tempData.slice(0, 5)]);
                setBarChart(
                    <BarChart width={500} height={200} data={chartData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis style={{ fontSize: '0.8rem' }} dataKey="title" label={{ value: 'Products', offset: '-10', position: 'insideBottom' }} />
                        <YAxis dataKey="totalEarned" label={{ value: 'Total Earned USD', angle: -90, position: 'insideBottomLeft', offset: '10' }} />
                        <Tooltip />
                        <Bar barSize={25} dataKey="totalEarned" fill="#8884d8" />
                    </BarChart>
                )
            }
            catch (err) {
                console.log(err)
            }
        }
        getNames();
    }, [topData, chartData, ids])


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