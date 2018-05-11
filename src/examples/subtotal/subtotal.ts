import { Cell, Link, Looker, LookerChartUtils, VisConfig, VisQueryResponse, VisData, VisUpdateDetails, VisualizationDefinition } from '../types/types'

import { Grid, GridOptions } from 'ag-grid/main'

// Global values provided via the API
declare var looker: Looker
declare var LookerCharts: LookerChartUtils

interface Subtotal extends VisualizationDefinition {
  grid?: Grid
}

const vis: Subtotal = {
  id: 'subtotal',
  label: 'Subtotal',

  options: {},

  create: (element, config) => {
    // Add stylesheets recommended by ag-Grid.
    [
      'https://unpkg.com/ag-grid/dist/styles/ag-grid.css',
      'https://unpkg.com/ag-grid/dist/styles/ag-theme-balham.css'
    ].forEach(url => {
      const link = document.createElement('link')
      link.href = url
      link.rel = 'stylesheet'
      element.appendChild(link)
    })

    const gridOptions: GridOptions = {}
    this.grid = new Grid(element, gridOptions)

    // XXX
    console.log('create - element=', element)
    console.log('create - config=', config)
  },

  update: function (data, element, config, queryResponse, details) {

    // XXX
    console.log('update - data=', data)
    console.log('update - element=', element)
    console.log('update - config=', config)
    console.log('update - queryResponse=', queryResponse)
    console.log('update - details=', details)
    // this.addError!({
    //   title: 'oh crap',
    //   message: 'a thing happened'
    // })
  }

}

looker.plugins.visualizations.add(vis)
