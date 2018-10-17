import React from 'react'
import MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.js'
import { connect } from 'react-redux'
import { initializeDraw, drawSelectionChanged } from './../../reducers/drawReducer'
import { updateAOI, deleteAOI } from './../../reducers/aoiReducer'
import { showNotification } from './../../reducers/notificationReducer'

class Draw extends React.Component {

  draw = new MapboxDraw({
    displayControlsDefault: false
  })

  componentDidMount() {
    const { map, initializeDraw, updateAOI, deleteAOI,
      showNotification, drawSelectionChanged } = this.props

    map.on('load', () => map.addControl(this.draw))
    initializeDraw(this.draw)

    map.on('draw.modechange', (e) => console.log('draw mode change event fired: ', e.mode))
    map.on('draw.selectionchange', () => drawSelectionChanged())
    map.on('draw.delete', deleteAOI)
    map.on('draw.update', (e) => updateAOI(e.features))
    map.on('draw.create', (e) => {
      updateAOI(e.features)
      showNotification('AOI created. Start editing by clicking a node. Drag polygon if it needs to be moved.', 1, 9)
    })
  }

  render() {
    return null
  }
}

const mapDispatchToProps = {
  initializeDraw,
  updateAOI,
  deleteAOI,
  drawSelectionChanged,
  showNotification,
}

const ConnectedDraw = connect(null, mapDispatchToProps)(Draw)

export default ConnectedDraw
