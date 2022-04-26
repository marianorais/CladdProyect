import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CCardHeader,
  CRow,
  CButton,
  CButtonGroup,
  CSpinner,
} from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import axios from 'axios'

const Hornos = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [listaHornos, setListaHornos] = useState([])
  const [selected, setSelected] = useState(['Mensual'])
  const [cantidadHorno1, setCantidadHorno1] = useState([])
  const [cantidadHorno1T, setCantidadHorno1T] = useState([])
  const [cantidadHorno2, setCantidadHorno2] = useState([])
  const [cantidadHorno2T, setCantidadHorno2T] = useState([])
  const [cantidadHorno3, setCantidadHorno3] = useState([])
  const [cantidadHorno3T, setCantidadHorno3T] = useState([])
  const [coloresManana, setColoresManana] = useState([])
  const [coloresTarde, setColoresTarde] = useState([])
  const [fechaSinRepetir, setFechaSinRepetir] = useState([])
  const [cantidadesHornosM, setCantidadesHornosM] = useState([])
  const [cantidadesHornosT, setCantidadesHornosT] = useState([])

  const Api = async () => {
    var date = GetFecha()
    let listaFecha = []

    await axios
      .post('http://mail.cladd.com.ar:8803/DashboardAPI/Api/GetHornosPorCantidad', {
        code: '200',
        fechaMin: date,
      })
      .then(function (response) {
        console.log(date)
        let listaDeHornos = []

        response.data.dataSource.map((horno, index) => {
          cantidadesHornosM[index] = []
          cantidadesHornosT[index] = []
          listaFecha[index] = []

          listaDeHornos.push('Horno' + (index + 1))
          if (index === 0) {
            //Horno 0
            horno.hornoManana.map((hornoM) => {
              setCantidadHorno1((cantidadHorno1) => cantidadHorno1.concat(hornoM.cantidad))
              cantidadesHornosM[index].push(hornoM.cantidad)
              listaFecha[index].push(hornoM.fecha)
            })
            horno.hornoTarde.map((hornoT) => {
              setCantidadHorno1T((cantidadHorno1T) => cantidadHorno1T.concat(hornoT.cantidad))
              cantidadesHornosT[index].push(hornoT.cantidad)
              listaFecha[index].push(hornoT.fecha)
            })
          }
          if (index === 1) {
            //horno 1
            horno.hornoManana.map((hornoM) => {
              setCantidadHorno2((cantidadHorno2) => cantidadHorno2.concat(hornoM.cantidad))
              cantidadesHornosM[index].push(hornoM.cantidad)
              listaFecha[index].push(hornoM.fecha)
            })
            horno.hornoTarde.map((hornoT) => {
              setCantidadHorno2T((cantidadHorno2T) => cantidadHorno2T.concat(hornoT.cantidad))
              cantidadesHornosT[index].push(hornoT.cantidad)
              listaFecha[index].push(hornoT.fecha)
            })
          }
          if (index === 2) {
            //horno 2
            horno.hornoManana.map((hornoM) => {
              setCantidadHorno3((cantidadHorno3) => cantidadHorno3.concat(hornoM.cantidad))
              cantidadesHornosM[index].push(hornoM.cantidad)
              listaFecha[index].push(hornoM.fecha)
            })
            horno.hornoTarde.map((hornoT) => {
              setCantidadHorno3T((cantidadHorno3T) => cantidadHorno3T.concat(hornoT.cantidad))
              cantidadesHornosT[index].push(hornoT.cantidad)
              listaFecha[index].push(hornoT.fecha)
            })
          }
        })
        const fechaOrdenada = listaSinRepetir(listaFecha).sort()
        setFechaSinRepetir((fechaSinRepetir) => fechaSinRepetir.concat(fechaOrdenada))
        setListaHornos((listaHornos) => listaHornos.concat(listaDeHornos))
        let listaColores = ['#245C93', '#922493', '#935B24', '#259324', '#000000']
        let listaColoresT = ['#ADD8E6', '#EA05F4', '#932425', '#32CD32']
        setColoresManana((coloresManana) => coloresManana.concat(listaColores))
        setColoresTarde((coloresTarde) => coloresTarde.concat(listaColoresT))
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data)
        }
      })

    setIsLoading(false)
  }
  const GetFecha = () => {
    var fechaActual = new Date()
    var dateResult = new Date()
    var day = 0
    var month = 0
    if (selected[0] === 'Mensual') {
      dateResult = addDaysToDate(dateResult, -29)
      day = dateResult.getDate()
      month = dateResult.getMonth() + 1
      console.log(dateResult)
    }
    if (selected[0] === 'Semanal') {
      dateResult = addDaysToDate(dateResult, -7)
      day = dateResult.getDate()
      month = dateResult.getMonth() + 1
      console.log(dateResult)
    }
    if (selected[0] === 'Anual') {
      dateResult = addDaysToDate(dateResult, -29)
      day = dateResult.getDate()
      month = dateResult.getMonth() + 1
    }
    if (day.toString().length < 2) {
      day = '0' + day
    }
    if (month.toString().length < 2) {
      month = '0' + month
    }
    fechaActual = dateResult.getFullYear() + '-' + month + '-' + day
    console.log(fechaActual)
    return fechaActual
  }
  function addDaysToDate(date, days) {
    var res = new Date(date)
    res.setDate(res.getDate() + days)
    return res
  }
  const GraficoSelected = (value) => {
    selected.pop()
    selected.push(value)
    setCantidadHorno1([])
    setCantidadHorno1T([])
    setCantidadHorno2([])
    setCantidadHorno2T([])
    setCantidadHorno3([])
    setCantidadHorno3T([])
    setListaHornos([])
    setFechaSinRepetir([])
    // if (value === 'Semanal') {
    // }
    // if (value === 'Mensual') {
    // }
    // if (value === 'Anual') {
    // }
    setIsLoading(true)
    Api()
  }
  const listaSinRepetir = (lista) => {
    var listaCompleta = []
    var listaSinRepetir = []
    lista.map((listaIndividual) => {
      listaCompleta = listaCompleta.concat(listaIndividual)
    })
    listaCompleta.map((elemento) => {
      if (!listaSinRepetir.includes(elemento)) listaSinRepetir.push(elemento)
    })
    return listaSinRepetir
  }
  useEffect(() => {
    Api()
  }, [])
  const displayGrafic = listaHornos.map((nombre, index) => {
    console.log(fechaSinRepetir)
    return (
      <CCol xs={6} key={nombre}>
        <CCard className="mb-4">
          <CCardHeader>{listaHornos[index]}</CCardHeader>
          <CCardBody>
            <CChartBar
              data={{
                labels: fechaSinRepetir,
                datasets: [
                  {
                    label: 'Ma\u00f1ana',
                    backgroundColor: coloresManana[index],
                    data: cantidadesHornosM[index],
                  },
                  {
                    label: 'Tarde',
                    backgroundColor: coloresTarde[index],
                    data: cantidadesHornosT[index],
                  },
                ],
              }}
              options={{
                scales: {
                  x: {
                    stacked: true,
                    ticks: {
                      autoSkip: true,
                      maxTicksLimit: 30,
                    },
                  },
                  y: {
                    stacked: true,
                    title: {
                      display: true,
                      text: 'Cantidad Total',
                    },
                  },
                },
              }}
              labels="7 dias"
            />
          </CCardBody>
        </CCard>
      </CCol>
    )
  })
  if (isLoading === false) {
    return (
      <>
        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              <CCol xs={12}>
                <CCard className="mb-4">
                  <CCardHeader>
                    Hornos Grafic
                    <CButtonGroup className="float-end me-3">
                      {['Semanal', 'Mensual', 'Anual'].map((value) => (
                        <CButton
                          color="outline-secondary"
                          type="button"
                          key={value}
                          active={value === selected[0]}
                          className="mx-0"
                          onClick={() => GraficoSelected(value)}
                        >
                          {value}
                        </CButton>
                      ))}
                    </CButtonGroup>
                  </CCardHeader>
                  <CCardBody>
                    <CChartBar
                      data={{
                        labels: fechaSinRepetir,
                        datasets: [
                          {
                            label: 'HornoMa\u00f1ana1',
                            backgroundColor: '#4169E1',
                            data: cantidadHorno1,
                            // fill: true,
                            // borderWidth: 1,
                            // borderRadius: 10,
                          },
                          {
                            label: 'HornoTarde1',
                            backgroundColor: '#00008B',
                            data: cantidadHorno1T,
                            // fill: true,
                            // borderWidth: 1,
                            // borderRadius: 10,
                          },
                          {
                            label: 'HornoMa\u00f1ana2',
                            backgroundColor: '#32CD32',
                            data: cantidadHorno2,
                            // fill: true,
                            // borderWidth: 1,
                            // borderRadius: 10,
                          },
                          {
                            label: 'HornoTarde2',
                            backgroundColor: '#006400',
                            data: cantidadHorno2T,
                            // fill: true,
                            // borderWidth: 1,
                            // borderRadius: 10,
                          },
                          {
                            label: 'HornoMa\u00f1ana3',
                            backgroundColor: '#d3d3d3',
                            data: cantidadHorno3,
                            // fill: true,
                            // borderWidth: 1,
                            // borderRadius: 10,
                          },
                          {
                            label: 'HornoTarde3',
                            backgroundColor: '#4169E1',
                            data: cantidadHorno3T,
                            // fill: true,
                            // borderWidth: 1,
                            // borderRadius: 10,
                          },
                        ],
                      }}
                      options={{
                        scales: {
                          x: {
                            stacked: true,
                          },
                          y: {
                            stacked: true,
                            title: {
                              display: true,
                              text: 'Cantidad Total',
                            },
                          },
                        },
                      }}
                      labels="7 dias"
                    />
                  </CCardBody>
                </CCard>
              </CCol>
              {displayGrafic}
            </CRow>
          </CCardBody>
        </CCard>
      </>
    )
  } else {
    return (
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CSpinner color="primary" />
          </CCardBody>
        </CCard>
      </CCol>
    )
  }
}

export default Hornos
