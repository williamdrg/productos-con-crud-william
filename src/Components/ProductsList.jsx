import { useState } from "react";

const ProductsList = ({dataProducts, deleteProduct, selecProduct, modal}) => {

    const [modalDelete, setModalDelete] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null)


    const openModal = (id) => {
        setSelectedProductId(id)
        setModalDelete(true)
      }
      
    const closeModal =() => {
        setSelectedProductId(null)
        setModalDelete(false)
      }

      const confirmDelete = () => {
        deleteProduct(selectedProductId)
        closeModal()
    }

      

    return (
        <> 
       {modalDelete && (<div className="modal_Delete_container">
            <div className="modal_delete">
                <h2>¿Está seguro de que desea eliminar este producto?</h2>
                <button className="custom-btn btn-1" onClick={confirmDelete}>Confirmar</button>
                <button className="custom-btn btn-1" onClick={()=>closeModal()} >Cancelar</button>
            </div>
        </div>)}

        {dataProducts.map((prodduct) => (
        <div className="plan-card" key={prodduct.id}>
        <h2>{prodduct.name}<span></span></h2>
        <div className="etiquet-price">
            <p>{parseInt(prodduct.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
            <div></div>
        </div>
            <div className="benefits-list">
                <ul>   
                    <li className="title"> ✅{prodduct.name} </li>
                    <li className="description">✅{prodduct.category} </li>
                    <li className="description">✅{prodduct.isAvailable ? 'Disponible' : 'No disponible'} </li>    
                </ul>
                <button onClick={()=>openModal(prodduct.id)} className="btn"> <i className='icon bx bx-trash'></i> </button>
                <button onClick={()=>selecProduct(prodduct, modal())} className="btn btn_edit"> <i className='icon bx bx-edit-alt'></i> </button>
            </div>
          </div>  
        ))} 
        </>
    );
};

export default ProductsList;