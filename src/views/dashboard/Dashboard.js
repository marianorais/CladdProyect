import React, { useEffect, useState } from 'react'

import { CButton, CButtonGroup, CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { CChartBar, CChartPie, CChartDoughnut } from '@coreui/react-chartjs'
import axios from 'axios'
import Chart from 'chart.js/auto'

const Dashboard = () => {
  const [cantidadBalanza, setCantidadBalanza] = useState([])
  const [cantidadBalanzaT, setCantidadBalanzaT] = useState([])

  const [cantidadBalanzaKG, setCantidadBalanzaKG] = useState([])

  const [reetiquetado, setreetiquetado] = useState([])
  const [reetiquetadoT, setreetiquetadoT] = useState([])

  const [ejeX, setEjeX] = useState([])
  const [diaOMes, setdiaOMes] = useState(['Mensual'])
  const [muestra, setMuestra] = useState(['Piezas'])

  const Api = () => {
    const { data } = axios
      .post('http://mail.cladd.com.ar:8803/DashboardAPI/Api/GetStockByDate', { days: 29 })
      .then((response) => {
        let listaFecha = []
        let listaFechaT = []
        let listaFechaRe = []
        let listaFechaReT = []

        let listaCantidadBalanza = []
        let listaCantidadBalanzaT = []
        let listaCantidadRe = []
        let listaCantidadReT = []

        let listaCantidadKG = []
        let listaCantidadKGT = []
        let listaCantidadKGRe = []
        let listaCantidadKGReT = []
        const dataResponse = response.data.dataSource

        dataResponse.balanzaManana.map((balanzaM, i) => {
          //Balanza Manana
          listaFecha.push(balanzaM.fecha)
          listaCantidadBalanza.push(balanzaM.cantidad)
          listaCantidadKG.push(balanzaM.cantidadKG)
        })
        dataResponse.reEtiquetadaManana.map((reEtiquetadaM, i) => {
          //Reetiquetado Manana
          listaFechaRe.push(reEtiquetadaM.fecha)
          listaCantidadRe.push(reEtiquetadaM.cantidad)
          listaCantidadKGRe.push(reEtiquetadaM.cantidadKG)
        })
        dataResponse.balanzaTarde.map((balanzaT, i) => {
          //Balanza Tarde
          listaFechaT.push(balanzaT.fecha)
          listaCantidadBalanzaT.push(balanzaT.cantidad)
          listaCantidadKGT.push(balanzaT.cantidadKG)
        })
        dataResponse.reEtiquetadaTarde.map((reEtiquetadaT, i) => {
          //Reetiquetado Tarde
          listaFechaReT.push(reEtiquetadaT.fecha)
          listaCantidadReT.push(reEtiquetadaT.cantidad)
          listaCantidadKGReT.push(reEtiquetadaT.cantidadKG)
        })

        setEjeX(listaFecha)

        if (muestra[0] === 'Kilos') {
          setCantidadBalanza((cantidadBalanza) => cantidadBalanza.concat(listaCantidadKG))
          setCantidadBalanzaT((cantidadBalanzaT) => cantidadBalanzaT.concat(listaCantidadKGT))

          setreetiquetado((reetiquetado) => reetiquetado.concat(listaCantidadKGRe))
          setreetiquetadoT((reetiquetadoT) => reetiquetadoT.concat(listaCantidadKGReT))
        } else {
          setCantidadBalanza((cantidadBalanza) => cantidadBalanza.concat(listaCantidadBalanza))
          setCantidadBalanzaT((cantidadBalanzaT) => cantidadBalanzaT.concat(listaCantidadBalanzaT))

          setreetiquetado((reetiquetado) => reetiquetado.concat(listaCantidadRe))
          setreetiquetadoT((reetiquetadoT) => reetiquetadoT.concat(listaCantidadReT))
        }
      })
  }
  const ApiMonth = () => {
    const { data } = axios
      .post('http://mail.cladd.com.ar:8803/DashboardAPI/Api/GetStockBymonth')
      .then((response) => {
        let listaMesesBalanza = []
        let listaMesesRe = []
        let listaMesesBalanzaT = []
        let listaMesesReT = []

        let listacantidadBalanza = []
        let listacantidadRe = []
        let listacantidadBalanzaT = []
        let listacantidadReT = []

        let listaCantidadKG = []
        let listaCantidadKGT = []
        let listaCantidadKGRe = []
        let listaCantidadKGReT = []
        const dataResponse = response.data.dataSource
        dataResponse.balanzaManana.map((mes) => {
          //Balanza Manana
          listaMesesBalanza.push(mes.fecha)
          listacantidadBalanza.push(mes.cantidad)
          if (mes.cantidadKG < 0) {
            listaCantidadKG.push(0)
          } else {
            listaCantidadKG.push(mes.cantidadKG)
          }
        })
        dataResponse.reEtiquetadaManana.map((mes) => {
          //Reetiquetado Manana
          listaMesesRe.push(mes.fecha)
          listacantidadRe.push(mes.cantidad)
          listaCantidadKGRe.push(mes.cantidadKG)
        })

        dataResponse.balanzaTarde.map((mes) => {
          //Balanza Tarde
          listaMesesBalanzaT.push(mes.fecha)
          listacantidadBalanzaT.push(mes.cantidad)
          listaCantidadKGT.push(mes.cantidadKG)
        })

        dataResponse.reEtiquetadaTarde.map((mes) => {
          //Reetiquetado Tarde
          listaMesesReT.push(mes.fecha)
          listacantidadReT.push(mes.cantidad)
          listaCantidadKGReT.push(mes.cantidadKG)
        })

        setEjeX(listaMesesBalanza)

        if (muestra[0] === 'Kilos') {
          setCantidadBalanza((cantidadBalanza) => cantidadBalanza.concat(listaCantidadKG))
          setCantidadBalanzaT((cantidadBalanzaT) => cantidadBalanzaT.concat(listaCantidadKGT))

          setreetiquetado((reetiquetado) => reetiquetado.concat(listaCantidadKGRe))
          setreetiquetadoT((reetiquetadoT) => reetiquetadoT.concat(listaCantidadKGReT))
        } else {
          setCantidadBalanza((cantidadBalanza) => cantidadBalanza.concat(listacantidadBalanza))
          setCantidadBalanzaT((cantidadBalanzaT) => cantidadBalanzaT.concat(listacantidadBalanzaT))

          setreetiquetado((reetiquetado) => reetiquetado.concat(listacantidadRe))
          setreetiquetadoT((reetiquetadoT) => reetiquetadoT.concat(listacantidadReT))
        }
      })
  }
  const ApiSemanal = () => {
    axios
      .post('http://mail.cladd.com.ar:8803/DashboardAPI/Api/GetStockByDate', { days: 6 }) //.post('/DashboardAPI/Api/GetStockByMonth') //.post('http://mail.cladd.com.ar:8803/DashboardAPI/Api/GetStockBymonth')
      .then((response) => {
        let listaFechaBalanza = []
        let listaFechaBalanzaT = []
        let listaFechaRe = []
        let listaFechaReT = []

        let listacantidadBalanza = []
        let listacantidadBalanzaT = []
        let listacantidadRe = []
        let listacantidadReT = []

        let listaCantidadKG = []
        let listaCantidadKGT = []
        let listaCantidadKGRe = []
        let listaCantidadKGReT = []
        const dataResponse = response.data.dataResponse
        dataResponse.balanzaManana.map((dia) => {
          //Balanza Manana
          listaFechaBalanza.push(dia.fecha)
          listacantidadBalanza.push(dia.cantidad)
          listaCantidadKG.push(dia.cantidadKG)
        })
        dataResponse.reEtiquetadaManana.map((dia) => {
          //Reetiquetado Manana
          listaFechaRe.push(dia.fecha)
          listacantidadRe.push(dia.cantidad)
          listaCantidadKGRe.push(dia.cantidadKG)
        })

        dataResponse.balanzaTarde.map((dia) => {
          //Balanza Tarde
          listaFechaBalanzaT.push(dia.fecha)
          listacantidadBalanzaT.push(dia.cantidad)
          listaCantidadKGT.push(dia.cantidadKG)
        })

        dataResponse.reEtiquetadaTarde.map((dia) => {
          //Reetiquetado Tarde
          listaFechaReT.push(dia.fecha)
          listacantidadReT.push(dia.cantidad)
          listaCantidadKGReT.push(dia.cantidadKG)
        })

        setEjeX(listaFechaBalanza)

        if (muestra[0] === 'Kilos') {
          setCantidadBalanza((cantidadBalanza) => cantidadBalanza.concat(listaCantidadKG))
          setCantidadBalanzaT((cantidadBalanzaT) => cantidadBalanzaT.concat(listaCantidadKGT))

          setreetiquetado((reetiquetado) => reetiquetado.concat(listaCantidadKGRe))
          setreetiquetadoT((reetiquetadoT) => reetiquetadoT.concat(listaCantidadKGReT))
        } else {
          setCantidadBalanza((cantidadBalanza) => cantidadBalanza.concat(listacantidadBalanza))
          setCantidadBalanzaT((cantidadBalanzaT) => cantidadBalanzaT.concat(listacantidadBalanzaT))

          setreetiquetado((reetiquetado) => reetiquetado.concat(listacantidadRe))
          setreetiquetadoT((reetiquetadoT) => reetiquetadoT.concat(listacantidadReT))
        }
      })
  }

  const graficoApi = (date) => {
    setEjeX([])
    setCantidadBalanza([])
    setCantidadBalanzaT([])
    setreetiquetado([])

    if (date === 'Mensual') {
      diaOMes.pop()
      diaOMes.push(date)
      Api()
    }
    if (date === 'Anual') {
      setdiaOMes([])
      setdiaOMes((diaOMes) => diaOMes.concat([date]))
      ApiMonth()
    }
    if (date === 'Semanal') {
      setdiaOMes([])
      setdiaOMes((diaOMes) => diaOMes.concat([date]))
      ApiSemanal()
    }
  }
  const graficoPiezaOKg = (PiezaOKG) => {
    if (PiezaOKG === 'Piezas') {
      muestra.pop()
      muestra.push(PiezaOKG)
      graficoApi(diaOMes[0])
    }
    if (PiezaOKG === 'Kilos') {
      muestra.pop()
      muestra.push(PiezaOKG)
      graficoApi(diaOMes[0])
    }
  }

  useEffect(() => {
    if (diaOMes[0] === 'Mensual') {
      Api()
    }
  }, [])

  const AnotherGraficPie = () => {
    return (
      <CCol xs={7}>
        <CCard className="mb-4">
          <h4>Production</h4>
          <CCardBody>
            <CChartPie
              //CChartPie o CChartDoughnut
              data={{
                labels: ['Dia', 'Noche', 'Cladd', 'Terceros'],
                datasets: [
                  {
                    backgroundColor: ['#32CD32', '#0000FF'],
                    data: [21, 79],
                  },
                  {
                    backgroundColor: ['hsl(0, 100%, 60%)', 'hsl(0, 100%, 35%)'],
                    data: [33, 67],
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    labels: {
                      generateLabels: function (chart) {
                        // Get the default label list
                        const original = Chart.overrides.pie.plugins.legend.labels.generateLabels
                        const labelsOriginal = original.call(this, chart)

                        // Build an array of colors used in the datasets of the chart
                        let datasetColors = chart.data.datasets.map(function (e) {
                          return e.backgroundColor
                        })
                        datasetColors = datasetColors.flat()

                        // Modify the color and hide state of each label
                        labelsOriginal.forEach((label) => {
                          // There are twice as many labels as there are datasets. This converts the label index into the corresponding dataset index
                          label.datasetIndex = (label.index - (label.index % 2)) / 2

                          // The hidden state must match the dataset's hidden state
                          label.hidden = !chart.isDatasetVisible(label.datasetIndex)

                          // Change the color to match the dataset
                          label.fillStyle = datasetColors[label.index]
                        })

                        return labelsOriginal
                      },
                    },
                    onClick: function (mouseEvent, legendItem, legend) {
                      // toggle the visibility of the dataset from what it currently is
                      legend.chart.getDatasetMeta(legendItem.datasetIndex).hidden =
                        legend.chart.isDatasetVisible(legendItem.datasetIndex)
                      legend.chart.update()
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        const labelIndex = context.datasetIndex * 2 + context.dataIndex
                        return context.chart.data.labels[labelIndex] + ': ' + context.formattedValue
                      },
                    },
                  },
                },
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    )
  }
  const AnotherGraficBar = () => {
    return (
      <CCard className="mb-4">
        <CCardBody>
          <CChartBar
            data={{
              labels: ejeX,
              datasets: [
                {
                  label: 'BalanzaMa\u00f1ana',
                  backgroundColor: '#32CD32',
                  data: cantidadBalanza,
                  fill: true,
                  borderWidth: 1,
                  borderRadius: 10,
                },
                {
                  label: 'BalanzaTarde',
                  backgroundColor: '#0000FF',
                  data: cantidadBalanzaT,
                  fill: true,
                  borderWidth: 1,
                  borderRadius: 10,
                },
                {
                  label: 'Cladd',
                  backgroundColor: '#4169E1',
                  data: [400, 622, 234, 236],
                  fill: true,
                  borderWidth: 1,
                  borderRadius: 10,
                },
                {
                  label: 'Terceros',
                  backgroundColor: 'black',
                  data: [234, 622, 500, 300],
                  fill: true,
                  borderWidth: 1,
                  borderRadius: 10,
                },
                {
                  label: 'CalidadPrimera',
                  backgroundColor: 'hsl(0, 100%, 60%)',
                  data: [400, 622, 234, 236],
                  fill: true,
                  borderWidth: 1,
                  borderRadius: 10,
                },
                {
                  label: 'CalidadSegunda',
                  backgroundColor: 'hsl(0, 100%, 35%)',
                  data: [234, 622, 500, 300],
                  fill: true,
                  borderWidth: 1,
                  borderRadius: 10,
                },
              ],
            }}
            options={{
              responsive: true,
              scales: {
                x: {
                  stacked: true,
                  min: 0,
                },
                y: {
                  stacked: true,
                  min: 0,
                  title: {
                    display: true,
                    text: 'Cantidad Total',
                  },
                },
              },
            }}
          />
        </CCardBody>
      </CCard>
    )
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Grafico
              </h4>
              <div className="small text-medium-emphasis">Piezas</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-end me-3">
                {['Semanal', 'Mensual', 'Anual'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    type="button"
                    key={value}
                    active={value === diaOMes[0]}
                    className="mx-0"
                    onClick={() => graficoApi(value)}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
              <CButtonGroup className="float-end me-3">
                {['Piezas', 'Kilos'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    type="button"
                    key={value}
                    active={value === muestra[0]}
                    className="mx-0"
                    onClick={() => graficoPiezaOKg(value)}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CCard className="mb-4">
            <CCardBody>
              <CChartBar
                data={{
                  labels: ejeX,
                  datasets: [
                    {
                      label: 'ReEtiquetadoMa\u00f1ana',
                      backgroundColor: '#4169E1',
                      data: reetiquetado,
                      fill: true,
                      borderWidth: 1,
                      borderRadius: 10,
                    },
                    {
                      label: 'ReEtiquetadoTarde',
                      backgroundColor: '#00008B',
                      data: reetiquetadoT,
                      fill: true,
                      borderWidth: 1,
                      borderRadius: 10,
                    },
                    {
                      label: 'BalanzaMa\u00f1ana',
                      backgroundColor: '#32CD32',
                      data: cantidadBalanza,
                      fill: true,
                      borderWidth: 1,
                      borderRadius: 10,
                    },
                    {
                      label: 'BalanzaTarde',
                      backgroundColor: '#0000FF',
                      data: cantidadBalanzaT,
                      fill: true,
                      borderWidth: 1,
                      borderRadius: 10,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  scales: {
                    x: {
                      stacked: true,
                      min: 0,
                    },
                    y: {
                      stacked: true,
                      min: 0,
                      title: {
                        display: true,
                        text: 'Cantidad Total',
                      },
                    },
                  },
                }}
              />
            </CCardBody>
          </CCard>
          {AnotherGraficBar()}
        </CCardBody>
      </CCard>
    </>
  )
}
export default Dashboard
