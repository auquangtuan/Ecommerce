import React from 'react'
import Categories from '../../components/Categories/Categories'
import NewsLetter from '../../components/NewsLetter/NewsLetter'
import Prouduct from '../../components/Product/Prouduct'
import Slider from '../../components/Slider/Slider'

export default function Home() {
  
  return (
    <div>
      <Slider />
      <Categories />
      <Prouduct />
      <NewsLetter />
    </div>
  )
}
