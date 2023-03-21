import { useEffect, useState} from "react";
import { useForm } from "react-hook-form";

const ProductsForm = ({submitProduct, editProduct, updateProduct, modal,  mensajeAdd, mensajeEdit, stateModal}) => {

    const {handleSubmit, register, reset, formState: {errors}} = useForm()

    useEffect(() => {
        if (editProduct) {
            reset(editProduct)
        } else {
            empyForm()
        }
    },[editProduct]) 

    const submit = (data) => {
        if (editProduct) {
            updateProduct(data)
            mensajeEdit(messageEditProduct)
        } else {
        submitProduct(data)
        empyForm()
        mensajeAdd(messageAddProduct)
        }
    }

    const messageAddProduct = 'Producto agregado exitosamente'
    const messageEditProduct = 'Producto actualizado exitosamente'
    
    const empyForm = () => {
        reset( 
                {
                name: "",
                category: "",
                price: "",
                isAvailable: false
                }
            ) 
    } 

    const num = (e) => {e.target.value = e.target.value.replace(/[^0-9]/g, "")}
    console.log(stateModal)

    return (
            
            <form onSubmit={handleSubmit(submit)} className={stateModal ? 'form' : 'form_close' }>
                <i onClick={modal} className='bx bx-x'></i>
                <h2>Nuevo producto</h2>

                <label htmlFor="name">Nombre: </label>
                <input 
                type="text"
                name="name"
                id="name"
                placeholder="nombre del producto"
                {...register('name', {required: true})}
                />
                { 
                errors.name?.type === 'required' && <span role="alert" className="form_error">
                Debes ingresar el nombre del producto</span> 
                }

                <label htmlFor="category">Categoria: </label>
                <input 
                type="text"
                name="category"
                placeholder="categoria del producto"
                id="category"
                {...register('category', {required: true})}
                />
                
                { 
                errors.category?.type === 'required' && <span role="alert" className="form_error">
                Desbes indicar la categoría del producto</span> 
                }

                <label htmlFor="price">Precio: </label>
                <input 
                type="text"
                name="price"
                placeholder="precio"
                id="price"
                onInput={num}
                {...register('price', {required: true})}
                />
                
                { 
                errors.price?.type === 'required' && <span role="alert" className="form_error">
                Debes ingresar el precio del producto</span> 
                }

                <div className="toggler">
                    <input id="isAvailable" 
                    name="isAvailable" 
                    type="checkbox" 
                    {...register('isAvailable')}
                    /> ¿Estará disponible?
                    <label htmlFor="isAvailable">
                        <svg className="toggler-on" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                            <polyline className="path check" points="100.2,40.2 51.5,88.8 29.8,67.5"></polyline>
                        </svg>
                        <svg className="toggler-off" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                            <line className="path line" x1="34.4" y1="34.4" x2="95.8" y2="95.8"></line>
                            <line className="path line" x1="95.8" y1="34.4" x2="34.4" y2="95.8"></line>
                        </svg>
                    </label>
                </div>


                <button type="submit" className="custom-btn btn-1">{ editProduct ? 'Editar Producto' : 'Agregar Producto' }</button>
            </form>
    );
};

export default ProductsForm;

