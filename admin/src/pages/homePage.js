import * as React from 'react'
import Widget from '../components/widget/widget'
import Chart from "../components/chart/chart";
import { useQuery } from "@apollo/client";
import {getAllSetsAdmin, homePageStats} from "../graphql/queries";
export default function HomePage() {

    const { loading, error, data } = useQuery(homePageStats);
    const rowData = data && data.homePageStats ? data.homePageStats : []
    console.log(rowData)
  return (
      <div>
          <div className="d-flex">
              <div className="w-25 me-3">
                  <Widget type="users" amount={rowData.userCount}/>
              </div>
              <div className="w-25 me-3">
                  <Widget type="models" amount={rowData.modelCount}/>
              </div>

              <div className="w-25 me-3">
                  <Widget type="predictions" amount={rowData.predictionCount}/>
              </div>

              <div className="w-25 me-3">
                  <Widget type="sets" amount={rowData.setCount}/>
              </div>
          </div>
          <div>
              <Chart title="Weekly Prediction Count" aspect={2 / 1} predictionData={rowData.lastSevenDayPredictionCount}/>
          </div>

      </div>
  )
}
