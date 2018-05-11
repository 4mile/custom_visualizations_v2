import { Cell, Link, Looker, LookerChartUtils, VisConfig, VisQueryResponse, VisData, VisUpdateDetails, VisualizationDefinition } from '../types/types'

import { Grid, GridOptions, ColDef } from 'ag-grid/main'
import { ValueGetterParams, ValueFormatterParams } from 'ag-grid/dist/lib/entities/colDef'

// Global values provided via the API
declare var looker: Looker
declare var LookerCharts: LookerChartUtils

class Subtotal implements VisualizationDefinition {
  grid: Grid

  id = 'subtotal'
  label = 'Subtotal'
  options = {}

  create (element: HTMLElement, config: VisConfig) {
    // Add stylesheets recommended by ag-Grid.
    const stylesheets = [
      'https://unpkg.com/ag-grid/dist/styles/ag-grid.css',
      'https://unpkg.com/ag-grid/dist/styles/ag-theme-balham.css'
    ]
    stylesheets.forEach(url => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = url
      document.head.appendChild(link)
    })
    element.classList.add('ag-theme-balham')

    // XXX
    console.log('create - element=', element)
    console.log('create - config=', config)
  }

  update (data: VisData, element: HTMLElement, config: VisConfig, queryResponse: VisQueryResponse, details?: VisUpdateDetails) {

    if (!this.grid) {
      const gridOptions: GridOptions = {}
      gridOptions.columnDefs = []

      const valueGetter = (params: ValueGetterParams): any => {
        console.log('XXX getter', params)
        const obj: any = params.colDef.field ? params.data[params.colDef.field] : null
        return obj ? obj.value : null
      }

      const valueFormatter = (params: ValueFormatterParams): any => {
        console.log('XXX formatter', params)
        const obj: any = params.colDef.field ? params.data[params.colDef.field] : null
        if (!obj) return null
        return obj.rendered != null ? obj.rendered : obj.value
      }

      if (config.query_fields) {
        for (const measure of config.query_fields.measures) {
          gridOptions.columnDefs.push({
            headerName: measure.label,
            field: measure.name,
            valueGetter,
            valueFormatter
          })
        }
        for (const dimension of config.query_fields.dimensions) {
          gridOptions.columnDefs.push({
            headerName: dimension.label,
            field: dimension.name,
            valueGetter,
            valueFormatter
          })
        }
      }

      gridOptions.rowData = data
      console.log('XXX gridOptions', gridOptions)

      this.grid = new Grid(element, gridOptions)
    }

    // XXX
    if (details && details.changed && details.changed.size) {
      console.log('XXX resized')
    } else {
      console.log('XXX update - data=', data)
      console.log('XXX update - element=', element)
      console.log('XXX update - config=', config)
      console.log('XXX update - queryResponse=', queryResponse)
      console.log('XXX update - details=', details)
    }
    // this.addError!({
    //   title: 'oh crap',
    //   message: 'a thing happened'
    // })
  }

}

looker.plugins.visualizations.add(new Subtotal())
