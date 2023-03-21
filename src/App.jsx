import './App.css'
import { useState, useEffect } from 'react'
import ProductsForm from './Components/ProductsForm'
import ProductsList from './Components/ProductsList'
import axios from 'axios'




function App() {
  
  const [products, setProducts] = useState ([])
  const [editProduct, setEditProduct] = useState (null)
  const [modal, setModal] = useState(false)
  const [successfuProduct, setSuccessfuProduct] = useState(false)
  const  [message, setMessage] = useState('')
  

  useEffect(()=>{ 
    dataRequest()
  },[])
  
  
  const dataRequest = () => {
    axios
        .get('https://products-crud.academlo.tech/products/')
        .then(resp => setProducts(resp.data))
        .catch(error => console.error(error))
  }

 const submitProduct = (data) => {
    axios
        .post('https://products-crud.academlo.tech/products/', data)
        .then(()=> {
          dataRequest()
          setSuccessfuProduct(true)
        })
        .catch(error => console.error(error))
 }
 
 const deleteProduct = id => {
    axios
        .delete(`https://products-crud.academlo.tech/products/${id}/`)
        .then(()=>dataRequest())
        .catch(error => console.error(error))
 }

 const selecProduct = (product) => {
  setEditProduct(product)
 }

 const updateProduct = dataUpdate => {
    axios
        .put(`https://products-crud.academlo.tech/products/${dataUpdate.id}/`, dataUpdate)
        .then(()=>{
          dataRequest()
          setSuccessfuProduct(true)
          setEditProduct(null)
        })
        .catch(error => console.error(error))

 }  


 const mensajeAdd = m => setMessage (m)
 const mensajeEdit = m => setMessage (m)


  return (
    <div className="App">

        <div className={ successfuProduct ? 'container_modal_successful' : "close_modal_successful"}>
          <div className ='open_modal_successful'>
            <i className='bx bx-check'></i>
            <h3>{message}</h3>
            <button className='custom-btn btn-1' onClick={()=>setSuccessfuProduct(false)}>Aceptar</button>
          </div>
        </div>

       <div className={modal ? "form_container" : "close_form_container"}>
      <ProductsForm
       submitProduct = {(data)=> submitProduct(data)} 
       editProduct = {editProduct}
       updateProduct = {(dataUpdate) => updateProduct (dataUpdate)}
       modal = {()=>setModal(!modal)}
       mensajeAdd = {(m)=>mensajeAdd(m)}
       mensajeEdit = {(m)=>mensajeEdit(m)}
      />
      </div>


      <div className='navbar'>
        <h1>Productos</h1>
        <button className='btn_add'
                onClick={()=>setModal(!modal)}
        >
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">
              <i className='bx bx-plus'></i>
              </div>
            </div>
          <span>Añadir producto</span>
        </button>
      </div>

      

      <div className='card_container'>
      <ProductsList
      dataProducts = {products}
      deleteProduct = {(id)=> deleteProduct (id)}
      selecProduct = {(product)=> selecProduct(product)}
      modal = {()=>setModal(!modal)}
      />
      </div>
      
    </div>
  )
}

export default App
