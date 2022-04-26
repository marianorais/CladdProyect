import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow, CButton, CButtonGroup } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import axios from 'axios'

const Balanzas = () => {
  const [listaDeOperarios, setListaDeOperarios] = useState([])
  const [selected, setSelected] = useState(['Piezas'])

  const [listaCantidadM, setListaCantidadM] = useState([])
  const [listaCantidadT, setListaCantidadT] = useState([])

  const [balanzaDataTotal, setBalanzaDataTotal] = useState([])

  const [listaDeColoresM, setListaDeColoresM] = useState([])
  const [listaDeColoresT, setListaDeColoresT] = useState([])

  const [listaFechas, setListaFechas] = useState([])

  const Api = () => {
    const { data } = axios
      .post('http://mail.cladd.com.ar:8803/DashboardAPI/Api/GetStockByBalanzas') //.post('/DashboardAPI/Api/GetStockByDate') //.post('http://mail.cladd.com.ar:8803/DashboardApi/Api/GetStockByDate')
      .then((response) => {
        console.log(response.data.dataSource)
        //M: representa la manana, T: Representa la tarde
        let todasLasFechas = []
        let listaDeFechas = []

        let listaOperarios = []

        let listaColores = ['#245C93', '#922493', '#935B24', '#259324', '#000000']
        let listaColoresT = ['#ADD8E6', '#EA05F4', '#932425', '#32CD32']

        var listaFechasAux = []
        var listaCantidadAux = []
        var listaFechasTAux = []
        var listaCantidadTAux = []

        var listaCantidadKg = []
        var listaCantidadKgT = []
        const dataResponse = response.data.dataSource

        dataResponse.balanzaManana.map((balanzas, index) => {
          //Balanza de la mañana
          listaCantidadAux[index] = []
          listaCantidadKg[index] = []

          todasLasFechas[index] = []
          listaFechasAux[index] = []

          balanzas.map((balanza, i) => {
            if (!listaOperarios.includes(balanza.operario.codOperario)) {
              //Agrego operarios sin repetir
              listaOperarios.push(balanza.operario.codOperario)
            }
            listaFechasAux[index].push(balanza.fecha)
            listaCantidadAux[index].push(balanza.cantidad)
            listaCantidadKg[index].push(balanza.cantidadKG)
            todasLasFechas[index].push(balanza.fecha)
          })
        })
        dataResponse.balanzaTarde.map((balanzas, index) => {
          //Balanza de la tarde
          listaFechasTAux[index] = []
          listaCantidadTAux[index] = []
          listaCantidadKgT[index] = []

          balanzas.map((balanza, i) => {
            listaFechasTAux[index].push(balanza.fecha)
            listaCantidadTAux[index].push(balanza.cantidad)
            listaCantidadKgT[index].push(balanza.cantidadKG)
          })
        })

        listaOperarios.map((operario, index) => {
          //Agrego las fechas para cada operario
          listaDeFechas.push(listaFechasAux[index])
        })
        setListaDeColoresM((listaDeColores) => listaDeColores.concat(listaColoresT))
        setListaDeColoresT((listaDeColoresT) => listaDeColoresT.concat(listaColores))

        setListaDeOperarios((listaDeOperarios) => listaDeOperarios.concat(listaOperarios))

        setListaFechas(listaSinRepetir(todasLasFechas))

        if (selected[0] === 'Kilos') {
          var sumaDeBalanzasKilos = []
          listaOperarios.map((operario, index) => {
            sumaDeBalanzasKilos[index] = sumarLista(listaCantidadKg[index], listaCantidadKgT[index])
          })
          var dataBalanzaKilos = listaOperarios.map((n, i) => {
            return {
              label: listaOperarios[i],
              backgroundColor: listaColores[i],
              data: sumaDeBalanzasKilos[i],
            }
          })
          setBalanzaDataTotal(dataBalanzaKilos)
          //setBalanzaTDataTotal(dataBalanzaT)
          setListaCantidadM(listaCantidadKg)
          setListaCantidadT(listaCantidadKgT)
        } else {
          var sumaDeBalanzasPiezas = []
          listaOperarios.map((operario, index) => {
            sumaDeBalanzasPiezas[index] = sumarLista(
              listaCantidadAux[index],
              listaCantidadTAux[index],
            )
          })
          var dataBalanzaPiezas = listaOperarios.map((n, i) => {
            return {
              label: listaOperarios[i],
              backgroundColor: listaColores[i],
              data: sumaDeBalanzasPiezas[i],
            }
          })
          setBalanzaDataTotal(dataBalanzaPiezas)
          //setBalanzaTDataTotal(dataBalanzaT)

          setListaCantidadM(listaCantidadAux)
          setListaCantidadT(listaCantidadTAux)
        }
      })
  }
  const GraficoSelected = (value) => {
    setListaDeColoresM([])
    setListaDeColoresT([])
    setListaFechas([])
    setBalanzaDataTotal([])
    setListaDeOperarios([])
    setListaCantidadM([])
    setListaCantidadT([])
    selected.pop()
    selected.push(value)
    Api()
  }

  useEffect(() => {
    //Cargo la info por primera vez
    Api()
  }, [])

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
  function sumarLista(lista1, lista2) {
    if (lista1 !== undefined && lista2 !== undefined) {
      let main = lista1.length >= lista2.length ? lista1 : lista2
      let sec = lista1.length < lista2.length ? lista1 : lista2
      return main.map((elem, i) => (sec[i] ? elem + sec[i] : elem))
    }
  }

  const displayGrafic = listaDeOperarios.map((nombre, index) => {
    return (
      <CCol xs={6} key={index}>
        <CCard className="mb-4">
          <CCardHeader>{listaDeOperarios[index]}</CCardHeader>
          <CCardBody>
            <CChartBar
              data={{
                labels: listaFechas, //listaEjes[index] en este caso mostrario solo los que opero
                datasets: [
                  {
                    label: 'Ma\u00f1ana',
                    backgroundColor: listaDeColoresM[index],
                    data: listaCantidadM[index],
                  },
                  {
                    label: 'Tarde',
                    backgroundColor: listaDeColoresT[index],
                    data: listaCantidadT[index],
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
    )
  })

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            Balanza Total
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
                datasets: balanzaDataTotal,
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
  )
}

export default Balanzas
