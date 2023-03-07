function SingleProduct({setSingleProduct}) {
    return(

        <>
            <h1>Woot woot</h1>

            <button
                onClick={(e) => {
                    e.preventDefault();
                    setSingleProduct(false);
                }}
            >
                No State
            </button>
        
        </>

    )
}

export default SingleProduct;