import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { demo2dType } from './types'

const FlexDiv = styled.div`
  max-width: 95%;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  letter-spacing: 0.6px;
`
const BlackBox = styled.div`
  padding: 6px 17px 9px 13px;
  background-color: rgba(0, 0, 0, 0.9);
  margin: 5px 0px 5px 5px;
  border-radius: 8px;
  font-weight: 400;
  color: white;
  font-size: 15px;
  overflow: auto;
  height: min-content;
  pointer-events: auto;
  line-height: 1.7;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.12), 0 6px 20px 0 rgba(0,0,0,0.06);
`
const LegendItem = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2px;
  width: max-content;
`
const ColorBox = styled.div`
  background-color: ${props => props.color};
  width: 20px;
  height: 20px;
  border-radius: 3px;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 7px;
`

const ColorClass = ({ color, range }) => {
  return (
    <LegendItem>
      <ColorBox color={color} /> <div>{range}</div>
    </LegendItem>
  )
}

class Legend extends React.Component {

  render() {
    if (!this.props.menu.legend) return null
    const { legendClasses, legendName } = this.props.demo2d

    return (
      <FlexDiv>
        <BlackBox>
          <div>{legendName}</div>
          {legendClasses.map(colorClass => (
            <ColorClass color={colorClass.color} range={colorClass.range} key={colorClass.range} />
          ))}
        </BlackBox>
      </FlexDiv>
    )
  }
}

Legend.propTypes = {
  demo2d: demo2dType.isRequired,
}

const mapStateToProps = (state) => ({
  demo2d: state.demo2d,
  demo3d: state.demo3d,
  menu: state.menu,
})

const ConnectedLegend = connect(mapStateToProps, null)(Legend)
export default ConnectedLegend
