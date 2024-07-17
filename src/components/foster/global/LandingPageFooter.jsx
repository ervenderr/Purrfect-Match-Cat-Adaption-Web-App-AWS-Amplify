import React from 'react'
import { Layout } from 'antd'

const { Footer } = Layout

const LandingPageFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
        PurrfectMatch ©{new Date().getFullYear()} Created by Ervenderr
    </Footer>
  )
}

export default LandingPageFooter
