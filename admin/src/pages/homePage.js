import * as React from 'react'
import Widget from '../components/widget/widget'
import Chart from '../components/chart/chart'
import { useQuery } from '@apollo/client'
import {  homePageStats } from '../graphql/queries'
import ProgressBar from "../components/circularProgress/circularProgress";
export default function HomePage() {
  const { loading, data } = useQuery(homePageStats)
  const rowData = data && data.homePageStats ? data.homePageStats : []

  if (loading) {
    return <ProgressBar />
  }
  
  let diff
  if (rowData.lastSevenDayPredictionCount && rowData.lastSevenDayPredictionCount.length >= 2) {
    const lastObject =
      rowData.lastSevenDayPredictionCount[
        rowData.lastSevenDayPredictionCount.length - 1
      ]
    const secondLastObject =
      rowData.lastSevenDayPredictionCount[
        rowData.lastSevenDayPredictionCount.length - 2
      ]

    const countDifference = lastObject.count - secondLastObject.count
    diff = (countDifference / Math.abs(secondLastObject.count)) * 100
  }

  return (
    <div>
      <div className="d-flex">
        <div className="w-25 me-3">
          <Widget type="users" amount={rowData.userCount} />
        </div>
        <div className="w-25 me-3">
          <Widget type="models" amount={rowData.modelCount} />
        </div>

        <div className="w-25 me-3">
          <Widget
            type="predictions"
            amount={rowData.predictionCount}
            diff={diff && diff.toFixed(1)}
          />
        </div>

        <div className="w-25 me-3">
          <Widget type="sets" amount={rowData.setCount} />
        </div>
      </div>
      <div>
        <Chart
          title="Weekly Prediction Count"
          aspect={2 / 1}
          predictionData={rowData.lastSevenDayPredictionCount}
        />
      </div>
    </div>
  )
}
