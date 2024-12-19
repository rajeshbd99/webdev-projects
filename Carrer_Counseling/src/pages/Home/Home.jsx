import React from 'react'
import Slider from '../../components/Slider'
import Service from '../Service/ServiceDetails'
import { Testimonial } from '../../components/Testimoneal/Testimoneal'
import { Faq } from '../../components/Faq/Faq'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "Career Hub | Home";
    document.title = pageTitle;
 },[location]);
  return (
    <div>
    <Slider/>
    <Service/>
    <Testimonial/>
    <Faq/>
    </div>
  )
}

export default Home
