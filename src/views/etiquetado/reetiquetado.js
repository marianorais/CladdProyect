import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow, CButton, CButtonGroup } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import axios from 'axios'

const Reetiquetado = () => {
  const [listaNombre, setListaNombres] = useState([])
  const [listaCantidades, setListaCantidades] = useState([])
  const [listaEjes, setListaEjes] = useState([])
  const [dataReEtiquetado, setDataReEtiquetado] = useState([])
  const [listaFechas, setListaFechas] = useState([])
  const [listaColores, setListaColores] = useState([])
  const [selected, setSelected] = useState(['Piezas'])

  const Api = () => {
    const { data } = axios
      .post('http://mail.cladd.com.ar:8803/DashboardAPI/Api/GetStockByreEtiquetado') //.post('/DashboardAPI/Api/GetStockByDate') //.post('http://mail.cladd.com.ar:8803/DashboardApi/Api/GetStockByDate')
      .then((response) => {
        let listaColores = ['#d3d3d3', '#0000FF', '#000000', '#935B24']
        setListaColores(listaColores)

        var listaFechasAux = []
        var listaCantidadAux = []
        let todasLasFechas = []
        let listaOperarios = []
        let listaDeFechas = []
        var listaCantidadKg = []

        response.data.dataSource.balanzaManana.map((reetiquetados, index) => {
          //Reetiquetado Manana
          listaFechasAux[index] = []
          listaCantidadAux[index] = []
          listaCantidadKg[index] = []
          todasLasFechas[index] = []
          reetiquetados.map((reetiquetado, i) => {
            if (!listaOperarios.includes(reetiquetado.operario.codOperario)) {
              // Agrego lista de operarios
              listaOperarios.push(reetiquetado.operario.codOperario)
            }
            listaFechasAux[index].push(reetiquetado.fecha)
            listaCantidadAux[index].push(reetiquetado.cantidad)
            listaCantidadKg[index].push(reetiquetado.cantidadKG)
            todasLasFechas[index].push(reetiquetado.fecha)
          })
        })

        listaOperarios.map((operario, index) => {
          listaDeFechas.push(listaFechasAux[index])
        })

        if (selected[0] === 'Kilos') {
          var dataGraficKilos = listaOperarios.map((n, i) => {
            return {
              label: listaOperarios[i],
              data: listaCantidadKg[i],
              backgroundColor: listaColores[i],
            }
          })
          setDataReEtiquetado(dataGraficKilos)
          setListaCantidades(listaCantidadKg)
        } else {
          var dataGraficPiezas = listaOperarios.map((n, i) => {
            return {
              label: listaOperarios[i],
              data: listaCantidadAux[i],
              backgroundColor: listaColores[i],
            }
          })
          setDataReEtiquetado(dataGraficPiezas)
          setListaCantidades(listaCantidadAux)
        }

        setListaFechas(listaSinRepetir(todasLasFechas))
        setListaNombres(listaOperarios)
        setListaEjes(listaFechasAux)
      })
  }
  const listaSinRepetir = (lista, pos) => {
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
  const GraficoSelected = (value) => {
    setDataReEtiquetado([])
    setListaCantidades([])
    setListaFechas([])
    setListaNombres([])
    setListaEjes([])
    if (value === 'Piezas') {
      selected.pop()
      selected.push(value)
      Api()
    } else {
      selected.pop()
      selected.push(value)
      Api()
    }
  }

  useEffect(() => {
    Api()
    // setInterval(() => {
    //   setDataReEtiquetado([])
    //   setListaFechas([])
    //   setListaCantidades([])
    //   setListaNombres([])
    //   setListaEjes([])
    //   Api()
    // }, 10000)
  }, [])

  const displayGrafic = listaNombre.map((item, index) => {
    return (
      <CCol xs={6} key={index}>
        <CCard className="mb-4">
          <CCardHeader>{listaNombre[index]}</CCardHeader>
          <CCardBody>
            <CChartBar
              data={{
                labels: listaFechas, //Solo las fechas en las que participo "listaEjes[index]"
                datasets: [
                  {
                    label: listaNombre[index],
                    backgroundColor: listaColores[index],
                    data: listaCantidades[index],
                  },
                ],
              }}
              labels="7 dias"
            />
          </CCardBody>
        </CCard>
      </CCol>
    )
  })

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            ReEtiquetado Total
            <CButtonGroup className="float-end me-3">
              {['Piezas', 'Kilos'].map((value) => (
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
                labels: listaFechas,
                datasets: dataReEtiquetado.reverse(),
              }}
              options={{
                // plugins: {
                //   legend: {
                //     display: false,
                //   },
                // },
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
  )
}

export default Reetiquetado
