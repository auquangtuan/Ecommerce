import React, { Fragment } from 'react'
import Chart from '../components/Chart/Chart'
import Widget from '../components/Widget/Widget'
import Revanue from '../Revanue/Revanue'

export default function HomeAdmin() {
  return (
    <Fragment>
        <Revanue />
        <Chart />
        <Widget />
    </Fragment>
  )
}
