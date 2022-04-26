import React, { useEffect, useState, useRef } from 'react' //react-paginate
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButtonGroup,
  CButton,
  CFormFloating,
  CFormInput,
  CFormLabel,
  CFormSelect,
} from '@coreui/react'
import ReactPaginate from 'react-paginate'
import { DocsCallout, DocsExample } from 'src/components'
import axios from 'axios'
import './../../scss/pagination.scss'
import DatePicker from 'react-date-picker'

const Tables = () => {
  const msg = useRef()
  const metodo = useRef()
  const fecha = useRef()
  const origen = useRef()
  const [logs, setLogs] = useState([])

  const logsPerPage = 50 //Cantidad de logs por pagina
  const [pageNumber, setPageNumber] = useState(0) //Numero de pagina
  const pageVisited = pageNumber * logsPerPage // cantidad total de paginas
  const pageCount = Math.ceil(logs.length / logsPerPage) //Divido para que me quede distribuido correctamente en cada pagina (Ceil redondea para arriba)

  const [value, onChange] = useState(new Date())
  const [selectValue, setSelectValue] = useState(new Date())

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const Api = (origen, msg, metodo, fecha) => {
    setLogs([])
    var req = '{'
    req += '"origen": "' + origen + '"'
    if (msg !== '') req += ',"msgId": "' + msg + '"'
    req += ',"metodo": "' + metodo + '"'
    req += ',"fecha": "' + fecha + '"'
    req += '}'
    console.log(req)
    req = JSON.parse(req)
    const { data } = axios
      .post(
        'http://mail.cladd.com.ar:8803/DashboardAPI/Api/Getnlogs',
        req,
        // msgId: '3',
        // metodo: 'GrabarEtiquetaStockInicial:DATA',
        // fecha: '2022-01-25',
        // origen: 'api',
        // origen: origen,
        // msgId: msg,
        // metodo: metodo,
        // fecha: fecha,
        //req,
      )
      .then((response) => {
        let listaLogs = []
        console.log(response.data.dataSource)
        response.data.dataSource.map((log) => {
          listaLogs.push(log)
        })
        listaLogs = listaLogs.sort((a, b) => a.Date > b.Date)
        setLogs((logs) => logs.concat(listaLogs))
        console.log(logs)
      })
  }
  const buscador = (e) => {
    e.preventDefault()
    console.log(origen.current.value)
    console.log(msg.current.value)
    console.log(metodo.current.value)
    var listaFechas = GetFecha(value, selectValue)
    console.log(listaFechas)
    // var fechaMin = new Date(value).toLocaleDateString()
    // var fechaMax = new Date(selectValue).toLocaleDateString()
    if (origen.current.value === 'Open this select menu') {
      Api('', msg.current.value, metodo.current.value, listaFechas[0], listaFechas[1])
    } else {
      Api(
        origen.current.value,
        msg.current.value,
        metodo.current.value,
        listaFechas[0],
        listaFechas[1],
      )
    }
  }
  const GetFecha = (fecha1Min, fecha2Max) => {
    var fechaMin = new Date(fecha1Min)
    var fechaMax = new Date(fecha2Max)
    if (fechaMin > fechaMax) {
      fechaMin = fechaMax
    }
    var newFechaMin =
      fechaMin.getFullYear() + '-' + (fechaMin.getMonth() + 1) + '-' + fechaMin.getDate()
    var newFechaMax =
      fechaMax.getFullYear() + '-' + (fechaMax.getMonth() + 1) + '-' + fechaMax.getDate()
    var fechas = [newFechaMin, newFechaMax]

    return fechas
  }

  const displayLogs = logs.slice(pageVisited, pageVisited + logsPerPage).map((item, index) => {
    return (
      <CTableRow key={index}>
        <CTableHeaderCell scope="col">{item.origen}</CTableHeaderCell>
        <CTableHeaderCell scope="col">{item.uniqueID}</CTableHeaderCell>
        <CTableHeaderCell scope="col">{item.metodo}</CTableHeaderCell>
        <CTableHeaderCell scope="col" className="columnTable">
          {item.message}
        </CTableHeaderCell>
        <CTableHeaderCell scope="col">{item.date}</CTableHeaderCell>
        <CTableHeaderCell scope="col">{item.level}</CTableHeaderCell>
      </CTableRow> //max-width: 150px;
    )
  })
  useEffect(() => {
    Api('API', '', '', '')
    // "origen": "api",
    // "msgId": 3,
    // "metodo": "GrabarEtiquetaStockInicial:DATA",
    // "fecha": "2022-01-01"
  }, [])

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>nLogs </strong>
              <form onSubmit={buscador} noValidate>
                <CButtonGroup>
                  <CFormSelect
                    aria-label="Small select example"
                    className="mb-3"
                    size="sm"
                    ref={origen}
                  >
                    <option>Open this select menu</option>
                    <option>PDA</option>
                    <option>API</option>
                    <option>API-CLADD</option>
                    <option>API-STOCKIT</option>
                  </CFormSelect>
                  <CFormFloating className="mb-3">
                    <CFormInput
                      type="text"
                      id="floatingInput"
                      name="msg"
                      placeholder="msgId"
                      ref={msg}
                      size="lg"
                    />
                    <CFormLabel htmlFor="floatingInput">Msg</CFormLabel>
                  </CFormFloating>
                  <CFormFloating>
                    <CFormInput
                      type="text"
                      placeholder="metodo"
                      ref={metodo}
                      name="metodo"
                      size="lg"
                    />
                    <CFormLabel htmlFor="floatingPassword">Metodo</CFormLabel>
                  </CFormFloating>
                  <DatePicker
                    className="mb-3"
                    size="sm"
                    onChange={(date) => onChange(date)}
                    value={value}
                    dateFormat="yyyy/MM/dd"
                  />
                  <DatePicker
                    className="mb-3"
                    size="sm"
                    onChange={(date) => setSelectValue(date)}
                    value={selectValue}
                    dateFormat="yyyy/MM/dd"
                  />
                  <CButton className="mb-3" size="sm" onClick={(e) => buscador(e)}>
                    Search
                  </CButton>
                </CButtonGroup>
              </form>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Origen</CTableHeaderCell>
                    <CTableHeaderCell scope="col">UniqueID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Metodo</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>{displayLogs}</CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <ReactPaginate
        previousLabel={'prev'}
        nextLabel={'next'}
        // breakLabel={'...'}
        // breakClassName={'break-me'}
        pageCount={pageCount}
        // marginPagesDisplayed={2}
        // pageRangeDisplayed={5}
        onPageChange={changePage}
        containerClassName={'pagination'} //Nombre de la clase de toda la paginacion
        subContainerClassName={'pages pagination'} //Nombre de la clase de subContainer de la paginacion
        activeClassName={'active'}
      />
    </>
  )
}

export default Tables
