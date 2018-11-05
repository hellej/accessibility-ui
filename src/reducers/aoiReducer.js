import { utils } from '../utils/index'
import saveAs from 'file-saver'

const initialAOIState = {
  FC: {
    type: 'FeatureCollection',
    features: []
  },
  popStats: false,
  mapHoveredId: '',
  listHoveredId: '',
  layerId: 'aoiLayer',
}

const aoiReducer = (store = initialAOIState, action) => {

  switch (action.type) {

    case 'DELETE_AOI':
    case 'RESET_DRAW_AOI':
      return initialAOIState

    case 'POPULATION_CALCULATED':
      return {
        ...store,
        FC: action.FC,
        popStats: true,
      }
    case 'HIDE_POPULATION_STATS':
      return { ...store, popStats: false }

    case 'SET_MAP_HOVERED_ID':
      return { ...store, mapHoveredId: action.id }

    case 'UNSET_MAP_HOVERED_ID':
      return { ...store, mapHoveredId: '' }

    case 'SET_LIST_HOVERED_ID':
      return { ...store, listHoveredId: action.id }

    case 'UNSET_LIST_HOVERED_ID':
      return { ...store, listHoveredId: '' }

    case 'SET_UPLOADED_AOI':
      return {
        ...store,
        FC: action.FC,
        popStats: false
      }
    case 'REMOVE_AOIS':
      return {
        ...store,
        FC: {
          ...store.FC,
          features: store.FC.features.filter(feature => action.IDs.indexOf(feature.id) === -1)
        }
      }
    case 'CREATE_DRAW_AREAS':
    case 'UPDATE_DRAW_AREAS': {
      const FC = {
        ...action.FC,
        features: action.FC.features.filter(feature => feature.geometry.coordinates[0] !== undefined)
      }
      return {
        ...store,
        FC: store.popStats ? getAddPopulationStats(FC) : FC
      }
    }
    default:
      return store
  }
}

export const deleteAOI = () => {
  return { type: 'DELETE_AOI' }
}

export const calculatePopulationStats = (FC) => {
  return { type: 'POPULATION_CALCULATED', FC: getAddPopulationStats(FC) }
}

export const hidePopulationStats = () => {
  return { type: 'HIDE_POPULATION_STATS' }
}

export const removeAOIs = (features) => {
  return { type: 'REMOVE_AOIS', IDs: features.map(feature => feature.id) }
}

export const downloadAOIasGeoJson = (FC) => {
  const text = JSON.stringify(FC, null, 2)
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  saveAs(blob, 'aoi.geojson')
  return { type: 'AOI_DOWNLOADED' }
}

export const setMapHoveredAOI = (id) => {
  return { type: 'SET_MAP_HOVERED_ID', id }
}

export const unsetMapHoveredAOI = () => {
  return { type: 'UNSET_MAP_HOVERED_ID' }
}

export const setListHoveredAOI = (id) => {
  return { type: 'SET_LIST_HOVERED_ID', id }
}

export const unsetListHoveredAOI = () => {
  return { type: 'UNSET_LIST_HOVERED_ID' }
}

const getAddPopulationStats = (FC) => {
  return {
    ...FC,
    features: FC.features.map(feature => ({
      ...feature,
      properties: {
        ...feature.properties,
        ...utils.calculatePopulationStats(feature),
      }
    }))
  }
}

export default aoiReducer
