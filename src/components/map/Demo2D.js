import React from 'react'
import { connect } from 'react-redux'
import censusFC from './../../data/vaesto-250m-2017.json'
import { initialize2Ddemo } from '../../reducers/demo2dReducer'
import { setMouseOnFeature } from '../../reducers/mapReducer'
import asMapLayer from './asMapLayer'

class Demo2D extends React.Component {

  componentDidMount() {
    this.props.initialize2Ddemo()
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.visible && !prevProps.visible) {
      this.props.map.on('mousemove', this.setMouseOnFeature)
    }
    if (!this.props.visible && prevProps.visible) {
      this.props.map.off('mousemove', this.setMouseOnFeature)
    }
  }

  setMouseOnFeature = (e) => {
    const feature = this.props.getMouseOnFeature(e)
    this.props.setMouseOnFeature(feature)
  }

  render() {
    return null
  }
}

const mapStateToProps = (state) => ({
  layerId: state.demo2d.layerId,
  data: censusFC,
  visible: state.demo2d.visible,
  paintType: 'fill',
  paint: state.demo2d.mbPaintStyle,
  basemap: state.map.basemap,
})

const mapDispatchToProps = {
  initialize2Ddemo,
  setMouseOnFeature,
}

const ConnectedDemo2D = connect(mapStateToProps, mapDispatchToProps)(asMapLayer(Demo2D))

export default ConnectedDemo2D
