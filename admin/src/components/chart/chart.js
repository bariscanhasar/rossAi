import "./chart.css";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const Chart = ({ aspect, title, predictionData }) => {

    if (!predictionData) {
        return <div>Loading...</div>;
    }

    const data = predictionData.map((prediction) => {
        const date = new Date(prediction.date * 1000);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');


        return {
            count: prediction.count,
            date: `${day}/${month}`
        };
    });

    console.log(data);

    return (
        <div className="chart">
            <div className="title">{title}</div>
            <ResponsiveContainer width="100%" aspect={aspect}>
                <AreaChart
                    width={730}
                    height={250}
                    data={data}

                >
                    <defs>
                        <linearGradient id="count" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" stroke="gray"/>
                    <CartesianGrid strokeDasharray="3 3" className="chartGrid"/>
                    <Tooltip/>
                    <Area
                        type="monotone"
                        dataKey="count"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#count)"
                    />
                </AreaChart>

            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
