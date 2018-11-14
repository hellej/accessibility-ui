import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { toggleGuide } from './../reducers/menuReducer'
import { Button } from './controls/Button'

export const GuideContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 4;
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  pointer-events: none;
`
const FlexDiv = styled.div`
  align-self: center;
  width: 460px;
  max-width: 85%;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
`
const WhiteBox = styled.div`
  display: flex;
  flex-direction: column;
  letter-spacing: 0.6px;
  padding: 18px 27px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  font-weight: 300;
  color: black;
  font-size: 15px;
  overflow: auto;
  height: min-content;
  pointer-events: auto;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.22), 0 6px 20px 0 rgba(0,0,0,0.14);
`
const Instructions = styled.div`
  max-height: 80vh;
  overflow: auto;
`
const Title = styled.div`
  font-weight: 300;
  font-size: 21px;
  padding: 7px 0 8px 0;
`
const Colored = styled.span`
  color: ${props => props.color ? props.color : ''};
`
const P = styled.div`
  padding: 7px 0;
  line-height: 1.5;
  font-weight: 350;
  font-size: 16px;
  letter-spacing: 0.5px;
`
const Emoj = styled.span.attrs({
  role: 'img',
  ariaLabel: 'boy'
})`
  font-size: 18px;
`
const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 9px 0 5px 0px;
`

const ToggleGuideButton = styled(Button)`
  position: absolute;
  padding: 4px 9px;
  right: -4px;
  top: 10px;
  font-weight: 600;
  border: 1px solid black;
  background-color: ${props => props.guide ? 'white' : 'black'}; 
  color: ${props => props.guide ? 'black' : 'white'}; 
  &:before {
    content: 'i';
  }
  &:hover {
    margin-right: 12px
  }
`

const Guide = (props) => {
  if (!props.menu.guide) return <ToggleGuideButton onClick={props.toggleGuide} />

  return (
    <GuideContainer>
      <ToggleGuideButton onClick={props.toggleGuide} guide={props.menu.guide} />
      <FlexDiv>
        <WhiteBox>
          <Instructions>
            <Title>Welcome to Accessibility UI <Colored color='#14b514'>beta</Colored></Title>
            <P>
              You have found accessibility user interface, great! Unfortunately, no accessibility features
              are implemented yet... <Emoj>🤷‍♂️</Emoj>
            </P>
            <P>
              However, you can explore the spatial distribution of population in the city. Supported features include
              drawing multiple areas of interest (AOIs) on the map and comparing basic population statistics within
              the areas. Drawn areas can be downloaded as GeoJSON file to your computer and then uploaded back into the
              app once you need them again.
            </P>
            <P>
              Also, population distribution can be visualized as nice 2D and 3D choropleth maps.
            </P>
            <P>
              Census data is based on 250 m population grid provided by <a
                href='https://www.hsy.fi/fi/asiantuntijalle/avoindata/Sivut/AvoinData.aspx?dataID=7'
                target='_blank' rel='noopener noreferrer'>HSY</a>{' '}
              as open data.
            </P>
          </Instructions>
          <ButtonDiv>
            <Button green onClick={props.toggleGuide}>Okay, let's do it!</Button>
          </ButtonDiv>
        </WhiteBox>
      </FlexDiv>
    </GuideContainer>
  )
}

const mapStateToProps = (state) => ({
  menu: state.menu,
})

const ConnectedGuide = connect(mapStateToProps, { toggleGuide })(Guide)
export default ConnectedGuide
